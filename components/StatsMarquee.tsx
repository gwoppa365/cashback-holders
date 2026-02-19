import { MOCK_STATS_MARQUEE } from "@/lib/mock-data";

export default function StatsMarquee() {
  const items = [...MOCK_STATS_MARQUEE, ...MOCK_STATS_MARQUEE];

  return (
    <div style={{
      background: "var(--bg-card)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      padding: "14px 0",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(to right, var(--bg-card), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(to left, var(--bg-card), transparent)", zIndex: 2, pointerEvents: "none" }} />

      <div className="animate-marquee" style={{ display: "flex", width: "max-content" }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 36px",
            borderRight: "1px solid var(--border)",
            whiteSpace: "nowrap",
          }}>
            <span style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              fontWeight: 500,
              color: "var(--text-dim)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              {item.label}
            </span>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              fontWeight: 600,
              color: item.label.includes("Change") ? "#4ade80" : "#fff",
              letterSpacing: "-0.01em",
            }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
