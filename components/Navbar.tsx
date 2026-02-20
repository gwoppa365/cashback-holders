"use client";
import { useState, useEffect } from "react";
import { PUMP_FUN_URL, SOLSCAN_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const { data } = useQuery({
    queryKey: ["token"],
    queryFn: () => fetch("/api/token").then(r => r.json()),
  });

  const change = data?.priceChange24h ?? null;
  const changePos = change !== null && change >= 0;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 52,
      background: scrolled ? "rgba(6,8,16,0.97)" : "rgba(6,8,16,0.8)",
      backdropFilter: "blur(20px)",
      borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
      transition: "all 0.2s",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" alt="CB Intel" style={{ width: 30, height: 30, borderRadius: 8, objectFit: "cover" }} />
          <div>
            <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14, color: "var(--text)", letterSpacing: "-0.03em" }}>
              CB<span style={{ color: "var(--blue-bright)" }}>Intel</span>
            </span>
          </div>
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--text-dim)",
            background: "var(--bg-elevated)", border: "1px solid var(--border)",
            padding: "2px 6px", borderRadius: 3, letterSpacing: "0.06em",
          }}>$CASHBACK</span>
          {change !== null && (
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600,
              color: changePos ? "var(--green)" : "var(--red)",
              background: changePos ? "var(--green-dim)" : "var(--red-dim)",
              border: `1px solid ${changePos ? "var(--green-border)" : "var(--red-border)"}`,
              padding: "2px 7px", borderRadius: 3,
            }}>{changePos ? "+" : ""}{change.toFixed(1)}%</span>
          )}
        </a>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 2 }}>
          {[
            { label: "Live Feed",   href: "#feed" },
            { label: "Tracker",     href: "#tracker" },
            { label: "Pro",         href: "#pro" },
            { label: "How it works",href: "#mechanics" },
          ].map(l => (
            <a key={l.label} href={l.href} style={{
              fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 400,
              color: "var(--text-muted)", textDecoration: "none",
              padding: "5px 10px", borderRadius: "var(--radius-sm)",
              transition: "color 0.15s, background 0.15s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.background = "var(--bg-elevated)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >{l.label}</a>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href={SOLSCAN_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{
            fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 500,
            color: "var(--text-muted)", textDecoration: "none",
            padding: "6px 12px", borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border)",
          }}>Verify ↗</a>

          <a href={PUMP_FUN_URL} target="_blank" rel="noopener noreferrer" className="btn-blue" style={{
            fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700,
            color: "#fff", background: "var(--blue)",
            textDecoration: "none", padding: "6px 16px",
            borderRadius: "var(--radius-sm)",
          }}>Buy $CASHBACK</a>
        </div>
      </div>
    </nav>
  );
}
