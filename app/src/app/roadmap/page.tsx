import Link from "next/link";
import Image from "next/image";

const roadmapItems = [
  {
    status: "live",
    title: "Expense Tracking (14 HMRC Categories)",
    description: "Log business expenses with automatic VAT calculation at 20%, 5%, or 0%.",
  },
  {
    status: "live",
    title: "Invoice Generator",
    description: "Create professional invoices with line items, VAT, and client details. Track paid vs. outstanding.",
  },
  {
    status: "live",
    title: "Quarterly P&L Summaries",
    description: "Profit and loss reports split by HMRC tax quarter with CSV export.",
  },
  {
    status: "live",
    title: "MTD Readiness Checker",
    description: "8-point checklist to know exactly where you stand before April 2026.",
  },
  {
    status: "live",
    title: "Tax Estimate Calculator",
    description: "Estimates Income Tax and Class 4 NIC based on your net profit.",
  },
  {
    status: "live",
    title: "Data Backup & Restore",
    description: "One-click JSON backup of all your data. Restore at any time.",
  },
  {
    status: "building",
    title: "Job & Project Costing",
    description: "Group expenses and invoices by job or project. See profit per job as well as your overall totals. Perfect for builders, tradespeople, and freelancers who work on multiple projects.",
  },
  {
    status: "building",
    title: "Recurring Invoices",
    description: "Set up invoices that repeat monthly or on a custom schedule for retainer clients.",
  },
  {
    status: "planned",
    title: "Receipt Photo Capture",
    description: "Snap a photo of a receipt and have the details extracted automatically. No more manual entry.",
  },
  {
    status: "planned",
    title: "Mileage Tracker",
    description: "Log business miles and calculate HMRC-approved mileage allowance (45p/mile first 10,000, then 25p).",
  },
  {
    status: "planned",
    title: "Multi-Device Sync",
    description: "Optional encrypted cloud sync so your data is available across devices. Still privacy-first — your data, your key.",
  },
  {
    status: "planned",
    title: "HMRC Bridging Integration",
    description: "Submit your quarterly updates directly to HMRC without needing separate bridging software.",
  },
  {
    status: "considering",
    title: "Bank Statement Import",
    description: "Import bank CSV/OFX files and match transactions to expenses automatically.",
  },
  {
    status: "considering",
    title: "Accountant Sharing",
    description: "Generate a read-only link your accountant can use to review your records without needing login credentials.",
  },
];

const statusConfig = {
  live: { label: "Live", color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  building: { label: "In Progress", color: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  planned: { label: "Planned", color: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
  considering: { label: "Under Consideration", color: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
};

export default function RoadmapPage() {
  const groups = [
    { key: "live" as const, title: "Live Now", description: "Available to all Founders License holders" },
    { key: "building" as const, title: "In Progress", description: "Currently being built — founders get these free when they ship" },
    { key: "planned" as const, title: "Planned", description: "On the roadmap — coming in future updates" },
    { key: "considering" as const, title: "Under Consideration", description: "We're exploring these based on user feedback" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="QuarterlyUK" width={28} height={28} />
            <span className="text-lg font-bold tracking-tight text-primary">
              Quarterly<span className="text-accent">UK</span>
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
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">Roadmap</h1>
          <p className="text-muted max-w-lg mx-auto">
            We build what sole traders actually ask for.
            Founders License holders get every update included — no extra cost, ever.
          </p>
        </div>

        <div className="space-y-12">
          {groups.map((group) => {
            const items = roadmapItems.filter((i) => i.status === group.key);
            if (items.length === 0) return null;
            const cfg = statusConfig[group.key];
            return (
              <section key={group.key}>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                  <h2 className="text-lg font-bold text-primary">{group.title}</h2>
                </div>
                <p className="text-sm text-muted mb-4 ml-[22px]">{group.description}</p>
                <div className="space-y-3 ml-[22px]">
                  {items.map((item) => (
                    <div
                      key={item.title}
                      className="bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-primary">{item.title}</h3>
                          <p className="text-sm text-muted mt-1 leading-relaxed">{item.description}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${cfg.color}`}>
                          {cfg.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-2xl p-6 text-center">
          <h3 className="font-bold text-primary mb-2">Got a feature request?</h3>
          <p className="text-sm text-muted mb-4">
            We prioritise based on what people actually need. Tell us what&apos;s missing.
          </p>
          <a
            href="mailto:feedback@quarterlyuk.com?subject=Feature%20Request"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-light transition-colors"
          >
            Send Feature Request
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </main>

      <footer className="bg-primary-dark text-slate-400 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm">
          <span>&copy; 2026 QuarterlyUK. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
