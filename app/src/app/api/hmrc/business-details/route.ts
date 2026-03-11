import { NextRequest, NextResponse } from "next/server";
import { getBusinessDetails } from "@/lib/hmrc/client";
import { buildFraudHeaders, ClientFraudData } from "@/lib/hmrc/fraud-headers";

/**
 * POST /api/hmrc/business-details
 *
 * Fetches the user's business details from HMRC to get the correct businessId.
 *
 * Body: { accessToken, nino, fraudData }
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { accessToken, nino, fraudData } = body as {
    accessToken: string;
    nino: string;
    fraudData: ClientFraudData;
  };

  if (!accessToken || !nino) {
    return NextResponse.json(
      { error: "Access token and NINO are required." },
      { status: 400 }
    );
  }

  try {
    const headers = buildFraudHeaders(fraudData, nino);
    const businesses = await getBusinessDetails(nino, accessToken, headers);
    return NextResponse.json({ businesses });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch business details.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
