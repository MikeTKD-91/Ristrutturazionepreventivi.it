// app/comune/[slug]/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Check, X } from "lucide-react";
import CalcolatoreAppartamento from "@/components/shared/CalcolatoreAppartamento";
import GalleriaLavori from "@/components/shared/GalleriaLavori";
import { RecensioniClienti } from "@/components/shared/RecensioniClienti";
import { comuni, getComuneBySlug } from "@/data/comuni";
import { getAllArticoli } from "@/lib/blog";
import { getComuneContent } from "@/lib/comune-content";
import { buildHowToSchema } from "@/lib/schema";
import { getLavoriPerServizio } from "@/lib/lavori";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function renderSeoText(text: string, comuneNome: string) {
  const escapedComune = comuneNome.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedComune})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    part.toLowerCase() === comuneNome.toLowerCase() ? <strong key={i}>{part}</strong> : part
  );
}

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
    openGraph: {
      title: comune.metaTitle,
      description: comune.metaDescription,
      url,
      type: "website",
      siteName: "RistrutturazionePreventivi.it",
      locale: "it_IT",
      images: [
        {
          url: "https://ristrutturazionepreventivi.it/images/servizi/ristrutturazione-appartamento-completo.jpg",
          width: 1200,
          height: 630,
          alt: `Ristrutturazione casa e appartamento completo a ${comune.nome}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: comune.metaTitle,
      description: comune.metaDescription,
      images: ["https://ristrutturazionepreventivi.it/images/servizi/ristrutturazione-appartamento-completo.jpg"],
    },
  };
}

export default async function ComunePage({ params }: PageProps) {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  if (!comune) notFound();

  const content = getComuneContent(slug);
  const lavori = getLavoriPerServizio("ristrutturazione-appartamento-completo");
  const articoliConsigliati = getAllArticoli().slice(0, 3);
  const seoSectionsCasa = comune.seoSections?.filter((section) => section.pageType !== "bagno" && !section.title.startsWith("Costo Ristrutturazione")) ?? [];

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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `Ristrutturazione casa e appartamento a ${comune.nome}`,
    name: `Ristrutturazione Casa a ${comune.nome}`,
    areaServed: { "@type": "City", name: comune.nome },
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "Russo FE Costruzione SRL",
      url: "https://ristrutturazionepreventivi.it",
      telephone: "+393339809319",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: String(content.prezzoMq),
      url: `https://ristrutturazionepreventivi.it/comune/${slug}/`,
      description: `Prezzo base indicativo da ${content.prezzoMq} €/mq per ristrutturazione completa a ${comune.nome}, da confermare dopo sopralluogo e verifica tecnica.`,
    },
    url: `https://ristrutturazionepreventivi.it/comune/${slug}/`,
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

  const inclusioniStandard = [
    "Rifacimento impianto elettrico, idraulico e termico",
    "Fornitura e installazione di termosifoni standard in alluminio",
    "Fornitura e installazione di infissi esterni in PVC",
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

  const prezziTabella = [
    ["50 mq", `${(50 * content.prezzoMq).toLocaleString("it-IT")} euro`],
    ["80 mq", `${(80 * content.prezzoMq).toLocaleString("it-IT")} euro`],
    ["100 mq", `${(100 * content.prezzoMq).toLocaleString("it-IT")} euro`],
    ["120 mq", `${(120 * content.prezzoMq).toLocaleString("it-IT")} euro`],
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildHowToSchema("Ristrutturazione Casa e Appartamento", comune.nome)
          ),
        }}
      />

      <main className="min-h-screen bg-white">

        {/* HERO */}
        <section className="bg-navy py-14 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                  Ristrutturazione Casa a {comune.nome}:{" "}
                  <span className="text-orange">preventivo Lavori e costo Ristrutturazione</span>
                </h1>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  {content.testoIntro}
                </p>
                <a
                  href="#modulo-preventivo"
                  className="inline-flex items-center gap-2 bg-orange text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Richiedi un preventivo
                </a>
              </div>

              <div className="hidden lg:block relative h-72 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={content.immagineHero}
                  alt={`Ristrutturazione casa o appartamento a ${comune.nome}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <div id="modulo-preventivo" className="lg:hidden px-4 pt-6">
          <CalcolatoreAppartamento comuneDefault={comune.nome} />
        </div>

        <div className="container mx-auto px-4 py-20 grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-16">

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-navy mb-3">Costo Ristrutturazione a {comune.nome}</h2>
              <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-orange-50 via-white to-navy/5 p-6 md:p-8 shadow-lg">
                <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange mb-3">Costo base reale</p>
                    <div className="flex items-end gap-3 flex-wrap">
                      <span className="text-5xl md:text-7xl font-black text-navy leading-none">{content.prezzoMq}</span>
                      <span className="text-xl md:text-2xl font-bold text-orange pb-1">€/mq</span>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 max-w-xl">
                      Valore riferito a ristrutturazione completa standard a {comune.nome}, con accesso ordinario all'immobile e condizioni operative normali. Questo valore aiuta a capire se il progetto è in linea con il budget, ma non sostituisce il sopralluogo.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white border border-gray-200 p-5">
                    <div className="rounded-2xl border border-orange/20 bg-orange/5 p-4">
                      <p className="text-[11px] font-bold tracking-[0.14em] text-orange uppercase">Esempio reale</p>
                      <p className="mt-2 text-sm font-medium text-gray-600">Appartamento {content.esempioMq} mq</p>
                      <p className="mt-2 text-3xl font-black text-navy leading-none">{content.esempioPrezzo.toLocaleString("it-IT")} euro</p>
                    </div>
                    <p className="mt-4 text-xs text-gray-500">
                      Il preventivo finale si conferma solo dopo verifica tecnica e sopralluogo a {comune.nome}.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Se stai cercando il costo ristrutturazione a {comune.nome}, partire da {content.prezzoMq} €/mq è il modo più semplice per avere un primo riferimento concreto. Qui sotto trovi alcuni esempi indicativi in base alla metratura, utili per capire subito la fascia di spesa di una ristrutturazione completa.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr className="text-left text-navy">
                      <th className="py-3 px-4 font-semibold">Superficie appartamento</th>
                      <th className="py-3 px-4 font-semibold">Costo indicativo a {comune.nome}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prezziTabella.map((row) => (
                      <tr key={row[0]} className="border-t border-gray-100">
                        <td className="py-3 px-4 text-gray-700">{row[0]}</td>
                        <td className="py-3 px-4 text-gray-700">{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-600 leading-relaxed">
                La tabella ti aiuta a stimare il costo di ristrutturazione appartamento a {comune.nome} per metrature comuni, ma il prezzo definitivo va sempre verificato sul caso reale. Accessibilità, impianti, demolizioni, distribuzione interna, umidità e finiture possono incidere sul preventivo finale dopo sopralluogo tecnico.
              </p>
            </section>

            <RecensioniClienti />

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Ristrutturazione Casa e Appartamento Completo a {comune.nome}</h2>
              <div className="space-y-4 text-gray-600">
                <p>{content.testoIntro}</p>
                <p>
                  {content.testoCosti}{" "}
                  {comune.slug === "napoli" && (
                    <>
                      Per una stima più orientativa puoi leggere anche{" "}
                      <Link href="/blog/quanto-costa-ristrutturare-appartamento-napoli-2026/" className="text-teal-700 underline decoration-teal-300 underline-offset-4 hover:text-orange">
                        quanto costa ristrutturare un appartamento a Napoli nel 2026
                      </Link>
                      , con una panoramica sui prezzi al mq e sui fattori che incidono di più sul costo finale.{" "}
                    </>
                  )}
                  Il costo definitivo viene confermato dopo un sopralluogo tecnico, indispensabile per analizzare l'immobile e definire in modo dettagliato tutte le lavorazioni necessarie.
                </p>
                <p>
                  Affidati a un'impresa specializzata nella ristrutturazione di appartamenti a {comune.nome} per seguire ogni fase del progetto: demolizioni, impianti, opere murarie, pavimenti, rivestimenti, tinteggiature e finiture finali, con un unico referente e un preventivo chiaro e trasparente.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Cosa include la ristrutturazione completa dell'appartamento</h2>
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

            {/* GALLERIA LAVORI — appare solo se ci sono immagini */}
            <GalleriaLavori comuneNome={comune.nome} lavori={lavori} />

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Quanto dura il cantiere a {comune.nome}?</h2>
              <p className="text-gray-600 mb-5">
                Capire quanto tempo serve per ristrutturare casa a {comune.nome} è importante quanto conoscere il costo dei lavori. Per questo abbiamo riassunto le principali fasi del cantiere, così puoi avere un riferimento più chiaro sui tempi medi di una ristrutturazione completa a {comune.nome}.
              </p>
              {content.noteCantiere.length > 0 && (
                <div className="mb-5 space-y-2">
                  {content.noteCantiere.map((nota, i) => (
                    <p key={i} className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-4 py-2">
                      ⚠ {nota}
                    </p>
                  ))}
                </div>
              )}
              <div className="space-y-2">
                {[
                  ["Demolizioni e smaltimento", "4–7 gg", ""],
                  ["Nuova distribuzione interna e opere murarie", "5–10 gg", ""],
                  ["Realizzazione nuovi impianti", "7–12 gg", ""],
                  ["Massetti, sottofondi e preparazioni", "3–5 gg", ""],
                  ["Posa pavimenti e rivestimenti", "6–10 gg", ""],
                  ["Rasature, tinteggiatura e finiture", "5–8 gg", ""],
                  ["Montaggi finali e chiusura lavori", "3–8 gg", ""],
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{t[0]}</p>
                      {t[2] ? <p className="text-xs text-gray-400">{t[2]}</p> : null}
                    </div>
                    <span className="flex-shrink-0 text-sm font-semibold text-navy">{t[1]}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 mt-5">
                Per un appartamento standard a {comune.nome}, la durata complessiva dei lavori è in genere compresa tra 45 e 60 giorni lavorativi. I tempi effettivi possono cambiare in base allo stato dell'immobile, alla distribuzione interna, agli impianti da rifare, all'accessibilità del cantiere e al livello di finitura richiesto.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Come funziona</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["01", "Primo preventivo online", `Parti dallo strumento di stima con i mq dell'appartamento a ${comune.nome} e ricevi una prima indicazione coerente con il livello standard da ${content.prezzoMq} €/mq.`],
                  ["02", "Verifica tecnica", "Controlliamo accessibilità, impianti, distribuzione interna e criticità locali per capire cosa incide davvero sul costo."],
                  ["03", "Preventivo scritto", "Ricevi il quadro economico definitivo con lavorazioni, tempi e condizioni operative prima di iniziare il cantiere."],
                ].map((s) => (
                  <div key={s[0]} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <p className="text-4xl font-black text-gray-100 mb-3 leading-none">{s[0]}</p>
                    <h3 className="text-base font-bold text-navy mb-2">{s[1]}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{s[2]}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              {seoSectionsCasa.length ? (
                <div className="space-y-6">
                  {seoSectionsCasa.map((section, i) => (
                    <div key={i}>
                      <h2 className="text-2xl font-bold text-navy mb-2">{section.title}</h2>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">{renderSeoText(section.text, comune.nome)}</p>
                  {section.title.startsWith("Impresa di Ristrutturazioni") && (
                    <p className="mt-4 text-sm text-gray-600">
                      Vuoi conoscere meglio il nostro metodo? <Link href="/chi-siamo/" className="text-navy underline underline-offset-2 hover:text-orange transition-colors">Scopri chi siamo</Link>.
                    </p>
                  )}
                      {section.title.startsWith("Costo Ristrutturazione") ? (
                        <>
                          <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
                            <table className="w-full text-sm">
                              <thead className="bg-gray-50">
                                <tr className="text-left text-navy">
                                  <th className="py-3 px-4 font-semibold">Superficie</th>
                                  <th className="py-3 px-4 font-semibold">Costo indicativo a {comune.nome}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {prezziTabella.map((row) => (
                                  <tr key={row[0]} className="border-t border-gray-100">
                                    <td className="py-3 px-4 text-gray-700">{row[0]}</td>
                                    <td className="py-3 px-4 text-gray-700">{row[1]}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          {section.afterTableText ? (
                            <p className="mt-4 text-gray-600 leading-relaxed whitespace-pre-line">{section.afterTableText}</p>
                          ) : null}
                        </>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-navy mb-2">{`Cosa troviamo spesso a ${comune.nome}`}</h2>
                  <p className="text-gray-600 mb-2"><strong>{comune.tipoEdilizio}.</strong></p>
                  <p className="text-gray-600 mb-6">Conoscere le criticità locali prima del sopralluogo permette costi più accurati e meno sorprese di cantiere.</p>
                  <div className="space-y-3">
                    {comune.criticalita.map((c, i) => (
                      <div key={i} className="flex gap-3 items-start bg-amber-50 border border-amber-100 rounded-xl p-4">
                        <p className="text-sm text-gray-800 leading-relaxed">{c}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">FAQ</h2>
            </section>

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
                <p className="mt-4 text-sm text-gray-500">
                  Le forniture comprese si riferiscono a capitolato standard e possono variare in base a misure, modello scelto e condizioni dell&apos;immobile.
                </p>
              </section>
            )}

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

          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div id="modulo-preventivo">
                <CalcolatoreAppartamento comuneDefault={comune.nome} />
              </div>
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm font-semibold text-navy mb-3">Altri servizi a {comune.nome}</p>
                <div className="space-y-2">
                  {[
                    { label: "Ristrutturazione Bagno", href: `/comune/${slug}/ristrutturazione-bagno/` },
                    { label: "Ristrutturazione Cucina", href: `/comune/${slug}/ristrutturazione-cucina/` },
                    { label: "Rifacimento Tetto", href: `/comune/${slug}/rifacimento-tetto/` },
                    { label: "Cappotto Termico", href: `/comune/${slug}/cappotto-termico/` },
                    { label: "Impianti", href: `/comune/${slug}/impianti-elettrici-idraulici-termici/` },
                    { label: "Pavimenti e Rivestimenti", href: `/comune/${slug}/pavimenti-rivestimenti/` },
                  ].map((s) => (
                    <Link key={s.label} href={s.href} className="flex items-center justify-between text-sm text-gray-700 hover:text-navy py-2 border-b border-gray-200 last:border-0 transition-colors">
                      {s.label}<span className="text-gray-400">→</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-5">
                <p className="text-sm font-semibold text-navy mb-4">Articoli da leggere prima di ristrutturare</p>
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
                        <h3 className="text-sm font-bold text-navy leading-snug mb-2">{articolo.titolo}</h3>
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                          {articolo.estratto}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-navy py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Vuoi ottenere un preventivo immediato a {comune.nome}?
            </h2>
            <p className="text-white/70 mb-8">
              Inviaci i dati del tuo intervento a {comune.nome}: ricevi una prima stima e la conferma finale dopo verifica tecnica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/393339809319?text=Salve%2C%20vorrei%20un%20preventivo%20a%20${encodeURIComponent(comune.nome)}`}
                target="_blank" rel="noopener noreferrer"
                className="bg-orange text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-center"
              >
                Parla con noi su WhatsApp
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
