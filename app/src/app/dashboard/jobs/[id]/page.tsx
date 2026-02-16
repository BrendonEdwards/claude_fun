"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getJobs, getExpenses, getInvoices, getIncomes } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/calculations";
import { EXPENSE_CATEGORIES } from "@/lib/types";
import type { Job, Expense, Invoice } from "@/lib/types";
import Link from "next/link";

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [jobExpenses, setJobExpenses] = useState<Expense[]>([]);
  const [jobInvoices, setJobInvoices] = useState<Invoice[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const jobs = getJobs();
    const found = jobs.find((j) => j.id === jobId);

    if (!found) {
      setNotFound(true);
      setMounted(true);
      return;
    }

    setJob(found);

    // Filter expenses by jobId
    const expenses = getExpenses().filter((e) => e.jobId === jobId);
    setJobExpenses(expenses);
    setTotalExpenses(expenses.reduce((sum, e) => sum + e.amount, 0));

    // Filter invoices by jobId
    const invoices = getInvoices().filter((i) => i.jobId === jobId);
    setJobInvoices(invoices);

    // Total income = sum of paid invoices linked to this job
    const paidInvoiceTotal = invoices
      .filter((i) => i.status === "paid")
      .reduce((sum, i) => sum + i.total, 0);
    setTotalIncome(paidInvoiceTotal);

    setMounted(true);
  }, [jobId]);

  if (!mounted) return null;

  if (notFound) {
    return (
      <div>
        <Link
          href="/dashboard/jobs"
          className="text-primary hover:underline text-sm mb-6 inline-block"
        >
          &larr; Back to Jobs
        </Link>
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <h1 className="text-2xl font-bold mb-2">Job Not Found</h1>
          <p className="text-gray-500">
            The job you are looking for does not exist or has been deleted.
          </p>
        </div>
      </div>
    );
  }

  const netProfit = totalIncome - totalExpenses;

  const sortedExpenses = [...jobExpenses].sort((a, b) =>
    b.date.localeCompare(a.date)
  );
  const sortedInvoices = [...jobInvoices].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <div>
      {/* Back link */}
      <Link
        href="/dashboard/jobs"
        className="text-primary hover:underline text-sm mb-6 inline-block"
      >
        &larr; Back to Jobs
      </Link>

      {/* Job header */}
      <div className="bg-white rounded-xl border border-border p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">{job!.name}</h1>
            <p className="text-gray-500 text-sm">{job!.client}</p>
            {job!.description && (
              <p className="text-gray-600 text-sm mt-2">{job!.description}</p>
            )}
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              job!.status === "completed"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {job!.status}
          </span>
        </div>
      </div>

      {/* P&L Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-border p-4">
          <p className="text-sm text-gray-500">Total Income</p>
          <p className="text-xl font-bold text-accent">
            {formatCurrency(totalIncome)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-xl font-bold text-danger">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4">
          <p className="text-sm text-gray-500">Net Profit</p>
          <p
            className={`text-xl font-bold ${
              netProfit >= 0 ? "text-accent" : "text-danger"
            }`}
          >
            {formatCurrency(netProfit)}
          </p>
        </div>
      </div>

      {/* Expenses table */}
      <h2 className="text-lg font-bold mb-3">Expenses</h2>
      <div className="bg-white rounded-xl border border-border overflow-hidden mb-6">
        {sortedExpenses.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <p className="text-lg mb-2">No expenses for this job</p>
            <p className="text-sm">
              Expenses assigned to this job will appear here.
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
                </tr>
              </thead>
              <tbody>
                {sortedExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="border-b border-border last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{formatDate(expense.date)}</td>
                    <td className="px-4 py-3 font-medium">
                      {expense.description}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {EXPENSE_CATEGORIES[expense.category]}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {formatCurrency(expense.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invoices table */}
      <h2 className="text-lg font-bold mb-3">Invoices</h2>
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {sortedInvoices.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <p className="text-lg mb-2">No invoices for this job</p>
            <p className="text-sm">
              Invoices assigned to this job will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-dark border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">
                    Invoice #
                  </th>
                  <th className="text-left px-4 py-3 font-semibold">Client</th>
                  <th className="text-left px-4 py-3 font-semibold">Date</th>
                  <th className="text-center px-4 py-3 font-semibold">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {sortedInvoices.map((inv) => (
                  <tr
                    key={inv.id}
                    className="border-b border-border last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 font-medium">
                      {inv.invoiceNumber}
                    </td>
                    <td className="px-4 py-3">{inv.to.name}</td>
                    <td className="px-4 py-3">{formatDate(inv.date)}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          inv.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : inv.status === "overdue"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {formatCurrency(inv.total)}
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
