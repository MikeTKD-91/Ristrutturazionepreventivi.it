// app/comune/[slug]/cappotto-termico/page.tsx

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
import { getAllArticoli } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const COSTI_CAPPOTTO = [
  { dimensione: "Superficie fino a 100 mq", base: "8.000 – 12.000 €", standard: "12.000 – 16.000 €", premium: "16.000 – 22.000 €" },
  { dimensione: "Superficie 100–200 mq", base: "14.000 – 20.000 €", standard: "20.000 – 28.000 €", premium: "28.000 – 38.000 €" },
  { dimensione: "Superficie 200–350 mq", base: "22.000 – 32.000 €", standard: "32.000 – 45.000 €", premium: "45.000 – 60.000 €" },
  { dimensione: "Superficie oltre 350 mq (condominio)", base: "Da 32.000 €", standard: "Da 45.000 €", premium: "Da 60.000 €" },
];

const LIVELLI_FINITURA = [
  { livello: "Base", descrizione: "Pannelli EPS (polistirene) 8–10 cm, rasante minerale, tinteggiatura silossanica. Prestazione energetica certificata, estetica semplice.", colore: "bg-gray-100 text-gray-700" },
  { livello: "Standard", descrizione: "Pannelli EPS grafite o lana di roccia 12–14 cm, rasante con finitura strutturata, pittura al silicone facciata. Il sistema più richiesto.", colore: "bg-blue-50 text-navy" },
  { livello: "Premium", descrizione: "Lana di roccia o sughero 16+ cm, sistema a cappotto ventilato, rivestimenti in pietra naturale o ceramica, massima efficienza energetica.", colore: "bg-orange-50 text-orange" },
];

const COSA_INCLUDE_RIFACIMENTO = [
  { voce: "Sopralluogo tecnico e verifica stato della facciata", incluso: true },
  { voce: "Preparazione e pulizia della superficie (primer, bonifica)", incluso: true },
  { voce: "Posa pannelli isolanti con tasselli certificati CE", incluso: true },
  { voce: "Rete in fibra di vetro anticrisi e rasante di base", incluso: true },
  { voce: "Finitura esterna (rasante decorativo o pittura silossanica)", incluso: true },
  { voce: "Rifacimento davanzali e soglie finestre", incluso: true },
  { voce: "Sigillatura ponti termici (spigoli, angoli, intorno finestre)", incluso: true },
  { voce: "Certificazione intervento e documentazione energetica", incluso: true },
  { voce: "Ponteggi (inclusi per facciate fino a 3 piani)", incluso: true },
  { voce: "Ponteggi oltre 3 piani", incluso: false, nota: "preventivati separatamente in base all'altezza e alla tipologia" },
];

const TEMPISTICHE = [
  { fase: "Sopralluogo e progettazione", giorni: "1–2 gg", nota: "rilevamento superfici e scelta sistema isolante" },
  { fase: "Montaggio ponteggi", giorni: "1–3 gg", nota: "in base all'altezza e alla superficie" },
  { fase: "Preparazione facciata (primer e sanificazione)", giorni: "2–3 gg", nota: "attesa essicazione inclusa" },
  { fase: "Posa pannelli isolanti e tassellatura", giorni: "3–7 gg", nota: "in base alla superficie" },
  { fase: "Rasante di base e rete anticrisi", giorni: "2–4 gg", nota: "attesa essicazione obbligatoria" },
  { fase: "Rasante di finitura e tinteggiatura", giorni: "2–4 gg", nota: "attesa condizioni meteo favorevoli" },
  { fase: "Smontaggio ponteggi e pulizia", giorni: "1–2 gg", nota: "" },
];

export async function generateStaticParams() {
  return comuni.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  if (!comune) return {};
  const title = `Cappotto Termico a ${comune.nome} | Preventivo e Costi`;
  const description = `Richiedi un preventivo per il cappotto termico a ${comune.nome}. Costi indicativi, sopralluogo e conferma finale del preventivo.`;
  const url = `https://ristrutturazionepreventivi.it/comune/${comune.slug}/cappotto-termico/`;
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
          url: `https://ristrutturazionepreventivi.it/images/servizi/cappotto-termico.jpg`,
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
  const servizioSlug = "cappotto-termico";

  const breadcrumb = buildBreadcrumb(
    comune.nome,
    comune.slug,
    "Cappotto Termico",
    servizioSlug
  );

  const localBusiness = buildLocalBusiness(
    comune.nome,
    `cappotto termico a ${comune.nome}. Preventivo immediato, con verifica tecnica e sopralluogo per confermare il quadro economico definitivo.`
  );

  const serviceSchema = buildServiceSchema({
    serviceType: "Cappotto Termico",
    serviceName: `Cappotto Termico a ${comune.nome}`,
    descrizione: `Cappotto Termico a ${comune.nome}. ${comune.tipoEdilizio}.`,
    comuneNome: comune.nome,
    comuneSlug: comune.slug,
    servizioSlug,
    prezzoMin: "2400",
    prezzoMax: "40000",
  });

  const howToSchema = buildHowToSchema("Cappotto Termico", comune.nome);

  const faqSchema = buildFaqSchema(comune.faq);

  return { breadcrumb, localBusiness, serviceSchema, howToSchema, faqSchema };
}

export default async function CappottoTermicoPage({ params }: PageProps) {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  const articoliConsigliati = getAllArticoli().slice(0, 3);
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
              <span className="text-white/80">Cappotto Termico</span>
            </nav>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-orange text-sm font-semibold uppercase tracking-widest mb-3">Cappotto Termico · {comune.nome}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                  Cappotto Termico a {comune.nome}:{" "}{" "}
                  <span className="text-orange">preventivo immediato e costo reale</span>
                </h1>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Indicazioni di costo basate su riferimenti tecnici, sistemi isolanti,
                  stato della facciata, altezza dell'edificio e dettagli esecutivi.
                  Il preventivo finale emerge dopo sopralluogo e verifica tecnica.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">Prezzario Regionale Campania</span>
                  <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">Ecobonus applicabile</span>
                  <span className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">Materiali CE certificati</span>
                </div>
                <a href="#modulo preventivo" className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                  Richiedi un primo preventivo
                </a>
              </div>
              <div className="hidden lg:block relative h-72 rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/servizi/cappotto-termico.jpg" alt={`Cappotto termico a ${comune.nome}`} fill className="object-cover" priority />
              </div>
            </div>
          </div>
        </section>

        <div id="modulo preventivo" className="lg:hidden px-4 pt-6"><ScopriIlCostoDellaTuaRistrutturazione comuneDefault={comune.nome} /></div>

        <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-16">

            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Quanto costa il cappotto termico a {comune.nome}?</h2>
              <p className="text-gray-600 mb-6">
                Le forbici di costo che trovi qui sotto sono orientative e si basano sul{" "}
                <strong>Prezzario Regionale Campania</strong>. Il costo finale dipende dallo spessore
                dell&apos;isolante, dallo stato della facciata esistente, dall&apos;altezza dell&apos;edificio e
                dalla finitura scelta. Solo il sopralluogo consente di confermare il quadro economico definitivo.
              </p>
              <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy text-white">
                      <th className="text-left py-4 px-5 font-semibold">Superficie di intervento</th>
                      <th className="text-center py-4 px-4 font-semibold">Base</th>
                      <th className="text-center py-4 px-4 font-semibold">Standard</th>
                      <th className="text-center py-4 px-4 font-semibold text-orange">Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COSTI_CAPPOTTO.map((row, i) => (
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
                {COSTI_CAPPOTTO.map((row) => (
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
                  Il prezzo definitivo dipende dallo stato della facciata, dall&apos;altezza dell&apos;edificio, dal sistema scelto e dallo spessore isolante necessario. Il sopralluogo è l&apos;unico modo per definire un preventivo preciso.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Cosa cambia tra sistema Base, Standard e Premium?</h2>
              <p className="text-gray-600 mb-6">Il tipo di materiale isolante e lo spessore determinano sia le prestazioni energetiche che il costo. Ecco le differenze concrete.</p>
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
              <h2 className="text-2xl font-bold text-navy mb-2">Cosa include l&apos;installazione del cappotto termico</h2>
              <p className="text-gray-600 mb-6">Un cappotto fatto bene è un sistema integrato. Ecco cosa comprende un intervento eseguito a regola d&apos;arte.</p>
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
                Una facciata standard di 150 mq richiede mediamente <strong>2–3 settimane lavorative</strong>{" "}
                inclusi ponteggi. I tempi dipendono fortemente dalle condizioni meteorologiche (il cappotto non si applica con pioggia o temperature sotto i 5°C).
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
              <p className="text-sm text-gray-500 mt-4">In presenza di facciate degradate, efflorescenze o umidità di risalita, è necessaria una fase di risanamento preliminare che allunga i tempi. Il programma definitivo viene definito al sopralluogo.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-2">Come funziona con noi</h2>
              <p className="text-gray-600 mb-8">Tre passaggi, nessuna sorpresa.</p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { step: "01", titolo: "Primo preventivo online", testo: "Inserisci la superficie della facciata nel modulo preventivo o scrivici su WhatsApp per ricevere una primo preventivo online. È una prima indicazione utile per capire se la spesa è in linea con il budget, ma non sostituisce il sopralluogo tecnico." },
                  { step: "02", titolo: "Sopralluogo tecnico", testo: "Il nostro tecnico verifica lo stato della facciata, misura le superfici, individua ponti termici e criticità e raccoglie le informazioni per il preventivo finale." },
                  { step: "03", titolo: "Preventivo scritto", testo: "Ricevi un preventivo scritto con tipo e spessore del sistema isolante, tempistiche e certificazione energetica dell'intervento. Trasparente, senza voci generiche." },
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
                <h2 className="text-2xl font-bold text-navy mb-2">Domande frequenti sul cappotto termico a {comune.nome}</h2>
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
                <h2 className="text-xl font-bold text-navy mb-4">Cappotto termico nei comuni vicini a {comune.nome}</h2>
                <div className="flex flex-wrap gap-3">
                  {comune.vicini.map((slug) => {
                    const vicino = getComuneBySlug(slug);
                    if (!vicino) return null;
                    return (
                      <Link key={slug} href={`/comune/${slug}/cappotto-termico/`} className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-navy hover:text-white text-gray-700 text-sm font-medium px-4 py-2 rounded-full transition-colors">
                        Cappotto a {vicino.nome}
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
                    { label: "Impianti", href: `/comune/${comune.slug}/impianti-elettrici-idraulici-termici/` },
                    { label: "Pavimenti e Rivestimenti", href: `/comune/${comune.slug}/pavimenti-rivestimenti/` },
                  ].map((s) => (
                    <Link key={s.href} href={s.href} className="flex items-center justify-between text-sm text-gray-700 hover:text-navy py-2 border-b border-gray-200 last:border-0 transition-colors">
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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Vuoi sapere quanto costa il cappotto termico a {comune.nome}?</h2>
            <p className="text-white/70 mb-8 text-lg">Richiedi un primo preventivo per il cappotto termico. Se l'importo indicativo è in linea con il tuo budget, organizziamo il sopralluogo e prepariamo il preventivo dettagliato.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`https://wa.me/393339809319?text=Salve%2C%20vorrei%20un%20preventivo%20per%20il%20cappotto%20termico%20a%20${encodeURIComponent(comune.nome)}`} target="_blank" rel="noopener noreferrer" className="bg-orange text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-center">
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
