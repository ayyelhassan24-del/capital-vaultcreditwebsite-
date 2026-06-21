import type { Metadata } from "next";
import { Playfair_Display, Sora } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const sora = Sora({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Capital Vault — 6-Month Credit Transformation System",
  description:
    "Go from bad credit to $100K+ in business funding in 62 days. 247+ success stories. Delete It or Don't Pay guarantee.",
  openGraph: {
    title: "The Capital Vault",
    description:
      "Go from bad credit to $100K+ in business funding in 62 days. 247+ success stories.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${sora.variable} scroll-smooth`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="min-h-screen bg-vault-black text-vault-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
