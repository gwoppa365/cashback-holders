"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBadgeColor, getBadgeLabel } from "@/lib/mock-data";
import { SOLSCAN_URL, TOKEN_MINT } from "@/lib/constants";

export default function Leaderboard() {
  const [sortBy, setSortBy] = useState<"balance" | "holdTime">("balance");

  const { data, isLoading } = useQuery({
    queryKey: ["holders"],
    queryFn:  () => fetch("/api/holders").then((r) => r.json()),
  });

  const holders: any[] = data?.holders ?? [];
  const total: number  = data?.total ?? 0;
  const isLive = !isLoading && holders.length > 0;

  const sorted = [...holders].sort((a, b) =>
    sortBy === "balance" ? b.balance - a.balance : b.balance - a.balance
  );

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
              Holders ranked by balance. Fee distribution is weighted — longer hold time means a higher allocation share.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: 3 }}>
              {[{ key: "balance", label: "Balance" }, { key: "holdTime", label: "Hold Time" }].map(({ key, label }) => (
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
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: isLive ? "var(--green-bright)" : "var(--text-dim)", display: "inline-block" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.06em" }}>
                {isLive ? `${total.toLocaleString()} HOLDERS` : isLoading ? "LOADING..." : "LAUNCHING SOON"}
              </span>
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
            {["#", "WALLET", "BALANCE", "SUPPLY %", "HOLD TIME", "YIELD WT.", "STATUS"].map((col) => (
              <div key={col} style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600, color: "var(--text-dim)", letterSpacing: "0.1em" }}>{col}</div>
            ))}
          </div>

          {isLoading ? (
            <div style={{ padding: "64px 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)" }}>Loading holders...</span>
            </div>
          ) : sorted.length === 0 ? (
            <div style={{
              padding: "64px 24px",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "var(--bg-elevated)", border: "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--text-dim)",
                marginBottom: 4,
              }}>◎</div>
              <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--text)" }}>
                No holders yet
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-dim)", textAlign: "center", maxWidth: 340, lineHeight: 1.65 }}>
                The registry will populate on-chain once $CASHBACK launches. Buy and hold to claim your position.
              </div>
            </div>
          ) : (
            sorted.map((h, i) => (
              <div key={h.walletFull + i} className="table-row" style={{
                display: "grid",
                gridTemplateColumns: "44px 200px 1fr 100px 120px 80px 130px",
                padding: "11px 20px",
                borderBottom: i < sorted.length - 1 ? "1px solid var(--border-subtle)" : "none",
                alignItems: "center",
              }}>
                {/* Rank */}
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)" }}>
                  {h.rank <= 3 ? ["🥇","🥈","🥉"][h.rank - 1] : h.rank}
                </div>

                {/* Wallet */}
                <a
                  href={`https://solscan.io/account/${h.walletFull}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  {h.wallet}
                </a>

                {/* Balance */}
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text)" }}>
                  {h.balance.toLocaleString()}
                </div>

                {/* Supply % */}
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>
                  {h.pct}%
                </div>

                {/* Hold Time */}
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)" }}>
                  —
                </div>

                {/* Yield Weight */}
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)" }}>
                  —
                </div>

                {/* Status / Badge */}
                <div style={{
                  fontFamily: "var(--font-mono)", fontSize: 10,
                  color: getBadgeColor(h.badge),
                  background: `${getBadgeColor(h.badge)}18`,
                  border: `1px solid ${getBadgeColor(h.badge)}33`,
                  padding: "2px 8px", borderRadius: "var(--radius-xs)",
                  display: "inline-flex", alignItems: "center",
                  width: "fit-content",
                }}>
                  {getBadgeLabel(h.badge)}
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)" }}>
            {isLive
              ? `Showing top ${sorted.length} of ${total.toLocaleString()} holders · Hold time tracking activates via escrow contract`
              : "Live holder data activates once the contract address is configured"}
          </p>
          {isLive && (
            <a href={`${SOLSCAN_URL}`} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
            >
              View all on Solscan ↗
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
