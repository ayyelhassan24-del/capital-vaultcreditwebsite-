"use client";

import Link from "next/link";

const metrics = [
  { value: "$80M+",   label: "Capital Deployed" },
  { value: "500+",    label: "Institutional Lenders" },
  { value: "16 Days", label: "Average Close" },
  { value: "94%",     label: "Approval Rate" },
];

export default function Hero() {
  return (
    <section className="relative w-full min-h-[100dvh] flex items-center overflow-hidden bg-vault-bg">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 lg:px-8 pt-24 pb-20">
        <div className="grid md:grid-cols-[58%_42%] gap-12 lg:gap-20 items-center">

          {/* Left — copy */}
          <div className="space-y-7 scroll-reveal">
            <h1 className="heading-display text-vault-ink">
              Make lenders{" "}
              <span className="text-vault-gold">compete</span>
              <br />for your capital.
            </h1>

            <p className="text-[1.05rem] text-vault-muted leading-relaxed max-w-[44ch]">
              One file goes in front of 500+ institutional lenders. You keep
              every point of equity and take the best rate on the table.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="#lead-form" className="btn-primary text-[0.9rem]">
                Request a consultation &rarr;
              </Link>
              <Link href="#funding" className="btn-secondary text-[0.9rem]">
                View funding options
              </Link>
            </div>
          </div>

          {/* Right — deal metrics panel */}
          <div className="hidden md:block scroll-reveal delay-2">
            <div className="border border-vault-gold/30">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`px-10 py-8 ${i < metrics.length - 1 ? "border-b border-vault-border" : ""}`}
                >
                  <p className="font-serif text-4xl lg:text-5xl font-bold text-vault-gold leading-none mb-2">
                    {m.value}
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] text-vault-muted">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
