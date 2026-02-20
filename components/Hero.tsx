"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PUMP_FUN_URL } from "@/lib/constants";

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  return `${Math.floor(s / 3600)}h ago`;
}

export default function Hero() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 10000);
    return () => clearInterval(t);
  }, []);

  const { data: feedData } = useQuery({
    queryKey: ["whale-feed"],
    queryFn: () => fetch("/api/whale-feed").then(r => r.json()),
    refetchInterval: 20_000,
  });

  const { data: tokenData } = useQuery({
    queryKey: ["token"],
    queryFn: () => fetch("/api/token").then(r => r.json()),
  });

  const trades: any[] = feedData?.trades ?? [];
  const preview = trades.slice(0, 6);

  return (
    <section style={{
      background: "var(--bg)", minHeight: "100vh", paddingTop: 52,
      display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div className="bg-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5 }} />

      {/* Ambient glows */}
      <div style={{ position: "absolute", top: -100, right: -100, width: 700, height: 700, background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -100, left: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(14,165,233,0.04) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px", width: "100%", position: "relative", zIndex: 1 }}>

        {/* Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--blue-dim)", border: "1px solid var(--blue-border)",
            borderRadius: 100, padding: "5px 14px",
          }}>
            <span style={{ position: "relative", display: "inline-flex", width: 6, height: 6 }}>
              <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--blue-bright)", opacity: 0.5 }} />
              <span style={{ position: "relative", width: 6, height: 6, borderRadius: "50%", background: "var(--blue-bright)", display: "inline-block" }} />
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--blue-bright)", letterSpacing: "0.08em", fontWeight: 500 }}>SOLANA WHALE INTELLIGENCE</span>
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.06em" }}>POWERED BY $CASHBACK</span>
        </div>

        {/* Main grid */}
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 72, alignItems: "center" }}>

          {/* LEFT */}
          <div>
            <h1 style={{ fontFamily: "var(--font-sans)", fontWeight: 900, fontSize: "clamp(40px,5.5vw,70px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "var(--text)", marginBottom: 24 }}>
              Track what<br />
              whales buy<br />
              <span className="gradient-text">before it pumps.</span>
            </h1>

            <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.75, color: "var(--text-muted)", maxWidth: 480, marginBottom: 36 }}>
              CB Intel gives you real-time visibility into every move Solana's biggest wallets make. Know what smart money is accumulating before the crowd catches on.
            </p>

            {/* Feature pills */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
              {["Live wallet tracking", "Buy & sell signals", "Pump.fun activity", "Pro access via $CASHBACK"].map(f => (
                <span key={f} style={{
                  fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-muted)",
                  background: "var(--bg-card)", border: "1px solid var(--border)",
                  padding: "5px 12px", borderRadius: 100,
                  display: "inline-flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--blue)", display: "inline-block" }} />
                  {f}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 28, marginBottom: 40, flexWrap: "wrap" }}>
              {[
                { label: "Holders",   value: tokenData?.holders ? tokenData.holders.toLocaleString() : "—" },
                { label: "24h Vol",   value: tokenData?.volume24h ? `$${(tokenData.volume24h / 1000).toFixed(1)}K` : "—" },
                { label: "Pro Access", value: "1M CBCK" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 17, color: "var(--text)" }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href="#feed" className="btn-blue" style={{
                fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14,
                color: "#fff", background: "var(--blue)",
                textDecoration: "none", padding: "12px 24px",
                borderRadius: "var(--radius-sm)", display: "inline-block",
              }}>View Live Feed</a>

              <a href={PUMP_FUN_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14,
                color: "var(--text-muted)", textDecoration: "none", padding: "12px 24px",
                borderRadius: "var(--radius-sm)", border: "1px solid var(--border)",
                display: "inline-block",
              }}>Buy $CASHBACK →</a>
            </div>
          </div>

          {/* RIGHT — Live feed preview */}
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-2xl)", overflow: "hidden", boxShadow: "var(--blue-glow)" }}>
            {/* Header */}
            <div style={{
              padding: "12px 18px", background: "var(--bg-elevated)", borderBottom: "1px solid var(--border)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ position: "relative", display: "inline-flex", width: 6, height: 6 }}>
                  <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22c55e", opacity: 0.5 }} />
                  <span style={{ position: "relative", width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.08em" }}>LIVE ACTIVITY</span>
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                {["#ef4444","#f59e0b","#22c55e"].map(c => (
                  <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.6 }} />
                ))}
              </div>
            </div>

            {/* Column headers */}
            <div style={{
              display: "grid", gridTemplateColumns: "100px 50px 70px 60px 1fr",
              padding: "8px 16px", borderBottom: "1px solid var(--border-subtle)",
              background: "var(--bg-elevated)",
            }}>
              {["WALLET","TYPE","TOKEN","SOL","TIME"].map(h => (
                <div key={h} style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-dim)", letterSpacing: "0.1em" }}>{h}</div>
              ))}
            </div>

            {/* Feed rows */}
            <div style={{ minHeight: 260 }}>
              {preview.length === 0 ? (
                <div style={{ padding: "40px 16px", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)" }}>Waiting for activity...</div>
                </div>
              ) : preview.map((t: any, i: number) => (
                <div key={t.sig + i} className="slide-in" style={{
                  display: "grid", gridTemplateColumns: "100px 50px 70px 60px 1fr",
                  padding: "9px 16px", borderBottom: "1px solid var(--border-subtle)",
                  alignItems: "center",
                }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>{t.wallet}</span>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 700,
                    color: t.type === "BUY" ? "var(--green)" : "var(--red)",
                  }}>{t.type}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text)" }}>{t.symbol}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text)" }}>◎{t.sol}</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--text-dim)" }}>{timeAgo(t.timestamp)}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border-subtle)", textAlign: "center" }}>
              <a href="#feed" style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--blue)", textDecoration: "none" }}>View full feed ↓</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
