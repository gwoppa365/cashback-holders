"use client";
import { useState } from "react";
import { MOCK_HOLDERS, getBadgeColor, getBadgeLabel, formatHoldTime } from "@/lib/mock-data";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      title="Copy address"
      style={{
        background: "none", border: "none", cursor: "pointer",
        color: copied ? "var(--green)" : "var(--text-dim)",
        fontSize: 11, padding: "2px 4px",
        fontFamily: "var(--font-mono)",
        transition: "color 0.15s",
      }}
    >
      {copied ? "✓" : "⧉"}
    </button>
  );
}

const RANK_COLORS: Record<number, string> = { 1: "#f0c040", 2: "#9aa5b4", 3: "#cd7f32" };

export default function Leaderboard() {
  const [sortBy, setSortBy] = useState<"holdTime" | "balance">("holdTime");

  const sorted = [...MOCK_HOLDERS].sort((a, b) =>
    sortBy === "holdTime"
      ? (b.holdDays * 24 + b.holdHours) - (a.holdDays * 24 + a.holdHours)
      : b.balance - a.balance
  ).map((h, i) => ({ ...h, rank: i + 1 }));

  return (
    <section id="leaderboard" style={{ padding: "80px 0", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 500, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
              Leaderboard
            </div>
            <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1 }}>
              Top $CASHBACK Holders
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Sort tabs */}
            <div style={{ display: "flex", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: 3, gap: 2 }}>
              {[{ key: "holdTime", label: "Hold Time" }, { key: "balance", label: "Balance" }].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key as "holdTime" | "balance")}
                  style={{
                    background: sortBy === key ? "var(--bg-elevated)" : "transparent",
                    border: sortBy === key ? "1px solid var(--border)" : "1px solid transparent",
                    color: sortBy === key ? "var(--text)" : "var(--text-muted)",
                    fontFamily: "var(--font-sans)",
                    fontSize: 12,
                    fontWeight: 500,
                    padding: "5px 12px",
                    borderRadius: 4,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >{label}</button>
              ))}
            </div>

            {/* Live dot */}
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ position: "relative", display: "inline-flex", width: 6, height: 6 }}>
                <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--green)", opacity: 0.4 }} />
                <span style={{ position: "relative", width: 6, height: 6, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
              </span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)" }}>Live</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          {/* Table header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "52px 1fr 140px 90px 110px 120px",
            padding: "10px 20px",
            background: "var(--bg-card)",
            borderBottom: "1px solid var(--border)",
          }}>
            {["#", "WALLET", "BALANCE", "SUPPLY %", "HOLD TIME", "STATUS"].map((col) => (
              <div key={col} style={{
                fontFamily: "var(--font-sans)",
                fontSize: 10,
                fontWeight: 600,
                color: "var(--text-dim)",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}>{col}</div>
            ))}
          </div>

          {sorted.map((holder, idx) => {
            const badgeColor = getBadgeColor(holder.badge);
            const rankColor = RANK_COLORS[holder.rank] || "var(--text-dim)";
            return (
              <div
                key={holder.wallet}
                style={{
                  display: "grid",
                  gridTemplateColumns: "52px 1fr 140px 90px 110px 120px",
                  padding: "13px 20px",
                  borderBottom: idx < sorted.length - 1 ? "1px solid var(--border-muted)" : "none",
                  alignItems: "center",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 600, color: rankColor }}>
                  {holder.rank}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text)" }}>
                    {holder.wallet}
                  </span>
                  <CopyButton text={holder.walletFull} />
                  {holder.isDev && (
                    <span style={{
                      fontFamily: "var(--font-sans)", fontSize: 9, fontWeight: 600,
                      color: "var(--yellow)", background: "rgba(210,153,34,0.1)",
                      border: "1px solid rgba(210,153,34,0.3)",
                      padding: "1px 5px", borderRadius: 3,
                      textTransform: "uppercase", letterSpacing: "0.05em",
                    }}>Dev</span>
                  )}
                </div>

                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text)" }}>
                  {(holder.balance / 1_000_000).toFixed(1)}M
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ flex: 1, maxWidth: 40, height: 2, background: "var(--border)", borderRadius: 1, overflow: "hidden" }}>
                    <div style={{ width: `${Math.min(holder.pct * 8, 100)}%`, height: "100%", background: "var(--green)" }} />
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>
                    {holder.pct}%
                  </span>
                </div>

                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 500, color: "var(--green)" }}>
                  {formatHoldTime(holder.holdHours, holder.holdDays)}
                </div>

                <div>
                  <span style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    fontWeight: 500,
                    color: badgeColor,
                    background: `${badgeColor}14`,
                    border: `1px solid ${badgeColor}30`,
                    padding: "2px 8px",
                    borderRadius: 100,
                    whiteSpace: "nowrap",
                  }}>
                    {getBadgeLabel(holder.badge)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p style={{ marginTop: 12, fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)", textAlign: "right" }}>
          Mock data — live on-chain data loads after token CA is set
        </p>
      </div>
    </section>
  );
}
