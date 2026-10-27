"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Tips } from "@/lib/store";

export function Tipsboks() {
  const [tips, setTips] = useState<Tips[]>([]);
  const [kodenavn, setKodenavn] = useState("");
  const [tekst, setTekst] = useState("");
  const [feil, setFeil] = useState<string | null>(null);
  const [sender, setSender] = useState(false);

  useEffect(() => {
    fetch("/api/tips")
      .then((r) => r.json())
      .then((d: { tips: Tips[] }) => setTips(d.tips))
      .catch(() => setFeil("Klarte ikke hente tips. DE har kuttet linjen."));
  }, []);

  async function send(e: FormEvent) {
    e.preventDefault();
    setSender(true);
    setFeil(null);
    try {
      const r = await fetch("/api/tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kodenavn, tekst }),
      });
      const d = (await r.json()) as { tips?: Tips; feil?: string };
      if (!r.ok || !d.tips) {
        setFeil(d.feil ?? "Noe gikk galt. Mistenkelig.");
        return;
      }
      setTips((t) => [d.tips!, ...t]);
      setTekst("");
    } catch {
      setFeil("Sendingen ble avbrutt. Mistenkelig.");
    } finally {
      setSender(false);
    }
  }

  return (
    <div>
      <form className="tips-form" onSubmit={send}>
        <label>
          Kodenavn (valgfritt)
          <input value={kodenavn} onChange={(e) => setKodenavn(e.target.value)} maxLength={40} placeholder="Agent Lakris" />
        </label>
        <label>
          Hva har du sett?
          <textarea
            value={tekst}
            onChange={(e) => setTekst(e.target.value)}
            maxLength={280}
            rows={3}
            required
            placeholder="Svogeren min spiste en hel pose og sovnet midt i quizen…"
          />
        </label>
        {feil && <p className="feil">{feil}</p>}
        <button className="knapp" type="submit" disabled={sender}>
          {sender ? "Krypterer…" : "Send til motstandsbevegelsen"}
        </button>
      </form>
      <ul className="tips-liste">
        {tips.map((t) => (
          <li key={t.id}>
            <div className="hvem">
              🕵️ {t.kodenavn} · {new Date(t.tid).toLocaleDateString("nb-NO")}
            </div>
            <div>{t.tekst}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
