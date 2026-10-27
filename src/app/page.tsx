import Link from "next/link";
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
    tall: "12",
    enhet: "min",
    tittel: "fra posen åpnes til baksetet blir stille",
    tekst: "Foreldre beskriver en «behagelig ro» som senker seg over bilturen. Ingen har spurt hvorfor.",
  },
  {
    tall: "0",
    enhet: "av 40",
    tittel: "testpersoner klarte å spise bare én",
    tekst: "Alle 40 fikk én knatt og en åpen pose. Forsøket ble avbrutt da posen var tom.",
  },
  {
    tall: "37",
    enhet: "%",
    tittel: "mer tid i sofaen etter fredagskos",
    tekst: "Tallet stammer fra det lekkede notatet. Big Knatt Corp har ikke svart på henvendelser.",
  },
  {
    tall: "2",
    enhet: "farger",
    tittel: "i skogsbærposen, rød og blå",
    tekst: "Som pillene i en kjent science fiction-film. Forbrukeren velger aldri. Hen spiser begge.",
  },
];

const ANALYSE: { parameter: string; metode: React.ReactNode; resultat: React.ReactNode; status: "ok" | "avvik" | "sensur" }[] = [
  { parameter: "Sukker", metode: "Smakstest, 3 personer", resultat: "Mye", status: "ok" },
  { parameter: "Gelatin", metode: "Sprett mot bordplate", resultat: "Påvist", status: "ok" },
  { parameter: "Fargestoff, rødt", metode: "Visuell kontroll", resultat: "Svært rødt", status: "ok" },
  { parameter: "Glans", metode: "Lommelykt, 45°", resultat: "Uvanlig høy", status: "avvik" },
  { parameter: "«Aroma»", metode: "Ingrediensliste", resultat: "Uspesifisert", status: "avvik" },
  {
    parameter: "Papaver somniferum, spor",
    metode: <Sensur>Ikke utført</Sensur>,
    resultat: <Sensur>Vi har ikke laboratorium</Sensur>,
    status: "sensur",
  },
];

const TIDSLINJE = [
  { ar: "1871", tekst: "En reisende «krydderhandler» ankommer et lite tettsted med en kiste merket «Ikke åpne». Den blir åpnet." },
  { ar: "1923", tekst: "Et oppskriftsmanus forsvinner fra et bibliotek. Lånekortet er signert «B. K. C.»." },
  { ar: "1969", tekst: "Mens verden ser på månelandingen, flyttes produksjonen til en bygning uten vinduer." },
  { ar: "1987", tekst: "Big Knatt Corp registreres. Formål: «Glede». Ingen spør hva slags glede." },
  { ar: "2004", tekst: "Fredagskos etablerer seg som nasjonal tradisjon. Ingen tar på seg ansvaret. Det er det mest mistenkelige av alt." },
  { ar: "2019", tekst: "Frysetørkede knatter lanseres. Sosiale medier fylles av lykkelige og litt for rolige mennesker." },
  { ar: "2026", tekst: "Knattopia publiserer denne granskningen. Redaksjonen føler seg overvåket, og litt sulten." },
];

const FAQ = [
  {
    q: "Er dette sant?",
    a: "Nei. Knattopia er satire. Knatter inneholder ikke opium, og alle tall, dokumenter og aktører her er oppdiktet.",
  },
  {
    q: "Hvorfor står det ikke på ingredienslisten?",
    a: "I parodiens verden gjemmer det seg under «aroma». I virkeligheten er aroma bare aroma.",
  },
  {
    q: "Hvem står bak Big Knatt Corp?",
    a: "Ingen. Selskapet er oppdiktet for denne siden og har ingen kobling til noen ekte produsent.",
  },
  {
    q: "Hva bør jeg gjøre?",
    a: "Spis godteri med måte, vær kritisk til nettsider med nettverkskart og sensurerte notater, og prøv Knattoperium.",
  },
];

export default function Hjem() {
  const siste = alleArtikler().slice(0, 3);
  return (
    <main>
      <section className="ramme hero">
        <div className="hero-tekst">
          <p className="stikktittel">Granskning · Sak KN-1987/04</p>
          <h1>Hva er egentlig i knattene?</h1>
          <p className="ingress">
            Små, runde og blanke. Spist på fredagskos, i baksetet og foran TV-en. Knattopia har fulgt sporene i to år,
            og alt tyder på at knattene inneholder <mark>littegrann opium</mark>. Akkurat nok til at du blir litt for
            fornøyd, litt for rolig og litt for lite produktiv.
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
          <h2>Fire ting som ikke stemmer</h2>
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
        <p className="fotnote">Alle tall er oppdiktet for denne parodien.</p>
      </section>

      <section id="analyse" className="ramme seksjon to-spalter">
        <header className="seksjonshode">
          <p className="stikktittel">Analyserapport</p>
          <h2>Vi sendte knattene til analyse</h2>
          <p>
            Prøve A-113 ble undersøkt etter beste evne. Resultatene for de viktigste parameterne er sensurert. Hold
            pekeren over eller trykk på de svarte feltene for å lese dem.
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
          <p className="rapport-fot">Fiktiv rapport. Ingen analyse er utført, og laboratoriet finnes ikke.</p>
        </div>
      </section>

      <section id="nettverk" className="ramme seksjon">
        <header className="seksjonshode">
          <p className="stikktittel">Følg pengene</p>
          <h2>Alt fører tilbake til Big Knatt Corp</h2>
          <p>Vi har kartlagt hvem som henger sammen med hvem. Mønsteret er vanskelig å overse.</p>
        </header>
        <Nettverk />
      </section>

      <section id="grafen" className="ramme seksjon">
        <header className="seksjonshode">
          <p className="stikktittel">Utviklingen</p>
          <h2>Salget går opp. Energien går ned.</h2>
        </header>
        <Graf />
      </section>

      <section id="tidslinje" className="ramme seksjon to-spalter">
        <header className="seksjonshode">
          <p className="stikktittel">Tidslinje</p>
          <h2>155 år med «krydder»</h2>
          <p>Fra en kiste i 1871 til en skolemelkkontrakt i dag. Hendelsene er oppdiktet.</p>
        </header>
        <ol className="tidslinje">
          {TIDSLINJE.map((t) => (
            <li key={t.ar}>
              <span className="tidslinje-ar">{t.ar}</span>
              <p>{t.tekst}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="notatet" className="ramme seksjon">
        <header className="seksjonshode">
          <p className="stikktittel">Lekket dokument</p>
          <h2>Notatet de ikke ville at du skulle se</h2>
          <p>Dokumentet kom til redaksjonen i en konvolutt som luktet svakt av skogsbær.</p>
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
            <dd>
              Avdeling for <Sensur>Dryss og Trivsel</Sensur>
            </dd>
            <dt>Sak</dt>
            <dd>Operasjon Sofakrok, kvartalsrapport</dd>
          </dl>
          <p>
            Kvartalstallene viser at befolkningen nå bruker <Sensur>37 prosent</Sensur> mer tid i sofaen etter
            innføringen av <Sensur>ekstra aroma</Sensur>. Vi anbefaler å øke doseringen i den frysetørkede linjen,
            siden forbrukerne ikke merker forskjell på 10 og <Sensur>40</Sensur> stykker.
          </p>
          <p>
            Mistanken i befolkningen er fortsatt lav takket være faktasjekkerne. Det er viktig at ingen kobler den røde
            og blå fargekodingen til <Sensur>en kjent science fiction-film</Sensur>.
          </p>
          <p>
            Neste fase: <Sensur>én knatt i hver skolemelkkartong</Sensur>.
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
            Del det med andre sannhetssøkere. Ikke skriv ekte navn eller personopplysninger. Tipsene lagres bare i
            serverens minne og forsvinner ved omstart.
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
            <h2>Kan du ikke slå dem, bli dem.</h2>
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
