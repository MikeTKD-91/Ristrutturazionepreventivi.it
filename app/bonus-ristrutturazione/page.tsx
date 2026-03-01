import { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Percent, Home, Zap, Shield, AlertTriangle } from "lucide-react";
import CalcolatoreStima from "@/components/shared/CalcolatoreStima";
import { getDataAggiornamento } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bonus Ristrutturazione 2026 | Detrazioni Fiscali",
  description: "Guida completa ai bonus ristrutturazione 2026: Bonus Ristrutturazioni 50%, Ecobonus, Sismabonus. Detrazioni IRPEF in 10 anni.",
  alternates: {
    canonical: "https://ristrutturazionepreventivi.it/bonus-ristrutturazione/",
  },
  openGraph: {
    title: "Bonus Ristrutturazione 2026 | Detrazioni Fiscali",
    description: "Guida completa ai bonus ristrutturazione 2026: Bonus Ristrutturazioni, Ecobonus, Sismabonus.",
    url: "https://ristrutturazionepreventivi.it/bonus-ristrutturazione/",
    images: [
      {
        url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200",
        width: 1200,
        height: 630,
        alt: "Bonus Ristrutturazione",
      },
    ],
  },
};

const bonusList = [
  {
    icon: Home,
    title: "Bonus Ristrutturazioni",
    percentage: "50%",
    description: "Detrazione IRPEF del 50% per interventi di recupero del patrimonio edilizio.",
    limit: "96.000 €",
    duration: "10 anni",
    examples: [
      "Ristrutturazione completa appartamento",
      "Rifacimento bagno e cucina",
      "Sostituzione infissi",
      "Tinteggiature e finiture",
    ],
  },
  {
    icon: Zap,
    title: "Ecobonus",
    percentage: "50-65%",
    description: "Detrazione per interventi di efficienza energetica e risparmio energetico.",
    limit: "Varia per intervento",
    duration: "10 anni",
    examples: [
      "Cappotto termico (65%)",
      "Sostituzione caldaia (50%)",
      "Installazione pannelli solari (50%)",
      "Sostituzione infissi (50%)",
    ],
  },
  {
    icon: Shield,
    title: "Sismabonus",
    percentage: "75-85%",
    description: "Detrazione per interventi di miglioramento sismico degli edifici.",
    limit: "96.000 € per unità",
    duration: "5 anni",
    examples: [
      "Consolidamento strutturale",
      "Miglioramento classe sismica",
      "Interventi antisismici",
    ],
  },
];

const faqs = [
  {
    question: "Come funziona la detrazione IRPEF?",
    answer: "La detrazione IRPEF consiste in una riduzione delle tasse da pagare, ripartita in quote annuali (10 anni per Bonus Ristrutturazioni ed Ecobonus, 5 anni per Sismabonus). Non è uno sconto in fattura, ma un rimborso tramite la dichiarazione dei redditi.",
  },
  {
    question: "Quali pagamenti sono detraibili?",
    answer: "Per usufruire delle detrazioni, i pagamenti devono essere effettuati esclusivamente tramite bonifico bancario o postale 'agevolato', che riporti la causale del versamento, il codice fiscale del beneficiario e la Partita IVA del beneficiario della detrazione.",
  },
  {
    question: "Cosa succede se vendo l'immobile?",
    answer: "In caso di vendita dell'immobile, la detrazione può essere trasferita al nuovo proprietario, oppure è possibile continuare a usufruirne nella dichiarazione dei redditi. La scelta va comunicata nella dichiarazione dei redditi.",
  },
  {
    question: "Serve il permesso di costruire per usufruire dei bonus?",
    answer: "Non sempre. Per molti interventi di manutenzione ordinaria e straordinaria non è necessario il permesso di costruire, ma solo la presentazione di una CILA (Comunicazione Inizio Lavori Asseverata). Per interventi più complessi può essere richiesto il permesso di costruire.",
  },
  {
    question: "Il Superbonus 110% è ancora disponibile?",
    answer: "No, il Superbonus 110% non è più in vigore nel 2026. Le aliquote massime sono tornate ai livelli precedenti: 50% per Bonus Ristrutturazioni, 50-65% per Ecobonus e 75-85% per Sismabonus.",
  },
];

export default function BonusPage() {
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
              Bonus Ristrutturazione 2026
            </h1>
            <p className="text-xl text-white/80">
              Guida completa alle detrazioni fiscali per la ristrutturazione della casa. 
              Scopri come risparmiare sulle tasse con Bonus Ristrutturazioni, Ecobonus e Sismabonus.
            </p>
          </div>
        </div>
      </section>

      {/* Alert */}
      <section className="py-8 bg-orange/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex items-start gap-4 p-6 bg-white rounded-xl border-l-4 border-orange">
            <AlertTriangle className="h-6 w-6 text-orange flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-navy mb-2">Importante: niente Superbonus 110%</h3>
              <p className="text-gray-600">
                Nel 2026 il Superbonus 110% <strong>non è più disponibile</strong>. Le detrazioni 
                sono tornate alle aliquote standard: 50% per Bonus Ristrutturazioni, 50-65% per 
                Ecobonus e 75-85% per Sismabonus. Si tratta di detrazioni IRPEF in 10 anni, 
                non di sconti in fattura.
              </p>
            </div>
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

      {/* Bonus Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">
              I Bonus Disponibili nel 2026
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Scopri le tre principali agevolazioni fiscali per la ristrutturazione 
              e il risparmio energetico della tua casa.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {bonusList.map((bonus, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="bg-navy p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-orange/20 flex items-center justify-center">
                      <bonus.icon className="h-6 w-6 text-orange" />
                    </div>
                    <div className="text-right">
                      <span className="text-4xl font-bold text-orange">{bonus.percentage}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{bonus.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{bonus.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Limite di spesa:</span>
                      <span className="font-semibold text-navy">{bonus.limit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Durata detrazione:</span>
                      <span className="font-semibold text-navy">{bonus.duration}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-navy mb-3">Esempi di interventi:</p>
                    <ul className="space-y-2">
                      {bonus.examples.map((example, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-orange flex-shrink-0" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Come Funziona */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center">
              Come Funzionano le Detrazioni
            </h2>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange text-white flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy mb-2">Effettua i lavori</h3>
                  <p className="text-gray-600">
                    Affidati a un'impresa qualificata per la realizzazione dei lavori. 
                    Conserva tutte le fatture e la documentazione.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange text-white flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy mb-2">Paga con bonifico agevolato</h3>
                  <p className="text-gray-600">
                    I pagamenti devono essere effettuati esclusivamente tramite bonifico 
                    bancario o postale "agevolato" con causale specifica.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange text-white flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy mb-2">Dichiara nella 730 o Unico</h3>
                  <p className="text-gray-600">
                    Indica le spese sostenute nella dichiarazione dei redditi. 
                    La detrazione verrà ripartita in quote annuali.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange text-white flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy mb-2">Ricevi il rimborso</h3>
                  <p className="text-gray-600">
                    La detrazione si traduce in una riduzione delle tasse da pagare 
                    o in un rimborso se hai versato troppe tasse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center">
              Domande Frequenti
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <h3 className="font-semibold text-navy mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Vuoi Saperne di Più?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Contattaci su WhatsApp per una consulenza gratuita sui bonus ristrutturazione. 
            Ti aiuteremo a capire quali agevolazioni puoi ottenere per il tuo progetto.
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
            Chiedi Informazioni
          </a>
          <p className="text-white/50 text-sm mt-4">
            Costi aggiornati a {dataAggiornamento} - Ultimo aggiornamento: {dataAggiornamento}
          </p>
        </div>
      </section>
    </div>
  );
}