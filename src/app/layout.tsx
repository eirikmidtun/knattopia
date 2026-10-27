import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "KNATTOPIA – Sannheten om knattene (satire)",
  description:
    "En satirisk konspirasjonsside om at knatter inneholder littegrann opium. Helt oppdiktet. Inkluderer spillet Knattoperium.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb">
      <body>
        <div className="parodi-banner" role="note">
          ⚠️ SATIRE: Dette er en parodi på konspirasjonsnettsteder. Knatter inneholder <strong>ikke</strong> opium.
          Big Knatt Corp finnes ikke. Spis godteri med måte. ⚠️
        </div>
        <nav className="topnav">
          <Link href="/" className="logo">
            👁️ KNATTOPIA
          </Link>
          <div className="lenker">
            <Link href="/#bevis">Bevisene</Link>
            <Link href="/#tidslinje">Tidslinjen</Link>
            <Link href="/#dokumentet">Lekkasjen</Link>
            <Link href="/#tips">Tips oss</Link>
            <Link href="/knattoperium" className="spill-lenke">
              🍬 Spill KNATTOPERIUM
            </Link>
          </div>
        </nav>
        {children}
        <footer className="bunn">
          <p>
            Knattopia er <strong>satire og fiksjon</strong>. Alle «bevis», «dokumenter», «vitner» og selskaper er
            oppdiktet. Ingen ekte godterimerker, personer eller myndigheter er omtalt. Hvis du faktisk lurer på hva som
            er i godteriet ditt: les ingredienslisten, ikke denne nettsiden.
          </p>
          <p className="liten">© Knattopia. Denne siden er overvåket. (Nei, den er ikke det.)</p>
        </footer>
      </body>
    </html>
  );
}
