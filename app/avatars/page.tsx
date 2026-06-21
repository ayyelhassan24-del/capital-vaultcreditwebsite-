export const metadata = {
  title: "Avatar Profiles · Internal — Capital Vault",
  description: "Six HVAC contractor avatar profiles for ad targeting and funnel matching. Internal use only.",
};

const avatars = [
  {
    segment: "Leverage",
    name: "Equipment-Trap Eddie",
    revenue: "$1.0–1.4M",
    geography: "Sun Belt metro",
    age: "38–45",
    yearsInBusiness: "6–9",
    crew: "5–9 techs",
    fico: "680–720",
    existingDebt: "$280–340K equipment loans",
    painPoint:
      "\"Payroll is 9 days out. My AR is 45. The bank just passed.\"",
    capitalNeed: "$150–250K working capital",
    urgency: "7–14 days",
    lenderFit: "Revenue-based financing, MCA reset",
    channels: "ACCA newsletter, ServiceTitan blog, Nexstar YouTube",
    funnelUrl: "/funnel/leverage",
    adRef: "Ad 01 (DTI angle) · Ad 04 (payroll angle)",
  },
  {
    segment: "Leverage",
    name: "Growth-Strapped Greg",
    revenue: "$2.2–2.8M",
    geography: "Mid-Atlantic / Midwest",
    age: "42–52",
    yearsInBusiness: "10–14",
    crew: "14–22 techs",
    fico: "720+",
    existingDebt: "$600K SBA + $180K LOC",
    painPoint:
      "\"Lost a $1.4M school district bid because I couldn't show working capital.\"",
    capitalNeed: "$400–800K bridge for commercial contract bidding",
    urgency: "14–30 days",
    lenderFit: "Asset-based LOC, bridge financing",
    channels: "HVAC School podcast, Inc.com, Acquisitions Anonymous",
    funnelUrl: "/funnel/leverage",
    adRef: "Ad 01 (DTI angle) — test contract-win angle",
  },
  {
    segment: "Seasonality",
    name: "Seasonal-Crunch Carlos",
    revenue: "$600–900K",
    geography: "TX · FL · AZ · NV",
    age: "38–46",
    yearsInBusiness: "5–8",
    crew: "4–7 techs",
    fico: "620–660",
    existingDebt: "Personal cards (slow season bridge)",
    painPoint:
      "\"Bookings dropped 70%. I'm putting payroll on cards again.\"",
    capitalNeed: "$50–120K winter bridge",
    urgency: "7–21 days",
    lenderFit: "Short-term working capital, CDFI programs",
    channels: "Spanish-language trade Facebook groups, NHCA, WhatsApp networks",
    funnelUrl: "/funnel/seasonality",
    adRef: "Ad 02 (winter angle) — Spanish variant available",
  },
  {
    segment: "Seasonality",
    name: "Off-Season Wendy",
    revenue: "$800K–1.1M",
    geography: "Upper Midwest",
    age: "40–50",
    yearsInBusiness: "8–12",
    crew: "6–10 techs",
    fico: "660–700",
    existingDebt: "LOC pulled mid-summer",
    painPoint:
      "\"June P&L pulled my LOC. They want monthly stability I can't deliver in this trade.\"",
    capitalNeed: "$100–180K summer bridge + second truck",
    urgency: "30 days",
    lenderFit: "Equipment financing, seasonal LOC",
    channels: "HVAC School, Tom Reber (The Contractor Fight), trade Facebook",
    funnelUrl: "/funnel/seasonality",
    adRef: "Ad 05 (LOC pulled angle) — NEW",
  },
  {
    segment: "Profile",
    name: "Young-Shop Yolanda",
    revenue: "$550–750K",
    geography: "Suburban Sun Belt",
    age: "32–40",
    yearsInBusiness: "3–5",
    crew: "3–5 techs",
    fico: "700+",
    existingDebt: "Minimal — clean books",
    painPoint:
      "\"Three years of growth, clean books, and the bank's first question was tenure.\"",
    capitalNeed: "$50–100K first LOC + second van",
    urgency: "30 days",
    lenderFit: "Fintech LOC, revenue-based financing",
    channels: "Instagram women-in-trades creators, HVAC subreddit, NAWIC",
    funnelUrl: "/funnel/profile",
    adRef: "Ad 03 (tenure angle)",
  },
  {
    segment: "Profile",
    name: "Cash-Heavy Dan",
    revenue: "$1.2–1.6M",
    geography: "Regional metro",
    age: "45–55",
    yearsInBusiness: "12–18",
    crew: "8–12 techs",
    fico: "680–720",
    existingDebt: "Minimal — but CPA-optimized returns show low profit",
    painPoint:
      "\"Bank wants 3 years clean returns. Mine show what my CPA advised.\"",
    capitalNeed: "$300–700K acquisition capital (retiring competitor)",
    urgency: "30–60 days",
    lenderFit: "Stated-income financing, bank statement loans",
    channels: "Friend referrals, BNI, Service Roundtable, local Chamber",
    funnelUrl: "/funnel/profile",
    adRef: "Ad 06 (acquisition window angle) — NEW",
  },
];

const segmentColors: Record<string, string> = {
  Leverage: "text-blue-400 border-blue-400/30 bg-blue-400/5",
  Seasonality: "text-orange-400 border-orange-400/30 bg-orange-400/5",
  Profile: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
};

export default function AvatarsPage() {
  return (
    <main className="min-h-screen bg-vault-black py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">

        <div className="space-y-2">
          <p className="kicker text-vault-gold">Avatar Profiles · Internal</p>
          <h1 className="heading-lg text-vault-cream">6 HVAC Contractor Avatars</h1>
          <p className="text-vault-muted text-sm">
            Three rejection segments, two avatars each. Each avatar maps to a specific funnel,
            ad creative, and lender fit. Use these for targeting, copy, and pre-call research.
          </p>
        </div>

        <div className="grid gap-8">
          {avatars.map((a) => (
            <div
              key={a.name}
              className="border border-hairline bg-white/2 rounded-2xl overflow-hidden"
            >
              <div className="p-6 space-y-6">

                {/* Header */}
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-xs font-semibold border px-2 py-0.5 rounded ${segmentColors[a.segment]}`}
                      >
                        {a.segment}
                      </span>
                      <h2 className="text-lg font-bold text-vault-cream">{a.name}</h2>
                    </div>
                    <p className="text-xs text-vault-muted">{a.geography} · {a.age} · {a.yearsInBusiness} yrs · {a.crew}</p>
                  </div>
                  <a
                    href={a.funnelUrl}
                    className="text-xs text-vault-gold underline underline-offset-2 shrink-0"
                  >
                    → Funnel
                  </a>
                </div>

                {/* Pain point */}
                <div className="bg-vault-black border border-hairline rounded-xl px-5 py-4">
                  <p className="text-xs text-vault-muted mb-1 uppercase tracking-wider">In their own words</p>
                  <p className="text-vault-cream italic">{a.painPoint}</p>
                </div>

                {/* Stats grid */}
                <div className="grid sm:grid-cols-3 gap-3 text-xs">
                  {[
                    { label: "Revenue", value: a.revenue },
                    { label: "FICO", value: a.fico },
                    { label: "Existing Debt", value: a.existingDebt },
                    { label: "Capital Need", value: a.capitalNeed },
                    { label: "Urgency", value: a.urgency },
                    { label: "Lender Fit", value: a.lenderFit },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-vault-black border border-hairline rounded-lg p-3 space-y-0.5">
                      <p className="text-vault-muted uppercase tracking-wider">{label}</p>
                      <p className="text-vault-cream font-medium">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Channels + Ad ref */}
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-vault-black border border-hairline rounded-lg p-3 space-y-1">
                    <p className="text-vault-muted uppercase tracking-wider">Learning Channels</p>
                    <p className="text-vault-cream">{a.channels}</p>
                  </div>
                  <div className="bg-vault-black border border-hairline rounded-lg p-3 space-y-1">
                    <p className="text-vault-muted uppercase tracking-wider">Ad Creative</p>
                    <p className="text-vault-cream">{a.adRef}</p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-vault-muted text-center">
          Capital Vault · Internal Avatar Spec · Not customer-facing
        </p>
      </div>
    </main>
  );
}
