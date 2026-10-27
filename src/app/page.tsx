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
    tall: "0,3",
    enhet: "mg/kg",
    tittel: "opiumsalkaloider i prøve A-113",
    tekst: "Nivået ligger like under grensen for varslingsplikt. Det er ikke tilfeldig.",
  },
  {
    tall: "12",
    enhet: "min",
    tittel: "fra inntak til målbar ro hos barn",
    tekst: "Målt på 214 bilturer der en pose ble åpnet i baksetet. Effekten var lik i alle aldersgrupper.",
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
    tittel: "mer tid i sofaen etter fredagskos",
    tekst: "Tallet er hentet fra selskapets egen kvartalsrapport, som Knattopia har fått tilgang til.",
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

const TIDSLINJE = [
  { ar: "1871", tekst: "Første registrerte forsendelse av rå opium til en vestlandsk konfekthandel. Varen er tollført som «krydder»." },
  { ar: "1923", tekst: "Den opprinnelige oppskriften på «krydret gelé» forsvinner fra offentlige arkiver. Den er aldri funnet igjen." },
  { ar: "1969", tekst: "Produksjonen flyttes til et nytt anlegg uten vinduer. Søknaden om byggetillatelse er unntatt offentlighet." },
  { ar: "1987", tekst: "Big Knatt Corp registreres med formålet «glede og trivsel». Styret har siden ikke offentliggjort et eneste møtereferat." },
  { ar: "2004", tekst: "Fredagskos blir en landsdekkende tradisjon i løpet av to sesonger. Selskapets salg dobles samme år." },
  { ar: "2019", tekst: "Frysetørkede knatter lanseres. Fjerning av vann gir tre ganger så høy konsentrasjon per gram." },
  { ar: "2026", tekst: "Knattopia publiserer denne granskningen etter to års arbeid." },
];

const FAQ = [
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
  {
    q: "Er jeg avhengig?",
    a: "Hvis du ikke klarer å spise én knatt og legge resten tilbake i posen, er svaret sannsynligvis ja.",
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
            samtaler med tidligere ansatte i <mark>Big Knatt Corp</mark>.
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
          <h2>Salget har økt med 62 prosent. Energien har falt med 34.</h2>
        </header>
        <Graf />
      </section>

      <section id="tidslinje" className="ramme seksjon to-spalter">
        <header className="seksjonshode">
          <p className="stikktittel">Tidslinje</p>
          <h2>155 år med «krydder»</h2>
          <p>Fra den første forsendelsen i 1871 til dagens produksjon.</p>
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
          <h2>Ledelsen visste</h2>
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
