import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check, MessageCircle, X } from "lucide-react";
import { comuni, getComuneBySlug } from "@/data/comuni";
import { servizi } from "@/data/servizi";
import CalcolatoreBagno from "@/components/shared/CalcolatoreBagno";
import { getDataAggiornamento } from "@/lib/utils";
import { getAllArticoli } from "@/lib/blog";
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

const CARATTERISTICHE_BAGNO = [
  "Smontaggio dei sanitari esistenti",
  "Demolizione di pavimento, rivestimenti e massetto con disconnessione degli impianti esistenti",
  "Carico, trasporto e smaltimento dei materiali di risulta",
  "Realizzazione del nuovo impianto idrico-sanitario ed elettrico del bagno",
  "Formazione del nuovo massetto e piano di posa",
  "Impermeabilizzazione dell'area doccia o vasca",
  "Fornitura e posa di pavimenti e rivestimenti",
  "Fornitura e installazione di wc, bidet, lavabo con mobile sospeso, doccia oppure vasca, con rubinetteria inclusa",
];

const ESCLUSIONI_BAGNO = [
  "Opere extra capitolato o richieste fuori standard",
  "Box doccia",
  "Scaldabagno, termoarredo e accessori non previsti nel pacchetto base",
  "Controsoffitti, faretti, nicchie su misura, velette e lavorazioni decorative",
  "Spostamenti importanti di scarichi e colonne montanti se richiedono opere aggiuntive",
  "Adeguamenti su murature ammalorate, umidità, sottofondi deteriorati o imprevisti emersi dopo la demolizione",
  "Permessi, pratiche edilizie o adempimenti tecnici se necessari",
  "Forniture extra capitolato o di fascia superiore rispetto alla dotazione base",
];

const VANTAGGI_BAGNO = [
  "Bagno impermeabile e sicuro",
  "Sanitari di design o classici",
  "Soluzioni per disabili disponibili",
  "Materiali antimuffa e antibatterici",
  "Materiali certificati CE",
  "Possibilità di vasca o doccia",
];

export async function generateStaticParams() {
  return comuni.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  if (!comune) return {};

  const title = `Ristrutturazione Bagno a ${comune.nome} | Preventivo e Costi`;
  const description = `Richiedi un preventivo per ristrutturare il bagno a ${comune.nome}. Costi indicativi, sopralluogo e conferma finale del preventivo.`;
  const url = `https://ristrutturazionepreventivi.it/comune/${comune.slug}/ristrutturazione-bagno/`;

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
          url: "https://ristrutturazionepreventivi.it/images/servizi/ristrutturazione-bagno.jpg",
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
  const servizioSlug = "ristrutturazione-bagno";

  const breadcrumb = buildBreadcrumb(
    comune.nome,
    comune.slug,
    "Ristrutturazione Bagno",
    servizioSlug
  );

  const localBusiness = buildLocalBusiness(
    comune.nome,
    `Ristrutturazione bagno a ${comune.nome}. Costi reali e preventivo immediato, con verifica tecnica e sopralluogo per confermare il quadro economico definitivo.`
  );

  const serviceSchema = buildServiceSchema({
    serviceType: "Ristrutturazione Bagno",
    serviceName: `Ristrutturazione Bagno a ${comune.nome}`,
    descrizione: `Ristrutturazione bagno a ${comune.nome} con demolizioni, rifacimento impianti, impermeabilizzazione, posa di pavimenti e rivestimenti, installazione sanitari e verifica tecnica finale. ${comune.caratteristicheBagni}`,
    comuneNome: comune.nome,
    comuneSlug: comune.slug,
    servizioSlug,
    prezzoMin: "5000",
    prezzoMax: "12000",
  });

  const howToSchema = buildHowToSchema("Ristrutturazione Bagno", comune.nome);
  const faqSource = comune.faqBagno && comune.faqBagno.length > 0 ? comune.faqBagno : comune.faq;
  const faqSchema = buildFaqSchema(faqSource);

  return { breadcrumb, localBusiness, serviceSchema, howToSchema, faqSchema };
}

export default async function RistrutturazioneBagnoPage({ params }: PageProps) {
  const { slug } = await params;
  const comune = getComuneBySlug(slug);
  if (!comune) notFound();

  const jsonLd = buildJsonLd(comune);
  const dataAggiornamento = getDataAggiornamento();
  const altriServizi = servizi.filter((s) => s.slug !== "ristrutturazione-bagno").slice(0, 3);
  const articoliConsigliati = getAllArticoli().slice(0, 3);

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

      <div className="min-h-screen bg-white">
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
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Check className="h-4 w-4 text-orange" />
                  Costi aggiornati a {dataAggiornamento}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                  Ristrutturazione Bagno a {comune.nome}:{" "}
                  <span className="text-orange">preventivo immediato e costo reale</span>
                </h1>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Richiedi un preventivo immediato per la ristrutturazione del bagno a {comune.nome} e ottieni un primo costo reale del tuo intervento. Il preventivo finale viene confermato dopo sopralluogo e verifica tecnica dell’immobile.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {["Prezzario Regionale Campania", "Sopralluogo tecnico", "Stima verificabile"].map((t) => (
                    <span key={t} className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
                <a href="#modulo preventivo" className="inline-flex items-center gap-2 bg-orange text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                  Richiedi un preventivo
                </a>
              </div>

              <div className="hidden lg:block relative h-72 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/servizi/ristrutturazione-bagno.jpg"
                  alt={`Ristrutturazione bagno a ${comune.nome}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <div id="modulo preventivo" className="lg:hidden px-4 pt-6">
          <CalcolatoreBagno comuneDefault={comune.nome} />
        </div>

        <div className="container mx-auto px-4 py-20 grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Descrizione del Servizio</h2>
              <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-line">
                {`La ristrutturazione completa del bagno a ${comune.nome} è un intervento tecnico che comprende demolizioni, rifacimento degli impianti, ripristino dei sottofondi, impermeabilizzazione e posa delle nuove finiture.

Il costo base da 5.000 € rappresenta un riferimento iniziale per bagni di dimensioni contenute o medie, con configurazione standard e senza criticità particolari. Il preventivo definitivo può aumentare in caso di bagno più grande, spostamenti impiantistici rilevanti, finiture fuori capitolato o problematiche emerse dopo la demolizione.

Il nostro servizio comprende smontaggio dei sanitari esistenti, demolizione di pavimenti e rivestimenti, smaltimento dei materiali di risulta, realizzazione del nuovo impianto idrico-sanitario ed elettrico del bagno, formazione del massetto, impermeabilizzazione della zona doccia o vasca, posa di pavimenti e rivestimenti e installazione dei nuovi sanitari con rubinetteria.

Ogni preventivo online ha valore orientativo: il sopralluogo serve a verificare misure, stato degli impianti, condizioni del supporto e reali necessità del cantiere a ${comune.nome}.`}
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-navy mb-6">Cosa Include</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {CARATTERISTICHE_BAGNO.map((voce, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4 text-orange" />
                    </div>
                    <span className="text-gray-700">{voce}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-navy mb-6">Cosa non comprende</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {ESCLUSIONI_BAGNO.map((voce, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="h-4 w-4 text-orange" />
                    </div>
                    <span className="text-gray-700">{voce}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">Perché Sceglierci</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {VANTAGGI_BAGNO.map((vantaggio, i) => (
                  <div key={i} className="bg-navy/5 p-4 rounded-xl border-l-4 border-orange">
                    <p className="text-gray-700">{vantaggio}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-6">Costo indicativo</h2>
              <div className="bg-white border-2 border-orange p-6 rounded-xl text-center">
                <p className="text-sm text-gray-500 mb-2">Esempio per bagno standard da 6 mq</p>
                <p className="text-3xl font-bold text-orange">
                  Ristrutturazione bagno da 5.500 €
                </p>
                <p className="text-sm text-gray-500 mt-3">
                  Una base utile per orientarti. Il preventivo finale dipende da impianti, demolizioni, rivestimenti, sanitari scelti e complessità dell&apos;intervento.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-navy mb-4">Dove Operiamo</h2>
              <p className="text-gray-600 mb-4">
                Offriamo il servizio di ristrutturazione bagno a {comune.nome} e nei comuni vicini tra Napoli, Caserta e Agro Aversano.
              </p>
              <div className="flex flex-wrap gap-2">
                {comuni.slice(0, 15).map((item) => (
                  <Link
                    key={item.slug}
                    href={`/comune/${item.slug}/`}
                    className="bg-gray-100 hover:bg-navy hover:text-white text-navy px-3 py-1 rounded-lg text-sm transition-colors"
                  >
                    {item.nome}
                  </Link>
                ))}
                <span className="text-gray-400 px-3 py-1 text-sm">e altri...</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div id="modulo preventivo" className="hidden lg:block">
              <CalcolatoreBagno comuneDefault={comune.nome} />
            </div>

            <div className="bg-navy p-6 rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-4">Richiedi un preventivo per il tuo intervento</h3>
              <p className="text-white/80 mb-6">
                Contattaci su WhatsApp per capire il costo del tuo progetto di ristrutturazione bagno a {comune.nome}. Se i dati rientrano nei parametri indicati, prepariamo il preventivo e confermiamo tutto con il sopralluogo.
              </p>
              <a
                href={`https://wa.me/393339809319?text=Salve%2C%20vorrei%20un%20preventivo%20per%20la%20ristrutturazione%20del%20bagno%20a%20${encodeURIComponent(comune.nome)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-orange hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Parla con noi su WhatsApp
              </a>
            </div>

            <div>
              <h3 className="text-lg font-bold text-navy mb-4">
                Altri Servizi
              </h3>
              <div className="space-y-3">
                {altriServizi.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/servizi/${s.slug}/`}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-navy/5 transition-colors"
                  >
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={s.immagine}
                        alt={s.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy text-sm">{s.titolo}</h4>
                    </div>
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
    </>
  );
}
