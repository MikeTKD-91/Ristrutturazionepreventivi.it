"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Wrench } from "lucide-react";
import { getDataAggiornamento } from "@/lib/utils";

const footerLinks = {
  servizi: [
    { label: "Appartamento Completo", href: "/servizi/ristrutturazione-appartamento-completo/" },
    { label: "Cucina", href: "/servizi/ristrutturazione-cucina/" },
    { label: "Bagno", href: "/servizi/ristrutturazione-bagno/" },
    { label: "Tetto", href: "/servizi/rifacimento-tetto/" },
    { label: "Pavimenti", href: "/servizi/pavimenti-rivestimenti/" },
    { label: "Impianti", href: "/servizi/impianti-elettrici-idraulici-termici/" },
    { label: "Cappotto Termico", href: "/servizi/cappotto-termico/" },
  ],
  zone: [
    { label: "Napoli", href: "/napoli/" },
    { label: "Caserta", href: "/caserta/" },
    { label: "Aversa", href: "/comune/aversa/" },
    { label: "Giugliano", href: "/comune/giugliano-in-campania/" },
    { label: "Zone Servite", href: "/zone-servite/" },
  ],
  informazioni: [
    { label: "Blog", href: "/blog/" },
    { label: "Bonus Ristrutturazione", href: "/bonus-ristrutturazione/" },
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Cookie Policy", href: "/cookie-policy/" },
  ],
};

export default function Footer() {
  const dataAggiornamento = getDataAggiornamento();

  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-orange flex items-center justify-center">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-tight">
                  Ristrutturazione
                </span>
                <span className="text-orange text-sm font-semibold leading-tight">
                  Preventivi
                </span>
              </div>
            </Link>
            <p className="text-white/70 text-sm">
              Russo FE Costruzione SRL è la tua impresa di fiducia per ristrutturazioni 
              a Napoli, Caserta e in tutta la provincia. Stime indicative immediate e gratuite.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 text-white/70">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Viale della Libertà 3<br />81030 Lusciano (CE)</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:info@ristrutturazionepreventivi.it" className="hover:text-orange transition-colors">
                  info@ristrutturazionepreventivi.it
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <a href="https://wa.me/393339809319" target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors">
                  WhatsApp: 333 980 9319
                </a>
              </div>
            </div>
          </div>

          {/* Servizi */}
          <div>
            <h3 className="text-white font-semibold mb-4">Servizi</h3>
            <ul className="space-y-2">
              {footerLinks.servizi.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-orange transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zone */}
          <div>
            <h3 className="text-white font-semibold mb-4">Zone Servite</h3>
            <ul className="space-y-2">
              {footerLinks.zone.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-orange transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informazioni */}
          <div>
            <h3 className="text-white font-semibold mb-4">Informazioni</h3>
            <ul className="space-y-2">
              {footerLinks.informazioni.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-orange transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                localStorage.removeItem("cookieConsent");
                window.location.reload();
              }}
              className="mt-4 text-white/70 hover:text-orange transition-colors text-sm underline"
            >
              Impostazioni Cookie
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/50 text-xs text-center md:text-left">
              <p>Russo FE Costruzione SRL - P.IVA: 04836230617</p>
              <p>Costi aggiornati a {dataAggiornamento} - Ultimo aggiornamento: {dataAggiornamento}</p>
            </div>
            <div className="text-white/50 text-xs text-center md:text-right">
              <p>© {new Date().getFullYear()} ristrutturazionepreventivi.it</p>
              <p>Tutti i diritti riservati</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}