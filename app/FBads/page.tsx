import VSLPlayer from "@/components/VSLPlayer";
import FunnelForm from "@/components/FunnelForm";

const VARIANTS = {
  "1": {
    kicker: "DENIED OPERATORS · $500K TO $3M REVENUE",
    headline: "The bank didn't deny your business.",
    accent: "They denied your file.",
    sub: "Watch this 8-minute training to see how operators who got denied by every bank are still getting $50K–$250K in growth capital in under 30 days.",
    stats: [
      { stat: "$185K", label: "Funded in 23 days for an operator denied by 3 banks" },
      { stat: "200+", label: "Lenders who fund on revenue, not bank criteria" },
      { stat: "$0", label: "Fee until you're funded" },
    ],
    cta: "See What You Actually Qualify For",
    campaign: "meta_denied",
  },
  "2": {
    kicker: "GROWTH-TRAPPED FOUNDERS · $1M+ REVENUE",
    headline: "You're doing $1M a year",
    accent: "and still can't get capital. Here's why.",
    sub: "Watch this 8-minute training to see how founders with high leverage ratios are still accessing $50K–$250K using lenders that don't use DTI rules.",
    stats: [
      { stat: "200+", label: "Lenders that ignore DTI and debt ratios" },
      { stat: "30 days", label: "Average time from application to funded" },
      { stat: "$250K", label: "Max capital placed in a single round" },
    ],
    cta: "Check My Capital Options",
    campaign: "meta_growth",
  },
  "3": {
    kicker: "NEW BUSINESS OWNERS · LLC UNDER 2 YEARS",
    headline: "New LLC. Real revenue.",
    accent: "No access to capital. Here's the fix.",
    sub: "Watch this 8-minute training to see how business owners under 2 years old with real revenue are accessing $50K–$150K when every bank says no.",
    stats: [
      { stat: "40+", label: "Lenders that fund businesses under 2 years old" },
      { stat: "48 hrs", label: "Time to know your options" },
      { stat: "$0", label: "Fee until you're funded" },
    ],
    cta: "See If My Business Qualifies",
    campaign: "meta_newllc",
  },
  "4": {
    kicker: "CONTRACTORS & TRADES · $500K TO $3M REVENUE",
    headline: "Contractors with $280K in existing debt",
    accent: "are still getting funded. Here's how.",
    sub: "Watch this 8-minute training to see how contractors drowning in equipment loans and vehicle notes are still accessing $50K–$250K in working capital in under 7 days.",
    stats: [
      { stat: "$185K", label: "Placed for a contractor denied by 3 banks" },
      { stat: "7 days", label: "Typical funding timeline for contractors" },
      { stat: "$0", label: "Fee until you're funded" },
    ],
    cta: "Check My Contractor Options",
    campaign: "meta_contractor",
  },
} as const;

type Props = { searchParams: Promise<{ v?: string }> };

export async function generateMetadata({ searchParams }: Props) {
  const { v } = await searchParams;
  const variant = VARIANTS[(v as keyof typeof VARIANTS)] ?? VARIANTS["1"];
  return {
    title: `${variant.headline} ${variant.accent} | The Capital Vault`,
    description: variant.sub,
  };
}

export default async function FBAdsPage({ searchParams }: Props) {
  const { v } = await searchParams;
  const variant = VARIANTS[(v as keyof typeof VARIANTS)] ?? VARIANTS["1"];

  return (
    <main className="min-h-screen bg-vault-black py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Hero */}
        <div className="text-center space-y-4">
          <p className="kicker">{variant.kicker}</p>
          <h1 className="heading-lg text-vault-cream leading-tight">
            {variant.headline}
            <br />
            <span className="text-vault-gold">{variant.accent}</span>
          </h1>
          <p className="text-vault-muted text-lg max-w-2xl mx-auto">
            {variant.sub}
          </p>
        </div>

        {/* VSL */}
        <VSLPlayer />

        {/* Proof stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {variant.stats.map(({ stat, label }) => (
            <div key={stat} className="card-vault p-4">
              <p className="text-2xl font-bold text-vault-gold">{stat}</p>
              <p className="text-xs text-vault-muted mt-1 leading-snug">{label}</p>
            </div>
          ))}
        </div>

        {/* Lead form */}
        <div className="card-vault p-6 sm:p-8 space-y-4">
          <h2 className="heading-md text-vault-cream">
            Book Your Free Growth Diagnostic Call
          </h2>
          <p className="text-vault-muted text-sm">
            No credit pull. No commitment. We identify your best capital pathway or we keep working until we do.
          </p>
          <FunnelForm
            source="meta_ads"
            campaign={variant.campaign}
            redirectPath="/funnel/leverage/thanks"
            ctaLabel={variant.cta}
          />
        </div>

        {/* Footer + inline privacy policy */}
        <div className="border-t border-hairline pt-6 space-y-4 text-xs text-vault-muted" id="privacy">
          <p className="text-center">
            © The Capital Vault · No credit pull until you accept an offer · Results may vary
          </p>
          <div className="space-y-2">
            <p className="font-semibold text-vault-cream uppercase tracking-widest text-xs">Privacy Policy</p>
            <p>
              The Capital Vault collects only the information you voluntarily submit on this
              form (name, email, phone, revenue range). We use this data solely to contact you
              about business capital options. We do not sell, rent, or share your personal
              information with third parties except as necessary to facilitate your funding
              inquiry. Data is stored securely and you may request deletion at any time by
              emailing{" "}
              <a href="mailto:hello@thecapitalvault.com" className="underline text-vault-gold">
                hello@thecapitalvault.com
              </a>.
            </p>
            <p>
              By submitting this form you consent to being contacted by The Capital Vault via
              phone, email, or SMS regarding business capital services. This is not a loan
              commitment. Capital availability depends on lender underwriting criteria.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
