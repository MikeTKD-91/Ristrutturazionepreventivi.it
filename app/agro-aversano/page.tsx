// app/agro-aversano/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, TriangleAlert, CheckCircle } from "lucide-react";
import { comuniAgroAversano } from "@/data/comuni";
import ScopriIlCostoDellaTuaRistrutturazione from "@/components/shared/ScopriIlCostoDellaTuaRistrutturazione";

export const metadata: Metadata = {
  title: "Ristrutturazione Agro Aversano | Costi Reali e Preventivo",
  description:
    "Ristrutturazione nell'Agro Aversano: indicazioni di costo, criticità tipiche del territorio, sopralluogo tecnico e preventivo verificato. Russo FE Costruzione SRL.",
  alternates: {
    canonical: "https://ristrutturazionepreventivi.it/agro-aversano/",
  },
  openGraph: {
    title: "Ristrutturazione Agro Aversano | Costi Reali e Preventivo",
    description:
      "Indicazioni di costo per ristrutturazioni nell'Agro Aversano, con verifica tecnica e sopralluogo.",
    url: "https://ristrutturazionepreventivi.it/agro-aversano/",
    siteName: "ristrutturazionepreventivi.it",
    locale: "it_IT",
    images: [
      {
        url: "https://ristrutturazionepreventivi.it/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ristrutturazione Agro Aversano - Russo FE Costruzione SRL",
      },
    ],
  },
};

const CRITICITA_ZONA = [
  {
    titolo: "Canne fumarie in amianto",
    testo:
      "Diffuse nei condomini degli anni '60-'70 di Aversa e dei comuni limitrofi. Rimozione obbligatoria prima di qualsiasi intervento su cucine e bagni collegati.",
  },
  {
    titolo: "Umidità di risalita nelle villette anni '80",
    testo:
      "Fondazioni senza barriera impermeabilizzante nelle costruzioni private degli anni '80-'90. Frequente nei piani terra di Lusciano, Carinaro, Teverola e Casaluce.",
  },
  {
    titolo: "Abusi edilizi non condonati",
    testo:
      "Verande, locali seminterrati e soppalchi non regolarizzati nelle zone di espansione privata degli anni '90. Verifica catastale necessaria prima di pratiche edilizie.",
  },
  {
    titolo: "Vincoli centro storico ad Aversa",
    testo:
      "Il nucleo normanno di Aversa è soggetto a vincoli della Soprintendenza. Alcuni interventi esterni richiedono autorizzazione preventiva.",
  },
];

const SERVIZI = [
  { label: "Ristrutturazione Bagno", prezzo: "da 5.000 € completo" },
  { label: "Ristrutturazione Cucina", prezzo: "preventivo su sopralluogo" },
  { label: "Ristrutturazione Appartamento", prezzo: "da 550 €/mq" },
  { label: "Rifacimento Tetto", prezzo: "preventivo su sopralluogo" },
  { label: "Cappotto Termico", prezzo: "preventivo su sopralluogo" },
  { label: "Impianti", prezzo: "preventivo dopo verifica tecnica" },
  { label: "Pavimenti e Rivestimenti", prezzo: "da 45 €/mq" },
];

export default function AgroAversanoPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="bg-navy py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="text-sm text-white/50 mb-6 flex flex-wrap gap-1 items-center">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/80">Agro Aversano</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-orange" />
                <p className="text-orange text-sm font-semibold uppercase tracking-widest">
                  Zona operativa · Agro Aversano
                </p>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                Ristrutturazione nell'Agro Aversano:{" "}
                <span className="text-orange">Indicazioni di costo e verifica tecnica</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Operiamo in 14 comuni dell'Agro Aversano con conoscenza diretta del
                patrimonio edilizio locale: dagli edifici storici di Aversa alle villette
                degli anni '80 di Lusciano, Carinaro e Teverola. Prezzi orientativi basati
                sul Prezzario Regionale Campania, mai inventati.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {["Prezzario Regionale Campania", "Lavori concordati", "14 comuni serviti"].map((t) => (
                  <span key={t} className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
              <a
                href="#modulo di stima"
                className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Richiedi una prima stima
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {[
                { n: "14", label: "Comuni serviti" },
                { n: "7", label: "Servizi disponibili" },
                { n: "10 anni", label: "Garanzia lavori" },
                { n: "Tecnica", label: "Verifica iniziale" },
              ].map((s) => (
                <div key={s.label} className="bg-white/10 rounded-2xl p-5 text-center">
                  <p className="text-2xl font-black text-orange mb-1">{s.n}</p>
                  <p className="text-white/70 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modulo di stima mobile */}
      <div id="modulo di stima" className="lg:hidden px-4 pt-6">
        <ScopriIlCostoDellaTuaRistrutturazione comuneDefault="Aversa" />
      </div>

      {/* ── CORPO ── */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10 items-start">
        <div className="lg:col-span-2 space-y-16">

          {/* PATRIMONIO EDILIZIO */}
          <section>
            <h2 className="text-2xl font-bold text-navy mb-2">
              Il patrimonio edilizio dell'Agro Aversano
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              L'Agro Aversano è un territorio edilizio eterogeneo. Il comune capofila,
              Aversa, ha un centro storico normanno con vincoli della Soprintendenza e
              una corona di espansione degli anni '70-'90. I comuni limitrofi — Lusciano,
              Carinaro, Teverola, Casaluce, Succivo e gli altri — mostrano un pattern
              prevalente di villette unifamiliari e case a schiera degli anni '80-'00,
              con nuclei storici più contenuti.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Questa doppia natura — storico e recente — genera criticità specifiche che
              chi non opera abitualmente nella zona tende a sottovalutare. Le conosciamo
              perché siamo qui: la nostra sede è a Lusciano.
            </p>
          </section>

          {/* CRITICITÀ ZONA */}
          <section>
            <h2 className="text-2xl font-bold text-navy mb-2">
              Criticità tipiche del territorio
            </h2>
            <p className="text-gray-600 mb-6">
              Questi problemi emergono sistematicamente nei cantieri dell'Agro Aversano.
              Conoscerli prima del sopralluogo permette stime più accurate e meno sorprese.
            </p>
            <div className="space-y-4">
              {CRITICITA_ZONA.map((c) => (
                <div key={c.titolo} className="flex gap-4 items-start bg-amber-50 border border-amber-100 rounded-xl p-5">
                  <TriangleAlert className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-navy text-sm mb-1">{c.titolo}</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{c.testo}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PREZZI */}
          <section>
            <h2 className="text-2xl font-bold text-navy mb-2">
              Indicazioni di costo nell'Agro Aversano
            </h2>
            <p className="text-gray-600 mb-1">
              Valori basati sul <strong>Prezzario Regionale Campania</strong>.
              Il costo definitivo emerge solo dal sopralluogo.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Ogni servizio ha una pagina dedicata per ogni comune con tabelle costi dettagliate,
              tempistiche reali e FAQ specifiche.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              {SERVIZI.map((s) => (
                <div key={s.label} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                  <p className="font-medium text-navy text-sm">{s.label}</p>
                  <p className="text-sm text-orange font-semibold">{s.prezzo}</p>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <TriangleAlert className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900">
                <strong>Questi valori non costituiscono un preventivo vincolante.</strong>{" "}
                Servono a capire se la spesa è in linea con il tuo budget.
                Il preventivo finale richiede sopralluogo e verifica tecnica.
              </p>
            </div>
          </section>

          {/* COMUNI */}
          <section>
            <h2 className="text-2xl font-bold text-navy mb-2">
              Comuni serviti nell'Agro Aversano
            </h2>
            <p className="text-gray-600 mb-6">
              Ogni comune ha una pagina dedicata con indicazioni di costo specifiche,
              criticità locali e FAQ.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {comuniAgroAversano.map((comune) => (
                <Link
                  key={comune.slug}
                  href={`/comune/${comune.slug}/`}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-orange/50 hover:bg-orange/5 transition-colors group"
                >
                  <MapPin className="h-4 w-4 text-orange flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy text-sm group-hover:text-orange transition-colors">
                      {comune.nome}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{comune.tipoEdilizio}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-orange transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>

          {/* PROCESSO */}
          <section>
            <h2 className="text-2xl font-bold text-navy mb-2">Come funziona</h2>
            <p className="text-gray-600 mb-8">Tre passaggi, nessuna sorpresa.</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { n: "01", t: "Richiedi una prima stima", d: "Usi il modulo di stima o ci scrivi su WhatsApp per ricevere una prima indicazione del costo e capire se la spesa è in linea con il tuo budget. Il preventivo finale si definisce dopo verifica tecnica e sopralluogo." },
                { n: "02", t: "Sopralluogo tecnico", d: "Il nostro tecnico visita l'immobile. Verifica impianti, strutture e criticità specifiche dell'Agro Aversano: solo così il preventivo è affidabile." },
                { n: "03", t: "Preventivo scritto", d: "Prezzi unitari, materiali specificati, tempistiche e garanzia decennale. Tutto nero su bianco prima di iniziare." },
              ].map((s) => (
                <div key={s.n}>
                  <p className="text-5xl font-black text-gray-100 mb-3 leading-none">{s.n}</p>
                  <h3 className="text-base font-bold text-navy mb-2">{s.t}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* ── SIDEBAR ── */}
        <div className="hidden lg:block">
          <div id="modulo di stima" className="sticky top-6 space-y-6">
            <ScopriIlCostoDellaTuaRistrutturazione comuneDefault="Aversa" />
            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="text-sm font-semibold text-navy mb-4">Perché scegliere noi</p>
              <div className="space-y-3">
                {[
                  "Sede a Lusciano: conosciamo il territorio",
                  "Prezzi da Prezzario Regionale Campania",
                  "Lavori concordati",
                  "Materiali certificati CE",
                  "Supporto pratiche Bonus 50%",
                  "Sopralluogo tecnico su appuntamento",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="h-4 w-4 text-orange flex-shrink-0 mt-0.5" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA FINALE ── */}
      <section className="bg-navy py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Vuoi sapere quanto costa ristrutturare nell'Agro Aversano?
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Parti da una prima stima. Se il quadro economico è compatibile con il tuo intervento, organizziamo il sopralluogo e prepariamo una proposta tecnica chiara.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/393339809319?text=Salve%2C%20vorrei%20un%20preventivo%20per%20una%20ristrutturazione%20nell%27Agro%20Aversano"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-center"
            >
              Parla con noi su WhatsApp
            </a>
            <a
              href="tel:+393339809319"
              className="bg-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors text-center"
            >
              Chiama +39 333 980 9319
            </a>
          </div>
          <p className="text-white/40 text-xs mt-6">
            Russo FE Costruzione SRL · Viale della Libertà 3, Lusciano (CE)
          </p>
        </div>
      </section>
    </main>
  );
}
