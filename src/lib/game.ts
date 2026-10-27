// Spillmotoren for Knattoperium. Ren TypeScript uten DOM, slik at den kan testes.
// Satire: Big Knatt Corp er fiktivt, og knatter inneholder ikke opium.

export type ProdusentId =
  | "tante"
  | "kiosk"
  | "knattebil"
  | "fabrikk"
  | "halloween"
  | "skolemelk";

export type PrId = "faktasjekker" | "influencer" | "lobbyist" | "nrk";

export type OppgraderingId =
  | "frukt"
  | "cola"
  | "melon"
  | "frysetorket"
  | "glasur"
  | "valmue"
  | "voksenpakke"
  | "sukkerfri"
  | "algoritme"
  | "folieforbud";

export interface Produsent {
  id: ProdusentId;
  navn: string;
  beskrivelse: string;
  emoji: string;
  grunnpris: number;
  knatterPerSek: number;
}

export interface PrTiltak {
  id: PrId;
  navn: string;
  beskrivelse: string;
  emoji: string;
  grunnpris: number;
  mistankeReduksjon: number; // per sekund
}

export interface Oppgradering {
  id: OppgraderingId;
  navn: string;
  beskrivelse: string;
  pris: number;
}

export interface Nyhet {
  tid: number;
  tekst: string;
}

export interface Spilltilstand {
  kroner: number;
  totaltTjent: number;
  knatterSolgt: number;
  dose: number; // 0-3
  avhengighet: number; // 0-100
  mistanke: number; // 0-100
  produsenter: Record<ProdusentId, number>;
  pr: Record<PrId, number>;
  oppgraderinger: OppgraderingId[];
  razziaer: number;
  tid: number; // sekunder spilt
  nyheter: Nyhet[];
  helenorgesover: boolean;
}

export const PRODUSENTER: Produsent[] = [
  {
    id: "tante",
    navn: "Snill barnehagetante",
    beskrivelse: "Deler ut «bare én til» etter lunsj.",
    emoji: "👵",
    grunnpris: 15,
    knatterPerSek: 0.5,
  },
  {
    id: "kiosk",
    navn: "Kiosk ved bussholdeplass",
    beskrivelse: "Strategisk plassert der folk venter og kjeder seg.",
    emoji: "🏪",
    grunnpris: 120,
    knatterPerSek: 3,
  },
  {
    id: "knattebil",
    navn: "Knattebil",
    beskrivelse: "Som isbilen, men musikken er litt saktere.",
    emoji: "🚐",
    grunnpris: 900,
    knatterPerSek: 12,
  },
  {
    id: "fabrikk",
    navn: "Konfektkokeriet i Rindal",
    beskrivelse: "Familiebedrift siden 1919. Anlegget har ingen vinduer.",
    emoji: "🏭",
    grunnpris: 8000,
    knatterPerSek: 60,
  },
  {
    id: "halloween",
    navn: "Halloween-kampanje",
    beskrivelse: "Barna samler dem inn for deg. Gratis arbeidskraft.",
    emoji: "🎃",
    grunnpris: 60000,
    knatterPerSek: 300,
  },
  {
    id: "skolemelk",
    navn: "Statlig skolemelkavtale",
    beskrivelse: "Én knatt i hver kartong. Står i kontrakten med liten skrift.",
    emoji: "🥛",
    grunnpris: 500000,
    knatterPerSek: 1500,
  },
];

export const PR_TILTAK: PrTiltak[] = [
  {
    id: "faktasjekker",
    navn: "Faktasjekker på lønningslista",
    beskrivelse: "«Påstanden er FALSK. Kilde: oss.»",
    emoji: "✅",
    grunnpris: 200,
    mistankeReduksjon: 0.15,
  },
  {
    id: "influencer",
    navn: "Wellness-influencer",
    beskrivelse: "«Knatter er faktisk superfood, jeg har forsket på Google.»",
    emoji: "🤳",
    grunnpris: 2500,
    mistankeReduksjon: 0.6,
  },
  {
    id: "lobbyist",
    navn: "Lobbyist på Stortinget",
    beskrivelse: "Har alltid en pose knatter på pulten. Alle forslag får flertall.",
    emoji: "🕴️",
    grunnpris: 30000,
    mistankeReduksjon: 2.5,
  },
  {
    id: "nrk",
    navn: "Koselig TV-serie om knatter",
    beskrivelse: "Sakte-TV: 168 timer knattekoking. Hele landet slapper av.",
    emoji: "📺",
    grunnpris: 400000,
    mistankeReduksjon: 10,
  },
];

/** Knattevarianter. Hver ny smak gir høyere pris per knatt. */
export const VARIANTER: { id: OppgraderingId | "skogsbaer"; navn: string; farger: [string, string]; prisFaktor: number }[] = [
  { id: "skogsbaer", navn: "Skogsbær", farger: ["#e3262f", "#2d3a8c"], prisFaktor: 1 },
  { id: "frukt", navn: "Frukt", farger: ["#f2d41c", "#e8452c"], prisFaktor: 1.25 },
  { id: "cola", navn: "Cola", farger: ["#f5ecd9", "#7a3b1c"], prisFaktor: 1.3 },
  { id: "melon", navn: "Melon", farger: ["#8fd14f", "#f06292"], prisFaktor: 1.35 },
  { id: "frysetorket", navn: "Frysetørket", farger: ["#fff3f0", "#c2185b"], prisFaktor: 2 },
];

export const OPPGRADERINGER: Oppgradering[] = [
  {
    id: "frukt",
    navn: "Ny smak: Frukt",
    beskrivelse: "Gul, rød og grønn. Folk tror det teller som frukt. Pris x1,25.",
    pris: 400,
  },
  {
    id: "cola",
    navn: "Ny smak: Cola",
    beskrivelse: "Koffein OG … krydder. Pris x1,3.",
    pris: 3000,
  },
  {
    id: "melon",
    navn: "Ny smak: Melon",
    beskrivelse: "Grønn og rosa, som et feberdrømt sommerbilde. Pris x1,35.",
    pris: 25000,
  },
  {
    id: "frysetorket",
    navn: "Frysetørkede knatter",
    beskrivelse: "Luftige og knasende. Ingen merker at de spiste 40 stykker. Pris x2.",
    pris: 250000,
  },
  {
    id: "glasur",
    navn: "Ny sukkerglasur",
    beskrivelse: "Hver utdeling gir 5x knatter. Den blanke overflaten skjuler … ingenting.",
    pris: 100,
  },
  {
    id: "valmue",
    navn: "Valmueåker «for pynt»",
    beskrivelse: "Alle produsenter lager 2x knatter.",
    pris: 5000,
  },
  {
    id: "voksenpakke",
    navn: "«Kontor-knatt» for voksne",
    beskrivelse: "Knattene selges for 1,5x pris. Perfekt før budsjettmøter.",
    pris: 15000,
  },
  {
    id: "sukkerfri",
    navn: "Sukkerfri variant",
    beskrivelse: "Folk tror det er sunt. Mistanken vokser 40 % saktere.",
    pris: 50000,
  },
  {
    id: "algoritme",
    navn: "Knatt-algoritmen",
    beskrivelse: "Reklame som dukker opp når du er sliten. Alle produsenter 3x.",
    pris: 750000,
  },
  {
    id: "folieforbud",
    navn: "Forbud mot sølvpapirhatter",
    beskrivelse: "Kritikerne mister signalet. PR-tiltak virker 2x.",
    pris: 2000000,
  },
];

export const MAKS_DOSE = 3;
export const PRISVEKST = 1.15;
export const RAZZIA_TAP = 0.4;

const NYHETER_MAKS = 8;

export function nyttSpill(): Spilltilstand {
  return {
    kroner: 0,
    totaltTjent: 0,
    knatterSolgt: 0,
    dose: 1,
    avhengighet: 0,
    mistanke: 0,
    produsenter: { tante: 0, kiosk: 0, knattebil: 0, fabrikk: 0, halloween: 0, skolemelk: 0 },
    pr: { faktasjekker: 0, influencer: 0, lobbyist: 0, nrk: 0 },
    oppgraderinger: [],
    razziaer: 0,
    tid: 0,
    nyheter: [{ tid: 0, tekst: "Big Knatt Corp åpner dørene. «Vi selger bare godteri», sier ingen." }],
    helenorgesover: false,
  };
}

export function harOppgradering(s: Spilltilstand, id: OppgraderingId): boolean {
  return s.oppgraderinger.includes(id);
}

export function pris(grunnpris: number, antall: number): number {
  return Math.ceil(grunnpris * Math.pow(PRISVEKST, antall));
}

export function produsentPris(s: Spilltilstand, id: ProdusentId): number {
  const p = PRODUSENTER.find((x) => x.id === id)!;
  return pris(p.grunnpris, s.produsenter[id]);
}

export function prPris(s: Spilltilstand, id: PrId): number {
  const p = PR_TILTAK.find((x) => x.id === id)!;
  return pris(p.grunnpris, s.pr[id]);
}

export function knatterPerSek(s: Spilltilstand): number {
  let total = 0;
  for (const p of PRODUSENTER) total += p.knatterPerSek * s.produsenter[p.id];
  if (harOppgradering(s, "valmue")) total *= 2;
  if (harOppgradering(s, "algoritme")) total *= 3;
  return total;
}

export function knatterPerKlikk(s: Spilltilstand): number {
  return harOppgradering(s, "glasur") ? 5 : 1;
}

/** Kroner per knatt. Avhengige kunder betaler mer. */
export function knattPris(s: Spilltilstand): number {
  let p = 0.5 * (1 + s.avhengighet / 40);
  if (harOppgradering(s, "voksenpakke")) p *= 1.5;
  for (const v of VARIANTER) {
    if (v.id !== "skogsbaer" && harOppgradering(s, v.id)) p *= v.prisFaktor;
  }
  return p;
}

export function mistankeReduksjon(s: Spilltilstand): number {
  let total = 0;
  for (const p of PR_TILTAK) total += p.mistankeReduksjon * s.pr[p.id];
  if (harOppgradering(s, "folieforbud")) total *= 2;
  return total;
}

/** Mistanke-økning per sekund før PR-tiltak. */
export function mistankeVekst(s: Spilltilstand): number {
  const volum = Math.log10(1 + knatterPerSek(s));
  let vekst = s.dose * s.dose * 0.12 * (1 + volum);
  if (harOppgradering(s, "sukkerfri")) vekst *= 0.6;
  return vekst;
}

/** Folkets produktivitet i prosent. Big Knatt Corp vil ha den lav. */
export function produktivitet(s: Spilltilstand): number {
  return Math.max(0, 100 - s.avhengighet * 0.95);
}

function leggTilNyhet(s: Spilltilstand, tekst: string): Spilltilstand {
  return { ...s, nyheter: [{ tid: s.tid, tekst }, ...s.nyheter].slice(0, NYHETER_MAKS) };
}

function selg(s: Spilltilstand, antall: number): Spilltilstand {
  const inntekt = antall * knattPris(s);
  return {
    ...s,
    kroner: s.kroner + inntekt,
    totaltTjent: s.totaltTjent + inntekt,
    knatterSolgt: s.knatterSolgt + antall,
  };
}

export function klikk(s: Spilltilstand): Spilltilstand {
  const ny = selg(s, knatterPerKlikk(s));
  return { ...ny, mistanke: Math.min(100, ny.mistanke + s.dose * 0.05) };
}

export function settDose(s: Spilltilstand, dose: number): Spilltilstand {
  const d = Math.max(0, Math.min(MAKS_DOSE, Math.round(dose)));
  return { ...s, dose: d };
}

export function kjopProdusent(s: Spilltilstand, id: ProdusentId): Spilltilstand {
  const kost = produsentPris(s, id);
  if (s.kroner < kost) return s;
  return {
    ...s,
    kroner: s.kroner - kost,
    produsenter: { ...s.produsenter, [id]: s.produsenter[id] + 1 },
  };
}

export function kjopPr(s: Spilltilstand, id: PrId): Spilltilstand {
  const kost = prPris(s, id);
  if (s.kroner < kost) return s;
  return { ...s, kroner: s.kroner - kost, pr: { ...s.pr, [id]: s.pr[id] + 1 } };
}

export function kjopOppgradering(s: Spilltilstand, id: OppgraderingId): Spilltilstand {
  const o = OPPGRADERINGER.find((x) => x.id === id)!;
  if (harOppgradering(s, id) || s.kroner < o.pris) return s;
  const ny = { ...s, kroner: s.kroner - o.pris, oppgraderinger: [...s.oppgraderinger, id] };
  return leggTilNyhet(ny, `Big Knatt Corp lanserer «${o.navn}». Aksjen stiger.`);
}

interface Hendelse {
  tekst: string;
  effekt: (s: Spilltilstand) => Partial<Spilltilstand>;
}

export const HENDELSER: Hendelse[] = [
  { tekst: "Statsråd sovner i spørretimen med en knatt i munnen. «Bare sliten», sier rådgiver.", effekt: (s) => ({ mistanke: s.mistanke + 4 }) },
  { tekst: "Mann i Bærum skriver 400-siders blogginnlegg om knatter. Ingen leser det.", effekt: () => ({}) },
  { tekst: "Ny studie: knatter gir «uforklarlig god stemning». Studien finansiert av Big Knatt Corp.", effekt: (s) => ({ mistanke: s.mistanke - 3 }) },
  { tekst: "Mandagsmøter i hele landet utsatt til tirsdag. Og så onsdag.", effekt: (s) => ({ avhengighet: s.avhengighet + 2 }) },
  { tekst: "Dokumentar om knatter under planlegging. Regissøren ble plutselig «veldig avslappet».", effekt: (s) => ({ mistanke: s.mistanke + 6 }) },
  { tekst: "Rekordsalg på bensinstasjoner. Folk kjører dit bare for å se på knattehylla.", effekt: (s) => ({ kroner: s.kroner * 1.05 }) },
  { tekst: "Konspirasjonsteoretiker blir latterliggjort på direkte TV. Takk, PR-avdelingen.", effekt: (s) => ({ mistanke: s.mistanke - 5 }) },
  { tekst: "BNP faller for tredje kvartal på rad. Økonomer: «Vi orker ikke regne ut hvorfor.»", effekt: () => ({}) },
  { tekst: "Kattens knatt-forbruk: også katter virker roligere. Ingen stiller spørsmål.", effekt: (s) => ({ avhengighet: s.avhengighet + 1 }) },
  { tekst: "Lekkasje: internt notat om «dryss» havner på et forum. Forumet krasjer.", effekt: (s) => ({ mistanke: s.mistanke + 8 }) },
];

const HENDELSE_SJANSE_PER_SEK = 1 / 25;

/**
 * Kjører spillet `dt` sekunder fram. `tilfeldig` kan byttes ut i tester.
 */
export function tick(s: Spilltilstand, dt: number, tilfeldig: () => number = Math.random): Spilltilstand {
  let ny: Spilltilstand = { ...s, tid: s.tid + dt };

  // Salg fra produsenter
  const solgt = knatterPerSek(ny) * dt;
  if (solgt > 0) ny = selg(ny, solgt);

  // Avhengigheten drives mot et mål bestemt av dose og salgsvolum
  const volum = Math.min(1, Math.log10(1 + knatterPerSek(ny)) / 4);
  const mal = Math.min(100, ny.dose * 30 * (0.4 + 0.6 * volum) + (ny.dose > 0 ? 10 : 0));
  ny.avhengighet += (mal - ny.avhengighet) * Math.min(1, dt * 0.05);

  // Mistanke
  ny.mistanke += (mistankeVekst(ny) - mistankeReduksjon(ny)) * dt;
  ny.mistanke = Math.max(0, ny.mistanke);

  // Tilfeldige hendelser
  if (tilfeldig() < HENDELSE_SJANSE_PER_SEK * dt) {
    const h = HENDELSER[Math.floor(tilfeldig() * HENDELSER.length) % HENDELSER.length];
    ny = { ...ny, ...h.effekt(ny) };
    ny = leggTilNyhet(ny, h.tekst);
  }

  ny.avhengighet = Math.max(0, Math.min(100, ny.avhengighet));
  ny.mistanke = Math.max(0, ny.mistanke);

  // Razzia
  if (ny.mistanke >= 100) {
    ny = {
      ...ny,
      kroner: ny.kroner * (1 - RAZZIA_TAP),
      mistanke: 35,
      dose: 0,
      razziaer: ny.razziaer + 1,
    };
    ny = leggTilNyhet(ny, "RAZZIA! Mattilsynet stormer hovedkontoret. Big Knatt Corp «samarbeider fullt ut». Dosen er satt til null … inntil videre.");
  }

  // Milepæl
  if (!ny.helenorgesover && produktivitet(ny) < 10) {
    ny = leggTilNyhet({ ...ny, helenorgesover: true }, "HELE NORGE SOVER. Produktiviteten er under 10 %. Styret i Big Knatt Corp skåler i knattesaft.");
  }

  return ny;
}

/** Leser lagret tilstand og fyller inn felt som mangler fra eldre versjoner. */
export function lastInn(data: unknown): Spilltilstand {
  const base = nyttSpill();
  if (!data || typeof data !== "object") return base;
  const d = data as Partial<Spilltilstand>;
  const tall = (v: unknown, fallback: number) => (typeof v === "number" && Number.isFinite(v) ? v : fallback);
  return {
    ...base,
    kroner: tall(d.kroner, 0),
    totaltTjent: tall(d.totaltTjent, 0),
    knatterSolgt: tall(d.knatterSolgt, 0),
    dose: Math.max(0, Math.min(MAKS_DOSE, tall(d.dose, 1))),
    avhengighet: tall(d.avhengighet, 0),
    mistanke: tall(d.mistanke, 0),
    produsenter: { ...base.produsenter, ...(d.produsenter ?? {}) },
    pr: { ...base.pr, ...(d.pr ?? {}) },
    oppgraderinger: Array.isArray(d.oppgraderinger)
      ? d.oppgraderinger.filter((id): id is OppgraderingId => OPPGRADERINGER.some((o) => o.id === id))
      : [],
    razziaer: tall(d.razziaer, 0),
    tid: tall(d.tid, 0),
    nyheter: Array.isArray(d.nyheter) ? d.nyheter.slice(0, NYHETER_MAKS) : base.nyheter,
    helenorgesover: Boolean(d.helenorgesover),
  };
}

export function formaterKroner(n: number): string {
  if (n < 1000) return `${n.toFixed(n < 10 ? 2 : 0).replace(".", ",")} kr`;
  const enheter = ["", " tusen", " mill.", " mrd.", " bill."];
  let i = 0;
  while (n >= 1000 && i < enheter.length - 1) {
    n /= 1000;
    i++;
  }
  return `${n.toFixed(n < 10 ? 2 : 1).replace(".", ",")}${enheter[i]} kr`;
}

export function formaterTall(n: number): string {
  return Math.floor(n).toLocaleString("nb-NO");
}
