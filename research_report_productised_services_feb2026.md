# RESEARCH REPORT: Done-for-You Digital Services & Productised Services
**Date:** February 2026
**Scope:** UK-focused, budget £100, target £1,000/delivery
**Status:** DATA ONLY -- no recommendations

---

## Executive Summary

- **Productised service delivery at the £100-500 price point is an established market** with documented examples across SEO audits (£200-1,000 freelancer rate), copywriting packages (£150-500 per landing page), and AI-generated brand kits ($20-175 one-time). Fiverr sellers offer AI-assisted SEO audits starting from $10, while UK agencies charge £500-3,000 for the same deliverable.
- **AI tooling has matured to the point where 60-80% of common deliverables (audits, copy, brand assets) can be generated programmatically.** Screaming Frog (free/500 URLs), Google Lighthouse (free), Looka ($20-96/yr), and LLM APIs (ChatGPT/Claude) cover the core production stack. Freelancers report 30-60% time savings on first drafts using AI.
- **UK cold B2B email to Ltd companies is PECR-exempt** (corporate subscriber exemption confirmed by ICO), and Companies House provides a free API with 4.5M+ registered companies. No official Fiverr seller API exists; Upwork has a GraphQL API for job/proposal management but not profile creation from scratch.

---

## 1. Productised Service Market

### 1A. Services in the £100-500 Price Range

| Service | Typical Price Range | Delivery Time | Automation Potential | Source |
|---------|-------------------|---------------|---------------------|--------|
| SEO audit (basic/freelancer) | £200 - £1,000 | 3-7 days | High (Screaming Frog + Lighthouse + LLM analysis) | [TargetedSEO](https://targetedseo.co.uk/seo-audit-costs-uk/) |
| SEO audit (Fiverr, AI-assisted) | $10 - $80 | 2-4 days | Very High | [Fiverr - Arun22297](https://www.fiverr.com/arun22297/seo-audit-using-ai-tool), [Fiverr - Kostaage](https://www.fiverr.com/kostaage/improve-your-seo-with-ai-services) |
| Website speed audit + fix | $495 - $795 | 3-5 days | High (automated testing + manual fixes) | [SPP Blog](https://spp.co/blog/productized-services-examples/) |
| Copywriting (landing page) | £150 - £300 | 1-3 days | High (LLM first draft + human edit) | [Talo](https://talo.com/costs/copywriting-rates) |
| Copywriting (sales page, Fiverr) | $50 - $300 | 1-5 days | High | [HireInSouth](https://www.hireinsouth.com/post/fiverr-pricing) |
| Amazon listing copy | $397 per product | 2-5 days | High (LLM + keyword tools) | [SPP Blog](https://spp.co/blog/productized-services-examples/) |
| AI logo + brand kit (Looka) | $20 - $96/yr | Minutes (self-serve) | Very High (fully automated) | [Looka](https://looka.com/) |
| AI logo (Brandmark) | $25 - $175 | Minutes (self-serve) | Very High (fully automated) | [Superside](https://www.superside.com/blog/ai-logo-generators) |
| Brand identity (freelancer) | $500 - $5,000 | 1-4 weeks | Medium (AI-assisted design + human refinement) | [Shopify](https://www.shopify.com/blog/branding-package) |
| Website knockout audit | $697 | 3-5 days | High | [SPP Blog](https://spp.co/blog/productized-services-examples/) |
| DIY sales page template + customisation | $99 (template) + $499 (DFY) | 1-3 days | High | [SPP Blog](https://spp.co/blog/productized-services-examples/) |
| Photologo (handwritten signature logo) | $49 | 2-3 days | Low (human calligrapher) | [SPP Blog](https://spp.co/blog/productized-services-examples/) |

### 1B. Platforms for Selling Productised Services

| Platform | Model | Fees | API/CLI Access | Best For | Source |
|----------|-------|------|----------------|----------|--------|
| **Fiverr** | Marketplace (gigs) | 20% seller fee | No seller API (manual gig creation only) | Buyer discovery, volume | [Fiverr Help](https://help.fiverr.com/hc/en-us/articles/360010451397-Creating-a-Gig) |
| **Upwork** | Marketplace (proposals) | 10% freelancer fee | GraphQL API (job/proposal mgmt, NOT profile creation) | Larger projects, B2B | [Upwork Developer](https://www.upwork.com/developer) |
| **SPP (Service Provider Pro)** | White-label client portal | $129/mo flat | Portal-based (not CLI) | Agency productised services | [SPP](https://spp.co/alternatives/manyrequests) |
| **ManyRequests** | Client portal + checkout | $99-399/mo | Portal-based (not CLI) | Design/marketing subscriptions | [ManyRequests](https://manyrequests.com/blog/productized-service-software) |
| **Lemon Squeezy** | MoR for digital products | 5% + $0.50/txn | REST API available | Digital products, SaaS, global tax handling | [Lemon Squeezy](https://www.lemonsqueezy.com/gumroad-alternative) |
| **Gumroad** | MoR for digital products | 10% + $0.50/txn (own link); 30% (Discover) | API available | Digital products, creators | [Gumroad](https://sologrowthlab.com/blog/gumroad-vs-lemon-squeezy-for-creators/) |
| **Own website** (Stripe checkout) | Direct sales | Stripe fees only (~1.4-2.9% + 20p) | Full API control | Maximum margin, brand ownership | N/A (Stripe docs) |

---

## 2. AI-Assisted Service Delivery

### 2A. SEO/Website Audit Tool Stack (Automatable from Terminal)

| Tool | Free Tier | Paid Price | CLI/API Access | What It Produces | Source |
|------|-----------|------------|----------------|-----------------|--------|
| **Screaming Frog** | 500 URLs | £199/yr | CLI executable (headless mode) | Full technical SEO crawl (300+ issues) | [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/) |
| **Google Lighthouse** | Fully free | N/A | CLI (`lighthouse` npm package) | Performance, a11y, SEO, best practices scores | [Veza Digital](https://www.vezadigital.com/post/top-website-audit-tools-for-seo) |
| **Ahrefs (Webmaster Tools)** | 5,000 pages/mo | From $129/mo | API available | Backlink data, 170+ SEO issues | [Semrush Blog](https://www.semrush.com/blog/seo-audit-tools/) |
| **Semrush** | 100 URLs | From $117/mo (annual) | API available | 140+ health checks, GEO analysis | [Semrush](https://www.semrush.com/blog/seo-audit-tools/) |
| **SEOptimer** | Limited | From $29/mo | API for white-label reports | Quick visual audit reports | [Veza Digital](https://www.vezadigital.com/post/top-website-audit-tools-for-seo) |
| **GTmetrix** | Free basic | Plans available | API available | Core Web Vitals, Lighthouse metrics | [Flow Ninja](https://www.flow.ninja/blog/best-site-audit-tools) |
| **PageSpeed Insights API** | Free | N/A | REST API (Google) | CrUX data, Lighthouse scores | Google Developers |

### 2B. AI Copywriting Tools

| Tool | Free Tier | Paid Price | API Access | Output Quality | Source |
|------|-----------|------------|------------|----------------|--------|
| **ChatGPT (OpenAI API)** | Limited | $0.002-0.06/1K tokens | Full REST API | High (with prompt engineering) | [Explore AI Hub](https://exploreaihub.com/ai-tools-for-freelancers-2026/) |
| **Claude (Anthropic API)** | Limited | $0.003-0.075/1K tokens | Full REST API | High (strong editing/analysis) | [Explore AI Hub](https://exploreaihub.com/ai-tools-for-freelancers-2026/) |
| **Jasper** | Trial | From $49/mo | API (Jasper Studio) | Marketing-optimised copy | [Asrify](https://asrify.com/blog/ai-tools-freelancers) |
| **Copy.ai** | Free plan | $49/mo ($36/mo annual) | API available | Templates for ads, emails, landing pages | [Copy.ai](https://www.copy.ai/prices) |
| **Rytr** | 10,000 chars/mo free | Low-cost plans | Limited | 40+ use cases, plagiarism checker | [Ad-Times](https://ad-times.com/best-affordable-ai-copywriting-tools-small-business-2026/) |

### 2C. AI Design / Brand Kit Tools

| Tool | Price | Output | Automation Level | Source |
|------|-------|--------|-----------------|--------|
| **Looka** | $20 (logo) / $96/yr (brand kit) | Logo, 300+ branded templates, business cards, social media | Very High -- fully automated | [Looka](https://looka.com/) |
| **Brandmark** | $25-175 one-time | Logo, style guide, business card, letterhead, social covers | Very High | [Superside](https://www.superside.com/blog/ai-logo-generators) |
| **Canva AI** | Free tier / Pro $12.99/mo | Social posts, presentations, branded content | High (70% design time reduction reported) | [Twine](https://www.twine.net/blog/ai-tools-for-creative-freelancers/) |
| **Adobe Firefly** | Included with CC | Custom illustrations, backgrounds, image enhancement | High | [Twine](https://www.twine.net/blog/ai-tools-for-creative-freelancers/) |
| **MidJourney** | From $10/mo | Artistic images, concept art, unique visuals | High | [Twine](https://www.twine.net/blog/ai-tools-for-creative-freelancers/) |

### 2D. What Agencies Currently Charge vs. Underlying AI Tool Cost

| Deliverable | Agency/Freelancer Charges | AI Tool Cost to Produce | Approx. Margin | Source |
|-------------|--------------------------|------------------------|----------------|--------|
| Basic SEO audit report | £200-1,000 | ~£0.50 (Lighthouse free + LLM API call) | 99%+ | [TargetedSEO](https://targetedseo.co.uk/seo-audit-costs-uk/) |
| Website speed audit | $495-795 | ~£1-5 (Lighthouse + GTmetrix API) | 99%+ | [SPP](https://spp.co/blog/productized-services-examples/) |
| Landing page copy | £150-300 | ~£0.10-0.50 (LLM API) | 99%+ | [Talo](https://talo.com/costs/copywriting-rates) |
| Brand logo + kit | $500-5,000 (freelancer) | $20-96 (Looka) | 80-96% | [Shopify](https://www.shopify.com/blog/branding-package) |
| Full brand identity | £5,000-20,000 | $96-175 (Looka/Brandmark) | 96-99% | [Knapsack Creative](https://knapsackcreative.com/blog-industry/branding-pricing-guide) |

---

## 3. UK Market Data

### 3A. UK SME Outsourcing Landscape

| Metric | Value | Source |
|--------|-------|--------|
| UK BPO market size (2026) | £75.4 billion | [IBISWorld](https://www.ibisworld.com/united-kingdom/industry/business-process-outsourcing-services/14658/) |
| UK outsourcing services revenue (2024) | $219.6 billion | [Grand View Research](https://www.grandviewresearch.com/horizon/outlook/outsourcing-services-market/uk) |
| UK outsourcing CAGR (2025-2030) | 10.2% | [Grand View Research](https://www.grandviewresearch.com/horizon/outlook/outsourcing-services-market/uk) |
| UK companies struggling to fill IT/data roles | 76% | [LimeUp](https://limeup.io/blog/uk-software-development-outsourcing-statistics/) |
| SMEs reporting rising costs (2025) | 85% | [Startups.co.uk](https://startups.co.uk/analysis/small-business-statistics/) |
| SMEs prioritising digital transformation | 35% (top priority) | [Capsule CRM](https://capsulecrm.com/blog/UK-small-business-statistics/) |
| SMEs outsourcing web development | 29% | [Capsule CRM](https://capsulecrm.com/blog/UK-small-business-statistics/) |
| UK population online | >97% | [Reboot Online](https://www.rebootonline.com/website-statistics/) |

### 3B. What UK Small Businesses Commonly Outsource (Digital)

| Service | Demand Level | Typical UK Price Range | Source |
|---------|-------------|----------------------|--------|
| SEO | Very High | £500-10,000/mo | [LocaliQ](https://localiq.co.uk/blog/uk-digital-marketing-statistics) |
| Web design & development | Very High | Outsourced by 29% of SMEs | [Capsule CRM](https://capsulecrm.com/blog/UK-small-business-statistics/) |
| PPC / Google Ads | High | £200-9,000/mo (inc. ad spend) | [LocaliQ](https://localiq.co.uk/blog/uk-digital-marketing-statistics) |
| Social media marketing | High | £800-4,000/mo | [Evolve My Media](https://www.evolvemymedia.co.uk/blog-posts/social-media-marketing-costs-uk-2025-evolve-my-media) |
| Copywriting / content marketing | High | £250-480/day (UK copywriter average: £480/day) | [Mike Peake](https://www.bymikepeake.com/post/freelance-copywriter-rates-2026-the-ultimate-guide) |
| Email marketing | Medium | Bundled with marketing retainers | [JDR Group](https://www.jdrgroup.co.uk/digital-marketing-services) |

### 3C. UK SME Price Sensitivity

| Data Point | Value | Source |
|------------|-------|--------|
| SMBs with monthly marketing budget under $1,000 | 52% | [Inner Spark Creative](https://www.innersparkcreative.com/resources/marketing-benchmarks/2025-small-business-marketing-benchmarks) |
| SMBs with no dedicated marketing employee | 50% | [Inner Spark Creative](https://www.innersparkcreative.com/resources/marketing-benchmarks/2025-small-business-marketing-benchmarks) |
| SMBs planning to increase marketing budget (2026) | ~40% | [LocaliQ Trends](https://localiq.com/blog/small-business-marketing-trends-report-2026/) |
| SMBs planning to decrease budget (2026) | 8% | [LocaliQ Trends](https://localiq.com/blog/small-business-marketing-trends-report-2026/) |
| Primary reason for budget decrease | Economy (57%) | [LocaliQ Trends](https://localiq.com/blog/small-business-marketing-trends-report-2026/) |
| Economic uncertainty seen as challenging | 66% of SMBs | [LocaliQ Trends](https://localiq.com/blog/small-business-marketing-trends-report-2026/) |
| Marketing as % of company revenue (2025) | 9.4% (historic high) | [Rick Whittington](https://www.rickwhittington.com/blog/budget-for-digital-marketing) |

### 3D. How UK Businesses Find Service Providers

| Channel | Data | Source |
|---------|------|--------|
| Referrals / word of mouth | 65% of new business; 82% of small businesses say referrals are primary source | [DemandSage](https://www.demandsage.com/referral-marketing-statistics/) |
| Google Search | 98% mobile search market share in UK | [Statista](https://www.statista.com/statistics/280275/market-share-held-by-google-search-engines-in-the-united-kingdom-uk/) |
| B2B sales beginning with referral | 84% (Forrester) | [DemandSage](https://www.demandsage.com/referral-marketing-statistics/) |
| Google Business Profile | Verified profiles 80% more likely to appear; 86% of views from category searches | [Starfish Reviews](https://starfish.reviews/google-business-profile-statistics/) |
| UK directories | Yell, Thomson Local, Checkatrade, industry-specific | [WooRank](https://www.woorank.com/en/blog/free-business-directories-uk) |
| Consumers trusting recommendations over ads | 86% (2025) | [Talkable](https://www.talkable.com/blog/important-referral-marketing-stats-you-need-to-know) |

---

## 4. Competition & Pricing Data

### 4A. Fiverr Pricing for AI-Assisted Services

| Service Category | Fiverr Price Range | Delivery Time | Source |
|-----------------|-------------------|---------------|--------|
| SEO audit (AI-tool assisted) | $10 - $80 | 2-4 days | [Fiverr SEO Audit](https://www.fiverr.com/gigs/seo-audit) |
| Comprehensive SEO audit + action plan | $80 - $500 | 3-7 days | [Fiverr SEO Services](https://www.fiverr.com/categories/online-marketing/seo-services) |
| Copywriting (general) | $50 - $300 | 1-5 days | [HireInSouth](https://www.hireinsouth.com/post/fiverr-pricing) |
| Monthly SEO retainer (agency-level) | $1,000 - $3,300/mo | Ongoing | [Fiverr Cost Guide](https://www.fiverr.com/resources/guides/digital-marketing/what-does-seo-cost) |

### 4B. Freelancer Pricing (Website Audits, SEO Reports)

| Provider Type | One-Off Audit Price (UK) | Monthly Retainer | Source |
|--------------|------------------------|-----------------|--------|
| Freelancer (basic) | £200 - £1,000 | N/A | [TargetedSEO](https://targetedseo.co.uk/seo-audit-costs-uk/) |
| Freelancer (experienced) | £500 - £2,000 | £500 - £3,000/mo | [WantSEO](https://wantseo.co.uk/how-much-does-an-seo-audit-cost-in-the-uk-understanding-pricing-factors/) |
| Agency (standard) | £500 - £3,000 | £2,500 - £5,000/mo | [TargetedSEO](https://targetedseo.co.uk/how-much-does-seo-cost-uk/) |
| Agency (comprehensive) | £1,500 - £5,000 | £5,000 - £10,000/mo | [SEOProfy](https://seoprofy.com/blog/seo-audit-pricing/) |
| UK average SEO hourly rate | £100 - £250/hr | N/A | [AgencyAnalytics](https://agencyanalytics.com/blog/seo-pricing-guide) |

### 4C. DIY Tools vs. Done-For-You Price Differential

| Approach | Monthly Cost | What You Get | Source |
|----------|-------------|--------------|--------|
| DIY tools only | $100 - $500/mo | Raw data, requires expertise to interpret | [DesignRush](https://www.designrush.com/agency/search-engine-optimization/trends/in-house-seo-vs-agency-cost) |
| Freelancer (DFY) | $500 - $3,000/mo | Interpreted data + action plan | [AgencyAnalytics](https://agencyanalytics.com/blog/seo-pricing-guide) |
| Agency (DFY) | $2,500 - $10,000/mo | Full strategy + implementation | [WebFX](https://www.webfx.com/seo/pricing/) |
| **Price multiplier: DFY vs DIY** | **5x - 20x** | Analysis, interpretation, action plan, credibility | Derived from above |

---

## 5. Distribution Channels Executable from Terminal

### 5A. Platform API/CLI Availability

| Platform | Seller-Side API? | What's Available | Limitation | Source |
|----------|-----------------|-----------------|------------|--------|
| **Fiverr** | NO | Affiliate API only (buyer-side) | No gig creation, no seller management. Manual only. Unofficial scrapers exist but break frequently (Cloudflare). | [Quora](https://www.quora.com/Does-Fiverr-have-an-API), [Dev.to](https://dev.to/slmn/unofficial-fiverr-api-new-way-to-get-your-fiverr-data-2cdj) |
| **Upwork** | PARTIAL | GraphQL API: job posting, proposal management, contracts, billing, talent search | Cannot create new freelancer profiles programmatically. API key request required. 40K requests/day limit. | [Upwork Developer](https://www.upwork.com/developer/documentation/graphql/api/docs/index.html) |
| **Lemon Squeezy** | YES | Full REST API: products, checkouts, subscriptions, customers, webhooks | Best for digital product sales, not service delivery portals | [Lemon Squeezy](https://www.lemonsqueezy.com/gumroad-alternative) |
| **Gumroad** | YES | API for products, sales, subscriptions | Higher fees (10-30%), less control | [Gumroad](https://sologrowthlab.com/blog/gumroad-vs-lemon-squeezy-for-creators/) |
| **Stripe** | YES | Full payments API: checkout sessions, subscriptions, invoicing, customer portal | Need own website/landing page | Stripe Docs |
| **Google Business Profile** | YES | Business Information API: create/update listings, manage reviews, post updates | Requires Google Cloud project, OAuth. Designed for multi-location businesses. | [Google Developers](https://developers.google.com/my-business) |

### 5B. Programmatic Directory Submission

| Directory | Programmatic Submission? | Method | Source |
|-----------|------------------------|--------|--------|
| Google Business Profile | Yes | Official API (Business Information API) | [Google](https://support.google.com/business/answer/6333473?hl=en-GB) |
| Yell.com | No official API | Manual submission (free basic listing) | [WooRank](https://www.woorank.com/en/blog/free-business-directories-uk) |
| Thomson Local | NO DATA on API | Manual submission | N/A |
| Bing Places | Yes | Bing Places API | Microsoft Docs |
| Apple Maps | Yes | Apple Business Connect API | Apple Docs |
| Citation management (BrightLocal, Yext) | Yes | Multi-directory distribution via their APIs | [Lumos Marketing](https://lumos.marketing/blog/best-business-directories-for-small-businesses-in-2025-your-complete-guide-to-local-visibility/) |

### 5C. Cold Email to UK Ltd Companies (PECR Exemption)

| Aspect | Status | Detail | Source |
|--------|--------|--------|--------|
| PECR consent required for Ltd companies? | **NO** | "The PECR rule on direct marketing by electronic mail does not apply to corporate subscribers" -- ICO | [ICO](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/) |
| Who qualifies as corporate subscriber? | Ltd companies, LLPs, Scottish partnerships, government bodies | Sole traders and ordinary partnerships are NOT exempt | [ICO B2B](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/) |
| UK GDPR still applies? | **YES** | Must have lawful basis (legitimate interests), conduct LIA, offer opt-out | [Hybrid Legal](https://www.hybridlegal.co.uk/blog/using-business-emails-for-b2b-cold-outreach-in-the-uk-what-you-can-and-cant-do) |
| Opt-out requirement | **MANDATORY** | Must identify sender, include contact details, provide easy opt-out | [ICO](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/business-to-business-marketing/) |
| Companies House API (for prospecting data) | **FREE** | 4.5M+ registered companies, REST API, bulk CSV download available | [Companies House Developer](https://developer.company-information.service.gov.uk/) |
| Email addresses from Companies House? | **NO** | CH data includes registered address, officers, SIC codes -- NOT email addresses | [Companies House](https://download.companieshouse.gov.uk/en_output.html) |
| Data enrichment needed? | **YES** | Must scrape company websites or use enrichment services (e.g., Apollo, Hunter.io) for email addresses | Derived |
| UK Data (Use & Access) Act 2025 impact | Under review | Royal Assent June 2025; majority provisions phasing in through June 2026. Does NOT replace GDPR/PECR. ICO guidance under review. | [SmartSMS Solutions](https://smartsmssolutions.com/resources/blog/uk/b2b-b2c-email-marketing-rules-uk) |

### 5D. Terminal-Executable Prospecting Pipeline (Technical Feasibility)

| Step | Tool/Method | CLI/API? | Cost |
|------|-------------|----------|------|
| 1. Get Ltd company list by SIC code | Companies House API or bulk CSV | Yes (REST API, free API key) | Free |
| 2. Enrich with website URLs | Companies House data includes some; else scrape | Yes (API + scripting) | Free - low |
| 3. Find email addresses | Hunter.io API, Apollo.io API, or scrape company websites | Yes (API) | Freemium tiers available |
| 4. Validate emails | ZeroBounce, NeverBounce, or similar API | Yes (API) | ~$0.003-0.008/email |
| 5. Send cold email | Mailgun, SendGrid, Amazon SES API | Yes (full API/CLI) | ~$0.001/email (SES) |
| 6. Track opens/replies | Built into email APIs or use Instantly.ai, Lemlist API | Yes (API) | Freemium - $30+/mo |

---

## 6. Gaps & Unknowns

| Area | Gap | Impact |
|------|-----|--------|
| Fiverr seller conversion rates | NO DATA on what % of Fiverr impressions convert to orders for audit/copy gigs | Cannot model Fiverr revenue per listing |
| UK-specific productised service GMV | NO DATA on total UK market size for productised services specifically (vs. general BPO) | Cannot size the addressable market precisely |
| AI-generated audit report client satisfaction | NO DATA on NPS or retention for AI-generated vs. human-generated audit reports | Cannot assess quality risk |
| Lemon Squeezy / Gumroad for services | These platforms are designed for digital products, not service delivery. NO DATA on success rate of selling DFY services through them | Uncertain fit |
| Yell / Thomson Local API | NO DATA on whether these directories offer programmatic submission for service providers | Manual submission may be required |
| Email enrichment accuracy for UK Ltd companies | NO DATA on hit rate for email discovery from Companies House data alone | May need multiple enrichment sources |
| DUAA 2025 impact on PECR | ICO guidance under review as of Feb 2026; final regulations still phasing in | Regulatory uncertainty (low risk for corporate subscribers) |
| Upwork proposal win rates for productised services | NO DATA on acceptance rates when offering fixed-price productised packages via Upwork | Cannot model Upwork revenue |
| Client willingness to pay for AI-generated deliverables | Emerging qualitative data only; no UK-specific quantitative studies found | Perception/trust risk unknown |

---

## Source Index

All URLs cited inline. Key primary sources:

1. ICO (UK Information Commissioner's Office) -- PECR/B2B marketing rules: https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/
2. Companies House Developer Hub: https://developer.company-information.service.gov.uk/
3. Fiverr Help Center: https://help.fiverr.com/
4. Upwork Developer Documentation: https://www.upwork.com/developer
5. Google Business Profile APIs: https://developers.google.com/my-business
6. SPP Blog (productised service examples): https://spp.co/blog/productized-services-examples/
7. LocaliQ UK Digital Marketing Statistics: https://localiq.co.uk/blog/uk-digital-marketing-statistics
8. Screaming Frog SEO Spider: https://www.screamingfrog.co.uk/seo-spider/
9. Looka: https://looka.com/
10. TargetedSEO UK Audit Pricing: https://targetedseo.co.uk/seo-audit-costs-uk/

---

*Report compiled: February 2026. All data points sourced from publicly available information. Where exact figures were unavailable, ranges from multiple sources are provided. "NO DATA" is stated explicitly where information could not be found.*
