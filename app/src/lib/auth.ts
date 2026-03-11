/**
 * Shared license token signing/verification.
 * Used by /api/activate and /api/hmrc/* routes.
 */
import crypto from "crypto";

const SECRET =
  process.env.SIGNING_SECRET || "quk_s3cr3t_k3y_2026_d0_n0t_shar3";

export function signToken(payload: Record<string, unknown>): string {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(data)
    .digest("base64url");
  return `${data}.${signature}`;
}

export function verifyToken(
  token: string
): Record<string, unknown> | null {
  const [data, signature] = token.split(".");
  if (!data || !signature) return null;
  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(data)
    .digest("base64url");
  if (signature !== expected) return null;
  try {
    return JSON.parse(Buffer.from(data, "base64url").toString());
  } catch {
    return null;
  }
}
