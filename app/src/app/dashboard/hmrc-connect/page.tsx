"use client";

import { useState, useEffect } from "react";
import { isActivated, getLicense } from "@/lib/store";

export default function HmrcConnectPage() {
  const [mounted, setMounted] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    // Check if user has Pro license (for now, any activated license counts)
    setIsPro(isActivated());

    // Check if HMRC tokens exist in localStorage
    const tokens = localStorage.getItem("quk_hmrc_tokens");
    if (tokens) {
      try {
        const parsed = JSON.parse(tokens);
        if (parsed.access_token) setConnected(true);
      } catch {
        // ignore
      }
    }

    // Handle OAuth callback — tokens arrive in a signed `data` query param
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get("data");
    if (dataParam) {
      try {
        const decoded = JSON.parse(atob(dataParam.replace(/-/g, "+").replace(/_/g, "/")));
        if (decoded.connected && decoded.access_token) {
          const hmrcTokens = {
            access_token: decoded.access_token,
            refresh_token: decoded.refresh_token,
            expires_in: Number(decoded.expires_in),
            scope: decoded.scope,
            connected_at: Date.now(),
          };
          localStorage.setItem("quk_hmrc_tokens", JSON.stringify(hmrcTokens));
          setConnected(true);
        }
      } catch {
        // ignore malformed data param
      }
      // Clean the URL regardless
      window.history.replaceState({}, "", window.location.pathname);
      return; // skip error param check since we handled the data param
    }

    // Handle error from callback
    const errParam = urlParams.get("error");
    if (errParam) {
      setError(errParam);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  if (!mounted) return null;

  if (!isPro) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-2">HMRC Connection</h1>
        <p className="text-gray-500 mb-6">
          Connect directly to HMRC to submit your quarterly updates.
        </p>
        <div className="bg-white rounded-xl border border-border p-8 text-center">
          <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Pro Feature</h2>
          <p className="text-gray-500 mb-4">
            Direct HMRC submission is available on the Pro plan at &pound;5.00/month* (12-month commitment).
          </p>
          <p className="text-xs text-gray-400">*Excl. VAT</p>
        </div>
      </div>
    );
  }

  const handleConnect = () => {
    const license = getLicense();
    if (!license?.token) {
      setError("No license token found. Please activate your license first.");
      return;
    }
    // Redirect to our OAuth initiation endpoint
    window.location.href = `/api/hmrc/auth?token=${encodeURIComponent(license.token)}`;
  };

  const handleDisconnect = () => {
    localStorage.removeItem("quk_hmrc_tokens");
    setConnected(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">HMRC Connection</h1>
      <p className="text-gray-500 mb-6">
        Connect directly to HMRC to submit your quarterly updates.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-red-700">{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-xs text-red-500 mt-1 underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-border p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            connected ? "bg-green-100" : "bg-gray-100"
          }`}>
            <svg className={`w-6 h-6 ${connected ? "text-green-500" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {connected ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
              )}
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-lg">
              {connected ? "Connected to HMRC" : "Not Connected"}
            </h2>
            <p className="text-sm text-gray-500">
              {connected
                ? "Your account is linked to HMRC. You can submit quarterly updates."
                : "Link your HMRC account to start submitting quarterly updates directly."}
            </p>
          </div>
        </div>

        {connected ? (
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-700">
                Your HMRC connection is active. Access tokens refresh automatically.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="/dashboard/hmrc-submit"
                className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-semibold"
              >
                Submit Quarterly Update
              </a>
              <a
                href="/dashboard/hmrc-obligations"
                className="px-5 py-2.5 bg-white border border-border text-primary rounded-lg text-sm font-semibold"
              >
                View Obligations
              </a>
              <button
                onClick={handleDisconnect}
                className="px-5 py-2.5 text-red-500 text-sm font-medium ml-auto"
              >
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-sm text-blue-800 mb-2">How it works</h3>
              <ol className="text-sm text-blue-700 space-y-1 list-decimal ml-4">
                <li>Click &quot;Connect to HMRC&quot; below</li>
                <li>Sign in with your Government Gateway credentials</li>
                <li>Grant QuarterlyUK permission to submit on your behalf</li>
                <li>You&apos;ll be redirected back here once connected</li>
              </ol>
            </div>
            <button
              onClick={handleConnect}
              className="px-6 py-3 bg-primary text-white rounded-lg text-sm font-semibold"
            >
              Connect to HMRC
            </button>
          </div>
        )}
      </div>

      {/* Info section */}
      <div className="mt-6 bg-white rounded-xl border border-border p-6">
        <h3 className="font-bold mb-3">About HMRC Connection</h3>
        <div className="space-y-3 text-sm text-gray-600">
          <p>
            QuarterlyUK is HMRC-recognised bridging software. We relay your
            expense and income data directly to HMRC&apos;s Making Tax Digital API.
          </p>
          <p>
            Your financial data stays in your browser. The server only handles
            the HMRC authentication handshake — it never stores your records.
          </p>
          <p>
            Access tokens are valid for 4 hours and refresh automatically.
            You&apos;ll need to reconnect if you don&apos;t use the service for 18 months.
          </p>
        </div>
      </div>
    </div>
  );
}
