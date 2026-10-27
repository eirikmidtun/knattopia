// Oppdiktet indeksgraf tegnet med én felles skala for akser, linjer og etiketter.

const AAR = [2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024, 2026];
const SALG = [100, 102, 108, 113, 117, 121, 124, 129, 133, 138, 147, 151, 156, 162];
const ENERGI = [100, 99, 97, 93, 91, 89, 88, 85, 83, 80, 74, 72, 69, 66];

const B = 640;
const H = 340;
const M = { v: 48, h: 24, t: 24, b: 40 };
const Y_MIN = 60;
const Y_MAX = 170;

const x = (aar: number) => M.v + ((aar - 2000) / 26) * (B - M.v - M.h);
const y = (v: number) => M.t + (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * (H - M.t - M.b);
const linje = (serie: number[]) => serie.map((v, i) => `${i ? "L" : "M"}${x(AAR[i]).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");

export function Graf() {
  const yTicks = [60, 80, 100, 120, 140, 160];
  const xTicks = [2000, 2005, 2010, 2015, 2020, 2025];
  const sisteX = x(2026);
  return (
    <figure className="graf">
      <div className="graf-hode">
        <div className="graf-tegn">
          <span className="tegn tegn-salg" /> Knattesalg
        </div>
        <div className="graf-tegn">
          <span className="tegn tegn-energi" /> Mandagsenergi i befolkningen
        </div>
        <div className="graf-enhet">Indeks, 2000 = 100</div>
      </div>
      <div className="graf-rull">
        <svg viewBox={`0 0 ${B} ${H}`} role="img" aria-label="Graf: knattesalg stiger fra indeks 100 til 162 mellom 2000 og 2026, mens mandagsenergien faller fra 100 til 66.">
          {yTicks.map((t) => (
            <g key={t}>
              <line x1={M.v} x2={B - M.h} y1={y(t)} y2={y(t)} className={t === 100 ? "graf-basis" : "graf-rutenett"} />
              <text x={M.v - 10} y={y(t) + 4} textAnchor="end" className="graf-akse">
                {t}
              </text>
            </g>
          ))}
          {xTicks.map((t) => (
            <text key={t} x={x(t)} y={H - 14} textAnchor="middle" className="graf-akse">
              {t}
            </text>
          ))}
          <line x1={x(2004)} x2={x(2004)} y1={M.t} y2={H - M.b} className="graf-markering" />
          <text x={x(2004) + 8} y={M.t + 12} className="graf-notat">
            Fredagskos blir tradisjon
          </text>
          <path d={`${linje(SALG)} L${sisteX} ${y(Y_MIN)} L${x(2000)} ${y(Y_MIN)} Z`} className="graf-flate" />
          <path d={linje(SALG)} className="graf-salg" />
          <path d={linje(ENERGI)} className="graf-energi" />
          <circle cx={sisteX} cy={y(162)} r="5" className="graf-punkt-salg" />
          <circle cx={sisteX} cy={y(66)} r="5" className="graf-punkt-energi" />
          <text x={sisteX - 10} y={y(162) - 12} textAnchor="end" className="graf-verdi">
            162
          </text>
          <text x={sisteX - 10} y={y(66) + 22} textAnchor="end" className="graf-verdi">
            66
          </text>
        </svg>
      </div>
      <figcaption>
        Figur 2. Kilde: Knattopias beregninger basert på omsetningstall og befolkningsundersøkelser, 2000–2026.
      </figcaption>
    </figure>
  );
}
