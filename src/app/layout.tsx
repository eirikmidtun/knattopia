import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Knattopia",
  description:
    "Satirisk «granskning» av påstanden om at knatter er tilsatt littegrann opium. Helt oppdiktet. Med spillet Knattoperium.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=IBM+Plex+Mono:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400..700;1,8..60,400..600&display=swap"
        />
      </head>
      <body>
        <div className="satirelinje" role="note">
          <div className="ramme">
            <span className="satire-merke">Satire</span>
            Knattopia er en parodi på konspirasjonsnettsteder. Knatter inneholder ikke opium, og Big Knatt Corp finnes
            ikke.
          </div>
        </div>
        <header className="masthode">
          <div className="ramme masthode-innhold">
            <Link href="/" className="ordmerke" aria-label="Knattopia, til forsiden">
              <span className="ordmerke-prikk" aria-hidden="true" />
              Knattopia
            </Link>
            <nav className="hovednav" aria-label="Hovedmeny">
              <Link href="/#funn">Funn</Link>
              <Link href="/#analyse">Analysen</Link>
              <Link href="/#tidslinje">Tidslinje</Link>
              <Link href="/#notatet">Notatet</Link>
              <Link href="/#varsle">Varsle oss</Link>
              <Link href="/knattoperium" className="nav-spill">
                Knattoperium
              </Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="bunn">
          <div className="ramme bunn-innhold">
            <div className="ordmerke liten-ordmerke">
              <span className="ordmerke-prikk" aria-hidden="true" />
              Knattopia
            </div>
            <p>
              Knattopia er satire og fiksjon. Alle funn, analyser, dokumenter, vitner, tall og selskaper på denne siden
              er oppdiktet. Ingen ekte godterimerker, produsenter, personer eller myndigheter er omtalt. Vil du vite hva
              som er i godteriet ditt, les ingredienslisten på posen.
            </p>
            <p className="bunn-meta">Ingen analyse er utført. Ingen kilder er beskyttet. Spis godteri med måte.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
