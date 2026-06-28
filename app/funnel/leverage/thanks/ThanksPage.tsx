"use client";

import "../../../FBads/fbads.css";

const YT_CHANNEL = "https://www.youtube.com/@AbuCEO";

export default function ThanksPage({ fontVariable }: { fontVariable: string }) {
  return (
    <div className={`fbads ${fontVariable}`}>

      {/* NAV */}
      <nav style={{
        background: "rgba(12,25,50,0.98)",
        borderBottom: "1px solid rgba(184,134,11,0.18)",
        padding: "10px 0",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div className="wrap nav-in">
          <a href="https://capital-vault-website.vercel.app/" className="nav-logo">
            <img
              src="/assets/logo.png"
              alt="The Capital Vault"
              height={52}
              onError={(e) => { (e.target as HTMLImageElement).src = "/assets/logo.svg"; }}
            />
          </a>
        </div>
      </nav>

      {/* ── CONFIRMATION HERO ─────────────────────────────────────── */}
      <section style={{ background: "var(--dark)", padding: "72px 0 64px", textAlign: "center" }}>
        <div className="wrap-sm">
          {/* Check badge */}
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "rgba(34,197,94,0.15)",
            border: "2px solid rgba(34,197,94,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <polyline points="4,12 9,17 20,6" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="hero-tag" style={{ marginBottom: 20 }}>
            Booking Confirmed
          </div>

          <h1 style={{
            fontSize: "clamp(30px, 4.5vw, 54px)", fontWeight: 800,
            color: "#fff", lineHeight: 1.06, margin: "0 auto 20px",
            maxWidth: 760, letterSpacing: "-0.015em",
          }}>
            Your Capital Assessment Call Is Booked.
          </h1>

          <p style={{
            fontSize: "clamp(16px, 1.8vw, 19px)",
            color: "rgba(255,255,255,0.65)",
            maxWidth: 560, margin: "0 auto 12px", lineHeight: 1.65,
          }}>
            Check your email for the confirmation and calendar invite. While you have a moment — see what we do and how we work on our YouTube channel below.
          </p>
        </div>

        {/* YouTube Channel CTA */}
        <div className="wrap" style={{ marginTop: 48 }}>
          <a
            href={YT_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              maxWidth: 720,
              margin: "0 auto",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(184,134,11,0.22)",
              borderRadius: 10,
              padding: "40px 48px",
              textDecoration: "none",
              transition: "border-color 0.2s, background 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "#FF0000",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em", margin: 0, marginBottom: 4 }}>
                  While you wait
                </p>
                <p style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
                  See What Capital Vault Does — On Camera
                </p>
              </div>
            </div>

            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16, lineHeight: 1.65, margin: "0 0 24px" }}>
              Our YouTube channel covers real funding stories, placement breakdowns, and exactly how we structure capital for service business owners. Watch a few before your call — it will make the conversation 10x faster.
            </p>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "var(--gold)", color: "#000",
              fontWeight: 700, fontSize: 15,
              padding: "12px 24px", borderRadius: 6,
            }}>
              Visit @AbuCEO on YouTube
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>
        </div>
      </section>

      {/* ── WHAT HAPPENS NEXT ────────────────────────────────────── */}
      <section className="sec" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <div className="tc" style={{ marginBottom: 48 }}>
            <div className="sec-eyebrow">What to Expect</div>
            <h2 className="sec-title" style={{ maxWidth: 640, margin: "0 auto" }}>
              Here Is Exactly What Happens Between Now and Funded
            </h2>
          </div>

          <div className="steps-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {[
              {
                num: "01",
                title: "You Get a Confirmation Email",
                desc: "A calendar invite is on its way to your inbox right now. Add it to your calendar. The invite includes a link to join and a brief prep checklist to have ready before the call.",
              },
              {
                num: "02",
                title: "Your 30-Minute Assessment Call",
                desc: "A senior Capital Vault advisor reviews your revenue, credit profile, and capital goals with you directly. By the end of the call, you will know exactly what your business qualifies for — including amount, terms, and timeline — or you will know why it does not.",
              },
              {
                num: "03",
                title: "Your Lender Match and Offer",
                desc: "If you qualify, we run your file through 500+ institutional lenders and surface your best options — with full terms you can review before committing to anything. Zero-percent programs are prioritized when your profile supports it.",
              },
              {
                num: "04",
                title: "Capital in Your Account",
                desc: "Once you accept an offer, funding typically reaches your business account in 5 to 11 business days. Fastest we have placed capital: 24 hours after approval. We collect nothing until funds land.",
              },
            ].map(({ num, title, desc }) => (
              <div key={num} className="step-card" style={{ gridColumn: "span 1" }}>
                <div className="step-num">{num}</div>
                <div className="step-title">{title}</div>
                <p className="step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── WHAT TO HAVE READY ───────────────────────────────────── */}
      <section className="sec" style={{ background: "var(--bg2)" }}>
        <div className="wrap-sm">
          <div className="tc" style={{ marginBottom: 40 }}>
            <div className="sec-eyebrow">Prepare Now</div>
            <h2 className="sec-title">What to Have Ready for Your Call</h2>
            <p className="sec-sub" style={{ margin: "16px auto 0", maxWidth: 540 }}>
              The more prepared you are, the faster we can work. Having these items ready means we can move from assessment to lender match in the same conversation.
            </p>
          </div>

          <div className="check-list">
            {[
              "Your estimated annual business revenue (exact or close — we will verify)",
              "How long your business has been operating",
              "What you intend to use the capital for (hiring, equipment, seasonal bridge, marketing, etc.)",
              "Your business EIN and the state you operate in",
              "A general sense of your personal credit score (approximate is fine)",
              "Whether you have any open bankruptcies or active tax liens — we ask this on every call",
            ].map((item) => (
              <div key={item} className="check-row">
                <div className="chk">
                  <svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3" /></svg>
                </div>
                <span className="check-text">{item}</span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 32, padding: "24px 28px",
            background: "var(--dark)", borderRadius: 8,
            borderLeft: "3px solid var(--gold2)",
          }}>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: "var(--gold2)", fontWeight: 700 }}>Important:</strong> You do not need perfect answers for any of these. The call is a review, not an interrogation. Come as you are — we will work through the details together.
            </p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── WHAT YOU WILL FIND OUT ───────────────────────────────── */}
      <section className="sec">
        <div className="wrap-sm">
          <div className="tc" style={{ marginBottom: 40 }}>
            <div className="sec-eyebrow">What You Are About to Learn</div>
            <h2 className="sec-title">By the End of Your Call, You Will Know</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              "The exact capital range your business is likely to qualify for — specific numbers, not ranges",
              "Whether a 0% promotional rate program applies to your profile",
              "Which lender categories are the best match for your business structure",
              "What your realistic funding timeline looks like end-to-end",
              "Whether anything in your current profile needs to be addressed before we submit",
              "The total cost of capital — what you pay, when you pay it, and what you never pay under any circumstances",
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 16, alignItems: "flex-start",
                padding: "16px 20px", background: "var(--card)",
                border: "1px solid var(--border)", borderRadius: 6,
              }}>
                <span style={{
                  flexShrink: 0, width: 28, height: 28, borderRadius: "50%",
                  background: "var(--gold-bg)", border: "1px solid var(--gold-border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 800, color: "var(--gold2)",
                }}>
                  {i + 1}
                </span>
                <p style={{ margin: 0, fontSize: 16, color: "var(--text)", fontWeight: 500, lineHeight: 1.5 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── SOCIAL PROOF REINFORCEMENT ───────────────────────────── */}
      <section className="sec-dark">
        <div className="wrap">
          <div className="tc" style={{ marginBottom: 40 }}>
            <div className="sec-eyebrow">You Are in Good Company</div>
            <h2 className="sec-title">Others Who Sat Where You Are Now</h2>
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
                q: "Our company was 18 months old and I was skeptical we would qualify for this level of capital. They identified lenders our bank had never presented. It changed our trajectory entirely.",
                name: "Terrence W.",
                role: "Service Business Owner · Houston, TX",
                init: "T",
              },
            ].map(({ q, name, role, init }) => (
              <div key={name} className="testi-card">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((s) => <span key={s} className="star">&#9733;</span>)}
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

      {/* ── REMINDER / FINAL ────────────────────────────────────── */}
      <div className="final-cta">
        <div className="wrap tc">
          <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)" }}>
            Your Call Is on the Calendar. We Will See You Then.
          </h2>
          <p style={{ maxWidth: 480, margin: "0 auto 32px", fontSize: 17 }}>
            If you need to reschedule, use the link in your confirmation email. Questions before the call? Reply directly to that email.
          </p>
          <p className="final-note">
            No credit inquiry required &nbsp;·&nbsp; No fees unless funded &nbsp;·&nbsp; The Capital Vault
          </p>
        </div>
      </div>

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
            This is an advertisement. Individual results vary and are not guaranteed. Approval is not guaranteed within any specific timeframe. Capital access is subject to lender approval, creditworthiness, and business revenue verification. The Capital Vault is a capital advisory firm and is not a direct lender — we do not make credit decisions or guarantee loan approval. Zero-percent rates refer to promotional APR periods only; standard rates apply upon expiration. Past client results are not indicative of future outcomes. This content is intended for informational purposes and does not constitute financial, legal, or tax advice.
          </p>
        </div>
      </footer>

    </div>
  );
}
