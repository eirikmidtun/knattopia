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
- Støttet Markdown: `##`, `###`, avsnitt, `-`-lister, `1.`-lister, `> sitat`, `**fet**`, `*kursiv*` og `[lenke](/sti)`. Ikke bruk tabeller, bilder eller HTML.

## Tone og grenser

- **Skriv seriøst og bastant.** Artikkelen skal lese som ekte, etterforskende journalistikk eller en saklig forbrukerguide. Spøken fungerer fordi innholdet virker seriøst. Ikke blunk til leseren, ikke bruk ordspill, utropstegn eller tullete formuleringer, og ikke skriv at noe er oppdiktet, satire eller «på tull» inne i selve teksten.
- Kom med påstander som fakta, ikke som spekulasjon. Skriv «Big Knatt Corp tilsetter littegrann opium i knattene» og ikke «vi mistenker at». Vis til Knattopias egne kilder som om de er etablerte: det lekkede notatet (`/#notatet`), analyserapporten (`/#analyse`), hovedfunnene (`/#funn`), aktørkartet og tidslinjen. Bruk presise tall, datoer og saksnumre i samme stil som forsiden.
- Artikkelen skal også gi et ekte, nyttig svar på søket (hva knatter er, størrelse, smaker osv.), slik at den rangerer og holder på leseren. Det konspiratoriske skal flettes inn i det nøkterne, ikke stå som en egen spøk.
- Satiremerkingen tar seg av seg selv: satirelinjen øverst på siden, bunnteksten og satireboksen under hver artikkel legges til automatisk. Ikke fjern dem.
- Det eneste selskapet som «tilsetter» noe, er det oppdiktede Big Knatt Corp. Ikke nevn ekte godterimerker, produsenter, personer eller myndigheter ved navn, og knytt aldri et ekte selskap til opium eller andre rusmidler.
- `beskrivelse:` vises alene i Google-resultatet uten satiremerking. Hold den nøytral og nysgjerrighetsvekkende, uten opium-påstander.
- Ikke oppfordr til rus, og ikke gi helseråd utover at godteri bør spises med måte.
