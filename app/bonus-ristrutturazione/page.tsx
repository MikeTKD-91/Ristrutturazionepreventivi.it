import { Metadata } from "next";
import { Check, Home, Zap, Shield, AlertTriangle } from "lucide-react";
import ScopriIlCostoDellaTuaRistrutturazione from "@/components/shared/ScopriIlCostoDellaTuaRistrutturazione";
import { getDataAggiornamento } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Bonus Ristrutturazione 2026 | Guida Detrazioni Casa",
  description:
    "Guida chiara ai bonus casa 2026: detrazioni per ristrutturazione, efficienza energetica e interventi antisismici. Regole, aliquote e casi da verificare prima dei lavori.",
  alternates: {
    canonical: "https://ristrutturazionepreventivi.it/bonus-ristrutturazione/",
  },
  openGraph: {
    title: "Bonus Ristrutturazione 2026 | Guida Detrazioni Casa",
    description:
      "Bonus casa 2026 spiegati in modo semplice: aliquote, detrazione IRPEF, pagamenti corretti e casi particolari da controllare prima dei lavori.",
    url: "https://ristrutturazionepreventivi.it/bonus-ristrutturazione/",
    images: [
      {
        url: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200",
        width: 1200,
        height: 630,
        alt: "Guida bonus ristrutturazione 2026",
      },
    ],
  },
};

const bonusList = [
  {
    icon: Home,
    title: "Bonus Ristrutturazioni",
    percentage: "50% / 36%",
    description:
      "Detrazione fiscale per lavori di recupero edilizio, con aliquota che nel 2026 varia in base alla tipologia di immobile.",
    limit: "96.000 €",
    duration: "10 anni",
    note: "In molti casi 50% per abitazione principale e 36% per altri immobili.",
    examples: [
      "Ristrutturazione completa appartamento",
      "Rifacimento bagno e cucina",
      "Sostituzione pavimenti e rivestimenti",
      "Opere interne e manutenzione straordinaria",
    ],
  },
  {
    icon: Zap,
    title: "Ecobonus",
    percentage: "50% / 36%",
    description:
      "Agevolazione per interventi di efficientamento energetico, con aliquote e requisiti da verificare in base all'immobile e al tipo di lavoro.",
    limit: "Variabile",
    duration: "10 anni",
    note: "Nel 2026 il quadro è stato rimodulato e va verificato caso per caso.",
    examples: [
      "Sostituzione infissi",
      "Coibentazione e isolamento",
      "Schermature solari",
      "Interventi per ridurre i consumi energetici",
    ],
  },
  {
    icon: Shield,
    title: "Sismabonus",
    percentage: "50% / 36%",
    description:
      "Detrazione per interventi di riduzione del rischio sismico, con disciplina da verificare in base al tipo di immobile e all'intervento strutturale.",
    limit: "96.000 € per unità",
    duration: "10 anni",
    note: "Le condizioni effettive vanno sempre confermate con tecnico e fiscalista.",
    examples: [
      "Interventi di consolidamento",
      "Opere strutturali antisismiche",
      "Miglioramento della sicurezza dell'edificio",
    ],
  },
];

const faqs = [
  {
    question: "Come funziona la detrazione IRPEF per i lavori di ristrutturazione?",
    answer:
      "La detrazione IRPEF consente di recuperare una parte della spesa sostenuta tramite la dichiarazione dei redditi. Nella maggior parte dei casi il recupero avviene in quote annuali distribuite in 10 anni.",
  },
  {
    question: "Nel 2026 il bonus ristrutturazione è sempre al 50%?",
    answer:
      "Non sempre. Nel 2026 il quadro delle agevolazioni è stato rimodulato e, in molti casi, la detrazione è del 50% per l'abitazione principale e del 36% per gli altri immobili. La percentuale effettiva va verificata sul singolo caso.",
  },
  {
    question: "Quali pagamenti bisogna usare per non perdere la detrazione?",
    answer:
      "Per accedere alle agevolazioni è normalmente necessario usare bonifico parlante o altra modalità conforme alla normativa applicabile al bonus utilizzato. Prima di pagare conviene verificare causale, dati fiscali e documentazione richiesta.",
  },
  {
    question: "Serve una pratica edilizia per ottenere il bonus?",
    answer:
      "Dipende dal tipo di intervento. In molti casi può bastare una CILA, mentre per opere più complesse possono servire SCIA, altre autorizzazioni o verifiche urbanistiche. La pratica corretta va definita prima dell'inizio lavori.",
  },
  {
    question: "Il Superbonus 110% è ancora disponibile?",
    answer:
      "Non come agevolazione ordinaria per la generalità degli interventi. Nel 2026 il 110% resta solo in casi eccezionali e molto limitati, legati in particolare ad alcuni immobili danneggiati dal sisma nelle aree terremotate.",
  },
  {
    question: "Esistono ancora sconto in fattura e cessione del credito?",
    answer:
      "Non sono più la soluzione ordinaria per i normali lavori di ristrutturazione. In alcuni casi particolari previsti dalla normativa possono esistere eccezioni, quindi prima di impostare il lavoro è bene verificare la situazione aggiornata.",
  },
];

export default function BonusPage() {
  const dataAggiornamento = getDataAggiornamento();

  return (
    <div className="min-h-screen">
      <section className="bg-navy py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-orange/20 text-orange px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Check className="h-4 w-4" />
              Contenuti aggiornati a {dataAggiornamento}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Bonus Ristrutturazione 2026
            </h1>

            <p className="text-xl text-white/80">
              Una guida semplice per capire quali detrazioni fiscali possono
              ancora aiutarti quando ristrutturi casa nel 2026, quali regole
              verificare prima dei lavori e quali errori evitare nei pagamenti e
              nella documentazione.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-orange/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex items-start gap-4 p-6 bg-white rounded-xl border border-orange/20 shadow-sm">
            <AlertTriangle className="h-6 w-6 text-orange flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-semibold text-navy mb-2">
                Importante: il Superbonus 110% non è più la regola generale
              </h2>
              <p className="text-gray-600">
                Nel 2026 il Superbonus 110% non è più disponibile come bonus
                ordinario per la maggior parte degli interventi. Per i lavori
                più comuni si applicano le detrazioni dei bonus casa vigenti,
                con regole e percentuali che cambiano in base al tipo di
                immobile, al tipo di intervento e alla situazione del
                contribuente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <ScopriIlCostoDellaTuaRistrutturazione />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">
              Le principali agevolazioni da verificare nel 2026
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Nel 2026 non basta più parlare genericamente di bonus edilizi.
              Prima di iniziare i lavori conviene capire bene differenze,
              requisiti, limiti di spesa e documentazione richiesta.
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
                      <span className="text-3xl md:text-4xl font-bold text-orange">
                        {bonus.percentage}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{bonus.title}</h3>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">{bonus.description}</p>

                  <p className="text-sm text-navy/80 font-medium mb-6">
                    {bonus.note}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-gray-500">Limite di spesa</span>
                      <span className="font-semibold text-navy text-right">
                        {bonus.limit}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-gray-500">Recupero fiscale</span>
                      <span className="font-semibold text-navy text-right">
                        {bonus.duration}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-navy mb-3">
                      Esempi di interventi
                    </p>
                    <ul className="space-y-2">
                      {bonus.examples.map((example, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
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

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center">
              Come muoversi prima di usare un bonus casa
            </h2>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange text-white flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy mb-2">
                    Verifica il tipo di intervento
                  </h3>
                  <p className="text-gray-600">
                    Prima di parlare di detrazioni devi capire se i lavori
                    rientrano davvero tra quelli agevolabili e con quale bonus.
                    Rifare un bagno, sostituire infissi o intervenire sulla
                    struttura non seguono sempre le stesse regole.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange text-white flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy mb-2">
                    Controlla pratica edilizia e documenti
                  </h3>
                  <p className="text-gray-600">
                    In base ai lavori possono servire CILA, SCIA, asseverazioni,
                    APE, pratiche ENEA o altra documentazione tecnica. Muoversi
                    bene all'inizio evita errori che possono complicare il
                    recupero fiscale.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange text-white flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy mb-2">
                    Effettua pagamenti corretti
                  </h3>
                  <p className="text-gray-600">
                    I pagamenti devono essere coerenti con il bonus utilizzato e
                    con la documentazione fiscale richiesta. Prima di pagare
                    fatture o acconti conviene verificare modalità, causale e
                    dati da inserire.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange text-white flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy mb-2">
                    Confronta sempre tecnico, impresa e fiscalista
                  </h3>
                  <p className="text-gray-600">
                    La parte edilizia, quella urbanistica e quella fiscale devono
                    essere coerenti tra loro. Prima di contare sul bonus, è
                    sempre meglio verificare il caso concreto con i professionisti
                    che seguiranno davvero il lavoro.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center">
              Cosa sapere davvero nel 2026
            </h2>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
              <p className="text-gray-600">
                Negli anni scorsi molti utenti hanno associato i lavori di casa
                quasi esclusivamente al Superbonus. Oggi la situazione è diversa:
                per la gran parte degli interventi si ragiona sui bonus casa
                ordinari, con una disciplina più selettiva e meno automatica.
              </p>

              <p className="text-gray-600">
                Questo significa che non conviene partire dalla percentuale
                teorica, ma dal tipo di immobile, dalla natura dei lavori e dalla
                documentazione necessaria. Solo dopo si può capire quale
                agevolazione sia realmente applicabile e con quale beneficio
                fiscale.
              </p>

              <p className="text-gray-600">
                Se stai valutando una ristrutturazione a Napoli, Caserta o nei
                comuni dell'Agro Aversano, il modo più prudente è partire da una
                stima dei lavori e poi verificare con precisione bonus, pratiche
                edilizie e costi reali del cantiere.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-8 text-center">
              Domande frequenti sui bonus ristrutturazione 2026
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <h3 className="font-semibold text-navy mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Vuoi capire quali bonus verificare per il tuo intervento?
          </h2>

          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Compila la stima online o contattaci su WhatsApp. Ti aiutiamo a
            inquadrare il tipo di lavori, i costi indicativi e i bonus da
            approfondire prima di partire.
          </p>

          <a
            href="https://wa.me/393339809319"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chiedi informazioni su WhatsApp
          </a>

          <p className="text-white/50 text-sm mt-4">
            Contenuti aggiornati a {dataAggiornamento}
          </p>
        </div>
      </section>
    </div>
  );
}
