import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Articolo, ArticoliList } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function getMdxFiles() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));
}

function parseArticoloFromFile(fileName: string): Articolo | null {
  const fullPath = path.join(BLOG_DIR, fileName);

  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug: String(data.slug ?? fileName.replace(/\.mdx$/, "")),
    titolo: String(data.titolo ?? ""),
    estratto: String(data.estratto ?? ""),
    contenuto: content.trim(),
    immagine: String(data.immagine ?? ""),
    categoria: String(data.categoria ?? ""),
    data: String(data.data ?? ""),
    seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
    seoDescription: data.seoDescription ? String(data.seoDescription) : undefined,
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
  };
}

export function getAllArticoli(): ArticoliList {
  return getMdxFiles()
    .map(parseArticoloFromFile)
    .filter((articolo): articolo is Articolo => articolo !== null)
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
}

export function getArticoloBySlug(slug: string): Articolo | null {
  const articolo = getAllArticoli().find((a) => a.slug === slug);
  return articolo ?? null;
}

export function getAltriArticoli(slug: string, count: number = 3): ArticoliList {
  return getAllArticoli()
    .filter((a) => a.slug !== slug)
    .slice(0, count);
}

export function getArticoliByCategoria(categoria: string): ArticoliList {
  return getAllArticoli().filter((a) => a.categoria === categoria);
}

export function getCategorieArticoli(): string[] {
  return [...new Set(getAllArticoli().map((a) => a.categoria))];
}
