import Link from "next/link";
import Image from "next/image";

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold text-primary mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted mb-10">Last updated: 18 February 2026</p>

        <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
          <section>
            <h2 className="text-lg font-bold text-primary">1. Overview</h2>
            <p>
              QuarterlyUK is committed to protecting your privacy. This policy explains what
              data we collect (very little) and how your information is handled when you use
              our Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">2. Data We Do NOT Collect</h2>
            <p>
              <strong>QuarterlyUK does not collect, store, or transmit any of your financial
              data.</strong> All expenses, invoices, income records, business details, and other
              data you enter into the application are stored exclusively in your web browser&apos;s
              localStorage on your own device.
            </p>
            <p>We do not have access to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your expense records or amounts</li>
              <li>Your invoices or client details</li>
              <li>Your income or profit figures</li>
              <li>Your business name, address, or UTR</li>
              <li>Your quarterly summaries or tax estimates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">3. Data We Do Collect</h2>
            <p>When you purchase a license, our payment processor (LemonSqueezy) collects:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your email address (for license delivery and purchase receipt)</li>
              <li>Payment information (processed securely by LemonSqueezy/Stripe; we never see your card details)</li>
            </ul>
            <p>
              If you contact us via email (hello@quarterlyuk.com or feedback@quarterlyuk.com),
              we will have your email address and the content of your message.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">4. Cookies &amp; Analytics</h2>
            <p>
              QuarterlyUK uses Google Analytics to understand how visitors use our website.
              Google Analytics collects anonymous usage data such as pages visited, time on
              site, and general location (country/region). This helps us improve the Service.
              Google Analytics may set cookies in your browser for this purpose.
            </p>
            <p>
              Google Analytics does not have access to any of your financial data, expenses,
              invoices, or other records you enter into the application. That data is stored
              locally and is never transmitted. For more information on how Google handles data,
              see{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline"
              >
                Google&apos;s Privacy Policy
              </a>.
            </p>
            <p>
              The application uses your browser&apos;s localStorage to save your financial data
              locally. This is not a cookie and is not transmitted to any server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">5. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>LemonSqueezy:</strong> Payment processing. Their privacy policy applies
                to the checkout and payment process. See{" "}
                <a
                  href="https://www.lemonsqueezy.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline"
                >
                  LemonSqueezy Privacy Policy
                </a>.
              </li>
              <li>
                <strong>Google Analytics:</strong> Anonymous website usage analytics. See{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline"
                >
                  Google Privacy Policy
                </a>.
              </li>
              <li>
                <strong>Vercel:</strong> Website hosting. Standard web server logs (IP address,
                browser type, pages visited) may be collected by our hosting provider. See{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline"
                >
                  Vercel Privacy Policy
                </a>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">6. Your Data, Your Control</h2>
            <p>
              Since your financial data is stored only in your browser, you have complete control
              over it at all times. You can:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Export your data at any time using the CSV export or backup features</li>
              <li>Delete all your data by clearing your browser&apos;s localStorage</li>
              <li>Use the application without providing any personal information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">7. GDPR</h2>
            <p>
              Because we do not collect or process your financial data, most GDPR data subject
              rights are not applicable to the application itself. For any data held by our
              payment processor (purchase email and transaction records), you may exercise your
              GDPR rights by contacting us at{" "}
              <a href="mailto:hello@quarterlyuk.com" className="text-accent underline">
                hello@quarterlyuk.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">8. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Changes will be posted on
              this page with an updated date. Your continued use of the Service constitutes
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-primary">9. Contact</h2>
            <p>
              If you have any questions about this privacy policy, please contact us at{" "}
              <a href="mailto:hello@quarterlyuk.com" className="text-accent underline">
                hello@quarterlyuk.com
              </a>.
            </p>
          </section>
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
