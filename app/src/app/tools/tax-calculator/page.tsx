"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Tax rates by year                                                  */
/* ------------------------------------------------------------------ */

const TAX_YEARS = {
  "2025/26": {
    label: "2025/26",
    personalAllowance: 12_570,
    basicRateLimit: 50_270,
    higherRateLimit: 125_140,
    basicRate: 0.2,
    higherRate: 0.4,
    additionalRate: 0.45,
    class2Weekly: 3.5,
    class2Threshold: 6_845,
    class4LowerLimit: 12_570,
    class4UpperLimit: 50_270,
    class4MainRate: 0.06,
    class4AdditionalRate: 0.02,
  },
  "2024/25": {
    label: "2024/25",
    personalAllowance: 12_570,
    basicRateLimit: 50_270,
    higherRateLimit: 125_140,
    basicRate: 0.2,
    higherRate: 0.4,
    additionalRate: 0.45,
    class2Weekly: 3.45,
    class2Threshold: 6_845,
    class4LowerLimit: 12_570,
    class4UpperLimit: 50_270,
    class4MainRate: 0.06,
    class4AdditionalRate: 0.02,
  },
};

type TaxYear = keyof typeof TAX_YEARS;

/* ------------------------------------------------------------------ */
/*  Metadata (exported via generateMetadata for client components)     */
/* ------------------------------------------------------------------ */

// Metadata is in a separate layout or we handle it via <head> below.

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmt(n: number): string {
  return n.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TaxCalculatorPage() {
  const [profitStr, setProfitStr] = useState("");
  const [taxYear, setTaxYear] = useState<TaxYear>("2025/26");

  const profit = parseFloat(profitStr) || 0;
  const rates = TAX_YEARS[taxYear];

  const calc = useMemo(() => {
    if (profit <= 0) {
      return {
        personalAllowance: rates.personalAllowance,
        taxableIncome: 0,
        basicTax: 0,
        higherTax: 0,
        additionalTax: 0,
        incomeTax: 0,
        class2: 0,
        class4Lower: 0,
        class4Upper: 0,
        class4Total: 0,
        totalTax: 0,
        effectiveRate: 0,
        takeHome: 0,
      };
    }

    /* Personal Allowance taper */
    let pa = rates.personalAllowance;
    if (profit > 100_000) {
      pa = Math.max(0, pa - Math.floor((profit - 100_000) / 2));
    }

    /* Income Tax */
    const taxableIncome = Math.max(0, profit - pa);

    const basicBandSize = rates.basicRateLimit - pa;
    const higherBandSize = rates.higherRateLimit - rates.basicRateLimit;

    let remaining = taxableIncome;

    const basicTaxable = Math.min(remaining, basicBandSize);
    remaining -= basicTaxable;
    const basicTax = basicTaxable * rates.basicRate;

    const higherTaxable = Math.min(remaining, higherBandSize);
    remaining -= higherTaxable;
    const higherTax = higherTaxable * rates.higherRate;

    const additionalTaxable = remaining;
    const additionalTax = additionalTaxable * rates.additionalRate;

    const incomeTax = basicTax + higherTax + additionalTax;

    /* Class 2 NIC — auto-credited, effectively £0 */
    const class2 = 0;

    /* Class 4 NIC */
    const class4Profits = Math.max(0, profit - rates.class4LowerLimit);
    const class4LowerBand = Math.min(
      class4Profits,
      rates.class4UpperLimit - rates.class4LowerLimit
    );
    const class4UpperBand = Math.max(0, profit - rates.class4UpperLimit);

    const class4Lower = class4LowerBand * rates.class4MainRate;
    const class4Upper = class4UpperBand * rates.class4AdditionalRate;
    const class4Total = class4Lower + class4Upper;

    /* Totals */
    const totalTax = incomeTax + class2 + class4Total;
    const effectiveRate = profit > 0 ? (totalTax / profit) * 100 : 0;
    const takeHome = profit - totalTax;

    return {
      personalAllowance: pa,
      taxableIncome,
      basicTax,
      higherTax,
      additionalTax,
      incomeTax,
      class2,
      class4Lower,
      class4Upper,
      class4Total,
      totalTax,
      effectiveRate,
      takeHome,
    };
  }, [profit, rates]);

  return (
      <div className="min-h-screen bg-white">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "UK Sole Trader Tax Calculator",
              url: "https://quarterlyuk.com/tools/tax-calculator",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "GBP",
              },
              description:
                "Calculate your Income Tax and National Insurance as a UK sole trader. Free tax calculator for self-employed — see your take-home pay instantly.",
              publisher: {
                "@type": "Organization",
                name: "QuarterlyUK",
                url: "https://quarterlyuk.com",
              },
            }),
          }}
        />

        {/* Nav */}
        <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Q"
                width={42}
                height={42}
                className="-mr-0.5"
              />
              <span className="text-2xl font-bold tracking-tight text-primary">
                uarterly<span className="text-accent">UK</span>
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/blog"
                className="text-sm font-medium text-muted hover:text-primary transition-colors hidden sm:block"
              >
                Blog
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted hover:text-primary transition-colors hidden sm:block"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard"
                className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-light transition-colors"
              >
                Try It Free
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light" />
          <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-20 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              UK Sole Trader Tax Calculator
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              See exactly how much Income Tax and National Insurance you owe as a
              self-employed sole trader. Free, instant, no signup required.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* Calculator */}
        <section className="relative -mt-8 z-10 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            {/* Input Card */}
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 md:p-8 mb-6">
              <h2 className="text-lg font-bold text-primary mb-6">
                Your Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="profit"
                    className="block text-sm font-semibold text-primary mb-2"
                  >
                    Annual Profit
                    <span className="font-normal text-muted ml-1">
                      (turnover minus expenses)
                    </span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-semibold">
                      &pound;
                    </span>
                    <input
                      id="profit"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="e.g. 45000"
                      value={profitStr}
                      onChange={(e) => setProfitStr(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-primary font-medium focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="taxYear"
                    className="block text-sm font-semibold text-primary mb-2"
                  >
                    Tax Year
                  </label>
                  <select
                    id="taxYear"
                    value={taxYear}
                    onChange={(e) => setTaxYear(e.target.value as TaxYear)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-primary font-medium bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors appearance-none cursor-pointer"
                  >
                    <option value="2025/26">2025/26</option>
                    <option value="2024/25">2024/25</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results */}
            {profit > 0 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Summary cards */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                    <div className="text-sm text-muted font-medium mb-1">
                      Total Tax
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-primary">
                      &pound;{fmt(calc.totalTax)}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
                    <div className="text-sm text-muted font-medium mb-1">
                      Effective Tax Rate
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-accent">
                      {calc.effectiveRate.toFixed(1)}%
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-light rounded-2xl shadow-sm p-6 text-center">
                    <div className="text-sm text-slate-300 font-medium mb-1">
                      Take-Home Pay
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      &pound;{fmt(calc.takeHome)}
                    </div>
                  </div>
                </div>

                {/* Income Tax Breakdown */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                  <h3 className="text-base font-bold text-primary mb-4">
                    Income Tax Breakdown
                  </h3>
                  <div className="space-y-3">
                    <Row
                      label={`Personal Allowance${
                        calc.personalAllowance < rates.personalAllowance
                          ? " (tapered)"
                          : ""
                      }`}
                      value={`\u00a3${fmt(calc.personalAllowance)}`}
                      muted
                    />
                    <Row
                      label="Taxable Income"
                      value={`\u00a3${fmt(calc.taxableIncome)}`}
                      muted
                    />
                    <div className="border-t border-gray-100 pt-3" />
                    <Row
                      label={`Basic rate (20%) on first \u00a3${fmt(
                        Math.min(
                          Math.max(0, calc.taxableIncome),
                          rates.basicRateLimit - calc.personalAllowance
                        )
                      )}`}
                      value={`\u00a3${fmt(calc.basicTax)}`}
                    />
                    <Row
                      label={`Higher rate (40%) on next \u00a3${fmt(
                        Math.min(
                          Math.max(0, calc.taxableIncome - (rates.basicRateLimit - calc.personalAllowance)),
                          rates.higherRateLimit - rates.basicRateLimit
                        )
                      )}`}
                      value={`\u00a3${fmt(calc.higherTax)}`}
                    />
                    <Row
                      label={`Additional rate (45%) on \u00a3${fmt(
                        Math.max(
                          0,
                          calc.taxableIncome -
                            (rates.higherRateLimit - calc.personalAllowance)
                        )
                      )}`}
                      value={`\u00a3${fmt(calc.additionalTax)}`}
                    />
                    <div className="border-t border-gray-100 pt-3" />
                    <Row
                      label="Total Income Tax"
                      value={`\u00a3${fmt(calc.incomeTax)}`}
                      bold
                    />
                  </div>
                  {calc.personalAllowance < rates.personalAllowance && (
                    <p className="text-xs text-muted mt-4 bg-amber-50 border border-amber-100 rounded-lg p-3">
                      Your Personal Allowance has been reduced from &pound;
                      {fmt(rates.personalAllowance)} to &pound;
                      {fmt(calc.personalAllowance)} because your income exceeds
                      &pound;100,000. It tapers by &pound;1 for every &pound;2
                      above &pound;100,000.
                    </p>
                  )}
                </div>

                {/* National Insurance */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                  <h3 className="text-base font-bold text-primary mb-4">
                    National Insurance Contributions
                  </h3>
                  <div className="space-y-3">
                    {/* Class 2 */}
                    <div className="mb-2">
                      <h4 className="text-sm font-semibold text-primary mb-2">
                        Class 2 NIC
                      </h4>
                      <Row label="Class 2 NIC" value={`\u00a3${fmt(0)}`} />
                      <p className="text-xs text-muted mt-2 bg-gray-50 rounded-lg p-3">
                        Class 2 NICs (&pound;
                        {fmt(rates.class2Weekly * 52)}/year at &pound;
                        {fmt(rates.class2Weekly)}/week) are now auto-credited for
                        most sole traders, so you do not need to pay them
                        separately. They still count towards your State Pension
                        entitlement.
                      </p>
                    </div>
                    <div className="border-t border-gray-100 pt-3" />
                    {/* Class 4 */}
                    <h4 className="text-sm font-semibold text-primary mb-2">
                      Class 4 NIC
                    </h4>
                    <Row
                      label={`6% on profits between \u00a3${fmt(
                        rates.class4LowerLimit
                      )} and \u00a3${fmt(rates.class4UpperLimit)}`}
                      value={`\u00a3${fmt(calc.class4Lower)}`}
                    />
                    <Row
                      label={`2% on profits over \u00a3${fmt(
                        rates.class4UpperLimit
                      )}`}
                      value={`\u00a3${fmt(calc.class4Upper)}`}
                    />
                    <div className="border-t border-gray-100 pt-3" />
                    <Row
                      label="Total National Insurance"
                      value={`\u00a3${fmt(calc.class4Total)}`}
                      bold
                    />
                  </div>
                </div>

                {/* Grand Total */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                  <h3 className="text-base font-bold text-primary mb-4">
                    Summary
                  </h3>
                  <div className="space-y-3">
                    <Row
                      label="Annual Profit"
                      value={`\u00a3${fmt(profit)}`}
                    />
                    <Row
                      label="Income Tax"
                      value={`-\u00a3${fmt(calc.incomeTax)}`}
                    />
                    <Row
                      label="National Insurance (Class 4)"
                      value={`-\u00a3${fmt(calc.class4Total)}`}
                    />
                    <div className="border-t border-gray-100 pt-3" />
                    <Row
                      label="Total Tax"
                      value={`\u00a3${fmt(calc.totalTax)}`}
                      bold
                    />
                    <Row
                      label="Effective Tax Rate"
                      value={`${calc.effectiveRate.toFixed(1)}%`}
                      bold
                    />
                    <div className="border-t border-gray-100 pt-3" />
                    <div className="flex justify-between items-center py-2 px-4 bg-gradient-to-r from-primary-dark to-primary rounded-xl">
                      <span className="text-sm font-bold text-white">
                        Take-Home Pay
                      </span>
                      <span className="text-lg font-bold text-white">
                        &pound;{fmt(calc.takeHome)}
                      </span>
                    </div>
                    <p className="text-xs text-muted text-center mt-2">
                      That is &pound;{fmt(calc.takeHome / 12)} per month
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-6 md:p-8 text-center">
                  <h3 className="font-bold text-amber-900 text-lg mb-2">
                    Want to reduce your tax bill?
                  </h3>
                  <p className="text-amber-800/80 text-sm mb-5 max-w-lg mx-auto">
                    Every legitimate business expense you track reduces your
                    taxable profit. QuarterlyUK makes it easy to log expenses in
                    the 14 HMRC categories, so you never miss a deduction.
                  </p>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-primary-light transition-colors"
                  >
                    Track your expenses to reduce your tax bill
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            )}

            {/* Empty state */}
            {profit <= 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-7 h-7 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-primary mb-2">
                  Enter your annual profit above
                </h3>
                <p className="text-sm text-muted max-w-md mx-auto">
                  Type your estimated profit (turnover minus expenses) and
                  we will calculate your Income Tax, National Insurance, and
                  take-home pay instantly.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Info section */}
        <section className="py-20 bg-surface">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-3">
                How It Works
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
                Understanding sole trader tax
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-base font-bold text-primary mb-2">
                  Income Tax
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  As a sole trader, you pay Income Tax on your profits (not your
                  turnover). You get a tax-free Personal Allowance of &pound;12,570,
                  then pay 20% basic rate, 40% higher rate, and 45% additional
                  rate on the rest. If you earn over &pound;100,000, your Personal
                  Allowance is gradually reduced.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-base font-bold text-primary mb-2">
                  National Insurance
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Sole traders pay Class 4 NICs on profits: 6% on profits
                  between &pound;12,570 and &pound;50,270, and 2% on anything above that.
                  Class 2 NICs are now auto-credited for most, so there is
                  typically no separate charge, but they still count towards your
                  State Pension.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-base font-bold text-primary mb-2">
                  Reducing your tax bill
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  The lower your taxable profit, the less tax you pay. That
                  means tracking every allowable business expense: office costs,
                  travel, professional subscriptions, phone bills, and more. If
                  you are not already tracking these, you are probably overpaying.
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-base font-bold text-primary mb-2">
                  Making Tax Digital
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  From April 2026, sole traders earning over &pound;50,000 must
                  keep digital records and submit quarterly updates to HMRC.
                  QuarterlyUK helps you stay compliant for just &pound;2.50/month.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-xs text-muted text-center leading-relaxed">
              This calculator provides estimates based on published HMRC tax
              rates and thresholds. It is intended as a guide only and does not
              constitute tax advice. Your actual tax liability may differ based
              on your individual circumstances. For professional tax advice,
              consult a qualified accountant or tax adviser.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-primary-dark text-slate-400 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.svg"
                  alt="Q"
                  width={28}
                  height={28}
                  className="-mr-0.5"
                />
                <span className="text-white text-lg font-bold tracking-tight">
                  uarterly<span className="text-accent">UK</span>
                </span>
              </Link>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
                <Link
                  href="/"
                  className="hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/dashboard"
                  className="hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms
                </Link>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy
                </Link>
              </div>
            </div>
            <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
              <span>&copy; 2026 QuarterlyUK. All rights reserved.</span>
              <span>
                QuarterlyUK is a record-keeping tool, not a tax adviser.
              </span>
            </div>
          </div>
        </footer>
      </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Row component for breakdowns                                       */
/* ------------------------------------------------------------------ */

function Row({
  label,
  value,
  bold,
  muted,
}: {
  label: string;
  value: string;
  bold?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <span
        className={`text-sm ${
          bold ? "font-bold text-primary" : muted ? "text-muted" : "text-gray-700"
        }`}
      >
        {label}
      </span>
      <span
        className={`text-sm tabular-nums ${
          bold ? "font-bold text-primary" : "text-gray-700"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
