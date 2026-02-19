"use client";
import { useState } from "react";
import { MOCK_HOLDERS, getBadgeColor, getBadgeLabel, formatHoldTime } from "@/lib/mock-data";

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      title="Copy full address"
      style={{
        background: "none", border: "none", cursor: "pointer", padding: "1px 4px",
        color: copied ? "var(--green-bright)" : "var(--text-dim)",
        fontFamily: "var(--font-mono)", fontSize: 10, transition: "color 0.15s",
      }}
    >{copied ? "✓" : "⧉"}</button>
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
    <section id="leaderboard" style={{ padding: "80px 0", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 32, gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
              PROTOCOL / 01
            </div>
            <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 22, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 6 }}>
              Distribution Registry
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 420 }}>
              Holders ranked by hold duration. Fee distribution is weighted — longer hold time means a higher allocation share.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: 3 }}>
              {[{ key: "holdTime", label: "Hold Time" }, { key: "balance", label: "Balance" }].map(({ key, label }) => (
                <button key={key} onClick={() => setSortBy(key as any)} style={{
                  background: sortBy === key ? "var(--bg-hover)" : "transparent",
                  border: sortBy === key ? "1px solid var(--border)" : "1px solid transparent",
                  color: sortBy === key ? "var(--text)" : "var(--text-muted)",
                  fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 500,
                  padding: "4px 10px", borderRadius: 4, cursor: "pointer", transition: "all 0.15s",
                }}>{label}</button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ position: "relative", display: "inline-flex", width: 5, height: 5 }}>
                <span className="animate-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--green-bright)", opacity: 0.4 }} />
                <span style={{ position: "relative", width: 5, height: 5, borderRadius: "50%", background: "var(--green-bright)", display: "inline-block" }} />
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.06em" }}>LIVE</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden", background: "var(--bg-card)" }}>
          {/* Header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "44px 200px 1fr 100px 120px 80px 130px",
            padding: "9px 20px",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg-elevated)",
          }}>
            {["#", "WALLET", "BALANCE", "SUPPLY", "HOLD TIME", "YIELD WT.", "STATUS"].map((col) => (
              <div key={col} style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600, color: "var(--text-dim)", letterSpacing: "0.1em" }}>{col}</div>
            ))}
          </div>

          {sorted.map((h, idx) => {
            const badgeColor = getBadgeColor(h.badge);
            const totalHoldHours = h.holdDays * 24 + h.holdHours;
            const maxHoldHours = 14 * 24 + 6;
            const yieldWeight = Math.round((totalHoldHours / maxHoldHours) * 100);

            return (
              <div key={h.wallet} className="table-row" style={{
                display: "grid",
                gridTemplateColumns: "44px 200px 1fr 100px 120px 80px 130px",
                padding: "12px 20px",
                borderBottom: idx < sorted.length - 1 ? "1px solid var(--border-subtle)" : "none",
                alignItems: "center",
                transition: "background 0.1s",
                cursor: "default",
              }}>
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600,
                  color: h.rank <= 3 ? ["#e3b341","#8b949e","#b08968"][h.rank - 1] : "var(--text-dim)",
                }}>
                  {h.rank <= 3 ? `0${h.rank}` : h.rank}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text)" }}>{h.wallet}</span>
                  <CopyBtn text={h.walletFull} />
                  {h.isDev && (
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 8, fontWeight: 600,
                      color: "var(--yellow)", background: "rgba(187,128,9,0.1)",
                      border: "1px solid rgba(187,128,9,0.25)",
                      padding: "1px 4px", borderRadius: 2, letterSpacing: "0.08em",
                    }}>DEV</span>
                  )}
                </div>

                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text)" }}>
                  {(h.balance / 1_000_000).toFixed(2)}M
                </div>

                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <div style={{ width: 32, height: 2, background: "var(--border)", borderRadius: 1, overflow: "hidden" }}>
                    <div style={{ width: `${Math.min(h.pct * 8, 100)}%`, height: "100%", background: "var(--green)" }} />
                  </div>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>{h.pct}%</span>
                </div>

                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500, color: "var(--green-bright)" }}>
                  {formatHoldTime(h.holdHours, h.holdDays)}
                </div>

                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 28, height: 2, background: "var(--border)", borderRadius: 1, overflow: "hidden" }}>
                      <div style={{ width: `${yieldWeight}%`, height: "100%", background: "var(--blue)" }} />
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>{yieldWeight}%</span>
                  </div>
                </div>

                <div>
                  <span style={{
                    fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 500,
                    color: badgeColor,
                    background: `${badgeColor}12`,
                    border: `1px solid ${badgeColor}28`,
                    padding: "2px 8px", borderRadius: 100, whiteSpace: "nowrap",
                  }}>
                    {getBadgeLabel(h.badge)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)" }}>
            Mock data shown — live on-chain data activates once contract address is configured
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)" }}>
            10 / 1,247 holders
          </p>
        </div>
      </div>
    </section>
  );
}
