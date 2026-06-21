export default function Urgency() {
  return (
    <section className="section-padding bg-vault-black">
      <div className="container-vault">
        <div className="text-center mb-12 scroll-reveal">
          <h2 className="heading-lg text-vault-cream">Every Day You Wait Costs You Money</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="border border-red-900/40 bg-red-950/10 rounded-lg p-8 scroll-reveal">
            <h3 className="heading-md text-vault-cream mb-6">Bad Credit Is Costing You:</h3>
            <ul className="space-y-3 mb-8">
              {[
                "Thousands in high interest payments",
                "Missed business opportunities",
                "Competitive disadvantage",
                "Personal stress and frustration",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-vault-muted">
                  <span className="text-red-500 mt-1 flex-shrink-0">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-red-900/40 pt-6 space-y-2">
              <p className="text-vault-cream font-semibold text-lg">
                MONTHLY RECURRING LOSS: <span className="text-red-400">$3,000+</span>
              </p>
              <p className="text-vault-muted text-sm">
                IF YOU WAIT A FULL YEAR:{" "}
                <span className="text-red-400 font-semibold">$36,000+ Lost</span> in just one year of
                inaction
              </p>
            </div>
          </div>

          <div className="border border-vault-gold/30 bg-vault-gold/5 rounded-lg p-8 scroll-reveal delay-1">
            <h3 className="heading-md text-vault-cream mb-6">Transform Your Future:</h3>
            <ul className="space-y-3 mb-8">
              {[
                "Build credit score fast",
                "Access business funding",
                "Compete with confidence",
                "Achieve financial freedom",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-vault-muted">
                  <span className="text-vault-gold mt-1 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-vault-gold/30 pt-6 space-y-2">
              <p className="text-vault-cream font-semibold text-lg">
                ONE-TIME INVESTMENT: <span className="text-vault-gold">$1,197</span>
              </p>
              <p className="text-vault-muted text-sm">
                YOUR ROI IN YEAR 1:{" "}
                <span className="text-vault-gold font-semibold">3,000%+</span> Save $36K+ by investing
                $1,197 today
              </p>
            </div>
          </div>
        </div>

        <div className="text-center scroll-reveal">
          <a href="#pricing" className="btn-gold">
            Transform My Credit Now
          </a>
        </div>
      </div>
    </section>
  );
}
