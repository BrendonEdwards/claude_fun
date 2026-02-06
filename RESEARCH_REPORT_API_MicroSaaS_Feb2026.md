# RESEARCH REPORT: API-as-a-Service & Micro-SaaS Opportunities

**Date:** February 2026
**Prepared by:** Research Agent
**Classification:** Structured Market Data

---

## EXECUTIVE SUMMARY

- The micro-SaaS market is projected to grow from $15.7B to $59.6B by 2030 (~30% CAGR); ~95% of micro-SaaS businesses reach profitability within their first year with median profitable MRR of ~$4,200 and 70%+ profit margins. ([Lovable](https://lovable.dev/guides/micro-saas-ideas-for-solopreneurs-2026), [Freemius](https://freemius.com/blog/state-of-micro-saas-2025/))
- A production-capable stack (Vercel + Supabase + Cloudflare Workers) can be operated at exactly $0/month within free-tier limits, supporting up to 100K daily requests, 500MB database storage, and 100GB bandwidth -- sufficient for an MVP serving hundreds of paying users. ([Vercel](https://vercel.com/pricing), [Supabase](https://supabase.com/pricing), [Cloudflare](https://developers.cloudflare.com/workers/platform/pricing/))
- UK-specific regulatory tailwind: Making Tax Digital for Income Tax launches April 2026, mandating ~780,000 sole traders/landlords (income >$50K) to adopt compliant digital record-keeping software, creating immediate demand for affordable compliance tools. ([GOV.UK](https://www.gov.uk/government/collections/making-tax-digital-for-income-tax-for-businesses-step-by-step))

---

## 1. RAPIDAPI / API MARKETPLACE ANALYSIS

### 1.1 Most-Subscribed API Categories

| Rank | Category | Notes | Source |
|------|----------|-------|--------|
| 1 | Data / Utilities | Currency conversion, email verification, IP geolocation | [RapidAPI Categories](https://rapidapi.com/categories) |
| 2 | Finance | Stock data, crypto, forex (Alpha Vantage, Twelve Data) | [RapidAPI Finance](https://v2.rapidapi.com/collection/finance-apis) |
| 3 | AI / Machine Learning | OCR, sentiment analysis, facial recognition, LLM wrappers | [RapidAPI Popular APIs](https://rapidapi.com/blog/most-popular-api) |
| 4 | Weather | OpenWeatherMap, AccuWeather, Visual Crossing | [RapidAPI Weather](https://rapidapi.com/collection/top-weather-apis) |
| 5 | Sports | Live scores, statistics, historical data | [RapidAPI Popular APIs](https://rapidapi.com/collection/popular-apis) |
| 6 | Geolocation | IP lookup, geocoding, mapping | [RapidAPI Categories](https://rapidapi.com/categories) |

> **DATA GAP:** RapidAPI does not publicly publish subscription counts per category. The ranking above is inferred from marketplace positioning, collection pages, and editorial curation. No hard subscriber numbers available.

### 1.2 Typical API Pricing Tiers

| Tier | Recommended Price | Typical Request Allowance | Source |
|------|-------------------|---------------------------|--------|
| BASIC (Free) | $0 | 100-1,000 requests/month (hard limit) | [RapidAPI Docs](https://docs.rapidapi.com/v2.0/docs/api-pricing) |
| PRO | $25/month | 10,000-50,000 requests/month | [RapidAPI Docs](https://docs.rapidapi.com/v2.0/docs/api-pricing) |
| ULTRA | $75/month | 100,000-500,000 requests/month | [RapidAPI Docs](https://docs.rapidapi.com/v2.0/docs/api-pricing) |
| MEGA | $150/month | 1,000,000+ requests/month | [RapidAPI Docs](https://docs.rapidapi.com/v2.0/docs/api-pricing) |

> Overage rates: Typically $0.001-$0.003 per additional request above tier cap. One vendor example: $15/month for 50,000 requests with $0.003/request overage. ([JuheAPI](https://www.juheapi.com/blog/rapidapi-pricing-explained-2025-what-developers-need-to-know))

### 1.3 Platform Fees & Revenue

| Metric | Value | Source |
|--------|-------|--------|
| RapidAPI marketplace fee | **25% flat** on all payments | [RapidAPI Docs](https://docs.rapidapi.com/docs/payouts-and-finance) |
| Provider net revenue | **75%** of subscriber payments | [RapidAPI Docs](https://docs.rapidapi.com/docs/payouts-and-finance) |
| Payout method | PayPal only | [RapidAPI Docs](https://docs.rapidapi.com/docs/payouts-and-finance) |
| Total APIs on marketplace | 80,000+ | [DigitalAPI](https://www.digitalapi.ai/blogs/best-api-marketplaces) |
| Platform owner | Nokia (acquired Rapid technology assets) | [RapidAPI Blog](https://rapidapi.com/blog/most-popular-api) |

### 1.4 Estimated Revenue for a Mid-Tier API Product

| Scenario | Calculation | Monthly Net (after 25% fee) |
|----------|-------------|---------------------------|
| 50 PRO subscribers @ $25 | $1,250 gross | **$937.50** |
| 100 PRO subscribers @ $25 | $2,500 gross | **$1,875.00** |
| 20 ULTRA subscribers @ $75 | $1,500 gross | **$1,125.00** |
| Mixed: 200 PRO + 30 ULTRA + 5 MEGA | $7,500 gross | **$5,625.00** |

> **DATA GAP:** RapidAPI does not publicly disclose average or median API provider earnings. The above is modelled from recommended pricing tiers. Real-world API product examples: Bannerbear (API product) reached $10K MRR within first year, $45K MRR by year two. ScreenshotOne reached $2.2K MRR in ~6-8 months, $10K MRR by year two. ([Flowjam](https://www.flowjam.com/blog/27-micro-saas-examples-that-actually-print-money-in-2025), [Market Clarity](https://mktclarity.com/blogs/news/micro-saas-top))

---

## 2. MICRO-SAAS OPPORTUNITIES

### 2.1 Recently Launched Products with Revenue Data

| Product | Description | MRR | Team Size | Time to Revenue | Source |
|---------|-------------|-----|-----------|-----------------|--------|
| StealthGPT | AI writing tool | $4,700 | 1 | 37 days | [Market Clarity](https://mktclarity.com/blogs/news/micro-saas-top) |
| Supabird | Push notification tool | $1,000 | 1 | 5 months | [Flowjam](https://www.flowjam.com/blog/27-micro-saas-examples-that-actually-print-money-in-2025) |
| Interview.study | AI interview copilot | $500+ | 1 | 2.5 months | [Indie Hackers](https://www.indiehackers.com/post/2023-year-in-review-100k-in-ai-micro-saas-3adfd25b57) |
| UserDesk | AI customer service chatbot | $1,000 | 1 | 12 months | [Flowjam](https://www.flowjam.com/blog/27-micro-saas-examples-that-actually-print-money-in-2025) |
| BlogSEO | AI auto-blogging | $2,000+ | 1 | ~6 months | [Tech Startups](https://techstartups.com/2024/02/17/micro-saas-ideas-to-build-in-2024-top-50-micro-saas-examples-generating-1000s-in-mrr/) |
| Logsprout | Slack 500-error alerts | $3,000 | 1 | Organic (OSS) | [Flowjam](https://www.flowjam.com/blog/27-micro-saas-examples-that-actually-print-money-in-2025) |
| PODTurbo | Print-on-demand upload automation | $25,000 | 1 | N/A | [Flowjam](https://www.flowjam.com/blog/27-micro-saas-examples-that-actually-print-money-in-2025) |
| Papermark | Document sharing & analytics | $45,000 | Small | ~12 months | [Market Clarity](https://mktclarity.com/blogs/news/micro-saas-top) |
| Bannerbear | API: automated image/video generation | $45,000 | 1 | ~12 months | [Flowjam](https://www.flowjam.com/blog/27-micro-saas-examples-that-actually-print-money-in-2025) |
| ScreenshotOne | API: website screenshots | $10,000 | 1 | 6-8 months to $2.2K | [Market Clarity](https://mktclarity.com/blogs/news/micro-saas-top) |

### 2.2 Revenue Distribution (Micro-SaaS Population)

| MRR Range | % of Micro-SaaS Products | Source |
|-----------|--------------------------|--------|
| < $1,000 | ~70% | [Freemius](https://freemius.com/blog/state-of-micro-saas-2025/) |
| $1,000 - $5,000 | ~18% | [Freemius](https://freemius.com/blog/state-of-micro-saas-2025/) |
| $5,000 - $50,000 | ~10% | [Freemius](https://freemius.com/blog/state-of-micro-saas-2025/) |
| > $50,000 | ~1-2% | [Freemius](https://freemius.com/blog/state-of-micro-saas-2025/) |

- **Median profitable micro-SaaS:** ~$4,200 MRR ([Freemius](https://freemius.com/blog/state-of-micro-saas-2025/))
- **~95%** reach profitability within year one ([Freemius](https://freemius.com/blog/state-of-micro-saas-2025/))
- **70%+ profit margins** typical for bootstrapped micro-SaaS ([DEV Community](https://dev.to/dev_tips/the-solo-dev-saas-stack-powering-10kmonth-micro-saas-tools-in-2025-pl7))

### 2.3 Business Problems Small Businesses Pay to Solve

| Problem Category | Example Products | Typical Price Range | Source |
|-----------------|------------------|---------------------|--------|
| Invoice & payment management | Invoicing automation, late payment chasing | $10-$50/month | [Wise](https://wise.com/gb/blog/best-invoicing-software-for-small-businesses) |
| Social media scheduling & content | Tweet schedulers, content repurposing | $19-$99/month | [Flowjam](https://www.flowjam.com/blog/27-micro-saas-examples-that-actually-print-money-in-2025) |
| Email list management / unsubscribe | List cleaning, unsubscribe tools | $5-$29/month | [Flowjam](https://www.flowjam.com/blog/27-micro-saas-examples-that-actually-print-money-in-2025) |
| Customer support / chatbot | AI-powered help desks | $19-$99/month | [Flowjam](https://www.flowjam.com/blog/27-micro-saas-examples-that-actually-print-money-in-2025) |
| SEO / content generation | AI blog writers, keyword tools | $19-$79/month | [Tech Startups](https://techstartups.com/2024/02/17/micro-saas-ideas-to-build-in-2024-top-50-micro-saas-examples-generating-1000s-in-mrr/) |
| Churn prevention / cancellation flows | Retention tools | $49-$299/month | [Flowjam](https://www.flowjam.com/blog/27-micro-saas-examples-that-actually-print-money-in-2025) |
| Tax compliance & bookkeeping | MTD-compliant record keeping | $10-$50/month | [GOV.UK MTD](https://www.gov.uk/government/collections/making-tax-digital-for-income-tax) |
| Form automation / conditional logic | Advanced form builders | $19-$99/month | [BigIdeasDB](https://bigideasdb.com/best-saas-ideas-2026-backed-by-pain-points) |

### 2.4 Typical Monthly Subscription Prices

| Price Point | Target Segment | Conversion Notes | Source |
|-------------|---------------|------------------|--------|
| $0 (Free tier) | Lead generation | 2-5% freemium-to-paid conversion | [Freemius](https://freemius.com/blog/micro-saas-pricing-strategies/) |
| $9-$19/month | Individuals / freelancers | Entry-level; risk of thin margins | [Freemius](https://freemius.com/blog/micro-saas-pricing-strategies/) |
| $29-$49/month | Small businesses | Sweet spot for most micro-SaaS | [Freemius](https://freemius.com/blog/micro-saas-pricing-strategies/) |
| $79-$149/month | Growth / professional tier | Higher value, lower churn | [GetMonetizely](https://www.getmonetizely.com/articles/pricing-for-micro-saas-small-product-big-revenue-strategies) |
| $199-$499/month | Agency / team plans | B2B premium | [InvespCRO](https://www.invespcro.com/blog/saas-pricing/) |

> **Key pricing insight:** When Bannerbear raised price from $9 to $49, churn actually decreased -- dabblers left, serious users stayed. ([Freemius](https://freemius.com/blog/micro-saas-pricing-strategies/))

### 2.5 Time to First Paying Customer

| Metric | Value | Source |
|--------|-------|--------|
| SMB SaaS sales cycle | 15-45 days | [Marketing LTB](https://marketingltb.com/blog/statistics/saas-statistics/) |
| Free trial to paid conversion | 15-30% | [Marketing LTB](https://marketingltb.com/blog/statistics/saas-statistics/) |
| Freemium to paid conversion | 2-5% | [Marketing LTB](https://marketingltb.com/blog/statistics/saas-statistics/) |
| Fastest reported (StealthGPT) | 37 days to $4.7K MRR | [Market Clarity](https://mktclarity.com/blogs/news/micro-saas-top) |
| Typical first paying customer | 1-6 months (anecdotal, indie hacker communities) | [Indie Hackers](https://www.indiehackers.com/) |
| Time to profitability (general SaaS) | 18-24 months | [Marketing LTB](https://marketingltb.com/blog/statistics/saas-statistics/) |

> **DATA GAP:** No rigorous study quantifying average time-to-first-customer for micro-SaaS specifically. The 1-6 month figure is based on anecdotal reports from indie hacker communities, not a formal survey.

---

## 3. INFRASTRUCTURE COSTS

### 3.1 Free Tier Comparison Table

| Provider | Compute/Requests | Storage | Bandwidth | Key Limit | Source |
|----------|-----------------|---------|-----------|-----------|--------|
| **Vercel (Hobby)** | 150K serverless invocations/month | Unlimited projects | 100 GB/month | 10s function timeout; solo-only; no team | [Vercel Pricing](https://vercel.com/pricing) |
| **Netlify (Free)** | 125K function invocations/month; 1M edge function invocations | 10 GB | 100 GB/month | Site suspended if limits exceeded; 300 build min/month | [Netlify Pricing](https://www.netlify.com/pricing/) |
| **Supabase (Free)** | 500K edge function invocations/month | 500 MB DB + 1 GB file storage | 2 GB DB egress + 2 GB storage egress | **Auto-pauses after 7 days inactivity**; 2 projects max | [Supabase Pricing](https://supabase.com/pricing) |
| **Neon (Free)** | 100 CU-hours/project/month (up to 2 vCPU, 8GB RAM) | 0.5 GB/project (up to 5 GB across 20 projects) | Included | Scale-to-zero (5 min idle); up to 20 projects | [Neon Pricing](https://neon.com/pricing) |
| **Cloudflare Workers (Free)** | 100K requests/day; 10ms CPU/invocation | 5 GB Durable Objects (SQLite) | Unlimited (no egress fees) | 100 Workers max; daily limit resets at midnight UTC | [Cloudflare Workers Pricing](https://developers.cloudflare.com/workers/platform/pricing/) |
| **PlanetScale** | **NO FREE TIER** (removed April 2024) | N/A | N/A | Minimum plan: $39/month (Scaler Pro) | [PlanetScale FAQ](https://planetscale.com/docs/plans/hobby-plan-deprecation-faq) |

### 3.2 What You Can Host for $0/month

| Component | Free Provider | Capacity at $0 |
|-----------|---------------|----------------|
| Frontend hosting (static/SSR) | Vercel Hobby | 100 GB bandwidth, unlimited projects |
| API endpoints (serverless) | Cloudflare Workers | 100K requests/day, 10ms CPU each |
| Relational database (Postgres) | Neon Free or Supabase Free | 500 MB storage |
| Authentication | Supabase Free | 50,000 MAUs |
| File/blob storage | Supabase Free | 1 GB |
| Edge compute | Netlify Free | 1M edge function invocations/month |
| DNS + CDN + DDoS protection | Cloudflare Free | Unlimited |
| CI/CD + Deploys | Vercel or Netlify | 300-6,000 build min/month |

### 3.3 What Costs Money (First Paid Tiers)

| Need | Cheapest Paid Option | Monthly Cost | Source |
|------|---------------------|--------------|--------|
| Remove Supabase auto-pause | Supabase Pro | $25/month | [Supabase Pricing](https://supabase.com/pricing) |
| More serverless compute | Cloudflare Workers Paid | $5/month (10M req included) | [Cloudflare Pricing](https://developers.cloudflare.com/workers/platform/pricing/) |
| Team collaboration (Vercel) | Vercel Pro | $20/user/month | [Vercel Pricing](https://vercel.com/pricing) |
| MySQL database (PlanetScale) | PlanetScale Scaler Pro | $39/month | [PlanetScale Pricing](https://planetscale.com/pricing) |
| More DB storage (Neon) | Neon Launch | $19/month (10 GB) | [Neon Pricing](https://neon.com/pricing) |
| Custom domain email | Various | $1-6/month | N/A |

### 3.4 Realistic MVP Infrastructure Budget

| Stack | Monthly Cost | Notes |
|-------|-------------|-------|
| Vercel (Hobby) + Supabase (Free) + Cloudflare (Free) | **$0** | Supabase auto-pauses after 7 days inactivity |
| Vercel (Hobby) + Neon (Free) + Cloudflare (Free) | **$0** | Neon scales to zero but does not pause/delete |
| Vercel (Hobby) + Supabase (Pro) + Cloudflare (Free) | **$25** | Production-ready; no auto-pause |
| Vercel (Hobby) + Neon (Free) + Cloudflare Workers Paid | **$5** | 10M API calls/month capacity |

---

## 4. UK SMALL BUSINESS PAIN POINTS

### 4.1 Financial Context

| Metric | Value | Source |
|--------|-------|--------|
| UK SMEs reporting rising costs (2025) | 85% | [Simply Business](https://www.simplybusiness.co.uk/knowledge/business-news/2026-small-business-predictions/) |
| SMEs experiencing late payments (Q1 2025) | 41% | [Simply Business](https://www.simplybusiness.co.uk/knowledge/business-news/2026-small-business-predictions/) |
| Average payment time | ~38 days | [FSB / A1 Outsourcing](https://www.aoneoutsourcing.uk/blog/automated-bookkeeping) |
| Late payments cost to UK economy/year | $11 billion | [techUK](https://www.techuk.org/resource/government-publishes-its-small-business-plan.html) |
| SMEs writing off invoices (Q1 2025) | ~1 in 5 | [Simply Business](https://www.simplybusiness.co.uk/knowledge/business-news/2026-small-business-predictions/) |
| SMEs confident about year ahead | Only 20% | [Simply Business](https://www.simplybusiness.co.uk/knowledge/business-news/2026-small-business-predictions/) |
| Average cyber attack cost (micro/small business) | $7,960 | [RFI Global](https://rfi.global/winning-with-uk-smes-insights-for-2026-and-beyond/) |

### 4.2 SaaS Spending by UK SMEs

| Company Size | Estimated Annual Software Spend | Per-Employee Spend | Source |
|-------------|-------------------------------|-------------------|--------|
| 0-20 employees | ~$121,000 (~$10,100/month) | ~$8,000/year | [Cledara 2025](https://www.cledara.com/blog/2025-software-spend-report) |
| 50-100 employees | ~$194,000 (~$16,100/month) | ~$2,583/year | [Cledara 2025](https://www.cledara.com/blog/2025-software-spend-report) |
| 100-200 employees | ~$251,000 (~$20,900/month) | ~$1,741/year | [Cledara 2025](https://www.cledara.com/blog/2025-software-spend-report) |

| Waste Metric | Value | Source |
|-------------|-------|--------|
| UK businesses wasted on unused SaaS/year | $600 million | [Spendesk](https://www.spendesk.com/blog/saas-statistics/) |
| SaaS licenses unused for 90+ days | >50% | [Spendesk](https://www.spendesk.com/blog/saas-statistics/) |
| Typical 50-person SME wasted SaaS spend | $25,000-$50,000/year (20-40% of total) | [Spendesk](https://www.spendesk.com/blog/saas-statistics/) |
| Average SaaS subscriptions per small business | 15-30 tools | [BetterCloud](https://www.bettercloud.com/monitor/saas-statistics/) |
| YoY SaaS price inflation | 8.7% | [InvespCRO](https://www.invespcro.com/blog/saas-pricing/) |
| Small company IT spend as % of revenue | 6.9% | [Avasant](https://avasant.com/report/it-spending-as-a-percentage-of-revenue-by-industry-company-size-and-region/) |

### 4.3 Tools/Services UK SMEs Overpay For

| Category | Problem | Typical Overspend Indicator | Source |
|----------|---------|----------------------------|--------|
| Compliance software | Enterprise-priced; $20K/year not justified for 5-person firm | Middle-market gap underserved | [BigIdeasDB](https://bigideasdb.com/best-saas-ideas-2026-backed-by-pain-points) |
| Accounting / bookkeeping | Multiple overlapping subscriptions; manual receipt processing | Hundreds of hours wasted weekly | [A1 Outsourcing](https://www.aoneoutsourcing.uk/blog/automated-bookkeeping) |
| CRM | Enterprise features unused by micro-businesses | SMEs using 10% of features at full price | [MicroSaaS Idea](https://microsaasidea.substack.com/) |
| Form builders | Google Forms too basic; ServiceNow overkill | Conditional logic gap in mid-market | [BigIdeasDB](https://bigideasdb.com/best-saas-ideas-2026-backed-by-pain-points) |
| SaaS subscription management | No visibility into recurring costs / renewals | 20-40% of spend is waste | [Spendesk](https://www.spendesk.com/blog/saas-statistics/) |
| Microsoft 365 licenses | Paying for licenses not in use; annual-monthly pricing traps | 5% price increase April 2025 | [Speedster IT](https://speedster-it.com/time-to-review-your-microsoft-licenses/) |

### 4.4 Manual Processes Ripe for Automation

| Process | Current State | Automation Potential | Source |
|---------|--------------|---------------------|--------|
| Invoice processing | Average 20.8 days manual approval cycle | Reducible to 1-2 days | [ResolvePay](https://resolvepay.com/blog/13-statistics-that-quantify-cost-per-invoice-in-manual-vs-automated-flows) |
| Receipt/expense categorization | Manual typing; error-prone | 99.9% accuracy with AI (e.g., Dext) | [Dext](https://dext.com/uk) |
| VAT calculations & filing | Manual spreadsheet reconciliation | Automatable with MTD-compliant software | [GOV.UK](https://www.gov.uk/government/collections/making-tax-digital-for-income-tax) |
| Late payment chasing | Manual follow-up; 41% of SMEs affected | Automated reminders & escalation | [Simply Business](https://www.simplybusiness.co.uk/knowledge/business-news/2026-small-business-predictions/) |
| Quarterly tax updates (new from April 2026) | N/A (new requirement) | Digital record-keeping + auto-submission | [GOV.UK](https://www.gov.uk/government/news/act-now-864000-sole-traders-and-landlords-face-new-tax-rules-in-two-months) |
| Appointment/job scheduling | Phone/email/paper-based | Calendar automation, booking widgets | [Hostinger](https://www.hostinger.com/tutorials/saas-ideas) |
| Social media posting | Manual cross-platform posting | Scheduled automation tools | [Flowjam](https://www.flowjam.com/blog/27-micro-saas-examples-that-actually-print-money-in-2025) |

### 4.5 Making Tax Digital -- Imminent Regulatory Driver

| Detail | Value | Source |
|--------|-------|--------|
| Launch date | **6 April 2026** (Phase 1: income >$50K) | [GOV.UK](https://www.gov.uk/government/collections/making-tax-digital-for-income-tax-for-businesses-step-by-step) |
| Phase 2 (income >$30K) | April 2027 | [GOV.UK](https://www.gov.uk/government/publications/extension-of-making-tax-digital-for-income-tax-self-assessment-to-sole-traders-and-landlords/) |
| Phase 3 (income >$20K) | April 2028 | [GOV.UK](https://www.gov.uk/government/publications/extension-of-making-tax-digital-for-income-tax-self-assessment-to-sole-traders-and-landlords/) |
| People affected (Phase 1) | ~780,000 sole traders & landlords | [GOV.UK](https://www.gov.uk/government/news/act-now-864000-sole-traders-and-landlords-face-new-tax-rules-in-two-months) |
| People affected (Phase 1+2) | ~1,750,000 | [GOV.UK](https://www.gov.uk/government/publications/extension-of-making-tax-digital-for-income-tax-self-assessment-to-sole-traders-and-landlords/) |
| Requirement | Digital records + quarterly HMRC updates via approved software | [GOV.UK MTD](https://makingtaxdigital.campaign.gov.uk/making-tax-digital-software/) |
| HMRC-provided software | **None** -- must use third-party | [GOV.UK](https://makingtaxdigital.campaign.gov.uk/making-tax-digital-software/) |
| Penalty grace period | No penalty points for late quarterly updates in first 12 months | [GOV.UK](https://www.gov.uk/government/news/act-now-864000-sole-traders-and-landlords-face-new-tax-rules-in-two-months) |

### 4.6 UK SME AI Adoption

| Metric | Value | Source |
|--------|-------|--------|
| SMEs with no concerns about AI (2023) | 10% | [Simply Business](https://www.simplybusiness.co.uk/knowledge/business-news/2026-small-business-predictions/) |
| SMEs with no concerns about AI (2025) | 27% | [Simply Business](https://www.simplybusiness.co.uk/knowledge/business-news/2026-small-business-predictions/) |
| UK firms using cloud systems (2023) | 69% | [techUK](https://www.techuk.org/resource/industry-led-sme-digital-adoption-taskforce-release-final-report-with-uk-government-response.html) |
| UK firms using AI (2023) | 9% | [techUK](https://www.techuk.org/resource/industry-led-sme-digital-adoption-taskforce-release-final-report-with-uk-government-response.html) |
| Productivity gain (digital adopters) | 19% higher turnover per worker | [techUK / ONS 2025](https://www.techuk.org/resource/industry-led-sme-digital-adoption-taskforce-release-final-report-with-uk-government-response.html) |

---

## 5. GAPS & UNKNOWNS

| # | Gap | Impact |
|---|-----|--------|
| 1 | RapidAPI does not publish per-category subscription counts or average provider revenue | Cannot verify which API categories generate the most revenue vs. most traffic |
| 2 | No rigorous study on average time-to-first-customer for micro-SaaS specifically | Relying on anecdotal indie hacker data (1-6 months) |
| 3 | UK-specific SaaS spend data is limited; most benchmarks are US-centric | UK figures likely 15-30% lower than US equivalents but exact discount unknown |
| 4 | Supabase free tier auto-pause makes it unsuitable for always-on production without $25/month upgrade | $0 infrastructure claim requires careful architecture to avoid downtime |
| 5 | PlanetScale eliminated its free tier entirely (April 2024) | Must use alternatives (Neon, Supabase, Turso) for free MySQL/Postgres |
| 6 | No public data on how many MTD-compliant software products exist or their market share | Cannot assess competitive density for MTD tools |
| 7 | Cloudflare Workers free tier has 10ms CPU limit per invocation | Unclear if this is sufficient for AI-heavy or computation-intensive API products |
| 8 | RapidAPI pays out only via PayPal | May create friction for UK-based providers preferring bank transfer |
| 9 | SaaS price inflation at 8.7% YoY | Cost sensitivity may be increasing among UK SMEs but no direct survey data on willingness-to-pay trends |
| 10 | Netlify shifted to credit-based pricing (Sept 2025) for new accounts | Free tier terms may be less predictable for new signups vs. legacy accounts |

---

*End of report. No recommendations included. Data only.*
