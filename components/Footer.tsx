"use client";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", padding: "48px 20px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 48, marginBottom: 40, flexWrap: "wrap" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 24, height: 24, background: "var(--green)", borderRadius: 5,
                fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 12, color: "#0e1014",
              }}>$</span>
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--text)", letterSpacing: "-0.02em" }}>
                cashback<span style={{ color: "var(--green)" }}>holders</span>
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-dim)", lineHeight: 1.65, maxWidth: 260 }}>
              A Solana token that distributes trading fees to long-term holders. Built on Pump.fun.
            </p>
          </div>

          {/* Product links */}
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>Product</p>
            {["Leaderboard", "Fee Tracker", "How It Works"].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)", textDecoration: "none", marginBottom: 9, transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                {link}
              </a>
            ))}
          </div>

          {/* Community links */}
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>Community</p>
            {[
              { label: "Pump.fun",    href: "https://pump.fun" },
              { label: "Telegram",    href: "https://t.me" },
              { label: "X / Twitter", href: "https://twitter.com" },
              { label: "Solscan",     href: "https://solscan.io" },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)", textDecoration: "none", marginBottom: 9, transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                {label}
              </a>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: "var(--border-muted)", marginBottom: 24 }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-dim)" }}>
            © {new Date().getFullYear()} Cashback Holders. Built on Solana.
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-dim)" }}>
            Not financial advice. DYOR.
          </p>
        </div>
      </div>
    </footer>
  );
}
