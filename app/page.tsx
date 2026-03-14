"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, MapPin, Shield, Clock, Award, ChevronDown } from "lucide-react";
import CalcolatoreStima from "@/components/shared/CalcolatoreStima";
import { servizi } from "@/data/servizi";
import { comuniNapoli, comuniCaserta, comuniAgroAversano } from "@/data/comuni";
import { getDataAggiornamento } from "@/lib/utils";

const features = [
  {
    icon: Shield,
    title: "Garanzia Decennale",
    description: "Tutti i lavori strutturali sono coperti da garanzia decennale per legge.",
  },
  {
    icon: Clock,
    title: "Tempi Concordati",
    description: "Il programma lavori viene definito al sopralluogo e rispettato.",
  },
  {
    icon: Award,
    title: "Materiali Certificati CE",
    description: "Utilizziamo solo materiali con certificazione CE e di prima scelta.",
  },
];

const processoSteps = [
  {
    n: "01",
    titolo: "Stima orientativa gratuita",
    testo: "Usi il calcolatore e ottieni una forbice di costo basata sul Prezzario Regionale Campania. Se è nel tuo range, vai avanti.",
  },
  {
    n: "02",
    titolo: "Sopralluogo tecnico",
    testo: "Il nostro tecnico visita l'immobile, verifica impianti e strutture, rileva le criticità specifiche.",
  },
  {
    n: "03",
    titolo: "Preventivo dettagliato",
    testo: "Ricevi un documento scritto con prezzi unitari, materiali specificati, tempistiche e condizioni di garanzia.",
  },
];

const faqHome = [
  {
    q: "Le stime del calcolatore sono vincolanti?",
    a: "No. Sono stime orientative basate sul Prezzario Regionale Campania. Servono a capire se l'intervento è nel tuo range di budget. Il prezzo definitivo emerge solo dal sopralluogo.",
  },
  {
    q: "Il sopralluogo è gratuito?",
    a: "Sì, il primo sopralluogo orientativo è gratuito e senza impegno.",
  },
  {
    q: "Operate solo nell'Agro Aversano?",
    a: "No, operiamo in 33 comuni tra Napoli e provincia, Caserta e provincia e Agro Aversano.",
  },
  {
    q: "Posso usare il Bonus Ristrutturazione 50%?",
    a: "Sì, la detrazione IRPEF al 50% si applica agli interventi di manutenzione straordinaria su immobili residenziali. Il nostro ufficio supporta la gestione della pratica.",
  },
];

export default function HomePage() {
  const dataAggiornamento = getDataAggiornamento();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920"
            alt="Ristrutturazione casa Napoli Caserta Agro Aversano"
            fill
            className="object-cover opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
        </div>

        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-orange/20 text-orange px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Check className="h-4 w-4" />
                Prezzario Campania aggiornato a {dataAggiornamento} · 33 comuni
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                Ristrutturazioni nell&apos;
                <span className="text-orange">Agro Aversano</span>,{" "}
                <span className="text-orange">Napoli</span> e{" "}
                <span className="text-orange">Caserta</span>
              </h1>
              <p className="text-lg text-white/75 mb-8 max-w-xl leading-relaxed">
                Stima orientativa gratuita basata sul Prezzario Regionale Campania.
                Nessun prezzo inventato — quello definitivo emerge dal sopralluogo.
                Russo FE Costruzione SRL.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="https://wa.me/393339809319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-semibold transition-colors flex items-center gap-2"
                >
                  Scrivici su WhatsApp
                  <ArrowRight className="h-5 w-5" />
                </a>
                <Link
                  href="/servizi/"
                  className="bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 rounded-xl font-semibold transition-colors"
                >
                  Vedi i Servizi
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-white/60">
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-orange" /> Garanzia decennale</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-orange" /> Materiali certificati CE</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-orange" /> Bonus 50% applicabile</span>
              </div>
            </div>

            <div className="lg:pl-4">
              <CalcolatoreStima />
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS ── */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-7 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="h-13 w-13 rounded-xl bg-orange/10 flex items-center justify-center mb-4 p-3 w-fit">
                  <f.icon className="h-7 w-7 text-orange" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVIZI ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-orange text-sm font-semibold uppercase tracking-widest mb-2">Cosa facciamo</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">I Nostri Servizi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              7 servizi di ristrutturazione residenziale. Ogni pagina servizio include
              costi orientativi, criticità locali e FAQ specifiche per ogni comune.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servizi.map((s) => (
              <Link
                key={s.slug}
                href={`/servizi/${s.slug}/`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={s.immagine}
                    alt={s.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-white font-bold text-base leading-tight">{s.titolo}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{s.descrizione}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange font-semibold text-sm">
                      Da {s.prezzoMq.base} €/mq orientativo
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
              className="inline-flex items-center gap-2 bg-navy hover:bg-navy/90 text-white px-7 py-3.5 rounded-xl font-semibold transition-colors"
            >
              Tutti i servizi <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── IL PROCESSO ── */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-orange text-sm font-semibold uppercase tracking-widest mb-2">Come funziona</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">3 passaggi, nessuna sorpresa</h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Dalla prima ricerca al cantiere. Il prezzo definitivo non si inventa — emerge dai fatti.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {processoSteps.map((s) => (
              <div key={s.n} className="text-center">
                <p className="text-6xl font-black text-white/10 mb-3 leading-none">{s.n}</p>
                <h3 className="text-lg font-bold text-white mb-3">{s.titolo}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.testo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZONE SERVITE ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-orange text-sm font-semibold uppercase tracking-widest mb-2">Dove operiamo</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">33 Comuni Serviti</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Clicca sul tuo comune per vedere costi orientativi, criticità locali e FAQ specifiche.
            </p>
          </div>

          {[
            { titolo: "Agro Aversano", lista: comuniAgroAversano },
            { titolo: "Napoli e provincia", lista: comuniNapoli },
            { titolo: "Caserta e provincia", lista: comuniCaserta },
          ].map((zona) => (
            <div key={zona.titolo} className="mb-10">
              <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange" />
                {zona.titolo}
              </h3>
              <div className="flex flex-wrap gap-2">
                {zona.lista.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/comune/${c.slug}/`}
                    className="bg-white hover:bg-navy hover:text-white text-navy px-4 py-2 rounded-lg shadow-sm transition-colors text-sm font-medium border border-gray-100"
                  >
                    {c.nome}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center">
            <Link
              href="/zone-servite/"
              className="inline-flex items-center gap-2 text-orange hover:text-orange-600 font-semibold transition-colors"
            >
              Vedi tutte le zone servite <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-orange text-sm font-semibold uppercase tracking-widest mb-2">Domande frequenti</p>
            <h2 className="text-3xl font-bold text-navy">Le domande più comuni</h2>
          </div>
          <div className="space-y-3">
            {faqHome.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-navy text-sm pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-orange flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINALE ── */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Vuoi sapere quanto costa la tua ristrutturazione?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Parti dalla stima gratuita. Se la forbice è nel tuo range,
            organizziamo il sopralluogo e prepariamo il preventivo dettagliato.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/393339809319"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Scrivici su WhatsApp
            </a>
            <a
              href="tel:+393339809319"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              Chiama +39 333 980 9319
            </a>
          </div>
          <p className="text-white/40 text-xs mt-6">
            Russo FE Costruzione SRL · Lusciano (CE) · P.IVA 04836230617
          </p>
        </div>
      </section>

    </div>
  );
}
