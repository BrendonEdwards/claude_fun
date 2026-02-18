import Link from "next/link";
import Image from "next/image";

const features = [
  {
    title: "Expense Tracking",
    description:
      "Log your business expenses in 14 HMRC categories. VAT at 20%, 5%, or 0% is worked out for you.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
  },
  {
    title: "Professional Invoices",
    description:
      "Create invoices with VAT included. See who's paid and who still owes you.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    title: "Quarterly Summaries",
    description:
      "Profit and loss reports split by HMRC tax quarter. Export to CSV for your accountant.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    title: "MTD Readiness Checker",
    description:
      "Simple 8-point checklist so you know exactly where you stand before April 2026.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
  },
  {
    title: "CSV Export",
    description:
      "Download your expenses, invoices, and summaries as CSV files. Hand them straight to your accountant or use with bridging software.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
  },
  {
    title: "Privacy First",
    description:
      "Your data stays on your computer. Nothing gets sent anywhere. Back up whenever you like.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
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
    a: "Your data is stored locally in your browser. Nothing is sent to external servers. You can export and back up your data at any time.",
  },
  {
    q: "Will the price go up after 12 months?",
    a: "Your £2.50/month rate is locked in for 12 months from the date you subscribe. We'll always give you at least 30 days' notice of any price change, and you can cancel at any time with no penalties.",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes, cancel any time. There are no cancellation fees or lock-in contracts. Since your data is stored locally, you keep everything even after cancelling.",
  },
];

const stats = [
  { value: "864K", label: "Sole traders affected by MTD" },
  { value: "£2.50", label: "Per month, the cheapest MTD tool in the UK" },
  { value: "14", label: "HMRC-aligned expense categories" },
  { value: "100%", label: "Browser-based, no install needed" },
];

const CHECKOUT_URL =
  "https://quarterlyuk.lemonsqueezy.com/checkout/buy/e8049fa3-6f7c-4e6f-9905-9ecd80eb0408";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Q" width={42} height={42} className="-mr-0.5" />
            <span className="text-2xl font-bold tracking-tight text-primary">
              uarterly<span className="text-accent">UK</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="#about"
              className="text-sm font-medium text-muted hover:text-primary transition-colors hidden sm:block"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-muted hover:text-primary transition-colors hidden sm:block"
            >
              Contact
            </a>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted hover:text-primary transition-colors hidden sm:block"
            >
              Dashboard
            </Link>
            <a
              href={CHECKOUT_URL}
              className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-light transition-colors"
            >
              Subscribe - £2.50/mo
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light" />
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-amber-200 text-sm font-medium px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              MTD launches 6 April 2026. Are you ready?
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Stay MTD compliant.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-100">
                Keep it simple. Pay less.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl leading-relaxed">
              864,000 sole traders need digital records by April 2026.
              QuarterlyUK does it for £2.50 a month. The cheapest MTD tool in the UK, no accountancy degree needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/dashboard"
                className="group bg-accent text-white px-8 py-4 rounded-full text-base font-bold hover:shadow-lg hover:shadow-accent/25 transition-all inline-flex items-center justify-center gap-2"
              >
                Try It Free
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a
                href="#features"
                className="border border-white/25 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        {/* Gradient fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats bar */}
      <section className="relative -mt-12 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 py-6 text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MTD Warning */}
      <section className="max-w-5xl mx-auto px-6 mt-16">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-amber-900 text-base">
                864,000 sole traders must comply by April 2026
              </h3>
              <p className="text-amber-800/80 text-sm mt-1.5 leading-relaxed">
                If your self-employment or property income exceeds £50,000, you
                must keep digital records and send quarterly updates to HMRC from
                6 April 2026. HMRC does not provide free software.{" "}
                <a
                  href="https://www.gov.uk/government/collections/making-tax-digital-for-income-tax"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold text-amber-900 hover:text-amber-700"
                >
                  Learn more on GOV.UK
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Everything you need for MTD
            </h2>
            <p className="text-muted mt-4 max-w-lg mx-auto">
              Not full accounting software. Just the digital records HMRC
              requires, without the complexity or the price tag.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-gray-100 hover:border-gray-200 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl flex items-center justify-center text-accent mb-4">
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-primary mb-2">{f.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Get MTD-ready in three steps
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Track", desc: "Log your expenses and income using HMRC categories. Enter the details and VAT is worked out for you." },
              { step: "02", title: "Invoice", desc: "Create invoices with line items and VAT. See which clients have paid and who still owes you." },
              { step: "03", title: "Export", desc: "Get quarterly profit and loss summaries as CSV files, ready for your accountant or bridging software." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center text-white text-lg font-bold mx-auto mb-5">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-muted mt-4">
              No hidden fees. No price hikes. Lock in £2.50/month for 12 months as an early subscriber.
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <div className="relative bg-white border-2 border-primary rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-100">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-accent text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                  Early Subscriber Price
                </span>
              </div>
              <div className="text-center mb-8 mt-2">
                <div className="text-5xl md:text-6xl font-bold text-primary">£2.50</div>
                <div className="text-muted mt-1">per month</div>
                <div className="text-xs text-accent font-semibold mt-2">Locked in for 12 months for the first 1,000 subscribers</div>
              </div>
              <div className="space-y-3.5 mb-8">
                {[
                  "Expense tracker with 14 HMRC categories",
                  "Professional invoice generator",
                  "Quarterly P&L summaries",
                  "MTD readiness checker",
                  "CSV export for everything",
                  "Data stored locally (your privacy)",
                  "All updates included while subscribed",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <a
                href={CHECKOUT_URL}
                className="block w-full bg-primary text-white py-4 rounded-xl font-bold text-center hover:bg-primary-light transition-colors text-base"
              >
                Subscribe - £2.50/mo
              </a>
              <p className="text-xs text-muted text-center mt-3">
                Or{" "}
                <Link href="/dashboard" className="text-accent underline">
                  try free first
                </Link>{" "}
                - no signup needed. Cancel any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Transparency */}
      <section className="py-24 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-3">Honest Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              No introductory tricks. No price hikes.
            </h2>
            <p className="text-muted mt-4 max-w-xl mx-auto">
              Most MTD providers lure you in with a cheap first year, then double or triple the price.
              We think that&apos;s a terrible way to treat small businesses.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-10 shadow-sm">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-base mb-1">The typical MTD provider</h3>
                    <p className="text-muted text-sm leading-relaxed">
                      Advertises &ldquo;from £5/month&rdquo; then hikes to £15-£25/month after your
                      introductory period ends. By then your data is locked in and moving is a hassle.
                      Some charge extra for CSV exports, multiple users, or even basic reporting.
                    </p>
                  </div>
                </div>
                <div className="border-t border-gray-100" />
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-base mb-1">QuarterlyUK</h3>
                    <p className="text-muted text-sm leading-relaxed">
                      £2.50/month. That&apos;s it. Your price is locked in for 12 months when you
                      subscribe as one of our first 1,000 users. No bait-and-switch. No hidden extras.
                      Everything is included, and your data stays on your device so you&apos;re never locked in.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started - User Journey */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-3">Getting Started</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Up and running in under two minutes
            </h2>
            <p className="text-muted mt-4 max-w-xl mx-auto">
              No lengthy sign-up forms. No email verification hoops. Just start using it.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-0">
              {[
                {
                  step: "1",
                  title: "Try it free",
                  desc: "Open the dashboard and start tracking expenses straight away. No account needed, your data stays in your browser. The free tier lets you add up to 3 expenses and 1 invoice so you can see how it works.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  ),
                },
                {
                  step: "2",
                  title: "Subscribe for £2.50/month",
                  desc: "When you're ready, click Subscribe. You'll be taken to our secure checkout (powered by LemonSqueezy). Pay by card, and you're done.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                    </svg>
                  ),
                },
                {
                  step: "3",
                  title: "Get your license key",
                  desc: "After payment, LemonSqueezy emails you a unique license key. Check your inbox (and spam folder, just in case).",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  ),
                },
                {
                  step: "4",
                  title: "Activate and you're done",
                  desc: "Paste your license key into the activation page in the dashboard. Everything unlocks instantly: unlimited expenses, invoices, and CSV exports.",
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                  ),
                },
              ].map((item, i) => (
                <div key={item.step} className="flex gap-6 items-start relative">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {item.icon}
                    </div>
                    {i < 3 && <div className="w-px h-full bg-gray-200 min-h-[40px]" />}
                  </div>
                  <div className="pb-10">
                    <h3 className="text-base font-bold text-primary mb-1">{item.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-surface">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Common questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-primary text-base mb-2">{faq.q}</h3>
                <p className="text-muted text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-3">Our Story</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Built by sole traders, for sole traders
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-10 shadow-sm">
            <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-4">
              <p>
                When we first heard about Making Tax Digital, we did what
                most sole traders do. Panicked a bit, then started Googling.
              </p>
              <p>
                What we found was frustrating. The &ldquo;affordable&rdquo;
                options were £15/month subscriptions that assumed you had
                employees and payroll. The free ones were clunky spreadsheets
                that didn&apos;t line up with HMRC quarters. Nothing was
                built for the reality of running a one-person business:
                simple income, straightforward expenses, and a quarterly
                deadline you just need to hit without overpaying.
              </p>
              <p>
                So we built QuarterlyUK. The tool we wished existed. No
                jargon, no 47-step onboarding. Just log your expenses,
                create invoices when you need them, and export quarterly
                summaries that are ready for your accountant or HMRC&apos;s
                bridging software.
              </p>
              <p className="text-primary font-medium">
                We&apos;re sole traders too. We know the deadline is real and
                the budget is tight. That&apos;s why we charge £2.50 a month,
                not £15 or £20 like most MTD providers. No introductory offers
                that double after six months. Just a fair price, locked in for
                12 months for our first 1,000 subscribers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Feedback */}
      <section id="contact" className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-3">Get in Touch</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">
              Contact &amp; Feedback
            </h2>
            <p className="text-muted mt-4 max-w-lg mx-auto">
              Something not working? Got a suggestion? We want to hear from you.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="w-11 h-11 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl flex items-center justify-center text-accent mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-primary mb-2">Support</h3>
              <p className="text-muted text-sm leading-relaxed mb-4">
                If something isn&apos;t working or you need help with your
                license, drop us an email and we&apos;ll get back to you as
                quickly as we can.
              </p>
              <a
                href="mailto:hello@quarterlyuk.com"
                className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:text-accent-dark transition-colors"
              >
                hello@quarterlyuk.com
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="w-11 h-11 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl flex items-center justify-center text-accent mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-primary mb-2">Feedback &amp; Feature Requests</h3>
              <p className="text-muted text-sm leading-relaxed mb-4">
                We&apos;re building this based on what people actually ask
                for. Tell us what&apos;s missing or what could be better.
              </p>
              <a
                href="mailto:feedback@quarterlyuk.com?subject=QuarterlyUK%20Feedback"
                className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:text-accent-dark transition-colors"
              >
                feedback@quarterlyuk.com
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
          <p className="text-center text-muted/60 text-xs mt-6">
            We aim to respond to all emails within 24 hours.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light" />
        <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Stay compliant. Keep it simple. Pay less.
          </h2>
          <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto">
            Get your expenses and invoices sorted before the April 2026
            deadline. £2.50/month, locked in for the first 1,000 subscribers.
          </p>
          <a
            href={CHECKOUT_URL}
            className="inline-flex items-center gap-2 bg-accent text-white px-10 py-4 rounded-full text-base font-bold hover:shadow-lg hover:shadow-accent/25 transition-all"
          >
            Subscribe - £2.50/mo
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center">
              <Image src="/logo.svg" alt="Q" width={28} height={28} className="-mr-0.5" />
              <span className="text-white text-lg font-bold tracking-tight">
                uarterly<span className="text-accent">UK</span>
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <Link href="/roadmap" className="hover:text-white transition-colors">Roadmap</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <span>&copy; 2026 QuarterlyUK. All rights reserved.</span>
            <span>
              QuarterlyUK is a record-keeping tool, not a tax adviser.{" "}
              <Link href="/terms" className="underline hover:text-slate-300">Terms</Link>
              {" "}&amp;{" "}
              <Link href="/privacy" className="underline hover:text-slate-300">Privacy</Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
