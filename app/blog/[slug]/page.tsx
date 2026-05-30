import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MessageCircle, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getAllArticoli, getArticoloBySlug, getAltriArticoli } from "@/lib/blog";
import CalcolatoreStima from "@/components/shared/CalcolatoreStima";
import { getDataAggiornamento } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

function calcolaTempoLettura(contenuto: string): number {
  const parole = contenuto.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(parole / 200));
}

function estraiTOC(contenuto: string): { id: string; testo: string; livello: number }[] {
  const righe = contenuto.split("\n");
  return righe
    .filter((r) => r.startsWith("## ") || r.startsWith("### "))
    .map((r) => {
      const livello = r.startsWith("### ") ? 3 : 2;
      const testo = r.replace(/^#{2,3}\s+/, "").replace(/\*\*/g, "");
      const id = testo.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
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
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 items-start">

            {/* Main */}
            <div className="lg:col-span-2">

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
              <article className="
                prose prose-lg max-w-none
                prose-headings:text-navy prose-headings:font-bold prose-headings:scroll-mt-24
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-2
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-li:text-gray-700
                prose-strong:text-navy
                prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline
                prose-table:text-sm prose-th:bg-navy prose-th:text-white prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2 prose-td:border prose-td:border-gray-200
                prose-blockquote:border-l-4 prose-blockquote:border-orange prose-blockquote:bg-orange/5 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
              ">
                <ReactMarkdown>{articolo.contenuto}</ReactMarkdown>
              </article>

              {/* Autore card */}
              <div className="mt-12 flex items-center gap-5 bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center shrink-0">
                  <User className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="font-bold text-navy">Russo FE Costruzione SRL</p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Impresa edile specializzata in ristrutturazioni nell&apos;Agro Aversano, Napoli e Caserta. 
                    Preventivi gratuiti e trasparenti.
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
                  Contattaci su WhatsApp per una consulenza gratuita e senza impegno.
                </p>
                <a
                  href="https://wa.me/393339809319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white px-6 py-3 rounded-xl font-semibold transition-colors text-sm"
                >
                  <MessageCircle className="h-5 w-5" />
                  Scrivici su WhatsApp
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-24">
              <CalcolatoreStima />

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
            Richiedi ora una stima indicativa immediata e gratuita per il tuo progetto.
          </p>
          <a
            href="https://wa.me/393339809319"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            Richiedi Stima Gratuita
          </a>
          <p className="text-white/40 text-sm mt-4">Costi aggiornati a {dataAggiornamento}</p>
        </div>
      </section>
    </div>
  );
}
