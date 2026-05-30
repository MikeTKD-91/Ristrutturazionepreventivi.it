"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  ArrowRight,
  Check,
  MessageCircle,
  ChevronLeft,
  MapPin,
  Home,
  Phone,
  User,
  AlertCircle,
} from "lucide-react";
import { formatPrezzo } from "@/lib/utils";

interface CalcolatoreAppartamentoProps {
  comuneDefault?: string;
}

type Step = 1 | 2 | 3;

const STEP_LABELS = ["Configura", "I tuoi dati", "La tua stima"];

const PREZZO_STANDARD_MQ = 550;
const MIN_MQ = 70;
const MAX_MQ = 300;
const DEFAULT_MQ = 80;

const inclusioniStandard = [
  "Smontaggio porte interne e infissi interni, demolizione tramezzature, pavimentazione e massetto",
  "Impianto idraulico completo per bagno e cucina",
  "Impianto di riscaldamento con radiatori e caldaia",
  "Predisposizione condizionatori",
  "Impianto elettrico completo con frutti e placchette",
  "Controsoffitto liscio",
  "Fornitura e posa di pavimenti e rivestimenti",
  "Fornitura e installazione di porte interne e infissi interni",
  "Preparazione fondo, stuccatura e tinteggiatura pareti e soffitto",
  "Fornitura e installazione di faretti LED slim ad incasso",
  "Fornitura e installazione sanitari: WC, bidet, lavabo sospeso e piatto doccia senza box",
];

const esclusioniExtra = [
  "Finiture premium o fuori capitolato standard",
  "Strip LED, illuminazione scenografica o punti luce aggiuntivi",
  "Box doccia, arredi bagno, mobili su misura e cucine",
  "Lavorazioni dovute a criticità emerse in sopralluogo",
  "Modifiche strutturali, pratiche tecniche e richieste particolari non comprese nel pacchetto standard",
];

export default function CalcolatoreAppartamento({
  comuneDefault = "",
}: CalcolatoreAppartamentoProps) {
  const [step, setStep] = useState<Step>(1);
  const [mq, setMq] = useState(DEFAULT_MQ);
  const [comune, setComune] = useState(comuneDefault);
  const [accessibile, setAccessibile] = useState(false);

  const [nome, setNome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [disponibileAppuntamento, setDisponibileAppuntamento] = useState(false);

  const [isCalculating, setIsCalculating] = useState(false);

  const stima = useMemo(() => {
    const totale = mq * PREZZO_STANDARD_MQ;
    return {
      min: Math.round(totale * 0.95),
      max: Math.round(totale * 1.05),
    };
  }, [mq]);

  const comuneFinale = comune.trim() || comuneDefault || "da definire";

  const canGoStep2 = accessibile && mq >= MIN_MQ;
  const canCalculate =
    nome.trim().length >= 2 &&
    telefono.trim().length >= 6 &&
    disponibileAppuntamento;

  const handleCalculate = () => {
    if (!canCalculate) return;

    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setStep(3);
    }, 700);
  };

  const handleReset = () => {
    setStep(1);
    setMq(DEFAULT_MQ);
    setComune(comuneDefault);
    setAccessibile(false);
    setNome("");
    setTelefono("");
    setDisponibileAppuntamento(false);
    setIsCalculating(false);
  };

  const generaLinkWhatsApp = () => {
    const testo = encodeURIComponent(
      `Ciao, sono ${nome}.\n` +
      `Vorrei verificare la compatibilità della mia ristrutturazione appartamento chiavi in mano.\n\n` +
      `📐 Superficie: ${mq} mq\n` +
      `📍 Comune: ${comuneFinale}\n` +
      `💶 Stima orientativa standard: ${formatPrezzo(stima.min)} – ${formatPrezzo(stima.max)}\n` +
      `📞 Telefono: ${telefono}\n` +
      `🏠 Immobile accessibile per carico/scarico materiali: Sì\n` +
      `🤝 Disponibile ad appuntamento in studio/sopralluogo: Sì\n\n` +
      `Se la configurazione è compatibile con il vostro metodo di lavoro, resto disponibile per un appuntamento tecnico.`
    );

    return `https://wa.me/393339809319?text=${testo}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
      <div className="flex items-start gap-3 mb-6">
        <div className="h-12 w-12 rounded-xl bg-orange/10 flex items-center justify-center shrink-0">
          <Calculator className="h-6 w-6 text-orange" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-navy">
            Scopri quanto costa la tua ristrutturazione
          </h3>
          <p className="text-sm text-gray-600">
            Calcolo basato su ristrutturazione chiavi in mano standard da 550 €/mq
          </p>
        </div>
      </div>

      <div className="mb-5 rounded-xl bg-orange/5 border border-orange/20 p-4">
        <div className="flex gap-2">
          <AlertCircle className="h-5 w-5 text-orange shrink-0 mt-0.5" />
          <p className="text-sm text-navy leading-relaxed">
            Questa stima si riferisce a un appartamento con accessibilità ordinaria,
            comodo per carico/scarico materiali e smaltimento rifiuti. Extra,
            finiture superiori e richieste particolari vengono conteggiati a parte.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {STEP_LABELS.map((label, i) => (
            <span
              key={label}
              className={`text-xs font-medium transition-colors ${
                step > i + 1
                  ? "text-orange"
                  : step === i + 1
                  ? "text-navy"
                  : "text-gray-400"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-1.5 bg-orange rounded-full"
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.35 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.22 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                Superficie appartamento:{" "}
                <span className="text-orange font-bold">{mq} mq</span>
              </label>
              <input
                type="range"
                min={MIN_MQ}
                max={MAX_MQ}
                step={5}
                value={mq}
                onChange={(e) => setMq(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{MIN_MQ} mq</span>
                <span>{MAX_MQ} mq</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Il calcolatore è pensato per appartamenti da ristrutturare in modo completo.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                Comune
              </label>
              <div className="relative">
                <MapPin className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={comune}
                  onChange={(e) => setComune(e.target.value)}
                  placeholder={comuneDefault || "Es. Napoli, Aversa, Caserta"}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-orange/40 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={accessibile}
                onChange={(e) => setAccessibile(e.target.checked)}
                className="mt-1 h-4 w-4 accent-orange"
              />
              <div>
                <p className="text-sm font-semibold text-navy">
                  Confermo che l'immobile è accessibile
                </p>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  L'appartamento è comodo per carico/scarico materiali e per la gestione
                  dei rifiuti di risulta in condizioni ordinarie.
                </p>
              </div>
            </label>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Home className="h-4 w-4 text-orange" />
                <p className="text-sm font-semibold text-navy">
                  Riferimento standard
                </p>
              </div>
              <p className="text-sm text-gray-700">
                Prezzo orientativo base di calcolo:{" "}
                <span className="font-bold text-navy">{PREZZO_STANDARD_MQ} €/mq</span>
              </p>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!canGoStep2}
              className="w-full bg-navy hover:bg-navy/90 disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Avanti
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -14 }}
            transition={{ duration: 0.22 }}
            className="space-y-5"
          >
            <div className="bg-orange/5 border border-orange/20 rounded-xl p-4 text-sm text-navy">
              <strong>Configurazione:</strong> appartamento {mq} mq · {comuneFinale} ·
              accessibilità ordinaria confermata
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                Nome e cognome *
              </label>
              <div className="relative">
                <User className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Es. Mario Rossi"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                Telefono *
              </label>
              <div className="relative">
                <Phone className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Es. 333 980 9319"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-orange/40 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={disponibileAppuntamento}
                onChange={(e) => setDisponibileAppuntamento(e.target.checked)}
                className="mt-1 h-4 w-4 accent-orange"
              />
              <div>
                <p className="text-sm font-semibold text-navy">
                  Se la stima è compatibile, sono disponibile a un appuntamento
                </p>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  In studio o con sopralluogo tecnico, per verificare immobile,
                  priorità, dettagli esecutivi ed eventuali extra.
                </p>
              </div>
            </label>

            <button
              onClick={handleCalculate}
              disabled={!canCalculate || isCalculating}
              className="w-full bg-navy hover:bg-navy/90 disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {isCalculating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Calcolo in corso...
                </>
              ) : (
                <>
                  Mostra la mia stima
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-navy transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Modifica configurazione
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-3">
                <Check className="h-7 w-7 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-navy">
                Ecco la tua prima stima del costo, {nome}!
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                Appartamento {mq} mq · {comuneFinale}
              </p>
            </div>

            <div className="bg-gradient-to-br from-navy to-navy/90 rounded-2xl p-5 text-center">
              <p className="text-white/60 text-xs mb-1">Stima orientativa standard</p>
              <div className="text-3xl md:text-4xl font-bold text-white">
                {formatPrezzo(stima.min)} – {formatPrezzo(stima.max)}
              </div>
              <p className="text-white/40 text-xs mt-2">
                Basata su ristrutturazione appartamento chiavi in mano standard
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-5">
              <h5 className="text-base font-bold text-navy mb-3">
                Cosa comprende il prezzo orientativo standard
              </h5>
              <ul className="space-y-2">
                {inclusioniStandard.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="h-4 w-4 text-orange shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 border border-gray-200">
              <h5 className="text-base font-bold text-navy mb-3">
                Cosa viene valutato a parte
              </h5>
              <ul className="space-y-2">
                {esclusioniExtra.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <ArrowRight className="h-4 w-4 text-orange shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange/5 border border-orange/20 rounded-xl p-4">
              <p className="text-sm text-navy leading-relaxed">
                Se questa forbice è in linea con le tue aspettative, il passo successivo
                è un appuntamento in studio o un sopralluogo tecnico. Serve a verificare
                l'immobile dal vivo e trasformare questa stima orientativa in una proposta
                seria e professionale.
              </p>
            </div>

            <a
              href={generaLinkWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-orange hover:bg-orange/90 text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-3"
            >
              <MessageCircle className="h-5 w-5 shrink-0" />
              Invia richiesta per verifica compatibilità
            </a>

            <button
              onClick={handleReset}
              className="w-full bg-gray-100 hover:bg-gray-200 text-navy py-3 rounded-xl font-medium transition-colors text-sm"
            >
              Calcola nuova stima
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
