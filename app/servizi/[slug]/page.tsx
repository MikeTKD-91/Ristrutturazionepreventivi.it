import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MessageCircle, X } from "lucide-react";
import { servizi, getServizioBySlug } from "@/data/servizi";
import { comuni } from "@/data/comuni";
import ScopriIlCostoDellaTuaRistrutturazione from "@/components/shared/ScopriIlCostoDellaTuaRistrutturazione";
import CalcolatoreAppartamento from "@/components/shared/CalcolatoreAppartamento";
import CalcolatoreBagno from "@/components/shared/CalcolatoreBagno";
import { getDataAggiornamento, formatPrezzo, generaLinkWhatsApp } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servizi.map((servizio) => ({
    slug: servizio.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const servizio = getServizioBySlug(slug);
  
  if (!servizio) {
    return {
      title: "Servizio non trovato",
    };
  }

  return {
    title: `${servizio.titolo} | Napoli Caserta`,
    description: servizio.descrizione,
    alternates: {
      canonical: `https://ristrutturazionepreventivi.it/servizi/${slug}/`,
    },
    openGraph: {
      title: `${servizio.titolo} | Napoli Caserta`,
      description: servizio.descrizione,
      url: `https://ristrutturazionepreventivi.it/servizi/${slug}/`,
      images: [
        {
          url: servizio.immagine,
          width: 800,
          height: 600,
          alt: servizio.alt,
        },
      ],
    },
  };
}

export default async function ServizioPage({ params }: Props) {
  const { slug } = await params;
  const servizio = getServizioBySlug(slug);
  const isBagno = slug === "ristrutturazione-bagno";
  const dataAggiornamento = getDataAggiornamento();

  if (!servizio) {
    notFound();
  }

  const altriServizi = servizi.filter(s => s.slug !== slug).slice(0, 3);

  if (slug === "ristrutturazione-appartamento-completo") {
    const inclusioniStandard = [
        "Rifacimento impianto elettrico, idraulico e termico",
        "Fornitura e installazione di termosifoni standard in alluminio",
        "Fornitura e posa di infissi esterni in PVC",
        "Fornitura e installazione di portoncino d'ingresso",
        "Fornitura e posa di pavimenti e rivestimenti",
        "Fornitura e posa di porte interne complete di telaio e bussole",
        "Opere murarie, sottofondi, intonaci e rasature",
        "Controsoffittatura liscia dove prevista dal progetto",
        "Fornitura e installazione dei sanitari: wc, bidet, lavabo e piatto doccia",
        "Tinteggiatura finale e finiture standard",
        "Demolizioni e smaltimento delle rimozioni previste",
      ];

    const esclusioniExtra = [
      "Pratiche edilizie, catastali e autorizzazioni eventualmente necessarie",
      "Arredi su misura, cucina ed elettrodomestici",
      "Box doccia",
      "Infissi fuori capitolato e opere non previste nel computo",
      "Adeguamenti strutturali, consolidamenti o interventi emersi dopo le demolizioni",
      "Spese condominiali, occupazione suolo pubblico e costi logistici straordinari",
      "Finiture fuori capitolato e forniture scelte dal cliente",
    ];

    return (
      <div className="min-h-screen bg-white">
        <section className="bg-navy py-14 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Check className="h-4 w-4 text-orange" />
                  Costi aggiornati a {dataAggiornamento}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                  Ristrutturazione casa e appartamento a Napoli e Caserta:{" "}
                  <span className="text-orange">costo base da 550 €/mq</span>
                </h1>
                <p className="text-white/70 text-lg leading-relaxed mb-6">
                  Il costo base da 550 €/mq è un riferimento iniziale per ristrutturazione completa di casa o appartamento. Il preventivo definitivo si conferma solo dopo verifica tecnica e sopralluogo.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {["Prezzario Regionale Campania", "Sopralluogo tecnico", "Stima verificabile"].map((t) => (
                    <span key={t} className="bg-white/10 text-white/80 text-sm px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
                <a
                  href="#modulo di stima"
                  className="inline-flex items-center gap-2 bg-orange text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  Richiedi una stima
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="hidden lg:block relative h-72 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={servizio.immagine}
                  alt={servizio.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <div className="lg:hidden px-4 pt-6" id="modulo di stima">
          <CalcolatoreAppartamento comuneDefault="Napoli" />
        </div>

        <div className="container mx-auto px-4 py-20 grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Ristrutturazione appartamento completo</h2>
              <p className="text-gray-600">
                Questa pagina fornisce un riferimento tecnico utile per capire se il tuo intervento rientra in un caso standard o se richiede una valutazione economica diversa per logistica, impianti, accessibilità o finiture.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Prezzo base di riferimento</h2>
              <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-orange-50 via-white to-navy/5 p-6 md:p-8 shadow-lg">
                <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange mb-3">Costo base certo</p>
                    <div className="flex items-end gap-3 flex-wrap">
                      <span className="text-5xl md:text-7xl font-black text-navy leading-none">550</span>
                      <span className="text-xl md:text-2xl font-bold text-orange pb-1">€/mq</span>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 max-w-xl">
                      Applicabile nei casi standard con accesso facilitato, gestione semplice dei materiali di risulta, piano agevole come un primo piano e condizioni operative ordinarie.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white border border-gray-200 p-5">
                    <div className="rounded-2xl border border-orange/20 bg-orange/5 p-4">
                      <p className="text-[11px] font-bold tracking-[0.14em] text-orange uppercase">Quando il costo cambia</p>
                      <p className="mt-2 text-sm text-gray-600">
                        Accessi difficili, piani più onerosi, logistica complessa, demolizioni straordinarie, impianti molto datati, umidità o finiture fuori standard.
                      </p>
                    </div>
                    <p className="mt-4 text-xs text-gray-500">
                      Il preventivo finale si conferma solo dopo verifica tecnica e sopralluogo.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Cosa include la ristrutturazione completa</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {inclusioniStandard.map((voce) => (
                  <div key={voce} className="flex gap-3 rounded-xl border border-green-100 bg-green-50/60 p-4">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed">{voce}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Cosa non comprende</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {esclusioniExtra.map((voce) => (
                  <div key={voce} className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <X className="h-5 w-5 text-orange mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed">{voce}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Da cosa dipende davvero il costo</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Accessibilità del fabbricato e del piano",
                  "Facilità di carico, scarico e smaltimento materiali di risulta",
                  "Stato reale degli impianti esistenti",
                  "Distribuzione interna e necessità di modifiche murarie",
                  "Presenza di umidità, difetti nascosti o lavori emersi dopo demolizione",
                  "Livello delle finiture e forniture scelte dal cliente",
                ].map((item) => (
                  <div key={item} className="bg-navy/5 p-4 rounded-xl">
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Quanto dura il cantiere</h2>
              <p className="text-gray-600 mb-5">
                Per un appartamento medio, in condizioni ordinarie, la durata del cantiere si colloca in genere tra 6 e 10 settimane lavorative. Tempi più precisi dipendono dalla logistica del fabbricato, dalle attese tecniche e dal livello di finitura richiesto.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-navy mb-3">Dove operiamo</h2>
              <p className="text-gray-600 mb-4">
                Operiamo tra Napoli, Caserta e Agro Aversano, con sopralluoghi e preventivi tecnici calibrati sulle condizioni reali dell'immobile.
              </p>
              <div className="flex flex-wrap gap-2">
                {comuni.slice(0, 15).map((comune) => (
                  <Link
                    key={comune.slug}
                    href={`/comune/${comune.slug}/`}
                    className="bg-gray-100 hover:bg-navy hover:text-white text-navy px-3 py-1 rounded-lg text-sm transition-colors"
                  >
                    {comune.nome}
                  </Link>
                ))}
                <span className="text-gray-400 px-3 py-1 text-sm">e altri...</span>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <div id="modulo di stima" className="hidden lg:block">
              <CalcolatoreAppartamento comuneDefault="Napoli" />
            </div>

            <div className="bg-navy p-6 rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-4">
                Richiedi una verifica del tuo caso
              </h3>
              <p className="text-white/80 mb-6">
                Se il tuo appartamento rientra nei parametri standard, il costo base di 550 €/mq è un riferimento reale. Se ci sono criticità o condizioni particolari, il preventivo viene ricalcolato in modo trasparente dopo il sopralluogo.
              </p>
              <a
                href={generaLinkWhatsApp(
                  servizio.titolo,
                  80,
                  "Napoli",
                  `${formatPrezzo(servizio.prezzoMq.base * 80)}`,
                  "Base"
                )}
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
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={servizio.immagine}
          alt={servizio.alt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="inline-flex items-center gap-2 bg-orange/20 text-orange backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Check className="h-4 w-4" />
              Costi aggiornati a {dataAggiornamento}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {servizio.titolo}
            </h2>
            <p className="text-xl text-white/80 max-w-2xl">
              {servizio.sottotitolo}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Descrizione */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Descrizione del Servizio
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600 whitespace-pre-line">
                  {servizio.descrizioneLunga}
                </div>
              </div>

              {/* Caratteristiche */}
              <div className="bg-gray-50 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Cosa Include
                </h2>
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

                {isBagno && (
                  <div className="bg-gray-50 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-navy mb-6">
                      Cosa non comprende
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        "Opere extra capitolato o richieste fuori standard",
                        "Box doccia",
                        "Scaldabagno, termoarredo e accessori non previsti nel pacchetto base",
                        "Controsoffitti, faretti, nicchie su misura, velette e lavorazioni decorative",
                        "Spostamenti importanti di scarichi e colonne montanti se richiedono opere aggiuntive",
                        "Adeguamenti su murature ammalorate, umidità, sottofondi deteriorati o imprevisti emersi dopo la demolizione",
                        "Permessi, pratiche edilizie o adempimenti tecnici se necessari",
                        "Forniture extra capitolato o di fascia superiore rispetto alla dotazione base",
                      ].map((voce, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <X className="h-4 w-4 text-orange" />
                          </div>
                          <span className="text-gray-700">{voce}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}


              {/* Vantaggi */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Perché Sceglierci
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {servizio.vantaggi.map((vantaggio, i) => (
                    <div
                      key={i}
                      className="bg-navy/5 p-4 rounded-xl border-l-4 border-orange"
                    >
                      <p className="text-gray-700">{vantaggio}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prezzi */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-6">
                  Prezzi Indicativi (Prezzario Regionale Campania)
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-white border-2 border-gray-200 p-6 rounded-xl text-center">
                    <p className="text-sm text-gray-500 mb-2">Finitura Base</p>
                    <p className="text-3xl font-bold text-navy">
                      {servizio.prezzoMq.base} €
                    </p>
                    <p className="text-sm text-gray-400">/mq</p>
                  </div>
                  <div className="bg-white border-2 border-orange p-6 rounded-xl text-center relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange text-white text-xs px-3 py-1 rounded-full">
                      Più scelta
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Finitura Standard</p>
                    <p className="text-3xl font-bold text-orange">
                      {servizio.prezzoMq.standard} €
                    </p>
                    <p className="text-sm text-gray-400">/mq</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 p-6 rounded-xl text-center">
                    <p className="text-sm text-gray-500 mb-2">Finitura Premium</p>
                    <p className="text-3xl font-bold text-navy">
                      {servizio.prezzoMq.premium} €
                    </p>
                    <p className="text-sm text-gray-400">/mq</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  * I prezzi sono indicativi e possono variare in base alle specifiche del progetto.
                  Costi aggiornati a {dataAggiornamento}.
                </p>
              </div>

              {/* Zone */}
              <div>
                <h2 className="text-2xl font-bold text-navy mb-4">
                  Dove Operiamo
                </h2>
                <p className="text-gray-600 mb-4">
                  Offriamo il servizio di {servizio.titolo.toLowerCase()} nelle Province di Napoli e Caserta 
                  di Napoli, Caserta e Agro Aversano:
                </p>
                <div className="flex flex-wrap gap-2">
                  {comuni.slice(0, 15).map((comune) => (
                    <Link
                      key={comune.slug}
                      href={`/comune/${comune.slug}/`}
                      className="bg-gray-100 hover:bg-navy hover:text-white text-navy px-3 py-1 rounded-lg text-sm transition-colors"
                    >
                      {comune.nome}
                    </Link>
                  ))}
                  <span className="text-gray-400 px-3 py-1 text-sm">e altri...</span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Modulo di stima */}
              {slug === "ristrutturazione-appartamento-completo" ? <CalcolatoreAppartamento comuneDefault="Napoli" /> : slug === "ristrutturazione-bagno" ? <CalcolatoreBagno comuneDefault="Napoli" /> : <ScopriIlCostoDellaTuaRistrutturazione comuneDefault="Napoli" />}

              {/* CTA */}
              <div className="bg-navy p-6 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-4">
                  Richiedi un preventivo per il tuo intervento
                </h3>
                <p className="text-white/80 mb-6">
                  Contattaci su WhatsApp per capire il costo del tuo progetto di {servizio.titolo.toLowerCase()}. Se i dati rientrano nei parametri indicati, prepariamo il preventivo e confermiamo tutto con il sopralluogo.
                </p>
                <a
                  href={generaLinkWhatsApp(
                    servizio.titolo,
                    80,
                    "Napoli",
                    `${formatPrezzo(servizio.prezzoMq.standard * 80 * 0.9)} - ${formatPrezzo(servizio.prezzoMq.standard * 80 * 1.1)}`,
                    "Standard"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-orange hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Parla con noi su WhatsApp
                </a>
              </div>

              {/* Altri Servizi */}
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
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy mb-4">
            Vuoi sapere quanto costa il tuo intervento?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Richiedi un preventivo per il tuo progetto di {servizio.titolo.toLowerCase()}. Il sopralluogo conferma misure, lavorazioni e condizioni reali dell'immobile.
          </p>
          <a
            href="https://wa.me/393339809319"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            Richiedi preventivo
          </a>
          <p className="text-gray-400 text-sm mt-4">
            Costi aggiornati a {dataAggiornamento} - Ultimo aggiornamento: {dataAggiornamento}
          </p>
        </div>
      </section>
    </div>
  );
}
