import WebinarForm from "@/components/WebinarForm";

// ── Update these when you set the next webinar date ──────────────────────
const WEBINAR = {
  date: "Thursday, July 2, 2026",
  time: "7:00 PM CT",
  timeAlts: "8:00 PM ET / 5:00 PM PT",
  duration: "45 minutes live + Q&A",
  seats: "500",
};
// ─────────────────────────────────────────────────────────────────────────

export const metadata = {
  title:
    "Free Live Training: How Operators Doing $500K–$3M Get Approved for $50K–$250K in Funding — Capital Vault",
  description:
    "Even after the bank says no. 45-minute live training + live file teardown with Abu Elhassan. Free. Reserve your spot.",
};

const beats = [
  {
    n: "1",
    title: "Why the Bank Said No — And What It Actually Means",
    body: "The denial letter isn't a verdict. It's a map. We'll show you exactly what triggered it and why most denials are reversible in 30 to 60 days.",
  },
  {
    n: "2",
    title: "The 3 Things Lenders Actually Score",
    body: "Revenue is one factor. Banks run a 3-part scoring model most operators have never seen. We walk through all three live and show you where your file stands.",
  },
  {
    n: "3",
    title: "The Positioning Move That Flips a Denial Into an Approval",
    body: "One structural change to how your file is presented changes how every lender reads it. We've used this on hundreds of files. We'll show you the move.",
  },
  {
    n: "4",
    title: "Live: How I'd Structure YOUR File",
    body: "Real-time teardown. Bring your situation. We'll show you what the file looks like before and after the fix — and what to do first thing Monday.",
  },
  {
    n: "5",
    title: "The Offer",
    body: "If you want us to do this with you — $50K to $250K, structured and placed — I'll tell you exactly what that looks like and what it costs.",
  },
];

const testimonials = [
  {
    amount: "$185,000",
    tag: "Placed · 23 days",
    quote: "Three banks had said no. We restructured his file over one weekend and placed $185K across two rounds. He never gave up an ounce of equity.",
    name: "Contractor, Capital Vault placement",
  },
  {
    amount: "$1,300,000",
    tag: "Placed · 59 days",
    quote: "A contractor whose bank had told him no three separate times. Funded across 4 stacked rounds. Didn't give up a single share of equity.",
    name: "Capital Vault placement, 2025",
  },
  {
    amount: "$90,000",
    tag: "Placed · 17 days",
    quote: "Came in post-denial, convinced the process was broken. We restructured and placed $90K in under three weeks. He reinvested every dollar the same month.",
    name: "Service business owner",
  },
  {
    amount: "$250,000",
    tag: "Placed · 44 days",
    quote: "Seasonal business — bank said the revenue was 'inconsistent.' We positioned the seasonality as a strength. $250K landed. Lowest rate she'd ever seen.",
    name: "Retail operator",
  },
];

const forYou = [
  "You run a profitable business but the bank said no — and you still don't fully understand why.",
  "You've been told your revenue is 'inconsistent,' your industry is 'risky,' or your file 'needs work.' Nobody told you what that means.",
  "You need $50K to $250K to grow — buy equipment, hire, expand — and you refuse to give away equity.",
  "You've applied to 2, 3, maybe 4 lenders. Every one said no. You're starting to think the problem is your business. It's not.",
  "You want one expert to look at your file and tell you exactly what to fix — not a broker who charges a fee and disappears.",
];

const notForYou = [
  "You're looking for a fast cash advance at 40% interest. That's not what we do.",
  "You're pre-revenue or under $500K. Our system is built for established operators, not startups.",
  "You expect to watch and figure it out alone. Results happen when you execute with guidance.",
  "You're not willing to make changes to how your file is structured.",
  "You want someone to just hand you money. We build the path — you still have to walk it.",
];

const faqs = [
  {
    q: "My credit score is under 650. Can I still get funded?",
    a: "Credit is one input, not the deciding one. We've placed $185K for operators with sub-650 scores. The file as a whole tells the story — we show you how to make it tell a better one.",
  },
  {
    q: "I already got denied. Is this still worth attending?",
    a: "That's actually the best time to come. A denial letter shows us exactly what to fix. We'll do a live teardown — you leave knowing the specific move.",
  },
  {
    q: "How long does it actually take to get funded?",
    a: "Our average is 30 days from first call to funded. Some placements close in under 2 weeks. Outliers take 60 to 90 depending on the file.",
  },
  {
    q: "Will there be a replay?",
    a: "No replay is guaranteed. The live teardown happens on the call. Show up live or you miss it.",
  },
  {
    q: "What does working with Capital Vault cost?",
    a: "We cover the offer at the end of the training. No fee until you're funded — we only win when you win.",
  },
];

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-vault-black text-vault-cream">

      {/* URGENCY STRIP */}
      <div className="urgency-bar text-vault-ink text-center py-2.5 px-4 text-xs md:text-sm font-black tracking-wider uppercase">
        Free Live Training · {WEBINAR.date} at {WEBINAR.time} · Capped at {WEBINAR.seats} Seats · Registration Closes When Full
      </div>

      {/* HERO */}
      <section className="px-4 pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-10">
            <p className="kicker mb-6">
              Free Live Training &nbsp;·&nbsp; {WEBINAR.seats} Seats Only &nbsp;·&nbsp; {WEBINAR.date} at {WEBINAR.time}
            </p>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 max-w-5xl mx-auto">
              How Operators Doing{" "}
              <span className="text-vault-gold">$500K–$3M</span> Get Approved for{" "}
              <span className="text-vault-gold">$50K–$250K in Funding</span>
              <br />
              Even After the Bank Says No
            </h1>

            <p className="text-lg md:text-xl text-vault-muted max-w-3xl mx-auto leading-relaxed">
              The exact process I&apos;ve used to place over{" "}
              <span className="text-vault-gold font-semibold">$10,000,000</span> for{" "}
              <span className="text-vault-gold font-semibold">200+ business owners</span> —
              including{" "}
              <span className="text-vault-gold font-semibold">operators denied 3 times before they found us.</span>{" "}
              Free 45-minute live training. Live file teardown. No pitch until the end.
            </p>

            {/* AUTHORITY BAR */}
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 mt-10 text-sm md:text-base">
              {[
                { stat: "$10M+", label: "placed in 6 months" },
                { stat: "200+", label: "businesses funded" },
                { stat: "$1.3M", label: "single placement" },
                { stat: "$0", label: "equity required" },
              ].map(({ stat, label }) => (
                <div key={stat} className="flex items-center gap-2">
                  <span className="text-vault-gold font-black text-xl">{stat}</span>
                  <span className="text-vault-muted">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* EVENT CARD + FORM */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="card-vault-glow p-8">
              <h3 className="kicker mb-6">Live Training Details</h3>
              <div className="space-y-5">
                {[
                  { icon: "📅", label: "Date", value: WEBINAR.date },
                  { icon: "⏰", label: "Time", value: WEBINAR.time, sub: WEBINAR.timeAlts },
                  { icon: "⏱", label: "Duration", value: WEBINAR.duration },
                  { icon: "💵", label: "Cost", value: "Free" },
                  { icon: "🎁", label: "Live Attendee Bonus", value: "Live file teardown + Q&A" },
                ].map(({ icon, label, value, sub }) => (
                  <div key={label} className="flex items-start gap-4">
                    <span className="text-2xl">{icon}</span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-vault-muted">{label}</p>
                      <p className="text-lg font-semibold text-vault-cream">{value}</p>
                      {sub && <p className="text-sm text-vault-muted">{sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <WebinarForm />
          </div>
        </div>
      </section>

      {/* IS THIS YOU */}
      <section className="px-4 py-16 md:py-24 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-black mb-3">
            Is <span className="text-vault-gold">This You?</span>
          </h2>
          <p className="text-center text-vault-muted mb-12 max-w-2xl mx-auto">
            If three or more of these hit, this training was built for you.
          </p>
          <div className="space-y-4">
            {[
              "You run a profitable business but the bank said no — and you still don't fully understand why.",
              "You've been told your revenue is 'inconsistent,' your industry is 'risky,' or your file 'needs work.' Nobody told you what that means.",
              "You need $50K to $250K to grow — buy equipment, hire, expand — and you refuse to give away equity to get it.",
              "You've applied to 2, 3, maybe 4 lenders. Every one said no. You're starting to think the problem is your business. It's not.",
              "You want one expert to look at your file and tell you exactly what to fix — not a broker who charges a fee and disappears.",
              "You're done with predatory MCAs at 40% interest. You know there's a better path. You just need someone who actually knows it.",
            ].map((text) => (
              <div key={text} className="card-vault p-5 flex items-start gap-4">
                <span className="text-vault-gold text-2xl flex-shrink-0">→</span>
                <p className="text-vault-muted leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#register" className="btn-gold-gradient">
              Yes. Reserve My Seat →
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-black mb-3">
            Real Files. Real Numbers. <span className="text-vault-gold">Real Capital.</span>
          </h2>
          <p className="text-center text-vault-muted mb-12 max-w-2xl mx-auto">
            A few of the operators we&apos;ve placed in the last 6 months.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map(({ amount, tag, quote, name }) => (
              <div key={amount + name} className="card-vault p-8">
                <p className="text-2xl text-vault-gold font-black mb-1">{amount}</p>
                <p className="text-xs uppercase tracking-wider text-vault-muted mb-4">{tag}</p>
                <p className="text-vault-muted italic mb-4 leading-relaxed">&ldquo;{quote}&rdquo;</p>
                <p className="text-xs text-vault-muted">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY FREE */}
      <section className="px-4 py-16 md:py-24 bg-black">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-black mb-8">
            Why I&apos;m Doing This <span className="text-vault-gold">For Free.</span>
          </h2>
          <div className="space-y-5 text-vault-muted text-lg leading-relaxed">
            <p>You&apos;re probably wondering what the catch is.</p>
            <p>Fair question. Here&apos;s the honest answer.</p>
            <p>
              I run a funding placement business. I make money when I place capital for operators like you.
              That business runs on its own. It doesn&apos;t need this training to exist.
            </p>
            <p>
              This training exists because I&apos;ve watched{" "}
              <span className="text-vault-gold font-semibold">hundreds of operators</span> get burned —
              by brokers who charge upfront fees and disappear, by MCAs at 40% that destroy cash flow,
              by lenders who say no without explaining why. Most of those denials were fixable.
              Most of those operators just didn&apos;t know the right move.
            </p>
            <p>
              I&apos;d rather spend 45 minutes showing you the system I actually use —
              the one that has placed{" "}
              <span className="text-vault-gold font-semibold">$10M+ in the last 6 months</span> —
              than watch another hundred operators waste time on the wrong path.
            </p>
            <p>
              At the end I&apos;ll mention one offer. If you want to work with me directly, great.
              If not, you walk away with a complete picture of your file and exactly what to do next.{" "}
              <span className="text-vault-gold font-semibold">That&apos;s the deal.</span>
            </p>
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-black mb-3">
            What You&apos;ll Discover on the <span className="text-vault-gold">Live Training</span>
          </h2>
          <p className="text-center text-vault-muted mb-16 max-w-2xl mx-auto">
            45 minutes plus live Q&amp;A. No fluff. The system.
          </p>
          <div className="space-y-8">
            {beats.map(({ n, title, body }) => (
              <div key={n} className="flex gap-6 items-start">
                <div className="circle-gold">{n}</div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-vault-cream">{title}</h3>
                  <p className="text-vault-muted leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-4 py-16 md:py-24 bg-black">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-black mb-10">
            About Your <span className="text-vault-gold">Host</span>
          </h2>
          <div className="space-y-4 text-vault-muted text-lg leading-relaxed">
            <p>
              I&apos;m <span className="text-vault-gold font-semibold">Abu Elhassan</span>, founder of The Capital Vault.
            </p>
            <p>
              Over the last <span className="text-vault-gold font-semibold">6 months</span> I&apos;ve helped{" "}
              <span className="text-vault-gold font-semibold">200+ business owners</span> access more than{" "}
              <span className="text-vault-gold font-semibold">$10,000,000</span> in growth funding —
              including operators who had been turned down 3 and 4 times before they found me.
            </p>
            <p>
              I didn&apos;t come from finance. I came from 5 failed businesses, a psychology degree I never used,
              and a season where I was driving Uber at 2am to cover rent. The thing that changed everything
              was learning how capital actually works — not how banks explain it, but how it actually moves.
            </p>
            <p>
              That&apos;s what I&apos;m going to teach you on this training.{" "}
              <span className="text-vault-gold font-semibold">The real system. From someone using it right now.</span>
            </p>
          </div>
        </div>
      </section>

      {/* FOR / NOT FOR */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-black mb-12">
            Who This Training Is For. <span className="text-vault-gold">And Who It Isn&apos;t.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-vault-gold p-8">
              <h3 className="text-vault-gold text-xl font-bold mb-6 uppercase tracking-wider">
                This Is For You If:
              </h3>
              <ul className="space-y-4 text-vault-muted">
                {forYou.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-vault-gold flex-shrink-0 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-vault p-8">
              <h3 className="text-vault-muted text-xl font-bold mb-6 uppercase tracking-wider">
                This Is NOT For You If:
              </h3>
              <ul className="space-y-4 text-vault-muted">
                {notForYou.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-red-500 flex-shrink-0 font-bold">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16 md:py-24 bg-black">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-black mb-12">
            Common <span className="text-vault-gold">Questions</span>
          </h2>
          <div className="space-y-6">
            {faqs.map(({ q, a }) => (
              <div key={q} className="card-vault p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-bold mb-3 text-vault-gold">{q}</h3>
                <p className="text-vault-muted leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Your Capital <span className="text-vault-gold">Is Closer Than You Think.</span>
          </h2>
          <p className="text-lg text-vault-muted mb-10 max-w-2xl mx-auto">
            {WEBINAR.seats} seats. Live training. No replay. Live file teardown. Reserve yours.
          </p>
          <a href="#register" className="btn-gold-gradient">
            Reserve My Free Seat →
          </a>
          <p className="text-sm text-vault-muted mt-6">
            {WEBINAR.date} · {WEBINAR.time} · 45 minutes + live Q&amp;A · Free
          </p>

          <div className="card-vault mt-16 max-w-2xl mx-auto text-left p-6 md:p-8">
            <p className="kicker mb-3">P.S.</p>
            <p className="text-vault-muted leading-relaxed">
              Most people who register won&apos;t show up. That&apos;s fine. It means there is room for the ones who do.
              If you are one of the {WEBINAR.seats} who shows up live, you will walk away knowing exactly why your
              file got denied, what the fix is, and whether we are the right team to execute it with you.
              45 minutes. Free. {WEBINAR.date} at {WEBINAR.time}. Reserve your seat. The page closes when the cap is hit.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-4 py-12 text-center text-xs text-vault-muted space-y-3 border-t border-vault-border">
        <p>© 2026 The Capital Vault. All rights reserved.</p>
        <p className="max-w-3xl mx-auto leading-relaxed">
          <strong>Earnings Disclaimer:</strong> Results discussed are not typical. Individual outcomes
          depend on file strength, business history, and market conditions. Past placements are not a
          guarantee of future results. No credit pull until you accept an offer.
        </p>
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
