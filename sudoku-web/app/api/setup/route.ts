import { NextRequest, NextResponse } from "next/server";
import { registerDevice } from "@/lib/remarkable";

export async function POST(req: NextRequest) {
  const { code, password } = await req.json();

  const setupPassword = process.env.SETUP_PASSWORD;
  if (setupPassword && password !== setupPassword) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  if (!code?.trim()) {
    return NextResponse.json({ error: "One-time code is required" }, { status: 400 });
  }

  try {
    const deviceToken = await registerDevice(code);
    const res = NextResponse.json({ success: true });
    res.cookies.set("rm_token", deviceToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });
    return res;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
