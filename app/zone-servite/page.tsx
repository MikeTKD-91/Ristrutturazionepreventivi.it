import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Check, Building2 } from "lucide-react";
import { comuniNapoli, comuniCaserta, comuniAgroAversano } from "@/data/comuni";
import CalcolatoreStima from "@/components/shared/CalcolatoreStima";
import { getDataAggiornamento } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Zone Servite | Ristrutturazioni Napoli e Provincia, Caserta e Agro Aversano",
  description: "Operiamo in 33 comuni di Napoli e Provincia, Caserta e Provincia e Agro Aversano. Trova il tuo comune e richiedi una stima gratuita immediata.",
  alternates: {
    canonical: "https://ristrutturazionepreventivi.it/zone-servite/",
  },
  openGraph: {
    title: "Zone Servite | Ristrutturazioni Napoli e Provincia, Caserta e Agro Aversano",
    description: "33 comuni serviti tra Napoli, Caserta e Agro Aversano. Stima gratuita immediata.",
    url: "https://ristrutturazionepreventivi.it/zone-servite/",
    images: [
      {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
        width: 1200,
        height: 630,
        alt: "Zone Servite",
      },
    ],
  },
};

export default function ZoneServitePage() {
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
              Zone Servite
            </h1>
            <p className="text-xl text-white/80">
              Operiamo in <span className="text-orange font-bold">33 comuni</span> tra Napoli e Provincia, Caserta e Provincia e Agro Aversano.
            </p>
            
            {/* PULSANTE "Stima gratuita immediata" SUBITO DOPO IL TITOLO */}
            <a
              href="#calcolatore"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors text-lg shadow-lg mt-8"
            >
              Stima gratuita immediata
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Calcolatore */}
      <section id="calcolatore" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <CalcolatoreStima />
          </div>
        </div>
      </section>

      {/* Napoli e Provincia */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-xl bg-orange/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-orange" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-navy">Napoli e Provincia</h2>
              <p className="text-gray-600">{comuniNapoli.length} comuni serviti</p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {comuniNapoli.map((comune) => (
              <Link
                key={comune.slug}
                href={`/comune/${comune.slug}/`}
                className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <MapPin className="h-5 w-5 text-orange" />
                  <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-orange transition-colors" />
                </div>
                <h3 className="font-semibold text-navy group-hover:text-orange transition-colors">
                  {comune.nome}
                </h3>
                <p className="text-sm text-gray-500 mt-1">Provincia di Napoli</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Caserta e Provincia */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-xl bg-orange/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-orange" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-navy">Caserta e Provincia</h2>
              <p className="text-gray-600">{comuniCaserta.length} comuni serviti</p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {comuniCaserta.map((comune) => (
              <Link
                key={comune.slug}
                href={`/comune/${comune.slug}/`}
                className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <MapPin className="h-5 w-5 text-orange" />
                  <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-orange transition-colors" />
                </div>
                <h3 className="font-semibold text-navy group-hover:text-orange transition-colors">
                  {comune.nome}
                </h3>
                <p className="text-sm text-gray-500 mt-1">Provincia di Caserta</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Agro Aversano */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-xl bg-orange/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-orange" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-navy">Agro Aversano</h2>
              <p className="text-gray-600">{comuniAgroAversano.length} comuni serviti</p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {comuniAgroAversano.map((comune) => (
              <Link
                key={comune.slug}
                href={`/comune/${comune.slug}/`}
                className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <MapPin className="h-5 w-5 text-orange" />
                  <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-orange transition-colors" />
                </div>
                <h3 className="font-semibold text-navy group-hover:text-orange transition-colors">
                  {comune.nome}
                </h3>
                <p className="text-sm text-gray-500 mt-1">Agro Aversano</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy mb-4">
              Operiamo in Tutta l'Area
            </h2>
            <p className="text-gray-600 mb-8">
              Non trovi il tuo comune? Nessun problema! Contattaci comunque: operiamo 
              in tutti i comuni dell'area metropolitana di Napoli e della provincia di Caserta. 
              Saremo lieti di valutare il tuo progetto indipendentemente dalla località.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/napoli/"
                className="bg-navy hover:bg-navy/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Scopri Napoli
              </Link>
              <Link
                href="/caserta/"
                className="bg-navy hover:bg-navy/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Scopri Caserta
              </Link>
              <Link
                href="/agro-aversano/"
                className="bg-navy hover:bg-navy/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Scopri Agro Aversano
              </Link>
              <a
                href="https://wa.me/393339809319"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Contattaci
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Trova il Tuo Comune
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Clicca sul tuo comune per ricevere una stima indicativa personalizzata 
            per la tua ristrutturazione.
          </p>
          <a
            href="https://wa.me/393339809319"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
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