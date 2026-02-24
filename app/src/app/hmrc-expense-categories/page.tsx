import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "HMRC Expense Categories for Sole Traders: The Complete List — QuarterlyUK",
  description:
    "All 10 HMRC self-employment expense categories from the SA103 form, with descriptions, examples, and notes. Used by QuarterlyUK for MTD-ready expense tracking.",
  alternates: {
    canonical: "https://quarterlyuk.com/hmrc-expense-categories",
  },
  openGraph: {
    title:
      "HMRC Expense Categories for Sole Traders: The Complete List — QuarterlyUK",
    description:
      "All 10 HMRC self-employment expense categories from the SA103 form, with descriptions, examples, and notes. Used by QuarterlyUK for MTD-ready expense tracking.",
    url: "https://quarterlyuk.com/hmrc-expense-categories",
  },
};

const categories = [
  {
    number: 1,
    name: "Cost of goods bought for resale or goods used",
    description:
      "This covers the direct costs of any goods you buy to sell on, or raw materials and supplies used to produce your goods or deliver your services. It includes stock purchases, raw materials, and any items consumed directly in producing what you sell.",
    examples: [
      "Stock or inventory purchased for resale",
      "Raw materials (e.g. fabric for a tailor, ingredients for a baker)",
      "Packaging materials and shipping supplies",
      "Direct costs of producing goods (e.g. printing costs for a publisher)",
    ],
    note: "Only include goods directly related to your business output. Personal purchases must never be included, even if bought from the same supplier.",
  },
  {
    number: 2,
    name: "Car, van and travel expenses",
    description:
      "Business travel costs, including vehicle running costs for the business portion of your vehicle use. You can either claim actual costs (fuel, insurance, repairs) proportioned for business use, or use HMRC simplified mileage rates.",
    examples: [
      "Fuel for business journeys",
      "Parking fees and tolls on business trips",
      "Train, bus, or taxi fares for business travel",
      "Vehicle insurance, servicing, and MOT (business portion only)",
    ],
    note: "If you use your personal vehicle for business, you must only claim the business portion. Many sole traders find it simpler to use HMRC's mileage allowance (45p per mile for the first 10,000 miles, then 25p).",
  },
  {
    number: 3,
    name: "Wages, salaries and other staff costs",
    description:
      "Payments to employees and subcontractors working in your business. This includes gross wages, employer National Insurance contributions, pension contributions, and payments to freelancers or subcontractors under CIS.",
    examples: [
      "Employee gross wages and salaries",
      "Employer National Insurance contributions",
      "Employer pension contributions",
      "Subcontractor or freelancer payments",
    ],
    note: "You cannot claim your own wages or drawings as a sole trader. This category is only for payments to other people who work for your business.",
  },
  {
    number: 4,
    name: "Rent, rates, power and insurance costs",
    description:
      "Costs of your business premises, including rent, business rates, utility bills, and business insurance. If you work from home, you can claim a proportion of your household costs or use HMRC's simplified expenses flat rate.",
    examples: [
      "Office or workshop rent",
      "Business rates",
      "Electricity and gas for business premises",
      "Business insurance (public liability, professional indemnity, contents)",
    ],
    note: "If you work from home, HMRC's simplified expenses allow you to claim a flat rate based on hours worked: 25+ hours/month = £10/month, 51+ hours = £18/month, 101+ hours = £26/month. Alternatively, you can calculate the actual proportion of household costs used for business.",
  },
  {
    number: 5,
    name: "Repairs and maintenance of property and equipment",
    description:
      "Costs of repairing and maintaining business property and equipment. This covers like-for-like repairs that restore something to its previous condition, not improvements or upgrades (which may be capital expenditure).",
    examples: [
      "Repairing a broken laptop or printer",
      "Replacing a worn-out tool with a like-for-like equivalent",
      "Fixing a leak in your business premises",
      "Servicing business machinery",
    ],
    note: "There is an important distinction between repairs (allowable) and improvements (capital expenditure). Replacing a broken window is a repair. Upgrading to double glazing is an improvement and would be claimed through capital allowances instead.",
  },
  {
    number: 6,
    name: "Accountancy, legal and other professional fees",
    description:
      "Fees paid to professionals for services relating to your business. This includes your accountant, solicitor, and professional body membership fees, as well as other specialist advisors.",
    examples: [
      "Accountant or bookkeeper fees",
      "Solicitor fees for business contracts",
      "Professional body subscriptions (e.g. RICS, CIMA, ACT)",
      "Consultancy or specialist advisory fees",
    ],
    note: "Legal fees relating to the purchase of property or equipment are capital costs, not revenue expenses. Only day-to-day professional fees go in this category.",
  },
  {
    number: 7,
    name: "Interest on bank and other loans",
    description:
      "Interest payments on borrowing used for business purposes. This includes bank loan interest, overdraft interest, and credit card interest on business purchases. Only the interest portion is claimable, not the capital repayment.",
    examples: [
      "Interest on a business bank loan",
      "Business overdraft interest charges",
      "Interest on a business credit card balance",
      "Hire purchase interest (business assets)",
    ],
    note: "You can only claim the business portion of interest payments. If you use a personal credit card for some business purchases, only the interest attributable to those business transactions can be claimed.",
  },
  {
    number: 8,
    name: "Phone, fax, stationery and other office costs",
    description:
      "Day-to-day costs of running your office or workspace. This covers communication costs, office consumables, and general administrative supplies needed to keep your business operating.",
    examples: [
      "Mobile phone bill (business portion)",
      "Broadband and internet costs (business portion)",
      "Postage and courier costs",
      "Printer ink, paper, pens, and stationery",
    ],
    note: "If you use your personal phone or broadband for business, you can only claim the business-use proportion. Keep a record of how you calculate the split.",
  },
  {
    number: 9,
    name: "Advertising and business entertainment costs",
    description:
      "Costs of promoting your business, including all forms of advertising and marketing. Business entertainment (e.g. taking a client to lunch) is recorded here but is not tax-deductible — you still need to track it for your records.",
    examples: [
      "Google Ads, Facebook Ads, or other online advertising",
      "Business cards, flyers, and printed marketing materials",
      "Website hosting and domain name costs",
      "Client entertainment (meals, events — recorded but not deductible)",
    ],
    note: "Important: business entertainment costs (e.g. client meals, event tickets for clients) must be recorded in this category but are NOT tax-deductible. They are disallowed when calculating your taxable profit. Advertising costs are fully deductible.",
  },
  {
    number: 10,
    name: "Other allowable business expenses",
    description:
      "A catch-all category for legitimate business expenses that do not fit neatly into the other categories. This includes software subscriptions, training, trade publications, and miscellaneous business costs.",
    examples: [
      "Software subscriptions (e.g. accounting software, design tools)",
      "Training courses and CPD related to your business",
      "Trade journals and professional publications",
      "Bank charges and payment processing fees",
    ],
    note: "If you are unsure where an expense belongs, it likely goes here. However, make sure the expense is wholly and exclusively for business purposes. HMRC may query unusual or large amounts in this category.",
  },
];

export default function HmrcExpenseCategoriesPage() {
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
                  name: "HMRC Expense Categories",
                  item: "https://quarterlyuk.com/hmrc-expense-categories",
                },
              ],
            }),
          }}
        />

        <h1 className="text-3xl font-bold text-primary mb-2">
          HMRC Expense Categories for Sole Traders
        </h1>
        <p className="text-sm text-muted mb-6">
          The complete list of self-employment expense categories from the SA103
          form.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg px-5 py-4 mb-10 text-sm text-gray-700 leading-relaxed">
          <p className="mb-2">
            These categories are used on the{" "}
            <strong>SA103 (Self Employment supplementary page)</strong> and are
            the categories QuarterlyUK uses for expense tracking. When you log
            an expense in QuarterlyUK, you select one of these categories so
            your records are always aligned with what HMRC expects.
          </p>
          <p>
            For official guidance, see the{" "}
            <a
              href="https://www.gov.uk/self-employed-records"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline"
            >
              GOV.UK guide to keeping self-employment records
            </a>{" "}
            and the{" "}
            <a
              href="https://www.gov.uk/guidance/self-employment-detailed-notes-sa103"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline"
            >
              SA103 detailed notes
            </a>
            .
          </p>
        </div>

        <div className="space-y-8">
          {categories.map((cat) => (
            <section
              key={cat.number}
              className="border border-gray-200 rounded-lg p-5"
            >
              <div className="flex items-start gap-4 mb-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                  {cat.number}
                </span>
                <h2 className="text-base font-bold text-primary leading-snug">
                  {cat.name}
                </h2>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                {cat.description}
              </p>

              <h3 className="text-xs font-bold text-muted uppercase tracking-wide mb-2">
                Examples
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mb-3">
                {cat.examples.map((ex) => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded px-4 py-3 text-xs text-gray-700 leading-relaxed">
                <strong className="text-amber-800">Note:</strong> {cat.note}
              </div>
            </section>
          ))}
        </div>

        <section className="border border-gray-200 rounded-lg p-5 mt-8">
          <div className="flex items-start gap-4 mb-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">
              +
            </span>
            <h2 className="text-base font-bold text-primary leading-snug">
              Capital allowances
            </h2>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            Capital allowances are claimed separately from the expense categories
            above. They cover the cost of business assets such as equipment,
            vehicles, and machinery. Rather than deducting the full cost in the
            year of purchase, capital allowances spread the tax relief over
            time (or allow the full amount through the Annual Investment
            Allowance).
          </p>

          <h3 className="text-xs font-bold text-muted uppercase tracking-wide mb-2">
            Common examples
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mb-3">
            <li>Computers, laptops, and tablets purchased for business use</li>
            <li>Vehicles used for business</li>
            <li>Machinery and large equipment</li>
            <li>Office furniture (desks, chairs, shelving)</li>
          </ul>

          <div className="bg-amber-50 border border-amber-200 rounded px-4 py-3 text-xs text-gray-700 leading-relaxed">
            <strong className="text-amber-800">Note:</strong> Capital allowances
            are reported in a separate section of the SA103, not as part of the
            10 expense categories above. The Annual Investment Allowance (AIA)
            currently allows you to deduct the full cost of qualifying assets up
            to &pound;1,000,000 in the year of purchase. For more details, see{" "}
            <a
              href="https://www.gov.uk/capital-allowances"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline"
            >
              GOV.UK capital allowances guidance
            </a>
            .
          </div>
        </section>

        <div className="mt-10 bg-gray-50 border border-gray-200 rounded-lg px-5 py-4 text-sm text-gray-700">
          <p>
            <strong>Using QuarterlyUK?</strong> When you add an expense in the
            app, these are the exact categories available in the dropdown. Your
            quarterly summaries automatically group expenses by these categories,
            matching the format HMRC expects for MTD submissions.{" "}
            <Link href="/" className="text-accent underline">
              Try QuarterlyUK free
            </Link>
            .
          </p>
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
