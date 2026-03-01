import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Data dinamica in italiano
export function getDataAggiornamento(): string {
  const mesi = [
    "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
    "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"
  ];
  const oggi = new Date();
  const mese = mesi[oggi.getMonth()];
  const anno = oggi.getFullYear();
  return `${mese} ${anno}`;
}

// Formatta numero come prezzo
export function formatPrezzo(valore: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(valore);
}

// Genera link WhatsApp con messaggio precompilato
export function generaLinkWhatsApp(
  servizio: string,
  mq: number,
  comune: string,
  prezzo: string,
  finitura: string
): string {
  const messaggio = encodeURIComponent(
    `Ciao, sono interessato a una stima per ${servizio.toLowerCase()}.\n` +
    `Metri quadri: ${mq} mq\n` +
    `Comune: ${comune}\n` +
    `Livello finitura: ${finitura}\n` +
    `Stima indicativa: ${prezzo}\n\n` +
    `Potete contattarmi per maggiori dettagli?`
  );
  return `https://wa.me/393339809319?text=${messaggio}`;
}

// Calcola range prezzo in base a servizio, mq e finitura
export function calcolaStima(
  servizio: string,
  mq: number,
  finitura: "base" | "standard" | "premium"
): { min: number; max: number } {
  const prezziBase: Record<string, { base: number; standard: number; premium: number }> = {
    "ristrutturazione-appartamento-completo": { base: 550, standard: 750, premium: 950 },
    "ristrutturazione-cucina": { base: 400, standard: 600, premium: 850 },
    "ristrutturazione-bagno": { base: 450, standard: 700, premium: 1000 },
    "rifacimento-tetto": { base: 80, standard: 120, premium: 180 },
    "pavimenti-rivestimenti": { base: 60, standard: 100, premium: 150 },
    "impianti-elettrici-idraulici-termici": { base: 150, standard: 250, premium: 400 },
    "cappotto-termico": { base: 80, standard: 120, premium: 180 },
  };

  const prezzoMq = prezziBase[servizio]?.[finitura] || 500;
  const totale = prezzoMq * mq;
  
  return {
    min: Math.round(totale * 0.9),
    max: Math.round(totale * 1.1),
  };
}