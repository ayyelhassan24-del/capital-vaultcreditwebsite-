import VSLPlayer from "@/components/VSLPlayer";
import FunnelForm from "@/components/FunnelForm";

export const metadata = {
  title: "How Established Business Owners Unlock $50K–$250K in Growth Capital in 30 Days — The Capital Vault",
  description: "Without predatory debt, equity giveaways, or months of bank runaround. Watch the free training, then book your Growth Diagnostic Call.",
};

export default function VSLPage() {
  return (
    <main className="min-h-screen bg-vault-black py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        <div className="text-center space-y-3">
          <p className="kicker text-vault-gold">FREE TRAINING — OPERATORS DOING $500K–$3M</p>
          <h1 className="heading-lg text-vault-cream leading-tight">
            How Established Business Owners Are Unlocking
            <br />
            <span className="text-vault-gold">$50K–$250K in Growth Capital in 30–45 Days</span>
          </h1>
          <p className="text-lg text-vault-muted max-w-2xl mx-auto">
            Without predatory debt, equity giveaways, or months of bank runaround.
            Watch the free training below — then book your Growth Diagnostic Call.
          </p>
        </div>

        <VSLPlayer />

        <div className="grid sm:grid-cols-3 gap-4 text-center">
          {[
            { stat: "$185K", label: "Placed in 23 days for a contractor denied by 3 banks" },
            { stat: "30 days", label: "Average time from application to funded" },
            { stat: "$0", label: "Fee until you're funded" },
          ].map(({ stat, label }) => (
            <div key={stat} className="bg-vault-gold/5 border border-hairline rounded-xl p-4">
              <p className="text-2xl font-bold text-vault-gold">{stat}</p>
              <p className="text-sm text-vault-muted mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold text-vault-cream text-center">
            Book Your Free Growth Diagnostic Call
          </h2>
          <p className="text-sm text-vault-muted text-center">
            We identify at least one viable capital pathway for your business — or we keep working until we do.
          </p>
          <FunnelForm
            source="vsl"
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
