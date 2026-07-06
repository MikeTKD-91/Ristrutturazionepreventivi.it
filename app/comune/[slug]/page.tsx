// app/comune/[slug]/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight, CheckCircle, Check, X } from "lucide-react";
import CalcolatoreAppartamento from "@/components/shared/CalcolatoreAppartamento";
import { comuni, getComuneBySlug } from "@/data/comuni";
import { getAllArticoli } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Valori orientativi da Prezzario Regionale Campania — ristrutturazione appartamento completo
export async function generateStaticParams() {
  return comuni.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  if (!comune) return {};
  const url = `https://ristrutturazionepreventivi.it/comune/${slug}/`;
  return {
    title: `Ristrutturazione Casa a ${comune.nome} | Preventivo e Costi`,
    description: `Richiedi un preventivo per ristrutturare casa o appartamento a ${comune.nome}. Costi indicativi, sopralluogo e conferma finale del preventivo.`,
    alternates: { canonical: url },
    openGraph: {
      title: `Ristrutturazione Casa a ${comune.nome} | Preventivo e Costi`,
      description: `Richiedi un preventivo per ristrutturare casa o appartamento a ${comune.nome}. Costi indicativi, sopralluogo e conferma finale del preventivo.`,
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
      title: `Ristrutturazione Casa a ${comune.nome} | Preventivo e Costi`,
      description: `Richiedi un preventivo per ristrutturare casa o appartamento a ${comune.nome}. Costi indicativi, sopralluogo e conferma finale del preventivo.`,
      images: ["https://ristrutturazionepreventivi.it/images/servizi/ristrutturazione-appartamento-completo.jpg"],
    },
  };
}

export default async function ComunePage({ params }: PageProps) {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  if (!comune) notFound();

  const articoliConsigliati = getAllArticoli().slice(0, 3);

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
      price: "550",
      url: `https://ristrutturazionepreventivi.it/comune/${slug}/`,
      description: `Prezzo base indicativo da 550 €/mq per ristrutturazione completa a ${comune.nome}, da confermare dopo sopralluogo e verifica tecnica.`,
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


  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <main className="min-h-screen bg-white">

        {/* HERO */}
        <section className="bg-navy py-14 px-4">
          <div className="max-w-6xl mx-auto">

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Testo */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                  Ristrutturazione Casa a {comune.nome}:{" "}
                  <span className="text-orange">preventivo immediato e costo reale</span>
                </h1>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Raccontaci il tuo progetto a {comune.nome}: ti diamo una prima stima utile e poi la confermiamo con verifica tecnica.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {["Prezzario Regionale Campania", "Lavori concordati", "Bonus 50% applicabile"].map((t) => (
                    <span key={t} className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
                {/* Scroll verso modulo preventivo */}
                <a
                  href="#modulo-preventivo"
                  className="inline-flex items-center gap-2 bg-orange text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Richiedi un preventivo
                </a>
              </div>

              {/* Foto */}
              <div className="hidden lg:block relative h-72 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/servizi/ristrutturazione-appartamento-completo.jpg"
                  alt={`Ristrutturazione casa o appartamento a ${comune.nome}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
        {/* Modulo di preventivo mobile */}
        <div id="modulo-preventivo" className="lg:hidden px-4 pt-6">
          <CalcolatoreAppartamento comuneDefault={comune.nome} />
        </div>

        <div className="container mx-auto px-4 py-20 grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-16">

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Ristrutturazione casa e appartamento completo a {comune.nome}</h2>
              <p className="text-gray-600">
                Qui trovi un preventivo realistico dei costi di una ristrutturazione completa pensata per case o appartamenti da rifare in modo coordinato, con possibilità di richiedere un preventivo online e verifica tecnica finale solo dopo sopralluogo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Costi reali</h2>
              <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-orange-50 via-white to-navy/5 p-6 md:p-8 shadow-lg">
                <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange mb-3">Costo base reale</p>
                    <div className="flex items-end gap-3 flex-wrap">
                      <span className="text-5xl md:text-7xl font-black text-navy leading-none">550</span>
                      <span className="text-xl md:text-2xl font-bold text-orange pb-1">€/mq</span>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 max-w-xl">
                      Valore riferito a ristrutturazione completa standard, con accesso ordinario all'immobile e condizioni operative normali. Questo valore aiuta a capire se il progetto è in linea con il budget, ma non sostituisce il sopralluogo.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white border border-gray-200 p-5">
                    <div className="rounded-2xl border border-orange/20 bg-orange/5 p-4">
                      <p className="text-[11px] font-bold tracking-[0.14em] text-orange uppercase">Esempio reale</p>
                      <p className="mt-2 text-sm font-medium text-gray-600">Appartamento 80 mq</p>
                      <p className="mt-2 text-3xl font-black text-navy leading-none">46.750 euro</p>
                    </div>
                    <p className="mt-4 text-xs text-gray-500">
                      Il preventivo finale si conferma solo dopo verifica tecnica e sopralluogo.
                    </p>
                  </div>
                </div>
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

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Quanto dura il cantiere?</h2>
              <p className="text-gray-600 mb-5">
                Per un appartamento medio la durata varia in base allo stato degli impianti, ai tempi di asciugatura e al livello di finitura scelto. In condizioni ordinarie siamo nell'ordine di 6–10 settimane lavorative.
              </p>
              <div className="space-y-2">
                {[
                  ["Demolizioni e rimozioni", "3–5 gg", ""],
                  ["Impianti elettrico, idraulico e termico", "7–10 gg", ""],
                  ["Intonaci, rasature e massetti", "8–12 gg", "incluse le attese tecniche"],
                  ["Pavimenti, rivestimenti e porte", "7–12 gg", ""],
                  ["Tinteggiatura, sanitari e collaudi", "4–7 gg", ""],
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
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Come funziona</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["01", "Primo preventivo online", "Parti dallo strumento di stima con i mq dell'appartamento e ricevi una prima indicazione coerente con il livello standard da 550 €/mq."],
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
              <h2 className="text-2xl font-bold text-navy mb-2">Servizi complementari a {comune.nome}</h2>
              <p className="text-gray-600 mb-6">
                Se il tuo intervento riguarda solo una parte dell'immobile, puoi approfondire i servizi specifici collegati.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Ristrutturazione Bagno", prezzo: "da 5.000 € completo", href: `/comune/${slug}/ristrutturazione-bagno/`, attivo: true },
                  { label: "Ristrutturazione Cucina", prezzo: "preventivo su sopralluogo", href: `/comune/${slug}/ristrutturazione-cucina/`, attivo: true },
                  { label: "Rifacimento Tetto", prezzo: "preventivo su sopralluogo", href: `/comune/${slug}/rifacimento-tetto/`, attivo: true },
                  { label: "Cappotto Termico", prezzo: "preventivo su sopralluogo", href: `/comune/${slug}/cappotto-termico/`, attivo: true },
                  { label: "Impianti", prezzo: "preventivo dopo verifica tecnica", href: `/comune/${slug}/impianti-elettrici-idraulici-termici/`, attivo: true },
                  { label: "Pavimenti e Rivestimenti", prezzo: "da 45 €/mq", href: `/comune/${slug}/pavimenti-rivestimenti/`, attivo: true },
                ].map((s) =>
                  s.attivo ? (
                    <Link key={s.label} href={s.href}
                      className="flex items-center justify-between p-4 rounded-xl border border-orange/30 bg-orange/5 hover:bg-orange/10 transition-colors group"
                    >
                      <div>
                        <p className="font-semibold text-navy text-sm">{s.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{s.prezzo}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-orange group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : null
                )}
              </div>
            </section>

            <section>
              {comune.seoSections?.length ? (
                <div className="space-y-6">
                  {comune.seoSections.map((section, i) => (
                    <div key={i}>
                      <h2 className="text-2xl font-bold text-navy mb-2">{section.title}</h2>
                      <p className="text-gray-600 leading-relaxed">{section.text}</p>
                      {section.title.startsWith("Costo Ristrutturazione") ? (
                        <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                              <tr className="text-left text-navy">
                                <th className="py-3 px-4 font-semibold">Superficie</th>
                                <th className="py-3 px-4 font-semibold">Costo indicativo</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[
                                ["50 mq", "27.500 euro"],
                                ["80 mq", "44.000 euro"],
                                ["100 mq", "55.000 euro"],
                                ["120 mq", "66.000 euro"],
                              ].map((row) => (
                                <tr key={row[0]} className="border-t border-gray-100">
                                  <td className="py-3 px-4 text-gray-700">{row[0]}</td>
                                  <td className="py-3 px-4 text-gray-700">{row[1]}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
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
                <p className="mt-4 text-sm text-gray-500">
                  Le forniture comprese si riferiscono a capitolato standard e possono variare in base a misure, modello scelto e condizioni dell&apos;immobile.
                </p>
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
              <div id="modulo-preventivo">
                <CalcolatoreAppartamento comuneDefault={comune.nome} />
              </div>
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm font-semibold text-navy mb-3">Pagine servizio disponibili</p>
                {[
                  { label: "Ristrutturazione Bagno", href: `/comune/${slug}/ristrutturazione-bagno/` },
                  { label: "Ristrutturazione Cucina", href: `/comune/${slug}/ristrutturazione-cucina/` },
                  { label: "Ristrutturazione Appartamento", href: `/comune/${slug}/` },
                  { label: "Rifacimento Tetto", href: `/comune/${slug}/rifacimento-tetto/` },
                  { label: "Cappotto Termico", href: `/comune/${slug}/cappotto-termico/` },
                  { label: "Impianti", href: `/comune/${slug}/impianti-elettrici-idraulici-termici/` },
                  { label: "Pavimenti e Rivestimenti", href: `/comune/${slug}/pavimenti-rivestimenti/` },
                ].map((s) => (
                  <Link key={s.label} href={s.href}
                    className="flex items-center justify-between text-sm text-gray-700 hover:text-orange transition-colors py-2 border-b border-gray-100 last:border-0"
                  >
                    {s.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
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
              <div className="bg-orange/5 border border-orange/20 rounded-2xl p-5">
                <div className="space-y-2">
                  {["Lavori eseguiti come da accordi", "Materiali certificati CE", "Supporto pratiche Bonus 50%"].map((t) => (
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

