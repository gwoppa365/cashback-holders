"use client";
import { useQuery } from "@tanstack/react-query";

export default function StatsMarquee() {
  const { data } = useQuery({
    queryKey: ["token"],
    queryFn: () => fetch("/api/token").then(r => r.json()),
  });

  const change = data?.priceChange24h ?? null;
  const changePos = change !== null && change >= 0;

  const items = [
    { label: "Token",       value: "$CASHBACK",                                          accent: false },
    { label: "Holders",     value: data?.holders ? data.holders.toLocaleString() : "—", accent: false },
    { label: "Market Cap",  value: data?.marketCap ? `$${(data.marketCap/1000).toFixed(1)}K` : "—", accent: false },
    { label: "24h Volume",  value: data?.volume24h ? `$${(data.volume24h/1000).toFixed(1)}K` : "—", accent: false },
    { label: "24h Change",  value: change !== null ? `${changePos?"+":""}${change.toFixed(2)}%` : "—", accent: true, isChange: true, changePos },
    { label: "Pro Access",  value: "1M CBCK",                                            accent: true },
    { label: "Chain",       value: "Solana",                                             accent: false },
    { label: "Transactions",value: data?.txns24h ? data.txns24h.toLocaleString() : "—", accent: false },
  ];

  const doubled = [...items, ...items];

  return (
    <div style={{
      background: "var(--bg-elevated)",
      borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
      padding: "10px 0", overflow: "hidden", position: "relative",
    }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right, var(--bg-elevated), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to left, var(--bg-elevated), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div className="animate-marquee" style={{ display: "flex", width: "max-content" }}>
        {doubled.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 28px", borderRight: "1px solid var(--border-subtle)", whiteSpace: "nowrap" }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</span>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600,
              color: (item as any).isChange
                ? (item as any).changePos ? "var(--green)" : "var(--red)"
                : item.accent ? "var(--blue-bright)" : "var(--text)",
            }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
