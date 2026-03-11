import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getAuthorizationUrl } from "@/lib/hmrc/client";
import { verifyToken } from "@/lib/auth";

/**
 * GET /api/hmrc/auth
 *
 * Initiates the HMRC OAuth 2.0 flow. Requires a valid Pro license token.
 * Redirects the user to HMRC's authorization page.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "License token is required." },
      { status: 401 }
    );
  }

  // Verify the user has a valid Pro license
  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json(
      { error: "Invalid or expired license token." },
      { status: 401 }
    );
  }

  // Generate a random state parameter for CSRF protection
  const state = crypto.randomBytes(32).toString("hex");

  // In a real implementation, store the state in a session or short-lived store
  // For now, we encode it with the license token so the callback can verify both
  const statePayload = Buffer.from(
    JSON.stringify({ state, token, ts: Date.now() })
  ).toString("base64url");

  const authUrl = getAuthorizationUrl(statePayload);

  return NextResponse.redirect(authUrl);
}
