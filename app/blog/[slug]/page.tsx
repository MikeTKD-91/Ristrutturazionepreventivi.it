import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Check, MessageCircle, User } from "lucide-react";
import { articoli, getArticoloBySlug } from "@/data/blog";
import CalcolatoreStima from "@/components/shared/CalcolatoreStima";
import { getDataAggiornamento } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articoli.map((articolo) => ({
    slug: articolo.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const articolo = getArticoloBySlug(slug);
  
  if (!articolo) {
    return {
      title: "Articolo non trovato",
    };
  }

  return {
    title: articolo.titolo,
    description: articolo.estratto,
    alternates: {
      canonical: `https://ristrutturazionepreventivi.it/blog/${slug}/`,
    },
    openGraph: {
      title: articolo.titolo,
      description: articolo.estratto,
      url: `https://ristrutturazionepreventivi.it/blog/${slug}/`,
      images: [
        {
          url: articolo.immagine,
          width: 800,
          height: 600,
          alt: articolo.titolo,
        },
      ],
    },
  };
}

function formatData(data: string): string {
  const date = new Date(data);
  return date.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticoloPage({ params }: Props) {
  const { slug } = await params;
  const articolo = getArticoloBySlug(slug);
  const dataAggiornamento = getDataAggiornamento();

  if (!articolo) {
    notFound();
  }

  const altriArticoli = articoli
    .filter(a => a.slug !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px]">
        <Image
          src={articolo.immagine}
          alt={articolo.titolo}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Torna al blog
            </Link>
            <div className="inline-flex items-center gap-2 bg-orange/20 text-orange backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Check className="h-4 w-4" />
              Costi aggiornati a {dataAggiornamento}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white max-w-3xl">
              {articolo.titolo}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b">
                <span className="bg-orange/10 text-orange px-3 py-1 rounded-full text-sm font-medium">
                  {articolo.categoria}
                </span>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{formatData(articolo.data)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <User className="h-4 w-4" />
                  <span>Russo FE Costruzione SRL</span>
                </div>
              </div>

              {/* Article */}
              <article className="prose prose-lg max-w-none">
                {articolo.contenuto.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <h2 key={index} className="text-2xl font-bold text-navy mt-8 mb-4">{paragraph.replace(/\*\*/g, '')}</h2>;
                  }
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n').filter(item => item.startsWith('- '));
                    return (
                      <ul key={index} className="list-disc pl-6 space-y-2 my-4">
                        {items.map((item, i) => (
                          <li key={i} className="text-gray-700">{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.includes('|')) {
                    const rows = paragraph.split('\n').filter(row => row.includes('|'));
                    if (rows.length > 2) {
                      return (
                        <div key={index} className="overflow-x-auto my-6">
                          <table className="w-full border-collapse">
                            <tbody>
                              {rows.map((row, i) => {
                                const cells = row.split('|').filter(c => c.trim());
                                if (i === 0) {
                                  return (
                                    <tr key={i} className="bg-navy text-white">
                                      {cells.map((cell, j) => (
                                        <th key={j} className="p-3 text-left">{cell.trim()}</th>
                                      ))}
                                    </tr>
                                  );
                                }
                                return (
                                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                    {cells.map((cell, j) => (
                                      <td key={j} className="p-3 border-b">{cell.trim()}</td>
                                    ))}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      );
                    }
                  }
                  return <p key={index} className="text-gray-700 leading-relaxed mb-4">{paragraph}</p>;
                })}
              </article>

              {/* CTA */}
              <div className="mt-12 bg-navy p-8 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-4">
                  Hai Domande su Questo Argomento?
                </h3>
                <p className="text-white/80 mb-6">
                  Contattaci su WhatsApp per una consulenza gratuita. Saremo lieti di 
                  aiutarti con il tuo progetto di ristrutturazione.
                </p>
                <a
                  href="https://wa.me/393339809319"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-orange hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  Scrivici su WhatsApp
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Calcolatore */}
              <CalcolatoreStima />

              {/* Altri Articoli */}
              <div>
                <h3 className="text-lg font-bold text-navy mb-4">
                  Altri Articoli
                </h3>
                <div className="space-y-4">
                  {altriArticoli.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/blog/${a.slug}/`}
                      className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-navy/5 transition-colors"
                    >
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={a.immagine}
                          alt={a.titolo}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-navy text-sm line-clamp-2">{a.titolo}</h4>
                        <p className="text-orange text-xs mt-1">{a.categoria}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto a Ristrutturare?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Richiedi ora una stima indicativa immediata e gratuita per il tuo progetto.
          </p>
          <a
            href="https://wa.me/393339809319"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            Richiedi Stima Gratuita
          </a>
          <p className="text-white/50 text-sm mt-4">
            Costi aggiornati a {dataAggiornamento} - Ultimo aggiornamento: {dataAggiornamento}
          </p>
        </div>
      </section>
    </div>
  );
}