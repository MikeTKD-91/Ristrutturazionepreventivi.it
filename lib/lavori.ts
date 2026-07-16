// lib/lavori.ts
// Legge le immagini dei lavori per comune dal filesystem (server-side only)

import fs from "fs";
import path from "path";

const LAVORI_DIR = path.join(process.cwd(), "public", "images", "lavori");

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
  
  const immagini = files
    .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
    .sort()
    .map((file, index) => ({
      src: `/images/lavori/${slug}/${file}`,
      nome: `Lavoro ${index + 1}`,
    }));

  return immagini;
}
