"use client";

import Link from "next/link";

const CHECKOUT_URL =
  "https://quarterlyuk.lemonsqueezy.com/checkout/buy/e8049fa3-6f7c-4e6f-9905-9ecd80eb0408";

export default function UpgradeBanner({ feature }: { feature?: string }) {
  return (
    <div className="bg-gradient-to-r from-primary-dark to-primary rounded-2xl p-6 text-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base">
            {feature
              ? `Upgrade to unlock ${feature}`
              : "Upgrade to QuarterlyUK Pro"}
          </h3>
          <p className="text-slate-300 text-sm mt-1">
            Unlimited expenses, invoices, and <strong className="text-white">CSV exports ready for your accountant or HMRC bridging software</strong>. £29 once, no subscription.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href={CHECKOUT_URL}
            className="bg-accent text-primary px-5 py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-accent/25 transition-all whitespace-nowrap"
          >
            Buy Now - £29
          </a>
          <Link
            href="/dashboard/activate"
            className="text-sm text-slate-300 hover:text-white underline whitespace-nowrap"
          >
            Enter key
          </Link>
        </div>
      </div>
    </div>
  );
}
