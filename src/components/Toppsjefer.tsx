"use client";

import { FormEvent, useEffect, useState } from "react";
import { formaterKroner } from "@/lib/game";
import type { Toppsjef } from "@/lib/store";

export function Toppsjefer({ totaltTjent, razziaer }: { totaltTjent: number; razziaer: number }) {
  const [liste, setListe] = useState<Toppsjef[]>([]);
  const [navn, setNavn] = useState("");
  const [melding, setMelding] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/toppsjefer")
      .then((r) => r.json())
      .then((d: { toppsjefer: Toppsjef[] }) => setListe(d.toppsjefer))
      .catch(() => setMelding("Topplisten er beslaglagt."));
  }, []);

  async function send(e: FormEvent) {
    e.preventDefault();
    try {
      const r = await fetch("/api/toppsjefer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ navn, totaltTjent, razziaer }),
      });
      const d = (await r.json()) as { toppsjefer?: Toppsjef[]; feil?: string };
      if (!r.ok || !d.toppsjefer) {
        setMelding(d.feil ?? "Noe gikk galt.");
        return;
      }
      setListe(d.toppsjefer);
      setMelding("Registrert i det hemmelige styreregisteret.");
    } catch {
      setMelding("Sendingen ble avbrutt.");
    }
  }

  return (
    <div>
      <form onSubmit={send} className="toppsjef-form">
        <input
          id="toppsjef-navn"
          aria-label="Toppsjef-alias"
          className="navn-input"
          value={navn}
          onChange={(e) => setNavn(e.target.value)}
          maxLength={30}
          placeholder="Ditt toppsjef-alias"
          required
        />
        <button className="knapp knapp-primar" type="submit" disabled={totaltTjent <= 0}>
          Send inn {formaterKroner(totaltTjent)}
        </button>
      </form>
      {melding && <p className="liten">{melding}</p>}
      {liste.length === 0 ? (
        <p className="liten">Ingen toppsjefer ennå. Bli den første.</p>
      ) : (
        <ol className="toppliste">
          {liste.map((t) => (
            <li key={t.navn}>
              <strong>{t.navn}</strong> – {formaterKroner(t.totaltTjent)}{" "}
              <span className="liten">({t.razziaer} razziaer)</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
