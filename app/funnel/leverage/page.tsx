import VSLPlayer from "@/components/VSLPlayer";
import FunnelForm from "@/components/FunnelForm";

export const metadata = {
  title: "200 Lenders Ignore DTI Rules — Capital Vault",
  description: "If your debt-to-income ratio is blocking your approval, we have lenders who fund on revenue, not ratios.",
};

export default function LeverageFunnel() {
  return (
    <main className="min-h-screen bg-vault-black py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="text-center space-y-3">
          <p className="kicker text-vault-gold">HVAC OPERATORS — $500K TO $3M REVENUE</p>
          <h1 className="heading-lg text-vault-cream leading-tight">
            Your Bank Said No Because of DTI.
            <br />
            <span className="text-vault-gold">200 Lenders Don't Use That Rule.</span>
          </h1>
          <p className="text-lg text-vault-muted max-w-xl mx-auto">
            Watch this 8-minute training to see exactly how contractors with $280K–$600K in existing debt are still getting approved for $50K–$250K in working capital — in under 7 days.
          </p>
        </div>

        <VSLPlayer />

        <div className="grid sm:grid-cols-3 gap-4 text-center">
          {[
            { stat: "200+", label: "Lenders ignore DTI ratios" },
            { stat: "7 days", label: "Typical funding timeline" },
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
            campaign="leverage"
            redirectPath="/funnel/leverage/thanks"
            ctaLabel="Check My Options Now"
          />
        </div>

        <p className="text-xs text-vault-muted text-center">
          © The Capital Vault · No credit pull until you accept an offer · Results may vary
        </p>
      </div>
    </main>
  );
}
