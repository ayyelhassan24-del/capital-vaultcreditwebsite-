import VSLPlayer from "@/components/VSLPlayer";
import FunnelForm from "@/components/FunnelForm";

export const metadata = {
  title: "3+ Years Is Enough — Capital Vault",
  description: "If the bank keeps asking how long you've been in business, you're talking to the wrong lender.",
};

export default function ProfileFunnel() {
  return (
    <main className="min-h-screen bg-vault-black py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="text-center space-y-3">
          <p className="kicker text-vault-gold">HVAC OPERATORS — 3+ YEARS IN BUSINESS</p>
          <h1 className="heading-lg text-vault-cream leading-tight">
            3 Years of Growth, Clean Books,
            <br />
            <span className="text-vault-gold">And the Bank Still Said No. Here's Why.</span>
          </h1>
          <p className="text-lg text-vault-muted max-w-xl mx-auto">
            Watch this 8-minute training to see how operators with 3–8 years in business — even those with CPA-optimized tax returns — are still getting approved for $50K–$250K in capital this week.
          </p>
        </div>

        <VSLPlayer />

        <div className="grid sm:grid-cols-3 gap-4 text-center">
          {[
            { stat: "3 yrs", label: "Minimum — no 10-yr rule" },
            { stat: "Bank stmts", label: "Accepted instead of tax returns" },
            { stat: "500+", label: "Direct lenders competing for your deal" },
          ].map(({ stat, label }) => (
            <div key={stat} className="bg-vault-gold/5 border border-hairline rounded-xl p-4">
              <p className="text-2xl font-bold text-vault-gold">{stat}</p>
              <p className="text-sm text-vault-muted mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-vault-cream text-center">See If You Qualify — Takes 2 Minutes</h2>
          <FunnelForm
            source="meta_ads"
            campaign="profile"
            redirectPath="/funnel/profile/thanks"
            ctaLabel="Show Me My Options"
          />
        </div>

        <p className="text-xs text-vault-muted text-center">
          © The Capital Vault · No credit pull until you accept an offer · Results may vary
        </p>
      </div>
    </main>
  );
}
