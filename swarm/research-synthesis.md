# Research Synthesis — Phase 1 Complete

**Date:** 6 February 2026
**Author:** Lead Orchestrator
**Agents Consulted:** RESEARCH x3

---

## Key Findings

### 1. Platform Economics
| Platform | Fee | Net on £40 sale |
|---|---|---|
| LemonSqueezy | 5% + $0.50 | ~£37.40 (93.5%) |
| Gumroad | 10% + $0.50 | ~£34.10 (85.3%) |
| Polar.sh | 4% + $0.40 | ~£37.80 (94.5%) |

**Decision:** Use LemonSqueezy (or Polar.sh) — significantly cheaper than Gumroad.

### 2. Infrastructure
A production-capable stack can be operated at **£0/month**:
- Vercel Hobby: 100GB bandwidth, 150K serverless invocations
- Neon Free: 500MB Postgres, scale-to-zero (no auto-pause deletion)
- Cloudflare Workers Free: 100K requests/day

### 3. Dominant Market Signal: Making Tax Digital (MTD)
- **Launch date:** 6 April 2026 (2 months away)
- **Forced adopters:** 780,000 sole traders/landlords (Phase 1)
- **HMRC software:** None provided — must buy third-party
- **Phase 2 (Apr 2027):** Additional 970,000 people
- **Total addressable:** 1.75 million by 2027
- Only 9% of UK firms currently use AI

### 4. UK SME Pain Points
- 85% report rising costs
- 41% experience late payments
- £600M/year wasted on unused SaaS
- Average payment time: 38 days
- Manual invoice processing: 20.8 days average

### 5. Digital Product Pricing
- Sweet spot for tools: £27-£97
- SaaS boilerplates: £149-£299 (saturated)
- AI micro-SaaS: £19-£49/month
- Conversion rate (paid): 3-7% for well-optimised pages

### 6. Revenue Path to £1,000

**Original (one-time, superseded):**
| Price | Units Needed | Visitors Needed (5% CR) |
|---|---|---|
| £29 | 35 | 700 |
| £39 | 26 | 520 |
| £49 | 21 | 420 |

**Current (subscription, updated 10 March 2026):**
| Tier | Monthly | Subscribers × Months to £1k |
|---|---|---|
| Base (£2.50/mo) | £2.50 | 34 × 12 = 408 sub-months |
| Pro (£5.00/mo) | £5.00 | 17 × 12 = 204 sub-months |
| Mixed (20 base + 10 Pro) | £100/mo | 10 months |

---

## Business Model Selected

**AI-Powered Invoice & Expense Toolkit for UK Sole Traders**

- **Type:** Digital product (web app) — Model #2 (Self-serve SaaS) / Model #1 (Digital product via API storefront)
- **Target:** UK sole traders preparing for MTD (780K+ forced adopters)
- **Price:** £2.50/month (base), £5.00/month (Pro with HMRC submission)
- **Platform:** LemonSqueezy (5% + $0.50 fees)
- **Infrastructure:** Vercel + Neon + Cloudflare (£0/month)
- **Build:** Next.js + TypeScript + AI (receipt categorisation, invoice generation)

### Features
1. AI-powered receipt/expense categoriser (photo → category + amount)
2. Professional invoice generator (UK-compliant)
3. Income & expense tracker with P&L summary
4. MTD readiness assessment
5. Quarterly summary generator (aligns with MTD quarterly submission requirement)
6. Export to CSV/PDF

### Why This Wins
1. **Regulatory urgency** — 780K people MUST buy software by April 2026
2. **SEO goldmine** — "Making Tax Digital software", "MTD sole trader tool" = high-intent searches
3. **Low competition in AI-native** — existing tools (FreeAgent, Xero) are expensive and enterprise-focused
4. **£0 infrastructure** — entire budget available for marketing
5. **£29 price point** — only 35 sales to hit £1,000
6. **Buildable from terminal** — Next.js, Vercel deploy, LemonSqueezy API

### Risks
1. Building HMRC submission integration requires API approval (multi-month) — **MITIGATED:** Position as "MTD prep tool", not submission tool
2. AI receipt categorisation needs good UX — **MITIGATED:** Use OpenAI Vision API, fallback to manual entry
3. Needs payment platform API key from human — **BLOCKER:** Must request LemonSqueezy key
4. Needs deployment key — **BLOCKER:** Must request Vercel token or use Netlify

---

## Next Steps (Phase 2)

1. BUILD agent: Create Next.js app with core features
2. FINANCE agent: CBA on any required API costs (OpenAI for receipt scanning)
3. GTM agent: SEO keyword research, landing page copy
4. LEGAL agent: Review LemonSqueezy ToS, GDPR compliance for user data
