import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | The Capital Vault",
  description: "Terms governing your use of The Capital Vault's capital advisory services.",
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-vault-black py-16 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="mb-12">
          <p className="kicker text-vault-gold mb-4">Legal</p>
          <h1 className="heading-lg text-vault-cream">Terms of Service</h1>
          <p className="text-vault-muted mt-4">Last updated: June 28, 2026</p>
        </div>

        <div className="space-y-10 text-vault-muted leading-relaxed">

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">1. About The Capital Vault</h2>
            <p>
              The Capital Vault (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is a capital advisory firm that helps business owners identify and access growth capital through our network of institutional lenders. We operate at{" "}
              <a href="https://thecapitalvault.com" className="text-vault-gold hover:underline">thecapitalvault.com</a>.
            </p>
            <p className="mt-3">
              <strong className="text-vault-cream">We are not a lender.</strong> We do not underwrite loans, make credit decisions, or guarantee any funding outcome. We provide advisory services to help qualified business owners access capital through third-party lenders.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">2. Agreement to Terms</h2>
            <p>
              By accessing our website, submitting an inquiry, scheduling a call, or engaging our services, you agree to be bound by these Terms of Service. If you do not agree, do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">3. Eligibility</h2>
            <p className="mb-3">To use our services you must:</p>
            <ul className="space-y-2 ml-4">
              {[
                "Be at least 18 years of age",
                "Be a business owner, principal, or authorized representative of a business entity",
                "Have a legitimate business operating in the United States",
                "Have authority to seek capital on behalf of the business",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-vault-gold mt-1 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">4. Advisory Services &amp; Fees</h2>
            <p className="mb-3">
              Our capital advisory services are provided for a flat advisory fee agreed upon in writing prior to engagement. Fees are non-refundable once services have commenced unless otherwise specified in your individual service agreement.
            </p>
            <p>
              In addition to any flat fee, we may receive a success-based fee or referral compensation from lenders in our network upon successful funding. This does not increase the cost of capital to you; it is paid by the lender. All compensation structures will be disclosed to you before you sign any engagement agreement.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">5. No Guarantee of Funding</h2>
            <p>
              We do not guarantee that you will receive funding, be matched with a lender, or that any lender will approve your application. Approval decisions are made solely by third-party lenders based on their own criteria. Our role is to position your file and connect you with appropriate capital sources — outcomes are not guaranteed.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">6. Accuracy of Information</h2>
            <p>
              You agree to provide accurate, current, and complete information when submitting inquiries or engaging our services. Providing false or misleading information — including misrepresenting revenue, business age, or business type — may result in immediate termination of your engagement without refund and may constitute fraud under applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">7. Communications Consent</h2>
            <p>
              By submitting your phone number or email address through any form on our site, you consent to receive calls, texts, and emails from The Capital Vault related to your inquiry and our services. You may opt out at any time by replying STOP to any text or clicking unsubscribe in any email.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">8. Intellectual Property</h2>
            <p>
              All content on this website — including text, design, graphics, video, and methodology — is the property of The Capital Vault and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">9. Disclaimer of Warranties</h2>
            <p>
              Our website and services are provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. We do not warrant that our website will be error-free, uninterrupted, or free of harmful components.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, The Capital Vault shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of our services or inability to obtain funding. Our total liability to you shall not exceed the fees you paid us in the 90 days preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">11. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of Texas, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Texas.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">12. Changes to These Terms</h2>
            <p>
              We may update these Terms at any time. Material changes will be reflected in the &ldquo;Last updated&rdquo; date above. Continued use of our services after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">13. Contact</h2>
            <p>For questions about these Terms:</p>
            <div className="card-vault p-5 mt-4">
              <p className="text-vault-cream font-semibold">The Capital Vault</p>
              <p className="mt-1">
                Email:{" "}
                <a href="mailto:support@thecapitalvault.com" className="text-vault-gold hover:underline">
                  support@thecapitalvault.com
                </a>
              </p>
              <p className="mt-1">Website: thecapitalvault.com</p>
            </div>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-hairline">
          <p className="text-xs text-vault-muted text-center">
            &copy; 2026 The Capital Vault. All rights reserved. &nbsp;·&nbsp;{" "}
            <a href="/" className="hover:text-vault-cream transition-colors">Home</a>
            &nbsp;·&nbsp;{" "}
            <a href="/privacy" className="hover:text-vault-cream transition-colors">Privacy Policy</a>
          </p>
        </div>

      </div>
    </main>
  );
}
