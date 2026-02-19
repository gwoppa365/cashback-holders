"use client";

export default function Hero() {
  return (
    <section style={{
      background: "var(--bg)",
      paddingTop: 100,
      paddingBottom: 80,
      position: "relative",
      overflow: "hidden",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
    }}>
      {/* Background dot grid */}
      <div className="pattern-dots" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* Large green glow behind logo */}
      <div style={{
        position: "absolute",
        top: "50%",
        right: "5%",
        transform: "translateY(-50%)",
        width: 700,
        height: 700,
        background: "radial-gradient(circle, rgba(74,222,128,0.1) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Subtle left glow */}
      <div style={{
        position: "absolute",
        top: "30%",
        left: "-10%",
        width: 500,
        height: 500,
        background: "radial-gradient(circle, rgba(74,222,128,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 24px",
        position: "relative",
        zIndex: 10,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 40,
        flexWrap: "wrap",
      }}>

        {/* LEFT — Text content */}
        <div style={{ flex: "1 1 460px", maxWidth: 560 }}>

          {/* Live pill */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(74,222,128,0.08)",
            border: "1px solid rgba(74,222,128,0.25)",
            borderRadius: 100,
            padding: "6px 16px",
            marginBottom: 28,
          }}>
            <span style={{ position: "relative", display: "inline-flex", width: 7, height: 7 }}>
              <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#4ade80", opacity: 0.7 }} />
              <span style={{ position: "relative", width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "#4ade80" }}>
              Live on Solana · Pump.fun
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#fff",
            margin: "0 0 22px",
          }}>
            Hold{" "}
            <span style={{ color: "#4ade80", textShadow: "0 0 40px rgba(74,222,128,0.5)" }}>
              $CASHBACK
            </span>
            <br />
            and earn{" "}
            <span style={{ color: "#4ade80", textShadow: "0 0 40px rgba(74,222,128,0.5)" }}>
              automatically.
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            fontWeight: 400,
            lineHeight: 1.75,
            color: "#8888aa",
            maxWidth: 480,
            margin: "0 0 40px",
          }}>
            Fees distributed based on hold time and ranking. The longer you hold, the more you earn. Climb the leaderboard.
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a
              href="https://pump.fun"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#4ade80",
                color: "#0a0a12",
                fontWeight: 700,
                fontSize: 15,
                padding: "14px 30px",
                borderRadius: 10,
                textDecoration: "none",
                fontFamily: "var(--font-display)",
                display: "inline-block",
                boxShadow: "0 0 28px rgba(74,222,128,0.35)",
                transition: "background 0.15s, transform 0.1s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#86efac";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(74,222,128,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#4ade80";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px rgba(74,222,128,0.35)";
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
                padding: "14px 30px",
                borderRadius: 10,
                textDecoration: "none",
                fontFamily: "var(--font-display)",
                border: "1px solid #1e2040",
                display: "inline-block",
                transition: "border-color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#4ade80";
                (e.currentTarget as HTMLElement).style.background = "rgba(74,222,128,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#1e2040";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              View Leaderboard
            </a>
          </div>

          {/* Inline stats */}
          <div style={{
            display: "flex",
            gap: 32,
            marginTop: 52,
            paddingTop: 32,
            borderTop: "1px solid #1e2040",
            flexWrap: "wrap",
          }}>
            {[
              { value: "1,247",    label: "Holders" },
              { value: "◎ 142.8", label: "SOL Distributed" },
              { value: "14 Days",  label: "Longest Hold" },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "#4ade80", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 6 }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#8888aa" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Floating logo */}
        <div style={{
          flex: "1 1 360px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}>
          {/* Outer glow ring */}
          <div style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Rotating dashed ring */}
          <div style={{
            position: "absolute",
            width: 380,
            height: 380,
            borderRadius: "50%",
            border: "1px dashed rgba(74,222,128,0.15)",
            animation: "orbit-spin 20s linear infinite",
            pointerEvents: "none",
          }} />

          {/* Inner ring */}
          <div style={{
            position: "absolute",
            width: 310,
            height: 310,
            borderRadius: "50%",
            border: "1px solid rgba(74,222,128,0.08)",
            pointerEvents: "none",
          }} />

          {/* The logo image — floating */}
          <div className="float-logo" style={{ position: "relative", zIndex: 2 }}>
            <img
              src="/logo.png"
              alt="$Cashback Holders"
              style={{
                width: "clamp(280px, 30vw, 420px)",
                height: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 0 40px rgba(74,222,128,0.35)) drop-shadow(0 20px 60px rgba(0,0,0,0.5))",
              }}
            />
          </div>

          {/* Floating stat badges */}
          <div style={{
            position: "absolute",
            top: "8%",
            right: "2%",
            background: "var(--bg-card)",
            border: "1px solid rgba(74,222,128,0.25)",
            borderRadius: 12,
            padding: "10px 16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            animation: "float-2 6s ease-in-out infinite",
          }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "#4ade80" }}>+14.2%</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#8888aa", marginTop: 2 }}>24h Change</div>
          </div>

          <div style={{
            position: "absolute",
            bottom: "10%",
            left: "4%",
            background: "var(--bg-card)",
            border: "1px solid rgba(74,222,128,0.25)",
            borderRadius: 12,
            padding: "10px 16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            animation: "float-4 7s ease-in-out infinite 1s",
          }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "#fbbf24" }}>◎ 142.8</div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "#8888aa", marginTop: 2 }}>SOL Earned</div>
          </div>
        </div>

      </div>
    </section>
  );
}
