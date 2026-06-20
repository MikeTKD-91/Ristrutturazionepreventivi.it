import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, MessageCircle } from "lucide-react";
import { comuni, getComuneBySlug } from "@/data/comuni";
import { getServizioBySlug } from "@/data/servizi";
import ScopriIlCostoDellaTuaRistrutturazione from "@/components/shared/ScopriIlCostoDellaTuaRistrutturazione";
import {
  buildBreadcrumb,
  buildLocalBusiness,
  buildServiceSchema,
  buildHowToSchema,
  buildFaqSchema,
} from "@/lib/schema";
import { getDataAggiornamento, formatPrezzo, generaLinkWhatsApp } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return comuni.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  const servizio = getServizioBySlug("rifacimento-tetto");
  if (!comune || !servizio) return {};

  const title = `Rifacimento Tetto a ${comune.nome} | Costi Reali, Preventivo Immediato`;
  const description = `Rifacimento tetto a ${comune.nome}: costi indicativi, cosa include il servizio, vantaggi, zone servite e preventivo.`;
  const url = `https://ristrutturazionepreventivi.it/comune/${comune.slug}/rifacimento-tetto/`;

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
          url: servizio.immagine,
          width: 800,
          height: 600,
          alt: `Rifacimento tetto a ${comune.nome}`,
        },
      ],
    },
  };
}

function buildJsonLd(comune: ReturnType<typeof getComuneBySlug>) {
  if (!comune) return null;
  const servizioSlug = "rifacimento-tetto";
  const breadcrumb = buildBreadcrumb(comune.nome, comune.slug, "Rifacimento Tetto", servizioSlug);
  const localBusiness = buildLocalBusiness(comune.nome, `rifacimento tetto a ${comune.nome}. Preventivo immediato, con verifica tecnica e sopralluogo.`);
  const serviceSchema = buildServiceSchema({
    serviceType: "Rifacimento Tetto",
    serviceName: `Rifacimento Tetto a ${comune.nome}`,
    descrizione: `Rifacimento tetto a ${comune.nome}. ${comune.tipoEdilizio}.`,
    comuneNome: comune.nome,
    comuneSlug: comune.slug,
    servizioSlug,
    prezzoMin: "80",
    prezzoMax: "180",
  });
  const howToSchema = buildHowToSchema("Rifacimento Tetto", comune.nome);
  const faqSchema = buildFaqSchema(comune.faq);
  return { breadcrumb, localBusiness, serviceSchema, howToSchema, faqSchema };
}

export default async function RifacimentoTettoComunePage({ params }: PageProps) {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  const servizio = getServizioBySlug("rifacimento-tetto");
  const dataAggiornamento = getDataAggiornamento();
  if (!comune || !servizio) notFound();
  const jsonLd = buildJsonLd(comune);

  return (
    <>
      {jsonLd && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.breadcrumb) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.localBusiness) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.serviceSchema) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.howToSchema) }} />
          {jsonLd.faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faqSchema) }} />}
        </>
      )}

      <div className="min-h-screen">
        <section className="relative h-[50vh] min-h-[400px]">
          <Image src={servizio.immagine} alt={`Rifacimento tetto a ${comune.nome}`} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-12">
              <nav className="text-sm text-white/70 mb-4 flex flex-wrap gap-1 items-center">
                <Link href="/" className="hover:text-white transition-colors">Home</Link><span>/</span>
                <Link href="/zone-servite/" className="hover:text-white transition-colors">Zone servite</Link><span>/</span>
                <Link href={`/comune/${comune.slug}/`} className="hover:text-white transition-colors">{comune.nome}</Link><span>/</span>
                <span className="text-white">Rifacimento Tetto</span>
              </nav>
              <div className="inline-flex items-center gap-2 bg-orange/20 text-orange backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Check className="h-4 w-4" /> Costi aggiornati a {dataAggiornamento}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Rifacimento Tetto a {comune.nome}</h1>
              <p className="text-xl text-white/80 max-w-2xl">{servizio.sottotitolo}. Intervento calibrato sulle caratteristiche edilizie di {comune.nome}.</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="text-2xl font-bold text-navy mb-4">Descrizione del Servizio</h2>
                  <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-line">
                    {servizio.descrizioneLunga}
                    {"\n\n"} A {comune.nome}, il sopralluogo tiene conto di questo contesto: {comune.tipoEdilizio}.
                  </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl">
                  <h2 className="text-2xl font-bold text-navy mb-6">Cosa Include</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {servizio.caratteristiche.map((car, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-4 w-4 text-orange" />
                        </div>
                        <span className="text-gray-700">{car}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-navy mb-6">Perché Sceglierci</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {servizio.vantaggi.map((vantaggio, i) => (
                      <div key={i} className="bg-navy/5 p-4 rounded-xl border-l-4 border-orange">
                        <p className="text-gray-700">{vantaggio}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-navy mb-6">Prezzi Indicativi (Prezzario Regionale Campania)</h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-white border-2 border-gray-200 p-6 rounded-xl text-center">
                      <p className="text-sm text-gray-500 mb-2">Finitura Base</p>
                      <p className="text-3xl font-bold text-navy">{servizio.prezzoMq.base} €</p>
                      <p className="text-sm text-gray-400">/mq</p>
                    </div>
                    <div className="bg-white border-2 border-orange p-6 rounded-xl text-center relative">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white text-xs px-3 py-1 rounded-full">Più scelta</div>
                      <p className="text-sm text-gray-500 mb-2">Finitura Standard</p>
                      <p className="text-3xl font-bold text-orange">{servizio.prezzoMq.standard} €</p>
                      <p className="text-sm text-gray-400">/mq</p>
                    </div>
                    <div className="bg-white border-2 border-gray-200 p-6 rounded-xl text-center">
                      <p className="text-sm text-gray-500 mb-2">Finitura Premium</p>
                      <p className="text-3xl font-bold text-navy">{servizio.prezzoMq.premium} €</p>
                      <p className="text-sm text-gray-400">/mq</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">* I prezzi sono indicativi e possono variare in base alle specifiche del progetto a {comune.nome}. Costi aggiornati a {dataAggiornamento}.</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-navy mb-4">Criticità tipiche a {comune.nome}</h2>
                  <div className="grid gap-4">
                    {comune.criticalita.map((item, i) => (
                      <div key={i} className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                        <p className="text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {comune.faq.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-navy mb-6">Domande frequenti su {comune.nome}</h2>
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
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-bold text-navy mb-4">Dove operiamo</h2>
                  <p className="text-gray-600 mb-4">Offriamo il servizio di rifacimento tetto a {comune.nome} e nei comuni vicini:</p>
                  <div className="flex flex-wrap gap-2">
                    {comune.vicini.map((slugVicino) => {
                      const vicino = getComuneBySlug(slugVicino);
                      if (!vicino) return null;
                      return (
                        <Link key={slugVicino} href={`/comune/${slugVicino}/rifacimento-tetto/`} className="bg-gray-100 hover:bg-navy hover:text-white text-navy px-3 py-1 rounded-lg text-sm transition-colors">{vicino.nome}</Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <ScopriIlCostoDellaTuaRistrutturazione comuneDefault={comune.nome} />

                <div className="bg-navy p-6 rounded-2xl text-white">
                  <h3 className="text-xl font-bold mb-4">Richiedi un preventivo per il tuo intervento</h3>
                  <p className="text-white/80 mb-6">Contattaci su WhatsApp per capire il costo del tuo progetto di rifacimento tetto a {comune.nome}.</p>
                  <a
                    href={generaLinkWhatsApp(
                      "Rifacimento Tetto",
                      80,
                      comune.nome,
                      `${formatPrezzo(servizio.prezzoMq.standard * 80 * 0.9)} - ${formatPrezzo(servizio.prezzoMq.standard * 80 * 1.1)}`,
                      "Standard"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-orange hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-5 w-5" /> Parla con noi su WhatsApp
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-navy mb-4">Altri servizi a {comune.nome}</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Ristrutturazione Appartamento", href: `/comune/${comune.slug}/` },
                      { label: "Ristrutturazione Bagno", href: `/comune/${comune.slug}/ristrutturazione-bagno/` },
                      { label: "Ristrutturazione Cucina", href: `/comune/${comune.slug}/ristrutturazione-cucina/` },
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
        </section>
      </div>
    </>
  );
}
