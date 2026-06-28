import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | The Capital Vault",
  description: "How The Capital Vault collects, uses, and protects your information.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-vault-black py-16 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="mb-12">
          <p className="kicker text-vault-gold mb-4">Legal</p>
          <h1 className="heading-lg text-vault-cream">Privacy Policy</h1>
          <p className="text-vault-muted mt-4">Last updated: June 28, 2026</p>
        </div>

        <div className="space-y-10 text-vault-muted leading-relaxed">

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">1. Who We Are</h2>
            <p>
              The Capital Vault (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is a capital advisory service operating at{" "}
              <a href="https://thecapitalvault.com" className="text-vault-gold hover:underline">thecapitalvault.com</a>.
              We help business owners identify and access growth capital through our network of institutional lenders.
              We are not a direct lender and do not make credit decisions.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">2. Information We Collect</h2>
            <p className="mb-3">When you submit a form on our website or schedule a call, we collect:</p>
            <ul className="space-y-2 ml-4">
              {[
                "Full name",
                "Email address",
                "Mobile phone number",
                "Estimated annual business revenue",
                "Business type and intended use of capital (provided during the assessment call)",
                "IP address and basic browser/device information collected automatically",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-vault-gold mt-1 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="space-y-2 ml-4">
              {[
                "Contact you to schedule or conduct your capital assessment call",
                "Evaluate your business profile against our lender network criteria",
                "Send relevant follow-up communications about your capital inquiry",
                "Improve our services and website experience",
                "Comply with applicable legal requirements",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-vault-gold mt-1 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3">
              We do not sell your personal information to third parties. We do not use your data for advertising targeting on behalf of other companies.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">4. Third-Party Services</h2>
            <p className="mb-4">
              We use the following third-party services in the operation of our website and business. Each has its own privacy policy governing data they collect independently.
            </p>
            <div className="space-y-4">
              {[
                {
                  name: "GoHighLevel (GHL)",
                  desc: "Our CRM and contact management platform. Inquiry data submitted through our forms is transmitted to GHL for storage and follow-up workflow management.",
                },
                {
                  name: "Cloudflare Turnstile",
                  desc: "Bot protection on our inquiry forms. Cloudflare may collect IP address and browser characteristics to verify that form submissions are made by humans. No personal information is shared with Cloudflare beyond what is technically required for verification.",
                },
                {
                  name: "iClosed",
                  desc: "Our booking system for scheduling capital assessment calls. When you book a call, iClosed collects your name, email, and selected appointment time.",
                },
                {
                  name: "Wistia",
                  desc: "Video hosting for our educational content. Wistia may set cookies and collect viewer analytics when you watch embedded videos on our site.",
                },
                {
                  name: "Vercel",
                  desc: "Our website hosting provider. Vercel may log request metadata including IP addresses for performance and security purposes.",
                },
              ].map(({ name, desc }) => (
                <div key={name} className="card-vault p-5">
                  <p className="text-vault-cream font-semibold mb-1">{name}</p>
                  <p className="text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">5. Cookies</h2>
            <p>
              Our website uses essential cookies required for basic functionality. Third-party services embedded on our site (Wistia, Cloudflare Turnstile, iClosed) may set their own cookies as described in their respective privacy policies. We do not use tracking cookies for advertising retargeting.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">6. Data Retention</h2>
            <p>
              We retain your contact and inquiry information for as long as necessary to complete your capital advisory engagement and for reasonable follow-up periods thereafter. You may request deletion of your data at any time by contacting us at the address below.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">7. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="space-y-2 ml-4">
              {[
                "Request access to the personal information we hold about you",
                "Request correction of inaccurate information",
                "Request deletion of your data",
                "Opt out of marketing communications at any time by replying STOP to any text or clicking unsubscribe in any email",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-vault-gold mt-1 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">8. Security</h2>
            <p>
              We use industry-standard measures to protect your information in transit and at rest. No method of electronic transmission or storage is 100% secure. We take reasonable precautions but cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">9. Children</h2>
            <p>
              Our services are intended exclusively for business owners and operators. We do not knowingly collect information from individuals under 18 years of age.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Material changes will be reflected in the &ldquo;Last updated&rdquo; date above. Continued use of our site after any changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-vault-cream text-xl font-bold mb-3">11. Contact</h2>
            <p>
              For privacy-related inquiries, data deletion requests, or questions about this policy:
            </p>
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
            <a href="/terms" className="hover:text-vault-cream transition-colors">Terms of Service</a>
          </p>
        </div>

      </div>
    </main>
  );
}
