export const dynamic = "force-static";

import { MetadataRoute } from "next";
import { comuni } from "@/data/comuni";
import { servizi } from "@/data/servizi";
import { posts } from "@/data/blog";

const BASE_URL = "https://ristrutturazionepreventivi.it";

const SERVIZI_ATTIVI_PER_COMUNE = [
  "ristrutturazione-bagno",
  // "ristrutturazione-cucina",
  // "ristrutturazione-appartamento",
  // "cappotto-termico",
  // "impianti",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/servizi/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/zone-servite/`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/bonus-ristrutturazione/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog/`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/agro-aversano/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy/`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/cookie-policy/`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const serviziPages: MetadataRoute.Sitemap = servizi.map((s) => ({
    url: `${BASE_URL}/servizi/${s.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const comuniPages: MetadataRoute.Sitemap = comuni.map((c) => ({
    url: `${BASE_URL}/comune/${c.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: c.zona === "agro-aversano" ? 0.8 : 0.7,
  }));

  const servizioXComunePages: MetadataRoute.Sitemap = comuni.flatMap((c) =>
    SERVIZI_ATTIVI_PER_COMUNE.map((servizio) => ({
      url: `${BASE_URL}/comune/${c.slug}/${servizio}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: c.zona === "agro-aversano" ? 0.9 : 0.85,
    }))
  );

  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}/`,
    lastModified: p.data || now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...serviziPages,
    ...comuniPages,
    ...servizioXComunePages,
    ...blogPages,
  ];
}
