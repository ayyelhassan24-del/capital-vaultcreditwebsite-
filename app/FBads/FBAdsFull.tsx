"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import "./fbads.css";

const THANKS_URL = "https://www.thecapitalvault.com/thanks";
const ICLOSED_ORIGIN = "https://app.iclosed.io";

export interface Variant {
  kicker: string;
  headline: string;
  accent: string;
  sub: string;
  cta: string;
  campaign: string;
}

const CASE_STUDIES = [
  {
    videoId: "eljkk2yf2k",
    label: "Cleaning Service",
    amount: "$90,000",
    desc: "Required capital to hire and deploy crews for commercial contract work. Placed at 0% interest within 4 days. Capital was deployed the same week — no high-interest debt, no equity dilution.",
    result: "Placed in 4 days · 0% interest",
  },
  {
    videoId: "1pyih2g3jq",
    label: "Transportation",
    amount: "$145,000",
    desc: "Deployed $145,000 at zero percent to expand fleet capacity and open new routes. Standard bank declined due to cash flow structure. Lender match resolved in 5 days.",
    result: "Placed in 5 days · 0% interest",
  },
  {
    videoId: "zc0sxrvn8t",
    label: "HVAC & Private Equity",
    amount: "$190,000",
    desc: "Following the sale of an HVAC company, returned for $190,000 in zero-percent capital to fund the next venture's marketing infrastructure. Placed in 6 days.",
    result: "Placed in 6 days · 0% interest",
  },
];

const FAQS = [
  {
    q: "Does this affect my personal credit score?",
    a: "Initial qualification requires only a soft inquiry — no impact to your score. A hard pull occurs only if you choose to proceed with a specific lender offer, and that decision rests entirely with you. The majority of our clients complete the full process without triggering a hard inquiry until they are ready to accept funding.",
  },
  {
    q: "How does zero percent interest work on a business loan?",
    a: "These are business credit line products issued with 0% promotional APR periods of 12 to 18 months. We structure the capital placement to maximize the duration of your zero-percent window, so you can deploy the capital and generate a return before standard rates apply. The clients you see above ran this same math.",
  },
  {
    q: "I have been declined by banks before. Does that disqualify me?",
    a: "Prior bank declines are the most common situation we encounter — and they are not disqualifying here. Traditional banks underwrite through models designed for salaried employees, not service businesses. Our 500+ lender network uses actual cash flow and business trajectory as their primary underwriting criteria. A bank's no is not our no.",
  },
  {
    q: "What are the minimum requirements?",
    a: "$500,000 or more in annual business revenue. At least 6 months in operation. Personal credit 620 or above. No open bankruptcies. Additional variables are reviewed on the assessment call — but if you meet those four, the conversation is worth having.",
  },
  {
    q: "What is a realistic funding timeline?",
    a: "Fastest documented placement: 24 hours post-approval. Typical range: 5 to 11 business days, depending on the lender and documentation response time. Your assessment call will produce an accurate estimate based on your specific file — not a generic range.",
  },
  {
    q: "What does this cost me?",
    a: "Nothing prior to funding. No consulting fee. No application fee. No retainer. Our compensation is collected from the lender at the point of placement — and only if placement occurs. Determining what your business qualifies for costs you nothing except a 30-minute call.",
  },
];

export default function FBAdsFull({ variant, fontVariable }: { variant: Variant; fontVariable: string }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (!event.origin.includes("iclosed.io")) return;
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        const isBookingDone =
          data?.type === "booking-confirmed" ||
          data?.type === "booking_confirmed" ||
          data?.type === "booking:confirmed" ||
          data?.type === "iclosed:booking:submitted" ||
          data?.event === "booking_confirmed" ||
          data?.event === "booking_complete" ||
          data?.status === "confirmed" ||
          data?.action === "booking_complete";
        if (isBookingDone) window.location.href = THANKS_URL;
      } catch {
        // non-JSON messages from the widget — ignore
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router]);

  return (
    <div className={`fbads ${fontVariable}`}>

      {/* NAV */}
      <nav className="nav" ref={navRef}>
        <div className="wrap nav-in">
          <a href="https://capital-vault-website.vercel.app/" className="nav-logo">
            <img
              src="/assets/logo.png"
              alt="The Capital Vault"
              height={52}
              onError={(e) => { (e.target as HTMLImageElement).src = "/assets/logo.svg"; }}
            />
          </a>
          <a href="#book-call" className="btn btn-gold btn-gold-sm">Schedule a Call</a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="wrap-sm">
          <div className="hero-tag">{variant.kicker}</div>
          <h1>
            {variant.headline}{" "}
            <span className="accent">{variant.accent}</span>
          </h1>
          <p className="hero-sub">{variant.sub}</p>
          <div className="hero-cta">
            <a href="#book-call" className="btn btn-gold btn-gold-lg">
              {variant.cta}
            </a>
            <span className="hero-note">
              No credit inquiry &nbsp;·&nbsp; No upfront fees &nbsp;·&nbsp; No obligation
            </span>
          </div>
        </div>
        <div className="wrap">
          <div className="video-wrap">
            <iframe
              src="https://fast.wistia.net/embed/iframe/gbn18kl7hv"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Capital Vault — Growth Capital Overview"
            />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────── */}
      <div className="stats-bar">
        <div className="wrap">
          <div className="stats-grid">
            {[
              { n: "$81M+",  l: "Capital Deployed" },
              { n: "500+",   l: "Institutional Lenders" },
              { n: "24 hrs", l: "Fastest Placement" },
              { n: "0%",     l: "Promotional Rate" },
            ].map(({ n, l }) => (
              <div key={n} className="stat">
                <span className="stat-n">{n}</span>
                <span className="stat-l">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── QUALIFY ───────────────────────────────────────────────── */}
      <section className="sec" id="qualify">
        <div className="wrap">
          <div className="qualify-intro">
            <div className="sec-eyebrow">Who This Is For</div>
            <h2 className="sec-title qualify-title">
              Your Business Generates Revenue.<br />The Capital System Was Not Built for You.
            </h2>
            <p className="sec-sub qualify-sub">
              Traditional banks score businesses through underwriting models designed for salaried employees — not contractors, not seasonal operators, not service businesses. Our 500+ lender network was built specifically for businesses like yours.
            </p>
          </div>

          <div className="qualify-grid">
            <div className="qualify-col">
              <div className="qualify-col-label qualify-col-yes">You Likely Qualify</div>
              <div className="check-list">
                {[
                  "$500,000 or more in annual business revenue",
                  "Operating for at least 6 months",
                  "Seeking capital to scale, hire, or manage seasonal cash flow",
                  "Unwilling to take on merchant cash advance rates or give up equity",
                  "Personal credit score 620 or above",
                ].map((item) => (
                  <div key={item} className="check-row">
                    <div className="chk">
                      <svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3" /></svg>
                    </div>
                    <span className="check-text">{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 28 }}>
                <a href="#book-call" className="btn btn-gold" style={{ maxWidth: "100%" }}>
                  Request Your Capital Assessment
                </a>
              </div>
            </div>

            <div className="qualify-col qualify-col-no-box">
              <div className="qualify-col-label qualify-col-no">This Program Is Not for You If</div>
              <p className="qualify-no-sub">
                We work exclusively with businesses we can serve. If any of the following apply, we will tell you clearly on the first call rather than waste your time.
              </p>
              <div className="x-list">
                {[
                  "Annual revenue below $500,000",
                  "Less than 6 months in operation",
                  "Open bankruptcy or active tax lien",
                  "Personal credit below 620",
                  "Seeking personal or consumer credit",
                ].map((item) => (
                  <div key={item} className="x-row">
                    <div className="xk">
                      <svg viewBox="0 0 12 12">
                        <line x1="2" y1="2" x2="10" y2="10" />
                        <line x1="10" y1="2" x2="2" y2="10" />
                      </svg>
                    </div>
                    <span className="x-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── CASE STUDIES ─────────────────────────────────────────── */}
      <section className="sec-dark">
        <div className="wrap">
          <div className="tc">
            <div className="sec-eyebrow">Documented Results</div>
            <h2 className="sec-title">
              Verified Client Placements
            </h2>
            <p className="sec-sub" style={{ margin: "0 auto", maxWidth: 640 }}>
              Each of the following represents a business that met our qualification criteria and completed the placement process. Watch them describe the experience directly.
            </p>
          </div>

          <div className="cases-grid">
            {CASE_STUDIES.map((cs) => (
              <div key={cs.videoId} className="case-card">
                <div className="case-vid">
                  <iframe
                    src={`https://fast.wistia.net/embed/iframe/${cs.videoId}`}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title={cs.label}
                  />
                </div>
                <div className="case-body">
                  <span className="case-label">{cs.label}</span>
                  <div className="case-amount">{cs.amount}</div>
                  <p className="case-desc">{cs.desc}</p>
                  <div className="case-hr" />
                  <div className="case-result">{cs.result}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="tc" style={{ marginTop: 52 }}>
            <a href="#book-call" className="btn btn-gold btn-gold-lg">
              Schedule Your Assessment Call
            </a>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── HOW IT WORKS ─────────────────────────────────────────── */}
      <section className="sec">
        <div className="wrap">
          <div className="tc">
            <div className="sec-eyebrow">The Process</div>
            <h2 className="sec-title">From Assessment to Funded — Three Steps</h2>
            <p className="sec-sub" style={{ margin: "0 auto", maxWidth: 580 }}>
              No committee reviews. No document loops that go nowhere. No terms that change after you have already agreed.
            </p>
          </div>

          <div className="steps-grid">
            {[
              {
                num: "01",
                title: "Capital Assessment Call",
                desc: "30 minutes with a senior advisor. We review your revenue, credit profile, and capital objectives. You receive a clear picture of what your business may qualify for — or an honest answer if it does not. No ambiguity.",
              },
              {
                num: "02",
                title: "Institutional Lender Match",
                desc: "We run your file against 500+ institutional lenders and present your strongest options with complete terms before you commit to anything. Zero-percent programs are prioritized when your profile qualifies.",
              },
              {
                num: "03",
                title: "Capital Placed",
                desc: "Funds reach your business account in as little as 24 hours post-approval. Standard timeline: 5 to 11 business days. You receive 12 to 18 months at 0% to deploy and build. Our fee is collected from the lender — only at close.",
              },
            ].map(({ num, title, desc }) => (
              <div key={num} className="step-card">
                <div className="step-num">{num}</div>
                <div className="step-title">{title}</div>
                <p className="step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <section className="sec-dark">
        <div className="wrap">
          <div className="tc">
            <div className="sec-eyebrow">Client Feedback</div>
            <h2 className="sec-title">From the Operators We Have Served</h2>
          </div>

          <div className="testi-grid">
            {[
              {
                q: "I had been declined by three institutions before speaking with Capital Vault. Within 11 days, we had $185,000 placed at zero percent. The impact on the business has been significant.",
                name: "Marcus R.",
                role: "General Contractor · Atlanta, GA",
                init: "M",
              },
              {
                q: "Seven days from the initial call to funded. The zero-percent structure meant I could actually afford to grow without interest charges eroding my margin every month.",
                name: "Derek J.",
                role: "HVAC Owner · Dallas, TX",
                init: "D",
              },
              {
                q: "Our company was 18 months old and I was skeptical we would qualify for this level of capital. They identified lenders our bank had never presented to us. It changed our trajectory entirely.",
                name: "Terrence W.",
                role: "Service Business Owner · Houston, TX",
                init: "T",
              },
            ].map(({ q, name, role, init }) => (
              <div key={name} className="testi-card">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="star">&#9733;</span>
                  ))}
                </div>
                <p className="testi-quote">&ldquo;{q}&rdquo;</p>
                <div className="testi-author">
                  <div className="testi-av">{init}</div>
                  <div>
                    <div className="testi-name">{name}</div>
                    <div className="testi-role">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="sec">
        <div className="wrap-xs">
          <div className="tc">
            <div className="sec-eyebrow">Due Diligence</div>
            <h2 className="sec-title">Frequently Asked Questions</h2>
          </div>

          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className="faq-item">
                <div
                  className="faq-q"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <div className={`faq-icon${openFaq === i ? " open" : ""}`}>
                    <svg viewBox="0 0 14 14">
                      <line x1="7" y1="1" x2="7" y2="13" />
                      <line x1="1" y1="7" x2="13" y2="7" />
                    </svg>
                  </div>
                </div>
                <div className={`faq-a${openFaq === i ? " open" : ""}`}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── GUARANTEE ─────────────────────────────────────────────── */}
      <section className="sec sec-alt">
        <div className="wrap">
          <div className="guarantee-box">
            <div className="g-badge">
              <div className="g-badge-top">Our</div>
              <div className="g-badge-mid">Zero<br />Risk</div>
              <div className="g-badge-bot">Commitment</div>
            </div>
            <div className="g-text">
              <h3>You Pay Nothing Until Capital Is Placed</h3>
              <p>
                No consulting fee. No application fee. No retainer of any kind. Our compensation is collected from the lender at the point of placement — and only if placement occurs. If we cannot place capital for your business, you leave the conversation having invested nothing but 30 minutes.
              </p>
              <p style={{ marginTop: 12 }}>
                That is the only commitment we ask you to make.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOK YOUR CALL ────────────────────────────────────────── */}
      <section className="sec" id="book-call">
        <div className="wrap">
          <div className="tc" style={{ marginBottom: 48 }}>
            <div className="sec-eyebrow">Schedule Your Assessment</div>
            <h2 className="sec-title">Request Your Free Capital Assessment</h2>
            <p className="sec-sub" style={{ margin: "0 auto", maxWidth: 560 }}>
              Select a time below. A senior advisor will review your business profile and provide a clear, direct answer on what your business qualifies for.
            </p>
          </div>

          <div className="cal-outer">
            <div
              className="iclosed-widget"
              data-url={`${ICLOSED_ORIGIN}/e/thecapitalvault/FBVault?redirect_url=${encodeURIComponent(THANKS_URL)}`}
              title="Business Funding with The Capital Vault"
              style={{ width: "100%", height: 620 }}
            />
            <Script
              src="https://app.iclosed.io/assets/widget.js"
              strategy="lazyOnload"
            />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <div className="final-cta">
        <div className="wrap tc">
          <h2>Your Business Is Producing.<br />Make the Capital Work For You.</h2>
          <p>
            One 30-minute call determines exactly what your business qualifies for. No fees. No obligation. No ambiguity.
          </p>
          <a href="#book-call" className="btn btn-gold btn-gold-lg">
            Schedule My Free Assessment
          </a>
          <p className="final-note">
            No credit inquiry required &nbsp;·&nbsp; No fees unless funded
          </p>
        </div>
      </div>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="site-footer">
        <div className="wrap footer-in">
          <a href="https://www.thecapitalvault.com/" className="footer-logo">
            <img
              src="/assets/logo.png"
              alt="The Capital Vault"
              height={44}
              style={{ width: "auto" }}
              onError={(e) => { (e.target as HTMLImageElement).src = "/assets/logo.svg"; }}
            />
          </a>
          <p className="footer-copy">&copy; 2026 The Capital Vault. All rights reserved.</p>
          <nav className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </nav>
        </div>
        <div className="wrap">
          <p className="footer-disc">
            This is an advertisement. Individual results vary and are not guaranteed. Approval is not guaranteed within any specific timeframe. Capital access is subject to lender approval, creditworthiness, and business revenue verification. The Capital Vault is a capital advisory firm and is not a direct lender — we do not make credit decisions or guarantee loan approval. Zero-percent rates refer to promotional APR periods only; standard rates apply upon expiration. Past client results are not indicative of future outcomes. This content is intended for informational purposes and does not constitute financial, legal, or tax advice.
          </p>
        </div>
      </footer>

    </div>
  );
}
