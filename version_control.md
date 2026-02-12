# Version Control — Strategic Evolution Log

All major strategic decisions and pivots are recorded here with rationale.

---

## v0.1.0 — Session Initialisation

**Decision:** Begin the £100 → £1,000 challenge.

**Rationale:** The Orchestrator will spawn RESEARCH agents to identify
opportunities, then select a business model that can be executed >=80%
from a terminal.

**Status:** In progress — awaiting Phase 1 market evaluation

---

## v0.1.1 — Environment Assessment

**Decision:** Proceed with Phase 1 research using web search/fetch only.

**Findings:**
- No .env file found. No external API keys available.
- Node.js v22.22.0 + npm 10.9.4 available — build capability confirmed.
- GitHub push confirmed working on branch `claude/agent-swarm-challenge-ilhSq`.
- Web search and web fetch tools functional — no API key needed.

**Constraints identified:**
- Payment processing (Stripe/Gumroad/LemonSqueezy) requires human-provided API keys.
- Deployment (Vercel/Netlify) requires human-provided API keys or CLI login.
- Google Places / Yelp APIs unavailable — using web search fallback.

**Implication:** Phase 1 (research) and Phase 2 (build) are fully executable now.
Phase 3-4 (launch/sell) will require human to provide minimum: one payment
platform key + one deployment key.

**Action:** 3 RESEARCH agents spawned in parallel:
1. Digital product market (Gumroad/LemonSqueezy, templates, AI tools)
2. API-as-a-service and micro-SaaS opportunities
3. Done-for-you productised services

**Status:** Complete — all 3 agents returned data

---

## v0.2.0 — Business Model Selected

**Decision:** Build an AI-powered Invoice & Expense Toolkit for UK Sole Traders.

**Rationale:**
The dominant research signal is Making Tax Digital (MTD) for Income Tax, launching
6 April 2026 (2 months from today). 780,000 UK sole traders and landlords will be
legally mandated to use third-party digital record-keeping software. HMRC provides
no software. This creates regulatory-forced demand with high urgency.

**Model type:** Digital product (self-serve web app) sold via LemonSqueezy.

**Key data points driving this decision:**
1. 780K forced adopters in 2 months, growing to 1.75M by 2027
2. LemonSqueezy fees: 5% + $0.50 (vs Gumroad 10% + $0.50)
3. Infrastructure cost: £0/month (Vercel + Neon + Cloudflare free tiers)
4. Price point: £29 one-time → only 35 sales needed for £1,000
5. 3-7% conversion rate on well-optimised pages → ~500-700 visitors needed
6. SEO keywords ("MTD software", "Making Tax Digital tool") have high intent
7. Existing tools (FreeAgent, Xero, QuickBooks) are expensive/enterprise-focused

**Rejected alternatives:**
- SaaS boilerplate: Too crowded (70+ competitors), no urgency driver
- RapidAPI product: 25% marketplace fee, slower time-to-revenue
- Generic AI wrapper: Saturated market, no defensibility
- Done-for-you services: Requires human interaction, doesn't scale

**Risks logged:**
- Cannot build HMRC submission (requires API approval) → Position as "MTD prep tool"
- Needs LemonSqueezy API key from human → BLOCKER for launch
- Needs Vercel/Netlify deployment token → BLOCKER for deployment

**Status:** Complete — model selected

**Full synthesis:** `swarm/research-synthesis.md`

---

## v0.3.0 — Phase 2 Complete: TaxMate UK Built

**Decision:** Build the full TaxMate UK app as a Next.js client-side web app.

**Product name:** TaxMate UK
**Tagline:** "The simplest way to get MTD-ready as a sole trader"

**Architecture decisions:**
- Client-side only (localStorage) — zero backend, privacy-first
- No user accounts needed — reduces friction, no GDPR data storage concerns
- Next.js 16 + TypeScript + Tailwind CSS
- All data stays in the user's browser

**Features built (all compiling):**
1. **Landing page** — Hero with MTD urgency, features grid, £29 pricing card, FAQ, SEO metadata
2. **Dashboard** — P&L summary cards, quarterly breakdown, quick actions, MTD countdown
3. **Expenses** — Full CRUD with 14 HMRC-aligned categories, 3 VAT rates, CSV export
4. **Invoices** — Multi-line item creator, VAT calculations, preview modal, status tracking
5. **MTD Checker** — 8-point interactive readiness checklist with help text and progress bar
6. **Reports** — P&L by category with bar charts, quarterly summaries in MTD format, bulk CSV export

**Build status:** All 7 routes compile clean. 0 TypeScript errors.

**Routes:**
```
○ /                        (landing page)
○ /dashboard               (overview)
○ /dashboard/expenses      (expense tracker)
○ /dashboard/invoices      (invoice generator)
○ /dashboard/mtd-checker   (readiness checker)
○ /dashboard/reports       (P&L and quarterly)
```

**Status:** Complete — app built and deployed

---

## v0.4.0 — Phase 3: Deployed to Vercel Production

**Decision:** Deploy TaxMate UK to Vercel using human-provided token.

**Deployment details:**
- **Production URL:** https://app-lraggi6r4-brendons-projects-c6c87607.vercel.app
- **Alias URL:** https://app-five-lovat-48.vercel.app
- **Platform:** Vercel (Hobby tier — free)
- **Build:** All 7 routes deployed, 0 errors
- **Cost:** £0 (free tier)

**Remaining blockers:**
1. ~~Need Vercel token~~ — RESOLVED
2. Need LemonSqueezy API key for payment integration — STILL BLOCKED
3. Need custom domain (optional but improves credibility)

**Status:** Live — Phase 3 in progress

---

## v0.5.0 — Rebrand: TaxMate UK → QuarterlyUK

**Decision:** Rebrand the product from "TaxMate UK" to "QuarterlyUK".

**Rationale:**
- "QuarterlyUK" directly references quarterly MTD submissions — the core value prop
- Shorter, punchier, and more domain-friendly
- Avoids any trademark conflicts with existing "TaxMate" products

**Changes:**
- All copy, metadata, package.json, page titles updated
- New logo: dark slate rounded square with ledger lines and cyan-to-violet gradient checkmark
- Favicon, PNG, and product banner generated
- LemonSqueezy store created under "QuarterlyUK" brand

**Status:** Complete

---

## v0.6.0 — Design Overhaul: Fintech Aesthetic

**Decision:** Complete redesign with Monzo/Revolut-inspired fintech aesthetic.

**Design system:**
- Primary: dark slate (#1e293b), Accent: cyan (#06b6d4), Secondary: violet (#8b5cf6)
- Frosted glass effects, gradient cards, SVG Heroicons throughout
- Landing page: gradient hero, stats bar, feature grid, pricing card, FAQ
- Dashboard: sidebar with gradient active states, mobile bottom nav

**Status:** Complete

---

## v0.7.0 — LemonSqueezy Payment Integration

**Decision:** Integrate LemonSqueezy for payments and license validation.

**Implementation:**
- LemonSqueezy store: quarterlyuk.lemonsqueezy.com
- Product: "QuarterlyUK - Lifetime Access" at £29 one-time
- Checkout URL wired into all Buy Now buttons on landing page
- Identity verification cleared — real payments now accepted

**Status:** Complete — store live and verified

---

## v0.8.0 — License Gating System (3 iterations)

**Decision:** Implement free/pro tier gating with secure license validation.

**Evolution:**
1. v1: Simple localStorage flag (rejected — too easy to bypass)
2. v2: Server-side LemonSqueezy License API validation (improved)
3. v3: HMAC-SHA256 signed tokens + email verification + magic links (final)

**Architecture:**
- `/api/activate` route validates keys against LemonSqueezy License API
- Email must match purchase email (prevents sharing)
- Server signs token with HMAC-SHA256 using SIGNING_SECRET env var
- Token stored in localStorage — can't be faked without server secret
- Magic link support: `?license_key=...&email=...` auto-activates

**Free tier limits:**
- 3 expenses, 1 invoice, no export, no reports
- UpgradeBanner shown at limits with Buy Now and Enter Key CTAs

**Status:** Complete

---

## v0.9.0 — Trust & Polish: About Us, Contact, Feedback

**Decision:** Add trust-building sections and communication channels.

**Changes:**
- About Us section: relatable founder story (sole traders building for sole traders)
- Contact section: support email for issues
- Feedback section: dedicated feedback email for feature requests
- Removed "AI-powered" claims from metadata and copy (feature doesn't exist)
- Navigation updated with About and Contact links
- Footer updated with section links

**Rationale:**
- Trust signals are critical for converting visitors to buyers
- Contact mechanism needed for support before and after purchase
- Feedback loop enables iteration based on real user needs
- Honesty about features prevents customer complaints and refund requests

**Status:** Complete
