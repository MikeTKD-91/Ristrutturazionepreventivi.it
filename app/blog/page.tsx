import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Check } from "lucide-react";
import { articoli } from "@/data/blog";
import CalcolatoreStima from "@/components/shared/CalcolatoreStima";
import { getDataAggiornamento } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog Ristrutturazione | Guide e Consigli 2026",
  description: "Guide, consigli e novità sul mondo delle ristrutturazioni. Scopri i trend 2026, i bonus fiscali e come pianificare il tuo progetto.",
  alternates: {
    canonical: "https://ristrutturazionepreventivi.it/blog/",
  },
  openGraph: {
    title: "Blog Ristrutturazione | Guide e Consigli 2026",
    description: "Guide, consigli e novità sul mondo delle ristrutturazioni.",
    url: "https://ristrutturazionepreventivi.it/blog/",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200",
        width: 1200,
        height: 630,
        alt: "Blog Ristrutturazione",
      },
    ],
  },
};

function formatData(data: string): string {
  const date = new Date(data);
  return date.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const dataAggiornamento = getDataAggiornamento();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-navy py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-orange/20 text-orange px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Check className="h-4 w-4" />
              Costi aggiornati a {dataAggiornamento}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Blog Ristrutturazione
            </h1>
            <p className="text-xl text-white/80">
              Guide, consigli e novità sul mondo delle ristrutturazioni. 
              Scopri i trend 2026, i bonus fiscali e come pianificare il tuo progetto.
            </p>
          </div>
        </div>
      </section>

      {/* Calcolatore */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <CalcolatoreStima />
          </div>
        </div>
      </section>

      {/* Articoli */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articoli.map((articolo) => (
              <article
                key={articolo.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
              >
                <Link href={`/blog/${articolo.slug}/`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={articolo.immagine}
                      alt={articolo.titolo}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange text-white text-xs px-3 py-1 rounded-full font-medium">
                        {articolo.categoria}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{formatData(articolo.data)}</span>
                  </div>
                  <Link href={`/blog/${articolo.slug}/`}>
                    <h2 className="text-xl font-bold text-navy mb-3 group-hover:text-orange transition-colors line-clamp-2">
                      {articolo.titolo}
                    </h2>
                  </Link>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {articolo.estratto}
                  </p>
                  <Link
                    href={`/blog/${articolo.slug}/`}
                    className="inline-flex items-center gap-2 text-orange font-semibold text-sm group-hover:gap-3 transition-all"
                  >
                    Leggi l'articolo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Hai Bisogno di una Stima?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Contattaci su WhatsApp per una stima indicativa immediata e gratuita 
            per la tua ristrutturazione.
          </p>
          <a
            href="https://wa.me/393339809319"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Scrivici su WhatsApp
          </a>
          <p className="text-white/50 text-sm mt-4">
            Costi aggiornati a {dataAggiornamento} - Ultimo aggiornamento: {dataAggiornamento}
          </p>
        </div>
      </section>
    </div>
  );
}