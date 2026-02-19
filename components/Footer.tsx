"use client";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", padding: "56px 24px 40px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 48 }}>
          {/* Logo + tagline */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 30, height: 30,
                background: "linear-gradient(135deg, #4ade80, #22c55e)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
              }}>
                💰
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "#fff", letterSpacing: "-0.02em" }}>
                cashback<span style={{ color: "#4ade80" }}>holders</span>
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", fontWeight: 400, maxWidth: 240, lineHeight: 1.6 }}>
              The Solana token that rewards holders. Hold $CASHBACK, earn automatically.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Product</p>
              {["Leaderboard", "Fee Tracker", "How It Works"].map((link) => (
                <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", textDecoration: "none", marginBottom: 10, transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                  {link}
                </a>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Community</p>
              {[
                { label: "Pump.fun",    href: "https://pump.fun" },
                { label: "Telegram",    href: "https://t.me" },
                { label: "X / Twitter", href: "https://twitter.com" },
                { label: "Solscan",     href: "https://solscan.io" },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--text-muted)", textDecoration: "none", marginBottom: 10, transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--border)", marginBottom: 28 }} />

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-dim)" }}>
            © {new Date().getFullYear()} Cashback Holders. Built on Solana.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { label: "X", href: "https://twitter.com" },
              { label: "TG", href: "https://t.me" },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-dim)", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
