"use client";

import { useMemo, useState } from "react";
import { Calculator, MessageCircle } from "lucide-react";

interface ScopriIlCostoDellaTuaRistrutturazioneProps {
  comuneDefault?: string;
}

export default function ScopriIlCostoDellaTuaRistrutturazione({
  comuneDefault = "",
}: ScopriIlCostoDellaTuaRistrutturazioneProps) {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [citta, setCitta] = useState(comuneDefault === "il tuo comune" ? "" : comuneDefault);
  const [descrizione, setDescrizione] = useState("");
  const [consenso, setConsenso] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const isValid = useMemo(() => {
    return (
      nome.trim() &&
      cognome.trim() &&
      telefono.trim() &&
      email.trim() &&
      citta.trim() &&
      descrizione.trim() &&
      consenso &&
      !honeypot.trim()
    );
  }, [nome, cognome, telefono, email, citta, descrizione, consenso, honeypot]);

  const whatsappHref = useMemo(() => {
    const messaggio = encodeURIComponent(
      `Salve, vorrei richiedere un preventivo per il mio intervento.\n\n` +
        `Nome: ${nome}\n` +
        `Cognome: ${cognome}\n` +
        `Cellulare: ${telefono}\n` +
        `Email: ${email}\n` +
        `Città: ${citta}\n` +
        `Descrizione intervento: ${descrizione}\n\n` +
        `Dichiaro di voler essere ricontattato in merito alla mia richiesta.`
    );

    return `https://wa.me/393339809319?text=${messaggio}`;
  }, [nome, cognome, telefono, email, citta, descrizione]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-xl bg-orange/10 flex items-center justify-center">
          <Calculator className="h-6 w-6 text-orange" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-navy">Richiedi un preventivo online immediato</h3>
          <p className="text-sm text-gray-600">
            Compila il form: ricevi un preventivo online immediato e, se serve, proseguiamo su WhatsApp per i dettagli.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-navy mb-2">
              Nome *
            </label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Es. Mario"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="cognome" className="block text-sm font-medium text-navy mb-2">
              Cognome *
            </label>
            <input
              id="cognome"
              type="text"
              value={cognome}
              onChange={(e) => setCognome(e.target.value)}
              placeholder="Es. Rossi"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-navy mb-2">
              Numero di cellulare *
            </label>
            <input
              id="telefono"
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Es. 333 123 4567"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy mb-2">
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Es. nome@email.it"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="citta" className="block text-sm font-medium text-navy mb-2">
            Città *
          </label>
          <input
            id="citta"
            type="text"
            value={citta}
            onChange={(e) => setCitta(e.target.value)}
            placeholder="Es. Aversa"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all"
          />
        </div>

        <div>
          <label htmlFor="descrizione" className="block text-sm font-medium text-navy mb-2">
            Descrizione breve dell&apos;intervento *
          </label>
          <textarea
            id="descrizione"
            value={descrizione}
            onChange={(e) => setDescrizione(e.target.value)}
            placeholder="Descrivi in breve il lavoro da realizzare"
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all resize-y"
          />
        </div>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Non compilare questo campo</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <label className="flex items-start gap-3 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={consenso}
            onChange={(e) => setConsenso(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-orange focus:ring-orange"
          />
          <span>
            Dichiaro di voler essere contattato e di aver letto la{" "}
            <a href="/privacy-policy/" className="text-orange hover:underline">
              privacy policy
            </a>{" "}
            e la{" "}
            <a href="/cookie-policy/" className="text-orange hover:underline">
              cookie policy
            </a>
            .
          </span>
        </label>

        <a
          href={isValid ? whatsappHref : "#"}
          target={isValid ? "_blank" : undefined}
          rel={isValid ? "noopener noreferrer" : undefined}
          aria-disabled={!isValid}
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-3 ${
            isValid
              ? "bg-orange hover:bg-orange/90 text-white"
              : "bg-gray-200 text-gray-400 pointer-events-none"
          }`}
        >
          <MessageCircle className="h-5 w-5 shrink-0" />
          Invia richiesta e continua su WhatsApp
        </a>
      </div>
    </div>
  );
}
