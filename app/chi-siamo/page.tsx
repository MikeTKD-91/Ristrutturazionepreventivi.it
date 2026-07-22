import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Handshake, MapPin, ShieldCheck, Users, Wrench } from "lucide-react";
import { RecensioniClienti } from "@/components/shared/RecensioniClienti";
import GalleriaLavori from "@/components/shared/GalleriaLavori";
import { getLavoriPerServizio } from "@/lib/lavori";

export const metadata: Metadata = {
  title: "Chi siamo",
  description:
    "Scopri chi c'è dietro Ristrutturazione Preventivi: impresa edile a Lusciano operativa tra Napoli, Caserta e Agro Aversano, con gestione completa della ristrutturazione.",
  alternates: {
    canonical: "https://ristrutturazionepreventivi.it/chi-siamo/",
  },
};

const puntiForza = [
  {
    icon: Wrench,
    title: "Gestione completa",
    text: "Seguiamo la ristrutturazione dall'idea iniziale fino alla realizzazione finale, coordinando le lavorazioni e riducendo stress, perdite di tempo e passaggi inutili.",
  },
  {
    icon: Users,
    title: "Rete di professionisti locali",
    text: "Collaboriamo con artigiani e professionisti della zona per gestire il progetto in modo più rapido, concreto e adatto alle esigenze reali dell'immobile.",
  },
  {
    icon: Handshake,
    title: "Preventivi competitivi",
    text: "Lavoriamo ogni giorno con fornitori e squadre operative per mantenere prezzi competitivi senza abbassare l'attenzione su materiali, posa e organizzazione del cantiere.",
  },
  {
    icon: ShieldCheck,
    title: "Un solo referente",
    text: "Per il cliente è più semplice: invece di coordinare tutto da solo, ha un unico interlocutore che segue tempi, lavorazioni e avanzamento del lavoro.",
  },
];

const numeri = [
  { valore: "Napoli + Caserta", label: "Aree in cui operiamo ogni giorno" },
  { valore: "7 servizi", label: "Interventi principali già strutturati sul sito" },
  { valore: "360°", label: "Supporto dalla progettazione alla realizzazione" },
];

const fasi = [
  {
    n: "01",
    titolo: "Ascolto e prima impostazione",
    testo: "Partiamo dalle esigenze della casa, dal budget e dall'obiettivo del cliente per capire subito la direzione del lavoro.",
  },
  {
    n: "02",
    titolo: "Verifica tecnica e organizzazione",
    testo: "Coordiniamo sopralluogo, fattibilità, priorità di intervento e figure coinvolte, così il cliente non deve rincorrere ogni singolo fornitore.",
  },
  {
    n: "03",
    titolo: "Realizzazione seguita fino alla fine",
    testo: "Dal cantiere alle finiture, seguiamo il lavoro in modo operativo per arrivare a un risultato concreto, funzionale e coerente con il progetto.",
  },
];

export default function ChiSiamoPage() {
  const lavori = getLavoriPerServizio("ristrutturazione-appartamento-completo");

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_32%),radial-gradient(circle_at_left,rgba(255,255,255,0.08),transparent_28%)]" />
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="text-white">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange">
                Chi siamo
              </p>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
                Un partner operativo per ristrutturare casa senza gestire tutto da solo
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
                Con Ristrutturazione Preventivi hai un riferimento unico per organizzare la ristrutturazione a 360 gradi: progettazione, coordinamento delle lavorazioni, rete di artigiani e professionisti della zona, fino alla realizzazione finale.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
                Operiamo tra Agro Aversano, Napoli e Caserta con un approccio pratico: aiutiamo il cliente a evitare caos, passaggi frammentati e costi poco chiari, costruendo un percorso più lineare, concreto e sostenibile.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://wa.me/393339809319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange px-6 py-3.5 font-semibold text-white transition-colors hover:bg-orange/90"
                >
                  Parla con noi su WhatsApp
                </a>
                <Link
                  href="/zone-servite/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/20"
                >
                  Dove operiamo <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {numeri.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <p className="text-2xl font-bold text-orange">{item.valore}</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange">
              Perché lavorare con noi
            </p>
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              Ti aiutiamo a ristrutturare casa in modo più semplice
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Molti clienti si trovano a dover coordinare da soli impresa, artigiani, fornitori, tempi e decisioni. Il nostro lavoro è alleggerire questo carico e trasformarlo in un processo più ordinato, controllato e chiaro.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {puntiForza.map((punto) => (
              <div key={punto.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange/10 text-orange">
                  <punto.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-navy">{punto.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{punto.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange">
              Ristrutturazione a 360°
            </p>
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              Dall'idea alla casa finita, con una filiera più coordinata
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Non ci limitiamo a eseguire un lavoro. Aiutiamo il cliente a impostare la ristrutturazione in modo completo, mettendo in relazione impresa, artigiani e professionisti del territorio.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Questo permette di progettare meglio gli spazi, realizzare gli interventi con più continuità e ottenere soluzioni competitive grazie a una rete operativa costruita nel tempo.
            </p>

            <div className="mt-6 space-y-4">
              {[
                "Un solo referente per semplificare decisioni e comunicazioni",
                "Collaborazione con professionisti e artigiani della zona",
                "Più controllo su tempi, passaggi operativi e costi",
                "Approccio concreto, pensato per case reali e budget reali",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" />
                  <p className="text-sm leading-relaxed text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-navy p-6 md:p-8 text-white shadow-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-5">
                <Clock3 className="h-6 w-6 text-orange" />
                <h3 className="mt-4 font-bold">Meno stress operativo</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Riduciamo il numero di problemi che il cliente deve gestire in prima persona durante il percorso.
                </p>
              </div>
              <div className="rounded-2xl bg-white/5 p-5">
                <MapPin className="h-6 w-6 text-orange" />
                <h3 className="mt-4 font-bold">Conoscenza del territorio</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Lavoriamo ogni giorno tra Napoli, Caserta e Agro Aversano, con una rete locale già attiva.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-widest text-orange">Il nostro approccio</p>
              <p className="mt-3 text-lg font-semibold leading-relaxed">
                Competiamo offrendo organizzazione, coordinamento e continuità operativa: in pratica, facciamo noi gran parte del lavoro che spesso il cliente si ritrova a gestire da solo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange">
              Come lavoriamo
            </p>
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              Un percorso chiaro, prima e durante il cantiere
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {fasi.map((fase) => (
              <div key={fase.n} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="mb-3 text-5xl font-black leading-none text-gray-100">{fase.n}</p>
                <h3 className="text-lg font-bold text-navy">{fase.titolo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{fase.testo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange">
              Dati aziendali e profili ufficiali
            </p>
            <h2 className="text-3xl font-bold text-navy md:text-4xl">
              Russo FE Costruzione SRL
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Ristrutturazione Preventivi è il progetto operativo online di Russo FE Costruzione SRL. In questa pagina trovi i riferimenti ufficiali dell'azienda, i contatti e i profili principali usati per comunicare con clienti e territorio.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-orange">Ragione sociale</p>
                  <p className="mt-2 text-sm font-medium text-navy">Russo FE Costruzione SRL</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-orange">Sede</p>
                  <p className="mt-2 text-sm font-medium text-navy">Viale della Libertà 3, 81030 Lusciano (CE)</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-orange">P.IVA</p>
                  <p className="mt-2 text-sm font-medium text-navy">04836230617</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-orange">Email</p>
                  <a href="mailto:info@ristrutturazionepreventivi.it" className="mt-2 block text-sm font-medium text-navy hover:text-orange transition-colors">
                    info@ristrutturazionepreventivi.it
                  </a>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-orange">Telefono / WhatsApp</p>
                  <a href="tel:+393339809319" className="mt-2 block text-sm font-medium text-navy hover:text-orange transition-colors">
                    +39 333 980 9319
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-navy p-6 text-white shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange">Profili ufficiali</p>
              <div className="mt-5 space-y-3">
                <a
                  href="https://www.facebook.com/p/Russo-FE-Costruzione-Srl-100094663447335/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <span>Facebook Russo FE Costruzione</span>
                  <span>↗</span>
                </a>
                <a
                  href="https://www.tiktok.com/@russocostruzione"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <span>TikTok Russo FE Costruzione</span>
                  <span>↗</span>
                </a>
                <a
                  href="https://share.google/ClhNE103NG7hhMwPt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <span>Google Business Profile</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-8">
        <GalleriaLavori
          lavori={lavori}
          titolo="Alcuni lavori reali"
          intro="Una selezione di immagini di lavori eseguiti nelle zone in cui operiamo. Sono utili per capire il livello delle finiture, il tipo di interventi seguiti e il nostro approccio operativo in cantiere."
          outro="Ogni casa ha esigenze diverse, ma vedere lavori reali aiuta a capire meglio come può prendere forma un progetto completo, dalla distribuzione degli spazi fino alle finiture."
        />
      </section>

      <RecensioniClienti />

      <section className="bg-navy py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange">
            Contattaci
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Vuoi progettare e realizzare la tua casa con un unico riferimento?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Se stai valutando una ristrutturazione tra Napoli, Caserta e Agro Aversano, possiamo aiutarti a impostare il lavoro in modo più chiaro, concreto e sostenibile.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/393339809319"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange px-8 py-4 font-semibold text-white transition-colors hover:bg-orange/90"
            >
              Scrivici su WhatsApp
            </a>
            <a
              href="tel:+393339809319"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/20"
            >
              Chiama +39 333 980 9319
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
