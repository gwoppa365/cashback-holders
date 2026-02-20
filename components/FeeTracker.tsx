"use client";
import { useQuery } from "@tanstack/react-query";
import { MOCK_FEE_CHART } from "@/lib/mock-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar } from "recharts";

const Tooltip_ = ({ active, payload, label }: any) => {
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
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500, color: p.color, fontSize: 11 }}>◎ {p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function FeeTracker() {
  const { data } = useQuery({
    queryKey: ["token"],
    queryFn:  () => fetch("/api/token").then((r) => r.json()),
  });

  const fees24h    = data?.feesEstimatedSol ?? null;
  const volume24h  = data?.volume24h ?? null;
  const txns24h    = data?.txns24h ?? null;

  const metrics = [
    {
      label: "Fees Generated (24h)",
      value: fees24h ? `◎ ${fees24h}` : "—",
      sub:   fees24h && data?.price ? `≈ $${(fees24h * (data.price / data.priceNative)).toFixed(2)} USD` : "Based on 0.5% of 24h volume",
    },
    {
      label: "24h Volume",
      value: volume24h ? `$${(volume24h / 1000).toFixed(1)}K` : "—",
      sub:   "Pump.fun bonding curve",
    },
    {
      label: "Fee Rate Per Trade",
      value: "0.50%",
      sub:   "Bonding curve, all sides",
    },
    {
      label: "24h Transactions",
      value: txns24h ? txns24h.toLocaleString() : "—",
      sub:   "Buys + sells combined",
    },
  ];

  return (
    <section id="distribution" style={{ padding: "80px 0", background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>

          {/* LEFT — context */}
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
              PROTOCOL / 02
            </div>
            <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 22, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: 12 }}>
              Revenue & Distribution
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 32 }}>
              Every buy and sell of $CASHBACK on the Pump.fun bonding curve triggers a 0.5% fee in SOL. Collected fees are distributed to the holder registry weighted by on-chain hold time and supply percentage.
            </p>

            {/* Key metrics */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
              {metrics.map((s, i) => (
                <div key={s.label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 18px",
                  borderBottom: i < metrics.length - 1 ? "1px solid var(--border-subtle)" : "none",
                  background: i % 2 === 0 ? "var(--bg-card)" : "var(--bg-elevated)",
                }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-muted)" }}>{s.sub}</div>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 15, color: "var(--text)" }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — chart */}
          <div>
            <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                  <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, color: "var(--text)", marginBottom: 2 }}>Fee Revenue (14d)</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)" }}>Daily output & cumulative total in SOL</div>
                </div>
                <div style={{ display: "flex", gap: 14 }}>
                  {[{ color: "var(--green-bright)", label: "Daily" }, { color: "var(--blue)", label: "Cumul." }].map((l) => (
                    <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 6, height: 6, borderRadius: 1, background: l.color }} />
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <ComposedChart data={MOCK_FEE_CHART} margin={{ top: 0, right: 0, left: -24, bottom: 0 }}>
                  <defs>
                    <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--blue)" stopOpacity={0.12} />
                      <stop offset="100%" stopColor="var(--blue)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" stroke="var(--border-subtle)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "var(--text-dim)", fontSize: 9, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "var(--text-dim)", fontSize: 9, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<Tooltip_ />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                  <Bar dataKey="daily" name="Daily" fill="var(--green-bright)" radius={[2, 2, 0, 0]} opacity={0.85} />
                  <Area dataKey="cumulative" name="Cumulative" type="monotone" stroke="var(--blue)" strokeWidth={1.5} fill="url(#blueGrad)" dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Distribution formula note */}
            <div style={{ marginTop: 16, padding: "14px 16px", background: "var(--bg)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius)", borderLeft: "2px solid var(--green)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)", marginBottom: 6, letterSpacing: "0.06em" }}>DISTRIBUTION FORMULA</div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 8 }}>
                holder_share = (hold_hours / total_hold_hours) × fee_pool
              </p>
              <div style={{ height: 1, background: "var(--border-subtle)", marginBottom: 8 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--green)" }}>✓</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)" }}>
                  Settled via custom escrow contract · holder data scraped in real-time from Solana
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
