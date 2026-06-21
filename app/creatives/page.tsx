export const metadata = {
  title: "Creatives Spec · Internal — Capital Vault",
  description: "Ad creative specs for all three HVAC avatar segments. Internal use only.",
};

const ads = [
  // ─── EXISTING 3 ───────────────────────────────────────────────────────────
  {
    id: "01",
    segment: "Leverage",
    avatar: "Equipment-Trap Eddie",
    hook: "Bank said DTI too high.\nWe have 200 lenders who don't care.",
    body: "You're not over-leveraged. You're growing. $280K–$600K in equipment loans is a sign of a real operation — not a red flag. Our 200+ direct lenders fund HVAC contractors on revenue, not debt ratios. $50K–$250K in working capital, deployed in 7 days. No fee until you're funded.",
    headlines: [
      "HVAC: $50K–$250K in 7 days",
      "200 lenders ignore DTI rules",
      "Stop letting equipment debt block growth",
    ],
    funnelUrl: "/funnel/leverage",
    audience: "Equipment-Trap Eddie · 38–45 · $1M–$1.4M revenue · ServiceTitan + ACCA signals",
    utmContent: "ad01_leverage_dti",
    budget: "40%",
    optimizeTrigger: "CTR < 1.5% or CPL > $30 at day 7",
  },
  {
    id: "02",
    segment: "Seasonality",
    avatar: "Seasonal-Crunch Carlos",
    hook: "Winter killed your bank file.\nWe fund through it.",
    body: "When 65% of your revenue disappears October through March, your tax return tells the wrong story. We have lenders who specialize in seasonal trades — they've seen this file before. Short-term bridge capital in under 7 days. No lien on personal assets. No fee until funded.",
    headlines: [
      "HVAC winter bridge in 7 days",
      "Lenders who get seasonal HVAC",
      "Stop carrying winter on personal cards",
    ],
    funnelUrl: "/funnel/seasonality",
    audience: "Seasonal-Crunch Carlos · 38–46 · $600K–$900K · TX/FL/AZ/NV · Spanish variant available",
    utmContent: "ad02_seasonality_winter",
    budget: "35%",
    optimizeTrigger: "CTR < 1.5% or CPL > $30 at day 7",
  },
  {
    id: "03",
    segment: "Profile",
    avatar: "Young-Shop Yolanda",
    hook: "Bank's rule. Not ours.",
    body: "The bank wants 10 years. You have 3. That's their problem, not yours. Our fintech lenders fund operators with 3+ years, clean revenue, and a profile the traditional system can't read. $50K–$100K in your first LOC, without the decade-long waiting period.",
    headlines: [
      "3+ years is enough for our lenders",
      "Cash-heavy file? 500 lenders fit you",
      "HVAC LOC without the 10-year rule",
    ],
    funnelUrl: "/funnel/profile",
    audience: "Young-Shop Yolanda · 32–40 · $550K–$750K · suburban Sun Belt · NAWIC + HVAC subreddit",
    utmContent: "ad03_profile_tenure",
    budget: "25%",
    optimizeTrigger: "CTR < 1.5% or CPL > $30 at day 7",
  },
  // ─── 3 NEW VARIATIONS ─────────────────────────────────────────────────────
  {
    id: "04",
    segment: "Leverage",
    avatar: "Equipment-Trap Eddie — Payroll Angle",
    hook: "Payroll is Friday.\nAR is 45 days out.\nBank's queue is 6 weeks.",
    body: "You have the revenue. You have the contracts. What you don't have is a lender who moves in real time. We match HVAC operators to 200+ direct lenders who fund on revenue — not on how many equipment loans you're carrying. $150K–$250K in working capital, closed in 7 days or less. No fee until the money lands.",
    headlines: [
      "HVAC payroll gap funded in 7 days",
      "Revenue-based capital, no DTI math",
      "200 lenders don't care about equipment debt",
    ],
    funnelUrl: "/funnel/leverage",
    audience: "Equipment-Trap Eddie · 38–45 · $1M–$1.4M · 5–9 techs · $280K+ equipment debt · 9-day payroll urgency",
    utmContent: "ad04_leverage_payroll",
    budget: "Test at $20/day alongside Ad 01 — pause the lower CPL at day 7",
    optimizeTrigger: "CPL > $35 at day 5 → kill",
  },
  {
    id: "05",
    segment: "Seasonality",
    avatar: "Off-Season Wendy — LOC Pulled",
    hook: "They pulled your LOC because your June P&L looked weak.\nEvery HVAC company's June P&L looks like that.",
    body: "Banks see a summer dip and panic. We see 8–12 years of a business that knows exactly how HVAC cashflow works. Operators who get their lines cut mid-season shouldn't have to bridge on personal cards. We match you to lenders who understand seasonal trades and close in under 7 days.",
    headlines: [
      "HVAC slow-season LOC replacement",
      "Lenders who understand HVAC seasonality",
      "Don't bridge summer on personal cards",
    ],
    funnelUrl: "/funnel/seasonality",
    audience: "Off-Season Wendy · 40–50 · $800K–$1.1M · Upper Midwest · Tom Reber / The Contractor Fight signals",
    utmContent: "ad05_seasonality_loc",
    budget: "Test at $20/day alongside Ad 02 — compare CPL at day 7",
    optimizeTrigger: "CPL > $35 at day 5 → kill",
  },
  {
    id: "06",
    segment: "Profile",
    avatar: "Cash-Heavy Dan — Acquisition Window",
    hook: "Your competitor is retiring.\nThe window is 60 days.\nBanks take 90.",
    body: "A $1M+ HVAC shop doesn't come up for sale twice. When it does, the bank's 90-day underwriting process kills the deal before you're approved. We place $300K–$700K in acquisition capital using bank statements — not CPA-optimized returns, not a decade of clean filings. Funded in under 30 days. No equity stake ever.",
    headlines: [
      "HVAC acquisition capital in 30 days",
      "Close the deal before the bank wakes up",
      "Bank statements, not tax returns — $300K–$700K",
    ],
    funnelUrl: "/funnel/profile",
    audience: "Cash-Heavy Dan · 45–55 · $1.2M–$1.6M · BNI / Service Roundtable / local Chamber signals",
    utmContent: "ad06_profile_acquisition",
    budget: "Test at $20/day against Ad 03 — acquisition angle for higher-revenue segment",
    optimizeTrigger: "CPL > $45 acceptable (higher-value client) — watch cost-per-booked-call instead",
  },
];

export default function CreativesPage() {
  return (
    <main className="min-h-screen bg-vault-black py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-12">

        <div className="space-y-2">
          <p className="kicker text-vault-gold">Creatives Spec · Internal</p>
          <h1 className="heading-lg text-vault-cream">Ad Creative Library</h1>
          <p className="text-vault-muted text-sm">
            6 ads across 3 avatar segments. Ads 01–03 are live. Ads 04–06 are new test variations.
            Run each new ad at $20/day against its parent — kill on CPL signal at day 5–7.
          </p>
        </div>

        <div className="space-y-10">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className={`border rounded-2xl overflow-hidden ${
                parseInt(ad.id) > 3
                  ? "border-vault-gold/40 bg-vault-gold/5"
                  : "border-hairline bg-white/2"
              }`}
            >
              <div className="p-6 space-y-6">

                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-vault-black bg-vault-gold px-2 py-0.5 rounded">
                        AD {ad.id}
                      </span>
                      <span className="text-xs text-vault-muted border border-hairline px-2 py-0.5 rounded">
                        {ad.segment}
                      </span>
                      {parseInt(ad.id) > 3 && (
                        <span className="text-xs text-vault-gold border border-vault-gold/40 px-2 py-0.5 rounded">
                          NEW VARIATION
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-vault-muted">{ad.avatar}</p>
                  </div>
                  <a
                    href={ad.funnelUrl}
                    className="text-xs text-vault-gold underline underline-offset-2 shrink-0"
                  >
                    → Funnel
                  </a>
                </div>

                {/* Hook */}
                <div className="bg-vault-black border border-hairline rounded-xl p-5">
                  <p className="text-xs text-vault-muted mb-2 uppercase tracking-wider">Primary Hook</p>
                  <p className="text-xl font-bold text-vault-cream leading-snug whitespace-pre-line">
                    {ad.hook}
                  </p>
                </div>

                {/* Body copy */}
                <div className="space-y-1">
                  <p className="text-xs text-vault-muted uppercase tracking-wider">Primary Text</p>
                  <p className="text-sm text-vault-cream leading-relaxed">{ad.body}</p>
                </div>

                {/* Headlines */}
                <div className="space-y-2">
                  <p className="text-xs text-vault-muted uppercase tracking-wider">Rotating Headlines</p>
                  <div className="grid gap-2">
                    {ad.headlines.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-vault-black border border-hairline rounded-lg px-4 py-2"
                      >
                        <span className="text-xs font-bold text-vault-gold w-4">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm text-vault-cream">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meta */}
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  {[
                    { label: "Audience", value: ad.audience },
                    { label: "UTM Content", value: ad.utmContent },
                    { label: "Budget", value: ad.budget },
                    { label: "Optimization Trigger", value: ad.optimizeTrigger },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-vault-black border border-hairline rounded-lg p-3 space-y-1">
                      <p className="text-vault-muted uppercase tracking-wider">{label}</p>
                      <p className="text-vault-cream">{value}</p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-vault-muted text-center">
          Capital Vault · Internal Creative Spec · Not customer-facing
        </p>
      </div>
    </main>
  );
}
