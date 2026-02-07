import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaxMate UK - AI-Powered Invoice & Expense Toolkit for Sole Traders",
  description:
    "Get MTD-ready with TaxMate. AI-powered expense tracking, invoice generation, and quarterly summaries for UK sole traders and freelancers. Making Tax Digital compliant.",
  keywords: [
    "Making Tax Digital",
    "MTD software",
    "sole trader expenses",
    "UK invoice generator",
    "freelancer tax tool",
    "HMRC quarterly updates",
    "expense tracker UK",
    "self-assessment tool",
  ],
  openGraph: {
    title: "TaxMate UK - Get MTD-Ready in Minutes",
    description:
      "AI-powered expense tracking and invoicing for UK sole traders. Prepare for Making Tax Digital with confidence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
