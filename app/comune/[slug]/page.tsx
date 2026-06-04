// app/comune/[slug]/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, ArrowRight, TriangleAlert, CheckCircle, Check, AlertCircle } from "lucide-react";
import CalcolatoreAppartamento from "@/components/shared/CalcolatoreAppartamento";
import { comuni, getComuneBySlug } from "@/data/comuni";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Valori orientativi da Prezzario Regionale Campania — ristrutturazione appartamento completo
const PREZZI_FINITURA = [
  { livello: "Base", prezzo: "550 – 700 €/mq", desc: "Ceramica standard, impianti a norma, tinteggiatura liscia. Funzionale e certificato." },
  { livello: "Standard", prezzo: "700 – 900 €/mq", desc: "Gres porcellanato, impianti evoluti, serramenti con doppio vetro. Il livello più richiesto." },
  { livello: "Premium", prezzo: "900 – 1.200 €/mq", desc: "Grandi formati, impianti smart, serramenti alto isolamento, finiture su misura." },
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
    title: `Ristrutturazione Appartamento Completo a ${comune.nome} | Costi reali e preventivo online immediato`,
    description: `Ristrutturazione appartamento completo a ${comune.nome}: costi reali, livelli di finitura, criticità locali e preventivo online immediato. Il quadro economico definitivo richiede sopralluogo e verifica tecnica.`,
    alternates: { canonical: url },
    openGraph: {
      title: `Ristrutturazione Appartamento Completo a ${comune.nome} | Costi reali e preventivo online immediato`,
      description: `Ristrutturazione appartamento completo a ${comune.nome}: costi reali, livelli di finitura, criticità locali e preventivo online immediato. Il quadro economico definitivo richiede sopralluogo e verifica tecnica.`,
      url,
      type: "article",
      siteName: "ristrutturazionepreventivi.it",
      locale: "it_IT",
      images: [
        {
          url: "https://ristrutturazionepreventivi.it/images/servizi/ristrutturazione-appartamento-completo.jpg",
          width: 1200,
          height: 630,
          alt: `Ristrutturazione appartamento completo a ${comune.nome}`,
        },
      ],
    },
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

  const inclusioniStandard = [
    "Demolizioni e smaltimento delle rimozioni previste",
    "Rifacimento impianto elettrico, idraulico e termico",
    "Opere murarie, sottofondi, intonaci e rasature",
    "Controsoffittatura liscia dove prevista dal progetto",
    "Posa di pavimenti e rivestimenti",
    "Porte interne complete di telaio e bussole",
    "Fornitura e installazione dei sanitari: wc, bidet, lavabo e piatto doccia",
    "Tinteggiatura finale e finiture standard",
  ];

  const esclusioniExtra = [
    "Pratiche edilizie, catastali e autorizzazioni eventualmente necessarie",
    "Arredi su misura, cucina ed elettrodomestici",
    "Box doccia",
    "Infissi esterni, portoncino blindato e opere non previste nel computo",
    "Adeguamenti strutturali, consolidamenti o interventi emersi dopo le demolizioni",
    "Spese condominiali, occupazione suolo pubblico e costi logistici straordinari",
    "Finiture fuori capitolato e forniture scelte dal cliente",
  ];


  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <main className="min-h-screen bg-white">

        {/* HERO */}
        <section className="bg-navy py-14 px-4">
          <div className="max-w-6xl mx-auto">

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Testo */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                  Ristrutturazione Appartamento Completo a {comune.nome}:{" "}
                  <span className="text-orange">costi reali e preventivo online immediato</span>
                </h1>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Se stai valutando una ristrutturazione completa del tuo appartamento a {comune.nome}, qui trovi un preventivo online immediato basato su costi reali, livelli di finitura e parametri coerenti con il tipo di intervento. Il quadro economico definitivo viene confermato solo dopo verifica tecnica e sopralluogo.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {["Prezzario Regionale Campania", "Lavori concordati", "Bonus 50% applicabile"].map((t) => (
                    <span key={t} className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
                {/* Scroll verso calcolatore */}
                <a
                  href="#calcolatore"
                  className="inline-flex items-center gap-2 bg-orange text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Ottieni il preventivo online immediato
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
        <div id="calcolatore" className="lg:hidden px-4 pt-6">
          <CalcolatoreAppartamento comuneDefault={comune.nome} />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-16">

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Ristrutturazione appartamento completo a {comune.nome}</h2>
              <p className="text-gray-600">
                Qui trovi il costo reale di una ristrutturazione completa pensata per appartamenti da rifare in modo coordinato, con preventivo online immediato e verifica tecnica finale solo dopo sopralluogo.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Costi reali</h2>
              <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-orange-50 via-white to-navy/5 p-6 md:p-8 shadow-lg">
                <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange mb-3">Costo reale orientativo</p>
                    <div className="flex items-end gap-3 flex-wrap">
                      <span className="text-5xl md:text-7xl font-black text-navy leading-none">550</span>
                      <span className="text-xl md:text-2xl font-bold text-orange pb-1">€/mq</span>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 max-w-xl">
                      Valore riferito a ristrutturazione completa standard, con accesso ordinario all'immobile e condizioni operative normali. Il prezzo serve a capire subito se il progetto è compatibile con il budget.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white border border-gray-200 p-5">
                    <div className="rounded-2xl border border-orange/20 bg-orange/5 p-4">
                      <p className="text-[11px] font-bold tracking-[0.14em] text-orange uppercase">Esempio reale</p>
                      <p className="mt-2 text-sm font-medium text-gray-600">Appartamento 80 mq</p>
                      <p className="mt-2 text-3xl font-black text-navy leading-none">46.750 euro</p>
                    </div>
                    <p className="mt-4 text-xs text-gray-500">
                      Il preventivo definitivo si conferma solo dopo verifica tecnica e sopralluogo.
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
                    <AlertCircle className="h-5 w-5 text-orange mt-0.5 shrink-0" />
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
                  ["01", "Preventivo online immediato", "Parti dal calcolatore con i mq dell'appartamento e ottieni una fascia di prezzo coerente con il livello standard da 550 €/mq."],
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
                  { label: "Ristrutturazione Bagno", prezzo: "da ~450 €/mq", href: `/comune/${slug}/ristrutturazione-bagno/`, attivo: true },
                  { label: "Ristrutturazione Cucina", prezzo: "da ~400 €/mq", href: `/comune/${slug}/ristrutturazione-cucina/`, attivo: true },
                  { label: "Ristrutturazione Appartamento", prezzo: "da ~550 €/mq", href: `/comune/${slug}/`, attivo: true },
                  { label: "Rifacimento Tetto", prezzo: "da ~80 €/mq", href: `/comune/${slug}/rifacimento-tetto/`, attivo: true },
                  { label: "Cappotto Termico", prezzo: "da ~80 €/mq", href: `/comune/${slug}/cappotto-termico/`, attivo: true },
                  { label: "Impianti", prezzo: "da ~150 €/mq", href: `/comune/${slug}/impianti-elettrici-idraulici-termici/`, attivo: true },
                  { label: "Pavimenti e Rivestimenti", prezzo: "da ~60 €/mq", href: `/comune/${slug}/pavimenti-rivestimenti/`, attivo: true },
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
                  ) : null
                )}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Cosa troviamo spesso a {comune.nome}</h2>
              <p className="text-gray-600 mb-2"><strong>{comune.tipoEdilizio}.</strong></p>
              <p className="text-gray-600 mb-6">Conoscere le criticità locali prima del sopralluogo permette stime più accurate e meno sorprese di cantiere.</p>
              <div className="space-y-3">
                {comune.criticalita.map((c, i) => (
                  <div key={i} className="flex gap-3 items-start bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <TriangleAlert className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-800 leading-relaxed">{c}</p>
                  </div>
                ))}
              </div>
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
              Ottieni subito un preventivo immediato basato sui dati del tuo intervento. Dopo la verifica tecnica, confermiamo il quadro economico definitivo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/393339809319?text=Salve%2C%20vorrei%20un%20preventivo%20a%20${encodeURIComponent(comune.nome)}`}
                target="_blank" rel="noopener noreferrer"
                className="bg-orange text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-center"
              >
                Richiedi preventivo su WhatsApp
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

