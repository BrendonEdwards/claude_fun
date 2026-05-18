# NOTES — HMRC validation-feedback script

Open items, assumptions, and flags from the build of
`hmrc-validate-headers.ts`. Resolve before relying on the report as
evidence to HMRC.

## 1. Branch vs deploy mismatch (HIGH PRIORITY)

The orchestrator update said end-to-end tests against the
`feat/hmrc-pro-tier` Vercel preview returned 200 for the three flagged
APIs. **However**, the fraud-prevention headers fix is on a different
branch:

- `feat/hmrc-pro-tier` HEAD: `575cd74` — has only 9 fraud headers
  (`Gov-Client-Connection-Method`, `Gov-Client-User-IDs`,
  `Gov-Client-Timezone`, `Gov-Client-Screens`,
  `Gov-Client-Window-Size`, `Gov-Client-Browser-JS-User-Agent`,
  `Gov-Vendor-Version`, `Gov-Vendor-License-IDs`,
  `Gov-Vendor-Product-Name`, plus optional Browser-Plugins / Device-ID)
- `claude/agent-swarm-challenge-ilhSq` HEAD: `5c327e0` — adds the
  ~10 missing headers Nathan asked for (`Gov-Client-Public-IP`,
  `Gov-Client-Public-IP-Timestamp`, `Gov-Client-Public-Port`,
  `Gov-Client-Local-IPs`, `Gov-Client-Local-IPs-Timestamp`,
  `Gov-Client-Browser-Do-Not-Track`, `Gov-Client-Device-ID` (SHA-256),
  `Gov-Vendor-Public-IP`, `Gov-Vendor-Forwarded`,
  `Gov-Client-Browser-Plugins` made mandatory).

**HMRC returning HTTP 200 does NOT mean the headers were valid** — the
data APIs accept the call and record the headers; the validator API is
where the verdict lives. If the preview actually built from
`feat/hmrc-pro-tier` rather than the branch with `5c327e0`, the
validation-feedback report will show MISSING_HEADER /
INVALID_HEADER_VALUE errors for almost every Gov-Client / Gov-Vendor
field the fix added.

**Action before relying on the report:**
1. Confirm which branch Vercel deployed for the test calls — check the
   Vercel dashboard for the preview's commit SHA.
2. If it was `575cd74` (old headers), redeploy the branch containing
   `5c327e0` and re-run the end-to-end flow through the dashboard
   (HMRC Connect → Obligations → Submit). Only then run this script.
3. Either merge `5c327e0`'s changes into `feat/hmrc-pro-tier` or rebuild
   the preview from `claude/agent-swarm-challenge-ilhSq`. Best path is
   probably a clean PR to bring just the `lib/hmrc/fraud-headers.ts`
   diff into `feat/hmrc-pro-tier`.

## 2. validation-feedback endpoint path (UNCONFIRMED)

HMRC's docs at
`https://developer.service.hmrc.gov.uk/api-documentation/docs/api/service/txm-fph-validator-api/1.0`
return HTTP 403 to any non-browser request from this environment, so
the OpenAPI spec could not be inspected directly.

The script uses:

```
GET /test/fraud-prevention-headers/validation-feedback
    ?api-context=<context>&api-version=<version>
Accept: application/vnd.hmrc.1.0+json
```

This is the most likely shape based on:
- The sibling `validate` endpoint at
  `POST /test/fraud-prevention-headers/validate`
- HMRC's standard pattern of using `Accept: application/vnd.hmrc.<v>+json`
- Nathan's wording ("the last request made to each endpoint of a
  supported API") implying a query for one API at a time

**If HMRC returns 404**, try these in order:
1. `GET /test/fraud-prevention-headers/validation-feedback` (no params,
   maybe it returns all monitored APIs in one shot).
2. `GET /test/fraud-prevention-headers/validation-feedback/<api-context>/<api-version>` (path params instead of query).
3. `POST /test/fraud-prevention-headers/validation-feedback` with a JSON
   body `{"apiContext": "...", "apiVersion": "..."}`.

Confirm with HMRC SDST (`SDSTeam@hmrc.gov.uk`) or via the docs in a
browser if none of those work.

## 3. OAuth scope (UNCONFIRMED)

The script requests scope `read:transactions-monitoring` against the
sandbox `/oauth/token` with `grant_type=client_credentials`. This name
is consistent with HMRC's TxM (Transactions Monitoring) family of
internal APIs, which the FPH validator sits under, but it has not been
verified.

**If HMRC returns 401/403 from the OAuth call or the feedback call due
to scope**, try:
1. `write:transactions-monitoring`
2. `read:fraud-prevention-headers`
3. No scope at all (some HMRC validator endpoints are open / no-auth)
4. Check whether the application needs to be *subscribed* to the
   `txm-fph-validator-api` in the Developer Hub UI (it is a separate
   subscription from VAT MTD / ITSA MTD APIs).

## 4. UTR vs CRN on Terms of Use (MANUAL FIX)

Nathan also flagged that the reference submitted on the Developer Hub
Terms of Use was **`17070693`**, which is 8 digits and looks like a
Company Registration Number, not a 10-digit Unique Taxpayer Reference.

This is a manual fix on the Developer Hub:

1. Sign in at `https://developer.service.hmrc.gov.uk/`
2. Navigate to the application's Terms of Use page
3. Either update the field to the correct 10-digit UTR, OR reply to
   Nathan accepting his offer to record the CRN instead
4. Note the change in the email reply (he asked for confirmation
   either way)

The validation-feedback script does NOT touch this — it's purely a
data API issue. Flagging here because the production application
won't move forward until both are resolved.

## 5. Existing OAuth flow scopes (FYI)

The user-restricted flow in `app/src/lib/hmrc/client.ts` requests
`read:self-assessment write:self-assessment`. That is correct for the
MTD ITSA data APIs themselves. The validation-feedback endpoint is
*not* user-restricted — it's queried per application — so the script
uses its own client-credentials flow rather than borrowing the user's
access token.

## 6. Sandbox-only guard

The script refuses to run if `HMRC_BASE_URL` does not contain
`test-api`. This is intentional. The validation-feedback endpoint is a
sandbox feature only; pointing the script at production would either
fail or send the application's client credentials over an inappropriate
channel.
