"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowRight, Check, MessageCircle } from "lucide-react";
import { servizi } from "@/data/servizi";
import { calcolaStima, formatPrezzo, generaLinkWhatsApp } from "@/lib/utils";

interface CalcolatoreStimaProps {
  comuneDefault?: string;
}

export default function CalcolatoreStima({ comuneDefault = "il tuo comune" }: CalcolatoreStimaProps) {
  const [servizio, setServizio] = useState<string>("");
  const [mq, setMq] = useState<number>(80);
  const [finitura, setFinitura] = useState<"base" | "standard" | "premium">("standard");
  const [showResult, setShowResult] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    if (!servizio) return;
    setIsCalculating(true);
    setTimeout(() => {
      setShowResult(true);
      setIsCalculating(false);
    }, 800);
  };

  const handleReset = () => {
    setShowResult(false);
    setServizio("");
    setMq(80);
    setFinitura("standard");
  };

  const risultato = servizio ? calcolaStima(servizio, mq, finitura) : { min: 0, max: 0 };
  const servizioSelezionato = servizi.find(s => s.slug === servizio);

  const finituraLabels = {
    base: { label: "Base", desc: "Materiali standard, finiture essenziali" },
    standard: { label: "Standard", desc: "Buona qualità, finiture complete" },
    premium: { label: "Premium", desc: "Materiali di pregio, finiture di lusso" },
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-xl bg-orange/10 flex items-center justify-center">
          <Calculator className="h-6 w-6 text-orange" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-navy">Calcola la tua stima</h3>
          <p className="text-sm text-gray-600">Stima indicativa immediata e gratuita</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Servizio */}
            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                Tipo di lavoro *
              </label>
              <select
                value={servizio}
                onChange={(e) => setServizio(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all"
              >
                <option value="">Seleziona il servizio</option>
                {servizi.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.titolo}
                  </option>
                ))}
              </select>
            </div>

            {/* Metri quadri */}
            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                Metri quadri: <span className="text-orange font-bold">{mq} mq</span>
              </label>
              <input
                type="range"
                min="20"
                max="500"
                step="5"
                value={mq}
                onChange={(e) => setMq(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>20 mq</span>
                <span>500 mq</span>
              </div>
            </div>

            {/* Livello finitura */}
            <div>
              <label className="block text-sm font-medium text-navy mb-3">
                Livello di finitura
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.keys(finituraLabels) as Array<"base" | "standard" | "premium">).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFinitura(f)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      finitura === f
                        ? "border-orange bg-orange/5"
                        : "border-gray-200 hover:border-orange/30"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          finitura === f ? "border-orange" : "border-gray-300"
                        }`}
                      >
                        {finitura === f && <div className="w-2 h-2 rounded-full bg-orange" />}
                      </div>
                      <span className="font-semibold text-navy capitalize">{finituraLabels[f].label}</span>
                    </div>
                    <p className="text-xs text-gray-500">{finituraLabels[f].desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleCalculate}
              disabled={!servizio || isCalculating}
              className="w-full bg-navy hover:bg-navy/90 disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {isCalculating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Calcolo in corso...
                </>
              ) : (
                <>
                  Calcola stima gratuita
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-navy mb-1">
                Stima indicativa immediata e gratuita
              </h4>
              <p className="text-gray-600">
                {servizioSelezionato?.titolo} - {mq} mq - Finitura {finituraLabels[finitura].label}
              </p>
            </div>

            <div className="bg-gradient-to-br from-navy to-navy/90 rounded-2xl p-6 mb-6">
              <p className="text-white/70 text-sm mb-2">Range di prezzo stimato</p>
              <div className="text-3xl md:text-4xl font-bold text-white">
                {formatPrezzo(risultato.min)} - {formatPrezzo(risultato.max)}
              </div>
              <p className="text-white/50 text-xs mt-2">
                I prezzi sono indicativi e possono variare in base alle specifiche del progetto
              </p>
            </div>

            <div className="space-y-3">
              <a
                href={generaLinkWhatsApp(
                  servizioSelezionato?.titolo || "",
                  mq,
                  comuneDefault,
                  `${formatPrezzo(risultato.min)} - ${formatPrezzo(risultato.max)}`,
                  finituraLabels[finitura].label
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-orange hover:bg-orange-600 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Richiedi preventivo via WhatsApp
              </a>
              <button
                onClick={handleReset}
                className="w-full bg-gray-100 hover:bg-gray-200 text-navy py-3 rounded-xl font-medium transition-colors"
              >
                Calcola nuova stima
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}