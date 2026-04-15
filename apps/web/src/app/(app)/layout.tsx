import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { HeaderMinimal } from "@/components/homepage/HeaderMinimal";
import { FooterMinimal } from "@/components/homepage/FooterMinimal";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "PM Craft — Insights for Product Managers",
    template: "%s | PM Craft",
  },
  description:
    "Deep dives on PM craft — AI for PMs, interview prep, RCA, guesstimates, and career growth. Written by practitioners, for practitioners.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PM Craft",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${merriweather.variable}`}
    >
      <body className="min-h-screen antialiased flex flex-col justify-between">
        <HeaderMinimal />
        <div className="flex-1 pt-16">
          {children}
        </div>
        <FooterMinimal />
      </body>
    </html>
  );
}
