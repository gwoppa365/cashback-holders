"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 100,
      height: 56,
      background: scrolled ? "rgba(14,16,20,0.97)" : "rgba(14,16,20,0.8)",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
      transition: "border-color 0.2s, background 0.2s",
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 20px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 26,
            height: 26,
            background: "var(--green)",
            borderRadius: 6,
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            fontSize: 13,
            color: "#0e1014",
          }}>$</span>
          <span style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: 15,
            color: "var(--text)",
            letterSpacing: "-0.02em",
          }}>
            cashback<span style={{ color: "var(--green)" }}>holders</span>
          </span>
        </a>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {[
            { label: "Leaderboard", href: "#leaderboard" },
            { label: "Fee Tracker", href: "#fee-tracker" },
            { label: "How It Works", href: "#how-it-works" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--text-muted)",
                textDecoration: "none",
                padding: "6px 12px",
                borderRadius: "var(--radius-sm)",
                transition: "color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text)";
                (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://pump.fun"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 600,
            fontSize: 13,
            color: "#0e1014",
            background: "var(--green)",
            textDecoration: "none",
            padding: "7px 16px",
            borderRadius: "var(--radius-sm)",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.opacity = "0.85"}
          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.opacity = "1"}
        >
          Buy on Pump.fun
        </a>
      </div>
    </nav>
  );
}
