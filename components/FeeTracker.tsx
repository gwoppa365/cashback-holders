"use client";
import { useQuery } from "@tanstack/react-query";
import { MOCK_FEE_CHART } from "@/lib/mock-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar } from "recharts";

const TooltipContent = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--bg-elevated)", border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)", padding: "10px 14px",
      fontFamily: "var(--font-sans)", fontSize: 12,
    }}>
      <p style={{ color: "var(--text-dim)", marginBottom: 6, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em" }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 2 }}>
          <span style={{ color: "var(--text-muted)", fontSize: 11 }}>{p.name}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: p.color, fontSize: 11 }}>◎ {p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function FeeTracker() {
  const { data } = useQuery({
    queryKey: ["token"],
    queryFn:  () => fetch("/api/token").then(r => r.json()),
  });

  const fees24h   = data?.feesEstimatedSol ?? null;
  const volume24h = data?.volume24h ?? null;
  const txns24h   = data?.txns24h ?? null;

  const metrics = [
    {
      label: "Fees Generated (24h)",
      value: fees24h ? `◎ ${fees24h}` : "—",
      sub:   "0.5% of all 24h volume",
      green: true,
    },
    {
      label: "24h Volume",
      value: volume24h ? `$${(volume24h / 1000).toFixed(1)}K` : "—",
      sub:   "Pump.fun bonding curve",
      green: false,
    },
    {
      label: "Fee Rate",
      value: "0.50%",
      sub:   "Per trade, all sides",
      green: false,
    },
    {
      label: "24h Transactions",
      value: txns24h ? txns24h.toLocaleString() : "—",
      sub:   "Buys + sells",
      green: false,
    },
  ];

  return (
    <section id="distribution" style={{ padding: "100px 0", background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "var(--green-dim)", border: "1px solid var(--green-border)",
            borderRadius: 100, padding: "4px 12px", marginBottom: 16,
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--green-bright)", letterSpacing: "0.1em" }}>FEE DASHBOARD</span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-sans)", fontWeight: 800, fontSize: "clamp(24px,3vw,36px)",
            color: "var(--text)", letterSpacing: "-0.04em", marginBottom: 10,
          }}>Revenue & Distribution</h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 520 }}>
            Every buy and sell of $CASHBACK generates 0.5% in SOL creator fees, distributed to holders weighted by hold time.
          </p>
        </div>

        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

          {/* LEFT — metrics */}
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
              {metrics.map((s, i) => (
                <div key={s.label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "16px 20px",
                  borderBottom: i < metrics.length - 1 ? "1px solid var(--border-subtle)" : "none",
                  background: i % 2 === 0 ? "var(--bg-card)" : "var(--bg-elevated)",
                  transition: "background 0.15s",
                }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-muted)" }}>{s.sub}</div>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 16, color: s.green ? "var(--green-bright)" : "var(--text)" }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Distribution formula */}
            <div style={{
              marginTop: 16, padding: "16px 20px",
              background: "var(--bg)", border: "1px solid var(--green-border)",
              borderRadius: "var(--radius-lg)", borderLeft: "3px solid var(--green-bright)",
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--green-bright)", marginBottom: 8, letterSpacing: "0.08em" }}>DISTRIBUTION FORMULA</div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 10 }}>
                holder_share = (hold_hours / total_hold_hours) × fee_pool
              </p>
              <div style={{ height: 1, background: "var(--border-subtle)", marginBottom: 10 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--green-bright)" }}>✓</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--text-dim)", lineHeight: 1.5 }}>
                  Settled via custom escrow contract · holder data from Solana in real-time
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — chart */}
          <div>
            <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div>
                  <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14, color: "var(--text)", marginBottom: 3 }}>Fee Revenue (14d)</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)" }}>Daily & cumulative in SOL</div>
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  {[{ color: "var(--green-bright)", label: "Daily" }, { color: "var(--blue)", label: "Cumul." }].map(l => (
                    <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <ComposedChart data={MOCK_FEE_CHART} margin={{ top: 0, right: 0, left: -24, bottom: 0 }}>
                  <defs>
                    <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--blue)" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="var(--blue)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 6" stroke="var(--border-subtle)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "var(--text-dim)", fontSize: 9, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "var(--text-dim)", fontSize: 9, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<TooltipContent />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                  <Bar dataKey="daily" name="Daily" fill="var(--green-bright)" radius={[3,3,0,0]} opacity={0.8} />
                  <Area dataKey="cumulative" name="Cumulative" type="monotone" stroke="var(--blue)" strokeWidth={2} fill="url(#blueGrad)" dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
