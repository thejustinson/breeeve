import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Breeeve - Accept Crypto Payments",
  description: "A fast and simple way to receive USDC payments for your business",
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: "Breeeve - Accept Crypto Payments",
    description: "A fast and simple way to receive USDC payments for your business",
    url: "https://breeeve.vercel.app",
    siteName: "Breeeve",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "Breeeve - Accept Crypto Payments",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
