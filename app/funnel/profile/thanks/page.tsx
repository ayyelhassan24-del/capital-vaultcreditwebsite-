"use client";

import IClosedWidget from "@/components/IClosedWidget";

export default function ProfileThanks() {
  return (
    <main className="min-h-screen bg-vault-black py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-8 text-center">

        <div className="space-y-4">
          <div className="text-5xl">✓</div>
          <h1 className="heading-md text-vault-cream">You&rsquo;re in. One more step.</h1>
          <p className="text-vault-muted text-lg">
            Your info is submitted. Book a 15-minute diagnostic call below — we&rsquo;ll pull the exact lenders who work with your business profile and time-in-business. No credit pull on this call.
          </p>
        </div>

        <div className="bg-vault-gold/5 border border-hairline rounded-2xl p-4">
          <p className="text-sm text-vault-gold font-semibold mb-4 uppercase tracking-widest">Book Your Free 15-Min Diagnostic</p>
          <IClosedWidget />
        </div>

        <p className="text-xs text-vault-muted">
          © The Capital Vault · No credit pull until you accept an offer
        </p>
      </div>
    </main>
  );
}
