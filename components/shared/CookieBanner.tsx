"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie, Settings } from "lucide-react";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    } else {
      setPreferences(JSON.parse(consent));
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem("cookieConsent", JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const acceptNecessary = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const saveCustom = () => {
    saveConsent(preferences);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-2xl"
        >
          {!showSettings ? (
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Cookie className="h-6 w-6 text-orange flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-navy">Utilizziamo i cookie</h3>
                    <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                      Questo sito utilizza cookie tecnici necessari al funzionamento e cookie 
                      di terze parti per analisi e marketing. Cliccando "Accetta tutti" acconsenti 
                      all'uso di tutti i cookie. Per maggiori informazioni consulta la{" "}
                      <a href="/cookie-policy/" className="text-orange hover:underline">
                        Cookie Policy
                      </a>.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-4 py-2 text-sm font-medium text-navy border border-navy rounded-lg hover:bg-navy/5 transition-colors flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Personalizza
                  </button>
                  <button
                    onClick={acceptNecessary}
                    className="px-4 py-2 text-sm font-medium text-navy border border-navy rounded-lg hover:bg-navy/5 transition-colors"
                  >
                    Rifiuta
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-4 py-2 text-sm font-medium text-white bg-orange rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Accetta tutti
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-navy text-lg">Impostazioni Cookie</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                {/* Necessary */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-navy">Cookie necessari</h4>
                    <p className="text-sm text-gray-600">
                      Essenziali per il funzionamento del sito. Non possono essere disattivati.
                    </p>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-navy cursor-not-allowed">
                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white" />
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-navy">Cookie analitici</h4>
                    <p className="text-sm text-gray-600">
                      Ci aiutano a capire come utilizzi il sito per migliorare l'esperienza.
                    </p>
                  </div>
                  <button
                    onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.analytics ? "bg-orange" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.analytics ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Marketing */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-navy">Cookie di marketing</h4>
                    <p className="text-sm text-gray-600">
                      Utilizzati per mostrarti pubblicità pertinente.
                    </p>
                  </div>
                  <button
                    onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.marketing ? "bg-orange" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.marketing ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-sm font-medium text-navy border border-navy rounded-lg hover:bg-navy/5 transition-colors"
                >
                  Annulla
                </button>
                <button
                  onClick={saveCustom}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Salva preferenze
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}