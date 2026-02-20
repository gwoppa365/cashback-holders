"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60)   return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  return `${Math.floor(s / 3600)}h ago`;
}

const SOURCES: Record<string, string> = {
  PUMP_FUN: "Pump.fun",
  RAYDIUM:  "Raydium",
  JUPITER:  "Jupiter",
  ORCA:     "Orca",
};

export default function WhaleFeed() {
  const [filter, setFilter] = useState<"ALL" | "BUY" | "SELL">("ALL");

  const { data, isLoading, dataUpdatedAt } = useQuery({
    queryKey: ["whale-feed"],
    queryFn:  () => fetch("/api/whale-feed").then(r => r.json()),
    refetchInterval: 20_000,
  });

  const allTrades: any[] = data?.trades ?? [];
  const trades = filter === "ALL" ? allTrades : allTrades.filter(t => t.type === filter);

  const buys  = allTrades.filter(t => t.type === "BUY").length;
  const sells = allTrades.filter(t => t.type === "SELL").length;
  const totalSol = allTrades.reduce((s: number, t: any) => s + (t.sol ?? 0), 0);

  return (
    <section id="feed" style={{ padding: "100px 0", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36, flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "var(--blue-dim)", border: "1px solid var(--blue-border)",
              borderRadius: 100, padding: "4px 12px", marginBottom: 14,
            }}>
              <span style={{ position: "relative", display: "inline-flex", width: 5, height: 5 }}>
                <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--blue-bright)", opacity: 0.5 }} />
                <span style={{ position: "relative", width: 5, height: 5, borderRadius: "50%", background: "var(--blue-bright)", display: "inline-block" }} />
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--blue-bright)", letterSpacing: "0.1em" }}>LIVE WHALE FEED</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(22px,3vw,34px)", color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 8 }}>
              Real-time Activity
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-muted)", maxWidth: 440, lineHeight: 1.65 }}>
              Live swap activity from top Solana whale wallets. Updates every 20 seconds.
            </p>
          </div>

          {/* Summary stats */}
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { label: "Buys",     value: buys,  color: "var(--green)" },
              { label: "Sells",    value: sells, color: "var(--red)" },
              { label: "SOL Vol",  value: `◎${totalSol.toFixed(1)}`, color: "var(--text)" },
            ].map(s => (
              <div key={s.label} style={{
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)", padding: "12px 16px", textAlign: "center", minWidth: 72,
              }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-dim)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 18, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {(["ALL", "BUY", "SELL"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600,
              color: filter === f ? (f === "BUY" ? "var(--green)" : f === "SELL" ? "var(--red)" : "var(--blue-bright)") : "var(--text-dim)",
              background: filter === f ? (f === "BUY" ? "var(--green-dim)" : f === "SELL" ? "var(--red-dim)" : "var(--blue-dim)") : "var(--bg-card)",
              border: `1px solid ${filter === f ? (f === "BUY" ? "var(--green-border)" : f === "SELL" ? "var(--red-border)" : "var(--blue-border)") : "var(--border)"}`,
              borderRadius: "var(--radius-sm)", padding: "6px 14px", cursor: "pointer", transition: "all 0.15s",
            }}>{f}</button>
          ))}
          {dataUpdatedAt > 0 && (
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)", marginLeft: "auto", alignSelf: "center" }}>
              Updated {timeAgo(dataUpdatedAt)}
            </span>
          )}
        </div>

        {/* Table */}
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", overflow: "hidden", background: "var(--bg-card)" }}>

          {/* Table header */}
          <div style={{
            display: "grid", gridTemplateColumns: "150px 70px 130px 90px 120px 1fr",
            padding: "10px 24px", background: "var(--bg-elevated)", borderBottom: "1px solid var(--border)",
          }}>
            {["WALLET","TYPE","TOKEN","SOL AMT","SOURCE","TIME"].map(h => (
              <div key={h} style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600, color: "var(--text-dim)", letterSpacing: "0.1em" }}>{h}</div>
            ))}
          </div>

          {isLoading ? (
            <div style={{ padding: "80px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)" }}>Fetching whale activity...</span>
            </div>
          ) : trades.length === 0 ? (
            <div style={{ padding: "80px 24px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-dim)", marginBottom: 8 }}>No activity yet</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-dim)" }}>Top wallet holders haven't made any swaps recently</div>
            </div>
          ) : trades.map((t: any, i: number) => (
            <div key={t.sig + i} className="table-row" style={{
              display: "grid", gridTemplateColumns: "150px 70px 130px 90px 120px 1fr",
              padding: "12px 24px", borderBottom: i < trades.length - 1 ? "1px solid var(--border-subtle)" : "none",
              alignItems: "center",
            }}>
              <a href={`https://solscan.io/account/${t.walletFull}`}
                target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >{t.wallet}</a>

              <span style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
                color: t.type === "BUY" ? "var(--green)" : "var(--red)",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.type === "BUY" ? "var(--green)" : "var(--red)", display: "inline-block", opacity: 0.7 }} />
                {t.type}
              </span>

              <a href={t.mint ? `https://birdeye.so/token/${t.mint}` : "#"}
                target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--blue)", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--blue-bright)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--blue)")}
              >{t.symbol}</a>

              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: "var(--text)" }}>◎ {t.sol}</span>

              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 10,
                color: "var(--text-dim)",
                background: "var(--bg-elevated)", border: "1px solid var(--border)",
                padding: "2px 8px", borderRadius: "var(--radius-xs)",
                display: "inline-block", width: "fit-content",
              }}>{SOURCES[t.source] ?? t.source}</span>

              <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)" }}>{timeAgo(t.timestamp)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
