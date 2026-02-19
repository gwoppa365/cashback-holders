"use client";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-card)", borderTop: "1px solid var(--border)", padding: "52px 24px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <img src="/logo.png" alt="Cashback Holders" style={{ width: 32, height: 32, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--text)", letterSpacing: "-0.02em" }}>
                CashbackHolders
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-dim)", lineHeight: 1.7, maxWidth: 240, marginBottom: 20 }}>
              A passive yield protocol on Solana. Trading fees distributed to $CASHBACK holders, weighted by hold time and on-chain rank.
            </p>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)",
              background: "var(--bg-elevated)", border: "1px solid var(--border)",
              padding: "6px 10px", borderRadius: "var(--radius-sm)", display: "inline-block",
            }}>
              Built on Solana · Pump.fun
            </div>
          </div>

          {/* Protocol */}
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Protocol</p>
            {[
              { label: "Distribution Registry", href: "#leaderboard" },
              { label: "Fee Dashboard",          href: "#distribution" },
              { label: "Mechanics",              href: "#mechanics" },
              { label: "Overview",               href: "#overview" },
            ].map(({ label, href }) => (
              <a key={label} href={href} style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-muted)", textDecoration: "none", marginBottom: 9, transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                {label}
              </a>
            ))}
          </div>

          {/* Ecosystem */}
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Ecosystem</p>
            {[
              { label: "Pump.fun",    href: "https://pump.fun" },
              { label: "Solscan",     href: "https://solscan.io" },
              { label: "Solana FM",   href: "https://solana.fm" },
              { label: "Birdeye",     href: "https://birdeye.so" },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-muted)", textDecoration: "none", marginBottom: 9, transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                {label} ↗
              </a>
            ))}
          </div>

          {/* Community */}
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Community</p>
            {[
              { label: "X / Twitter", href: "https://x.com/CashbackHolders" },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-muted)", textDecoration: "none", marginBottom: 9, transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                {label} ↗
              </a>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: "var(--border-subtle)", marginBottom: 24 }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)" }}>
            © {new Date().getFullYear()} Cashback Holders Protocol. All rights reserved.
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)" }}>
            Not financial advice. Crypto assets carry risk. DYOR.
          </p>
        </div>
      </div>
    </footer>
  );
}
