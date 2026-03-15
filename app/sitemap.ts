export const dynamic = "force-static";

import { MetadataRoute } from "next";
import { comuni } from "@/data/comuni";
import { servizi } from "@/data/servizi";
import { articoli } from "@/data/blog";

const BASE_URL = "https://ristrutturazionepreventivi.it";

const SERVIZI_PER_COMUNE = [
  "ristrutturazione-bagno",
  "ristrutturazione-cucina",
  "ristrutturazione-appartamento-completo",
  "rifacimento-tetto",
  "cappotto-termico",
  "impianti-elettrici-idraulici-termici",
  "pavimenti-rivestimenti",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // ── Pagine statiche principali ──────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,                        lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/servizi/`,                lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/zone-servite/`,           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/bonus-ristrutturazione/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog/`,                   lastModified: now, changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE_URL}/agro-aversano/`,          lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy/`,         lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE_URL}/cookie-policy/`,          lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
    // ⚠️ /napoli/ e /caserta/ ESCLUSE: redirect 301 verso /comune/napoli/ e /comune/caserta/
  ];

  // ── Pagine singolo servizio (/servizi/[slug]/) ───────────────────
  const serviziPages: MetadataRoute.Sitemap = servizi.map((s) => ({
    url: `${BASE_URL}/servizi/${s.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // ── Pagine comune (/comune/[slug]/) ──────────────────────────────
  // Priority: agro-aversano (zona core) > napoli > caserta
  const comuniPages: MetadataRoute.Sitemap = comuni.map((c) => ({
    url: `${BASE_URL}/comune/${c.slug}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: c.zona === "agro-aversano" ? 0.8 : c.zona === "napoli" ? 0.75 : 0.7,
  }));

  // ── Pagine servizio×comune (/comune/[slug]/[servizio]/) ──────────
  // Priorità massima: bagno e appartamento (ricerche più frequenti)
  // Priorità alta: cucina, tetto, cappotto
  // Priorità standard: impianti, pavimenti
  const prioritaServizio: Record<string, number> = {
    "ristrutturazione-bagno": 0.9,
    "ristrutturazione-appartamento-completo": 0.9,
    "ristrutturazione-cucina": 0.85,
    "rifacimento-tetto": 0.85,
    "cappotto-termico": 0.8,
    "impianti-elettrici-idraulici-termici": 0.75,
    "pavimenti-rivestimenti": 0.75,
  };

  const servizioXComunePages: MetadataRoute.Sitemap = comuni.flatMap((c) =>
    SERVIZI_PER_COMUNE.map((servizio) => ({
      url: `${BASE_URL}/comune/${c.slug}/${servizio}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      // Agro-aversano ha boost di +0.05 essendo la zona core
      priority: Math.min(
        1.0,
        (prioritaServizio[servizio] ?? 0.8) + (c.zona === "agro-aversano" ? 0.05 : 0)
      ),
    }))
  );

  // ── Blog ─────────────────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = articoli.map((p) => ({
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
