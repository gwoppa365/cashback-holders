"use client";

const steps = [
  { num: "01", icon: "💰", title: "Buy & Hold $CASHBACK", desc: "Purchase $CASHBACK on Pump.fun. The moment you buy, your hold timer starts. Never sell — the longer you hold, the more you earn.", accent: "#4ade80" },
  { num: "02", icon: "📈", title: "Earn Distributed Fees", desc: "Every buy and sell generates 0.5% SOL in fees — distributed automatically to $CASHBACK holders based on hold time and ranking.", accent: "#4ade80" },
  { num: "03", icon: "🏆", title: "Climb the Leaderboard", desc: "Hold time is tracked on-chain. The longer you hold, the higher your rank. Top holders receive the largest fee allocations.", accent: "#4ade80" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: "var(--bg)", padding: "100px 0", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* Section header */}
        <div style={{ marginBottom: 60 }}>
          <div style={{
            display: "inline-block",
            background: "rgba(74,222,128,0.08)",
            border: "1px solid rgba(74,222,128,0.2)",
            borderRadius: 6,
            padding: "3px 10px",
            marginBottom: 16,
          }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#4ade80", letterSpacing: "0.06em", textTransform: "uppercase" }}>03</span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 44px)",
            letterSpacing: "-0.025em",
            color: "#fff",
            margin: "0 0 12px",
            lineHeight: 1.2,
          }}>
            How It Works
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--text-muted)", fontWeight: 400, lineHeight: 1.625, maxWidth: 440 }}>
            Three simple mechanics. One powerful cashback system that rewards patience.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {steps.map((step) => (
            <div
              key={step.num}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: "32px 28px",
                boxShadow: "var(--shadow-card)",
                transition: "border-color 0.2s, background 0.2s, transform 0.15s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(74,222,128,0.3)";
                e.currentTarget.style.background = "var(--bg-card-alt)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "var(--bg-card)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <p style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, color: "#4ade80", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>{step.num}</p>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{step.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "#fff", letterSpacing: "-0.02em", margin: "0 0 10px" }}>{step.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, color: "var(--text-muted)", lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Stat strip */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          marginTop: 72,
          border: "1px solid var(--border)",
          borderRadius: 14,
          overflow: "hidden",
          background: "var(--bg-card)",
        }}>
          {[
            { value: "0.5%",     label: "SOL earned per trade, distributed to holders" },
            { value: "14d+",     label: "Hold time tracked on-chain" },
            { value: "Automatic", label: "Cashback paid without claiming" },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              background: i % 2 === 0 ? "var(--bg-card)" : "var(--bg-card-alt)",
              padding: "36px 28px",
              borderRight: i < 2 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, color: "#4ade80", letterSpacing: "-0.025em", marginBottom: 10 }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 400, color: "var(--text-muted)", lineHeight: 1.5 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
