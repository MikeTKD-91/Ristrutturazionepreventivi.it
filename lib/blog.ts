import type { Articolo, ArticoliList } from "@/types/blog";
import { articoli } from "@/data/blog";

export function getAllArticoli(): ArticoliList {
  return articoli;
}

export function getArticoloBySlug(slug: string): Articolo | null {
  return articoli.find((a) => a.slug === slug) ?? null;
}

export function getAltriArticoli(slug: string, count: number = 3): ArticoliList {
  const articoloCorrente = getArticoloBySlug(slug);
  if (!articoloCorrente) return [];

  return (
    articoli
      .filter((a) => a.slug !== slug)
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
  );
}

export function getArticoliByCategoria(categoria: string): ArticoliList {
  return articoli.filter((a) => a.categoria === categoria);
}

export function getCategorieArticoli(): string[] {
  return [...new Set(articoli.map((a) => a.categoria))];
}
