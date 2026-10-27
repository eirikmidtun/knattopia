/** Hero-illustrasjon: en knatt fotografert som bevismateriale, med målestokk og merkelapper. */
export function Prove() {
  const kuppel = "M130 250 C130 150, 180 108, 240 108 C300 108, 350 150, 350 250 C350 280, 306 294, 240 294 C174 294, 130 280, 130 250 Z";
  return (
    <figure className="prove">
      <svg viewBox="0 0 480 420" role="img" aria-label="Illustrasjon av en rød knatt merket som prøve A-113, 17 millimeter i diameter">
        <defs>
          <radialGradient id="prove-glans" cx="36%" cy="28%" r="80%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="18%" stopColor="#e2283f" />
            <stop offset="70%" stopColor="#b80f28" />
            <stop offset="100%" stopColor="#7d0717" />
          </radialGradient>
          <linearGradient id="prove-bunn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.3" />
          </linearGradient>
          <pattern id="prove-rute" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" className="prove-rutenett" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="480" height="420" fill="url(#prove-rute)" />
        <ellipse cx="240" cy="300" rx="128" ry="16" className="prove-skygge" />
        <path d={kuppel} fill="url(#prove-glans)" />
        <path d={kuppel} fill="url(#prove-bunn)" />
        <ellipse cx="196" cy="160" rx="34" ry="14" fill="#fff" opacity="0.55" transform="rotate(-28 196 160)" />

        {/* Målestokk */}
        <g className="prove-mal">
          <line x1="130" y1="340" x2="350" y2="340" />
          <line x1="130" y1="332" x2="130" y2="348" />
          <line x1="350" y1="332" x2="350" y2="348" />
          <text x="240" y="364" textAnchor="middle">
            Ø 17,0 mm
          </text>
          <line x1="392" y1="108" x2="392" y2="294" />
          <line x1="384" y1="108" x2="400" y2="108" />
          <line x1="384" y1="294" x2="400" y2="294" />
          <text x="404" y="205">
            11,4 mm
          </text>
        </g>

        {/* Merkelapper */}
        <g className="prove-lapp">
          <line x1="300" y1="150" x2="380" y2="68" />
          <circle cx="300" cy="150" r="4" />
          <text x="460" y="58" textAnchor="end">
            Glans: uvanlig høy
          </text>
          <line x1="150" y1="270" x2="70" y2="376" />
          <circle cx="150" cy="270" r="4" />
          <text x="20" y="396">
            Bunn: matt, ru
          </text>
        </g>

        <g className="prove-etikett">
          <rect x="20" y="20" width="180" height="58" rx="2" />
          <text x="32" y="42">
            PRØVE A-113
          </text>
          <text x="32" y="62" className="prove-etikett-liten">
            Skogsbær, rød · 3,1 g
          </text>
        </g>
      </svg>
      <figcaption>Prøve A-113. Kjøpt i dagligvarehandel 3. oktober 2026.</figcaption>
    </figure>
  );
}
