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
  taxYear: string; // e.g. "2025-26"
  periodStartDate: string; // e.g. "2025-04-06"
  periodEndDate: string; // e.g. "2025-07-05"
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
  method: "GET" | "POST" | "PUT",
  path: string,
  accessToken: string,
  fraudHeaders: Record<string, string>,
  body?: unknown,
  acceptVersion = "2.0"
): Promise<Response> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    Accept: `application/vnd.hmrc.${acceptVersion}+json`,
    "Content-Type": "application/json",
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
    `/obligations/details/${nino}/income-and-expenditure`,
    accessToken,
    fraudHeaders,
    undefined,
    "3.0"
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HMRC obligations fetch failed (${res.status}): ${err}`);
  }

  return res.json();
}

/**
 * Submit a quarterly update for self-employment.
 * Uses cumulative endpoint for 2025-26+, periodic endpoint for earlier years.
 */
export async function submitQuarterlyUpdate(
  nino: string,
  businessId: string,
  accessToken: string,
  fraudHeaders: Record<string, string>,
  update: QuarterlyUpdate
): Promise<{ status: number; body: unknown }> {
  const taxYear = update.taxYear || "2025-26";

  const payload = {
    periodDates: {
      periodStartDate: update.periodStartDate,
      periodEndDate: update.periodEndDate,
    },
    periodIncome: {
      turnover: update.turnover,
      other: 0,
    },
    periodExpenses: {
      consolidatedExpenses: update.costOfGoods + (update.otherExpenses || 0),
    },
  };

  // Tax year 2025-26 onwards uses cumulative PUT, older uses periodic POST
  const startYear = parseInt(taxYear.split("-")[0], 10);
  const isCumulative = startYear >= 2025;

  const path = isCumulative
    ? `/individuals/business/self-employment/${nino}/${businessId}/cumulative/${taxYear}`
    : `/individuals/business/self-employment/${nino}/${businessId}/period`;

  const res = await hmrcApiCall(
    isCumulative ? "PUT" : "POST",
    path,
    accessToken,
    fraudHeaders,
    payload,
    "5.0"
  );

  // 204 No Content means success for cumulative
  if (res.status === 204) {
    return { status: 204, body: { message: "Update accepted by HMRC." } };
  }

  const body = await res.json();
  return { status: res.status, body };
}

/**
 * Fetch business details to get the correct businessId for self-employment.
 */
export async function getBusinessDetails(
  nino: string,
  accessToken: string,
  fraudHeaders: Record<string, string>
): Promise<{ businessId: string; typeOfBusiness: string }[]> {
  const res = await hmrcApiCall(
    "GET",
    `/individuals/business/details/${nino}/list`,
    accessToken,
    fraudHeaders,
    undefined,
    "2.0"
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HMRC business details fetch failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.listOfBusinesses || [];
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
