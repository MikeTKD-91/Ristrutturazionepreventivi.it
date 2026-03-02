import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin, Wrench, Shield, Clock, Award } from "lucide-react";
import CalcolatoreStima from "@/components/shared/CalcolatoreStima";
import { servizi } from "@/data/servizi";
import { comuniNapoli, comuniCaserta, comuniAgroAversano } from "@/data/comuni";
import { getDataAggiornamento } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Ristrutturazioni nell'Agro Aversano, Napoli, Caserta e Provincia | Preventivi Gratis",
  description: "Ristrutturazioni nell'Agro Aversano, Napoli, Caserta e provincia. +33 comuni serviti. Stima indicativa immediata e gratuita in 30 secondi. 7 servizi professionali - Russo FE Costruzione SRL.",
  alternates: {
    canonical: "https://ristrutturazionepreventivi.it/",
  },
  openGraph: {
    title: "Ristrutturazioni nell'Agro Aversano, Napoli, Caserta e Provincia | +33 Comuni",
    description: "Stima indicativa gratuita per ristrutturazioni nell'Agro Aversano, Napoli, Caserta e provincia. +33 comuni serviti.",
    url: "https://ristrutturazionepreventivi.it/",
    images: [
      {
        url: "https://ristrutturazionepreventivi.it/images/servizi/ristrutturazione-appartamento-completo.jpg",
        width: 1200,
        height: 630,
        alt: "Ristrutturazioni nell'Agro Aversano, Napoli, Caserta e provincia - Russo FE Costruzione SRL",
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
            src="/images/servizi/ristrutturazione-appartamento-completo.jpg"
            alt="Ristrutturazioni nell'Agro Aversano, Napoli, Caserta e provincia"
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
                Costi aggiornati a {dataAggiornamento} • +33 Comuni serviti
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Ristrutturazioni nell&apos;<span className="text-orange">Agro Aversano</span>,{" "}
                <span className="text-orange">Napoli</span>,{" "}
                <span className="text-orange">Caserta</span> e provincia
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-xl">
                Stima indicativa immediata e gratuita per la tua ristrutturazione. 
                7 servizi professionali • +33 comuni serviti nell&apos;Agro Aversano, Napoli, Caserta e provincia. 
                Russo FE Costruzione SRL.
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
            </div>
            
            <div className="lg:pl-8">
              <CalcolatoreStima />
            </div>
          </div>
        </div>
      </section>

      {/* Il resto del file rimane identico (features, servizi, zone, testimonianze, CTA) */}
      {/* ... (tutto il codice dal Features Section fino alla fine rimane uguale) ... */}

      {/* Per brevità ho omesso la parte invariata, ma quando incolli usa tutto il codice originale dal punto in cui inizia la sezione Features in poi. */}

    </div>
  );
}