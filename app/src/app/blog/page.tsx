import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — QuarterlyUK",
  description: "Practical MTD guides, HMRC tips, and tax advice for UK sole traders. Stay compliant with Making Tax Digital without the jargon.",
  alternates: { canonical: "https://quarterlyuk.com/blog" },
  openGraph: {
    title: "Blog — QuarterlyUK",
    description: "Practical MTD guides, HMRC tips, and tax advice for UK sole traders. Stay compliant with Making Tax Digital without the jargon.",
    url: "https://quarterlyuk.com/blog",
  },
};

const articles = [
  {
    title: "MTD April 2026: What Sole Traders Need to Do Right Now",
    href: "/blog/mtd-april-2026-sole-traders-guide",
    date: "24 February 2026",
    description:
      "The MTD for Income Tax deadline is weeks away. Here is a plain-English checklist of everything you need to have in place before 6 April 2026.",
  },
  {
    title: "What is Making Tax Digital for Income Tax? A Plain English Guide",
    href: "/blog/what-is-making-tax-digital-income-tax-sole-traders",
    date: "Coming soon",
    description:
      "No jargon, no waffle. A straightforward explanation of what MTD ITSA actually means, who it affects, and what changes for your tax return.",
  },
  {
    title: "Cheapest MTD Software UK 2026: An Honest Price Comparison",
    href: "/blog/cheapest-mtd-software-uk-2026",
    date: "Coming soon",
    description:
      "We compared every HMRC-recognised MTD software option by price so you do not have to. See which tools actually cost what they claim.",
  },
  {
    title: "HMRC Expense Categories for Sole Traders: The Complete List",
    href: "/hmrc-expense-categories",
    date: "Coming soon",
    description:
      "Every allowable expense category HMRC accepts for sole traders, explained in plain English with real examples you can use today.",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Q" width={26} height={26} className="-mr-0.5" />
            <span className="text-lg font-bold tracking-tight text-primary">
              uarterly<span className="text-accent">UK</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-muted hover:text-primary transition-colors"
          >
            Back to home
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-primary mb-2">Blog</h1>
        <p className="text-sm text-muted mb-10">
          Practical guides for UK sole traders navigating Making Tax Digital, HMRC rules, and everyday bookkeeping.
        </p>

        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="block border border-gray-100 rounded-lg p-6 hover:border-accent/40 hover:shadow-sm transition-all"
            >
              <p className="text-xs text-muted mb-1">{article.date}</p>
              <h2 className="text-lg font-bold text-primary mb-2">
                {article.title}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {article.description}
              </p>
              <span className="inline-block mt-3 text-sm font-medium text-accent">
                Read article &rarr;
              </span>
            </Link>
          ))}
        </div>
      </main>

      <footer className="bg-primary-dark text-slate-400 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm">
          <span>&copy; 2026 QuarterlyUK. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
