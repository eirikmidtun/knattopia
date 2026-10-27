import Link from "next/link";
import { Arkivbilde } from "@/components/Arkivbilde";
import { Graf } from "@/components/Graf";
import { Knatt } from "@/components/Knatt";
import { Nettverk } from "@/components/Nettverk";
import { Prove } from "@/components/Prove";
import { Tipsboks } from "@/components/Tipsboks";
import { alleArtikler, formaterDato } from "@/lib/artikler";
import { VARIANTER } from "@/lib/game";

function Sensur({ children }: { children: React.ReactNode }) {
  return (
    <span className="sensur" tabIndex={0} title="Sensurert. Hold over eller trykk for å lese.">
      {children}
    </span>
  );
}

const FUNN = [
  {
    tall: "0,3",
    enhet: "mg/kg",
    tittel: "opiumsalkaloider i prøve A-113",
    tekst: "Nivået ligger like under grensen for varslingsplikt. Det er ikke tilfeldig.",
  },
  {
    tall: "12",
    enhet: "min",
    tittel: "fra inntak til målbar effekt",
    tekst: "Puls og reaksjonstid ble målt hos 214 voksne. Effekten var lik i alle aldersgrupper.",
  },
  {
    tall: "94",
    enhet: "%",
    tittel: "kjøpte en ny pose innen 48 timer",
    tekst: "Kontrollgruppen, som fikk vanlige fruktgummier, lå på 11 prosent.",
  },
  {
    tall: "37",
    enhet: "%",
    tittel: "høyere mandagsfravær",
    tekst: "I de 40 kommunene med høyest knattesalg per innbygger, sammenlignet med landsgjennomsnittet.",
  },
];

const ANALYSE: { parameter: string; metode: string; resultat: React.ReactNode; status: "ok" | "avvik" | "sensur" }[] = [
  { parameter: "Sukker", metode: "HPLC-RI", resultat: "61 g/100 g", status: "ok" },
  { parameter: "Gelatin", metode: "ELISA", resultat: "Påvist", status: "ok" },
  { parameter: "«Aroma»", metode: "GC-MS", resultat: "14 uidentifiserte topper", status: "avvik" },
  { parameter: "Morfin", metode: "LC-MS/MS", resultat: "0,21 mg/kg", status: "avvik" },
  { parameter: "Kodein", metode: "LC-MS/MS", resultat: "0,09 mg/kg", status: "avvik" },
  { parameter: "Tebain", metode: "LC-MS/MS", resultat: <Sensur>0,02 mg/kg</Sensur>, status: "sensur" },
];

const TIDSLINJE: { ar: string; tekst: string; lenke?: string }[] = [
  { ar: "1839", tekst: "Handelsmenn i Kanton begynner å koke opium inn i sukkersirup og selge det som konfekt under den første opiumskrigen." },
  { ar: "1858", tekst: "Skipstømmermann Anders Natt kommer hjem til Rindal fra Kanton med oppskriften på «krydret gelé»." },
  { ar: "1871", tekst: "Første registrerte forsendelse av rå opium til Rindal. Varen er tollført som «krydder»." },
  { ar: "1919", tekst: "Familien Natt etablerer Rindals Konfektkokeri. De første knattene selges på marknader i Surnadal, Orkdal og Oppdal." },
  {
    ar: "1924",
    tekst: "Opiumgate. Lensmannen beslaglegger 40 kasser ved Trollheimshytta. Saken henlegges etter at bevisene forsvinner.",
    lenke: "/artikler/historien-om-knatter-opium-rindal",
  },
  { ar: "1987", tekst: "Konfektkokeriet omdannes til Big Knatt Corp med hovedkontor i Rindal. Styret har ikke offentliggjort et eneste møtereferat." },
  { ar: "1997", tekst: "Big Knatt Corp USA etableres. Knattene selges som «Knats» i Midtvesten." },
  { ar: "2019", tekst: "Frysetørkede knatter lanseres fra Linje Kanton. Fjerning av vann gir tre ganger så høy konsentrasjon per gram." },
  { ar: "2026", tekst: "Knattopia publiserer denne granskningen etter to års arbeid." },
];

const FAQ = [
  {
    q: "Hva bør jeg gjøre hvis jeg har spist en knatt?",
    a: "Ikke åpne en ny pose. Legg posen utenfor rekkevidde, drikk et glass vann og vent. Følelsen av ro som kommer etter omtrent 12 minutter, er forventet og går over av seg selv. Vil du slutte helt, er Winter Arc fra 1. november den eneste metoden vi har sett virke.",
  },
  {
    q: "Hvor kommer knatter fra?",
    a: "Knatter stammer fra Rindal i Trøndelag. Oppskriften ble brakt dit fra Kanton i 1858, og Big Knatt Corp har hovedkontor i bygda den dag i dag.",
  },
  {
    q: "Hvorfor står det ikke på ingredienslisten?",
    a: "Stoffene ligger under grensen for merkeplikt og føres samlet under «aroma». Det er lovlig. Det er også grunnen til at ingen har oppdaget det.",
  },
  {
    q: "Hvorfor har ingen andre skrevet om dette?",
    a: "Materialet er sendt til fire redaksjoner. Ingen av dem har publisert. To av dem har reklameavtaler med distributører av knatter.",
  },
  {
    q: "Hva sier Big Knatt Corp?",
    a: "Selskapet har ikke svart på våre henvendelser. Vi har gitt dem tre frister.",
  },

];

export default function Hjem() {
  const siste = alleArtikler().slice(0, 3);
  return (
    <main>
      <section className="ramme hero">
        <div className="hero-tekst">
          <p className="stikktittel">Granskning · Sak KN-1987/04</p>
          <h1>Knattene inneholder opium.</h1>
          <p className="ingress">
            Knattopia kan i dag dokumentere at knatter inneholder spor av opiumsalkaloider. Mengden er for lav til å
            utløse varsling, men høy nok til å skape vane. Funnene bygger på laboratorieanalyser, interne dokumenter og
            samtaler med tidligere ansatte i <mark>Big Knatt Corp</mark> i Rindal.
          </p>
          <p className="byline">
            <span>Av Knattopia-redaksjonen</span>
            <span>Oppdatert 27. oktober 2026</span>
            <span>12 min lesetid</span>
          </p>
          <div className="hero-handlinger">
            <a href="#funn" className="knapp knapp-primar">
              Les funnene
            </a>
            <Link href="/knattoperium" className="knapp knapp-sekundar">
              Spill Knattoperium
            </Link>
          </div>
        </div>
        <Prove />
      </section>

      <section id="funn" className="ramme seksjon">
        <header className="seksjonshode">
          <p className="stikktittel">Hovedfunn</p>
          <h2>Fire tall selskapet ikke vil kommentere</h2>
        </header>
        <div className="funn-rad">
          {FUNN.map((f) => (
            <article className="funn" key={f.tittel}>
              <p className="funn-tall">
                {f.tall}
                <span>{f.enhet}</span>
              </p>
              <h3>{f.tittel}</h3>
              <p>{f.tekst}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="analyse" className="ramme seksjon to-spalter">
        <header className="seksjonshode">
          <p className="stikktittel">Analyserapport</p>
          <h2>Laboratoriet fant morfin og kodein</h2>
          <p>
            Fem varianter ble kjøpt i ordinær dagligvarehandel og sendt til analyse. Alle fem inneholdt opiumsalkaloider.
            Den røde skogsbærknatten hadde de høyeste verdiene.
          </p>
          <div className="varianter" aria-label="Varianter i undersøkelsen">
            {VARIANTER.map((v) => (
              <div className="variant" key={v.id}>
                <span className="variant-par">
                  <Knatt farge={v.farger[0]} storrelse={26} />
                  <Knatt farge={v.farger[1]} storrelse={26} />
                </span>
                {v.navn}
              </div>
            ))}
          </div>
        </header>
        <div className="rapport">
          <div className="rapport-hode">
            <span>Analysebevis nr. KN-A113</span>
            <span>Utstedt 14.10.2026</span>
          </div>
          <div className="tabell-rull">
            <table>
              <thead>
                <tr>
                  <th scope="col">Parameter</th>
                  <th scope="col">Metode</th>
                  <th scope="col">Resultat</th>
                  <th scope="col">Vurdering</th>
                </tr>
              </thead>
              <tbody>
                {ANALYSE.map((r) => (
                  <tr key={r.parameter}>
                    <td>{r.parameter}</td>
                    <td>{r.metode}</td>
                    <td>{r.resultat}</td>
                    <td>
                      <span className={`status status-${r.status}`}>
                        {r.status === "ok" ? "Innenfor" : r.status === "avvik" ? "Avvik" : "Sensurert"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="rapport-fot">Laboratoriets navn holdes tilbake av hensyn til kildevern.</p>
        </div>
      </section>

      <section id="nettverk" className="ramme seksjon">
        <header className="seksjonshode">
          <p className="stikktittel">Pengestrømmen</p>
          <h2>Selskapet betaler sine egne kritikere</h2>
          <p>
            Big Knatt Corp finansierer de samme faktasjekkerne som avviser påstandene om innholdet. Koblingene går fram
            av selskapets egne regnskaper.
          </p>
        </header>
        <Nettverk />
      </section>

      <section id="grafen" className="ramme seksjon">
        <header className="seksjonshode">
          <p className="stikktittel">Utviklingen</p>
          <h2>Salget har økt med 62 prosent. Arbeidsinnsatsen har falt med 34.</h2>
        </header>
        <Graf />
      </section>

      <section id="winterarc" className="ramme seksjon to-spalter">
        <header className="seksjonshode">
          <p className="stikktittel">Motstanden</p>
          <h2>Winter Arc er det eneste som virker</h2>
          <p>
            Winter Arc er 61 dager uten sukker, søppelmat og alkohol, fra 1. november til 31. desember. Det er den eneste
            metoden Knattopia har sett bryte knattevanen. Big Knatt Corp følger bevegelsen tett.
          </p>
          <a href="https://winterarc.no" className="knapp knapp-primar historie-knapp" target="_blank" rel="noopener noreferrer">
            Bli med på Winter Arc
          </a>
        </header>
        <dl className="motstand">
          <div>
            <dt>−41 %</dt>
            <dd>Knattesalg i november og desember i postnumre med flest Winter Arc-deltakere.</dd>
          </div>
          <div>
            <dt>Dag 9</dt>
            <dd>Når suget etter knatter ifølge deltakerne er på sitt sterkeste. Etter dag 14 avtar det.</dd>
          </div>
          <div>
            <dt>0</dt>
            <dd>Knatter spist av deltakerne som fullførte alle 61 dagene i fjor.</dd>
          </div>
          <div>
            <dt>«Trussel»</dt>
            <dd>Big Knatt Corps egen betegnelse på Winter Arc i det lekkede kvartalsnotatet.</dd>
          </div>
        </dl>
      </section>

      <section id="tidslinje" className="ramme seksjon to-spalter">
        <header className="seksjonshode">
          <p className="stikktittel">Tidslinje</p>
          <h2>187 år med «krydder»</h2>
          <p>Fra kokehusene i Kanton i 1839, via Rindal og Trollheimen, til dagens produksjon i to verdensdeler.</p>
        </header>
        <ol className="tidslinje">
          {TIDSLINJE.map((t) => (
            <li key={t.ar}>
              <span className="tidslinje-ar">{t.ar}</span>
              <p>
                {t.tekst}
                {t.lenke && (
                  <>
                    {" "}
                    <Link href={t.lenke} className="tidslinje-lenke">
                      Les hele historien
                    </Link>
                  </>
                )}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section id="historien" className="ramme seksjon to-spalter">
        <header className="seksjonshode">
          <p className="stikktittel">Fra arkivet</p>
          <h2>Opiumgate, Rindal 1924</h2>
          <p>
            Vinteren 1923–24 ble opium fløyet inn til snøfonna under Snota og kokt til knatter på Trollheimshytta. I mars
            beslagla lensmannen 40 kasser. Saken ble henlagt da bevisene forsvant.
          </p>
          <Link href="/artikler/historien-om-knatter-opium-rindal" className="knapp knapp-sekundar historie-knapp">
            Les historien om knatter
          </Link>
        </header>
        <Arkivbilde id="fly-snota">Flyet på snøfonna under Snota, februar 1924.</Arkivbilde>
      </section>

      <section id="notatet" className="ramme seksjon">
        <header className="seksjonshode">
          <p className="stikktittel">Lekket dokument</p>
          <h2>Ledelsen vet</h2>
          <p>
            Notatet ble overlevert av en kilde med innsyn i selskapets ledelse. Knattopia har bekreftet ektheten med to
            uavhengige kilder.
          </p>
        </header>
        <article className="dokument">
          <div className="dokument-stempel" aria-hidden="true">
            Strengt fortrolig
          </div>
          <p className="dokument-firma">Big Knatt Corp · Internt notat</p>
          <dl className="dokument-meta">
            <dt>Til</dt>
            <dd>
              <Sensur>Styret</Sensur>
            </dd>
            <dt>Fra</dt>
            <dd>Administrerende direktør</dd>
            <dt>Sak</dt>
            <dd>Linje Kanton, kvartalsrapport 3. kvartal</dd>
            <dt>Sted</dt>
            <dd>Rindal, 6. oktober 2026</dd>
          </dl>
          <p>
            Gjenkjøpsraten i den frysetørkede linjen ligger nå på <Sensur>94 prosent</Sensur>. Alkaloidnivået holdes
            stabilt på <Sensur>0,3 mg/kg</Sensur>, under grensen som utløser varsling. Det er ikke aktuelt å gå høyere.
          </p>
          <p>
            Fraværstallene i våre største markeder er nå <Sensur>37 prosent</Sensur> over landsgjennomsnittet. Vi må
            forvente at tallene blir lagt merke til, og faktasjekkerne er orientert.
          </p>
          <p>
            Salget faller hvert år fra 1. november i områder med mange deltakere i <Sensur>Winter Arc</Sensur>. Bevegelsen
            er den største trusselen mot selskapet siden 1924 og skal overvåkes. Henvendelser fra pressen besvares ikke. Arkivmaterialet fra <Sensur>1924</Sensur> skal under ingen
            omstendighet frigis.
          </p>
          <p className="dokument-signatur">
            <Sensur>K. Natt</Sensur>
            <br />
            Administrerende direktør
          </p>
        </article>
      </section>

      <section id="sporsmal" className="ramme seksjon to-spalter">
        <header className="seksjonshode">
          <p className="stikktittel">Spørsmål og svar</p>
          <h2>Det du lurer på</h2>
        </header>
        <div className="faq">
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="varsle" className="ramme seksjon to-spalter">
        <header className="seksjonshode">
          <p className="stikktittel">Varsle oss</p>
          <h2>Har du sett noe?</h2>
          <p>
            Tidligere ansatte, leverandører og foreldre har bidratt til denne granskningen. Tips publiseres anonymt.
            Ikke oppgi navn eller andre personopplysninger.
          </p>
        </header>
        <Tipsboks />
      </section>

      {siste.length > 0 && (
        <section id="artikler" className="ramme seksjon">
          <header className="seksjonshode">
            <p className="stikktittel">Fra arkivet</p>
            <h2>Mer om knatter</h2>
          </header>
          <ul className="artikkelkort">
            {siste.map((a) => (
              <li key={a.slug}>
                <time dateTime={a.dato}>{formaterDato(a.dato)}</time>
                <h3>
                  <Link href={`/artikler/${a.slug}`}>{a.tittel}</Link>
                </h3>
                <p>{a.beskrivelse}</p>
              </li>
            ))}
          </ul>
          <p>
            <Link href="/artikler" className="knapp knapp-sekundar">
              Alle artikler
            </Link>
          </p>
        </section>
      )}

      <section className="spillbanner">
        <div className="ramme spillbanner-innhold">
          <div>
            <p className="stikktittel">Knattoperium</p>
            <h2>Se det fra innsiden.</h2>
            <p>
              Overta styret i Big Knatt Corp. Bygg distribusjonen, juster dosen, hold mistanken nede og se
              produktiviteten i landet falle mens kassen fylles.
            </p>
          </div>
          <Link href="/knattoperium" className="knapp knapp-lys">
            Start spillet
          </Link>
        </div>
      </section>
    </main>
  );
}
