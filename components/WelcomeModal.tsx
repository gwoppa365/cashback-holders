"use client";
import { useState, useEffect } from "react";
import { PUMP_FUN_URL } from "@/lib/constants";

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("whalespy-seen")) setOpen(true);
  }, []);

  function dismiss() {
    sessionStorage.setItem("whalespy-seen", "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div onClick={dismiss} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(4,6,12,0.92)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
    }}>
      <div className="modal-in" onClick={e => e.stopPropagation()} style={{
        background: "var(--bg-card)", border: "1px solid var(--blue-border)",
        borderRadius: 20, padding: "44px 40px", maxWidth: 500, width: "100%",
        position: "relative", boxShadow: "0 32px 80px rgba(0,0,0,0.7), var(--blue-glow)",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--blue), transparent)", borderRadius: "20px 20px 0 0" }} />

        <button onClick={dismiss} style={{
          position: "absolute", top: 16, right: 16,
          background: "var(--bg-elevated)", border: "1px solid var(--border)",
          color: "var(--text-dim)", fontSize: 16, cursor: "pointer",
          width: 28, height: 28, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.15s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--text-dim)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-dim)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
        >×</button>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "var(--blue-dim)", border: "1px solid var(--blue-border)",
            borderRadius: 100, padding: "5px 14px", marginBottom: 18,
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--blue-bright)", letterSpacing: "0.1em" }}>WHALESPY · SOLANA INTELLIGENCE</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 22, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 12 }}>
            See every whale move.<br />
            <span style={{ background: "linear-gradient(135deg, #38bdf8, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Before it pumps.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7 }}>
            WhaleSpy tracks real-time swap activity from top Solana wallets. Hold $SPY to unlock pro access.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {[
            { icon: "👁", text: "Watch whale wallets buy and sell in real time" },
            { icon: "🔍", text: "Track any Solana wallet's full swap history" },
            { icon: "🔓", text: "Hold 1M $SPY to unlock Pro — unlimited access" },
          ].map(s => (
            <div key={s.text} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{s.icon}</span>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{s.text}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
          <button onClick={dismiss} style={{
            flex: 1, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14,
            color: "var(--text-muted)", background: "var(--bg-elevated)",
            border: "1px solid var(--border)", borderRadius: 10, padding: "14px",
            cursor: "pointer", transition: "all 0.15s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--text-dim)"; (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
          >Start for free</button>

          <a href={PUMP_FUN_URL} target="_blank" rel="noopener noreferrer" onClick={dismiss} className="btn-blue" style={{
            flex: 1, display: "block", textAlign: "center",
            fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14,
            color: "#fff", background: "var(--blue)",
            textDecoration: "none", padding: "14px",
            borderRadius: 10,
          }}>Get Pro Access →</a>
        </div>

        <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)", textAlign: "center" }}>
          Not financial advice. Crypto carries risk. DYOR. 18+ only.
        </p>
      </div>
    </div>
  );
}
