// app/sitemap.ts
// Sitemap nativa Next.js — NON usa next-sitemap
// Aggiornata con pagine servizio×comune (ristrutturazione-bagno)

export const dynamic = "force-static";

import { MetadataRoute } from "next";
import { comuni } from "@/data/comuni";

const BASE_URL = "https://ristrutturazionepreventivi.it";

// Slugs dei servizi per cui esistono pagine servizio×comune
// Aggiungere qui quando si producono le altre pagine dinamiche
const SERVIZI_ATTIVI_PER_COMUNE = [
  "ristrutturazione-bagno",
  // "ristrutturazione-cucina",        // da produrre
  // "ristrutturazione-appartamento",  // da produrre
  // "cappotto-termico",               // da produrre
  // "impianti",                       // da produrre
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // ── Pagine statiche principali ────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/servizi/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/zone-servite/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/bonus-ristrutturazione/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    // ⚠️ Queste due URL hanno duplicati in /comune/napoli e /comune/caserta
    // Valutare redirect 301 da /napoli/ → /comune/napoli/ e /caserta/ → /comune/caserta/
    // Nel frattempo NON le includiamo per evitare di segnalare il duplicato a Google
    // {
    //   url: `${BASE_URL}/napoli/`,
    //   lastModified: now,
    //   changeFrequency: "monthly",
    //   priority: 0.7,
    // },
    // {
    //   url: `${BASE_URL}/caserta/`,
    //   lastModified: now,
    //   changeFrequency: "monthly",
    //   priority: 0.7,
    // },
    {
      url: `${BASE_URL}/agro-aversano/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy-policy/`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/cookie-policy/`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // ── Pagine servizi ─────────────────────────────────────────────────────────
  const slugsServizi = [
    "ristrutturazione-appartamento-completo",
    "ristrutturazione-cucina",
    "ristrutturazione-bagno",
    "rifacimento-tetto",
    "pavimenti-rivestimenti",
    "impianti-elettrici-idraulici-termici",
    "cappotto-termico",
  ];

  const serviziPages: MetadataRoute.Sitemap = slugsServizi.map((slug) => ({
    url: `${BASE_URL}/servizi/${slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // ── Pagine comune (hub) ────────────────────────────────────────────────────
  const comuniPages: MetadataRoute.Sitemap = comuni.map((c) => ({
    url: `${BASE_URL}/comune/${c.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    // Agro Aversano = zona core dell'azienda → priority più alta
    priority: c.zona === "agro-aversano" ? 0.8 : 0.7,
  }));

  // ── Pagine servizio×comune ─────────────────────────────────────────────────
  // Genera tutte le combinazioni attive: 33 comuni × servizi attivi
  const servizioXComunePages: MetadataRoute.Sitemap = comuni.flatMap((c) =>
    SERVIZI_ATTIVI_PER_COMUNE.map((servizio) => ({
      url: `${BASE_URL}/comune/${c.slug}/${servizio}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      // Bagno = ricerca ad alta intenzione → priority massima tra le pagine long-tail
      priority: c.zona === "agro-aversano" ? 0.9 : 0.85,
    }))
  );

  return [
    ...staticPages,
    ...serviziPages,
    ...comuniPages,
    ...servizioXComunePages,
  ];
}