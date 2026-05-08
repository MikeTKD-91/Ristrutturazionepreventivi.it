export interface Articolo {
  slug: string;
  titolo: string;
  estratto: string;
  contenuto: string;
  immagine: string;
  categoria: string;
  data: string;
  seoTitle?: string;
  seoDescription?: string;
  updatedAt?: string;
}

export type ArticoliList = Articolo[];
