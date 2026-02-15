# QuarterlyUK — Product Overview & Sales Deck Brief

## What Is QuarterlyUK?

QuarterlyUK is a web-based expense and invoice toolkit built specifically for UK sole traders preparing for Making Tax Digital (MTD). It helps users track business expenses, create professional invoices, and generate quarterly profit & loss summaries aligned with HMRC tax quarters — all from their browser with no signup, no account creation, and no data leaving their device.

**Live at:** https://quarterlyuk.com

---

## The Problem

### Making Tax Digital (MTD) for Income Tax

From **6 April 2026**, HMRC is requiring sole traders and landlords with qualifying income over £50,000 to:

- Keep **digital records** of all business income and expenses
- Submit **quarterly updates** to HMRC using compatible software
- File a final **End of Period Statement** and **Final Declaration** annually

This is not optional. It is law. The threshold drops to £30,000 from April 2027 and £20,000 from April 2028.

### Who Is Affected?

- **864,000** sole traders and landlords in the first wave (April 2026) — confirmed by HMRC's own press release (February 2026)
- A further **970,000** from April 2027
- Millions more from April 2028

### What Exists Today?

The current market is dominated by:

- **Xero, QuickBooks, FreeAgent** — subscription-based (£12–£36/month), designed for businesses with employees, payroll, and multi-user needs. Overkill for a one-person business.
- **HMRC's own tools** — HMRC does not provide free record-keeping software. Their MTD-compatible software list links to third-party paid products.
- **Spreadsheets** — Under MTD, manual spreadsheets alone are not sufficient. Digital record-keeping software is required.

### The Gap

There is no simple, affordable, one-time-payment tool built specifically for sole traders who just need to:
1. Log expenses in HMRC categories
2. Create occasional invoices
3. Export quarterly summaries for their accountant or bridging software

That's what QuarterlyUK does.

---

## The Product

### Core Features

| Feature | Description |
|---------|-------------|
| **Expense Tracking** | Log business expenses across 14 HMRC-aligned categories. VAT at 20%, 5%, or 0% is calculated automatically. |
| **Invoice Generator** | Create professional invoices with line items, VAT, client details. Track paid vs. outstanding. Mark paid auto-creates income entry. |
| **Quarterly P&L Summaries** | Profit and loss reports split by HMRC tax quarter (Q1: Apr–Jun, Q2: Jul–Sep, Q3: Oct–Dec, Q4: Jan–Mar). |
| **CSV Export** | Download expenses, invoices, and quarterly summaries as CSV files — ready for an accountant or HMRC bridging software. |
| **MTD Readiness Checker** | 8-point checklist so users know exactly where they stand before April 2026. Progress saved between sessions. |
| **Tax Estimate** | Estimates Income Tax and Class 4 NIC based on net profit, using current UK tax bands and the £12,570 personal allowance. |
| **Data Backup & Restore** | One-click JSON backup of all data. Restore from backup at any time. |
| **HMRC SA103F Alignment** | Expense categories and reporting structure aligned with the Self-Employment supplementary pages of the Self Assessment tax return. |

### Privacy-First Architecture

- **All data stored locally** in the user's browser (localStorage)
- **Nothing sent to any server** — no database, no analytics, no tracking
- **No signup or account creation** — users go straight to the dashboard
- The user owns their data completely. They can back it up, export it, or delete it at any time.

### Technology Stack

- **Next.js 16** (React, App Router)
- **TypeScript** with Tailwind CSS
- **Deployed on Vercel** (hobby tier, free hosting)
- **LemonSqueezy** for payment processing
- **No backend database** — pure client-side application

---

## Business Model

### Pricing: Founders License

| Tier | Price | Details |
|------|-------|---------|
| **Free** | £0 | 3 expenses, 1 invoice, no export, no reports — enough to try the product |
| **Founders License** | **£29 one-time** | Unlimited expenses & invoices, full export, reports, all future updates. Limited to first 100 users. |
| **Future: Annual Pass** | £29–49/year | After founders slots are filled, pricing moves to annual subscription aligned with MTD tax years. |

### Why One-Time Pricing Works (For Now)

- **Low barrier to entry** — £29 is less than two months of any competitor subscription
- **Founders scarcity** — "Only 100 available" creates urgency
- **Future flexibility** — founders get lifetime access; new users after the first 100 move to annual pricing, creating recurring revenue
- **£29 x 35 sales = £1,000+** — the initial target

### Revenue Target

- **Initial goal:** £1,000 profit from £100 investment (10x return)
- **Break-even:** 4 sales (covers domain + any marketing spend)
- **Target:** 35 sales at £29 = £1,015

### Unit Economics

| Metric | Value |
|--------|-------|
| Price per unit | £29 |
| LemonSqueezy fee (5% + 50p) | ~£1.95 |
| Net per sale | ~£27.05 |
| Hosting cost | £0 (Vercel hobby tier) |
| Domain cost | £8.27/year |
| Gross margin | ~93% |

---

## Market Opportunity

### Total Addressable Market (TAM)

- **864,000** sole traders affected from April 2026 (income > £50,000)
- **1.83 million** affected from April 2027 (income > £30,000)
- **4.2 million** total sole traders in the UK (ONS data)

### Competitive Positioning

| Competitor | Monthly Cost | Annual Cost | Built for Sole Traders? | One-Time Option? |
|-----------|-------------|-------------|------------------------|-----------------|
| Xero | £15–£36 | £180–£432 | No (SME focus) | No |
| QuickBooks | £12–£32 | £144–£384 | No (SME focus) | No |
| FreeAgent | £14–£32 | £168–£384 | Partially | No |
| **QuarterlyUK** | **—** | **—** | **Yes** | **£29 one-time** |

### Key Differentiators

1. **Price:** 85–95% cheaper than alternatives over a tax year
2. **Simplicity:** No signup, no onboarding flow, no 47-step setup. Open and start.
3. **Privacy:** Data never leaves the user's device. No cloud database. No data breach risk.
4. **Focus:** Built exclusively for sole traders. No payroll, no inventory, no multi-user, no features you don't need.
5. **Compliance alignment:** Categories match HMRC SA103F. Quarters match HMRC tax quarters.

---

## Go-To-Market Strategy

### Target Audience

- UK sole traders: freelancers, consultants, tutors, tradespeople, contractors, landlords
- Income £30,000–£150,000 (MTD threshold bracket)
- Currently using spreadsheets, paper records, or nothing
- Not willing to pay £15–£36/month for software with features they don't need

### Channels

| Channel | Approach | Cost |
|---------|----------|------|
| **Reddit** | Value-first posts in r/UKPersonalFinance, r/SelfEmployedUK, r/HMRC, r/Freelance_UK | Free |
| **Product Hunt** | Launch listing with demo | Free |
| **SEO/Content** | Landing page optimised for "MTD software sole traders", "Making Tax Digital 2026 software" | Free |
| **Accountant referrals** | Reach out to small accountancy practices who advise sole traders | Free |
| **Facebook Groups** | UK freelancer and sole trader groups (e.g., "Self Employed and Freelancers UK") | Free |
| **LinkedIn** | Posts targeting UK freelancer network | Free |
| **Directories** | SaaS directories, UK small business tool lists, HMRC compatible software list application | Free |

### Messaging Framework

**Hook:** "MTD is 7 weeks away. Are your records digital yet?"

**Problem:** "HMRC now requires quarterly digital updates. The big accounting tools cost £15–£36/month and are built for businesses with employees. You're one person."

**Solution:** "QuarterlyUK is a £29 toolkit that does three things: tracks your expenses in HMRC categories, creates invoices, and exports quarterly summaries. That's it. No signup, no subscription, no data sent anywhere."

**Proof:** "864,000 sole traders must comply by April 2026. QuarterlyUK is built for exactly this."

**CTA:** "Try it free — no signup needed. Or grab a Founders License for £29 before they're gone."

---

## What's Been Built

### Development Timeline

- **Concept to live product:** Built in approximately 1 week
- **Total investment:** £8.27 (domain only)
- **Hosting:** Free (Vercel hobby tier)
- **Payment processing:** LemonSqueezy (no upfront cost, 5% + 50p per transaction)

### Current State

- **Fully functional** web application at https://quarterlyuk.com
- **Custom domain** configured with SSL
- **Email forwarding** set up (hello@quarterlyuk.com, feedback@quarterlyuk.com)
- **Payment checkout** via LemonSqueezy
- **License gating** — free tier limited, Pro unlocks everything
- **Mobile responsive** — works on desktop, tablet, and phone
- **9 bugs found and fixed** through user testing
- **Promo code system** for beta testers

### Quality Assurance

The product has been through multiple rounds of testing including:
- Full functional testing of all features
- Bug reporting and fix verification (9 bugs identified, all resolved)
- Invoice number integrity testing
- Timezone edge case testing
- Browser caching verification
- Cross-device responsiveness checks

---

## Early Feedback

> "Brilliant! I want to use it. So much simpler than the spreadsheets I've been using for years."
> — Early tester

> "I don't know how you know to do all this... maybe your simpler method makes it more doable."
> — Early tester (comparing to complex accountant spreadsheets)

---

## The Opportunity for a Sales Partner

### Why This Is Interesting

1. **Regulatory deadline creates urgency** — MTD is not optional, it's law. April 2026 is imminent. Every sole trader over the threshold MUST have digital record-keeping software.

2. **Massive underserved market** — 864,000 people need a solution NOW. Most don't want or need Xero/QuickBooks.

3. **Product is built and live** — No vaporware. The product exists, works, and has been tested.

4. **93% gross margin** — £29 price, ~£1.95 payment processing fee, £0 hosting.

5. **Recurring revenue potential** — Founders License creates initial traction; annual pricing for subsequent users creates MRR.

6. **Scalable without infrastructure** — No servers, no database, no support burden from data issues (data is client-side).

7. **Low competition at this price point** — Nobody else offers a one-time £29 MTD preparation tool for sole traders.

### What a Sales Partner Could Do

- **Direct outreach** to accountancy practices (each accountant advises dozens of sole traders)
- **LinkedIn prospecting** targeting UK freelancers/consultants
- **Partnership deals** with coworking spaces, freelancer networks, trade associations
- **Affiliate/referral programme** (easy to set up via LemonSqueezy)
- **Content marketing** — LinkedIn posts, case studies, comparison content

### Revenue Share Model

Open to discussion. Options include:
- Commission per sale (e.g., 30–40% of £29)
- Revenue share on accounts they bring in
- Flat fee per qualified lead

---

## Summary

| Metric | Value |
|--------|-------|
| **Product** | QuarterlyUK — MTD expense & invoice toolkit |
| **Market** | 864,000 UK sole traders (growing to 4.2M) |
| **Price** | £29 one-time (Founders License) |
| **Investment to date** | £8.27 |
| **Gross margin** | ~93% |
| **Status** | Live at quarterlyuk.com |
| **Competition** | £15–36/month subscriptions (10–15x more expensive) |
| **Deadline pressure** | MTD mandatory from 6 April 2026 |
| **Break-even** | 4 sales |
| **Initial target** | 35 sales (£1,000) |

---

*QuarterlyUK — Tax prep, sorted. For UK sole traders.*
