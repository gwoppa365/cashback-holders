"use client";

export default function HowItWorks() {
  return (
    <section id="mechanics" style={{ padding: "80px 0", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
            PROTOCOL / 03
          </div>
          <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 22, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 8 }}>
            Protocol Mechanics
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 520, marginBottom: 20 }}>
            This is not Pump.fun's built-in trader fee split. $CASHBACK operates its own distribution protocol — creator fees go to holders, weighted by hold time. The longer you hold, the larger your cut.
          </p>

          {/* Escrow callout */}
          <div style={{
            display: "inline-flex",
            alignItems: "flex-start",
            gap: 12,
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderLeft: "3px solid var(--green)",
            borderRadius: "var(--radius)",
            padding: "14px 18px",
            maxWidth: 620,
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: 4, flexShrink: 0, marginTop: 1,
              background: "var(--green-dim)", border: "1px solid var(--green-border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--green)",
            }}>✓</div>
            <div>
              <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: "var(--text)", marginBottom: 3 }}>
                Custom escrow contract with real-time on-chain scraping
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
                We built a custom escrow contract that scrapes holder data in real-time directly from the Solana blockchain — ensuring every distribution is calculated fairly, transparently, and without any manual intervention.
              </div>
            </div>
          </div>
        </div>

        {/* Steps — horizontal flow */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 28px 1fr 28px 1fr", gap: 0, alignItems: "center", marginBottom: 64 }}>

          {[
            {
              step: "01",
              title: "Buy & hold $CASHBACK",
              desc: "Purchase $CASHBACK on Pump.fun. Your hold clock starts from your first transaction. The longer you hold, the more weight you accumulate — no minimum period required.",
            },
            null,
            {
              step: "02",
              title: "Creator fees accumulate",
              desc: "Every buy and sell generates creator fees collected in SOL. These fees build up in real-time and are allocated to holders — with a heavier share going to those who hold the longest.",
            },
            null,
            {
              step: "03",
              title: "Receive your allocation",
              desc: "Our custom escrow contract scrapes holder data on-chain in real-time and distributes SOL directly to your wallet. Hold more, hold longer — earn more. Fully automatic.",
            },
          ].map((item, i) =>
            item === null ? (
              <div key={i} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <svg width="20" height="8" viewBox="0 0 20 8" fill="none">
                  <path d="M0 4H18M15 1L19 4L15 7" stroke="var(--text-dim)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            ) : (
              <div key={i} style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "24px",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--text-dim)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--green-bright)", marginBottom: 16, letterSpacing: "0.06em" }}>{item.step}</div>
                <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "var(--text)", letterSpacing: "-0.02em", marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            )
          )}
        </div>

        {/* Protocol spec table */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

          {/* Left — parameters */}
          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", background: "var(--bg-elevated)", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Protocol Parameters</span>
            </div>
            {[
              { param: "Fee rate",              value: "0.5% per trade" },
              { param: "Fee currency",          value: "SOL" },
              { param: "Distribution method",   value: "Hold-time weighted" },
              { param: "Settlement",             value: "Custom escrow contract" },
              { param: "Data source",            value: "Real-time on-chain scrape" },
              { param: "Minimum hold period",   value: "None" },
              { param: "Claiming required",     value: "No — automatic" },
              { param: "Staking required",      value: "No" },
              { param: "Lock-up",               value: "No" },
              { param: "Chain",                 value: "Solana" },
            ].map((row, i) => (
              <div key={row.param} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 16px",
                borderBottom: i < 7 ? "1px solid var(--border-subtle)" : "none",
                background: i % 2 === 0 ? "var(--bg-card)" : "transparent",
              }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-muted)" }}>{row.param}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500, color: "var(--text)" }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Right — fee flow */}
          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", background: "var(--bg-elevated)", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Fee Flow</span>
            </div>
            <div style={{ padding: "20px 20px" }}>
              {[
                { label: "Trade executes on Pump.fun",          note: "Buy or sell on bonding curve" },
                { label: "Creator fees collected in SOL",       note: "Fees accumulate in the creator wallet automatically" },
                { label: "Real-time scrape via escrow contract", note: "On-chain holder data indexed — balances & hold time captured" },
                { label: "Hold-time weighting applied",         note: "Holders who hold longer receive a larger allocation" },
                { label: "Proportional distribution calculated", note: "The longer you hold, the greater your share of creator fees" },
                { label: "SOL distributed to holder wallets",   note: "Paid out automatically — no claiming, no staking" },
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: i < 5 ? 16 : 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                      background: i === 0 || i === 5 ? "var(--green-dim)" : "var(--bg-elevated)",
                      border: `1px solid ${i === 0 || i === 5 ? "var(--green-border)" : "var(--border)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-mono)", fontSize: 8, color: i === 0 || i === 5 ? "var(--green-bright)" : "var(--text-dim)",
                    }}>{i + 1}</div>
                    {i < 5 && <div style={{ width: 1, height: 12, background: "var(--border-subtle)", margin: "2px 0" }} />}
                  </div>
                  <div style={{ paddingTop: 1 }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500, color: "var(--text)", marginBottom: 1 }}>{step.label}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)" }}>{step.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
