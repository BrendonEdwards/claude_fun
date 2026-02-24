# SEO Action Plan: quarterlyuk.com
**Generated:** 19 February 2026
**Overall SEO Health Score:** 33 / 100

---

## Priority Definitions

- **CRITICAL** — Blocks indexing or actively harms the site. Fix immediately, today.
- **HIGH** — Significantly impacts rankings and trust. Fix within 7 days.
- **MEDIUM** — Clear optimisation opportunity. Fix within 30 days.
- **LOW** — Nice to have. Schedule for backlog.

---

## CRITICAL — Fix Today

### C1. Submit to Google Search Console
**Effort:** 30 min | **Impact:** Unblocks everything
**Why:** `site:quarterlyuk.com` returns zero results. The site has no organic presence of any kind. Nothing else matters until this is resolved.

**Steps:**
1. Go to https://search.google.com/search-console
2. Add property for `https://quarterlyuk.com`
3. Verify via HTML tag or DNS
4. Submit sitemap at `https://quarterlyuk.com/sitemap.xml`
5. Use URL Inspection tool → Request Indexing for the homepage
6. Repeat for Bing Webmaster Tools: https://www.bing.com/webmasters

---

### C2. Add noindex to /dashboard + Remove from Sitemap
**Effort:** 30 min dev | **Impact:** Stops active indexing risk for private app page
**Why:** `/dashboard` is listed in the sitemap at priority 0.8 with no noindex. Google will index an empty app shell and mark it as low-quality content.

```html
<!-- Add to the /dashboard page component <head> -->
<meta name="robots" content="noindex, nofollow">
```

In `sitemap.xml` or wherever the sitemap is generated: remove the `/dashboard` entry entirely.

---

### C3. Fix the Title Tag Typo
**Effort:** 15 min | **Impact:** Brand credibility + keyword fix
**Why:** The homepage `<title>` tag reads `"QuarterUK"` (missing "ly"). The brand name is `QuarterlyUK`.

Also rewrite the title to include the primary keyword "MTD":
```
QuarterlyUK — Cheapest MTD Software UK | £2.50/month for Sole Traders
```

---

### C4. Add Self-Referencing Canonical Tags to All 4 Indexable Pages
**Effort:** 1 hour dev | **Impact:** Prevents URL fragmentation and duplicate content dilution
**Why:** Zero canonical tags detected site-wide.

```js
// Next.js App Router — add to each page's metadata export
export const metadata = {
  alternates: {
    canonical: 'https://quarterlyuk.com', // change per page
  },
};
```

Pages needing canonicals: `/`, `/roadmap`, `/privacy`, `/terms`

---

## HIGH — Fix Within 7 Days

### H1. Write Unique Title Tags for All Pages
**Effort:** 2 hours | **Impact:** Critical for page-level keyword targeting

| Page | Recommended Title |
|---|---|
| `/` | `QuarterlyUK — Cheapest MTD Software UK \| £2.50/month for Sole Traders` |
| `/roadmap` | `Product Roadmap — QuarterlyUK` |
| `/privacy` | `Privacy Policy — QuarterlyUK` |
| `/terms` | `Terms & Conditions — QuarterlyUK` |

---

### H2. Write Unique Meta Descriptions for All Pages
**Effort:** 1 hour | **Impact:** Higher CTR from SERPs, prevents Google auto-generating bad snippets

| Page | Recommended Description |
|---|---|
| `/` | `The cheapest MTD-ready software in the UK. Track expenses, generate invoices, and produce quarterly summaries for HMRC — from £2.50/month. Built for UK sole traders.` |
| `/roadmap` | `See what features are live, in development, and planned for QuarterlyUK — the MTD-ready expense and invoicing tool for UK sole traders.` |
| `/privacy` | `QuarterlyUK privacy policy. Your financial data never leaves your device — stored locally in your browser, not on our servers.` |
| `/terms` | `Terms and conditions for QuarterlyUK. Covers subscriptions, local data storage, HMRC compliance, and cancellation for UK sole traders.` |

---

### H3. Implement SoftwareApplication + Organization Schema on Homepage
**Effort:** 2 hours dev | **Impact:** Rich result eligibility, knowledge panel signals

Add to the homepage `<head>` as a `<script type="application/ld+json">` tag:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://quarterlyuk.com/#website",
      "name": "QuarterlyUK",
      "url": "https://quarterlyuk.com",
      "inLanguage": "en-GB",
      "publisher": { "@id": "https://quarterlyuk.com/#organization" }
    },
    {
      "@type": "Organization",
      "@id": "https://quarterlyuk.com/#organization",
      "name": "QuarterlyUK",
      "url": "https://quarterlyuk.com",
      "areaServed": { "@type": "Country", "name": "United Kingdom" },
      "knowsAbout": ["Making Tax Digital", "MTD ITSA", "HMRC compliance", "Sole trader accounting"]
    },
    {
      "@type": "SoftwareApplication",
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
        "HMRC Making Tax Digital compliance", "CSV export", "Local browser storage"
      ],
      "publisher": { "@id": "https://quarterlyuk.com/#organization" }
    }
  ]
}
```

Validate at: https://validator.schema.org and https://search.google.com/test/rich-results

---

### H4. Fix og:url on Inner Pages
**Effort:** 30 min dev | **Impact:** Social backlinks accrue to correct URLs

All inner pages currently set `og:url` to the homepage. Each page's Open Graph metadata must reference its own URL.

```js
// app/roadmap/page.js
export const metadata = {
  openGraph: {
    url: 'https://quarterlyuk.com/roadmap',
  },
};
```

---

### H5. Add Founder Identity to About Section
**Effort:** 1 hour | **Impact:** Highest-impact E-E-A-T improvement at zero cost
**Why:** Anonymous founders are a trust barrier for cautious buyers and a red flag for Google Quality Raters evaluating YMYL-adjacent content.

Add: name, photo, and link to a verifiable professional profile (LinkedIn or equivalent).

---

### H6. Correct FAQ Answer Q2 (Spreadsheets)
**Effort:** 15 min | **Impact:** Credibility with accountants and informed users

Current answer implies spreadsheets are entirely disallowed under MTD — this is factually incorrect. MTD permits spreadsheets combined with HMRC-recognised bridging software.

**Corrected answer:**
"Under MTD, spreadsheets alone aren't sufficient — you need software that can submit data digitally to HMRC. You can use spreadsheets paired with HMRC-approved bridging software, or purpose-built MTD software like QuarterlyUK that handles the record-keeping and generates your quarterly summaries."

Also: Add the £20,000 threshold (April 2028) to the Q1 answer.

---

### H7. Fix Mobile Header Logo Overlap
**Effort:** 1 hour dev | **Impact:** Brand trust on mobile (likely majority of traffic)

At 375px the "Subscribe – £2.50/mo" nav button clips the QuarterlyUK logo. Shorten the label to "Subscribe" at mobile breakpoints, or move the CTA inside a hamburger menu drawer.

---

## MEDIUM — Fix Within 30 Days

### M1. Launch a Blog with Two Priority Articles
**Effort:** 4-6 hours writing per article | **Impact:** First organic traffic + AI citation eligibility

The April 2026 MTD deadline search demand is at peak **right now**. Publish at minimum two articles before 6 April 2026:

**Article 1 (publish immediately):**
Title: "MTD April 2026: What Sole Traders Need to Do Right Now"
URL: `/blog/mtd-april-2026-sole-traders-guide`
Length: 1,000 words
Keywords: MTD April 2026, Making Tax Digital deadline, sole trader MTD preparation

**Article 2:**
Title: "What is Making Tax Digital for Income Tax? A Plain English Guide"
URL: `/blog/what-is-making-tax-digital-income-tax-sole-traders`
Length: 1,500 words
Keywords: Making Tax Digital for Income Tax, MTD ITSA, MTD sole trader guide

Each article must: have a named author byline, link internally to the pricing/sign-up page, and be added to the sitemap.

---

### M2. Add BreadcrumbList Schema to /roadmap, /privacy, /terms
**Effort:** 1 hour dev | **Impact:** Breadcrumb trails in SERPs

See FULL-AUDIT-REPORT.md Section 4 for ready-to-paste JSON-LD for each page.

---

### M3. Expand FAQ to 15+ Questions + Create /faq Page
**Effort:** 3-4 hours | **Impact:** Featured snippet eligibility, AI citation eligibility

Move the FAQ to a dedicated `/faq` URL. Expand from 6 to at least 15 questions. Add these priority questions:

1. What are the HMRC quarterly update deadlines?
2. Does MTD replace Self Assessment?
3. What is a Final Declaration under MTD?
4. What is bridging software and which tools work with QuarterlyUK?
5. What expense categories does HMRC use for sole traders?
6. What happens if I miss an MTD quarterly deadline?
7. When does MTD apply to sole traders earning £30,000?
8. When does MTD apply to sole traders earning £20,000?
9. What records must I keep digitally under MTD?
10. Can my accountant submit my MTD updates for me?

---

### M4. Add Legal Transparency to Footer
**Effort:** 30 min | **Impact:** Trust signal for UK financial product buyers

Add to footer:
- Companies House registration number
- Registered address
- ICO registration reference number
- Explicit "Not a tax adviser" disclaimer (may already exist — verify prominence)

---

### M5. Reframe Local Storage as a GDPR Feature
**Effort:** 1 hour copywriting | **Impact:** Converts a technical detail into a premium trust signal

The local browser storage architecture means user data never leaves their device — no server-side data breach risk, no third-party sharing, full GDPR data minimisation compliance. This is a genuinely unique differentiator vs. every cloud-based competitor.

Current copy buries this in the FAQ. It should be a prominent section: "Your data never leaves your device. Ever."

Add an ICO registration reference for GDPR credibility.

---

### M6. Fix Sitemap lastmod
**Effort:** 30 min dev | **Impact:** Crawl efficiency

Remove `lastmod` from all sitemap entries (acceptable per sitemap protocol) or implement per-page tracking that only updates when content actually changes.

---

### M7. Confirm HTTP→HTTPS Redirect is 301/308
**Effort:** 5 min | **Impact:** Full PageRank transfer for any HTTP inbound links

```bash
curl -I http://quarterlyuk.com
```

Verify `Location: https://quarterlyuk.com` with status `301` or `308`. If it shows `302`, escalate to hosting provider (Vercel should use 308 by default).

---

### M8. Add Product UI Screenshot
**Effort:** 2 hours design + dev | **Impact:** Conversion + image SEO

Add a screenshot or short animated GIF of the expense tracking dashboard above the fold or in the "How it Works" section. Use descriptive alt text:
```html
<img src="/dashboard-preview.png" alt="QuarterlyUK MTD expense tracking dashboard — HMRC categories view">
```

---

### M9. Source the "864,000 sole traders" Statistic
**Effort:** 15 min | **Impact:** Trust + authoritative outbound link

Link the figure to the GOV.UK press release: https://www.gov.uk/government/news/act-now-864000-sole-traders-and-landlords-face-new-tax-rules-in-two-months

---

### M10. Reach Out for Third-Party Coverage
**Effort:** 2-3 hours outreach | **Impact:** AI citation eligibility, backlinks

Target these specific sites with the £2.50 price point as the news hook:

| Site | URL | Why |
|---|---|---|
| RentalBux MTD Directory | rentalbux.com/mtd-software | Most-cited comparison in AI MTD answers; accepts tool submissions |
| startups.co.uk | startups.co.uk | Editorial UK business site; MTD coverage |
| nuvo.co.uk | nuvo.co.uk/blog | Sole trader + landlord focus |
| AccountingWEB | accountingweb.co.uk | Largest UK accountancy community; practitioner referrals |
| bytestart.co.uk | bytestart.co.uk | Small business accounting software section |

**Pitch:** "QuarterlyUK is the only paid MTD tool at £2.50/month — £4.50/month cheaper than the next cheapest paid option. Your comparison guide doesn't currently cover the sub-£5 tier."

---

## LOW — Backlog

### L1. Apply for HMRC Recognition
**Effort:** Significant dev (requires HMRC API integration) | **Impact:** HIGH when done

Register at: https://developer.service.hmrc.gov.uk/guides/income-tax-mtd-end-to-end-service-guide/

Being listed on the GOV.UK software finder is the single most authoritative trust signal in this product category. Every AI tool cites the GOV.UK page first for MTD software queries. This is a long-term goal that requires building direct HMRC submission capability.

**Interim:** Add a roadmap entry for "Direct HMRC MTD submission — Q2/Q3 2026" as a public signal.

---

### L2. Add Testimonials
**Effort:** 1 week (gathering) + 1 hour (implementation) | **Impact:** E-E-A-T + conversion

Reach out to early subscribers for first name + trade type quote. Even 3 testimonials significantly change the page's credibility for risk-averse buyers.

Eventually: Trustpilot profile with verified reviews enables `aggregateRating` schema for star ratings in SERPs.

---

### L3. Build Comparison Page
**Effort:** 3-4 hours | **Impact:** Commercial-intent keyword capture

URL: `/blog/cheapest-mtd-software-uk-2026`

A comparison table showing real post-introductory prices for QuickBooks, Xero, FreeAgent, Sage, Coconut, and QuarterlyUK. Targets "cheapest MTD software UK" — a query the site should be winning by default that it currently cannot rank for.

---

### L4. Build HMRC Expense Categories Page
**Effort:** 2 hours | **Impact:** Long-tail traffic + HMRC-aware user conversion

URL: `/hmrc-expense-categories`

List all 14 HMRC self-employment expense categories with descriptions and examples. Ranks for "HMRC expense categories sole trader" and demonstrates the product uses the correct taxonomy.

---

### L5. Build Switcher Guide
**Effort:** 2 hours | **Impact:** Bottom-of-funnel competitor keyword capture

URL: `/blog/switch-from-quickbooks-xero-sage-to-quarterlyuk`

Instructions for exporting data from the top 3 competitors, followed by how QuarterlyUK's local data model prevents future lock-in. Targets high-intent commercial queries from users already paying competitor prices.

---

### L6. Name Compatible Bridging Software Tools
**Effort:** 1 hour research + copy update | **Impact:** Trust signal for informed users

The FAQ mentions "HMRC-approved bridging software" without naming any. Sole traders need to know which specific tools accept QuarterlyUK CSV exports (e.g. ANNA, Xero bridging, or others). Name them explicitly.

---

## Summary Scorecard — Projected Impact

| Priority | Actions | Estimated Time | Projected Score After |
|---|---|---|---|
| Current | — | — | **33 / 100** |
| Critical complete | C1-C4 | 2-3 hours | **42 / 100** |
| + High complete | H1-H7 | 8-10 hours | **55 / 100** |
| + Medium complete | M1-M10 | 20-25 hours | **68 / 100** |
| + Low complete + HMRC listing | L1-L6 | Ongoing | **82 / 100** |

**Highest-leverage single action:** Submit to Google Search Console (C1) — 30 minutes, unblocks everything else.

**Highest-leverage content investment:** Publish 2 MTD blog articles before 6 April 2026 (M1) — the deadline creates a closing content opportunity window.

**Highest-leverage strategic action:** Apply for HMRC GOV.UK software listing (L1) — changes the site's entire competitive position in AI-generated answers.
