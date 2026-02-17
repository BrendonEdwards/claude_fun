"use client";

import { useState, useEffect } from "react";
import {
  getJobs,
  saveJob,
  deleteJob,
  generateId,
  todayLocal,
  isActivated,
  getExpenses,
  getIncomes,
  getInvoices,
} from "@/lib/store";
import type { Job, Expense, Invoice } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/calculations";
import Link from "next/link";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    client: "",
    description: "",
  });
  const [formError, setFormError] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    setJobs(getJobs());
    setExpenses(getExpenses());
    setInvoices(getInvoices());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const reloadData = () => {
    setJobs(getJobs());
    setExpenses(getExpenses());
    setInvoices(getInvoices());
  };

  const resetForm = () => {
    setForm({ name: "", client: "", description: "" });
    setEditingId(null);
    setShowForm(false);
    setFormError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.client.trim()) {
      setFormError("Job name and client are required.");
      return;
    }
    setFormError("");

    const job: Job = {
      id: editingId || generateId(),
      name: form.name.trim(),
      client: form.client.trim(),
      description: form.description.trim() || undefined,
      status: editingId
        ? (jobs.find((j) => j.id === editingId)?.status ?? "active")
        : "active",
      createdAt: editingId
        ? (jobs.find((j) => j.id === editingId)?.createdAt ?? todayLocal())
        : todayLocal(),
    };

    saveJob(job);
    reloadData();
    resetForm();
  };

  const handleEdit = (job: Job) => {
    setForm({
      name: job.name,
      client: job.client,
      description: job.description || "",
    });
    setEditingId(job.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this job? This cannot be undone."
      )
    )
      return;
    deleteJob(id);
    reloadData();
  };

  const toggleStatus = (job: Job) => {
    const updated: Job = {
      ...job,
      status: job.status === "active" ? "completed" : "active",
    };
    saveJob(updated);
    reloadData();
  };

  // Per-job financial totals
  const getJobExpenses = (jobId: string): number =>
    expenses
      .filter((e) => e.jobId === jobId)
      .reduce((sum, e) => sum + e.amount, 0);

  const getJobInvoiced = (jobId: string): number =>
    invoices
      .filter((inv) => inv.jobId === jobId)
      .reduce((sum, inv) => sum + inv.total, 0);

  const getJobPaidIncome = (jobId: string): number =>
    invoices
      .filter((inv) => inv.jobId === jobId && inv.status === "paid")
      .reduce((sum, inv) => sum + inv.total, 0);

  // Summary counts
  const activeJobs = jobs.filter((j) => j.status === "active");
  const completedJobs = jobs.filter((j) => j.status === "completed");

  // Filter then sort: active first, then by creation date descending
  const filtered = filter === "all" ? jobs : jobs.filter((j) => j.status === filter);
  const sorted = [...filtered].sort((a, b) => {
    if (a.status !== b.status) return a.status === "active" ? -1 : 1;
    return b.createdAt.localeCompare(a.createdAt);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Jobs / Projects</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="px-4 py-2 text-sm bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark"
        >
          + New Job
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-border p-4">
          <p className="text-sm text-gray-500">Active Jobs</p>
          <p className="text-xl font-bold text-accent">{activeJobs.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-4">
          <p className="text-sm text-gray-500">Completed Jobs</p>
          <p className="text-xl font-bold text-muted">
            {completedJobs.length}
          </p>
        </div>
      </div>

      {/* Filter toggle */}
      <div className="flex gap-2 mb-6">
        {(["all", "active", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? "bg-primary text-white"
                : "bg-white border border-border text-muted hover:bg-gray-50"
            }`}
          >
            {f === "all" ? "All" : f === "active" ? "Active" : "Completed"}
          </button>
        ))}
      </div>

      {/* Inline form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-border p-6 mb-6">
          <h2 className="font-bold text-lg mb-4">
            {editingId ? "Edit Job" : "New Job"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Job Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g., Website Redesign"
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Client
                </label>
                <input
                  type="text"
                  value={form.client}
                  onChange={(e) => setForm({ ...form, client: e.target.value })}
                  placeholder="e.g., Acme Ltd"
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description (optional)
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Brief description of the job or project"
                rows={3}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm resize-y"
              />
            </div>
            {formError && (
              <p className="text-sm text-danger font-medium">{formError}</p>
            )}
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary-dark"
              >
                {editingId ? "Update" : "Create"} Job
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

      {/* Job cards */}
      {sorted.length === 0 ? (
        <div className="bg-white rounded-xl border border-border p-8 text-center text-gray-400">
          <p className="text-lg mb-2">No jobs yet</p>
          <p className="text-sm">
            Click &quot;New Job&quot; to create your first job or project.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {sorted.map((job) => {
            const expTotal = getJobExpenses(job.id);
            const invoicedTotal = getJobInvoiced(job.id);
            const paidTotal = getJobPaidIncome(job.id);
            const netProfit = paidTotal - expTotal;

            return (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-border p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <Link
                        href={`/dashboard/jobs/${job.id}`}
                        className="text-lg font-bold text-primary hover:underline truncate"
                      >
                        {job.name}
                      </Link>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                          job.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted">{job.client}</p>
                    {job.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {job.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4 shrink-0">
                    <button
                      onClick={() => toggleStatus(job)}
                      className={`text-xs px-3 py-1 rounded-lg border font-medium ${
                        job.status === "active"
                          ? "border-green-300 text-green-700 hover:bg-green-50"
                          : "border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {job.status === "active"
                        ? "Mark Completed"
                        : "Reactivate"}
                    </button>
                    <button
                      onClick={() => handleEdit(job)}
                      className="text-primary hover:underline text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="text-danger hover:underline text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Per-job financial summary */}
                <div className="grid grid-cols-4 gap-3 mt-3 pt-3 border-t border-border">
                  <div className="bg-surface rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-500">Expenses</p>
                    <p className="text-sm font-semibold text-danger">
                      {formatCurrency(expTotal)}
                    </p>
                  </div>
                  <div className="bg-surface rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-500">Invoiced</p>
                    <p className="text-sm font-semibold text-muted">
                      {formatCurrency(invoicedTotal)}
                    </p>
                  </div>
                  <div className="bg-surface rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-500">Paid</p>
                    <p className="text-sm font-semibold text-accent">
                      {formatCurrency(paidTotal)}
                    </p>
                  </div>
                  <div className="bg-surface rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-500">Net Profit</p>
                    <p
                      className={`text-sm font-semibold ${
                        netProfit >= 0 ? "text-accent" : "text-danger"
                      }`}
                    >
                      {formatCurrency(netProfit)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
