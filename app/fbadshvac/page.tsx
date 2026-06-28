import { Outfit } from "next/font/google";
import FBAdsFull, { type Variant } from "../FBads/FBAdsFull";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400","500","600","700","800","900"],
  variable: "--font-outfit",
});

const HVAC_VARIANT: Variant = {
  kicker: "HVAC CONTRACTORS & SERVICE BUSINESS OWNERS · $500K-$5M",
  headline: "Unlock Up to $250,000 in Zero Percent Growth Capital",
  accent: "in as Little as 48 Hours",
  sub: "Without giving up equity, pledging personal assets, or waiting months on a bank that will probably say no anyway.",
  cta: "See If My Business Qualifies",
  campaign: "meta_contractor",
};

export const metadata = {
  title: "Unlock Up to $250,000 in Zero Percent Growth Capital | The Capital Vault",
  description: HVAC_VARIANT.sub,
};

export default function FBAdsHVACPage() {
  return <FBAdsFull variant={HVAC_VARIANT} fontVariable={outfit.variable} />;
}
