import type { ReactNode } from "react";

// Avisutklipp fra arkivet. Avisene, artiklene og personene er oppdiktet.

type Utklipp = {
  avis: string;
  sted: string;
  dato: string;
  nr: string;
  stikk?: string;
  tittel: string;
  undertittel?: string;
  tekst: ReactNode[];
  skjev: number;
  engelsk?: boolean;
};

const UTKLIPP: Record<string, Utklipp> = {
  "trollheimsposten-1924": {
    avis: "Trollheims-Posten",
    sted: "Rindal",
    dato: "Fredag 14de Mars 1924",
    nr: "No. 31 · 22de Aargang",
    stikk: "Fund i Fjeldet",
    tittel: "Opium i Knattene?",
    undertittel: "Lensmanden beslaglægger 40 Kasser ved Trollheimshytta",
    tekst: [
      <>
        Efter Tips fra en Fjeldfører blev Lensmanden igaar Formiddag tilkaldt til Trollheimshytta, hvor der i
        Vinterens Løb skal have foregaaet en omfattende Kogning. Paa Stedet fandtes 40 Kasser mærket «Krydder» samt
        en Kobbergryde af usædvanlig Størrelse.
      </>,
      <>
        Kasserne indeholdt et brunt, harpiksagtigt Stof med en sødlig Lugt. Ifølge Lensmanden er Stoffet sendt til
        Undersøgelse i Trondhjem. Det oplyses, at Kasserne skal være bragt til Fjeldet med Flyvemaskine, som landede
        paa Fonnen under Snota.
      </>,
      <>
        Rindals Konfektkogeri, som tilvirker de bekjendte Knatter, ønsker ikke at udtale sig. Bestyreren, hr. A.
        Natt, var igaar ikke at træffe.
      </>,
    ],
    skjev: -1.4,
  },
  "fjeldbygdens-1924": {
    avis: "Fjeldbygdens Tidende",
    sted: "Surendalen",
    dato: "Onsdag 2den April 1924",
    nr: "No. 14",
    stikk: "Knattesagen",
    tittel: "Sagen henlagt",
    undertittel: "Beviserne er forsvundne",
    tekst: [
      <>
        Den saakaldte Knattesag, som i de sidste Uger har vakt betydelig Opsigt i Bygderne omkring Trollheimen, er
        igaar henlagt efter Bevisets Stilling.
      </>,
      <>
        Efter hvad Bladet erfarer, kom de beslaglagte Prøver aldrig frem til Trondhjem. Kasserne skal under Transporten
        have staaet ubevogtet i et Udhus i Rindal i to Nætter. Da de aabnedes, indeholdt de alene almindelige Knatter.
      </>,
      <>
        Fjeldføreren, som først meldte Sagen, har efter det oplyste forladt Bygden og reist til Amerika.
      </>,
    ],
    skjev: 1.1,
  },
  "midwest-1998": {
    avis: "The Midwest Courier",
    sted: "Ohio",
    dato: "Tuesday, March 17, 1998",
    nr: "Business",
    tittel: "Norwegian Candy Craze Sweeps Rust Belt",
    undertittel: "“Knats” outsell chocolate in 14 states; importer cites “unusual loyalty”",
    tekst: [
      <>
        A small round fruit candy from rural Norway has become the fastest-selling confection in the region, according
        to figures released Monday by Big Knatt Corp USA.
      </>,
      <>
        “Customers don’t buy one bag. They buy a case,” said a company spokesman. “We have never seen repeat purchase
        numbers like this in any food category.”
      </>,
    ],
    skjev: -0.8,
    engelsk: true,
  },
};

export function harUtklipp(id: string) {
  return id in UTKLIPP;
}

export function Avisutklipp({ id }: { id: string }) {
  const u = UTKLIPP[id];
  if (!u) return null;
  return (
    <figure className="utklipp-ramme">
      <div className={`utklipp${u.engelsk ? " utklipp-moderne" : ""}`} style={{ rotate: `${u.skjev}deg` }} lang={u.engelsk ? "en" : "nb"}>
        <header className="utklipp-hode">
          <p className="utklipp-avis">{u.avis}</p>
          <p className="utklipp-linje">
            <span>{u.sted}</span>
            <span>{u.dato}</span>
            <span>{u.nr}</span>
          </p>
        </header>
        {u.stikk && <p className="utklipp-stikk">{u.stikk}</p>}
        <h3 className="utklipp-tittel">{u.tittel}</h3>
        {u.undertittel && <p className="utklipp-under">{u.undertittel}</p>}
        <div className="utklipp-tekst">
          {u.tekst.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>
      </div>
      <figcaption>
        Utklipp: {u.avis}, {u.dato}. Knattopias arkiv.
      </figcaption>
    </figure>
  );
}
