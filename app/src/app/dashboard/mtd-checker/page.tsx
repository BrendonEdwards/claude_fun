"use client";

import { useState } from "react";
import Link from "next/link";

interface CheckItem {
  id: string;
  label: string;
  description: string;
  help: string;
  checked: boolean;
}

const initialChecks: CheckItem[] = [
  {
    id: "income",
    label: "My self-employment or property income exceeds £50,000",
    description:
      "MTD for Income Tax applies from April 2026 if your gross income from self-employment or property exceeds £50,000.",
    help: "If your income is between £30,000 and £50,000, you need to comply from April 2027. Below £30,000, from April 2028.",
    checked: false,
  },
  {
    id: "utr",
    label: "I have a Unique Taxpayer Reference (UTR)",
    description:
      "You need a UTR to file self-assessment returns and submit MTD quarterly updates.",
    help: "If you don't have one, register with HMRC for self-assessment. Your UTR arrives by post within 10 working days.",
    checked: false,
  },
  {
    id: "gateway",
    label: "I have a Government Gateway account",
    description:
      "You need Government Gateway credentials to authorise MTD-compatible software to communicate with HMRC.",
    help: "Create an account at access.service.gov.uk if you haven't already. You need your National Insurance number.",
    checked: false,
  },
  {
    id: "digital_records",
    label: "I keep digital records of income and expenses",
    description:
      "Under MTD, you must keep digital records of all business transactions. Paper records on their own won't be enough.",
    help: "That's what QuarterlyUK is for. Use the Expenses and Income sections to log everything.",
    checked: false,
  },
  {
    id: "categories",
    label: "My expenses are categorised correctly",
    description:
      "HMRC needs your expenses sorted into their specific categories for tax purposes.",
    help: "QuarterlyUK uses HMRC categories by default. Just make sure each expense is in the right one.",
    checked: false,
  },
  {
    id: "quarterly",
    label: "I understand the quarterly update schedule",
    description:
      "You must send HMRC a summary of income and expenses for each quarter of the tax year (6 Apr - 5 Apr).",
    help: "Q1: 6 Apr to 5 Jul | Q2: 6 Jul to 5 Oct | Q3: 6 Oct to 5 Jan | Q4: 6 Jan to 5 Apr. Updates are due by the 7th of the month after each quarter ends.",
    checked: false,
  },
  {
    id: "software",
    label: "I have MTD-compatible software or a bridging tool",
    description:
      "You need HMRC-recognised software to submit quarterly updates digitally.",
    help: "QuarterlyUK gets your data ready. For the actual HMRC submission, you can use free bridging software. HMRC has a list of compatible options.",
    checked: false,
  },
  {
    id: "vat",
    label: "I know my VAT registration status",
    description:
      "If you're VAT-registered, you may already be familiar with MTD (MTD for VAT has been live since 2019).",
    help: "If your taxable turnover exceeds £90,000, you must register for VAT. If already VAT-registered, you're ahead on digital compliance.",
    checked: false,
  },
];

export default function MTDCheckerPage() {
  const [checks, setChecks] = useState<CheckItem[]>(initialChecks);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setChecks(
      checks.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c))
    );
  };

  const completedCount = checks.filter((c) => c.checked).length;
  const totalCount = checks.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  const getStatusColor = () => {
    if (percentage === 100) return "text-accent";
    if (percentage >= 50) return "text-warning";
    return "text-danger";
  };

  const getStatusLabel = () => {
    if (percentage === 100) return "Ready for MTD!";
    if (percentage >= 75) return "Almost there";
    if (percentage >= 50) return "Halfway ready";
    if (percentage >= 25) return "Getting started";
    return "Not yet ready";
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">MTD Readiness Checker</h1>
      <p className="text-gray-500 mb-6">
        Check if you&apos;re prepared for Making Tax Digital for Income Tax,
        launching 6 April 2026.
      </p>

      {/* Progress */}
      <div className="bg-white rounded-xl border border-border p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-3xl font-bold ${getStatusColor()}`}>
            {percentage}%
          </span>
          <span className={`text-lg font-semibold ${getStatusColor()}`}>
            {getStatusLabel()}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              percentage === 100
                ? "bg-accent"
                : percentage >= 50
                ? "bg-warning"
                : "bg-danger"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {completedCount} of {totalCount} items completed
        </p>
      </div>

      {/* Checklist */}
      <div className="space-y-3">
        {checks.map((check) => (
          <div
            key={check.id}
            className="bg-white rounded-xl border border-border overflow-hidden"
          >
            <div
              className="p-4 flex items-start gap-3 cursor-pointer"
              onClick={() => toggle(check.id)}
            >
              <div
                className={`w-6 h-6 rounded-md border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                  check.checked
                    ? "bg-accent border-accent text-white"
                    : "border-gray-300"
                }`}
              >
                {check.checked && (
                  <span className="text-sm font-bold">✓</span>
                )}
              </div>
              <div className="flex-1">
                <p
                  className={`font-medium ${
                    check.checked ? "line-through text-gray-400" : ""
                  }`}
                >
                  {check.label}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {check.description}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedId(expandedId === check.id ? null : check.id);
                }}
                className="text-primary text-sm font-medium flex-shrink-0"
              >
                {expandedId === check.id ? "Less" : "Help"}
              </button>
            </div>
            {expandedId === check.id && (
              <div className="px-4 pb-4 ml-9">
                <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
                  {check.help}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Key dates */}
      <div className="mt-8 bg-white rounded-xl border border-border p-6">
        <h2 className="font-bold text-lg mb-4">Key MTD Dates</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-28 flex-shrink-0 text-sm font-semibold text-primary">
              6 Apr 2026
            </div>
            <div>
              <p className="font-medium">MTD Phase 1 begins</p>
              <p className="text-sm text-gray-500">
                Sole traders and landlords with income over £50,000 must start
                keeping digital records and sending quarterly updates.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-28 flex-shrink-0 text-sm font-semibold text-gray-500">
              7 Aug 2026
            </div>
            <div>
              <p className="font-medium">First quarterly update due</p>
              <p className="text-sm text-gray-500">
                Q1 (6 Apr - 5 Jul 2026) summary must be submitted to HMRC.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-28 flex-shrink-0 text-sm font-semibold text-gray-500">
              Apr 2027
            </div>
            <div>
              <p className="font-medium">MTD Phase 2</p>
              <p className="text-sm text-gray-500">
                Extended to those with income over £30,000.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-28 flex-shrink-0 text-sm font-semibold text-gray-500">
              Apr 2028
            </div>
            <div>
              <p className="font-medium">MTD Phase 3</p>
              <p className="text-sm text-gray-500">
                Extended to those with income over £20,000.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 bg-primary/5 rounded-xl border border-primary/20 p-6 text-center">
        <h3 className="font-bold text-lg mb-2">Start tracking now</h3>
        <p className="text-gray-600 text-sm mb-4">
          The sooner you start keeping digital records, the easier the
          transition to MTD will be.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/dashboard/expenses"
            className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-semibold"
          >
            Track Expenses
          </Link>
          <Link
            href="/dashboard/invoices"
            className="px-5 py-2 bg-accent text-white rounded-lg text-sm font-semibold"
          >
            Create Invoice
          </Link>
        </div>
      </div>
    </div>
  );
}
