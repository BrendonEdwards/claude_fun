import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForTokens } from "@/lib/hmrc/client";
import { verifyToken } from "@/lib/auth";

/**
 * GET /api/hmrc/callback
 *
 * HMRC redirects here after the user grants (or denies) access.
 * Exchanges the authorization code for access + refresh tokens,
 * then redirects the user back to the dashboard with tokens
 * stored in a fragment (never sent to server on subsequent requests).
 */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const stateParam = request.nextUrl.searchParams.get("state");
  const error = request.nextUrl.searchParams.get("error");
  const errorDescription = request.nextUrl.searchParams.get(
    "error_description"
  );

  // Handle HMRC denial
  if (error) {
    const dashboardUrl = new URL("/dashboard/hmrc-connect", request.url);
    dashboardUrl.searchParams.set(
      "error",
      errorDescription || "HMRC authorization was denied."
    );
    return NextResponse.redirect(dashboardUrl);
  }

  if (!code || !stateParam) {
    return NextResponse.json(
      { error: "Missing authorization code or state." },
      { status: 400 }
    );
  }

  // Decode and verify state
  let stateData: { state: string; token: string; ts: number };
  try {
    stateData = JSON.parse(
      Buffer.from(stateParam, "base64url").toString()
    );
  } catch {
    return NextResponse.json({ error: "Invalid state parameter." }, { status: 400 });
  }

  // Verify the license token is still valid
  const payload = verifyToken(stateData.token);
  if (!payload) {
    return NextResponse.json(
      { error: "License token expired during HMRC authorization." },
      { status: 401 }
    );
  }

  // Check state isn't too old (15 minutes max)
  if (Date.now() - stateData.ts > 15 * 60 * 1000) {
    return NextResponse.json(
      { error: "Authorization flow expired. Please try again." },
      { status: 400 }
    );
  }

  try {
    const tokens = await exchangeCodeForTokens(code);

    // Redirect to dashboard with tokens in the URL fragment.
    // The fragment (#) is never sent to the server, so tokens stay client-side.
    // The dashboard page reads them with JavaScript and stores in localStorage.
    const dashboardUrl = new URL("/dashboard/hmrc-connect", request.url);
    const fragment = new URLSearchParams({
      hmrc_access_token: tokens.access_token,
      hmrc_refresh_token: tokens.refresh_token,
      hmrc_expires_in: String(tokens.expires_in),
      hmrc_scope: tokens.scope,
      connected: "true",
    });

    return NextResponse.redirect(
      `${dashboardUrl.toString()}#${fragment.toString()}`
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Token exchange failed.";
    const dashboardUrl = new URL("/dashboard/hmrc-connect", request.url);
    dashboardUrl.searchParams.set("error", message);
    return NextResponse.redirect(dashboardUrl);
  }
}
