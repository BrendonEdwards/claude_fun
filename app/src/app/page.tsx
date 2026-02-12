import Link from "next/link";

const features = [
  {
    icon: "📸",
    title: "AI Receipt Scanner",
    description:
      "Snap a photo of any receipt. Our AI instantly categorises the expense, extracts the amount, and files it in the right category.",
  },
  {
    icon: "📄",
    title: "Professional Invoices",
    description:
      "Generate UK-compliant invoices in seconds. Auto-calculate VAT, track payment status, and send directly to clients.",
  },
  {
    icon: "📊",
    title: "Quarterly Summaries",
    description:
      "Automatic profit & loss reports aligned with HMRC tax quarters. Export to CSV for your accountant or MTD submission.",
  },
  {
    icon: "✅",
    title: "MTD Readiness Checker",
    description:
      "Interactive checklist to ensure you meet all Making Tax Digital requirements before the April 2026 deadline.",
  },
  {
    icon: "💷",
    title: "Expense Tracking",
    description:
      "Track every business expense with HMRC-friendly categories. VAT calculations handled automatically.",
  },
  {
    icon: "📥",
    title: "Export Everything",
    description:
      "Export expenses, invoices, and summaries to CSV or PDF. Ready for your accountant or HMRC submission software.",
  },
];

const faqs = [
  {
    q: "What is Making Tax Digital (MTD)?",
    a: "From 6 April 2026, sole traders and landlords with income over £50,000 must keep digital records and submit quarterly updates to HMRC using compatible software. This expands to those earning over £30,000 from April 2027.",
  },
  {
    q: "Do I need QuarterlyUK if I already use spreadsheets?",
    a: "Under MTD, manual spreadsheets alone won't be sufficient. You need digital record-keeping software that can generate quarterly summaries. QuarterlyUK helps you organise your records so they're ready for submission.",
  },
  {
    q: "Can QuarterlyUK submit directly to HMRC?",
    a: "QuarterlyUK is a preparation tool that organises your income and expenses into MTD-ready quarterly summaries. For actual HMRC submission, you'll use your quarterly exports with HMRC-approved bridging software.",
  },
  {
    q: "Is my data secure?",
    a: "Your data is stored locally in your browser. Nothing is sent to external servers except when you use the optional AI receipt scanner. You can export and back up your data at any time.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">Quarterly</span>
            <span className="text-sm bg-primary text-white px-2 py-0.5 rounded-full font-medium">
              UK
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-600 hover:text-primary"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard"
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark to-primary text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-block bg-white/10 text-amber-200 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Making Tax Digital launches 6 April 2026 — Are you ready?
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            The simplest way to get
            <br />
            <span className="text-blue-300">MTD-ready</span> as a sole trader
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            AI-powered expense tracking, professional invoicing, and quarterly
            summaries. Everything UK sole traders need to prepare for Making Tax
            Digital — in one toolkit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-white text-primary px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-50 transition-colors"
            >
              Try It Free — No Signup
            </Link>
            <a
              href="#features"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-colors"
            >
              See Features
            </a>
          </div>
          <p className="text-blue-200 text-sm mt-4">
            No account needed. Your data stays in your browser.
          </p>
        </div>
      </section>

      {/* MTD Warning Banner */}
      <section className="bg-amber-50 border-y border-amber-200 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">⚠️</span>
            <div>
              <h3 className="font-bold text-amber-900">
                780,000 sole traders must comply by April 2026
              </h3>
              <p className="text-amber-800 text-sm mt-1">
                If your self-employment or property income exceeds £50,000, you
                must keep digital records and send quarterly updates to HMRC from
                6 April 2026. HMRC does not provide free software — you must use
                a third-party tool.{" "}
                <a
                  href="https://www.gov.uk/government/collections/making-tax-digital-for-income-tax"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium"
                >
                  Learn more on GOV.UK
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Everything you need for MTD
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
            Built specifically for UK sole traders and freelancers who need
            simple, affordable tax preparation tools.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{f.icon}</span>
                <h3 className="text-lg font-bold mt-3 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-surface">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Simple pricing</h2>
          <p className="text-gray-600 mb-12">
            No subscriptions. No hidden fees. Pay once, use forever.
          </p>
          <div className="max-w-sm mx-auto bg-white border-2 border-primary rounded-2xl p-8">
            <div className="text-sm font-semibold text-primary mb-2">
              LIFETIME ACCESS
            </div>
            <div className="text-5xl font-bold mb-1">£29</div>
            <div className="text-gray-500 mb-6">one-time payment</div>
            <ul className="text-left space-y-3 mb-8">
              {[
                "AI receipt scanner",
                "Professional invoice generator",
                "Expense tracker with HMRC categories",
                "Quarterly P&L summaries",
                "MTD readiness checker",
                "CSV & PDF export",
                "Lifetime updates",
                "Data stored locally (your privacy)",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <span className="text-accent font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/dashboard"
              className="block w-full bg-primary text-white py-3 rounded-lg font-bold text-center hover:bg-primary-dark transition-colors"
            >
              Get Started Free
            </Link>
            <p className="text-xs text-gray-400 mt-3">
              Try free first, pay when you&apos;re ready
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-border pb-6">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-white text-xl font-bold">QuarterlyUK</span>
              <p className="text-sm mt-1">
                AI-powered tax preparation for sole traders
              </p>
            </div>
            <div className="text-sm text-right">
              <p>
                QuarterlyUK is a record-keeping tool, not a tax adviser.
                <br />
                Always consult a qualified accountant for tax advice.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            © 2026 QuarterlyUK. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
