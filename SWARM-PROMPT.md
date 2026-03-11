# QuarterlyUK — Session Bootstrap

Read this file first when starting a new session on this project.

## What is this?

QuarterlyUK is an MTD (Making Tax Digital) preparation and submission tool for UK sole traders. It's built as a Next.js web app with client-side localStorage for data and is live at **quarterlyuk.com**.

This project was built by an autonomous agent swarm as part of a "£100 → £1,000" challenge. See `CLAUDE.md` for governance rules.

## Current State (v1.0.0 in progress)

### Live (production branch: `claude/agent-swarm-challenge-ilhSq`)
- Full app: expenses, invoices, MTD checker, reports, dashboard, backup/restore
- LemonSqueezy subscription payments (£2.50/mo excl. VAT, £3.00/mo incl.)
- License gating with HMAC-SHA256 signed tokens
- Free tier: 3 expenses, 1 invoice. Pro tier: unlimited
- Deployed on Vercel (project: quarterlyuk, team: brendons-projects-c6c87607)
- Domain: quarterlyuk.com
- Vercel Root Directory: `app/`

### In Progress (v1.0.0 — HMRC Pro Tier)
- HMRC bridging software: direct MTD API submission
- Pro tier: £5.00/mo total (base £2.50 + Pro £2.50), 12-month commitment
- Next.js API routes for HMRC OAuth 2.0 (first server-side code)
- Fraud prevention headers utility
- Pro-gated UI: HMRC Connect, Submit Quarterly Update, View Obligations

## Key Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Swarm governance, agent roles, decision protocol |
| `SWARM-PROMPT.md` | This file — session bootstrap |
| `version_control.md` | Strategic evolution log (v0.1.0 → v1.0.0) |
| `ledger.md` | Financial ledger (£91.73 remaining of £100) |
| `swarm/agent-roles.md` | Agent role templates |
| `swarm/research-synthesis.md` | Market research findings |
| `swarm/hmrc-bridging-software-research.md` | HMRC API technical requirements |
| `app/` | Next.js app (Vercel root directory) |
| `app/src/app/page.tsx` | Landing page |
| `app/src/app/dashboard/` | Dashboard routes (expenses, invoices, reports, etc.) |
| `app/src/app/api/` | API routes (activate, hmrc/) |

## Tech Stack

- **Frontend:** Next.js (app router), TypeScript, Tailwind CSS
- **Data:** Client-side localStorage (no database)
- **Payments:** LemonSqueezy (quarterlyuk.lemonsqueezy.com)
- **Hosting:** Vercel (Hobby tier, free)
- **Domain:** quarterlyuk.com (via Vercel)
- **Backend:** Next.js API routes (for HMRC OAuth only)

## Pricing

| Tier | Price (excl. VAT) | Checkout (incl. VAT) | Features |
|------|-------------------|---------------------|----------|
| Base | £2.50/month | £3.00/month | Expenses, invoices, MTD checker, reports |
| Pro | £5.00/month | £6.00/month | Base + HMRC direct submission |

## Financials

- **Budget:** £100 initial capital
- **Spent:** £8.27 (domain)
- **Revenue:** £0 (no subscribers yet)
- **Target:** £1,000 profit

## Human Steps Required

These cannot be done by agents:
1. **HMRC Developer Hub registration** — requires Government Gateway login
2. **HMRC production approval** — respond to review emails (~10 working days)
3. **LemonSqueezy Pro product creation** — create £6/mo product in dashboard

## Quick Start for a New Session

1. Read this file (done)
2. Read `version_control.md` for strategic history
3. Read `CLAUDE.md` for governance rules
4. Check which task is next in `version_control.md` (look for "In progress" status)
5. For HMRC integration: read `swarm/hmrc-bridging-software-research.md`
6. The local clone is at `C:\dev\claude_fun`, production branch is `claude/agent-swarm-challenge-ilhSq`
