# Plan: Knattopia

> Satire. Knatter inneholder ikke opium. Alt her er parodi på konspirasjonsnettsteder.

## Mål

1. En norsk konspirasjonsnettside, «Knattopia», som «avslører» at knatter er tilsatt littegrann opium. Den skal se ut som en ekte konspirasjonsside: rød tråd, sensurerte dokumenter, CAPS LOCK, blinkende advarsler, falske diagrammer og «de vil ikke at du skal vite dette».
2. Spillet **Knattoperium**, et idle/tycoon-spill der du styrer Big Knatt Corp, deler ut knatter, skrur opp opiumsdosen, gjør folket rusa og uproduktivt, og tjener penger mens du holder mistanken nede.
3. Tydelig parodi: varselbanner øverst og i bunnen, ingen ekte merkevarer eller personer.

## Teknologi

- Next.js 15 (App Router) + React 19 + TypeScript (strict)
- Ren CSS (ingen eksterne fonter, så bygget fungerer offline)
- Vitest for enhetstester av spillmotoren
- Route handlers for backend-delen (minnelagring, nullstilles ved omstart)

## Struktur

| Fil | Innhold |
| --- | --- |
| `src/app/page.tsx` | Konspirasjonssiden: hero, «bevis», tidslinje, lekket dokument, tråd-tavle, «falske» grafer, FAQ, tipsboks |
| `src/app/knattoperium/page.tsx` | Spillsiden |
| `src/components/Knattoperium.tsx` | Spill-UI (klientkomponent), lagring i `localStorage` |
| `src/components/Tipsboks.tsx` | Skjema for «anonyme tips» mot `/api/tips` |
| `src/components/Toppsjefer.tsx` | Toppliste mot `/api/toppsjefer` |
| `src/lib/game.ts` | Ren spillmotor: tilstand, tick, kjøp, hendelser (testbar uten nettleser) |
| `src/lib/store.ts` | Minnelagring for tips og toppliste |
| `src/app/api/tips/route.ts` | `GET`/`POST` anonyme tips |
| `src/app/api/toppsjefer/route.ts` | `GET`/`POST` toppliste |

## Spillmekanikk (Knattoperium)

- **Kroner** tjenes ved at produserte knatter selges fortløpende.
- **Produsenter** (barnehagetante → kiosk → knattebil → fabrikk → Halloween-kampanje → statlig skolemelkavtale) gir knatter per sekund. Prisen stiger 15 % per kjøp.
- **Opiumsdose** (0–3 «dryss»): høyere dose gir mer **avhengighet** (høyere pris og salg), men også mer **mistanke**.
- **Folkets produktivitet** synker når avhengigheten stiger. Det er «målet» til Big Knatt Corp.
- **PR-avdelingen** (faktasjekkere, influencere, lobbyister) senker mistanken per sekund.
- **Oppgraderinger** gir engangs-multiplikatorer.
- Når mistanken når 100 kommer **RAZZIA**: du mister 40 % av pengene og dosen settes til 0.
- **Nyhetsticker** med tilfeldige hendelser som påvirker tallene.
- Milepæl: «Hele Norge sover» når produktiviteten er under 10 %.
- Lagres i `localStorage`, og poengsummen kan sendes til topplisten.
