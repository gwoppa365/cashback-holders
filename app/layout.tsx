import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cashback Holders — Earn $CASHBACK Rewards",
  description: "Hold $CASHBACK and earn automatically. Fees distributed based on hold time. Track your rewards and climb the leaderboard live.",
  openGraph: {
    title: "Cashback Holders",
    description: "Hold $CASHBACK. Earn rewards. Climb the leaderboard.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
