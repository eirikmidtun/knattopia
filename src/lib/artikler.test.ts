import { describe, expect, it } from "vitest";
import { alleArtikler, lagId, lesArtikkel, lesInline, lesMarkdown, relaterte } from "./artikler";

describe("artikler", () => {
  it("lager id uten æøå", () => {
    expect(lagId("Hvor stor er en knatt?")).toBe("hvor-stor-er-en-knatt");
    expect(lagId("Søt og syrlig på én gang")).toBe("sot-og-syrlig-pa-en-gang");
  });

  it("leser inline-formatering", () => {
    expect(lesInline("Se [notatet](/#notatet) og **fet** og *kursiv*.")).toEqual([
      { type: "tekst", tekst: "Se " },
      { type: "lenke", href: "/#notatet", barn: [{ type: "tekst", tekst: "notatet" }] },
      { type: "tekst", tekst: " og " },
      { type: "fet", barn: [{ type: "tekst", tekst: "fet" }] },
      { type: "tekst", tekst: " og " },
      { type: "kursiv", barn: [{ type: "tekst", tekst: "kursiv" }] },
      { type: "tekst", tekst: "." },
    ]);
  });

  it("leser blokker", () => {
    const b = lesMarkdown("## Tittel\n\nEn\nlinje.\n\n- a\n- b\n\n1. c\n\n> sitat");
    expect(b.map((x) => x.type)).toEqual(["overskrift", "avsnitt", "liste", "liste", "sitat"]);
    expect(b[1]).toEqual({ type: "avsnitt", innhold: [{ type: "tekst", tekst: "En linje." }] });
  });

  it("leser arkivbilder og avisutklipp", () => {
    const b = lesMarkdown("Tekst.\n::bilde fly-snota | Flyet ved **Snota**\n\n::utklipp avis-1924\nMer tekst.");
    expect(b).toEqual([
      { type: "avsnitt", innhold: [{ type: "tekst", tekst: "Tekst." }] },
      {
        type: "bilde",
        id: "fly-snota",
        tekst: [
          { type: "tekst", tekst: "Flyet ved " },
          { type: "fet", barn: [{ type: "tekst", tekst: "Snota" }] },
        ],
      },
      { type: "utklipp", id: "avis-1924" },
      { type: "avsnitt", innhold: [{ type: "tekst", tekst: "Mer tekst." }] },
    ]);
  });

  it("krever tittel, beskrivelse og dato", () => {
    expect(() => lesArtikkel("x", "---\ntittel: T\n---\nTekst")).toThrow(/beskrivelse/);
    const a = lesArtikkel("x", "---\ntittel: T: med kolon\nbeskrivelse: B\ndato: 2026-10-27\nsokeord: a, b\n---\nTekst");
    expect(a.tittel).toBe("T: med kolon");
    expect(a.sokeord).toEqual(["a", "b"]);
    expect(a.oppdatert).toBe("2026-10-27");
  });

  it("alle publiserte artikler er gyldige og unike", () => {
    const alle = alleArtikler();
    expect(alle.length).toBeGreaterThan(0);
    expect(new Set(alle.map((a) => a.tittel)).size).toBe(alle.length);
    for (const a of alle) {
      expect(a.dato).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(a.sokeord.length).toBeGreaterThan(0);
      expect(a.blokker.some((b) => b.type === "overskrift" && b.niva === 2)).toBe(true);
      expect(relaterte(a, alle)).not.toContain(a);
    }
  });
});
