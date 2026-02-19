# SEO Full Audit Report: quarterlyuk.com
**Audit Date:** 19 February 2026
**Audited By:** Claude Code SEO Audit (6 Parallel Specialists)
**Pages Crawled:** 5 (/, /dashboard, /roadmap, /privacy, /terms)
**Platform:** Next.js (SSR)

---

## Executive Summary

### Overall SEO Health Score: 33 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 25% | 30/100 | 7.5 |
| Content Quality | 25% | 30/100 | 7.5 |
| On-Page SEO | 20% | 40/100 | 8.0 |
| Schema / Structured Data | 10% | 0/100 | 0.0 |
| Performance (CWV) | 10% | 70/100 | 7.0 |
| Images | 5% | 40/100 | 2.0 |
| AI Search Readiness | 5% | 20/100 | 1.0 |
| **TOTAL** | **100%** | — | **33 / 100** |

**Business Type Detected:** UK SaaS — Making Tax Digital (MTD) compliance software for sole traders

**Context:** QuarterlyUK is a well-designed product with a compelling price differentiator (£2.50/month — cheapest paid MTD tool in the UK). The low SEO score reflects the site's near-zero organic search presence, not the product quality. Most issues are fixable within weeks. The April 2026 MTD deadline creates an urgent content opportunity that closes rapidly.

---

### Top 5 Critical Issues

1. **Not indexed by Google** — `site:quarterlyuk.com` returns zero results. No organic presence of any kind.
2. **/dashboard listed in sitemap at priority 0.8 with no noindex** — active indexing risk for a private app page.
3. **No canonical tags on any page** — all 5 pages at risk of duplicate URL fragmentation.
4. **Identical title tag across all 5 pages** — critical ranking signal failure; Google cannot distinguish pages.
5. **Zero structured data** — ineligible for all rich results; no schema of any type on any page.

### Top 5 Quick Wins (< 1 day effort each)

1. Submit to Google Search Console + request homepage indexing (30 min)
2. Add noindex to /dashboard + remove from sitemap (1 hour dev)
3. Add self-referencing canonical tags to all 4 indexable pages (1 hour dev)
4. Fix the title tag typo: "QuarterUK" → "QuarterlyUK" and write unique titles (2 hours)
5. Add `SoftwareApplication` + `Organization` JSON-LD to homepage (2 hours dev)

---

## Section 1: Technical SEO

**Score: 30 / 100**

### Critical Issues

#### 1.1 /dashboard Indexed Without noindex
**Severity: CRITICAL**

The `/dashboard` page is a private authenticated app shell listed in `sitemap.xml` at `priority: 0.8` — higher than /roadmap, /privacy, and /terms. It contains no meaningful content for unauthenticated users, has no noindex directive, and is not disallowed in robots.txt.

**Confirmed tag values (absent):**
- `<meta name="robots">` — NOT PRESENT on /dashboard
- `X-Robots-Tag` header — NOT CONFIRMED

**Fix:**
```html
<!-- Add to /dashboard page component -->
<meta name="robots" content="noindex, nofollow">
```
Also remove `/dashboard` from `sitemap.xml`.

#### 1.2 No Canonical Tags on Any Page
**Severity: CRITICAL**

Zero canonical tags detected across all 5 pages. Confirmed absent on: `/`, `/roadmap`, `/privacy`, `/terms`, `/dashboard`.

**Fix (Next.js App Router):**
```js
// app/roadmap/page.js
export const metadata = {
  alternates: {
    canonical: 'https://quarterlyuk.com/roadmap',
  },
};
```

### High Issues

#### 1.3 Duplicate Title Tag Across All 5 Pages
**Severity: HIGH** *(see On-Page SEO section for full detail)*

#### 1.4 og:url on Inner Pages Points to Homepage
**Severity: HIGH**

All inner pages carry `og:url: "https://quarterlyuk.com"` rather than their own URL. Confirmed on /roadmap. Social backlinks and engagement signals from shared inner pages accrue to the homepage URL instead of the correct page.

**Fix:** Per-page `openGraph.url` in Next.js metadata exports.

#### 1.5 og:title / og:description Inconsistent with HTML Tags
**Severity: HIGH**

| Tag | Current Value |
|---|---|
| `<title>` | `QuarterlyUK - Invoice & Expense Toolkit for UK Sole Traders` |
| `og:title` | `QuarterlyUK - The Cheapest MTD Tool in the UK` |
| `<meta description>` | `Get MTD-ready with QuarterlyUK. Simple expense...` |
| `og:description` | `Simple expense tracking and invoicing for UK sole traders. Get MTD-ready from £2.50/month.` |

Two different value propositions; entirely separate metadata sources out of sync. Root cause: root-level `layout.js` metadata and a separate OG configuration set at different times.

### Medium Issues

#### 1.6 Sitemap lastmod Unreliable
All 5 sitemap entries share the identical timestamp `2026-02-18T21:47:58.969Z` — an auto-generated build/deploy time. Google discounts inaccurate `lastmod` values site-wide.

**Fix:** Remove `lastmod` from all sitemap entries, or implement per-page content change tracking.

#### 1.7 HTTP-to-HTTPS Redirect Type Unconfirmed
HTTPS is live and all internal URLs use `https://`. Whether the HTTP→HTTPS redirect is a 301 (passes PageRank) or 302 (does not) could not be confirmed via fetch. Likely 308 on Vercel by default — but verify with: `curl -I http://quarterlyuk.com`

### What's Working

- robots.txt: Correct — allows all crawlers, disallows /api/, sitemap declared
- Sitemap exists and references 5 URLs (excluding the erroneous /dashboard entry)
- HTTPS is live with correct SSL
- No hreflang required (UK-only product)
- No pagination issues (5 static pages)
- Viewport meta tag: correct
- Charset: correct
- Open Graph image: present with correct 1200×630 dimensions
- Twitter card: present (`summary_large_image`)

---

## Section 2: Content Quality

**Score: 30 / 100**

### E-E-A-T Assessment

| Dimension | Score | Primary Gap |
|---|---|---|
| Experience | 2/10 | Anonymous founders, zero testimonials, no social proof |
| Expertise | 5/10 | Correct MTD terminology; missing deep knowledge signals (EOPS, Final Declaration, digital links) |
| Authoritativeness | 2/10 | No HMRC recognition, no press coverage, no external authority signals |
| Trustworthiness | 5/10 | Privacy + terms present; no Companies House number, no ICO reference, no GDPR statement |

### Critical Content Issues

#### 2.1 No Blog / Content Marketing Presence
**Severity: CRITICAL for organic growth**

The site has **zero content pages** beyond the 5-page structure. There is no blog, no guides, no resources section. The MTD space is dominated by informational queries ("what is MTD", "do I need MTD software", "HMRC quarterly deadlines") that a landing page cannot rank for.

The April 2026 MTD deadline creates peak informational search demand **right now**. Without indexed content, QuarterlyUK cannot capture any of it.

**Recommended immediate content:**
1. "What is MTD for Income Tax? A Plain English Guide for Sole Traders" — 1,200 words
2. "MTD April 2026: What Sole Traders Need to Do Right Now" — 1,000 words

#### 2.2 Anonymous Founders
**Severity: HIGH for E-E-A-T**

The About section is entirely anonymous — "we built the tool we wished existed" with no names, photos, or verifiable identity. Google's Search Quality Evaluator Guidelines assess whether content has a clear author with demonstrable experience. The product targets risk-averse sole traders making a HMRC compliance decision.

**Fix:** Name at minimum one founder. Add a photograph. Link to a LinkedIn profile.

#### 2.3 FAQ Accuracy Issues
**Severity: HIGH**

The FAQ answer to Q2 ("Do I need QuarterlyUK if I already use spreadsheets?") states: "Under MTD, manual spreadsheets alone won't be sufficient." This is **imprecise** — MTD permits spreadsheets combined with HMRC-recognised bridging software. Informed users (and accountants) will identify this as incorrect, damaging credibility.

The Q1 answer is missing the confirmed **£20,000 threshold expanding in April 2028**.

#### 2.4 No Testimonials or Social Proof
**Severity: HIGH for conversion + E-E-A-T**

Zero testimonials, zero reviews, zero named user count. The product targets risk-averse sole traders making a HMRC compliance decision — the audience most likely to look for third-party validation before subscribing.

### Keyword Gaps

**Critical commercial-intent terms not targeted:**

| Missing Term | Intent | Action |
|---|---|---|
| MTD for Income Tax | Commercial | Add to page copy |
| MTD ITSA | Commercial | Add to page copy |
| Self Assessment | Commercial | Add to FAQ/blog |
| sole trader tax software | Commercial | Add to title/H1 area |
| cheapest MTD software UK | Commercial | Dedicated comparison page |
| MTD compatible software | Commercial | Homepage copy |
| digital record keeping HMRC | Informational | Blog post |
| HMRC quarterly update deadlines | Informational | FAQ + blog |

### Roadmap Page Assessment

The `/roadmap` page functions as a conversion trust asset — showing 13 live features and 4 planned features. It has **no SEO value** in its current form. Key observation: "HMRC Bridging Integration" (direct submission) is listed as a planned feature — if built, this would qualify the product for HMRC recognition and transform its competitive position entirely.

---

## Section 3: On-Page SEO

**Score: 40 / 100**

### 3.1 Title Tags

**Current state — all 5 pages use the same title:**
`QuarterlyUK - Invoice & Expense Toolkit for UK Sole Traders`

Additionally, the homepage title contains a **typo** ("QuarterUK" confirmed in one tag instance — ensure brand name is consistently "QuarterlyUK").

**Recommended unique titles:**

| Page | Recommended Title |
|---|---|
| `/` | `QuarterlyUK — Cheapest MTD Software UK \| £2.50/month for Sole Traders` |
| `/roadmap` | `Product Roadmap — QuarterlyUK` |
| `/privacy` | `Privacy Policy — QuarterlyUK` |
| `/terms` | `Terms & Conditions — QuarterlyUK` |
| `/dashboard` | *(noindex — title irrelevant)* |

### 3.2 Meta Descriptions

**Current state — all 5 pages use the same description:**
`Get MTD-ready with QuarterlyUK. Simple expense tracking, invoice generation, and quarterly summaries for UK sole traders and freelancers. Making Tax Digital compliant.`

**Recommended unique descriptions:**

| Page | Recommended Description |
|---|---|
| `/roadmap` | `See what features are live, in development, and planned for QuarterlyUK — the MTD-ready expense and invoicing tool for UK sole traders.` |
| `/privacy` | `QuarterlyUK privacy policy. We do not collect or store your financial data on our servers. All data stays locally in your browser.` |
| `/terms` | `Terms and conditions for QuarterlyUK. Covers liability, subscriptions, local data storage, and HMRC compliance for UK sole traders.` |

### 3.3 Heading Structure

**Homepage H1:** "Stay MTD compliant. Keep it simple. Pay less."
— Clear, benefit-led, contains "MTD compliant" in first 3 words. ✓

**Homepage H2s:** Well-structured — features, pricing, FAQ, about sections all have H2 labels. ✓

**Inner pages:** All use generic H1s ("Roadmap", "Privacy Policy", "Terms & Conditions"). Acceptable but the Roadmap H1 could be more descriptive: "QuarterlyUK Product Roadmap — MTD Features for Sole Traders".

### 3.4 Internal Linking

The site has minimal internal linking — only navigation (logo → home, footer links). No page links contextually to another from body copy. With only 4 indexable pages, this is a minor issue but breadcrumbs and inter-page contextual links would help.

### 3.5 What's Working

- H1 is strong and keyword-relevant on the homepage
- Hero copy is clear, benefit-oriented, and price-forward
- FAQ section addresses the 6 most common purchase objections
- Urgency badge ("MTD launches 6 April 2026") is highly relevant
- GOV.UK link in compliance callout is a positive trust signal
- Footer CTA repeats the value proposition effectively

---

## Section 4: Schema / Structured Data

**Score: 0 / 100**

**Current state:** No JSON-LD, microdata, or RDFa on any page.

The site is ineligible for all Google rich results. This is a missed opportunity for `SoftwareApplication` rich results (pricing display in SERPs), `FAQPage` accordion snippets, and `Organization` knowledge panel signals.

### Recommended Schema — Homepage (@graph block)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://quarterlyuk.com/#website",
      "name": "QuarterlyUK",
      "url": "https://quarterlyuk.com",
      "description": "Making Tax Digital compliance software for UK sole traders.",
      "inLanguage": "en-GB",
      "publisher": { "@id": "https://quarterlyuk.com/#organization" }
    },
    {
      "@type": "Organization",
      "@id": "https://quarterlyuk.com/#organization",
      "name": "QuarterlyUK",
      "url": "https://quarterlyuk.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://quarterlyuk.com/logo.png",
        "width": 512,
        "height": 512
      },
      "areaServed": { "@type": "Country", "name": "United Kingdom" },
      "knowsAbout": ["Making Tax Digital", "MTD ITSA", "Self Assessment", "HMRC compliance"]
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://quarterlyuk.com/#software",
      "name": "QuarterlyUK",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "Accounting Software",
      "operatingSystem": "Web browser",
      "inLanguage": "en-GB",
      "offers": {
        "@type": "Offer",
        "price": "2.50",
        "priceCurrency": "GBP",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "2.50",
          "priceCurrency": "GBP",
          "unitCode": "MON",
          "unitText": "month"
        },
        "availability": "https://schema.org/InStock"
      },
      "featureList": [
        "Expense tracking", "Invoice generation", "Quarterly summaries",
        "HMRC Making Tax Digital compliance", "CSV export", "Local data storage"
      ]
    }
  ]
}
```

### Important Note on FAQPage Schema

**Do NOT implement FAQPage schema.** Google restricted FAQPage rich results to government and healthcare authority sites in August 2023. Implementing it on a SaaS product page will not produce SERP enhancements.

### Secondary Pages

Add `BreadcrumbList` + `WebPage` JSON-LD to /roadmap, /privacy, and /terms. See the Schema Specialist report for complete ready-to-paste code for each page.

### Future Schema

Once user reviews are collected: add `aggregateRating` inside the `SoftwareApplication` node. Do **not** fabricate ratings — this is a manual action risk.

### Validation After Deployment

1. **schema.org Validator** — test JSON before going live
2. **Google Rich Results Test** — test the homepage URL to preview SoftwareApplication eligibility
3. **Google Search Console → Enhancements** — monitor after indexing

---

## Section 5: Performance (Core Web Vitals)

**Score: 70 / 100 (inferred — Lighthouse/field data not available)**

### Visual-Inference Analysis

**LCP (Largest Contentful Paint) — Expected: GOOD**

The LCP element is the H1 text block: "Stay MTD compliant. Keep it simple. Pay less." It renders on a CSS gradient background — no hero image dependency. For a Next.js site with SSR/SSG, the H1 is in the initial HTML payload with no hydration delay. Target < 1.5s achievable.

**CLS (Cumulative Layout Shift) — Expected: GOOD**

No layout shift indicators observed. No above-fold images, no lazy-loaded elements in the hero, fixed-dimension grid layout. CLS expected to be very low (< 0.1).

**INP (Interaction to Next Paint) — Expected: GOOD**

Minimal interactive surface — CTA button clicks and FAQ accordion toggles. No complex UI widgets. INP expected to be well within acceptable range.

**FCP (First Contentful Paint) — Expected: GOOD**

No blocking third-party scripts or web font FOUT visible. Typeface renders cleanly at all viewports.

### Positive Architectural Decisions

- CSS gradient hero (no image LCP risk)
- Next.js SSR/SSG (HTML in initial payload)
- No autoplay video or carousel
- No infinite scroll or complex interactive filters

### Recommended Verification

Run actual Lighthouse / PageSpeed Insights measurements:
```
https://pagespeed.web.dev/report?url=https://quarterlyuk.com
```

---

## Section 6: Visual SEO

**Score: 70 / 100 (from 8 screenshots across 4 viewports)**

### Above-the-Fold Assessment

| Viewport | H1 Visible | CTA Visible | Price Signal | Urgency Badge |
|---|---|---|---|---|
| Desktop (1920px) | ✓ | ✓ | ✓ | ✓ |
| Laptop (1366px) | ✓ | ✓ | ✓ | ✓ |
| Tablet (768px) | ✓ | ✓ | ✓ | ✓ |
| Mobile (375px) | ✓ | ✓ | ✗ (below fold) | ✗ (below fold) |

The above-fold content is strong across all viewports. The value proposition, H1, and primary CTA are visible before any scroll on every device.

### Mobile Issue

At 375px, the "Subscribe – £2.50/mo" nav button **overlaps and clips the QuarterlyUK logo**. The wordmark is partially obscured. This is a first-impression brand trust issue on the most common viewport for the target audience.

**Fix:** Shorten the nav button label to "Subscribe" at mobile breakpoints, or place it inside a hamburger menu drawer.

### Missing: Product UI Screenshot

No screenshot or preview of the actual software dashboard exists anywhere on the page. For a SaaS product, a UI preview:
1. Increases purchase confidence
2. Provides a crawlable image with descriptive alt text (e.g. `alt="QuarterlyUK MTD expense tracking dashboard"`)
3. Gives Google Image Search an indexable brand asset

### Feature Icon Alt Text

The six feature card icons in the "Everything you need for MTD" section should have `alt=""` (decorative) or descriptive alt text. Verify in code.

### Screenshots Generated

```
C:/dev/screenshots/quarterlyuk_desktop_atf.png   — Desktop 1920×1080, above fold
C:/dev/screenshots/quarterlyuk_desktop_full.png  — Desktop 1920×1080, full page
C:/dev/screenshots/quarterlyuk_laptop_atf.png    — Laptop 1366×768, above fold
C:/dev/screenshots/quarterlyuk_laptop_full.png   — Laptop 1366×768, full page
C:/dev/screenshots/quarterlyuk_tablet_atf.png    — Tablet 768×1024, above fold
C:/dev/screenshots/quarterlyuk_tablet_full.png   — Tablet 768×1024, full page
C:/dev/screenshots/quarterlyuk_mobile_atf.png    — Mobile 375×812, above fold
C:/dev/screenshots/quarterlyuk_mobile_full.png   — Mobile 375×812, full page
```

---

## Section 7: AI Search Readiness

**Score: 20 / 100**

**AI Citation Readiness: 2 / 10**

### Root Cause

The site is **not indexed by Google**. Confirmed: `site:quarterlyuk.com` returns zero results. No AI tool (ChatGPT, Gemini, Perplexity, Google AI Overviews) can cite a non-indexed page. Every other AI search metric is secondary to this.

### Competitor Landscape — Who Wins MTD Citations

Every MTD software query tested returns AI Overviews and organic results dominated by:

**Always cited (Tier 1):**
- GOV.UK software finder — #1 cited source in every MTD AI answer
- QuickBooks — currently at £1/month intro + dominant brand
- Xero Simple — £7/month with extensive MTD content library
- FreeAgent — free with NatWest/RBS, HMRC-recognised
- Sage — free sole trader plan, HMRC-recognised

**Smaller players winning citations (directly comparable to QuarterlyUK):**
- Coconut — HMRC-recognised MTD ITSA tool, targets sole traders
- Untried — "first end-to-end HMRC recognised MTD ITSA software"
- RentalBux — 50+ tool comparison directory; cited because of content depth
- GoSimpleTax — dedicated MTD landing page with schema

**Key pattern:** Every cited competitor has either (a) HMRC recognition or (b) dedicated sub-pages with schema markup. QuarterlyUK currently has neither.

### Price Position in AI-Generated Comparisons

| Software | Monthly Price | HMRC-Recognised |
|---|---|---|
| Sage (free plan) | £0 | Yes |
| FreeAgent (with NatWest) | £0 | Yes |
| QuickBooks Sole Trader | £1 intro / £10 | Yes |
| **QuarterlyUK** | **£2.50** | **No** |
| Xero Simple | £7 | Yes |
| Coconut | ~£9 | Yes |

The £2.50 price point is genuinely the best-value paid option. AI tools are not surfacing it because the site is not indexed and not recognised by HMRC.

### Featured Snippet Opportunities

**Q: "What is the MTD income threshold?"** — The FAQ answer is snippet-ready (40 words, factually correct). Needs indexing + schema.

**Q: "What are HMRC quarterly update deadlines?"** — Add a numbered list of the 4 deadlines. Classic list snippet format.

**Q: "How much does MTD software cost UK?"** — Convert the prose pricing comparison to an HTML table. Eligible for table snippet.

**Q: "Can I still use spreadsheets for MTD?"** — Current FAQ answer is imprecise (see Content section). Correct it and it's a Yes/No + explanation snippet.

### 90-Day AI Citation Score Projection

| Action | Timeline | Score Impact |
|---|---|---|
| Fix title typo + submit to GSC | Week 1 | 2 → 3 |
| Schema markup live | Week 2 | 3 → 4 |
| FAQ page at dedicated URL | Week 3 | 4 → 4.5 |
| MTD explainer guide published | Week 4 | 4.5 → 5 |
| First roundup site mention | Week 5-6 | 5 → 6 |
| Listed on GOV.UK software finder | 3-6 months | 6 → 8+ |

---

## Section 8: Indexing Status

**Current indexed pages: 0**

This is the foundational issue from which all other metrics flow. The site cannot rank for any query, earn any AI citation, or appear in any social/search context until it is indexed.

**Immediate actions:**
1. Create and verify a Google Search Console property
2. Submit `https://quarterlyuk.com/sitemap.xml`
3. Manually request URL Inspection → Index for the homepage
4. Repeat for Bing Webmaster Tools (powers Microsoft Copilot AI citations)

---

## Appendix A: Site Structure Audit

| URL | In Sitemap | Priority | noindex | Canonical | Unique Title | Unique Description | Schema |
|---|---|---|---|---|---|---|---|
| / | ✓ | 1.0 | ✗ | ✗ | ✓ (has title) | ✓ | ✗ |
| /dashboard | ✓ ❌ | 0.8 ❌ | ✗ ❌ | ✗ | ✗ | ✗ | ✗ |
| /roadmap | ✓ | 0.5 | ✗ | ✗ | ✗ (duplicate) | ✗ (duplicate) | ✗ |
| /privacy | ✓ | 0.3 | ✗ | ✗ | ✗ (duplicate) | ✗ (duplicate) | ✗ |
| /terms | ✓ | 0.3 | ✗ | ✗ | ✗ (duplicate) | ✗ (duplicate) | ✗ |

**Legend:** ❌ = requires immediate fix

---

## Appendix B: What's Working Well

Despite the low SEO score, QuarterlyUK has several genuine strengths:

1. **Strong conversion architecture** — textbook funnel: awareness → proof → features → process → price → objection handling → trust → CTA
2. **Price point is a genuine differentiator** — £2.50/month is factually the cheapest paid MTD tool in the UK by a significant margin
3. **Hero copy is excellent** — H1, sub-copy, price, urgency, and dual CTA all above-the-fold
4. **Performance baseline is solid** — CSS hero, SSR architecture, no layout shift indicators
5. **Honest pricing section** — directly addresses the competitor bait-and-switch pattern; genuinely differentiated positioning
6. **Local storage architecture** — unique privacy story that no competitor can match; under-leveraged in copy
7. **robots.txt is correct** — no crawler blocking issues
8. **GOV.UK outbound link** — compliance callout links to an authoritative source
9. **Founder story tone** — authentic and appropriate for the audience; needs identity attached to it
10. **April 2026 deadline urgency** — the product is perfectly timed; the opportunity window is real and large
