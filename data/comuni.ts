// data/comuni.ts
// Ultimo aggiornamento: marzo 2025
// ⚠️ LEGENDA SEGNALAZIONI:
//   [REALE]    = dato confermato / fornito direttamente
//   [IPOTESI]  = generato su base urbanistica/storica, da verificare
//   [VERIFICA] = campo che richiede conferma prima di andare in produzione

export interface ComuneFaq {
  domanda: string;
  risposta: string;
}

export interface Comune {
  // — Identificazione —
  slug: string;
  nome: string;
  provincia: "napoli" | "caserta";
  zona: "napoli" | "caserta" | "agro-aversano";

  // — SEO (niente anno nel title, niente promesse commerciali) —
  metaTitle: string;         // max 60 caratteri
  metaDescription: string;   // max 155 caratteri

  // — Contenuto geografico —
  descrizione: string;       // 2-3 righe, unico per comune

  // — Patrimonio edilizio —
  tipoEdilizio: string;      // es. "Villette anni '80, palazzine anni '60-'70 in centro"
  criticalita: string[];     // problemi reali e ricorrenti in quel contesto edilizio

  // — Per pagine servizio×comune —
  caratteristicheBagni: string;    // tipologia bagni prevalente
  caratteristicheCucine: string;   // tipologia cucine prevalente

  // — FAQ dinamiche (3-4 per comune) —
  faq: ComuneFaq[];

  // — Internal linking —
  vicini: string[];

  // — Immagine (opzionale: da sostituire con foto reali) —
  immagine?: string;
}

// ─────────────────────────────────────────────
// ZONA: AGRO AVERSANO (14 comuni)
// Dati edilizi: pattern confermato [REALE]
// Pattern generale zona:
//   - Periferia/espansione: villette e case a schiera anni '80-'00
//   - Centro storico: palazzi anni '50-'70
//   - Criticità trasversali: canne fumarie in amianto (palazzi vecchi),
//     abusi edilizi da regolarizzare, bagni standard mono-sanitari anni '80-'90
// ─────────────────────────────────────────────

export const comuniAgroAversano: Comune[] = [
  {
    slug: "aversa",
    nome: "Aversa",
    provincia: "caserta",
    zona: "agro-aversano",

    // [REALE] Centro storico medievale con vincoli Soprintendenza
    metaTitle: "Ristrutturazione Casa ad Aversa | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a domicilio ad Aversa: costi orientativi, criticità del centro storico e delle palazzine anni '60-'70. Stima gratuita senza impegno.",

    descrizione:
      "Aversa è il comune più popoloso dell'Agro Aversano, con un centro storico di origine normanna sottoposto a vincoli della Soprintendenza e un'ampia corona di espansione residenziale sviluppata tra gli anni '70 e i primi anni 2000. Questa doppia natura rende ogni intervento edilizio potenzialmente soggetto a iter autorizzativi differenti a seconda della zona.",

    // [REALE] Confermato: centro storico + espansione nuova
    tipoEdilizio:
      "Palazzi storici anni '50-'70 nel centro (alcuni con vincolo Soprintendenza), villette unifamiliari e case a schiera nelle zone di espansione anni '80-'00",

    // [REALE] Amianto e abusi confermati; vincoli centro storico specifici di Aversa
    criticalita: [
      "Canne fumarie in amianto negli edifici condominiali anni '60-'70: rimozione obbligatoria prima di qualsiasi intervento su cucine e bagni",
      "Abusi edilizi non condonati frequenti nelle zone di espansione: necessaria verifica catastale prima del sopralluogo",
      "Centro storico soggetto a vincolo paesaggistico e monumentale: alcune lavorazioni richiedono autorizzazione preventiva della Soprintendenza",
      "Umidità di risalita diffusa nei piani terra e seminterrati dei palazzi storici, spesso mascherata da interventi superficiali precedenti",
    ],

    // [REALE] Bagni standard anni '80-'90, tipici della zona
    caratteristicheBagni:
      "Bagni prevalentemente sotto i 6 mq con vasca da bagno degli anni '80-'90, spesso già oggetto di un primo rifacimento parziale non a norma. Nelle abitazioni del centro storico, impianti idrici in piombo ancora presenti nei condomini più vecchi.",

    // [IPOTESI - da verificare] Cucine tipiche zona
    caratteristicheCucine:
      "Cucine separate dal soggiorno, dimensioni medie 10-14 mq. Nelle palazzine anni '70, frequente presenza di cappa esterna non a norma collegata a canna fumaria in amianto.",

    faq: [
      {
        domanda:
          "Devo chiedere permessi per ristrutturare il bagno in un palazzo del centro storico di Aversa?",
        risposta:
          "Dipende dall'intervento. La sostituzione di sanitari e rivestimenti interni (manutenzione ordinaria) non richiede permessi. Se l'intervento tocca impianti, strutture o modifica la distribuzione degli spazi interni, serve almeno una CILA. In zona vincolata dalla Soprintendenza, qualsiasi intervento esterno o che modifichi l'aspetto dell'edificio richiede autorizzazione specifica. Il nostro tecnico verifica la situazione urbanistica prima del preventivo.",
      },
      {
        domanda:
          "Nel mio palazzo c'è ancora la canna fumaria in amianto. Cosa succede se rifaccio la cucina?",
        risposta:
          "Se la canna fumaria è in amianto, prima di installare una nuova cappa è obbligatorio procedere alla bonifica o all'incapsulamento, da eseguire da una ditta specializzata certificata. Il costo di bonifica va considerato nel preventivo complessivo. Non è possibile aggirare questo passaggio: le ditte serie non agganciano nuovi impianti a canne in amianto non bonificate.",
      },
      {
        domanda:
          "Ho un abuso edilizio non condonato. Posso ristrutturare lo stesso?",
        risposta:
          "Tecnicamente sì, se l'abuso riguarda parti diverse da quelle da ristrutturare. Nella pratica, prima di qualsiasi intervento soggetto a CILA o permesso di costruire, il Comune verifica la regolarità urbanistica dell'immobile. Un abuso pendente può bloccare l'iter. È consigliabile un confronto con un tecnico prima di procedere.",
      },
      {
        domanda: "Quanto tempo richiede la ristrutturazione di un bagno ad Aversa?",
        risposta:
          "Un bagno standard (4-6 mq) con sostituzione completa di sanitari, rivestimenti e impianti richiede mediamente 2-3 settimane lavorative. Se si aggiunge la bonifica dell'amianto o modifiche agli impianti condominiali, i tempi si allungano. I tempi definitivi emergono dal sopralluogo.",
      },
    ],

    vicini: ["lusciano", "carinaro", "teverola", "trentola-ducenta", "succivo"],
  },

  {
    slug: "lusciano",
    nome: "Lusciano",
    provincia: "caserta",
    zona: "agro-aversano",

    // [REALE] Sede dell'azienda — dati edilizi confermati
    metaTitle: "Ristrutturazione Casa a Lusciano | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Lusciano: interventi su villette anni '80-'90, PEEP comunali e palazzine. Stima gratuita, preventivo con sopralluogo.",

    descrizione:
      "Lusciano è un comune a prevalente carattere residenziale, sviluppatosi principalmente tra gli anni '80 e i primi anni 2000 con un mix di villette unifamiliari, case a schiera e alcuni piani di edilizia economica popolare (PEEP). Il centro più antico conserva un nucleo di palazzi anni '50-'60, mentre la periferia è quasi interamente composta da edilizia privata recente.",

    // [REALE] Villette anni '80-'90, PEEP, palazzi vecchi al centro
    tipoEdilizio:
      "Villette unifamiliari e case a schiera anni '80-'00 nella zona di espansione; PEEP comunali anni '80 in alcune aree; palazzi anni '50-'60 nel nucleo centrale",

    // [REALE] Pattern zona confermato; umidità risalita tipica villette anni '80
    criticalita: [
      "Umidità di risalita diffusa nelle villette anni '80: fondazioni senza barriera impermeabilizzante, frequente nei piani terra e nei locali interrati",
      "Abusi edilizi nelle zone di espansione privata degli anni '90: verande, locali seminterrati, soppalchi spesso non condonati",
      "Impianti idrici in acciaio zincato nelle abitazioni degli anni '70-'80: corrosione interna che riduce portata e qualità dell'acqua",
      "Canne fumarie in amianto nei condomini più vecchi del centro: rilevamento obbligatorio prima di interventi su cucine",
    ],

    caratteristicheBagni:
      "Bagni di dimensioni standard (5-7 mq) nelle villette, spesso con vasca da incasso degli anni '80-'90 mai sostituita. Nei PEEP, bagni mono-sanitari sotto i 5 mq con impianti originali da aggiornare.",

    // [IPOTESI]
    caratteristicheCucine:
      "Cucine in muratura degli anni '80-'90 con piastrelle a decoro tipiche del periodo. Nelle villette, frequente assenza di cappa a norma o collegamento a canna fumaria non certificata.",

    faq: [
      {
        domanda:
          "Ho una villetta degli anni '90 a Lusciano con umidità al piano terra. Prima di ristrutturare, cosa devo fare?",
        risposta:
          "L'umidità di risalita nelle villette anni '90 dell'Agro Aversano è molto comune e va trattata prima di qualsiasi rifinitura. Il nostro sopralluogo include sempre la verifica delle cause (risalita capillare, infiltrazioni da fondazione, condensa). Il trattamento corretto dipende dall'origine: non esiste una soluzione unica. Fare le rifiniture prima di risolvere l'umidità significa rifare tutto a distanza di 2-3 anni.",
      },
      {
        domanda:
          "Posso usare il Bonus Ristrutturazione 50% per il rifacimento del bagno nella mia villetta a Lusciano?",
        risposta:
          "Sì, la detrazione IRPEF al 50% (fino a 96.000 € di spesa) si applica agli interventi di manutenzione straordinaria sugli immobili residenziali, incluso il rifacimento completo del bagno con sostituzione di impianti. Sono necessari: pagamenti tracciati (bonifico parlante), fatture in regola, e per alcuni interventi una CILA. Il nostro ufficio amministrativo supporta la gestione della pratica.",
      },
      {
        domanda:
          "Quanto costa rifare completamente un bagno in un PEEP di Lusciano?",
        risposta:
          "Un bagno in un appartamento PEEP è tipicamente sotto i 5 mq, il che lo rende uno degli interventi più intensivi in termini di costo per metro quadro (lavorazione elevata in spazio ridotto). In base al Prezzario Regionale Campania, le stime orientative partono da circa 4.500-5.500 € per una finitura base, fino a 7.000-9.000 € per una finitura premium con impianti completamente rinnovati. I valori precisi emergono dal sopralluogo.",
      },
      {
        domanda: "Quanto tempo ci vuole per ristrutturare un bagno a Lusciano?",
        risposta:
          "Per un bagno standard (5-6 mq) con sostituzione completa di sanitari, rivestimenti e impianti, mediamente 2-3 settimane lavorative. Se si aggiungono lavori strutturali o la bonifica di impianti obsoleti, i tempi si allungano. Il cantiere viene organizzato per ridurre i giorni senza bagno funzionante.",
      },
    ],

    vicini: ["aversa", "carinaro", "teverola", "gricignano-di-aversa"],
  },

  {
    slug: "carinaro",
    nome: "Carinaro",
    provincia: "caserta",
    zona: "agro-aversano",

    metaTitle: "Ristrutturazione Casa a Carinaro | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Carinaro: costi orientativi per villette e palazzine. Criticità locali, stima gratuita e preventivo con sopralluogo.",

    // [IPOTESI] Piccolo comune residenziale, pattern Agro Aversano
    descrizione:
      "Carinaro è un piccolo comune residenziale dell'Agro Aversano, con un tessuto edilizio composto prevalentemente da villette unifamiliari e case a schiera edificate tra gli anni '80 e i primi anni 2000. Il centro storico è contenuto, con alcune palazzine degli anni '60-'70.",

    tipoEdilizio:
      "Prevalenza di villette anni '80-'00 e case a schiera; nucleo centrale con palazzine anni '60-'70",

    criticalita: [
      "Umidità di risalita nei piani terra delle villette anni '80, comune in tutta la zona",
      "Abusi edilizi non condonati nelle espansioni private degli anni '90",
      "Impianti idrici vetusti nelle palazzine del centro anni '60-'70",
      // [IPOTESI]
      "Coperture con guaine bituminose di prima generazione, spesso non più impermeabili nelle abitazioni con più di 25 anni",
    ],

    caratteristicheBagni:
      "Bagni standard 5-7 mq con sanitari e rivestimenti degli anni '80-'90. Nelle case a schiera più recenti, bagni già oggetto di primo rifacimento parziale non a norma.", // [IPOTESI parziale]

    caratteristicheCucine:
      "Cucine separate dal soggiorno, dimensioni medie. Frequente presenza di cucine in muratura degli anni '90 da demolire e ricostruire.", // [IPOTESI]

    faq: [
      {
        domanda: "Quali permessi servono per ristrutturare un bagno a Carinaro?",
        risposta:
          "Per la sostituzione di sanitari e rivestimenti senza modificare la distribuzione degli spazi, nessun permesso (manutenzione ordinaria). Se si spostano impianti o si modificano le tramezzature, serve una CILA da presentare al Comune di Carinaro prima dell'inizio lavori. Il nostro tecnico valuta la situazione specifica al sopralluogo.",
      },
      {
        domanda:
          "Ho una villetta anni '90 a Carinaro. Come capisco se c'è amianto prima di ristrutturare?",
        risposta:
          "L'amianto nelle villette degli anni '90 è meno comune rispetto ai condomini degli anni '60-'70, ma può essere presente in canne fumarie, lastre di copertura (eternit) o guaine di isolamento. Un'ispezione visiva da parte di un tecnico esperto è il primo passo. In caso di dubbio, è possibile richiedere un'analisi campione certificata prima dell'inizio lavori.",
      },
      {
        domanda: "Quanto costa ristrutturare un bagno a Carinaro?",
        risposta:
          "In base al Prezzario Regionale Campania, per un bagno di 5-6 mq con rifacimento completo di impianti, rivestimenti e sanitari, le stime orientative vanno da circa 5.000 € (finitura base) a 9.000-10.000 € (finitura premium). Il costo preciso dipende dallo stato attuale, dai materiali scelti e da eventuali criticità emerse al sopralluogo.",
      },
    ],

    vicini: ["aversa", "lusciano", "teverola", "gricignano-di-aversa"],
  },

  {
    slug: "teverola",
    nome: "Teverola",
    provincia: "caserta",
    zona: "agro-aversano",

    metaTitle: "Ristrutturazione Casa a Teverola | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Teverola: interventi su villette e palazzine, costi orientativi da Prezzario Campania. Stima gratuita senza impegno.",

    // [IPOTESI] Comune misto residenziale/produttivo
    descrizione:
      "Teverola è un comune con vocazione mista residenziale e produttiva, situato lungo la SS7bis. Il tessuto abitativo è composto da villette e palazzine di diverse epoche, con una parte centrale più densa e zone periferiche a edilizia sparsa.",

    tipoEdilizio:
      "Mix di villette anni '80-'00 e palazzine anni '70; presenza di edilizia residenziale lungo le arterie principali",

    criticalita: [
      "Vibrazioni da traffico pesante sulla SS7bis: crepe e lesioni nei muri perimetrali nelle abitazioni prossime alla strada", // [IPOTESI localizzata]
      "Umidità di risalita e infiltrazioni nei piani terra",
      "Abusi edilizi da regolarizzare frequenti nelle zone di espansione",
      "Canne fumarie in amianto nei condomini degli anni '70",
    ],

    caratteristicheBagni:
      "Bagni standard con sanitari anni '80-'90, spesso con vasca da bagno. Nelle palazzine più vecchie, impianti idrici da sostituire integralmente.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine separate, medie dimensioni. Nelle abitazioni lungo le strade principali, frequente necessità di miglioramento dell'isolamento acustico durante i lavori.", // [IPOTESI]

    faq: [
      {
        domanda:
          "Ho delle crepe nei muri di casa a Teverola. Devo preoccuparmi prima di ristrutturare?",
        risposta:
          "Le crepe vanno sempre valutate prima di qualsiasi lavoro di rifinitura. Le lesioni superficiali (fessure nei rivestimenti, stacco di intonaco) sono spesso legate a assestamenti normali o escursioni termiche. Le crepe passanti nei muri portanti o in diagonale agli angoli delle aperture richiedono invece una valutazione strutturale. Procedere con le rifiniture senza risolvere le cause è un errore che comporta rifacimenti a distanza di pochi anni.",
      },
      {
        domanda: "Posso usare il Bonus 50% per ristrutturare il bagno a Teverola?",
        risposta:
          "Sì, la detrazione IRPEF al 50% si applica agli interventi di manutenzione straordinaria su immobili residenziali, compreso il rifacimento completo del bagno. Sono necessari pagamenti con bonifico parlante e fatture in regola. Per interventi che richiedono CILA, va presentata prima dell'inizio lavori.",
      },
      {
        domanda: "Quanto costa ristrutturare un bagno a Teverola?",
        risposta:
          "Le stime orientative basate sul Prezzario Regionale Campania per un bagno di 5-6 mq vanno da circa 5.000 € per finitura base a 9.500 € per finitura premium con impianti nuovi. Il dato preciso emerge solo dal sopralluogo, che permette di rilevare criticità nascoste come impianti obsoleti o umidità.",
      },
    ],

    vicini: ["aversa", "carinaro", "lusciano", "gricignano-di-aversa"],
  },

  {
    slug: "gricignano-di-aversa",
    nome: "Gricignano di Aversa",
    provincia: "caserta",
    zona: "agro-aversano",

    metaTitle: "Ristrutturazione Casa a Gricignano di Aversa | Preventivi",
    metaDescription:
      "Ristrutturazione a Gricignano di Aversa: costi orientativi per villette e case a schiera. Stima gratuita, sopralluogo senza impegno.",

    // [IPOTESI] Comune residenziale puro, vicino base NATO
    descrizione:
      "Gricignano di Aversa è un comune a forte carattere residenziale, noto anche per la vicinanza alla base NATO di supporto. Il tessuto edilizio è composto prevalentemente da villette unifamiliari e case a schiera, con un nucleo storico contenuto.",

    tipoEdilizio:
      "Prevalenza di villette unifamiliari e case a schiera anni '80-'00; centro storico con palazzine anni '60",

    criticalita: [
      "Umidità di risalita nei piani terra delle villette, specialmente nelle edificazioni su suolo argilloso", // [IPOTESI parziale]
      "Abusi edilizi nelle espansioni private degli anni '90-'00",
      "Impianti idrici in acciaio zincato nelle abitazioni più datate",
      "Coperture piane non a norma nelle ville degli anni '80: guaine esaurite e infiltrazioni",
    ],

    caratteristicheBagni:
      "Bagni con sanitari degli anni '80-'90, dimensioni standard. Nelle villette più recenti (anni 2000), bagni più grandi ma spesso con rivestimenti da aggiornare.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine di medie dimensioni, spesso separate. Nelle villette anni '90 presenza frequente di penisola o cucina semi-aperta da rivedere.", // [IPOTESI]

    faq: [
      {
        domanda:
          "Quanto costa ristrutturare un bagno a Gricignano di Aversa?",
        risposta:
          "Per un bagno standard di 5-6 mq, le stime orientative basate sul Prezzario Regionale Campania vanno da circa 5.000 € (finitura base) a 9.500 € (finitura premium). Se la villetta presenta problemi di umidità o impianti da sostituire integralmente, il costo aumenta. I valori precisi emergono dal sopralluogo gratuito.",
      },
      {
        domanda:
          "Ho comprato una villetta anni '90 a Gricignano. Cosa verifico prima di ristrutturare?",
        risposta:
          "Oltre alla verifica urbanistica (assenza di abusi), è consigliabile controllare: stato degli impianti idrici ed elettrici (spesso dimensionati per consumi anni '90, oggi insufficienti), condizione della copertura e impermeabilizzazione, presenza di umidità nei muri perimetrali. Il nostro sopralluogo include una valutazione tecnica complessiva prima di qualsiasi preventivo.",
      },
    ],

    vicini: ["aversa", "carinaro", "teverola", "lusciano"],
  },

  {
    slug: "trentola-ducenta",
    nome: "Trentola Ducenta",
    provincia: "caserta",
    zona: "agro-aversano",

    metaTitle: "Ristrutturazione Casa a Trentola Ducenta | Preventivi",
    metaDescription:
      "Ristrutturazione a Trentola Ducenta: costi orientativi, criticità edilizie locali e stima gratuita. Preventivo con sopralluogo.",

    // [IPOTESI] Due centri fusi (Trentola + Ducenta) — comune medio
    descrizione:
      "Trentola Ducenta è un comune nato dalla fusione di due centri abitati, con un tessuto edilizio eterogeneo che comprende sia il nucleo storico che ampie zone di espansione residenziale sviluppate tra gli anni '70 e i primi anni 2000.",

    tipoEdilizio:
      "Mix di palazzine anni '60-'70 nei centri storici di Trentola e Ducenta, villette e case a schiera anni '80-'00 nelle zone di espansione",

    criticalita: [
      "Doppio nucleo storico: ogni intervento va verificato rispetto al PRG specifico della zona (Trentola o Ducenta)", // [IPOTESI]
      "Umidità di risalita frequente nelle abitazioni dei nuclei storici più vecchi",
      "Canne fumarie in amianto nei condomini anni '60-'70",
      "Abusi edilizi non condonati nelle espansioni private",
    ],

    caratteristicheBagni:
      "Bagni di dimensioni variabili: più piccoli (sotto 5 mq) nelle palazzine storiche, standard (5-7 mq) nelle villette. Frequente presenza di vasche anni '80 da sostituire.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine separate con dimensioni medie. Nelle palazzine più vecchie, frequente necessità di aggiornamento completo dell'impianto di scarico.", // [IPOTESI]

    faq: [
      {
        domanda:
          "Abito nel nucleo storico di Trentola. Ho bisogno di permessi speciali per ristrutturare?",
        risposta:
          "Dipende dalla zona di PRG in cui si trova l'immobile e dal tipo di intervento. I centri storici sono spesso soggetti a norme di conservazione che limitano le modifiche alle facciate e ai prospetti. Per lavori interni (bagno, cucina) senza modifiche strutturali, di solito è sufficiente una CILA. Prima di procedere, è utile una verifica della classificazione urbanistica dell'immobile.",
      },
      {
        domanda:
          "Quanto costa il rifacimento completo di un bagno a Trentola Ducenta?",
        risposta:
          "In base al Prezzario Regionale Campania, le stime orientative per un bagno 5-6 mq vanno da 5.000 € (base) a 9.500 € (premium). Nelle palazzine storiche con impianti obsoleti, il costo tende al limite superiore della forbice o lo supera. Il sopralluogo è il momento in cui emergono queste variabili.",
      },
    ],

    vicini: ["aversa", "succivo", "parete", "villa-di-briano"],
  },

  {
    slug: "san-marcellino",
    nome: "San Marcellino",
    provincia: "caserta",
    zona: "agro-aversano",

    metaTitle: "Ristrutturazione Casa a San Marcellino | Preventivi",
    metaDescription:
      "Ristrutturazione a San Marcellino: costi, criticità edilizie e stima gratuita. Interveniamo su villette, case a schiera e palazzine.",

    // [IPOTESI] Comune residenziale medio Agro Aversano
    descrizione:
      "San Marcellino è un comune residenziale dell'Agro Aversano con un tessuto edilizio caratteristico della zona: un nucleo più denso con palazzine degli anni '60-'70 e un'ampia espansione periferica di villette e case a schiera degli anni '80-'00.",

    tipoEdilizio:
      "Palazzine anni '60-'70 nel centro, villette unifamiliari e case a schiera anni '80-'00 nella periferia",

    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '60-'70: rilevamento necessario prima di interventi su cucine",
      "Umidità di risalita nelle abitazioni di piano terra, frequente nelle costruzioni senza intercapedine",
      "Abusi edilizi non condonati nelle espansioni private degli anni '90",
      "Impianti elettrici non a norma (CEI 64-8) nelle abitazioni più datate: aggiornamento spesso necessario in fase di ristrutturazione",
    ],

    caratteristicheBagni:
      "Bagni standard con sanitari e rivestimenti anni '80-'90. Nelle palazzine più datate, impianti idrici in acciaio zincato che richiedono sostituzione integrale.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine in muratura degli anni '80-'90, spesso con piastrelle a decoro da rimuovere. Interventi tipici: demolizione cucina esistente, nuovi impianti, nuove rifiniture.", // [IPOTESI]

    faq: [
      {
        domanda:
          "Quanto costa ristrutturare un bagno a San Marcellino?",
        risposta:
          "Per un bagno di 5-6 mq con rifacimento completo, le stime orientative in base al Prezzario Regionale Campania vanno da circa 5.000 € (base) a 9.500 € (premium). Se gli impianti idrici sono in acciaio zincato e richiedono sostituzione, il costo si avvicina o supera il limite superiore. Il sopralluogo gratuito permette di quantificare con precisione.",
      },
      {
        domanda:
          "Posso ristrutturare il bagno senza toccare gli impianti?",
        risposta:
          "Tecnicamente sì, ma non è quasi mai consigliabile. Se gli impianti hanno più di 30-35 anni, il rifacimento è l'occasione giusta per aggiornarli: il costo marginale di farlo mentre si aprono le pareti è molto inferiore rispetto a un intervento separato in futuro. Nelle nostre valutazioni, segnaliamo sempre lo stato degli impianti esistenti.",
      },
    ],

    vicini: ["aversa", "casal-di-principe", "villa-di-briano", "frignano"],
  },

  {
    slug: "casal-di-principe",
    nome: "Casal di Principe",
    provincia: "caserta",
    zona: "agro-aversano",

    metaTitle: "Ristrutturazione Casa a Casal di Principe | Preventivi",
    metaDescription:
      "Ristrutturazione a Casal di Principe: costi orientativi per appartamenti e villette. Stima gratuita, sopralluogo senza impegno.",

    // [IPOTESI] Comune medio, centro storico più sviluppato rispetto ad altri
    descrizione:
      "Casal di Principe è un comune con un centro storico relativamente sviluppato rispetto agli altri comuni dell'Agro Aversano, con un'edilizia più densa e palazzine degli anni '50-'70 affiancate da espansioni residenziali più recenti.",

    tipoEdilizio:
      "Centro storico con palazzi e palazzine anni '50-'70; espansione periferica con villette anni '80-'00",

    criticalita: [
      "Umidità di risalita diffusa nelle abitazioni del centro storico, spesso trattata in modo superficiale negli anni",
      "Canne fumarie in amianto nei condomini più vecchi",
      "Abusi edilizi da regolarizzare, frequenti come nel resto della zona",
      "Solai in latero-cemento degli anni '60-'70 con possibili problemi di degrado del ferro: da verificare in caso di interventi strutturali", // [IPOTESI]
    ],

    caratteristicheBagni:
      "Bagni prevalentemente sotto i 6 mq nelle palazzine del centro, con sanitari da aggiornare. Alcune abitazioni presentano ancora il cosiddetto 'bagno di servizio' senza finestra.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine di dimensioni medie, separate. Nelle abitazioni più vecchie del centro, frequente presenza di cucine con impianto gas a vista non a norma.", // [IPOTESI]

    faq: [
      {
        domanda:
          "Quanto costa ristrutturare un appartamento a Casal di Principe?",
        risposta:
          "Per una ristrutturazione completa, le stime orientative in base al Prezzario Regionale Campania vanno da circa 550 €/mq (finitura base) a 950 €/mq (finitura premium). Su un appartamento di 80 mq, significa una forbice orientativa di 44.000-76.000 €. I valori precisi dipendono dallo stato attuale dell'immobile, che emerge dal sopralluogo.",
      },
      {
        domanda:
          "Ho un appartamento anni '70 a Casal di Principe. Cosa rischio se ristruttura senza verificare gli impianti?",
        risposta:
          "Un impianto elettrico degli anni '70 non è a norma CEI 64-8 (niente differenziale, sezioni dei cavi insufficienti per i carichi attuali). Un impianto idrico in acciaio zincato può avere sezioni ridotte dalla corrosione interna. Procedere con rifiniture senza aggiornare gli impianti significa trovarsi con guasti in pochi anni, in spazi appena rinnovati. Il sopralluogo include sempre la valutazione dello stato degli impianti.",
      },
    ],

    vicini: ["san-marcellino", "villa-di-briano", "frignano", "parete"],
  },

  {
    slug: "casaluce",
    nome: "Casaluce",
    provincia: "caserta",
    zona: "agro-aversano",

    metaTitle: "Ristrutturazione Casa a Casaluce | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Casaluce: costi orientativi da Prezzario Campania, criticità locali e stima gratuita senza impegno.",

    // [IPOTESI] Piccolo comune residenziale
    descrizione:
      "Casaluce è un piccolo comune residenziale dell'Agro Aversano, con un nucleo antico che conserva alcune strutture storiche e una cintura di espansione residenziale sviluppata tra gli anni '80 e i primi anni 2000.",

    tipoEdilizio:
      "Nucleo storico con palazzine anni '50-'70; espansione periferica con villette unifamiliari anni '80-'00",

    criticalita: [
      "Umidità di risalita nei piani terra, frequente nelle costruzioni storiche senza barriera impermeabilizzante",
      "Abusi edilizi nelle espansioni private",
      "Coperture in eternit (amianto) ancora presenti in alcune strutture accessorie (garage, tettoie) degli anni '70-'80", // [IPOTESI — VERIFICA]
      "Impianti idrici vetusti nelle palazzine del centro",
    ],

    caratteristicheBagni:
      "Bagni standard con impianti e rivestimenti degli anni '80-'90. Nelle abitazioni storiche, bagni aggiunti in epoche successive con interventi non sempre a norma.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine separate, medie dimensioni. Interventi frequenti: sostituzione cucine in muratura datate con nuovi impianti.", // [IPOTESI]

    faq: [
      {
        domanda: "Quanto costa il rifacimento del bagno a Casaluce?",
        risposta:
          "Per un bagno standard di 5-6 mq, le stime orientative basate sul Prezzario Regionale Campania vanno da circa 5.000 € (finitura base) a 9.500 € (finitura premium). Nei casi con impianti molto datati o problemi di umidità, il costo reale emerge solo dal sopralluogo.",
      },
      {
        domanda:
          "Ho un garage con copertura in eternit. Influisce sulla ristrutturazione della casa?",
        risposta:
          "Direttamente no, ma se l'intervento edilizio complessivo richiede un titolo abilitativo, la presenza di amianto nell'immobile può essere rilevata durante i controlli. La bonifica di lastre in eternit è un intervento separato, da affidare a ditta specializzata certificata. È consigliabile pianificarla prima o in parallelo con la ristrutturazione.",
      },
    ],

    vicini: ["aversa", "lusciano", "cesa", "succivo"],
  },

  {
    slug: "cesa",
    nome: "Cesa",
    provincia: "caserta",
    zona: "agro-aversano",

    metaTitle: "Ristrutturazione Casa a Cesa | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Cesa: costi orientativi per villette e palazzine, stima gratuita e sopralluogo senza impegno.",

    // [IPOTESI] Piccolo comune, simile pattern zona
    descrizione:
      "Cesa è un piccolo comune residenziale dell'Agro Aversano, con un tessuto edilizio che alterna un centro storico compatto a zone di espansione residenziale sviluppate principalmente tra gli anni '80 e i primi anni 2000.",

    tipoEdilizio:
      "Centro compatto con palazzine anni '60-'70; periferia con villette e case a schiera anni '80-'00",

    criticalita: [
      "Umidità di risalita nei piani terra, frequente nelle costruzioni più datate",
      "Abusi edilizi non condonati nelle espansioni private",
      "Impianti idrici e fognari vetusti nelle palazzine del centro",
      "Canne fumarie in amianto negli edifici condominiali degli anni '60-'70",
    ],

    caratteristicheBagni:
      "Bagni standard anni '80-'90. Nelle palazzine del centro, dimensioni spesso inferiori ai 5 mq con impianti originali.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine separate, medie dimensioni. Frequente necessità di aggiornamento impianto gas e scarichi nelle abitazioni più vecchie.", // [IPOTESI]

    faq: [
      {
        domanda: "Quanto costa ristrutturare un bagno a Cesa?",
        risposta:
          "Le stime orientative basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € a 9.500 €. Nelle palazzine del centro con impianti originali, il costo reale tende al limite superiore. Il sopralluogo gratuito chiarisce la situazione prima di qualsiasi impegno.",
      },
    ],

    vicini: ["aversa", "casaluce", "succivo", "trentola-ducenta"],
  },

  {
    slug: "frignano",
    nome: "Frignano",
    provincia: "caserta",
    zona: "agro-aversano",

    metaTitle: "Ristrutturazione Casa a Frignano | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Frignano: costi orientativi, criticità edilizie locali e stima gratuita. Preventivo con sopralluogo.",

    // [IPOTESI] Piccolo comune agricolo/residenziale
    descrizione:
      "Frignano è un piccolo comune dell'Agro Aversano con radici agricole, il cui tessuto edilizio riflette la trasformazione della zona avvenuta tra gli anni '70 e i primi anni 2000: case rurali ristrutturate, palazzine di piccole dimensioni e alcune villette di nuova costruzione.",

    tipoEdilizio:
      "Case rurali e palazzine anni '60-'70; villette anni '80-'00 nelle zone di espansione",

    criticalita: [
      "Umidità di risalita frequente nelle strutture più vecchie, spesso costruite senza solaio di separazione dal terreno", // [IPOTESI]
      "Abusi edilizi nelle trasformazioni del patrimonio rurale",
      "Impianti fognari non allacciati alla rete pubblica in alcune zone periferiche: fossa biologica da verificare prima di interventi su bagni", // [IPOTESI — VERIFICA]
      "Coperture con tegole deteriorate nelle abitazioni rurali più datate",
    ],

    caratteristicheBagni:
      "Bagni spesso aggiunti in un secondo momento nelle ristrutturazioni rurali degli anni '80, con impianti non sempre a norma. Dimensioni variabili.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine grandi nelle case rurali, con camino o cucina economica ancora presente in alcune abitazioni più vecchie.", // [IPOTESI]

    faq: [
      {
        domanda:
          "Ho una casa rurale a Frignano. Cosa devo verificare prima di ristrutturare il bagno?",
        risposta:
          "Per le case rurali è fondamentale verificare: il sistema fognario (allaccio alla rete pubblica o fossa biologica), lo stato degli impianti idrici (spesso realizzati artigianalmente negli anni '80), la presenza di umidità nei muri, e la regolarità urbanistica dell'immobile. Il nostro sopralluogo copre tutti questi aspetti prima di emettere qualsiasi stima.",
      },
      {
        domanda: "Quanto costa ristrutturare un bagno a Frignano?",
        risposta:
          "Le stime orientative basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Nelle case rurali con impianti non a norma, il costo reale tende al limite superiore e può superarlo se necessario l'allaccio fognario.",
      },
    ],

    vicini: ["san-marcellino", "villa-di-briano", "casal-di-principe", "parete"],
  },

  {
    slug: "parete",
    nome: "Parete",
    provincia: "caserta",
    zona: "agro-aversano",

    metaTitle: "Ristrutturazione Casa a Parete | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Parete: costi orientativi per appartamenti e villette, stima gratuita e sopralluogo senza impegno.",

    // [IPOTESI] Comune residenziale medio Agro Aversano
    descrizione:
      "Parete è un comune residenziale dell'Agro Aversano con un tessuto edilizio tipico della zona: centro più antico con palazzine degli anni '60-'70 e ampie zone di espansione con villette e case a schiera edificate tra gli anni '80 e i primi anni 2000.",

    tipoEdilizio:
      "Palazzine anni '60-'70 nel centro; villette unifamiliari e case a schiera anni '80-'00 nella periferia",

    criticalita: [
      "Umidità di risalita nei piani terra, frequente nelle costruzioni senza barriera impermeabilizzante",
      "Canne fumarie in amianto nei condomini degli anni '60-'70",
      "Abusi edilizi non condonati nelle espansioni private",
      "Impianti elettrici non aggiornati nelle abitazioni più datate",
    ],

    caratteristicheBagni:
      "Bagni standard con sanitari anni '80-'90. Nelle palazzine del centro, dimensioni ridotte e impianti da aggiornare.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine separate, dimensioni medie. Interventi frequenti: nuovi impianti gas, sostituzione scarichi, rifacimento rivestimenti.", // [IPOTESI]

    faq: [
      {
        domanda: "Quanto costa ristrutturare un bagno a Parete?",
        risposta:
          "Per un bagno di 5-6 mq con rifacimento completo, le stime orientative in base al Prezzario Regionale Campania vanno da circa 5.000 € (base) a 9.500 € (premium). Il sopralluogo gratuito permette di quantificare con precisione le variabili specifiche dell'immobile.",
      },
      {
        domanda: "Posso detrarre il 50% per il rifacimento del bagno a Parete?",
        risposta:
          "Sì, la detrazione IRPEF al 50% (Bonus Ristrutturazione) si applica al rifacimento completo del bagno come intervento di manutenzione straordinaria. Servono pagamenti con bonifico parlante, fatture in regola e, per gli interventi soggetti a CILA, la presentazione prima dell'inizio lavori.",
      },
    ],

    vicini: ["trentola-ducenta", "villa-di-briano", "casal-di-principe", "frignano"],
  },

  {
    slug: "succivo",
    nome: "Succivo",
    provincia: "caserta",
    zona: "agro-aversano",

    metaTitle: "Ristrutturazione Casa a Succivo | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Succivo: interventi su villette e palazzine, costi orientativi e stima gratuita senza impegno.",

    // [IPOTESI] Comune residenziale con buon tenore abitativo
    descrizione:
      "Succivo è un comune residenziale dell'Agro Aversano con un tenore abitativo mediamente più elevato rispetto agli altri comuni della zona, caratterizzato da villette e palazzine di medie dimensioni edificate principalmente tra gli anni '80 e i primi anni 2000.",

    tipoEdilizio:
      "Prevalenza di villette unifamiliari e palazzine anni '80-'00; nucleo storico con edifici anni '60-'70",

    criticalita: [
      "Umidità di risalita nelle villette più datate, frequente nei piani terra",
      "Abusi edilizi nelle espansioni private degli anni '90",
      "Impianti idrici in acciaio zincato nelle abitazioni degli anni '70-'80",
      "Coperture piane nelle villette degli anni '80: guaine di prima generazione spesso da sostituire",
    ],

    caratteristicheBagni:
      "Bagni di dimensioni standard o superiori nelle villette, con sanitari degli anni '80-'90. Nelle abitazioni più recenti, bagni già ristrutturati parzialmente ma con impianti da aggiornare.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine separate e ampie nelle villette. Frequente richiesta di apertura verso il soggiorno (cucina open space) in fase di ristrutturazione.", // [IPOTESI]

    faq: [
      {
        domanda:
          "Voglio aprire la cucina sul soggiorno nella mia villetta a Succivo. È possibile?",
        risposta:
          "Dipende dalla struttura del muro di separazione. Se è un muro portante, l'apertura richiede una trave di sostegno e il progetto di un ingegnere strutturale, oltre al permesso di costruire. Se è una tramezza non portante, basta una CILA. Il nostro sopralluogo include la verifica della natura del muro prima di qualsiasi preventivo.",
      },
      {
        domanda: "Quanto costa ristrutturare un bagno a Succivo?",
        risposta:
          "Le stime orientative basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Nelle villette con bagni già parzialmente ristrutturati, il costo dipende da quanto degli impianti esistenti è riutilizzabile: lo si capisce al sopralluogo.",
      },
    ],

    vicini: ["aversa", "cesa", "casaluce", "trentola-ducenta"],
  },

  {
    slug: "villa-di-briano",
    nome: "Villa di Briano",
    provincia: "caserta",
    zona: "agro-aversano",

    metaTitle: "Ristrutturazione Casa a Villa di Briano | Preventivi",
    metaDescription:
      "Ristrutturazione a Villa di Briano: costi orientativi, criticità edilizie locali e stima gratuita. Sopralluogo senza impegno.",

    // [IPOTESI] Piccolo comune residenziale
    descrizione:
      "Villa di Briano è un piccolo comune residenziale dell'Agro Aversano, con un tessuto edilizio composto da un nucleo storico compatto e zone di espansione con villette e palazzine di piccole dimensioni, sviluppate tra gli anni '70 e i primi anni 2000.",

    tipoEdilizio:
      "Nucleo storico con palazzine anni '50-'70; periferia con villette anni '80-'00",

    criticalita: [
      "Umidità di risalita nelle abitazioni storiche, frequente nei piani terra",
      "Canne fumarie in amianto nei condomini anni '60-'70",
      "Abusi edilizi nelle zone di espansione",
      "Impianti fognari datati nel nucleo storico, spesso condivisi tra più abitazioni", // [IPOTESI — VERIFICA]
    ],

    caratteristicheBagni:
      "Bagni di dimensioni ridotte nelle palazzine storiche; standard nelle villette. Impianti spesso datati con necessità di aggiornamento completo.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine separate, medie dimensioni. Nelle abitazioni storiche, frequente necessità di adeguamento scarichi e impianto gas.", // [IPOTESI]

    faq: [
      {
        domanda:
          "Quanto costa ristrutturare un bagno a Villa di Briano?",
        risposta:
          "Le stime orientative basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Nelle palazzine storiche con impianti originali, il costo tende al limite superiore. Il sopralluogo gratuito chiarisce la situazione specifica.",
      },
    ],

    vicini: ["san-marcellino", "casal-di-principe", "frignano", "parete"],
  },
];

// ─────────────────────────────────────────────
// ZONA: NAPOLI E PROVINCIA (8 comuni)
// ⚠️ TUTTI I DATI SONO [IPOTESI] — da verificare con chi conosce la zona
// ─────────────────────────────────────────────

export const comuniNapoli: Comune[] = [
  {
    slug: "napoli",
    nome: "Napoli",
    provincia: "napoli",
    zona: "napoli",

    metaTitle: "Ristrutturazione Casa a Napoli | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Napoli: costi orientativi per appartamenti nei quartieri serviti. Criticità locali, stima gratuita e sopralluogo.",

    // [IPOTESI] Solo quartieri periferici serviti (non centro storico UNESCO)
    descrizione:
      "Napoli è servita nelle zone periferiche nord e nord-ovest, con un tessuto edilizio prevalentemente condominiale degli anni '60-'80. Le caratteristiche edilizie variano significativamente da quartiere a quartiere: il nostro servizio copre principalmente le zone di Secondigliano, Scampia, Piscinola e le aree limitrofe.",

    tipoEdilizio:
      "Condomini anni '60-'80 nelle periferie nord; edilizia popolare IACP; alcune palazzine anni '50 nei quartieri più centrali dell'area servita",

    // [IPOTESI — VERIFICA obbligatoria]
    criticalita: [
      "Impianti idrici condominiali obsoleti: spesso le colonne montanti non sono state aggiornate dalla costruzione",
      "Canne fumarie in amianto nei condomini degli anni '60-'70: rilevamento obbligatorio",
      "Umidità di risalita e infiltrazioni da lastrico solare nei piani alti",
      "Interventi in condominio: necessario il rispetto del regolamento condominiale e in alcuni casi delibera assembleare per lavori che toccano parti comuni",
    ],

    caratteristicheBagni:
      "Bagni mono-sanitari sotto i 5 mq nei condomini IACP e nelle palazzine degli anni '60. Nelle abitazioni più recenti, bagni di dimensioni standard con sanitari da aggiornare.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine separate e compatte nei condomini degli anni '60-'70. Frequente presenza di canna fumaria condominiale in amianto collegata alle cucine.", // [IPOTESI]

    faq: [
      {
        domanda:
          "Devo chiedere al condominio per ristrutturare il mio bagno a Napoli?",
        risposta:
          "Se l'intervento è interno al tuo appartamento e non tocca parti comuni (colonne scarico condominiali, strutture, facciate), non serve una delibera. Devi però rispettare il regolamento condominiale per orari e modalità dei lavori. Se l'intervento richiede di collegare o modificare impianti condominiali, è necessario informare l'amministratore e in alcuni casi ottenere l'approvazione assembleare.",
      },
      {
        domanda: "Quanto costa ristrutturare un bagno a Napoli?",
        risposta:
          "In base al Prezzario Regionale Campania, le stime orientative per un bagno 4-5 mq vanno da circa 4.500 € (base) a 8.500 € (premium). I condomini degli anni '60-'70 con impianti obsoleti tendono al limite superiore. Il sopralluogo è il momento in cui emergono le variabili specifiche.",
      },
      {
        domanda:
          "Posso usare il Bonus 50% per un appartamento in condominio a Napoli?",
        risposta:
          "Sì, la detrazione IRPEF al 50% si applica agli interventi di manutenzione straordinaria sulle unità immobiliari residenziali, indipendentemente dalla tipologia condominiale. Servono pagamenti tracciati con bonifico parlante e fatture in regola. Per interventi che toccano parti comuni, esiste anche il Bonus Ristrutturazione Condominiale con soglie di spesa più elevate.",
      },
    ],

    vicini: ["giugliano-in-campania", "mugnano-di-napoli", "melito-di-napoli"],
  },

  {
    slug: "giugliano-in-campania",
    nome: "Giugliano in Campania",
    provincia: "napoli",
    zona: "napoli",

    metaTitle: "Ristrutturazione Casa a Giugliano in Campania | Preventivi",
    metaDescription:
      "Ristrutturazione a Giugliano in Campania: costi orientativi, criticità edilizie e stima gratuita. Preventivo con sopralluogo.",

    // [IPOTESI] Comune molto popoloso, espansione rapida anni '80-'90
    descrizione:
      "Giugliano in Campania è uno dei comuni più popolosi della Campania, con un'espansione residenziale avvenuta molto rapidamente tra gli anni '80 e i primi anni 2000. Il tessuto edilizio è prevalentemente composto da palazzine e condomini di media altezza, con un nucleo storico relativamente contenuto.",

    tipoEdilizio:
      "Palazzine e condomini anni '80-'00 nelle zone di espansione; nucleo storico con edifici anni '50-'70; alcune ville e villette nelle zone periferiche",

    // [IPOTESI]
    criticalita: [
      "Abusi edilizi non condonati molto frequenti, legati alla rapida espansione non sempre pianificata degli anni '80-'90",
      "Canne fumarie in amianto nei condomini degli anni '70-'80",
      "Umidità di risalita nelle abitazioni di piano terra, frequente nelle costruzioni su terreno argilloso",
      "Impianti condominiali non aggiornati in edifici di 30-40 anni: pressione idrica insufficiente ai piani alti",
    ],

    caratteristicheBagni:
      "Bagni di dimensioni variabili: standard nei condomini degli anni '80 (5-6 mq), più piccoli nelle palazzine del centro. Sanitari degli anni '80-'90 da aggiornare.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine separate nelle palazzine, medie dimensioni. Nelle costruzioni degli anni '80, frequente presenza di impianto gas non a norma.", // [IPOTESI]

    faq: [
      {
        domanda:
          "Ho un appartamento anni '90 a Giugliano. Cosa controllo prima di ristrutturare?",
        risposta:
          "Per gli appartamenti degli anni '90 a Giugliano è consigliabile verificare: la regolarità urbanistica (abusi frequenti nella zona), lo stato dell'impianto elettrico (norme CEI 64-8 del 1992 spesso non aggiornate), la condizione degli scarichi condominiali, e la presenza di umidità nei muri perimetrali. Il nostro sopralluogo include una valutazione tecnica complessiva.",
      },
      {
        domanda: "Quanto costa ristrutturare un bagno a Giugliano in Campania?",
        risposta:
          "In base al Prezzario Regionale Campania, le stime orientative per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Negli edifici degli anni '90 con impianti da sostituire integralmente, il costo tende al limite superiore.",
      },
    ],

    vicini: ["napoli", "villaricca", "sant-antimo", "mugnano-di-napoli"],
  },

  {
    slug: "sant-antimo",
    nome: "Sant'Antimo",
    provincia: "napoli",
    zona: "napoli",

    metaTitle: "Ristrutturazione Casa a Sant'Antimo | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Sant'Antimo: costi orientativi da Prezzario Campania, criticità edilizie e stima gratuita.",

    // [IPOTESI]
    descrizione:
      "Sant'Antimo è un comune densamente popolato a nord di Napoli, con un tessuto edilizio prevalentemente composto da palazzine e condomini di media altezza. L'espansione residenziale rapida degli anni '70-'90 ha lasciato un patrimonio edilizio eterogeneo con livelli di qualità costruttiva molto variabili.",

    tipoEdilizio:
      "Condomini e palazzine anni '70-'90; alcune aree di edilizia popolare; nucleo storico con edifici anni '50-'60",

    criticalita: [
      "Umidità di risalita e infiltrazioni da lastrici solari nei piani alti",
      "Canne fumarie in amianto nei condomini degli anni '70",
      "Abusi edilizi non condonati frequenti",
      "Impianti idrici condominiali vetusti: colonne montanti in piombo ancora presenti nei palazzi anni '60", // [IPOTESI — VERIFICA]
    ],

    caratteristicheBagni:
      "Bagni compatti nelle palazzine anni '70 (sotto i 5 mq), standard nelle costruzioni successive. Impianti spesso da aggiornare integralmente.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine separate, compatte. Canne fumarie condominiali collegate che richiedono verifica prima di qualsiasi intervento.", // [IPOTESI]

    faq: [
      {
        domanda: "Quanto costa ristrutturare un bagno a Sant'Antimo?",
        risposta:
          "Le stime orientative in base al Prezzario Regionale Campania per un bagno 4-5 mq vanno da circa 4.500 € (base) a 8.500 € (premium). Nei condomini degli anni '70 con impianti originali, il costo reale tende al limite superiore. Il sopralluogo chiarisce la situazione specifica.",
      },
    ],

    vicini: ["giugliano-in-campania", "napoli", "melito-di-napoli", "grumo-nevano"],
  },

  {
    slug: "melito-di-napoli",
    nome: "Melito di Napoli",
    provincia: "napoli",
    zona: "napoli",

    metaTitle: "Ristrutturazione Casa a Melito di Napoli | Preventivi",
    metaDescription:
      "Ristrutturazione a Melito di Napoli: costi orientativi, criticità locali e stima gratuita. Sopralluogo senza impegno.",

    // [IPOTESI]
    descrizione:
      "Melito di Napoli è un comune dell'area nord di Napoli con un tessuto edilizio prevalentemente condominiale, sviluppatosi rapidamente tra gli anni '60 e gli anni '90. La vicinanza a Napoli e la buona connessione viaria hanno favorito una forte crescita residenziale.",

    tipoEdilizio:
      "Condomini anni '60-'90; palazzine di media altezza; alcune aree di edilizia popolare",

    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '60-'70",
      "Umidità di infiltrazione e risalita nei piani terra e seminterrati",
      "Impianti condominiali obsoleti: aggiornamento necessario in caso di interventi su bagni o cucine", // [IPOTESI]
      "Abusi edilizi non condonati",
    ],

    caratteristicheBagni:
      "Bagni compatti (sotto i 5 mq) nei condomini più vecchi, standard nelle costruzioni degli anni '80-'90. Impianti originali spesso ancora in funzione.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine compatte e separate. Frequente presenza di cappa non a norma collegata a canna fumaria condominiale.", // [IPOTESI]

    faq: [
      {
        domanda: "Quanto costa ristrutturare un bagno a Melito di Napoli?",
        risposta:
          "In base al Prezzario Regionale Campania, le stime orientative per un bagno 4-5 mq vanno da circa 4.500 € (base) a 8.500 € (premium). Nei condomini degli anni '60-'70 con impianti originali da sostituire, il costo tende al limite superiore. Il sopralluogo gratuito quantifica le variabili specifiche.",
      },
    ],

    vicini: ["napoli", "sant-antimo", "mugnano-di-napoli", "casandrino"],
  },

  {
    slug: "mugnano-di-napoli",
    nome: "Mugnano di Napoli",
    provincia: "napoli",
    zona: "napoli",

    metaTitle: "Ristrutturazione Casa a Mugnano di Napoli | Preventivi",
    metaDescription:
      "Ristrutturazione a Mugnano di Napoli: costi orientativi, criticità edilizie locali e stima gratuita senza impegno.",

    // [IPOTESI]
    descrizione:
      "Mugnano di Napoli è un comune dell'area nord-ovest di Napoli, con un tessuto edilizio prevalentemente condominiale degli anni '60-'80. La densità abitativa è elevata e le abitazioni sono in larga parte appartamenti in condominio.",

    tipoEdilizio:
      "Condomini anni '60-'80; palazzine di media altezza; edilizia compatta",

    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '60-'70",
      "Impianti condominiali vetusti: colonne scarico e montanti idrici da decenni senza manutenzione",
      "Umidità di infiltrazione nei piani alti e risalita ai piani terra",
      "Abusi edilizi nei tavolati interni e nei ripostigli ricavati",
    ],

    caratteristicheBagni:
      "Bagni compatti nei condomini più vecchi, spesso sotto i 5 mq con sanitari in posizione fissa da decenni. Impianti originali frequentemente ancora in funzione.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine compatte, separate. Canne fumarie condominiali da verificare obbligatoriamente.", // [IPOTESI]

    faq: [
      {
        domanda: "Quanto costa ristrutturare un bagno a Mugnano di Napoli?",
        risposta:
          "Le stime orientative basate sul Prezzario Regionale Campania per un bagno 4-5 mq vanno da circa 4.500 € (base) a 8.500 € (premium). Nei condomini più vecchi con impianti originali, il costo reale tende al limite superiore. Il sopralluogo gratuito chiarisce la situazione.",
      },
    ],

    vicini: ["napoli", "giugliano-in-campania", "melito-di-napoli", "villaricca"],
  },

  {
    slug: "villaricca",
    nome: "Villaricca",
    provincia: "napoli",
    zona: "napoli",

    metaTitle: "Ristrutturazione Casa a Villaricca | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Villaricca: costi orientativi da Prezzario Campania, criticità locali e stima gratuita.",

    // [IPOTESI]
    descrizione:
      "Villaricca è un comune dell'area nord-ovest di Napoli con un tessuto edilizio misto, che comprende sia condomini degli anni '70-'80 che villette unifamiliari nelle zone più periferiche. L'espansione residenziale è avvenuta principalmente tra gli anni '70 e i primi anni 2000.",

    tipoEdilizio:
      "Condomini anni '70-'80 nelle zone centrali; villette unifamiliari nelle zone periferiche; edilizia mista",

    criticalita: [
      "Umidità di risalita nelle abitazioni di piano terra, sia nei condomini che nelle villette",
      "Canne fumarie in amianto nei condomini degli anni '70",
      "Abusi edilizi frequenti nelle villette e nelle zone di espansione",
      "Impianti idrici vetusti nei condomini più datati",
    ],

    caratteristicheBagni:
      "Bagni standard nei condomini (5-6 mq); dimensioni variabili nelle villette. Sanitari anni '80-'90 da aggiornare.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine separate di medie dimensioni. Nelle villette, frequente richiesta di apertura sul soggiorno.", // [IPOTESI]

    faq: [
      {
        domanda: "Quanto costa ristrutturare un bagno a Villaricca?",
        risposta:
          "Le stime orientative basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Il valore preciso dipende dallo stato degli impianti e dall'entità dell'intervento, che emergono al sopralluogo.",
      },
    ],

    vicini: ["giugliano-in-campania", "mugnano-di-napoli", "napoli", "casandrino"],
  },

  {
    slug: "casandrino",
    nome: "Casandrino",
    provincia: "napoli",
    zona: "napoli",

    metaTitle: "Ristrutturazione Casa a Casandrino | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Casandrino: costi orientativi, criticità edilizie locali e stima gratuita senza impegno.",

    // [IPOTESI]
    descrizione:
      "Casandrino è un piccolo comune dell'area nord di Napoli con un tessuto edilizio compatto, composto principalmente da palazzine degli anni '60-'80 e alcune villette nelle zone periferiche.",

    tipoEdilizio:
      "Palazzine anni '60-'80 nel centro; villette nelle zone periferiche",

    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '60-'70",
      "Umidità di risalita nei piani terra",
      "Abusi edilizi non condonati",
      "Impianti idrici vetusti nei palazzi più datati",
    ],

    caratteristicheBagni:
      "Bagni compatti nelle palazzine degli anni '60-'70; standard nelle costruzioni successive.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine separate e compatte. Verifica canna fumaria obbligatoria prima di interventi.", // [IPOTESI]

    faq: [
      {
        domanda: "Quanto costa ristrutturare un bagno a Casandrino?",
        risposta:
          "In base al Prezzario Regionale Campania, le stime orientative per un bagno 4-5 mq vanno da circa 4.500 € a 8.500 €. Il sopralluogo gratuito quantifica le variabili specifiche dell'immobile.",
      },
    ],

    vicini: ["napoli", "villaricca", "mugnano-di-napoli", "grumo-nevano"],
  },

  {
    slug: "grumo-nevano",
    nome: "Grumo Nevano",
    provincia: "napoli",
    zona: "napoli",

    metaTitle: "Ristrutturazione Casa a Grumo Nevano | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Grumo Nevano: costi orientativi, criticità edilizie e stima gratuita senza impegno.",

    // [IPOTESI]
    descrizione:
      "Grumo Nevano è un comune dell'area nord di Napoli, al confine con la provincia di Caserta. Il tessuto edilizio è prevalentemente composto da palazzine degli anni '70-'90 con alcune aree di edilizia residenziale più recente.",

    tipoEdilizio:
      "Palazzine anni '70-'90; nucleo storico con edifici più datati; edilizia recente nelle zone periferiche",

    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '70",
      "Umidità di risalita nelle abitazioni di piano terra",
      "Abusi edilizi non condonati nelle espansioni private",
      "Impianti idrici vetusti nelle palazzine più datate",
    ],

    caratteristicheBagni:
      "Bagni standard nei condomini degli anni '80-'90; più compatti nelle palazzine storiche.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine separate di medie dimensioni. Canna fumaria condominiale da verificare.", // [IPOTESI]

    faq: [
      {
        domanda: "Quanto costa ristrutturare un bagno a Grumo Nevano?",
        risposta:
          "Le stime orientative basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). I valori precisi emergono dal sopralluogo gratuito.",
      },
    ],

    vicini: ["sant-antimo", "casandrino", "napoli", "aversa"],
  },
];

// ─────────────────────────────────────────────
// ZONA: CASERTA E PROVINCIA (9 comuni)
// ⚠️ TUTTI I DATI SONO [IPOTESI] — da verificare
// ─────────────────────────────────────────────

export const comuniCaserta: Comune[] = [
  {
    slug: "caserta",
    nome: "Caserta",
    provincia: "caserta",
    zona: "caserta",

    metaTitle: "Ristrutturazione Casa a Caserta | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Caserta: costi orientativi per appartamenti e ville, criticità locali e stima gratuita senza impegno.",

    // [IPOTESI] Capoluogo con centro storico + espansione moderna
    descrizione:
      "Caserta è il capoluogo di provincia, con un tessuto edilizio che varia dalla zona del centro storico e delle ville storiche nei pressi della Reggia, alle palazzine degli anni '60-'80 nelle zone residenziali, fino alle villette dell'espansione periferica degli anni '90-2000. Ogni zona ha caratteristiche edilizie e iter autorizzativi differenti.",

    tipoEdilizio:
      "Centro storico con edifici d'epoca e palazzi signorili; palazzine anni '60-'80 nelle zone residenziali (Pietro Nenni, Acquaviva); villette anni '90-2000 in periferia",

    // [IPOTESI]
    criticalita: [
      "Centro storico: alcune zone sono soggette a vincoli paesaggistici e della Soprintendenza (vicinanza Reggia e Belvedere)",
      "Canne fumarie in amianto nei condomini degli anni '60-'70",
      "Umidità di risalita nelle abitazioni del centro storico e nei piani terra dei condomini",
      "Impianti condominiali obsoleti: negli edifici degli anni '60-'70, frequente assenza di aggiornamento degli impianti idrici condominiali",
    ],

    caratteristicheBagni:
      "Bagni di dimensioni variabili: ampi negli appartamenti signorili del centro, compatti (sotto 5 mq) nelle palazzine degli anni '70. Nei condomini più vecchi, impianti idrici originali spesso in piombo o acciaio zincato.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine separate nelle palazzine; più ampie negli appartamenti del centro. Frequente necessità di aggiornamento impianto gas e cappa.", // [IPOTESI]

    faq: [
      {
        domanda:
          "Ho un appartamento vicino alla Reggia di Caserta. Ci sono vincoli per ristrutturare?",
        risposta:
          "La vicinanza alla Reggia non implica automaticamente vincoli sugli interni. I vincoli della Soprintendenza riguardano prevalentemente facciate, prospetti e interventi visibili dall'esterno. Per lavori interni (bagno, cucina) senza modifiche strutturali, di solito è sufficiente una CILA. È sempre utile verificare la classificazione urbanistica specifica dell'immobile prima di procedere.",
      },
      {
        domanda: "Quanto costa ristrutturare un bagno a Caserta?",
        risposta:
          "In base al Prezzario Regionale Campania, le stime orientative per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Negli appartamenti del centro con impianti d'epoca, il costo tende al limite superiore. Il sopralluogo gratuito chiarisce la situazione specifica.",
      },
      {
        domanda: "Quanto tempo ci vuole per ristrutturare un bagno a Caserta?",
        risposta:
          "Un bagno standard (5-6 mq) con rifacimento completo richiede mediamente 2-3 settimane lavorative. Negli appartamenti condominiali, i tempi dipendono anche dalla logistica (accesso, orari condominio, smaltimento macerie). Il programma lavori viene definito al sopralluogo.",
      },
    ],

    vicini: ["casagiove", "san-prisco", "recale", "marcianise"],
  },

  {
    slug: "marcianise",
    nome: "Marcianise",
    provincia: "caserta",
    zona: "caserta",

    metaTitle: "Ristrutturazione Casa a Marcianise | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Marcianise: costi orientativi da Prezzario Campania, criticità edilizie e stima gratuita.",

    // [IPOTESI] Comune con forte componente industriale/commerciale
    descrizione:
      "Marcianise è un comune con una forte componente industriale e commerciale, ma con un nucleo residenziale significativo composto da palazzine degli anni '60-'80 nel centro e villette nelle zone periferiche. La prossimità all'autostrada ha favorito l'espansione residenziale.",

    tipoEdilizio:
      "Palazzine anni '60-'80 nel centro; villette anni '80-'00 nelle zone periferiche; edilizia mista",

    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '60-'70",
      "Umidità di risalita nei piani terra, frequente nelle costruzioni più datate",
      "Abusi edilizi non condonati nelle zone di espansione",
      "Vibrazioni da traffico pesante sulla SS7 Appia: possibili lesioni nei muri delle abitazioni prossime", // [IPOTESI]
    ],

    caratteristicheBagni:
      "Bagni standard nelle palazzine degli anni '80; più compatti nei condomini anni '60-'70. Impianti spesso da aggiornare.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine separate, medie dimensioni. Canne fumarie da verificare nei condomini più vecchi.", // [IPOTESI]

    faq: [
      {
        domanda: "Quanto costa ristrutturare un bagno a Marcianise?",
        risposta:
          "Le stime orientative basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Il sopralluogo gratuito quantifica le variabili specifiche dell'immobile.",
      },
    ],

    vicini: ["caserta", "curti", "santa-maria-capua-vetere", "aversa"],
  },

  {
    slug: "curti",
    nome: "Curti",
    provincia: "caserta",
    zona: "caserta",

    metaTitle: "Ristrutturazione Casa a Curti | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Curti: costi orientativi, criticità edilizie locali e stima gratuita. Preventivo con sopralluogo.",

    // [IPOTESI] Piccolo comune tra Caserta e S.M.C.V.
    descrizione:
      "Curti è un piccolo comune situato tra Caserta e Santa Maria Capua Vetere, con un tessuto edilizio composto prevalentemente da palazzine anni '70-'80 e villette unifamiliari.",

    tipoEdilizio:
      "Palazzine anni '70-'80; villette unifamiliari; edilizia residenziale compatta",

    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '70",
      "Umidità di risalita nei piani terra",
      "Abusi edilizi non condonati",
      "Impianti idrici vetusti nelle costruzioni più datate",
    ],

    caratteristicheBagni:
      "Bagni standard con sanitari anni '80-'90. Impianti spesso da aggiornare integralmente.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine separate di medie dimensioni. Verifica canna fumaria necessaria.", // [IPOTESI]

    faq: [
      {
        domanda: "Quanto costa ristrutturare un bagno a Curti?",
        risposta:
          "Le stime orientative basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Il sopralluogo gratuito chiarisce la situazione specifica.",
      },
    ],

    vicini: ["caserta", "marcianise", "santa-maria-capua-vetere", "casapulla"],
  },

  {
    slug: "santa-maria-capua-vetere",
    nome: "Santa Maria Capua Vetere",
    provincia: "caserta",
    zona: "caserta",

    metaTitle: "Ristrutturazione Casa a Santa Maria Capua Vetere | Preventivi",
    metaDescription:
      "Ristrutturazione a S. Maria Capua Vetere: costi orientativi, criticità storiche e stima gratuita senza impegno.",

    // [IPOTESI] Comune con sito archeologico — vincoli specifici
    descrizione:
      "Santa Maria Capua Vetere è un comune con un importante sito archeologico (l'anfiteatro campano e l'antica Capua romana), che impone vincoli specifici in alcune zone. Il tessuto edilizio residenziale è composto da palazzine degli anni '50-'80 nel centro e villette nelle zone periferiche.",

    tipoEdilizio:
      "Palazzine anni '50-'80 nel centro; villette nelle zone periferiche; alcune zone soggette a vincolo archeologico",

    // [IPOTESI]
    criticalita: [
      "Zona archeologica: qualsiasi scavo (anche superficiale per impianti) in zone limitrofe al sito richiede verifica preventiva con la Soprintendenza",
      "Canne fumarie in amianto nei condomini degli anni '60-'70",
      "Umidità di risalita diffusa nelle abitazioni storiche del centro",
      "Impianti condominiali obsoleti nelle palazzine più vecchie",
    ],

    caratteristicheBagni:
      "Bagni di dimensioni variabili. Nelle palazzine storiche, spesso compatti con impianti originali. Nelle abitazioni più recenti, standard.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine separate, medie dimensioni. Nelle zone limitrofe al sito archeologico, eventuali lavori di scavo per impianti richiedono attenzione specifica.", // [IPOTESI]

    faq: [
      {
        domanda:
          "Abito vicino all'anfiteatro di Santa Maria Capua Vetere. Ci sono vincoli per ristrutturare?",
        risposta:
          "I vincoli archeologici riguardano principalmente gli interventi che comportano scavi nel sottosuolo. Per lavori interni (bagno, cucina) che non toccano le fondazioni, di solito non ci sono limitazioni particolari. Se l'intervento prevede scavi (es. sostituzione impianti sotto pavimento con demolizione del massetto), è consigliabile una verifica preventiva. Il nostro tecnico valuta la situazione al sopralluogo.",
      },
      {
        domanda:
          "Quanto costa ristrutturare un bagno a Santa Maria Capua Vetere?",
        risposta:
          "Le stime orientative basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Il sopralluogo gratuito quantifica le variabili specifiche.",
      },
    ],

    vicini: ["caserta", "curti", "capua", "marcianise"],
  },

  {
    slug: "casapulla",
    nome: "Casapulla",
    provincia: "caserta",
    zona: "caserta",

    metaTitle: "Ristrutturazione Casa a Casapulla | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Casapulla: costi orientativi, criticità edilizie e stima gratuita. Preventivo con sopralluogo.",

    // [IPOTESI]
    descrizione:
      "Casapulla è un piccolo comune residenziale in provincia di Caserta, con un tessuto edilizio composto da palazzine degli anni '70-'80 e villette unifamiliari nelle zone periferiche.",

    tipoEdilizio:
      "Palazzine anni '70-'80; villette unifamiliari; edilizia residenziale compatta",

    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '70",
      "Umidità di risalita nei piani terra",
      "Abusi edilizi non condonati",
      "Impianti idrici vetusti nelle costruzioni più datate",
    ],

    caratteristicheBagni:
      "Bagni standard con sanitari anni '80-'90. Impianti spesso da aggiornare.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine separate, medie dimensioni.", // [IPOTESI]

    faq: [
      {
        domanda: "Quanto costa ristrutturare un bagno a Casapulla?",
        risposta:
          "Le stime orientative basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). I valori precisi emergono dal sopralluogo gratuito.",
      },
    ],

    vicini: ["caserta", "curti", "recale", "san-prisco"],
  },

  {
    slug: "recale",
    nome: "Recale",
    provincia: "caserta",
    zona: "caserta",

    metaTitle: "Ristrutturazione Casa a Recale | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Recale: costi orientativi da Prezzario Campania, criticità locali e stima gratuita.",

    // [IPOTESI]
    descrizione:
      "Recale è un piccolo comune in provincia di Caserta, con un tessuto edilizio prevalentemente residenziale composto da villette unifamiliari e palazzine di piccole dimensioni.",

    tipoEdilizio:
      "Villette unifamiliari; palazzine di piccole dimensioni; edilizia residenziale a bassa densità",

    criticalita: [
      "Umidità di risalita nelle abitazioni più datate",
      "Abusi edilizi non condonati nelle villette",
      "Impianti idrici vetusti nelle costruzioni degli anni '70-'80",
    ],

    caratteristicheBagni:
      "Bagni standard nelle villette, spesso con sanitari anni '80-'90 mai aggiornati.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine di medie dimensioni, separate. Nelle villette, frequente richiesta di apertura verso il soggiorno.", // [IPOTESI]

    faq: [
      {
        domanda: "Quanto costa ristrutturare un bagno a Recale?",
        risposta:
          "Le stime orientative basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Il sopralluogo gratuito chiarisce la situazione specifica dell'immobile.",
      },
    ],

    vicini: ["caserta", "casapulla", "san-prisco", "casagiove"],
  },

  {
    slug: "san-prisco",
    nome: "San Prisco",
    provincia: "caserta",
    zona: "caserta",

    metaTitle: "Ristrutturazione Casa a San Prisco | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a San Prisco: costi orientativi, criticità edilizie locali e stima gratuita senza impegno.",

    // [IPOTESI]
    descrizione:
      "San Prisco è un comune residenziale in provincia di Caserta, con un tessuto edilizio composto da palazzine degli anni '70-'80 nel centro e villette nelle zone di espansione.",

    tipoEdilizio:
      "Palazzine anni '70-'80 nel centro; villette negli anni '80-'00 nelle zone periferiche",

    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '70",
      "Umidità di risalita nei piani terra",
      "Abusi edilizi non condonati nelle zone di espansione",
      "Impianti idrici vetusti nelle palazzine più datate",
    ],

    caratteristicheBagni:
      "Bagni standard con sanitari anni '80-'90. Impianti da aggiornare nelle palazzine più datate.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine separate, medie dimensioni.", // [IPOTESI]

    faq: [
      {
        domanda: "Quanto costa ristrutturare un bagno a San Prisco?",
        risposta:
          "Le stime orientative basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Il sopralluogo gratuito quantifica le variabili specifiche.",
      },
    ],

    vicini: ["caserta", "recale", "casapulla", "casagiove"],
  },

  {
    slug: "capua",
    nome: "Capua",
    provincia: "caserta",
    zona: "caserta",

    metaTitle: "Ristrutturazione Casa a Capua | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Capua: costi orientativi per appartamenti nel centro storico e villette. Stima gratuita e sopralluogo.",

    // [IPOTESI] Comune con centro storico medievale rilevante
    descrizione:
      "Capua è un comune con un centro storico di origine medievale ben conservato, circondato dalle anse del Volturno. Il tessuto edilizio del centro è prevalentemente storico, mentre le zone periferiche ospitano palazzine degli anni '70-'80 e villette più recenti.",

    tipoEdilizio:
      "Centro storico medievale (sec. X-XVIII) con palazzi d'epoca; palazzine anni '70-'80 nelle zone residenziali; villette nelle periferie",

    // [IPOTESI]
    criticalita: [
      "Centro storico: vincoli della Soprintendenza per interventi sulle facciate e sugli elementi storici; gli interni sono generalmente liberi da vincoli",
      "Umidità di risalita molto diffusa negli edifici storici del centro, spesso accentuata dalla vicinanza al Volturno",
      "Canne fumarie in amianto nei condomini degli anni '60-'70",
      "Impianti idrici e fognari datati nelle abitazioni del centro storico",
    ],

    caratteristicheBagni:
      "Bagni spesso aggiunti in un secondo momento negli edifici storici, con dimensioni e posizioni non ottimali. Nelle palazzine periferiche, bagni standard anni '80.", // [IPOTESI]

    caratteristicheCucine:
      "Nelle abitazioni storiche del centro, cucine spesso ricavate in ambienti non originariamente destinati a tale uso. Nelle palazzine, cucine standard separate.", // [IPOTESI]

    faq: [
      {
        domanda:
          "Ho un appartamento nel centro storico di Capua. Posso ristrutturare liberamente gli interni?",
        risposta:
          "In linea generale, gli interventi interni (bagno, cucina, rivestimenti) non soggetti a modifiche strutturali sono liberi da vincoli della Soprintendenza, che interviene principalmente sulle facciate e sugli elementi storico-architettonici. Una CILA è di solito sufficiente per lavori di manutenzione straordinaria interna. È sempre consigliabile una verifica preventiva con il Comune prima di iniziare.",
      },
      {
        domanda:
          "Ho umidità diffusa in un appartamento storico a Capua vicino al Volturno. Come la gestisco?",
        risposta:
          "L'umidità negli edifici storici vicino al Volturno può avere più cause: risalita capillare dai muri, infiltrazioni da falde acquifere superficiali, condensa da scarsa ventilazione. Trattarla con interventi superficiali (nuovi rivestimenti, pittura antimuffa) non risolve il problema alla radice. Il sopralluogo permette di identificare la causa e progettare l'intervento corretto.",
      },
      {
        domanda: "Quanto costa ristrutturare un bagno a Capua?",
        risposta:
          "Le stime orientative basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Negli edifici storici con impianti d'epoca, il costo tende al limite superiore. Il sopralluogo gratuito chiarisce la situazione specifica.",
      },
    ],

    vicini: ["santa-maria-capua-vetere", "caserta", "marcianise"],
  },

  {
    slug: "casagiove",
    nome: "Casagiove",
    provincia: "caserta",
    zona: "caserta",

    metaTitle: "Ristrutturazione Casa a Casagiove | Costi e Preventivi",
    metaDescription:
      "Ristrutturazione a Casagiove: costi orientativi da Prezzario Campania, criticità locali e stima gratuita.",

    // [IPOTESI] Comune residenziale benestante vicino Caserta
    descrizione:
      "Casagiove è un comune residenziale adiacente a Caserta, con un tenore abitativo mediamente più elevato rispetto agli altri comuni della zona. Il tessuto edilizio comprende villette e palazzine di qualità costruttiva superiore alla media, edificate tra gli anni '80 e i primi anni 2000.",

    tipoEdilizio:
      "Villette unifamiliari e palazzine di qualità medio-alta anni '80-2000; alcuni condomini degli anni '70 nel centro",

    criticalita: [
      "Umidità di risalita nelle abitazioni di piano terra, anche in costruzioni di qualità",
      "Impianti idrici in acciaio zincato nelle palazzine degli anni '70-'80",
      "Abusi edilizi nelle zone di espansione privata degli anni '90",
      "Coperture piane delle villette anni '80: guaine esaurite da sostituire",
    ],

    caratteristicheBagni:
      "Bagni di dimensioni standard o superiori nelle villette, spesso con doppio bagno. Sanitari degli anni '80-'90 ancora in uso ma da aggiornare esteticamente e impiantisticamente.", // [IPOTESI]

    caratteristicheCucine:
      "Cucine ampie nelle villette, spesso già oggetto di un primo rifacimento parziale. Frequente richiesta di apertura verso il soggiorno.", // [IPOTESI]

    faq: [
      {
        domanda: "Quanto costa ristrutturare un bagno a Casagiove?",
        risposta:
          "Le stime orientative basate sul Prezzario Regionale Campania per un bagno 6-8 mq (tipico delle villette di Casagiove) vanno da circa 5.500 € (base) a 11.000 € (premium). Il costo preciso dipende dall'entità dell'intervento e dallo stato degli impianti, che emergono al sopralluogo.",
      },
      {
        domanda:
          "Ho una villetta degli anni '90 a Casagiove con doppio bagno. Conviene rifare entrambi insieme?",
        risposta:
          "In molti casi sì: l'impresa è già mobilizzata, i ponteggi interni sono installati, la logistica è organizzata. Il costo marginale del secondo bagno in contemporanea è significativamente inferiore rispetto a due interventi separati. Durante il sopralluogo valutiamo lo stato di entrambi e forniamo un preventivo separato per ognuno e uno combinato, così si può decidere con i numeri in mano.",
      },
    ],

    vicini: ["caserta", "recale", "san-prisco"],
  },
];

// ─────────────────────────────────────────────
// EXPORT AGGREGATO
// ─────────────────────────────────────────────

export const comuni: Comune[] = [
  ...comuniAgroAversano,
  ...comuniNapoli,
  ...comuniCaserta,
];

export function getComuneBySlug(slug: string): Comune | undefined {
  return comuni.find((c) => c.slug === slug);
}

export function getComuniByZona(
  zona: "napoli" | "caserta" | "agro-aversano"
): Comune[] {
  return comuni.filter((c) => c.zona === zona);
}
