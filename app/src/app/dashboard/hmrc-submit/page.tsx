"use client";

import { useState, useEffect } from "react";
import { isActivated, isProActivated, getExpenses, getInvoices } from "@/lib/store";
import { collectClientFraudData } from "@/lib/hmrc/fraud-headers";
import { getValidAccessToken, getStoredTokens, refreshTokens } from "@/lib/hmrc/tokens";

interface QuarterSummary {
  label: string;
  periodKey: string;
  taxYear: string;
  start: string;
  end: string;
  income: number;
  expenses: number;
  profit: number;
}

function getCurrentTaxYear(): { startYear: number; label: string; hmrc: string } {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  // Tax year starts 6 April
  const startYear = (month > 4 || (month === 4 && day >= 6)) ? year : year - 1;
  const endYearShort = String(startYear + 1).slice(-2);
  return {
    startYear,
    label: `${startYear}/${endYearShort}`,
    hmrc: `${startYear}-${endYearShort}`, // e.g. "2025-26"
  };
}

function getQuarters(): QuarterSummary[] {
  const { startYear, hmrc } = getCurrentTaxYear();
  const y = startYear;
  const y2 = startYear + 1;
  const shortY = String(y).slice(-2);
  return [
    { label: `Q1: 6 Apr – 5 Jul ${y}`, periodKey: `${shortY}A1`, taxYear: hmrc, start: `${y}-04-06`, end: `${y}-07-05`, income: 0, expenses: 0, profit: 0 },
    { label: `Q2: 6 Jul – 5 Oct ${y}`, periodKey: `${shortY}A2`, taxYear: hmrc, start: `${y}-07-06`, end: `${y}-10-05`, income: 0, expenses: 0, profit: 0 },
    { label: `Q3: 6 Oct – 5 Jan ${y2}`, periodKey: `${shortY}A3`, taxYear: hmrc, start: `${y}-10-06`, end: `${y2}-01-05`, income: 0, expenses: 0, profit: 0 },
    { label: `Q4: 6 Jan – 5 Apr ${y2}`, periodKey: `${shortY}A4`, taxYear: hmrc, start: `${y2}-01-06`, end: `${y2}-04-05`, income: 0, expenses: 0, profit: 0 },
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
    setIsPro(isProActivated());

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

  const submitWithToken = async (accessToken: string, quarter: QuarterSummary) => {
    const fraudData = await collectClientFraudData();
    const res = await fetch("/api/hmrc/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accessToken,
        nino,
        businessId,
        update: {
          periodKey: quarter.periodKey,
          taxYear: quarter.taxYear,
          periodStartDate: quarter.start,
          periodEndDate: quarter.end,
          turnover: quarter.income,
          costOfGoods: quarter.expenses,
        },
        fraudData,
      }),
    });
    return res.json();
  };

  const handleSubmit = async () => {
    if (!selectedQuarter || !nino || !businessId) return;

    const quarter = quarters.find((q) => q.periodKey === selectedQuarter);
    if (!quarter) return;

    localStorage.setItem("quk_hmrc_nino", nino);
    localStorage.setItem("quk_hmrc_business_id", businessId);

    setSubmitting(true);
    setResult(null);

    try {
      let accessToken = await getValidAccessToken();
      let data = await submitWithToken(accessToken, quarter);

      // Auto-refresh on INVALID_CREDENTIALS and retry once
      if (data.details?.code === "INVALID_CREDENTIALS" || data.error?.includes("INVALID_CREDENTIALS")) {
        const tokens = getStoredTokens();
        if (tokens?.refresh_token) {
          accessToken = await refreshTokens(tokens.refresh_token);
          data = await submitWithToken(accessToken, quarter);
        }
      }

      if (data.success) {
        setResult({ success: true, message: "Quarterly update submitted successfully to HMRC." });
      } else {
        const detail = data.details ? ` (${JSON.stringify(data.details)})` : "";
        setResult({ success: false, message: (data.error || "Submission failed.") + detail });
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

      {/* Disclaimers */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 space-y-2">
        <p className="text-sm text-amber-800">
          <strong>Self-employment income only.</strong> QuarterlyUK supports quarterly updates for self-employment income.
          If you have other income sources (property, dividends, employment), these must be reported separately.{" "}
          <a
            href="https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium"
          >
            Find compatible software on GOV.UK
          </a>
        </p>
        <p className="text-sm text-amber-800">
          <strong>In-year updates only.</strong> QuarterlyUK handles quarterly submissions but does not support
          end-of-year final declarations. You will need to complete your final declaration via your{" "}
          <a
            href="https://www.gov.uk/personal-tax-account"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium"
          >
            HMRC Personal Tax Account
          </a>{" "}
          or{" "}
          <a
            href="https://www.gov.uk/guidance/find-software-thats-compatible-with-making-tax-digital-for-income-tax"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium"
          >
            compatible bridging software
          </a>.
        </p>
      </div>

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
            <div className="flex gap-2">
              <input
                type="text"
                value={businessId}
                onChange={(e) => {
                  setBusinessId(e.target.value);
                  localStorage.setItem("quk_hmrc_business_id", e.target.value);
                }}
                placeholder="Auto-detected from HMRC"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <button
                onClick={async () => {
                  try {
                    const accessToken = await getValidAccessToken();
                    const fraudData = await collectClientFraudData();
                    const res = await fetch("/api/hmrc/business-details", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ accessToken, nino, fraudData }),
                    });
                    const data = await res.json();
                    if (data.businesses?.length > 0) {
                      const seBusinesses = data.businesses.filter(
                        (b: { typeOfBusiness: string }) => b.typeOfBusiness === "self-employment"
                      );
                      const biz = seBusinesses[0] || data.businesses[0];
                      if (biz?.businessId) {
                        setBusinessId(biz.businessId);
                        localStorage.setItem("quk_hmrc_business_id", biz.businessId);
                      }
                    } else if (data.error) {
                      setResult({ success: false, message: data.error });
                    }
                  } catch (err) {
                    setResult({ success: false, message: err instanceof Error ? err.message : "Failed to fetch business ID." });
                  }
                }}
                disabled={!nino}
                className="px-3 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-200 disabled:opacity-50 whitespace-nowrap"
              >
                Fetch from HMRC
              </button>
            </div>
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
          {result.success && (
            <p className="text-sm text-green-700 mt-2">
              To view your updated tax calculation, sign in to your{" "}
              <a
                href="https://www.gov.uk/personal-tax-account"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium"
              >
                HMRC Personal Tax Account
              </a>.
            </p>
          )}
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
