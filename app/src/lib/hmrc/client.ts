/**
 * HMRC MTD API Client
 *
 * Handles OAuth 2.0 token exchange, refresh, and API calls to HMRC's
 * Making Tax Digital endpoints. Works against both sandbox and production.
 */

const HMRC_BASE_URL =
  process.env.HMRC_BASE_URL || "https://test-api.service.hmrc.gov.uk";
const HMRC_AUTH_URL =
  process.env.HMRC_AUTH_URL || "https://test-api.service.hmrc.gov.uk";
const HMRC_CLIENT_ID = process.env.HMRC_CLIENT_ID || "";
const HMRC_CLIENT_SECRET = process.env.HMRC_CLIENT_SECRET || "";
const HMRC_REDIRECT_URI =
  process.env.HMRC_REDIRECT_URI || "http://localhost:3000/api/hmrc/callback";

export interface HmrcTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export interface HmrcObligation {
  start: string;
  end: string;
  due: string;
  status: "O" | "F"; // Open or Fulfilled
  periodKey: string;
  received?: string;
}

export interface HmrcObligationsResponse {
  obligations: {
    typeOfBusiness: string;
    businessId: string;
    obligationDetails: HmrcObligation[];
  }[];
}

export interface QuarterlyUpdate {
  periodKey: string;
  turnover: number;
  costOfGoods: number;
  otherExpenses?: number;
}

/**
 * Build the HMRC OAuth authorization URL.
 * The user is redirected here to grant access.
 */
export function getAuthorizationUrl(state: string): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: HMRC_CLIENT_ID,
    scope: "read:self-assessment write:self-assessment",
    state,
    redirect_uri: HMRC_REDIRECT_URI,
  });
  return `${HMRC_AUTH_URL}/oauth/authorize?${params.toString()}`;
}

/**
 * Exchange an authorization code for access + refresh tokens.
 */
export async function exchangeCodeForTokens(
  code: string
): Promise<HmrcTokens> {
  const res = await fetch(`${HMRC_AUTH_URL}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      client_id: HMRC_CLIENT_ID,
      client_secret: HMRC_CLIENT_SECRET,
      redirect_uri: HMRC_REDIRECT_URI,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HMRC token exchange failed (${res.status}): ${err}`);
  }

  return res.json();
}

/**
 * Refresh an expired access token using a refresh token.
 */
export async function refreshAccessToken(
  refreshToken: string
): Promise<HmrcTokens> {
  const res = await fetch(`${HMRC_AUTH_URL}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: HMRC_CLIENT_ID,
      client_secret: HMRC_CLIENT_SECRET,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HMRC token refresh failed (${res.status}): ${err}`);
  }

  return res.json();
}

/**
 * Make an authenticated API call to HMRC.
 */
export async function hmrcApiCall(
  method: "GET" | "POST",
  path: string,
  accessToken: string,
  fraudHeaders: Record<string, string>,
  body?: unknown
): Promise<Response> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/vnd.hmrc.2.0+json",
    "Content-Type": "application/json",
    "Gov-Vendor-Version": `QuarterlyUK=1.0.0`,
    ...fraudHeaders,
  };

  const res = await fetch(`${HMRC_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  return res;
}

/**
 * Fetch Self-Assessment obligations for a given NINO.
 */
export async function getObligations(
  nino: string,
  accessToken: string,
  fraudHeaders: Record<string, string>
): Promise<HmrcObligationsResponse> {
  const res = await hmrcApiCall(
    "GET",
    `/individuals/business/self-assessment/${nino}/obligations?status=O`,
    accessToken,
    fraudHeaders
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HMRC obligations fetch failed (${res.status}): ${err}`);
  }

  return res.json();
}

/**
 * Submit a quarterly periodic update for self-employment.
 */
export async function submitQuarterlyUpdate(
  nino: string,
  businessId: string,
  accessToken: string,
  fraudHeaders: Record<string, string>,
  update: QuarterlyUpdate
): Promise<{ status: number; body: unknown }> {
  const payload = {
    periodDates: { periodStartDate: "", periodEndDate: "" }, // filled by caller
    periodIncome: {
      turnover: update.turnover,
      other: 0,
    },
    periodExpenses: {
      costOfGoods: {
        amount: update.costOfGoods,
      },
      other: {
        amount: update.otherExpenses || 0,
      },
    },
  };

  const res = await hmrcApiCall(
    "POST",
    `/individuals/business/self-employment/${nino}/${businessId}/periodic-summaries`,
    accessToken,
    fraudHeaders,
    payload
  );

  const body = await res.json();
  return { status: res.status, body };
}

/**
 * Create a test user in the HMRC sandbox (no auth needed).
 */
export async function createTestUser(): Promise<unknown> {
  const res = await fetch(
    `${HMRC_BASE_URL}/create-test-user/individuals`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.hmrc.1.0+json",
      },
      body: JSON.stringify({
        serviceNames: [
          "self-assessment",
          "mtd-income-tax",
          "national-insurance",
        ],
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HMRC test user creation failed (${res.status}): ${err}`);
  }

  return res.json();
}
