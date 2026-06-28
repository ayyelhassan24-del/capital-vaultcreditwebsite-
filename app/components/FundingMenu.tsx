export default function FundingMenu() {
  const products = [
    {
      name: "Line of Credit (LOC)",
      description: "Revolving credit against cash flow. Draw, repay, redraw.",
      range: "$25K–$500K",
      timing: "5–10 days",
    },
    {
      name: "Revenue-Based Financing (RBF)",
      description:
        "Repay as % of monthly revenue. No fixed payments, scales with you.",
      range: "$50K–$1M",
      timing: "7–14 days",
    },
    {
      name: "SBA Loans",
      description:
        "Government-backed, long-term amortization. Best rates for established ops.",
      range: "$100K–$5M",
      timing: "20–45 days",
    },
    {
      name: "Term Loans",
      description: "Fixed amounts, fixed rates, fixed terms. Simplest structure.",
      range: "$50K–$2M",
      timing: "10–20 days",
    },
    {
      name: "Equipment Financing",
      description: "Collateral-backed against the equipment itself. Preserve cash.",
      range: "$25K–$1M",
      timing: "8–15 days",
    },
    {
      name: "Business Credit Lines",
      description: "Unsecured working capital based on business credit profile.",
      range: "$10K–$250K",
      timing: "3–7 days",
    },
  ];

  return (
    <section id="funding" className="section-padding bg-vault-gold/5 border-y border-vault-border">
      <div className="container-vault">
        <div className="flex items-start gap-4 md:gap-6 mb-12 md:mb-16">
          <div className="flex-1 scroll-reveal">
            <p className="kicker text-vault-gold mb-4">CAPITAL TYPES</p>
            <h2 className="heading-md text-vault-ink">The Capital Menu</h2>
          </div>
          <div className="scroll-reveal delay-1 text-right">
            <div className="inline-block border border-vault-gold/40 text-vault-gold px-4 py-2 text-sm font-semibold uppercase tracking-wider">
              24-Hour Decisioning
            </div>
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          {products.map((product, idx) => (
            <div
              key={product.name}
              className={`scroll-reveal delay-${(idx % 4) + 1} group border-b border-vault-border last:border-b-0 -mx-6 md:-mx-10 px-6 md:px-10 py-6 md:py-8 hover:bg-vault-gold/5 transition-colors cursor-pointer`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
                <div className="flex-1">
                  <h3 className="heading-md text-vault-ink mb-2 group-hover:text-vault-gold transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-vault-muted leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex flex-col md:text-right gap-3 md:gap-2 flex-shrink-0">
                  <div>
                    <p className="text-xs text-vault-muted uppercase tracking-wider mb-1">
                      Amount
                    </p>
                    <p className="text-lg md:text-xl font-serif font-bold text-vault-gold">
                      {product.range}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-vault-muted uppercase tracking-wider mb-1">
                      Timeline
                    </p>
                    <p className="text-lg md:text-xl font-serif font-bold text-vault-ink">
                      {product.timing}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
