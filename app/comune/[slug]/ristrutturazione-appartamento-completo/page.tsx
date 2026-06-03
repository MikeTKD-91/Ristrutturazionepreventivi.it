// app/comune/[slug]/ristrutturazione-appartamento-completo/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { comuni, getComuneBySlug } from "@/data/comuni";
import CalcolatoreAppartamento from "@/components/shared/CalcolatoreAppartamento";
import {
  buildBreadcrumb,
  buildLocalBusiness,
  buildServiceSchema,
  buildHowToSchema,
  buildFaqSchema,
} from "@/lib/schema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const COSTI_APPARTAMENTO = [
  { dimensione: "Monolocale / bilocale (fino a 50 mq)", base: "27.500 – 37.500 €", standard: "37.500 – 52.500 €", premium: "52.500 – 75.000 €" },
  { dimensione: "Trilocale (50–80 mq)", base: "44.000 – 60.000 €", standard: "60.000 – 84.000 €", premium: "84.000 – 120.000 €" },
  { dimensione: "Quadrilocale (80–110 mq)", base: "60.500 – 82.500 €", standard: "82.500 – 115.500 €", premium: "115.500 – 165.000 €" },
  { dimensione: "Appartamento grande (oltre 110 mq)", base: "Da 82.500 €", standard: "Da 115.500 €", premium: "Da 165.000 €" },
];

const LIVELLI_FINITURA = [
  { livello: "Base", descrizione: "Ceramiche standard, tinteggiatura liscia, impianti adeguati a norma, serramenti PVC entry-level. Funzionale e certificato.", colore: "bg-gray-100 text-gray-700" },
  { livello: "Standard", descrizione: "Gres porcellanato, controsoffitti, impianti domotici base, serramenti in PVC o alluminio con doppio vetro. Il livello più richiesto.", colore: "bg-blue-50 text-navy" },
  { livello: "Premium", descrizione: "Grandi lastre, finiture su misura, impianti smart home, serramenti alzante-scorrevole, isolamento acustico, cucina e bagni di design.", colore: "bg-orange-50 text-orange" },
];

const COSA_INCLUDE_RIFACIMENTO = [
  { voce: "Demolizioni e smaltimento materiali", incluso: true },
  { voce: "Rifacimento impianto elettrico completo (norma CEI 64-8)", incluso: true },
  { voce: "Rifacimento impianto idraulico-sanitario", incluso: true },
  { voce: "Rifacimento impianto termico (radiatori o fan coil)", incluso: true },
  { voce: "Posa nuovi pavimenti in tutti i locali", incluso: true },
  { voce: "Rivestimenti cucina e bagni", incluso: true },
  { voce: "Intonaci e tinteggiatura completa", incluso: true },
  { voce: "Sostituzione sanitari e rubinetteria bagni", incluso: true },
  { voce: "Controsoffitti e cartongesso", incluso: false, nota: "opzionale, preventivato separatamente" },
  { voce: "Sostituzione serramenti", incluso: false, nota: "disponibile su richiesta, richiede verifica condominiale" },
];

const TEMPISTICHE = [
  { fase: "Demolizioni e rimozioni", giorni: "3–5 gg", nota: "in base alla dimensione e al livello di intervento" },
  { fase: "Impianto elettrico (tracce e cavi)", giorni: "3–5 gg", nota: "prima degli intonaci" },
  { fase: "Impianto idraulico e termico", giorni: "3–5 gg", nota: "in parallelo all'elettrico" },
  { fase: "Intonaci e rasature", giorni: "5–8 gg", nota: "attesa essicazione inclusa" },
  { fase: "Massetti e preparazione pavimenti", giorni: "3–4 gg", nota: "attesa essicazione 28 giorni ridotta con additivi" },
  { fase: "Posa pavimenti e rivestimenti", giorni: "5–10 gg", nota: "in base alla superficie e al formato" },
  { fase: "Installazione impianti (quadri, sanitari, radiatori)", giorni: "3–5 gg", nota: "collaudo incluso" },
  { fase: "Tinteggiatura e finiture finali", giorni: "3–5 gg", nota: "incluse porte e battiscopa" },
];

export async function generateStaticParams() {
  return comuni.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  if (!comune) return {};
  const title = `Ristrutturazione Appartamento a ${comune.nome} | Costi Reali e Preventivo`;
  const description = `Quanto costa ristrutturare un appartamento a ${comune.nome}? Costi reali, criticità locali, tempi di esecuzione e preventivo immediato basato sui dati dell'intervento. Il quadro economico definitivo si conferma dopo sopralluogo tecnico.`;
  const url = `https://ristrutturazionepreventivi.it/comune/${comune.slug}/ristrutturazione-appartamento-completo/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "ristrutturazionepreventivi.it",
      locale: "it_IT",
      type: "article",
      images: [
        {
          url: `https://ristrutturazionepreventivi.it/images/servizi/ristrutturazione-appartamento-completo.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

function buildJsonLd(comune: ReturnType<typeof getComuneBySlug>) {
  if (!comune) return null;
  const servizioSlug = "ristrutturazione-appartamento-completo";

  const breadcrumb = buildBreadcrumb(
    comune.nome,
    comune.slug,
    "Ristrutturazione Appartamento Completo",
    servizioSlug
  );

  const localBusiness = buildLocalBusiness(
    comune.nome,
    `ristrutturazione appartamento a ${comune.nome}. Preventivo immediato, con verifica tecnica e sopralluogo per confermare il quadro economico definitivo.`
  );

  const serviceSchema = buildServiceSchema({
    serviceType: "Ristrutturazione Appartamento",
    serviceName: `Ristrutturazione Appartamento Completo a ${comune.nome}`,
    descrizione: `Ristrutturazione Appartamento a ${comune.nome}. ${comune.tipoEdilizio}.`,
    comuneNome: comune.nome,
    comuneSlug: comune.slug,
    servizioSlug,
    prezzoMin: "20000",
    prezzoMax: "360000",
  });

  const howToSchema = buildHowToSchema("Ristrutturazione Appartamento Completo", comune.nome);

  const faqSource = comune.faqAppartamento && comune.faqAppartamento.length > 0
    ? comune.faqAppartamento
    : comune.faq;
  const faqSchema = buildFaqSchema(faqSource);

  return { breadcrumb, localBusiness, serviceSchema, howToSchema, faqSchema };
}

export default async function RistrutturazioneAppartamentoPage({ params }: PageProps) {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  if (!comune) notFound();
  const jsonLd = buildJsonLd(comune);

  return (
    <>
      {jsonLd && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.localBusiness) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.serviceSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.howToSchema) }} />
          {jsonLd.faqSchema && (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqSchema) }} />
          )}
        </>
      )}
      <main className="min-h-screen bg-white">
        <section className="bg-navy py-14 px-4">
          <div className="max-w-6xl mx-auto">
            <nav className="text-sm text-white/50 mb-6 flex flex-wrap gap-1 items-center">
              <Link href="/" className="hover:text-white transition-colors">Home</Link><span>/</span>
              <Link href="/zone-servite/" className="hover:text-white transition-colors">Zone servite</Link><span>/</span>
              <Link href={`/comune/${comune.slug}/`} className="hover:text-white transition-colors">{comune.nome}</Link><span>/</span>
              <span className="text-white/80">Ristrutturazione Appartamento</span>
            </nav>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-orange text-sm font-semibold uppercase tracking-widest mb-3">Ristrutturazione Appartamento · {comune.nome}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                  Ristrutturazione Appartamento a {comune.nome}:<br />
                  <span className="text-orange">Costi reali e preventivo</span>
                </h1>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Indicazioni di costo basate su riferimenti tecnici, criticità tipiche
                  del patrimonio edilizio di {comune.nome}, tempistiche reali di cantiere.
                  Nessun prezzo inventato: quello definitivo emerge solo dal sopralluogo.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">Prezzario Regionale Campania</span>
                  <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">Garanzia decennale</span>
                  <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">Bonus 50% applicabile</span>
                </div>
                <a href="#calcolatore" className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                  Scopri il costo
                </a>
              </div>
              <div className="hidden lg:block relative h-72 rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/servizi/ristrutturazione-appartamento-completo.jpg" alt={`Ristrutturazione appartamento a ${comune.nome}`} fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </section>

        <div id="calcolatore" className="lg:hidden px-4 pt-6"><CalcolatoreAppartamento comuneDefault={comune.nome} /></div>

        <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-16">

            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Quanto costa ristrutturare un appartamento a {comune.nome}?</h2>
              <p className="text-gray-600 mb-6">
                Le fasce di costo che trovi qui sotto sono basate su riferimenti tecnici e servono
                a capire se l&apos;intervento è compatibile con il tuo budget. Il costo reale dipende
                dall&apos;anno di costruzione dell&apos;edificio, dallo stato degli impianti e dal livello
                di finitura scelto. Solo il sopralluogo consente di definire il preventivo definitivo.
              </p>
              <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy text-white">
                      <th className="text-left py-4 px-5 font-semibold">Dimensione appartamento</th>
                      <th className="text-center py-4 px-4 font-semibold">Base</th>
                      <th className="text-center py-4 px-4 font-semibold">Standard</th>
                      <th className="text-center py-4 px-4 font-semibold text-orange">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COSTI_APPARTAMENTO.map((row, i) => (
                      <tr key={row.dimensione} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="py-4 px-5 font-medium text-navy">{row.dimensione}</td>
                        <td className="py-4 px-4 text-center text-gray-700">{row.base}</td>
                        <td className="py-4 px-4 text-center text-gray-700">{row.standard}</td>
                        <td className="py-4 px-4 text-center font-semibold text-navy">{row.premium}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="md:hidden space-y-4 mb-4">
                {COSTI_APPARTAMENTO.map((row) => (
                  <div key={row.dimensione} className="border border-gray-200 rounded-xl p-4">
                    <p className="font-semibold text-navy mb-3">{row.dimensione}</p>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="bg-gray-50 rounded-lg p-2 text-center"><p className="text-gray-500 text-xs mb-1">Base</p><p className="font-medium text-gray-700">{row.base}</p></div>
                      <div className="bg-blue-50 rounded-lg p-2 text-center"><p className="text-navy text-xs mb-1">Standard</p><p className="font-medium text-navy">{row.standard}</p></div>
                      <div className="bg-orange-50 rounded-lg p-2 text-center"><p className="text-orange text-xs mb-1">Premium</p><p className="font-medium text-navy">{row.premium}</p></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <span className="text-amber-500 text-lg flex-shrink-0 mt-0.5">⚠</span>
                <p className="text-sm text-amber-900">
                  <strong>Questi valori non costituiscono un preventivo vincolante.</strong>{" "}
                  Il prezzo definitivo dipende dallo stato degli impianti, dall&apos;anno di costruzione e dalle scelte di materiale. Il sopralluogo è l&apos;unico modo per definire un preventivo preciso.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Cosa cambia tra finitura Base, Standard e Premium?</h2>
              <p className="text-gray-600 mb-6">Il livello di finitura è il principale fattore che sposta il costo. Ecco cosa include ciascun livello nella pratica.</p>
              <div className="grid md:grid-cols-3 gap-4">
                {LIVELLI_FINITURA.map((lv) => (
                  <div key={lv.livello} className={`rounded-xl p-5 ${lv.colore}`}>
                    <p className="font-bold text-lg mb-2">{lv.livello}</p>
                    <p className="text-sm leading-relaxed">{lv.descrizione}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Cosa include la ristrutturazione completa dell&apos;appartamento</h2>
              <p className="text-gray-600 mb-6">Un appartamento ristrutturato bene è un intervento di sistema, non una somma di lavoretti. Ecco cosa comprende a regola d&apos;arte.</p>
              <div className="space-y-3">
                {COSA_INCLUDE_RIFACIMENTO.map((item) => (
                  <div key={item.voce} className={`flex items-start gap-3 p-4 rounded-xl ${item.incluso ? "bg-green-50" : "bg-gray-50"}`}>
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${item.incluso ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"}`}>
                      {item.incluso ? "✓" : "○"}
                    </span>
                    <div>
                      <p className={`text-sm font-medium ${item.incluso ? "text-gray-800" : "text-gray-500"}`}>{item.voce}</p>
                      {item.nota && <p className="text-xs text-gray-400 mt-0.5">{item.nota}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Criticità tipiche degli immobili a {comune.nome}</h2>
              <p className="text-gray-600 mb-6">{comune.tipoEdilizio}. Prima di ogni sopralluogo, teniamo conto delle caratteristiche specifiche del patrimonio edilizio locale.</p>
              <div className="space-y-3">
                {comune.criticalita.map((c, i) => (
                  <div key={i} className="flex gap-3 items-start bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <span className="flex-shrink-0 text-amber-500 mt-0.5">▲</span>
                    <p className="text-sm text-gray-800 leading-relaxed">{c}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">Queste criticità emergono spesso solo durante il sopralluogo. Il nostro tecnico le verifica sistematicamente prima di confermare il quadro economico definitivo.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Quanto dura il cantiere?</h2>
              <p className="text-gray-600 mb-6">
                Un appartamento di 70–80 mq richiede mediamente <strong>6–10 settimane lavorative</strong>{" "}
                per la ristrutturazione completa. I tempi dipendono fortemente dallo stato degli impianti esistenti e dal livello di finitura scelto.
              </p>
              <div className="space-y-2">
                {TEMPISTICHE.map((t, i) => (
                  <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{t.fase}</p>
                      {t.nota && <p className="text-xs text-gray-400">{t.nota}</p>}
                    </div>
                    <span className="flex-shrink-0 text-sm font-semibold text-navy">{t.giorni}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">I tempi si allungano in presenza di bonifica amianto, problemi strutturali o modifiche alla distribuzione degli spazi. Il programma definitivo viene definito al sopralluogo.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Come funziona con noi</h2>
              <p className="text-gray-600 mb-8">Tre passaggi, nessuna sorpresa.</p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { step: "01", titolo: "Preventivo online immediato", testo: "Inserisci i dati dell'appartamento nel calcolatore o scrivici su WhatsApp. Verifichi il costo della ristrutturazione e capisci se l'intervento è compatibile con il tuo budget." },
                  { step: "02", titolo: "Sopralluogo tecnico", testo: "Il nostro tecnico visita l'immobile, verifica lo stato degli impianti, l'anno di costruzione e le caratteristiche strutturali per raccogliere tutte le informazioni necessarie." },
                  { step: "03", titolo: "Preventivo scritto", testo: "Ricevi un preventivo scritto con prezzi unitari, materiali specificati, tempistiche e condizioni di garanzia. Trasparente, senza voci generiche." },
                ].map((s) => (
                  <div key={s.step}>
                    <p className="text-5xl font-black text-gray-100 mb-3 leading-none">{s.step}</p>
                    <h3 className="text-base font-bold text-navy mb-2">{s.titolo}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.testo}</p>
                  </div>
                ))}
              </div>
            </section>

            {(() => {
              const faqRender = comune.faqAppartamento && comune.faqAppartamento.length > 0
                ? comune.faqAppartamento
                : comune.faq;
              return faqRender.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-navy mb-2">Domande frequenti sulla ristrutturazione appartamento a {comune.nome}</h2>
                  <p className="text-gray-600 mb-6">Le domande che ci vengono poste più spesso da chi ci contatta da {comune.nome}.</p>
                  <div className="space-y-4">
                    {faqRender.map((faq, i) => (
                      <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
                        <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none hover:bg-gray-50 transition-colors">
                          <span className="font-medium text-navy text-sm leading-snug">{faq.domanda}</span>
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange/10 text-orange flex items-center justify-center text-sm group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <div className="px-5 pb-5 pt-1"><p className="text-sm text-gray-700 leading-relaxed">{faq.risposta}</p></div>
                      </details>
                    ))}
                  </div>
                </section>
              );
            })()}

            {comune.vicini.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-navy mb-4">Ristrutturazione appartamento nei comuni vicini a {comune.nome}</h2>
                <div className="flex flex-wrap gap-3">
                  {comune.vicini.map((slug) => {
                    const vicino = getComuneBySlug(slug);
                    if (!vicino) return null;
                    return (
                      <Link key={slug} href={`/comune/${slug}/`} className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-navy hover:text-white text-gray-700 text-sm font-medium px-4 py-2 rounded-full transition-colors">
                        Appartamento a {vicino.nome}
                      </Link>
                    );
                  })}
                  <Link href={`/comune/${comune.slug}/`} className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-navy hover:text-white text-gray-700 text-sm font-medium px-4 py-2 rounded-full transition-colors">
                    Tutti i servizi a {comune.nome} →
                  </Link>
                </div>
              </section>
            )}
          </div>

          <div className="hidden lg:block">
            <div id="calcolatore" className="sticky top-6 space-y-6">
              <CalcolatoreAppartamento comuneDefault={comune.nome} />
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm font-semibold text-navy mb-3">Altri servizi a {comune.nome}</p>
                <div className="space-y-2">
                  {[
                    { label: "Ristrutturazione Bagno", href: `/comune/${comune.slug}/ristrutturazione-bagno/` },
                    { label: "Ristrutturazione Cucina", href: `/comune/${comune.slug}/ristrutturazione-cucina/` },
                    { label: "Rifacimento Tetto", href: `/comune/${comune.slug}/rifacimento-tetto/` },
                    { label: "Cappotto Termico", href: `/comune/${comune.slug}/cappotto-termico/` },
                    { label: "Impianti", href: `/comune/${comune.slug}/impianti-elettrici-idraulici-termici/` },
                    { label: "Pavimenti e Rivestimenti", href: `/comune/${comune.slug}/pavimenti-rivestimenti/` },
                  ].map((s) => (
                    <Link key={s.href} href={s.href} className="flex items-center justify-between text-sm text-gray-700 hover:text-navy py-2 border-b border-gray-200 last:border-0 transition-colors">
                      {s.label}<span className="text-gray-400">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-navy py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Vuoi sapere quanto costa ristrutturare il tuo appartamento a {comune.nome}?</h2>
            <p className="text-white/70 mb-8 text-lg">Scopri il costo del tuo intervento. Se la forbice è in linea col tuo budget, organizziamo il sopralluogo e prepariamo il preventivo dettagliato.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`https://wa.me/393339809319?text=Salve%2C%20vorrei%20un%20preventivo%20per%20la%20ristrutturazione%20dell%27appartamento%20a%20${encodeURIComponent(comune.nome)}`} target="_blank" rel="noopener noreferrer" className="bg-orange text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-center">
                Richiedi preventivo su WhatsApp
              </a>
              <a href="tel:+393339809319" className="bg-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors text-center">
                Chiama +39 333 980 9319
              </a>
            </div>
            <p className="text-white/40 text-xs mt-6">Russo FE Costruzione SRL · Lusciano (CE) · P.IVA 04836230617</p>
          </div>
        </section>
      </main>
    </>
  );
}
