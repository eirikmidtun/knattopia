import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Artikkeltekst } from "@/components/Artikkeltekst";
import { JsonLd } from "@/components/JsonLd";
import { alleArtikler, finnArtikkel, formaterDato, lesetid, relaterte } from "@/lib/artikler";
import { SITE_NAVN, SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return alleArtikler().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = finnArtikkel((await params).slug);
  if (!a) return {};
  const url = `/artikler/${a.slug}`;
  return {
    title: a.tittel,
    description: a.beskrivelse,
    keywords: a.sokeord,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: a.tittel,
      description: a.beskrivelse,
      publishedTime: a.dato,
      modifiedTime: a.oppdatert,
      tags: a.sokeord,
    },
    twitter: { card: "summary", title: a.tittel, description: a.beskrivelse },
  };
}

export default async function ArtikkelSide({ params }: Props) {
  const a = finnArtikkel((await params).slug);
  if (!a) notFound();
  const alle = alleArtikler();
  const flere = relaterte(a, alle);
  const url = `${SITE_URL}/artikler/${a.slug}`;
  const innhold = a.blokker.filter((b) => b.type === "overskrift" && b.niva === 2);

  return (
    <main className="ramme artikkelside">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              headline: a.tittel,
              description: a.beskrivelse,
              keywords: a.sokeord.join(", "),
              datePublished: a.dato,
              dateModified: a.oppdatert,
              inLanguage: "nb-NO",
              genre: "Satire",
              wordCount: a.ord,
              url,
              mainEntityOfPage: url,
              author: { "@type": "Organization", name: `${SITE_NAVN}-redaksjonen`, url: SITE_URL },
              publisher: { "@type": "Organization", name: SITE_NAVN, url: SITE_URL },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAVN, item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Artikler", item: `${SITE_URL}/artikler` },
                { "@type": "ListItem", position: 3, name: a.tittel, item: url },
              ],
            },
          ],
        }}
      />
      <nav className="brodsmuler" aria-label="Brødsmuler">
        <Link href="/">Knattopia</Link>
        <span aria-hidden="true">/</span>
        <Link href="/artikler">Artikler</Link>
      </nav>
      <article className="artikkel">
        <header className="artikkel-hode">
          <p className="stikktittel">{a.sokeord[0] ?? "Knatter"}</p>
          <h1>{a.tittel}</h1>
          <p className="ingress">{a.ingress}</p>
          <p className="byline">
            <span>Av Knattopia-redaksjonen</span>
            <span>
              Publisert <time dateTime={a.dato}>{formaterDato(a.dato)}</time>
            </span>
            {a.oppdatert !== a.dato && (
              <span>
                Oppdatert <time dateTime={a.oppdatert}>{formaterDato(a.oppdatert)}</time>
              </span>
            )}
            <span>{lesetid(a)} min lesetid</span>
          </p>
        </header>
        {innhold.length > 2 && (
          <nav className="innhold" aria-label="Innhold">
            <p className="stikktittel">Innhold</p>
            <ol>
              {innhold.map((b) =>
                b.type === "overskrift" ? (
                  <li key={b.id}>
                    <a href={`#${b.id}`}>{b.tekst}</a>
                  </li>
                ) : null,
              )}
            </ol>
          </nav>
        )}
        <Artikkeltekst blokker={a.blokker} />
        <aside className="artikkel-satire" role="note">
          <span className="satire-merke">Satire</span>
          <p>
            Denne artikkelen er satire fra Knattopia. Knatter inneholder ikke opium, Big Knatt Corp finnes ikke, og
            påstander om skjulte ingredienser er oppdiktet. Les ingredienslisten på posen om du lurer på hva som er i
            godteriet ditt.
          </p>
        </aside>
      </article>
      {flere.length > 0 && (
        <section className="relaterte" aria-labelledby="relaterte-tittel">
          <h2 id="relaterte-tittel">Les også</h2>
          <ul>
            {flere.map((r) => (
              <li key={r.slug}>
                <Link href={`/artikler/${r.slug}`}>{r.tittel}</Link>
                <p>{r.beskrivelse}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className="spillbanner artikkel-spill">
        <div className="spillbanner-innhold">
          <div>
            <p className="stikktittel">Knattoperium</p>
            <h2>Styr Big Knatt Corp selv</h2>
            <p>Del ut knatter, hold mistanken nede og se kassen fylles i idle-spillet Knattoperium.</p>
          </div>
          <Link href="/knattoperium" className="knapp knapp-lys">
            Start spillet
          </Link>
        </div>
      </section>
    </main>
  );
}
