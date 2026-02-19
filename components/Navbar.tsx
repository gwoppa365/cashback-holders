"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 52,
      background: scrolled ? "rgba(8,11,15,0.95)" : "rgba(8,11,15,0.7)",
      backdropFilter: "blur(16px)",
      borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
      transition: "all 0.2s",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 4,
            background: "var(--green)", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 11, color: "#080b0f",
          }}>$</div>
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--text)", letterSpacing: "-0.02em" }}>
            Cashback<span style={{ color: "var(--green)" }}>Holders</span>
          </span>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-dim)",
            background: "var(--bg-elevated)", border: "1px solid var(--border)",
            padding: "2px 6px", borderRadius: 3, letterSpacing: "0.04em",
          }}>PROTOCOL</span>
        </a>

        {/* Links */}
        <div style={{ display: "flex", gap: 2 }}>
          {[
            { label: "Overview",     href: "#overview" },
            { label: "Leaderboard",  href: "#leaderboard" },
            { label: "Distribution", href: "#distribution" },
            { label: "Mechanics",    href: "#mechanics" },
          ].map((l) => (
            <a key={l.label} href={l.href} style={{
              fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 400,
              color: "var(--text-muted)", textDecoration: "none",
              padding: "5px 10px", borderRadius: "var(--radius-sm)",
              transition: "color 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >{l.label}</a>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href="https://solscan.io" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500,
            color: "var(--text-muted)", textDecoration: "none",
            padding: "6px 12px", borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border)", background: "transparent",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--text-muted)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
          >Verify on-chain ↗</a>

          <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 600,
            color: "#080b0f", background: "var(--green-bright)",
            textDecoration: "none", padding: "6px 14px",
            borderRadius: "var(--radius-sm)", transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = "1"}
          >Buy $CASHBACK</a>
        </div>
      </div>
    </nav>
  );
}
