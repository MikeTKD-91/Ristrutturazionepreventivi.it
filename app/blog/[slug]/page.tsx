import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MessageCircle, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllArticoli, getArticoloBySlug, getAltriArticoli } from "@/lib/blog";
import ScopriIlCostoDellaTuaRistrutturazione from "@/components/shared/ScopriIlCostoDellaTuaRistrutturazione";
import { getDataAggiornamento } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

function calcolaTempoLettura(contenuto: string): number {
  const parole = contenuto.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(parole / 200));
}

function slugifyHeading(testo: string): string {
  return testo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function estraiTOC(contenuto: string): { id: string; testo: string; livello: number }[] {
  const righe = contenuto.split("\n");
  return righe
    .filter((r) => r.startsWith("## ") || r.startsWith("### "))
    .map((r) => {
      const livello = r.startsWith("### ") ? 3 : 2;
      const testo = r.replace(/^#{2,3}\s+/, "").replace(/\*\*/g, "");
      const id = slugifyHeading(testo);
      return { id, testo, livello };
    });
}

function formatData(data: string): string {
  return new Date(data).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateStaticParams() {
  return getAllArticoli().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const articolo = getArticoloBySlug(slug);
  if (!articolo) return { title: "Articolo non trovato" };

  const title = articolo.seoTitle ?? articolo.titolo;
  const description = articolo.seoDescription ?? articolo.estratto;

  return {
    title,
    description,
    alternates: { canonical: `https://ristrutturazionepreventivi.it/blog/${slug}/` },
    openGraph: {
      title,
      description,
      url: `https://ristrutturazionepreventivi.it/blog/${slug}/`,
      images: [{ url: articolo.immagine, width: 1200, height: 630, alt: articolo.titolo }],
      type: "article",
      publishedTime: articolo.data,
      modifiedTime: articolo.updatedAt ?? articolo.data,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [articolo.immagine],
    },
  };
}

export default async function ArticoloPage({ params }: Props) {
  const { slug } = await params;
  const articolo = getArticoloBySlug(slug);
  const dataAggiornamento = getDataAggiornamento();

  if (!articolo) notFound();

  const altriArticoli = getAltriArticoli(slug, 3);
  const tempoLettura = calcolaTempoLettura(articolo.contenuto);
  const toc = estraiTOC(articolo.contenuto);

  const schemaArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: articolo.titolo,
    description: articolo.estratto,
    image: articolo.immagine,
    datePublished: articolo.data,
    dateModified: articolo.updatedAt ?? articolo.data,
    author: {
      "@type": "Organization",
      name: "Russo FE Costruzione SRL",
      url: "https://ristrutturazionepreventivi.it",
    },
    publisher: {
      "@type": "Organization",
      name: "Russo FE Costruzione SRL",
      logo: {
        "@type": "ImageObject",
        url: "https://ristrutturazionepreventivi.it/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ristrutturazionepreventivi.it/blog/${slug}/`,
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }}
      />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[340px]">
        <Image
          src={articolo.immagine}
          alt={articolo.titolo}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/65 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container mx-auto px-4 pb-10">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="flex items-center gap-2 text-white/60 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog/" className="hover:text-white transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-white/90 line-clamp-1">{articolo.titolo}</span>
            </nav>

            {/* Categoria badge */}
            <span className="inline-block bg-orange/20 text-orange backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-3">
              {articolo.categoria}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-3xl leading-tight">
              {articolo.titolo}
            </h1>

            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                Russo FE Costruzione SRL
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {formatData(articolo.data)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {tempoLettura} min di lettura
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-14">
        <div className="container mx-auto max-w-full px-4 overflow-x-hidden">
          <div className="grid max-w-full lg:grid-cols-3 gap-12 items-start">

            {/* Main */}
            <div className="min-w-0 max-w-full lg:col-span-2">

              {/* Estratto */}
              <p className="text-lg text-gray-600 leading-relaxed border-l-4 border-orange pl-4 mb-10">
                {articolo.estratto}
              </p>

              {/* TOC */}
              {toc.length > 2 && (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-10">
                  <p className="text-sm font-bold text-navy uppercase tracking-widest mb-3">
                    Indice dell&apos;articolo
                  </p>
                  <ol className="space-y-1.5">
                    {toc.map((voce, i) => (
                      <li
                        key={voce.id}
                        className={voce.livello === 3 ? "pl-4" : ""}
                      >
                        <a
                          href={`#${voce.id}`}
                          className="text-sm text-teal-700 hover:text-orange transition-colors flex items-baseline gap-2"
                        >
                          <span className="text-gray-400 text-xs font-mono w-4 shrink-0">{i + 1}.</span>
                          {voce.testo}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Contenuto */}
              <article className="max-w-none min-w-0 max-w-full overflow-hidden break-words">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children }) => {
                      const text = Array.isArray(children) ? children.join("") : String(children);
                      const id = slugifyHeading(text);
                      return (
                        <h2 id={id} className="text-[2rem] leading-tight font-bold text-navy mt-14 mb-6 pb-3 border-b border-gray-200">
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ children }) => {
                      const text = Array.isArray(children) ? children.join("") : String(children);
                      const id = slugifyHeading(text);
                      return (
                        <h3 id={id} className="text-[1.35rem] leading-snug font-semibold text-navy mt-10 mb-4">
                          {children}
                        </h3>
                      );
                    },
                    p: ({ children }) => (
                      <p className="text-[1.08rem] leading-8 text-gray-700 mb-6">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-7 space-y-3 pl-6 list-disc marker:text-orange text-gray-700">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-7 space-y-3 pl-6 list-decimal marker:font-semibold marker:text-orange text-gray-700">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="pl-1 leading-8">
                        {children}
                      </li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-navy">
                        {children}
                      </strong>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-teal-600 font-medium underline decoration-teal-300 underline-offset-4 hover:text-orange"
                      >
                        {children}
                      </a>
                    ),
                    table: ({ children }) => (
                      <div className="my-8 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <table className="min-w-full text-sm">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-navy text-white">
                        {children}
                      </thead>
                    ),
                    th: ({ children }) => (
                      <th className="px-4 py-3 text-left font-semibold">
                        {children}
                      </th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-3 border-t border-gray-200 text-gray-700 align-top">
                        {children}
                      </td>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="my-8 border-l-4 border-orange bg-orange/5 px-6 py-4 rounded-r-2xl text-gray-700">
                        {children}
                      </blockquote>
                    ),
                    pre: ({ children }) => (
                      <pre className="my-8 max-w-full overflow-x-auto rounded-2xl bg-gray-900 p-4 text-sm text-white">
                        {children}
                      </pre>
                    ),
                    code: ({ children, className }) => (
                      <code className={className ?? "break-words whitespace-pre-wrap"}>
                        {children}
                      </code>
                    ),
                    img: ({ src = "", alt = "" }) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt={alt} className="my-8 h-auto max-w-full rounded-2xl" />
                    ),
                  }}
                >
                  {articolo.contenuto}
                </ReactMarkdown>
              </article>

              {/* Servizi disponibili Napoli */}
              <section className="mt-12">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Napoli</p>
                  <h2 className="mt-3 text-2xl font-bold text-navy">Servizi disponibili a Napoli</h2>
                  <p className="mt-3 text-gray-600">
                    Se stai valutando un intervento a Napoli, qui trovi i principali servizi con pagina locale dedicata.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {[
                    {
                      title: "Ristrutturazione Casa e Appartamento",
                      description: "Intervento completo con demolizioni, opere murarie, impianti, finiture e coordinamento delle lavorazioni.",
                      href: "/comune/napoli/",
                      image: "/images/servizi/ristrutturazione-appartamento-completo.jpg",
                      alt: "Ristrutturazione casa e appartamento a Napoli",
                    },
                    {
                      title: "Ristrutturazione Cucina",
                      description: "Rifacimento cucina con impianti, rivestimenti, predisposizioni e finiture coordinate al progetto.",
                      href: "/comune/napoli/ristrutturazione-cucina/",
                      image: "/images/servizi/ristrutturazione-cucina.jpg",
                      alt: "Ristrutturazione cucina a Napoli",
                    },
                    {
                      title: "Ristrutturazione Bagno",
                      description: "Demolizione, rifacimento impianti, posa rivestimenti, installazione sanitari e completamento delle finiture.",
                      href: "/comune/napoli/ristrutturazione-bagno/",
                      image: "/images/servizi/ristrutturazione-bagno.jpg",
                      alt: "Ristrutturazione bagno a Napoli",
                    },
                    {
                      title: "Rifacimento Tetto",
                      description: "Interventi su copertura, impermeabilizzazione, isolamento e ripristino degli elementi ammalorati.",
                      href: "/comune/napoli/rifacimento-tetto/",
                      image: "/images/servizi/rifacimento-tetto.jpg",
                      alt: "Rifacimento tetto a Napoli",
                    },
                    {
                      title: "Pavimenti e Rivestimenti",
                      description: "Posa di pavimenti e rivestimenti con preparazione dei supporti, allineamenti e finiture precise.",
                      href: "/comune/napoli/pavimenti-rivestimenti/",
                      image: "/images/servizi/pavimenti-rivestimenti.jpg",
                      alt: "Pavimenti e rivestimenti a Napoli",
                    },
                    {
                      title: "Impianti",
                      description: "Rifacimento impianti elettrici, idraulici e termici con verifica tecnica e organizzazione delle opere.",
                      href: "/comune/napoli/impianti-elettrici-idraulici-termici/",
                      image: "/images/servizi/impianti-elettrici-idraulici-termici.jpg",
                      alt: "Rifacimento impianti a Napoli",
                    },
                    {
                      title: "Cappotto Termico",
                      description: "Isolamento dell’involucro con posa del sistema cappotto, rasature, finiture e verifica del supporto.",
                      href: "/comune/napoli/cappotto-termico/",
                      image: "/images/servizi/cappotto-termico.jpg",
                      alt: "Cappotto termico a Napoli",
                    },
                  ].map((servizio, index) => (
                    <div
                      key={servizio.href}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col md:flex-row"
                    >
                      <div className="relative h-56 md:h-auto md:w-[320px] md:min-w-[320px]">
                        <Image
                          src={servizio.image}
                          alt={servizio.alt}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-2xl font-bold text-navy mb-3">
                          {servizio.title}
                        </h3>
                        <p className="text-gray-600 mb-6">
                          {servizio.description}
                        </p>

                        <div className="pt-4 border-t mt-auto">
                          <Link
                            href={servizio.href}
                            className="inline-flex items-center gap-2 bg-navy hover:bg-navy/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                          >
                            Scopri di più
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Autore card */}
              <div className="mt-12 flex items-center gap-5 bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center shrink-0">
                  <User className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="font-bold text-navy">Russo FE Costruzione SRL</p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Impresa edile specializzata in ristrutturazioni nell&apos;Agro Aversano, Napoli e Caserta. 
                    Prime verifiche orientative e proposte tecniche chiare.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Contenuto aggiornato a {dataAggiornamento}
                  </p>
                </div>
              </div>

              {/* CTA WhatsApp */}
              <div className="mt-8 bg-navy rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-2">Hai domande su questo argomento?</h3>
                <p className="text-white/75 text-sm mb-6">
                  Contattaci su WhatsApp per una primo preventivo dell'intervento.
                </p>
                <a
                  href="https://wa.me/393339809319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors text-sm"
                >
                  <MessageCircle className="h-5 w-5" />
                  Parla con noi su WhatsApp
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-24">
              <ScopriIlCostoDellaTuaRistrutturazione />

              <div>
                <h3 className="text-base font-bold text-navy mb-4 uppercase tracking-wide">
                  Altri articoli
                </h3>
                <div className="space-y-3">
                  {altriArticoli.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/blog/${a.slug}/`}
                      className="flex gap-3 p-3 bg-gray-50 rounded-xl hover:bg-navy/5 transition-colors group"
                    >
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0">
                        <Image src={a.immagine} alt={a.titolo} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-navy text-sm line-clamp-2 group-hover:text-orange transition-colors">
                          {a.titolo}
                        </h4>
                        <span className="text-orange text-xs mt-1 block">{a.categoria}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Back to blog */}
              <Link
                href="/blog/"
                className="flex items-center gap-2 text-sm text-teal-700 hover:text-orange transition-colors font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                Torna al blog
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Pronto a Ristrutturare?</h2>
          <p className="text-white/75 text-lg mb-8 max-w-2xl mx-auto">
            Richiedi una primo preventivo per il tuo progetto.
          </p>
          <a
            href="https://wa.me/393339809319"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            Richiedi preventivo
          </a>
          <p className="text-white/40 text-sm mt-4">Costi aggiornati a {dataAggiornamento}</p>
        </div>
      </section>
    </div>
  );
}
