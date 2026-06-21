export default function CaseStudy() {
  return (
    <section className="section-padding">
      <div className="container-vault">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="scroll-reveal">
            <p className="kicker text-vault-gold mb-4">CASE STUDY</p>
            <h2 className="heading-md text-vault-cream mb-8">
              $850K Equipment Line for HVAC Contractor
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-vault-gold mb-2">
                  The Situation
                </h3>
                <p className="text-vault-muted leading-relaxed">
                  A 12-year-old HVAC company doing $2.1M annually needed
                  equipment financing to expand into commercial contracts.
                  Banks wanted 2 years of financials and a personal guarantee
                  covering his entire house.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-vault-gold mb-2">
                  What We Did
                </h3>
                <p className="text-vault-muted leading-relaxed">
                  Structured a $850K equipment line using future revenue
                  visibility from signed contracts. Positioned collateral
                  against the equipment itself, not his personal assets.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-vault-gold mb-2">
                  The Result
                </h3>
                <p className="text-vault-muted leading-relaxed">
                  Closed in 16 days. No personal guarantee. No equity
                  dilution. He paid off the equipment in 18 months and scaled
                  to $4.2M revenue.
                </p>
              </div>
            </div>
          </div>

          <div className="scroll-reveal delay-2">
            <div className="relative">
              <div className="bg-gradient-to-br from-vault-gold/20 to-vault-gold/5 aspect-square rounded-2xl flex items-center justify-center overflow-hidden border border-hairline">
                <div className="w-full h-full bg-vault-black/30 flex items-center justify-center text-vault-muted">
                  <span className="text-center">
                    <p className="text-sm font-semibold">Case Study Image</p>
                    <p className="text-xs mt-2">520x520px</p>
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-vault-black border border-hairline rounded-lg p-6 max-w-xs">
                <p className="text-sm text-vault-muted italic mb-3">
                  "They didn't just get me funding. They protected my company
                  and my family."
                </p>
                <p className="text-xs font-semibold text-vault-cream">
                  — Marcus T., HVAC Owner
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
