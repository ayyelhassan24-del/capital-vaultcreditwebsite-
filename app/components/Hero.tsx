"use client";

import VSLPlayer from "@/components/VSLPlayer";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen pt-20 md:pt-24 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-b from-vault-black via-vault-black/80 to-vault-black"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(10, 10, 10, 0.85) 50%, rgba(10, 10, 10, 0.95) 100%)`,
        }}
      />

      <div className="relative z-10 container-vault">
        <div className="grid md:grid-cols-[60%_40%] gap-12 lg:gap-16 items-center">
          <div className="space-y-6 md:space-y-8 scroll-reveal text-center md:text-left">
            <p className="kicker text-vault-gold">INSTITUTIONAL CAPITAL</p>

            <h1 className="heading-lg text-vault-cream">
              500+ Lenders. <br />
              Non-Dilutive Capital. <br />
              5–23 Days.
            </h1>

            <p className="text-lg md:text-xl text-vault-muted leading-relaxed">
              We connect established business operators with institutional lenders
              who fund fast, ask no equity questions, and close in weeks instead of
              months.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() =>
                  document
                    .getElementById("lead-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-gold"
              >
                Get Funded
              </button>
              <a href="#how-we-work" className="btn-outline">
                See How
              </a>
            </div>

            <div className="pt-8 border-t border-hairline">
              <p className="text-xs md:text-sm text-vault-muted uppercase tracking-widest mb-6">
                Trusted by operators building real companies
              </p>
              <div className="flex flex-wrap gap-8 md:gap-12">
                {["$500K–$3M ARR", "Bootstrapped", "Profitable"].map((tag) => (
                  <span
                    key={tag}
                    className="text-sm text-vault-muted font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex scroll-reveal delay-1 items-center justify-center">
            <VSLPlayer />
          </div>
        </div>
      </div>
    </section>
  );
}
