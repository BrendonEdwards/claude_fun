import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MTD April 2026: What Sole Traders Need to Do Right Now — QuarterlyUK",
  description:
    "Making Tax Digital for Income Tax launches 6 April 2026. A plain-English checklist for sole traders and landlords earning over £50,000 — deadlines, software, quarterly updates, and penalties explained.",
  alternates: {
    canonical: "https://quarterlyuk.com/blog/mtd-april-2026-sole-traders-guide",
  },
  openGraph: {
    title: "MTD April 2026: What Sole Traders Need to Do Right Now — QuarterlyUK",
    description:
      "Making Tax Digital for Income Tax launches 6 April 2026. A plain-English checklist for sole traders and landlords earning over £50,000.",
    url: "https://quarterlyuk.com/blog/mtd-april-2026-sole-traders-guide",
  },
};

export default function MtdApril2026Page() {
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
            href="/blog"
            className="text-sm font-medium text-muted hover:text-primary transition-colors"
          >
            All articles
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
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://quarterlyuk.com" },
                { "@type": "ListItem", position: 2, name: "Blog", item: "https://quarterlyuk.com/blog" },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "MTD April 2026: What Sole Traders Need to Do Right Now",
                  item: "https://quarterlyuk.com/blog/mtd-april-2026-sole-traders-guide",
                },
              ],
            }),
          }}
        />

        <article>
          <h1 className="text-3xl font-bold text-primary mb-2">
            MTD April 2026: What Sole Traders Need to Do Right Now
          </h1>
          <p className="text-sm text-muted mb-1">
            Published 24 February 2026 &middot; By The QuarterlyUK Team
          </p>
          <p className="text-sm text-muted mb-10">
            8 min read
          </p>

          <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
            <section>
              <p>
                Making Tax Digital for Income Tax Self Assessment (MTD ITSA) goes live on{" "}
                <strong>6 April 2026</strong>. If you are a sole trader or landlord with annual
                gross income over &pound;50,000, the way you report your earnings to HMRC is about
                to change. Instead of filing a single Self Assessment tax return once a year, you
                will need to keep digital records and send quarterly updates to HMRC using
                compatible software.
              </p>
              <p>
                This is not a drill and it is not optional. HMRC has confirmed the dates, published
                the rules, and listed the compatible software. Here is everything you need to know
                and do before the deadline.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary">What is MTD for Income Tax?</h2>
              <p>
                MTD for Income Tax (officially &ldquo;Making Tax Digital for Income Tax Self
                Assessment&rdquo;) requires self-employed individuals and landlords to:
              </p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Keep digital records of all business income and expenses</li>
                <li>Submit quarterly updates to HMRC through compatible software</li>
                <li>Send a final declaration (also called an End of Period Statement) after the tax year ends</li>
              </ol>
              <p>
                That means <strong>five submissions per year</strong> instead of one: four
                quarterly updates plus the final declaration. The aim, according to HMRC, is to
                reduce errors in tax returns and give taxpayers a more up-to-date picture of their
                tax position throughout the year.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary">Who does it affect and when?</h2>
              <p>
                MTD ITSA is being rolled out in phases based on your gross income (that is your
                total income before expenses, not your profit):
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>6 April 2026:</strong> Sole traders and landlords with gross income over{" "}
                  <strong>&pound;50,000</strong>
                </li>
                <li>
                  <strong>April 2027:</strong> Those with gross income over{" "}
                  <strong>&pound;30,000</strong>
                </li>
                <li>
                  <strong>April 2028:</strong> Those with gross income over{" "}
                  <strong>&pound;20,000</strong>
                </li>
              </ul>
              <p>
                If your gross income is below &pound;50,000 right now, you are not required to
                join in April 2026 but the threshold will reach you within a year or two. Getting
                your processes sorted now means you will not be scrambling later.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary">The quarterly deadlines for 2026/27</h2>
              <p>
                For the first MTD year (the 2026/27 tax year running 6 April 2026 to 5 April
                2027), the quarterly update deadlines are:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Quarter 1</strong> (6 Apr &ndash; 5 Jul 2026): due by{" "}
                  <strong>5 August 2026</strong>
                </li>
                <li>
                  <strong>Quarter 2</strong> (6 Jul &ndash; 5 Oct 2026): due by{" "}
                  <strong>5 November 2026</strong>
                </li>
                <li>
                  <strong>Quarter 3</strong> (6 Oct 2026 &ndash; 5 Jan 2027): due by{" "}
                  <strong>5 February 2027</strong>
                </li>
                <li>
                  <strong>Quarter 4</strong> (6 Jan &ndash; 5 Apr 2027): due by{" "}
                  <strong>5 May 2027</strong>
                </li>
              </ul>
              <p>
                Your <strong>final declaration</strong> for the 2026/27 tax year is due by{" "}
                <strong>31 January 2028</strong> &mdash; the same date you would normally file your
                Self Assessment return.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary">What counts as &ldquo;digital records&rdquo;?</h2>
              <p>
                HMRC requires you to keep digital records of each transaction, including the date,
                amount, and category of income or expense. You do not need to scan every receipt
                (though it is good practice). The records themselves must be held in software, not
                on paper.
              </p>
              <p>
                Spreadsheets are allowed, but there is a catch: if you use a spreadsheet you will
                also need <strong>bridging software</strong> that can connect to HMRC&apos;s systems
                and submit your quarterly updates electronically. You cannot email or upload a
                spreadsheet to HMRC directly.
              </p>
              <p>
                The simplest route is to use software that both stores your records and submits to
                HMRC directly. HMRC maintains a{" "}
                <a
                  href="https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline"
                >
                  list of compatible software on GOV.UK
                </a>{" "}
                which is updated regularly.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary">What happens if you miss a deadline?</h2>
              <p>
                HMRC is introducing a new <strong>points-based penalty system</strong> for late
                submissions under MTD. Each time you miss a quarterly deadline, you receive a
                penalty point. Once you reach the threshold (currently set at four points for
                quarterly obligations), you will receive a &pound;200 penalty. Each further late
                submission after that also triggers a &pound;200 fine.
              </p>
              <p>
                Points can be reset back to zero if you subsequently file on time for a set period.
                There are also separate penalties for late payment of tax, which work on a
                percentage basis rather than points. Full details are available on the{" "}
                <a
                  href="https://www.gov.uk/government/publications/penalties-for-late-submission"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline"
                >
                  HMRC penalties page
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary">What you need to do now: a checklist</h2>
              <p>
                With the 6 April 2026 start date only weeks away, here is a practical list of
                steps to get yourself ready:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  <strong>Check whether you are in scope.</strong> Look at your gross income for the
                  2024/25 tax year (your most recent Self Assessment). If it was over &pound;50,000,
                  you are in the first wave starting April 2026.
                </li>
                <li>
                  <strong>Choose compatible software.</strong> Check HMRC&apos;s{" "}
                  <a
                    href="https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline"
                  >
                    compatible software list
                  </a>{" "}
                  and pick a tool that fits your budget and workflow. You do not need the most
                  expensive option &mdash; many affordable tools handle everything required.
                </li>
                <li>
                  <strong>Set up your digital records now.</strong> Do not wait until April. Start
                  recording your income and expenses digitally today so the transition is seamless
                  when the new tax year begins.
                </li>
                <li>
                  <strong>Understand the quarterly rhythm.</strong> Mark the four quarterly deadlines
                  (5 August, 5 November, 5 February, 5 May) in your calendar. Set reminders a week
                  before each one.
                </li>
                <li>
                  <strong>Talk to your accountant.</strong> If you use an accountant or bookkeeper,
                  confirm how you will work together under MTD. Some accountants submit on your
                  behalf; others expect you to use the software yourself and send them access.
                </li>
                <li>
                  <strong>Sign up for HMRC&apos;s MTD service.</strong> You will need to register
                  for MTD for Income Tax through your{" "}
                  <a
                    href="https://www.gov.uk/guidance/sign-up-your-business-for-making-tax-digital-for-income-tax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline"
                  >
                    Government Gateway account
                  </a>
                  . This links your software to HMRC so submissions go through correctly.
                </li>
                <li>
                  <strong>Review your expense categories.</strong> MTD submissions categorise
                  expenses into HMRC&apos;s standard categories. Make sure you know which category
                  each of your regular expenses falls into to avoid errors in your quarterly
                  updates.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary">Do not overcomplicate it</h2>
              <p>
                MTD sounds like a big change, and in some ways it is. But the core requirement is
                simple: keep a digital record of what you earn and spend, and send a summary to
                HMRC four times a year plus once at the end. If you already track your finances in
                any kind of app or spreadsheet, you are most of the way there.
              </p>
              <p>
                The biggest mistake sole traders make is assuming MTD requires expensive
                enterprise-grade accounting software. It does not. What it requires is{" "}
                <strong>compatible</strong> software that can talk to HMRC&apos;s API. Plenty of
                lightweight, affordable options exist.
              </p>
              <p>
                <a href="https://quarterlyuk.com" className="text-accent underline">
                  QuarterlyUK
                </a>{" "}
                is one of them &mdash; built specifically for sole traders who want to stay
                compliant without paying for features they will never use. At &pound;2.50 per month,
                it covers digital record-keeping and is designed around the quarterly update
                workflow that MTD demands.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary">Key dates at a glance</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left px-4 py-2 font-semibold text-primary border-b border-gray-200">
                        Date
                      </th>
                      <th className="text-left px-4 py-2 font-semibold text-primary border-b border-gray-200">
                        What happens
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2 whitespace-nowrap">6 April 2026</td>
                      <td className="px-4 py-2">
                        MTD ITSA starts for income over &pound;50,000
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2 whitespace-nowrap">5 August 2026</td>
                      <td className="px-4 py-2">Q1 quarterly update deadline</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2 whitespace-nowrap">5 November 2026</td>
                      <td className="px-4 py-2">Q2 quarterly update deadline</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2 whitespace-nowrap">5 February 2027</td>
                      <td className="px-4 py-2">Q3 quarterly update deadline</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2 whitespace-nowrap">April 2027</td>
                      <td className="px-4 py-2">
                        MTD extends to income over &pound;30,000
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2 whitespace-nowrap">5 May 2027</td>
                      <td className="px-4 py-2">Q4 quarterly update deadline</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2 whitespace-nowrap">31 January 2028</td>
                      <td className="px-4 py-2">
                        Final declaration deadline for 2026/27
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap">April 2028</td>
                      <td className="px-4 py-2">
                        MTD extends to income over &pound;20,000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary">Further reading</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <a
                    href="https://www.gov.uk/guidance/making-tax-digital-for-income-tax-as-an-individual"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline"
                  >
                    GOV.UK: Making Tax Digital for Income Tax as an individual
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline"
                  >
                    GOV.UK: Find compatible software for MTD Income Tax
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.gov.uk/guidance/sign-up-your-business-for-making-tax-digital-for-income-tax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline"
                  >
                    GOV.UK: Sign up for MTD for Income Tax
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.gov.uk/government/publications/penalties-for-late-submission"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline"
                  >
                    GOV.UK: Penalties for late submission
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </article>
      </main>

      <footer className="bg-primary-dark text-slate-400 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm">
          <span>&copy; 2026 QuarterlyUK. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
