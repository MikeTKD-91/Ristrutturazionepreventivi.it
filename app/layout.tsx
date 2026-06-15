import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import CookieBanner from "@/components/shared/CookieBanner";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://ristrutturazionepreventivi.it"),
  title: {
    default: "Ristrutturazioni a Napoli, Caserta e Agro Aversano | Costo ristrutturazione e sopralluogo",
    template: "%s | RistrutturazionePreventivi.it",
  },
  description:
    "Ristrutturazioni residenziali a Napoli, Caserta e Agro Aversano. Richiedi un preventivo online, con verifica tecnica e sopralluogo per definire costi e lavorazioni.",
  keywords: [
    "ristrutturazione", "preventivi", "Napoli", "Caserta", "Agro Aversano",
    "appartamento", "cucina", "bagno", "tetto", "cappotto termico", "Lusciano", "Aversa",
  ],
  authors: [{ name: "Russo FE Costruzione SRL" }],
  creator: "Russo FE Costruzione SRL",
  publisher: "Russo FE Costruzione SRL",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://ristrutturazionepreventivi.it",
    siteName: "RistrutturazionePreventivi.it",
    title: "Ristrutturazioni a Napoli, Caserta e Agro Aversano | Costo ristrutturazione e sopralluogo",
    description:
      "Richiedi un preventivo online per ristrutturazioni a Napoli, Caserta e Agro Aversano. 7 servizi, sopralluogo tecnico e proposta chiara da verificare sul posto. Russo FE Costruzione SRL.",
    images: [
      {
        url: "https://ristrutturazionepreventivi.it/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ristrutturazione casa - Russo FE Costruzione SRL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ristrutturazioni Napoli, Caserta e Agro Aversano",
    description: "Richiedi un preventivo online per ristrutturazioni in Campania, con sopralluogo tecnico.",
    images: ["https://ristrutturazionepreventivi.it/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://ristrutturazionepreventivi.it/",
  },
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Russo FE Costruzione SRL",
              alternateName: "RistrutturazionePreventivi.it",
              url: "https://ristrutturazionepreventivi.it",
              image: "https://ristrutturazionepreventivi.it/og-image.jpg",
              description:
                "Impresa edile specializzata in ristrutturazioni residenziali a Napoli, Caserta e Agro Aversano.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Viale della Libertà 3",
                addressLocality: "Lusciano",
                addressRegion: "CE",
                postalCode: "81030",
                addressCountry: "IT",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "40.9667",
                longitude: "14.1833",
              },
              telephone: "+393339809319",
              email: "info@ristrutturazionepreventivi.it",
              sameAs: [
                "https://wa.me/393339809319",
                "https://www.google.com/maps/place/Ristrutturazionepreventivi.it+%7C+Russo+FE+Costruzione+SRL/@40.9600688,14.1937059,17z/data=!3m1!4b1!4m6!3m5!1s0x64266e4be5602541:0x80f4066562aece1d",
              ],
              hasMap: "https://www.google.com/maps/place/Ristrutturazionepreventivi.it+%7C+Russo+FE+Costruzione+SRL/@40.9600688,14.1937059,17z/data=!3m1!4b1!4m6!3m5!1s0x64266e4be5602541:0x80f4066562aece1d",
              identifier: {
                "@type": "PropertyValue",
                "propertyID": "Google Place ID",
                "value": "ChIJQSVgS27mYkARHc6uYmUG9IA",
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "08:00",
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Saturday",
                  opens: "08:00",
                  closes: "12:00",
                },
              ],
              priceRange: "€€",
              areaServed: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: "40.9667",
                  longitude: "14.1833",
                },
                geoRadius: "50000",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Servizi di Ristrutturazione",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ristrutturazione Appartamento Completo" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ristrutturazione Cucina" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ristrutturazione Bagno" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Rifacimento Tetto" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Pavimenti e Rivestimenti" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Impianti Elettrici, Idraulici e Termici" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cappotto Termico" } },
                ],
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}