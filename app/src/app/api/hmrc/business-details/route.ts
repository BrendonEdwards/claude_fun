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

  if (!/^[A-Z]{2}\d{6}[A-D]$/i.test(nino)) {
    return NextResponse.json(
      { error: "Invalid NINO format." },
      { status: 400 }
    );
  }

  try {
    const headers = buildFraudHeaders(fraudData, nino);
    const businesses = await getBusinessDetails(nino, accessToken, headers);
    return NextResponse.json({ businesses });
  } catch (err) {
    console.error("HMRC business-details error:", err);
    return NextResponse.json(
      { error: "Failed to fetch business details from HMRC." },
      { status: 502 }
    );
  }
}
