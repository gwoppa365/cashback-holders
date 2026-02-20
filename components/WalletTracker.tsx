"use client";
import { useState } from "react";
import { PUMP_FUN_URL } from "@/lib/constants";

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60)   return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  return `${Math.floor(s / 3600)}h ago`;
}

export default function WalletTracker() {
  const [wallet, setWallet]     = useState("");
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState<any>(null);
  const [proInfo, setProInfo]   = useState<any>(null);
  const [error, setError]       = useState("");

  async function track() {
    const w = wallet.trim();
    if (w.length < 32) { setError("Enter a valid Solana wallet address"); return; }
    setError("");
    setLoading(true);
    setResult(null);
    setProInfo(null);

    try {
      const [actRes, proRes] = await Promise.all([
        fetch(`/api/wallet-activity?wallet=${w}`),
        fetch(`/api/check-pro?wallet=${w}`),
      ]);
      const actData = await actRes.json();
      const proData = await proRes.json();
      setResult(actData);
      setProInfo(proData);
    } catch {
      setError("Failed to fetch wallet data. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const trades: any[] = result?.trades ?? [];
  const isPro: boolean = proInfo?.isPro ?? false;
  const balance: number = proInfo?.balance ?? 0;

  return (
    <section id="tracker" style={{ padding: "100px 0", background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "var(--blue-dim)", border: "1px solid var(--blue-border)",
            borderRadius: 100, padding: "4px 12px", marginBottom: 16,
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--blue-bright)", letterSpacing: "0.1em" }}>WALLET TRACKER</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(22px,3vw,36px)", color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 12 }}>
            Track any Solana wallet
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-muted)", maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
            Paste any wallet address to see their recent swap history. Enter your own wallet to check your $SPY pro status.
          </p>
        </div>

        {/* Search */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
            <input
              value={wallet}
              onChange={e => setWallet(e.target.value)}
              onKeyDown={e => e.key === "Enter" && track()}
              placeholder="Enter Solana wallet address..."
              style={{
                flex: 1, background: "var(--bg)", border: "1px solid var(--border)",
                borderRadius: "var(--radius)", padding: "14px 18px", outline: "none",
                fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text)",
                transition: "border-color 0.15s",
              }}
              onFocus={e => (e.target.style.borderColor = "var(--blue-border)")}
              onBlur={e => (e.target.style.borderColor = "var(--border)")}
            />
            <button onClick={track} disabled={loading} className="btn-blue" style={{
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14,
              color: "#fff", background: "var(--blue)",
              border: "none", borderRadius: "var(--radius)", padding: "14px 28px",
              cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1,
              whiteSpace: "nowrap",
            }}>
              {loading ? "Searching..." : "Track Wallet"}
            </button>
          </div>
          {error && <p style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--red)", marginTop: 6 }}>{error}</p>}
        </div>

        {/* Pro status badge */}
        {proInfo && (
          <div style={{
            padding: "14px 20px", marginBottom: 24, borderRadius: "var(--radius-lg)",
            background: isPro ? "var(--green-dim)" : "var(--bg-elevated)",
            border: `1px solid ${isPro ? "var(--green-border)" : "var(--border)"}`,
            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>{isPro ? "✅" : "🔒"}</span>
              <div>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14, color: "var(--text)", marginBottom: 2 }}>
                  {isPro ? "Pro Access Active" : "Free Tier"}
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-muted)" }}>
                  {balance > 0
                    ? `Holds ${balance.toLocaleString()} $SPY`
                    : "No $SPY detected in this wallet"}
                </div>
              </div>
            </div>
            {!isPro && (
              <a href={PUMP_FUN_URL} target="_blank" rel="noopener noreferrer" className="btn-blue" style={{
                fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13,
                color: "#fff", background: "var(--blue)",
                textDecoration: "none", padding: "8px 18px", borderRadius: "var(--radius-sm)",
              }}>Get Pro Access →</a>
            )}
          </div>
        )}

        {/* Results */}
        {result && (
          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", overflow: "hidden", background: "var(--bg)" }}>

            <div style={{ padding: "12px 20px", background: "var(--bg-elevated)", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.08em" }}>
                RECENT SWAPS · {result.wallet?.slice(0, 6)}...{result.wallet?.slice(-4)}
              </span>
              <a href={`https://solscan.io/account/${result.wallet}`}
                target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--blue)", textDecoration: "none" }}
              >View on Solscan ↗</a>
            </div>

            {/* Col headers */}
            <div style={{
              display: "grid", gridTemplateColumns: "70px 130px 90px 130px 1fr",
              padding: "8px 20px", background: "var(--bg-elevated)", borderBottom: "1px solid var(--border-subtle)",
            }}>
              {["TYPE","TOKEN","SOL","SOURCE","TIME"].map(h => (
                <div key={h} style={{ fontFamily: "var(--font-mono)", fontSize: 9, fontWeight: 600, color: "var(--text-dim)", letterSpacing: "0.1em" }}>{h}</div>
              ))}
            </div>

            {trades.length === 0 ? (
              <div style={{ padding: "60px 24px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)" }}>No recent swap activity found for this wallet</div>
              </div>
            ) : trades.map((t: any, i: number) => (
              <div key={t.sig + i} className="table-row" style={{
                display: "grid", gridTemplateColumns: "70px 130px 90px 130px 1fr",
                padding: "12px 20px",
                borderBottom: i < trades.length - 1 ? "1px solid var(--border-subtle)" : "none",
                alignItems: "center",
              }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 700,
                  color: t.type === "BUY" ? "var(--green)" : "var(--red)",
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.type === "BUY" ? "var(--green)" : "var(--red)", display: "inline-block" }} />
                  {t.type}
                </span>

                <a href={t.mint ? `https://birdeye.so/token/${t.mint}` : "#"}
                  target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--blue)", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--blue-bright)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--blue)")}
                >{t.symbol}</a>

                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, color: "var(--text)" }}>◎ {t.sol}</span>

                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)",
                  background: "var(--bg-elevated)", border: "1px solid var(--border)",
                  padding: "2px 8px", borderRadius: "var(--radius-xs)",
                  display: "inline-block", width: "fit-content",
                }}>{t.source}</span>

                <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)" }}>{timeAgo(t.timestamp)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
