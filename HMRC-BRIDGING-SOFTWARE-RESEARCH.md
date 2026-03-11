# HMRC Bridging Software: What We'd Need to Do

**Research Date:** 6 March 2026

---

## TL;DR

To submit tax returns to HMRC as proper bridging software, we'd need to:
1. Register (free) on the HMRC Developer Hub
2. Build OAuth 2.0 authentication + mandatory fraud prevention headers
3. Implement the required MTD API endpoints (VAT and/or Income Tax)
4. Pass sandbox testing and complete HMRC's Production Approvals Checklist
5. Get production credentials, make a live submission, then get listed on HMRC's Software Choices page

**Cost: £0 for HMRC access. Main cost is development time.**

---

## 1. What "Bridging Software" Means

Bridging software provides the **digital link** between a taxpayer's existing records (spreadsheets, older desktop packages) and HMRC's systems. It does NOT create or maintain digital records — it extracts data from where the user already keeps it and submits to HMRC via their APIs.

Key characteristics:
- Handles **submissions only**, not full digital record-keeping
- Users keep records in spreadsheets (which qualifies as digital) and the software reads from them — no manual re-keying allowed
- Connects to HMRC via their MTD APIs for quarterly updates and returns
- Simpler than full accounting software — a much more achievable product

### Bridging Software vs Full Accounting Software

| Aspect | Bridging Software | Full Accounting Software |
|--------|------------------|------------------------|
| Record-keeping | Does NOT store records | Full ledger and transactions |
| Data source | Pulls from external spreadsheets/systems | Built-in |
| Bank feeds | No | Usually yes |
| Complexity to build | **Low-medium** | Very high |
| HMRC API requirements | Same | Same |
| Market position | Budget/simple option | Premium/comprehensive |

---

## 2. The HMRC Registration & Approval Process

HMRC uses "compatible" or "recognised" — they don't formally "approve" or endorse products. The process is:

### Step-by-step:

1. **Register on HMRC Developer Hub** at `developer.service.hmrc.gov.uk` — **free, no fees**
2. **Create a sandbox application** and begin development against sandbox APIs
3. **Create test users** via the Create Test User API
4. **Develop software** against relevant APIs, implementing all required endpoints
5. **Register for production** by creating a Production application in your Dev Hub account
6. **Complete sandbox testing** of all required endpoints, including valid fraud prevention headers
7. **Complete the Production Approvals Checklist** — HMRC issues this; details what your software does and which endpoints you've tested
8. **HMRC reviews** your testing evidence and checklist
9. **Production access granted** if satisfactory
10. **Make a live submission** with a real registration number
11. **Request listing on the Software Choices page** — only after a live submission succeeds

**Contact:** SDSTeam@hmrc.gov.uk for vendor support

---

## 3. Technical Requirements

### 3a. Authentication — OAuth 2.0

- HMRC issues a **Client ID** and **Client Secret** on registration
- User grants authority via OAuth flow → your app gets an **authorization code**
- Exchange for an **access token** (valid 4 hours) and **refresh token** (valid 18 months)
- After 18 months the user must re-authorise
- Standard OAuth 2.0 authorization code grant flow

### 3b. API Architecture

- RESTful APIs over HTTPS
- JSON request/response format
- Three endpoint types:
  - **User-restricted** (requires OAuth) — most MTD endpoints
  - **Application-restricted** (server credentials only)
  - **Open**

### 3c. Fraud Prevention Headers (MANDATORY BY LAW)

Required on **every API call**. Key headers include:

| Header | Description |
|--------|-------------|
| `Gov-Client-Connection-Method` | How the client connects (web, desktop, mobile) |
| `Gov-Client-Timezone` | Client's timezone |
| `Gov-Client-User-Agent` | Client OS/device info |
| `Gov-Vendor-Version` | Your software version |
| `Gov-Client-MAC-Addresses` | Client MAC addresses |
| Additional headers | Vary by connection architecture |

HMRC **must see evidence** of these being sent accurately before granting production access. Full spec at `developer.service.hmrc.gov.uk/guides/fraud-prevention/`.

### 3d. MTD for VAT — Required Endpoints

**Minimum required:**
- `GET /organisations/vat/{vrn}/obligations` — Retrieve VAT obligations
- `POST /organisations/vat/{vrn}/returns` — Submit VAT return for period

**Optional but recommended:** Retrieve liabilities, payments, penalties, customer info, view past returns.

### 3e. MTD for Income Tax (ITSA) — Required Endpoints

**Stage 1 — In-year (quarterly updates):**
- Business Details API
- Obligations API
- Self-Employment Business / Property Business APIs (periodic summaries)
- For 2025-26 onwards: new cumulative period summary endpoints

**Stage 2 — End-of-year:**
- Individual Calculations API (trigger/retrieve tax calculations, final declaration)
- Self-Employment / Property annual submission endpoints
- Self Assessment Accounts API

The full HMRC API catalogue has **31+ MTD-related APIs**. Bridging software only needs the APIs relevant to what you're bridging (VAT, ITSA, or both).

### 3f. API Versioning

- VAT API: currently v1.0
- Income Tax APIs: v6.0 for tax years up to 2025-26; v7.0 required for 2026-27 onwards
- Parameter mappings available on [HMRC's GitHub](https://github.com/hmrc/income-tax-mtd-changelog)

---

## 4. Legal & Regulatory Requirements

- **Fraud prevention headers are a legal requirement** under UK tax law — non-compliance = API rejection
- **UK GDPR compliance** — handling taxpayer data requires data processing agreements, privacy notices, data minimisation, right to erasure, etc.
- **PECR compliance** — if doing electronic marketing to potential users
- **No FCA-style licensing** — the Developer Hub recognition process is the regulatory gateway
- Taxpayer remains legally responsible for data submitted, not the software vendor
- HMRC has legal basis to collect audit data via fraud prevention headers

---

## 5. Sandbox & Testing Requirements

- **Free sandbox environment** at the Developer Hub for all APIs
- **Create Test User API** generates test individuals/organisations
- `Gov-Test-Scenario` header triggers specific test scenarios (errors, edge cases)
- Some APIs support **stateful/dynamic testing**
- Must test **all endpoints** within minimum functionality standards
- Must demonstrate **valid fraud prevention headers** in testing
- HMRC reviews testing evidence before granting production access

---

## 6. Ongoing Compliance

- Maintain fraud prevention header accuracy (continuously monitored by HMRC)
- Track API version changes — HMRC deprecates old versions; must migrate
- Respond to HMRC communications about changes/updates
- Maintain Software Choices listing (keep details current)
- Monitor the [MTD ITSA changelog on GitHub](https://github.com/hmrc/income-tax-mtd-changelog)

---

## 7. Costs

| Item | Cost |
|------|------|
| HMRC Developer Hub registration | **Free** |
| Sandbox testing | **Free** |
| Production access | **Free** |
| Software Choices listing | **Free** |
| Development time | Main cost — building OAuth, APIs, fraud headers |
| Hosting | Minimal — API relay service |
| Domain + SSL | ~£10-20/year |

**Total HMRC cost: £0.** The only costs are development and hosting.

---

## 8. Feasibility Assessment for This Project

### Why This Is a Strong Opportunity

1. **Low barrier to entry** — HMRC access is free, no licensing fees
2. **Bridging software is simpler** than full accounting software — we're just relaying data
3. **Huge addressable market** — millions of UK businesses/sole traders need MTD compliance
4. **Recurring revenue** — annual subscriptions for ongoing MTD submissions
5. **Spreadsheet users are underserved** — many still use Excel and need a bridge

### What We'd Build (Minimum Viable Product)

1. **Web app** that connects to user's spreadsheets (upload or Google Sheets link)
2. **OAuth flow** to authenticate with HMRC on user's behalf
3. **Data mapping UI** — user maps their spreadsheet columns to HMRC fields
4. **Submission engine** — sends data to HMRC MTD API with fraud prevention headers
5. **Confirmation/receipt** — shows HMRC's response

### Technical Stack (fits our existing setup)

- Node.js + TypeScript (already our stack)
- OAuth 2.0 library for HMRC auth
- Simple web frontend (React or plain HTML)
- Deploy to Vercel/Netlify (already planned)

### Timeline Estimate

| Phase | Work |
|-------|------|
| Week 1 | HMRC Developer Hub registration + sandbox setup |
| Week 2-3 | Build OAuth flow + fraud prevention headers |
| Week 3-4 | Build VAT submission endpoint integration |
| Week 4-5 | Build spreadsheet parsing + data mapping |
| Week 5-6 | Sandbox testing + Production Approvals Checklist |
| Week 6-7 | Production access + first live submission |
| Week 7-8 | UI polish + Software Choices listing |

### Revenue Model

- **Free tier:** 1 VAT return/quarter
- **Pro:** £5-10/month — unlimited submissions, saved mappings
- **Business:** £15-25/month — multiple VAT numbers, team access

At £10/month, we'd need ~100 subscribers to hit £1,000/month recurring revenue.

---

## 9. Key Links

- HMRC Developer Hub: `developer.service.hmrc.gov.uk`
- Fraud Prevention Guide: `developer.service.hmrc.gov.uk/guides/fraud-prevention/`
- MTD ITSA Changelog: `github.com/hmrc/income-tax-mtd-changelog`
- Software Choices: `gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-vat`
- Vendor Support: SDSTeam@hmrc.gov.uk

---

## 10. Next Steps If We Proceed

1. Register on HMRC Developer Hub
2. Create sandbox application
3. Prototype OAuth + single VAT submission in sandbox
4. Validate with a test user before building full product
5. Apply for production access
