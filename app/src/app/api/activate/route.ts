import { NextRequest, NextResponse } from "next/server";
import { signToken, verifyToken } from "@/lib/auth";

export { verifyToken };

async function validateWithLemonSqueezy(licenseKey: string) {
  // Try to activate first
  const activateRes = await fetch(
    "https://api.lemonsqueezy.com/v1/licenses/activate",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        license_key: licenseKey,
        instance_name: "QuarterlyUK Web App",
      }),
    }
  );
  const activateData = await activateRes.json();

  if (activateData.activated) {
    return {
      valid: true,
      email: activateData.meta?.customer_email || null,
      name: activateData.meta?.customer_name || null,
    };
  }

  // If already activated, validate instead
  if (activateData.error === "License key has already been activated.") {
    const validateRes = await fetch(
      "https://api.lemonsqueezy.com/v1/licenses/validate",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ license_key: licenseKey }),
      }
    );
    const validateData = await validateRes.json();

    if (validateData.valid) {
      return {
        valid: true,
        email: validateData.meta?.customer_email || null,
        name: validateData.meta?.customer_name || null,
      };
    }
  }

  return { valid: false, error: activateData.error || "Invalid license key." };
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { license_key, email } = body;

  if (!license_key || typeof license_key !== "string") {
    return NextResponse.json(
      { error: "License key is required." },
      { status: 400 }
    );
  }

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Email address is required." },
      { status: 400 }
    );
  }

  try {
    const result = await validateWithLemonSqueezy(license_key.trim());

    if (!result.valid) {
      return NextResponse.json(
        { error: result.error || "Invalid license key." },
        { status: 400 }
      );
    }

    // Verify email matches the purchase email
    const purchaseEmail = (result.email || "").toLowerCase().trim();
    const providedEmail = email.toLowerCase().trim();

    if (purchaseEmail && providedEmail !== purchaseEmail) {
      return NextResponse.json(
        {
          error:
            "Email does not match the purchase email. Please use the email you bought with.",
        },
        { status: 400 }
      );
    }

    // Create a signed token - can't be faked without the server secret
    const token = signToken({
      key: license_key.trim(),
      email: providedEmail,
      name: result.name,
      activated_at: Date.now(),
      v: 1,
    });

    return NextResponse.json({
      success: true,
      token,
      customer_name: result.name,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not verify license key. Please try again." },
      { status: 500 }
    );
  }
}
