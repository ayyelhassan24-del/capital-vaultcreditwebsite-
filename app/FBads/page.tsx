import { Outfit } from "next/font/google";
import FBAdsFull, { type Variant } from "./FBAdsFull";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400","500","600","700","800","900"],
  variable: "--font-outfit",
});

const VARIANTS: Record<string, Variant> = {
  "1": {
    kicker: "DENIED OPERATORS · $500K TO $3M REVENUE",
    headline: "The bank didn't deny your business.",
    accent: "They denied your file.",
    sub: "Watch this 8-minute training to see how operators who got denied by every bank are still getting $50K-$250K in growth capital in under 30 days.",
    cta: "See What You Actually Qualify For",
    campaign: "meta_denied",
  },
  "2": {
    kicker: "GROWTH-TRAPPED FOUNDERS · $1M+ REVENUE",
    headline: "You're doing $1M a year",
    accent: "and still can't get capital. Here's why.",
    sub: "Watch this 8-minute training to see how founders with high leverage ratios are still accessing $50K-$250K using lenders that don't use DTI rules.",
    cta: "Check My Capital Options",
    campaign: "meta_growth",
  },
  "3": {
    kicker: "NEW BUSINESS OWNERS · LLC UNDER 2 YEARS",
    headline: "New LLC. Real revenue.",
    accent: "No access to capital. Here's the fix.",
    sub: "Watch this 8-minute training to see how business owners under 2 years old with real revenue are accessing $50K-$150K when every bank says no.",
    cta: "See If My Business Qualifies",
    campaign: "meta_newllc",
  },
  "4": {
    kicker: "HVAC CONTRACTORS & SERVICE BUSINESS OWNERS · $500K-$5M",
    headline: "Unlock Up to $250,000 in Zero Percent Growth Capital",
    accent: "in as Little as 48 Hours",
    sub: "Without giving up equity, pledging personal assets, or waiting months on a bank that will probably say no anyway.",
    cta: "See If My Business Qualifies",
    campaign: "meta_contractor",
  },
  "hv": {
    kicker: "HVAC CONTRACTORS · $500K-$5M REVENUE",
    headline: "HVAC Operators Are Accessing $50K–$250K in Zero Percent Capital",
    accent: "While Banks Keep Saying No.",
    sub: "Watch this 8-minute training to see how HVAC business owners with real revenue are getting growth capital at 0% — no equity, no personal collateral, no bank runaround.",
    cta: "See If My HVAC Business Qualifies",
    campaign: "meta_hvac",
  },
};

type Props = { searchParams: Promise<{ v?: string }> };

export async function generateMetadata({ searchParams }: Props) {
  const { v } = await searchParams;
  const variant = VARIANTS[v ?? "4"] ?? VARIANTS["4"];
  return {
    title: `${variant.headline} ${variant.accent} | The Capital Vault`,
    description: variant.sub,
  };
}

export default async function FBAdsPage({ searchParams }: Props) {
  const { v } = await searchParams;
  const variant = VARIANTS[v ?? "4"] ?? VARIANTS["4"];
  return <FBAdsFull variant={variant} fontVariable={outfit.variable} />;
}
