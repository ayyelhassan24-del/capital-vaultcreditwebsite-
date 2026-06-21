export default function WhyVault() {
  const reasons = [
    {
      title: "We Master the System",
      description:
        "Our team navigated every lending framework. We know which lender funds which structure, what triggers delays, and how to position your deal for approval.",
    },
    {
      title: "We Engineer Competition",
      description:
        "We run your deal to 10+ lenders simultaneously. Real competition drives better terms, faster closings, and options that protect you.",
    },
    {
      title: "We Ensure Approval",
      description:
        "We structure your deal, not pitch it. Our approach focuses on how a lender SEES your business—not on how charming our pitch is.",
    },
  ];

  return (
    <section id="why-vault" className="section-padding">
      <div className="container-vault">
        <div className="text-center mb-16 md:mb-20 scroll-reveal">
          <p className="kicker text-vault-gold mb-4">WHY VAULT</p>
          <h2 className="heading-md text-vault-cream">
            Banks Say No. <br />
            We Say Yes.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 mb-16">
          {reasons.map((reason, idx) => (
            <div
              key={reason.title}
              className={`scroll-reveal delay-${(idx + 1) as any} bg-vault-gold/5 border border-hairline rounded-2xl p-8 md:p-10 hover:bg-vault-gold/10 transition-colors`}
            >
              <h3 className="heading-md text-vault-cream mb-4">
                {reason.title}
              </h3>
              <p className="text-vault-muted leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-vault-gold/10 border border-vault-gold/30 rounded-2xl p-8 md:p-12 scroll-reveal">
          <div className="flex items-start gap-6">
            <div className="text-2xl md:text-3xl">⚡</div>
            <div>
              <h3 className="heading-md text-vault-cream mb-3">24-Hour Decisioning</h3>
              <p className="text-vault-muted leading-relaxed">
                Most lenders can make a preliminary yes/no within 24 hours of
                receiving your complete application. This isn't a soft approval—it's
                a term sheet in motion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
