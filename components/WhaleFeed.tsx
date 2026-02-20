"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60)   return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  return `${Math.floor(s / 3600)}h ago`;
}

function fmtUsd(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n}`;
}

const SOURCES: Record<string, string> = {
  PUMP_FUN: "Pump.fun",
  RAYDIUM:  "Raydium",
  JUPITER:  "Jupiter",
  ORCA:     "Orca",
};

const LABEL_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  "BONK Whale":   { bg: "rgba(234,179,8,0.08)",  color: "#eab308", border: "rgba(234,179,8,0.2)" },
  "WIF Whale":    { bg: "rgba(168,85,247,0.08)", color: "#a855f7", border: "rgba(168,85,247,0.2)" },
  "POPCAT Whale": { bg: "rgba(249,115,22,0.08)", color: "#f97316", border: "rgba(249,115,22,0.2)" },
};

export default function WhaleFeed() {
  const [filter, setFilter] = useState<"ALL" | "BUY" | "SELL">("ALL");
  const [minSol, setMinSol] = useState(0);

  const { data, isLoading, dataUpdatedAt } = useQuery({
    queryKey: ["whale-feed"],
    queryFn:  () => fetch("/api/whale-feed").then(r => r.json()),
    refetchInterval: 20_000,
  });

  const allTrades: any[] = data?.trades ?? [];
  const solPrice: number = data?.solPrice ?? 150;
  const walletCount: number = data?.walletCount ?? 0;

  const trades = allTrades
    .filter(t => filter === "ALL" || t.type === filter)
    .filter(t => t.sol >= minSol);

  const buys     = allTrades.filter(t => t.type === "BUY").length;
  const sells    = allTrades.filter(t => t.type === "SELL").length;
  const totalSol = allTrades.reduce((s: number, t: any) => s + (t.sol ?? 0), 0);
  const totalUsd = allTrades.reduce((s: number, t: any) => s + (t.usd ?? 0), 0);

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
              Real-time Whale Activity
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-muted)", maxWidth: 500, lineHeight: 1.65 }}>
              Tracking top {walletCount > 0 ? walletCount : "20"}+ wallets holding <span style={{ color: "#eab308" }}>BONK</span>, <span style={{ color: "#a855f7" }}>WIF</span> &amp; <span style={{ color: "#f97316" }}>POPCAT</span> — the biggest Solana memecoin whales. Refreshes every 20s.
            </p>
          </div>

          {/* Summary stats */}
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { label: "Buys",      value: buys,               color: "var(--green)" },
              { label: "Sells",     value: sells,              color: "var(--red)"   },
              { label: "SOL Vol",   value: `◎${totalSol.toFixed(1)}`, color: "var(--text)" },
              { label: "USD Vol",   value: fmtUsd(totalUsd),   color: "var(--blue-bright)" },
            ].map(s => (
              <div key={s.label} style={{
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)", padding: "12px 16px", textAlign: "center", minWidth: 72,
              }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-dim)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 16, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters row */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          {(["ALL", "BUY", "SELL"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600,
              color: filter === f ? (f === "BUY" ? "var(--green)" : f === "SELL" ? "var(--red)" : "var(--blue-bright)") : "var(--text-dim)",
              background: filter === f ? (f === "BUY" ? "var(--green-dim)" : f === "SELL" ? "var(--red-dim)" : "var(--blue-dim)") : "var(--bg-card)",
              border: `1px solid ${filter === f ? (f === "BUY" ? "var(--green-border)" : f === "SELL" ? "var(--red-border)" : "var(--blue-border)") : "var(--border)"}`,
              borderRadius: "var(--radius-sm)", padding: "6px 14px", cursor: "pointer", transition: "all 0.15s",
            }}>{f}</button>
          ))}

          {/* Min SOL filter */}
          <div style={{ display: "flex", gap: 6, marginLeft: 8 }}>
            {[0, 1, 5, 10].map(n => (
              <button key={n} onClick={() => setMinSol(n)} style={{
                fontFamily: "var(--font-mono)", fontSize: 10,
                color: minSol === n ? "var(--blue-bright)" : "var(--text-dim)",
                background: minSol === n ? "var(--blue-dim)" : "var(--bg-card)",
                border: `1px solid ${minSol === n ? "var(--blue-border)" : "var(--border)"}`,
                borderRadius: "var(--radius-sm)", padding: "6px 10px", cursor: "pointer", transition: "all 0.15s",
              }}>{n === 0 ? "All sizes" : `≥◎${n}`}</button>
            ))}
          </div>

          {dataUpdatedAt > 0 && (
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)", marginLeft: "auto", alignSelf: "center" }}>
              Updated {timeAgo(dataUpdatedAt)}
            </span>
          )}
        </div>

        {/* Table */}
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", overflow: "hidden", background: "var(--bg-card)" }}>

          <div style={{
            display: "grid", gridTemplateColumns: "140px 110px 70px 120px 90px 100px 1fr",
            padding: "10px 24px", background: "var(--bg-elevated)", borderBottom: "1px solid var(--border)",
          }}>
            {["WALLET","WHALE TYPE","SIDE","TOKEN","◎ SOL","USD","TIME"].map(h => (
              <div key={h} style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600, color: "var(--text-dim)", letterSpacing: "0.1em" }}>{h}</div>
            ))}
          </div>

          {isLoading ? (
            <div style={{ padding: "80px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)" }}>Fetching whale activity...</span>
            </div>
          ) : trades.length === 0 ? (
            <div style={{ padding: "80px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🐋</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-dim)", marginBottom: 8 }}>No activity yet</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-dim)" }}>Whale wallets haven't made any qualifying swaps recently</div>
            </div>
          ) : trades.map((t: any, i: number) => {
            const isBig = t.sol >= 10;
            const labelStyle = LABEL_COLORS[t.whaleLabel] ?? { bg: "var(--bg-elevated)", color: "var(--text-dim)", border: "var(--border)" };
            return (
              <div key={t.sig + i} className="table-row" style={{
                display: "grid", gridTemplateColumns: "140px 110px 70px 120px 90px 100px 1fr",
                padding: "12px 24px",
                borderBottom: i < trades.length - 1 ? "1px solid var(--border-subtle)" : "none",
                alignItems: "center",
                background: isBig ? (t.type === "BUY" ? "rgba(34,197,94,0.03)" : "rgba(239,68,68,0.03)") : "transparent",
              }}>
                <a href={`https://solscan.io/account/${t.walletFull}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                >{t.wallet}</a>

                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
                  background: labelStyle.bg, color: labelStyle.color,
                  border: `1px solid ${labelStyle.border}`,
                  padding: "2px 8px", borderRadius: 100, display: "inline-block", width: "fit-content",
                  letterSpacing: "0.04em",
                }}>{t.whaleLabel}</span>

                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
                  color: t.type === "BUY" ? "var(--green)" : "var(--red)",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.type === "BUY" ? "var(--green)" : "var(--red)", display: "inline-block", opacity: 0.7 }} />
                  {t.type}
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <a href={t.mint ? `https://birdeye.so/token/${t.mint}` : "#"}
                    target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--blue)", textDecoration: "none" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--blue-bright)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--blue)")}
                  >{t.symbol}</a>
                  {isBig && <span title="Large trade">🐋</span>}
                </div>

                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: "var(--text)" }}>◎ {t.sol}</span>

                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: "var(--text-muted)" }}>{fmtUsd(t.usd)}</span>

                <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)" }}>{timeAgo(t.timestamp)}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ marginTop: 16, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          {Object.entries(LABEL_COLORS).map(([label, style]) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
                background: style.bg, color: style.color,
                border: `1px solid ${style.border}`,
                padding: "2px 8px", borderRadius: 100,
                letterSpacing: "0.04em",
              }}>{label}</span>
            </div>
          ))}
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)", marginLeft: 4 }}>
            🐋 = large trade (&gt;10 SOL)
          </span>
        </div>
      </div>
    </section>
  );
}
