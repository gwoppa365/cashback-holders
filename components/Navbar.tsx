"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 50,
      background: scrolled ? "rgba(10,10,18,0.95)" : "rgba(10,10,18,0.8)",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${scrolled ? "#1e2040" : "transparent"}`,
      transition: "background 0.2s, border-color 0.2s",
    }}>
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: "linear-gradient(135deg, #4ade80, #22c55e)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            boxShadow: "0 0 12px rgba(74,222,128,0.3)",
          }}>
            💰
          </div>
          <span style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 16,
            color: "#fff",
            letterSpacing: "-0.02em",
          }}>
            cashback<span style={{ color: "#4ade80" }}>holders</span>
          </span>
        </div>

        {/* Center links */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Leaderboard", "Fee Tracker", "How It Works"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              style={{
                color: "#8888aa",
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "var(--font-body)",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8888aa")}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://pump.fun"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#4ade80",
            color: "#0a0a12",
            fontWeight: 700,
            fontSize: 13,
            padding: "9px 20px",
            borderRadius: 8,
            textDecoration: "none",
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.01em",
            transition: "background 0.15s, box-shadow 0.15s",
            boxShadow: "0 0 16px rgba(74,222,128,0.25)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#86efac";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(74,222,128,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#4ade80";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px rgba(74,222,128,0.25)";
          }}
        >
          Buy $CASHBACK
        </a>
      </div>
    </nav>
  );
}
