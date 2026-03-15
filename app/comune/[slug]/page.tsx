// app/comune/[slug]/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, ArrowRight, TriangleAlert, CheckCircle } from "lucide-react";
import CalcolatoreStima from "@/components/shared/CalcolatoreStima";
import { comuni, getComuneBySlug } from "@/data/comuni";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const PREZZI_FINITURA = [
  { livello: "Base", prezzo: "500 – 650 €/mq", desc: "Materiali di primo livello, finitura funzionale" },
  { livello: "Standard", prezzo: "650 – 850 €/mq", desc: "Materiali di buona qualità, il più richiesto" },
  { livello: "Premium", prezzo: "850 – 1.100 €/mq", desc: "Materiali di design, lavorazioni a alto valore" },
];

export async function generateStaticParams() {
  return comuni.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  if (!comune) return {};
  const url = `https://ristrutturazionepreventivi.it/comune/${slug}/`;
  return {
    title: comune.metaTitle,
    description: comune.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: comune.metaTitle, description: comune.metaDescription, url, type: "article" },
  };
}

export default async function ComunePage({ params }: PageProps) {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  if (!comune) notFound();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ristrutturazionepreventivi.it/" },
      { "@type": "ListItem", position: 2, name: "Zone Servite", item: "https://ristrutturazionepreventivi.it/zone-servite/" },
      { "@type": "ListItem", position: 3, name: comune.nome, item: `https://ristrutturazionepreventivi.it/comune/${slug}/` },
    ],
  };

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
    areaServed: { "@type": "City", name: comune.nome },
  };

  const faqSchema = comune.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: comune.faq.map((f) => ({
          "@type": "Question",
          name: f.domanda,
          acceptedAnswer: { "@type": "Answer", text: f.risposta },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <main className="min-h-screen bg-white">

        {/* HERO */}
        <section className="bg-navy py-14 px-4">
          <div className="max-w-6xl mx-auto">
            <nav className="text-sm text-white/50 mb-6 flex flex-wrap gap-1 items-center">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/zone-servite/" className="hover:text-white transition-colors">Zone servite</Link>
              <span>/</span>
              <span className="text-white/80">{comune.nome}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Testo */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-orange" />
                  <p className="text-orange text-sm font-semibold uppercase tracking-widest">
                    Ristrutturazioni · {comune.nome}
                  </p>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                  Ristrutturazione Casa a {comune.nome}:{" "}
                  <span className="text-orange">Costi Orientativi e Preventivo</span>
                </h1>
                <p className="text-white/70 text-lg leading-relaxed mb-6">{comune.descrizione}</p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {["Prezzario Regionale Campania", "Garanzia decennale", "Bonus 50% applicabile"].map((t) => (
                    <span key={t} className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
                {/* Scroll verso calcolatore */}
                <a
                  href="#calcolatore"
                  className="inline-flex items-center gap-2 bg-orange text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Calcola la tua stima gratuita
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {/* Foto */}
              <div className="hidden lg:block relative h-72 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/servizi/ristrutturazione-appartamento-completo.jpg"
                  alt={`Ristrutturazione appartamento a ${comune.nome}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        {/* Calcolatore mobile */}
        <div className="lg:hidden px-4 pt-6">
          <CalcolatoreStima comuneDefault={comune.nome} />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-16">

            {/* SERVIZI DISPONIBILI */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Interventi disponibili a {comune.nome}</h2>
              <p className="text-gray-600 mb-6">
                Ogni pagina servizio include costi orientativi specifici, criticità locali e FAQ.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Ristrutturazione Bagno", prezzo: "da ~450 €/mq", href: `/comune/${slug}/ristrutturazione-bagno/`, attivo: true },
                  { label: "Ristrutturazione Cucina", prezzo: "da ~400 €/mq", href: `/servizi/ristrutturazione-cucina/`, attivo: false },
                  { label: "Ristrutturazione Appartamento", prezzo: "da ~550 €/mq", href: `/comune/${slug}/`, attivo: true },
                  { label: "Cappotto Termico", prezzo: "da ~80 €/mq", href: `/servizi/cappotto-termico/`, attivo: false },
                  { label: "Impianti", prezzo: "da ~150 €/mq", href: `/servizi/impianti-elettrici-idraulici-termici/`, attivo: false },
                  { label: "Pavimenti e Rivestimenti", prezzo: "da ~60 €/mq", href: `/servizi/pavimenti-rivestimenti/`, attivo: false },
                ].map((s) =>
                  s.attivo ? (
                    <Link key={s.label} href={s.href}
                      className="flex items-center justify-between p-4 rounded-xl border border-orange/30 bg-orange/5 hover:bg-orange/10 transition-colors group"
                    >
                      <div>
                        <p className="font-semibold text-navy text-sm">{s.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{s.prezzo} orientativo</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-orange group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <div key={s.label} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 opacity-60">
                      <div>
                        <p className="font-semibold text-gray-500 text-sm">{s.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{s.prezzo} orientativo</p>
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">In arrivo</span>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* PREZZI ORIENTATIVI */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Costi orientativi a {comune.nome}</h2>
              <p className="text-gray-600 mb-1">
                Valori basati sul <strong>Prezzario Regionale Campania</strong> — costo al mq per ristrutturazione completa appartamento.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Il costo definitivo dipende dallo stato dell&apos;immobile e dai materiali scelti. Emerge solo dal sopralluogo.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-5">
                {PREZZI_FINITURA.map((p) => (
                  <div key={p.livello} className="border border-gray-200 rounded-xl p-5 text-center hover:border-orange/40 transition-colors">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">{p.livello}</p>
                    <p className="text-xl font-bold text-navy mb-2">{p.prezzo}</p>
                    <p className="text-xs text-gray-500">{p.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <TriangleAlert className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-900">
                  <strong>Questi sono costi orientativi, non preventivi vincolanti.</strong>{" "}
                  Servono a capire se l&apos;intervento è nel tuo range. Il prezzo definitivo richiede sopralluogo.
                </p>
              </div>
            </section>

            {/* CRITICITÀ LOCALI */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Cosa troviamo spesso a {comune.nome}</h2>
              <p className="text-gray-600 mb-2">
                <strong>{comune.tipoEdilizio}.</strong>
              </p>
              <p className="text-gray-600 mb-6">
                Conoscere le criticità locali prima del sopralluogo permette stime più accurate e meno sorprese di cantiere.
              </p>
              <div className="space-y-3">
                {comune.criticalita.map((c, i) => (
                  <div key={i} className="flex gap-3 items-start bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <TriangleAlert className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-800 leading-relaxed">{c}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* PROCESSO */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Come funziona</h2>
              <p className="text-gray-600 mb-8">Tre passaggi, nessuna sorpresa.</p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { n: "01", t: "Stima gratuita", d: "Usi il calcolatore o ci scrivi su WhatsApp. In pochi minuti sai se il tuo budget è compatibile con l'intervento, senza impegno." },
                  { n: "02", t: "Sopralluogo tecnico", d: "Il nostro tecnico visita l'immobile di persona. Verifica impianti, strutture e criticità specifiche: solo così il preventivo è affidabile." },
                  { n: "03", t: "Preventivo scritto", d: "Un documento con prezzi unitari, materiali, tempistiche e garanzia decennale. Tutto nero su bianco prima di iniziare." },
                ].map((s) => (
                  <div key={s.n}>
                    <p className="text-5xl font-black text-gray-100 mb-3 leading-none">{s.n}</p>
                    <h3 className="text-base font-bold text-navy mb-2">{s.t}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ DINAMICHE */}
            {comune.faq.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-navy mb-2">
                  Domande frequenti sulle ristrutturazioni a {comune.nome}
                </h2>
                <p className="text-gray-600 mb-6">Le domande più comuni da chi ci contatta da {comune.nome}.</p>
                <div className="space-y-3">
                  {comune.faq.map((faq, i) => (
                    <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
                      <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                        <span className="font-medium text-navy text-sm leading-snug">{faq.domanda}</span>
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange/10 text-orange flex items-center justify-center text-sm group-open:rotate-45 transition-transform">+</span>
                      </summary>
                      <div className="px-5 pb-5 pt-1">
                        <p className="text-sm text-gray-700 leading-relaxed">{faq.risposta}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* COMUNI VICINI */}
            {comune.vicini.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-navy mb-4">Interveniamo anche nei comuni vicini</h2>
                <div className="flex flex-wrap gap-3">
                  {comune.vicini.map((vs) => {
                    const v = getComuneBySlug(vs);
                    if (!v) return null;
                    return (
                      <Link key={vs} href={`/comune/${vs}/`}
                        className="bg-gray-100 hover:bg-navy hover:text-white text-gray-700 text-sm font-medium px-4 py-2 rounded-full transition-colors"
                      >
                        {v.nome}
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

          </div>

          {/* SIDEBAR STICKY */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div id="calcolatore">
                <CalcolatoreStima comuneDefault={comune.nome} />
              </div>
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm font-semibold text-navy mb-3">Pagina servizio disponibile</p>
                <Link href={`/comune/${slug}/ristrutturazione-bagno/`}
                  className="flex items-center justify-between text-sm text-gray-700 hover:text-orange transition-colors py-2"
                >
                  Ristrutturazione Bagno <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-200">Altre pagine servizio in arrivo</p>
              </div>
              <div className="bg-orange/5 border border-orange/20 rounded-2xl p-5">
                <div className="space-y-2">
                  {["Garanzia decennale sui lavori", "Materiali certificati CE", "Supporto pratiche Bonus 50%"].map((t) => (
                    <div key={t} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-orange flex-shrink-0" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <section className="bg-navy py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Vuoi sapere quanto costa ristrutturare a {comune.nome}?
            </h2>
            <p className="text-white/70 mb-8">
              Parti dalla stima gratuita. Se la forbice è nel tuo range, organizziamo il sopralluogo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/393339809319?text=Salve%2C%20vorrei%20un%20preventivo%20a%20${encodeURIComponent(comune.nome)}`}
                target="_blank" rel="noopener noreferrer"
                className="bg-orange text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-center"
              >
                Richiedi stima su WhatsApp
              </a>
              <a href="tel:+393339809319"
                className="bg-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors text-center"
              >
                Chiama +39 333 980 9319
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
