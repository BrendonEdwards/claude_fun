"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getExpenses, getIncomes, isActivated } from "@/lib/store";
import { formatCurrency, getQuarterlySummaries } from "@/lib/calculations";
import type { Expense, Income } from "@/lib/types";
import UpgradeBanner from "@/components/UpgradeBanner";

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    setExpenses(getExpenses());
    setIncomes(getIncomes());
    setIsPro(isActivated());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalIncome - totalExpenses;
  const quarters = getQuarterlySummaries(incomes, expenses, "2025");

  const recentExpenses = [...expenses]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const unpaidInvoices = incomes.filter((i) => !i.paid);

  const summaryCards = [
    {
      label: "Total Income",
      value: formatCurrency(totalIncome),
      color: "text-accent",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
      ),
      bg: "from-accent/5 to-accent/0",
    },
    {
      label: "Total Expenses",
      value: formatCurrency(totalExpenses),
      color: "text-danger",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
        </svg>
      ),
      bg: "from-danger/5 to-danger/0",
    },
    {
      label: "Net Profit",
      value: formatCurrency(netProfit),
      color: netProfit >= 0 ? "text-success" : "text-danger",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      bg: netProfit >= 0 ? "from-success/5 to-success/0" : "from-danger/5 to-danger/0",
    },
    {
      label: "Unpaid Invoices",
      value: String(unpaidInvoices.length),
      color: "text-warning",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      bg: "from-warning/5 to-warning/0",
    },
  ];

  return (
    <div>
      {!isPro && (
        <div className="mb-6">
          <UpgradeBanner />
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary tracking-tight">Dashboard</h1>
        {isPro ? (
          <span className="text-xs font-bold bg-gradient-to-r from-accent to-violet text-white px-3 py-1 rounded-full">PRO</span>
        ) : (
          <span className="text-xs font-bold bg-gray-100 text-muted px-3 py-1 rounded-full">FREE</span>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summaryCards.map((card) => (
          <div key={card.label} className={`bg-gradient-to-br ${card.bg} bg-white rounded-2xl border border-gray-100 p-5`}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted font-medium">{card.label}</p>
              <div className={`${card.color} opacity-50`}>{card.icon}</div>
            </div>
            <p className={`text-2xl font-bold ${card.color}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <Link
          href="/dashboard/expenses"
          className="group bg-gradient-to-r from-primary to-primary-light text-white rounded-xl p-4 text-center font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Expense
        </Link>
        <Link
          href="/dashboard/invoices"
          className="group bg-gradient-to-r from-accent to-accent-dark text-white rounded-xl p-4 text-center font-semibold hover:shadow-lg hover:shadow-accent/20 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create Invoice
        </Link>
        <Link
          href="/dashboard/mtd-checker"
          className="group bg-white border-2 border-primary/15 text-primary rounded-xl p-4 text-center font-semibold hover:border-accent/30 hover:text-accent transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          Check MTD Readiness
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quarterly summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-primary text-base mb-4">
            Quarterly Summary (2025/26)
          </h2>
          <div className="space-y-3">
            {quarters.map((q) => (
              <div
                key={q.quarter}
                className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
              >
                <span className="text-sm font-semibold text-primary">Q{q.quarter}</span>
                <div className="flex gap-5 text-sm">
                  <span className="text-accent font-medium">
                    +{formatCurrency(q.income)}
                  </span>
                  <span className="text-danger font-medium">
                    -{formatCurrency(q.expenses)}
                  </span>
                  <span
                    className={`font-bold ${
                      q.profit >= 0 ? "text-primary" : "text-danger"
                    }`}
                  >
                    {formatCurrency(q.profit)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent expenses */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-primary text-base">Recent Expenses</h2>
            <Link
              href="/dashboard/expenses"
              className="text-sm text-accent font-medium hover:text-accent-dark transition-colors"
            >
              View all
            </Link>
          </div>
          {recentExpenses.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
              </div>
              <p className="text-muted text-sm">
                No expenses recorded yet.
              </p>
              <p className="text-muted/60 text-xs mt-1">
                Add your first expense to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentExpenses.map((e) => (
                <div
                  key={e.id}
                  className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-primary">{e.description}</p>
                    <p className="text-xs text-muted mt-0.5">{e.date}</p>
                  </div>
                  <span className="text-sm font-bold text-danger">
                    -{formatCurrency(e.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MTD countdown */}
      <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-amber-900 text-sm">
              Making Tax Digital deadline approaching
            </h3>
            <p className="text-sm text-amber-800/80 mt-0.5">
              From 6 April 2026, sole traders with income over £50,000 must
              submit quarterly updates to HMRC digitally.{" "}
              <Link
                href="/dashboard/mtd-checker"
                className="underline font-semibold text-amber-900 hover:text-amber-700"
              >
                Check your readiness
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
