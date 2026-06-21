import VSLPlayer from "@/components/VSLPlayer";
import FunnelForm from "@/components/FunnelForm";

export const metadata = {
  title: "Free Training — How HVAC Operators Get Funded After the Bank Says No",
  description: "Watch this 8-minute training to see how contractors doing $500K–$3M get approved for $50K–$250K in funding, even after a bank denial.",
};

export default function VSLPage() {
  return (
    <main className="min-h-screen bg-vault-black py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="text-center space-y-3">
          <p className="kicker text-vault-gold">FREE TRAINING — HVAC CONTRACTORS</p>
          <h1 className="heading-lg text-vault-cream leading-tight">
            How Operators Doing $500K–$3M Get Approved
            <br />
            <span className="text-vault-gold">for $50K–$250K in Funding After the Bank Says No</span>
          </h1>
          <p className="text-lg text-vault-muted max-w-2xl mx-auto">
            Watch the full training below, then book a free 15-minute diagnostic to see exactly which lenders match your file.
          </p>
        </div>

        <VSLPlayer />

        <div className="grid sm:grid-cols-3 gap-4 text-center">
          {[
            { stat: "$10M+", label: "Placed for HVAC contractors" },
            { stat: "7 days", label: "Typical funding timeline" },
            { stat: "500+", label: "Direct lenders in the network" },
          ].map(({ stat, label }) => (
            <div key={stat} className="bg-vault-gold/5 border border-hairline rounded-xl p-4">
              <p className="text-2xl font-bold text-vault-gold">{stat}</p>
              <p className="text-sm text-vault-muted mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-vault-cream text-center">
            Ready to See Your Options? Takes 2 Minutes.
          </h2>
          <FunnelForm
            source="organic"
            campaign="vsl_generic"
            redirectPath="/funnel/leverage/thanks"
            ctaLabel="Book My Free Diagnostic Call"
          />
        </div>

        <p className="text-xs text-vault-muted text-center">
          © The Capital Vault · No credit pull until you accept an offer · Results may vary
        </p>
      </div>
    </main>
  );
}
