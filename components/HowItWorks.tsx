"use client";

const steps = [
  {
    num: "01",
    title: "Acquire $CASHBACK",
    desc: "Buy $CASHBACK on Pump.fun. Your hold timer starts from the moment your wallet receives tokens. No lock-up required.",
  },
  {
    num: "02",
    title: "Hold to earn more",
    desc: "Fee distribution is weighted by hold duration and on-chain rank. Every hour you hold increases your allocation share.",
  },
  {
    num: "03",
    title: "Receive distributed fees",
    desc: "SOL fees are distributed automatically to wallets based on hold time and leaderboard position. No claiming needed.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: "80px 0", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

        {/* Header */}
        <div style={{ maxWidth: 480, marginBottom: 48 }}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 500, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
            How It Works
          </div>
          <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 12 }}>
            Three steps to earning $CASHBACK rewards
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65 }}>
            Rewards are passive. No staking contracts, no governance votes. Just hold and earn.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 48 }}>
          {steps.map((step) => (
            <div
              key={step.num}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "28px 24px",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--text-dim)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 500,
                color: "var(--green)",
                marginBottom: 20,
                letterSpacing: "0.04em",
              }}>
                {step.num}
              </div>
              <h3 style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 16,
                color: "var(--text)",
                letterSpacing: "-0.02em",
                marginBottom: 10,
                lineHeight: 1.3,
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                color: "var(--text-muted)",
                lineHeight: 1.65,
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom stats bar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          background: "var(--bg-card)",
        }}>
          {[
            { value: "0.5%",     label: "of every trade goes to holders" },
            { value: "On-chain", label: "hold time tracking, fully verifiable" },
            { value: "Auto",     label: "payouts, no wallet interaction needed" },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              padding: "28px 24px",
              borderLeft: i > 0 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                fontSize: 22,
                color: "var(--text)",
                letterSpacing: "-0.03em",
                marginBottom: 6,
              }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
