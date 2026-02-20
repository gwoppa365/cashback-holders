"use client";
import { PUMP_FUN_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-elevated)", borderTop: "1px solid var(--border)", padding: "60px 24px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 48, marginBottom: 52 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10,
                background: "linear-gradient(135deg, var(--blue), #6366f1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, boxShadow: "var(--blue-glow-md)",
              }}>🐋</div>
              <div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15, color: "var(--text)", letterSpacing: "-0.03em" }}>Whale<span style={{ color: "var(--blue-bright)" }}>Spy</span></div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-dim)", letterSpacing: "0.06em" }}>POWERED BY $SPY</div>
              </div>
            </div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-dim)", lineHeight: 1.8, maxWidth: 240, marginBottom: 20 }}>
              Solana whale intelligence platform. Track smart money, buy $SPY for pro access.
            </p>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-dim)",
              background: "var(--bg-card)", border: "1px solid var(--blue-border)",
              padding: "8px 12px", borderRadius: "var(--radius-sm)", lineHeight: 1.6,
            }}>
              <div style={{ letterSpacing: "0.06em", fontSize: 8, textTransform: "uppercase", marginBottom: 4, color: "var(--blue-bright)" }}>$SPY Contract</div>
              <div style={{ color: "var(--blue-bright)", letterSpacing: "0.04em" }}>Launching soon on Pump.fun</div>
            </div>
          </div>

          {/* Product */}
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 18 }}>Product</p>
            {[
              { label: "Live Feed",    href: "#feed" },
              { label: "Tracker",      href: "#tracker" },
              { label: "Pro Access",   href: "#pro" },
              { label: "How it Works", href: "#mechanics" },
            ].map(({ label, href }) => (
              <a key={label} href={href} style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)", textDecoration: "none", marginBottom: 10, transition: "color 0.15s" }}
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
              { label: "Solscan",    href: "https://solscan.io" },
              { label: "Birdeye",    href: "https://birdeye.so" },
              { label: "Solana FM",  href: "https://solana.fm" },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)", textDecoration: "none", marginBottom: 10, transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >{label} ↗</a>
            ))}
          </div>

          {/* Community + CTA */}
          <div>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 600, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 18 }}>Community</p>
            <a href="https://x.com/WhaleSpySol" target="_blank" rel="noopener noreferrer" style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)", textDecoration: "none", marginBottom: 10, transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >X / Twitter ↗</a>

            <div style={{ marginTop: 24 }}>
              <a href={PUMP_FUN_URL} target="_blank" rel="noopener noreferrer" className="btn-blue" style={{
                display: "inline-block", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13,
                color: "#fff", background: "var(--blue)",
                textDecoration: "none", padding: "10px 20px", borderRadius: "var(--radius-sm)",
              }}>Buy $SPY →</a>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "var(--border)", marginBottom: 24 }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)" }}>© {new Date().getFullYear()} WhaleSpy · Powered by $SPY. All rights reserved.</p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)" }}>Not financial advice. Crypto carries risk. DYOR.</p>
        </div>
      </div>
    </footer>
  );
}
