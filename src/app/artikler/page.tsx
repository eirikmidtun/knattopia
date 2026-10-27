import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { alleArtikler, formaterDato, lesetid } from "@/lib/artikler";
import { SITE_NAVN, SITE_URL } from "@/lib/site";

const BESKRIVELSE =
  "Alt om knatter: hva de er, hvor store de er, hvorfor knatter er så godt og hva som egentlig skjuler seg i posen. Satiriske artikler fra Knattopia.";

export const metadata: Metadata = {
  title: "Artikler om knatter",
  description: BESKRIVELSE,
  alternates: { canonical: "/artikler" },
  openGraph: { type: "website", url: "/artikler", title: "Artikler om knatter", description: BESKRIVELSE },
};

export default function Artikler() {
  const artikler = alleArtikler();
  return (
    <main className="ramme artikkelside">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Artikler om knatter",
          description: BESKRIVELSE,
          url: `${SITE_URL}/artikler`,
          inLanguage: "nb-NO",
          isPartOf: { "@type": "WebSite", name: SITE_NAVN, url: SITE_URL },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: artikler.map((a, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}/artikler/${a.slug}`,
              name: a.tittel,
            })),
          },
        }}
      />
      <header className="artikkel-hode">
        <p className="stikktittel">Arkivet</p>
        <h1>Artikler om knatter</h1>
        <p className="ingress">
          Knattopia-redaksjonen graver i alt du lurer på om knatter. Hvor store de er, hvorfor de smaker som de gjør,
          og hvorfor ingen klarer å spise bare én. Alt er satire.
        </p>
      </header>
      <ol className="artikkelliste">
        {artikler.map((a) => (
          <li key={a.slug}>
            <article>
              <p className="artikkel-meta">
                <time dateTime={a.dato}>{formaterDato(a.dato)}</time>
                <span>{lesetid(a)} min lesetid</span>
              </p>
              <h2>
                <Link href={`/artikler/${a.slug}`}>{a.tittel}</Link>
              </h2>
              <p>{a.beskrivelse}</p>
            </article>
          </li>
        ))}
      </ol>
    </main>
  );
}
