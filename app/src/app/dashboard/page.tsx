"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getExpenses, getIncomes } from "@/lib/store";
import { formatCurrency, getQuarterlySummaries } from "@/lib/calculations";
import type { Expense, Income } from "@/lib/types";

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setExpenses(getExpenses());
    setIncomes(getIncomes());
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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-sm text-gray-500 mb-1">Total Income</p>
          <p className="text-2xl font-bold text-accent">
            {formatCurrency(totalIncome)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
          <p className="text-2xl font-bold text-danger">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-sm text-gray-500 mb-1">Net Profit</p>
          <p
            className={`text-2xl font-bold ${
              netProfit >= 0 ? "text-accent" : "text-danger"
            }`}
          >
            {formatCurrency(netProfit)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5">
          <p className="text-sm text-gray-500 mb-1">Unpaid Invoices</p>
          <p className="text-2xl font-bold text-warning">
            {unpaidInvoices.length}
          </p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link
          href="/dashboard/expenses"
          className="bg-primary text-white rounded-xl p-4 text-center font-semibold hover:bg-primary-dark transition-colors"
        >
          + Add Expense
        </Link>
        <Link
          href="/dashboard/invoices"
          className="bg-accent text-white rounded-xl p-4 text-center font-semibold hover:opacity-90 transition-opacity"
        >
          + Create Invoice
        </Link>
        <Link
          href="/dashboard/mtd-checker"
          className="bg-white border-2 border-primary text-primary rounded-xl p-4 text-center font-semibold hover:bg-primary/5 transition-colors"
        >
          Check MTD Readiness
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quarterly summary */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h2 className="font-bold text-lg mb-4">
            Quarterly Summary (2025/26)
          </h2>
          <div className="space-y-3">
            {quarters.map((q) => (
              <div
                key={q.quarter}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <span className="text-sm font-medium">Q{q.quarter}</span>
                <div className="flex gap-6 text-sm">
                  <span className="text-accent">
                    +{formatCurrency(q.income)}
                  </span>
                  <span className="text-danger">
                    -{formatCurrency(q.expenses)}
                  </span>
                  <span
                    className={`font-semibold ${
                      q.profit >= 0 ? "text-gray-900" : "text-danger"
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
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">Recent Expenses</h2>
            <Link
              href="/dashboard/expenses"
              className="text-sm text-primary font-medium"
            >
              View all
            </Link>
          </div>
          {recentExpenses.length === 0 ? (
            <p className="text-gray-400 text-sm py-4 text-center">
              No expenses recorded yet. Add your first expense to get started.
            </p>
          ) : (
            <div className="space-y-2">
              {recentExpenses.map((e) => (
                <div
                  key={e.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium">{e.description}</p>
                    <p className="text-xs text-gray-400">{e.date}</p>
                  </div>
                  <span className="text-sm font-semibold text-danger">
                    -{formatCurrency(e.amount)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MTD countdown */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⏰</span>
          <div>
            <h3 className="font-bold text-amber-900">
              Making Tax Digital deadline approaching
            </h3>
            <p className="text-sm text-amber-800">
              From 6 April 2026, sole traders with income over £50,000 must
              submit quarterly updates to HMRC digitally.{" "}
              <Link
                href="/dashboard/mtd-checker"
                className="underline font-medium"
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
