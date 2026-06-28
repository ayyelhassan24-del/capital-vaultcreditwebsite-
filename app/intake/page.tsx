import IntakeForm from "@/components/IntakeForm";

export const metadata = {
  title: "Client Application — Capital Vault",
  description: "Complete your business capital intake form. We match you with 200+ lenders and handle the submission.",
};

export default function IntakePage() {
  return (
    <main className="min-h-screen bg-vault-black py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="text-center space-y-3">
          <p className="kicker text-vault-gold">CAPITAL VAULT — SECURE CLIENT INTAKE</p>
          <h1 className="heading-lg text-vault-cream leading-tight">
            Your Business<br />
            <span className="text-vault-gold">Capital Profile</span>
          </h1>
          <p className="text-vault-muted max-w-lg mx-auto">
            Complete this once. We use it to match your profile against 200+ lenders and submit on your behalf — no back-and-forth.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-vault-gold/5 border border-hairline rounded-xl p-4">
          <svg className="w-5 h-5 text-vault-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-sm text-vault-muted">256-bit encrypted. Your information goes directly to your Capital Vault advisor — never sold, never shared.</p>
        </div>

        <IntakeForm />

        <p className="text-xs text-vault-muted text-center">
          © The Capital Vault · No credit pull until you accept an offer
        </p>

      </div>
    </main>
  );
}
