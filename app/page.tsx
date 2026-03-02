import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, MapPin, Shield, Clock, Award } from "lucide-react";
import CalcolatoreStima from "@/components/shared/CalcolatoreStima";
import { servizi } from "@/data/servizi";
import { comuniNapoli, comuniCaserta, comuniAgroAversano } from "@/data/comuni";
import { getDataAggiornamento } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ristrutturazione Preventivi - Stima Indicativa Gratuita | Napoli Caserta",
  description: "Stima indicativa immediata e gratuita per ristrutturazioni a Napoli, Caserta e provincia. 7 servizi, 33 comuni serviti. Russo FE Costruzione SRL.",
  alternates: {
    canonical: "https://ristrutturazionepreventivi.it/",
  },
  openGraph: {
    title: "Ristrutturazione Preventivi - Stima Indicativa Gratuita",
    description: "Stima indicativa immediata e gratuita per ristrutturazioni a Napoli, Caserta e provincia.",
    url: "https://ristrutturazionepreventivi.it/",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200",
        width: 1200,
        height: 630,
        alt: "Ristrutturazione Preventivi",
      },
    ],
  },
};

const features = [
  {
    icon: Shield,
    title: "Garanzia Decennale",
    description: "Tutti i nostri lavori sono coperti da garanzia decennale sui lavori strutturali.",
  },
  {
    icon: Clock,
    title: "Tempi Certi",
    description: "Rispettiamo i tempi concordati. Nessuna sorpresa, nessun ritardo.",
  },
  {
    icon: Award,
    title: "Materiali Certificati",
    description: "Utilizziamo solo materiali di qualità certificata e di prima scelta.",
  },
];

const testimonials = [
  {
    name: "Marco R.",
    location: "Napoli",
    text: "Professionali e puntuali. Hanno ristrutturato il mio appartamento in tempi record. Consigliatissimi!",
  },
  {
    name: "Anna P.",
    location: "Caserta",
    text: "Ottimo rapporto qualità-prezzo. La stima indicativa è stata precisa e i lavori sono stati impeccabili.",
  },
  {
    name: "Giuseppe L.",
    location: "Aversa",
    text: "Ho fatto ristrutturare bagno e cucina. Risultato eccellente, personale cortese e competente.",
  },
];

export default function HomePage() {
  const dataAggiornamento = getDataAggiornamento();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920"
            alt="Ristrutturazione appartamento"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-orange/20 text-orange px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Check className="h-4 w-4" />
                Costi aggiornati a {dataAggiornamento}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Ristrutturazioni a{" "}
                <span className="text-orange">Napoli</span> e{" "}
                <span className="text-orange">Caserta</span>
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-xl">
                Stima indicativa immediata e gratuita per la tua ristrutturazione. 
                7 servizi, 33 comuni serviti. Russo FE Costruzione SRL.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://wa.me/393339809319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center gap-2"
                >
                  Richiedi Stima Gratis
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link
                  href="/servizi/"
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
                >
                  Scopri i Servizi
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-orange" />
                  <span>Garanzia decennale</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-orange" />
                  <span>33 comuni serviti</span>
                </div>
              </div>
            </div>
            
            <div className="lg:pl-8">
              <CalcolatoreStima />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-14 w-14 rounded-xl bg-orange/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-7 w-7 text-orange" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servizi Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              I Nostri Servizi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Offriamo una gamma completa di servizi di ristrutturazione per la tua casa. 
              Dalla cucina al bagno, dal tetto al cappotto termico.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servizi.map((servizio) => (
              <Link
                key={servizio.slug}
                href={`/servizi/${servizio.slug}/`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={servizio.immagine}
                    alt={servizio.titolo}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg">{servizio.titolo}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {servizio.descrizione}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange font-semibold text-sm">
                      Da {servizio.prezzoMq.base} €/mq
                    </span>
                    <span className="text-navy font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Scopri <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              href="/servizi/"
              className="inline-flex items-center gap-2 bg-navy hover:bg-navy/90 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              Vedi tutti i servizi
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Zone Servite Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Zone Servite
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Operiamo in <strong>33 comuni</strong> di Napoli, Caserta e Agro Aversano. 
              Clicca sul tuo comune per ricevere una stima indicativa personalizzata.
            </p>
          </div>

          {/* Napoli */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-orange" />
              Napoli e provincia
            </h3>
            <div className="flex flex-wrap gap-2">
              {comuniNapoli.map((comune) => (
                <Link
                  key={comune.slug}
                  href={`/comune/${comune.slug}/`}
                  className="bg-white hover:bg-navy hover:text-white text-navy px-4 py-2 rounded-lg shadow-sm transition-colors text-sm font-medium"
                >
                  {comune.nome}
                </Link>
              ))}
            </div>
          </div>

          {/* Caserta */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-orange" />
              Caserta e provincia
            </h3>
            <div className="flex flex-wrap gap-2">
              {comuniCaserta.map((comune) => (
                <Link
                  key={comune.slug}
                  href={`/comune/${comune.slug}/`}
                  className="bg-white hover:bg-navy hover:text-white text-navy px-4 py-2 rounded-lg shadow-sm transition-colors text-sm font-medium"
                >
                  {comune.nome}
                </Link>
              ))}
            </div>
          </div>

          {/* Agro Aversano */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-orange" />
              Agro Aversano
            </h3>
            <div className="flex flex-wrap gap-2">
              {comuniAgroAversano.map((comune) => (
                <Link
                  key={comune.slug}
                  href={`/comune/${comune.slug}/`}
                  className="bg-white hover:bg-navy hover:text-white text-navy px-4 py-2 rounded-lg shadow-sm transition-colors text-sm font-medium"
                >
                  {comune.nome}
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/zone-servite/"
              className="inline-flex items-center gap-2 text-orange hover:text-orange-600 font-semibold transition-colors"
            >
              Vedi tutte le zone servite
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Cosa Dicono di Noi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Le opinioni dei nostri clienti sono la nostra migliore pubblicità.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-orange fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center">
                    <span className="text-navy font-bold">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-navy">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto a Ristrutturare?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Richiedi ora una stima indicativa immediata e gratuita. Saremo lieti di aiutarti 
            a realizzare il progetto per la tua casa.
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