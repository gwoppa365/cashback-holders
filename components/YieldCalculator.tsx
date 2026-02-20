"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { PUMP_FUN_URL, TOTAL_SUPPLY } from "@/lib/constants";

function fmtSol(n: number) {
  if (n >= 100) return n.toFixed(1);
  if (n >= 10)  return n.toFixed(2);
  if (n >= 1)   return n.toFixed(3);
  if (n >= 0.01) return n.toFixed(4);
  return n.toFixed(5);
}

function fmtUsd(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(2)}K`;
  if (n >= 1)    return `$${n.toFixed(2)}`;
  return `$${n.toFixed(4)}`;
}

const PRESETS = [
  { label: "1M",    value: 1_000_000 },
  { label: "5M",    value: 5_000_000 },
  { label: "10M",   value: 10_000_000 },
  { label: "25M",   value: 25_000_000 },
  { label: "50M",   value: 50_000_000 },
  { label: "100M",  value: 100_000_000 },
];

export default function YieldCalculator() {
  const [amount, setAmount]     = useState(10_000_000);
  const [inputVal, setInputVal] = useState("10,000,000");
  const sliderRef = useRef<HTMLInputElement>(null);
  const MIN = 100_000;
  const MAX = 200_000_000;

  const { data } = useQuery({
    queryKey: ["token"],
    queryFn:  () => fetch("/api/token").then(r => r.json()),
  });

  const calcs = useMemo(() => {
    if (!data?.volume24h || !data?.price || !data?.priceNative) return null;
    const solPrice    = data.price / data.priceNative;
    const volumeSol   = data.volume24h / solPrice;
    const feePool24h  = volumeSol * 0.005;
    const supplyShare = amount / TOTAL_SUPPLY;
    const dailySol    = feePool24h * supplyShare;
    return {
      dailySol,
      weeklySol:   dailySol * 7,
      monthlySol:  dailySol * 30,
      dailyUsd:    dailySol * solPrice,
      supplyShare,
      solPrice,
      feePool24h,
    };
  }, [data, amount]);

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

  function setPreset(v: number) {
    setAmount(v);
    setInputVal(v.toLocaleString());
  }

  const supplyPct = ((amount / TOTAL_SUPPLY) * 100).toFixed(3);

  return (
    <section id="calculator" style={{ padding: "100px 0", background: "var(--bg-card)", borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 800, height: 400,
        background: "radial-gradient(ellipse, rgba(0,232,122,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px", position: "relative" }}>

        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "var(--green-dim)", border: "1px solid var(--green-border)",
            borderRadius: 100, padding: "4px 12px", marginBottom: 20,
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--green-bright)", letterSpacing: "0.08em" }}>YIELD CALCULATOR</span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(28px,4vw,44px)",
            letterSpacing: "-0.04em", color: "var(--text)", marginBottom: 14,
          }}>
            How much will you earn?
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--text-muted)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Enter your holding amount and see your estimated SOL earnings based on live trading volume. Hold longer to multiply your share.
          </p>
        </div>

        {/* Calculator card */}
        <div style={{
          background: "var(--bg)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-2xl)", overflow: "hidden",
          boxShadow: "var(--green-glow)",
        }}>

          {/* Live fee pool banner */}
          <div style={{
            padding: "14px 28px",
            background: "linear-gradient(90deg, rgba(0,232,122,0.06), rgba(0,232,122,0.02), rgba(0,232,122,0.06))",
            borderBottom: "1px solid var(--green-border)",
            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green-bright)", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--green-bright)", fontWeight: 500 }}>
                Live fee pool (24h): ◎ {calcs ? fmtSol(calcs.feePool24h) : "—"}
              </span>
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              {[
                { label: "24h Volume", value: data?.volume24h ? `$${(data.volume24h / 1000).toFixed(1)}K` : "—" },
                { label: "Holders",    value: data?.holders ? data.holders.toLocaleString() : "—" },
                { label: "Fee Rate",   value: "0.50%" },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, color: "var(--text)" }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "36px 36px 32px" }}>

            {/* Preset buttons */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>Quick select:</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {PRESETS.map(p => (
                  <button key={p.label} onClick={() => setPreset(p.value)} style={{
                    fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500,
                    color: amount === p.value ? "var(--green-bright)" : "var(--text-muted)",
                    background: amount === p.value ? "var(--green-dim)" : "var(--bg-elevated)",
                    border: `1px solid ${amount === p.value ? "var(--green-border)" : "var(--border)"}`,
                    borderRadius: "var(--radius-sm)", padding: "5px 12px", cursor: "pointer",
                    transition: "all 0.15s",
                  }}>{p.label}</button>
                ))}
              </div>
            </div>

            {/* Main input + slider */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                <div style={{
                  flex: 1, display: "flex", alignItems: "center",
                  background: "var(--bg-elevated)", border: "1px solid var(--border)",
                  borderRadius: "var(--radius)", padding: "12px 18px",
                }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-dim)", marginRight: 10, whiteSpace: "nowrap" }}>I hold</span>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={handleInput}
                    style={{
                      background: "none", border: "none", outline: "none", flex: 1,
                      fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 700,
                      color: "var(--text)", minWidth: 0,
                    }}
                  />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--green-bright)", whiteSpace: "nowrap", marginLeft: 8 }}>$CASHBACK</span>
                </div>
                <div style={{
                  background: "var(--bg-elevated)", border: "1px solid var(--green-border)",
                  borderRadius: "var(--radius)", padding: "12px 16px", whiteSpace: "nowrap",
                }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-dim)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>Supply</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, color: "var(--green-bright)" }}>{supplyPct}%</div>
                </div>
              </div>
              <input
                ref={sliderRef}
                type="range"
                min={MIN}
                max={MAX}
                step={100_000}
                value={amount}
                onChange={handleSlider}
              />
            </div>

            {/* Big yield outputs */}
            <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 28 }}>
              {[
                { label: "Daily Earnings",   period: "24h",  sol: calcs?.dailySol,   usd: calcs?.dailyUsd },
                { label: "Weekly Earnings",  period: "7d",   sol: calcs?.weeklySol,  usd: calcs && calcs.dailyUsd * 7 },
                { label: "Monthly Earnings", period: "30d",  sol: calcs?.monthlySol, usd: calcs && calcs.dailyUsd * 30 },
              ].map(item => (
                <div key={item.label} style={{
                  background: "var(--bg-card)", border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)", padding: "20px 20px",
                  textAlign: "center",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--green-border)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-muted)", fontWeight: 500 }}>{item.label}</span>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-dim)",
                      background: "var(--bg-elevated)", border: "1px solid var(--border)",
                      padding: "2px 6px", borderRadius: "var(--radius-xs)", letterSpacing: "0.06em",
                    }}>{item.period}</span>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: 26, color: "var(--green-bright)", letterSpacing: "-0.03em", marginBottom: 4 }}>
                    ◎ {item.sol !== null && item.sol !== undefined ? fmtSol(item.sol) : "—"}
                  </div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-dim)" }}>
                    {item.usd !== null && item.usd !== undefined ? `≈ ${fmtUsd(item.usd)}` : "Live data loading"}
                  </div>
                </div>
              ))}
            </div>

            {/* Info row + CTA */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{
                flex: 1, background: "var(--bg-elevated)", borderRadius: "var(--radius)",
                padding: "12px 16px", minWidth: 200,
              }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-dim)", lineHeight: 1.6 }}>
                  Estimates based on current 24h volume. Hold time weighting increases your real yield above this baseline.
                </p>
              </div>
              <a href={PUMP_FUN_URL} target="_blank" rel="noopener noreferrer"
                className="btn-glow"
                style={{
                  fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14,
                  color: "#040607", background: "var(--green-bright)",
                  textDecoration: "none", padding: "14px 28px",
                  borderRadius: "var(--radius-sm)", whiteSpace: "nowrap",
                }}
              >Buy & start earning →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
