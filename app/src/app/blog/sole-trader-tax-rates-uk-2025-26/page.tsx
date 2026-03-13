import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Much Tax Will I Pay as a Sole Trader? UK Tax Rates 2025/26 — QuarterlyUK",
  description: "Full breakdown of sole trader tax rates for 2025/26 including income tax bands, National Insurance, the £100k personal allowance trap, and worked examples for £30k, £55k and £110k profits.",
  alternates: { canonical: "https://quarterlyuk.com/blog/sole-trader-tax-rates-uk-2025-26" },
  openGraph: {
    title: "How Much Tax Will I Pay as a Sole Trader? UK Tax Rates 2025/26 — QuarterlyUK",
    description: "Full breakdown of sole trader tax rates for 2025/26 including income tax bands, National Insurance, the £100k personal allowance trap, and worked examples for £30k, £55k and £110k profits.",
    url: "https://quarterlyuk.com/blog/sole-trader-tax-rates-uk-2025-26",
  },
};

export default function SoleTraderTaxRatesPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Q" width={26} height={26} className="-mr-0.5" />
            <span className="text-lg font-bold tracking-tight text-primary">
              uarterly<span className="text-accent">UK</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-muted hover:text-primary transition-colors"
          >
            Back to home
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quarterlyuk.com" },
                { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://quarterlyuk.com/blog" },
                { "@type": "ListItem", "position": 3, "name": "Sole Trader Tax Rates UK 2025/26", "item": "https://quarterlyuk.com/blog/sole-trader-tax-rates-uk-2025-26" }
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "How Much Tax Will I Pay as a Sole Trader? UK Tax Rates Explained for 2025/26",
              "description": "Full breakdown of sole trader tax rates for 2025/26 including income tax bands, National Insurance, the £100k personal allowance trap, and worked examples.",
              "datePublished": "2026-03-13",
              "dateModified": "2026-03-13",
              "author": {
                "@type": "Organization",
                "name": "QuarterlyUK",
                "url": "https://quarterlyuk.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "QuarterlyUK",
                "url": "https://quarterlyuk.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://quarterlyuk.com/logo.svg"
                }
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://quarterlyuk.com/blog/sole-trader-tax-rates-uk-2025-26"
              }
            })
          }}
        />

        <h1 className="text-3xl font-bold text-primary mb-2">
          How Much Tax Will I Pay as a Sole Trader? UK Tax Rates Explained for 2025/26
        </h1>
        <p className="text-sm text-muted mb-10">By The QuarterlyUK Team &middot; 13 March 2026</p>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-6">

          {/* Introduction */}
          <section>
            <p>
              &ldquo;How much tax will I actually pay?&rdquo; It&apos;s the question every self-employed
              person in the UK asks &mdash; and the answer is almost never straightforward. Your tax bill
              depends on your taxable profit (not your turnover), how much falls into each tax band, and
              whether you get caught by any of HMRC&apos;s less obvious traps.
            </p>
            <p>
              This guide breaks down exactly how income tax and National Insurance work for sole traders
              in the 2025/26 tax year (6 April 2025 to 5 April 2026). We&apos;ll walk through the rates,
              explain the personal allowance taper that catches people out, and show you three worked
              examples so you can see real numbers.
            </p>
            <p>
              Want a quick answer?{" "}
              <Link href="/tools/tax-calculator" className="text-accent underline">
                Try our free sole trader tax calculator
              </Link>{" "}
              to see your estimated bill in seconds.
            </p>
          </section>

          {/* Income Tax Rates */}
          <section>
            <h2 className="text-lg font-bold text-primary">Income tax rates for sole traders 2025/26</h2>
            <p>
              As a sole trader, you pay income tax on your <strong>taxable profit</strong> &mdash; that&apos;s
              your total income minus allowable business expenses. The rates are the same as for employed
              workers. Here are the bands for 2025/26:
            </p>
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-primary text-white text-left">
                    <th className="px-4 py-3 font-semibold">Band</th>
                    <th className="px-4 py-3 font-semibold">Taxable Profit</th>
                    <th className="px-4 py-3 font-semibold">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-primary">Personal Allowance</td>
                    <td className="px-4 py-3">Up to &pound;12,570</td>
                    <td className="px-4 py-3">0%</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3 font-medium text-primary">Basic rate</td>
                    <td className="px-4 py-3">&pound;12,571 &ndash; &pound;50,270</td>
                    <td className="px-4 py-3">20%</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-primary">Higher rate</td>
                    <td className="px-4 py-3">&pound;50,271 &ndash; &pound;125,140</td>
                    <td className="px-4 py-3">40%</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3 font-medium text-primary">Additional rate</td>
                    <td className="px-4 py-3">Over &pound;125,140</td>
                    <td className="px-4 py-3">45%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              These bands apply to your total taxable income from all sources, not just your
              self-employment. If you also have a PAYE salary, that uses up part of your allowance
              and bands first.
            </p>
          </section>

          {/* Personal Allowance Taper */}
          <section>
            <h2 className="text-lg font-bold text-primary">The &pound;100k personal allowance trap</h2>
            <p>
              This is the one that catches people off guard. If your total income exceeds &pound;100,000,
              you start losing your &pound;12,570 personal allowance. For every &pound;2 you earn above
              &pound;100,000, you lose &pound;1 of your tax-free allowance.
            </p>
            <p>
              The maths works out brutally. On income between &pound;100,000 and &pound;125,140, you&apos;re
              paying the 40% higher rate <em>plus</em> effectively losing 20% on the allowance you&apos;re
              forfeiting. That creates an <strong>effective marginal tax rate of 60%</strong> in this band.
            </p>
            <p>
              At &pound;125,140, your personal allowance is completely gone. Above that, you&apos;re back
              to the standard 40% (and then 45% above &pound;125,140 for the additional rate). The 60%
              effective rate only applies in that narrow &pound;100,000 to &pound;125,140 window &mdash;
              but if your profit lands there, it stings.
            </p>
            <p>
              This is one of the strongest reasons for sole traders earning around &pound;100k to make
              pension contributions. A &pound;10,000 pension contribution brings your taxable profit below
              &pound;100,000, restoring your full personal allowance and saving you far more than the
              standard 40% relief.
            </p>
          </section>

          {/* National Insurance */}
          <section>
            <h2 className="text-lg font-bold text-primary">National Insurance for sole traders 2025/26</h2>
            <p>
              On top of income tax, sole traders pay National Insurance Contributions (NICs). There are
              two classes to know about:
            </p>

            <h3 className="text-base font-bold text-primary mt-4">Class 2 NICs</h3>
            <p>
              Class 2 NICs are now effectively free. Since April 2024, sole traders with profits above the
              Small Profits Threshold (&pound;6,725) get their Class 2 NIC credits automatically &mdash;
              without paying anything. These credits count towards your State Pension entitlement. You
              don&apos;t need to do anything; HMRC handles it.
            </p>

            <h3 className="text-base font-bold text-primary mt-4">Class 4 NICs</h3>
            <p>
              Class 4 is where the real cost is. You pay it on your taxable profits alongside your
              Self Assessment tax bill:
            </p>
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-primary text-white text-left">
                    <th className="px-4 py-3 font-semibold">Profit Band</th>
                    <th className="px-4 py-3 font-semibold">Class 4 NIC Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3">Up to &pound;12,570</td>
                    <td className="px-4 py-3">0%</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3">&pound;12,570 &ndash; &pound;50,270</td>
                    <td className="px-4 py-3">6%</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3">Over &pound;50,270</td>
                    <td className="px-4 py-3">2%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Notice that the Class 4 thresholds mirror the income tax bands. The Lower Profits Limit
              matches the personal allowance at &pound;12,570, and the Upper Profits Limit matches the
              higher rate threshold at &pound;50,270.
            </p>
          </section>

          {/* Worked Examples */}
          <section>
            <h2 className="text-lg font-bold text-primary">Worked examples: how much will you actually pay?</h2>
            <p>
              Let&apos;s run through three real scenarios. These assume self-employment is your only
              source of income and you have no other tax reliefs or allowances beyond the personal
              allowance.
            </p>

            {/* Example 1 */}
            <h3 className="text-base font-bold text-primary mt-6">Example 1: &pound;30,000 profit (typical tradesperson)</h3>
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-primary text-white text-left">
                    <th className="px-4 py-3 font-semibold">Item</th>
                    <th className="px-4 py-3 font-semibold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3">Taxable profit</td>
                    <td className="px-4 py-3 text-right">&pound;30,000</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3">Personal Allowance</td>
                    <td className="px-4 py-3 text-right">&pound;12,570 at 0%  = &pound;0</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3">Basic rate income tax</td>
                    <td className="px-4 py-3 text-right">&pound;17,430 at 20% = &pound;3,486</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3 font-medium">Total income tax</td>
                    <td className="px-4 py-3 text-right font-medium">&pound;3,486</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3">Class 4 NIC (6% on &pound;17,430)</td>
                    <td className="px-4 py-3 text-right">&pound;1,046</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3">Class 2 NIC</td>
                    <td className="px-4 py-3 text-right">&pound;0 (auto-credited)</td>
                  </tr>
                  <tr className="border-t-2 border-accent/40 bg-accent/5">
                    <td className="px-4 py-3 font-bold text-primary">Total tax + NIC</td>
                    <td className="px-4 py-3 text-right font-bold text-primary">&pound;4,532</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3">Effective tax rate</td>
                    <td className="px-4 py-3 text-right">15.1%</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3 font-medium text-primary">Take-home pay</td>
                    <td className="px-4 py-3 text-right font-medium text-primary">&pound;25,468</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Example 2 */}
            <h3 className="text-base font-bold text-primary mt-6">Example 2: &pound;55,000 profit (crosses into higher rate)</h3>
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-primary text-white text-left">
                    <th className="px-4 py-3 font-semibold">Item</th>
                    <th className="px-4 py-3 font-semibold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3">Taxable profit</td>
                    <td className="px-4 py-3 text-right">&pound;55,000</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3">Personal Allowance</td>
                    <td className="px-4 py-3 text-right">&pound;12,570 at 0% = &pound;0</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3">Basic rate income tax</td>
                    <td className="px-4 py-3 text-right">&pound;37,700 at 20% = &pound;7,540</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3">Higher rate income tax</td>
                    <td className="px-4 py-3 text-right">&pound;4,730 at 40% = &pound;1,892</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium">Total income tax</td>
                    <td className="px-4 py-3 text-right font-medium">&pound;9,432</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3">Class 4 NIC (6% on &pound;37,700)</td>
                    <td className="px-4 py-3 text-right">&pound;2,262</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3">Class 4 NIC (2% on &pound;4,730)</td>
                    <td className="px-4 py-3 text-right">&pound;95</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3">Class 2 NIC</td>
                    <td className="px-4 py-3 text-right">&pound;0 (auto-credited)</td>
                  </tr>
                  <tr className="border-t-2 border-accent/40 bg-accent/5">
                    <td className="px-4 py-3 font-bold text-primary">Total tax + NIC</td>
                    <td className="px-4 py-3 text-right font-bold text-primary">&pound;11,789</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3">Effective tax rate</td>
                    <td className="px-4 py-3 text-right">21.4%</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3 font-medium text-primary">Take-home pay</td>
                    <td className="px-4 py-3 text-right font-medium text-primary">&pound;43,211</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Example 3 */}
            <h3 className="text-base font-bold text-primary mt-6">Example 3: &pound;110,000 profit (personal allowance taper kicks in)</h3>
            <p>
              This is where the &pound;100k trap bites. With &pound;110,000 profit, you&apos;re
              &pound;10,000 over the &pound;100,000 threshold, so you lose &pound;5,000 of your personal
              allowance. Your remaining personal allowance is &pound;7,570.
            </p>
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-primary text-white text-left">
                    <th className="px-4 py-3 font-semibold">Item</th>
                    <th className="px-4 py-3 font-semibold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3">Taxable profit</td>
                    <td className="px-4 py-3 text-right">&pound;110,000</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3">Personal Allowance (reduced)</td>
                    <td className="px-4 py-3 text-right">&pound;7,570 at 0% = &pound;0</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3">Basic rate income tax</td>
                    <td className="px-4 py-3 text-right">&pound;42,700 at 20% = &pound;8,540</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3">Higher rate income tax</td>
                    <td className="px-4 py-3 text-right">&pound;59,730 at 40% = &pound;23,892</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium">Total income tax</td>
                    <td className="px-4 py-3 text-right font-medium">&pound;32,432</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3">Class 4 NIC (6% on &pound;37,700)</td>
                    <td className="px-4 py-3 text-right">&pound;2,262</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3">Class 4 NIC (2% on &pound;59,730)</td>
                    <td className="px-4 py-3 text-right">&pound;1,195</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3">Class 2 NIC</td>
                    <td className="px-4 py-3 text-right">&pound;0 (auto-credited)</td>
                  </tr>
                  <tr className="border-t-2 border-accent/40 bg-accent/5">
                    <td className="px-4 py-3 font-bold text-primary">Total tax + NIC</td>
                    <td className="px-4 py-3 text-right font-bold text-primary">&pound;35,889</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3">Effective tax rate</td>
                    <td className="px-4 py-3 text-right">32.6%</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3 font-medium text-primary">Take-home pay</td>
                    <td className="px-4 py-3 text-right font-medium text-primary">&pound;74,111</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Compare that effective rate of 32.6% with the 21.4% at &pound;55,000. The personal allowance
              taper adds roughly &pound;2,000 in extra tax that you wouldn&apos;t pay if the taper
              didn&apos;t exist. That &pound;5,000 of lost allowance is taxed at 40%, costing you an
              extra &pound;2,000 on top of the standard higher rate bill.
            </p>
          </section>

          {/* How to Reduce Your Tax Bill */}
          <section>
            <h2 className="text-lg font-bold text-primary">How to reduce your sole trader tax bill</h2>
            <p>
              You can&apos;t change the tax rates, but you can make sure you&apos;re not paying more
              than you owe. Here are the main levers:
            </p>

            <h3 className="text-base font-bold text-primary mt-4">Track every allowable expense</h3>
            <p>
              Every legitimate business expense reduces your taxable profit. If you&apos;re a basic rate
              taxpayer, a &pound;100 expense saves you &pound;26 (20% income tax + 6% Class 4 NIC). At
              the higher rate, it saves &pound;42. Common expenses sole traders miss include:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use of home as office (simplified expenses or actual costs)</li>
              <li>Business mileage</li>
              <li>Phone and internet (business proportion)</li>
              <li>Professional subscriptions and insurance</li>
              <li>Software and tools</li>
              <li>Training directly related to your trade</li>
            </ul>
            <p>
              HMRC groups expenses into{" "}
              <Link href="/hmrc-expense-categories" className="text-accent underline">
                14 standard categories
              </Link>
              . Make sure you know what falls into each.
            </p>

            <h3 className="text-base font-bold text-primary mt-4">Pension contributions</h3>
            <p>
              Contributions to a personal pension reduce your taxable profit. This is especially
              powerful if you&apos;re near the &pound;100,000 threshold. A &pound;10,000 pension
              contribution could save you &pound;6,000 in tax if it brings you back below &pound;100k
              and restores your personal allowance.
            </p>

            <h3 className="text-base font-bold text-primary mt-4">Keep digital records from day one</h3>
            <p>
              Good records mean you claim everything you&apos;re entitled to, and you have the evidence
              if HMRC asks questions. Use the{" "}
              <Link href="/dashboard" className="text-accent underline">
                QuarterlyUK dashboard
              </Link>{" "}
              to log income and expenses as they happen, rather than scrambling at year-end.
            </p>
          </section>

          {/* Making Tax Digital */}
          <section>
            <h2 className="text-lg font-bold text-primary">Making Tax Digital: what&apos;s changing from April 2026</h2>
            <p>
              From April 2026, sole traders and landlords with income over &pound;50,000 must keep
              digital records and submit quarterly updates to HMRC under{" "}
              <Link href="/blog/what-is-making-tax-digital-income-tax-sole-traders" className="text-accent underline">
                Making Tax Digital for Income Tax
              </Link>
              . This threshold drops to &pound;30,000 from April 2027.
            </p>
            <p>
              If you&apos;re in either worked example 2 or 3 above, MTD applies to you from next month.
              You&apos;ll need compatible software to keep your records and submit quarterly summaries
              to HMRC. The days of the shoebox-full-of-receipts approach are numbered.
            </p>
          </section>

          {/* CTA */}
          <section>
            <h2 className="text-lg font-bold text-primary">Work out your exact tax bill</h2>
            <p>
              The examples above cover common scenarios, but your situation might be different. Use
              our{" "}
              <Link href="/tools/tax-calculator" className="text-accent underline">
                free sole trader tax calculator
              </Link>{" "}
              to enter your actual profit and see a full breakdown of income tax, National Insurance,
              and take-home pay for 2025/26.
            </p>
            <p>
              If you&apos;re looking for a simple, affordable way to track your income and expenses
              throughout the year,{" "}
              <Link href="/" className="text-accent underline">
                QuarterlyUK starts at &pound;2.50/month
              </Link>{" "}
              with no introductory pricing tricks. The price you see is the price you pay.
            </p>
          </section>
        </div>
      </main>

      <footer className="bg-primary-dark text-slate-400 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm">
          <span>&copy; 2026 QuarterlyUK. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
