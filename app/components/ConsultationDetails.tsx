import Script from "next/script";

export default function ConsultationDetails() {
  const guarantees = [
    "100% confidential — your data never leaves our team",
    "100% non-dilutive — you keep every point of equity",
    "Zero upfront fees — we win when you fund",
    "No obligation — walk away at any time",
  ];

  return (
    <section className="section-padding bg-vault-black border-b border-vault-border">
      <div className="container-vault">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — Event header */}
          <div className="scroll-reveal">
            <p className="kicker text-vault-gold mb-4">FREE CONSULTATION</p>
            <h2 className="heading-md text-vault-cream mb-5">
              20 minutes.<br />
              <span className="text-vault-gold">A precise map of your options.</span>
            </h2>
            <p className="text-vault-muted text-base leading-relaxed mb-10 max-w-[46ch]">
              No pitch. No fees. No obligation. We read your profile, match you to what you qualify for, and give you a rate range — in one call.
            </p>

            <div className="space-y-2 mb-10">
              {guarantees.map((g) => (
                <div key={g} className="flex items-start gap-3">
                  <span className="text-vault-gold font-bold shrink-0 mt-0.5">✓</span>
                  <span className="text-vault-muted text-sm">{g}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-vault-border pt-8">
              <p className="text-vault-muted text-xs uppercase tracking-widest mb-3">Prefer to talk now?</p>
              <a
                href="tel:9896144359"
                className="block text-vault-cream text-lg font-semibold hover:text-vault-gold transition-colors mb-1"
              >
                989-614-4359
              </a>
              <a
                href="mailto:support@thecapitalvault.com"
                className="block text-vault-muted text-sm hover:text-vault-gold transition-colors"
              >
                support@thecapitalvault.com
              </a>
            </div>
          </div>

          {/* Right — iClosed booking widget */}
          <div className="scroll-reveal delay-1">
            <div
              className="iclosed-widget"
              data-url="https://app.iclosed.io/e/thecapitalvault/consult-for-home-page"
              title="Consult for Home Page"
              style={{ width: "100%", height: "620px" }}
            />
            <Script src="https://app.iclosed.io/assets/widget.js" strategy="afterInteractive" />
          </div>

        </div>
      </div>
    </section>
  );
}
