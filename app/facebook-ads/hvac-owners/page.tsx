import { Outfit } from "next/font/google";
import FBAdsFull, { type Variant } from "../../FBads/FBAdsFull";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

// HVAC-owner targeted variant for the Meta campaign landing at
// thecapitalvault.com/facebook-ads/hvac-owners
const HVAC: Variant = {
  kicker: "HVAC CONTRACTORS & SERVICE OPERATORS · $500K–$5M REVENUE",
  headline: "HVAC Operators Are Pulling $50K–$250K in Zero Percent Capital",
  accent: "While Banks Keep Saying No.",
  sub: "Watch this 8-minute training to see how HVAC business owners with real revenue are accessing growth capital at 0% — no equity, no personal collateral, no waiting months on a bank that declines anyway.",
  cta: "See If My HVAC Business Qualifies",
  campaign: "meta_hvac_owners",
};

export function generateMetadata() {
  return {
    title: `${HVAC.headline} ${HVAC.accent} | The Capital Vault`,
    description: HVAC.sub,
  };
}

export default function HvacOwnersPage() {
  return <FBAdsFull variant={HVAC} fontVariable={outfit.variable} />;
}
