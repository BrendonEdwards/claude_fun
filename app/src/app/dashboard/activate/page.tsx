"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { saveLicense } from "@/lib/store";

const CHECKOUT_URL =
  "https://quarterlyuk.lemonsqueezy.com/checkout/buy/e8049fa3-6f7c-4e6f-9905-9ecd80eb0408";

function ActivateForm() {
  const [key, setKey] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoActivating, setAutoActivating] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Magic link: auto-activate if license_key is in URL
  useEffect(() => {
    const urlKey = searchParams.get("license_key");
    const urlEmail = searchParams.get("email");
    if (urlKey && urlEmail) {
      setKey(urlKey);
      setEmail(urlEmail);
      setAutoActivating(true);
      doActivate(urlKey, urlEmail);
    } else if (urlKey) {
      setKey(urlKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  async function doActivate(licenseKey: string, licenseEmail: string) {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          license_key: licenseKey.trim(),
          email: licenseEmail.trim(),
        }),
      });

      const data = await res.json();

      if (data.success && data.token) {
        saveLicense(data.token, licenseEmail.trim().toLowerCase());
        router.push("/dashboard");
      } else {
        setError(data.error || "Activation failed. Please try again.");
        setAutoActivating(false);
      }
    } catch {
      setError("Could not connect to activation server. Please try again.");
      setAutoActivating(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!key.trim()) {
      setError("Please enter your license key.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    await doActivate(key, email);
  }

  if (autoActivating) {
    return (
      <div className="min-h-[calc(100vh-57px)] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-primary font-semibold">Activating your license...</p>
          <p className="text-muted text-sm mt-1">Verifying with LemonSqueezy</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-57px)] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">
            Activate QuarterlyUK
          </h1>
          <p className="text-muted text-sm mt-2">
            Enter the email you purchased with and your license key.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
              Purchase Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all mb-4"
              autoFocus
            />

            <label htmlFor="license-key" className="block text-sm font-semibold text-primary mb-2">
              License Key
            </label>
            <input
              id="license-key"
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
            />

            {error && <p className="text-danger text-sm mt-3">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-primary-light transition-colors disabled:opacity-50"
            >
              {loading ? "Verifying with LemonSqueezy..." : "Activate License"}
            </button>
          </div>
        </form>

        <div className="text-center mt-6 space-y-3">
          <p className="text-muted text-sm">
            Don&apos;t have a license key?{" "}
            <a href={CHECKOUT_URL} className="text-accent font-semibold hover:text-accent-dark transition-colors">
              Buy QuarterlyUK - £29
            </a>
          </p>
          <p className="text-muted/60 text-xs">
            Or{" "}
            <Link href="/dashboard" className="text-accent/70 underline">
              continue with free version
            </Link>{" "}
            (limited to 3 expenses, 1 invoice)
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ActivatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-57px)] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ActivateForm />
    </Suspense>
  );
}
