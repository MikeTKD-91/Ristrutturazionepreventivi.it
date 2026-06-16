"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrezzo } from "@/lib/utils";

interface CalcolatoreBagnoProps {
  comuneDefault?: string;
}

type Step = 1 | 2 | 3;

const STEP_LABELS = ["Configura", "I tuoi dati", "Il tuo preventivo"];

const PREZZO_BASE = 5000;
const MIN_MQ = 4;
const MAX_MQ = 20;
const DEFAULT_MQ = 4;

const inclusioniStandard = [
  "Smontaggio porta interna e infisso interno",
  "Demolizione rivestimento",
  "Demolizione pavimento e massetto",
  "Fornitura e installazione nuovo impianto idraulico",
  "Fornitura e realizzazione impianto elettrico",
  "Fornitura e posa pavimentazione e rivestimenti standard",
  "Fornitura e installazione sanitari: WC, bidet, lavabo, doccia 80x80 escluso box",
];

const esclusioniExtra = [
  "Box doccia",
  "Finiture premium o fuori capitolato standard",
  "Lavorazioni speciali",
  "Criticità emerse in sopralluogo",
];

export default function CalcolatoreBagno({
  comuneDefault = "",
}: CalcolatoreBagnoProps) {
  const [step, setStep] = useState<Step>(1);
  const [mq, setMq] = useState(DEFAULT_MQ);
  const [comune, setComune] = useState(comuneDefault);
  const [nome, setNome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [disponibileAppuntamento, setDisponibileAppuntamento] = useState(false);

  const [isCalculating, setIsCalculating] = useState(false);

  const stima = useMemo(() => {
    let totale = PREZZO_BASE;
    const extraMq = Math.max(0, mq - 4);
    if (extraMq >= 1) totale += Math.min(extraMq, 2) * 450;
    if (extraMq >= 3) totale += (extraMq - 2) * 400;
    return {
      min: totale,
      max: totale,
    };
  }, [mq]);

  const comuneFinale = comune.trim() || comuneDefault || "da definire";

  const canGoStep2 = mq >= MIN_MQ;
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
    setNome("");
    setTelefono("");
    setDisponibileAppuntamento(false);
    setIsCalculating(false);
  };

  const generaLinkWhatsApp = () => {
    const testo = encodeURIComponent(
      `Ciao, sono ${nome}.\n` +
      `Vorrei verificare la compatibilità della ristrutturazione del mio bagno.\n\n` +
      `📐 Superficie: ${mq} mq\n` +
      `📍 Comune: ${comuneFinale}\n` +
      `💶 Preventivo online immediato: ${formatPrezzo(stima.min)}\n` +
      `📞 Telefono: ${telefono}\n` +
      `🤝 Disponibile ad appuntamento in studio/sopralluogo: Sì\n\n` +
      `Se la configurazione è compatibile con il vostro metodo di lavoro, resto disponibile per un appuntamento tecnico.`
    );

    return `https://wa.me/393339809319?text=${testo}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
      <div className="mb-6">
        <div>
          <h3 className="text-xl font-bold text-navy">
            Costi reali e preventivo immediato per il tuo bagno
          </h3>
          <p className="text-sm text-gray-600">
            Preventivo online immediato basato sui dati del tuo intervento
          </p>
        </div>
      </div>

      <div className="mb-5 rounded-xl bg-orange/5 border border-orange/20 p-4">
        <p className="text-sm text-navy leading-relaxed">
          Il preventivo immediato si riferisce a un bagno standard con accesso comodo per carico materiali e smaltimento. Box doccia, finiture premium, lavorazioni speciali e criticità emerse in sopralluogo vengono conteggiati a parte.
        </p>
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
                Superficie bagno:{" "}
                <span className="text-orange font-bold">{mq} mq</span>
              </label>
              <input
                type="range"
                min={MIN_MQ}
                max={MAX_MQ}
                step={1}
                value={mq}
                onChange={(e) => setMq(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{MIN_MQ} mq</span>
                <span>{MAX_MQ} mq</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Il calcolatore è pensato per bagni standard da rifare completamente, in condizioni operative ordinarie.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                Comune
              </label>
              <input
                type="text"
                value={comune}
                onChange={(e) => setComune(e.target.value)}
                placeholder={comuneDefault || "Es. Napoli, Aversa, Caserta"}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!canGoStep2}
              className="w-full bg-navy hover:bg-navy/90 disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Avanti
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
              <strong>Configurazione:</strong> bagno {mq} mq · {comuneFinale}
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                Nome e cognome *
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Es. Mario Rossi"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                Telefono *
              </label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Es. 333 980 9319"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all"
              />
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
                  Se il preventivo è compatibile, sono disponibile a un appuntamento
                </p>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  In studio o con sopralluogo tecnico, per verificare il bagno,
                  le condizioni reali, i dettagli esecutivi e gli eventuali extra.
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
                  Mostra il mio preventivo online immediato
                </>
              )}
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full text-sm text-gray-500 hover:text-navy transition-colors"
            >
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
              <h4 className="text-lg font-semibold text-navy">
                Ecco il tuo preventivo online immediato, {nome}!
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                Bagno {mq} mq · {comuneFinale}
              </p>
            </div>

            <div className="bg-gradient-to-br from-navy to-navy/90 rounded-2xl p-5 text-center">
              <p className="text-white/60 text-xs mb-1">Preventivo online immediato</p>
              <div className="text-3xl md:text-4xl font-bold text-white">
                {formatPrezzo(stima.min)}
              </div>
              <p className="text-white/40 text-xs mt-2">
                Calcolato su rifacimento bagno standard
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-5">
              <h5 className="text-base font-bold text-navy mb-3">
                Cosa comprende il preventivo online immediato
              </h5>
              <ul className="space-y-2">
                {inclusioniStandard.map((item) => (
                  <li key={item} className="text-sm text-gray-700">
                    {item}
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
                  <li key={item} className="text-sm text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange/5 border border-orange/20 rounded-xl p-4">
              <p className="text-sm text-navy leading-relaxed">
                Se questo importo è compatibile con il tuo budget, il passo successivo
                è un appuntamento in studio o un sopralluogo tecnico. Serve a verificare
                il bagno dal vivo e definire un preventivo serio, dettagliato e
                tecnicamente affidabile.
              </p>
            </div>

            <a
              href={generaLinkWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-orange hover:bg-orange/90 text-white py-4 px-6 rounded-xl font-semibold transition-colors text-center"
            >
              Invia richiesta per verifica compatibilità
            </a>

            <button
              onClick={handleReset}
              className="w-full bg-gray-100 hover:bg-gray-200 text-navy py-3 rounded-xl font-medium transition-colors text-sm"
            >
              Calcola nuovo preventivo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
