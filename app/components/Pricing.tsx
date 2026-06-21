const tiers = [
  {
    name: "RAPID REPAIR",
    price: "$1,197",
    perfect: "Less than 10 negative accounts",
    features: [
      "Full 6-month program",
      "Personal credit strategist",
      "Three bureau disputes",
      "Weekly optimization calls",
      "Funding readiness prep",
    ],
    cta: "Start Rapid Repair →",
    popular: false,
  },
  {
    name: "COMPLEX RECOVERY",
    price: "$1,597",
    perfect: "Bankruptcy/Child Support + 10 accounts",
    features: [
      "Everything in Tier 1 PLUS:",
      "Bankruptcy removal strategies",
      "Legal document assistance",
      "Priority processing (30% faster)",
      "Business credit building basics",
    ],
    cta: "Start Complex Recovery →",
    popular: true,
  },
  {
    name: "TOTAL TRANSFORMATION",
    price: "$1,997",
    perfect: "10+ accounts and/or complex situations",
    features: [
      "Everything in Tier 2 PLUS:",
      "Unlimited dispute rounds",
      "Full business credit building",
      "VIP direct phone access",
      "Personal lender introductions",
      "$100K+ funding strategies",
    ],
    cta: "Start Total Transformation →",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section className="section-padding bg-vault-black">
      <div className="container-vault">
        <div className="text-center mb-16 scroll-reveal">
          <p className="kicker text-vault-gold mb-4">CHOOSE YOUR PATH</p>
          <h2 className="heading-md text-vault-cream">
            Choose Your Path to Credit Freedom
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-8 flex flex-col scroll-reveal ${
                index === 1 ? "delay-1" : index === 2 ? "delay-2" : ""
              } ${
                tier.popular
                  ? "border-2 border-vault-gold bg-vault-gold/5"
                  : "border border-hairline bg-vault-black/40"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-vault-gold text-vault-black text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className="kicker text-vault-gold mb-2">{tier.name}</p>
                <p className="text-4xl font-bold text-vault-cream mb-3">
                  {tier.price}
                </p>
                <p className="text-sm text-vault-muted">
                  <span className="text-vault-muted/70">Perfect for: </span>
                  {tier.perfect}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-vault-gold flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`text-sm ${
                        feature.endsWith("PLUS:")
                          ? "text-vault-gold font-semibold"
                          : "text-vault-muted"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a href="#contact" className="btn-gold text-center w-full">
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
