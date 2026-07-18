"use client";

import { Star, Quote } from "lucide-react";

const recensioni = [
  {
    nome: "Mirko D'Orazio",
    testo: "Sotto consiglio di un amico sono venuto a conoscenza di questa realtà. Preventivo veloce, personale affidabile e qualificato, una ristrutturazione coi fiocchi, consigliatissimo!",
    rating: 5,
    tempo: "un anno fa",
  },
  {
    nome: "Raffaele D'Aniello",
    testo: "Ottima impresa, davvero professionali, ho chiesto un preventivo per una ristrutturazione parziale, prezzo competitivo e davvero molto bravi nell'esecuzione.",
    rating: 5,
    tempo: "un anno fa",
  },
  {
    nome: "Diego Pagano",
    testo: "Impresa seria e affidabile, mi hanno unito la cucina con il salone... e sono rimasto contento... complimenti ragazzi.",
    rating: 5,
    tempo: "un anno fa",
  },
  {
    nome: "Francesco Verde",
    testo: "Posso solo dire buone cose. Grandi professionisti e lavoro eseguito in maniera eccellente.",
    rating: 5,
    tempo: "un anno fa",
  },
  {
    nome: "Carmen",
    testo: "Ottima azienda cordiali e efficiente.",
    rating: 5,
    tempo: "un anno fa",
  },
  {
    nome: "Francesco Scotti",
    testo: "Ottima esperienza, consigliatissimi.",
    rating: 5,
    tempo: "un anno fa",
  },
];

export function RecensioniClienti() {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-orange text-sm font-semibold uppercase tracking-widest mb-2">
            Cosa dicono di noi
          </p>
          <h2 className="text-3xl font-bold text-navy">
            Recensioni dei nostri clienti
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="h-6 w-6 fill-orange text-orange" />
              ))}
            </div>
            <span className="text-navy font-bold text-lg">5.0</span>
            <span className="text-gray-500 text-sm">su Google</span>
          </div>
          <a 
            href="https://search.google.com/local/writereview?placeid=ChIJQSVgS27mYkARHc6uYmUG9IA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-orange hover:underline text-sm font-medium"
          >
            Lascia anche tu una recensione →
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recensioni.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <Quote className="h-8 w-8 text-orange/20 mb-3" />
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {r.testo}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-navy text-sm">{r.nome}</p>
                  <p className="text-gray-400 text-xs">{r.tempo}</p>
                </div>
                <div className="flex">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-orange text-orange" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
