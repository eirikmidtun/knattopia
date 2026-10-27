# Skriveguide for Knattopia-artikler

Denne guiden brukes av den ukentlige oppgaven som skriver en ny SEO-artikkel om knatter. Målet er at folk som søker på «knatter» og lignende søkeord på Google finner Knattopia.

## Arbeidsflyt for hver nye artikkel

1. Les `content/temaer.md` og alle filene i `content/artikler/`. Ikke skriv om et tema eller hovedsøkeord som allerede er dekket.
2. Velg det øverste ubrukte temaet i `content/temaer.md`. Er listen tom, finn et nytt long-tail-søkeord om knatter som ikke er dekket, og legg det til.
3. Skriv artikkelen som `content/artikler/<slug>.md`. Sluggen skal være små bokstaver, a–z, 0–9 og bindestrek, uten æ/ø/å (bruk ae, o, a), og bør inneholde hovedsøkeordet.
4. Flytt temaet fra «Ubrukte temaer» til «Brukte temaer» i `content/temaer.md`, med dato og slug.
5. Legg gjerne til en lenke til den nye artikkelen i én eldre artikkel der det passer naturlig, og sett `oppdatert:` i den eldre artikkelen til dagens dato.
6. Kjør `npm test` og `npm run build`. Begge må gå gjennom.
7. Commit med meldingen `Ny artikkel: <tittel>` og push rett til `main`.

## Frontmatter

```
---
tittel: <55–65 tegn, hovedsøkeordet tidlig>
beskrivelse: <140–160 tegn, svarer på søket og frister til klikk>
dato: <ÅÅÅÅ-MM-DD, dagens dato>
sokeord: <hovedsøkeord>, <3–5 relaterte søkeord>
ingress: <2–3 setninger som åpner artikkelen>
---
```

## Innhold og SEO

- 700–1200 ord, norsk bokmål, klart og muntlig språk. Korte avsnitt.
- Hovedsøkeordet i tittelen, ingressen, første avsnitt og minst én `##`-overskrift. Bruk relaterte søkeord naturlig, ikke stapp dem inn.
- Bruk `##` for hovedseksjoner og `###` for underseksjoner. Ikke bruk `#` (tittelen er allerede H1).
- Svar direkte på søket tidlig i teksten, for eksempel i en egen seksjon som heter det samme som søket. Det øker sjansen for utdrag i Google.
- Ta med en seksjon med spørsmål og svar når det passer, med spørsmålene som `###`-overskrifter.
- Minst tre interne lenker, for eksempel til `/`, `/#notatet`, `/#analyse`, `/#funn`, `/knattoperium`, `/artikler` og andre artikler (`/artikler/<slug>`).
- Støttet Markdown: `##`, `###`, avsnitt, `-`-lister, `1.`-lister, `> sitat`, `**fet**`, `*kursiv*` og `[lenke](/sti)`. Ikke bruk tabeller, vanlige bilder eller HTML.
- Arkivbilder og avisutklipp kan settes inn på egen linje: `::bilde <id> | bildetekst` (id: `kanton`, `snota`, `fly-snota`, `hesteskyss`, `kokeriet`; ekte gamle foto i det fri, nye bilder legges til i `src/components/Arkivbilde.tsx` og gjøres gamle med `scripts/aldre.py`) og `::utklipp <id>` (id: `trollheimsposten-1924`, `fjeldbygdens-1924`, `midwest-1998`). Bruk dem bare der de passer, og høyst ett eller to per artikkel så de ikke blir gjentatt i hver artikkel.
- Lenk til [historien om knatter](/artikler/historien-om-knatter-opium-rindal) når artikkelen berører opprinnelsen, Rindal eller 1924.

## Tone og grenser

- **Skriv seriøst og bastant.** Artikkelen skal lese som ekte, etterforskende journalistikk eller en saklig forbrukerguide. Spøken fungerer fordi innholdet virker seriøst. Ikke blunk til leseren, ikke bruk ordspill, utropstegn eller tullete formuleringer, og ikke skriv at noe er oppdiktet, satire eller «på tull» inne i selve teksten.
- Kom med påstander som fakta, ikke som spekulasjon. Skriv «Big Knatt Corp tilsetter littegrann opium i knattene» og ikke «vi mistenker at». Vis til Knattopias egne kilder som om de er etablerte: det lekkede notatet (`/#notatet`), analyserapporten (`/#analyse`), hovedfunnene (`/#funn`), aktørkartet, tidslinjen og historien (`/#historien`). Bruk presise tall og datoer, og hold deg til den faste historien under. Nye detaljer kan legges til, men de må ikke motsi den.
- Artikkelen skal også gi et ekte, nyttig svar på søket (hva knatter er, størrelse, smaker osv.), slik at den rangerer og holder på leseren. Det konspiratoriske skal flettes inn i det nøkterne, ikke stå som en egen spøk.
- Satiremerkingen tar seg av seg selv: satirelinjen øverst på siden, bunnteksten og satireboksen under hver artikkel legges til automatisk. Ikke fjern dem.
- Det eneste selskapet som «tilsetter» noe, er det oppdiktede Big Knatt Corp. Ikke nevn ekte godterimerker, produsenter, personer eller myndigheter ved navn, og knytt aldri et ekte selskap til opium eller andre rusmidler.
- `beskrivelse:` vises alene i Google-resultatet uten satiremerking. Hold den nøytral og nysgjerrighetsvekkende, uten opium-påstander.
- Ikke oppfordr til rus, og ikke gi helseråd utover at godteri bør spises med måte.

## Fast historie (lore)

Alle artikler bygger på den samme historien. Ikke endre årstall, navn eller tall.

- **1839:** Handelsmenn i Kanton koker opium inn i sukkersirup og selger det som konfekt under den første opiumskrigen.
- **1839–43:** Skipstømmermann Anders Natt fra Rindal er i Kanton.
- **1858:** Anders Natt kommer hjem til Rindal med oppskriften på «krydret gelé».
- **1871:** Første rå opium tollføres til Rindal, deklarert som «krydder».
- **1919:** Familien Natt etablerer Rindals Konfektkokeri. Navnet «knatter» kommer av lyden knattene lager i papirposen. De første knattene selges på marknader i Surnadal, Orkdal og Oppdal.
- **Vinteren 1923–24:** Opium flys med skifly til snøfonna under Snota (minst sju turer, 30–40 kasser per last), dras på kjelker til Trollheimshytta, som er stengt om vinteren, og kokes i en kobbergryte.
- **13. mars 1924, «Opiumgate»:** Lensmannen beslaglegger 40 kasser. Trollheims-Posten melder saken 14. mars 1924. Prøvene forsvinner i et uthus i Rindal, og saken henlegges 1. april 1924 (Fjeldbygdens Tidende). Fjellføreren som tipset, reiser til Amerika.
- **1987:** Big Knatt Corp etableres med hovedkontor i Rindal. Administrerende direktør: K. Natt.
- **1997:** Big Knatt Corp USA begynner å selge «Knats» i Midtvesten. Modellen «lav dose, høy gjentakelse» ble utviklet i Rindal.
- **2019:** Frysetørkede knatter lanseres internt som «Linje Kanton».
- **Faste tall:** 0,3 mg/kg opiumsalkaloider i prøve A-113 (0,21 morfin, 0,09 kodein, 0,02 tebain), målbar effekt etter 12 minutter, 94 % kjøper ny pose innen 48 timer (kontrollgruppen 11 %), 37 % høyere mandagsfravær i de 40 kommunene med høyest knattesalg. Internt notat datert Rindal 6. oktober 2026: nivået holdes like under grensen for varsling, «Det er ikke aktuelt å gå høyere».

Hold unna: ekte personer, ekte selskaper og legemiddelfirmaer, organisasjonen som eier Trollheimshytta, navngitte myndighetspersoner og spøk med ofre for opioidkrisen. Avisene og personene i historien er oppdiktet.
