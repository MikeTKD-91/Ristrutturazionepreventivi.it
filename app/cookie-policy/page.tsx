import { Metadata } from "next";
import { getDataAggiornamento } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cookie Policy | Ristrutturazione Preventivi",
  description: "Informativa sui cookie utilizzati da ristrutturazionepreventivi.it",
  alternates: {
    canonical: "https://ristrutturazionepreventivi.it/cookie-policy/",
  },
};

export default function CookiePolicyPage() {
  const dataAggiornamento = getDataAggiornamento();

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-navy mb-8">Cookie Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600">
            Ultimo aggiornamento: {dataAggiornamento}
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            1. Cosa sono i Cookie
          </h2>
          <p className="text-gray-700">
            I cookie sono piccoli file di testo che i siti web visitati dall'utente 
            inviano al suo terminale (computer, tablet, smartphone) dove vengono 
            memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva. 
            I cookie sono utilizzati per diverse finalità: esecuzione di autenticazioni 
            informatiche, monitoraggio di sessioni, memorizzazione di informazioni su 
            specifiche configurazioni riguardanti gli utenti che accedono al server.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            2. Tipologie di Cookie Utilizzati
          </h2>
          
          <h3 className="text-xl font-semibold text-navy mt-6 mb-3">
            2.1 Cookie Tecnici (Necessari)
          </h3>
          <p className="text-gray-700">
            I cookie tecnici sono essenziali per il corretto funzionamento del sito. 
            Senza questi cookie, il sito non funzionerebbe correttamente. Questi cookie 
            non raccolgono informazioni personali.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Cookie di sessione: gestiscono la sessione utente</li>
            <li>Cookie di preferenze: memorizzano le preferenze dell'utente</li>
            <li>Cookie di sicurezza: garantiscono la sicurezza della navigazione</li>
          </ul>

          <h3 className="text-xl font-semibold text-navy mt-6 mb-3">
            2.2 Cookie Analitici
          </h3>
          <p className="text-gray-700">
            I cookie analitici ci aiutano a capire come i visitatori interagiscono con 
            il sito web, raccogliendo informazioni in forma anonima. Questi dati ci 
            permettono di migliorare l'esperienza utente.
          </p>

          <h3 className="text-xl font-semibold text-navy mt-6 mb-3">
            2.3 Cookie di Marketing
          </h3>
          <p className="text-gray-700">
            I cookie di marketing vengono utilizzati per tracciare i visitatori attraverso 
            i siti web. Lo scopo è quello di visualizzare annunci pubblicitari pertinenti 
            e coinvolgenti per il singolo utente.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            3. Cookie Specifici Utilizzati
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="p-3 text-left">Cookie</th>
                  <th className="p-3 text-left">Tipologia</th>
                  <th className="p-3 text-left">Durata</th>
                  <th className="p-3 text-left">Finalità</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="p-3 border-b">cookieConsent</td>
                  <td className="p-3 border-b">Tecnico</td>
                  <td className="p-3 border-b">1 anno</td>
                  <td className="p-3 border-b">Memorizza le preferenze sui cookie</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 border-b">_ga</td>
                  <td className="p-3 border-b">Analitico</td>
                  <td className="p-3 border-b">2 anni</td>
                  <td className="p-3 border-b">Google Analytics - Distinguere gli utenti</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 border-b">_gid</td>
                  <td className="p-3 border-b">Analitico</td>
                  <td className="p-3 border-b">24 ore</td>
                  <td className="p-3 border-b">Google Analytics - Distinguere gli utenti</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-3 border-b">_gat</td>
                  <td className="p-3 border-b">Analitico</td>
                  <td className="p-3 border-b">1 minuto</td>
                  <td className="p-3 border-b">Google Analytics - Limitare la frequenza delle richieste</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            4. Gestione dei Cookie
          </h2>
          <p className="text-gray-700">
            All'accesso al sito, viene visualizzato un banner che permette di gestire 
            le preferenze sui cookie. È possibile:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <strong>Accettare tutti i cookie:</strong> consentire l'uso di tutte le tipologie di cookie
            </li>
            <li>
              <strong>Rifiutare i cookie opzionali:</strong> consentire solo i cookie tecnici necessari
            </li>
            <li>
              <strong>Personalizzare:</strong> scegliere quali categorie di cookie accettare
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            5. Come Disabilitare i Cookie dal Browser
          </h2>
          <p className="text-gray-700">
            È possibile gestire le preferenze sui cookie direttamente dal proprio browser. 
            Ecco i link alle istruzioni per i principali browser:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                Google Chrome
              </a>
            </li>
            <li>
              <a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                Safari
              </a>
            </li>
            <li>
              <a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-orange hover:underline">
                Microsoft Edge
              </a>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            6. Modifiche alla Cookie Policy
          </h2>
          <p className="text-gray-700">
            Ci riserviamo il diritto di modificare questa Cookie Policy in qualsiasi momento. 
            Le modifiche saranno pubblicate su questa pagina con la data di aggiornamento. 
            Ti invitiamo a consultare periodicamente questa pagina per essere sempre informato 
            sulle nostre politiche relative ai cookie.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            7. Contatti
          </h2>
          <p className="text-gray-700">
            Per qualsiasi domanda relativa alla nostra Cookie Policy, contattaci:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Email: info@ristrutturazionepreventivi.it</li>
            <li>Indirizzo: Viale della Libertà 3, 81030 Lusciano (CE)</li>
            <li>WhatsApp: 333 980 9319</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            8. Revoca del Consenso
          </h2>
          <p className="text-gray-700">
            Puoi revocare il tuo consenso all'uso dei cookie in qualsiasi momento cliccando 
            sul link "Impostazioni Cookie" nel footer del sito.
          </p>
        </div>
      </div>
    </div>
  );
}