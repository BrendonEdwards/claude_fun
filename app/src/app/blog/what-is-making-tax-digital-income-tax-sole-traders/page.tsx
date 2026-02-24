import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What is Making Tax Digital for Income Tax? A Plain English Guide — QuarterlyUK",
  description: "Making Tax Digital for Income Tax explained in plain English. Learn who it affects, when it starts, what you need to do, and the quarterly deadlines for sole traders and landlords.",
  alternates: { canonical: "https://quarterlyuk.com/blog/what-is-making-tax-digital-income-tax-sole-traders" },
  openGraph: {
    title: "What is Making Tax Digital for Income Tax? A Plain English Guide — QuarterlyUK",
    description: "Making Tax Digital for Income Tax explained in plain English. Learn who it affects, when it starts, what you need to do, and the quarterly deadlines for sole traders and landlords.",
    url: "https://quarterlyuk.com/blog/what-is-making-tax-digital-income-tax-sole-traders",
  },
};

export default function WhatIsMTDPage() {
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
                { "@type": "ListItem", "position": 3, "name": "What is Making Tax Digital for Income Tax?", "item": "https://quarterlyuk.com/blog/what-is-making-tax-digital-income-tax-sole-traders" }
              ]
            })
          }}
        />
        <h1 className="text-3xl font-bold text-primary mb-2">What is Making Tax Digital for Income Tax? A Plain English Guide</h1>
        <p className="text-sm text-muted mb-10">By The QuarterlyUK Team &middot; 24 February 2026</p>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
          <section>
            <p>
              If you&apos;re a sole trader or a landlord in the UK, you&apos;ve probably heard the phrase
              &ldquo;Making Tax Digital&rdquo; floating around. Maybe your accountant mentioned it. Maybe HMRC
              sent you a letter. Either way, it sounds complicated &mdash; but it really isn&apos;t, once you
              strip away the jargon. This guide explains everything you need to know in plain English.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">The short version</h2>
            <p>
              Making Tax Digital for Income Tax Self Assessment (MTD ITSA) is HMRC&apos;s programme to digitise
              how self-employed people and landlords report their income. Instead of filling in one big Self
              Assessment tax return at the end of the year, you&apos;ll keep digital records throughout the year
              and send HMRC a summary every quarter.
            </p>
            <p>
              It does <strong>not</strong> change how much tax you pay. It only changes <strong>how</strong> you
              report it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">How things work right now</h2>
            <p>
              Today, most sole traders and landlords file a single Self Assessment tax return each year. The
              deadline is 31 January following the end of the tax year (which runs 6 April to 5 April). So for
              the 2024/25 tax year, the return is due by 31 January 2026.
            </p>
            <p>
              Many people keep their records in spreadsheets, shoeboxes, or even just bank statements, and then
              hand everything to an accountant in January. It works, but HMRC wants to modernise it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">What changes under Making Tax Digital</h2>
            <p>Under MTD for Income Tax, there are three main changes:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Digital records:</strong> You must keep your income and expense records using compatible
                software (not paper). More on what counts as &ldquo;compatible&rdquo; below.
              </li>
              <li>
                <strong>Quarterly updates:</strong> Four times a year, you send HMRC a summary of your income and
                expenses for that quarter. These are not tax returns &mdash; they&apos;re progress updates.
              </li>
              <li>
                <strong>Final Declaration:</strong> At the end of the year, you submit a Final Declaration. This
                replaces the Self Assessment tax return you file today. It&apos;s where you confirm your total
                income and claim any reliefs or allowances.
              </li>
            </ul>
            <p>
              An important point: MTD does <strong>not</strong> replace Self Assessment as a system. You&apos;re
              still within Self Assessment. The Final Declaration simply replaces the SA return you currently file.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">Who does it apply to?</h2>
            <p>
              MTD for Income Tax applies to sole traders and landlords whose <strong>qualifying income</strong> exceeds
              certain thresholds. Qualifying income means your <strong>gross income before expenses</strong> from
              self-employment and/or property. If you have both, you add them together.
            </p>
            <p>
              For example, if you earn &pound;35,000 from freelance work and &pound;8,000 from renting a property,
              your qualifying income is &pound;43,000 &mdash; even if your profit after expenses is much lower.
            </p>
            <p>
              The thresholds are being rolled out in stages:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>From April 2026:</strong> Qualifying income over &pound;50,000</li>
              <li><strong>From April 2027:</strong> Qualifying income over &pound;30,000</li>
              <li><strong>From April 2028:</strong> Qualifying income over &pound;20,000</li>
            </ul>
            <p>
              If your qualifying income is below the threshold for your year, you won&apos;t need to comply yet &mdash;
              but you can sign up voluntarily if you want to get ahead.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">What do &ldquo;digital records&rdquo; actually mean?</h2>
            <p>
              HMRC requires you to keep a digital record of every business transaction. For each transaction, your
              records must include:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The <strong>date</strong> of the transaction</li>
              <li>The <strong>amount</strong></li>
              <li>The <strong>category</strong> (what type of income or expense it is)</li>
            </ul>
            <p>
              For expenses, HMRC uses 14 standard categories for self-employment:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Cost of goods bought for resale or goods used</li>
              <li>Construction industry &mdash; payments to subcontractors</li>
              <li>Wages, salaries, and other staff costs</li>
              <li>Car, van, and travel expenses</li>
              <li>Rent, rates, power, and insurance costs</li>
              <li>Repairs and maintenance of property and equipment</li>
              <li>Phone, fax, stationery, and other office costs</li>
              <li>Advertising and business entertainment costs</li>
              <li>Interest on bank and other loans</li>
              <li>Bank, credit card, and other financial charges</li>
              <li>Irrecoverable debts written off</li>
              <li>Accountancy, legal, and other professional fees</li>
              <li>Depreciation and loss or profit on sale of assets</li>
              <li>Other business expenses</li>
            </ol>
            <p>
              You don&apos;t need to use all 14 categories. If you&apos;re a freelance graphic designer, for
              instance, you might only use a handful. But every expense needs to be assigned to one of them.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">What software do you need?</h2>
            <p>
              You have two main options:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>HMRC-compatible software</strong> that keeps your records <em>and</em> submits your
                quarterly updates and Final Declaration directly to HMRC.
              </li>
              <li>
                <strong>Record-keeping software or spreadsheets</strong> combined with <strong>bridging
                software</strong> that takes your data and submits it to HMRC on your behalf. Many accountants
                provide bridging software as part of their service.
              </li>
            </ul>
            <p>
              The key requirement is that your records are digital and can be submitted to HMRC &mdash; either
              directly or via bridging software. Paper records alone won&apos;t cut it, even if you type them up
              at the end of the quarter.
            </p>
            <p>
              <Link href="/" className="text-accent underline">QuarterlyUK</Link> handles the record-keeping
              side &mdash; tracking your income and expenses digitally, categorising them into the 14 HMRC
              categories, and giving you quarterly summaries ready for submission. At &pound;2.50/month, it&apos;s
              designed to make the record-keeping part painless. Your accountant or bridging software handles
              the actual submission to HMRC.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">The quarterly deadlines</h2>
            <p>
              The tax year is split into four quarters. After each quarter ends, you have <strong>one month and
              seven days</strong> to send your quarterly update to HMRC. Here are the exact dates:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-2 font-semibold text-primary">Quarter</th>
                    <th className="px-4 py-2 font-semibold text-primary">Period</th>
                    <th className="px-4 py-2 font-semibold text-primary">Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-2">Q1</td>
                    <td className="px-4 py-2">6 April &ndash; 5 July</td>
                    <td className="px-4 py-2 font-medium">5 August</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/50">
                    <td className="px-4 py-2">Q2</td>
                    <td className="px-4 py-2">6 July &ndash; 5 October</td>
                    <td className="px-4 py-2 font-medium">5 November</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-2">Q3</td>
                    <td className="px-4 py-2">6 October &ndash; 5 January</td>
                    <td className="px-4 py-2 font-medium">5 February</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50/50">
                    <td className="px-4 py-2">Q4</td>
                    <td className="px-4 py-2">6 January &ndash; 5 April</td>
                    <td className="px-4 py-2 font-medium">5 May</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              After all four quarterly updates are submitted, you then submit your <strong>Final Declaration</strong>.
              The deadline for the Final Declaration is <strong>31 January</strong> following the end of the tax year
              &mdash; the same deadline as the current Self Assessment return.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">What happens in a quarterly update?</h2>
            <p>
              A quarterly update is simpler than you might think. Your software sends HMRC a summary of your total
              income and expenses for that quarter, broken down by category. You don&apos;t need to send individual
              receipts or invoices. You just need to have the underlying digital records available in case HMRC ever
              asks to see them.
            </p>
            <p>
              Think of it as HMRC asking &ldquo;roughly how is your business doing this quarter?&rdquo; rather than
              &ldquo;give us your full tax return.&rdquo; The quarterly updates are estimates. The Final Declaration
              at the end of the year is where you finalise everything.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">Penalties for late submissions</h2>
            <p>
              HMRC is introducing a new points-based penalty system for MTD, replacing the old fixed fines. Here&apos;s
              how it works:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Each time you miss a quarterly update deadline, you receive <strong>one penalty point</strong>.</li>
              <li>
                Once you reach the <strong>penalty point threshold</strong> (which depends on your submission
                frequency &mdash; for quarterly submissions, this is typically four points), you receive a
                <strong> &pound;200 financial penalty</strong>.
              </li>
              <li>
                After reaching the threshold, every subsequent late submission also incurs a &pound;200 penalty.
              </li>
              <li>
                Points expire after a period of good compliance &mdash; if you submit on time for a set period,
                your points reset to zero.
              </li>
            </ul>
            <p>
              Late payment of tax still carries separate interest charges and penalties, as it does today. The
              points-based system is specifically about late <em>submissions</em>, not late <em>payments</em>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">What MTD does not change</h2>
            <p>
              There are several common misconceptions worth clearing up:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Your tax bill stays the same.</strong> MTD changes how you report, not how much you owe.
                The same tax rates, allowances, and thresholds apply.
              </li>
              <li>
                <strong>You still get the same reliefs.</strong> Trading allowance, capital allowances, mileage
                rates &mdash; all unchanged.
              </li>
              <li>
                <strong>You can still use an accountant.</strong> Many accountants will handle the quarterly
                submissions on your behalf. You just need to keep your digital records up to date so they have
                the data they need.
              </li>
              <li>
                <strong>Partnerships and companies are not included yet.</strong> MTD for Income Tax currently
                applies only to sole traders and landlords. General partnerships may be included from April 2027,
                but limited companies remain under Corporation Tax rules.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">How to prepare</h2>
            <p>
              If your qualifying income is over &pound;50,000, MTD starts for you from April 2026 &mdash; which
              is very soon. Here&apos;s what to do:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                <strong>Check your qualifying income.</strong> Add up your gross self-employment income and gross
                property income (before expenses). If it&apos;s over the threshold, you&apos;re in.
              </li>
              <li>
                <strong>Choose your software.</strong> Pick a tool that lets you record income and expenses digitally,
                categorise them, and either submit to HMRC directly or export data for bridging software.
              </li>
              <li>
                <strong>Start keeping digital records now.</strong> Even if your threshold year hasn&apos;t arrived,
                getting into the habit early means no last-minute scramble.
              </li>
              <li>
                <strong>Talk to your accountant.</strong> Ask them how they plan to handle MTD submissions and what
                they need from you.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">The bottom line</h2>
            <p>
              Making Tax Digital for Income Tax isn&apos;t as scary as it sounds. At its core, it&apos;s asking you to
              do something most organised sole traders already do &mdash; keep track of what comes in and what goes out.
              The main difference is that it must be digital, it must use the right categories, and you must share a
              summary with HMRC four times a year instead of once.
            </p>
            <p>
              The biggest adjustment isn&apos;t the technology. It&apos;s the habit of recording things as they happen
              instead of reconstructing a year&apos;s worth of finances in January. If you can build that habit,
              MTD will be straightforward.
            </p>
            <p>
              <Link href="/" className="text-accent underline">QuarterlyUK</Link> was built specifically for this. It
              gives you a simple place to log income and expenses against the 14 HMRC categories, tracks your quarterly
              deadlines, and generates the summaries you or your accountant need. At &pound;2.50/month, it costs less
              than a coffee. And your data stays on your device &mdash; we never see it.
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
