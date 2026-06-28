import Link from "next/link";

const WEBINAR = {
  date: "Thursday, July 2, 2026",
  time: "7:00 PM CT",
  timeAlts: "8:00 PM ET / 5:00 PM PT",
  zoomUrl: "https://us06web.zoom.us/meeting/register/5XAgJ7alT-WrQp-N9LQ1GQ",
};

export const metadata = {
  title: "You're Registered — Capital Vault Live Training",
  description: "Your seat is confirmed. See you on " + WEBINAR.date + " at " + WEBINAR.time + ".",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-vault-black text-vault-cream flex flex-col">

      {/* URGENCY STRIP */}
      <div className="urgency-bar text-vault-ink text-center py-2.5 px-4 text-xs md:text-sm font-black tracking-wider uppercase">
        Seat Confirmed · {WEBINAR.date} · {WEBINAR.time} · Show Up Live — No Replay
      </div>

      {/* HERO */}
      <section className="flex-1 px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">

          {/* Confirmation mark */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-vault-gold mb-10">
            <svg
              className="w-10 h-10 text-vault-gold"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <p className="kicker mb-4">Registration Confirmed</p>

          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            You&apos;re In.
          </h1>

          <p className="text-lg md:text-xl text-vault-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            Your seat is locked for the live training on{" "}
            <span className="text-vault-cream font-semibold">{WEBINAR.date}</span> at{" "}
            <span className="text-vault-cream font-semibold">{WEBINAR.time}</span>.
            Check your email for the confirmation — the Zoom link is in there.
          </p>

          {/* Join CTA */}
          <a
            href={WEBINAR.zoomUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-gradient inline-block mb-4"
          >
            Join the Webinar on Zoom →
          </a>
          <p className="text-xs text-vault-muted">
            Bookmark this link. The room opens 10 minutes before the training.
          </p>
        </div>
      </section>

      {/* EVENT DETAILS */}
      <section className="px-4 pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="card-vault-glow p-8 md:p-10">
            <h2 className="kicker mb-8 text-center">Your Training Details</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                { icon: "📅", label: "Date", value: WEBINAR.date },
                { icon: "⏰", label: "Time", value: WEBINAR.time, sub: WEBINAR.timeAlts },
                { icon: "⏱", label: "Duration", value: "45 min + Live Q&A" },
              ].map(({ icon, label, value, sub }) => (
                <div key={label} className="space-y-1">
                  <div className="text-3xl mb-3">{icon}</div>
                  <p className="text-xs uppercase tracking-wider text-vault-muted">{label}</p>
                  <p className="font-semibold text-vault-cream">{value}</p>
                  {sub && <p className="text-xs text-vault-muted">{sub}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT TO DO NEXT */}
      <section className="px-4 pb-20 md:pb-28 bg-black py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-black mb-12">
            Three Things to Do <span className="text-vault-gold">Right Now</span>
          </h2>
          <div className="space-y-6">
            {[
              {
                n: "1",
                title: "Add It to Your Calendar",
                body: "Block " + WEBINAR.date + " at " + WEBINAR.time + ". Treat it like a closing call — because that's what it is.",
              },
              {
                n: "2",
                title: "Show Up Live",
                body: "There is no replay. The live teardown happens on the call. If you're not in the room, you miss it. That's intentional.",
              },
              {
                n: "3",
                title: "Bring Your Situation",
                body: "Know your revenue, how many times you've applied, and what the denial said. We'll run a real teardown on the live call. The more specific you are, the more you leave with.",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex gap-6 items-start card-vault p-6">
                <div className="circle-gold flex-shrink-0">{n}</div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-vault-cream">{title}</h3>
                  <p className="text-vault-muted leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL REMINDER */}
      <section className="px-4 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-vault-muted text-lg leading-relaxed mb-8">
            Questions before the call?{" "}
            <a
              href="mailto:support@thecapitalvault.com"
              className="text-vault-gold underline underline-offset-4"
            >
              support@thecapitalvault.com
            </a>
          </p>
          <Link href="/register" className="text-sm text-vault-muted underline underline-offset-4 hover:text-vault-cream transition-colors">
            ← Back to the registration page
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-4 py-10 text-center text-xs text-vault-muted space-y-3 border-t border-vault-border">
        <p>© 2026 The Capital Vault. All rights reserved.</p>
        <p>
          <a href="/privacy" className="underline hover:text-vault-cream transition-colors">Privacy Policy</a>
          {" "}&nbsp;·&nbsp;{" "}
          <a href="/terms" className="underline hover:text-vault-cream transition-colors">Terms of Service</a>
          {" "}&nbsp;·&nbsp;{" "}
          <a href="mailto:support@thecapitalvault.com" className="underline hover:text-vault-cream transition-colors">Contact</a>
        </p>
      </footer>

    </main>
  );
}
