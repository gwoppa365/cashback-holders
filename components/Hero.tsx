"use client";

export default function Hero() {
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
      <div className="bg-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.7 }} />

      {/* Subtle top gradient line */}
      <div style={{
        position: "absolute", top: 52, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, var(--green-border), transparent)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 24px", width: "100%", position: "relative", zIndex: 1 }}>

        {/* Top label */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ position: "relative", display: "inline-flex", width: 6, height: 6 }}>
              <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--green-bright)", opacity: 0.4 }} />
              <span style={{ position: "relative", width: 6, height: 6, borderRadius: "50%", background: "var(--green-bright)", display: "inline-block" }} />
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.06em" }}>LIVE · SOLANA MAINNET</span>
          </div>
          <div style={{ height: 12, width: 1, background: "var(--border)" }} />
          <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", textDecoration: "none", letterSpacing: "0.06em", transition: "color 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
          >PUMP.FUN</a>
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 80, alignItems: "center" }}>

          {/* LEFT */}
          <div>
            <h1 style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(40px, 5vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: "var(--text)",
              marginBottom: 24,
            }}>
              A fee distribution<br />
              protocol for<br />
              <span style={{ color: "var(--green-bright)" }}>$CASHBACK</span> holders.
            </h1>

            <p style={{
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: 1.75,
              color: "var(--text-muted)",
              maxWidth: 500,
              marginBottom: 40,
            }}>
              Unlike Pump.fun's built-in trader fee split, $CASHBACK distributes creator fees directly to holders — not to traders. Every buy and sell generates SOL fees that flow to the holder pool. The longer you hold, the greater your share. No staking. No lock-up.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 64 }}>
              <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14,
                color: "#080b0f", background: "var(--green-bright)",
                textDecoration: "none", padding: "10px 20px",
                borderRadius: "var(--radius-sm)", transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = "1"}
              >Buy $CASHBACK on Pump.fun</a>

              <a href="#leaderboard" style={{
                fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 14,
                color: "var(--text-muted)", background: "transparent",
                textDecoration: "none", padding: "10px 20px",
                borderRadius: "var(--radius-sm)", border: "1px solid var(--border)",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >View distribution rankings</a>
            </div>

            {/* Protocol metrics row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: 0, borderTop: "1px solid var(--border)" }}>
              {[
                { value: "◎ 142.8",  label: "SOL Distributed" },
                { value: "1,247",    label: "Active Holders" },
                { value: "0.5%",     label: "Fee Rate" },
                { value: "14d 6h",   label: "Top Hold Time" },
              ].map((s, i) => (
                <div key={s.label} style={{
                  paddingTop: 20,
                  paddingRight: i < 3 ? 32 : 0,
                  paddingLeft: i > 0 ? 32 : 0,
                  borderLeft: i > 0 ? "1px solid var(--border)" : "none",
                }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 18, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Terminal card */}
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>

            {/* Terminal bar */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 16px",
              background: "var(--bg-elevated)",
              borderBottom: "1px solid var(--border)",
            }}>
              <div style={{ display: "flex", gap: 6 }}>
                {["#da3633","#bb8009","#2ea043"].map((c) => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />)}
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)" }}>$CASHBACK / SOL · Pump.fun</span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green-bright)", display: "inline-block" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--green-bright)" }}>LIVE</span>
              </div>
            </div>

            {/* Price block */}
            <div style={{ padding: "20px 20px 0" }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Last Price</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 32, color: "var(--text)", letterSpacing: "-0.03em" }}>$0.00042069</span>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500,
                  color: "var(--green-bright)",
                  background: "var(--green-dim)", border: "1px solid var(--green-border)",
                  padding: "2px 8px", borderRadius: "var(--radius-xs)",
                }}>+14.2%</span>
              </div>

              {/* Data grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderTop: "1px solid var(--border-subtle)" }}>
                {[
                  { label: "Market Cap",   value: "$420,690" },
                  { label: "24h Volume",   value: "$88,420" },
                  { label: "Holders",      value: "1,247" },
                  { label: "Total Supply", value: "1,000,000,000" },
                  { label: "Fees (total)", value: "◎ 142.8" },
                  { label: "Fee rate",     value: "0.50%" },
                ].map((item, i) => (
                  <div key={item.label} style={{
                    padding: "11px 0",
                    borderTop: "1px solid var(--border-subtle)",
                    paddingRight: i % 2 === 0 ? 16 : 0,
                    paddingLeft: i % 2 === 1 ? 16 : 0,
                    borderLeft: i % 2 === 1 ? "1px solid var(--border-subtle)" : "none",
                  }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--text-dim)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.label}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500, color: "var(--text)" }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contract address */}
            <div style={{ padding: "12px 20px", borderTop: "1px solid var(--border-subtle)", background: "var(--bg-elevated)" }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--text-dim)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Contract Address</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>
                TBA — configure after launch
              </div>
            </div>

            {/* Action */}
            <div style={{ padding: "12px 20px 20px" }}>
              <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" style={{
                display: "block", textAlign: "center", width: "100%",
                fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13,
                color: "#080b0f", background: "var(--green-bright)",
                textDecoration: "none", padding: "10px",
                borderRadius: "var(--radius-sm)", transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = "1"}
              >Trade on Pump.fun →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
