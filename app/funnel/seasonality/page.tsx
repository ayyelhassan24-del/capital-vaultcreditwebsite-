import VSLPlayer from "@/components/VSLPlayer";
import FunnelForm from "@/components/FunnelForm";

export const metadata = {
  title: "Lenders Who Get Seasonal HVAC — Capital Vault",
  description: "When your revenue dips 65% in winter, your bank walks. We have lenders who fund seasonal operators.",
};

export default function SeasonalityFunnel() {
  return (
    <main className="min-h-screen bg-vault-black py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="text-center space-y-3">
          <p className="kicker text-vault-gold">SEASONAL HVAC OPERATORS — TX · FL · AZ · NV · MI · OH</p>
          <h1 className="heading-lg text-vault-cream leading-tight">
            Your Bank Looked at Your Off-Season P&L
            <br />
            <span className="text-vault-gold">and Walked. Our Lenders Expected It.</span>
          </h1>
          <p className="text-lg text-vault-muted max-w-xl mx-auto">
            Watch this 8-minute training to see how seasonal contractors are getting funded during the slow months — no personal card needed, bridge loans close in under 7 days.
          </p>
        </div>

        <VSLPlayer />

        <div className="grid sm:grid-cols-3 gap-4 text-center">
          {[
            { stat: "7 days", label: "Bridge funding timeline" },
            { stat: "No lien", label: "On personal assets" },
            { stat: "$0", label: "Fee until you're funded" },
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
            campaign="seasonality"
            redirectPath="/funnel/seasonality/thanks"
            ctaLabel="Find My Winter Bridge Now"
          />
        </div>

        <p className="text-xs text-vault-muted text-center">
          © The Capital Vault · No credit pull until you accept an offer · Results may vary
        </p>
      </div>
    </main>
  );
}
