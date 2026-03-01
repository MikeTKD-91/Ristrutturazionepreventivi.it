import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, MapPin, MessageCircle } from "lucide-react";
import { comuniCaserta } from "@/data/comuni";
import CalcolatoreStima from "@/components/shared/CalcolatoreStima";
import { getDataAggiornamento } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ristrutturazioni Caserta e Provincia | Preventivi",
  description: "Stima indicativa immediata e gratuita per ristrutturazioni a Caserta e in tutta la provincia. 7 servizi, 9 comuni serviti direttamente.",
  alternates: {
    canonical: "https://ristrutturazionepreventivi.it/caserta/",
  },
  openGraph: {
    title: "Ristrutturazioni Caserta e Provincia | Preventivi",
    description: "Stima indicativa immediata e gratuita per ristrutturazioni a Caserta e provincia.",
    url: "https://ristrutturazionepreventivi.it/caserta/",
    images: [
      {
        url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200",
        width: 1200,
        height: 630,
        alt: "Ristrutturazioni Caserta",
      },
    ],
  },
};

export default function CasertaPage() {
  const dataAggiornamento = getDataAggiornamento();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920"
          alt="Caserta"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ristrutturazioni Caserta
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
                  Ristrutturazioni a Caserta e in Provincia
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Caserta, famosa in tutto il mondo per la sua splendida Reggia UNESCO, 
                  è un importante centro della provincia con un centro storico ricco di 
                  palazzi nobiliari e una zona moderna in continua espansione. La provincia 
                  di Caserta offre un mix unico di storia, arte e modernità.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Russo FE Costruzione SRL opera a Caserta e in tutta la provincia, 
                  dalla Reggia alle zone industriali di Marcianise, fino all'Agro Aversano. 
                  Offriamo servizi di ristrutturazione completa per ogni esigenza, dal 
                  restauro di immobili storici alla modernizzazione di appartamenti.
                </p>
              </div>

              {/* Caratteristiche */}
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Caratteristiche del Territorio
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Caserta offre un mix unico di architettura storica e moderna. Il centro 
                  storico presenta palazzi d'epoca che richiedono interventi di restauro, 
                  mentre le periferie offrono numerose opportunità di ristrutturazione di 
                  appartamenti moderni. La provincia è caratterizzata da una forte densità 
                  abitativa con molti edifici degli anni '70-'80 che necessitano di 
                  ristrutturazione.
                </p>
              </div>

              {/* Comuni */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Comuni Serviti in Provincia di Caserta
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {comuniCaserta.map((comune) => (
                    <Link
                      key={comune.slug}
                      href={`/comune/${comune.slug}/`}
                      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-orange transition-colors group"
                    >
                      <MapPin className="h-5 w-5 text-orange" />
                      <span className="font-semibold text-navy group-hover:text-orange transition-colors">
                        {comune.nome}
                      </span>
                      <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-orange transition-colors ml-auto" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Prezzi */}
              <div className="bg-navy/5 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Prezzi Indicativi 2026 a Caserta
                </h2>
                <p className="text-gray-600 mb-6">
                  Ecco i prezzi indicativi per una ristrutturazione completa a Caserta. 
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
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Calcolatore */}
              <CalcolatoreStima comuneDefault="Caserta" />

              {/* CTA */}
              <div className="bg-navy p-6 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-4">
                  Richiedi una Stima
                </h3>
                <p className="text-white/80 mb-6">
                  Contattaci su WhatsApp per una stima indicativa gratuita 
                  per la tua ristrutturazione a Caserta.
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
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto a Ristrutturare a Caserta?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Richiedi ora una stima indicativa immediata e gratuita per il tuo progetto 
            di ristrutturazione a Caserta o in provincia.
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