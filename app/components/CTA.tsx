"use client";

export default function CTA() {
  return (
    <section className="py-20 md:py-32 bg-vault-bg border-t border-vault-border">
      <div className="container-vault scroll-reveal">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-end">
          <div>
            <h2 className="heading-lg text-vault-ink mb-6">
              One engagement.<br />
              <span className="text-vault-gold">Multiple competing lenders.</span>
            </h2>
            <p className="text-lg text-vault-muted max-w-[52ch] leading-relaxed">
              5 to 23 days from application to funded. No equity lost.
              No personal guarantee required. Your terms, not theirs.
            </p>
          </div>
          <div className="shrink-0">
            <button
              onClick={() =>
                document
                  .getElementById("lead-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-primary text-base px-8 py-4"
            >
              Get qualified today &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
