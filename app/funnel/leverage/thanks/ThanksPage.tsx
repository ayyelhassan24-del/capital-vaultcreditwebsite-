"use client";

import { useEffect } from "react";
import "../../../FBads/fbads.css";

declare global {
  interface Window { fbq?: (...args: unknown[]) => void; }
}

const YT_CHANNEL = "https://www.youtube.com/@AbuCEO";

const STEPS = [
  {
    n: "1",
    title: "Check Your Email",
    desc: "Your calendar invite and call link are already in your inbox. Accept the invite now so it's locked on your calendar.",
  },
  {
    n: "2",
    title: "Have Your Numbers Ready",
    desc: "Know your average monthly revenue and roughly what's in the bank. We use these to show you what you actually qualify for on the call.",
  },
  {
    n: "3",
    title: "Show Up On Time",
    desc: "This is a live working session, not a pitch. Be somewhere quiet for the full block so we can map your capital options properly.",
  },
];

export default function ThanksPage({ fontVariable }: { fontVariable: string }) {
  useEffect(() => {
    window.fbq?.("track", "Lead", {
      content_name: "Call Booked",
      value: 7500,
      currency: "USD",
    });
  }, []);

  return (
    <div className={`fbads ${fontVariable}`} style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* NAV */}
      <nav style={{
        background: "rgba(12,25,50,0.98)",
        borderBottom: "1px solid rgba(184,134,11,0.18)",
        padding: "10px 0",
      }}>
        <div className="wrap nav-in">
          <a href="https://www.thecapitalvault.com/" className="nav-logo">
            <img
              src="/assets/logo.png"
              alt="The Capital Vault"
              height={48}
              onError={(e) => { (e.target as HTMLImageElement).src = "/assets/logo.svg"; }}
            />
          </a>
        </div>
      </nav>

      {/* CONFIRMATION HERO */}
      <section style={{ background: "var(--dark)", padding: "84px 0 72px", textAlign: "center" }}>
        <div className="wrap-sm">
          {/* Check badge */}
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "rgba(34,197,94,0.15)",
            border: "2px solid rgba(34,197,94,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 28px",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <polyline points="4,12 9,17 20,6" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="sec-eyebrow" style={{ color: "var(--gold2)" }}>Your Call Is Confirmed</div>

          <h1 style={{
            fontSize: "clamp(30px, 4.4vw, 50px)", fontWeight: 900,
            color: "#fff", lineHeight: 1.06, margin: "0 auto 18px",
            maxWidth: 640, letterSpacing: "-0.02em",
          }}>
            You&rsquo;re Booked. Now Let&rsquo;s Make It Count.
          </h1>

          <p style={{
            fontSize: "clamp(16px, 1.8vw, 18px)",
            color: "rgba(255,255,255,0.65)",
            maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.65,
          }}>
            Your capital assessment call is locked in. The calendar invite and call link are in your email right now. Do these three things before we talk.
          </p>

          <a
            href={YT_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, width: "auto", maxWidth: "none" }}
          >
            Watch @AbuCEO while you wait
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="sec" style={{ flex: 1 }}>
        <div className="wrap tc">
          <div className="sec-eyebrow">Before The Call</div>
          <h2 className="sec-title" style={{ maxWidth: 720, margin: "0 auto 16px" }}>
            Three Things That Decide What You Walk Away With
          </h2>
          <p className="sec-sub" style={{ maxWidth: 560, margin: "0 auto" }}>
            Operators who do these get a real funding plan on the call. The ones who don&rsquo;t get a reschedule.
          </p>

          <div className="steps-grid" style={{ textAlign: "left" }}>
            {STEPS.map((s) => (
              <div key={s.n} className="step-card">
                <div className="step-num">{s.n}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
            This is an advertisement. Individual results vary and are not guaranteed. Approval is not guaranteed within any specific timeframe. Capital access is subject to lender approval, creditworthiness, and business revenue verification. The Capital Vault is a capital advisory firm and is not a direct lender &mdash; we do not make credit decisions or guarantee loan approval. Zero-percent rates refer to promotional APR periods only; standard rates apply upon expiration. Past client results are not indicative of future outcomes. This content is intended for informational purposes and does not constitute financial, legal, or tax advice. This site is not part of the Facebook website or Meta Platforms, Inc. Additionally, this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of Meta Platforms, Inc.
          </p>
        </div>
      </footer>

    </div>
  );
}
