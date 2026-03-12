import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { comuni, getComuneBySlug } from "@/data/comuni";
import CalcolatoreStima from "@/components/shared/CalcolatoreStima";
import { getDataAggiornamento } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

const serviziList = [
  { slug: "ristrutturazione-appartamento-completo", title: "Ristrutturazione Appartamento", price: "550" },
  { slug: "ristrutturazione-cucina", title: "Ristrutturazione Cucina", price: "400" },
  { slug: "ristrutturazione-bagno", title: "Ristrutturazione Bagno", price: "450" },
  { slug: "rifacimento-tetto", title: "Rifacimento Tetto", price: "80" },
  { slug: "pavimenti-rivestimenti", title: "Pavimenti e Rivestimenti", price: "60" },
  { slug: "impianti-elettrici-idraulici-termici", title: "Impianti", price: "150" },
  { slug: "cappotto-termico", title: "Cappotto Termico", price: "80" },
];

export async function generateStaticParams() {
  return comuni.map((comune) => ({ slug: comune.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);

  if (!comune) return { title: "Comune non trovato" };

  const title = `Ristrutturazione a ${comune.nome} | Stima Gratuita Immediata 2026`;
  const description = `Stima indicativa immediata e gratuita per ristrutturare casa a ${comune.nome}. Se è in linea col budget, richiedi il preventivo dettagliato. Russo FE Costruzione SRL — 7 servizi, garanzia decennale.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://ristrutturazionepreventivi.it/comune/${slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `https://ristrutturazionepreventivi.it/comune/${slug}/`,
      images: [
        {
          url: comune.immagine,
          width: 1200,
          height: 630,
          alt: `Ristrutturazione a ${comune.nome}`,
        },
      ],
    },
  };
}

export default async function ComunePage({ params }: Props) {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  const dataAggiornamento = getDataAggiornamento();

  if (!comune) notFound();

  const vicini = comune.vicini
    .map((v) => getComuneBySlug(v))
    .filter(Boolean)
    .slice(0, 6);

  // Comuni per link interni quando vicini è vuoto
  const altriComuni = comuni
    .filter((c) => c.slug !== comune.slug)
    .slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://ristrutturazionepreventivi.it/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Zone Servite",
            item: "https://ristrutturazionepreventivi.it/zone-servite/",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `Ristrutturazioni ${comune.nome}`,
            item: `https://ristrutturazionepreventivi.it/comune/${comune.slug}/`,
          },
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `https://ristrutturazionepreventivi.it/comune/${comune.slug}/#business`,
        name: "Russo FE Costruzione SRL",
        url: `https://ristrutturazionepreventivi.it/comune/${comune.slug}/`,
        image: comune.immagine,
        description: `Ristrutturazioni a ${comune.nome}: stima indicativa immediata e gratuita. Se in linea col budget, richiedi il preventivo dettagliato. Garanzia decennale.`,
        telephone: "+393339809319",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Viale della Libertà 3",
          addressLocality: "Lusciano",
          addressRegion: "CE",
          postalCode: "81030",
          addressCountry: "IT",
        },
        areaServed: { "@type": "City", name: comune.nome },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "8",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `Quanto costa ristrutturare casa a ${comune.nome}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Una ristrutturazione completa a ${comune.nome} parte da 550€/mq (base), 750€/mq (standard), 950€/mq (premium). Bagno da 450€/mq, cucina da 400€/mq. Offriamo stima indicativa immediata e gratuita — se è in linea col budget, puoi richiedere un preventivo dettagliato.`,
            },
          },
          {
            "@type": "Question",
            name: `Come funziona la stima gratuita a ${comune.nome}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Usa il calcolatore sul sito o scrivici su WhatsApp con tipo di intervento e misure approssimative. Ricevi subito una stima indicativa gratuita. Se è in linea col tuo budget, puoi richiedere un preventivo dettagliato con sopralluogo — senza alcun impegno.`,
            },
          },
          {
            "@type": "Question",
            name: `Operate a ${comune.nome}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Sì, operiamo regolarmente a ${comune.nome} e nei comuni limitrofi dell'Agro Aversano, Napoli e Caserta. Contattaci su WhatsApp per una stima immediata e gratuita.`,
            },
          },
          {
            "@type": "Question",
            name: `Quanto tempo ci vuole per ristrutturare a ${comune.nome}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Un bagno richiede 2–3 settimane, una cucina 2–4 settimane, un appartamento completo 6–12 settimane. Rispettiamo sempre i tempi concordati contrattualmente.`,
            },
          },
          {
            "@type": "Question",
            name: `Offrite garanzia sui lavori a ${comune.nome}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Sì, garanzia decennale su tutti i lavori strutturali. Utilizziamo solo materiali certificati CE di prima qualità.`,
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={comune.immagine}
          alt={`Ristrutturazione a ${comune.nome}`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            {/* Breadcrumb visuale */}
            <nav aria-label="breadcrumb" className="mb-3">
              <ol className="flex items-center gap-2 text-sm text-white/60">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-white/40">/</li>
                <li>
                  <Link href="/zone-servite" className="hover:text-white transition-colors">
                    Zone Servite
                  </Link>
                </li>
                <li className="text-white/40">/</li>
                <li className="text-white/80">{comune.nome}</li>
              </ol>
            </nav>

            <div className="flex items-center gap-2 text-white/80 mb-2">
              <MapPin className="h-5 w-5" />
              <span>
                Provincia di{" "}
                {comune.provincia === "napoli" ? "Napoli" : "Caserta"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ristrutturazione a {comune.nome}
            </h1>

            <a
              href="#calcolatore"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors text-lg shadow-lg mt-2"
            >
              Stima gratuita immediata
              <ArrowRight className="h-5 w-5" />
            </a>

            <div className="inline-flex items-center gap-2 bg-orange/20 text-orange backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mt-4 ml-4">
              <Check className="h-4 w-4" />
              Costi aggiornati a {dataAggiornamento}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* ── MAIN ── */}
            <div className="lg:col-span-2 space-y-12">

              {/* Descrizione */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Ristrutturazioni a {comune.nome}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  {comune.descrizione}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Il nostro processo è semplice:{" "}
                  <strong>ottieni una stima indicativa immediata e gratuita</strong>{" "}
                  tramite il calcolatore qui a fianco o su WhatsApp con il tipo di
                  intervento e le misure approssimative. Se la stima è in linea con
                  il tuo budget, puoi richiedere un{" "}
                  <strong>preventivo dettagliato</strong> con sopralluogo — senza
                  alcun impegno.
                </p>
              </div>

              {/* Caratteristiche territorio */}
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Caratteristiche del Territorio
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {comune.caratteristiche}
                </p>
              </div>

              {/* Perché sceglierci */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Perché Scegliere Russo FE Costruzione SRL a {comune.nome}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Stima indicativa immediata e gratuita",
                    "Preventivo dettagliato su richiesta",
                    "Conoscenza delle caratteristiche locali",
                    "Materiali di qualità certificata",
                    "Pratiche e permessi edilizi",
                    "Garanzia decennale sui lavori strutturali",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-4 w-4 text-orange" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Servizi */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Servizi Disponibili a {comune.nome}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {serviziList.map((servizio) => (
                    <Link
                      key={servizio.slug}
                      href={`/servizi/${servizio.slug}/`}
                      className="bg-white p-4 rounded-xl border border-gray-200 hover:border-orange transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-navy group-hover:text-orange transition-colors">
                          {servizio.title}
                        </span>
                        <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-orange transition-colors" />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Da {servizio.price} €/mq
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Prezzi */}
              <div className="bg-navy/5 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Prezzi Indicativi 2026 a {comune.nome}
                </h2>
                <p className="text-gray-600 mb-6">
                  Ecco i prezzi indicativi per una ristrutturazione completa a{" "}
                  {comune.nome}. I prezzi variano in base al livello di finitura
                  scelto. Usa il calcolatore per una{" "}
                  <strong>stima immediata e gratuita</strong> — se è in linea col
                  tuo budget, puoi richiedere un preventivo dettagliato.
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

              {/* Testimonianze */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Cosa Dicono i Nostri Clienti a {comune.nome}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Mario R.",
                      text: "Ottimo lavoro, professionalità e puntualità. Consigliatissimi!",
                    },
                    {
                      name: "Laura B.",
                      text: "Hanno ristrutturato il mio bagno in tempi record. Risultato eccellente.",
                    },
                  ].map((testimonial, i) => (
                    <div
                      key={i}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                    >
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, j) => (
                          <svg
                            key={j}
                            className="h-4 w-4 text-orange fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 italic mb-4">
                        &ldquo;{testimonial.text}&rdquo;
                      </p>
                      <p className="font-semibold text-navy">{testimonial.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Domande Frequenti — Ristrutturazioni a {comune.nome}
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      domanda: `Quanto costa ristrutturare casa a ${comune.nome}?`,
                      risposta: `Una ristrutturazione completa parte da 550€/mq (base), 750€/mq (standard), 950€/mq (premium). Bagno da 450€/mq, cucina da 400€/mq. Usa il calcolatore per una stima indicativa immediata e gratuita — se è in linea col budget, richiedi il preventivo dettagliato.`,
                    },
                    {
                      domanda: `Come funziona la stima gratuita?`,
                      risposta: `Usa il calcolatore qui a fianco o scrivici su WhatsApp con tipo di intervento e misure approssimative. Ricevi subito una stima indicativa gratuita. Se è in linea col tuo budget, puoi richiedere un preventivo dettagliato con sopralluogo — senza alcun impegno.`,
                    },
                    {
                      domanda: `Quanto tempo ci vuole per ristrutturare?`,
                      risposta: `Un bagno richiede 2–3 settimane, una cucina 2–4 settimane, un appartamento completo 6–12 settimane. Rispettiamo sempre i tempi concordati contrattualmente.`,
                    },
                    {
                      domanda: `Offrite garanzia sui lavori?`,
                      risposta: `Sì, garanzia decennale su tutti i lavori strutturali. Utilizziamo solo materiali certificati CE di prima qualità.`,
                    },
                  ].map((faq, i) => (
                    <details key={i} className="group bg-gray-50 rounded-xl">
                      <summary className="flex justify-between items-center cursor-pointer p-5 font-semibold text-navy list-none">
                        {faq.domanda}
                        <span className="ml-4 text-orange text-xl group-open:rotate-45 transition-transform">
                          +
                        </span>
                      </summary>
                      <p className="px-5 pb-5 text-gray-600">{faq.risposta}</p>
                    </details>
                  ))}
                </div>
              </div>

            </div>

            {/* ── SIDEBAR CALCOLATORE ── */}
            <div className="lg:col-span-1">
              <div id="calcolatore" className="sticky top-24">
                <CalcolatoreStima />

                {/* WhatsApp CTA sotto calcolatore */}
                <div className="mt-6 bg-navy rounded-2xl p-6 text-center">
                  <p className="text-white font-semibold mb-2">
                    Stima in linea col budget?
                  </p>
                  <p className="text-white/70 text-sm mb-4">
                    Richiedi il preventivo dettagliato
                  </p>
                  <a
                    href="https://wa.me/393339809319"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-orange hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Scrivici su WhatsApp
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── COMUNI VICINI ── sempre visibile */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-navy mb-6 text-center">
            Operiamo anche in questi comuni
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {(vicini.length > 0 ? vicini : altriComuni).map((v) => (
              <Link
                key={v!.slug}
                href={`/comune/${v!.slug}/`}
                className="bg-white hover:bg-navy hover:text-white text-navy px-5 py-3 rounded-xl shadow-sm transition-colors font-medium text-sm"
              >
                Ristrutturazioni a {v!.nome}
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/zone-servite"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Vedi tutti i 33 comuni
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA FINALE ── */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto a ristrutturare a {comune.nome}?
          </h2>
          <p className="text-white/80 text-lg mb-2 max-w-2xl mx-auto">
            Ottieni una stima indicativa immediata e gratuita, senza sopralluogo
            e senza impegno.
          </p>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Se la stima è in linea con il tuo budget, puoi richiedere un
            preventivo dettagliato.
          </p>
          <a
            href="https://wa.me/393339809319"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-semibold transition-colors text-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Scrivici su WhatsApp
          </a>
          <p className="text-white/40 text-sm mt-4">
            Costi aggiornati a {dataAggiornamento}
          </p>
        </div>
      </section>
    </div>
  );
}
