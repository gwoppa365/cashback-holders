"use client";

export default function Hero() {
  return (
    <section style={{
      background: "var(--bg)",
      paddingTop: 130,
      paddingBottom: 100,
      position: "relative",
      overflow: "hidden",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
    }}>
      {/* Background grid */}
      <div className="pattern-dots" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* Green glow orb */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 600,
        height: 600,
        background: "radial-gradient(circle, rgba(74,222,128,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Main content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 10, textAlign: "center", width: "100%" }}>

        {/* Eyebrow pill */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(74,222,128,0.08)",
          border: "1px solid rgba(74,222,128,0.2)",
          borderRadius: 100,
          padding: "6px 16px",
          marginBottom: 32,
        }}>
          <span style={{ position: "relative", display: "inline-flex", width: 7, height: 7 }}>
            <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#4ade80", opacity: 0.6 }} />
            <span style={{ position: "relative", width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
          </span>
          <span style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 500,
            color: "#4ade80",
          }}>
            Live on Solana · Pump.fun
          </span>
        </div>

        {/* Heading */}
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(38px, 6vw, 72px)",
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: "#fff",
          margin: "0 0 24px",
          maxWidth: 800,
          marginLeft: "auto",
          marginRight: "auto",
        }}>
          Hold{" "}
          <span style={{
            color: "#4ade80",
            textShadow: "0 0 40px rgba(74,222,128,0.4)",
          }}>
            $CASHBACK
          </span>
          {" "}and earn{" "}
          <span style={{ color: "#4ade80", textShadow: "0 0 40px rgba(74,222,128,0.4)" }}>automatically.</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: 18,
          fontWeight: 400,
          lineHeight: 1.7,
          color: "#8888aa",
          maxWidth: 560,
          margin: "0 auto 48px",
        }}>
          Fees distributed based on hold time and ranking. The longer you hold, the more you earn. Climb the leaderboard.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="https://pump.fun"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#4ade80",
              color: "#0a0a12",
              fontWeight: 700,
              fontSize: 15,
              padding: "14px 28px",
              borderRadius: 10,
              textDecoration: "none",
              fontFamily: "var(--font-display)",
              display: "inline-block",
              boxShadow: "0 0 24px rgba(74,222,128,0.3)",
              transition: "background 0.15s, transform 0.1s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#86efac";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(74,222,128,0.45)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#4ade80";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(74,222,128,0.3)";
            }}
          >
            Buy $CASHBACK ↗
          </a>
          <a
            href="#leaderboard"
            style={{
              background: "transparent",
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              padding: "14px 28px",
              borderRadius: 10,
              textDecoration: "none",
              fontFamily: "var(--font-display)",
              border: "1px solid #1e2040",
              display: "inline-block",
              transition: "border-color 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#4ade80";
              (e.currentTarget as HTMLElement).style.background = "rgba(74,222,128,0.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#1e2040";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            View Leaderboard
          </a>
        </div>

        {/* Stats strip */}
        <div style={{
          display: "flex",
          gap: 0,
          justifyContent: "center",
          marginTop: 80,
          flexWrap: "wrap",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
          maxWidth: 700,
          marginLeft: "auto",
          marginRight: "auto",
        }}>
          {[
            { value: "1,247",    label: "Token Holders" },
            { value: "◎ 142.8", label: "SOL Distributed" },
            { value: "14 Days",  label: "Longest Hold" },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              flex: 1,
              minWidth: 150,
              textAlign: "center",
              padding: "28px 20px",
              borderRight: i < 2 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 28,
                color: "#4ade80",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                marginBottom: 8,
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                color: "#8888aa",
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
