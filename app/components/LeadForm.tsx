"use client";

import IClosedWidget from "@/components/IClosedWidget";

export default function LeadForm() {
  return (
    <section id="lead-form" className="section-padding bg-vault-gold/5 border-y border-vault-border">
      <div className="container-vault">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-20 items-start">
          <div className="scroll-reveal">
            <p className="kicker text-vault-gold mb-4">LET&rsquo;S GO</p>
            <h2 className="heading-md text-vault-ink mb-8">Ready to Fund?</h2>
            <div className="space-y-6">
              {[
                "No equity loss",
                "5–23 day close",
                "500+ lenders competing for your deal",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <span className="text-vault-gold font-bold mt-1">✓</span>
                  <span className="text-vault-muted">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 scroll-reveal delay-1">
            <IClosedWidget />
          </div>
        </div>
      </div>
    </section>
  );
}
