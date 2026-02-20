"use client";
import { PUMP_FUN_URL, SOLSCAN_URL, TOKEN_MINT } from "@/lib/constants";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-elevated)", borderTop: "1px solid var(--border)", padding: "60px 24px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48, marginBottom: 52 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <img src="/logo.png" alt="Cashback Holders" style={{ width: 34, height: 34, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15, color: "var(--text)", letterSpacing: "-0.03em" }}>
                  Cashback<span style={{ color: "var(--green-bright)" }}>Holders</span>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-dim)", letterSpacing: "0.06em" }}>PROTOCOL</div>
              </div>
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-dim)", lineHeight: 1.8, maxWidth: 240, marginBottom: 20 }}>
              Hold $CASHBACK and earn from every trade. 100% of creator fees distributed to holders, weighted by hold time.
            </p>
            {/* CA */}
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-dim)",
              background: "var(--bg-card)", border: "1px solid var(--border)",
              padding: "8px 12px", borderRadius: "var(--radius-sm)",
              wordBreak: "break-all", lineHeight: 1.6,
            }}>
              <div style={{ color: "var(--text-dim)", marginBottom: 2, letterSpacing: "0.06em", fontSize: 8, textTransform: "uppercase" }}>Contract</div>
              {TOKEN_MINT}
            </div>
          </div>

          {/* Protocol */}
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 18 }}>Protocol</p>
            {[
              { label: "Distribution Registry", href: "#leaderboard" },
              { label: "Yield Calculator",       href: "#calculator" },
              { label: "Fee Dashboard",          href: "#distribution" },
              { label: "Mechanics",              href: "#mechanics" },
            ].map(({ label, href }) => (
              <a key={label} href={href} style={{
                display: "block", fontFamily: "var(--font-sans)", fontSize: 13,
                color: "var(--text-muted)", textDecoration: "none", marginBottom: 10,
                transition: "color 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >{label}</a>
            ))}
          </div>

          {/* Ecosystem */}
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 18 }}>Ecosystem</p>
            {[
              { label: "Pump.fun",   href: PUMP_FUN_URL },
              { label: "Solscan",    href: SOLSCAN_URL },
              { label: "Solana FM",  href: `https://solana.fm/address/${TOKEN_MINT}` },
              { label: "Birdeye",    href: `https://birdeye.so/token/${TOKEN_MINT}` },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                display: "block", fontFamily: "var(--font-sans)", fontSize: 13,
                color: "var(--text-muted)", textDecoration: "none", marginBottom: 10,
                transition: "color 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >{label} ↗</a>
            ))}
          </div>

          {/* Community */}
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 18 }}>Community</p>
            {[
              { label: "X / Twitter", href: "https://x.com/CashbackHolders" },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                display: "block", fontFamily: "var(--font-sans)", fontSize: 13,
                color: "var(--text-muted)", textDecoration: "none", marginBottom: 10,
                transition: "color 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >{label} ↗</a>
            ))}

            {/* Buy CTA */}
            <div style={{ marginTop: 24 }}>
              <a href={PUMP_FUN_URL} target="_blank" rel="noopener noreferrer"
                className="btn-glow"
                style={{
                  display: "inline-block", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13,
                  color: "#040607", background: "var(--green-bright)",
                  textDecoration: "none", padding: "10px 20px",
                  borderRadius: "var(--radius-sm)",
                }}
              >Buy $CASHBACK →</a>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "var(--border)", marginBottom: 24 }} />

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
