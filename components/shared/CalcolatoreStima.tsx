"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator, ArrowRight, Check, MessageCircle,
  Clock, Percent, Star, ChevronLeft,
} from "lucide-react";
import { servizi } from "@/data/servizi";
import { calcolaStima, formatPrezzo } from "@/lib/utils";

interface CalcolatoreStimaProps {
  comuneDefault?: string;
}

const parametriServizio: Record<string, {
  min: number; max: number; default: number; step: number; label: string;
  tempistica: string; bonus: string; bonusPerc: number;
}> = {
  "ristrutturazione-appartamento-completo": {
    min: 40, max: 300, default: 80, step: 5, label: "Superficie appartamento",
    tempistica: "30–60 giorni", bonus: "Bonus Ristrutturazioni", bonusPerc: 50,
  },
  "ristrutturazione-cucina": {
    min: 5, max: 40, default: 15, step: 1, label: "Superficie cucina",
    tempistica: "7–14 giorni", bonus: "Bonus Ristrutturazioni", bonusPerc: 50,
  },
  "ristrutturazione-bagno": {
    min: 3, max: 20, default: 8, step: 1, label: "Superficie bagno",
    tempistica: "10–15 giorni", bonus: "Bonus Ristrutturazioni", bonusPerc: 50,
  },
  "rifacimento-tetto": {
    min: 30, max: 500, default: 100, step: 5, label: "Superficie tetto",
    tempistica: "15–25 giorni", bonus: "Bonus Ristrutturazioni", bonusPerc: 50,
  },
  "pavimenti-rivestimenti": {
    min: 10, max: 500, default: 60, step: 5, label: "Superficie da pavimentare",
    tempistica: "5–10 giorni", bonus: "Bonus Ristrutturazioni", bonusPerc: 50,
  },
  "impianti-elettrici-idraulici-termici": {
    min: 30, max: 300, default: 80, step: 5, label: "Superficie abitazione",
    tempistica: "10–20 giorni", bonus: "Bonus Ristrutturazioni", bonusPerc: 50,
  },
  "cappotto-termico": {
    min: 30, max: 500, default: 100, step: 5, label: "Superficie facciata",
    tempistica: "15–25 giorni", bonus: "Ecobonus", bonusPerc: 65,
  },
};

const fallbackParams = {
  min: 20, max: 500, default: 80, step: 5, label: "Metri quadri",
  tempistica: "15–30 giorni", bonus: "Bonus Ristrutturazioni", bonusPerc: 50,
};

const finituraLabels = {
  base:     { label: "Base",     desc: "Materiali standard, finiture essenziali" },
  standard: { label: "Standard", desc: "Buona qualità, finiture complete" },
  premium:  { label: "Premium",  desc: "Materiali di pregio, finiture di lusso" },
};

const STEP_LABELS = ["Configura", "I tuoi dati", "La tua stima"];

export default function CalcolatoreStima({ comuneDefault = "il tuo comune" }: CalcolatoreStimaProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [servizio, setServizio] = useState("");
  const [mq, setMq] = useState(80);
  const [finitura, setFinitura] = useState<"base" | "standard" | "premium">("standard");
  const [nome, setNome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);

  const params = servizio ? (parametriServizio[servizio] ?? fallbackParams) : fallbackParams;
  const risultato = servizio ? calcolaStima(servizio, mq, finitura) : { min: 0, max: 0 };
  const servizioSelezionato = servizi.find((s) => s.slug === servizio);

  const costoConBonus = {
    min: Math.round(risultato.min * (1 - params.bonusPerc / 100)),
    max: Math.round(risultato.max * (1 - params.bonusPerc / 100)),
  };

  const handleServizioChange = (slug: string) => {
    setServizio(slug);
    const p = parametriServizio[slug] ?? fallbackParams;
    setMq(p.default);
  };

  const handleCalculate = () => {
    if (!nome.trim()) return;
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setStep(3);
    }, 1000);
  };

  const handleReset = () => {
    setStep(1);
    setServizio("");
    setMq(80);
    setFinitura("standard");
    setNome("");
    setTelefono("");
  };

  const generaLinkWA = () => {
    const testo = encodeURIComponent(
      `Ciao, sono ${nome} e vorrei una stima per ${servizioSelezionato?.titolo?.toLowerCase() ?? "ristrutturazione"}.\n` +
      `📐 Superficie: ${mq} mq\n` +
      `📍 Comune: ${comuneDefault}\n` +
      `✨ Finitura: ${finituraLabels[finitura].label}\n` +
      `💶 Stima: ${formatPrezzo(risultato.min)} – ${formatPrezzo(risultato.max)}\n` +
      (telefono ? `📞 Telefono: ${telefono}\n` : "") +
      `\nPotete contattarmi per un preventivo dettagliato?`
    );
    return `https://wa.me/393339809319?text=${testo}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-xl bg-orange/10 flex items-center justify-center">
          <Calculator className="h-6 w-6 text-orange" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-navy">Calcola la tua stima</h3>
          <p className="text-sm text-gray-600">Stima indicativa immediata e gratuita</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {STEP_LABELS.map((label, i) => (
            <span
              key={i}
              className={`text-xs font-medium transition-colors ${
                step > i + 1 ? "text-orange" : step === i + 1 ? "text-navy" : "text-gray-400"
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
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">

        {/* ── STEP 1 ── Configurazione */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-navy mb-2">Tipo di lavoro *</label>
              <select
                value={servizio}
                onChange={(e) => handleServizioChange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all"
              >
                <option value="">Seleziona il servizio</option>
                {servizi.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.titolo}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                {params.label}: <span className="text-orange font-bold">{mq} mq</span>
              </label>
              <input
                type="range"
                min={params.min}
                max={params.max}
                step={params.step}
                value={mq}
                onChange={(e) => setMq(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{params.min} mq</span>
                <span>{params.max} mq</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-navy mb-3">Livello di finitura</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.keys(finituraLabels) as Array<"base" | "standard" | "premium">).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFinitura(f)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      finitura === f ? "border-orange bg-orange/5" : "border-gray-200 hover:border-orange/30"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${finitura === f ? "border-orange" : "border-gray-300"}`}>
                        {finitura === f && <div className="w-2 h-2 rounded-full bg-orange" />}
                      </div>
                      <span className="font-semibold text-navy capitalize">{finituraLabels[f].label}</span>
                    </div>
                    <p className="text-xs text-gray-500">{finituraLabels[f].desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!servizio}
              className="w-full bg-navy hover:bg-navy/90 disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Avanti
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}

        {/* ── STEP 2 ── Dati contatto */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            {/* Riepilogo step 1 */}
            <div className="bg-orange/5 border border-orange/20 rounded-xl p-4 text-sm text-navy">
              📋 <strong>{servizioSelezionato?.titolo}</strong> · {mq} mq · Finitura {finituraLabels[finitura].label}
            </div>

            <p className="text-sm text-gray-600">
              A chi inviamo la stima?{" "}
              <span className="text-gray-400">I dati sono usati solo per il preventivo.</span>
            </p>

            <div>
              <label className="block text-sm font-medium text-navy mb-2">Nome *</label>
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
                Telefono{" "}
                <span className="text-gray-400 font-normal">(opzionale)</span>
              </label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Es. 333 980 9319"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange focus:ring-2 focus:ring-orange/20 outline-none transition-all"
              />
            </div>

            <button
              onClick={handleCalculate}
              disabled={!nome.trim() || isCalculating}
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

        {/* ── STEP 3 ── Risultato */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-3">
                <Check className="h-7 w-7 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-navy">
                Ecco la tua stima, {nome}!
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                {servizioSelezionato?.titolo} · {mq} mq · {finituraLabels[finitura].label}
              </p>
            </div>

            {/* Range prezzo */}
            <div className="bg-gradient-to-br from-navy to-navy/90 rounded-2xl p-5 text-center">
              <p className="text-white/60 text-xs mb-1">Stima indicativa</p>
              <div className="text-3xl md:text-4xl font-bold text-white">
                {formatPrezzo(risultato.min)} – {formatPrezzo(risultato.max)}
              </div>
              <p className="text-white/40 text-xs mt-2">
                Basata sul Prezzario Regionale Campania
              </p>
            </div>

            {/* Bonus + Tempistica */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <Percent className="h-4 w-4 text-green-600" />
                  <span className="text-xs font-semibold text-green-700">
                    {params.bonus} {params.bonusPerc}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-1">Costo effettivo stimato</p>
                <p className="text-sm font-bold text-green-700">
                  {formatPrezzo(costoConBonus.min)} – {formatPrezzo(costoConBonus.max)}
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-xs font-semibold text-blue-700">Tempistica</span>
                </div>
                <p className="text-xs text-gray-500 mb-1">Durata stimata lavori</p>
                <p className="text-sm font-bold text-blue-700">{params.tempistica}</p>
              </div>
            </div>

            {/* Prova sociale realistica */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
              <div className="flex -space-x-2 shrink-0">
                {["M", "L", "A"].map((l, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-navy text-white text-xs flex items-center justify-center border-2 border-white font-semibold"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-orange text-orange" />
                  ))}
                </div>
                <p className="text-xs text-gray-600">
                  <span className="font-semibold text-navy">3 cantieri completati</span> questo mese in zona
                </p>
              </div>
            </div>

            {/* CTA WhatsApp */}
            <a
              href={generaLinkWA()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-orange hover:bg-orange/90 text-white py-4 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center gap-3"
            >
              <MessageCircle className="h-5 w-5 shrink-0" />
              Richiedi preventivo dettagliato
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
