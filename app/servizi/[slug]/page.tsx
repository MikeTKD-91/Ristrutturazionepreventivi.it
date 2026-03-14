import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { servizi, getServizioBySlug } from "@/data/servizi";
import { comuni } from "@/data/comuni";
import CalcolatoreStima from "@/components/shared/CalcolatoreStima";
import { getDataAggiornamento, formatPrezzo, generaLinkWhatsApp } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servizi.map((servizio) => ({
    slug: servizio.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const servizio = getServizioBySlug(slug);
  
  if (!servizio) {
    return {
      title: "Servizio non trovato",
    };
  }

  return {
    title: `${servizio.titolo} | Napoli Caserta`,
    description: servizio.descrizione,
    alternates: {
      canonical: `https://ristrutturazionepreventivi.it/servizi/${slug}/`,
    },
    openGraph: {
      title: `${servizio.titolo} | Napoli Caserta`,
      description: servizio.descrizione,
      url: `https://ristrutturazionepreventivi.it/servizi/${slug}/`,
      images: [
        {
          url: servizio.immagine,
          width: 800,
          height: 600,
          alt: servizio.alt,
        },
      ],
    },
  };
}

export default async function ServizioPage({ params }: Props) {
  const { slug } = await params;
  const servizio = getServizioBySlug(slug);
  const dataAggiornamento = getDataAggiornamento();

  if (!servizio) {
    notFound();
  }

  const altriServizi = servizi.filter(s => s.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={servizio.immagine}
          alt={servizio.alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="inline-flex items-center gap-2 bg-orange/20 text-orange backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Check className="h-4 w-4" />
              Costi aggiornati a {dataAggiornamento}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {servizio.titolo}
            </h1>
            <p className="text-xl text-white/80 max-w-2xl">
              {servizio.sottotitolo}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Descrizione */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Descrizione del Servizio
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-line">
                  {servizio.descrizioneLunga}
                </div>
              </div>

              {/* Caratteristiche */}
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Cosa Include
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {servizio.caratteristiche.map((car, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-orange" />
                      </div>
                      <span className="text-gray-700">{car}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vantaggi */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Perché Sceglierci
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {servizio.vantaggi.map((vantaggio, i) => (
                    <div
                      key={i}
                      className="bg-navy/5 p-4 rounded-xl border-l-4 border-orange"
                    >
                      <p className="text-gray-700">{vantaggio}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prezzi */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Prezzi Indicativi 2026
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-white border-2 border-gray-200 p-6 rounded-xl text-center">
                    <p className="text-sm text-gray-500 mb-2">Finitura Base</p>
                    <p className="text-3xl font-bold text-navy">
                      {servizio.prezzoMq.base} €
                    </p>
                    <p className="text-sm text-gray-400">/mq</p>
                  </div>
                  <div className="bg-white border-2 border-orange p-6 rounded-xl text-center relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white text-xs px-3 py-1 rounded-full">
                      Più scelta
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Finitura Standard</p>
                    <p className="text-3xl font-bold text-orange">
                      {servizio.prezzoMq.standard} €
                    </p>
                    <p className="text-sm text-gray-400">/mq</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 p-6 rounded-xl text-center">
                    <p className="text-sm text-gray-500 mb-2">Finitura Premium</p>
                    <p className="text-3xl font-bold text-navy">
                      {servizio.prezzoMq.premium} €
                    </p>
                    <p className="text-sm text-gray-400">/mq</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  * I prezzi sono indicativi e possono variare in base alle specifiche del progetto.
                  Costi aggiornati a {dataAggiornamento}.
                </p>
              </div>

              {/* Zone */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Dove Operiamo
                </h2>
                <p className="text-gray-600 mb-4">
                  Offriamo il servizio di {servizio.titolo.toLowerCase()} nelle Province di Napoli e Caserta 
                  di Napoli, Caserta e Agro Aversano:
                </p>
                <div className="flex flex-wrap gap-2">
                  {comuni.slice(0, 15).map((comune) => (
                    <Link
                      key={comune.slug}
                      href={`/comune/${comune.slug}/`}
                      className="bg-gray-100 hover:bg-navy hover:text-white text-navy px-3 py-1 rounded-lg text-sm transition-colors"
                    >
                      {comune.nome}
                    </Link>
                  ))}
                  <span className="text-gray-400 px-3 py-1 text-sm">e altri...</span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Calcolatore */}
              <CalcolatoreStima comuneDefault="Napoli" />

              {/* CTA */}
              <div className="bg-navy p-6 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-4">
                  Richiedi una Stima
                </h3>
                <p className="text-white/80 mb-6">
                  Contattaci su WhatsApp per una stima indicativa gratuita 
                  per il tuo progetto di {servizio.titolo.toLowerCase()}.
                </p>
                <a
                  href={generaLinkWhatsApp(
                    servizio.titolo,
                    80,
                    "Napoli",
                    `${formatPrezzo(servizio.prezzoMq.standard * 80 * 0.9)} - ${formatPrezzo(servizio.prezzoMq.standard * 80 * 1.1)}`,
                    "Standard"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-orange hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Scrivici su WhatsApp
                </a>
              </div>

              {/* Altri Servizi */}
              <div>
                <h3 className="text-lg font-bold text-navy mb-4">
                  Altri Servizi
                </h3>
                <div className="space-y-3">
                  {altriServizi.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/servizi/${s.slug}/`}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-navy/5 transition-colors"
                    >
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={s.immagine}
                          alt={s.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-navy text-sm">{s.titolo}</h4>
                        <p className="text-orange text-sm">Da {s.prezzoMq.base} €/mq</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Pronto a Iniziare?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Richiedi ora una stima indicativa immediata e gratuita per il tuo progetto 
            di {servizio.titolo.toLowerCase()}.
          </p>
          <a
            href="https://wa.me/393339809319"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            Richiedi Stima Gratuita
          </a>
          <p className="text-gray-400 text-sm mt-4">
            Costi aggiornati a {dataAggiornamento} - Ultimo aggiornamento: {dataAggiornamento}
          </p>
        </div>
      </section>
    </div>
  );
}