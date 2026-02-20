"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { PUMP_FUN_URL, TOTAL_SUPPLY } from "@/lib/constants";

function fmtSol(n: number) {
  if (n === 0) return "0.000";
  if (n >= 100) return n.toFixed(1);
  if (n >= 10)  return n.toFixed(2);
  if (n >= 1)   return n.toFixed(3);
  if (n >= 0.01) return n.toFixed(4);
  return n.toFixed(5);
}

function fmtUsd(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  if (n >= 1)    return `$${n.toFixed(2)}`;
  return `$${n.toFixed(4)}`;
}

function fmtNum(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString();
}

export default function Hero() {
  const [amount, setAmount]   = useState(10_000_000);
  const [inputVal, setInputVal] = useState("10,000,000");
  const sliderRef = useRef<HTMLInputElement>(null);
  const MIN = 100_000;
  const MAX = 200_000_000;

  const { data } = useQuery({
    queryKey: ["token"],
    queryFn:  () => fetch("/api/token").then(r => r.json()),
  });

  const isLive    = !!data && !data.error && !!data.price;
  const change    = data?.priceChange24h ?? null;
  const changePos = change !== null && change >= 0;

  // Yield calc
  const calcs = useMemo(() => {
    if (!data?.volume24h || !data?.price || !data?.priceNative) return null;
    const solPrice    = data.price / data.priceNative;
    const volumeSol   = data.volume24h / solPrice;
    const feePool24h  = volumeSol * 0.005;
    const supplyShare = amount / TOTAL_SUPPLY;
    const dailySol    = feePool24h * supplyShare;
    return {
      dailySol,
      weeklySol:  dailySol * 7,
      monthlySol: dailySol * 30,
      dailyUsd:   dailySol * solPrice,
      supplyShare,
      solPrice,
    };
  }, [data, amount]);

  // Update slider gradient
  useEffect(() => {
    if (sliderRef.current) {
      const pct = ((amount - MIN) / (MAX - MIN)) * 100;
      sliderRef.current.style.setProperty("--pct", `${pct}%`);
    }
  }, [amount]);

  function handleSlider(e: React.ChangeEvent<HTMLInputElement>) {
    const v = Number(e.target.value);
    setAmount(v);
    setInputVal(v.toLocaleString());
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/,/g, "");
    setInputVal(e.target.value);
    const n = parseInt(raw);
    if (!isNaN(n)) setAmount(Math.min(Math.max(n, MIN), MAX));
  }

  return (
    <section style={{
      background: "var(--bg)",
      minHeight: "100vh",
      paddingTop: 52,
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Dot grid */}
      <div className="bg-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.6 }} />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", bottom: -100, right: -100, width: 600, height: 600,
        background: "radial-gradient(circle, rgba(0,232,122,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: 100, left: -200, width: 500, height: 500,
        background: "radial-gradient(circle, rgba(0,232,122,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px", width: "100%", position: "relative", zIndex: 1 }}>

        {/* Status pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: isLive ? "rgba(0,232,122,0.08)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${isLive ? "rgba(0,232,122,0.2)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: 100, padding: "5px 12px",
          }}>
            <span style={{ position: "relative", display: "inline-flex", width: 6, height: 6 }}>
              <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--green-bright)", opacity: 0.5 }} />
              <span style={{ position: "relative", width: 6, height: 6, borderRadius: "50%", background: "var(--green-bright)", display: "inline-block" }} />
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: isLive ? "var(--green-bright)" : "var(--text-dim)", letterSpacing: "0.08em", fontWeight: 500 }}>
              {isLive ? "LIVE ON SOLANA MAINNET" : "LAUNCHING SOON · SOLANA MAINNET"}
            </span>
          </div>
          <a href={PUMP_FUN_URL} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)",
            textDecoration: "none", letterSpacing: "0.06em", transition: "color 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text-muted)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--text-dim)")}
          >PUMP.FUN ↗</a>
        </div>

        {/* Main grid */}
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 460px", gap: 72, alignItems: "center" }}>

          {/* LEFT */}
          <div>
            <h1 style={{
              fontFamily: "var(--font-sans)", fontWeight: 900,
              fontSize: "clamp(42px, 5.5vw, 72px)",
              lineHeight: 1.0, letterSpacing: "-0.04em",
              color: "var(--text)", marginBottom: 24,
            }}>
              Every trade<br />
              <span className="gradient-text">pays you back.</span>
            </h1>

            <p style={{
              fontFamily: "var(--font-sans)", fontSize: 17, fontWeight: 400,
              lineHeight: 1.75, color: "var(--text-muted)", maxWidth: 480, marginBottom: 36,
            }}>
              $CASHBACK is the first Pump.fun token that distributes 100% of creator fees directly to holders — weighted by how long you hold. No staking. No lock-up. Just hold and earn.
            </p>

            {/* Live mini stats */}
            <div style={{ display: "flex", gap: 24, marginBottom: 40, flexWrap: "wrap" }}>
              {[
                { label: "Market Cap",  value: data?.marketCap ? fmtUsd(data.marketCap) : "—" },
                { label: "24h Volume",  value: data?.volume24h ? fmtUsd(data.volume24h) : "—" },
                { label: "Holders",     value: data?.holders ? fmtNum(data.holders) : "—" },
                { label: "Fee Rate",    value: "0.50%" },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 16, color: "var(--text)" }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Price + change */}
            {isLive && data?.price && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 20, color: "var(--text)" }}>
                  ${data.price < 0.000001 ? data.price.toExponential(2) : data.price.toFixed(8)}
                </span>
                {change !== null && (
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600,
                    color: changePos ? "var(--green-bright)" : "var(--red)",
                    background: changePos ? "rgba(0,232,122,0.1)" : "rgba(239,68,68,0.1)",
                    border: `1px solid ${changePos ? "rgba(0,232,122,0.2)" : "rgba(239,68,68,0.2)"}`,
                    padding: "3px 10px", borderRadius: 100,
                  }}>
                    {changePos ? "+" : ""}{change.toFixed(2)}%
                  </span>
                )}
              </div>
            )}

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href={PUMP_FUN_URL} target="_blank" rel="noopener noreferrer"
                className="btn-glow"
                style={{
                  fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14,
                  color: "#040607", background: "var(--green-bright)",
                  textDecoration: "none", padding: "12px 24px",
                  borderRadius: "var(--radius-sm)", display: "inline-block",
                }}
              >Buy $CASHBACK</a>

              <a href="#calculator" style={{
                fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 14,
                color: "var(--text-muted)", background: "transparent",
                textDecoration: "none", padding: "12px 24px",
                borderRadius: "var(--radius-sm)", border: "1px solid var(--border)",
                transition: "all 0.15s", display: "inline-block",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--text-dim)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
              >Calculate your yield →</a>
            </div>
          </div>

          {/* RIGHT — Yield Calculator Card */}
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-2xl)", overflow: "hidden",
            boxShadow: "var(--green-glow)",
          }}>
            {/* Card header */}
            <div style={{
              padding: "16px 24px", background: "var(--bg-elevated)",
              borderBottom: "1px solid var(--border)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Yield Calculator</span>
              </div>
              <div style={{ display: "flex", gap: 5 }}>
                {["#ef4444","#f59e0b","#00e87a"].map(c => (
                  <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: 0.6 }} />
                ))}
              </div>
            </div>

            <div style={{ padding: "24px" }}>
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 10 }}>
                  How many <span style={{ color: "var(--green-bright)", fontWeight: 600 }}>$CASHBACK</span> do you hold?
                </label>

                {/* Input */}
                <div style={{
                  display: "flex", alignItems: "center",
                  background: "var(--bg-elevated)", border: "1px solid var(--border)",
                  borderRadius: "var(--radius)", padding: "10px 14px", marginBottom: 14,
                }}>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={handleInput}
                    style={{
                      background: "none", border: "none", outline: "none",
                      fontFamily: "var(--font-mono)", fontSize: 16, fontWeight: 600,
                      color: "var(--text)", width: "100%",
                    }}
                  />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", whiteSpace: "nowrap" }}>
                    {((amount / TOTAL_SUPPLY) * 100).toFixed(3)}%
                  </span>
                </div>

                {/* Slider */}
                <input
                  ref={sliderRef}
                  type="range"
                  min={MIN}
                  max={MAX}
                  step={100_000}
                  value={amount}
                  onChange={handleSlider}
                  style={{ width: "100%" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-dim)" }}>100K</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-dim)" }}>200M</span>
                </div>
              </div>

              {/* Yield outputs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
                {[
                  { label: "Daily",   sol: calcs?.dailySol,   usd: calcs?.dailyUsd },
                  { label: "Weekly",  sol: calcs?.weeklySol,  usd: calcs && calcs.dailyUsd * 7 },
                  { label: "Monthly", sol: calcs?.monthlySol, usd: calcs && calcs.dailyUsd * 30 },
                ].map(item => (
                  <div key={item.label} style={{
                    background: "var(--bg-elevated)", border: "1px solid var(--border)",
                    borderRadius: "var(--radius)", padding: "14px 12px", textAlign: "center",
                  }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-dim)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>{item.label}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 15, color: "var(--green-bright)", marginBottom: 3 }}>
                      ◎ {item.sol !== null && item.sol !== undefined ? fmtSol(item.sol) : "—"}
                    </div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--text-dim)" }}>
                      {item.usd !== null && item.usd !== undefined ? fmtUsd(item.usd) : "—"}
                    </div>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <div style={{
                background: "var(--bg-elevated)", borderRadius: "var(--radius-sm)",
                padding: "10px 12px", marginBottom: 16,
              }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)", lineHeight: 1.6 }}>
                  Based on current 24h volume · {calcs ? `◎ ${fmtSol(calcs.dailySol * TOTAL_SUPPLY / amount)} total daily pool` : "Live data loading"} · Hold time increases your multiplier
                </p>
              </div>

              <a href={PUMP_FUN_URL} target="_blank" rel="noopener noreferrer"
                className="btn-glow"
                style={{
                  display: "block", textAlign: "center", width: "100%",
                  fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14,
                  color: "#040607", background: "var(--green-bright)",
                  textDecoration: "none", padding: "13px",
                  borderRadius: "var(--radius-sm)", boxSizing: "border-box",
                }}
              >Start earning on Pump.fun →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
