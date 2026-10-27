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
