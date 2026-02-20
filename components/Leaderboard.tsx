"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBadgeColor, getBadgeLabel } from "@/lib/mock-data";
import { SOLSCAN_URL, TOTAL_SUPPLY } from "@/lib/constants";

export default function Leaderboard() {
  const [sortBy, setSortBy] = useState<"balance">("balance");

  const { data, isLoading } = useQuery({
    queryKey: ["holders"],
    queryFn:  () => fetch("/api/holders").then(r => r.json()),
  });

  const { data: tokenData } = useQuery({
    queryKey: ["token"],
    queryFn:  () => fetch("/api/token").then(r => r.json()),
  });

  const holders: any[] = data?.holders ?? [];
  const total: number  = data?.total ?? 0;
  const isLive = !isLoading && holders.length > 0;

  return (
    <section id="leaderboard" style={{ padding: "100px 0", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 40, gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "var(--green-dim)", border: "1px solid var(--green-border)",
              borderRadius: 100, padding: "4px 12px", marginBottom: 16,
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--green-bright)", letterSpacing: "0.1em" }}>DISTRIBUTION REGISTRY</span>
            </div>
            <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3vw,36px)", color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 10 }}>
              Top Holders
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 440 }}>
              Ranked by balance. The longer you hold, the higher your fee allocation multiplier.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Total holders pill */}
            {isLive && (
              <div style={{
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: "var(--radius)", padding: "10px 16px", textAlign: "center",
              }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Total Holders</div>
                <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 20, color: "var(--text)" }}>{total.toLocaleString()}</div>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: isLive ? "var(--green-bright)" : "var(--text-dim)", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.06em" }}>
                {isLive ? "LIVE" : isLoading ? "LOADING..." : "AWAITING LAUNCH"}
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", overflow: "hidden", background: "var(--bg-card)" }}>

          {/* Table header */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "52px 220px 1fr 90px 100px 110px 140px",
            padding: "10px 24px",
            borderBottom: "1px solid var(--border)",
            background: "var(--bg-elevated)",
          }}>
            {["RANK", "WALLET", "BALANCE", "SUPPLY", "HOLD TIME", "YIELD WT.", "STATUS"].map(col => (
              <div key={col} style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600, color: "var(--text-dim)", letterSpacing: "0.1em" }}>{col}</div>
            ))}
          </div>

          {isLoading ? (
            <div style={{ padding: "80px 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green-bright)", opacity: 0.6 }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)" }}>Fetching on-chain holders...</span>
            </div>
          ) : holders.length === 0 ? (
            <div style={{ padding: "80px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "var(--bg-elevated)", border: "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-mono)", fontSize: 20, color: "var(--text-dim)",
              }}>◎</div>
              <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 15, color: "var(--text)" }}>No holders yet</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-dim)", textAlign: "center", maxWidth: 360, lineHeight: 1.7 }}>
                The registry populates once $CASHBACK goes live. Buy and hold to claim your position.
              </div>
            </div>
          ) : (
            holders.map((h: any, i: number) => {
              const rank = i + 1;
              const rankDisplay = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `${rank}`;
              const badgeColor = getBadgeColor(h.badge);

              return (
                <div key={h.walletFull + i} className="table-row" style={{
                  display: "grid",
                  gridTemplateColumns: "52px 220px 1fr 90px 100px 110px 140px",
                  padding: "13px 24px",
                  borderBottom: i < holders.length - 1 ? "1px solid var(--border-subtle)" : "none",
                  alignItems: "center",
                  transition: "background 0.1s",
                }}>

                  {/* Rank */}
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: rank <= 3 ? 14 : 12, color: "var(--text-dim)" }}>
                    {rankDisplay}
                  </div>

                  {/* Wallet */}
                  <a href={`https://solscan.io/account/${h.walletFull}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", textDecoration: "none", transition: "color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                  >{h.wallet}</a>

                  {/* Balance */}
                  <div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>
                      {h.balance.toLocaleString()}
                    </div>
                    {/* Supply bar */}
                    <div style={{ height: 2, background: "var(--border-subtle)", borderRadius: 1, maxWidth: 120 }}>
                      <div style={{ height: 2, background: "var(--green-bright)", borderRadius: 1, width: `${Math.min(h.pct * 3, 100)}%`, opacity: 0.6 }} />
                    </div>
                  </div>

                  {/* Supply % */}
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>{h.pct}%</div>

                  {/* Hold Time */}
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)" }}>—</div>

                  {/* Yield weight */}
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)" }}>—</div>

                  {/* Badge */}
                  <div>
                    <span style={{
                      fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500,
                      color: badgeColor,
                      background: `${badgeColor}15`,
                      border: `1px solid ${badgeColor}30`,
                      padding: "3px 9px", borderRadius: 100,
                    }}>
                      {getBadgeLabel(h.badge)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer row */}
        <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)" }}>
            {isLive
              ? `Showing top ${holders.length} of ${total.toLocaleString()} holders · Hold time tracking via escrow contract`
              : "Registry activates on launch"}
          </p>
          {isLive && (
            <a href={SOLSCAN_URL} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-muted)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-dim)")}
            >View all on Solscan ↗</a>
          )}
        </div>
      </div>
    </section>
  );
}
