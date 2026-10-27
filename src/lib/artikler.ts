import fs from "node:fs";
import path from "node:path";

/**
 * Artiklene ligger som Markdown i content/artikler/<slug>.md med en enkel frontmatter:
 *
 * ---
 * tittel: ...
 * beskrivelse: ...            (meta description, ca. 140–160 tegn)
 * dato: 2026-10-27
 * oppdatert: 2026-11-03       (valgfri)
 * sokeord: knatter, knatter er godt
 * ingress: ...                (valgfri, ellers brukes beskrivelsen)
 * ---
 */

export type Inline =
  | { type: "tekst"; tekst: string }
  | { type: "fet"; barn: Inline[] }
  | { type: "kursiv"; barn: Inline[] }
  | { type: "lenke"; href: string; barn: Inline[] };

export type Blokk =
  | { type: "overskrift"; niva: 2 | 3; tekst: string; id: string }
  | { type: "avsnitt"; innhold: Inline[] }
  | { type: "liste"; nummerert: boolean; punkter: Inline[][] }
  | { type: "sitat"; innhold: Inline[] };

export type Artikkel = {
  slug: string;
  tittel: string;
  beskrivelse: string;
  ingress: string;
  dato: string;
  oppdatert: string;
  sokeord: string[];
  blokker: Blokk[];
  ord: number;
};

const MAPPE = path.join(process.cwd(), "content", "artikler");
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function lagId(tekst: string): string {
  return tekst
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function delFrontmatter(kilde: string): { felt: Record<string, string>; tekst: string } {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(kilde);
  if (!m) return { felt: {}, tekst: kilde };
  const felt: Record<string, string> = {};
  for (const linje of m[1].split(/\r?\n/)) {
    const i = linje.indexOf(":");
    if (i < 1) continue;
    felt[linje.slice(0, i).trim()] = linje
      .slice(i + 1)
      .trim()
      .replace(/^"(.*)"$/, "$1");
  }
  return { felt, tekst: m[2] };
}

export function lesInline(tekst: string): Inline[] {
  const ut: Inline[] = [];
  const monster = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*(.+?)\*\*|\*([^*]+)\*/g;
  let sist = 0;
  for (const m of tekst.matchAll(monster)) {
    const start = m.index ?? 0;
    if (start > sist) ut.push({ type: "tekst", tekst: tekst.slice(sist, start) });
    if (m[1] !== undefined) ut.push({ type: "lenke", href: m[2], barn: lesInline(m[1]) });
    else if (m[3] !== undefined) ut.push({ type: "fet", barn: lesInline(m[3]) });
    else ut.push({ type: "kursiv", barn: lesInline(m[4]) });
    sist = start + m[0].length;
  }
  if (sist < tekst.length) ut.push({ type: "tekst", tekst: tekst.slice(sist) });
  return ut;
}

export function lesMarkdown(tekst: string): Blokk[] {
  const blokker: Blokk[] = [];
  const linjer = tekst.split(/\r?\n/);
  let i = 0;
  while (i < linjer.length) {
    const linje = linjer[i].trimEnd();
    if (!linje.trim()) {
      i++;
      continue;
    }
    const overskrift = /^(#{2,3})\s+(.+)$/.exec(linje);
    if (overskrift) {
      const t = overskrift[2].trim();
      blokker.push({ type: "overskrift", niva: overskrift[1].length as 2 | 3, tekst: t, id: lagId(t) });
      i++;
      continue;
    }
    const punkt = /^(\s*)([-*]|\d+\.)\s+/;
    if (punkt.test(linje)) {
      const nummerert = /^\s*\d+\./.test(linje);
      const punkter: Inline[][] = [];
      while (i < linjer.length && punkt.test(linjer[i])) {
        punkter.push(lesInline(linjer[i].replace(punkt, "").trim()));
        i++;
      }
      blokker.push({ type: "liste", nummerert, punkter });
      continue;
    }
    if (linje.startsWith(">")) {
      const deler: string[] = [];
      while (i < linjer.length && linjer[i].startsWith(">")) {
        deler.push(linjer[i].replace(/^>\s?/, "").trim());
        i++;
      }
      blokker.push({ type: "sitat", innhold: lesInline(deler.join(" ")) });
      continue;
    }
    const deler: string[] = [];
    while (
      i < linjer.length &&
      linjer[i].trim() &&
      !/^#{2,3}\s/.test(linjer[i]) &&
      !punkt.test(linjer[i]) &&
      !linjer[i].startsWith(">")
    ) {
      deler.push(linjer[i].trim());
      i++;
    }
    blokker.push({ type: "avsnitt", innhold: lesInline(deler.join(" ")) });
  }
  return blokker;
}

export function lesArtikkel(slug: string, kilde: string): Artikkel {
  const { felt, tekst } = delFrontmatter(kilde);
  for (const navn of ["tittel", "beskrivelse", "dato"]) {
    if (!felt[navn]) throw new Error(`Artikkelen «${slug}» mangler feltet «${navn}» i frontmatter.`);
  }
  return {
    slug,
    tittel: felt.tittel,
    beskrivelse: felt.beskrivelse,
    ingress: felt.ingress || felt.beskrivelse,
    dato: felt.dato,
    oppdatert: felt.oppdatert || felt.dato,
    sokeord: (felt.sokeord ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    blokker: lesMarkdown(tekst),
    ord: tekst.split(/\s+/).filter(Boolean).length,
  };
}

let buffer: Artikkel[] | null = null;

/** Alle artikler, nyeste først. */
export function alleArtikler(): Artikkel[] {
  if (buffer && process.env.NODE_ENV === "production") return buffer;
  const filer = fs.existsSync(MAPPE) ? fs.readdirSync(MAPPE).filter((f) => f.endsWith(".md")) : [];
  const liste = filer
    .map((f) => f.replace(/\.md$/, ""))
    .filter((slug) => SLUG.test(slug))
    .map((slug) => lesArtikkel(slug, fs.readFileSync(path.join(MAPPE, `${slug}.md`), "utf8")))
    .sort((a, b) => (a.dato === b.dato ? a.tittel.localeCompare(b.tittel, "nb") : b.dato.localeCompare(a.dato)));
  buffer = liste;
  return liste;
}

export function finnArtikkel(slug: string): Artikkel | undefined {
  return alleArtikler().find((a) => a.slug === slug);
}

/** Artikler som deler flest søkeord, deretter de nyeste. */
export function relaterte(artikkel: Artikkel, alle: Artikkel[], antall = 3): Artikkel[] {
  const egne = new Set(artikkel.sokeord.map((s) => s.toLowerCase()));
  return alle
    .filter((a) => a.slug !== artikkel.slug)
    .map((a) => ({ a, felles: a.sokeord.filter((s) => egne.has(s.toLowerCase())).length }))
    .sort((x, y) => y.felles - x.felles || y.a.dato.localeCompare(x.a.dato))
    .slice(0, antall)
    .map((x) => x.a);
}

export function lesetid(artikkel: Artikkel): number {
  return Math.max(1, Math.round(artikkel.ord / 220));
}

export function formaterDato(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat("nb-NO", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(d);
}
