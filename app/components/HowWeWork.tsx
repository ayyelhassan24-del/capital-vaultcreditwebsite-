export default function HowWeWork() {
  const steps = [
    {
      number: "01",
      title: "Consultation",
      description:
        "We dig into your financials, growth, cash flow, and existing debt. We ask what other lenders asked and where you got stuck. This is how we engineer your best structure.",
    },
    {
      number: "02",
      title: "Structuring",
      description:
        "We position your deal—choosing the right product, the right amount, the right terms—to maximize approval odds and minimize your cost of capital.",
    },
    {
      number: "03",
      title: "Deployment",
      description:
        "We submit to 10+ lenders simultaneously. You get offers. We negotiate on your behalf. Funds land in your account and you execute.",
    },
  ];

  return (
    <section id="how-we-work" className="section-padding">
      <div className="container-vault">
        <div className="text-center mb-16 md:mb-24 scroll-reveal">
          <p className="kicker text-vault-gold mb-4">THE PROCESS</p>
          <h2 className="heading-md text-vault-cream">How We Work</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-12">
          {steps.map((step, idx) => (
            <div key={step.number} className={`scroll-reveal delay-${(idx + 1) as any}`}>
              <div className="relative">
                <div className="text-6xl md:text-7xl font-serif font-bold text-vault-gold/20 mb-4">
                  {step.number}
                </div>
                <div className="relative -mt-16">
                  <h3 className="heading-md text-vault-cream mb-4">
                    {step.title}
                  </h3>
                  <p className="text-vault-muted leading-relaxed mb-8">
                    {step.description}
                  </p>

                  {idx < steps.length - 1 && (
                    <div className="absolute -right-4 md:-right-6 top-12 w-8 md:w-12 h-0.5 bg-gradient-to-r from-vault-gold to-vault-gold/0 hidden md:block" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
