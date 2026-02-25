"use client";

import { useState } from "react";
import Image from "next/image";

const tabs = [
  {
    id: "reports",
    label: "Reports",
    image: "/screenshots/reports.png",
    alt: "QuarterlyUK profit and loss report with expenses by category and quarterly summaries aligned to HMRC tax quarters",
    caption: "Profit & loss reports and quarterly summaries aligned to HMRC tax quarters. Export to CSV for your accountant.",
  },
  {
    id: "invoices",
    label: "Invoices",
    image: "/screenshots/invoices.png",
    alt: "QuarterlyUK invoices dashboard showing total outstanding, total paid, and invoice list with status tracking",
    caption: "Track every invoice. See who's paid and who still owes you at a glance.",
  },
  {
    id: "invoice-detail",
    label: "Invoice Preview",
    image: "/screenshots/invoice-detail.png",
    alt: "QuarterlyUK professional invoice preview with VAT breakdown, client details, and line items",
    caption: "Professional invoices with VAT calculated automatically. View, edit, or mark as paid.",
  },
  {
    id: "jobs",
    label: "Jobs",
    image: "/screenshots/jobs.png",
    alt: "QuarterlyUK jobs and projects page showing active jobs with expenses, invoiced amounts, and net profit per project",
    caption: "Track profitability per job. See expenses, invoiced amounts, and net profit at project level.",
  },
  {
    id: "export",
    label: "Export",
    image: "/screenshots/export.png",
    alt: "QuarterlyUK bulk CSV export for expenses, P&L summary, and quarterly summaries ready for MTD bridging software",
    caption: "Export everything as CSV — expenses, P&L, and quarterly summaries ready for HMRC bridging software.",
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              active === i
                ? "bg-primary text-white"
                : "bg-white border border-gray-200 text-muted hover:border-gray-300 hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Screenshot */}
      <div className="relative bg-white rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/50 overflow-hidden">
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <Image
            src={tabs[active].image}
            alt={tabs[active].alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 900px"
            priority={active === 0}
          />
        </div>
      </div>

      {/* Caption */}
      <p className="text-muted text-sm text-center mt-4 max-w-lg mx-auto">
        {tabs[active].caption}
      </p>
    </div>
  );
}
