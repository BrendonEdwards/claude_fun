import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://quarterlyuk.com"),
  title: "QuarterlyUK — Cheapest MTD Software UK | £2.50/month for Sole Traders",
  description:
    "The cheapest MTD-ready software in the UK. Track expenses, generate invoices, and produce quarterly summaries for HMRC — from £2.50/month. Built for UK sole traders.",
  alternates: {
    canonical: "https://quarterlyuk.com",
  },
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
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.png",
  },
  openGraph: {
    title: "QuarterlyUK — Cheapest MTD Software UK | £2.50/month for Sole Traders",
    description:
      "Simple expense tracking and invoicing for UK sole traders. Get MTD-ready from £2.50/month.",
    type: "website",
    url: "https://quarterlyuk.com",
    siteName: "QuarterlyUK",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuarterlyUK — Cheapest MTD Software UK | £2.50/month for Sole Traders",
    description:
      "Simple expense tracking and invoicing for UK sole traders. Get MTD-ready from £2.50/month.",
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-43BGY87T6Z" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-43BGY87T6Z');`,
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
