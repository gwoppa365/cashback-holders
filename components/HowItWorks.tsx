"use client";
import { PUMP_FUN_URL } from "@/lib/constants";

const STEPS = [
  { n: "01", icon: "👁", title: "Watch the feed", desc: "The live feed pulls real-time swap data from top $SPY holder wallets — showing exactly what tokens they're buying and selling across Pump.fun, Raydium, and Jupiter." },
  { n: "02", icon: "🔍", title: "Track any wallet", desc: "Paste any Solana wallet address into the tracker to see their full recent swap history. Useful for following whales, researching wallets, or checking your own activity." },
  { n: "03", icon: "🔓", title: "Unlock pro with $SPY", desc: "Hold 1,000,000 $SPY tokens for pro access. Your balance is verified live from on-chain data — no login, no signup, just hold and access." },
];

export default function HowItWorks() {
  return (
    <section id="mechanics" style={{ padding: "100px 0", background: "var(--bg-card)", borderTop: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 400, height: 400, background: "radial-gradient(circle, rgba(14,165,233,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        <div style={{ marginBottom: 56 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "var(--blue-dim)", border: "1px solid var(--blue-border)",
            borderRadius: 100, padding: "4px 12px", marginBottom: 16,
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--blue-bright)", letterSpacing: "0.1em" }}>HOW IT WORKS</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(22px,3vw,34px)", color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 10 }}>Simple as it gets</h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-muted)", maxWidth: 460, lineHeight: 1.7 }}>
            No wallet connect required. Paste a wallet, see what it's doing. Hold $SPY for full access.
          </p>
        </div>

        <div className="three-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 48 }}>
          {STEPS.map(s => (
            <div key={s.n} style={{
              background: "var(--bg)", border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)", padding: "28px",
              transition: "border-color 0.2s, box-shadow 0.2s",
              position: "relative", overflow: "hidden",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--blue-border)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--blue-glow)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              <div style={{ position: "absolute", top: 16, right: 20, fontFamily: "var(--font-mono)", fontWeight: 900, fontSize: 64, color: "var(--border-subtle)", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>{s.n}</div>
              <div style={{ fontSize: 28, marginBottom: 16 }}>{s.icon}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--blue-bright)", letterSpacing: "0.06em", marginBottom: 8 }}>STEP {s.n}</div>
              <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 16, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          background: "var(--bg)", border: "1px solid var(--blue-border)", borderRadius: "var(--radius-xl)",
          padding: "32px 36px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20,
          boxShadow: "var(--blue-glow)",
        }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 18, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 6 }}>Ready to track smarter?</h3>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-muted)" }}>Buy $SPY on Pump.fun to unlock pro access and stay ahead of the market.</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <a href="#feed" className="btn-ghost" style={{
              fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14,
              color: "var(--text-muted)", textDecoration: "none", padding: "12px 22px",
              borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", display: "inline-block",
            }}>View Live Feed</a>
            <a href={PUMP_FUN_URL} target="_blank" rel="noopener noreferrer" className="btn-blue" style={{
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14,
              color: "#fff", background: "var(--blue)",
              textDecoration: "none", padding: "12px 22px", borderRadius: "var(--radius-sm)", display: "inline-block",
            }}>Buy $SPY →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
