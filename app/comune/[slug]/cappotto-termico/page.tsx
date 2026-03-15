// app/comune/[slug]/cappotto-termico/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { comuni, getComuneBySlug } from "@/data/comuni";
import CalcolatoreStima from "@/components/shared/CalcolatoreStima";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const COSTI_BAGNO = [
  { dimensione: "Bagno piccolo (fino a 4 mq)", base: "3.800 – 5.200 €", standard: "5.200 – 7.500 €", premium: "7.500 – 10.000 €" },
  { dimensione: "Bagno standard (4–6 mq)", base: "5.000 – 6.500 €", standard: "6.500 – 9.000 €", premium: "9.000 – 13.000 €" },
  { dimensione: "Bagno grande (6–9 mq)", base: "6.500 – 8.500 €", standard: "8.500 – 12.000 €", premium: "12.000 – 17.000 €" },
  { dimensione: "Bagno padronale (oltre 9 mq)", base: "8.500 – 11.000 €", standard: "11.000 – 15.000 €", premium: "15.000 – 22.000 €" },
];

const LIVELLI_FINITURA = [
  { livello: "Base", descrizione: "Ceramica standard, sanitari di primo livello, rubinetteria entry-level. Funzionale, senza ricerca estetica.", colore: "bg-gray-100 text-gray-700" },
  { livello: "Standard", descrizione: "Gres porcellanato o grandi formati, sanitari sospesi, rubinetteria miscelatore. Il livello più richiesto.", colore: "bg-blue-50 text-navy" },
  { livello: "Premium", descrizione: "Grandi lastre, sanitari di design, doccia walk-in, riscaldamento a pavimento, domotica. Nessun compromesso.", colore: "bg-orange-50 text-orange" },
];

const COSA_INCLUDE_RIFACIMENTO = [
  { voce: "Demolizione e smaltimento rivestimenti e sanitari esistenti", incluso: true },
  { voce: "Impermeabilizzazione pareti e pavimento (sistema a ponte liquido)", incluso: true },
  { voce: "Posa nuovi rivestimenti e pavimenti", incluso: true },
  { voce: "Sostituzione sanitari (WC, bidet, lavabo)", incluso: true },
  { voce: "Nuova rubinetteria e miscelatori", incluso: true },
  { voce: "Rifacimento impianto idrico-sanitario interno", incluso: true },
  { voce: "Rifacimento impianto elettrico bagno (IP44 obbligatorio)", incluso: true },
  { voce: "Sostituzione vasca / box doccia", incluso: true },
  { voce: "Nuova porta e telaio", incluso: false, nota: "opzionale, preventivata separatamente" },
  { voce: "Riscaldamento a pavimento", incluso: false, nota: "disponibile su richiesta, preventivato separatamente" },
];

const TEMPISTICHE = [
  { fase: "Demolizione e rimozione", giorni: "2–3 gg", nota: "smaltimento in giornata" },
  { fase: "Impermeabilizzazione", giorni: "1–2 gg", nota: "attesa essicazione inclusa" },
  { fase: "Posa pavimento e rivestimenti", giorni: "3–5 gg", nota: "in base alla dimensione e al formato" },
  { fase: "Impianti idrico-sanitari", giorni: "1–2 gg", nota: "in parallelo o successivo" },
  { fase: "Impianto elettrico", giorni: "1 gg", nota: "obbligatorio IP44 in zone umide" },
  { fase: "Montaggio sanitari e rubinetteria", giorni: "1 gg", nota: "" },
  { fase: "Stuccatura, sigillatura, rifinitura", giorni: "1–2 gg", nota: "attesa essicazione inclusa" },
];

export async function generateStaticParams() {
  return comuni.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  if (!comune) return {};
  const title = `Ristrutturazione Bagno a ${comune.nome} | Costi Reali e Preventivo`;
  const description = `Quanto costa rifare il bagno a ${comune.nome}? Costi orientativi da Prezzario Regionale Campania, criticità locali, tempistiche reali. Stima gratuita senza impegno.`;
  const url = `https://ristrutturazionepreventivi.it/comune/${comune.slug}/cappotto-termico/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "ristrutturazionepreventivi.it", locale: "it_IT", type: "article" },
  };
}

function buildJsonLd(comune: ReturnType<typeof getComuneBySlug>) {
  if (!comune) return null;
  const pageUrl = `https://ristrutturazionepreventivi.it/comune/${comune.slug}/cappotto-termico/`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ristrutturazionepreventivi.it/" },
      { "@type": "ListItem", position: 2, name: "Zone Servite", item: "https://ristrutturazionepreventivi.it/zone-servite/" },
      { "@type": "ListItem", position: 3, name: comune.nome, item: `https://ristrutturazionepreventivi.it/comune/${comune.slug}/` },
      { "@type": "ListItem", position: 4, name: "Ristrutturazione Bagno", item: pageUrl },
    ],
  };
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Russo FE Costruzione SRL",
    url: "https://ristrutturazionepreventivi.it",
    telephone: "+393339809319",
    address: { "@type": "PostalAddress", streetAddress: "Viale della Libertà 3", addressLocality: "Lusciano", addressRegion: "CE", postalCode: "81030", addressCountry: "IT" },
    areaServed: { "@type": "City", name: comune.nome },
    description: `Ristrutturazione bagno a ${comune.nome}. Preventivi con sopralluogo, stime orientative gratuite.`,
  };
  const faqSchema = comune.faq.length > 0
    ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: comune.faq.map((f) => ({ "@type": "Question", name: f.domanda, acceptedAnswer: { "@type": "Answer", text: f.risposta } })) }
    : null;
  return { breadcrumb, localBusiness, faqSchema };
}

export default async function RistrutturazioneBagnoPage({ params }: PageProps) {
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
          {jsonLd.faqSchema && (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqSchema) }} />
          )}
        </>
      )}

      <main className="min-h-screen bg-white">

        {/* ── HERO ── */}
        <section className="bg-navy py-14 px-4">
          <div className="max-w-6xl mx-auto">
            <nav className="text-sm text-white/50 mb-6 flex flex-wrap gap-1 items-center">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/zone-servite/" className="hover:text-white transition-colors">Zone servite</Link>
              <span>/</span>
              <Link href={`/comune/${comune.slug}/`} className="hover:text-white transition-colors">{comune.nome}</Link>
              <span>/</span>
              <span className="text-white/80">Ristrutturazione Bagno</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-10 items-center">

              {/* Testo */}
              <div>
                <p className="text-orange text-sm font-semibold uppercase tracking-widest mb-3">
                  Ristrutturazione Bagno · {comune.nome}
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                  Ristrutturazione Bagno a {comune.nome}:<br />
                  <span className="text-orange">Costi Reali e Stima Gratuita</span>
                </h1>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Prezzi orientativi basati sul Prezzario Regionale Campania, criticità tipiche
                  del patrimonio edilizio di {comune.nome}, tempistiche reali di cantiere.
                  Nessun prezzo inventato: quello definitivo emerge solo dal sopralluogo.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">Prezzario Regionale Campania</span>
                  <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">Garanzia decennale</span>
                  <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">Bonus 50% applicabile</span>
                </div>
                {/* Pulsante scroll verso calcolatore */}
                <a
                  href="#calcolatore"
                  className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  Calcola la tua stima gratuita
                </a>
              </div>

              {/* Foto servizio */}
              <div className="hidden lg:block relative h-72 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/servizi/cappotto-termico.jpg"
                  alt={`Ristrutturazione bagno a ${comune.nome}`}
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

        {/* ── CORPO PAGINA ── */}
        <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-16">

            {/* ── TABELLA COSTI ── */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Quanto costa rifare il bagno a {comune.nome}?</h2>
              <p className="text-gray-600 mb-6">
                Le forbici di costo che trovi qui sotto sono orientative e si basano sul{" "}
                <strong>Prezzario Regionale Campania</strong>. Il prezzo reale del tuo bagno
                emerge solo dopo il sopralluogo, che permette di rilevare lo stato degli impianti
                esistenti, eventuali criticità strutturali e le scelte di materiale.
              </p>
              <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy text-white">
                      <th className="text-left py-4 px-5 font-semibold">Dimensione bagno</th>
                      <th className="text-center py-4 px-4 font-semibold">Base</th>
                      <th className="text-center py-4 px-4 font-semibold">Standard</th>
                      <th className="text-center py-4 px-4 font-semibold text-orange">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COSTI_BAGNO.map((row, i) => (
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
                {COSTI_BAGNO.map((row) => (
                  <div key={row.dimensione} className="border border-gray-200 rounded-xl p-4">
                    <p className="font-semibold text-navy mb-3">{row.dimensione}</p>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="bg-gray-50 rounded-lg p-2 text-center">
                        <p className="text-gray-500 text-xs mb-1">Base</p>
                        <p className="font-medium text-gray-700">{row.base}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2 text-center">
                        <p className="text-navy text-xs mb-1">Standard</p>
                        <p className="font-medium text-navy">{row.standard}</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-2 text-center">
                        <p className="text-orange text-xs mb-1">Premium</p>
                        <p className="font-medium text-navy">{row.premium}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
                <span className="text-amber-500 text-lg flex-shrink-0 mt-0.5">⚠</span>
                <p className="text-sm text-amber-900">
                  <strong>Questi sono costi orientativi, non preventivi vincolanti.</strong>{" "}
                  Il prezzo definitivo dipende dallo stato degli impianti esistenti, dalla
                  presenza di criticità non visibili a distanza e dalle scelte specifiche di
                  materiale. L&apos;unico modo per avere un preventivo preciso è il sopralluogo.
                </p>
              </div>
            </section>

            {/* ── LIVELLI FINITURA ── */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Cosa cambia tra finitura Base, Standard e Premium?</h2>
              <p className="text-gray-600 mb-6">
                Il livello di finitura è il principale fattore che sposta il costo verso l&apos;alto o verso il basso. Ecco cosa include ciascun livello nella pratica.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {LIVELLI_FINITURA.map((lv) => (
                  <div key={lv.livello} className={`rounded-xl p-5 ${lv.colore}`}>
                    <p className="font-bold text-lg mb-2">{lv.livello}</p>
                    <p className="text-sm leading-relaxed">{lv.descrizione}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── COSA INCLUDE ── */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Cosa include il rifacimento completo del bagno</h2>
              <p className="text-gray-600 mb-6">
                Un rifacimento completo non è solo "cambiare le piastrelle". Ecco cosa comprende un intervento eseguito a regola d&apos;arte.
              </p>
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

            {/* ── CRITICITÀ LOCALI ── */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Criticità tipiche degli immobili a {comune.nome}</h2>
              <p className="text-gray-600 mb-6">
                {comune.tipoEdilizio}. Prima di ogni sopralluogo, teniamo conto delle caratteristiche specifiche del patrimonio edilizio locale.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-navy mb-2">Bagni tipici a {comune.nome}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{comune.caratteristicheBagni}</p>
              </div>
              <div className="space-y-3">
                {comune.criticalita.map((c, i) => (
                  <div key={i} className="flex gap-3 items-start bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <span className="flex-shrink-0 text-amber-500 mt-0.5">▲</span>
                    <p className="text-sm text-gray-800 leading-relaxed">{c}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Queste criticità emergono spesso solo durante il sopralluogo. Il nostro tecnico le verifica sistematicamente prima di emettere qualsiasi stima definitiva.
              </p>
            </section>

            {/* ── TEMPISTICHE ── */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Quanto dura il cantiere?</h2>
              <p className="text-gray-600 mb-6">
                Un bagno standard (4–6 mq) richiede mediamente <strong>1 settimana lavorativa</strong>{" "}
                per il rifacimento completo. Le fasi si susseguono nell&apos;ordine indicato — alcune in parallelo, altre con attese obbligatorie di essicazione.
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
              <p className="text-sm text-gray-500 mt-4">
                I tempi si allungano in presenza di criticità (bonifica amianto, problemi strutturali, modifiche agli impianti condominiali). Il programma definitivo viene definito al sopralluogo.
              </p>
            </section>

            {/* ── COME FUNZIONA ── */}
            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Come funziona con noi</h2>
              <p className="text-gray-600 mb-8">Tre passaggi, nessuna sorpresa.</p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { step: "01", titolo: "Stima gratuita", testo: "Inserisci i dati del tuo bagno nel calcolatore o scrivici su WhatsApp. Ricevi subito una forbice di costo indicativa basata sul Prezzario Campania. Nessun impegno." },
                  { step: "02", titolo: "Sopralluogo tecnico", testo: "Il nostro tecnico visita l'immobile, verifica lo stato degli impianti, rileva eventuali criticità e raccoglie tutte le informazioni per il preventivo definitivo." },
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

            {/* ── FAQ ── */}
            {comune.faq.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-navy mb-2">
                  Domande frequenti sulla ristrutturazione bagno a {comune.nome}
                </h2>
                <p className="text-gray-600 mb-6">
                  Le domande che ci vengono poste più spesso da chi ci contatta da {comune.nome}.
                </p>
                <div className="space-y-4">
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

            {/* ── COMUNI VICINI ── */}
            {comune.vicini.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-navy mb-4">
                  Ristrutturazione bagno nei comuni vicini a {comune.nome}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {comune.vicini.map((slug) => {
                    const vicino = getComuneBySlug(slug);
                    if (!vicino) return null;
                    return (
                      <Link key={slug} href={`/comune/${slug}/cappotto-termico/`} className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-navy hover:text-white text-gray-700 text-sm font-medium px-4 py-2 rounded-full transition-colors">
                        Bagno a {vicino.nome}
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

          {/* ── SIDEBAR STICKY ── */}
          <div className="hidden lg:block">
            <div id="calcolatore" className="sticky top-6 space-y-6">
              <CalcolatoreStima comuneDefault={comune.nome} />
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm font-semibold text-navy mb-3">Altri servizi a {comune.nome}</p>
                <div className="space-y-2">
                  {[
                    { label: "Ristrutturazione Appartamento", href: `/comune/${comune.slug}/` },
                    { label: "Ristrutturazione Cucina", href: `/comune/${comune.slug}/ristrutturazione-cucina/` },
                    { label: "Cappotto Termico", href: `/comune/${comune.slug}/cappotto-termico/` },
                    { label: "Impianti", href: `/comune/${comune.slug}/impianti/` },
                  ].map((s) => (
                    <Link key={s.href} href={s.href} className="flex items-center justify-between text-sm text-gray-700 hover:text-navy py-2 border-b border-gray-200 last:border-0 transition-colors">
                      {s.label}
                      <span className="text-gray-400">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── CTA FINALE ── */}
        <section className="bg-navy py-14 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Vuoi sapere quanto costa il tuo bagno a {comune.nome}?
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              Parti dalla stima gratuita. Se la forbice è in linea col tuo budget,
              organizziamo il sopralluogo e prepariamo il preventivo dettagliato.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/393339809319?text=Salve%2C%20vorrei%20un%20preventivo%20per%20la%20ristrutturazione%20del%20bagno%20a%20${encodeURIComponent(comune.nome)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-center"
              >
                Richiedi stima su WhatsApp
              </a>
              <a href="tel:+393339809319" className="bg-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors text-center">
                Chiama +39 333 980 9319
              </a>
            </div>
            <p className="text-white/40 text-xs mt-6">
              Russo FE Costruzione SRL · Lusciano (CE) · P.IVA e C.F. da inserire
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
