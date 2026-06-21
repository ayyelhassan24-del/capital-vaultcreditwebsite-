const problems = [
  "You make good money but your credit makes you look broke.",
  "You have a solid business plan but can't get funding to execute.",
  "You've tried credit repair but it didn't work.",
  "You're watching competitors with worse ideas get funded because their credit is better.",
  "You're tired of using personal credit cards with 29% interest to fund your dreams.",
];

export default function ProblemSection() {
  return (
    <section className="bg-vault-black section-padding">
      <div className="container-vault">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="space-y-4 scroll-reveal">
            <p className="kicker">THE PROBLEM</p>
            <h2 className="heading-lg text-vault-cream">
              Here&apos;s What Nobody Tells Business Owners About Credit...
            </h2>
          </div>

          <ul className="space-y-5 scroll-reveal delay-1">
            {problems.map((problem) => (
              <li key={problem} className="flex items-start gap-4">
                <span className="text-red-500 text-xl font-bold shrink-0 leading-snug">
                  ✗
                </span>
                <p className="text-vault-cream leading-relaxed">{problem}</p>
              </li>
            ))}
          </ul>

          <div className="border border-vault-gold/30 rounded-2xl p-6 bg-vault-gold/5 scroll-reveal delay-2">
            <p className="text-vault-gold text-lg font-semibold text-center">
              Traditional credit repair is built for employees — not entrepreneurs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
