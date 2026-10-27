import type { MetadataRoute } from "next";
import { alleArtikler } from "@/lib/artikler";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const artikler = alleArtikler();
  const sist = artikler[0]?.oppdatert;
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/artikler`, lastModified: sist, changeFrequency: "weekly", priority: 0.9 },
    ...artikler.map((a) => ({
      url: `${SITE_URL}/artikler/${a.slug}`,
      lastModified: a.oppdatert,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/knattoperium`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
