"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { CVLogoMark } from "./CVLogo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Funding",      href: "#funding" },
    { label: "Results",      href: "#case-study" },
    { label: "How it works", href: "#how-we-work" },
    { label: "FAQ",          href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-vault-bg/95 backdrop-blur-md shadow-[0_1px_0_rgba(26,24,20,0.10)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-[68px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <CVLogoMark size={34} />
          <span className="text-[13px] font-bold tracking-[0.18em] leading-none">
            <span className="text-vault-ink">CAPITAL </span>
            <span className="text-vault-gold">VAULT</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm text-vault-ink/65 hover:text-vault-ink transition-colors font-medium"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link href="#lead-form" className="btn-primary hidden md:inline-flex text-sm">
          Request a consultation
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-vault-ink"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {mobileOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="18" y1="4" x2="4"  y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="3" y1="6"  x2="19" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-vault-bg border-t border-vault-border px-5 pb-5 space-y-1">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium text-vault-ink/70 hover:text-vault-ink border-b border-vault-border last:border-0"
            >
              {l.label}
            </Link>
          ))}
          <Link href="#lead-form" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center mt-4 text-sm">
            Request a consultation
          </Link>
        </div>
      )}
    </header>
  );
}
