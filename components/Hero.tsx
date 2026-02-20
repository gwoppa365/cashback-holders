"use client";
// v3 — live data
import { useQuery } from "@tanstack/react-query";
import { TOKEN_MINT, PUMP_FUN_URL, SOLSCAN_URL } from "@/lib/constants";

function fmt(n: number | null, prefix = "", decimals = 2): string {
  if (n === null || n === undefined) return "—";
  if (n >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(decimals)}M`;
  if (n >= 1_000)     return `${prefix}${(n / 1_000).toFixed(decimals)}K`;
  return `${prefix}${n.toFixed(decimals)}`;
}

function fmtPrice(n: number | null): string {
  if (n === null || n === undefined) return "—";
  if (n < 0.000001) return `$${n.toExponential(2)}`;
  if (n < 0.01)     return `$${n.toFixed(8)}`;
  return `$${n.toFixed(4)}`;
}

export default function Hero() {
  const { data, isLoading } = useQuery({
    queryKey: ["token"],
    queryFn:  () => fetch("/api/token").then((r) => r.json()),
  });

  const isLive    = !isLoading && data && !data.error;
  const change    = data?.priceChange24h ?? null;
  const changePos = change !== null && change >= 0;

  const stats = [
    { label: "Market Cap",   value: fmt(data?.marketCap ?? null, "$") },
    { label: "24h Volume",   value: fmt(data?.volume24h ?? null, "$") },
    { label: "Holders",      value: data?.holders ? data.holders.toLocaleString() : "—" },
    { label: "Total Supply", value: "1,000,000,000" },
    { label: "Fees (24h)",   value: data?.feesEstimatedSol ? `◎ ${data.feesEstimatedSol}` : "—" },
    { label: "Fee rate",     value: "0.50%" },
  ];

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
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.06em" }}>
              {isLive ? "LIVE · SOLANA MAINNET" : "LAUNCHING SOON · SOLANA MAINNET"}
            </span>
          </div>
          <div style={{ height: 12, width: 1, background: "var(--border)" }} />
          <a href={PUMP_FUN_URL} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", textDecoration: "none", letterSpacing: "0.06em", transition: "color 0.15s" }}
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
              <a href={PUMP_FUN_URL} target="_blank" rel="noopener noreferrer" style={{
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
                {["#da3633","#bb8009","#2ea043"].map((c) => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />
                ))}
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)" }}>$CASHBACK / SOL · Pump.fun</span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: isLive ? "var(--green-bright)" : "var(--text-dim)", display: "inline-block" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)" }}>
                  {isLive ? "LIVE" : "SOON"}
                </span>
              </div>
            </div>

            {/* Price block */}
            <div style={{ padding: "20px 20px 0" }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Last Price</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 16 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 32, color: isLive ? "var(--text)" : "var(--text-dim)", letterSpacing: "-0.03em" }}>
                  {fmtPrice(data?.price ?? null)}
                </span>
                {change !== null ? (
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
                    color: changePos ? "var(--green-bright)" : "var(--red)",
                    background: changePos ? "rgba(63,185,80,0.1)" : "rgba(218,54,51,0.1)",
                    border: `1px solid ${changePos ? "rgba(63,185,80,0.2)" : "rgba(218,54,51,0.2)"}`,
                    padding: "2px 8px", borderRadius: "var(--radius-xs)",
                  }}>
                    {changePos ? "+" : ""}{change.toFixed(2)}%
                  </span>
                ) : (
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
                    color: "var(--text-dim)",
                    background: "var(--bg-elevated)", border: "1px solid var(--border)",
                    padding: "2px 8px", borderRadius: "var(--radius-xs)",
                  }}>Not launched</span>
                )}
              </div>

              {/* Data grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderTop: "1px solid var(--border-subtle)" }}>
                {stats.map((item, i) => (
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
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", wordBreak: "break-all" }}>
                {TOKEN_MINT}
              </div>
            </div>

            {/* Action */}
            <div style={{ padding: "12px 20px 20px" }}>
              <a href={PUMP_FUN_URL} target="_blank" rel="noopener noreferrer" style={{
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
