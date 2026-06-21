export default function Process() {
  const steps = [
    {
      number: 1,
      title: "You're Stuck",
      description: "Bad credit blocking your dreams",
    },
    {
      number: 2,
      title: "You Find Us",
      description: "The Capital Vault solution",
    },
    {
      number: 3,
      title: "Submit Reports",
      description: "Send us your credit reports",
    },
    {
      number: 4,
      title: "We Analyze",
      description: "Manual expert review",
    },
    {
      number: 5,
      title: "We Dispute",
      description: "All 3 bureaus manually",
    },
    {
      number: 6,
      title: "Errors Deleted",
      description: "Negative items removed",
    },
    {
      number: 7,
      title: "Score Improved",
      description: "Credit score increases",
    },
    {
      number: 8,
      title: "Get Funded",
      description: "$100K+ business funding",
    },
  ];

  return (
    <section className="section-padding bg-vault-gold/5">
      <div className="container-vault">
        <div className="text-center mb-16 scroll-reveal">
          <p className="kicker text-vault-gold mb-4">
            REAL-TIME VISUALIZATION OF OUR CREDIT REPAIR PROCESS
          </p>
          <h2 className="heading-md text-vault-cream">
            Watch How We Transform Your Credit
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative scroll-reveal">
              <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-hairline bg-vault-black/40 h-full">
                <div className="w-12 h-12 rounded-full bg-vault-gold flex items-center justify-center mb-4 flex-shrink-0">
                  <span className="text-vault-black font-bold text-lg">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-vault-cream font-semibold text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-vault-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (index + 1) % 4 !== 0 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10 items-center justify-center w-8">
                  <svg
                    className="w-5 h-5 text-vault-gold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}

              {(index === 3 || index === 7) && index < steps.length - 1 && (
                <div className="hidden md:flex absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 items-center justify-center h-8">
                  <svg
                    className="w-5 h-5 text-vault-gold rotate-90"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
