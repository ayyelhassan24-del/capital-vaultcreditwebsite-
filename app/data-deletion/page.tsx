import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Deletion Request | The Capital Vault",
  description: "Request deletion of your personal data from The Capital Vault.",
};

export default function DataDeletion() {
  return (
    <main className="min-h-screen bg-vault-black py-16 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="mb-12">
          <p className="kicker text-vault-gold mb-4">Legal</p>
          <h1 className="heading-lg text-vault-cream">Data Deletion Request</h1>
          <p className="text-vault-muted mt-4">Last updated: June 28, 2026</p>
        </div>

        <div className="space-y-10 text-vault-muted leading-relaxed">

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">Your Right to Delete</h2>
            <p>
              You have the right to request deletion of any personal information The Capital Vault holds about you.
              This includes your name, email address, phone number, and any other data you submitted through our
              website or during a consultation.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">What Gets Deleted</h2>
            <p className="mb-3">Upon a verified deletion request, we will remove:</p>
            <ul className="space-y-2 ml-4">
              {[
                "Your contact information (name, email, phone number)",
                "Form submission data and inquiry history",
                "Appointment and scheduling records",
                "Any notes or records from consultation calls",
                "Marketing list subscriptions",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-vault-gold mt-1 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              We will also submit deletion requests to any third-party processors (GoHighLevel, iClosed) that hold
              your data on our behalf. Note that third-party services you engaged with directly (e.g., Calendly,
              Wistia) maintain their own data — you must request deletion from them separately.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">How to Submit a Request</h2>
            <p className="mb-4">
              Email us from the address you used to contact us or submit a form. Include &ldquo;Data Deletion Request&rdquo;
              in the subject line. We will confirm receipt within 2 business days and complete deletion within 30 days.
            </p>
            <div className="card-vault p-6">
              <p className="text-vault-cream font-semibold mb-1">The Capital Vault</p>
              <p className="mt-1">
                Email:{" "}
                <a href="mailto:support@thecapitalvault.com?subject=Data%20Deletion%20Request" className="text-vault-gold hover:underline">
                  support@thecapitalvault.com
                </a>
              </p>
              <p className="text-sm mt-3 text-vault-muted">Subject line: <span className="text-vault-cream">Data Deletion Request</span></p>
            </div>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">Exceptions</h2>
            <p>
              We may retain certain records where required by law (e.g., financial transaction records) or where
              deletion would conflict with a legal obligation. We will notify you of any such exceptions when
              processing your request.
            </p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-hairline">
          <p className="text-xs text-vault-muted text-center">
            &copy; 2026 The Capital Vault. All rights reserved. &nbsp;·&nbsp;{" "}
            <a href="/" className="hover:text-vault-cream transition-colors">Home</a>
            &nbsp;·&nbsp;{" "}
            <a href="/privacy" className="hover:text-vault-cream transition-colors">Privacy Policy</a>
            &nbsp;·&nbsp;{" "}
            <a href="/terms" className="hover:text-vault-cream transition-colors">Terms of Service</a>
          </p>
        </div>

      </div>
    </main>
  );
}
