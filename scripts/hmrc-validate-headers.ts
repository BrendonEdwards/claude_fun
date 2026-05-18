/**
 * HMRC Test Fraud Prevention Headers — validation-feedback runner.
 *
 * Calls the validation-feedback endpoint on HMRC's Test Fraud Prevention
 * Headers API to retrieve detailed feedback on the last sandbox request
 * made to each of the three APIs Nathan Watson flagged on 2026-03-23
 * (HMRC support ref 2026-XMS975):
 *
 *   1. Business Details (MTD)
 *   2. Obligations (MTD)
 *   3. Self Employment Business (MTD)
 *
 * The report is written to stdout AND a timestamped file under
 * scripts/output/ so it can be attached to the reply to HMRC.
 *
 * Exit codes:
 *   0  all three APIs returned a clean validation result
 *   1  one or more APIs returned validation errors / non-2xx
 *   2  configuration error (missing creds, unreachable, etc.)
 *
 * Required env (read from process.env, .env.local at repo root, or app/.env.local):
 *   HMRC_CLIENT_ID
 *   HMRC_CLIENT_SECRET
 * Optional:
 *   HMRC_BASE_URL   defaults to sandbox https://test-api.service.hmrc.gov.uk
 *
 * Run with Node 22+ (no extra deps):
 *   node --experimental-strip-types scripts/hmrc-validate-headers.ts
 * Or with tsx:
 *   npx tsx scripts/hmrc-validate-headers.ts
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

// ---------------------------------------------------------------------------
// env loading (.env.local / .env at repo root, then under app/)
// ---------------------------------------------------------------------------

function loadDotEnv(path: string): Record<string, string> {
  if (!existsSync(path)) return {};
  const out: Record<string, string> = {};
  const text = readFileSync(path, "utf8");
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

for (const f of [
  join(REPO_ROOT, ".env.local"),
  join(REPO_ROOT, ".env"),
  join(REPO_ROOT, "app", ".env.local"),
  join(REPO_ROOT, "app", ".env"),
]) {
  const vars = loadDotEnv(f);
  for (const [k, v] of Object.entries(vars)) {
    if (process.env[k] === undefined) process.env[k] = v;
  }
}

const CLIENT_ID = process.env.HMRC_CLIENT_ID ?? "";
const CLIENT_SECRET = process.env.HMRC_CLIENT_SECRET ?? "";
const BASE_URL =
  process.env.HMRC_BASE_URL ?? "https://test-api.service.hmrc.gov.uk";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "ERROR: HMRC_CLIENT_ID and HMRC_CLIENT_SECRET must be set\n" +
      "       (in environment or .env.local at repo root / app/)."
  );
  process.exit(2);
}

if (!BASE_URL.includes("test-api")) {
  console.error(
    `ERROR: refusing to run against non-sandbox host: ${BASE_URL}\n` +
      `       This script is sandbox-only. Set HMRC_BASE_URL to the sandbox URL.`
  );
  process.exit(2);
}

// ---------------------------------------------------------------------------
// the three APIs Nathan flagged (2026-03-23, HMRC ref 2026-XMS975)
// ---------------------------------------------------------------------------

interface FlaggedApi {
  label: string;
  apiContext: string;
  apiVersion: string;
}

const FLAGGED_APIS: FlaggedApi[] = [
  {
    label: "Business Details (MTD)",
    apiContext: "individuals/business/details",
    apiVersion: "2.0",
  },
  {
    label: "Obligations (MTD)",
    apiContext: "obligations/details",
    apiVersion: "3.0",
  },
  {
    label: "Self Employment Business (MTD)",
    apiContext: "individuals/business/self-employment",
    apiVersion: "5.0",
  },
];

// ---------------------------------------------------------------------------
// OAuth: application-restricted client_credentials grant
// ---------------------------------------------------------------------------

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
}

async function getApplicationToken(): Promise<string> {
  const res = await fetch(`${BASE_URL}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      // The exact scope name for the Test Fraud Prevention Headers API
      // could not be confirmed from HMRC's docs (developer.service.hmrc.gov.uk
      // returns 403 to non-browser fetches). HMRC commonly uses
      // "read:transactions-monitoring" or "write:transactions-monitoring" for
      // the txm-fph-validator-api. If this scope is rejected, see
      // scripts/NOTES-hmrc-validation.md for fallbacks to try.
      scope: "read:transactions-monitoring",
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(
      `OAuth client_credentials failed (${res.status}): ${errBody}`
    );
  }

  const data = (await res.json()) as TokenResponse;
  return data.access_token;
}

// ---------------------------------------------------------------------------
// validation-feedback call
// ---------------------------------------------------------------------------

// IMPORTANT: HMRC's public docs page for txm-fph-validator-api returns 403 to
// any non-browser request, so the exact path/method/query-param contract for
// validation-feedback could not be confirmed from this environment. The
// implementation below uses the documented path scheme and the most likely
// query params. If HMRC returns 404 / NOT_FOUND / SCOPE_INVALID, the
// alternatives to try are listed in scripts/NOTES-hmrc-validation.md.
const FEEDBACK_PATH = "/test/fraud-prevention-headers/validation-feedback";

interface FeedbackResult {
  api: string;
  url: string;
  status: number;
  ok: boolean;
  correlationId?: string;
  body: unknown;
  classification: "PASS" | "FAIL" | "INDETERMINATE";
  reason?: string;
}

async function fetchFeedback(
  accessToken: string,
  api: FlaggedApi
): Promise<FeedbackResult> {
  const url =
    `${BASE_URL}${FEEDBACK_PATH}` +
    `?api-context=${encodeURIComponent(api.apiContext)}` +
    `&api-version=${encodeURIComponent(api.apiVersion)}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.hmrc.1.0+json",
    },
  });

  const correlationId =
    res.headers.get("x-correlation-id") ??
    res.headers.get("x-request-id") ??
    undefined;

  const raw = await res.text();
  let body: unknown;
  try {
    body = raw.length ? JSON.parse(raw) : null;
  } catch {
    body = raw;
  }

  const { classification, reason } = classify(res.status, body);

  return {
    api: api.apiContext,
    url,
    status: res.status,
    ok: res.ok,
    correlationId,
    body,
    classification,
    reason,
  };
}

function classify(
  status: number,
  body: unknown
): { classification: "PASS" | "FAIL" | "INDETERMINATE"; reason?: string } {
  if (status === 404) {
    return {
      classification: "INDETERMINATE",
      reason:
        "HMRC returned 404. The validation-feedback path/params may differ — " +
        "see NOTES-hmrc-validation.md for alternatives.",
    };
  }
  if (status === 401 || status === 403) {
    return {
      classification: "INDETERMINATE",
      reason:
        `HMRC returned ${status}. The OAuth scope for the Test Fraud ` +
        "Prevention Headers API may be wrong — see NOTES-hmrc-validation.md.",
    };
  }
  if (status >= 400) {
    return {
      classification: "FAIL",
      reason: `HTTP ${status} from validation-feedback endpoint`,
    };
  }
  if (!body || typeof body !== "object") {
    return {
      classification: "INDETERMINATE",
      reason: "Empty or non-JSON response body.",
    };
  }
  const b = body as Record<string, unknown>;
  // Heuristic: HMRC validator responses with no issues typically have no
  // "errors", "warnings", or "issues" arrays containing entries, and no
  // top-level "code" set to an INVALID_/MISSING_ value. If we see any of
  // those, treat as a failure.
  const arrayHasEntries = (k: string): boolean =>
    Array.isArray(b[k]) && (b[k] as unknown[]).length > 0;

  if (
    arrayHasEntries("errors") ||
    arrayHasEntries("failures") ||
    arrayHasEntries("issues")
  ) {
    return {
      classification: "FAIL",
      reason: "Response contains errors/failures/issues entries.",
    };
  }
  if (
    typeof b.code === "string" &&
    /^(INVALID|MISSING|MALFORMED)/i.test(b.code)
  ) {
    return {
      classification: "FAIL",
      reason: `Response code: ${b.code}`,
    };
  }
  return { classification: "PASS" };
}

// ---------------------------------------------------------------------------
// reporting
// ---------------------------------------------------------------------------

function indent(s: string, prefix: string): string {
  return s
    .split("\n")
    .map((l) => (l.length ? prefix + l : l))
    .join("\n");
}

function pretty(v: unknown): string {
  if (typeof v === "string") return v;
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return String(v);
  }
}

function maskClientId(id: string): string {
  if (id.length <= 10) return "***";
  return `${id.slice(0, 6)}…${id.slice(-4)}`;
}

function writeReport(
  startedAt: Date,
  body: string,
  outcome: "PASS" | "FAIL" | "INDETERMINATE"
): string {
  const outDir = join(__dirname, "output");
  mkdirSync(outDir, { recursive: true });
  const stamp = startedAt.toISOString().replace(/[:.]/g, "-");
  const file = join(outDir, `validation-feedback-${stamp}-${outcome}.txt`);
  writeFileSync(file, body, "utf8");
  return file;
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const startedAt = new Date();
  const lines: string[] = [];
  const log = (s = ""): void => {
    console.log(s);
    lines.push(s);
  };

  log("================================================================");
  log(" HMRC Test Fraud Prevention Headers — validation-feedback report");
  log("================================================================");
  log(`Run at:    ${startedAt.toISOString()}`);
  log(`Base URL:  ${BASE_URL}`);
  log(`Client ID: ${maskClientId(CLIENT_ID)}`);
  log("");
  log(
    "Background: HMRC support ref 2026-XMS975 (Nathan Watson, 23 Mar 2026):\n" +
      '  "In the Test Fraud Prevention Headers API, use the\n' +
      '   validation-feedback endpoint. You\'ll get detailed feedback\n' +
      '   on the last request made to each endpoint of a supported API.\n' +
      '   You need to correct all issues before we can review your\n' +
      '   request again."'
  );
  log("");

  log("Step 1: Obtain application access token (client_credentials)…");
  let token: string;
  try {
    token = await getApplicationToken();
    log(`  OK — token acquired (${token.length} chars).`);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    log(`  FAIL — ${msg}`);
    log("");
    log("Cannot continue without an access token. Aborting.");
    log("See scripts/NOTES-hmrc-validation.md for OAuth scope alternatives.");
    const reportFile = writeReport(startedAt, lines.join("\n") + "\n", "FAIL");
    log("");
    log(`Report file: ${reportFile}`);
    process.exit(2);
  }
  log("");

  log("Step 2: Query validation-feedback for each flagged API…");
  log("");

  const results: FeedbackResult[] = [];
  let failures = 0;
  let indeterminate = 0;

  for (const api of FLAGGED_APIS) {
    log(`---- ${api.label} ----`);
    log(`  context: ${api.apiContext}   version: ${api.apiVersion}`);
    try {
      const r = await fetchFeedback(token, api);
      results.push(r);
      log(`  URL:     ${r.url}`);
      log(`  HTTP:    ${r.status}${r.ok ? " OK" : ""}`);
      if (r.correlationId) log(`  ReqID:   ${r.correlationId}`);
      log(`  Body:`);
      log(indent(pretty(r.body), "    "));
      log(`  RESULT:  ${r.classification}${r.reason ? "  — " + r.reason : ""}`);
      if (r.classification === "FAIL") failures += 1;
      else if (r.classification === "INDETERMINATE") indeterminate += 1;
    } catch (err) {
      failures += 1;
      const msg = err instanceof Error ? err.message : String(err);
      log(`  ERROR:   ${msg}`);
      log(`  RESULT:  FAIL`);
    }
    log("");
  }

  log("---- Summary ----");
  log(`APIs checked: ${FLAGGED_APIS.length}`);
  log(`Passes:       ${FLAGGED_APIS.length - failures - indeterminate}`);
  log(`Failures:     ${failures}`);
  log(`Indeterm.:    ${indeterminate}`);
  log("");
  log(
    "Additional issue raised by Nathan (UTR vs CRN):\n" +
      "  The Unique Taxpayer Reference on the Terms of Use submission is\n" +
      "  '17070693' (8 digits) which appears to be a Company Registration\n" +
      "  Number, not a UTR (10 digits). This needs correcting on the HMRC\n" +
      "  Developer Hub before re-applying for production access — to be\n" +
      "  done manually. See scripts/NOTES-hmrc-validation.md."
  );
  log("");

  const overall: "PASS" | "FAIL" | "INDETERMINATE" =
    failures > 0 ? "FAIL" : indeterminate > 0 ? "INDETERMINATE" : "PASS";
  const reportFile = writeReport(startedAt, lines.join("\n") + "\n", overall);
  log(`Report file: ${reportFile}`);

  if (failures > 0) process.exit(1);
  if (indeterminate > 0) process.exit(1); // treat indeterminate as not-yet-passing
}

main().catch((err) => {
  console.error("Unhandled error:", err);
  process.exit(2);
});
