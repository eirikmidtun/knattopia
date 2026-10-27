import type { ReactNode } from "react";

// Arkivbilder i svart-hvitt, tegnet som SVG med korn, uskarphet og vignett slik at de ligner gamle fotografier.

const B = 640;
const H = 420;

function Person({ x, y, s = 1, lener = 0, tone = "#262626" }: { x: number; y: number; s?: number; lener?: number; tone?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${lener})`} fill={tone} stroke={tone}>
      <ellipse cx="0" cy="-46" rx="5.5" ry="6" />
      <path d="M-8 -50 Q0 -58 8 -50 Z" />
      <path d="M-9 -39 Q0 -42 9 -39 L11 -12 L-11 -12 Z" />
      <path d="M-7 -12 L-8 0 M7 -12 L8 0" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M-9 -36 L-14 -20 M9 -36 L14 -20" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </g>
  );
}

function Kasse({ x, y, b = 34, h = 22, merke = true }: { x: number; y: number; b?: number; h?: number; merke?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={b} height={h} fill="#6d6d6d" stroke="#3c3c3c" strokeWidth="1.5" />
      <path d={`M${x} ${y + h / 2} h${b}`} stroke="#555" strokeWidth="1" />
      {merke && (
        <text x={x + b / 2} y={y + h / 2 + 3.5} textAnchor="middle" fontSize="7" fontFamily="Georgia, serif" fill="#d8d8d8" letterSpacing="1">
          KRYDDER
        </text>
      )}
    </g>
  );
}

function FlySnota() {
  return (
    <>
      <rect width={B} height={H} fill="url(#himmel)" />
      <polygon points="0,250 80,212 150,232 230,192 300,222 360,206 420,232 500,202 640,236 640,300 0,300" fill="#8c8c8c" />
      <polygon points="330,300 405,178 438,128 468,92 502,134 546,184 604,240 640,256 640,300" fill="#5a5a5a" />
      <polygon points="452,112 468,92 490,120 480,128 470,112 461,132" fill="#ededed" />
      <polygon points="430,150 446,132 452,160 440,176" fill="#cfcfcf" opacity="0.8" />
      <polygon points="500,150 520,170 512,190 498,170" fill="#d6d6d6" opacity="0.8" />
      <path d="M0 292 Q 220 268 640 302 L640 420 L0 420 Z" fill="url(#sno)" />
      <path d="M160 330 Q 260 360 380 420" stroke="#c4c4c4" strokeWidth="3" strokeDasharray="6 5" fill="none" />
      <path d="M180 332 Q 290 362 420 420" stroke="#c4c4c4" strokeWidth="3" strokeDasharray="6 5" fill="none" />
      <g transform="translate(110 292)">
        <polygon points="24,4 6,-24 16,-24 38,4" fill="#303030" />
        <path d="M22 2 L156 -4 Q176 -2 178 6 L156 14 L22 12 Z" fill="#383838" />
        <rect x="92" y="-30" width="66" height="6" fill="#2a2a2a" />
        <rect x="96" y="12" width="62" height="5" fill="#2a2a2a" />
        <path d="M104 -24 L104 12 M150 -24 L150 12 M104 -24 L150 12" stroke="#2a2a2a" strokeWidth="2" />
        <path d="M156 -4 L176 -1 Q182 4 176 10 L156 14 Z" fill="#1c1c1c" />
        <ellipse cx="183" cy="5" rx="3" ry="24" fill="#5a5a5a" opacity="0.55" />
        <circle cx="183" cy="5" r="3" fill="#1c1c1c" />
        <path d="M30 2 L-6 -4 L-6 4 L30 8" fill="#2c2c2c" />
        <path d="M118 16 L112 38 M146 16 L152 38" stroke="#2a2a2a" strokeWidth="2.5" />
        <path d="M100 40 L160 40 Q168 40 170 34" stroke="#1f1f1f" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M14 12 L10 22 L30 22" stroke="#1f1f1f" strokeWidth="3" fill="none" />
        <rect x="118" y="-8" width="14" height="7" fill="#9a9a9a" />
      </g>
      <Kasse x={318} y={326} />
      <Kasse x={356} y={330} />
      <Kasse x={336} y={306} />
      <Person x={306} y={360} s={1.05} />
      <Person x={410} y={362} s={1.1} tone="#1e1e1e" />
      <Person x={470} y={356} s={0.95} lener={-4} />
    </>
  );
}

function Sledelag() {
  const lag = [
    { x: 140, y: 318 },
    { x: 250, y: 330 },
    { x: 360, y: 340 },
    { x: 470, y: 352 },
  ];
  return (
    <>
      <rect width={B} height={H} fill="url(#himmel)" />
      <polygon points="0,232 120,170 190,206 270,150 350,200 430,168 520,214 640,180 640,290 0,290" fill="#7c7c7c" />
      <polygon points="270,150 300,170 290,190 262,176" fill="#e2e2e2" opacity="0.85" />
      <polygon points="430,168 452,186 440,196" fill="#e2e2e2" opacity="0.85" />
      <path d="M0 280 Q 300 262 640 284 L640 420 L0 420 Z" fill="url(#sno)" />
      {lag.map((p, i) => (
        <g key={i}>
          <path d={`M${p.x - 6} ${p.y - 20} L${p.x - 54} ${p.y - 8}`} stroke="#3a3a3a" strokeWidth="1.5" />
          <path d={`M${p.x - 96} ${p.y + 2} L${p.x - 46} ${p.y + 2} Q${p.x - 40} ${p.y + 2} ${p.x - 40} ${p.y - 4}`} stroke="#2c2c2c" strokeWidth="3" fill="none" />
          <Kasse x={p.x - 92} y={p.y - 22} b={44} h={22} merke={i % 2 === 0} />
          <Person x={p.x} y={p.y} s={1.15} lener={14} />
          <path d={`M${p.x + 8} ${p.y - 34} L${p.x + 22} ${p.y + 2}`} stroke="#2a2a2a" strokeWidth="2" />
          <path d={`M${p.x - 14} ${p.y + 1} h30`} stroke="#2a2a2a" strokeWidth="2.5" />
        </g>
      ))}
      <rect width={B} height={H} fill="#ffffff" opacity="0.12" />
    </>
  );
}

function Trollheimshytta() {
  return (
    <>
      <rect width={B} height={H} fill="url(#himmel)" />
      <polygon points="0,220 110,150 200,196 300,130 400,186 500,150 640,200 640,280 0,280" fill="#7a7a7a" />
      <polygon points="300,130 324,150 314,162 296,148" fill="#e4e4e4" />
      <path d="M0 300 Q 320 286 640 304 L640 420 L0 420 Z" fill="url(#sno)" />
      {[60, 86, 560, 590].map((x, i) => (
        <g key={x}>
          <path d={`M${x} 330 L${x + (i % 2 ? 3 : -2)} ${240 - i * 6}`} stroke="#d8d8d8" strokeWidth="4" />
          <path d={`M${x} 300 l4 0 M${x - 1} 280 l-4 0 M${x + 1} 262 l3 0`} stroke="#333" strokeWidth="2" />
          <ellipse cx={x} cy={236 - i * 6} rx="20" ry="26" fill="#5c5c5c" opacity="0.7" />
        </g>
      ))}
      <rect x="120" y="248" width="70" height="66" fill="#474747" />
      <polygon points="112,250 155,220 198,250" fill="#2e2e2e" />
      <polygon points="114,248 155,222 196,248 190,250 155,228 120,250" fill="#e0e0e0" />
      <rect x="210" y="196" width="270" height="122" fill="#4a4a4a" />
      {Array.from({ length: 15 }, (_, i) => (
        <path key={i} d={`M210 ${200 + i * 8} h270`} stroke="#3a3a3a" strokeWidth="1.2" />
      ))}
      <polygon points="196,198 345,132 494,198" fill="#2c2c2c" />
      <polygon points="198,196 345,134 492,196 484,198 345,142 206,198" fill="#e6e6e6" />
      <rect x="400" y="132" width="16" height="40" fill="#3a3a3a" />
      <circle cx="410" cy="118" r="12" fill="#cfcfcf" opacity="0.8" filter="url(#tåke)" />
      <circle cx="424" cy="96" r="16" fill="#d8d8d8" opacity="0.6" filter="url(#tåke)" />
      <circle cx="446" cy="70" r="20" fill="#e2e2e2" opacity="0.45" filter="url(#tåke)" />
      {[236, 290, 400, 444].map((x) => (
        <g key={x}>
          <rect x={x} y="222" width="22" height="26" fill="#b8b8b8" />
          <path d={`M${x + 11} 222 v26 M${x} 235 h22`} stroke="#3a3a3a" strokeWidth="2" />
        </g>
      ))}
      <rect x="338" y="262" width="30" height="56" fill="#2a2a2a" />
      <rect x="236" y="268" width="22" height="24" fill="#a8a8a8" />
      <path d="M247 268 v24 M236 280 h22" stroke="#3a3a3a" strokeWidth="2" />
      <path d="M150 352 L250 352 Q262 352 264 342" stroke="#2a2a2a" strokeWidth="4" fill="none" />
      <Kasse x={156} y={326} />
      <Kasse x={194} y={326} />
      <Kasse x={174} y={304} />
      <Kasse x={420} y={330} />
      <Kasse x={456} y={330} />
      <Person x={300} y={356} s={1.1} />
      <Person x={384} y={348} s={1.05} tone="#1f1f1f" />
      <Person x={520} y={360} s={1.15} lener={6} />
    </>
  );
}

function Kokeriet() {
  return (
    <>
      <rect width={B} height={H} fill="url(#innerom)" />
      {Array.from({ length: 13 }, (_, i) => (
        <path key={i} d={`M0 ${20 + i * 22} h${B}`} stroke="#262626" strokeWidth="2" opacity="0.6" />
      ))}
      <rect x="40" y="70" width="110" height="120" fill="#ededed" />
      <path d="M95 70 v120 M40 130 h110" stroke="#3a3a3a" strokeWidth="5" />
      <ellipse cx="95" cy="130" rx="120" ry="110" fill="#ffffff" opacity="0.18" filter="url(#tåke)" />
      <polygon points="40,190 150,190 380,420 120,420" fill="#ffffff" opacity="0.1" />
      <rect x="0" y="330" width={B} height="90" fill="#3a3a3a" />
      <rect x="220" y="270" width="150" height="80" fill="#4d4d4d" stroke="#2e2e2e" strokeWidth="3" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M${222 + i * 37} 272 v76`} stroke="#3c3c3c" strokeWidth="2" />
      ))}
      <ellipse cx="295" cy="300" rx="50" ry="14" fill="#d0d0d0" opacity="0.55" filter="url(#tåke)" />
      <path d="M240 220 Q236 280 295 286 Q354 280 350 220 Z" fill="#1c1c1c" />
      <ellipse cx="295" cy="220" rx="55" ry="12" fill="#2a2a2a" stroke="#555" strokeWidth="2" />
      <circle cx="270" cy="190" r="22" fill="#d6d6d6" opacity="0.5" filter="url(#tåke)" />
      <circle cx="300" cy="160" r="28" fill="#d6d6d6" opacity="0.4" filter="url(#tåke)" />
      <circle cx="330" cy="125" r="32" fill="#d6d6d6" opacity="0.3" filter="url(#tåke)" />
      <Person x={208} y={330} s={1.9} tone="#151515" />
      <path d="M222 254 L300 214" stroke="#7a7a7a" strokeWidth="4" strokeLinecap="round" />
      <rect x="420" y="250" width="200" height="10" fill="#5a5a5a" />
      <path d="M432 260 v70 M608 260 v70" stroke="#3e3e3e" strokeWidth="6" />
      {[0, 1].map((t) => (
        <g key={t}>
          <rect x={430 + t * 92} y="236" width="84" height="14" fill="#6a6a6a" stroke="#444" />
          {Array.from({ length: 12 }, (_, i) => (
            <g key={i}>
              <circle cx={437 + t * 92 + (i % 6) * 14} cy={i < 6 ? 239 : 246} r="4.2" fill="#9c9c9c" />
              <circle cx={436 + t * 92 + (i % 6) * 14} cy={i < 6 ? 237.6 : 244.6} r="1.2" fill="#f0f0f0" />
            </g>
          ))}
        </g>
      ))}
      <Person x={560} y={330} s={1.6} tone="#1a1a1a" />
    </>
  );
}

function Kanton() {
  return (
    <>
      <rect width={B} height={H} fill="url(#himmel)" />
      <path d="M0 260 Q 160 246 320 256 T 640 252 L640 420 L0 420 Z" fill="#9a9a9a" />
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d={`M${20 + i * 64} ${300 + (i % 3) * 30} q 16 -4 32 0`} stroke="#bcbcbc" strokeWidth="2" fill="none" />
      ))}
      <polygon points="0,250 60,236 120,244 200,232 260,246 260,262 0,262" fill="#6a6a6a" />
      {[20, 64, 110, 170, 214].map((x, i) => (
        <g key={x}>
          <rect x={x} y={222 - (i % 2) * 10} width="30" height={32 + (i % 2) * 10} fill="#555" />
          <polygon points={`${x - 4},${222 - (i % 2) * 10} ${x + 15},${208 - (i % 2) * 10} ${x + 34},${222 - (i % 2) * 10}`} fill="#3a3a3a" />
        </g>
      ))}
      <g transform="translate(330 140)">
        <path d="M0 140 L220 140 L200 168 L24 168 Z" fill="#2c2c2c" />
        <path d="M70 140 V0 M150 140 V-14" stroke="#262626" strokeWidth="4" />
        <path d="M70 10 L120 20 L120 70 L70 76 Z M70 84 L126 90 L126 132 L70 136 Z" fill="#e2e2e2" stroke="#8a8a8a" />
        <path d="M150 -4 L206 6 L206 60 L150 66 Z M150 74 L212 80 L212 130 L150 134 Z" fill="#dcdcdc" stroke="#8a8a8a" />
        <path d="M0 140 L70 0 M220 140 L150 -14" stroke="#555" strokeWidth="1" />
      </g>
      <g transform="translate(110 300)">
        <path d="M0 20 Q60 34 120 20 L110 34 Q60 44 10 34 Z" fill="#2a2a2a" />
        <path d="M60 22 V-30" stroke="#2a2a2a" strokeWidth="3" />
        <path d="M60 -26 Q 96 -8 62 16 Z" fill="#cfcfcf" stroke="#777" />
      </g>
    </>
  );
}

const BILDER: Record<string, { motiv: ReactNode; alt: string; kilde: string; seed: number }> = {
  kanton: {
    motiv: <Kanton />,
    alt: "Svart-hvitt bilde av et seilskip og sampaner på elven utenfor Kanton.",
    kilde: "Gjengitt fra kobberstikk, ca. 1840. Knattopias arkiv.",
    seed: 3,
  },
  "fly-snota": {
    motiv: <FlySnota />,
    alt: "Svart-hvitt fotografi av et lite fly på ski på snøfonna under Snota, med kasser og tre menn i forgrunnen.",
    kilde: "Foto: ukjent. Knattopias arkiv.",
    seed: 7,
  },
  sledelag: {
    motiv: <Sledelag />,
    alt: "Svart-hvitt fotografi av fire menn som drar kjelker med kasser over fjellet.",
    kilde: "Foto: ukjent. Knattopias arkiv.",
    seed: 11,
  },
  trollheimshytta: {
    motiv: <Trollheimshytta />,
    alt: "Svart-hvitt fotografi av en tømret fjellhytte i snø, med røyk fra pipa og kasser foran inngangen.",
    kilde: "Foto: ukjent. Knattopias arkiv.",
    seed: 19,
  },
  kokeriet: {
    motiv: <Kokeriet />,
    alt: "Svart-hvitt fotografi fra et kjøkken med en stor gryte over ildstedet og brett med knatter på et bord.",
    kilde: "Foto: ukjent. Knattopias arkiv.",
    seed: 23,
  },
};

export function harArkivbilde(id: string) {
  return id in BILDER;
}

export function Arkivbilde({ id, children }: { id: string; children?: ReactNode }) {
  const bilde = BILDER[id];
  if (!bilde) return null;
  const f = `ab-${id}`;
  return (
    <figure className="arkivbilde">
      <div className="arkivbilde-foto">
        <svg viewBox={`0 0 ${B} ${H}`} role="img" aria-label={bilde.alt}>
          <defs>
            <linearGradient id="himmel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8e8e8e" />
              <stop offset="1" stopColor="#dcdcdc" />
            </linearGradient>
            <linearGradient id="sno" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e8e8e8" />
              <stop offset="1" stopColor="#c6c6c6" />
            </linearGradient>
            <linearGradient id="innerom" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#505050" />
              <stop offset="1" stopColor="#1e1e1e" />
            </linearGradient>
            <radialGradient id={`${f}-vignett`} cx="50%" cy="50%" r="70%">
              <stop offset="55%" stopColor="#000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.6" />
            </radialGradient>
            <filter id="tåke" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <filter id={`${f}-myk`}>
              <feGaussianBlur stdDeviation="0.8" />
            </filter>
            <filter id={`${f}-korn`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={bilde.seed} stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
          <g filter={`url(#${f}-myk)`}>{bilde.motiv}</g>
          <rect width={B} height={H} filter={`url(#${f}-korn)`} opacity="0.22" style={{ mixBlendMode: "multiply" }} />
          <path d={`M${80 + bilde.seed * 13} 0 l-6 ${H}`} stroke="#fff" strokeWidth="0.8" opacity="0.35" />
          <path d={`M${420 + bilde.seed * 5} 0 l4 ${H * 0.6}`} stroke="#000" strokeWidth="0.6" opacity="0.3" />
          <rect width={B} height={H} fill={`url(#${f}-vignett)`} />
        </svg>
      </div>
      <figcaption>
        {children}
        <span className="arkivbilde-kilde">{bilde.kilde}</span>
      </figcaption>
    </figure>
  );
}
