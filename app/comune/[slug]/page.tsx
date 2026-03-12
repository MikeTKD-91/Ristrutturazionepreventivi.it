import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { comuni } from "@/data/comuni";
import { servizi } from "@/data/servizi";
import CalcolatoreStima from "@/components/shared/CalcolatoreStima";
import { getDataAggiornamento } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return comuni.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const comune = comuni.find((c) => c.slug === params.slug);
  if (!comune) return {};

  const title = `Ristrutturazioni a ${comune.nome} | Stima Gratuita 2026`;
  const description = `Stima indicativa immediata e gratuita per ristrutturare casa a ${comune.nome}. Se è in linea col budget, richiedi il preventivo dettagliato. Russo FE Costruzione SRL.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://ristrutturazionepreventivi.it/comune/${comune.slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `https://ristrutturazionepreventivi.it/comune/${comune.slug}/`,
      images: [
        {
          url: comune.immagine || "https://ristrutturazionepreventivi.it/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `Ristrutturazioni a ${comune.nome}`,
        },
      ],
    },
  };
}

export default function ComunePage({ params }: Props) {
  const comune = comuni.find((c) => c.slug === params.slug);
  if (!comune) notFound();

  const dataAggiornamento = getDataAggiornamento();

  const vicini = comune.vicini
    ? comuni.filter((c) => comune.vicini!.includes(c.slug)).slice(0, 4)
    : [];

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
        image: comune.immagine || "https://ristrutturazionepreventivi.it/og-image.jpg",
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
        areaServed: {
          "@type": "City",
          name: comune.nome,
        },
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
              text: `Il costo dipende dal tipo di intervento. Una ristrutturazione completa parte da 550€/mq (base), 750€/mq (standard), 950€/mq (premium). Bagno da 450€/mq, cucina da 400€/mq. Offriamo una stima indicativa immediata e gratuita — se è in linea con il tuo budget, puoi richiedere un preventivo dettagliato con sopralluogo.`,
            },
          },
          {
            "@type": "Question",
            name: `Operate anche a ${comune.nome}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Sì, Russo FE Costruzione SRL opera regolarmente a ${comune.nome} e nei comuni limitrofi dell'Agro Aversano, Napoli e Caserta. Contattaci su WhatsApp per una stima indicativa immediata e gratuita senza impegno.`,
            },
          },
          {
            "@type": "Question",
            name: `Quanto tempo ci vuole per ristrutturare un appartamento a ${comune.nome}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Un bagno richiede mediamente 2-3 settimane, una cucina 2-4 settimane, una ristrutturazione completa di appartamento 6-12 settimane. Rispettiamo sempre i tempi concordati contrattualmente.`,
            },
          },
          {
            "@type": "Question",
            name: `Come funziona la stima gratuita a ${comune.nome}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Usa il calcolatore sul sito oppure scrivici su WhatsApp con il tipo di intervento e le misure approssimative. Ricevi una stima indicativa immediata e gratuita. Se il costo è in linea con il tuo budget, puoi richiedere un preventivo dettagliato con sopralluogo e quotazione precisa dei materiali.`,
            },
          },
          {
            "@type": "Question",
            name: `Offrite garanzia sui lavori a ${comune.nome}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Sì, garanzia decennale su tutti i lavori strutturali ai sensi della normativa italiana vigente. Utilizziamo solo materiali certificati CE di prima qualità.`,
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0">
          {comune.immagine && (
            <Image
              src={comune.immagine}
              alt={`Ristrutturazione a ${comune.nome}`}
              fill
              className="object-cover opacity-20"
              priority
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
        </div>

        <div className="relative container mx-auto px-4 py-20 md:py-28">
          {/* Breadcrumb visuale */}
          <nav aria-label="breadcrumb" className="mb-8">
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

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-orange/20 text-orange px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Costi aggiornati a {dataAggiornamento}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Ristrutturazioni a{" "}
              <span className="text-orange">{comune.nome}</span>
            </h1>

            <p className="text-xl text-white/80 mb-4 max-w-2xl">
              Ottieni una <strong>stima indicativa immediata e gratuita</strong> per
              la tua ristrutturazione a {comune.nome} — senza sopralluogo, senza impegno.
              Se la stima è in linea con il tuo budget, puoi richiedere un{" "}
              <strong>preventivo dettagliato</strong>.
            </p>

            <p className="text-white/60 mb-8 max-w-2xl">
              Appartamento completo, cucina, bagno, tetto, impianti elettrici e idraulici,
              cappotto termico. Russo FE Costruzione SRL opera nell&apos;Agro Aversano,
              Napoli e Caserta con garanzia decennale.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/393339809319"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center gap-2"
              >
                Richiedi Stima Gratis
              </a>
              <Link
                href="/servizi"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                Scopri i Servizi
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/60">
              <span>✓ Stima immediata e gratuita</span>
              <span>✓ Garanzia decennale</span>
              <span>✓ Materiali certificati</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTO SEO COMUNE ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-navy mb-6">
                Ristrutturazione Casa a {comune.nome}: cosa devi sapere
              </h2>

              <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                <p>
                  Se stai cercando un&apos;impresa edile affidabile per la
                  ristrutturazione della tua casa a{" "}
                  <strong>{comune.nome}</strong>, Russo FE Costruzione SRL è
                  il partner giusto. Operiamo regolarmente a {comune.nome} e
                  nei comuni limitrofi dell&apos;Agro Aversano, della provincia
                  di Napoli e di Caserta.
                </p>

                <p>
                  {comune.descrizione ||
                    `Il comune di ${comune.nome} è una delle zone più attive per gli interventi di ristrutturazione edilizia nella nostra area di competenza. La tipologia abitativa prevalente — appartamenti in condominio, villette bifamiliari e case indipendenti — richiede competenze specifiche che il nostro team ha maturato in anni di lavoro sul territorio.`}
                </p>

                <p>
                  I costi indicativi di ristrutturazione a{" "}
                  <strong>{comune.nome}</strong> partono da{" "}
                  <strong>550€/mq</strong> per un appartamento completo in
                  finitura base, <strong>450€/mq</strong> per un bagno e{" "}
                  <strong>400€/mq</strong> per una cucina. Tutti i prezzi
                  includono IVA, manodopera e materiali standard.
                </p>

                <p>
                  Il nostro processo è semplice:{" "}
                  <strong>
                    ottieni una stima indicativa immediata e gratuita
                  </strong>{" "}
                  tramite il calcolatore qui a fianco oppure scrivici su
                  WhatsApp con il tipo di intervento e le misure approssimative.
                  Se la stima è in linea con il tuo budget, puoi richiedere un{" "}
                  <strong>preventivo dettagliato</strong> con sopralluogo e
                  quotazione precisa dei materiali — senza alcun impegno.
                </p>
              </div>

              {/* Vantaggi */}
              <div className="mt-10 grid sm:grid-cols-2 gap-4">
                {[
                  {
                    titolo: "Stima Immediata e Gratuita",
                    testo:
                      "Ottieni una stima indicativa in pochi secondi. Se è in linea col budget, richiedi il preventivo dettagliato.",
                    icon: "💬",
                  },
                  {
                    titolo: "Garanzia Decennale",
                    testo:
                      "Tutti i lavori strutturali coperti per 10 anni ai sensi della normativa italiana.",
                    icon: "🛡️",
                  },
                  {
                    titolo: "Tempi Certi",
                    testo:
                      "Rispettiamo sempre i tempi concordati contrattualmente. Nessuna sorpresa.",
                    icon: "⏱️",
                  },
                  {
                    titolo: "Materiali Certificati",
                    testo:
                      "Solo materiali di prima qualità con certificazione CE e di prima scelta.",
                    icon: "🏆",
                  },
                ].map((v) => (
                  <div
                    key={v.titolo}
                    className="bg-gray-50 rounded-xl p-5 flex gap-4"
                  >
                    <span className="text-2xl">{v.icon}</span>
                    <div>
                      <h3 className="font-bold text-navy">{v.titolo}</h3>
                      <p className="text-sm text-gray-600">{v.testo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calcolatore sticky */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <CalcolatoreStima />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVIZI ── */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Servizi di Ristrutturazione a {comune.nome}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Offriamo una gamma completa di interventi edilizi. Clicca su un
              servizio per vedere prezzi dettagliati e caratteristiche.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servizi.map((s) => (
              <Link
                key={s.slug}
                href={`/servizi/${s.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={s.immagine}
                    alt={`${s.nome} a ${comune.nome}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-white font-bold">{s.nome}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {s.descrizioneBreve}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange font-semibold text-sm">
                      Da {s.prezzoBase}€/mq
                    </span>
                    <span className="text-navy font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Scopri →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-navy mb-10 text-center">
            Domande Frequenti — Ristrutturazioni a {comune.nome}
          </h2>

          <div className="space-y-4">
            {[
              {
                domanda: `Quanto costa ristrutturare casa a ${comune.nome}?`,
                risposta: `Il costo dipende dal tipo di intervento. Una ristrutturazione completa parte da 550€/mq (base), 750€/mq (standard), 950€/mq (premium). Bagno da 450€/mq, cucina da 400€/mq. Usa il calcolatore per una stima indicativa immediata e gratuita — se il costo è in linea con il tuo budget, potrai richiedere un preventivo dettagliato.`,
              },
              {
                domanda: `Come funziona la stima gratuita?`,
                risposta: `Usa il calcolatore sul sito o scrivici su WhatsApp con tipo di intervento e misure approssimative. Ricevi subito una stima indicativa gratuita. Se è in linea col tuo budget, puoi richiedere un preventivo dettagliato con sopralluogo e quotazione precisa — senza alcun impegno.`,
              },
              {
                domanda: `Operate regolarmente a ${comune.nome}?`,
                risposta: `Sì, operiamo regolarmente a ${comune.nome} e nei comuni limitrofi. Non serve nessun sopralluogo per ricevere la stima indicativa — basta contattarci su WhatsApp.`,
              },
              {
                domanda: `Quanto tempo ci vuole per ristrutturare un appartamento a ${comune.nome}?`,
                risposta: `Un bagno richiede 2–3 settimane, una cucina 2–4 settimane, un appartamento completo 6–12 settimane in base alla metratura. Rispettiamo sempre i tempi concordati contrattualmente.`,
              },
              {
                domanda: `Offrite garanzia sui lavori?`,
                risposta: `Sì, garanzia decennale su tutti i lavori strutturali ai sensi della normativa italiana. Utilizziamo solo materiali certificati CE di prima qualità.`,
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-gray-50 rounded-xl">
                <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-navy list-none">
                  {faq.domanda}
                  <span className="ml-4 text-orange text-xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 text-gray-600">{faq.risposta}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMUNI VICINI ── */}
      {vicini.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-navy mb-6 text-center">
              Operiamo anche nei comuni vicini a {comune.nome}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {vicini.map((v) => (
                <Link
                  key={v.slug}
                  href={`/comune/${v.slug}`}
                  className="bg-white hover:bg-navy hover:text-white text-navy px-5 py-3 rounded-xl shadow-sm transition-colors font-medium"
                >
                  Ristrutturazioni a {v.nome}
                </Link>
              ))}
              <Link
                href="/zone-servite"
                className="bg-orange hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-medium transition-colors"
              >
                Vedi tutti i 33 comuni →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA FINALE ── */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto a ristrutturare a {comune.nome}?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Ottieni una stima indicativa immediata e gratuita, senza sopralluogo
            e senza impegno. Se la stima è in linea con il tuo budget, puoi
            richiedere un preventivo dettagliato.
          </p>
          <a
            href="https://wa.me/393339809319"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-semibold transition-colors text-lg"
          >
            Scrivici su WhatsApp
          </a>
          <p className="text-white/40 text-sm mt-4">
            Costi aggiornati a {dataAggiornamento}
          </p>
        </div>
      </section>
    </>
  );
}
