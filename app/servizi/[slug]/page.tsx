import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, MessageCircle, X } from "lucide-react";
import { servizi, getServizioBySlug } from "@/data/servizi";
import { comuni } from "@/data/comuni";
import ScopriIlCostoDellaTuaRistrutturazione from "@/components/shared/ScopriIlCostoDellaTuaRistrutturazione";
import CalcolatoreAppartamento from "@/components/shared/CalcolatoreAppartamento";
import CalcolatoreBagno from "@/components/shared/CalcolatoreBagno";
import { getDataAggiornamento, formatPrezzo, generaLinkWhatsApp } from "@/lib/utils";
import { getAllArticoli } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servizi.map((servizio) => ({
    slug: servizio.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const servizio = getServizioBySlug(slug);
  
  if (!servizio) {
    return {
      title: "Servizio non trovato",
    };
  }

  const url = `https://ristrutturazionepreventivi.it/servizi/${slug}/`;

  const seoDescription = servizio.descrizioneCard ?? servizio.descrizione;

  return {
    title: `${servizio.titolo} | preventivo e costo reale a Napoli, Caserta e Agro Aversano`,
    description: seoDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${servizio.titolo} | preventivo e costo reale`,
      description: seoDescription,
      url,
      type: "website",
      siteName: "RistrutturazionePreventivi.it",
      locale: "it_IT",
      images: [
        {
          url: servizio.immagine,
          width: 800,
          height: 600,
          alt: servizio.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${servizio.titolo} | preventivo e costo reale`,
      description: seoDescription,
      images: [servizio.immagine],
    },
  };
}

export default async function ServizioPage({ params }: Props) {
  const { slug } = await params;
  const servizio = getServizioBySlug(slug);
  const isBagno = slug === "ristrutturazione-bagno";
  const dataAggiornamento = getDataAggiornamento();

  if (!servizio) {
    notFound();
  }

  const articoliConsigliati = getAllArticoli().slice(0, 3);

  const altriServizi = servizi.filter(s => s.slug !== slug);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ristrutturazionepreventivi.it/" },
      { "@type": "ListItem", position: 2, name: "Servizi", item: "https://ristrutturazionepreventivi.it/servizi/" },
      { "@type": "ListItem", position: 3, name: servizio.titolo, item: `https://ristrutturazionepreventivi.it/servizi/${slug}/` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: servizio.titolo,
    serviceType: servizio.titolo,
    description: servizio.descrizione,
    provider: {
      "@type": "LocalBusiness",
      name: "Russo FE Costruzione SRL",
      url: "https://ristrutturazionepreventivi.it",
    },
    areaServed: [
      { "@type": "City", name: "Napoli" },
      { "@type": "City", name: "Caserta" },
      { "@type": "Place", name: "Agro Aversano" },
    ],
    url: `https://ristrutturazionepreventivi.it/servizi/${slug}/`,
  };

  if (slug === "ristrutturazione-appartamento-completo") {
    const inclusioniStandard = [
        "Rifacimento impianto elettrico, idraulico e termico",
        "Fornitura e installazione di termosifoni standard in alluminio",
        "Fornitura e posa di infissi esterni in PVC",
        "Fornitura e installazione di portoncino d'ingresso",
        "Fornitura e posa di pavimenti e rivestimenti",
        "Fornitura e posa di porte interne complete di telaio e bussole",
        "Opere murarie, sottofondi, intonaci e rasature",
        "Controsoffittatura liscia dove prevista dal progetto",
        "Fornitura e installazione dei sanitari: wc, bidet, lavabo e piatto doccia",
        "Tinteggiatura finale e finiture standard",
        "Demolizioni e smaltimento delle rimozioni previste",
      ];

    const esclusioniExtra = [
      "Pratiche edilizie, catastali e autorizzazioni eventualmente necessarie",
      "Arredi su misura, cucina ed elettrodomestici",
      "Box doccia",
      "Infissi fuori capitolato e opere non previste nel computo",
      "Adeguamenti strutturali, consolidamenti o interventi emersi dopo le demolizioni",
      "Spese condominiali, occupazione suolo pubblico e costi logistici straordinari",
      "Finiture fuori capitolato e forniture scelte dal cliente",
    ];

    const faqAppartamento = [
      {
        domanda: "Quanto costa ristrutturare un appartamento completo?",
        risposta: "Il costo per ristrutturare un appartamento completo dipende da metratura, condizioni iniziali dell’immobile, distribuzione interna, stato degli impianti e livello delle finiture scelte. Per casi standard, il riferimento da 550 euro al mq è utile per avere un primo orientamento sul budget, mentre il preventivo definitivo viene confermato dopo sopralluogo tecnico.",
      },
      {
        domanda: "Il costo da 550 euro al mq è reale?",
        risposta: "Sì, 550 euro al mq è un riferimento reale per ristrutturazioni complete in condizioni standard, con accesso agevole, impianti rifacibili senza criticità straordinarie e finiture in fascia ordinaria. Se emergono demolizioni complesse, umidità, problemi impiantistici o richieste fuori capitolato, il costo finale può cambiare dopo verifica tecnica.",
      },
      {
        domanda: "Cosa include una ristrutturazione completa di appartamento?",
        risposta: "In genere una ristrutturazione completa comprende demolizioni, rifacimento degli impianti, eventuale nuova distribuzione interna, sottofondi, posa di pavimenti e rivestimenti, tinteggiatura, installazioni finali e finiture principali. Il contenuto preciso dei lavori dipende però dal capitolato e dal tipo di immobile, quindi ogni preventivo va costruito sulle reali necessità della casa.",
      },
      {
        domanda: "Quanto dura una ristrutturazione completa?",
        risposta: "Per un appartamento standard, una ristrutturazione completa richiede in genere tra 45 e 60 giorni lavorativi. I tempi possono allungarsi in presenza di pratiche edilizie, modifiche murarie importanti, lavorazioni straordinarie, ritardi di fornitura o criticità emerse durante le demolizioni.",
      },
      {
        domanda: "Da cosa dipende il costo finale dei lavori?",
        risposta: "Il costo finale dipende soprattutto da stato dell’immobile, accessibilità del fabbricato, presenza di umidità o difetti nascosti, impianti da rifare, modifiche alla distribuzione interna e livello delle finiture richieste. Per questo il sopralluogo tecnico è fondamentale: serve a trasformare un prezzo indicativo in un preventivo coerente con il cantiere reale.",
      },
      {
        domanda: "Quando serve la CILA per ristrutturare casa?",
        risposta: "La CILA serve in molti interventi di manutenzione straordinaria, soprattutto quando si modificano impianti, tramezzi o distribuzione interna senza coinvolgere parti strutturali. Se invece i lavori interessano elementi strutturali o casi particolari, può essere necessaria una pratica diversa, come la SCIA, da verificare sempre con un tecnico prima di iniziare.",
      },
      {
        domanda: "Si può ristrutturare un appartamento in condominio?",
        risposta: "Sì, un appartamento in condominio può essere ristrutturato, ma bisogna considerare accessi, orari di lavoro, tutela delle parti comuni, rumori, gestione dei materiali e regolamento condominiale. Quando il cantiere è organizzato bene fin dall’inizio, si riducono ritardi, contestazioni e problemi logistici durante i lavori.",
      },
      {
        domanda: "Il preventivo cambia dopo il sopralluogo?",
        risposta: "Il sopralluogo serve proprio a confermare il preventivo sulle condizioni reali dell’immobile. Il prezzo può cambiare solo se emergono elementi non visibili prima, come impianti molto datati, umidità, opere murarie aggiuntive, problemi strutturali o richieste extra rispetto al capitolato iniziale.",
      },
      {
        domanda: "Si possono usare le detrazioni fiscali per ristrutturare casa nel 2026?",
        risposta: "Sì, nel 2026 restano previste detrazioni fiscali per diversi interventi di ristrutturazione, con regole che dipendono dal tipo di immobile, dalla natura dei lavori e dai requisiti previsti dalla normativa aggiornata. Prima di iniziare conviene verificare con precisione quali spese rientrano e quale aliquota è applicabile al proprio caso.",
      },
      {
        domanda: "Come vengono gestiti pagamenti e avanzamento lavori?",
        risposta: "Di solito i pagamenti vengono organizzati per fasi di avanzamento lavori, con importi collegati alle lavorazioni effettivamente eseguite. Questo sistema permette di mantenere maggiore controllo sul cantiere, coordinare meglio tempi e forniture e procedere in modo trasparente fino alla chiusura dei lavori.",
      },
    ];

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqAppartamento.map((faq) => ({
        "@type": "Question",
        name: faq.domanda,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.risposta,
        },
      })),
    };

    return (
      <div className="min-h-screen bg-white">
        <section className="bg-navy py-14 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Check className="h-4 w-4 text-orange" />
                  Costi aggiornati a {dataAggiornamento}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                  Ristrutturazione Casa:{" "}
                  <span className="text-orange">preventivo immediato e costo reale</span>
                </h1>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Richiedi un preventivo immediato per la ristrutturazione di casa o appartamento e ottieni un primo costo reale del tuo intervento. Il preventivo finale viene confermato dopo sopralluogo e verifica tecnica dell’immobile.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {["Prezzario Regionale Campania", "Sopralluogo tecnico", "Stima verificabile"].map((t) => (
                    <span key={t} className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
                <a
                  href="#modulo-di-preventivo"
                  className="inline-flex items-center gap-2 bg-orange text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Richiedi un preventivo
                </a>
              </div>

              <div className="hidden lg:block relative h-72 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={servizio.immagine}
                  alt={servizio.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <div className="lg:hidden px-4 pt-6" id="modulo-di-preventivo">
          <CalcolatoreAppartamento comuneDefault="Napoli" />
        </div>

        <div className="container mx-auto px-4 py-20 grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Ristrutturazione appartamento completo</h2>
              <p className="text-gray-600">
                Richiedi un preventivo per ristrutturare il tuo appartamento completo e scopri costi, lavori inclusi, tempi di esecuzione e fattori che incidono sul prezzo finale della ristrutturazione.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Prezzo base di riferimento</h2>
              <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-orange-50 via-white to-navy/5 p-6 md:p-8 shadow-lg">
                <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange mb-3">Costo base certo</p>
                    <div className="flex items-end gap-3 flex-wrap">
                      <span className="text-5xl md:text-7xl font-black text-navy leading-none">550</span>
                      <span className="text-xl md:text-2xl font-bold text-orange pb-1">€/mq</span>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 max-w-xl">
                      Applicabile nei casi standard con accesso facilitato, gestione semplice dei materiali di risulta, piano agevole come un primo piano e condizioni operative ordinarie.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white border border-gray-200 p-5">
                    <div className="rounded-2xl border border-orange/20 bg-orange/5 p-4">
                      <p className="text-[11px] font-bold tracking-[0.14em] text-orange uppercase">Quando il costo cambia</p>
                      <p className="mt-2 text-sm text-gray-600">
                        Accessi difficili, piani più onerosi, logistica complessa, demolizioni straordinarie, impianti molto datati, umidità o finiture fuori standard.
                      </p>
                    </div>
                    <p className="mt-4 text-xs text-gray-500">
                      Il preventivo finale si conferma solo dopo verifica tecnica e sopralluogo.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-navy">Costo ristrutturazione appartamento al mq: esempi pratici</h2>
              <p className="text-gray-600 leading-relaxed">
                Se stai cercando quanto costa ristrutturare un appartamento, partire da 550 €/mq è il modo più semplice per orientarti subito. Ecco alcuni esempi di costo per diverse superfici, utili per capire la fascia di spesa e avere un primo riferimento chiaro.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-navy">
                      <th className="py-3 px-4 font-semibold">Superficie appartamento</th>
                      <th className="py-3 px-4 font-semibold">Costo indicativo da 550 €/mq</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["50 mq", "27.500 €"],
                      ["80 mq", "44.000 €"],
                      ["100 mq", "55.000 €"],
                      ["120 mq", "66.000 €"],
                      ["150 mq", "82.500 €"],
                    ].map((row) => (
                      <tr key={row[0]} className="border-t border-gray-100">
                        <td className="py-3 px-4 text-gray-700">{row[0]}</td>
                        <td className="py-3 px-4 text-gray-700">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-600 leading-relaxed">
                La tabella ti dà un’idea concreta del costo di ristrutturazione appartamento per metrature comuni, ma il prezzo definitivo dipende sempre dal caso reale. Accessibilità, impianti, demolizioni, umidità e livello delle finiture possono incidere sul preventivo finale dopo verifica tecnica.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Cosa include la ristrutturazione completa</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {inclusioniStandard.map((voce) => (
                  <div key={voce} className="flex gap-3 rounded-xl border border-green-100 bg-green-50/60 p-4">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed">{voce}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Cosa non comprende</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {esclusioniExtra.map((voce) => (
                  <div key={voce} className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <X className="h-5 w-5 text-orange mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed">{voce}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Da cosa dipende davvero il costo</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Accessibilità del fabbricato e del piano",
                  "Facilità di carico, scarico e smaltimento materiali di risulta",
                  "Stato reale degli impianti esistenti",
                  "Distribuzione interna e necessità di modifiche murarie",
                  "Presenza di umidità, difetti nascosti o lavori emersi dopo demolizione",
                  "Livello delle finiture e forniture scelte dal cliente",
                ].map((item) => (
                  <div key={item} className="bg-navy/5 p-4 rounded-xl">
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-navy">Quanto dura il cantiere</h2>
              <p className="text-gray-600 leading-relaxed">
                Capire quanto tempo serve per ristrutturare casa è importante quanto conoscere il costo dei lavori. Per questo abbiamo riassunto le principali fasi del cantiere, così puoi avere un riferimento chiaro sui tempi medi di una ristrutturazione completa.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-navy">
                      <th className="py-3 px-4 font-semibold">Fase lavori</th>
                      <th className="py-3 px-4 font-semibold">Tempo indicativo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Demolizioni e smaltimento", "4-7 giorni"],
                      ["Nuova distribuzione interna e opere murarie", "5-10 giorni"],
                      ["Realizzazione nuovi impianti", "7-12 giorni"],
                      ["Massetti, sottofondi e preparazioni", "3-5 giorni"],
                      ["Posa pavimenti e rivestimenti", "6-10 giorni"],
                      ["Rasature, tinteggiatura e finiture", "5-8 giorni"],
                      ["Montaggi finali e chiusura lavori", "3-8 giorni"],
                    ].map((row) => (
                      <tr key={row[0]} className="border-t border-gray-100">
                        <td className="py-3 px-4 text-gray-700">{row[0]}</td>
                        <td className="py-3 px-4 text-gray-700">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-600 leading-relaxed">
                In un appartamento standard, la durata complessiva dei lavori è in genere compresa tra 45 e 60 giorni lavorativi. I tempi effettivi possono cambiare in base allo stato dell’immobile, alla nuova distribuzione interna, agli impianti da rifare e al livello di finitura richiesto.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Dove operiamo</h2>
              <p className="text-gray-600 mb-4">
                Seguiamo lavori di ristrutturazione appartamenti e case a Napoli, Caserta e nei comuni dell’Agro Aversano, con sopralluoghi tecnici e preventivi costruiti sulle condizioni reali dell’immobile. Ogni intervento viene valutato considerando accessi, impianti esistenti, opere murarie, finiture e complessità del cantiere, per offrire un costo chiaro e tempi di lavoro realistici nelle principali <Link href="/zone-servite/" className="text-navy underline underline-offset-2 hover:text-orange transition-colors">zone servite</Link>.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { slug: "napoli", nome: "Napoli" },
                  { slug: "caserta", nome: "Caserta" },
                  { slug: "aversa", nome: "Aversa" },
                  { slug: "giugliano-in-campania", nome: "Giugliano in Campania" },
                  { slug: "teverola", nome: "Teverola" },
                  { slug: "trentola-ducenta", nome: "Trentola Ducenta" },
                  { slug: "melito-di-napoli", nome: "Melito di Napoli" },
                  { slug: "marcianise", nome: "Marcianise" },
                  { slug: "carinaro", nome: "Carinaro" },
                ].map((comune) => (
                  <Link
                    key={comune.slug}
                    href={`/comune/${comune.slug}/`}
                    className="bg-gray-100 hover:bg-navy hover:text-white text-navy px-3 py-1 rounded-lg text-sm transition-colors"
                  >
                    {comune.nome}
                  </Link>
                ))}
                <span className="text-gray-400 px-3 py-1 text-sm">e altri comuni serviti</span>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Domande frequenti sulla ristrutturazione completa</h2>
              <div className="space-y-4">
                {faqAppartamento.map((faq, i) => (
                  <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5">
                    <h3 className="text-base font-semibold text-navy mb-2">{faq.domanda}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{faq.risposta}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-4">Come valutare davvero un preventivo di ristrutturazione appartamento</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Un preventivo di ristrutturazione appartamento va letto oltre il solo prezzo al mq, perché il costo finale dipende sempre dalle condizioni reali dell’immobile, dalla facilità di accesso al cantiere, dallo stato degli impianti e dal livello delle finiture richieste. Il riferimento indicativo è utile per orientarsi, ma diventa davvero affidabile solo quando viene confermato da un sopralluogo tecnico capace di verificare demolizioni, distribuzione interna, opere murarie e possibili criticità non visibili in fase iniziale.
                </p>
                <p>
                  Quando si confrontano più preventivi per ristrutturare casa, conviene verificare con attenzione cosa è compreso e cosa resta escluso, quali lavorazioni sono già previste nel capitolato e se il prezzo include elementi importanti come impianti, pavimenti, rivestimenti, infissi o finiture finali. Per questo può essere utile approfondire anche interventi specifici come la <Link href="/servizi/ristrutturazione-bagno/" className="text-navy underline underline-offset-2 hover:text-orange transition-colors">ristrutturazione bagno</Link>, la <Link href="/servizi/ristrutturazione-cucina/" className="text-navy underline underline-offset-2 hover:text-orange transition-colors">ristrutturazione cucina</Link> o il rifacimento di <Link href="/servizi/impianti-elettrici-idraulici-termici/" className="text-navy underline underline-offset-2 hover:text-orange transition-colors">impianti elettrici, idraulici e termici</Link>, così da capire meglio come si forma il costo complessivo dei lavori.
                </p>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <div id="modulo-di-preventivo" className="hidden lg:block">
              <CalcolatoreAppartamento comuneDefault="Napoli" />
            </div>

            <div className="bg-navy p-6 rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-4">
                Richiedi una verifica del tuo caso
              </h3>
              <p className="text-white/80 mb-6">
                Se il tuo appartamento rientra nei parametri standard, il costo base di 550 €/mq è un riferimento reale. Se ci sono criticità o condizioni particolari, il preventivo viene ricalcolato in modo trasparente dopo il sopralluogo.
              </p>
              <a
                href={generaLinkWhatsApp(
                  servizio.titolo,
                  80,
                  "Napoli",
                  `${formatPrezzo(servizio.prezzoMq.base * 80)}`,
                  "Base"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-orange hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Parla con noi su WhatsApp
              </a>
            </div>

            <div>
              <h3 className="text-lg font-bold text-navy mb-4">Altri Servizi</h3>
              <div className="space-y-3">
                {altriServizi.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/servizi/${s.slug}/`}
                    className="flex items-center justify-between text-sm text-gray-700 hover:text-navy py-2 border-b border-gray-200 last:border-0 transition-colors"
                  >
                    {s.titoloBreve || s.titolo}<span className="text-gray-400">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <section>
              <h3 className="text-lg font-bold text-navy mb-4">Articoli da leggere prima di ristrutturare</h3>
              <p className="text-gray-600 mb-4">Guide rapide e consigli pratici dal nostro blog per pianificare il cantiere senza sorprese.</p>
              <div className="space-y-4">
                {articoliConsigliati.map((articolo) => (
                  <Link
                    key={articolo.slug}
                    href={`/blog/${articolo.slug}/`}
                    className="block overflow-hidden rounded-2xl border border-gray-200 bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={articolo.immagine}
                        alt={articolo.titolo}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-navy leading-snug mb-2">{articolo.titolo}</h4>
                      {articolo.estratto ? (
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{articolo.estratto}</p>
                      ) : null}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
            {/* Hero */}
      <section className="bg-navy py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Check className="h-4 w-4 text-orange" />
                Costi aggiornati a {dataAggiornamento}
              </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                  {servizio.titolo.split(":")[0]}:{" "}
                  <span className="text-orange">
                    {servizio.titolo.split(":")[1]?.trim() || servizio.sottotitolo}
                  </span>
                </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                {servizio.sottotitolo}
              </p>
              <a
                href="#modulo-di-preventivo"
                className="inline-flex items-center gap-2 bg-orange text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                Richiedi un preventivo
              </a>
            </div>

            <div className="hidden lg:block relative h-72 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={servizio.immagine}
                alt={servizio.alt}
                fill
                className="object-cover"
                priority
              />
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
                  Descrizione del Servizio
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-line">
                  {servizio.descrizioneLunga}
                </div>
              </div>

              {/* Caratteristiche */}
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Cosa Include
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {servizio.caratteristiche.map((car, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-orange" />
                      </div>
                      <span className="text-gray-700">{car}</span>
                    </div>
                  ))}
                </div>
              </div>

                {isBagno && (
                  <div className="bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-navy mb-6">
                      Cosa non comprende
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        "Opere extra capitolato o richieste fuori standard",
                        "Box doccia",
                        "Scaldabagno, termoarredo e accessori non previsti nel pacchetto base",
                        "Controsoffitti, faretti, nicchie su misura, velette e lavorazioni decorative",
                        "Spostamenti importanti di scarichi e colonne montanti se richiedono opere aggiuntive",
                        "Adeguamenti su murature ammalorate, umidità, sottofondi deteriorati o imprevisti emersi dopo la demolizione",
                        "Permessi, pratiche edilizie o adempimenti tecnici se necessari",
                        "Forniture extra capitolato o di fascia superiore rispetto alla dotazione base",
                      ].map((voce, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <X className="h-4 w-4 text-orange" />
                          </div>
                          <span className="text-gray-700">{voce}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}


              {/* Vantaggi */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Perché Sceglierci
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {servizio.vantaggi.map((vantaggio, i) => (
                    <div
                      key={i}
                      className="bg-navy/5 p-4 rounded-xl border-l-4 border-orange"
                    >
                      <p className="text-gray-700">{vantaggio}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prezzi */}
              {isBagno ? (
                <div>
                  <h2 className="text-2xl font-bold text-navy mb-6">
                    Costo indicativo
                  </h2>
                  <div className="bg-white border-2 border-orange p-6 rounded-xl text-center">
                    <p className="text-sm text-gray-500 mb-2">Esempio per bagno standard da 6 mq</p>
                    <p className="text-3xl font-bold text-orange">
                      Ristrutturazione bagno da 5.500 €
                    </p>
                    <p className="text-sm text-gray-500 mt-3">
                      Una base utile per orientarti. Il preventivo finale dipende da impianti, demolizioni, rivestimenti, sanitari scelti e complessità dell&apos;intervento.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-navy mb-6">
                    Prezzi Indicativi (Prezzario Regionale Campania)
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-white border-2 border-gray-200 p-6 rounded-xl text-center">
                      <p className="text-sm text-gray-500 mb-2">Finitura Base</p>
                      <p className="text-3xl font-bold text-navy">
                        {servizio.prezzoMq.base} €
                      </p>
                      <p className="text-sm text-gray-400">/mq</p>
                    </div>
                    <div className="bg-white border-2 border-orange p-6 rounded-xl text-center relative">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white text-xs px-3 py-1 rounded-full">
                        Più scelta
                      </div>
                      <p className="text-sm text-gray-500 mb-2">Finitura Standard</p>
                      <p className="text-3xl font-bold text-orange">
                        {servizio.prezzoMq.standard} €
                      </p>
                      <p className="text-sm text-gray-400">/mq</p>
                    </div>
                    <div className="bg-white border-2 border-gray-200 p-6 rounded-xl text-center">
                      <p className="text-sm text-gray-500 mb-2">Finitura Premium</p>
                      <p className="text-3xl font-bold text-navy">
                        {servizio.prezzoMq.premium} €
                      </p>
                      <p className="text-sm text-gray-400">/mq</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    * I prezzi sono indicativi e possono variare in base alle specifiche del progetto.
                    Costi aggiornati a {dataAggiornamento}.
                  </p>
                </div>
              )}

              {/* Zone */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Dove Operiamo
                </h2>
                <p className="text-gray-600 mb-4">
                  Offriamo il servizio di {servizio.titolo.toLowerCase()} nelle province di Napoli, Caserta e Agro Aversano:
                </p>
                <div className="flex flex-wrap gap-2">
                  {comuni.slice(0, 15).map((comune) => (
                    <Link
                      key={comune.slug}
                      href={`/comune/${comune.slug}/`}
                      className="bg-gray-100 hover:bg-navy hover:text-white text-navy px-3 py-1 rounded-lg text-sm transition-colors"
                    >
                      {comune.nome}
                    </Link>
                  ))}
                  <span className="text-gray-400 px-3 py-1 text-sm">e altri...</span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Modulo di preventivo */}
              {slug === "ristrutturazione-appartamento-completo" ? <CalcolatoreAppartamento comuneDefault="Napoli" /> : slug === "ristrutturazione-bagno" ? <CalcolatoreBagno comuneDefault="Napoli" /> : <ScopriIlCostoDellaTuaRistrutturazione comuneDefault="Napoli" />}

              {/* CTA */}
              <div className="bg-navy p-6 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-4">
                  Richiedi un preventivo per il tuo intervento
                </h3>
                <p className="text-white/80 mb-6">
                  Contattaci su WhatsApp per capire il costo del tuo progetto di {servizio.titolo.toLowerCase()}. Se i dati rientrano nei parametri indicati, prepariamo il preventivo e confermiamo tutto con il sopralluogo.
                </p>
                <a
                  href={generaLinkWhatsApp(
                    servizio.titolo,
                    80,
                    "Napoli",
                    `${formatPrezzo(servizio.prezzoMq.standard * 80 * 0.9)} - ${formatPrezzo(servizio.prezzoMq.standard * 80 * 1.1)}`,
                    "Standard"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-orange hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Parla con noi su WhatsApp
                </a>
              </div>

              {/* Altri Servizi */}
              <div>
                <h3 className="text-lg font-bold text-navy mb-4">Altri Servizi</h3>
                <div className="space-y-3">
                  {altriServizi.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/servizi/${s.slug}/`}
                      className="flex items-center justify-between text-sm text-gray-700 hover:text-navy py-2 border-b border-gray-200 last:border-0 transition-colors"
                    >
                      {s.titoloBreve || s.titolo}<span className="text-gray-400">→</span>
                    </Link>
                  ))}
                </div>
              </div>

              <section>
                <h3 className="text-lg font-bold text-navy mb-4">Articoli da leggere prima di ristrutturare</h3>
                <p className="text-gray-600 mb-4">Guide rapide e consigli pratici dal nostro blog per pianificare il cantiere senza sorprese.</p>
                <div className="space-y-4">
                  {articoliConsigliati.map((articolo) => (
                    <Link
                      key={articolo.slug}
                      href={`/blog/${articolo.slug}/`}
                      className="block overflow-hidden rounded-2xl border border-gray-200 bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="relative aspect-[16/10] w-full">
                        <Image
                          src={articolo.immagine}
                          alt={articolo.titolo}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-sm font-bold text-navy leading-snug mb-2">{articolo.titolo}</h4>
                        {articolo.estratto ? (
                          <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{articolo.estratto}</p>
                        ) : null}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Vuoi sapere quanto costa il tuo intervento?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Richiedi un preventivo per il tuo progetto di {servizio.titolo.toLowerCase()}. Il sopralluogo conferma misure, lavorazioni e condizioni reali dell'immobile.
          </p>
          <a
            href="https://wa.me/393339809319"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            Richiedi preventivo
          </a>
          <p className="text-gray-400 text-sm mt-4">
            Costi aggiornati a {dataAggiornamento} - Ultimo aggiornamento: {dataAggiornamento}
          </p>
        </div>
      </section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

    </div>
  );
}
