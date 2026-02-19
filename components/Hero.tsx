"use client";

export default function Hero() {
  return (
    <section style={{
      background: "var(--bg)",
      paddingTop: 56,
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="bg-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.6 }} />

      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "80px 20px",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 420px",
        gap: 60,
        alignItems: "center",
        position: "relative",
        zIndex: 1,
      }}>

        {/* LEFT */}
        <div>
          {/* Status badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            border: "1px solid var(--border)",
            borderRadius: 100,
            padding: "5px 12px",
            marginBottom: 32,
            background: "var(--bg-card)",
          }}>
            <span style={{ position: "relative", display: "inline-flex", width: 6, height: 6 }}>
              <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--green)", opacity: 0.5 }} />
              <span style={{ position: "relative", width: 6, height: 6, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
            </span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500, color: "var(--text-muted)" }}>
              Live on Solana
            </span>
            <span style={{ color: "var(--border)", fontSize: 12 }}>·</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--green)" }}>Pump.fun</span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "clamp(36px, 4.5vw, 58px)",
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            color: "var(--text)",
            marginBottom: 20,
          }}>
            Hold{" "}
            <span style={{ color: "var(--green)" }}>$CASHBACK</span>
            <br />
            earn rewards<br />automatically.
          </h1>

          <p style={{
            fontFamily: "var(--font-sans)",
            fontSize: 16,
            fontWeight: 400,
            lineHeight: 1.7,
            color: "var(--text-muted)",
            maxWidth: 440,
            marginBottom: 36,
          }}>
            Transaction fees are distributed to holders based on hold duration and on-chain rank. No claiming. No staking. Just hold.
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 52 }}>
            <a
              href="https://pump.fun"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "var(--green)",
                color: "#0e1014",
                fontWeight: 600,
                fontSize: 14,
                padding: "10px 20px",
                borderRadius: "var(--radius-sm)",
                textDecoration: "none",
                fontFamily: "var(--font-sans)",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = "1"}
            >
              Buy $CASHBACK
            </a>
            <a
              href="#leaderboard"
              style={{
                background: "transparent",
                color: "var(--text)",
                fontWeight: 500,
                fontSize: 14,
                padding: "10px 20px",
                borderRadius: "var(--radius-sm)",
                textDecoration: "none",
                fontFamily: "var(--font-sans)",
                border: "1px solid var(--border)",
                transition: "border-color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--text-muted)";
                (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              View Leaderboard
            </a>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 0, borderTop: "1px solid var(--border-muted)" }}>
            {[
              { value: "1,247",    label: "Holders" },
              { value: "◎ 142.8", label: "SOL Distributed" },
              { value: "14d 6h",   label: "Longest Hold" },
            ].map((stat, i) => (
              <div key={stat.label} style={{
                flex: 1,
                paddingTop: 20,
                paddingRight: 24,
                paddingLeft: i === 0 ? 0 : 24,
                borderLeft: i > 0 ? "1px solid var(--border-muted)" : "none",
              }}>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  fontSize: 20,
                  color: "var(--text)",
                  letterSpacing: "-0.02em",
                  marginBottom: 4,
                }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-dim)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Token card */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
        }}>
          {/* Card header */}
          <div style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--border-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 32,
                height: 32,
                background: "var(--green-dim)",
                border: "1px solid var(--green-border)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                fontSize: 13,
                color: "var(--green)",
              }}>$</div>
              <div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--text)" }}>$CASHBACK</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)" }}>Cashback Holders</div>
              </div>
            </div>
            <span style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              fontWeight: 500,
              color: "var(--green)",
              background: "var(--green-dim)",
              border: "1px solid var(--green-border)",
              padding: "2px 8px",
              borderRadius: 100,
            }}>
              +14.2%
            </span>
          </div>

          {/* Price */}
          <div style={{ padding: "20px 20px 0" }}>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Price</div>
            <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 28, color: "var(--text)", letterSpacing: "-0.02em" }}>$0.00042069</div>
          </div>

          {/* Grid of stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            padding: "20px",
          }}>
            {[
              { label: "Market Cap",   value: "$420.7K" },
              { label: "24h Volume",   value: "$88.4K" },
              { label: "Total Supply", value: "1B" },
              { label: "Holders",      value: "1,247" },
              { label: "Creator Fees", value: "◎ 142.8" },
              { label: "Fee Rate",     value: "0.5%" },
            ].map((item, i) => (
              <div key={item.label} style={{
                padding: "12px 0",
                borderTop: "1px solid var(--border-muted)",
                paddingRight: i % 2 === 0 ? 16 : 0,
                paddingLeft: i % 2 === 1 ? 16 : 0,
                borderLeft: i % 2 === 1 ? "1px solid var(--border-muted)" : "none",
              }}>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 500, color: "var(--text)" }}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ padding: "0 20px 20px" }}>
            <a
              href="https://pump.fun"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                width: "100%",
                textAlign: "center",
                background: "var(--green)",
                color: "#0e1014",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 14,
                padding: "11px",
                borderRadius: "var(--radius-sm)",
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = "1"}
            >
              Buy on Pump.fun →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
