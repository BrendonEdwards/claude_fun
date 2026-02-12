"use client";

import { useState, useEffect } from "react";
import {
  getExpenses,
  saveExpense,
  deleteExpense,
  generateId,
  isActivated,
  FREE_LIMITS,
} from "@/lib/store";
import { formatCurrency, exportToCSV } from "@/lib/calculations";
import type { Expense, ExpenseCategory } from "@/lib/types";
import { EXPENSE_CATEGORIES } from "@/lib/types";
import UpgradeBanner from "@/components/UpgradeBanner";

const VAT_RATES = [
  { label: "Standard (20%)", value: 20 },
  { label: "Reduced (5%)", value: 5 },
  { label: "Zero (0%)", value: 0 },
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    description: "",
    amount: "",
    category: "other" as ExpenseCategory,
    vatRate: 20,
    notes: "",
  });

  useEffect(() => {
    setExpenses(getExpenses());
    setIsPro(isActivated());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const atLimit = !isPro && expenses.length >= FREE_LIMITS.maxExpenses;

  const resetForm = () => {
    setForm({
      date: new Date().toISOString().split("T")[0],
      description: "",
      amount: "",
      category: "other",
      vatRate: 20,
      notes: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (!form.description || isNaN(amount) || amount <= 0) return;

    const expense: Expense = {
      id: editingId || generateId(),
      date: form.date,
      description: form.description,
      amount,
      category: form.category,
      vatRate: form.vatRate,
      vatAmount: amount * (form.vatRate / (100 + form.vatRate)),
      notes: form.notes || undefined,
    };

    saveExpense(expense);
    setExpenses(getExpenses());
    resetForm();
  };

  const handleEdit = (expense: Expense) => {
    setForm({
      date: expense.date,
      description: expense.description,
      amount: expense.amount.toString(),
      category: expense.category,
      vatRate: expense.vatRate,
      notes: expense.notes || "",
    });
    setEditingId(expense.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    deleteExpense(id);
    setExpenses(getExpenses());
  };

  const handleExport = () => {
    exportToCSV(
      expenses.map((e) => ({
        Date: e.date,
        Description: e.description,
        Category: EXPENSE_CATEGORIES[e.category],
        "Amount (£)": e.amount.toFixed(2),
        "VAT Rate (%)": e.vatRate,
        "VAT Amount (£)": e.vatAmount.toFixed(2),
        "Net Amount (£)": (e.amount - e.vatAmount).toFixed(2),
        Notes: e.notes || "",
      })),
      `taxmate-expenses-${new Date().toISOString().split("T")[0]}.csv`
    );
  };

  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalVat = expenses.reduce((sum, e) => sum + e.vatAmount, 0);

  const sorted = [...expenses].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      {atLimit && (
        <div className="mb-6">
          <UpgradeBanner feature="unlimited expenses" />
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Expenses</h1>
          {!isPro && (
            <span className="text-xs text-muted bg-gray-100 px-2 py-0.5 rounded-full">
              {expenses.length}/{FREE_LIMITS.maxExpenses} free
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {isPro && (
            <button
              onClick={handleExport}
              className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-gray-50"
            >
              Export CSV
            </button>
          )}
          <button
            onClick={() => {
              if (atLimit) return;
              resetForm();
              setShowForm(true);
            }}
            disabled={atLimit}
            className="px-4 py-2 text-sm bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + Add Expense
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-border p-4">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-xl font-bold text-danger">
            {formatCurrency(totalAmount)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4">
          <p className="text-sm text-gray-500">VAT Reclaimable</p>
          <p className="text-xl font-bold text-accent">
            {formatCurrency(totalVat)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4">
          <p className="text-sm text-gray-500">Number of Expenses</p>
          <p className="text-xl font-bold">{expenses.length}</p>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-border p-6 mb-6">
          <h2 className="font-bold text-lg mb-4">
            {editingId ? "Edit Expense" : "Add New Expense"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Amount (£)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder="0.00"
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <input
                type="text"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="e.g., Office stationery from Staples"
                className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value as ExpenseCategory,
                    })
                  }
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                >
                  {Object.entries(EXPENSE_CATEGORIES).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  VAT Rate
                </label>
                <select
                  value={form.vatRate}
                  onChange={(e) =>
                    setForm({ ...form, vatRate: parseInt(e.target.value) })
                  }
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                >
                  {VAT_RATES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Notes (optional)
              </label>
              <input
                type="text"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Additional notes"
                className="w-full border border-border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary-dark"
              >
                {editingId ? "Update" : "Add"} Expense
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 border border-border rounded-lg text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {sorted.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <p className="text-lg mb-2">No expenses yet</p>
            <p className="text-sm">
              Click &quot;Add Expense&quot; to record your first business
              expense.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-dark border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Date</th>
                  <th className="text-left px-4 py-3 font-semibold">
                    Description
                  </th>
                  <th className="text-left px-4 py-3 font-semibold">
                    Category
                  </th>
                  <th className="text-right px-4 py-3 font-semibold">
                    Amount
                  </th>
                  <th className="text-right px-4 py-3 font-semibold">VAT</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((expense) => (
                  <tr
                    key={expense.id}
                    className="border-b border-border last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{expense.date}</td>
                    <td className="px-4 py-3 font-medium">
                      {expense.description}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {EXPENSE_CATEGORIES[expense.category]}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-500">
                      {formatCurrency(expense.vatAmount)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleEdit(expense)}
                        className="text-primary hover:underline text-xs mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="text-danger hover:underline text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
