// app/comune/[slug]/page.tsx
// Fix rispetto alla versione precedente:
//   ✅ FAQ dinamiche da comuni.ts (non più hardcodate identiche per tutti)
//   ✅ Rimozione testimonials falsi (Mario R., Laura B.)
//   ✅ Title tag senza anno e senza "Stima Gratuita Immediata"
//   ✅ Prezzi con fonte Prezzario Regionale Campania + disclaimer sopralluogo
//   ✅ aggregateRating JSON-LD rimosso (era hardcodato 4.9 su tutti)
//   ✅ Sezione criticità locali dinamica da comuni.ts

import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { comuni, getComuneBySlug } from "@/data/comuni";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ─── Prezzi per livello finitura (con fonte) ──────────────────────────────────
// I valori sono orientativi e si basano sul Prezzario Regionale Campania
const PREZZI_FINITURA = [
  {
    livello: "Base",
    prezzo: "500 – 650 €/mq",
    descrizione: "Materiali di primo livello, finitura funzionale",
  },
  {
    livello: "Standard",
    prezzo: "650 – 850 €/mq",
    descrizione: "Materiali di buona qualità, il livello più richiesto",
  },
  {
    livello: "Premium",
    prezzo: "850 – 1.100 €/mq",
    descrizione: "Materiali di design, lavorazioni a più alto valore aggiunto",
  },
];

// ─── generateStaticParams ─────────────────────────────────────────────────────

export async function generateStaticParams() {
  return comuni.map((c) => ({ slug: c.slug }));
}

// ─── generateMetadata ─────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  if (!comune) return {};

  // metaTitle da comuni.ts — nessun anno, nessuna promessa commerciale aggressiva
  const title = comune.metaTitle;
  const description = comune.metaDescription;
  const url = `https://ristrutturazionepreventivi.it/comune/${comune.slug}/`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "ristrutturazionepreventivi.it",
      locale: "it_IT",
      type: "article",
    },
  };
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

function buildJsonLd(comune: NonNullable<ReturnType<typeof getComuneBySlug>>) {
  const pageUrl = `https://ristrutturazionepreventivi.it/comune/${comune.slug}/`;

  const breadcrumb = {
    "@context": "https://schema.org",
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
        name: comune.nome,
        item: pageUrl,
      },
    ],
  };

  // LocalBusiness SENZA aggregateRating hardcodata
  // Se si raccolgono recensioni reali, aggiungerla qui con dati verificati
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Russo FE Costruzione SRL",
    url: "https://ristrutturazionepreventivi.it",
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
    description: `Ristrutturazioni edilizie residenziali a ${comune.nome} e zone limitrofe. Preventivi con sopralluogo, stime orientativi gratuiti.`,
  };

  // FAQ dal campo dinamico — solo se presenti
  const faqSchema =
    comune.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: comune.faq.map((f) => ({
            "@type": "Question",
            name: f.domanda,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.risposta,
            },
          })),
        }
      : null;

  return { breadcrumb, localBusiness, faqSchema };
}

// ─── Componente CalcolatoreStima sidebar ──────────────────────────────────────

function CalcolatoreStimaSidebar({
  comune,
}: {
  comune: NonNullable<ReturnType<typeof getComuneBySlug>>;
}) {
  return (
    <div className="bg-navy rounded-2xl p-6 sticky top-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-orange mb-2">
        Stima gratuita
      </p>
      <h3 className="text-xl font-bold text-white mb-3">
        Quanto costa ristrutturare a {comune.nome}?
      </h3>
      <p className="text-sm text-white/70 mb-6">
        Stima orientativa immediata basata sul Prezzario Regionale Campania.
        Nessun impegno — il preventivo definitivo emerge dal sopralluogo.
      </p>

      {/* Il componente CalcolatoreStima reale va importato qui */}
      {/* <CalcolatoreStima comune={comune.nome} /> */}

      <a
        href={`https://wa.me/393339809319?text=Salve%2C%20vorrei%20un%20preventivo%20per%20una%20ristrutturazione%20a%20${encodeURIComponent(
          comune.nome
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full bg-orange text-white text-center font-semibold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity mb-3"
      >
        Richiedi stima su WhatsApp
      </a>
      <p className="text-xs text-white/50 text-center">
        Risposta entro poche ore · Sopralluogo gratuito
      </p>

      <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
        <div className="flex items-center gap-2 text-sm text-white/70">
          <span className="text-orange">✓</span> Garanzia decennale sui lavori
        </div>
        <div className="flex items-center gap-2 text-sm text-white/70">
          <span className="text-orange">✓</span> Materiali certificati CE
        </div>
        <div className="flex items-center gap-2 text-sm text-white/70">
          <span className="text-orange">✓</span> Supporto pratiche Bonus 50%
        </div>
      </div>
    </div>
  );
}

// ─── Pagina principale ────────────────────────────────────────────────────────

export default async function ComunePage({ params }: PageProps) {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  if (!comune) notFound();

  const jsonLd = buildJsonLd(comune);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.localBusiness) }}
      />
      {jsonLd.faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqSchema) }}
        />
      )}

      <main className="min-h-screen bg-white">

        {/* ── HERO ── */}
        <section className="bg-navy py-14 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-sm text-white/50 mb-6 flex flex-wrap gap-1 items-center">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/zone-servite/" className="hover:text-white transition-colors">
                Zone servite
              </Link>
              <span>/</span>
              <span className="text-white/80">{comune.nome}</span>
            </nav>

            <div className="grid lg:grid-cols-3 gap-10 items-start">
              <div className="lg:col-span-2">
                <p className="text-orange text-sm font-semibold uppercase tracking-widest mb-3">
                  Ristrutturazioni · {comune.nome}
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                  Ristrutturazione Casa a {comune.nome}:{" "}
                  <span className="text-orange">Costi Orientativi e Preventivo</span>
                </h1>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  {comune.descrizione}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">
                    Prezzario Regionale Campania
                  </span>
                  <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">
                    Garanzia decennale
                  </span>
                  <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">
                    Bonus 50% applicabile
                  </span>
                </div>
              </div>

              <div className="hidden lg:block">
                <CalcolatoreStimaSidebar comune={comune} />
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-16">

            {/* ── SERVIZI DISPONIBILI ── */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">
                Interventi disponibili a {comune.nome}
              </h2>
              <p className="text-gray-600 mb-6">
                Ogni pagina di servizio include costi orientativi specifici, criticità
                locali e le domande più frequenti per quel tipo di intervento.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    label: "Ristrutturazione Bagno",
                    prezzo: "da ~450 €/mq",
                    href: `/comune/${comune.slug}/ristrutturazione-bagno/`,
                    disponibile: true,
                  },
                  {
                    label: "Ristrutturazione Cucina",
                    prezzo: "da ~400 €/mq",
                    href: `/comune/${comune.slug}/ristrutturazione-cucina/`,
                    disponibile: false,
                  },
                  {
                    label: "Ristrutturazione Appartamento",
                    prezzo: "da ~550 €/mq",
                    href: `/comune/${comune.slug}/ristrutturazione-appartamento/`,
                    disponibile: false,
                  },
                  {
                    label: "Cappotto Termico",
                    prezzo: "da ~80 €/mq",
                    href: `/comune/${comune.slug}/cappotto-termico/`,
                    disponibile: false,
                  },
                  {
                    label: "Impianti",
                    prezzo: "da ~150 €/mq",
                    href: `/comune/${comune.slug}/impianti/`,
                    disponibile: false,
                  },
                  {
                    label: "Pavimenti e Rivestimenti",
                    prezzo: "da ~60 €/mq",
                    href: `/servizi/pavimenti-rivestimenti/`,
                    disponibile: false,
                  },
                ].map((s) =>
                  s.disponibile ? (
                    <Link
                      key={s.label}
                      href={s.href}
                      className="flex items-center justify-between p-4 rounded-xl border border-orange/30 bg-orange/5 hover:bg-orange/10 transition-colors group"
                    >
                      <div>
                        <p className="font-semibold text-navy text-sm">{s.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{s.prezzo} orientativo</p>
                      </div>
                      <span className="text-orange group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </Link>
                  ) : (
                    <div
                      key={s.label}
                      className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 opacity-60"
                    >
                      <div>
                        <p className="font-semibold text-gray-500 text-sm">{s.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{s.prezzo} orientativo</p>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">
                        In arrivo
                      </span>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* ── PREZZI ORIENTATIVI ── */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">
                Costi orientativi a {comune.nome}
              </h2>
              <p className="text-gray-600 mb-2">
                I valori riportati sono basati sul{" "}
                <strong>Prezzario Regionale Campania</strong> e si riferiscono al costo
                al metro quadro per una ristrutturazione completa di appartamento.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Il costo reale del tuo intervento dipende dallo stato dell&apos;immobile,
                dal tipo di lavori e dai materiali scelti. I valori definitivi emergono
                solo dal sopralluogo.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-5">
                {PREZZI_FINITURA.map((p) => (
                  <div
                    key={p.livello}
                    className="border border-gray-200 rounded-xl p-5 text-center"
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                      {p.livello}
                    </p>
                    <p className="text-2xl font-bold text-navy mb-2">{p.prezzo}</p>
                    <p className="text-xs text-gray-500">{p.descrizione}</p>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <span className="text-amber-500 text-lg flex-shrink-0 mt-0.5">⚠</span>
                <p className="text-sm text-amber-900">
                  <strong>Questi sono costi orientativi, non preventivi vincolanti.</strong>{" "}
                  Il prezzo definitivo richiede sopralluogo. Le forbice serve a capire
                  se l&apos;intervento è nel tuo range di budget: se sì, il passo successivo
                  è il sopralluogo gratuito.
                </p>
              </div>
            </section>

            {/* ── CRITICITÀ LOCALI ── */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">
                Cosa troviamo spesso negli immobili a {comune.nome}
              </h2>
              <p className="text-gray-600 mb-2">
                <strong>{comune.tipoEdilizio}.</strong>
              </p>
              <p className="text-gray-600 mb-6">
                Ogni zona ha le sue criticità ricorrenti. Conoscerle in anticipo
                permette di prepararsi, evitare sorprese di cantiere e stimare
                con più precisione i costi.
              </p>
              <div className="space-y-3">
                {comune.criticalita.map((c, i) => (
                  <div
                    key={i}
                    className="flex gap-3 items-start bg-amber-50 border border-amber-100 rounded-xl p-4"
                  >
                    <span className="flex-shrink-0 text-amber-500 mt-0.5">▲</span>
                    <p className="text-sm text-gray-800 leading-relaxed">{c}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── IL PROCESSO ── */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Come funziona</h2>
              <p className="text-gray-600 mb-8">
                Dalla prima ricerca al cantiere: tre passaggi, nessuna sorpresa.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    step: "01",
                    titolo: "Stima orientativa gratuita",
                    testo:
                      "Usi il calcolatore o ci scrivi su WhatsApp. Ti diamo una forbice di costo indicativa basata sul Prezzario Campania. Se è nel range, vai avanti.",
                  },
                  {
                    step: "02",
                    titolo: "Sopralluogo tecnico",
                    testo:
                      "Il nostro tecnico visita l'immobile, verifica impianti e strutture, rileva le criticità specifiche. È il passaggio che trasforma la stima in preventivo.",
                  },
                  {
                    step: "03",
                    titolo: "Preventivo dettagliato",
                    testo:
                      "Ricevi un documento scritto con prezzi unitari, materiali, tempistiche e garanzie. Nessuna voce generica.",
                  },
                ].map((s) => (
                  <div key={s.step}>
                    <p className="text-5xl font-black text-gray-100 mb-3 leading-none">
                      {s.step}
                    </p>
                    <h3 className="text-base font-bold text-navy mb-2">{s.titolo}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.testo}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── FAQ DINAMICHE ── */}
            {comune.faq.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-navy mb-2">
                  Domande frequenti sulle ristrutturazioni a {comune.nome}
                </h2>
                <p className="text-gray-600 mb-6">
                  Le domande che ci vengono poste più spesso da chi ci contatta da {comune.nome}.
                </p>
                <div className="space-y-4">
                  {comune.faq.map((faq, i) => (
                    <details
                      key={i}
                      className="group border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                        <span className="font-medium text-navy text-sm leading-snug">
                          {faq.domanda}
                        </span>
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange/10 text-orange flex items-center justify-center text-sm group-open:rotate-45 transition-transform">
                          +
                        </span>
                      </summary>
                      <div className="px-5 pb-5 pt-1">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {faq.risposta}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* ── COMUNI VICINI ── */}
            {comune.vicini.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-navy mb-4">
                  Interveniamo anche nei comuni vicini a {comune.nome}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {comune.vicini.map((slug) => {
                    const vicino = getComuneBySlug(slug);
                    if (!vicino) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/comune/${slug}/`}
                        className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-navy hover:text-white text-gray-700 text-sm font-medium px-4 py-2 rounded-full transition-colors"
                      >
                        {vicino.nome}
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

          </div>

          {/* Sidebar desktop */}
          <div className="hidden lg:block">
            <CalcolatoreStimaSidebar comune={comune} />

            {/* Box servizi disponibili */}
            <div className="mt-6 bg-gray-50 rounded-2xl p-5">
              <p className="text-sm font-semibold text-navy mb-3">
                Pagine servizio disponibili
              </p>
              <Link
                href={`/comune/${comune.slug}/ristrutturazione-bagno/`}
                className="flex items-center justify-between text-sm text-gray-700 hover:text-orange transition-colors py-2"
              >
                Ristrutturazione Bagno
                <span className="text-orange">→</span>
              </Link>
              <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-200">
                Altre pagine servizio in arrivo
              </p>
            </div>
          </div>

        </div>

        {/* ── CTA FINALE ── */}
        <section className="bg-navy py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Vuoi sapere quanto costa ristrutturare a {comune.nome}?
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Parti dalla stima gratuita. Se la forbice è nel tuo range, organizziamo
              il sopralluogo e prepariamo il preventivo dettagliato.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/393339809319?text=Salve%2C%20vorrei%20un%20preventivo%20per%20una%20ristrutturazione%20a%20${encodeURIComponent(
                  comune.nome
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-center"
              >
                Richiedi stima su WhatsApp
              </a>
              <a
                href="tel:+393339809319"
                className="bg-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors text-center"
              >
                Chiama +39 333 980 9319
              </a>
            </div>
            <p className="text-white/40 text-xs mt-6">
              Russo FE Costruzione SRL · Lusciano (CE) · Zone operative: Napoli, Caserta, Agro Aversano
            </p>
          </div>
        </section>

        {/* CTA mobile floating */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
          <a
            href={`https://wa.me/393339809319?text=Salve%2C%20vorrei%20un%20preventivo%20a%20${encodeURIComponent(
              comune.nome
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-orange text-white text-center font-semibold py-3 rounded-xl"
          >
            Stima gratuita su WhatsApp
          </a>
        </div>

      </main>
    </>
  );
}