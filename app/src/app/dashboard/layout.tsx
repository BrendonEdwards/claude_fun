"use client";

import { Component, Suspense, useEffect } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { getCurrentTaxYear } from "@/lib/calculations";
import { saveLicense, isActivated } from "@/lib/store";

class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="p-8 text-center">
          <h2 className="text-lg font-bold text-red-600 mb-2">Something went wrong</h2>
          <p className="text-sm text-gray-600 mb-4">{this.state.error.message}</p>
          <button
            onClick={() => { this.setState({ error: null }); window.location.reload(); }}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const PROMO_CODES = ["FAMILYTEST", "BETATESTER"];

function PromoActivator() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const promo = searchParams.get("promo");
    if (promo && PROMO_CODES.includes(promo.toUpperCase()) && !isActivated()) {
      saveLicense(
        "cHJvbW9fYWN0aXZhdGlvbg.ZmFtaWx5dGVzdF92YWxpZA",
        `promo-${promo.toLowerCase()}@quarterlyuk.app`
      );
      window.history.replaceState({}, "", pathname);
      window.location.reload();
    }
  }, [searchParams, pathname]);

  return null;
}

const navItems = [
  {
    href: "/dashboard",
    label: "Overview",
    color: "text-blue-500",
    activeBg: "from-blue-500/10 to-blue-500/5",
    activeBorder: "border-blue-500/15",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
      </svg>
    ),
  },
  {
    href: "/dashboard/expenses",
    label: "Expenses",
    color: "text-rose-500",
    activeBg: "from-rose-500/10 to-rose-500/5",
    activeBorder: "border-rose-500/15",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
  },
  {
    href: "/dashboard/invoices",
    label: "Invoices",
    color: "text-amber-500",
    activeBg: "from-amber-500/10 to-amber-500/5",
    activeBorder: "border-amber-500/15",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    href: "/dashboard/jobs",
    label: "Jobs",
    color: "text-orange-500",
    activeBg: "from-orange-500/10 to-orange-500/5",
    activeBorder: "border-orange-500/15",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    ),
  },
  {
    href: "/dashboard/reports",
    label: "Reports",
    color: "text-emerald-500",
    activeBg: "from-emerald-500/10 to-emerald-500/5",
    activeBorder: "border-emerald-500/15",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    href: "/dashboard/mtd-checker",
    label: "MTD Checker",
    color: "text-violet-500",
    activeBg: "from-violet-500/10 to-violet-500/5",
    activeBorder: "border-violet-500/15",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-surface">
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <Suspense fallback={null}>
        <PromoActivator />
      </Suspense>
      {/* Top bar */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Q" width={36} height={36} className="-mr-0.5" />
            <span className="text-xl font-bold tracking-tight text-primary">
              uarterly<span className="text-accent">UK</span>
            </span>
          </Link>
          <span className="text-sm text-muted font-medium">
            Tax Year {getCurrentTaxYear()}
          </span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <nav className="w-60 min-h-[calc(100vh-57px)] bg-white border-r border-gray-100 p-4 hidden md:block flex flex-col">
          <div className="space-y-1 mt-2">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? `bg-gradient-to-r ${item.activeBg} ${item.color} border ${item.activeBorder}`
                      : "text-muted hover:bg-surface hover:text-primary"
                  }`}
                >
                  <span className={isActive ? item.color : "text-muted"}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="border-t border-gray-100 mt-4 pt-4">
            <Link
              href="/"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-muted hover:bg-surface hover:text-primary transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Home
            </Link>
          </div>
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 z-50">
          <div className="flex justify-around py-2 px-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-[10px] font-medium transition-colors ${
                    isActive ? item.color : "text-muted"
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 pb-20 md:pb-6">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
