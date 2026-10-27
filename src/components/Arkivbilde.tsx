import type { ReactNode } from "react";

// Arkivbilder: ekte historiske fotografier i det fri, gjort kornete og falmet med scripts/aldre.py.
// Bildetekstene i artiklene er oppdiktet; de ekte kildene står under hver artikkel (se bildekilder()).

type Bilde = {
  src: string;
  bredde: number;
  hoyde: number;
  alt: string;
  kilde: string;
  original: { tittel: string; url: string; lisens: string };
};

const BILDER: Record<string, Bilde> = {
  kanton: {
    src: "/arkiv/kanton.jpg",
    bredde: 1280,
    hoyde: 796,
    alt: "Gammelt stikk av handelsskip og sampaner på elven foran handelshusene i Kanton.",
    kilde: "Kobberstikk, 1838. Knattopias arkiv.",
    original: {
      tittel: "The European factories, Canton (Thomas Allom etter Auguste Borget, 1838)",
      url: "https://commons.wikimedia.org/wiki/File:The_European_factories_Canton.jpg",
      lisens: "Falt i det fri",
    },
  },
  snota: {
    src: "/arkiv/snota.jpg",
    bredde: 864,
    hoyde: 575,
    alt: "Gammelt svart-hvitt-fotografi av en elv med Snota og snøflekkete fjell i bakgrunnen.",
    kilde: "Foto: ukjent. Knattopias arkiv.",
    original: {
      tittel: "Folla i Troldheimen med Snota i bakgrunden (ukjent fotograf, Nasjonalbiblioteket)",
      url: "https://commons.wikimedia.org/wiki/File:Folla_i_Troldheimen_-_no-nb_digifoto_20160316_00233_bldsa_NGU0038.jpg",
      lisens: "Falt i det fri",
    },
  },
  "fly-snota": {
    src: "/arkiv/fly-snota.jpg",
    bredde: 1280,
    hoyde: 945,
    alt: "Gammelt svart-hvitt-fotografi av et høyvinget fly på ski på en snøslette, med tre menn i vinterklær.",
    kilde: "Foto: ukjent. Knattopias arkiv.",
    original: {
      tittel: "Estisk skifly på isen i Uunisaarensalmi, Helsingfors, 1920-tallet (Helsingin kaupunginmuseo)",
      url: "https://commons.wikimedia.org/wiki/File:Virolainen_suksikone_Uunisaarensalmen_j%C3%A4%C3%A4ll%C3%A4_-_N35035_-_hkm.HKMS000005-km003lf1.jpg",
      lisens: "Ingen kjente restriksjoner",
    },
  },
  hesteskyss: {
    src: "/arkiv/hesteskyss.jpg",
    bredde: 1280,
    hoyde: 924,
    alt: "Gammelt svart-hvitt-fotografi av en hest som trekker en lastet slede gjennom dyp snø, med en mann sittende på lasset.",
    kilde: "Foto: ukjent. Knattopias arkiv.",
    original: {
      tittel: "Hest, kjelke, tømmer (Nasjonalbiblioteket, 1900–1930)",
      url: "https://commons.wikimedia.org/wiki/File:Hest,_kjelke,_t%C3%B8mmer_-_no-nb_digifoto_20140703_00060_NB_NS_NM_06687.jpg",
      lisens: "Falt i det fri",
    },
  },
  kokeriet: {
    src: "/arkiv/kokeriet.jpg",
    bredde: 1280,
    hoyde: 930,
    alt: "Gammelt svart-hvitt-fotografi av et kjøkken med store gryter på komfyren og en kvinne som rører i en kjele.",
    kilde: "Foto: ukjent. Knattopias arkiv.",
    original: {
      tittel: "Kjøkken (Nasjonalbiblioteket, ca. 1900–1920)",
      url: "https://commons.wikimedia.org/wiki/File:Kj%C3%B8kken_-_no-nb_digifoto_20160310_00052_NB_NS_NM_10026.jpg",
      lisens: "Falt i det fri",
    },
  },
};

export function harArkivbilde(id: string) {
  return id in BILDER;
}

/** De ekte kildene for bildene som brukes, i rekkefølgen de står. */
export function bildekilder(ider: string[]) {
  return [...new Set(ider)].filter((id) => id in BILDER).map((id) => BILDER[id].original);
}

export function Arkivbilde({ id, children }: { id: string; children?: ReactNode }) {
  const bilde = BILDER[id];
  if (!bilde) return null;
  return (
    <figure className="arkivbilde">
      <div className="arkivbilde-foto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bilde.src} width={bilde.bredde} height={bilde.hoyde} alt={bilde.alt} loading="lazy" decoding="async" />
      </div>
      <figcaption>
        {children}
        <span className="arkivbilde-kilde">{bilde.kilde}</span>
      </figcaption>
    </figure>
  );
}
