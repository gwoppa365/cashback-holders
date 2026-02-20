"use client";
import { PUMP_FUN_URL } from "@/lib/constants";

const FREE_FEATURES = [
  "Live whale activity feed",
  "Track any wallet (last 20 swaps)",
  "Token buy/sell signals",
  "Pump.fun activity",
  "Basic leaderboard",
];

const PRO_FEATURES = [
  "Everything in Free",
  "Unlimited wallet history",
  "Pro status badge",
  "Priority data refresh (15s)",
  "Multi-wallet comparison",
  "Whale alert signals",
];

export default function ProGate() {
  return (
    <section id="pro" style={{ padding: "100px 0", background: "var(--bg)", borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>

      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 400, background: "radial-gradient(ellipse, rgba(14,165,233,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", position: "relative" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "var(--blue-dim)", border: "1px solid var(--blue-border)",
            borderRadius: 100, padding: "4px 12px", marginBottom: 16,
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--blue-bright)", letterSpacing: "0.1em" }}>PRO ACCESS</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,4vw,42px)", color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 14 }}>
            Unlock with $CASHBACK
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--text-muted)", maxWidth: 440, margin: "0 auto", lineHeight: 1.7 }}>
            Hold 1,000,000 $CASHBACK tokens to unlock pro features. The more you hold, the more you access.
          </p>
        </div>

        {/* Tiers */}
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

          {/* Free */}
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--border)",
            borderRadius: "var(--radius-2xl)", padding: "32px 28px",
          }}>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Free</div>
              <div style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: 36, color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 4 }}>$0</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)" }}>No token required</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {FREE_FEATURES.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--bg-elevated)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "var(--text-dim)", flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)" }}>{f}</span>
                </div>
              ))}
            </div>

            <a href="#feed" style={{
              display: "block", textAlign: "center",
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14,
              color: "var(--text-muted)", textDecoration: "none",
              padding: "12px", borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)", transition: "all 0.15s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--text-dim)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
            >Start for free</a>
          </div>

          {/* Pro */}
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--blue-border)",
            borderRadius: "var(--radius-2xl)", padding: "32px 28px",
            position: "relative", overflow: "hidden",
            boxShadow: "var(--blue-glow)",
          }}>
            {/* Top gradient */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--blue), transparent)" }} />

            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--blue-bright)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Pro</div>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--blue-bright)",
                  background: "var(--blue-dim)", border: "1px solid var(--blue-border)",
                  padding: "1px 7px", borderRadius: 100,
                }}>RECOMMENDED</span>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: 36, color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 4 }}>1M</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)" }}>$CASHBACK tokens required</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {PRO_FEATURES.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--blue-dim)", border: "1px solid var(--blue-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "var(--blue-bright)", flexShrink: 0 }}>✓</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text)" }}>{f}</span>
                </div>
              ))}
            </div>

            <a href={PUMP_FUN_URL} target="_blank" rel="noopener noreferrer" className="btn-blue" style={{
              display: "block", textAlign: "center",
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14,
              color: "#fff", background: "var(--blue)",
              textDecoration: "none", padding: "13px",
              borderRadius: "var(--radius-sm)",
            }}>Buy $CASHBACK on Pump.fun →</a>
          </div>
        </div>

        {/* How to verify */}
        <div style={{
          marginTop: 24, padding: "18px 24px",
          background: "var(--bg-card)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)", textAlign: "center",
        }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)" }}>
            To verify pro status, enter your wallet address in the{" "}
            <a href="#tracker" style={{ color: "var(--blue)", textDecoration: "none" }}>Wallet Tracker ↑</a>
            {" "}— your $CASHBACK balance is checked live from on-chain data.
          </span>
        </div>
      </div>
    </section>
  );
}
