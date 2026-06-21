const timeline = [
  {
    day: "DAY 1",
    items: ["Credit Score 510", "7 Rejections", "Zero Hope"],
  },
  {
    day: "DAY 30",
    items: ["Credit Score 600+", "3 Negatives Removed", "First Approval"],
  },
  {
    day: "DAY 62",
    items: ["Credit Score 697", "$100K+ Funding", "Business Launched"],
  },
];

export default function FounderStory() {
  return (
    <section className="bg-vault-gold/5 border-y border-hairline section-padding">
      <div className="container-vault space-y-12">
        <div className="space-y-6 max-w-3xl scroll-reveal">
          <p className="kicker">FOUNDER&apos;S STORY</p>
          <h2 className="heading-lg text-vault-cream">
            My Shameful Secret That Almost Killed My Dreams...
          </h2>
          <p className="text-vault-muted leading-relaxed">
            Hey, I&apos;m Abu Elhassan, founder of The Capital Vault. I&apos;m
            not one of those fake &ldquo;credit gurus.&rdquo; I started with
            nothing — literally. I came to this country as an immigrant with a
            510 credit score. Not 601. Not 550. Five. Ten. Flat. Every bank,
            every lender, every opportunity… REJECTED.
          </p>

          <blockquote className="border-l-4 border-vault-gold pl-6 py-2">
            <p className="text-vault-cream italic text-lg leading-relaxed">
              &ldquo;After my 7th loan rejection, I questioned if the American
              Dream was real for immigrants like me.&rdquo;
            </p>
          </blockquote>

          <p className="text-vault-muted leading-relaxed">
            I had two choices: Give up and accept I&apos;d always work for
            someone else. Figure out the credit game — and take control of my
            future.
          </p>
        </div>

        <div className="space-y-6 scroll-reveal delay-2">
          <h3 className="heading-md text-vault-cream">
            62 Days That Changed Everything
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {timeline.map((item) => (
              <div
                key={item.day}
                className="bg-vault-black border border-hairline rounded-2xl p-6 space-y-4"
              >
                <p className="kicker">{item.day}</p>
                <ul className="space-y-2">
                  {item.items.map((line) => (
                    <li key={line} className="text-vault-cream text-sm flex items-start gap-2">
                      <span className="text-vault-gold mt-0.5">→</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="text-vault-muted leading-relaxed max-w-3xl scroll-reveal delay-3">
          That $100K in 0% business funding? I used it to start The Capital
          Vault. Today? We&apos;ve helped 247+ business owners secure over $7.8M
          in funding.
        </p>
      </div>
    </section>
  );
}
