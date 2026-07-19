// lib/lavori.ts
// Legge le immagini dei lavori dal filesystem (server-side only)

import fs from "fs";
import path from "path";

const SERVIZI_DIR = path.join(process.cwd(), "public", "images", "servizi");
const LAVORI_SERVIZI_DIR = path.join(process.cwd(), "public", "images", "lavori-servizi");

export interface LavoroComune {
  src: string;
  nome: string;
}


export function getLavoriPerServizio(servizioSlug: string): LavoroComune[] {
  const servizioDir = path.join(LAVORI_SERVIZI_DIR, servizioSlug);

  if (fs.existsSync(servizioDir)) {
    const files = fs.readdirSync(servizioDir);

    const lavori = files
      .filter((file) => /\.(jpg|jpeg|png|webp|gif)$/i.test(file))
      .sort()
      .map((file, index) => ({
        src: `/images/lavori-servizi/${servizioSlug}/${file}`,
        nome: `Lavoro ${index + 1}`,
      }));

    if (lavori.length) {
      return lavori;
    }
  }

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
