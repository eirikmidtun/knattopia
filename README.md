# Knattopia

> **Satire.** Knatter inneholder ikke opium. Big Knatt Corp finnes ikke. Dette er en parodi på konspirasjonsnettsteder.

En norsk konspirasjonsparodi om at knatter er tilsatt «littegrann opium», pluss idle-spillet **Knattoperium**, der du styrer det oppdiktede Big Knatt Corp.

Se [PLAN.md](PLAN.md) for planen og spillmekanikken.

## Kjør lokalt

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # tester for spillmotoren
npm run build
```

## Teknologi

Next.js 15 (App Router), React 19, TypeScript, Vitest. API-rutene `/api/tips` og `/api/toppsjefer` lagrer i minnet og nullstilles ved omstart.

## Artikler

SEO-artikler om knatter ligger som Markdown i `content/artikler/` og vises under `/artikler`, med sitemap (`/sitemap.xml`), `robots.txt`, kanoniske lenker og strukturerte data (Article, BreadcrumbList). En ukentlig oppgave skriver en ny artikkel etter `content/SKRIVEGUIDE.md` og temalisten i `content/temaer.md`.

Absolutte lenker bruker `NEXT_PUBLIC_SITE_URL`, eller produksjonsdomenet Vercel oppgir automatisk.
