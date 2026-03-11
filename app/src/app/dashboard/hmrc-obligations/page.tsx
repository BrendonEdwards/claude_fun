"use client";

import { useState, useEffect } from "react";
import { isActivated } from "@/lib/store";
import { collectClientFraudData } from "@/lib/hmrc/fraud-headers";
import { getValidAccessToken, getStoredTokens, refreshTokens } from "@/lib/hmrc/tokens";

interface Obligation {
  periodStartDate: string;
  periodEndDate: string;
  dueDate: string;
  status: "open" | "fulfilled";
  receivedDate?: string;
}

export default function HmrcObligationsPage() {
  const [mounted, setMounted] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [connected, setConnected] = useState(false);
  const [obligations, setObligations] = useState<Obligation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nino, setNino] = useState("");

  useEffect(() => {
    setMounted(true);
    setIsPro(isActivated());
    setNino(localStorage.getItem("quk_hmrc_nino") || "");

    const tokens = localStorage.getItem("quk_hmrc_tokens");
    if (tokens) {
      try {
        const parsed = JSON.parse(tokens);
        if (parsed.access_token) setConnected(true);
      } catch {
        // ignore
      }
    }
  }, []);

  const fetchWithToken = async (accessToken: string) => {
    const fraudData = collectClientFraudData();
    const res = await fetch("/api/hmrc/obligations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken, nino, fraudData }),
    });
    return res.json();
  };

  const fetchObligations = async () => {
    if (!nino) {
      setError("Please enter your NINO above.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let accessToken = await getValidAccessToken();
      let data = await fetchWithToken(accessToken);

      // Auto-refresh on INVALID_CREDENTIALS and retry once
      if (data.error?.includes("INVALID_CREDENTIALS")) {
        const tokens = getStoredTokens();
        if (tokens?.refresh_token) {
          accessToken = await refreshTokens(tokens.refresh_token);
          data = await fetchWithToken(accessToken);
        }
      }

      if (data.error) {
        setError(data.error);
      } else {
        const allObligations = data.obligations?.flatMap(
          (o: { obligationDetails: Obligation[] }) => o.obligationDetails
        ) || [];
        setObligations(allObligations);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch obligations.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  if (!isPro) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-2">HMRC Obligations</h1>
        <div className="bg-white rounded-xl border border-border p-8 text-center">
          <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Pro Feature</h2>
          <p className="text-gray-500">
            Viewing HMRC obligations requires the Pro plan.
          </p>
        </div>
      </div>
    );
  }

  if (!connected) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-2">HMRC Obligations</h1>
        <div className="bg-white rounded-xl border border-border p-8 text-center">
          <p className="text-gray-500 mb-4">
            Connect your HMRC account to view your obligations.
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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isOverdue = (due: string, status: string) => {
    return status === "open" && new Date(due) < new Date();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">HMRC Obligations</h1>
      <p className="text-gray-500 mb-6">
        Your Making Tax Digital quarterly update deadlines.
      </p>

      {/* NINO input */}
      <div className="bg-white rounded-xl border border-border p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          National Insurance Number (NINO)
        </label>
        <div className="flex gap-3 items-end">
          <input
            type="text"
            value={nino}
            onChange={(e) => {
              const val = e.target.value.toUpperCase();
              setNino(val);
              localStorage.setItem("quk_hmrc_nino", val);
            }}
            placeholder="e.g. QQ123456C"
            className="w-64 px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <button
            onClick={fetchObligations}
            disabled={loading || !nino}
            className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Refresh Obligations"}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {obligations.length > 0 ? (
        <div className="space-y-3">
          {obligations.map((ob, i) => (
            <div
              key={`${ob.periodStartDate}-${i}`}
              className={`bg-white rounded-xl border p-5 ${
                ob.status === "fulfilled"
                  ? "border-green-200"
                  : isOverdue(ob.dueDate, ob.status)
                  ? "border-red-200"
                  : "border-border"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">
                  {formatDate(ob.periodStartDate)} &ndash; {formatDate(ob.periodEndDate)}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    ob.status === "fulfilled"
                      ? "bg-green-100 text-green-700"
                      : isOverdue(ob.dueDate, ob.status)
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {ob.status === "fulfilled" ? "Submitted" : isOverdue(ob.dueDate, ob.status) ? "Overdue" : "Open"}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                <span>Due: {formatDate(ob.dueDate)}</span>
                {ob.receivedDate && (
                  <span className="ml-4">Received: {formatDate(ob.receivedDate)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border p-8 text-center">
          <p className="text-gray-400">
            {loading ? "Fetching obligations from HMRC..." : "Click \"Refresh Obligations\" to load your deadlines from HMRC."}
          </p>
        </div>
      )}
    </div>
  );
}
