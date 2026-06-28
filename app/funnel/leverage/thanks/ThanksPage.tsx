"use client";

import { useEffect } from "react";
import "../../../FBads/fbads.css";

declare global {
  interface Window { fbq?: (...args: unknown[]) => void; }
}

const YT_CHANNEL = "https://www.youtube.com/@AbuCEO";

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
          <a
            href="https://www.thecapitalvault.com/"
            style={{
              textDecoration: "none",
              fontWeight: 800,
              fontSize: 17,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "#fff" }}>Capital</span>
            <span style={{ color: "var(--gold)" }}> Vault</span>
          </a>
        </div>
      </nav>

      {/* CONFIRMATION */}
      <section style={{ background: "var(--dark)", padding: "80px 0", textAlign: "center", flex: 1, display: "flex", alignItems: "center" }}>
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

          <h1 style={{
            fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800,
            color: "#fff", lineHeight: 1.08, margin: "0 auto 18px",
            maxWidth: 600, letterSpacing: "-0.015em",
          }}>
            You&rsquo;re Booked.
          </h1>

          <p style={{
            fontSize: "clamp(16px, 1.8vw, 18px)",
            color: "rgba(255,255,255,0.65)",
            maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.65,
          }}>
            Check your email for the calendar invite and call link. That&rsquo;s it &mdash; we&rsquo;ll see you on the call.
          </p>

          <a
            href={YT_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "var(--gold)", color: "#000",
              fontWeight: 700, fontSize: 15,
              padding: "13px 26px", borderRadius: 6, textDecoration: "none",
            }}
          >
            Watch @AbuCEO while you wait
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="wrap footer-in">
          <a
            href="https://www.thecapitalvault.com/"
            style={{
              textDecoration: "none",
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.85)" }}>Capital</span>
            <span style={{ color: "var(--gold)" }}> Vault</span>
          </a>
          <p className="footer-copy">&copy; 2026 The Capital Vault. All rights reserved.</p>
          <nav className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </nav>
        </div>
      </footer>

    </div>
  );
}
