"use client";
import { PUMP_FUN_URL } from "@/lib/constants";

const STEPS = [
  {
    n: "01",
    title: "Buy & hold $CASHBACK",
    desc: "Purchase $CASHBACK on Pump.fun. Your hold clock starts from your first transaction. No minimum, no lock-up — just buy and hold.",
    icon: "◎",
  },
  {
    n: "02",
    title: "Fees accumulate in SOL",
    desc: "Every buy and sell generates 0.5% creator fees in SOL. These build up continuously and are allocated proportionally to all holders.",
    icon: "⟳",
  },
  {
    n: "03",
    title: "SOL lands in your wallet",
    desc: "Our escrow contract scrapes holder data in real-time and distributes SOL directly to your wallet — automatic, transparent, no claiming needed.",
    icon: "↗",
  },
];

const PARAMS = [
  { param: "Fee rate",              value: "0.5% per trade" },
  { param: "Fee currency",          value: "SOL" },
  { param: "Distribution method",   value: "Hold-time weighted" },
  { param: "Settlement",            value: "Custom escrow contract" },
  { param: "Data source",           value: "Real-time on-chain" },
  { param: "Minimum hold period",   value: "None" },
  { param: "Claiming required",     value: "No — automatic" },
  { param: "Staking required",      value: "No" },
  { param: "Chain",                 value: "Solana" },
];

export default function HowItWorks() {
  return (
    <section id="mechanics" style={{ padding: "100px 0", background: "var(--bg)", borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>

      <div style={{
        position: "absolute", top: 0, right: 0, width: 400, height: 400,
        background: "radial-gradient(circle, rgba(0,232,122,0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "var(--green-dim)", border: "1px solid var(--green-border)",
            borderRadius: 100, padding: "4px 12px", marginBottom: 16,
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--green-bright)", letterSpacing: "0.1em" }}>HOW IT WORKS</span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3vw,36px)",
            color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 12,
          }}>Protocol Mechanics</h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 520 }}>
            Not Pump.fun's built-in trader fee split. $CASHBACK runs its own protocol — creator fees go directly to holders, weighted by how long you hold.
          </p>
        </div>

        {/* 3 steps */}
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 64 }}>
          {STEPS.map((s, i) => (
            <div key={s.n} style={{
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)", padding: "28px 28px",
              position: "relative", overflow: "hidden",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--green-border)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--green-glow)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              {/* Step number bg */}
              <div style={{
                position: "absolute", top: 16, right: 20,
                fontFamily: "var(--font-mono)", fontWeight: 900, fontSize: 64,
                color: "var(--border-subtle)", lineHeight: 1, pointerEvents: "none",
                userSelect: "none",
              }}>{s.n}</div>

              {/* Icon */}
              <div style={{
                width: 40, height: 40, borderRadius: "var(--radius)",
                background: "var(--green-dim)", border: "1px solid var(--green-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-mono)", fontSize: 18, color: "var(--green-bright)",
                marginBottom: 20,
              }}>{s.icon}</div>

              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--green-bright)", letterSpacing: "0.06em", marginBottom: 10 }}>STEP {s.n}</div>
              <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 16, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom: params + fee flow */}
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

          {/* Protocol params */}
          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
            <div style={{ padding: "14px 20px", background: "var(--bg-elevated)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Protocol Parameters</span>
            </div>
            {PARAMS.map((row, i) => (
              <div key={row.param} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "11px 20px",
                borderBottom: i < PARAMS.length - 1 ? "1px solid var(--border-subtle)" : "none",
                background: i % 2 === 0 ? "var(--bg-card)" : "transparent",
              }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)" }}>{row.param}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: "var(--text)" }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Fee flow */}
          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
            <div style={{ padding: "14px 20px", background: "var(--bg-elevated)", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Fee Flow</span>
            </div>
            <div style={{ padding: "24px 20px" }}>
              {[
                { label: "Trade executes on Pump.fun",           note: "Buy or sell on bonding curve" },
                { label: "0.5% creator fee collected in SOL",    note: "Auto-accumulated per transaction" },
                { label: "Escrow contract indexes holder data",  note: "Real-time balance & hold time capture" },
                { label: "Hold-time weighting applied",          note: "Longer hold = larger allocation share" },
                { label: "Distribution calculated on-chain",     note: "Proportional to supply & hold duration" },
                { label: "SOL sent to holder wallets",           note: "Automatic — no claiming, no staking" },
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: i < 5 ? 18 : 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                      background: i === 0 || i === 5 ? "var(--green-dim)" : "var(--bg-elevated)",
                      border: `1px solid ${i === 0 || i === 5 ? "var(--green-border)" : "var(--border)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-mono)", fontSize: 9,
                      color: i === 0 || i === 5 ? "var(--green-bright)" : "var(--text-dim)",
                    }}>{i + 1}</div>
                    {i < 5 && <div style={{ width: 1, height: 14, background: "var(--border-subtle)", margin: "3px 0" }} />}
                  </div>
                  <div style={{ paddingTop: 2 }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 1 }}>{step.label}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)" }}>{step.note}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ padding: "0 20px 20px" }}>
              <a href={PUMP_FUN_URL} target="_blank" rel="noopener noreferrer"
                className="btn-glow"
                style={{
                  display: "block", textAlign: "center",
                  fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13,
                  color: "#040607", background: "var(--green-bright)",
                  textDecoration: "none", padding: "12px",
                  borderRadius: "var(--radius-sm)",
                }}
              >Buy $CASHBACK and start earning →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
