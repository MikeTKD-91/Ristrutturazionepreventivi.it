import { Metadata } from "next";
import { getDataAggiornamento } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy | Ristrutturazione Preventivi",
  description: "Informativa sulla privacy e sul trattamento dei dati personali di ristrutturazionepreventivi.it",
  alternates: {
    canonical: "https://ristrutturazionepreventivi.it/privacy-policy/",
  },
};

export default function PrivacyPolicyPage() {
  const dataAggiornamento = getDataAggiornamento();

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-navy mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600">
            Ultimo aggiornamento: {dataAggiornamento}
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            1. Titolare del Trattamento
          </h2>
          <p className="text-gray-700">
            Il Titolare del trattamento dei dati personali è Russo FE Costruzione SRL, 
            con sede in Viale della Libertà 3, 81030 Lusciano (CE), P.IVA 04836230617, 
            email: info@ristrutturazionepreventivi.it.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            2. Dati Personali Raccolti
          </h2>
          <p className="text-gray-700">
            Raccogliamo i seguenti tipi di dati personali:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <strong>Dati di contatto:</strong> nome, cognome, indirizzo email, numero di telefono 
              (forniti volontarimente tramite modulo di contatto o WhatsApp)
            </li>
            <li>
              <strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, sistema operativo, 
              pagine visitate, tempo di permanenza (raccolti automaticamente)
            </li>
            <li>
              <strong>Dati relativi alla richiesta:</strong> informazioni sul progetto di ristrutturazione, 
              metratura, tipo di intervento richiesto
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            3. Finalità del Trattamento
          </h2>
          <p className="text-gray-700">
            I dati personali sono trattati per le seguenti finalità:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Rispondere alle richieste di informazioni e preventivi</li>
            <li>Inviare comunicazioni relative ai servizi richiesti</li>
            <li>Gestire il rapporto commerciale con i clienti</li>
            <li>Adempiere agli obblighi di legge</li>
            <li>Migliorare i servizi offerti attraverso l'analisi dei dati di navigazione</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            4. Base Giuridica del Trattamento
          </h2>
          <p className="text-gray-700">
            Il trattamento dei dati personali si basa su:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Consenso dell'interessato (per finalità di marketing)</li>
            <li>Esecuzione di un contratto o di misure precontrattuali</li>
            <li>Adempimento di obblighi legali</li>
            <li>Legittimo interesse del titolare (per dati di navigazione)</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            5. Modalità di Trattamento
          </h2>
          <p className="text-gray-700">
            I dati personali sono trattati con strumenti automatizzati e manuali, 
            secondo logiche strettamente correlate alle finalità indicate. Adottiamo 
            misure tecniche e organizzative adeguate per garantire la sicurezza dei dati 
            e prevenire accessi non autorizzati.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            6. Conservazione dei Dati
          </h2>
          <p className="text-gray-700">
            I dati personali sono conservati per il tempo necessario al raggiungimento 
            delle finalità per cui sono stati raccolti:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Dati di contatto per richieste: 24 mesi dall'ultimo contatto</li>
            <li>Dati relativi a contratti: 10 anni (termine di prescrizione)</li>
            <li>Dati di navigazione: 12 mesi</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            7. Diritti dell'Interessato
          </h2>
          <p className="text-gray-700">
            Ai sensi del GDPR, l'interessato ha diritto di:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Accedere ai propri dati personali</li>
            <li>Richiedere la rettifica dei dati inesatti</li>
            <li>Richiedere la cancellazione dei dati (diritto all'oblio)</li>
            <li>Richiedere la limitazione del trattamento</li>
            <li>Opporsi al trattamento</li>
            <li>Richiedere la portabilità dei dati</li>
            <li>Revocare il consenso in qualsiasi momento</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Per esercitare questi diritti, contattaci all'indirizzo email: 
            info@ristrutturazionepreventivi.it
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            8. Cookie
          </h2>
          <p className="text-gray-700">
            Per informazioni sui cookie utilizzati sul nostro sito, consulta la nostra 
            Cookie Policy.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            9. Modifiche alla Privacy Policy
          </h2>
          <p className="text-gray-700">
            Ci riserviamo il diritto di modificare questa Privacy Policy in qualsiasi momento. 
            Le modifiche saranno pubblicate su questa pagina con la data di aggiornamento.
          </p>

          <h2 className="text-2xl font-bold text-navy mt-8 mb-4">
            10. Contatti
          </h2>
          <p className="text-gray-700">
            Per qualsiasi domanda relativa alla privacy, contattaci:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Email: info@ristrutturazionepreventivi.it</li>
            <li>Indirizzo: Viale della Libertà 3, 81030 Lusciano (CE)</li>
            <li>WhatsApp: 333 980 9319</li>
          </ul>
        </div>
      </div>
    </div>
  );
}