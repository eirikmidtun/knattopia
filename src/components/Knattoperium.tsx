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
const HISTORIKK = 60;
const DOSER = [
  { navn: "Ingen", tekst: "Rene knatter. Trygt og kjedelig." },
  { navn: "Lav", tekst: "Et lite dryss. Folk blir litt rolige." },
  { navn: "Middels", tekst: "Et godt dryss. Kundene kommer tilbake." },
  { navn: "Høy", tekst: "Bøttevis. Mistanken stiger raskt." },
];

interface Popp {
  id: number;
  x: number;
  y: number;
  tekst: string;
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
    // Privat modus eller full lagring: spillet fungerer, det lagres bare ikke.
  }
}

function Maler({
  navn,
  verdi,
  tone,
  tekst,
  hjelp,
}: {
  navn: string;
  verdi: number;
  tone: "noytral" | "god" | "advarsel" | "kritisk";
  tekst: string;
  hjelp: string;
}) {
  return (
    <div className="maler">
      <div className="maler-topp">
        <span className="maler-navn">{navn}</span>
        <span className="maler-verdi">{tekst}</span>
      </div>
      <div className="maler-bar" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(verdi)} aria-label={navn}>
        <div className={`maler-fyll tone-${tone}`} style={{ width: `${Math.max(0, Math.min(100, verdi))}%` }} />
      </div>
      <p className="maler-hjelp">{hjelp}</p>
    </div>
  );
}

function Sparkline({ verdier }: { verdier: number[] }) {
  if (verdier.length < 3) return <svg className="sparkline" viewBox="0 0 120 32" aria-hidden="true" />;
  const maks = Math.max(...verdier, 0.0001);
  const pkt = verdier.map((v, i) => [(i / (HISTORIKK - 1)) * 120, 30 - (v / maks) * 26] as const);
  const forskyv = 120 - pkt[pkt.length - 1][0];
  const linje = pkt.map(([x, y], i) => `${i ? "L" : "M"}${(x + forskyv).toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const [sx, sy] = pkt[pkt.length - 1];
  return (
    <svg className="sparkline" viewBox="0 0 120 32" aria-hidden="true">
      <path d={`${linje} L120 32 L${(pkt[0][0] + forskyv).toFixed(1)} 32 Z`} className="sparkline-flate" />
      <path d={linje} className="sparkline-linje" />
      <circle cx={sx + forskyv} cy={sy} r="2.5" className="sparkline-punkt" />
    </svg>
  );
}

function tidsstempel(sek: number) {
  const m = Math.floor(sek / 60);
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}:${String(Math.floor(sek % 60)).padStart(2, "0")}`;
}

export function Knattoperium() {
  const [s, setS] = useState<Spilltilstand>(nyttSpill);
  const [lastet, setLastet] = useState(false);
  const [popper, setPopper] = useState<Popp[]>([]);
  const [historikk, setHistorikk] = useState<number[]>([]);
  const [bekreftNullstill, setBekreftNullstill] = useState(false);
  const sisteTid = useRef<number | null>(null);
  const tilstandRef = useRef(s);
  tilstandRef.current = s;
  const poppId = useRef(0);
  const klikkInntekt = useRef(0);

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
    const maling = setInterval(() => {
      const g = tilstandRef.current;
      const inntekt = knatterPerSek(g) * knattPris(g) + klikkInntekt.current;
      klikkInntekt.current = 0;
      setHistorikk((h) => [...h, inntekt].slice(-HISTORIKK));
    }, 1000);
    const lagre = setInterval(() => skrivLagring(tilstandRef.current), 3000);
    const vedLukking = () => skrivLagring(tilstandRef.current);
    window.addEventListener("beforeunload", vedLukking);
    return () => {
      clearInterval(id);
      clearInterval(maling);
      clearInterval(lagre);
      window.removeEventListener("beforeunload", vedLukking);
      skrivLagring(tilstandRef.current);
    };
  }, [lastet]);

  const delUt = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX ? e.clientX - rect.left : rect.width / 2;
    const y = e.clientY ? e.clientY - rect.top : rect.height / 2;
    const g = tilstandRef.current;
    const inntekt = knatterPerKlikk(g) * knattPris(g);
    klikkInntekt.current += inntekt;
    const id = ++poppId.current;
    setPopper((p) => [...p.slice(-10), { id, x, y, tekst: `+${formaterKroner(inntekt)}` }]);
    setTimeout(() => setPopper((p) => p.filter((q) => q.id !== id)), 900);
    setS(klikk);
  }, []);

  const nullstill = () => {
    const ny = nyttSpill();
    setS(ny);
    setHistorikk([]);
    skrivLagring(ny);
    setBekreftNullstill(false);
  };

  const kps = knatterPerSek(s);
  const prisPerKnatt = knattPris(s);
  const inntektPerSek = kps * prisPerKnatt;
  const prod = produktivitet(s);
  const netto = mistankeVekst(s) - mistankeReduksjon(s);
  const aktivVariant = [...VARIANTER].reverse().find((v) => v.id === "skogsbaer" || harOppgradering(s, v.id))!;
  const mistankeTone = s.mistanke > 75 ? "kritisk" : s.mistanke > 45 ? "advarsel" : "noytral";

  return (
    <div className="portal">
      <header className="portal-hode">
        <div className="portal-tittel">
          <p className="stikktittel">Big Knatt Corp · Styreportal</p>
          <h1>Knattoperium</h1>
          <p className="portal-ingress">
            Du er administrerende direktør i et oppdiktet godteriselskap. Selg knatter, juster dosen og hold mistanken
            under kontroll.
          </p>
        </div>
        <div className="portal-klokke">
          <span>Driftstid</span>
          <strong>{tidsstempel(s.tid)}</strong>
        </div>
      </header>

      <section className="kpi-rad" aria-label="Nøkkeltall">
        <div className="kpi">
          <span className="kpi-navn">Kontantbeholdning</span>
          <strong className="kpi-verdi">{formaterKroner(s.kroner)}</strong>
          <span className="kpi-under">Totalt tjent {formaterKroner(s.totaltTjent)}</span>
        </div>
        <div className="kpi kpi-graf">
          <div>
            <span className="kpi-navn">Inntekt per sekund</span>
            <strong className="kpi-verdi">{formaterKroner(inntektPerSek)}</strong>
            <span className="kpi-under">Siste 60 sekunder</span>
          </div>
          <Sparkline verdier={historikk} />
        </div>
        <div className="kpi">
          <span className="kpi-navn">Produksjon</span>
          <strong className="kpi-verdi">
            {formaterTall(kps)} <small>knatter/s</small>
          </strong>
          <span className="kpi-under">{formaterTall(s.knatterSolgt)} solgt totalt</span>
        </div>
        <div className="kpi">
          <span className="kpi-navn">Pris per knatt</span>
          <strong className="kpi-verdi">{prisPerKnatt.toFixed(2).replace(".", ",")} kr</strong>
          <span className="kpi-under">Smak: {aktivVariant.navn}</span>
        </div>
      </section>

      {s.mistanke > 75 && (
        <div className="varsel varsel-kritisk" role="alert">
          <strong>Mattilsynet er på vei.</strong> Mistanken er over 75 %. Senk dosen eller styrk PR-avdelingen før det
          blir razzia.
        </div>
      )}
      {s.helenorgesover && (
        <div className="varsel varsel-info">
          <strong>Hele Norge sover.</strong> Produktiviteten har vært under 10 %. Styret er fornøyd. Du kan fortsette å
          spille.
        </div>
      )}

      <div className="portal-grid">
        <div className="portal-kolonne">
          <section className="kort utdeling">
            <h2 className="kort-tittel">Utdeling</h2>
            <button className="knatt-knapp" onClick={delUt} aria-label={`Del ut ${knatterPerKlikk(s)} knatter`}>
              <Knatt farge={aktivVariant.farger[0]} storrelse={132} className="hoved-knatt" />
              {popper.map((p) => (
                <span key={p.id} className="popp" style={{ left: p.x, top: p.y }}>
                  {p.tekst}
                </span>
              ))}
            </button>
            <p className="utdeling-tekst">
              Klikk for å dele ut {knatterPerKlikk(s)} {knatterPerKlikk(s) === 1 ? "knatt" : "knatter"}
            </p>
          </section>

          <section className="kort">
            <h2 className="kort-tittel">Dosering</h2>
            <div className="dosevalg" role="radiogroup" aria-label="Opiumsdose">
              {DOSER.map((d, i) => (
                <button
                  key={d.navn}
                  role="radio"
                  aria-checked={s.dose === i}
                  className={`dose-knapp${s.dose === i ? " valgt" : ""}`}
                  onClick={() => setS((g) => settDose(g, i))}
                  disabled={i > MAKS_DOSE}
                >
                  {d.navn}
                </button>
              ))}
            </div>
            <p className="dose-tekst">{DOSER[s.dose].tekst}</p>
            <p className="fiksjon">Opiumsdosen er ren fiksjon i et satirisk spill.</p>
          </section>

          <section className="kort">
            <h2 className="kort-tittel">Folkehelse</h2>
            <Maler
              navn="Avhengighet"
              verdi={s.avhengighet}
              tone="noytral"
              tekst={`${s.avhengighet.toFixed(0)} %`}
              hjelp="Høyere avhengighet gir høyere pris per knatt."
            />
            <Maler
              navn="Produktivitet i befolkningen"
              verdi={prod}
              tone={prod < 30 ? "advarsel" : "god"}
              tekst={`${prod.toFixed(0)} %`}
              hjelp="Styret vil se denne under 10 %."
            />
            <Maler
              navn="Mistanke"
              verdi={s.mistanke}
              tone={mistankeTone}
              tekst={`${s.mistanke.toFixed(0)} %  ${netto >= 0 ? "+" : "−"}${Math.abs(netto).toFixed(2)}/s`}
              hjelp={`Ved 100 % blir det razzia. Razziaer så langt: ${s.razziaer}.`}
            />
          </section>
        </div>

        <section className="kort portal-kolonne-bred">
          <h2 className="kort-tittel">Distribusjon</h2>
          <ul className="kjopsliste">
            {PRODUSENTER.map((p) => {
              const kost = produsentPris(s, p.id);
              return (
                <li key={p.id} className="kjopsrad">
                  <span className="antall" aria-label={`${s.produsenter[p.id]} eid`}>
                    {s.produsenter[p.id]}
                  </span>
                  <div className="kjop-info">
                    <strong>{p.navn}</strong>
                    <span>{p.beskrivelse}</span>
                    <span className="kjop-effekt">+{p.knatterPerSek.toLocaleString("nb-NO")} knatter/s hver</span>
                  </div>
                  <button className="kjop-knapp" onClick={() => setS((g) => kjopProdusent(g, p.id))} disabled={s.kroner < kost}>
                    {formaterKroner(kost)}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="portal-kolonne">
          <section className="kort">
            <h2 className="kort-tittel">PR og påvirkning</h2>
            <ul className="kjopsliste">
              {PR_TILTAK.map((p) => {
                const kost = prPris(s, p.id);
                return (
                  <li key={p.id} className="kjopsrad">
                    <span className="antall">{s.pr[p.id]}</span>
                    <div className="kjop-info">
                      <strong>{p.navn}</strong>
                      <span>{p.beskrivelse}</span>
                      <span className="kjop-effekt">−{p.mistankeReduksjon.toLocaleString("nb-NO")} mistanke/s hver</span>
                    </div>
                    <button className="kjop-knapp" onClick={() => setS((g) => kjopPr(g, p.id))} disabled={s.kroner < kost}>
                      {formaterKroner(kost)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="kort">
            <h2 className="kort-tittel">Produktutvikling</h2>
            <ul className="kjopsliste">
              {OPPGRADERINGER.map((o) => {
                const har = harOppgradering(s, o.id);
                const variant = VARIANTER.find((v) => v.id === o.id);
                return (
                  <li key={o.id} className={`kjopsrad${har ? " kjopt" : ""}`}>
                    <span className="antall antall-ikon">
                      {variant ? <Knatt farge={variant.farger[0]} storrelse={22} /> : <span className="fou" aria-hidden="true" />}
                    </span>
                    <div className="kjop-info">
                      <strong>{o.navn}</strong>
                      <span>{o.beskrivelse}</span>
                    </div>
                    <button
                      className="kjop-knapp"
                      onClick={() => setS((g) => kjopOppgradering(g, o.id))}
                      disabled={har || s.kroner < o.pris}
                    >
                      {har ? "Innført" : formaterKroner(o.pris)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>

      <div className="portal-bunn">
        <section className="kort">
          <h2 className="kort-tittel">Nyhetsbyrå</h2>
          <ul className="nyheter">
            {s.nyheter.map((n, i) => (
              <li key={`${n.tid}-${i}`}>
                <time>{tidsstempel(n.tid)}</time>
                <p>{n.tekst}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="kort">
          <h2 className="kort-tittel">Toppsjefer</h2>
          <Toppsjefer totaltTjent={s.totaltTjent} razziaer={s.razziaer} />
          <div className="nullstill-rad">
            {bekreftNullstill ? (
              <>
                <span>Alt slettes. Sikker?</span>
                <button className="tekstknapp fare" onClick={nullstill}>
                  Ja, start på nytt
                </button>
                <button className="tekstknapp" onClick={() => setBekreftNullstill(false)}>
                  Avbryt
                </button>
              </>
            ) : (
              <button className="tekstknapp" onClick={() => setBekreftNullstill(true)}>
                Start selskapet på nytt
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
