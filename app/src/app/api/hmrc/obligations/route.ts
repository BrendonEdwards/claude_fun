import { NextRequest, NextResponse } from "next/server";
import { getObligations } from "@/lib/hmrc/client";
import { buildFraudHeaders, ClientFraudData } from "@/lib/hmrc/fraud-headers";

/**
 * POST /api/hmrc/obligations
 *
 * Fetches the user's MTD Self-Assessment obligations from HMRC.
 * Requires HMRC access token and NINO.
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

  if (!fraudData) {
    return NextResponse.json(
      { error: "Fraud prevention data is required." },
      { status: 400 }
    );
  }

  try {
    const headers = buildFraudHeaders(fraudData, nino);
    const obligations = await getObligations(nino, accessToken, headers);
    return NextResponse.json(obligations);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch obligations.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
