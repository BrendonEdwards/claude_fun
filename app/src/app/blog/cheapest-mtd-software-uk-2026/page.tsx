import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cheapest MTD Software UK 2026: An Honest Price Comparison — QuarterlyUK",
  description: "An honest price comparison of Making Tax Digital software for UK sole traders in 2026. We compare intro prices vs real prices for Sage, FreeAgent, QuickBooks, Xero, GoSimpleTax, Coconut, and QuarterlyUK.",
  alternates: { canonical: "https://quarterlyuk.com/blog/cheapest-mtd-software-uk-2026" },
  openGraph: {
    title: "Cheapest MTD Software UK 2026: An Honest Price Comparison — QuarterlyUK",
    description: "An honest price comparison of Making Tax Digital software for UK sole traders in 2026. We compare intro prices vs real prices for Sage, FreeAgent, QuickBooks, Xero, GoSimpleTax, Coconut, and QuarterlyUK.",
    url: "https://quarterlyuk.com/blog/cheapest-mtd-software-uk-2026",
  },
};

export default function CheapestMTDSoftwarePage() {
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
                { "@type": "ListItem", "position": 3, "name": "Cheapest MTD Software UK 2026", "item": "https://quarterlyuk.com/blog/cheapest-mtd-software-uk-2026" }
              ]
            })
          }}
        />
        <h1 className="text-3xl font-bold text-primary mb-2">Cheapest MTD Software UK 2026: An Honest Price Comparison</h1>
        <p className="text-sm text-muted mb-10">By The QuarterlyUK Team &middot; 24 February 2026</p>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
          <section>
            <p>
              Making Tax Digital for Income Tax starts in April 2026 for sole traders and landlords earning
              over &pound;50,000. If you&apos;re looking for software, you&apos;ve probably noticed something:
              the prices you see on landing pages rarely match what you actually end up paying.
            </p>
            <p>
              We built QuarterlyUK, so we obviously have a horse in this race. But we&apos;re going to be
              straight with you about what every option costs, what it does, and where each one falls short
              &mdash; including ours.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">The comparison table</h2>
            <p>
              Prices were checked in February 2026. &ldquo;Real Price&rdquo; means what you pay once any
              introductory offer expires.
            </p>
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-primary text-white text-left">
                    <th className="px-4 py-3 font-semibold">Software</th>
                    <th className="px-4 py-3 font-semibold">Intro Price</th>
                    <th className="px-4 py-3 font-semibold">Real Price</th>
                    <th className="px-4 py-3 font-semibold whitespace-nowrap">HMRC-Recognised</th>
                    <th className="px-4 py-3 font-semibold whitespace-nowrap">Free Tier</th>
                    <th className="px-4 py-3 font-semibold">Key Features</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-primary">Sage Business Cloud</td>
                    <td className="px-4 py-3">Free plan available</td>
                    <td className="px-4 py-3">Free (basic) / &pound;12+/mo (full)</td>
                    <td className="px-4 py-3">Yes</td>
                    <td className="px-4 py-3">Yes</td>
                    <td className="px-4 py-3">Full accounting suite; powerful but complex for basic bookkeeping</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3 font-medium text-primary">FreeAgent</td>
                    <td className="px-4 py-3">Free with NatWest/RBS</td>
                    <td className="px-4 py-3">&pound;19.50/mo otherwise</td>
                    <td className="px-4 py-3">Yes</td>
                    <td className="px-4 py-3">Only via bank partnership</td>
                    <td className="px-4 py-3">Excellent all-rounder; expensive without the bank deal</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-primary">QuickBooks Simple Start</td>
                    <td className="px-4 py-3">&pound;1/mo for 3 months</td>
                    <td className="px-4 py-3">&pound;10/mo</td>
                    <td className="px-4 py-3">Yes</td>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3">Solid features; price jumps 10x after intro period</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3 font-medium text-primary">Xero Starter</td>
                    <td className="px-4 py-3">~&pound;7/mo intro</td>
                    <td className="px-4 py-3">&pound;15/mo</td>
                    <td className="px-4 py-3">Yes</td>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3">Popular with accountants; price doubles after intro</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-primary">GoSimpleTax</td>
                    <td className="px-4 py-3">&pound;58.94/year</td>
                    <td className="px-4 py-3">&pound;58.94/year</td>
                    <td className="px-4 py-3">Yes</td>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3">Tax return focused; straightforward annual pricing</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/60">
                    <td className="px-4 py-3 font-medium text-primary">Coconut</td>
                    <td className="px-4 py-3">Free plan available</td>
                    <td className="px-4 py-3">~&pound;9/mo (Pro)</td>
                    <td className="px-4 py-3">Yes</td>
                    <td className="px-4 py-3">Yes (limited)</td>
                    <td className="px-4 py-3">Banking + accounting combined; neat concept for freelancers</td>
                  </tr>
                  <tr className="border-t-2 border-accent/40 bg-accent/5">
                    <td className="px-4 py-3 font-bold text-primary">QuarterlyUK</td>
                    <td className="px-4 py-3 font-bold">&pound;2.50/mo</td>
                    <td className="px-4 py-3 font-bold">&pound;2.50/mo</td>
                    <td className="px-4 py-3">No (on roadmap)</td>
                    <td className="px-4 py-3">Yes</td>
                    <td className="px-4 py-3 font-medium">Price is the price. No intro tricks. Local-first data storage.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">The intro price problem</h2>
            <p>
              The most common trick in MTD software pricing is the introductory offer. QuickBooks charges
              &pound;1/month for the first three months, then jumps to &pound;10/month &mdash; a 10x increase.
              Xero&apos;s Starter plan roughly doubles once the intro period ends. These aren&apos;t hidden
              fees; they&apos;re disclosed in the small print. But when you&apos;re comparing options, the
              headline price you see on the website is almost never what you&apos;ll actually pay long-term.
            </p>
            <p>
              Sage and FreeAgent take a different approach. Sage offers a genuinely free tier, though the full
              feature set costs &pound;12 or more per month. FreeAgent is free if you bank with NatWest or RBS
              &mdash; a brilliant deal if you do, but &pound;19.50/month if you don&apos;t. GoSimpleTax keeps
              it simple with a flat annual fee of &pound;58.94, which works out to about &pound;4.91/month.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">The HMRC recognition question</h2>
            <p>
              Here&apos;s where we have to be upfront: QuarterlyUK is <strong>not yet HMRC-recognised</strong>.
              That means it cannot submit your quarterly updates or Final Declaration directly to HMRC. It&apos;s
              on our roadmap, and we&apos;re working towards it, but we&apos;re not there yet.
            </p>
            <p>
              Every other tool in this table can submit directly to HMRC. That&apos;s a meaningful advantage,
              especially if you handle your own tax affairs without an accountant.
            </p>
            <p>
              However, HMRC&apos;s rules do allow you to keep your records in one piece of software and use
              separate <strong>bridging software</strong> to submit. Many accountants provide bridging software
              as part of their service. So if you already use an accountant, the submission part may already
              be covered &mdash; you just need the record-keeping side handled.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">Where QuarterlyUK fits</h2>
            <p>
              QuarterlyUK is designed for sole traders who want something simple and cheap for the record-keeping
              part of MTD. It covers the 14 HMRC expense categories, tracks income, generates quarterly summaries,
              and costs &pound;2.50/month with no introductory pricing games. The price today is the price
              tomorrow.
            </p>
            <p>
              Your data stays on your device using local browser storage. We never see your financial records,
              which is a genuine privacy advantage &mdash; but it also means you&apos;re responsible for backups
              (we provide CSV export for that).
            </p>
            <p>
              <strong>Best for:</strong> Sole traders who need straightforward digital records and already have
              an accountant or are willing to use bridging software for the HMRC submission. People who want
              a simple, affordable tool without being upsold into a full accounting suite.
            </p>
            <p>
              <strong>Not best for:</strong> Those who need to submit directly to HMRC right now without an
              accountant. If you want a single tool that handles everything end-to-end today, one of the
              HMRC-recognised options above will serve you better &mdash; just be aware of the real price.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">Our recommendation (honestly)</h2>
            <p>
              If you bank with NatWest or RBS, FreeAgent is hard to beat &mdash; it&apos;s free and does
              everything. If you want a full accounting suite and don&apos;t mind complexity, Sage&apos;s free
              tier is genuinely generous. If you want the simplest path to MTD compliance with direct
              submission, GoSimpleTax offers fair annual pricing without intro tricks.
            </p>
            <p>
              If you want the cheapest ongoing cost for clean, simple digital records and you have an accountant
              handling submissions, that&apos;s where{" "}
              <Link href="/" className="text-accent underline">QuarterlyUK</Link> comes in. &pound;2.50/month,
              no surprises.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">A note on accuracy</h2>
            <p>
              Software prices change frequently. We checked these in February 2026, but we recommend visiting
              each provider&apos;s website directly before making a decision. If you spot anything out of date,
              let us know at{" "}
              <a href="mailto:hello@quarterlyuk.com" className="text-accent underline">
                hello@quarterlyuk.com
              </a>{" "}
              and we&apos;ll update this page.
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
