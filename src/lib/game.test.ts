import { describe, expect, it } from "vitest";
import {
  kjopOppgradering,
  kjopProdusent,
  klikk,
  knattPris,
  knatterPerSek,
  lastInn,
  nyttSpill,
  produktivitet,
  produsentPris,
  settDose,
  tick,
} from "./game";

const aldri = () => 0.99; // ingen tilfeldige hendelser

describe("Knattoperium", () => {
  it("klikk gir penger", () => {
    const s = klikk(nyttSpill());
    expect(s.kroner).toBeGreaterThan(0);
    expect(s.knatterSolgt).toBe(1);
  });

  it("kan ikke kjøpe uten penger", () => {
    const s = nyttSpill();
    expect(kjopProdusent(s, "tante")).toBe(s);
  });

  it("kjøp trekker penger og øker prisen", () => {
    const s = { ...nyttSpill(), kroner: 100 };
    const etter = kjopProdusent(s, "tante");
    expect(etter.produsenter.tante).toBe(1);
    expect(etter.kroner).toBe(100 - 15);
    expect(produsentPris(etter, "tante")).toBeGreaterThan(15);
  });

  it("produsenter selger knatter over tid", () => {
    const s = { ...nyttSpill(), produsenter: { ...nyttSpill().produsenter, kiosk: 2 } };
    expect(knatterPerSek(s)).toBe(6);
    const etter = tick(s, 10, aldri);
    expect(etter.knatterSolgt).toBeCloseTo(60);
    expect(etter.kroner).toBeGreaterThan(0);
  });

  it("dose 0 gir ingen mistanke, høy dose gir mistanke", () => {
    const ren = tick(settDose(nyttSpill(), 0), 10, aldri);
    const dopet = tick(settDose(nyttSpill(), 3), 10, aldri);
    expect(ren.mistanke).toBe(0);
    expect(dopet.mistanke).toBeGreaterThan(0);
  });

  it("avhengighet senker produktiviteten og øker prisen", () => {
    let s = settDose({ ...nyttSpill(), produsenter: { ...nyttSpill().produsenter, fabrikk: 5 } }, 2);
    const startPris = knattPris(s);
    for (let i = 0; i < 100; i++) s = tick({ ...s, mistanke: 0 }, 1, aldri);
    expect(produktivitet(s)).toBeLessThan(60);
    expect(knattPris(s)).toBeGreaterThan(startPris);
  });

  it("razzia ved full mistanke", () => {
    const s = { ...nyttSpill(), kroner: 1000, mistanke: 99.9, dose: 3 };
    const etter = tick(s, 1, aldri);
    expect(etter.razziaer).toBe(1);
    expect(etter.kroner).toBeCloseTo(600, 0);
    expect(etter.dose).toBe(0);
  });

  it("varianter øker prisen", () => {
    const s = { ...nyttSpill(), kroner: 1000 };
    const med = kjopOppgradering(s, "frukt");
    expect(med.oppgraderinger).toContain("frukt");
    expect(knattPris(med)).toBeCloseTo(knattPris(s) * 1.25);
  });

  it("lastInn tåler søppel og gamle lagringer", () => {
    expect(lastInn(null)).toEqual(nyttSpill());
    const s = lastInn({ kroner: 50, oppgraderinger: ["frukt", "tull"], produsenter: { tante: 2 } });
    expect(s.kroner).toBe(50);
    expect(s.oppgraderinger).toEqual(["frukt"]);
    expect(s.produsenter.tante).toBe(2);
    expect(s.produsenter.kiosk).toBe(0);
  });
});
