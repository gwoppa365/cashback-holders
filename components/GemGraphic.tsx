// Flat-vector gem mascots — ag2.ai robot style (flat, no glow, single fills)

interface GemProps {
  color: string;
  accentColor: string;
  size?: number;
}

export function GemGraphic({ color, accentColor, size = 120 }: GemProps) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 120 120" fill="none">
      {/* Body */}
      <rect x="20" y="40" width="80" height="70" rx="10" fill={color} />
      {/* Head */}
      <rect x="30" y="10" width="60" height="40" rx="8" fill={color} />
      {/* Eyes */}
      <rect x="40" y="22" width="14" height="14" rx="4" fill={accentColor} />
      <rect x="66" y="22" width="14" height="14" rx="4" fill={accentColor} />
      {/* Eye pupils */}
      <rect x="45" y="27" width="5" height="5" rx="2" fill="#1d1c1b" />
      <rect x="71" y="27" width="5" height="5" rx="2" fill="#1d1c1b" />
      {/* Mouth */}
      <rect x="44" y="40" width="32" height="4" rx="2" fill="#1d1c1b" />
      {/* Chest panel */}
      <rect x="32" y="52" width="56" height="36" rx="6" fill={accentColor} opacity="0.25" />
      <rect x="40" y="60" width="16" height="4" rx="2" fill={accentColor} />
      <rect x="40" y="70" width="24" height="4" rx="2" fill={accentColor} />
      <rect x="40" y="80" width="10" height="4" rx="2" fill={accentColor} />
      {/* Diamond badge on chest */}
      <polygon points="80,58 86,65 80,72 74,65" fill="#1d1c1b" opacity="0.6" />
      {/* Arms */}
      <rect x="4" y="44" width="16" height="40" rx="8" fill={color} />
      <rect x="100" y="44" width="16" height="40" rx="8" fill={color} />
      {/* Legs */}
      <rect x="30" y="104" width="22" height="12" rx="6" fill={color} />
      <rect x="68" y="104" width="22" height="12" rx="6" fill={color} />
      {/* Antenna */}
      <rect x="57" y="2" width="6" height="12" rx="3" fill={color} />
      <circle cx="60" cy="2" r="4" fill={accentColor} />
    </svg>
  );
}

// Five gem-robot mascots — matching ag2.ai's 5 robot color scheme
// but themed for HODL Rewards (purple, green, blue, yellow, orange)
export const mascots = [
  { color: "#b898f4", accentColor: "#9945FF", label: "Diamond\nHands",  className: "float-1" },
  { color: "#72cac4", accentColor: "#14F195", label: "HODL\nMaster",    className: "float-2" },
  { color: "#8fc6e1", accentColor: "#2a92bb", label: "Whale",           className: "float-3" },
  { color: "#ffd166", accentColor: "#F59E0B", label: "Creator",         className: "float-4" },
  { color: "#f9a653", accentColor: "#ef8b30", label: "Degen",           className: "float-5" },
];
