import type { Metadata } from "next";
import ThanksPage from "../funnel/leverage/thanks/ThanksPage";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Your Call Is Confirmed | The Capital Vault",
  description:
    "Your capital assessment call is booked. Check your email for the calendar invite and see what happens next.",
  robots: "noindex",
};

export default function Page() {
  return <ThanksPage fontVariable={outfit.variable} />;
}
