"use client";

import { useState, useEffect } from "react";
import { isActivated, getExpenses, getInvoices } from "@/lib/store";
import { collectClientFraudData } from "@/lib/hmrc/fraud-headers";

interface QuarterSummary {
  label: string;
  periodKey: string;
  start: string;
  end: string;
  income: number;
  expenses: number;
  profit: number;
}

function getQuarters(): QuarterSummary[] {
  // Tax year 2026/27 quarters
  return [
    { label: "Q1: 6 Apr – 5 Jul 2026", periodKey: "26A1", start: "2026-04-06", end: "2026-07-05", income: 0, expenses: 0, profit: 0 },
    { label: "Q2: 6 Jul – 5 Oct 2026", periodKey: "26A2", start: "2026-07-06", end: "2026-10-05", income: 0, expenses: 0, profit: 0 },
    { label: "Q3: 6 Oct – 5 Jan 2027", periodKey: "26A3", start: "2026-10-06", end: "2027-01-05", income: 0, expenses: 0, profit: 0 },
    { label: "Q4: 6 Jan – 5 Apr 2027", periodKey: "26A4", start: "2027-01-06", end: "2027-04-05", income: 0, expenses: 0, profit: 0 },
  ];
}

export default function HmrcSubmitPage() {
  const [mounted, setMounted] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [connected, setConnected] = useState(false);
  const [quarters, setQuarters] = useState<QuarterSummary[]>([]);
  const [selectedQuarter, setSelectedQuarter] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [nino, setNino] = useState("");
  const [businessId, setBusinessId] = useState("");

  useEffect(() => {
    setMounted(true);
    setIsPro(isActivated());

    const tokens = localStorage.getItem("quk_hmrc_tokens");
    if (tokens) {
      try {
        const parsed = JSON.parse(tokens);
        if (parsed.access_token) setConnected(true);
      } catch {
        // ignore
      }
    }

    // Load saved NINO and business ID
    setNino(localStorage.getItem("quk_hmrc_nino") || "");
    setBusinessId(localStorage.getItem("quk_hmrc_business_id") || "");

    // Calculate quarter summaries from stored data
    const allExpenses = getExpenses();
    const allInvoices = getInvoices();
    const qs = getQuarters();

    for (const q of qs) {
      const qStart = new Date(q.start);
      const qEnd = new Date(q.end);

      q.expenses = allExpenses
        .filter((e: { date: string; amount: number }) => {
          const d = new Date(e.date);
          return d >= qStart && d <= qEnd;
        })
        .reduce((sum: number, e: { amount: number }) => sum + (e.amount || 0), 0);

      q.income = allInvoices
        .filter((i: { date: string; total: number }) => {
          const d = new Date(i.date);
          return d >= qStart && d <= qEnd;
        })
        .reduce((sum: number, i: { total: number }) => sum + (i.total || 0), 0);

      q.profit = q.income - q.expenses;
    }

    setQuarters(qs);
  }, []);

  if (!mounted) return null;

  if (!isPro) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-2">Submit to HMRC</h1>
        <div className="bg-white rounded-xl border border-border p-8 text-center">
          <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Pro Feature</h2>
          <p className="text-gray-500">
            Direct HMRC submission requires the Pro plan.
          </p>
        </div>
      </div>
    );
  }

  if (!connected) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-2">Submit to HMRC</h1>
        <div className="bg-white rounded-xl border border-border p-8 text-center">
          <p className="text-gray-500 mb-4">
            You need to connect your HMRC account first.
          </p>
          <a
            href="/dashboard/hmrc-connect"
            className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold"
          >
            Connect to HMRC
          </a>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!selectedQuarter || !nino || !businessId) return;

    const quarter = quarters.find((q) => q.periodKey === selectedQuarter);
    if (!quarter) return;

    // Save NINO and business ID for next time
    localStorage.setItem("quk_hmrc_nino", nino);
    localStorage.setItem("quk_hmrc_business_id", businessId);

    setSubmitting(true);
    setResult(null);

    try {
      const tokens = JSON.parse(localStorage.getItem("quk_hmrc_tokens") || "{}");
      const fraudData = collectClientFraudData();

      const res = await fetch("/api/hmrc/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: tokens.access_token,
          nino,
          businessId,
          update: {
            periodKey: quarter.periodKey,
            turnover: quarter.income,
            costOfGoods: quarter.expenses,
          },
          fraudData,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setResult({ success: true, message: "Quarterly update submitted successfully to HMRC." });
      } else {
        setResult({ success: false, message: data.error || "Submission failed." });
      }
    } catch (err) {
      setResult({
        success: false,
        message: err instanceof Error ? err.message : "Network error.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Submit Quarterly Update</h1>
      <p className="text-gray-500 mb-6">
        Send your income and expense summary directly to HMRC.
      </p>

      {/* NINO and Business ID */}
      <div className="bg-white rounded-xl border border-border p-6 mb-6">
        <h2 className="font-bold mb-4">Your Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              National Insurance Number (NINO)
            </label>
            <input
              type="text"
              value={nino}
              onChange={(e) => {
                const val = e.target.value.toUpperCase();
                setNino(val);
                localStorage.setItem("quk_hmrc_nino", val);
              }}
              placeholder="e.g. QQ123456C"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business ID
            </label>
            <input
              type="text"
              value={businessId}
              onChange={(e) => {
                setBusinessId(e.target.value);
                localStorage.setItem("quk_hmrc_business_id", e.target.value);
              }}
              placeholder="From HMRC"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      {/* Quarter selection */}
      <div className="bg-white rounded-xl border border-border p-6 mb-6">
        <h2 className="font-bold mb-4">Select Quarter</h2>
        <div className="space-y-3">
          {quarters.map((q) => (
            <button
              key={q.periodKey}
              onClick={() => setSelectedQuarter(q.periodKey)}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                selectedQuarter === q.periodKey
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{q.label}</span>
                <span className={`text-sm font-semibold ${q.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {q.profit >= 0 ? "+" : ""}&pound;{q.profit.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-6 mt-2 text-xs text-gray-500">
                <span>Income: &pound;{q.income.toFixed(2)}</span>
                <span>Expenses: &pound;{q.expenses.toFixed(2)}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      {result && (
        <div className={`rounded-xl p-4 mb-6 ${
          result.success
            ? "bg-green-50 border border-green-200"
            : "bg-red-50 border border-red-200"
        }`}>
          <p className={`text-sm ${result.success ? "text-green-700" : "text-red-700"}`}>
            {result.message}
          </p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!selectedQuarter || !nino || !businessId || submitting}
        className="px-6 py-3 bg-primary text-white rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : "Submit to HMRC"}
      </button>
    </div>
  );
}
