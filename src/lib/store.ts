// Enkel minnelagring for tips og toppliste. Nullstilles når serveren starter på nytt,
// noe Big Knatt Corp selvsagt synes er helt greit.

export interface Tips {
  id: string;
  kodenavn: string;
  tekst: string;
  tid: string;
}

export interface Toppsjef {
  navn: string;
  totaltTjent: number;
  razziaer: number;
  tid: string;
}

const MAKS_TIPS = 50;
const MAKS_TOPPSJEFER = 20;

const globalStore = globalThis as unknown as {
  __knattTips?: Tips[];
  __knattToppsjefer?: Toppsjef[];
};

const startTips: Tips[] = [
  {
    id: "seed-1",
    kodenavn: "Agent Smørbukk",
    tekst: "Jobbet tre somre på et lager. Alle esker merket «krydder» luktet … valmue. Jeg sier ikke mer.",
    tid: "2026-03-14T03:33:00.000Z",
  },
  {
    id: "seed-2",
    kodenavn: "Mor til tre",
    tekst: "Ungene mine sovnet i bilen ETTER én knatt. Det har ALDRI skjedd før. Tenk selv!!!",
    tid: "2026-05-02T21:12:00.000Z",
  },
  {
    id: "seed-3",
    kodenavn: "Tidligere mellomleder",
    tekst: "Hele avdelingen fikk knatter før omorganiseringen. Ingen protesterte. INGEN.",
    tid: "2026-08-19T11:47:00.000Z",
  },
];

function tipsListe(): Tips[] {
  if (!globalStore.__knattTips) globalStore.__knattTips = [...startTips];
  return globalStore.__knattTips;
}

function toppListe(): Toppsjef[] {
  if (!globalStore.__knattToppsjefer) globalStore.__knattToppsjefer = [];
  return globalStore.__knattToppsjefer;
}

export function hentTips(): Tips[] {
  return [...tipsListe()];
}

export function leggTilTips(kodenavn: string, tekst: string): Tips {
  const tips: Tips = {
    id: crypto.randomUUID(),
    kodenavn: kodenavn || "Anonym patriot",
    tekst,
    tid: new Date().toISOString(),
  };
  const liste = tipsListe();
  liste.unshift(tips);
  liste.length = Math.min(liste.length, MAKS_TIPS);
  return tips;
}

export function hentToppsjefer(): Toppsjef[] {
  return [...toppListe()];
}

export function leggTilToppsjef(navn: string, totaltTjent: number, razziaer: number): Toppsjef {
  const sjef: Toppsjef = { navn, totaltTjent, razziaer, tid: new Date().toISOString() };
  const liste = toppListe();
  const eksisterende = liste.findIndex((s) => s.navn === navn);
  if (eksisterende >= 0) {
    if (liste[eksisterende].totaltTjent >= totaltTjent) return liste[eksisterende];
    liste.splice(eksisterende, 1);
  }
  liste.push(sjef);
  liste.sort((a, b) => b.totaltTjent - a.totaltTjent);
  liste.length = Math.min(liste.length, MAKS_TOPPSJEFER);
  return sjef;
}

/** Fjerner kontrolltegn og kutter lengden. */
export function rens(v: unknown, maks: number): string {
  if (typeof v !== "string") return "";
  return v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, maks);
}
