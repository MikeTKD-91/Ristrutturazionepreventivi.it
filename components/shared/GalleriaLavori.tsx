"use client";

import { useState } from "react";
import Image from "next/image";

interface Lavoro {
  src: string;
  nome: string;
}

interface GalleriaLavoriProps {
  comuneNome?: string;
  lavori: Lavoro[];
  titolo?: string;
  intro?: string;
  outro?: string;
}

export default function GalleriaLavori({
  comuneNome,
  lavori,
  titolo,
  intro,
  outro,
}: GalleriaLavoriProps) {
  const [immagineAperta, setImmagineAperta] = useState<string | null>(null);

  if (lavori.length === 0) {
    return null;
  }

  const titoloFinale =
    titolo ?? (comuneNome ? `I nostri lavori a ${comuneNome} e nei comuni vicini` : "I nostri lavori");

  const introFinale =
    intro ??
    (comuneNome
      ? `Una selezione di lavori reali eseguiti per questo tipo di intervento a ${comuneNome} e nelle aree vicine. Le immagini mostrano cantieri svolti sul territorio, utili per capire finiture, fasi di lavorazione e risultati ottenuti.`
      : "Una selezione di lavori reali eseguiti per questo tipo di intervento nelle zone in cui operiamo.");

  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-navy mb-2">{titoloFinale}</h2>
      <p className="text-gray-600 mb-8">{introFinale}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lavori.map((lavoro, i) => (
          <button
            key={i}
            onClick={() => setImmagineAperta(lavoro.src)}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden group hover:shadow-lg transition-all cursor-pointer"
          >
            <Image
              src={lavoro.src}
              alt={lavoro.nome || `Lavoro di ristrutturazione ${i + 1}${comuneNome ? ` tra ${comuneNome} e zone vicine` : ""}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors" />
          </button>
        ))}
      </div>

      {outro ? <p className="text-gray-600 mt-8">{outro}</p> : null}

      {immagineAperta && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setImmagineAperta(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:text-orange transition-colors"
            onClick={() => setImmagineAperta(null)}
          >
            ✕
          </button>
          <div className="relative w-full max-w-5xl aspect-[4/3]">
            <Image
              src={immagineAperta}
              alt={comuneNome ? `Lavoro di ristrutturazione tra ${comuneNome} e aree vicine` : "Lavoro di ristrutturazione"}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
