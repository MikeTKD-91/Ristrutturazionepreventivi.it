// app/comune/[slug]/pavimenti-rivestimenti/page.tsx

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

const COSTI_PAVIMENTI = [
  { dimensione: "Ceramica standard (€/mq posa + fornitura entry)", base: "50 – 70 €/mq", standard: "70 – 100 €/mq", premium: "100 – 150 €/mq" },
  { dimensione: "Gres porcellanato (formato 60×60 o 80×80)", base: "65 – 90 €/mq", standard: "90 – 130 €/mq", premium: "130 – 200 €/mq" },
  { dimensione: "Grandi formati (120×120 o 160×320)", base: "90 – 120 €/mq", standard: "120 – 170 €/mq", premium: "170 – 260 €/mq" },
  { dimensione: "Parquet prefinito o laminato", base: "55 – 80 €/mq", standard: "80 – 130 €/mq", premium: "130 – 220 €/mq" },
];

const LIVELLI_FINITURA = [
  { livello: "Base", descrizione: "Ceramica 30×30 o 60×60 entry-level, fughe standard, battiscopa coordinato. Funzionale, pulito e durevole.", colore: "bg-gray-100 text-gray-700" },
  { livello: "Standard", descrizione: "Gres porcellanato effetto pietra o legno, grandi formati 80×80 o 120×60, posa con fughe minime, battiscopa in colla. Il livello più richiesto.", colore: "bg-blue-50 text-navy" },
  { livello: "Premium", descrizione: "Lastre 120×120 o book-match, marmi e pietre naturali, parquet massello, posa a correre o a spina, effetti decorativi. Nessun compromesso.", colore: "bg-orange-50 text-orange" },
];

const COSA_INCLUDE_RIFACIMENTO = [
  { voce: "Rimozione e smaltimento pavimento e rivestimenti esistenti", incluso: true },
  { voce: "Verifica e preparazione del massetto (regolarizzazione)", incluso: true },
  { voce: "Rasatura e livellamento del piano di posa", incluso: true },
  { voce: "Fornitura e posa colla specifica per il formato scelto", incluso: true },
  { voce: "Posa pavimento con giunti e allineamenti precisi", incluso: true },
  { voce: "Fugatura e sigillatura (compreso antibatterico nei bagni)", incluso: true },
  { voce: "Posa battiscopa coordinato", incluso: true },
  { voce: "Pulizia finale e protezione superficie", incluso: true },
  { voce: "Rifacimento massetto in caso di livello insufficiente", incluso: false, nota: "preventivato separatamente se il massetto è da rifare da zero" },
  { voce: "Riscaldamento a pavimento (impianto radiante)", incluso: false, nota: "disponibile su richiesta, richiede massetto dedicato" },
];

const TEMPISTICHE = [
  { fase: "Rimozione vecchio pavimento", giorni: "1–2 gg", nota: "in base alla superficie e al materiale" },
  { fase: "Verifica e preparazione massetto", giorni: "1 gg", nota: "rasatura e livellamento" },
  { fase: "Eventuale massetto di rifacimento", giorni: "3–5 gg", nota: "attesa essicazione 28 giorni ridotta con additivi" },
  { fase: "Posa pavimento", giorni: "2–5 gg", nota: "in base alla superficie, al formato e alla posa scelta" },
  { fase: "Attesa presa colla", giorni: "1–2 gg", nota: "obbligatoria prima della fugatura" },
  { fase: "Fugatura e sigillatura", giorni: "1–2 gg", nota: "attesa essicazione stucco inclusa" },
  { fase: "Battiscopa e rifinitura finale", giorni: "1 gg", nota: "" },
];

export async function generateStaticParams() {
  return comuni.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  if (!comune) return {};
  const title = `Pavimenti e Rivestimenti a ${comune.nome}: preventivo immediato e costo reale`;
  const description = `Quanto costa la posa di pavimenti e rivestimenti a ${comune.nome}? preventivo immediato e costo reale, materiali, formati, tempistiche reali e sopralluogo tecnico.`;
  const url = `https://ristrutturazionepreventivi.it/comune/${comune.slug}/pavimenti-rivestimenti/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "RistrutturazionePreventivi.it",
      locale: "it_IT",
      type: "website",
      images: [
        {
          url: `https://ristrutturazionepreventivi.it/images/servizi/pavimenti-rivestimenti.jpg`,
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
  const servizioSlug = "pavimenti-rivestimenti";

  const breadcrumb = buildBreadcrumb(
    comune.nome,
    comune.slug,
    "Pavimenti e Rivestimenti",
    servizioSlug
  );

  const localBusiness = buildLocalBusiness(
    comune.nome,
    `pavimenti e rivestimenti a ${comune.nome}. Preventivo immediato, con verifica tecnica e sopralluogo per confermare il quadro economico definitivo.`
  );

  const serviceSchema = buildServiceSchema({
    serviceType: "Pavimenti e Rivestimenti",
    serviceName: `Pavimenti e Rivestimenti a ${comune.nome}`,
    descrizione: `Pavimenti e Rivestimenti a ${comune.nome}. ${comune.tipoEdilizio}.`,
    comuneNome: comune.nome,
    comuneSlug: comune.slug,
    servizioSlug,
    prezzoMin: "600",
    prezzoMax: "30000",
  });

  const howToSchema = buildHowToSchema("Pavimenti e Rivestimenti", comune.nome);

  const faqSchema = buildFaqSchema(comune.faq);

  return { breadcrumb, localBusiness, serviceSchema, howToSchema, faqSchema };
}

export default async function PavimentiRivestimentiPage({ params }: PageProps) {
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
              <span className="text-white/80">Pavimenti e Rivestimenti</span>
            </nav>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-orange text-sm font-semibold uppercase tracking-widest mb-3">Pavimenti e Rivestimenti · {comune.nome}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                  Pavimenti e Rivestimenti a {comune.nome}:{" "}{" "}
                  <span className="text-orange">preventivo immediato e costo reale</span>
                </h1>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Indicazioni di costo basate su riferimenti tecnici, materiale scelto,
                  formato, schema di posa e condizioni del supporto.
                  Il preventivo finale emerge dopo sopralluogo e verifica tecnica.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">Prezzario Regionale Campania</span>
                  <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">Lavori concordati</span>
                  <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">Bonus 50% applicabile</span>
                </div>
                <a href="#modulo preventivo" className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                  Richiedi un primo preventivo
                </a>
              </div>
              <div className="hidden lg:block relative h-72 rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/servizi/pavimenti-rivestimenti.jpg" alt={`Posa pavimenti e rivestimenti a ${comune.nome}`} fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </section>

        <div id="modulo preventivo" className="lg:hidden px-4 pt-6"><ScopriIlCostoDellaTuaRistrutturazione comuneDefault={comune.nome} /></div>

        <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-16">

            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Quanto costa la posa di pavimenti e rivestimenti a {comune.nome}?</h2>
              <p className="text-gray-600 mb-6">
                I valori che trovi qui sotto sono indicazioni di costo basate sul{" "}
                <strong>Prezzario Regionale Campania</strong>. Il prezzo finale dipende dal materiale
                scelto, dal formato, dallo schema di posa e dallo stato del massetto esistente.
                Solo il sopralluogo consente di confermare il quadro economico definitivo.
              </p>
              <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy text-white">
                      <th className="text-left py-4 px-5 font-semibold">Tipologia materiale</th>
                      <th className="text-center py-4 px-4 font-semibold">Base</th>
                      <th className="text-center py-4 px-4 font-semibold">Standard</th>
                      <th className="text-center py-4 px-4 font-semibold text-orange">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COSTI_PAVIMENTI.map((row, i) => (
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
                {COSTI_PAVIMENTI.map((row) => (
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
                  Se il massetto è da rifare, il supporto non è idoneo o il formato richiede una posa più complessa, il costo finale può aumentare. Il sopralluogo è l&apos;unico modo per definire un preventivo preciso.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Cosa cambia tra finitura Base, Standard e Premium?</h2>
              <p className="text-gray-600 mb-6">Il materiale e il formato sono il principale fattore di variazione del costo. Ecco cosa include ciascun livello.</p>
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
              <h2 className="text-2xl font-bold text-navy mb-2">Cosa include la posa completa di pavimenti e rivestimenti</h2>
              <p className="text-gray-600 mb-6">Una posa professionale non è solo posare le piastrelle. Ecco cosa comprende un intervento eseguito a regola d&apos;arte.</p>
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
              <p className="text-sm text-gray-500 mt-4">Negli edifici degli anni &apos;60–&apos;80, i massetti spesso presentano irregolarità significative o umidità di risalita che richiedono interventi preliminari. Il nostro tecnico lo verifica al sopralluogo.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Quanto dura il cantiere?</h2>
              <p className="text-gray-600 mb-6">
                La posa di 60–80 mq richiede mediamente <strong>1–1,5 settimane lavorative</strong>{" "}
                incluse rimozione vecchio pavimento e fugatura. I grandi formati richiedono più tempo per la precisione di posa richiesta.
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
              <p className="text-sm text-gray-500 mt-4">Se il massetto è da rifare integralmente, i tempi si allungano di 3–5 settimane per via dei tempi di essicazione. Il programma definitivo viene definito al sopralluogo.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Come funziona con noi</h2>
              <p className="text-gray-600 mb-8">Tre passaggi, nessuna sorpresa.</p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { step: "01", titolo: "Primo preventivo online", testo: "Inserisci la superficie da trattare nel modulo preventivo o scrivici su WhatsApp per ricevere una primo preventivo online. È una prima indicazione utile per capire se la spesa è in linea con il budget, ma non sostituisce il sopralluogo tecnico." },
                  { step: "02", titolo: "Sopralluogo tecnico", testo: "Il nostro tecnico verifica lo stato del massetto, rileva le superfici e ti guida nella scelta del materiale più adatto alle tue esigenze e al tuo budget." },
                  { step: "03", titolo: "Preventivo scritto", testo: "Ricevi un preventivo scritto con tipologia di materiale, schema di posa, tempistiche e garanzie. Trasparente, senza voci generiche." },
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
                <h2 className="text-2xl font-bold text-navy mb-2">Domande frequenti su pavimenti e rivestimenti a {comune.nome}</h2>
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
                <h2 className="text-xl font-bold text-navy mb-4">Pavimenti e rivestimenti nei comuni vicini a {comune.nome}</h2>
                <div className="flex flex-wrap gap-3">
                  {comune.vicini.map((slug) => {
                    const vicino = getComuneBySlug(slug);
                    if (!vicino) return null;
                    return (
                      <Link key={slug} href={`/comune/${slug}/pavimenti-rivestimenti/`} className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-navy hover:text-white text-gray-700 text-sm font-medium px-4 py-2 rounded-full transition-colors">
                        Pavimenti a {vicino.nome}
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
            <div id="modulo preventivo" className="sticky top-6 space-y-6">
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
                    { label: "Impianti", href: `/comune/${comune.slug}/impianti-elettrici-idraulici-termici/` },
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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Vuoi sapere quanto costa la posa a {comune.nome}?</h2>
            <p className="text-white/70 mb-8 text-lg">Richiedi un primo preventivo per pavimenti e rivestimenti. Se la soluzione proposta rientra nel tuo budget, organizziamo il sopralluogo e prepariamo il preventivo dettagliato.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`https://wa.me/393339809319?text=Salve%2C%20vorrei%20un%20preventivo%20per%20pavimenti%20e%20rivestimenti%20a%20${encodeURIComponent(comune.nome)}`} target="_blank" rel="noopener noreferrer" className="bg-orange text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-center">
                Parla con noi su WhatsApp
              </a>
              <a href="tel:+393339809319" className="bg-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors text-center">
                Chiama +39 333 980 9319
              </a>
            </div>
            <p className="text-white/40 text-xs mt-6">Russo FE Costruzione SRL · Viale della Libertà 3, 81030 Lusciano (CE) · P.IVA 04836230617</p>
          </div>
        </section>
      </main>
    </>
  );
}
