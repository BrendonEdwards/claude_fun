"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getExpenses, getEffectiveIncomes, getInvoices, getJobs, isActivated } from "@/lib/store";
import { formatCurrency, formatDate, getQuarterlySummaries, estimateTax, downloadBackup, daysSinceLastBackup, getCurrentTaxYear } from "@/lib/calculations";
import type { Expense, Income, Invoice, Job } from "@/lib/types";
import UpgradeBanner from "@/components/UpgradeBanner";

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    setExpenses(getExpenses());
    setIncomes(getEffectiveIncomes());
    setInvoices(getInvoices());
    setJobs(getJobs());
    setIsPro(isActivated());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalIncome - totalExpenses;
  const taxYearLabel = getCurrentTaxYear();
  const taxYearStart = taxYearLabel.split("/")[0];
  const quarters = getQuarterlySummaries(incomes, expenses, taxYearStart);

  const recentExpenses = [...expenses]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const recentInvoices = [...invoices]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const tax = estimateTax(netProfit);

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
      label: "Set Aside for Tax",
      value: formatCurrency(tax.total),
      subtitle: tax.total > 0 ? `Income Tax ${formatCurrency(tax.incomeTax)} + NIC ${formatCurrency(tax.class4Nic)}` : "Below personal allowance",
      color: "text-accent",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
        </svg>
      ),
      bg: "from-accent/5 to-accent/0",
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
          <span className="text-xs font-bold bg-accent text-primary px-3 py-1 rounded-full">PRO</span>
        ) : (
          <span className="text-xs font-bold bg-gray-100 text-muted px-3 py-1 rounded-full">FREE</span>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {summaryCards.slice(0, 4).map((card) => (
          <div key={card.label} className={`bg-gradient-to-br ${card.bg} bg-white rounded-2xl border border-gray-100 p-5`}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted font-medium">{card.label}</p>
              <div className={`${card.color} opacity-50`}>{card.icon}</div>
            </div>
            <p className={`text-2xl font-bold ${card.color}`}>
              {card.value}
            </p>
            {"subtitle" in card && card.subtitle && (
              <p className="text-xs text-muted mt-1">{card.subtitle}</p>
            )}
          </div>
        ))}
      </div>

      {/* Backup reminder */}
      {expenses.length > 0 && (() => {
        const days = daysSinceLastBackup();
        const urgent = days === null || days >= 7;
        return (
          <div className={`rounded-xl p-4 mb-8 flex items-center justify-between ${
            urgent
              ? "bg-gradient-to-r from-red-50 to-orange-50 border border-red-200/60"
              : "bg-gradient-to-r from-slate-50 to-gray-50 border border-gray-200/60"
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                urgent ? "bg-red-100" : "bg-primary/10"
              }`}>
                <svg className={`w-4 h-4 ${urgent ? "text-red-600" : "text-primary"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
              </div>
              <p className="text-sm text-muted">
                {urgent
                  ? days === null
                    ? <>You have <span className="font-semibold text-primary">{expenses.length} expense{expenses.length !== 1 ? "s" : ""}</span> with <span className="font-semibold text-red-600">no backup</span>. Your data lives in this browser only.</>
                    : <>Last backup was <span className="font-semibold text-red-600">{days} days ago</span>. Back up now to avoid losing data.</>
                  : <>Last backup: <span className="font-semibold text-green-600">{days === 0 ? "today" : days === 1 ? "yesterday" : `${days} days ago`}</span>. {expenses.length} expense{expenses.length !== 1 ? "s" : ""} saved locally.</>
                }
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { downloadBackup(); window.location.reload(); }}
                className="text-sm font-semibold text-accent hover:text-accent-dark transition-colors whitespace-nowrap flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Backup Now
              </button>
              <Link
                href="/dashboard/backup"
                className="text-xs text-muted hover:text-primary transition-colors underline whitespace-nowrap"
              >
                Manage
              </Link>
            </div>
          </div>
        );
      })()}

      {/* Quarterly deadline countdown */}
      {(() => {
        const now = new Date();
        const yr = parseInt(taxYearStart);
        const deadlines = [
          { q: 'Q1', due: new Date(yr, 7, 7), label: `7 Aug ${yr}` },
          { q: 'Q2', due: new Date(yr, 10, 7), label: `7 Nov ${yr}` },
          { q: 'Q3', due: new Date(yr + 1, 1, 7), label: `7 Feb ${yr + 1}` },
          { q: 'Q4', due: new Date(yr + 1, 4, 7), label: `7 May ${yr + 1}` },
        ];
        const next = deadlines.find(d => d.due > now);
        if (!next) return null;
        const daysLeft = Math.ceil((next.due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return (
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/60 rounded-2xl p-5 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-orange-900 text-sm">{next.q} update due in {daysLeft} day{daysLeft !== 1 ? 's' : ''}</h3>
                  <p className="text-sm text-orange-800/80 mt-0.5">
                    Submit your quarterly update to HMRC by {next.label}
                  </p>
                </div>
              </div>
              <div className="text-3xl font-bold text-orange-600">{daysLeft}</div>
            </div>
          </div>
        );
      })()}

      {/* Welcome callout */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 rounded-2xl p-5 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-primary text-sm">Your MTD toolkit</h3>
            <p className="text-sm text-muted mt-1 leading-relaxed">
              Track expenses, create invoices, and export quarterly summaries ready for HMRC.
              Use the sidebar to navigate. Your data stays private, stored only in this browser.
            </p>
          </div>
        </div>
      </div>

      {/* Active Jobs */}
      {jobs.filter((j) => j.status === "active").length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-primary text-base">Active Jobs</h2>
            <Link
              href="/dashboard/jobs"
              className="text-sm text-accent font-medium hover:text-accent-dark transition-colors"
            >
              View all
            </Link>
          </div>
          <div className="space-y-2">
            {jobs
              .filter((j) => j.status === "active")
              .slice(0, 5)
              .map((job) => (
                <Link
                  key={job.id}
                  href={`/dashboard/jobs/${job.id}`}
                  className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-primary">{job.name}</p>
                    <p className="text-xs text-muted mt-0.5">{job.client}</p>
                  </div>
                  <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    active
                  </span>
                </Link>
              ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quarterly summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-bold text-primary text-base mb-4">
            Quarterly Summary ({taxYearLabel})
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
                    <p className="text-xs text-muted mt-0.5">{formatDate(e.date)}</p>
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

      {/* Recent invoices */}
      <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-primary text-base">Recent Invoices</h2>
          <Link
            href="/dashboard/invoices"
            className="text-sm text-accent font-medium hover:text-accent-dark transition-colors"
          >
            View all
          </Link>
        </div>
        {recentInvoices.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted text-sm">No invoices yet.</p>
            <p className="text-muted/60 text-xs mt-1">Create your first invoice to get started.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentInvoices.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-primary">
                    {inv.invoiceNumber} - {inv.to.name}
                  </p>
                  <p className="text-xs text-muted mt-0.5">{formatDate(inv.date)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      inv.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {inv.status}
                  </span>
                  <span className="text-sm font-bold text-accent">
                    {formatCurrency(inv.total)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
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

      {/* Testimonials */}
      <div className="mt-6">
        <h2 className="font-bold text-primary text-base mb-4">What people are saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              quote: "Brilliant! I want to use it. So much simpler than the spreadsheets I've been using for years.",
              name: "Sarah T.",
              role: "Freelance consultant",
            },
            {
              quote: "Finally something built for one-person businesses. No payroll nonsense, just expenses and invoices. Exactly what I needed.",
              name: "James M.",
              role: "IT contractor",
            },
            {
              quote: "I was dreading MTD but this makes it feel manageable. The quarterly summaries save me hours before my accountant meeting.",
              name: "Rachel K.",
              role: "Private tutor",
            },
          ].map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl border border-gray-100 p-5"
            >
              <svg className="w-6 h-6 text-accent/30 mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
              </svg>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                {t.quote}
              </p>
              <div>
                <p className="text-sm font-semibold text-primary">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
