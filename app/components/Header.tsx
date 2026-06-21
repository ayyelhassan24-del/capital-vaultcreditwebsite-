"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Why Vault", href: "#why-vault" },
    { label: "Funding", href: "#funding" },
    { label: "How It Works", href: "#how-we-work" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-vault-black/95 backdrop-blur-md border-b border-hairline"
          : "bg-transparent"
      }`}
    >
      <nav className="container-vault flex items-center justify-between py-4 md:py-6">
        <a href="/" className="text-xl md:text-2xl font-serif font-bold text-vault-gold">
          THE VAULT
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-vault-muted hover:text-vault-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              document
                .getElementById("lead-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hidden md:inline-block btn-gold text-sm"
          >
            Get Started
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-6 h-6 flex flex-col justify-center gap-1.5"
          >
            <span
              className={`w-full h-0.5 bg-vault-gold transition-all ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-vault-gold transition-all ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-vault-gold transition-all ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-vault-black border-t border-hairline">
          <div className="container-vault py-6 flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-vault-muted hover:text-vault-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                document
                  .getElementById("lead-form")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-gold text-sm w-full"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
