# scripts/

Utility scripts used outside the Next.js app runtime.

## hmrc-validate-headers.ts

Calls the HMRC Test Fraud Prevention Headers API `validation-feedback`
endpoint for each of the three APIs Nathan Watson flagged on
2026-03-23 (HMRC support ref **2026-XMS975**):

1. Business Details (MTD)
2. Obligations (MTD)
3. Self Employment Business (MTD)

The validation-feedback endpoint returns HMRC's own assessment of the
fraud-prevention headers on the *last* sandbox request your application
made to each API. This is the gating evidence HMRC requires before they
will re-review the production access request.

### Prerequisites

1. Sandbox calls already made. The validation-feedback endpoint only
   returns useful data if your application has hit the three APIs in the
   past 30 days from sandbox **with the latest fraud-prevention headers
   deployed**. If your sandbox preview is still running the old headers,
   redeploy first and re-run an end-to-end flow against the preview
   before running this script. See `NOTES-hmrc-validation.md` for the
   branch/deploy caveat.
2. `HMRC_CLIENT_ID` and `HMRC_CLIENT_SECRET` available, either in
   environment or in `.env.local` at the repo root or under `app/`.

### Run

Node 22+ has TypeScript stripping built in:

```bash
node --experimental-strip-types scripts/hmrc-validate-headers.ts
```

Or with `tsx`:

```bash
npx tsx scripts/hmrc-validate-headers.ts
```

### Output

- A copy-pastable report is printed to stdout.
- A timestamped copy is saved under `scripts/output/` as
  `validation-feedback-<iso-timestamp>-(PASS|FAIL|INDETERMINATE).txt`,
  which can be attached to the reply to HMRC.

### Exit codes

| Code | Meaning |
| ---- | ------- |
| 0    | All three APIs returned a clean validation result.        |
| 1    | One or more APIs failed validation or were indeterminate. |
| 2    | Configuration error (missing creds, non-sandbox URL, network failure on OAuth). |

### Caveats

The exact path, query params, and OAuth scope for the
validation-feedback endpoint could not be confirmed from this
environment — HMRC's docs site returns 403 to non-browser requests. The
script uses the most likely values based on naming convention and
existing HMRC URL patterns; if anything is off, alternatives are listed
in `NOTES-hmrc-validation.md`.
