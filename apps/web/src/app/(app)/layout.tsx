import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
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
      className={`${inter.variable} ${geist.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen antialiased flex flex-col justify-between">
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
