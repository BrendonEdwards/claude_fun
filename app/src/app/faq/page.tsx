import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import FaqAccordion from "./FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ — QuarterlyUK | Making Tax Digital Questions Answered",
  description:
    "Frequently asked questions about Making Tax Digital, QuarterlyUK pricing, data privacy, and HMRC compliance for UK sole traders.",
  alternates: { canonical: "https://quarterlyuk.com/faq" },
  openGraph: {
    title: "FAQ — QuarterlyUK | Making Tax Digital Questions Answered",
    description:
      "Frequently asked questions about Making Tax Digital, QuarterlyUK pricing, data privacy, and HMRC compliance for UK sole traders.",
    url: "https://quarterlyuk.com/faq",
  },
};

const faqSections = [
  {
    title: "Getting Started",
    items: [
      {
        question: "What is Making Tax Digital (MTD)?",
        answer: (
          <>
            <p className="mb-2">
              Making Tax Digital for Income Tax Self Assessment (MTD ITSA) is an
              HMRC initiative that requires self-employed individuals and
              landlords to keep digital records and submit quarterly updates to
              HMRC using compatible software.
            </p>
            <p className="mb-2">
              Instead of filing a single Self Assessment tax return at the end of
              the year, you will need to send summary updates of your income and
              expenses to HMRC every quarter, followed by a Final Declaration
              that confirms your tax position for the year.
            </p>
            <p>
              All business records (income, expenses, and supporting documents)
              must be maintained digitally. Pen-and-paper records or manual
              spreadsheets that aren&apos;t connected to compatible software will
              no longer meet HMRC requirements.
            </p>
          </>
        ),
      },
      {
        question: "Do I need to use MTD?",
        answer: (
          <>
            <p className="mb-2">
              MTD applies based on your gross self-employment and/or property
              income (before expenses). The rollout is phased:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>
                <strong>April 2026:</strong> Gross income over{" "}
                <strong>&pound;50,000</strong>
              </li>
              <li>
                <strong>April 2027:</strong> Gross income over{" "}
                <strong>&pound;30,000</strong>
              </li>
              <li>
                <strong>April 2028:</strong> Gross income over{" "}
                <strong>&pound;20,000</strong>
              </li>
            </ul>
            <p>
              If your combined gross income from self-employment and property
              exceeds the relevant threshold, you will be required to comply with
              MTD. If you are below the threshold, you can still opt in
              voluntarily.
            </p>
          </>
        ),
      },
      {
        question: "When does MTD start?",
        answer: (
          <p>
            The first group of taxpayers (those with gross self-employment or
            property income over &pound;50,000) must comply from{" "}
            <strong>6 April 2026</strong>. This means your first quarterly
            update will cover the period 6 April to 5 July 2026, due by 5
            August 2026. The &pound;30,000 threshold group joins from April
            2027, and the &pound;20,000 threshold group from April 2028.
          </p>
        ),
      },
      {
        question: "What are the HMRC quarterly update deadlines?",
        answer: (
          <>
            <p className="mb-2">
              HMRC tax quarters follow the tax year (6 April to 5 April). The
              deadlines are:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>
                <strong>Q1</strong> (6 Apr &ndash; 5 Jul): deadline{" "}
                <strong>5 August</strong>
              </li>
              <li>
                <strong>Q2</strong> (6 Jul &ndash; 5 Oct): deadline{" "}
                <strong>5 November</strong>
              </li>
              <li>
                <strong>Q3</strong> (6 Oct &ndash; 5 Jan): deadline{" "}
                <strong>5 February</strong>
              </li>
              <li>
                <strong>Q4</strong> (6 Jan &ndash; 5 Apr): deadline{" "}
                <strong>5 May</strong>
              </li>
            </ul>
            <p>
              After Q4, you must also submit a <strong>Final Declaration</strong>{" "}
              by <strong>31 January</strong> of the following year. This replaces
              the traditional Self Assessment tax return.
            </p>
          </>
        ),
      },
      {
        question: "Does MTD replace Self Assessment?",
        answer: (
          <>
            <p className="mb-2">
              Not entirely. You still need a Unique Taxpayer Reference (UTR) and
              remain within the Self Assessment system. However, the annual Self
              Assessment tax return (SA100) is replaced by the{" "}
              <strong>Final Declaration</strong>, which you submit through
              MTD-compatible software after your four quarterly updates.
            </p>
            <p>
              Think of MTD as an evolution of Self Assessment rather than a
              complete replacement. The underlying tax rules, allowances, and
              calculations remain the same &mdash; it is the reporting method
              that changes.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: "Using QuarterlyUK",
    items: [
      {
        question: "How does QuarterlyUK work?",
        answer: (
          <>
            <p className="mb-2">
              QuarterlyUK is a browser-based application designed for UK sole
              traders preparing for Making Tax Digital. It runs entirely in your
              web browser with no server-side processing of your financial data.
            </p>
            <p className="mb-2">
              You can track expenses using the 14 official HMRC self-employment
              categories, create and manage invoices, and generate quarterly
              profit and loss summaries. All data is stored in your browser&apos;s
              localStorage.
            </p>
            <p>
              When it is time to submit to HMRC, you export your quarterly
              summary as a CSV file that can be used with bridging software for
              the actual HMRC submission.
            </p>
          </>
        ),
      },
      {
        question: "Is QuarterlyUK HMRC-recognised?",
        answer: (
          <>
            <p className="mb-2">
              Not yet. HMRC recognition (appearing on the official list of
              MTD-compatible software) is on our roadmap. Currently, QuarterlyUK
              handles the <strong>record-keeping side</strong> of MTD &mdash;
              tracking your income and expenses digitally in the correct HMRC
              categories.
            </p>
            <p>
              For the actual quarterly submission to HMRC, you would use bridging
              software alongside QuarterlyUK. Our CSV exports are formatted to
              work with popular bridging tools.
            </p>
          </>
        ),
      },
      {
        question:
          "Do I need QuarterlyUK if I already use spreadsheets?",
        answer: (
          <>
            <p className="mb-2">
              Spreadsheets alone are not sufficient for MTD submission. You need
              either MTD-compatible software that can submit directly to HMRC, or
              a combination of digital records plus bridging software.
            </p>
            <p>
              QuarterlyUK is purpose-built for the HMRC expense categories and
              quarterly reporting cycle, so it saves you the effort of
              configuring a spreadsheet correctly. It also provides automatic VAT
              calculations, invoice tracking, and quarterly P&amp;L summaries
              that a plain spreadsheet does not.
            </p>
          </>
        ),
      },
      {
        question: "What expense categories does QuarterlyUK use?",
        answer: (
          <p>
            QuarterlyUK uses the 14 official HMRC self-employment expense
            categories from the SA103 supplementary page. These include
            categories such as cost of goods, travel, wages, rent, repairs,
            professional fees, and more. You can view the full list with
            descriptions and examples on our{" "}
            <Link
              href="/hmrc-expense-categories"
              className="text-accent underline"
            >
              HMRC Expense Categories
            </Link>{" "}
            page.
          </p>
        ),
      },
      {
        question: "Can I try it before subscribing?",
        answer: (
          <p>
            Yes. QuarterlyUK offers a free tier with no signup required. You can
            log up to <strong>3 expenses</strong> and create{" "}
            <strong>1 invoice</strong> to see how the application works. Your
            data is stored locally in your browser, so there is nothing to
            install and no account to create. If you find it useful, you can
            upgrade to the full version at any time.
          </p>
        ),
      },
    ],
  },
  {
    title: "Pricing & Subscription",
    items: [
      {
        question: "How much does QuarterlyUK cost?",
        answer: (
          <p>
            QuarterlyUK costs <strong>&pound;2.50 per month</strong>. For the
            first 1,000 subscribers, this price is locked for 12 months from the
            date of subscription. This makes it one of the most affordable
            MTD-ready tools on the market at just &pound;30 per year.
          </p>
        ),
      },
      {
        question: "Will the price go up after 12 months?",
        answer: (
          <p>
            We will give you at least <strong>30 days&apos; notice</strong>{" "}
            before any price change. You can cancel at any time before the new
            price takes effect, with no fees or penalties. Our goal is to remain
            the most affordable MTD tool for sole traders.
          </p>
        ),
      },
      {
        question: "Can I cancel my subscription?",
        answer: (
          <p>
            Yes, you can cancel at any time with no cancellation fees. Since
            your financial data is stored locally in your browser (not on our
            servers), you keep all your data even after cancelling. You simply
            lose access to the premium features such as unlimited expenses and
            invoices.
          </p>
        ),
      },
      {
        question:
          "How does QuarterlyUK compare to other MTD tools on price?",
        answer: (
          <>
            <p className="mb-2">
              QuarterlyUK is the cheapest paid MTD-ready expense tracker
              available. Most competing tools charge between &pound;10 and
              &pound;30 per month. QuarterlyUK costs &pound;2.50 per month
              because it focuses on what sole traders actually need &mdash;
              expense tracking, invoicing, and quarterly reports &mdash; without
              bloating the product with features you will never use.
            </p>
            <p>
              For a detailed side-by-side breakdown, see our{" "}
              <Link href="/#pricing" className="text-accent underline">
                pricing comparison
              </Link>{" "}
              on the homepage.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: "Data & Privacy",
    items: [
      {
        question: "Is my data secure?",
        answer: (
          <>
            <p className="mb-2">
              Yes. Your financial data is stored exclusively in your web
              browser&apos;s localStorage on your own device. It is never sent
              to our servers or any third party.
            </p>
            <p>
              This means there is no database to breach and no server storing
              your sensitive financial information. You are in complete control
              of your data at all times. For full details, see our{" "}
              <Link href="/privacy" className="text-accent underline">
                Privacy Policy
              </Link>
              .
            </p>
          </>
        ),
      },
      {
        question: "Can I export my data?",
        answer: (
          <p>
            Yes. QuarterlyUK provides CSV export for your expenses, invoices,
            and quarterly summaries. You can download your data at any time for
            use with other software, bridging tools, or simply as a backup. We
            strongly recommend exporting regularly.
          </p>
        ),
      },
      {
        question: "What happens if I clear my browser data?",
        answer: (
          <>
            <p className="mb-2">
              If you clear your browser&apos;s localStorage or site data, your
              QuarterlyUK records will be permanently deleted. This is the
              trade-off of local-first storage &mdash; your data stays private,
              but you are responsible for keeping backups.
            </p>
            <p>
              We strongly recommend using the CSV export feature regularly to
              back up your expenses, invoices, and quarterly summaries. Store
              these exports somewhere safe (cloud drive, USB, etc.).
            </p>
          </>
        ),
      },
      {
        question: "Does QuarterlyUK use Google Analytics?",
        answer: (
          <>
            <p className="mb-2">
              Yes. We use Google Analytics to understand anonymous website usage
              patterns &mdash; such as which pages are visited and how long
              visitors spend on the site. This helps us improve the product.
            </p>
            <p>
              Crucially, your financial data (expenses, invoices, income figures,
              business details) is <strong>never tracked or transmitted</strong>.
              Google Analytics only sees standard website interaction data, not
              the contents of the application.
            </p>
          </>
        ),
      },
    ],
  },
  {
    title: "MTD Compliance",
    items: [
      {
        question: "What records must I keep digitally under MTD?",
        answer: (
          <>
            <p className="mb-2">
              Under MTD, you must keep digital records of all business
              transactions, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>The date of each transaction</li>
              <li>The amount</li>
              <li>The category (matching HMRC&apos;s prescribed categories)</li>
            </ul>
            <p>
              For income, you need to record each sale or payment received. For
              expenses, you need to record each business cost in the relevant
              HMRC category. QuarterlyUK captures all of these fields
              automatically as you log your expenses and invoices.
            </p>
          </>
        ),
      },
      {
        question: "What is a Final Declaration?",
        answer: (
          <>
            <p className="mb-2">
              The Final Declaration replaces the traditional Self Assessment tax
              return. After submitting your four quarterly updates, you submit a
              Final Declaration that confirms your overall tax position for the
              year.
            </p>
            <p>
              The deadline for the Final Declaration is{" "}
              <strong>31 January</strong> following the end of the tax year
              (the same deadline as the current Self Assessment return). For
              example, for the 2026/27 tax year, the Final Declaration is due
              by 31 January 2028.
            </p>
          </>
        ),
      },
      {
        question:
          "What happens if I miss an MTD quarterly deadline?",
        answer: (
          <>
            <p className="mb-2">
              HMRC uses a <strong>points-based penalty system</strong> for late
              submissions. Each time you miss a quarterly deadline, you receive 1
              penalty point. Once you reach the points threshold (currently 4
              points for quarterly obligations), you receive a &pound;200
              financial penalty.
            </p>
            <p>
              After hitting the threshold, each subsequent late submission also
              incurs a &pound;200 penalty. Points expire after a period of
              compliance (typically 24 months of on-time submissions), so it is
              important to stay on top of your deadlines from the start.
            </p>
          </>
        ),
      },
      {
        question: "What is bridging software?",
        answer: (
          <>
            <p className="mb-2">
              Bridging software is a tool that takes your digital records and
              submits them to HMRC via their MTD API. It acts as a bridge
              between your record-keeping system (such as QuarterlyUK or a
              spreadsheet) and HMRC&apos;s systems.
            </p>
            <p>
              QuarterlyUK exports your quarterly summaries as CSV files that are
              formatted for use with bridging software. This means you can use
              QuarterlyUK for day-to-day record keeping and a bridging tool for
              the actual submission step.
            </p>
          </>
        ),
      },
      {
        question:
          "Can my accountant submit my MTD updates for me?",
        answer: (
          <p>
            Yes. Accountants and tax agents can submit MTD quarterly updates and
            the Final Declaration on your behalf using their own MTD-compatible
            software. You would still need to keep your digital records
            up to date (which QuarterlyUK helps you do), and your accountant
            would handle the submission to HMRC. Many accountants are already set
            up for MTD submissions.
          </p>
        ),
      },
    ],
  },
];

export default function FaqPage() {
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
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://quarterlyuk.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "FAQ",
                  item: "https://quarterlyuk.com/faq",
                },
              ],
            }),
          }}
        />

        <h1 className="text-3xl font-bold text-primary mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-muted mb-10">
          Everything you need to know about Making Tax Digital and QuarterlyUK.
        </p>

        <FaqAccordion sections={faqSections} />
      </main>

      <footer className="bg-primary-dark text-slate-400 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm">
          <span>&copy; 2026 QuarterlyUK. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
