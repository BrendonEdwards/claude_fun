import { NextRequest, NextResponse } from "next/server";
import { submitQuarterlyUpdate, QuarterlyUpdate } from "@/lib/hmrc/client";
import { buildFraudHeaders, ClientFraudData } from "@/lib/hmrc/fraud-headers";

/**
 * POST /api/hmrc/submit
 *
 * Submits a quarterly periodic update to HMRC's MTD Self-Assessment API.
 * All financial data comes from the client's localStorage — the server
 * only relays it to HMRC with the required authentication and fraud headers.
 *
 * Body: { accessToken, nino, businessId, update, fraudData }
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { accessToken, nino, businessId, update, fraudData } = body as {
    accessToken: string;
    nino: string;
    businessId: string;
    update: QuarterlyUpdate;
    fraudData: ClientFraudData;
  };

  if (!accessToken || !nino || !businessId) {
    return NextResponse.json(
      { error: "Access token, NINO, and business ID are required." },
      { status: 400 }
    );
  }

  if (!/^[A-Z]{2}\d{6}[A-D]$/i.test(nino)) {
    return NextResponse.json(
      { error: "Invalid NINO format." },
      { status: 400 }
    );
  }

  if (!/^X[A-Z0-9]IS\d{11}$/.test(businessId)) {
    return NextResponse.json(
      { error: "Invalid business ID format." },
      { status: 400 }
    );
  }

  if (!update || typeof update.turnover !== "number") {
    return NextResponse.json(
      { error: "Valid quarterly update data is required." },
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
    const result = await submitQuarterlyUpdate(
      nino,
      businessId,
      accessToken,
      headers,
      update
    );

    if (result.status >= 400) {
      return NextResponse.json(
        {
          error: "HMRC rejected the submission.",
          details: result.body,
        },
        { status: result.status }
      );
    }

    return NextResponse.json({
      success: true,
      hmrcResponse: result.body,
    });
  } catch (err) {
    console.error("HMRC submit error:", err);
    return NextResponse.json(
      { error: "Failed to communicate with HMRC." },
      { status: 502 }
    );
  }
}
