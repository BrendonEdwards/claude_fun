import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free UK Sole Trader Tax Calculator 2025/26 | QuarterlyUK",
  description:
    "Calculate your Income Tax and National Insurance as a UK sole trader. Free tax calculator for self-employed — see your take-home pay instantly.",
  alternates: {
    canonical: "https://quarterlyuk.com/tools/tax-calculator",
  },
  openGraph: {
    title: "Free UK Sole Trader Tax Calculator 2025/26 | QuarterlyUK",
    description:
      "Calculate your Income Tax and National Insurance as a UK sole trader. Free tax calculator for self-employed — see your take-home pay instantly.",
    type: "website",
    url: "https://quarterlyuk.com/tools/tax-calculator",
    siteName: "QuarterlyUK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free UK Sole Trader Tax Calculator 2025/26 | QuarterlyUK",
    description:
      "Calculate your Income Tax and National Insurance as a UK sole trader. Free tax calculator for self-employed — see your take-home pay instantly.",
  },
};

export default function TaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
