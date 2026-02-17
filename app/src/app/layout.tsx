import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuarterlyUK - Invoice & Expense Toolkit for UK Sole Traders",
  description:
    "Get MTD-ready with QuarterlyUK. Simple expense tracking, invoice generation, and quarterly summaries for UK sole traders and freelancers. Making Tax Digital compliant.",
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
  icons: {
    icon: "/favicon.svg",
    apple: "/logo.png",
  },
  openGraph: {
    title: "QuarterlyUK - Get MTD-Ready in Minutes",
    description:
      "Simple expense tracking and invoicing for UK sole traders. Prepare for Making Tax Digital with confidence.",
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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
