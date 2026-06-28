import type { Metadata } from "next";
import ThanksPage from "./ThanksPage";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Your Call Is Confirmed | The Capital Vault",
  description: "Your capital assessment call is booked. Watch the short video below to see exactly what happens next.",
  robots: "noindex",
};

export default function Page() {
  return <ThanksPage fontVariable={outfit.variable} />;
}
