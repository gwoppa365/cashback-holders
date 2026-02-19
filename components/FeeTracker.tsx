"use client";
import { MOCK_TOKEN, MOCK_FEE_CHART } from "@/lib/mock-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar } from "recharts";

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      padding: "20px 22px",
    }}>
      <div style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, color: "var(--text-dim)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>{label}</div>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#4ade80", marginTop: 6, fontWeight: 500 }}>{sub}</div>}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: "var(--bg-card-alt)", border: "1px solid var(--border-light)", borderRadius: 8, padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: 12 }}>
        <p style={{ color: "var(--text-muted)", marginBottom: 4, fontSize: 11 }}>{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color, fontWeight: 600 }}>{p.name}: ◎ {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function FeeTracker() {
  return (
    <section id="fee-tracker" style={{ background: "var(--bg-card)", padding: "100px 0", borderTop: "1px solid var(--border)" }}>
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
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "#4ade80", letterSpacing: "0.06em", textTransform: "uppercase" }}>02</span>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "-0.025em", color: "#fff", margin: "0 0 12px", lineHeight: 1.15 }}>
            Cashback Fee Revenue
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--text-muted)", fontWeight: 400, lineHeight: 1.625 }}>
            Every trade on Pump.fun generates 0.5% in SOL fees distributed to $CASHBACK holders.
          </p>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 36 }}>
          <StatCard label="Total Distributed" value={`◎ ${MOCK_TOKEN.creatorFeeSol}`} sub={`≈ $${MOCK_TOKEN.creatorFeeUsd.toLocaleString()}`} />
          <StatCard label="Fee Rate" value="0.5%" sub="Per trade, bonding curve" />
          <StatCard label="Total Trades" value="28,541" sub="All time" />
          <StatCard label="Today" value="◎ 8.4" sub="+12% vs yesterday" />
        </div>

        {/* Chart card */}
        <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 14, padding: "28px", boxShadow: "var(--shadow-card)" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, color: "#fff", margin: "0 0 24px", letterSpacing: "-0.01em" }}>
            Daily & Cumulative Fees (SOL)
          </h3>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={MOCK_FEE_CHART} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="cumulativeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ade80" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2040" />
              <XAxis dataKey="day" tick={{ fill: "#4a4a6a", fontSize: 11, fontFamily: "var(--font-body)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#4a4a6a", fontSize: 11, fontFamily: "var(--font-body)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="daily" name="Daily" fill="#4ade80" opacity={0.7} radius={[3, 3, 0, 0]} />
              <Area dataKey="cumulative" name="Cumulative" type="monotone" stroke="#4ade80" strokeWidth={2} fill="url(#cumulativeGrad)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
