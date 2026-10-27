import Link from "next/link";
import { Knatt } from "@/components/Knatt";
import { LiveTeller } from "@/components/LiveTeller";
import { Tipsboks } from "@/components/Tipsboks";
import { VARIANTER } from "@/lib/game";

const BEVIS = [
  {
    tittel: "Ingen klarer å spise bare én",
    tekst: (
      <>
        Prøv selv. Åpne posen og spis <span className="caps">én</span> knatt. Du klarte det ikke, gjorde du vel? «Det er
        bare godt», sier <span className="sensur" tabIndex={0}>de som tjener på det</span>. Tilfeldig?{" "}
        <span className="marker">VI TROR IKKE DET.</span>
      </>
    ),
  },
  {
    tittel: "Den mistenkelige roen etter posen",
    tekst: (
      <>
        Familier rapporterer om en «behagelig stillhet» i baksetet 12 minutter etter at posen er åpnet. Barn som har
        hoppet i sofaen i sju timer blir plutselig <span className="caps">fornøyde</span>. Hvorfor vil ingen forske på
        dette?!
      </>
    ),
  },
  {
    tittel: "Formen er en kuppel. Som et VALMUEFRØHODE.",
    tekst: (
      <>
        Legg en knatt ved siden av et bilde av en valmuekapsel. Myk og rund på toppen, flat i bunnen. Designerne kaller
        det «praktisk å tygge». Vi kaller det <span className="marker">SYMBOLIKK</span>.
      </>
    ),
  },
  {
    tittel: "Rød og blå. Som PILLENE i Matrix.",
    tekst: (
      <>
        Skogsbær-varianten kommer i rød og blå. Du får aldri velge. Du spiser <span className="caps">begge</span>. Du
        blir værende i drømmen. Noen har tenkt <span className="sensur" tabIndex={0}>veldig nøye</span> gjennom dette.
      </>
    ),
  },
  {
    tittel: "Frysetørket = konsentrert?",
    tekst: (
      <>
        Når man fjerner vannet, hva blir igjen? Svaret er enkelt: <span className="caps">alt det andre</span>. Folk
        spiser 40 frysetørkede knatter og sier at de «bare var luftige». Luftige som i … <em>svevende</em>?
      </>
    ),
  },
  {
    tittel: "Mandagsproduktiviteten faller",
    tekst: (
      <>
        Fredagskos med knatter. Mandagsmøtet blir utsatt. Sammenhengen er åpenbar for alle som har sett grafen vår (se
        nedenfor). Grafen er tegnet for hånd, og derfor er den <span className="marker">UMULIG Å FORFALSKE</span>.
      </>
    ),
  },
];

const TIDSLINJE = [
  { ar: "1871", tekst: "En reisende «krydderhandler» ankommer et lite tettsted med en kiste merket «IKKE ÅPNE». Den blir åpnet." },
  { ar: "1923", tekst: "Det første «kokebøker for knatter»-manuset forsvinner fra Nasjonalbiblioteket. Lånekortet var signert «B. K. C.»." },
  { ar: "1969", tekst: "Mens verden ser på månelandingen, flyttes produksjonen i all hemmelighet til en bygning uten vinduer." },
  { ar: "1987", tekst: "Big Knatt Corp registreres. Formål: «Glede». Ingen spør hva slags glede." },
  { ar: "2004", tekst: "Fredagskos blir nasjonal tradisjon. Big Knatt Corp tar æren. Myndighetene sier ingenting. FORDI DE ER MED." },
  { ar: "2019", tekst: "Frysetørkede knatter lanseres. Sosiale medier fylles av folk som ser lykkelige og litt for rolige ut." },
  { ar: "2026", tekst: "Denne nettsiden publiseres. Forfatteren føler seg overvåket. Og litt sulten." },
];

const TAVLE_LAPPER: { x: number; y: number; tekst: string; foto?: boolean }[] = [
  { x: 50, y: 48, tekst: "🍬", foto: true },
  { x: 14, y: 18, tekst: "BIG KNATT CORP" },
  { x: 84, y: 16, tekst: "Fredagskos (TVANG?)" },
  { x: 16, y: 80, tekst: "Valmueåker i Hardanger??" },
  { x: 84, y: 80, tekst: "Mandagsmøter UTSATT" },
  { x: 50, y: 12, tekst: "Rød + blå = MATRIX" },
  { x: 50, y: 88, tekst: "Halloween = innsamling" },
];

const FAQ = [
  {
    q: "Er dette sant?",
    a: "Nei. Dette er satire. Knatter inneholder ikke opium. Men det er nøyaktig det de ville fått deg til å si. (Nei, det er ikke det. Det er satire.)",
  },
  {
    q: "Hvorfor står det ikke på ingredienslisten?",
    a: "Fordi det står under «aroma». ALT kan skjules under «aroma». (Igjen: dette er tull. Aroma er aroma.)",
  },
  {
    q: "Hvem står bak Big Knatt Corp?",
    a: "Ingen. Big Knatt Corp er oppdiktet for denne siden. Akkurat som en ekte hemmelig organisasjon ville sagt.",
  },
  {
    q: "Hva kan jeg gjøre?",
    a: "Spis godteri med måte, drikk vann, og ikke tro på alt du leser på nettsider med rød tråd og blinkende tekst. Og spill Knattoperium.",
  },
];

export default function Hjem() {
  return (
    <>
      <div className="ticker" aria-hidden="true">
        <span>
          +++ SISTE: Ny lekkasje bekrefter «dryss» i produksjonslinje 3 +++ Ekspert: «Jeg har aldri vært så avslappet»
          +++ Butikker melder om rekordsalg rett før helgen +++ Faktasjekkere sier «FALSK» – hvem betaler dem? +++
          Frysetørkede knatter utsolgt i 14 fylker +++ DETTE ER SATIRE +++
        </span>
      </div>
      <main>
        <section className="hero">
          <div className="stempel-topp">AVSLØRT</div>
          <div>
            <span className="øye" aria-hidden="true">
              👁️
            </span>
          </div>
          <h1>
            Knattene er <span className="rod">dopet</span>
          </h1>
          <p className="ingress">
            De vil ikke at du skal vite det. Men nå kommer sannheten fram: små, runde, blanke knatter inneholder{" "}
            <span className="marker">LITTEGRANN OPIUM</span>. Akkurat nok til at du blir litt for fornøyd, litt for
            rolig og <span className="caps blink">litt for lite produktiv</span>.
          </p>
          <p className="ingress liten">(Dette er satire. De gjør ikke det. Men les videre, det er gøy.)</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", flexWrap: "wrap", marginTop: "1rem" }}>
            {VARIANTER.flatMap((v) => v.farger).map((f, i) => (
              <Knatt key={i} farge={f} storrelse={44} />
            ))}
          </div>
          <LiveTeller />
          <div>
            <Link href="/knattoperium" className="knapp">
              Spill som Big Knatt Corp →
            </Link>
          </div>
        </section>

        <section id="bevis">
          <h2>📂 Bevisene de prøver å skjule</h2>
          <p>
            Hold musen over (eller trykk på) de sensurerte feltene for å se hva <em>de</em> har strøket over.
          </p>
          <div className="bevis-grid">
            {BEVIS.map((b, i) => (
              <article className="bevis" key={b.tittel}>
                <span className="nr">BEVIS #{i + 1}</span>
                <h3>{b.tittel}</h3>
                <p>{b.tekst}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="tavla">
          <h2>🧵 Sammenhengen</h2>
          <p>Vi har brukt 400 meter rød tråd. Alt henger sammen. ALT.</p>
          <div className="tavle">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {TAVLE_LAPPER.slice(1).map((l, i) => (
                <line key={i} x1={TAVLE_LAPPER[0].x} y1={TAVLE_LAPPER[0].y} x2={l.x} y2={l.y} />
              ))}
              <line x1={14} y1={18} x2={84} y2={80} />
              <line x1={84} y1={16} x2={16} y2={80} />
              <line x1={50} y1={12} x2={84} y2={16} />
            </svg>
            {TAVLE_LAPPER.map((l) => (
              <div
                key={l.tekst}
                className={`lapp${l.foto ? " foto" : ""}`}
                style={{ left: `${l.x}%`, top: `${l.y}%`, rotate: `${((l.x * 7 + l.y) % 9) - 4}deg` }}
              >
                {l.foto ? <Knatt farge="#e3262f" storrelse={72} /> : l.tekst}
              </div>
            ))}
          </div>
        </section>

        <section id="tidslinje">
          <h2>⏳ Tidslinjen</h2>
          <ol className="tidslinje">
            {TIDSLINJE.map((t) => (
              <li key={t.ar}>
                <span className="ar">{t.ar}</span>
                {t.tekst}
              </li>
            ))}
          </ol>
        </section>

        <section id="grafen">
          <h2>📉 Grafen som sjokkerte ingen</h2>
          <div className="graf">
            <svg viewBox="0 0 400 200" role="img" aria-label="Oppdiktet graf: knattesalg går opp, produktivitet går ned">
              <line x1="30" y1="10" x2="30" y2="170" stroke="#8fa585" />
              <line x1="30" y1="170" x2="390" y2="170" stroke="#8fa585" />
              <polyline
                points="30,150 80,140 130,120 180,110 230,80 280,60 330,35 380,20"
                fill="none"
                stroke="#e3262f"
                strokeWidth="4"
              />
              <polyline
                points="30,30 80,40 130,55 180,70 230,100 280,120 330,145 380,160"
                fill="none"
                stroke="#39ff14"
                strokeWidth="4"
                strokeDasharray="8 4"
              />
              <text x="300" y="15" fill="#e3262f" fontSize="12" fontFamily="monospace">
                Knatter solgt
              </text>
              <text x="250" y="190" fill="#39ff14" fontSize="12" fontFamily="monospace">
                Folkets energi
              </text>
              <text x="140" y="95" fill="#ffe600" fontSize="22" fontFamily="Impact, sans-serif" transform="rotate(-8 140 95)">
                KORRELASJON!!!
              </text>
            </svg>
            <p className="forklaring">
              Kilde: Vi tegnet den selv. Akseverdiene er fjernet for å beskytte kildene våre. Korrelasjon er ikke
              kausalitet, men det vil de at du skal tro.
            </p>
          </div>
        </section>

        <section id="dokumentet">
          <h2>📄 Det lekkede dokumentet</h2>
          <div className="dokument">
            <h3>Internt notat – Big Knatt Corp</h3>
            <p className="meta">
              Til: <span className="sensur" tabIndex={0}>Styret</span>
              <br />
              Fra: Avdeling for <span className="sensur" tabIndex={0}>Dryss og Trivsel</span>
              <br />
              Ref: OPERASJON SOFAKROK
            </p>
            <p>
              Kvartalstallene viser at befolkningen nå bruker <span className="sensur" tabIndex={0}>37 %</span> mer tid på
              sofaen etter innføring av <span className="sensur" tabIndex={0}>«ekstra aroma»</span>. Vi anbefaler å
              øke doseringen i frysetørket linje, da forbrukerne ikke merker forskjell på 10 og{" "}
              <span className="sensur" tabIndex={0}>40</span> stykk.
            </p>
            <p>
              Mistanke i befolkningen er fortsatt lav takket være faktasjekkerne. Det er viktig at ingen kobler rød/blå
              fargekoding til <span className="sensur" tabIndex={0}>en kjent science fiction-film</span>.
            </p>
            <p>
              Neste fase: <span className="sensur" tabIndex={0}>én knatt i hver skolemelkkartong</span>.
            </p>
            <p>
              Signert,
              <br />
              <span className="sensur" tabIndex={0}>Toppsjef K. Natt</span>
            </p>
            <div className="kaffeflekk" aria-hidden="true" />
          </div>
        </section>

        <section id="faq">
          <h2>❓ Spørsmål de ikke vil du skal stille</h2>
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>

        <section id="tips">
          <h2>📨 Send inn anonymt tips</h2>
          <p>
            Har du sett noe? Har du <em>følt</em> noe? Del det med andre sannhetssøkere. Ikke skriv ekte navn eller
            personopplysninger. Tipsene lagres bare i minnet til serveren og forsvinner ved omstart.
          </p>
          <Tipsboks />
        </section>

        <section style={{ textAlign: "center" }}>
          <h2>🎮 Bli Big Knatt Corp</h2>
          <p>
            Hvorfor kjempe mot dem når du kan <span className="marker">BLI dem</span>? Styr knatt-imperiet, skru opp
            dosen, hold folket fornøyd og uproduktivt, og tjen milliarder før Mattilsynet tar deg.
          </p>
          <Link href="/knattoperium" className="knapp">
            Start Knattoperium
          </Link>
        </section>
      </main>
    </>
  );
}
