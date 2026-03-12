import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import CookieBanner from "@/components/shared/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ristrutturazionepreventivi.it"),
  title: {
    default: "Ristrutturazioni nell'Agro Aversano, Napoli, Caserta e Provincia | +33 Comuni",
    template: "%s | RistrutturazionePreventivi.it",
  },
  description: "Stima indicativa immediata e gratuita per ristrutturazioni a Napoli, Caserta e Agro Aversano. Russo FE Costruzione SRL - 7 servizi, 33 comuni serviti.",
  keywords: ["ristrutturazione", "preventivi", "Napoli", "Caserta", "Agro Aversano", "appartamento", "cucina", "bagno", "tetto", "cappotto termico", "Lusciano", "Aversa"],
  authors: [{ name: "Russo FE Costruzione SRL" }],
  creator: "Russo FE Costruzione SRL",
  publisher: "Russo FE Costruzione SRL",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://ristrutturazionepreventivi.it",
    siteName: "RistrutturazionePreventivi.it",
    title: "Ristrutturazioni nell'Agro Aversano, Napoli, Caserta | Stima Gratuita",
    description: "Stima indicativa immediata e gratuita per ristrutturazioni a Napoli, Caserta e Agro Aversano. 7 servizi, 33 comuni serviti.",
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
    title: "Ristrutturazioni Napoli, Caserta e Agro Aversano | Stima Gratuita",
    description: "Stima indicativa immediata e gratuita per ristrutturazioni a Napoli, Caserta e Agro Aversano.",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
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
              alternateName: "Ristrutturazione Preventivi",
              url: "https://ristrutturazionepreventivi.it",
              logo: "https://ristrutturazionepreventivi.it/logo.png",
              image: "https://ristrutturazionepreventivi.it/og-image.jpg",
              description: "Impresa edile specializzata in ristrutturazioni a Napoli, Caserta e Agro Aversano.",
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
              sameAs: ["https://wa.me/393339809319"],
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
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "12",
                bestRating: "5",
                worstRating: "1",
              },
              review: [
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Marco R." },
                  reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
                  reviewBody: "Professionali e puntuali. Hanno ristrutturato il mio appartamento in tempi record. Consigliatissimi!",
                },
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Anna M." },
                  reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
                  reviewBody: "Ottimo lavoro per il rifacimento del bagno. Prezzi competitivi e qualità dei materiali eccellente.",
                },
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Giuseppe L." },
                  reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
                  reviewBody: "Ristrutturazione completa dell'appartamento completata nei tempi stabiliti. Team competente e affidabile.",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  );
}
