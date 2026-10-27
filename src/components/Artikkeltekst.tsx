import Link from "next/link";
import type { Blokk, Inline } from "@/lib/artikler";

function Tekst({ deler }: { deler: Inline[] }) {
  return (
    <>
      {deler.map((d, i) => {
        switch (d.type) {
          case "tekst":
            return d.tekst;
          case "fet":
            return (
              <strong key={i}>
                <Tekst deler={d.barn} />
              </strong>
            );
          case "kursiv":
            return (
              <em key={i}>
                <Tekst deler={d.barn} />
              </em>
            );
          case "lenke":
            return d.href.startsWith("/") || d.href.startsWith("#") ? (
              <Link key={i} href={d.href}>
                <Tekst deler={d.barn} />
              </Link>
            ) : (
              <a key={i} href={d.href} rel="noopener noreferrer" target="_blank">
                <Tekst deler={d.barn} />
              </a>
            );
        }
      })}
    </>
  );
}

export function Artikkeltekst({ blokker }: { blokker: Blokk[] }) {
  return (
    <div className="artikkeltekst">
      {blokker.map((b, i) => {
        switch (b.type) {
          case "overskrift":
            return b.niva === 2 ? (
              <h2 key={i} id={b.id}>
                {b.tekst}
              </h2>
            ) : (
              <h3 key={i} id={b.id}>
                {b.tekst}
              </h3>
            );
          case "avsnitt":
            return (
              <p key={i}>
                <Tekst deler={b.innhold} />
              </p>
            );
          case "sitat":
            return (
              <blockquote key={i}>
                <p>
                  <Tekst deler={b.innhold} />
                </p>
              </blockquote>
            );
          case "liste": {
            const punkter = b.punkter.map((p, j) => (
              <li key={j}>
                <Tekst deler={p} />
              </li>
            ));
            return b.nummerert ? <ol key={i}>{punkter}</ol> : <ul key={i}>{punkter}</ul>;
          }
        }
      })}
    </div>
  );
}
