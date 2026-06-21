const testimonials = [
  {
    stars: 5,
    title: "700+ Credit Score & a Brand New Tesla — In Less Than 3 Months",
    quote:
      "I leveled up to a 700+ score and qualified for a brand new Tesla in under 90 days—fast turnaround and no fluff.",
    name: "Brittney B.",
    tier: "Tier 3 Client",
  },
  {
    stars: 5,
    title: "From 400 Credit Score to 777 Credit Score",
    quote:
      "I went from the 400s to a 777. The debt's gone and approvals started rolling in—$85,000 in new funding secured.",
    name: "Josh T.",
    tier: "Tier 2 Client",
  },
  {
    stars: 5,
    title: "From Bad Credit to $90K in Business Credit",
    quote:
      "We rebuilt my profile, crossed 700+, and secured $90,000 in business credit. That opened the door to the new Tesla.",
    name: "Brandon B.",
    tier: "Tier 1 Client",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-vault-black">
      <div className="container-vault">
        <div className="text-center mb-16 scroll-reveal">
          <p className="kicker text-vault-gold mb-4">FROM OUR CLIENTS</p>
          <h2 className="heading-md text-vault-cream">
            From Our Clients Who&apos;ve Transformed Their Credit &amp; Businesses
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={t.name}
              className={`border border-hairline rounded-2xl p-8 flex flex-col scroll-reveal ${
                index === 1 ? "delay-1" : index === 2 ? "delay-2" : ""
              }`}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-vault-gold text-lg">
                    ★
                  </span>
                ))}
              </div>

              <h3 className="text-vault-cream font-semibold text-base mb-4 leading-snug">
                {t.title}
              </h3>

              <p className="text-vault-muted italic text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div>
                <p className="text-vault-gold font-semibold">{t.name}</p>
                <p className="text-vault-muted text-sm">{t.tier}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
