/** Absolutt adresse til nettstedet. Brukes i sitemap, kanoniske lenker og strukturerte data. */
function finnUrl(): string {
  const eksplisitt = process.env.NEXT_PUBLIC_SITE_URL;
  if (eksplisitt) return eksplisitt.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const SITE_URL = finnUrl();
export const SITE_NAVN = "Knattopia";
