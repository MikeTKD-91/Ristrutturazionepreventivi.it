// lib/lavori.ts
// Legge le immagini dei lavori dal filesystem (server-side only)

import fs from "fs";
import path from "path";

const LAVORI_DIR = path.join(process.cwd(), "public", "images", "lavori");
const SERVIZI_DIR = path.join(process.cwd(), "public", "images", "servizi");

export interface LavoroComune {
  src: string;
  nome: string;
}

export function getLavoriPerComune(slug: string): LavoroComune[] {
  const comuneDir = path.join(LAVORI_DIR, slug);

  if (!fs.existsSync(comuneDir)) {
    return [];
  }

  const files = fs.readdirSync(comuneDir);

  return files
    .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
    .sort()
    .map((file, index) => ({
      src: `/images/lavori/${slug}/${file}`,
      nome: `Lavoro ${index + 1}`,
    }));
}

export function getLavoriPerServizio(servizioSlug: string): LavoroComune[] {
  if (!fs.existsSync(SERVIZI_DIR)) {
    return [];
  }

  const files = fs.readdirSync(SERVIZI_DIR);

  return files
    .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
    .filter((file) => path.parse(file).name === servizioSlug)
    .map((file, index) => ({
      src: `/images/servizi/${file}`,
      nome: `Lavoro ${index + 1}`,
    }));
}
