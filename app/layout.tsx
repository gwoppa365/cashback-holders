import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cashback Holders — On-chain Fee Distribution Protocol",
  description: "A passive yield protocol on Solana. $CASHBACK holders receive a proportional share of all trading fees, weighted by hold duration and on-chain rank.",
  openGraph: {
    title: "Cashback Holders Protocol",
    description: "Earn from every $CASHBACK trade. Automatically distributed to holders based on hold time.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
