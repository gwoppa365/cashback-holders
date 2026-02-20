"use client";
import { useState, useEffect } from "react";
import { PUMP_FUN_URL } from "@/lib/constants";

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("cashback-modal-seen");
    if (!seen) setOpen(true);
  }, []);

  function dismiss() {
    sessionStorage.setItem("cashback-modal-seen", "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div onClick={dismiss} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(4,6,10,0.9)",
      backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px",
    }}>
      <div className="modal-in" onClick={e => e.stopPropagation()} style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: "44px 40px",
        maxWidth: 520, width: "100%",
        position: "relative",
        boxShadow: "0 32px 80px rgba(0,0,0,0.7), var(--green-glow)",
      }}>

        {/* Close */}
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

        {/* Logo / badge */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "var(--green-dim)", border: "1px solid var(--green-border)",
            borderRadius: 100, padding: "5px 14px", marginBottom: 18,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green-bright)", display: "inline-block" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--green-bright)", letterSpacing: "0.1em" }}>$CASHBACK PROTOCOL</span>
          </div>

          <h2 style={{
            fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 24,
            color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 12,
          }}>
            Trade. Hold. <span className="green-text">Earn.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7 }}>
            $CASHBACK distributes 100% of creator fees to holders — not traders. The longer you hold, the bigger your share of every trade.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          {[
            { step: "1", text: <>Buy <span style={{ color: "var(--green-bright)", fontWeight: 700 }}>$CASHBACK</span> on Pump.fun and your hold timer starts automatically</> },
            { step: "2", text: "Every buy and sell generates 0.5% SOL fees — added to the distribution pool" },
            { step: "3", text: "Fees are sent to your wallet, weighted by how long you've held — no staking or claiming needed" },
          ].map(s => (
            <div key={s.step} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                background: "var(--green-dim)", border: "1px solid var(--green-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11, color: "var(--green-bright)",
                marginTop: 1,
              }}>{s.step}</div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.65 }}>{s.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a href={PUMP_FUN_URL} target="_blank" rel="noopener noreferrer"
          className="btn-glow"
          onClick={dismiss}
          style={{
            display: "block", textAlign: "center", width: "100%",
            fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: 15,
            color: "#040607", background: "var(--green-bright)",
            textDecoration: "none", padding: "16px 24px",
            borderRadius: 10, boxSizing: "border-box", marginBottom: 20,
          }}
        >I'm ready to start earning →</a>

        {/* Disclaimer */}
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)", textAlign: "center", lineHeight: 1.6 }}>
          Not financial advice. Crypto assets carry risk. DYOR. By continuing you certify you are 18+.
        </p>
      </div>
    </div>
  );
}
