"use client";

import { useState, useEffect } from "react";
import {
  getExpenses,
  saveExpense,
  deleteExpense,
  generateId,
  todayLocal,
  isActivated,
  FREE_LIMITS,
  getJobs,
} from "@/lib/store";
import { formatCurrency, formatDate, exportToCSV } from "@/lib/calculations";
import type { Expense, ExpenseCategory } from "@/lib/types";
import type { Job } from "@/lib/types";
import { EXPENSE_CATEGORIES, CATEGORY_KEYWORDS } from "@/lib/types";
import UpgradeBanner from "@/components/UpgradeBanner";
import { compressImage } from "@/lib/image-utils";

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
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>("");
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [receiptData, setReceiptData] = useState<string | null>(null);
  const [viewingReceipt, setViewingReceipt] = useState<string | null>(null);
  const [form, setForm] = useState({
    date: todayLocal(),
    description: "",
    amount: "",
    category: "other" as ExpenseCategory,
    vatRate: 20,
    notes: "",
  });

  useEffect(() => {
    setExpenses(getExpenses());
    setIsPro(isActivated());
    setJobs(getJobs());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const atLimit = !isPro && expenses.length >= FREE_LIMITS.maxExpenses;

  // Auto-suggest category from description keywords
  const suggestCategory = (description: string): ExpenseCategory | null => {
    const words = description.toLowerCase().split(/\s+/);
    for (const word of words) {
      if (CATEGORY_KEYWORDS[word]) return CATEGORY_KEYWORDS[word];
    }
    // Also check if any keyword is a substring of the description
    const lower = description.toLowerCase();
    for (const [keyword, category] of Object.entries(CATEGORY_KEYWORDS)) {
      if (lower.includes(keyword)) return category;
    }
    return null;
  };

  const resetForm = () => {
    setForm({
      date: todayLocal(),
      description: "",
      amount: "",
      category: "other",
      vatRate: 20,
      notes: "",
    });
    setSelectedJobId("");
    setReceiptPreview(null);
    setReceiptData(null);
    setEditingId(null);
    setShowForm(false);
  };

  const [saveError, setSaveError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError("");
    const amount = parseFloat(form.amount);
    if (!form.description || isNaN(amount) || amount <= 0) return;

    const existingExpense = editingId ? expenses.find(exp => exp.id === editingId) : null;
    const expense: Expense = {
      id: editingId || generateId(),
      date: form.date,
      description: form.description,
      amount,
      category: form.category,
      vatRate: form.vatRate,
      vatAmount: amount * (form.vatRate / (100 + form.vatRate)),
      notes: form.notes || undefined,
      jobId: selectedJobId || undefined,
      receiptData: receiptData || existingExpense?.receiptData || undefined,
    };

    try {
      saveExpense(expense);
      setExpenses(getExpenses());
      resetForm();
    } catch {
      // localStorage quota exceeded - try saving without receipt
      if (expense.receiptData) {
        setSaveError("Not enough storage for this receipt. The expense has been saved without it. Try a smaller image or clear old data.");
        expense.receiptData = undefined;
        try {
          saveExpense(expense);
          setExpenses(getExpenses());
          setReceiptPreview(null);
          setReceiptData(null);
        } catch {
          setSaveError("Storage is full. Please download a backup and clear some old expenses.");
        }
      } else {
        setSaveError("Storage is full. Please download a backup and clear some old expenses.");
      }
    }
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
    setSelectedJobId(expense.jobId || "");
    setReceiptPreview(expense.receiptData || null);
    setReceiptData(expense.receiptData || null);
    setEditingId(expense.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this expense? This cannot be undone.")) return;
    deleteExpense(id);
    setExpenses(getExpenses());
  };

  const handleExport = () => {
    exportToCSV(
      expenses.map((e) => ({
        "Expense ID": e.id,
        Date: e.date,
        Description: e.description,
        Category: EXPENSE_CATEGORIES[e.category],
        "Amount (£)": e.amount.toFixed(2),
        "VAT Rate (%)": e.vatRate,
        "VAT Amount (£)": e.vatAmount.toFixed(2),
        "Net Amount (£)": (e.amount - e.vatAmount).toFixed(2),
        Notes: e.notes || "",
        Receipt: e.receiptData ? "Yes" : "No",
      })),
      `quarterlyuk-expenses-${todayLocal()}.csv`
    );
  };

  const handleDownloadReceipts = () => {
    const withReceipts = expenses.filter((e) => e.receiptData);
    if (withReceipts.length === 0) return;
    for (const expense of withReceipts) {
      const isImage = expense.receiptData!.startsWith("data:image");
      const ext = isImage ? "jpg" : "pdf";
      const a = document.createElement("a");
      a.href = expense.receiptData!;
      a.download = `receipt-${expense.id}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleReceiptChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      setReceiptData(compressed);
      setReceiptPreview(compressed);
      setSaveError("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not process this file.";
      setSaveError(msg);
    }
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
          {isPro && expenses.some((e) => e.receiptData) && (
            <button
              onClick={handleDownloadReceipts}
              className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-gray-50 inline-flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
              </svg>
              Receipts
            </button>
          )}
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
                  onInvalid={(e) => {
                    const input = e.target as HTMLInputElement;
                    if (input.validity.valueMissing || input.validity.rangeUnderflow) {
                      input.setCustomValidity("Please enter an amount greater than £0.00");
                    }
                  }}
                  onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
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
                onChange={(e) => {
                  const desc = e.target.value;
                  const suggested = suggestCategory(desc);
                  setForm({
                    ...form,
                    description: desc,
                    ...(suggested && form.category === "other"
                      ? { category: suggested }
                      : {}),
                  });
                }}
                placeholder="e.g., Uber to client meeting, Staples stationery"
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
            <div>
              <label className="block text-sm font-medium mb-1">
                Job (optional)
              </label>
              <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm"
              >
                <option value="">No job</option>
                {jobs.filter(j => j.status === "active").map(j => (
                  <option key={j.id} value={j.id}>{j.name} - {j.client}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Receipt (optional)
              </label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer px-4 py-2 border border-border rounded-lg text-sm hover:bg-gray-50 inline-flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                  </svg>
                  {receiptPreview ? "Change receipt" : "Attach photo or PDF"}
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    capture="environment"
                    onChange={handleReceiptChange}
                    className="hidden"
                  />
                </label>
                {receiptPreview && (
                  <div className="flex items-center gap-2">
                    {receiptPreview.startsWith("data:image") ? (
                      <img
                        src={receiptPreview}
                        alt="Receipt preview"
                        className="w-12 h-12 object-cover rounded-lg border border-border cursor-pointer"
                        onClick={() => setViewingReceipt(receiptPreview)}
                      />
                    ) : (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">PDF attached</span>
                    )}
                    <button
                      type="button"
                      onClick={() => { setReceiptPreview(null); setReceiptData(null); }}
                      className="text-xs text-danger hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
            {saveError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700">{saveError}</p>
              </div>
            )}
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary-dark"
              >
                {editingId ? "Update" : "Add"} Expense
              </button>
              <button
                type="button"
                onClick={() => { setSaveError(""); resetForm(); }}
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
                    <td className="px-4 py-3">{formatDate(expense.date)}</td>
                    <td className="px-4 py-3 font-medium">
                      {expense.description}
                      {expense.jobId && jobs.find(j => j.id === expense.jobId) && (
                        <span className="ml-2 inline-block text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                          {jobs.find(j => j.id === expense.jobId)?.name}
                        </span>
                      )}
                      {expense.receiptData && (
                        <button
                          onClick={() => setViewingReceipt(expense.receiptData!)}
                          className="ml-2 inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full hover:bg-emerald-200"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                          </svg>
                          receipt
                        </button>
                      )}
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

      {/* Receipt viewer modal */}
      {viewingReceipt && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setViewingReceipt(null)}
        >
          <div
            className="bg-white rounded-2xl p-2 max-w-2xl max-h-[90vh] overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-1">
              <button
                onClick={() => setViewingReceipt(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {viewingReceipt.startsWith("data:image") ? (
              <img
                src={viewingReceipt}
                alt="Receipt"
                className="max-w-full rounded-lg"
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500 mb-3">PDF receipt attached</p>
                <a
                  href={viewingReceipt}
                  download="receipt.pdf"
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold"
                >
                  Download PDF
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
