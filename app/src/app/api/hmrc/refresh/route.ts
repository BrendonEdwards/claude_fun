import { NextRequest, NextResponse } from "next/server";
import { refreshAccessToken } from "@/lib/hmrc/client";

/**
 * POST /api/hmrc/refresh
 *
 * Refreshes an expired HMRC access token using the refresh token.
 * Returns fresh tokens to the client.
 *
 * Body: { refreshToken }
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { refreshToken } = body as { refreshToken: string };

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Refresh token is required." },
      { status: 400 }
    );
  }

  try {
    const tokens = await refreshAccessToken(refreshToken);
    return NextResponse.json({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_in: tokens.expires_in,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Token refresh failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
