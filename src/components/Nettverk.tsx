// Nettverkskart over «aktørene», i samme stil som en ekte granskning, men med oppdiktet innhold.

type Node = { id: string; x: number; y: number; navn: string; type: string; hoved?: boolean };

const NODER: Node[] = [
  { id: "bkc", x: 330, y: 190, navn: "Big Knatt Corp", type: "Selskap", hoved: true },
  { id: "dryss", x: 120, y: 80, navn: "Avd. for Dryss og Trivsel", type: "Intern enhet" },
  { id: "hardanger", x: 110, y: 300, navn: "«Epleåker» i Hardanger", type: "Eiendom" },
  { id: "faktasjekk", x: 560, y: 70, navn: "Uavhengige faktasjekkere", type: "Samarbeidspartner" },
  { id: "kiosk", x: 560, y: 310, navn: "Kiosk- og bensinstasjonsnett", type: "Distribusjon" },
  { id: "skolemelk", x: 340, y: 360, navn: "Skolemelkavtalen", type: "Kontrakt" },
  { id: "fredagskos", x: 340, y: 30, navn: "Fredagskos", type: "Tradisjon" },
];

const KANTER: [string, string, string][] = [
  ["bkc", "dryss", "eier"],
  ["bkc", "hardanger", "leier"],
  ["bkc", "faktasjekk", "finansierer"],
  ["bkc", "kiosk", "leverer til"],
  ["bkc", "skolemelk", "forhandler"],
  ["bkc", "fredagskos", "promoterer"],
  ["dryss", "hardanger", "henter fra"],
  ["faktasjekk", "fredagskos", "anbefaler"],
];

const finn = (id: string) => NODER.find((n) => n.id === id)!;

export function Nettverk() {
  return (
    <figure className="nettverk">
      <div className="nettverk-rull">
        <svg viewBox="0 0 680 400" role="img" aria-label="Nettverkskart med Big Knatt Corp i midten, koblet til seks andre aktører.">
          {KANTER.map(([a, b, tekst]) => {
            const A = finn(a);
            const Bn = finn(b);
            return (
              <g key={`${a}-${b}`}>
                <line x1={A.x} y1={A.y} x2={Bn.x} y2={Bn.y} className="kant" />
                <text x={(A.x + Bn.x) / 2} y={(A.y + Bn.y) / 2 - 6} textAnchor="middle" className="kant-tekst">
                  {tekst}
                </text>
              </g>
            );
          })}
          {NODER.map((n) => (
            <g key={n.id} transform={`translate(${n.x} ${n.y})`} className={n.hoved ? "node node-hoved" : "node"}>
              <circle r={n.hoved ? 18 : 9} />
              <text y={n.hoved ? 38 : 26} textAnchor="middle" className="node-navn">
                {n.navn}
              </text>
              <text y={n.hoved ? 54 : 41} textAnchor="middle" className="node-type">
                {n.type}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption>Figur 1. Kartlagte forbindelser per oktober 2026.</figcaption>
    </figure>
  );
}
