import type { Metadata } from "next";
import { Playfair_Display, Sora } from "next/font/google";
import Script from "next/script";
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
  title: "The Capital Vault — Non-Dilutive Capital for Established Operators",
  description:
    "Connect with 500+ institutional lenders for non-dilutive capital. Fast approvals, no equity loss. For businesses $500K–$3M revenue.",
  openGraph: {
    title: "The Capital Vault",
    description:
      "Non-dilutive capital for established operators. Fast approvals, 500+ lenders.",
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
      <body className="min-h-screen bg-vault-bg text-vault-ink font-sans antialiased selection:bg-vault-gold/30 selection:text-vault-ink">
        {children}
      </body>
      <Script id="fb-pixel" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','985282070925350');
        fbq('track','PageView');
      `}</Script>
      <noscript>
        <img height="1" width="1" style={{display:"none"}}
          src="https://www.facebook.com/tr?id=985282070925350&ev=PageView&noscript=1" alt=""
        />
      </noscript>
    </html>
  );
}
