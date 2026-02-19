"use client";
import { MOCK_TOKEN, MOCK_FEE_CHART } from "@/lib/mock-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar } from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        padding: "10px 14px",
        fontFamily: "var(--font-sans)",
        fontSize: 12,
      }}>
        <p style={{ color: "var(--text-dim)", marginBottom: 6, fontSize: 11 }}>{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color, fontWeight: 500 }}>
            {p.name}: <span style={{ fontFamily: "var(--font-mono)" }}>◎ {p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function FeeTracker() {
  return (
    <section id="fee-tracker" style={{ padding: "80px 0", background: "var(--bg-card)", borderTop: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 500, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
            Fee Revenue
          </div>
          <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 24, color: "var(--text)", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 8 }}>
            Cashback Distribution
          </h2>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6 }}>
            Every trade on Pump.fun generates 0.5% SOL fees distributed proportionally to $CASHBACK holders.
          </p>
        </div>

        {/* Stat row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { label: "Total Distributed", value: `◎ ${MOCK_TOKEN.creatorFeeSol}`, sub: `≈ $${MOCK_TOKEN.creatorFeeUsd.toLocaleString()}` },
            { label: "Fee Rate",           value: "0.5%",    sub: "Per trade" },
            { label: "Total Trades",       value: "28,541",  sub: "All time" },
            { label: "Today",              value: "◎ 8.4",   sub: "+12% vs yesterday" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "16px 18px",
            }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 20, color: "var(--text)", marginBottom: 4 }}>{s.value}</div>
              {s.sub && <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)" }}>{s.sub}</div>}
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{
          background: "var(--bg)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "20px 20px 12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
            <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--text)" }}>
              Daily & Cumulative SOL Fees
            </h3>
            <div style={{ display: "flex", gap: 16 }}>
              {[
                { color: "var(--green)", label: "Daily" },
                { color: "#6e8cf0", label: "Cumulative" },
              ].map((l) => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--text-dim)" }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={MOCK_FEE_CHART} margin={{ top: 0, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="cumulGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6e8cf0" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#6e8cf0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-muted)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "var(--text-dim)", fontSize: 10, fontFamily: "var(--font-sans)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--text-dim)", fontSize: 10, fontFamily: "var(--font-mono)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="daily" name="Daily" fill="var(--green)" radius={[2, 2, 0, 0]} opacity={0.9} />
              <Area dataKey="cumulative" name="Cumulative" type="monotone" stroke="#6e8cf0" strokeWidth={1.5} fill="url(#cumulGrad)" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
