"use client";

import { useState, useEffect } from "react";
import { getExpenses, getIncomes, isActivated } from "@/lib/store";
import UpgradeBanner from "@/components/UpgradeBanner";
import {
  formatCurrency,
  calculateProfitAndLoss,
  getQuarterlySummaries,
  exportToCSV,
} from "@/lib/calculations";
import { EXPENSE_CATEGORIES } from "@/lib/types";
import type { Expense, Income } from "@/lib/types";

export default function ReportsPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [mounted, setMounted] = useState(false);
  const [taxYear, setTaxYear] = useState("2025");
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    setExpenses(getExpenses());
    setIncomes(getIncomes());
    setIsPro(isActivated());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!isPro) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Reports</h1>
        <UpgradeBanner feature="full P&L reports and CSV exports" />
        <div className="mt-8 text-center text-muted">
          <p className="text-sm">Upgrade to access detailed profit & loss reports, quarterly summaries, and CSV exports.</p>
        </div>
      </div>
    );
  }

  const year = parseInt(taxYear);
  const pnl = calculateProfitAndLoss(
    incomes,
    expenses,
    `${year}-04-06`,
    `${year + 1}-04-05`
  );
  const quarters = getQuarterlySummaries(incomes, expenses, taxYear);

  const handleExportPnL = () => {
    const rows = Object.entries(pnl.expensesByCategory).map(([cat, amt]) => ({
      Category: cat,
      "Amount (£)": (amt as number).toFixed(2),
    }));
    rows.unshift({ Category: "TOTAL INCOME", "Amount (£)": pnl.totalIncome.toFixed(2) });
    rows.push({ Category: "TOTAL EXPENSES", "Amount (£)": pnl.totalExpenses.toFixed(2) });
    rows.push({ Category: "NET PROFIT", "Amount (£)": pnl.netProfit.toFixed(2) });
    exportToCSV(rows, `quarterlyuk-pnl-${taxYear}-${year + 1}.csv`);
  };

  const handleExportQuarterly = () => {
    exportToCSV(
      quarters.map((q) => ({
        Quarter: `Q${q.quarter}`,
        "Tax Year": q.taxYear,
        "Income (£)": q.income.toFixed(2),
        "Expenses (£)": q.expenses.toFixed(2),
        "Profit (£)": q.profit.toFixed(2),
      })),
      `quarterlyuk-quarterly-${taxYear}-${year + 1}.csv`
    );
  };

  const handleExportAllExpenses = () => {
    exportToCSV(
      expenses.map((e) => ({
        Date: e.date,
        Description: e.description,
        Category: EXPENSE_CATEGORIES[e.category],
        "Gross Amount (£)": e.amount.toFixed(2),
        "VAT Rate (%)": e.vatRate,
        "VAT Amount (£)": e.vatAmount.toFixed(2),
        "Net Amount (£)": (e.amount - e.vatAmount).toFixed(2),
      })),
      `quarterlyuk-all-expenses-${taxYear}.csv`
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <select
          value={taxYear}
          onChange={(e) => setTaxYear(e.target.value)}
          className="border border-border rounded-lg px-3 py-2 text-sm"
        >
          <option value="2025">Tax Year 2025/26</option>
          <option value="2024">Tax Year 2024/25</option>
          <option value="2026">Tax Year 2026/27</option>
        </select>
      </div>

      {/* P&L Summary */}
      <div className="bg-white rounded-xl border border-border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">
            Profit & Loss - {year}/{year + 1}
          </h2>
          <button
            onClick={handleExportPnL}
            className="px-4 py-1.5 text-sm border border-border rounded-lg hover:bg-gray-50"
          >
            Export CSV
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-700">Total Income</p>
            <p className="text-2xl font-bold text-green-800">
              {formatCurrency(pnl.totalIncome)}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-red-700">Total Expenses</p>
            <p className="text-2xl font-bold text-red-800">
              {formatCurrency(pnl.totalExpenses)}
            </p>
          </div>
          <div
            className={`rounded-lg p-4 ${
              pnl.netProfit >= 0 ? "bg-blue-50" : "bg-red-50"
            }`}
          >
            <p
              className={`text-sm ${
                pnl.netProfit >= 0 ? "text-blue-700" : "text-red-700"
              }`}
            >
              Net Profit
            </p>
            <p
              className={`text-2xl font-bold ${
                pnl.netProfit >= 0 ? "text-blue-800" : "text-red-800"
              }`}
            >
              {formatCurrency(pnl.netProfit)}
            </p>
          </div>
        </div>

        {/* Expense breakdown */}
        {Object.keys(pnl.expensesByCategory).length > 0 && (
          <div>
            <h3 className="font-semibold text-sm text-gray-500 uppercase mb-3">
              Expenses by Category
            </h3>
            <div className="space-y-2">
              {Object.entries(pnl.expensesByCategory)
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .map(([category, amount]) => {
                  const pct =
                    pnl.totalExpenses > 0
                      ? ((amount as number) / pnl.totalExpenses) * 100
                      : 0;
                  return (
                    <div key={category} className="flex items-center gap-3">
                      <div className="w-40 text-sm truncate">{category}</div>
                      <div className="flex-1 bg-gray-100 rounded-full h-4">
                        <div
                          className="bg-primary/70 rounded-full h-4"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="w-24 text-right text-sm font-medium">
                        {formatCurrency(amount as number)}
                      </div>
                      <div className="w-12 text-right text-xs text-gray-500">
                        {pct.toFixed(0)}%
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {Object.keys(pnl.expensesByCategory).length === 0 &&
          pnl.totalIncome === 0 && (
            <p className="text-gray-400 text-center py-4">
              No data for this period. Add income and expenses to see your P&L.
            </p>
          )}
      </div>

      {/* Quarterly summaries */}
      <div className="bg-white rounded-xl border border-border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">
            Quarterly Summaries (MTD Format)
          </h2>
          <button
            onClick={handleExportQuarterly}
            className="px-4 py-1.5 text-sm border border-border rounded-lg hover:bg-gray-50"
          >
            Export CSV
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          These quarterly summaries align with the HMRC tax year quarters
          required for Making Tax Digital.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b-2 border-border">
              <tr>
                <th className="text-left py-3 font-semibold">Quarter</th>
                <th className="text-left py-3 font-semibold">Period</th>
                <th className="text-right py-3 font-semibold">Income</th>
                <th className="text-right py-3 font-semibold">Expenses</th>
                <th className="text-right py-3 font-semibold">Profit</th>
              </tr>
            </thead>
            <tbody>
              {quarters.map((q) => {
                const periodStart =
                  q.quarter === 1
                    ? `6 Apr ${year}`
                    : q.quarter === 2
                    ? `6 Jul ${year}`
                    : q.quarter === 3
                    ? `6 Oct ${year}`
                    : `6 Jan ${year + 1}`;
                const periodEnd =
                  q.quarter === 1
                    ? `5 Jul ${year}`
                    : q.quarter === 2
                    ? `5 Oct ${year}`
                    : q.quarter === 3
                    ? `5 Jan ${year + 1}`
                    : `5 Apr ${year + 1}`;

                return (
                  <tr
                    key={q.quarter}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-3 font-medium">Q{q.quarter}</td>
                    <td className="py-3 text-gray-500">
                      {periodStart} to {periodEnd}
                    </td>
                    <td className="py-3 text-right text-green-700">
                      {formatCurrency(q.income)}
                    </td>
                    <td className="py-3 text-right text-red-700">
                      {formatCurrency(q.expenses)}
                    </td>
                    <td
                      className={`py-3 text-right font-semibold ${
                        q.profit >= 0 ? "" : "text-red-700"
                      }`}
                    >
                      {formatCurrency(q.profit)}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-surface-dark font-bold">
                <td className="py-3 px-0">Total</td>
                <td className="py-3">{taxYear}/{year + 1}</td>
                <td className="py-3 text-right text-green-700">
                  {formatCurrency(quarters.reduce((s, q) => s + q.income, 0))}
                </td>
                <td className="py-3 text-right text-red-700">
                  {formatCurrency(
                    quarters.reduce((s, q) => s + q.expenses, 0)
                  )}
                </td>
                <td className="py-3 text-right">
                  {formatCurrency(quarters.reduce((s, q) => s + q.profit, 0))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Export section */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="font-bold text-lg mb-4">Bulk Export</h2>
        <p className="text-sm text-gray-500 mb-4">
          Download everything for your accountant or MTD bridging software.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExportAllExpenses}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold"
          >
            Export All Expenses (CSV)
          </button>
          <button
            onClick={handleExportPnL}
            className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-semibold"
          >
            Export P&L Summary (CSV)
          </button>
          <button
            onClick={handleExportQuarterly}
            className="px-4 py-2 border border-border rounded-lg text-sm font-semibold"
          >
            Export Quarterly Summaries (CSV)
          </button>
        </div>
      </div>
    </div>
  );
}
