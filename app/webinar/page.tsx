const ZOOM_REGISTRATION_URL =
  "https://us06web.zoom.us/meeting/register/5XAgJ7alT-WrQp-N9LQ1GQ";

export const metadata = {
  title:
    "Free Live Training: How Operators Doing $500K–$3M Get Approved for $50K–$250K in Funding — Capital Vault",
  description:
    "Even after the bank says no. 45-minute live training + live file teardown. Free. Reserve your spot now.",
};

const beats = [
  {
    num: "01",
    title: "Why the bank said no",
    body: "It's your file, not your business. Most denials are fixable — you just don't know what to fix.",
  },
  {
    num: "02",
    title: "The 3 things lenders actually score",
    body: "Banks don't see what you see. We'll show you exactly what gets flagged in your file.",
  },
  {
    num: "03",
    title: "The positioning move that flips a denial into an approval",
    body: "One structural change that changes how every lender reads your file from that point forward.",
  },
  {
    num: "04",
    title: "Live: how I'd structure YOUR file",
    body: "Real-time teardown. Bring your questions. We'll show you what the file looks like after the fix.",
  },
  {
    num: "05",
    title: "The offer",
    body: "If you want me to do this with you, I'll tell you exactly how it works and what it costs.",
  },
];

const objections = [
  {
    q: "My credit isn't great.",
    a: "Credit is one factor, not the deciding one. We've placed $185K for operators with sub-650 scores. The file tells the story — we show you how to tell a better one.",
  },
  {
    q: "I already got denied.",
    a: "That's the best time to attend. A denial letter shows us exactly what to fix. We do a live teardown — you'll leave knowing the specific move.",
  },
  {
    q: "I don't have time for another webinar.",
    a: "45 minutes. No pitch until the end. If the training doesn't show you something concrete, you leave early — no hard feelings.",
  },
];

export default function WebinarPage() {
  return (
    <main className="min-h-screen bg-vault-black py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-14">

        {/* HERO */}
        <section className="text-center space-y-5">
          <p className="kicker text-vault-gold">
            Free Live Training — Operators Doing $500K–$3M
          </p>
          <h1 className="heading-lg text-vault-cream leading-tight">
            How Operators Doing $500K–$3M Get Approved for{" "}
            <span className="text-vault-gold">$50K–$250K in Funding</span>
            <br />
            Even After the Bank Says No
          </h1>
          <p className="text-lg text-vault-muted max-w-xl mx-auto leading-relaxed">
            Free 45-minute live training + live file teardown. You'll leave
            knowing the exact move that turns a denial into an approval.
          </p>

          <div className="inline-flex items-center gap-3 bg-vault-gold/10 border border-vault-gold/30 rounded-xl px-5 py-3 text-sm font-semibold text-vault-gold">
            <span>📅</span>
            <span>Tuesday, June 24, 2026 · 12:00 PM ET · Live on Zoom</span>
          </div>

          <div className="pt-2">
            <a
              href={ZOOM_REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-base font-semibold inline-block"
            >
              Reserve My Spot — It's Free
            </a>
            <p className="text-xs text-vault-muted mt-3">
              Live on Zoom · 45 minutes · No credit pull required
            </p>
          </div>
        </section>

        {/* DIVIDER */}
        <div className="border-t border-vault-gold/10" />

        {/* WHAT YOU'LL LEARN */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-vault-cream text-center tracking-tight">
            What We Cover in 45 Minutes
          </h2>

          <div className="space-y-4">
            {beats.map(({ num, title, body }) => (
              <div
                key={num}
                className="flex gap-5 bg-vault-gold/5 border border-vault-gold/10 rounded-xl p-5"
              >
                <span className="kicker text-vault-gold/40 shrink-0 pt-0.5 w-6 text-right">
                  {num}
                </span>
                <div className="space-y-1">
                  <p className="font-semibold text-vault-cream text-sm">{title}</p>
                  <p className="text-sm text-vault-muted leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STATS BAR */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { stat: "$185K", label: "Placed in 23 days for a contractor denied by 3 banks" },
            { stat: "30 days", label: "Average from application to funded" },
            { stat: "$0", label: "Upfront fee until you're funded" },
          ].map(({ stat, label }) => (
            <div
              key={stat}
              className="bg-vault-gold/5 border border-vault-gold/10 rounded-xl p-4"
            >
              <p className="text-2xl font-bold text-vault-gold">{stat}</p>
              <p className="text-xs text-vault-muted mt-1 leading-snug">{label}</p>
            </div>
          ))}
        </div>

        {/* SECOND CTA */}
        <section className="text-center space-y-4 bg-vault-gold/5 border border-vault-gold/20 rounded-2xl p-8">
          <p className="kicker text-vault-gold">Seats Are Limited</p>
          <h3 className="text-xl font-bold text-vault-cream">
            You're One File Fix Away From a Yes
          </h3>
          <p className="text-sm text-vault-muted max-w-md mx-auto">
            Register now. Zoom link goes to your inbox immediately.
          </p>
          <a
            href={ZOOM_REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold text-sm font-semibold inline-block"
          >
            Reserve My Spot — It's Free
          </a>
        </section>

        {/* OBJECTION CRUSHERS */}
        <section className="space-y-5">
          <h2 className="text-lg font-bold text-vault-cream text-center">
            Common Questions
          </h2>
          <div className="space-y-4">
            {objections.map(({ q, a }) => (
              <div key={q} className="space-y-1.5">
                <p className="text-sm font-semibold text-vault-cream">{q}</p>
                <p className="text-sm text-vault-muted leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <div className="border-t border-vault-gold/10 pt-6 text-center space-y-1">
          <p className="text-xs text-vault-muted">
            © The Capital Vault · Abu Elhassan
          </p>
          <p className="text-xs text-vault-muted">
            No credit pull until you accept an offer · Results may vary ·{" "}
            <a
              href="/privacy"
              className="underline underline-offset-2 hover:text-vault-cream transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </div>

      </div>
    </main>
  );
}
