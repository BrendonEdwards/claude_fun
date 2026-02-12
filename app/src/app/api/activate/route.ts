import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { license_key } = body;

  if (!license_key || typeof license_key !== "string") {
    return NextResponse.json(
      { error: "License key is required" },
      { status: 400 }
    );
  }

  try {
    // Activate the license key via LemonSqueezy License API
    const response = await fetch(
      "https://api.lemonsqueezy.com/v1/licenses/activate",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          license_key: license_key.trim(),
          instance_name: "QuarterlyUK Web App",
        }),
      }
    );

    const data = await response.json();

    if (data.activated || data.error === "License key has already been activated.") {
      // If already activated, validate it instead
      if (data.error === "License key has already been activated.") {
        const validateRes = await fetch(
          "https://api.lemonsqueezy.com/v1/licenses/validate",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              license_key: license_key.trim(),
            }),
          }
        );
        const validateData = await validateRes.json();

        if (validateData.valid) {
          return NextResponse.json({
            success: true,
            customer_name: validateData.meta?.customer_name || null,
            customer_email: validateData.meta?.customer_email || null,
          });
        }

        return NextResponse.json(
          { error: "License key is no longer valid." },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        customer_name: data.meta?.customer_name || null,
        customer_email: data.meta?.customer_email || null,
        instance_id: data.instance?.id || null,
      });
    }

    // Activation failed
    const errorMsg =
      data.error || "Invalid license key. Please check and try again.";
    return NextResponse.json({ error: errorMsg }, { status: 400 });
  } catch {
    return NextResponse.json(
      { error: "Could not verify license key. Please try again." },
      { status: 500 }
    );
  }
}
