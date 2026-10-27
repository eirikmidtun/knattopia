"use client";

import { useEffect, useState } from "react";

/** Helt oppdiktede tall som tikker oppover, akkurat som på en ekte konspirasjonsside. */
export function LiveTeller() {
  const [sekunder, setSekunder] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSekunder((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const spist = 4_812_337 + sekunder * 37;
  const timer = 1_204_118 + Math.floor(sekunder * 2.4);

  return (
    <div className="teller">
      <div className="boks">
        <div className="tall">{spist.toLocaleString("nb-NO")}</div>
        <div>knatter spist i dag*</div>
      </div>
      <div className="boks">
        <div className="tall">{timer.toLocaleString("nb-NO")}</div>
        <div>arbeidstimer tapt i sofaen*</div>
      </div>
      <p className="liten" style={{ width: "100%" }}>
        * Tallene er fullstendig oppdiktet. Det er poenget.
      </p>
    </div>
  );
}
