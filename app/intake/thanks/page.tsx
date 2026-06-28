export const metadata = {
  title: "Application Received — Capital Vault",
};

export default function IntakeThanks() {
  return (
    <main className="min-h-screen bg-vault-black flex items-center justify-center px-4 py-16">
      <div className="max-w-lg mx-auto text-center space-y-8">

        <div className="w-16 h-16 rounded-full bg-vault-gold/10 border border-vault-gold/40 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-vault-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="space-y-3">
          <p className="kicker text-vault-gold">Application Received</p>
          <h1 className="heading-lg text-vault-cream">You&apos;re in the Queue</h1>
          <p className="text-vault-muted text-lg">
            Your capital profile is in the system. Your advisor will review your file and reach out within 24 hours with lender matches.
          </p>
        </div>

        <div className="card-vault text-left space-y-4 p-6">
          <p className="text-vault-cream font-semibold">What happens next:</p>
          <div className="space-y-3 text-vault-muted text-sm">
            {[
              "We match your profile against 200+ lenders",
              "Your advisor calls within 24 hours",
              "We submit to best-fit lenders on your behalf",
              "Funding in as few as 7 business days",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="shrink-0 w-5 h-5 rounded-full bg-vault-gold/10 border border-vault-gold/40 flex items-center justify-center text-xs text-vault-gold font-bold">
                  {i + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
