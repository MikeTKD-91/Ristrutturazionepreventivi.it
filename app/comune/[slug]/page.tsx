import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin, MessageCircle, Star } from "lucide-react";
import { comuni, getComuneBySlug } from "@/data/comuni";

import CalcolatoreStima from "@/components/shared/CalcolatoreStima";
import { getDataAggiornamento, formatPrezzo, generaLinkWhatsApp } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return comuni.map((comune) => ({
    slug: comune.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  
  if (!comune) {
    return {
      title: "Comune non trovato",
    };
  }

  return {
    title: `Ristrutturazioni ${comune.nome} | Preventivi e Stime`,
    description: `Stima indicativa immediata e gratuita per ristrutturazioni a ${comune.nome}. Russo FE Costruzione SRL - 7 servizi, 33 comuni serviti.`,
    alternates: {
      canonical: `https://ristrutturazionepreventivi.it/comune/${slug}/`,
    },
    openGraph: {
      title: `Ristrutturazioni ${comune.nome} | Preventivi e Stime`,
      description: `Stima indicativa immediata e gratuita per ristrutturazioni a ${comune.nome}.`,
      url: `https://ristrutturazionepreventivi.it/comune/${slug}/`,
      images: [
        {
          url: comune.immagine,
          width: 1200,
          height: 630,
          alt: `Ristrutturazioni ${comune.nome}`,
        },
      ],
    },
  };
}

export default async function ComunePage({ params }: Props) {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  const dataAggiornamento = getDataAggiornamento();

  if (!comune) {
    notFound();
  }

  const vicini = comune.vicini
    .map(v => getComuneBySlug(v))
    .filter(Boolean)
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={comune.immagine}
          alt={`${comune.nome}`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="flex items-center gap-2 text-white/80 mb-4">
              <MapPin className="h-5 w-5" />
              <span>Provincia di {comune.provincia === "napoli" ? "Napoli" : "Caserta"}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ristrutturazioni a {comune.nome}
            </h1>
            <div className="inline-flex items-center gap-2 bg-orange/20 text-orange backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              <Check className="h-4 w-4" />
              Costi aggiornati a {dataAggiornamento}
            </div>
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
                  Ristrutturazioni a {comune.nome}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {comune.descrizione}
                </p>
              </div>

              {/* Caratteristiche */}
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Caratteristiche del Territorio
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {comune.caratteristiche}
                </p>
              </div>

              {/* Perché sceglierci */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Perché Scegliere Russo FE Costruzione SRL a {comune.nome}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Esperienza decennale nel territorio",
                    "Conoscenza delle caratteristiche locali",
                    "Tempi rapidi di intervento",
                    "Materiali di qualità certificata",
                    "Garanzia decennale sui lavori",
                    "Preventivi trasparenti e dettagliati",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-orange" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Servizi */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Servizi Disponibili a {comune.nome}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { slug: "ristrutturazione-appartamento-completo", title: "Ristrutturazione Appartamento", price: "550" },
                    { slug: "ristrutturazione-cucina", title: "Ristrutturazione Cucina", price: "400" },
                    { slug: "ristrutturazione-bagno", title: "Ristrutturazione Bagno", price: "450" },
                    { slug: "rifacimento-tetto", title: "Rifacimento Tetto", price: "80" },
                    { slug: "pavimenti-rivestimenti", title: "Pavimenti e Rivestimenti", price: "60" },
                    { slug: "impianti-elettrici-idraulici-termici", title: "Impianti", price: "150" },
                    { slug: "cappotto-termico", title: "Cappotto Termico", price: "80" },
                  ].map((servizio) => (
                    <Link
                      key={servizio.slug}
                      href={`/servizi/${servizio.slug}/`}
                      className="bg-white p-4 rounded-xl border border-gray-200 hover:border-orange transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-navy group-hover:text-orange transition-colors">
                          {servizio.title}
                        </span>
                        <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-orange transition-colors" />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Da {servizio.price} €/mq
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Prezzi */}
              <div className="bg-navy/5 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Prezzi Indicativi 2026 a {comune.nome}
                </h2>
                <p className="text-gray-600 mb-6">
                  Ecco i prezzi indicativi per una ristrutturazione completa a {comune.nome}. 
                  I prezzi variano in base al livello di finitura scelto.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-white p-6 rounded-xl text-center">
                    <p className="text-sm text-gray-500 mb-2">Finitura Base</p>
                    <p className="text-2xl font-bold text-navy">550 €/mq</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl text-center border-2 border-orange">
                    <p className="text-sm text-gray-500 mb-2">Finitura Standard</p>
                    <p className="text-2xl font-bold text-orange">750 €/mq</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl text-center">
                    <p className="text-sm text-gray-500 mb-2">Finitura Premium</p>
                    <p className="text-2xl font-bold text-navy">950 €/mq</p>
                  </div>
                </div>
              </div>

              {/* Testimonianze */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Cosa Dicono i Nostri Clienti a {comune.nome}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Mario R.",
                      text: "Ottimo lavoro, professionalità e puntualità. Consigliatissimi!",
                    },
                    {
                      name: "Laura B.",
                      text: "Hanno ristrutturato il mio bagno in tempi record. Risultato eccellente.",
                    },
                  ].map((testimonial, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="h-4 w-4 text-orange fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                      <p className="font-semibold text-navy">{testimonial.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comuni vicini */}
              {vicini.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-navy mb-4">
                    Operiamo Anche Nei Comuni Vicini
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {vicini.map((v) => v && (
                      <Link
                        key={v.slug}
                        href={`/comune/${v.slug}/`}
                        className="bg-gray-100 hover:bg-navy hover:text-white text-navy px-4 py-2 rounded-lg text-sm transition-colors"
                      >
                        {v.nome}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Calcolatore */}
              <CalcolatoreStima comuneDefault={comune.nome} />

              {/* CTA */}
              <div className="bg-navy p-6 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-4">
                  Richiedi una Stima
                </h3>
                <p className="text-white/80 mb-6">
                  Contattaci su WhatsApp per una stima indicativa gratuita 
                  per la tua ristrutturazione a {comune.nome}.
                </p>
                <a
                  href="https://wa.me/393339809319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-orange hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Scrivici su WhatsApp
                </a>
              </div>

              {/* Info */}
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-navy mb-4">
                  Russo FE Costruzione SRL
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-orange flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">
                      Viale della Libertà 3<br />
                      81030 Lusciano (CE)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-orange flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <a 
                      href="https://wa.me/393339809319"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-orange transition-colors"
                    >
                      333 980 9319
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto a Ristrutturare a {comune.nome}?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Richiedi ora una stima indicativa immediata e gratuita per il tuo progetto 
            di ristrutturazione a {comune.nome}.
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
          <p className="text-white/50 text-sm mt-4">
            Costi aggiornati a {dataAggiornamento} - Ultimo aggiornamento: {dataAggiornamento}
          </p>
        </div>
      </section>
    </div>
  );
}