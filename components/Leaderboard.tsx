"use client";
import { useState } from "react";
import { MOCK_HOLDERS, getBadgeColor, getBadgeLabel, formatHoldTime } from "@/lib/mock-data";

function RankIcon({ rank }: { rank: number }) {
  if (rank === 1) return <span style={{ fontSize: 18 }}>🥇</span>;
  if (rank === 2) return <span style={{ fontSize: 18 }}>🥈</span>;
  if (rank === 3) return <span style={{ fontSize: 18 }}>🥉</span>;
  return <span style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)", fontSize: 13, minWidth: 22, display: "inline-block", textAlign: "center" }}>{rank}</span>;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      style={{ background: "none", border: "none", cursor: "pointer", color: copied ? "#4ade80" : "var(--text-dim)", fontSize: 12, padding: "1px 5px", fontFamily: "var(--font-mono)", transition: "color 0.2s" }}
    >
      {copied ? "✓" : "⧉"}
    </button>
  );
}

export default function Leaderboard() {
  const [sortBy, setSortBy] = useState<"holdTime" | "balance">("holdTime");

  const sorted = [...MOCK_HOLDERS].sort((a, b) =>
    sortBy === "holdTime"
      ? (b.holdDays * 24 + b.holdHours) - (a.holdDays * 24 + a.holdHours)
      : b.balance - a.balance
  ).map((h, i) => ({ ...h, rank: i + 1 }));

  return (
    <section id="leaderboard" style={{ background: "var(--bg)", padding: "100px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* Section header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: "inline-block",
            background: "rgba(74,222,128,0.08)",
            border: "1px solid rgba(74,222,128,0.2)",
            borderRadius: 6,
            padding: "3px 10px",
            marginBottom: 16,
          }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#4ade80", letterSpacing: "0.06em", textTransform: "uppercase" }}>01</span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(26px, 4vw, 42px)",
            letterSpacing: "-0.025em",
            color: "#fff",
            margin: "0 0 12px",
            lineHeight: 1.15,
          }}>
            Holder Leaderboard
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--text-muted)", fontWeight: 400, lineHeight: 1.625 }}>
            The longest $CASHBACK holders earn the most. Diamond hands win.
          </p>
        </div>

        {/* Sort controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", gap: 8 }}>
            {[{ key: "holdTime", label: "By Hold Time" }, { key: "balance", label: "By Balance" }].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setSortBy(key as "holdTime" | "balance")}
                style={{
                  background: sortBy === key ? "#4ade80" : "var(--bg-card)",
                  border: `1px solid ${sortBy === key ? "#4ade80" : "var(--border)"}`,
                  color: sortBy === key ? "#0a0a12" : "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "7px 16px",
                  borderRadius: 8,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >{label}</button>
            ))}
          </div>

          {/* Live indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ position: "relative", display: "inline-flex", width: 7, height: 7 }}>
              <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#4ade80", opacity: 0.6 }} />
              <span style={{ position: "relative", width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            </span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)" }}>Live data</span>
          </div>
        </div>

        {/* Table */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "var(--shadow-card)",
        }}>
          {/* Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "56px 1fr 130px 100px 110px 120px",
            padding: "10px 20px",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg-card-alt)",
          }}>
            {["RANK","WALLET","TOKENS","% SUPPLY","HOLD TIME","STATUS"].map((col) => (
              <div key={col} style={{ fontFamily: "var(--font-body)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>{col}</div>
            ))}
          </div>

          {/* Rows */}
          {sorted.map((holder, idx) => {
            const badgeColor = getBadgeColor(holder.badge);
            return (
              <div
                key={holder.wallet}
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 1fr 130px 100px 110px 120px",
                  padding: "14px 20px",
                  borderBottom: idx < sorted.length - 1 ? "1px solid var(--border)" : "none",
                  alignItems: "center",
                  background: "transparent",
                  transition: "background 0.15s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <RankIcon rank={holder.rank} />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#fff" }}>{holder.wallet}</span>
                  <CopyButton text={holder.walletFull} />
                  {holder.isDev && (
                    <span style={{ background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.3)", color: "#a78bfa", fontSize: 9, padding: "2px 6px", borderRadius: 4, fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "0.05em" }}>DEV</span>
                  )}
                </div>

                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#fff", fontVariantNumeric: "tabular-nums" }}>
                  {(holder.balance / 1_000_000).toFixed(1)}M
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 36, height: 3, background: "var(--border-light)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${Math.min(holder.pct * 8, 100)}%`, height: "100%", background: "#4ade80", borderRadius: 2 }} />
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>{holder.pct}%</span>
                </div>

                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#4ade80", fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>
                  {formatHoldTime(holder.holdHours, holder.holdDays)}
                </div>

                <div>
                  <span style={{
                    background: `${badgeColor}18`,
                    border: `1px solid ${badgeColor}40`,
                    color: badgeColor,
                    fontSize: 11,
                    padding: "3px 9px",
                    borderRadius: 20,
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}>{getBadgeLabel(holder.badge)}</span>
                </div>
              </div>
            );
          })}
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-dim)" }}>
          Showing mock data — live data loads once $CASHBACK CA is configured
        </p>
      </div>
    </section>
  );
}
