export const metadata = {
  title: "You're In — Book Your Diagnostic Call",
};

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/capitalvault";

export default function SeasonalityThanks() {
  return (
    <main className="min-h-screen bg-vault-black py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-8 text-center">

        <div className="space-y-4">
          <div className="text-5xl">✓</div>
          <h1 className="heading-md text-vault-cream">You're in. One more step.</h1>
          <p className="text-vault-muted text-lg">
            Your info is submitted. Book a 15-minute diagnostic call below and we'll identify the exact bridge product that covers your off-season — no credit pull on this call.
          </p>
        </div>

        <div className="bg-vault-gold/5 border border-hairline rounded-2xl p-4">
          <p className="text-sm text-vault-gold font-semibold mb-4 uppercase tracking-widest">Book Your Free 15-Min Diagnostic</p>
          <iframe
            src={`${calendlyUrl}?embed_type=Inline&hide_event_type_details=1&hide_gdpr_banner=1`}
            className="w-full rounded-lg border border-hairline"
            style={{ minHeight: "600px" }}
            title="Book Your Diagnostic Call"
          />
        </div>

        <p className="text-xs text-vault-muted">
          © The Capital Vault · No credit pull until you accept an offer
        </p>
      </div>
    </main>
  );
}
