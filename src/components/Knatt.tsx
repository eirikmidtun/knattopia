import { useId } from "react";

/** En knatt: liten rund kuppel med blank overflate og ru, matt underside. */
export function Knatt({ farge = "#e3262f", storrelse = 48, className }: { farge?: string; storrelse?: number; className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      width={storrelse}
      height={storrelse}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`k-${id}`} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="25%" stopColor={farge} stopOpacity="1" />
          <stop offset="100%" stopColor={farge} stopOpacity="1" />
        </radialGradient>
        <linearGradient id={`s-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <path d="M8 70 C8 30, 28 14, 50 14 C72 14, 92 30, 92 70 C92 82, 76 88, 50 88 C24 88, 8 82, 8 70 Z" fill={`url(#k-${id})`} />
      <path d="M8 70 C8 30, 28 14, 50 14 C72 14, 92 30, 92 70 C92 82, 76 88, 50 88 C24 88, 8 82, 8 70 Z" fill={`url(#s-${id})`} />
      <ellipse cx="50" cy="78" rx="40" ry="9" fill="#000" opacity="0.12" />
      <ellipse cx="36" cy="32" rx="12" ry="6" fill="#fff" opacity="0.5" transform="rotate(-25 36 32)" />
    </svg>
  );
}
