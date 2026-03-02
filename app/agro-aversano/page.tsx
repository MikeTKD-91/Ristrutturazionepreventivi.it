import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, MapPin, MessageCircle } from "lucide-react";
import { comuniAgroAversano } from "@/data/comuni";
import CalcolatoreStima from "@/components/shared/CalcolatoreStima";
import { getDataAggiornamento } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ristrutturazione nell'Agro Aversano | Preventivo, costi e impresa edile",
  description: "Ristrutturazione nell'Agro Aversano: stima gratuita immediata in 30 secondi. Impresa edile locale con 7 servizi professionali, pratiche e permessi edilizi. Russo FE Costruzione SRL.",
  alternates: {
    canonical: "https://ristrutturazionepreventivi.it/agro-aversano/",
  },
  openGraph: {
    title: "Ristrutturazione nell'Agro Aversano | Preventivo, costi e impresa edile",
    description: "Stima gratuita immediata per ristrutturazioni nell'Agro Aversano.",
    url: "https://ristrutturazionepreventivi.it/agro-aversano/",
    images: [
      {
        url: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200",
        width: 1200,
        height: 630,
        alt: "Ristrutturazione nell'Agro Aversano",
      },
    ],
  },
};

export default function AgroAversanoPage() {
  const dataAggiornamento = getDataAggiornamento();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920"
          alt="Agro Aversano"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ristrutturazione nell'Agro Aversano
            </h1>
            
            {/* PULSANTE "Stima gratuita immediata" SUBITO DOPO IL TITOLO */}
            <a
              href="#calcolatore"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors text-lg shadow-lg mt-6"
            >
              Stima gratuita immediata
              <ArrowRight className="h-5 w-5" />
            </a>

            <div className="inline-flex items-center gap-2 bg-orange/20 text-orange backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mt-6">
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
                  Ristrutturazioni nell'Agro Aversano
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  L'Agro Aversano è un territorio ricco di storia, tradizione e opportunità edilizie. 
                  Da Aversa a Lusciano, da Casal di Principe a San Cipriano d'Aversa, offriamo servizi di 
                  ristrutturazione completa per case, appartamenti e ville.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Russo FE Costruzione SRL è l'impresa edile di riferimento nell'Agro Aversano: 
                  conosciamo perfettamente norme urbanistiche locali, permessi edilizi e caratteristiche 
                  dei terreni. Dalla ristrutturazione di palazzi storici alla moderna efficientamento energetico.
                </p>
              </div>

              {/* Caratteristiche */}
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Caratteristiche del Territorio
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  L'Agro Aversano è caratterizzato da un mix unico di centri storici, zone residenziali 
                  e aree agricole. Molti edifici richiedono interventi di ristrutturazione per adeguamento 
                  sismico, efficientamento energetico e restauro conservativo.
                </p>
              </div>

              {/* Comuni */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Comuni Serviti nell'Agro Aversano
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {comuniAgroAversano.map((comune) => (
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
                  Prezzi Indicativi 2026 nell'Agro Aversano
                </h2>
                <p className="text-gray-600 mb-6">
                  Ecco i prezzi indicativi per una ristrutturazione completa nell'Agro Aversano. 
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
              <div id="calcolatore">
                <CalcolatoreStima comuneDefault="Agro Aversano" />
              </div>

              <div className="bg-navy p-6 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-4">
                  Richiedi una Stima
                </h3>
                <p className="text-white/80 mb-6">
                  Contattaci su WhatsApp per una stima indicativa gratuita 
                  per la tua ristrutturazione nell'Agro Aversano.
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
            Pronto a Ristrutturare nell'Agro Aversano?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Richiedi ora una stima indicativa immediata e gratuita per il tuo progetto 
            di ristrutturazione nell'Agro Aversano.
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