export const MOCK_TOKEN = {
  name: "Cashback Holders",
  symbol: "CASHBACK",
  mint: "CASH1111111111111111111111111111111111111111",
  marketCap: 420690,
  price: 0.00042069,
  volume24h: 88420,
  totalHolders: 1247,
  totalSupply: 1_000_000_000,
  creatorFeeSol: 142.8,
  creatorFeeUsd: 21420,
  change24h: 14.2,
  createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
};

export const MOCK_HOLDERS = [
  { rank: 1, wallet: "7xKX...WM9z", walletFull: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", balance: 124_000_000, pct: 12.4, holdDays: 14, holdHours: 6, firstBuy: Date.now() - (14 * 24 + 6) * 3600000, isDev: false, badge: "diamond" },
  { rank: 2, wallet: "9WzD...AWM", walletFull: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", balance: 89_000_000, pct: 8.9, holdDays: 9, holdHours: 2, firstBuy: Date.now() - (9 * 24 + 2) * 3600000, isDev: false, badge: "diamond" },
  { rank: 3, wallet: "3d4E...7c8d", walletFull: "3d4EkR7c8dXmNpLsQwUvZbHjYnFgCiPoAsTuDeWqMnBv", balance: 62_000_000, pct: 6.2, holdDays: 5, holdHours: 11, firstBuy: Date.now() - (5 * 24 + 11) * 3600000, isDev: false, badge: "strong" },
  { rank: 4, wallet: "Aabd...12ef", walletFull: "AabdF12efXmNpLsQwUvZbHjYnFgCiPoAsTuDeWqMnBvR", balance: 41_000_000, pct: 4.1, holdDays: 2, holdHours: 4, firstBuy: Date.now() - (2 * 24 + 4) * 3600000, isDev: false, badge: "strong" },
  { rank: 5, wallet: "Pq8R...mn2k", walletFull: "Pq8RtsMn2kXpLsQwUvZbHjYnFgCiPoAsTuDeWqMnBvRs", balance: 38_500_000, pct: 3.85, holdDays: 1, holdHours: 18, firstBuy: Date.now() - (1 * 24 + 18) * 3600000, isDev: true, badge: "dev" },
  { rank: 6, wallet: "Lm5T...9xwq", walletFull: "Lm5TpXwq9ABcDeFgHiJkLmNoPqRsTuVwXyZ1234567890", balance: 31_200_000, pct: 3.12, holdDays: 3, holdHours: 0, firstBuy: Date.now() - 3 * 24 * 3600000, isDev: false, badge: "strong" },
  { rank: 7, wallet: "Vn3K...4bxz", walletFull: "Vn3K4bxzABcDeFgHiJkLmNoPqRsTuVwXyZ1234567891", balance: 28_000_000, pct: 2.8, holdDays: 0, holdHours: 22, firstBuy: Date.now() - 22 * 3600000, isDev: false, badge: "weak" },
  { rank: 8, wallet: "Wx1J...6mtp", walletFull: "Wx1J6mtpABcDeFgHiJkLmNoPqRsTuVwXyZ1234567892", balance: 24_500_000, pct: 2.45, holdDays: 0, holdHours: 14, firstBuy: Date.now() - 14 * 3600000, isDev: false, badge: "weak" },
  { rank: 9, wallet: "Yz9P...2nqr", walletFull: "Yz9P2nqrABcDeFgHiJkLmNoPqRsTuVwXyZ1234567893", balance: 21_000_000, pct: 2.1, holdDays: 1, holdHours: 2, firstBuy: Date.now() - (24 + 2) * 3600000, isDev: false, badge: "weak" },
  { rank: 10, wallet: "Bc4M...8kls", walletFull: "Bc4M8klsABcDeFgHiJkLmNoPqRsTuVwXyZ1234567894", balance: 18_700_000, pct: 1.87, holdDays: 0, holdHours: 6, firstBuy: Date.now() - 6 * 3600000, isDev: false, badge: "weak" },
];

export const MOCK_FEE_CHART = Array.from({ length: 14 }, (_, i) => ({
  day: `Day ${i + 1}`,
  daily: parseFloat((Math.random() * 15 + 3).toFixed(2)),
  cumulative: parseFloat((i * 10 + Math.random() * 15 + 3).toFixed(2)),
}));

export const MOCK_STATS_MARQUEE = [
  { label: "Total Holders", value: "1,247" },
  { label: "Market Cap", value: "$420.7K" },
  { label: "24h Volume", value: "$88.4K" },
  { label: "Cashback Distributed", value: "◎ 142.8 SOL" },
  { label: "Avg Hold Time", value: "4.2 Days" },
  { label: "Diamond Hands", value: "23%" },
  { label: "24h Change", value: "+14.2%" },
  { label: "Total Trades", value: "28,541" },
];

export function formatHoldTime(hours: number, days: number): string {
  if (days >= 1) return `${days}d ${hours}h`;
  return `${hours}h`;
}

export function getBadgeColor(badge: string): string {
  switch (badge) {
    case "diamond": return "#4ade80";
    case "strong":  return "#fbbf24";
    case "dev":     return "#a78bfa";
    case "weak":    return "#f87171";
    default:        return "#8888aa";
  }
}

export function getBadgeLabel(badge: string): string {
  switch (badge) {
    case "diamond": return "💎 Diamond";
    case "strong":  return "💪 Strong";
    case "dev":     return "👑 Dev";
    case "weak":    return "📄 Paper";
    default:        return "Unknown";
  }
}
