// app/comune/[slug]/impianti-elettrici-idraulici-termici/page.tsx

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { comuni, getComuneBySlug } from "@/data/comuni";
import ScopriIlCostoDellaTuaRistrutturazione from "@/components/shared/ScopriIlCostoDellaTuaRistrutturazione";
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

const COSTI_IMPIANTI = [
  { dimensione: "Impianto elettrico (€/mq appartamento)", base: "40 – 65 €/mq", standard: "65 – 100 €/mq", premium: "100 – 160 €/mq" },
  { dimensione: "Impianto idraulico-sanitario (€/mq appartamento)", base: "50 – 80 €/mq", standard: "80 – 130 €/mq", premium: "130 – 200 €/mq" },
  { dimensione: "Impianto termico (sostituzione caldaia + radiatori)", base: "4.500 – 7.000 €", standard: "7.000 – 12.000 €", premium: "12.000 – 22.000 €" },
  { dimensione: "Pacchetto impianti completo (elettrico + idraulico + termico)", base: "150 – 200 €/mq", standard: "200 – 300 €/mq", premium: "300 – 450 €/mq" },
];

const LIVELLI_FINITURA = [
  { livello: "Base", descrizione: "Quadro elettrico standard, tubazioni in multistrato, caldaia a condensazione entry-level, radiatori in alluminio. A norma CEI e UNI.", colore: "bg-gray-100 text-gray-700" },
  { livello: "Standard", descrizione: "Quadro con protezioni differenziali per circuiti, tubazioni a vista o incassate, caldaia efficiente classe A, termostat programmabile. Il livello più richiesto.", colore: "bg-blue-50 text-navy" },
  { livello: "Premium", descrizione: "Domotica e gestione smart da app, impianto radiante a pavimento, pompa di calore aria-acqua, pannelli solari, accumulo termico, certificazione APE.", colore: "bg-orange-50 text-orange" },
];

const COSA_INCLUDE_RIFACIMENTO = [
  { voce: "Tracce e cavidotti per nuovi percorsi impianti", incluso: true },
  { voce: "Impianto elettrico completo (quadro, cavi, prese, interruttori)", incluso: true },
  { voce: "Certificazione impianto elettrico (dichiarazione di conformità)", incluso: true },
  { voce: "Impianto idraulico (alimentazione, scarichi, colonne)", incluso: true },
  { voce: "Sostituzione o installazione caldaia a condensazione", incluso: true },
  { voce: "Distribuzione riscaldamento (radiatori o fan coil)", incluso: true },
  { voce: "Collaudo impianti e verifica tenuta", incluso: true },
  { voce: "Documentazione tecnica e libretti impianto", incluso: true },
  { voce: "Impianto fotovoltaico", incluso: false, nota: "preventivato separatamente, richiede valutazione esposizione e struttura" },
  { voce: "Riscaldamento a pavimento (impianto radiante)", incluso: false, nota: "disponibile su richiesta, richiede massetto dedicato" },
];

const TEMPISTICHE = [
  { fase: "Demolizioni e apertura tracce", giorni: "2–4 gg", nota: "in base alla dimensione dell'appartamento" },
  { fase: "Posa cavidotti e tubazioni", giorni: "3–5 gg", nota: "prima degli intonaci" },
  { fase: "Installazione quadro elettrico", giorni: "1–2 gg", nota: "dopo completamento cavi" },
  { fase: "Collegamento impianto idraulico", giorni: "2–3 gg", nota: "manifold, colonne, attacchi sanitari" },
  { fase: "Installazione caldaia e distribuzione termica", giorni: "2–3 gg", nota: "messa in funzione inclusa" },
  { fase: "Collaudo impianti e verifica pressioni", giorni: "1 gg", nota: "obbligatorio per certificazione" },
  { fase: "Rilascio certificazioni e documentazione", giorni: "1–3 gg", nota: "dichiarazione di conformità elettrica e libretto caldaia" },
];

export async function generateStaticParams() {
  return comuni.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  if (!comune) return {};
  const title = `Impianti Elettrici, Idraulici e Termici a ${comune.nome} | Costi Reali, Preventivo Immediato`;
  const description = `Quanto costano gli impianti a ${comune.nome}? Elettrico, idraulico e termico: costi reali, preventivo immediato, normative, certificazioni e sopralluogo tecnico.`;
  const url = `https://ristrutturazionepreventivi.it/comune/${comune.slug}/impianti-elettrici-idraulici-termici/`;
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
          url: `https://ristrutturazionepreventivi.it/images/servizi/impianti-elettrici-idraulici-termici.jpg`,
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
  const servizioSlug = "impianti-elettrici-idraulici-termici";

  const breadcrumb = buildBreadcrumb(
    comune.nome,
    comune.slug,
    "Impianti Elettrici, Idraulici e Termici",
    servizioSlug
  );

  const localBusiness = buildLocalBusiness(
    comune.nome,
    `impianti elettrici idraulici e termici a ${comune.nome}. Preventivo immediato con sopralluogo, verifica tecnica e analisi del caso reale.`
  );

  const serviceSchema = buildServiceSchema({
    serviceType: "Impianti Elettrici Idraulici e Termici",
    serviceName: `Impianti Elettrici, Idraulici e Termici a ${comune.nome}`,
    descrizione: `Impianti Elettrici Idraulici e Termici a ${comune.nome}. ${comune.tipoEdilizio}.`,
    comuneNome: comune.nome,
    comuneSlug: comune.slug,
    servizioSlug,
    prezzoMin: "4500",
    prezzoMax: "45000",
  });

  const howToSchema = buildHowToSchema("Impianti Elettrici, Idraulici e Termici", comune.nome);

  const faqSchema = buildFaqSchema(comune.faq);

  return { breadcrumb, localBusiness, serviceSchema, howToSchema, faqSchema };
}

export default async function ImpiantiPage({ params }: PageProps) {
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
              <span className="text-white/80">Impianti Elettrici, Idraulici e Termici</span>
            </nav>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-orange text-sm font-semibold uppercase tracking-widest mb-3">Impianti · {comune.nome}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                  Impianti a {comune.nome}:<br />
                  <span className="text-orange">Costi reali, preventivo immediato</span>
                </h1>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Indicazioni di costo per impianti elettrici, idraulici e termici basate su
                  riferimenti tecnici, stato dell'esistente, distribuzione interna e adeguamenti
                  normativi. Il preventivo definitivo emerge dopo sopralluogo e verifica tecnica.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">Prezzario Regionale Campania</span>
                  <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">Certificazioni incluse</span>
                  <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">Ecobonus applicabile</span>
                </div>
                <a href="#calcolatore" className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                  Scopri il costo
                </a>
              </div>
              <div className="hidden lg:block relative h-72 rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/servizi/impianti-elettrici-idraulici-termici.jpg" alt={`Rifacimento impianti a ${comune.nome}`} fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </section>

        <div id="calcolatore" className="lg:hidden px-4 pt-6"><ScopriIlCostoDellaTuaRistrutturazione comuneDefault={comune.nome} /></div>

        <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-16">

            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Quanto costano gli impianti a {comune.nome}?</h2>
              <p className="text-gray-600 mb-6">
                Le forbici di costo che trovi qui sotto sono orientative e si basano sul{" "}
                <strong>Prezzario Regionale Campania</strong>. Il costo reale dipende dall&apos;anno
                di costruzione dell&apos;edificio, dallo stato degli impianti esistenti e dall&apos;estensione
                dell&apos;intervento. Solo il sopralluogo consente una stima definitiva.
              </p>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5 flex gap-3">
                <span className="text-blue-500 text-lg flex-shrink-0 mt-0.5">ℹ</span>
                <p className="text-sm text-navy">
                  <strong>Nota importante:</strong> per legge, gli impianti devono essere realizzati da ditte abilitate e devono essere corredati da dichiarazione di conformità (DM 37/2008). Affidati sempre a chi rilascia la documentazione obbligatoria.
                </p>
              </div>
              <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy text-white">
                      <th className="text-left py-4 px-5 font-semibold">Tipo di intervento</th>
                      <th className="text-center py-4 px-4 font-semibold">Base</th>
                      <th className="text-center py-4 px-4 font-semibold">Standard</th>
                      <th className="text-center py-4 px-4 font-semibold text-orange">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COSTI_IMPIANTI.map((row, i) => (
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
                {COSTI_IMPIANTI.map((row) => (
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
                  Il prezzo definitivo dipende dallo stato degli impianti esistenti, dall&apos;anno di costruzione dell&apos;edificio, dalla distribuzione degli ambienti e dall&apos;estensione dell&apos;intervento. Il sopralluogo è l&apos;unico modo per definire un preventivo preciso.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Cosa cambia tra impianti Base, Standard e Premium?</h2>
              <p className="text-gray-600 mb-6">Tutti i livelli sono a norma di legge. Quello che cambia è la tecnologia, l&apos;efficienza energetica e il grado di automazione.</p>
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
              <h2 className="text-2xl font-bold text-navy mb-2">Cosa include il rifacimento completo degli impianti</h2>
              <p className="text-gray-600 mb-6">Un impianto fatto bene non è solo tubi e cavi. Ecco cosa comprende un intervento eseguito a regola d&apos;arte, incluse le certificazioni obbligatorie.</p>
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
              <p className="text-sm text-gray-500 mt-4">Negli edifici anni &apos;60–&apos;70 è comune trovare impianti elettrici in alluminio (non a norma) e tubazioni in piombo da sostituire obbligatoriamente. Il nostro tecnico li verifica al sopralluogo.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Quanto dura il cantiere?</h2>
              <p className="text-gray-600 mb-6">
                Il rifacimento completo degli impianti di un appartamento di 80 mq richiede mediamente{" "}
                <strong>2–3 settimane lavorative</strong> per la fase impiantistica, a cui si aggiungono
                i tempi degli intonaci se l&apos;intervento è incluso nella ristrutturazione complessiva.
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
              <p className="text-sm text-gray-500 mt-4">In presenza di impianti in alluminio o tubazioni in piombo, la bonifica richiede tempi aggiuntivi e può comportare interventi sulle parti comuni condominiali. Il programma definitivo viene definito al sopralluogo.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Come funziona con noi</h2>
              <p className="text-gray-600 mb-8">Tre passaggi, nessuna sorpresa.</p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { step: "01", titolo: "Preventivo online immediato", testo: "Inserisci i dati dell'appartamento nel calcolatore o scrivici su WhatsApp per ottenere un preventivo online immediato. È un primo quadro economico utile per capire la compatibilità con il budget, ma non sostituisce il sopralluogo tecnico." },
                  { step: "02", titolo: "Sopralluogo tecnico", testo: "Il nostro tecnico verifica lo stato degli impianti esistenti, l'anno di costruzione e la normativa applicabile per definire l'intervento necessario con relative certificazioni." },
                  { step: "03", titolo: "Preventivo scritto", testo: "Ricevi un preventivo con dettaglio per ogni impianto, materiali specificati, tempistiche e garanzie. Tutte le certificazioni obbligatorie sono incluse." },
                ].map((s) => (
                  <div key={s.step}>
                    <p className="text-5xl font-black text-gray-100 mb-3 leading-none">{s.step}</p>
                    <h3 className="text-base font-bold text-navy mb-2">{s.titolo}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.testo}</p>
                  </div>
                ))}
              </div>
            </section>

            {comune.faq.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-navy mb-2">Domande frequenti sugli impianti a {comune.nome}</h2>
                <p className="text-gray-600 mb-6">Le domande che ci vengono poste più spesso da chi ci contatta da {comune.nome}.</p>
                <div className="space-y-4">
                  {comune.faq.map((faq, i) => (
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
            )}

            {comune.vicini.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-navy mb-4">Impianti nei comuni vicini a {comune.nome}</h2>
                <div className="flex flex-wrap gap-3">
                  {comune.vicini.map((slug) => {
                    const vicino = getComuneBySlug(slug);
                    if (!vicino) return null;
                    return (
                      <Link key={slug} href={`/comune/${slug}/impianti-elettrici-idraulici-termici/`} className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-navy hover:text-white text-gray-700 text-sm font-medium px-4 py-2 rounded-full transition-colors">
                        Impianti a {vicino.nome}
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
              <ScopriIlCostoDellaTuaRistrutturazione comuneDefault={comune.nome} />
              <div className="bg-gray-50 rounded-2xl p-5">
                <p className="text-sm font-semibold text-navy mb-3">Altri servizi a {comune.nome}</p>
                <div className="space-y-2">
                  {[
                    { label: "Ristrutturazione Appartamento", href: `/comune/${comune.slug}/` },
                    { label: "Ristrutturazione Bagno", href: `/comune/${comune.slug}/ristrutturazione-bagno/` },
                    { label: "Ristrutturazione Cucina", href: `/comune/${comune.slug}/ristrutturazione-cucina/` },
                    { label: "Rifacimento Tetto", href: `/comune/${comune.slug}/rifacimento-tetto/` },
                    { label: "Cappotto Termico", href: `/comune/${comune.slug}/cappotto-termico/` },
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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Vuoi sapere quanto costano gli impianti a {comune.nome}?</h2>
            <p className="text-white/70 mb-8 text-lg">Scopri il costo del tuo intervento. Se la forbice è in linea col tuo budget, organizziamo il sopralluogo e prepariamo il preventivo dettagliato con tutte le certificazioni incluse.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`https://wa.me/393339809319?text=Salve%2C%20vorrei%20un%20preventivo%20per%20il%20rifacimento%20impianti%20a%20${encodeURIComponent(comune.nome)}`} target="_blank" rel="noopener noreferrer" className="bg-orange text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-center">
                Richiedi stima su WhatsApp
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
