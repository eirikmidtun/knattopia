"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  MAKS_DOSE,
  OPPGRADERINGER,
  PRODUSENTER,
  PR_TILTAK,
  VARIANTER,
  formaterKroner,
  formaterTall,
  harOppgradering,
  kjopOppgradering,
  kjopPr,
  kjopProdusent,
  klikk,
  knattPris,
  knatterPerKlikk,
  knatterPerSek,
  lastInn,
  mistankeReduksjon,
  mistankeVekst,
  nyttSpill,
  prPris,
  produktivitet,
  produsentPris,
  settDose,
  tick,
  type Spilltilstand,
} from "@/lib/game";
import { Knatt } from "./Knatt";
import { Toppsjefer } from "./Toppsjefer";

const LAGRINGSNOKKEL = "knattoperium-v1";
const DOSENAVN = ["Helt rene (kjedelig)", "Et lite dryss", "Et godt dryss", "Bøttevis (uforsvarlig)"];

interface Popp {
  id: number;
  x: number;
  y: number;
  tekst: string;
  farge: string;
}

function lesLagring(): Spilltilstand | null {
  try {
    const raw = localStorage.getItem(LAGRINGSNOKKEL);
    return raw ? lastInn(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

function skrivLagring(s: Spilltilstand) {
  try {
    localStorage.setItem(LAGRINGSNOKKEL, JSON.stringify(s));
  } catch {
    // Privat modus eller full lagring: spillet fungerer fortsatt, det lagres bare ikke.
  }
}

function Maler({ navn, verdi, farge, tekst }: { navn: string; verdi: number; farge: string; tekst: string }) {
  return (
    <div className="maler">
      <div className="maler-topp">
        <span>{navn}</span>
        <span>{tekst}</span>
      </div>
      <div className="maler-bar">
        <div style={{ width: `${Math.max(0, Math.min(100, verdi))}%`, background: farge }} />
      </div>
    </div>
  );
}

export function Knattoperium() {
  const [s, setS] = useState<Spilltilstand>(nyttSpill);
  const [lastet, setLastet] = useState(false);
  const [popper, setPopper] = useState<Popp[]>([]);
  const sisteTid = useRef<number | null>(null);
  const tilstandRef = useRef(s);
  tilstandRef.current = s;
  const poppId = useRef(0);

  useEffect(() => {
    const lagret = lesLagring();
    if (lagret) setS(lagret);
    setLastet(true);
  }, []);

  useEffect(() => {
    if (!lastet) return;
    const id = setInterval(() => {
      const naa = performance.now();
      const dt = sisteTid.current === null ? 0.1 : Math.min(5, (naa - sisteTid.current) / 1000);
      sisteTid.current = naa;
      setS((gammel) => tick(gammel, dt));
    }, 100);
    const lagre = setInterval(() => skrivLagring(tilstandRef.current), 3000);
    const vedLukking = () => skrivLagring(tilstandRef.current);
    window.addEventListener("beforeunload", vedLukking);
    return () => {
      clearInterval(id);
      clearInterval(lagre);
      window.removeEventListener("beforeunload", vedLukking);
      skrivLagring(tilstandRef.current);
    };
  }, [lastet]);

  const delUt = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX ? e.clientX - rect.left : rect.width / 2;
    const y = e.clientY ? e.clientY - rect.top : rect.height / 2;
    const gjeldende = tilstandRef.current;
    const inntekt = knatterPerKlikk(gjeldende) * knattPris(gjeldende);
    const farger = VARIANTER.filter((v) => v.id === "skogsbaer" || harOppgradering(gjeldende, v.id)).flatMap((v) => v.farger);
    const id = ++poppId.current;
    setPopper((p) => [
      ...p.slice(-12),
      { id, x, y, tekst: `+${formaterKroner(inntekt)}`, farge: farger[id % farger.length] },
    ]);
    setTimeout(() => setPopper((p) => p.filter((q) => q.id !== id)), 900);
    setS(klikk);
  }, []);

  const nullstill = () => {
    if (!confirm("Makulere alle dokumenter og starte Big Knatt Corp på nytt?")) return;
    const ny = nyttSpill();
    setS(ny);
    skrivLagring(ny);
  };

  const kps = knatterPerSek(s);
  const prisPerKnatt = knattPris(s);
  const prod = produktivitet(s);
  const netto = mistankeVekst(s) - mistankeReduksjon(s);
  const aktivVariant = [...VARIANTER].reverse().find((v) => v.id === "skogsbaer" || harOppgradering(s, v.id))!;

  return (
    <div className="spill">
      <header className="spill-topp">
        <div>
          <h1>🍬 KNATTOPERIUM</h1>
          <p className="liten">Du er toppsjef i Big Knatt Corp (oppdiktet). Mål: penger. Bieffekt: et litt for avslappet folk.</p>
        </div>
        <div className="statistikk">
          <div>
            <div className="etikett">Kassa</div>
            <div className="stor">{formaterKroner(s.kroner)}</div>
          </div>
          <div>
            <div className="etikett">Inntekt</div>
            <div>{formaterKroner(kps * prisPerKnatt)}/s</div>
          </div>
          <div>
            <div className="etikett">Knatter/s</div>
            <div>{formaterTall(kps)}</div>
          </div>
          <div>
            <div className="etikett">Pris per knatt</div>
            <div>{prisPerKnatt.toFixed(2).replace(".", ",")} kr</div>
          </div>
        </div>
      </header>

      {s.helenorgesover && (
        <div className="seier">💤 HELE NORGE SOVER. Du har vunnet. Eller tapt. Det kommer an på hvem du spør. Du kan spille videre.</div>
      )}

      <div className="spill-grid">
        <div className="kolonne">
          <div className="panel sentrum">
            <button className="knatt-knapp" onClick={delUt} aria-label="Del ut knatter">
              <Knatt farge={aktivVariant.farger[0]} storrelse={150} className="hoved-knatt" />
              {popper.map((p) => (
                <span key={p.id} className="popp" style={{ left: p.x, top: p.y, color: p.farge }}>
                  {p.tekst}
                </span>
              ))}
            </button>
            <p>
              <strong>Klikk for å dele ut knatter</strong>
              <br />
              <span className="liten">
                {knatterPerKlikk(s)} per klikk · smak: {aktivVariant.navn}
              </span>
            </p>
          </div>

          <div className="panel">
            <h3>🧪 Opiumsdose (ren fiksjon)</h3>
            <input
              type="range"
              min={0}
              max={MAKS_DOSE}
              step={1}
              value={s.dose}
              onChange={(e) => setS((g) => settDose(g, Number(e.target.value)))}
              aria-label="Dose"
              className="dose"
            />
            <p className={`dose-tekst dose-${s.dose}`}>{DOSENAVN[s.dose]}</p>
            <p className="liten">Høyere dose gir mer avhengige kunder og høyere pris, men mistanken vokser raskt.</p>
          </div>

          <div className="panel">
            <Maler navn="Folkets avhengighet" verdi={s.avhengighet} farge="#c2185b" tekst={`${s.avhengighet.toFixed(0)} %`} />
            <Maler
              navn="Folkets produktivitet"
              verdi={prod}
              farge={prod < 30 ? "#7a3b1c" : "#39ff14"}
              tekst={`${prod.toFixed(0)} %`}
            />
            <Maler
              navn="Mistanke"
              verdi={s.mistanke}
              farge={s.mistanke > 75 ? "#ff2a2a" : s.mistanke > 40 ? "#ffe600" : "#8fa585"}
              tekst={`${s.mistanke.toFixed(0)} % (${netto >= 0 ? "+" : ""}${netto.toFixed(2)}/s)`}
            />
            {s.mistanke > 75 && <p className="feil blink">⚠️ Mattilsynet snuser rundt! Senk dosen eller kjøp PR.</p>}
            <p className="liten">
              Razziaer: {s.razziaer} · Knatter solgt: {formaterTall(s.knatterSolgt)} · Totalt tjent:{" "}
              {formaterKroner(s.totaltTjent)}
            </p>
          </div>
        </div>

        <div className="kolonne">
          <div className="panel">
            <h3>🏭 Distribusjon</h3>
            {PRODUSENTER.map((p) => {
              const kost = produsentPris(s, p.id);
              return (
                <button key={p.id} className="kjop" onClick={() => setS((g) => kjopProdusent(g, p.id))} disabled={s.kroner < kost}>
                  <span className="kjop-emoji">{p.emoji}</span>
                  <span className="kjop-info">
                    <strong>{p.navn}</strong>
                    <span className="liten">{p.beskrivelse}</span>
                    <span className="liten">+{p.knatterPerSek} knatter/s</span>
                  </span>
                  <span className="kjop-pris">
                    {formaterKroner(kost)}
                    <span className="antall">×{s.produsenter[p.id]}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="kolonne">
          <div className="panel">
            <h3>📣 PR-avdelingen</h3>
            {PR_TILTAK.map((p) => {
              const kost = prPris(s, p.id);
              return (
                <button key={p.id} className="kjop" onClick={() => setS((g) => kjopPr(g, p.id))} disabled={s.kroner < kost}>
                  <span className="kjop-emoji">{p.emoji}</span>
                  <span className="kjop-info">
                    <strong>{p.navn}</strong>
                    <span className="liten">{p.beskrivelse}</span>
                    <span className="liten">−{p.mistankeReduksjon} mistanke/s</span>
                  </span>
                  <span className="kjop-pris">
                    {formaterKroner(kost)}
                    <span className="antall">×{s.pr[p.id]}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="panel">
            <h3>🔬 Forskning og utvikling</h3>
            {OPPGRADERINGER.map((o) => {
              const har = harOppgradering(s, o.id);
              const variant = VARIANTER.find((v) => v.id === o.id);
              return (
                <button
                  key={o.id}
                  className={`kjop${har ? " kjopt" : ""}`}
                  onClick={() => setS((g) => kjopOppgradering(g, o.id))}
                  disabled={har || s.kroner < o.pris}
                >
                  <span className="kjop-emoji">
                    {variant ? <Knatt farge={variant.farger[0]} storrelse={30} /> : "🧬"}
                  </span>
                  <span className="kjop-info">
                    <strong>{o.navn}</strong>
                    <span className="liten">{o.beskrivelse}</span>
                  </span>
                  <span className="kjop-pris">{har ? "✔ Kjøpt" : formaterKroner(o.pris)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="spill-grid to">
        <div className="panel">
          <h3>📰 Nyheter</h3>
          <ul className="nyheter">
            {s.nyheter.map((n, i) => (
              <li key={`${n.tid}-${i}`}>
                <span className="liten">[{Math.floor(n.tid / 60)}:{String(Math.floor(n.tid % 60)).padStart(2, "0")}]</span>{" "}
                {n.tekst}
              </li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h3>🏆 Toppsjefer</h3>
          <Toppsjefer totaltTjent={s.totaltTjent} razziaer={s.razziaer} />
          <button className="nullstill" onClick={nullstill}>
            Makuler alt og start på nytt
          </button>
        </div>
      </div>
    </div>
  );
}
