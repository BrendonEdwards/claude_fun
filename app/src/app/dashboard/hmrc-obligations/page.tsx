"use client";

import { useState, useEffect } from "react";
import { isActivated } from "@/lib/store";
import { collectClientFraudData } from "@/lib/hmrc/fraud-headers";

interface Obligation {
  start: string;
  end: string;
  due: string;
  status: "O" | "F";
  periodKey: string;
  received?: string;
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

  const fetchObligations = async () => {
    if (!nino) {
      setError("Please enter your NINO on the Submit page first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const tokens = JSON.parse(localStorage.getItem("quk_hmrc_tokens") || "{}");
      const fraudData = collectClientFraudData();

      const res = await fetch("/api/hmrc/obligations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken: tokens.access_token,
          nino,
          fraudData,
        }),
      });

      const data = await res.json();

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
    return status === "O" && new Date(due) < new Date();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">HMRC Obligations</h1>
      <p className="text-gray-500 mb-6">
        Your Making Tax Digital quarterly update deadlines.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <button
        onClick={fetchObligations}
        disabled={loading}
        className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold mb-6 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Refresh Obligations"}
      </button>

      {obligations.length > 0 ? (
        <div className="space-y-3">
          {obligations.map((ob) => (
            <div
              key={ob.periodKey}
              className={`bg-white rounded-xl border p-5 ${
                ob.status === "F"
                  ? "border-green-200"
                  : isOverdue(ob.due, ob.status)
                  ? "border-red-200"
                  : "border-border"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">
                  {formatDate(ob.start)} &ndash; {formatDate(ob.end)}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    ob.status === "F"
                      ? "bg-green-100 text-green-700"
                      : isOverdue(ob.due, ob.status)
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {ob.status === "F" ? "Submitted" : isOverdue(ob.due, ob.status) ? "Overdue" : "Open"}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                <span>Due: {formatDate(ob.due)}</span>
                {ob.received && (
                  <span className="ml-4">Received: {formatDate(ob.received)}</span>
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
