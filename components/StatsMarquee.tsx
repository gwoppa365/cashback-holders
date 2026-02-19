import { MOCK_STATS_MARQUEE } from "@/lib/mock-data";

export default function StatsMarquee() {
  const items = [...MOCK_STATS_MARQUEE, ...MOCK_STATS_MARQUEE];

  return (
    <div style={{
      background: "var(--bg-card)",
      borderTop: "1px solid var(--border)",
      borderBottom: "1px solid var(--border)",
      padding: "10px 0",
      overflow: "hidden",
      position: "relative",
    }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right, var(--bg-card), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to left, var(--bg-card), transparent)", zIndex: 2, pointerEvents: "none" }} />

      <div className="animate-marquee" style={{ display: "flex", width: "max-content" }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 28px",
            borderRight: "1px solid var(--border-muted)",
            whiteSpace: "nowrap",
          }}>
            <span style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              color: "var(--text-dim)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}>
              {item.label}
            </span>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              fontWeight: 500,
              color: item.label.includes("Change") ? "var(--green)" : "var(--text)",
            }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
