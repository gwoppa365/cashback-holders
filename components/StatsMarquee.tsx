import { MOCK_STATS_MARQUEE } from "@/lib/mock-data";

export default function StatsMarquee() {
  const items = [...MOCK_STATS_MARQUEE, ...MOCK_STATS_MARQUEE];
  return (
    <div style={{
      background: "var(--bg-card)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      padding: "9px 0",
      overflow: "hidden",
      position: "relative",
    }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 64, background: "linear-gradient(to right, var(--bg-card), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 64, background: "linear-gradient(to left, var(--bg-card), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div className="animate-marquee" style={{ display: "flex", width: "max-content" }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "0 24px",
            borderRight: "1px solid var(--border-subtle)",
            whiteSpace: "nowrap",
          }}>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
              {item.label}
            </span>
            <span style={{
              fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
              color: item.label.includes("Change") ? "var(--green-bright)" : "var(--text)",
            }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
