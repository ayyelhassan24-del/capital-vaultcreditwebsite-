const reasons = [
  {
    num: "01",
    title: "We Master the System",
    description:
      "Our team has navigated every lending framework. We know which lender funds which structure, what triggers delays, and how to position your deal for approval.",
  },
  {
    num: "02",
    title: "We Engineer Competition",
    description:
      "We run your deal to 10+ lenders simultaneously. Real competition drives better terms, faster closings, and options that protect you.",
  },
  {
    num: "03",
    title: "We Ensure Approval",
    description:
      "We structure your deal, not pitch it. Our approach focuses on how a lender sees your business, not on how charming our pitch is.",
  },
];

export default function WhyVault() {
  return (
    <section id="why-vault" className="section-padding">
      <div className="container-vault">

        <div className="mb-16 md:mb-20 scroll-reveal">
          <h2 className="heading-lg text-vault-ink">
            Banks say no.<br />
            <span className="text-vault-gold">We say yes.</span>
          </h2>
        </div>

        <div className="border-t border-vault-border">
          {reasons.map((r, idx) => (
            <div
              key={r.num}
              className={`scroll-reveal delay-${idx + 1} grid md:grid-cols-[80px_1fr_2fr] gap-6 md:gap-12 items-start border-b border-vault-border py-10 md:py-12 group hover:bg-vault-gold/5 -mx-6 md:-mx-10 px-6 md:px-10 transition-colors`}
            >
              <p className="font-serif text-5xl font-bold text-vault-gold/30 leading-none group-hover:text-vault-gold/50 transition-colors">
                {r.num}
              </p>
              <h3 className="heading-md text-vault-ink pt-1">{r.title}</h3>
              <p className="text-vault-muted leading-relaxed pt-1">{r.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 scroll-reveal border border-vault-gold/30 p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <h3 className="heading-md text-vault-ink mb-3">24-Hour Decisioning</h3>
            <p className="text-vault-muted leading-relaxed max-w-prose">
              Most lenders make a preliminary yes/no within 24 hours of receiving
              your complete application. Not a soft approval. A term sheet in motion.
            </p>
          </div>
          <p className="font-serif text-5xl md:text-6xl font-bold text-vault-gold shrink-0">24h</p>
        </div>

      </div>
    </section>
  );
}
