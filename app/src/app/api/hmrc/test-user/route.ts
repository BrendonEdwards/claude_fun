import { NextResponse } from "next/server";
import { createTestUser } from "@/lib/hmrc/client";

/**
 * POST /api/hmrc/test-user
 *
 * Creates a test user in the HMRC sandbox environment.
 * Only works against the sandbox API (test-api.service.hmrc.gov.uk).
 * No authentication required — this is a sandbox-only endpoint.
 */
export async function POST() {
  // Only allow in development or when using sandbox
  const baseUrl = process.env.HMRC_BASE_URL || "";
  if (
    baseUrl &&
    !baseUrl.includes("test-api") &&
    process.env.NODE_ENV === "production"
  ) {
    return NextResponse.json(
      { error: "Test user creation is only available in sandbox mode." },
      { status: 403 }
    );
  }

  try {
    const testUser = await createTestUser();
    return NextResponse.json(testUser);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create test user.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
