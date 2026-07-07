// data/comuni.ts
// Aggiornato con contenuti differenziati per tutti i 33 comuni
// Legenda: [REALE] = dato confermato | [IPOTESI] = su base urbanistica/storica, da verificare

export interface ComuneFaq {
  domanda: string;
  risposta: string;
}

export interface Comune {
  slug: string;
  nome: string;
  provincia: "napoli" | "caserta";
  zona: "napoli" | "caserta" | "agro-aversano";
  metaTitle: string;
  metaDescription: string;
  descrizione: string;
  tipoEdilizio: string;
  criticalita: string[];
  caratteristicheBagni: string;
  caratteristicheCucine: string;
  faq: ComuneFaq[];
  // FAQ specifiche per pagina servizio — se assenti, le pagine usano faq[] come fallback
  faqBagno?: ComuneFaq[];
  faqCucina?: ComuneFaq[];
  faqAppartamento?: ComuneFaq[];
  vicini: string[];
  immagine?: string;
  seoSections?: { title: string; text: string; afterTableText?: string }[];
}

// ─────────────────────────────────────────────
// ZONA: AGRO AVERSANO (14 comuni)
// ─────────────────────────────────────────────

export const comuniAgroAversano: Comune[] = [
  {
    slug: "aversa",
    nome: "Aversa",
    provincia: "caserta",
    zona: "agro-aversano",
    metaTitle: "Ristrutturazione Casa ad Aversa | Costi reali e preventivo",
    metaDescription: "Ristrutturazione ad Aversa: costi reali, criticità del centro storico e delle palazzine anni '60-'70. Preventivo online immediato. Il preventivo definitivo richiede sopralluogo e verifica tecnica.",
    descrizione: "Aversa è il comune più popoloso dell'Agro Aversano, con un centro storico di origine normanna sottoposto a vincoli della Soprintendenza e un'ampia corona di espansione residenziale sviluppata tra gli anni '70 e i primi anni 2000. Questa doppia natura rende ogni intervento edilizio potenzialmente soggetto a iter autorizzativi differenti a seconda della zona.",
    tipoEdilizio: "Palazzi storici anni '50-'70 nel centro (alcuni con vincolo Soprintendenza), villette unifamiliari e case a schiera nelle zone di espansione anni '80-'00",
    criticalita: [
      "Canne fumarie in amianto negli edifici condominiali anni '60-'70: rimozione obbligatoria prima di qualsiasi intervento su cucine e bagni",
      "Abusi edilizi non condonati frequenti nelle zone di espansione: necessaria verifica catastale prima del sopralluogo",
      "Centro storico soggetto a vincolo paesaggistico e monumentale: alcune lavorazioni richiedono autorizzazione preventiva della Soprintendenza",
      "Umidità di risalita diffusa nei piani terra e seminterrati dei palazzi storici, spesso mascherata da interventi superficiali precedenti",
    ],
    caratteristicheBagni: "Bagni prevalentemente sotto i 6 mq con vasca da bagno degli anni '80-'90, spesso già oggetto di un primo rifacimento parziale non a norma. Nelle abitazioni del centro storico, impianti idrici in piombo ancora presenti nei condomini più vecchi.",
    caratteristicheCucine: "Cucine separate dal soggiorno, dimensioni medie 10-14 mq. Nelle palazzine anni '70, frequente presenza di cappa esterna non a norma collegata a canna fumaria in amianto.",
    faq: [
      {
        domanda: "Devo chiedere permessi per ristrutturare il bagno in un palazzo del centro storico di Aversa?",
        risposta: "Dipende dall'intervento. La sostituzione di sanitari e rivestimenti interni non richiede permessi. Se l'intervento tocca impianti o modifica la distribuzione degli spazi interni, serve almeno una CILA. In zona vincolata dalla Soprintendenza, qualsiasi intervento esterno richiede autorizzazione specifica. Il nostro tecnico verifica la situazione urbanistica prima del preventivo.",
      },
      {
        domanda: "Nel mio palazzo c'è ancora la canna fumaria in amianto. Cosa succede se rifaccio la cucina?",
        risposta: "Se la canna fumaria è in amianto, prima di installare una nuova cappa è obbligatorio procedere alla bonifica o all'incapsulamento, da eseguire da una ditta specializzata certificata. Il costo di bonifica va considerato nel preventivo complessivo. Non è possibile aggirare questo passaggio: le ditte serie non agganciano nuovi impianti a canne in amianto non bonificate.",
      },
      {
        domanda: "Ho un abuso edilizio non condonato. Posso ristrutturare lo stesso?",
        risposta: "Tecnicamente sì, se l'abuso riguarda parti diverse da quelle da ristrutturare. Nella pratica, prima di qualsiasi intervento soggetto a CILA o permesso di costruire, il Comune verifica la regolarità urbanistica. Un abuso pendente può bloccare l'iter. È consigliabile un confronto con un tecnico prima di procedere.",
      },
      {
        domanda: "Quanto tempo richiede la ristrutturazione di un bagno ad Aversa?",
        risposta: "Un bagno standard (4-6 mq) con sostituzione completa di sanitari, rivestimenti e impianti richiede mediamente 2-3 settimane lavorative. Se si aggiunge la bonifica dell'amianto o modifiche agli impianti condominiali, i tempi si allungano. I tempi definitivi emergono dal sopralluogo.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno ad Aversa?",
        risposta: "In base al Prezzario Regionale Campania, un bagno standard (4-6 mq) con rifacimento completo di impianti, rivestimenti e sanitari ha un costo indicativo tra 5.000 € (finitura base) e 13.000 € (finitura premium). Nelle palazzine del centro storico anni '60-'70 con tubazioni originali, il costo tende al limite superiore perché quasi sempre vanno sostituite le tubazioni in piombo. Il dato definitivo emerge solo dal sopralluogo.",
      },
      {
        domanda: "Devo chiedere permessi per ristrutturare il bagno ad Aversa?",
        risposta: "Per la sola sostituzione di sanitari e rivestimenti senza toccare impianti o tramezzi, non serve alcun permesso. Se sposti impianti o demolisci tramezzi serve una CILA da presentare al Comune di Aversa prima dell'inizio lavori. In zona vincolata dalla Soprintendenza (centro storico normanno), qualsiasi intervento sulla facciata richiede autorizzazione specifica, ma i lavori interni sono generalmente liberi.",
      },
      {
        domanda: "Quanto tempo dura la ristrutturazione di un bagno ad Aversa?",
        risposta: "Per un bagno di 4-6 mq con rifacimento completo, la sequenza standard è: demolizione (2-3 gg) → impermeabilizzazione e attesa (2 gg) → posa rivestimenti (3-5 gg) → impianti (2 gg) → montaggio sanitari e rifiniture (2 gg). Totale: 2-3 settimane. Si allunga se è necessaria bonifica amianto sulle canne fumarie condominiali.",
      },
      {
        domanda: "Posso usare il Bonus 50% per il bagno ad Aversa?",
        risposta: "Sì. La detrazione IRPEF al 50% si applica al rifacimento completo del bagno con sostituzione degli impianti, classificato come manutenzione straordinaria. Servono pagamenti con bonifico parlante e fatture in regola. Il nostro ufficio gestisce la documentazione necessaria.",
      },
      {
        domanda: "Nel palazzo del centro storico di Aversa c'è amianto nelle canne fumarie. Cosa implica per il bagno?",
        risposta: "La canna fumaria in amianto riguarda direttamente la cucina (cappa), non il bagno. Per il bagno l'amianto può essere presente in altri elementi: guaine di isolamento delle tubazioni, lastre di copertura in alcuni casi. Al sopralluogo verifichiamo la situazione specifica. La bonifica va eseguita da ditta certificata con notifica all'ASL prima dell'inizio lavori.",
      },
    ],
    faqCucina: [
      {
        domanda: "Quanto costa ristrutturare la cucina ad Aversa?",
        risposta: "In base al Prezzario Regionale Campania, per una cucina di 10-14 mq (tipica delle palazzine aversane) il costo indicativo va da 6.500 € (finitura base) a 19.000 € (finitura premium con mobili su misura). Il fattore che incide di più è la canna fumaria: se è in amianto, la bonifica obbligatoria prima dell'installazione della nuova cappa aggiunge 800-2.500 € al preventivo.",
      },
      {
        domanda: "La canna fumaria del palazzo è in amianto. Posso fare la cucina lo stesso?",
        risposta: "Non è possibile collegare una nuova cappa a una canna fumaria in amianto senza bonifica preventiva. La bonifica va affidata a una ditta specializzata certificata (non noi — è un'attività separata), con notifica all'ASL e smaltimento in discarica autorizzata. Solo dopo la bonifica installare la nuova cappa è legale e sicuro. Il costo di bonifica va calcolato separatamente dal preventivo cucina.",
      },
      {
        domanda: "Posso aprire la cucina sul soggiorno nel mio appartamento ad Aversa?",
        risposta: "Dipende dal muro. Se è una tramezza non portante, serve solo una CILA e l'intervento è rapido. Se è un muro portante, servono il progetto di un ingegnere strutturale, una trave di sostegno e il permesso di costruire. Il nostro sopralluogo include la verifica della natura del muro prima di qualsiasi preventivo.",
      },
    ],
    vicini: ["lusciano", "carinaro", "teverola", "trentola-ducenta", "succivo"],
    seoSections: [
      {
        title: "Costo Ristrutturazione Aversa",
        text: "Il costo di una ristrutturazione ad Aversa parte da 550 €/mq per interventi completi nelle condizioni più semplici, ma il prezzo reale cambia molto in base al tipo di edificio e allo stato di partenza. Nel centro storico normanno pesano di più impianti datati, vincoli, umidità e lavorazioni da impostare con attenzione; nelle aree di espansione incidono invece la qualità costruttiva, la regolarità urbanistica e l'eventuale necessità di adeguare vecchie soluzioni impiantistiche. Per questo una stima seria non può essere generica. Su RistrutturazionePreventivi.it puoi richiedere un preventivo immediato e gratuito, costruito sulle caratteristiche concrete della tua casa.",
      },
      {
        title: "Impresa di Ristrutturazioni ad Aversa",
        text: "Scegliere un'impresa di ristrutturazioni ad Aversa significa affidare i lavori a un interlocutore capace di leggere bene il contesto del fabbricato. In un comune dove convivono palazzi storici, condomini anni '60-'70 e zone di espansione più recenti, ogni cantiere richiede una sequenza precisa: verifica tecnica iniziale, coordinamento delle opere, gestione degli impianti e chiusura delle finiture senza improvvisazioni. Una regia unica aiuta a contenere tempi, costi e imprevisti, soprattutto quando emergono criticità non visibili a prima vista.",
      },
      {
        title: "Preventivo Ristrutturazione ad Aversa",
        text: "Richiedere un preventivo per ristrutturare casa ad Aversa serve a trasformare un'idea di massima in un quadro economico più concreto. Metratura, stato degli impianti, accessibilità del fabbricato, presenza di canne fumarie da verificare, eventuali interventi su bagno e cucina e livello delle finiture possono cambiare molto il risultato finale. Un preventivo utile non si limita al prezzo, ma mette in evidenza le lavorazioni che incidono davvero sul cantiere. Su RistrutturazionePreventivi.it il preventivo è immediato e gratuito, con conferma finale dopo sopralluogo tecnico.",
      },
    ],
  },

  {
    slug: "lusciano",
    nome: "Lusciano",
    provincia: "caserta",
    zona: "agro-aversano",
    metaTitle: "Ristrutturazione Casa a Lusciano | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Lusciano: interventi su villette anni '80-'90, PEEP comunali e palazzine. Preventivo online immediato. Il preventivo definitivo richiede sopralluogo tecnico.",
    descrizione: "Lusciano è un comune a prevalente carattere residenziale, sviluppatosi principalmente tra gli anni '80 e i primi anni 2000 con un mix di villette unifamiliari, case a schiera e alcuni piani di edilizia economica popolare (PEEP). Il centro più antico conserva un nucleo di palazzi anni '50-'60, mentre la periferia è quasi interamente composta da edilizia privata recente.",
    tipoEdilizio: "Villette unifamiliari e case a schiera anni '80-'00 nella zona di espansione; PEEP comunali anni '80 in alcune aree; palazzi anni '50-'60 nel nucleo centrale",
    criticalita: [
      "Umidità di risalita diffusa nelle villette anni '80: fondazioni senza barriera impermeabilizzante, frequente nei piani terra e nei locali interrati",
      "Abusi edilizi nelle zone di espansione privata degli anni '90: verande, locali seminterrati, soppalchi spesso non condonati",
      "Impianti idrici in acciaio zincato nelle abitazioni degli anni '70-'80: corrosione interna che riduce portata e qualità dell'acqua",
      "Canne fumarie in amianto nei condomini più vecchi del centro: rilevamento obbligatorio prima di interventi su cucine",
    ],
    caratteristicheBagni: "Bagni di dimensioni standard (5-7 mq) nelle villette, spesso con vasca da incasso degli anni '80-'90 mai sostituita. Nei PEEP, bagni mono-sanitari sotto i 5 mq con impianti originali da aggiornare.",
    caratteristicheCucine: "Cucine in muratura degli anni '80-'90 con piastrelle a decoro tipiche del periodo. Nelle villette, frequente assenza di cappa a norma o collegamento a canna fumaria non certificata.",
    faq: [
      {
        domanda: "Ho una villetta degli anni '90 a Lusciano con umidità al piano terra. Prima di ristrutturare, cosa devo fare?",
        risposta: "L'umidità di risalita nelle villette anni '90 dell'Agro Aversano è molto comune e va trattata prima di qualsiasi rifinitura. Il nostro sopralluogo include la verifica delle cause (risalita capillare, infiltrazioni da fondazione, condensa). Il trattamento corretto dipende dall'origine: fare le rifiniture prima di risolvere l'umidità significa rifare tutto a distanza di 2-3 anni.",
      },
      {
        domanda: "Posso usare il Bonus Ristrutturazione 50% per il rifacimento del bagno nella mia villetta a Lusciano?",
        risposta: "Sì, la detrazione IRPEF al 50% si applica agli interventi di manutenzione straordinaria sugli immobili residenziali, incluso il rifacimento completo del bagno con sostituzione di impianti. Sono necessari: pagamenti tracciati (bonifico parlante), fatture in regola, e per alcuni interventi una CILA. Il nostro ufficio amministrativo supporta la gestione della pratica.",
      },
      {
        domanda: "Quanto costa rifare completamente un bagno in un PEEP di Lusciano?",
        risposta: "Un bagno in un appartamento PEEP è tipicamente sotto i 5 mq, il che lo rende uno degli interventi più intensivi in termini di costo per metro quadro. In base al Prezzario Regionale Campania, i costi orientativi partono da circa 4.500-5.500 € per una finitura base, fino a 7.000-9.000 € per una finitura premium con impianti completamente rinnovati.",
      },
      {
        domanda: "Quanto tempo ci vuole per ristrutturare un bagno a Lusciano?",
        risposta: "Per un bagno standard (5-6 mq) con sostituzione completa di sanitari, rivestimenti e impianti, mediamente 2-3 settimane lavorative. Se si aggiungono lavori strutturali o la bonifica di impianti obsoleti, i tempi si allungano. Il cantiere viene organizzato per ridurre i giorni senza bagno funzionante.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Lusciano?",
        risposta: "In base al Prezzario Regionale Campania, per un bagno standard (5-7 mq) nelle villette di Lusciano il costo indicativo va da 5.000 € (finitura base) a 13.000 € (finitura premium). Per i bagni nei PEEP comunali, più piccoli (sotto i 5 mq), la forbice è 4.500-9.000 €. Le tubazioni in acciaio zincato, frequenti nelle costruzioni anni '70-'80, vanno quasi sempre sostituite e incidono sul costo finale.",
      },
      {
        domanda: "Ho una villetta anni '80 a Lusciano con umidità al bagno. Prima di rifare le piastrelle cosa devo fare?",
        risposta: "L'umidità va affrontata prima di qualsiasi rifinitura, altrimenti le nuove piastrelle si staccano o si formano muffe nel giro di uno-due anni. Al sopralluogo il nostro tecnico identifica l'origine: risalita capillare dai muri, infiltrazioni da fondazione o condensa da ventilazione insufficiente. La soluzione dipende dalla causa — ogni caso è diverso.",
      },
      {
        domanda: "Quanto tempo ci vuole per rifare il bagno nella mia villetta a Lusciano?",
        risposta: "Un bagno di 5-7 mq con rifacimento completo richiede mediamente 2-3 settimane lavorative dalla demolizione alla rifinitura finale. Siamo basati a Lusciano, il che significa trasferte rapide e cantiere efficiente. Se la villetta ha un secondo bagno, il disagio è minimo: lavoriamo sul bagno da rifare mentre l'altro rimane funzionante.",
      },
      {
        domanda: "Conviene fare il bagno e la cucina insieme nella villetta a Lusciano?",
        risposta: "Spesso sì. I costi fissi (trasferta, smaltimento, ponteggi interni) si distribuiscono su due interventi invece di uno. Il risparmio rispetto a due cantieri separati è mediamente del 10-15%. Al sopralluogo presentiamo preventivi separati e combinati: la scelta finale è tua, con i numeri in mano.",
      },
    ],
    seoSections: [
      {
        title: "Costo Ristrutturazione Lusciano",
        text: "Il costo di una ristrutturazione a Lusciano parte da 550 €/mq per interventi completi nelle condizioni più semplici, ma il prezzo reale cambia in base al tipo di immobile e allo stato degli impianti. Nelle villette e nelle case a schiera costruite tra anni '80 e primi 2000 incidono spesso umidità, impermeabilizzazioni, distribuzione interna e aggiornamento impiantistico; negli alloggi più datati pesano invece tubazioni vecchie, finiture superate e verifiche urbanistiche da fare con attenzione. Per questo una valutazione credibile non può essere standard. Su RistrutturazionePreventivi.it puoi richiedere un preventivo immediato e gratuito, costruito sulle caratteristiche concrete della tua casa.",
      },
      {
        title: "Impresa di Ristrutturazioni a Lusciano",
        text: "Affidarsi a un'impresa di ristrutturazioni a Lusciano significa organizzare i lavori con un metodo preciso, soprattutto in un contesto fatto di villette, piccoli condomini e fabbricati residenziali cresciuti per fasi successive. In questi casi contano molto il controllo iniziale dello stato reale dell'immobile, il coordinamento tra demolizioni, impianti e finiture e la capacità di prevenire problemi che emergono solo a cantiere aperto. Una gestione unica aiuta a ridurre tempi morti, errori esecutivi e costi non previsti.",
      },
      {
        title: "Preventivo Ristrutturazione a Lusciano",
        text: "Richiedere un preventivo per ristrutturare casa a Lusciano serve a trasformare una stima generica in un quadro economico più affidabile, legato davvero alla tipologia dell'immobile. In una zona dove sono frequenti villette, abitazioni ampliate nel tempo e immobili con distribuzioni interne poco ottimizzate, incidono molto lo stato degli impianti, le opere da demolire, l'accessibilità del cantiere e il livello delle finiture richieste. Un preventivo utile deve chiarire subito cosa pesa davvero sul costo e quali lavorazioni vanno verificate prima di iniziare. Su RistrutturazionePreventivi.it il preventivo è immediato e gratuito, con conferma finale dopo sopralluogo tecnico.",
      },
    ],
    vicini: ["aversa", "carinaro", "teverola", "gricignano-di-aversa"],
  },

  {
    slug: "carinaro",
    nome: "Carinaro",
    provincia: "caserta",
    zona: "agro-aversano",
    metaTitle: "Ristrutturazione Casa a Carinaro | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Carinaro: costi reali per villette e palazzine. Criticità locali e preventivo online immediato. Il preventivo definitivo richiede sopralluogo tecnico.",
    descrizione: "Carinaro è un piccolo comune residenziale dell'Agro Aversano, con un tessuto edilizio composto prevalentemente da villette unifamiliari e case a schiera edificate tra gli anni '80 e i primi anni 2000. Il centro storico è contenuto, con alcune palazzine degli anni '60-'70.",
    tipoEdilizio: "Prevalenza di villette anni '80-'00 e case a schiera; nucleo centrale con palazzine anni '60-'70",
    criticalita: [
      "Umidità di risalita nei piani terra delle villette anni '80, comune in tutta la zona",
      "Abusi edilizi non condonati nelle espansioni private degli anni '90",
      "Impianti idrici vetusti nelle palazzine del centro anni '60-'70",
      "Coperture con guaine bituminose di prima generazione, spesso non più impermeabili nelle abitazioni con più di 25 anni",
    ],
    caratteristicheBagni: "Bagni standard 5-7 mq con sanitari e rivestimenti degli anni '80-'90. Nelle case a schiera più recenti, bagni già oggetto di primo rifacimento parziale non a norma.",
    caratteristicheCucine: "Cucine separate dal soggiorno, dimensioni medie. Frequente presenza di cucine in muratura degli anni '90 da demolire e ricostruire.",
    faq: [
      {
        domanda: "Quali permessi servono per ristrutturare un bagno a Carinaro?",
        risposta: "Per la sostituzione di sanitari e rivestimenti senza modificare la distribuzione degli spazi, nessun permesso. Se si spostano impianti o si modificano le tramezzature, serve una CILA da presentare al Comune di Carinaro prima dell'inizio lavori. Il nostro tecnico valuta la situazione specifica al sopralluogo.",
      },
      {
        domanda: "Ho una villetta anni '90 a Carinaro. Come capisco se c'è amianto prima di ristrutturare?",
        risposta: "L'amianto nelle villette degli anni '90 è meno comune rispetto ai condomini anni '60-'70, ma può essere presente in canne fumarie, lastre di copertura o guaine di isolamento. Un'ispezione visiva da parte di un tecnico esperto è il primo passo. In caso di dubbio, è possibile richiedere un'analisi campione certificata prima dell'inizio lavori.",
      },
      {
        domanda: "Quanto costa ristrutturare la cucina a Carinaro?",
        risposta: "In base al Prezzario Regionale Campania, per una cucina di 10-14 mq (tipica delle villette e case a schiera di Carinaro) il costo indicativo va da 6.500 € (finitura base) a 19.000 € (finitura premium con mobili su misura). Il fattore che incide di più è la canna fumaria: se è in amianto, la bonifica obbligatoria prima dell'installazione della nuova cappa aggiunge 800-2.500 € al preventivo.",
      },
      {
        domanda: "Conviene sostituire anche i pavimenti del bagno oppure tenerli?",
        risposta: "Dipende dalle condizioni e dal tipo di posa. Se i pavimenti sono in buone condizioni, a volte è possibile posare il nuovo sopra il vecchio (sovrapposa) risparmiando su demolizione e smaltimento. Se ci sono problemi di umidità, rigonfiamenti o il pavimento è in vinile anni '80, la rimozione completa è necessaria. Lo valutiamo al sopralluogo insieme a te.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Carinaro?",
        risposta: "In base al Prezzario Regionale Campania, per un bagno standard (5-7 mq) nelle villette di Carinaro la forbice indicativa è 5.000-13.000 €. Le case a schiera degli anni '90 con bagni già parzialmente rifatti una volta richiedono spesso la rimozione dei vecchi rivestimenti sovrapposti prima della nuova posa, il che allunga i tempi e incide sul costo.",
      },
      {
        domanda: "Ho una villetta anni '90 a Carinaro con un bagno già ristrutturato male. Conviene rifare tutto da zero?",
        risposta: "Una ristrutturazione parziale mal eseguita è uno dei casi in cui conviene quasi sempre rifare dall'inizio: sotto i rivestimenti sovrapposti mancano quasi sempre l'impermeabilizzazione a norma e l'adeguamento degli impianti. Rifare solo la superficie è un risparmio apparente che costringe a riaprire tutto tra pochi anni. Al sopralluogo valutiamo cosa è recuperabile.",
      },
      {
        domanda: "Serve la CILA per rifare il bagno a Carinaro?",
        risposta: "Solo se sposti impianti o demolisci/ricostruisci tramezzi. La sostituzione di sanitari, rivestimenti e rubinetteria nella stessa posizione è manutenzione ordinaria: nessuna pratica. Il nostro tecnico chiarisce al sopralluogo cosa richiede il tuo intervento specifico.",
      },
    ],
    vicini: ["aversa", "lusciano", "teverola", "gricignano-di-aversa"],
  },

  {
    slug: "teverola",
    nome: "Teverola",
    provincia: "caserta",
    zona: "agro-aversano",
    metaTitle: "Ristrutturazione Casa a Teverola | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Teverola: interventi su villette e palazzine, costi reali basati sul Prezzario Campania. Preventivo online immediato. Il preventivo definitivo richiede sopralluogo e verifica tecnica.",
    descrizione: "Teverola è un comune con vocazione mista residenziale e produttiva, situato lungo la SS7bis. Il tessuto abitativo è composto da villette e palazzine di diverse epoche, con una parte centrale più densa e zone periferiche a edilizia sparsa.",
    tipoEdilizio: "Mix di villette anni '80-'00 e palazzine anni '70; presenza di edilizia residenziale lungo le arterie principali",
    criticalita: [
      "Vibrazioni da traffico pesante sulla SS7bis: crepe e lesioni nei muri perimetrali nelle abitazioni prossime alla strada",
      "Umidità di risalita e infiltrazioni nei piani terra",
      "Abusi edilizi da regolarizzare frequenti nelle zone di espansione",
      "Canne fumarie in amianto nei condomini degli anni '70",
    ],
    caratteristicheBagni: "Bagni standard con sanitari anni '80-'90, spesso con vasca da bagno. Nelle palazzine più vecchie, impianti idrici da sostituire integralmente.",
    caratteristicheCucine: "Cucine separate, medie dimensioni. Nelle abitazioni lungo le strade principali, frequente necessità di miglioramento dell'isolamento acustico durante i lavori.",
    faq: [
      {
        domanda: "Ho delle crepe nei muri di casa a Teverola. Devo preoccuparmi prima di ristrutturare?",
        risposta: "Le crepe vanno sempre valutate prima di qualsiasi lavoro di rifinitura. Le lesioni superficiali (fessure nei rivestimenti, stacco di intonaco) sono spesso legate ad assestamenti normali. Le crepe passanti nei muri portanti o in diagonale agli angoli delle aperture richiedono una valutazione strutturale. Procedere con le rifiniture senza risolvere le cause significa rifare tutto a distanza di pochi anni.",
      },
      {
        domanda: "Posso usare il Bonus 50% per ristrutturare il bagno a Teverola?",
        risposta: "Sì, la detrazione IRPEF al 50% si applica agli interventi di manutenzione straordinaria su immobili residenziali, compreso il rifacimento completo del bagno. Sono necessari pagamenti con bonifico parlante e fatture in regola. Per interventi che richiedono CILA, va presentata prima dell'inizio lavori.",
      },
      {
        domanda: "Quanto costa ristrutturare la cucina a Teverola?",
        risposta: "In base al Prezzario Regionale Campania, per una cucina di 10-14 mq nelle palazzine di Teverola il costo indicativo va da 6.500 € (finitura base) a 19.000 € (finitura premium con mobili su misura). Il dato preciso dipende dallo stato degli impianti esistenti, dalla canna fumaria e da eventuali opere murarie, che si valutano al sopralluogo.",
      },
      {
        domanda: "Vivo vicino alla SS7bis e ho problemi di rumore. Posso migliorare l'isolamento acustico durante la ristrutturazione?",
        risposta: "Sì, la ristrutturazione è il momento ideale per intervenire sull'isolamento acustico. Le soluzioni più efficaci sono la sostituzione dei serramenti con doppi o tripli vetri, il miglioramento dell'isolamento delle pareti perimetrali, e in alcuni casi l'installazione di contropareti. Il costo dipende dall'estensione dell'intervento e viene incluso nel preventivo complessivo.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Teverola?",
        risposta: "In base al Prezzario Regionale Campania, per un bagno standard (5-6 mq) la forbice indicativa è 5.000-9.500 €. Nelle palazzine anni '70 lungo le arterie principali, le tubazioni in acciaio zincato sono quasi sempre da sostituire integralmente, il che porta il costo verso il limite superiore.",
      },
      {
        domanda: "Ho crepe nei muri del bagno causate dal traffico sulla SS7bis. Prima di rifare le piastrelle cosa faccio?",
        risposta: "Le crepe da vibrazione nel bagno vanno trattate prima della nuova posa. Se sono solo superficiali (nell'intonaco o nella fuga), si trattano con stucco elastico. Se attraversano il muro, serve una valutazione strutturale prima di procedere con qualsiasi rifinitura. Rivestire sopra una lesione attiva la fa ricomparire in pochi mesi.",
      },
      {
        domanda: "Quanto tempo dura la ristrutturazione di un bagno a Teverola?",
        risposta: "Per un bagno di 5-6 mq con rifacimento completo, mediamente 2-3 settimane lavorative. Nelle palazzine anni '70 con impianti originali da sostituire integralmente, si aggiungono 2-3 giorni per le tracce degli impianti. I tempi definitivi emergono dal sopralluogo.",
      },
    ],
    seoSections: [
      {
        title: "Costo Ristrutturazione Teverola",
        text: "Il costo di una ristrutturazione a Teverola parte da 550 €/mq per interventi completi nelle condizioni più semplici, ma il prezzo reale varia in base all'età dell'immobile, allo stato degli impianti e alla vicinanza alla SS7bis. Nelle villette e nelle palazzine anni '70-'90 incidono spesso crepe da vibrazione, umidità, rifacimento dei bagni e aggiornamento impiantistico; nelle zone più recenti pesano distribuzione interna e finiture da adeguare. Per questo una stima attendibile richiede sempre una verifica sul posto. Su RistrutturazionePreventivi.it puoi richiedere un preventivo immediato e gratuito, costruito sulle caratteristiche concrete della tua casa.",
      },
      {
        title: "Impresa di Ristrutturazioni a Teverola",
        text: "Scegliere un'impresa di ristrutturazioni a Teverola significa lavorare con attenzione su edifici molto diversi tra loro, dai nuclei più datati alle espansioni residenziali lungo le arterie principali. Qui servono controllo tecnico iniziale, organizzazione precisa delle lavorazioni e una gestione ordinata di demolizioni, impianti e finiture, soprattutto quando ci sono criticità strutturali o acustiche da affrontare prima della parte estetica. Una regia unica aiuta a evitare ritardi, rifacimenti e costi imprevisti.",
      },
      {
        title: "Preventivo Ristrutturazione a Teverola",
        text: "Richiedere un preventivo per ristrutturare casa a Teverola è il modo più utile per capire quali lavorazioni incidono davvero sul costo finale e quali verifiche vanno fatte prima di aprire il cantiere. In un contesto dove possono pesare crepe da vibrazione, impianti datati, distribuzioni interne poco funzionali e rifacimento completo di bagno o cucina, una stima generica non basta a orientare bene la spesa. Un preventivo fatto seriamente deve chiarire priorità, opere necessarie e possibili criticità tecniche ancora prima delle finiture. Su RistrutturazionePreventivi.it il preventivo è immediato e gratuito, con conferma finale dopo sopralluogo tecnico.",
      },
    ],
    vicini: ["aversa", "lusciano", "carinaro", "gricignano-di-aversa"],
  },

  {
    slug: "gricignano-di-aversa",
    nome: "Gricignano di Aversa",
    provincia: "caserta",
    zona: "agro-aversano",
    metaTitle: "Ristrutturazione Casa a Gricignano di Aversa | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Gricignano di Aversa: costi reali, criticità edilizie e preventivo online immediato.",
    descrizione: "Gricignano di Aversa è un comune di dimensioni ridotte con un tessuto edilizio misto, composto da un nucleo storico e zone di espansione residenziale sviluppate tra gli anni '70 e i primi anni 2000. La presenza della base militare statunitense (USAF) ha caratterizzato storicamente il comune.",
    tipoEdilizio: "Nucleo storico con palazzine anni '50-'70; espansione con villette e case a schiera anni '80-'00",
    criticalita: [
      "Umidità di risalita nelle abitazioni più datate del nucleo storico",
      "Canne fumarie in amianto nei condomini anni '60-'70",
      "Abusi edilizi non condonati nelle zone di espansione privata",
      "Impianti idrici vetusti nelle palazzine degli anni '60-'70",
    ],
    caratteristicheBagni: "Bagni standard nelle villette (5-7 mq); più compatti nelle palazzine storiche. Sanitari degli anni '80-'90 frequentemente da sostituire integralmente.",
    caratteristicheCucine: "Cucine separate, medie dimensioni. Nelle palazzine più vecchie, verifica obbligatoria della canna fumaria prima di interventi.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a Gricignano di Aversa?",
        risposta: "In base al Prezzario Regionale Campania, i costi orientativi per un bagno di 5-6 mq con rifacimento completo vanno da circa 5.000 € (base) a 9.500 € (premium). Nelle palazzine degli anni '60-'70 con impianti originali, il costo tende al limite superiore.",
      },
      {
        domanda: "Quanti giorni devo restare senza bagno durante la ristrutturazione?",
        risposta: "Con un'organizzazione del cantiere ben pianificata, i giorni senza bagno funzionante si riducono a 3-5 giorni (fase demolizione e impermeabilizzazione). Pianifichiamo sempre il cantiere per minimizzare il disagio: se in casa c'è un secondo bagno, questo non è un problema. Se è l'unico bagno, organizziamo i lavori in modo da renderlo parzialmente funzionante il prima possibile.",
      },
      {
        domanda: "Come faccio a sapere se i miei impianti idrici vanno sostituiti durante la ristrutturazione del bagno?",
        risposta: "I segnali evidenti sono: pressione bassa, acqua color ruggine all'apertura del rubinetto, perdite frequenti ai raccordi. Ma spesso le tubazioni in acciaio zincato sembrano ok dall'esterno e sono deteriorate internamente. Al sopralluogo verifichiamo lo stato delle tubazioni accessibili e ti diciamo chiaramente cosa conviene sostituire e cosa può essere mantenuto.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Gricignano di Aversa?",
        risposta: "In base al Prezzario Regionale Campania, per un bagno standard (5-7 mq) nelle villette la forbice indicativa è 5.000-13.000 €. Nelle palazzine storiche del nucleo più antico con impianti originali, il costo tende al limite superiore per via della sostituzione integrale degli impianti idrici.",
      },
      {
        domanda: "La base USAF vicina ha influenzato il tipo di costruzioni a Gricignano? Cambia qualcosa per la ristrutturazione?",
        risposta: "Le costruzioni residenziali attorno alla base sono prevalentemente villette e palazzine standard degli anni '70-'00, non diverse dalle abitazioni dei comuni limitrofi. Non ci sono particolari vincoli edilizi per i residenti. L'unica specificità è la presenza di alcune abitazioni costruite in periodi di forte domanda locativa che possono presentare qualità costruttiva variabile.",
      },
      {
        domanda: "Quanto tempo devo stare senza bagno durante i lavori a Gricignano?",
        risposta: "Con una pianificazione ottimale del cantiere, i giorni senza bagno funzionante sono 3-5 (fase di demolizione e impermeabilizzazione). Se la villetta ha un secondo bagno, il disagio è nullo. Organizziamo sempre il cantiere per ridurre al minimo l'impatto sulla vita quotidiana.",
      },
    ],
    seoSections: [
      {
        title: "Costo Ristrutturazione Gricignano di Aversa",
        text: "Il costo di una ristrutturazione a Gricignano di Aversa parte da 550 €/mq per interventi completi nelle condizioni più semplici, ma il prezzo reale cambia in base al tipo di abitazione, allo stato degli impianti e alle criticità del fabbricato. Nelle villette e nelle case a schiera delle espansioni residenziali incidono spesso umidità, finiture superate e verifiche urbanistiche; nel nucleo più datato pesano invece impianti vecchi, canne fumarie da controllare e lavorazioni da impostare con più attenzione. Per questo una stima attendibile non può essere standard. Su RistrutturazionePreventivi.it puoi richiedere un preventivo immediato e gratuito, costruito sulle caratteristiche concrete della tua casa.",
      },
      {
        title: "Impresa di Ristrutturazioni a Gricignano di Aversa",
        text: "Affidarsi a un'impresa di ristrutturazioni a Gricignano di Aversa significa gestire correttamente lavori su immobili diversi tra loro, dal tessuto più storico alle espansioni costruite tra anni '80 e 2000. In questi contesti contano molto il controllo tecnico iniziale, la verifica degli impianti esistenti, il coordinamento delle opere e una sequenza ordinata di demolizioni, adeguamenti e finiture. Una gestione unica riduce errori, tempi morti e costi imprevisti durante il cantiere.",
      },
      {
        title: "Preventivo Ristrutturazione a Gricignano di Aversa",
        text: "Richiedere un preventivo per ristrutturare casa a Gricignano di Aversa è il modo più concreto per capire come si compone davvero la spesa prima di iniziare. In un comune dove convivono villette, case a schiera e abitazioni più datate, il costo dipende spesso da impianti da rifare, bagno e cucina da aggiornare, distribuzioni interne da correggere e criticità tecniche da verificare con attenzione. Un preventivo serio deve mettere in evidenza le priorità, le lavorazioni necessarie e le eventuali incognite del cantiere, così il quadro economico resta leggibile fin dall'inizio. Su RistrutturazionePreventivi.it il preventivo è immediato e gratuito, con conferma finale dopo sopralluogo tecnico.",
      },
    ],
    vicini: ["aversa", "lusciano", "carinaro", "teverola"],
  },

  {
    slug: "trentola-ducenta",
    nome: "Trentola Ducenta",
    provincia: "caserta",
    zona: "agro-aversano",
    metaTitle: "Ristrutturazione Casa a Trentola Ducenta | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Trentola Ducenta: costi reali basati sul Prezzario Campania, criticità locali e preventivo online immediato.",
    descrizione: "Trentola Ducenta è un comune in forte crescita demografica, con un tessuto edilizio che va dalle palazzine degli anni '70 nel centro alle villette e ai nuovi complessi residenziali nelle zone di espansione. La presenza di attività commerciali e artigianali lo rende un comune vivace con una domanda abitativa costante.",
    tipoEdilizio: "Palazzine anni '70-'80 nel centro; villette e case a schiera anni '90-2000 nell'espansione; nuovi complessi residenziali nelle zone periferiche",
    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '70-'80",
      "Umidità di risalita nelle palazzine più datate e nelle villette con fondazioni non impermeabilizzate",
      "Abusi edilizi frequenti nelle zone di espansione privata",
      "Impianti idrici in acciaio zincato negli edifici degli anni '70-'80: sostituzione spesso necessaria durante la ristrutturazione del bagno",
    ],
    caratteristicheBagni: "Bagni di dimensioni variabili: standard nelle villette (5-7 mq), più compatti nelle palazzine anni '70 (sotto i 5 mq). Frequente presenza di vasca da bagno da sostituire con doccia.",
    caratteristicheCucine: "Cucine separate nelle palazzine, cucine più ampie nelle villette. Nelle costruzioni degli anni '80, frequente impianto gas datato da adeguare.",
    faq: [
      {
        domanda: "Ho una palazzina anni '70 a Trentola Ducenta. Cosa include il rifacimento completo del bagno?",
        risposta: "In una palazzina degli anni '70, il rifacimento completo include: demolizione e smaltimento di rivestimenti e sanitari, sostituzione integrale delle tubazioni idriche (quasi certamente in acciaio zincato), nuovo impianto elettrico bagno a norma IP44, impermeabilizzazione, nuovi rivestimenti, nuovi sanitari e rubinetteria. La verifica della canna fumaria è necessaria se ci sono lavori collegati alla cucina.",
      },
      {
        domanda: "Voglio sostituire la vasca con una doccia a Trentola Ducenta. Ci sono particolari criticità?",
        risposta: "La sostituzione vasca-doccia è uno degli interventi più richiesti. I punti da verificare sono: la posizione degli scarichi (se la doccia va in posizione diversa dalla vasca, bisogna rifare le tracce), lo spazio disponibile per il box doccia, e la portata idrica (le docce a pioggia richiedono buona pressione). Al sopralluogo misuriamo tutto e progettiamo la soluzione migliore per il tuo spazio.",
      },
      {
        domanda: "Quanto costa ristrutturare la cucina a Trentola Ducenta?",
        risposta: "In base al Prezzario Regionale Campania, i costi orientativi per un bagno di 5-6 mq con rifacimento completo vanno da circa 5.000 € (base) a 9.500 € (premium). Nelle palazzine anni '70 con impianti originali, il costo reale tende al limite superiore.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Trentola Ducenta?",
        risposta: "In base al Prezzario Regionale Campania, per le palazzine anni '70-'80 del centro (bagni sotto i 5 mq) la forbice è 4.500-9.000 €. Per le villette anni '90-2000 nelle zone di espansione (5-7 mq) la forbice è 5.000-13.000 €. La sostituzione delle tubazioni in acciaio zincato, frequente nelle palazzine più datate, incide sensibilmente sul costo finale.",
      },
      {
        domanda: "Voglio sostituire la vasca con la doccia a Trentola Ducenta. Come funziona?",
        risposta: "La sostituzione vasca-doccia è uno degli interventi più richiesti. I punti chiave da verificare al sopralluogo sono: posizione degli scarichi (se la doccia non è dove era la vasca, bisogna rifare le tracce a pavimento), spazio disponibile per il box, e pressione idrica (le docce a pioggia richiedono almeno 2 bar). Tutto si misura e si progetta durante il sopralluogo.",
      },
      {
        domanda: "Posso usare il Bonus 50% per il bagno a Trentola Ducenta?",
        risposta: "Sì, il rifacimento completo del bagno con sostituzione di impianti rientra nella manutenzione straordinaria detraibile al 50% IRPEF. Servono pagamento con bonifico parlante e fatture in regola. Per interventi che richiedono CILA, la pratica va presentata prima dell'inizio lavori.",
      },
    ],
    seoSections: [
      {
        title: "Costo Ristrutturazione Trentola Ducenta",
        text: "Il costo di una ristrutturazione a Trentola Ducenta parte da 550 €/mq per interventi completi nelle condizioni più semplici, ma il prezzo reale cambia in base al tipo di edificio, all'età degli impianti e alla situazione urbanistica dell'immobile. Nelle palazzine anni '70-'80 incidono spesso tubazioni da sostituire, canne fumarie da verificare e bagni molto compatti; nelle villette e nelle espansioni più recenti pesano invece distribuzione interna, finiture datate e adeguamenti impiantistici. Per questo una stima seria non può essere generica. Su RistrutturazionePreventivi.it puoi richiedere un preventivo immediato e gratuito, costruito sulle caratteristiche concrete della tua casa.",
      },
      {
        title: "Impresa di Ristrutturazioni a Trentola Ducenta",
        text: "Affidarsi a un'impresa di ristrutturazioni a Trentola Ducenta significa coordinare correttamente lavori su immobili molto diversi, dal centro con palazzine più datate alle zone di espansione con villette e complessi residenziali più recenti. In questi contesti contano analisi tecnica iniziale, gestione ordinata di demolizioni, impianti e finiture e capacità di prevenire problemi che emergono solo durante il cantiere. Una regia unica aiuta a contenere tempi, errori esecutivi e costi non previsti.",
      },
      {
        title: "Preventivo Ristrutturazione a Trentola Ducenta",
        text: "Richiedere un preventivo per ristrutturare casa a Trentola Ducenta è il modo più utile per capire fin da subito come si distribuisce la spesa e quali lavori incidono davvero sul costo finale. In un comune con palazzine anni '70-'80, villette e complessi residenziali più recenti, il preventivo deve tenere conto di impianti da rifare, bagni e cucine da aggiornare, eventuali verifiche urbanistiche e criticità tecniche che emergono solo con un controllo iniziale accurato. Un quadro economico scritto bene aiuta a distinguere le priorità, evitare sottostime e partire con basi più chiare. Su RistrutturazionePreventivi.it il preventivo è immediato e gratuito, con conferma finale dopo sopralluogo tecnico.",
      },
    ],
    vicini: ["aversa", "succivo", "casaluce", "san-marcellino"],
  },

  {
    slug: "san-marcellino",
    nome: "San Marcellino",
    provincia: "caserta",
    zona: "agro-aversano",
    metaTitle: "Ristrutturazione Casa a San Marcellino | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a San Marcellino: costi reali, criticità edilizie locali e preventivo online immediato. Il preventivo definitivo richiede sopralluogo tecnico.",
    descrizione: "San Marcellino è un piccolo comune dell'Agro Aversano con un tessuto edilizio prevalentemente residenziale, composto da un nucleo storico compatto e zone di espansione con villette e palazzine di piccole e medie dimensioni.",
    tipoEdilizio: "Nucleo storico con palazzine anni '50-'70; espansione con villette unifamiliari e case a schiera anni '80-'00",
    criticalita: [
      "Umidità di risalita diffusa nel nucleo storico, frequente nei piani terra",
      "Canne fumarie in amianto nelle palazzine degli anni '60-'70",
      "Abusi edilizi nelle zone di espansione",
      "Impianti idrici vetusti nelle abitazioni più datate",
    ],
    caratteristicheBagni: "Bagni di dimensioni ridotte nelle palazzine storiche (sotto i 5 mq); standard nelle villette. Impianti spesso originali da sostituire integralmente.",
    caratteristicheCucine: "Cucine separate, medie dimensioni. Nelle abitazioni storiche, frequente necessità di adeguamento scarichi e impianto gas.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a San Marcellino?",
        risposta: "I costi orientativi basate sul Prezzario Regionale Campania per un bagno 4-5 mq vanno da circa 4.500 € (base) a 9.000 € (premium). Nelle palazzine storiche con impianti originali, il costo tende al limite superiore. Il sopralluogo tecnico chiarisce la situazione specifica.",
      },
      {
        domanda: "Il bagno del mio appartamento è molto piccolo (meno di 4 mq). Vale la pena ristrutturarlo?",
        risposta: "Assolutamente sì. I bagni piccoli beneficiano enormemente di una ristrutturazione ben progettata: sanitari sospesi, doccia al posto della vasca, grandi formati che ampliano visivamente lo spazio, e una distribuzione intelligente degli accessori. Il costo per metro quadro è più alto rispetto a bagni grandi, ma l'impatto sulla qualità della vita quotidiana è significativo.",
      },
      {
        domanda: "Posso ristrutturare il bagno senza svuotare completamente l'appartamento?",
        risposta: "Sì, la ristrutturazione del bagno richiede solo di svuotare il bagno stesso e proteggere il corridoio adiacente per il passaggio dei materiali. Il cantiere è delimitato e non interferisce con il resto dell'abitazione. L'unico disagio reale è il periodo senza bagno funzionante, che organizziamo per essere il più breve possibile.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a San Marcellino?",
        risposta: "In base al Prezzario Regionale Campania, per i bagni compatti delle palazzine storiche (sotto i 5 mq) la forbice è 4.500-9.000 €. Per i bagni standard nelle villette (5-7 mq) la forbice è 5.000-13.000 €. Il costo al metro quadro è più alto nei bagni piccoli perché le operazioni di demolizione, impermeabilizzazione e posa hanno un costo fisso indipendente dalla dimensione.",
      },
      {
        domanda: "Il mio bagno a San Marcellino è meno di 4 mq. Ha senso ristrutturarlo o è uno spazio perso?",
        risposta: "Ha senso, e spesso il risultato è sorprendente. Sanitari sospesi liberano spazio a pavimento, la doccia al posto della vasca recupera facilmente 60-70 cm, grandi formati sui muri dilatano visivamente lo spazio. Con 3-4 mq ben progettati si ottiene un bagno funzionale e piacevole. Lo progettiamo insieme al sopralluogo.",
      },
      {
        domanda: "Gli impianti fognari del nucleo storico di San Marcellino sono spesso condivisi. Come gestisco il bagno in questi casi?",
        risposta: "I vecchi scarichi condivisi vanno verificati prima di qualsiasi intervento. Al sopralluogo identifichiamo la configurazione degli scarichi e progettiamo l'intervento senza interferire con le proprietà adiacenti. In alcuni casi è opportuno concordare i lavori con il vicino per evitare problemi durante le fasi di demolizione e collegamento.",
      },
    ],
    seoSections: [
      {
        title: "Costo Ristrutturazione San Marcellino",
        text: "Il costo di una ristrutturazione a San Marcellino parte da 550 €/mq per interventi completi nelle condizioni più semplici, ma il prezzo reale dipende molto dal tipo di casa e dallo stato degli impianti. Nel nucleo storico incidono di più umidità di risalita, scarichi da verificare, bagni molto piccoli e impianti datati; nelle zone di espansione pesano invece distribuzione interna, finiture da aggiornare e controlli urbanistici. Per questo una valutazione attendibile non può essere standard. Su RistrutturazionePreventivi.it puoi richiedere un preventivo immediato e gratuito, costruito sulle caratteristiche concrete della tua casa.",
      },
      {
        title: "Impresa di Ristrutturazioni a San Marcellino",
        text: "Affidarsi a un'impresa di ristrutturazioni a San Marcellino significa organizzare bene il cantiere in un contesto fatto di palazzine storiche, piccole espansioni e villette residenziali. In questi casi contano molto la verifica tecnica iniziale, il controllo degli impianti esistenti, la corretta sequenza tra demolizioni, adeguamenti e finiture e la capacità di prevenire criticità che emergono solo a lavori iniziati. Una gestione unica aiuta a limitare imprevisti, tempi morti e costi aggiuntivi.",
      },
      {
        title: "Preventivo Ristrutturazione a San Marcellino",
        text: "Richiedere un preventivo per ristrutturare casa a San Marcellino è il modo più efficace per capire da subito come si compone il costo reale dell'intervento. Nel nucleo storico, dove gli spazi sono spesso più piccoli e gli impianti più datati, il preventivo deve considerare umidità di risalita, scarichi da verificare e lavorazioni impiantistiche più incisive; nelle zone di espansione pesano invece distribuzione interna, finiture da aggiornare e eventuali controlli urbanistici. Un preventivo ben fatto mette ordine tra priorità, lavorazioni necessarie e possibili incognite. Su RistrutturazionePreventivi.it il preventivo è immediato e gratuito, con conferma finale dopo sopralluogo tecnico.",
      },
    ],
    vicini: ["trentola-ducenta", "casal-di-principe", "aversa", "villa-di-briano"],
  },

  {
    slug: "casal-di-principe",
    nome: "Casal di Principe",
    provincia: "caserta",
    zona: "agro-aversano",
    metaTitle: "Ristrutturazione Casa a Casal di Principe | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Casal di Principe: costi reali basati sul Prezzario Campania, criticità locali e preventivo online immediato.",
    descrizione: "Casal di Principe è un comune dell'Agro Aversano con un tessuto edilizio misto: il centro storico conserva palazzi e palazzine di varie epoche, mentre le zone periferiche mostrano un'edilizia prevalentemente degli anni '80-'90.",
    tipoEdilizio: "Centro con palazzi storici e palazzine anni '60-'80; periferia con villette e case a schiera anni '80-'00",
    criticalita: [
      "Umidità di risalita nelle abitazioni del centro storico e nei piani terra",
      "Canne fumarie in amianto nei condomini anni '60-'70",
      "Abusi edilizi non condonati nelle zone di espansione",
      "Impianti idrici in piombo o acciaio zincato nelle palazzine più datate",
    ],
    caratteristicheBagni: "Bagni compatti nel centro storico (sotto i 5 mq); standard nelle costruzioni successive. Frequente presenza di impianti originali mai aggiornati.",
    caratteristicheCucine: "Cucine separate, dimensioni variabili. Nelle palazzine anni '60-'70, canna fumaria condominiale da verificare obbligatoriamente.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a Casal di Principe?",
        risposta: "I costi orientativi basate sul Prezzario Regionale Campania per un bagno 4-5 mq vanno da circa 4.500 € (base) a 9.000 € (premium). Nelle abitazioni del centro con impianti d'epoca, il costo tende al limite superiore.",
      },
      {
        domanda: "Ho un appartamento datato con impianti idrici in piombo. Devo sostituirli durante la ristrutturazione?",
        risposta: "Le tubazioni in piombo vanno sostituite per ragioni di salute: il piombo è tossico e si dissolve nell'acqua, soprattutto quella stagnante. La sostituzione durante la ristrutturazione del bagno è il momento più conveniente, perché le tracce sono già aperte. Non farlo significa dover intervenire di nuovo a distanza di poco tempo.",
      },
      {
        domanda: "Posso fare la ristrutturazione del bagno abitando in casa?",
        risposta: "Sì, è possibile in molti casi. I lavori nel bagno sono circoscritti e non rendono inabitabile il resto dell'appartamento. L'unico vero disagio è il periodo senza bagno funzionante (3-5 giorni). Se c'è un secondo bagno in casa, il problema non si pone. Altrimenti, organizziamo il cantiere per minimizzare questo tempo.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Casal di Principe?",
        risposta: "In base al Prezzario Regionale Campania, per i bagni compatti del centro storico (sotto i 5 mq) la forbice è 4.500-9.000 €. Per i bagni standard nelle villette anni '80-'00 (5-6 mq) la forbice è 5.000-9.500 €. Nelle abitazioni con tubazioni in piombo originali, la sostituzione integrale degli impianti è obbligatoria e porta il costo verso il limite superiore.",
      },
      {
        domanda: "Ho tubazioni in piombo nel mio appartamento a Casal di Principe. È obbligatorio sostituirle?",
        risposta: "Le tubazioni in piombo vanno sostituite per ragioni di salute pubblica: il piombo contamina l'acqua potabile, soprattutto quella stagnante nelle tubazioni. La ristrutturazione del bagno è il momento ideale perché le tracce sono già aperte. Non sostituirle oggi significa riaprire tutto tra pochi anni.",
      },
      {
        domanda: "Posso rifare il bagno abitando nell'appartamento a Casal di Principe?",
        risposta: "Sì. I lavori sono confinati al bagno e i disagi agli altri ambienti sono minimi. I giorni critici sono 3-5 (demolizione e impermeabilizzazione) in cui il bagno non è utilizzabile. Se c'è un secondo bagno, il problema non esiste. Organizziamo il cantiere per ridurre al minimo questo periodo.",
      },
    ],
    vicini: ["san-marcellino", "villa-di-briano", "trentola-ducenta", "parete"],
  },

  {
    slug: "casaluce",
    nome: "Casaluce",
    provincia: "caserta",
    zona: "agro-aversano",
    metaTitle: "Ristrutturazione Casa a Casaluce | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Casaluce: costi reali, criticità edilizie e preventivo online immediato. Il preventivo definitivo richiede sopralluogo tecnico.",
    descrizione: "Casaluce è un comune residenziale dell'Agro Aversano con un tessuto edilizio prevalentemente composto da villette unifamiliari e palazzine di piccole dimensioni, sviluppato principalmente tra gli anni '80 e i primi anni 2000.",
    tipoEdilizio: "Prevalenza di villette unifamiliari anni '80-'00; alcune palazzine nel nucleo centrale",
    criticalita: [
      "Umidità di risalita nelle villette con fondazioni non impermeabilizzate",
      "Abusi edilizi nelle zone di espansione privata",
      "Coperture piane nelle villette anni '80: guaine bituminose spesso esaurite",
      "Impianti idrici in acciaio zincato nelle costruzioni degli anni '70-'80",
    ],
    caratteristicheBagni: "Bagni di dimensioni standard nelle villette (6-8 mq), con sanitari degli anni '80-'90. Frequente doppio bagno nelle villette, entrambi da aggiornare.",
    caratteristicheCucine: "Cucine ampie nelle villette, spesso con accesso diretto al giardino. Frequente richiesta di apertura verso il soggiorno in fase di ristrutturazione.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a Casaluce?",
        risposta: "I costi orientativi basate sul Prezzario Regionale Campania per un bagno 6-7 mq (tipico delle villette di Casaluce) vanno da circa 5.500 € (base) a 10.500 € (premium). Il costo preciso dipende dallo stato degli impianti e dai materiali scelti.",
      },
      {
        domanda: "Ho una villetta degli anni '80 con doppio bagno. Conviene rifarli entrambi nello stesso momento?",
        risposta: "In molti casi sì: l'impresa è già mobilizzata, la logistica è organizzata e il costo marginale del secondo bagno è inferiore rispetto a due interventi separati. Durante il sopralluogo valutiamo entrambi e forniamo preventivi separati e combinati, così decidi con i numeri in mano.",
      },
      {
        domanda: "La copertura piana della mia villetta perde. Posso fare solo le rifiniture interne o devo rifare prima il tetto?",
        risposta: "Se la guaina del tetto perde, fare le rifiniture interne prima è un errore: l'acqua rovina tutto nel giro di uno o due inverni. L'ordine corretto è: prima risolvere la causa (guaina, impermeabilizzazione), poi intervenire sulle rifiniture interne. Il nostro sopralluogo valuta entrambe le situazioni e ti dà una priorità chiara.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Casaluce?",
        risposta: "Le villette di Casaluce hanno tipicamente bagni di 6-8 mq, più grandi della media dell'Agro Aversano. In base al Prezzario Regionale Campania, la forbice indicativa è 5.500-15.000 € per bagni di questa dimensione. Il doppio bagno, frequente nelle villette, permette di fare entrambi insieme con un risparmio del 10-15% rispetto a due cantieri separati.",
      },
      {
        domanda: "Ho una villetta anni '80 a Casaluce con doppio bagno. Conviene rifarli entrambi insieme?",
        risposta: "In quasi tutti i casi sì. L'impresa è già in cantiere, la logistica è organizzata, i costi fissi si dividono su due interventi. Il risparmio sul totale è mediamente 10-15%. Forniamo sempre preventivi separati e combinati: la scelta finale è tua con i numeri davanti.",
      },
      {
        domanda: "La guaina del tetto della mia villetta a Casaluce perde. Devo risolvere prima di rifare il bagno?",
        risposta: "Sì, categoricamente. Se l'acqua entra dal tetto arriva prima o poi alle pareti del bagno e compromette qualsiasi rifinitura nuova. L'ordine corretto è impermeabilizzazione esterna → asciugatura delle murature → ristrutturazione degli interni. Il sopralluogo valuta entrambi gli interventi e ti dà le priorità.",
      },
    ],
    vicini: ["trentola-ducenta", "succivo", "aversa", "cesa"],
  },

  {
    slug: "cesa",
    nome: "Cesa",
    provincia: "caserta",
    zona: "agro-aversano",
    metaTitle: "Ristrutturazione Casa a Cesa | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Cesa: costi reali basati sul Prezzario Campania, criticità edilizie locali e preventivo online immediato.",
    descrizione: "Cesa è un piccolo comune dell'Agro Aversano con un nucleo storico ben definito e zone di espansione residenziale degli anni '80-'90. Il comune è conosciuto per la produzione ortofrutticola e mantiene un carattere prevalentemente residenziale.",
    tipoEdilizio: "Nucleo storico con palazzine anni '50-'70; espansione con villette anni '80-'00",
    criticalita: [
      "Umidità di risalita nelle abitazioni storiche, frequente nei piani terra",
      "Canne fumarie in amianto nei condomini degli anni '60-'70",
      "Abusi edilizi nelle zone di espansione",
      "Impianti fognari datati nel nucleo storico",
    ],
    caratteristicheBagni: "Bagni di dimensioni ridotte nelle palazzine storiche; standard nelle villette. Sanitari e rivestimenti spesso originali.",
    caratteristicheCucine: "Cucine separate, dimensioni medie. Nelle abitazioni storiche, frequente assenza di canna fumaria dedicata.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a Cesa?",
        risposta: "I costi orientativi basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Il costo preciso dipende dallo stato degli impianti esistenti.",
      },
      {
        domanda: "Per la ristrutturazione del bagno serve sempre una CILA a Cesa?",
        risposta: "Non sempre. La sola sostituzione di sanitari, rivestimenti e rubinetteria senza spostare impianti è manutenzione ordinaria e non richiede pratiche edilizie. La CILA è necessaria quando si spostano impianti, si demoliscono o si creano tramezzi, o si modifica la distribuzione degli spazi. Il nostro tecnico chiarisce al sopralluogo cosa è necessario per il tuo intervento specifico.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Cesa?",
        risposta: "In base al Prezzario Regionale Campania, per i bagni ridotti nelle palazzine storiche la forbice è 4.000-8.500 €. Per i bagni standard nelle villette anni '80-'90 (5-6 mq) la forbice è 5.000-9.500 €. Gli impianti fognari datati del nucleo storico possono richiedere lavori aggiuntivi sugli scarichi.",
      },
      {
        domanda: "Il mio bagno a Cesa ha i sanitari degli anni '70 originali. Conviene tenere qualcosa o rifare tutto?",
        risposta: "Quasi sempre conviene rifare tutto durante un rifacimento completo. I sanitari anni '70 hanno consumi idrici nettamente superiori ai modelli attuali (cassetta del WC da 12-15 litri contro i 6 di oggi). Gli impianti idrici di quell'epoca sono in acciaio zincato o piombo. Tenere i vecchi componenti per risparmiare ora significa riaprire il cantiere tra poco.",
      },
      {
        domanda: "Gli impianti fognari del centro storico di Cesa sono datati. Cosa verificate al sopralluogo?",
        risposta: "Al sopralluogo verifichiamo: il diametro e il materiale degli scarichi esistenti (i vecchi in ghisa o grès hanno spesso ostruzioni), la pendenza degli scarichi verso la colonna principale, e la capacità di portata. Se gli scarichi mostrano segni di ostruzione cronica o deterioramento, li sostituiamo durante la ristrutturazione del bagno.",
      },
    ],
    vicini: ["aversa", "casaluce", "succivo", "trentola-ducenta"],
  },

  {
    slug: "frignano",
    nome: "Frignano",
    provincia: "caserta",
    zona: "agro-aversano",
    metaTitle: "Ristrutturazione Casa a Frignano | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Frignano: costi reali basati sul Prezzario Campania, criticità edilizie e preventivo online immediato.",
    descrizione: "Frignano è un comune prevalentemente residenziale dell'Agro Aversano, con un patrimonio edilizio composto da un nucleo centrale e zone di espansione sviluppate tra gli anni '70 e i primi anni 2000.",
    tipoEdilizio: "Mix di palazzine anni '70-'80 e villette anni '90-2000; nucleo storico compatto",
    criticalita: [
      "Umidità di risalita nelle palazzine più datate",
      "Canne fumarie in amianto nei condomini degli anni '70",
      "Abusi edilizi nelle zone di espansione privata",
      "Impianti idrici vetusti nelle costruzioni degli anni '70",
    ],
    caratteristicheBagni: "Bagni standard nelle palazzine (4-6 mq); più ampi nelle villette. Sanitari degli anni '80-'90 da aggiornare.",
    caratteristicheCucine: "Cucine separate nelle palazzine; ampie nelle villette. Verifica impianto gas necessaria nelle costruzioni più datate.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a Frignano?",
        risposta: "I costi orientativi basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Il sopralluogo tecnico quantifica le variabili specifiche.",
      },
      {
        domanda: "Quanto dura una ristrutturazione bagno completa a Frignano?",
        risposta: "Un bagno standard 5-6 mq richiede mediamente 2-3 settimane lavorative dalla demolizione alla rifinitura finale. I tempi si allungano se è necessaria la bonifica di impianti in amianto o se emergono criticità strutturali al sopralluogo.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Frignano?",
        risposta: "In base al Prezzario Regionale Campania, per le palazzine anni '70-'80 (bagni 4-6 mq) la forbice è 4.500-9.500 €. Per le villette anni '90-2000 (bagni 5-8 mq) la forbice è 5.000-13.000 €. Le tubazioni in acciaio zincato nei condomini degli anni '70 richiedono quasi sempre la sostituzione e incidono sul costo.",
      },
      {
        domanda: "Ho umidità di risalita nei muri del bagno a Frignano. Devo trattarla prima di rifare le piastrelle?",
        risposta: "Sì, sempre. Posare nuove piastrelle sopra muri con umidità attiva significa dover rifare tutto in 1-2 anni perché le piastrelle si staccano e si formano muffe. Al sopralluogo identifichiamo l'origine dell'umidità e inseriamo il trattamento nel piano lavori prima delle finiture.",
      },
      {
        domanda: "Conviene fare il riscaldamento a pavimento nel bagno durante la ristrutturazione a Frignano?",
        risposta: "Sì, il momento giusto per installare il riscaldamento a pavimento è quando il bagno è già aperto per il rifacimento completo: il massetto va comunque rifatto. Il costo aggiuntivo è 800-1.500 € a seconda della dimensione. Va pianificato prima dell'inizio lavori perché richiede un massetto dedicato con altezza specifica.",
      },
    ],
    vicini: ["villa-di-briano", "casal-di-principe", "san-marcellino", "parete"],
  },

  {
    slug: "parete",
    nome: "Parete",
    provincia: "caserta",
    zona: "agro-aversano",
    metaTitle: "Ristrutturazione Casa a Parete | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Parete: costi reali basati sul Prezzario Campania, criticità locali e preventivo online immediato. Il preventivo definitivo richiede sopralluogo tecnico.",
    descrizione: "Parete è un comune dell'Agro Aversano con un tessuto edilizio misto, dove convivono palazzine del centro storico degli anni '60-'70 e un'espansione residenziale più recente con villette e case a schiera.",
    tipoEdilizio: "Palazzine anni '60-'80 nel centro; villette e case a schiera anni '80-'00 nell'espansione",
    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '60-'70",
      "Umidità di risalita frequente nelle palazzine e nelle villette più datate",
      "Abusi edilizi nelle zone di espansione",
      "Impianti idrici vetusti nelle palazzine del centro",
    ],
    caratteristicheBagni: "Bagni compatti nelle palazzine (sotto i 5 mq); standard nelle villette. Impianti spesso da aggiornare.",
    caratteristicheCucine: "Cucine separate nelle palazzine, medie-grandi nelle villette. Canna fumaria da verificare prima di interventi.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a Parete?",
        risposta: "I costi orientativi basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Nelle palazzine degli anni '60-'70 con impianti originali, il costo tende al limite superiore.",
      },
      {
        domanda: "Ho un condominio anni '70 a Parete. Cosa devo sapere prima di ristrutturare il mio appartamento?",
        risposta: "Negli edifici condominiali anni '70 è importante verificare: lo stato delle colonne scarico condominiali (se intasate o deteriorate, il problema ricade su tutti i bagni), la presenza di amianto nelle canne fumarie, e il regolamento condominiale per orari e modalità dei lavori. Se l'intervento tocca parti comuni, è necessario informare l'amministratore.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Parete?",
        risposta: "In base al Prezzario Regionale Campania, per i bagni compatti delle palazzine degli anni '60-'70 (sotto i 5 mq) la forbice è 4.500-9.000 €. Per i bagni standard nelle villette (5-7 mq) la forbice è 5.000-13.000 €. Nelle palazzine più datate con impianti originali, quasi sempre è necessaria la sostituzione integrale delle tubazioni.",
      },
      {
        domanda: "Ho una palazzina anni '70 a Parete. Le colonne scarico condominiali sono rotte. Posso rifare il bagno lo stesso?",
        risposta: "Puoi rifare il bagno, ma la colonna scarico condominiale rotta è un problema che prima o poi compromette anche il tuo intervento. Se la colonna è deteriorata, ogni scarico del bagno crea rischi di perdite ai piani inferiori. Consigliamo di segnalare il problema all'amministratore prima dei lavori e, se possibile, coordinare la sostituzione della colonna con la ristrutturazione del bagno.",
      },
      {
        domanda: "Serve la CILA per rifare il bagno in un condominio a Parete?",
        risposta: "Solo se sposti impianti o modifichi i tramezzi. La sostituzione di sanitari e rivestimenti nella stessa posizione è manutenzione ordinaria e non richiede pratiche. Se sposti il WC o demolisci/ricostruisci una tramezza, serve la CILA da presentare al Comune di Parete prima dell'inizio lavori.",
      },
    ],
    vicini: ["villa-di-briano", "casal-di-principe", "frignano", "aversa"],
  },

  {
    slug: "succivo",
    nome: "Succivo",
    provincia: "caserta",
    zona: "agro-aversano",
    metaTitle: "Ristrutturazione Casa a Succivo | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Succivo: costi reali basati sul Prezzario Campania, criticità locali e preventivo online immediato.",
    descrizione: "Succivo è un comune residenziale dell'Agro Aversano con un tenore abitativo mediamente più elevato rispetto agli altri comuni della zona, caratterizzato da villette e palazzine di medie dimensioni edificate principalmente tra gli anni '80 e i primi anni 2000.",
    tipoEdilizio: "Prevalenza di villette unifamiliari e palazzine anni '80-'00; nucleo storico con edifici anni '60-'70",
    criticalita: [
      "Umidità di risalita nelle villette più datate, frequente nei piani terra",
      "Abusi edilizi nelle espansioni private degli anni '90",
      "Impianti idrici in acciaio zincato nelle abitazioni degli anni '70-'80",
      "Coperture piane nelle villette degli anni '80: guaine di prima generazione spesso da sostituire",
    ],
    caratteristicheBagni: "Bagni di dimensioni standard o superiori nelle villette, con sanitari degli anni '80-'90. Nelle abitazioni più recenti, bagni già ristrutturati parzialmente ma con impianti da aggiornare.",
    caratteristicheCucine: "Cucine separate e ampie nelle villette. Frequente richiesta di apertura verso il soggiorno (cucina open space) in fase di ristrutturazione.",
    faq: [
      {
        domanda: "Voglio aprire la cucina sul soggiorno nella mia villetta a Succivo. È possibile?",
        risposta: "Dipende dalla struttura del muro di separazione. Se è un muro portante, l'apertura richiede una trave di sostegno e il progetto di un ingegnere strutturale, oltre al permesso di costruire. Se è una tramezza non portante, basta una CILA. Il nostro sopralluogo include la verifica della natura del muro prima di qualsiasi preventivo.",
      },
      {
        domanda: "Quanto costa ristrutturare la cucina a Succivo?",
        risposta: "I costi orientativi basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Nelle villette con bagni già parzialmente ristrutturati, il costo dipende da quanto degli impianti esistenti è riutilizzabile: lo si capisce al sopralluogo.",
      },
      {
        domanda: "Ho intenzione di installare un riscaldamento a pavimento nel bagno. È compatibile con una ristrutturazione completa?",
        risposta: "Sì, il riscaldamento a pavimento nel bagno è uno degli upgrade più richiesti in fase di ristrutturazione completa, perché le tracce e il massetto sono già da rifare. Il costo aggiuntivo rispetto a un bagno standard è di 800-1.500 € a seconda della dimensione. Va pianificato dall'inizio perché richiede un massetto dedicato.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Succivo?",
        risposta: "Succivo ha un tenore abitativo mediamente più alto rispetto agli altri comuni dell'Agro Aversano: le villette hanno bagni di dimensioni standard o superiori (5-8 mq) e spesso già una ristrutturazione parziale alle spalle. In base al Prezzario Regionale Campania la forbice indicativa è 5.000-15.000 €. Il costo dipende molto da quanta parte degli impianti esistenti è riutilizzabile: lo verifichiamo al sopralluogo.",
      },
      {
        domanda: "Ho già ristrutturato il bagno parzialmente qualche anno fa a Succivo. Conviene rifare tutto o solo parte?",
        risposta: "Dipende da cosa è stato fatto e quando. Se l'impianto idrico è stato sostituito con materiali moderni (multistrato o polipropilene) e l'impermeabilizzazione è a norma, si può intervenire solo sulle finiture. Se invece è stato fatto solo un cambio piastrelle senza toccare impianti e impermeabilizzazione, quasi sempre conviene rifare dall'inizio per non riaprire tutto tra pochi anni.",
      },
      {
        domanda: "Il riscaldamento a pavimento nel bagno vale l'investimento a Succivo?",
        risposta: "Per le villette di Succivo che tendono a standard abitativi più elevati, il riscaldamento a pavimento nel bagno è spesso già previsto dai proprietari. Il costo aggiuntivo durante la ristrutturazione è 800-1.500 €: lo stesso intervento fatto dopo su un bagno già finito costerebbe 3-4 volte tanto perché richiede di rimuovere pavimento e massetto. Pianificato dall'inizio è uno degli upgrade con il miglior rapporto costo/beneficio.",
      },
    ],
    vicini: ["aversa", "cesa", "casaluce", "trentola-ducenta"],
  },

  {
    slug: "villa-di-briano",
    nome: "Villa di Briano",
    provincia: "caserta",
    zona: "agro-aversano",
    metaTitle: "Ristrutturazione Casa a Villa di Briano | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Villa di Briano: costi reali, criticità edilizie locali e preventivo online immediato. Il preventivo definitivo richiede sopralluogo tecnico.",
    descrizione: "Villa di Briano è un piccolo comune residenziale dell'Agro Aversano, con un tessuto edilizio composto da un nucleo storico compatto e zone di espansione con villette e palazzine di piccole dimensioni, sviluppate tra gli anni '70 e i primi anni 2000.",
    tipoEdilizio: "Nucleo storico con palazzine anni '50-'70; periferia con villette anni '80-'00",
    criticalita: [
      "Umidità di risalita nelle abitazioni storiche, frequente nei piani terra",
      "Canne fumarie in amianto nei condomini anni '60-'70",
      "Abusi edilizi nelle zone di espansione",
      "Impianti fognari datati nel nucleo storico, spesso condivisi tra più abitazioni",
    ],
    caratteristicheBagni: "Bagni di dimensioni ridotte nelle palazzine storiche; standard nelle villette. Impianti spesso datati con necessità di aggiornamento completo.",
    caratteristicheCucine: "Cucine separate, medie dimensioni. Nelle abitazioni storiche, frequente necessità di adeguamento scarichi e impianto gas.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a Villa di Briano?",
        risposta: "I costi orientativi basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Nelle palazzine storiche con impianti originali, il costo tende al limite superiore. Il sopralluogo tecnico chiarisce la situazione specifica.",
      },
      {
        domanda: "Nel mio appartamento storico a Villa di Briano gli scarichi sono condivisi con il vicino. Posso comunque ristrutturare?",
        risposta: "Sì, ma con le dovute cautele. Gli scarichi condivisi sono una caratteristica degli edifici storici più datati. Durante il sopralluogo verifichiamo la configurazione degli scarichi e progettiamo l'intervento in modo da non interferire con i vicini. In alcuni casi può essere necessario concordare i lavori con il proprietario dell'appartamento adiacente.",
      },
    ],
    seoSections: [
      {
        title: "Ristrutturare casa a Villa di Briano: contesto edilizio e criticità",
        text:
          "A Villa di Briano la ristrutturazione varia molto tra il nucleo storico e le zone di espansione. Nelle abitazioni più datate troviamo spesso umidità di risalita, impianti fognari condivisi e distribuzioni interne poco efficienti; nelle villette e palazzine più recenti sono invece più frequenti verifiche su impianti, pratiche edilizie e conformità dello stato di fatto.",
      },
      {
        title: "Bagni e cucine: cosa incide davvero sui costi",
        text:
          "Nei bagni piccoli delle palazzine storiche il costo dipende soprattutto dal rifacimento completo degli impianti e dalla gestione degli scarichi esistenti. Nelle cucine, oltre a rivestimenti e finiture, incidono adeguamento del gas, nuovi punti acqua e verifica delle colonne di scarico, soprattutto quando l'impianto originale è datato.",
      },
      {
        title: "Perché serve un sopralluogo tecnico a Villa di Briano",
        text:
          "Un preventivo online è utile per avere un ordine di grandezza, ma a Villa di Briano il sopralluogo tecnico resta decisivo per controllare scarichi condivisi, eventuali irregolarità edilizie, presenza di materiali da verificare e condizioni reali degli impianti. Solo dopo questa verifica è possibile definire lavorazioni, tempi e costo finale in modo affidabile.",
      },
    ],

    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Villa di Briano?",
        risposta: "In base al Prezzario Regionale Campania, per i bagni nelle palazzine storiche (sotto i 5 mq) la forbice è 4.500-9.000 €. Per i bagni standard nelle villette (5-7 mq) la forbice è 5.000-13.000 €. Gli impianti fognari datati e spesso condivisi del nucleo storico possono richiedere verifiche e lavori aggiuntivi sugli scarichi.",
      },
      {
        domanda: "Gli scarichi del mio appartamento storico a Villa di Briano sono condivisi con il vicino. Cosa succede quando rifaccio il bagno?",
        risposta: "Al sopralluogo mappiamo la configurazione degli scarichi esistenti. Se lo scarico è effettivamente condiviso, progettiamo l'intervento in modo da non toccare le parti che appartengono anche al vicino. In alcuni casi conviene separare gli scarichi durante la ristrutturazione, rendendoli indipendenti: è un lavoro aggiuntivo ma risolve definitivamente il problema per entrambi.",
      },
      {
        domanda: "Quanto tempo dura la ristrutturazione del bagno a Villa di Briano?",
        risposta: "Un bagno standard (5-7 mq) con rifacimento completo richiede 2-3 settimane lavorative. Nelle palazzine storiche con impianti originali e fognature datate, si aggiungono 2-4 giorni per la verifica e la sostituzione degli scarichi. I tempi definitivi emergono dal sopralluogo.",
      },
    ],
    vicini: ["san-marcellino", "casal-di-principe", "frignano", "parete"],
  },
];

// ─────────────────────────────────────────────
// ZONA: NAPOLI E PROVINCIA (8 comuni)
// ─────────────────────────────────────────────

export const comuniNapoli: Comune[] = [
  {
    slug: "napoli",
    nome: "Napoli",
    provincia: "napoli",
    zona: "napoli",
    metaTitle: "Ristrutturazione Casa a Napoli | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Napoli: costi reali per appartamenti nei quartieri serviti. Criticità locali e preventivo online immediato. Il preventivo definitivo richiede sopralluogo tecnico.",
    descrizione: "Napoli è servita nelle zone periferiche nord e nord-ovest, con un tessuto edilizio prevalentemente condominiale degli anni '60-'80. Le caratteristiche edilizie variano significativamente da quartiere a quartiere: il nostro servizio copre principalmente le zone di Secondigliano, Piscinola e le aree limitrofe.",
    tipoEdilizio: "Condomini anni '60-'80 nelle periferie nord; edilizia popolare IACP; palazzine anni '50 nei quartieri più centrali dell'area servita",
    criticalita: [
      "Impianti idrici condominiali obsoleti: spesso le colonne montanti non sono state aggiornate dalla costruzione",
      "Canne fumarie in amianto nei condomini degli anni '60-'70: rilevamento obbligatorio",
      "Umidità di risalita e infiltrazioni da lastrico solare nei piani alti",
      "Interventi in condominio: necessario rispettare il regolamento condominiale e in alcuni casi ottenere delibera assembleare per lavori su parti comuni",
    ],
    caratteristicheBagni: "Bagni mono-sanitari sotto i 5 mq nei condomini IACP e nelle palazzine degli anni '60. Nelle abitazioni più recenti, bagni di dimensioni standard con sanitari da aggiornare.",
    caratteristicheCucine: "Cucine separate e compatte nei condomini degli anni '60-'70. Frequente presenza di canna fumaria condominiale in amianto collegata alle cucine.",
    faq: [
      {
        domanda: "Devo chiedere al condominio per ristrutturare il mio bagno a Napoli?",
        risposta: "Se l'intervento è interno al tuo appartamento e non tocca parti comuni, non serve una delibera. Devi però rispettare il regolamento condominiale per orari e modalità dei lavori. Se l'intervento richiede di collegare o modificare impianti condominiali, è necessario informare l'amministratore e in alcuni casi ottenere l'approvazione assembleare.",
      },
      {
        domanda: "Quanto costa ristrutturare la cucina a Napoli?",
        risposta: "In base al Prezzario Regionale Campania, i costi orientativi per un bagno 4-5 mq vanno da circa 4.500 € (base) a 8.500 € (premium). I condomini degli anni '60-'70 con impianti obsoleti tendono al limite superiore. Il sopralluogo è il momento in cui emergono le variabili specifiche.",
      },
      {
        domanda: "Posso usare il Bonus 50% per un appartamento in condominio a Napoli?",
        risposta: "Sì, la detrazione IRPEF al 50% si applica agli interventi di manutenzione straordinaria sulle unità residenziali, indipendentemente dalla tipologia condominiale. Servono pagamenti tracciati con bonifico parlante e fatture in regola.",
      },
      {
        domanda: "Ho un appartamento IACP a Napoli. Posso ristrutturare anche se non sono proprietario?",
        risposta: "La ristrutturazione degli appartamenti IACP è soggetta a regole specifiche che dipendono dal tipo di contratto (locazione semplice, riscatto, piena proprietà). Se sei in fase di riscatto o già proprietario, hai piena libertà di intervento sugli interni. Se sei locatario, è necessaria l'autorizzazione dell'ente gestore per lavori di manutenzione straordinaria.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Napoli (zone nord servite)?",
        risposta: "In base al Prezzario Regionale Campania, per un bagno sotto i 5 mq nei condomini IACP o nelle palazzine degli anni '60-'70 il costo indicativo è 4.500-8.500 €. Nei condomini degli anni '80 con bagni di 5-6 mq la forbice è 5.000-9.500 €. Il fattore che spinge il costo in alto è quasi sempre lo stato degli impianti: tubazioni in piombo o acciaio zincato da sostituire integralmente.",
      },
      {
        domanda: "Devo avvisare il condominio per rifare il bagno del mio appartamento a Napoli?",
        risposta: "Per lavori interni all'appartamento (sanitari, rivestimenti, impianti privati), non serve delibera condominiale. Devi rispettare gli orari di lavoro previsti dal regolamento condominiale (solitamente 8-13 e 15-19 nei giorni feriali). Se l'intervento tocca colonne scarico condominiali, è obbligatorio informare l'amministratore prima di aprire le tracce.",
      },
      {
        domanda: "Quanto tempo duro senza bagno durante la ristrutturazione in un condominio napoletano?",
        risposta: "Con un'organizzazione ottimale del cantiere, i giorni completamente senza bagno funzionante sono 3-5 (fase di demolizione e impermeabilizzazione). Organizziamo il cantiere per rendere il bagno parzialmente funzionante il prima possibile. Se hai un secondo bagno in casa, il problema non si pone.",
      },
      {
        domanda: "Ho tubazioni in piombo nell'appartamento anni '60 a Napoli. Devo sostituirle durante la ristrutturazione del bagno?",
        risposta: "Sì, le tubazioni in piombo vanno sostituite per ragioni di salute pubblica: il piombo si dissolve nell'acqua, in particolare quella stagnante. La sostituzione è conveniente farla durante la ristrutturazione del bagno perché le tracce sono già aperte. Il costo aggiuntivo è marginale rispetto al costo totale, ma non farlo significa riaprire tutto tra pochi anni.",
      },
    ],
    vicini: ["giugliano-in-campania", "mugnano-di-napoli", "melito-di-napoli"],
    seoSections: [
      {
        title: "Costo Ristrutturazione Napoli",
        text: "Il costo di una ristrutturazione a Napoli parte da 550 €/mq per interventi completi nelle situazioni più semplici. Il prezzo finale può però variare in base allo stato dell'immobile, agli impianti esistenti, alla distribuzione degli ambienti, alla logistica del condominio e alla tipologia costruttiva dell'edificio. Nelle zone di Napoli più vicine alla nostra area operativa, come Secondigliano, Scampia, Piscinola, Miano, San Pietro a Patierno e i quartieri limitrofi, si trovano spesso condomini costruiti tra gli anni '50 e '80 con caratteristiche molto diverse tra loro. In questi immobili è frequente dover intervenire su impianti elettrici e idraulici obsoleti, colonne montanti datate, bagni di dimensioni ridotte, canne fumarie, infiltrazioni o opere murarie non più conformi agli standard attuali. Per questo motivo una stima accurata del costo di una ristrutturazione a Napoli non può basarsi esclusivamente sui metri quadrati, ma deve considerare le reali condizioni dell'immobile e le eventuali criticità tecniche.",
        afterTableText: "Su RistrutturazionePreventivi.it puoi richiedere un preventivo gratuito e immediato per la ristrutturazione della tua casa o del tuo appartamento a Napoli. Riceverai una stima personalizzata basata sulle caratteristiche del tuo immobile, con conferma del costo definitivo dopo il sopralluogo tecnico.",
      },
      {
        title: "Impresa di Ristrutturazioni a Napoli",
        text: "Affidarsi a un'impresa di ristrutturazioni a Napoli significa scegliere un unico interlocutore in grado di gestire ogni fase dei lavori, dalla demolizione agli impianti, dalle opere murarie alle finiture, fino allo smaltimento dei materiali. Nelle zone di Napoli più vicine alla nostra area operativa, come Secondigliano, Scampia, Piscinola, Miano, San Pietro a Patierno e i quartieri limitrofi, gli immobili presentano spesso caratteristiche costruttive differenti che richiedono competenze tecniche specifiche. Nelle ristrutturazioni di case e appartamenti a Napoli è spesso necessario verificare preventivamente lo stato degli impianti elettrici e idraulici, delle colonne montanti, degli scarichi, delle canne fumarie, oltre al rispetto del regolamento condominiale e delle eventuali prescrizioni edilizie. Molti edifici costruiti tra gli anni '50 e '80 richiedono interventi di adeguamento che possono incidere sull'organizzazione del cantiere e sui tempi di esecuzione. Un'impresa edile specializzata nelle ristrutturazioni a Napoli consente di coordinare tutte le lavorazioni con una pianificazione precisa, riducendo gli imprevisti, ottimizzando i tempi e garantendo un cantiere più efficiente. Con RistrutturazionePreventivi.it puoi richiedere un preventivo gratuito per la ristrutturazione della tua casa o del tuo appartamento a Napoli, con sopralluogo tecnico e una valutazione personalizzata in base alle caratteristiche dell'immobile.",
      },
      {
        title: "Preventivo Ristrutturazione a Napoli",
        text: "Richiedere un preventivo per ristrutturare casa a Napoli è il primo passo per pianificare correttamente un intervento, ma una valutazione realmente affidabile deve considerare tutte le caratteristiche dell'immobile e le condizioni del cantiere, non una semplice cifra calcolata solo sui metri quadrati. Il costo di una ristrutturazione a Napoli può cambiare in base alla superficie dell'appartamento, allo stato degli impianti, alla necessità di rifare bagno e cucina, alla qualità dei materiali scelti, alla presenza di opere murarie aggiuntive e alla facilità di accesso per il trasporto e lo smaltimento dei materiali. Nelle zone di Napoli più vicine alla nostra area operativa, come Secondigliano, Scampia, Piscinola, Miano, San Pietro a Patierno e i quartieri limitrofi, è importante valutare anche aspetti specifici come l'organizzazione del cantiere, gli orari consentiti dal regolamento condominiale, lo stato delle colonne montanti, degli scarichi e degli impianti comuni. Questi elementi possono incidere sui tempi di esecuzione e sul costo complessivo dei lavori. Su RistrutturazionePreventivi.it puoi richiedere un preventivo gratuito per la ristrutturazione della tua casa a Napoli, con una prima valutazione online e una verifica tecnica finale tramite sopralluogo. In questo modo il progetto viene definito sulle reali condizioni dell'immobile, evitando stime generiche e costi imprevisti durante la realizzazione dei lavori.",
      },
    ],
  },

  {
    slug: "giugliano-in-campania",
    nome: "Giugliano in Campania",
    provincia: "napoli",
    zona: "napoli",
    metaTitle: "Ristrutturazione Casa a Giugliano in Campania | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Giugliano in Campania: costi reali, criticità edilizie e preventivo online immediato. Il preventivo definitivo richiede sopralluogo tecnico.",
    descrizione: "Giugliano in Campania è uno dei comuni più popolosi della Campania, con un'espansione residenziale avvenuta molto rapidamente tra gli anni '80 e i primi anni 2000. Il tessuto edilizio è prevalentemente composto da palazzine e condomini di media altezza, con un nucleo storico relativamente contenuto.",
    tipoEdilizio: "Palazzine e condomini anni '80-'00 nelle zone di espansione; nucleo storico con edifici anni '50-'70; alcune ville e villette nelle zone periferiche",
    criticalita: [
      "Abusi edilizi non condonati molto frequenti, legati alla rapida espansione non sempre pianificata degli anni '80-'90",
      "Canne fumarie in amianto nei condomini degli anni '70-'80",
      "Umidità di risalita nelle abitazioni di piano terra, frequente nelle costruzioni su terreno argilloso",
      "Impianti condominiali non aggiornati in edifici di 30-40 anni: pressione idrica insufficiente ai piani alti",
    ],
    caratteristicheBagni: "Bagni di dimensioni variabili: standard nei condomini degli anni '80 (5-6 mq), più piccoli nelle palazzine del centro. Sanitari degli anni '80-'90 da aggiornare.",
    caratteristicheCucine: "Cucine separate nelle palazzine, medie dimensioni. Nelle costruzioni degli anni '80, frequente presenza di impianto gas non a norma.",
    faq: [
      {
        domanda: "Ho un appartamento anni '90 a Giugliano. Cosa controllo prima di ristrutturare?",
        risposta: "Per gli appartamenti degli anni '90 a Giugliano è consigliabile verificare: la regolarità urbanistica (abusi frequenti nella zona), lo stato dell'impianto elettrico, la condizione degli scarichi condominiali, e la presenza di umidità nei muri perimetrali. Il nostro sopralluogo include una valutazione tecnica complessiva.",
      },
      {
        domanda: "Quanto costa ristrutturare la cucina a Giugliano in Campania?",
        risposta: "In base al Prezzario Regionale Campania, i costi orientativi per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Negli edifici degli anni '90 con impianti da sostituire integralmente, il costo tende al limite superiore.",
      },
      {
        domanda: "Vivo al terzo piano di un condominio anni '80 a Giugliano e ho poca pressione idrica. Si risolve con la ristrutturazione?",
        risposta: "La bassa pressione ai piani alti dipende quasi sempre dalle colonne montanti condominiali, non dall'impianto del tuo appartamento. È un problema che si risolve solo intervenendo sulle parti comuni, che richiede delibera condominiale. Nell'ambito della ristrutturazione del tuo appartamento, possiamo installare un mini-autoclave privato come soluzione temporanea o definitiva.",
      },
      {
        domanda: "Ho un abuso non condonato nella mia abitazione a Giugliano. Posso comunque fare lavori?",
        risposta: "Dipende dalla natura dell'abuso e dall'intervento che vuoi fare. Per lavori di manutenzione ordinaria (sostituzione sanitari, rivestimenti) non ci sono problemi. Per lavori soggetti a CILA o permesso, il Comune può bloccare l'iter se c'è un abuso pendente. È fondamentale una verifica preventiva della situazione urbanistica.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Giugliano in Campania?",
        risposta: "In base al Prezzario Regionale Campania, per un bagno standard di 5-6 mq nei condomini degli anni '80-'90 di Giugliano il costo indicativo è 5.000-9.500 €. Negli edifici più vecchi con impianti originali da sostituire integralmente, si tende al limite superiore. Il dato definitivo emerge dal sopralluogo.",
      },
      {
        domanda: "Ho un appartamento anni '90 a Giugliano con abuso non condonato. Posso rifare il bagno?",
        risposta: "Per il rifacimento del bagno con sostituzione di sanitari e rivestimenti (manutenzione ordinaria) non c'è nessun problema, anche in presenza di abusi pendenti. Il problema si pone se l'intervento richiede una CILA (es. spostamento impianti o modifica tramezzi): in quel caso il Comune di Giugliano verifica la regolarità urbanistica dell'immobile prima di ricevere la pratica. Una verifica preventiva al catasto è sempre consigliata.",
      },
      {
        domanda: "Nei condomini anni '90 di Giugliano le tubazioni vanno quasi sempre sostituite?",
        risposta: "Non sempre integralmente. Nelle costruzioni degli anni '90 le tubazioni sono spesso in polipropilene o pvc, materiali più duraturi dell'acciaio zincato degli anni '70. Il problema più frequente nei condomini giuglianese degli anni '80-'90 è la bassa pressione ai piani alti, che dipende dalle colonne condominiali. Al sopralluogo verifichiamo lo stato delle tubazioni accessibili e ti diciamo con precisione cosa va sostituito.",
      },
    ],
    vicini: ["napoli", "villaricca", "sant-antimo", "mugnano-di-napoli"],
    seoSections: [
      {
        title: "Costo Ristrutturazione Giugliano in Campania",
        text: "Parlare di costo ristrutturazione a Giugliano in Campania senza guardare il tipo di fabbricato porta quasi sempre a una stima sbagliata. Il prezzo parte da 550 €/mq per interventi completi nelle condizioni più semplici, ma cambia sensibilmente tra palazzine nate durante l'espansione edilizia degli anni '80-'90, condomini con impianti mai aggiornati e abitazioni che presentano verifiche urbanistiche ancora da chiarire. Anche la pressione idrica, lo stato delle parti comuni e la distribuzione interna incidono più di quanto sembri sul preventivo reale. Su RistrutturazionePreventivi.it puoi richiedere una stima immediata e gratuita, calibrata sulle caratteristiche concrete della tua casa.",
      },
      {
        title: "Impresa di Ristrutturazioni a Giugliano in Campania",
        text: "In una città estesa e costruita per strati successivi come Giugliano, un'impresa di ristrutturazioni non serve solo a eseguire i lavori, ma soprattutto a mettere ordine tecnico prima dell'apertura del cantiere. Verificare conformità edilizia, stato degli impianti, condizioni delle colonne condominiali e fattibilità delle modifiche interne è spesso il passaggio che fa la differenza tra un intervento fluido e uno pieno di stop. Per questo è utile avere un unico referente capace di coordinare opere murarie, impiantistica, demolizioni e finiture senza perdere il controllo del quadro complessivo.",
      },
      {
        title: "Preventivo Ristrutturazione a Giugliano in Campania",
        text: "Un preventivo di ristrutturazione a Giugliano in Campania è davvero utile solo quando traduce i problemi possibili dell'immobile in voci di costo comprensibili. Non contano solo i metri quadri: pesano anche l'età dell'edificio, l'eventuale rifacimento di bagno e cucina, la necessità di adeguare impianti datati, la facilità di accesso al cantiere e l'eventuale presenza di irregolarità da verificare prima delle pratiche. Avere queste informazioni in anticipo ti aiuta a decidere meglio cosa fare subito e cosa rimandare. Su RistrutturazionePreventivi.it il preventivo è immediato e gratuito, con conferma conclusiva dopo sopralluogo tecnico.",
      },
    ],
  },

  {
    slug: "sant-antimo",
    nome: "Sant'Antimo",
    provincia: "napoli",
    zona: "napoli",
    metaTitle: "Ristrutturazione Casa a Sant'Antimo | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Sant'Antimo: costi reali basati sul Prezzario Campania, criticità edilizie e preventivo online immediato.",
    descrizione: "Sant'Antimo è un comune densamente popolato a nord di Napoli, con un tessuto edilizio prevalentemente composto da palazzine e condomini di media altezza. L'espansione residenziale rapida degli anni '70-'90 ha lasciato un patrimonio edilizio eterogeneo con livelli di qualità costruttiva molto variabili.",
    tipoEdilizio: "Condomini e palazzine anni '70-'90; alcune aree di edilizia popolare; nucleo storico con edifici anni '50-'60",
    criticalita: [
      "Umidità di risalita e infiltrazioni da lastrici solari nei piani alti",
      "Canne fumarie in amianto nei condomini degli anni '70",
      "Abusi edilizi non condonati frequenti",
      "Impianti idrici condominiali vetusti: colonne montanti in piombo ancora presenti nei palazzi anni '60",
    ],
    caratteristicheBagni: "Bagni compatti nelle palazzine anni '70 (sotto i 5 mq), standard nelle costruzioni successive. Impianti spesso da aggiornare integralmente.",
    caratteristicheCucine: "Cucine separate, compatte. Canne fumarie condominiali collegate che richiedono verifica prima di qualsiasi intervento.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a Sant'Antimo?",
        risposta: "I costi orientativi in base al Prezzario Regionale Campania per un bagno 4-5 mq vanno da circa 4.500 € (base) a 8.500 € (premium). Nei condomini degli anni '70 con impianti originali, il costo reale tende al limite superiore.",
      },
      {
        domanda: "Ho un appartamento in un condominio degli anni '70 a Sant'Antimo con infiltrazioni dal lastrico solare. Prima di ristrutturare, cosa faccio?",
        risposta: "Le infiltrazioni dal lastrico solare vanno risolte prima di qualsiasi lavoro interno, altrimenti le nuove rifiniture sono compromesse. Il lastrico solare è solitamente parte comune del condominio (salvo diverse disposizioni): il problema va segnalato all'amministratore e risolto con delibera condominiale. Solo dopo è sensato intervenire sugli interni dell'appartamento.",
      },
      {
        domanda: "Posso ristrutturare la cucina se la canna fumaria condominiale è in amianto?",
        risposta: "Non è possibile collegare una nuova cappa a una canna fumaria in amianto senza bonifica preventiva. La bonifica va eseguita da una ditta specializzata certificata, con notifica all'ASL e smaltimento in discarica autorizzata. Il costo va calcolato separatamente dal preventivo della cucina e va pianificato prima dell'inizio lavori.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Sant'Antimo?",
        risposta: "In base al Prezzario Regionale Campania, per i bagni compatti nelle palazzine anni '70 (sotto i 5 mq) la forbice è 4.500-9.000 €. Per i bagni standard nelle costruzioni anni '80-'90 (5-6 mq) la forbice è 5.000-9.500 €. Le colonne montanti in piombo ancora presenti nei palazzi anni '60 richiedono la sostituzione integrale durante qualsiasi intervento sull'impianto idrico.",
      },
      {
        domanda: "Ho infiltrazioni dal lastrico solare nel mio condominio a Sant'Antimo. Devo aspettare che siano risolte prima di rifare il bagno?",
        risposta: "Sì, se le infiltrazioni arrivano alle pareti del tuo appartamento. Rivestire pareti bagnate significa dover rifare tutto in 1-2 inverni. Il lastrico solare è parte comune: il problema va segnalato all'amministratore e risolto con delibera condominiale prima di qualsiasi intervento interno. Se le infiltrazioni non raggiungono il bagno, puoi procedere.",
      },
      {
        domanda: "Posso fare il bagno abitando in casa in un condominio a Sant'Antimo?",
        risposta: "Sì. I lavori nel bagno sono circoscritti e rispettiamo sempre gli orari condominiali (tipicamente 8-13 e 15-19). I giorni critici senza bagno funzionante sono 3-5. Avvisiamo sempre l'amministratore prima dell'inizio lavori per la parte logistica (accesso, smaltimento macerie, orari).",
      },
    ],
    vicini: ["giugliano-in-campania", "napoli", "melito-di-napoli", "grumo-nevano"],
    seoSections: [
      {
        title: "Costo Ristrutturazione Sant'Antimo",
        text: "A Sant'Antimo il costo di una ristrutturazione non dipende solo dai materiali scelti o dalla metratura, ma molto spesso dalle condizioni nascoste dell'edificio. Il prezzo parte da 550 €/mq per interventi completi nelle situazioni più semplici, ma sale quando entrano in gioco infiltrazioni dal lastrico, impianti idrici vecchi, bagni molto piccoli o verifiche su canne fumarie condominiali. In un patrimonio edilizio cresciuto rapidamente tra anni '70 e '90, il vero nodo è capire prima quanto lavoro serve davvero. Su RistrutturazionePreventivi.it puoi richiedere una stima immediata e gratuita basata sul profilo reale del tuo immobile.",
      },
      {
        title: "Impresa di Ristrutturazioni a Sant'Antimo",
        text: "Una buona impresa di ristrutturazioni a Sant'Antimo non si limita a rifare pavimenti e rivestimenti, ma aiuta a leggere correttamente il fabbricato prima ancora di iniziare. In molti condomini della zona il problema non è solo l'appartamento, ma il rapporto con parti comuni datate, colonne montanti usurate, infiltrazioni dall'alto o situazioni edilizie da chiarire. Per questo avere un unico referente operativo è utile: consente di coordinare le lavorazioni, evitare errori di sequenza e affrontare il cantiere con un piano più realistico.",
      },
      {
        title: "Preventivo Ristrutturazione a Sant'Antimo",
        text: "Chiedere un preventivo di ristrutturazione a Sant'Antimo ha senso quando il documento riesce a distinguere tra lavori estetici e problemi che possono incidere davvero sul cantiere. La spesa cambia se bisogna rifare bagno e cucina, sostituire impianti obsoleti, gestire un accesso difficile in condominio oppure attendere la soluzione di criticità comuni come infiltrazioni o scarichi. Sapere questo prima evita false aspettative e rende più semplice stabilire priorità e budget. Su RistrutturazionePreventivi.it il preventivo è immediato e gratuito, con conferma finale dopo sopralluogo tecnico.",
      },
    ],
  },

  {
    slug: "melito-di-napoli",
    nome: "Melito di Napoli",
    provincia: "napoli",
    zona: "napoli",
    metaTitle: "Ristrutturazione Casa a Melito di Napoli | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Melito di Napoli: costi reali, criticità locali e preventivo online immediato. Il preventivo definitivo richiede sopralluogo tecnico.",
    descrizione: "Melito di Napoli è un comune dell'area nord di Napoli con un tessuto edilizio prevalentemente condominiale, sviluppatosi rapidamente tra gli anni '60 e gli anni '90. La vicinanza a Napoli e la buona connessione viaria hanno favorito una forte crescita residenziale.",
    tipoEdilizio: "Condomini anni '60-'90; palazzine di media altezza; alcune aree di edilizia popolare",
    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '60-'70",
      "Umidità di infiltrazione e risalita nei piani terra e seminterrati",
      "Impianti condominiali obsoleti: aggiornamento necessario in caso di interventi su bagni o cucine",
      "Abusi edilizi non condonati",
    ],
    caratteristicheBagni: "Bagni compatti (sotto i 5 mq) nei condomini più vecchi, standard nelle costruzioni degli anni '80-'90. Impianti originali spesso ancora in funzione.",
    caratteristicheCucine: "Cucine compatte e separate. Frequente presenza di cappa non a norma collegata a canna fumaria condominiale.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a Melito di Napoli?",
        risposta: "In base al Prezzario Regionale Campania, i costi orientativi per un bagno 4-5 mq vanno da circa 4.500 € (base) a 8.500 € (premium). Nei condomini degli anni '60-'70 con impianti originali da sostituire, il costo tende al limite superiore.",
      },
      {
        domanda: "Ho un seminterrato a Melito di Napoli con problemi di umidità. Posso ristrutturarlo?",
        risposta: "Sì, ma l'umidità va affrontata con metodo. Nei seminterrati dell'area nord di Napoli l'umidità ha spesso una doppia origine: risalita capillare dalle fondazioni e condensa da scarsa ventilazione. Trattarla superficialmente (solo impermeabilizzante) non risolve il problema. Il sopralluogo identifica la causa specifica e permette di progettare l'intervento corretto.",
      },
      {
        domanda: "Nell'appartamento di mia madre anni '60 a Melito il bagno è piccolo e con impianti originali. Quanto costerebbe rifarlo completamente?",
        risposta: "Un bagno degli anni '60 con impianti originali è quasi certamente da rifare integralmente: tubazioni in piombo o acciaio zincato, impianto elettrico non a norma, rivestimenti in mosaico con adesivo a base di catrame. La stima orientativa per un bagno sotto i 5 mq con rifacimento completo è di 4.500-7.500 € a seconda della finitura scelta. Il sopralluogo tecnico definisce il costo reale.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Melito di Napoli?",
        risposta: "In base al Prezzario Regionale Campania, per i bagni compatti dei condomini anni '60-'70 (sotto i 5 mq) la forbice è 4.500-8.500 €. Per i bagni standard nelle costruzioni anni '80-'90 (5-6 mq) la forbice è 5.000-9.500 €. Un bagno degli anni '60 con impianti originali è quasi sempre da rifare integralmente: tubazioni in piombo, impianto elettrico non a norma, adesivi storici non compatibili con nuovi rivestimenti.",
      },
      {
        domanda: "Ho umidità al piano terra del mio condominio a Melito. Devo risolverla prima di rifare il bagno?",
        risposta: "Dipende dalla posizione del bagno. Se il bagno è al piano terra e l'umidità riguarda le pareti perimetrali, è necessario trattare prima l'umidità, altrimenti le nuove piastrelle si staccano entro 1-2 anni. Se il bagno è a un piano superiore e l'umidità riguarda solo altri ambienti, puoi procedere. Al sopralluogo verifichiamo la situazione specifica.",
      },
      {
        domanda: "Nel mio appartamento anni '60 a Melito ci sono ancora le tubazioni in piombo. Cosa faccio durante la ristrutturazione del bagno?",
        risposta: "Le tubazioni in piombo vanno sostituite obbligatoriamente: il piombo contamina l'acqua potabile ed è classificato come sostanza tossica. La sostituzione durante la ristrutturazione del bagno ha un costo marginale rispetto all'intervento totale, perché le tracce sono già aperte. Includiamo sempre la sostituzione delle tubazioni interne all'appartamento nel preventivo.",
      },
    ],
    vicini: ["napoli", "sant-antimo", "mugnano-di-napoli", "casandrino"],
    seoSections: [
      {
        title: "Costo Ristrutturazione Melito di Napoli",
        text: "Quando si parla di costo ristrutturazione a Melito di Napoli, la vera differenza non la fa solo la finitura scelta, ma lo stato di partenza dell'appartamento. Il prezzo parte da 550 €/mq per interventi completi nelle condizioni più semplici, però nei condomini sviluppati tra anni '60 e '90 incidono molto la presenza di impianti originali, bagni piccoli, umidità ai piani bassi e vecchie tubazioni da sostituire. In pratica, due case con la stessa metratura possono richiedere investimenti molto diversi. Su RistrutturazionePreventivi.it puoi ottenere una stima immediata e gratuita costruita sulle caratteristiche concrete dell'immobile.",
      },
      {
        title: "Impresa di Ristrutturazioni a Melito di Napoli",
        text: "A Melito di Napoli scegliere un'impresa di ristrutturazioni significa soprattutto evitare interventi impostati in modo superficiale. In molti edifici della zona il cantiere interno si intreccia con criticità tipiche dei condomini costruiti in più fasi: scarichi datati, canne fumarie da controllare, umidità nei piani terra e verifiche sull'effettivo stato degli impianti. Un referente unico che coordina demolizioni, murature, impiantistica e finiture rende il lavoro più leggibile e riduce il rischio di scoprire problemi importanti quando i lavori sono già partiti.",
      },
      {
        title: "Preventivo Ristrutturazione a Melito di Napoli",
        text: "Un preventivo di ristrutturazione a Melito di Napoli diventa davvero utile quando non si limita a dare un numero, ma aiuta a capire dove si concentra il costo dell'intervento. Rifare bagno e cucina, sostituire le linee idriche, trattare umidità pregresse, lavorare in un condominio con accessi stretti o adeguare impianti fuori standard sono tutte variabili che pesano sul risultato finale. Metterle a fuoco prima permette di pianificare meglio il cantiere e di evitare stime troppo ottimistiche. Su RistrutturazionePreventivi.it il preventivo è immediato e gratuito, con conferma conclusiva dopo sopralluogo tecnico.",
      },
    ],
  },

  {
    slug: "mugnano-di-napoli",
    nome: "Mugnano di Napoli",
    provincia: "napoli",
    zona: "napoli",
    metaTitle: "Ristrutturazione Casa a Mugnano di Napoli | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Mugnano di Napoli: costi reali, criticità edilizie locali e preventivo online immediato.",
    descrizione: "Mugnano di Napoli è un comune dell'area nord-ovest di Napoli, con un tessuto edilizio prevalentemente condominiale degli anni '60-'80. La densità abitativa è elevata e le abitazioni sono in larga parte appartamenti in condominio.",
    tipoEdilizio: "Condomini anni '60-'80; palazzine di media altezza; edilizia compatta",
    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '60-'70",
      "Impianti condominiali vetusti: colonne scarico e montanti idrici da decenni senza manutenzione",
      "Umidità da infiltrazione nei piani alti e da risalita nei piani terra",
      "Abusi edilizi non condonati nelle zone di espansione",
    ],
    caratteristicheBagni: "Bagni compatti nelle palazzine degli anni '60-'70 (sotto i 5 mq); standard nelle costruzioni degli anni '80. Impianti originali da sostituire.",
    caratteristicheCucine: "Cucine separate e compatte. Verifica canna fumaria obbligatoria prima di qualsiasi intervento.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a Mugnano di Napoli?",
        risposta: "In base al Prezzario Regionale Campania, i costi orientativi per un bagno 4-5 mq vanno da circa 4.500 € (base) a 8.500 € (premium). Nei condomini degli anni '60-'70 con impianti originali, il costo reale è tendenzialmente nel range superiore.",
      },
      {
        domanda: "Ho un appartamento al quinto piano di un condominio anni '70 a Mugnano. Ho problemi di scarico lento. È un problema condominiale?",
        risposta: "Gli scarichi lenti nei piani alti sono spesso un sintomo del deterioramento delle colonne scarico condominiali, non solo dell'impianto del singolo appartamento. Il problema può essere parzialmente risolto sostituendo i tratti di impianto interno all'appartamento, ma per una soluzione definitiva è necessario intervenire sulla colonna condominiale, che richiede delibera assembleare.",
      },
      {
        domanda: "Posso trasformare il bagno piccolo degli anni '70 in un bagno moderno funzionale senza aumentare lo spazio?",
        risposta: "Assolutamente sì. I bagni compatti anni '70 beneficiano moltissimo di una ristrutturazione ben progettata: sanitari sospesi al posto di quelli a terra (guadagni 15-20 cm a pavimento), doccia al posto della vasca, grande specchio e illuminazione ottimizzata, mensole integrate. Con 4-5 mq ben progettati si ottiene un bagno funzionale e piacevole. Lo progettiamo insieme al sopralluogo.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Mugnano di Napoli?",
        risposta: "In base al Prezzario Regionale Campania, per i bagni compatti delle palazzine anni '60-'70 (sotto i 5 mq) la forbice è 4.500-8.500 €. Per i bagni standard delle costruzioni anni '80 (5-6 mq) la forbice è 5.000-9.500 €. Le colonne scarico e i montanti idrici condominiali vetusti sono la criticità principale: se deteriorati, aggiungono costi al preventivo dell'appartamento.",
      },
      {
        domanda: "Ho scarichi lenti al quinto piano del mio condominio a Mugnano. Il problema è mio o condominiale?",
        risposta: "Quasi sempre condominiale. Le colonne scarico nei condomini anni '70 di Mugnano sono spesso in ghisa o pvc di prima generazione, deteriorate internamente. Il problema si manifesta prima ai piani alti. Puoi risolvere i tratti interni al tuo appartamento durante la ristrutturazione del bagno, ma la soluzione definitiva richiede che il condominio intervenga sulla colonna comune.",
      },
      {
        domanda: "Posso ricavare un bagno funzionale da soli 4 mq a Mugnano di Napoli?",
        risposta: "Sì. Con sanitari sospesi, doccia a filo pavimento al posto della vasca, grande specchio che amplifica la percezione dello spazio, e illuminazione a LED integrata nel controsoffitto si trasforma completamente anche un bagno di 3,5-4 mq. Progettiamo lo spazio al sopralluogo con misure reali, non a occhio.",
      },
    ],
    vicini: ["napoli", "giugliano-in-campania", "melito-di-napoli", "villaricca"],
    seoSections: [
      {
        title: "Costo Ristrutturazione Mugnano di Napoli",
        text: "Il costo di una ristrutturazione a Mugnano di Napoli parte da 550 €/mq per interventi completi nelle condizioni più semplici. Il prezzo finale dipende dalle condizioni dell'appartamento, dallo stato di impianti e scarichi, dall'eventuale necessità di adeguare parti obsolete e dal livello delle finiture scelte. In un contesto fatto soprattutto di condomini costruiti tra anni '60 e '80, è importante valutare bene il rapporto tra lavori interni e possibili criticità legate agli impianti comuni. Su RistrutturazionePreventivi.it puoi richiedere un preventivo immediato e gratuito, basato sulle caratteristiche reali del tuo immobile.",
      },
      {
        title: "Impresa di Ristrutturazioni a Mugnano di Napoli",
        text: "Affidarsi a un'impresa di ristrutturazioni a Mugnano di Napoli consente di gestire con un solo referente opere murarie, impianti, demolizioni, finiture e organizzazione complessiva del cantiere. Negli edifici più datati della zona è spesso necessario verificare prima condizioni delle colonne di scarico, montanti idrici, canne fumarie e distribuzione interna degli ambienti. Una gestione coordinata aiuta a prevenire imprevisti, a definire meglio le priorità dell'intervento e a ottenere un risultato finale più funzionale e duraturo.",
      },
      {
        title: "Preventivo Ristrutturazione a Mugnano di Napoli",
        text: "Richiedere un preventivo per ristrutturare casa a Mugnano di Napoli permette di chiarire in anticipo costi, lavorazioni e soluzioni più adatte all'immobile. Il preventivo viene impostato in base a metratura, stato dei locali, eventuali sostituzioni impiantistiche, facilità di accesso al fabbricato e finiture richieste. Questo consente di evitare valutazioni approssimative e di pianificare l'intervento con maggiore precisione. Su RistrutturazionePreventivi.it il preventivo è immediato e gratuito, con conferma conclusiva dopo sopralluogo tecnico.",
      },
    ],
  },

  {
    slug: "villaricca",
    nome: "Villaricca",
    provincia: "napoli",
    zona: "napoli",
    metaTitle: "Ristrutturazione Casa a Villaricca | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Villaricca: costi reali basati sul Prezzario Campania, criticità edilizie e preventivo online immediato.",
    descrizione: "Villaricca è un comune dell'area nord-ovest di Napoli con un tessuto edilizio misto: palazzine degli anni '70-'80 nel centro e una consistente espansione residenziale degli anni '90-2000 nelle zone periferiche con villette e condomini.",
    tipoEdilizio: "Palazzine anni '70-'80 nel centro; villette e condomini anni '90-2000 nell'espansione",
    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '70",
      "Umidità di risalita nei piani terra delle costruzioni più datate",
      "Abusi edilizi frequenti nelle zone di espansione degli anni '90",
      "Impianti idrici in acciaio zincato nelle palazzine degli anni '70-'80",
    ],
    caratteristicheBagni: "Bagni di dimensioni variabili: compatti nelle palazzine anni '70 (4-5 mq), standard nelle costruzioni successive (5-7 mq). Impianti da aggiornare.",
    caratteristicheCucine: "Cucine separate nelle palazzine; ampie nelle villette. Canna fumaria da verificare prima di interventi nelle palazzine più vecchie.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a Villaricca?",
        risposta: "I costi orientativi basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Nelle palazzine degli anni '70 con impianti originali, il costo tende al limite superiore.",
      },
      {
        domanda: "Devo fare la CILA per ristrutturare il bagno nella mia palazzina a Villaricca?",
        risposta: "Se sostituisci solo sanitari e rivestimenti senza spostare impianti o modificare tramezzi, la manutenzione ordinaria non richiede pratiche edilizie. La CILA è necessaria per interventi che modificano la distribuzione degli spazi o spostano impianti. Il nostro tecnico chiarisce cosa è necessario per il tuo intervento specifico prima del preventivo.",
      },
      {
        domanda: "Ho una villetta degli anni '90 a Villaricca. Voglio ristrutturare sia il bagno che la cucina. Conviene fare tutto insieme?",
        risposta: "Fare bagno e cucina insieme ha vantaggi concreti: l'impresa è già in casa, le pratiche burocratiche si gestiscono una sola volta, i costi di cantiere (ponteggi, smaltimento, trasferta) si dividono su due interventi. Il risparmio rispetto a due cantieri separati è di solito il 10-15% sull'importo totale.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Villaricca?",
        risposta: "In base al Prezzario Regionale Campania, per i bagni compatti nelle palazzine anni '70 (4-5 mq) la forbice è 4.500-9.000 €. Per i bagni standard nelle costruzioni anni '90-2000 (5-7 mq) la forbice è 5.000-13.000 €. Le tubazioni in acciaio zincato nelle palazzine degli anni '70-'80 richiedono quasi sempre la sostituzione integrale.",
      },
      {
        domanda: "Ho una villetta anni '90 a Villaricca e voglio rifare bagno e cucina. Conviene farlo insieme?",
        risposta: "Quasi sempre sì. L'impresa è già in cantiere, i costi fissi si dividono su due interventi, e hai un solo periodo di disagio invece di due. Il risparmio sul totale è 10-15%. Forniamo sempre preventivi separati e combinati: la scelta è tua con i numeri davanti.",
      },
      {
        domanda: "Serve la CILA per rifare il bagno nella mia palazzina a Villaricca?",
        risposta: "Solo se sposti impianti o modifichi tramezzi. La sostituzione di sanitari e rivestimenti nella stessa posizione è manutenzione ordinaria: nessuna pratica. Se invece sposti il WC, demolisci una tramezza o sposti le tracce degli impianti, serve la CILA al Comune di Villaricca prima dell'inizio lavori.",
      },
    ],
    vicini: ["napoli", "giugliano-in-campania", "mugnano-di-napoli", "casandrino"],
    seoSections: [
      {
        title: "Costo Ristrutturazione Villaricca",
        text: "Il costo di una ristrutturazione a Villaricca parte da 550 €/mq per interventi completi nelle condizioni più semplici. Il prezzo finale varia in base allo stato dell'immobile, alla qualità delle finiture, all'eventuale rifacimento degli impianti e alla tipologia edilizia, che nel comune passa dalle palazzine anni '70-'80 alle villette e ai condomini più recenti. Proprio questa differenza tra edifici più datati ed espansioni residenziali successive rende importante una valutazione concreta dei lavori prima di definire il budget. Su RistrutturazionePreventivi.it puoi ottenere un preventivo immediato e gratuito basato sulle caratteristiche reali della casa.",
      },
      {
        title: "Impresa di Ristrutturazioni a Villaricca",
        text: "Scegliere un'impresa di ristrutturazioni a Villaricca significa affidare a un unico interlocutore la gestione di demolizioni, opere murarie, impianti, rivestimenti e coordinamento operativo del cantiere. Nelle palazzine più vecchie della zona conviene verificare con attenzione tubazioni idriche, canne fumarie, umidità di risalita e distribuzione interna degli ambienti, mentre nelle villette e negli immobili più recenti il focus spesso si sposta su funzionalità degli spazi e aggiornamento delle finiture. Una gestione ordinata riduce il rischio di imprevisti e consente di programmare meglio tempi, priorità e costi dell'intervento.",
      },
      {
        title: "Preventivo Ristrutturazione a Villaricca",
        text: "Richiedere un preventivo per ristrutturare casa a Villaricca è il modo più utile per capire con precisione quali lavorazioni servono e quale investimento prevedere. Il preventivo dipende da metratura, stato iniziale dell'immobile, eventuale rifacimento di bagno e cucina, condizioni degli impianti esistenti, accessibilità del fabbricato e livello delle finiture desiderate. In questo modo si evitano stime generiche e si imposta l'intervento su basi molto più realistiche. Su RistrutturazionePreventivi.it il preventivo è immediato e gratuito, con verifica finale tramite sopralluogo tecnico.",
      },
    ],
  },

  {
    slug: "casandrino",
    nome: "Casandrino",
    provincia: "napoli",
    zona: "napoli",
    metaTitle: "Ristrutturazione Casa a Casandrino | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Casandrino: costi reali basati sul Prezzario Campania, criticità locali e preventivo online immediato.",
    descrizione: "Casandrino è un comune dell'area nord di Napoli con un tessuto edilizio prevalentemente composto da palazzine degli anni '60-'80 e alcune zone di espansione recente. La prossimità a Napoli e a Giugliano in Campania ne fa un comune a forte vocazione residenziale.",
    tipoEdilizio: "Palazzine anni '60-'80 nel centro; espansione recente con condomini di qualità media",
    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '60-'70",
      "Umidità di risalita nei piani terra, frequente nelle costruzioni più datate",
      "Impianti condominiali obsoleti nelle palazzine più vecchie",
      "Abusi edilizi non condonati nelle espansioni private",
    ],
    caratteristicheBagni: "Bagni compatti nelle palazzine degli anni '60-'70 (sotto i 5 mq); standard nelle costruzioni successive. Impianti spesso da aggiornare.",
    caratteristicheCucine: "Cucine separate e compatte. Verifica canna fumaria obbligatoria prima di interventi nelle palazzine più vecchie.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a Casandrino?",
        risposta: "In base al Prezzario Regionale Campania, i costi orientativi per un bagno 4-5 mq vanno da circa 4.500 € a 8.500 €. Il sopralluogo tecnico quantifica le variabili specifiche dell'immobile.",
      },
      {
        domanda: "Il mio appartamento a Casandrino ha il bagno e la cucina adiacenti. Posso abbatterli e ricavare un bagno più grande?",
        risposta: "È tecnicamente possibile se il muro tra i due ambienti non è portante. Serve però un progetto attento: lo spazio sottratto alla cucina va compensato, gli impianti vanno riprogettati, e per la modifica degli spazi interni serve una CILA o permesso di costruire a seconda dell'entità. Al sopralluogo verifichiamo la fattibilità strutturale e ti presentiamo le opzioni.",
      },
      {
        domanda: "Quanto dura il cantiere per la ristrutturazione di un bagno a Casandrino?",
        risposta: "Un bagno di 4-5 mq con rifacimento completo richiede mediamente 2-3 settimane lavorative. I tempi si allungano se è necessaria la bonifica di impianti in amianto, la sostituzione delle colonne condominiali o se emergono criticità strutturali al sopralluogo.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Casandrino?",
        risposta: "In base al Prezzario Regionale Campania, per i bagni compatti delle palazzine anni '60-'70 (sotto i 5 mq) la forbice è 4.500-8.500 €. Per i bagni standard nelle costruzioni successive (5-6 mq) la forbice è 5.000-9.500 €. Nelle palazzine più vecchie con canne fumarie in amianto, la bonifica preventiva obbligatoria va inserita nel piano costi prima di qualsiasi intervento sulla cucina adiacente.",
      },
      {
        domanda: "Il mio appartamento a Casandrino ha bagno e cucina adiacenti. Posso allargare il bagno ricavando spazio dalla cucina?",
        risposta: "È fattibile se il muro divisorio è una tramezza non portante. Serve una CILA per la modifica degli spazi interni. L'intervento va progettato con attenzione: lo spazio tolto alla cucina va compensato nella distribuzione dei mobili, e tutti gli impianti vanno riprogettati. Al sopralluogo verifichiamo la struttura del muro e progettiamo l'intervento se fattibile.",
      },
      {
        domanda: "Quanto tempo dura la ristrutturazione del bagno a Casandrino?",
        risposta: "Per un bagno di 4-5 mq nelle palazzine di Casandrino, mediamente 2-3 settimane lavorative. I tempi si allungano se è necessaria la sostituzione di colonne condominiali (richiede coordinamento col condominio) o la bonifica di materiali in amianto.",
      },
    ],
    vicini: ["napoli", "villaricca", "mugnano-di-napoli", "grumo-nevano"],
  },

  {
    slug: "grumo-nevano",
    nome: "Grumo Nevano",
    provincia: "napoli",
    zona: "napoli",
    metaTitle: "Ristrutturazione Casa a Grumo Nevano | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Grumo Nevano: costi reali, criticità edilizie e preventivo online immediato.",
    descrizione: "Grumo Nevano è un comune dell'area nord di Napoli, al confine con la provincia di Caserta. Il tessuto edilizio è prevalentemente composto da palazzine degli anni '70-'90 con alcune aree di edilizia residenziale più recente. La posizione di confine tra le due province lo rende un comune con caratteristiche edilizie ibride.",
    tipoEdilizio: "Palazzine anni '70-'90; nucleo storico con edifici più datati; edilizia recente nelle zone periferiche",
    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '70",
      "Umidità di risalita nelle abitazioni di piano terra",
      "Abusi edilizi non condonati nelle espansioni private",
      "Impianti idrici vetusti nelle palazzine più datate",
    ],
    caratteristicheBagni: "Bagni standard nei condomini degli anni '80-'90; più compatti nelle palazzine storiche. Sanitari e rivestimenti degli anni '80-'90 frequentemente da aggiornare.",
    caratteristicheCucine: "Cucine separate di medie dimensioni. Canna fumaria condominiale da verificare nelle palazzine più vecchie.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a Grumo Nevano?",
        risposta: "I costi orientativi basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Il sopralluogo tecnico quantifica le variabili specifiche dell'immobile.",
      },
      {
        domanda: "Vivo a Grumo Nevano ma il confine comunale è vicino ad Aversa. Intervenite anche nella mia zona?",
        risposta: "Sì, operiamo su tutto il territorio di Grumo Nevano e nei comuni limitrofi sia in provincia di Napoli che di Caserta. La posizione al confine tra le due province non è un problema: il nostro intervento dipende dall'indirizzo specifico, non dalla provincia.",
      },
      {
        domanda: "Ho un appartamento degli anni '80 a Grumo Nevano con rivestimenti in ceramica fino a metà parete. Conviene toglierli o posarci sopra?",
        risposta: "La scelta tra rimozione e sovrapposa dipende da: spessore dei vecchi rivestimenti (se già sovrapposti una volta, una seconda volta può creare problemi di peso e planarità), adesione al supporto (se ci sono zone staccate, vanno rimosse), e tipo di intervento (se rifai anche gli impianti, è meglio rimuovere tutto). Al sopralluogo valutiamo la situazione e ti diciamo qual è la soluzione più conveniente.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Grumo Nevano?",
        risposta: "In base al Prezzario Regionale Campania, per le palazzine anni '70-'90 (bagni 5-6 mq) la forbice è 5.000-9.500 €. Grumo Nevano è al confine tra le province di Napoli e Caserta: le caratteristiche edilizie sono ibride tra i condomini napoli-nord degli anni '70-'80 e le palazzine casertane. Le tubazioni in acciaio zincato sono frequenti nelle costruzioni degli anni '70-'80 e richiedono spesso sostituzione.",
      },
      {
        domanda: "Grumo Nevano è al confine con la provincia di Caserta. Operate comunque qui?",
        risposta: "Sì, operiamo su tutto il territorio di Grumo Nevano. Siamo basati a Lusciano, a pochi minuti di distanza: la logistica è ottimale e le trasferte sono rapide. La provincia di appartenenza non fa differenza per i nostri interventi.",
      },
      {
        domanda: "Ho rivestimenti in ceramica a metà parete nel bagno anni '80. Li rimuovo o ci poso sopra?",
        risposta: "Se stai facendo un rifacimento completo con sostituzione degli impianti, quasi sempre conviene rimuovere tutto: le tracce degli impianti vanno comunque aperte, e lavorare su una superficie pulita garantisce impermeabilizzazione a norma e aderenza ottimale dei nuovi rivestimenti. La sovrapposa è conveniente solo per interventi cosmetici senza toccare gli impianti.",
      },
    ],
    vicini: ["sant-antimo", "casandrino", "napoli", "aversa"],
  },
];

// ─────────────────────────────────────────────
// ZONA: CASERTA E PROVINCIA (9 comuni)
// ─────────────────────────────────────────────

export const comuniCaserta: Comune[] = [
  {
    slug: "caserta",
    nome: "Caserta",
    provincia: "caserta",
    zona: "caserta",
    metaTitle: "Ristrutturazione Casa a Caserta | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Caserta: costi reali per appartamenti e ville, criticità locali e preventivo online immediato.",
    descrizione: "Caserta è il capoluogo di provincia, con un tessuto edilizio che varia dalla zona del centro storico e delle ville storiche nei pressi della Reggia, alle palazzine degli anni '60-'80 nelle zone residenziali, fino alle villette dell'espansione periferica degli anni '90-2000. Ogni zona ha caratteristiche edilizie e iter autorizzativi differenti.",
    tipoEdilizio: "Centro storico con edifici d'epoca e palazzi signorili; palazzine anni '60-'80 nelle zone residenziali (Pietro Nenni, Acquaviva); villette anni '90-2000 in periferia",
    criticalita: [
      "Centro storico: alcune zone sono soggette a vincoli paesaggistici e della Soprintendenza (vicinanza Reggia e Belvedere)",
      "Canne fumarie in amianto nei condomini degli anni '60-'70",
      "Umidità di risalita nelle abitazioni del centro storico e nei piani terra dei condomini",
      "Impianti condominiali obsoleti: negli edifici degli anni '60-'70, frequente assenza di aggiornamento degli impianti idrici condominiali",
    ],
    caratteristicheBagni: "Bagni di dimensioni variabili: ampi negli appartamenti signorili del centro, compatti (sotto 5 mq) nelle palazzine degli anni '70. Nei condomini più vecchi, impianti idrici originali spesso in piombo o acciaio zincato.",
    caratteristicheCucine: "Cucine separate nelle palazzine; più ampie negli appartamenti del centro. Frequente necessità di aggiornamento impianto gas e cappa.",
    faq: [
      {
        domanda: "Ho un appartamento vicino alla Reggia di Caserta. Ci sono vincoli per ristrutturare?",
        risposta: "La vicinanza alla Reggia non implica automaticamente vincoli sugli interni. I vincoli della Soprintendenza riguardano prevalentemente facciate, prospetti e interventi visibili dall'esterno. Per lavori interni (bagno, cucina) senza modifiche strutturali, di solito è sufficiente una CILA. È sempre utile verificare la classificazione urbanistica specifica dell'immobile prima di procedere.",
      },
      {
        domanda: "Quanto costa ristrutturare la cucina a Caserta?",
        risposta: "In base al Prezzario Regionale Campania, i costi orientativi per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Negli appartamenti del centro con impianti d'epoca, il costo tende al limite superiore. Il sopralluogo tecnico chiarisce la situazione specifica.",
      },
      {
        domanda: "Quanto tempo ci vuole per ristrutturare un bagno a Caserta?",
        risposta: "Un bagno standard (5-6 mq) con rifacimento completo richiede mediamente 2-3 settimane lavorative. Negli appartamenti condominiali, i tempi dipendono anche dalla logistica (accesso, orari condominio, smaltimento macerie). Il programma lavori viene definito al sopralluogo.",
      },
      {
        domanda: "Voglio ristrutturare un appartamento degli anni '70 nel quartiere Pietro Nenni a Caserta. Da dove conviene iniziare?",
        risposta: "Per un appartamento degli anni '70, l'ordine logico è: prima una verifica degli impianti (elettrico e idrico), poi una valutazione dell'umidità nelle pareti perimetrali, e infine la programmazione degli interventi. Spesso conviene fare impianti e rifiniture in sequenza unica per ottimizzare i costi. Il sopralluogo identifica le priorità e permette di pianificare in modo efficiente.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Caserta?",
        risposta: "In base al Prezzario Regionale Campania, per un bagno standard di 5-6 mq nelle palazzine del quartiere Pietro Nenni o Acquaviva il costo indicativo è 5.000-9.500 €. Negli appartamenti del centro storico con impianti d'epoca (piombo o acciaio zincato) il costo tende al limite superiore. Un bagno nei complessi anni '90 in periferia con impianti in buono stato si attesta più vicino al range base.",
      },
      {
        domanda: "Ci sono vincoli per ristrutturare il bagno vicino alla Reggia di Caserta?",
        risposta: "I vincoli della Soprintendenza riguardano le facciate e gli elementi storico-architettonici visibili dall'esterno. I lavori interni come il rifacimento del bagno non richiedono autorizzazione della Soprintendenza. Per interventi che modificano gli spazi interni (spostamento tramezzi, modifica impianti) è sufficiente una CILA al Comune di Caserta.",
      },
      {
        domanda: "Ho impianti in piombo nell'appartamento storico di Caserta. Cosa succede durante la ristrutturazione del bagno?",
        risposta: "Le tubazioni in piombo vanno sostituite per legge in caso di interventi sull'impianto idrico. La ristrutturazione del bagno è il momento ideale perché le tracce sono già aperte. La sostituzione dei tratti interni all'appartamento ha un costo marginale rispetto al totale, ma è un intervento che non va rimandato: il piombo contamina l'acqua potabile.",
      },
      {
        domanda: "L'acqua a Caserta è dura. Cosa scelgo per il bagno?",
        risposta: "L'acqua della zona di Caserta è calcarea. Per la rubinetteria, privilegia modelli con rompigetto intercambiabile anti-calcare. Per i rivestimenti, i gres porcellanati opachi mostrano meno il calcare rispetto ai lucidi. Per il box doccia, profili minimi o assenza di profili facilitano la pulizia. Ne parliamo durante la scelta dei materiali al sopralluogo.",
      },
    ],
    vicini: ["casagiove", "san-prisco", "recale", "marcianise"],
    seoSections: [
      {
        title: "Costo Ristrutturazione Caserta",
        text: "Stimare il costo di una ristrutturazione a Caserta richiede più attenzione della media, perché nella stessa città convivono immobili molto diversi tra loro. Si passa da appartamenti in edifici storici o signorili del centro a palazzine residenziali degli anni '60-'80, fino a villette e complessi più recenti nelle zone di espansione. Il prezzo parte da 550 €/mq per interventi completi nelle condizioni più semplici, ma può cambiare sensibilmente se entrano in gioco impianti d'epoca, vincoli indiretti, umidità o distribuzioni interne da ripensare. Su RistrutturazionePreventivi.it puoi ottenere una stima immediata e gratuita basata sulle caratteristiche concrete dell'immobile.",
      },
      {
        title: "Impresa di Ristrutturazioni a Caserta",
        text: "A Caserta il valore di un'impresa di ristrutturazioni si vede soprattutto nella capacità di adattare il cantiere al contesto urbano e edilizio. Un appartamento vicino alla Reggia o inserito in un fabbricato storico non si affronta come una casa in una palazzina anni '70 di zona residenziale, e non si organizza come una villetta recente in periferia. Servono lettura tecnica dell'immobile, coordinamento tra opere murarie e impianti, attenzione ai vincoli e una gestione ordinata delle fasi di lavoro. Quando questa regia manca, i costi tendono a salire e i tempi a complicarsi.",
      },
      {
        title: "Preventivo Ristrutturazione a Caserta",
        text: "Un buon preventivo di ristrutturazione a Caserta deve aiutarti a capire non solo quanto spenderai, ma anche perché. Metratura, stato degli impianti, qualità delle finiture, eventuale rifacimento di bagno e cucina, posizione dell'immobile e complessità autorizzative incidono in modo diverso a seconda della zona della città e del tipo di edificio. Per questo le stime standard servono poco: è più utile un documento che faccia emergere subito le voci che possono pesare davvero sul cantiere. Su RistrutturazionePreventivi.it il preventivo è immediato e gratuito, con conferma finale dopo sopralluogo tecnico.",
      },
    ],
  },

  {
    slug: "marcianise",
    nome: "Marcianise",
    provincia: "caserta",
    zona: "caserta",
    metaTitle: "Ristrutturazione Casa a Marcianise | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Marcianise: costi reali basati sul Prezzario Campania, criticità edilizie e preventivo online immediato.",
    descrizione: "Marcianise è un comune con una forte componente industriale e commerciale, ma con un nucleo residenziale significativo composto da palazzine degli anni '60-'80 nel centro e villette nelle zone periferiche. La prossimità all'autostrada e al casello A30 ha favorito l'espansione residenziale.",
    tipoEdilizio: "Palazzine anni '60-'80 nel centro; villette anni '80-'00 nelle zone periferiche; edilizia mista",
    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '60-'70",
      "Umidità di risalita nei piani terra, frequente nelle costruzioni più datate",
      "Abusi edilizi non condonati nelle zone di espansione",
      "Vibrazioni da traffico pesante sulla SS7 Appia: possibili lesioni nei muri delle abitazioni prossime alla strada",
    ],
    caratteristicheBagni: "Bagni standard nelle palazzine degli anni '80; più compatti nei condomini anni '60-'70. Impianti spesso da aggiornare.",
    caratteristicheCucine: "Cucine separate, medie dimensioni. Canne fumarie da verificare nei condomini più vecchi.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a Marcianise?",
        risposta: "I costi orientativi basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Il sopralluogo tecnico quantifica le variabili specifiche dell'immobile.",
      },
      {
        domanda: "Ho crepe sui muri di casa a Marcianise vicino alla SS7. Cosa faccio prima di ristrutturare?",
        risposta: "Le abitazioni prossime ad arterie stradali ad alto traffico possono sviluppare lesioni da vibrazione nel tempo. Prima di qualsiasi rifinitura, è necessario valutare l'entità delle crepe: le fessure superficiali nell'intonaco si trattano con stucco elastico prima della tinteggiatura, ma le lesioni ai muri portanti richiedono una valutazione strutturale. Il nostro sopralluogo include questa verifica.",
      },
      {
        domanda: "Posso ristrutturare il bagno e la cucina contemporaneamente a Marcianise?",
        risposta: "Sì, e spesso conviene. L'impresa è già in casa, i costi fissi (trasferta, ponteggi interni, smaltimento) si distribuiscono su due interventi, e la logistica del cantiere è più efficiente. In media, fare bagno e cucina insieme costa il 10-15% in meno rispetto a due cantieri separati.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Marcianise?",
        risposta: "In base al Prezzario Regionale Campania, per i bagni compatti delle palazzine anni '60-'70 (sotto i 5 mq) la forbice è 4.500-8.500 €. Per i bagni standard nelle palazzine anni '80 e nelle villette periferiche (5-7 mq) la forbice è 5.000-13.000 €. Le abitazioni vicino alla SS7 Appia con lesioni da vibrazione richiedono un sopralluogo tecnico prima di qualsiasi rifinitura.",
      },
      {
        domanda: "Ho crepe nel bagno causate dal traffico sulla SS7 a Marcianise. Le tratto prima o dopo aver rifatto le piastrelle?",
        risposta: "Sempre prima. Le lesioni da vibrazione attiva si ripresentano sotto qualsiasi rivestimento nuovo se non trattate alla radice. Le fessure superficiali nell'intonaco si risolvono con stucco elastico prima della nuova posa. Se la lesione attraversa il muro, serve una valutazione strutturale. Lo verifichiamo al sopralluogo.",
      },
      {
        domanda: "Conviene fare bagno e cucina insieme a Marcianise?",
        risposta: "Sì, quasi sempre. I costi fissi si dividono su due interventi, si fa un solo cantiere e un solo periodo di disagio. Il risparmio rispetto a due cantieri separati è mediamente 10-15%. Preventivi separati e combinati vengono forniti al sopralluogo.",
      },
    ],
    vicini: ["caserta", "santa-maria-capua-vetere", "curti", "recale"],
    seoSections: [
      {
        title: "Costo Ristrutturazione Marcianise",
        text: "Il costo di una ristrutturazione a Marcianise va letto tenendo insieme due fattori: il tipo di casa e il contesto in cui si trova. In centro si incontrano spesso palazzine datate con impianti da aggiornare, mentre nelle aree più periferiche e residenziali sono frequenti abitazioni più recenti ma con esigenze diverse di distribuzione e finitura. Il prezzo parte da 550 €/mq per interventi completi nelle condizioni più semplici, ma può crescere se emergono umidità, lesioni pregresse, tubazioni obsolete o lavori preparatori non previsti. Su RistrutturazionePreventivi.it puoi richiedere una stima immediata e gratuita costruita sulle condizioni reali dell'immobile.",
      },
      {
        title: "Impresa di Ristrutturazioni a Marcianise",
        text: "A Marcianise un'impresa di ristrutturazioni è davvero utile quando riesce a gestire non solo il cantiere, ma anche le verifiche che precedono il cantiere. In alcune zone bisogna fare attenzione a edifici che mostrano i segni del tempo, in altre a immobili che sembrano più semplici ma nascondono problemi di impianti, umidità o microlesioni da monitorare prima delle finiture. Coordinare demolizioni, opere murarie, impiantistica e chiusure finali con un unico referente aiuta a evitare interventi parziali e scelte improvvisate.",
      },
      {
        title: "Preventivo Ristrutturazione a Marcianise",
        text: "Un preventivo di ristrutturazione a Marcianise dovrebbe permetterti di capire subito se il budget previsto è coerente con lo stato della casa. A incidere non sono solo i metri quadri, ma anche l'eventuale rifacimento completo di bagno e cucina, la sostituzione degli impianti, la presenza di criticità strutturali leggere, l'accesso al fabbricato e il livello delle finiture desiderate. Quando queste variabili vengono considerate dall'inizio, è più facile programmare lavori realistici e limitare le sorprese economiche. Su RistrutturazionePreventivi.it il preventivo è immediato e gratuito, con conferma finale dopo sopralluogo tecnico.",
      },
    ],
  },

  {
    slug: "curti",
    nome: "Curti",
    provincia: "caserta",
    zona: "caserta",
    metaTitle: "Ristrutturazione Casa a Curti | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Curti: costi reali basati sul Prezzario Campania, criticità edilizie locali e preventivo online immediato.",
    descrizione: "Curti è un comune di dimensioni ridotte nella provincia di Caserta, con un tessuto edilizio prevalentemente residenziale composto da palazzine degli anni '70-'80 e villette degli anni '90-2000. La sua posizione tra Caserta e Marcianise lo rende un comune a forte domanda abitativa.",
    tipoEdilizio: "Palazzine anni '70-'80 nel centro; villette e case a schiera anni '90-2000 nell'espansione",
    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '70",
      "Umidità di risalita nei piani terra delle costruzioni più datate",
      "Abusi edilizi nelle zone di espansione",
      "Impianti idrici in acciaio zincato nelle palazzine degli anni '70-'80",
    ],
    caratteristicheBagni: "Bagni standard nelle palazzine (4-6 mq); più ampi nelle villette. Sanitari degli anni '80-'90 da aggiornare.",
    caratteristicheCucine: "Cucine separate nelle palazzine; ampie nelle villette. Frequente necessità di adeguamento impianto gas.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a Curti?",
        risposta: "I costi orientativi basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Il sopralluogo tecnico chiarisce la situazione specifica.",
      },
      {
        domanda: "Ho una palazzina anni '70 a Curti. Devo sostituire le tubazioni durante la ristrutturazione del bagno?",
        risposta: "Nelle palazzine degli anni '70 le tubazioni idriche sono quasi certamente in acciaio zincato, che si corrode internamente nel tempo riducendo la portata e rilasciando impurità nell'acqua. Se il bagno è già aperto per la ristrutturazione, la sostituzione dei tratti di tubazione interni all'appartamento ha un costo marginale relativamente basso. Consigliamo quasi sempre di farlo per evitare di riaprire le tracce tra pochi anni.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Curti?",
        risposta: "In base al Prezzario Regionale Campania, per le palazzine anni '70-'80 (bagni 4-6 mq) la forbice è 4.500-9.500 €. Per le villette anni '90-2000 con bagni più ampi la forbice è 5.000-13.000 €. Le tubazioni in acciaio zincato negli edifici degli anni '70-'80 di Curti richiedono quasi sempre la sostituzione durante la ristrutturazione del bagno.",
      },
      {
        domanda: "Ho una palazzina anni '70 a Curti. Le tubazioni in acciaio zincato vanno sostituite per forza?",
        risposta: "Non per obbligo di legge, ma quasi sempre per convenienza pratica. Le tubazioni in acciaio zincato si corrodono internamente con il tempo: riduzione della portata, acqua con impurità, perdite ai raccordi. Se il bagno è già aperto per la ristrutturazione, sostituire i tratti interni all'appartamento ha un costo marginale. Non farlo significa riaprire tutto tra 3-5 anni.",
      },
      {
        domanda: "Serve la CILA per rifare il bagno a Curti?",
        risposta: "Solo se sposti impianti o modifichi tramezzi. La sostituzione di sanitari, rivestimenti e rubinetteria nella stessa posizione è manutenzione ordinaria. Per qualsiasi modifica alla distribuzione interna, serve la CILA al Comune di Curti prima dell'inizio lavori.",
      },
    ],
    vicini: ["caserta", "marcianise", "santa-maria-capua-vetere", "recale"],
    seoSections: [
      {
        title: "Costo Ristrutturazione Curti",
        text: "Il costo di una ristrutturazione a Curti parte da 550 €/mq per interventi completi nelle condizioni più semplici. Il prezzo finale dipende dalle condizioni reali dell'immobile, dal livello delle finiture, dall'eventuale sostituzione degli impianti e dalla tipologia edilizia, che nel comune varia tra palazzine anni '70-'80 e villette più recenti. Negli edifici più datati incidono soprattutto lo stato delle tubazioni e la necessità di aggiornare parti ormai obsolete. Su RistrutturazionePreventivi.it puoi ottenere un preventivo immediato e gratuito basato sulle caratteristiche reali della casa.",
      },
      {
        title: "Impresa di Ristrutturazioni a Curti",
        text: "Affidarsi a un'impresa di ristrutturazioni a Curti consente di coordinare con un solo referente demolizioni, opere murarie, impianti, rivestimenti e organizzazione del cantiere. Nelle palazzine più vecchie del comune è frequente dover verificare tubazioni idriche in acciaio zincato, umidità di risalita e distribuzione degli spazi interni, mentre nelle villette più recenti il lavoro si concentra più spesso su aggiornamento funzionale e finiture. Una gestione tecnica ordinata riduce il rischio di imprevisti e permette di pianificare meglio tempi e costi.",
      },
      {
        title: "Preventivo Ristrutturazione a Curti",
        text: "Richiedere un preventivo per ristrutturare casa a Curti è il modo più utile per capire in anticipo costi, lavorazioni e priorità dell'intervento. Il preventivo viene costruito considerando metratura, stato dell'immobile, eventuale rifacimento di bagno e cucina, condizioni degli impianti, accessibilità del fabbricato e livello delle finiture richieste. Questo evita valutazioni generiche e permette di programmare i lavori con maggiore precisione. Su RistrutturazionePreventivi.it il preventivo è immediato e gratuito, con conferma finale dopo sopralluogo tecnico.",
      },
    ],
  },

  {
    slug: "santa-maria-capua-vetere",
    nome: "Santa Maria Capua Vetere",
    provincia: "caserta",
    zona: "caserta",
    metaTitle: "Ristrutturazione Casa a Santa Maria Capua Vetere | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Santa Maria Capua Vetere: costi reali, criticità del centro storico e preventivo online immediato.",
    descrizione: "Santa Maria Capua Vetere è un comune di rilevanza storica, sede dell'antica Capua romana, con un centro storico ricco di reperti e vincoli archeologici. Il tessuto edilizio mescola edifici storici nel centro con palazzine degli anni '60-'80 nelle zone residenziali.",
    tipoEdilizio: "Centro storico con edifici d'epoca e zone di interesse archeologico; palazzine anni '60-'80; villette nelle zone periferiche",
    criticalita: [
      "Vincoli archeologici: scavi nel sottosuolo possono portare a scoperte che bloccano i lavori — fondamentale verificare la mappa dei vincoli prima di interventi strutturali",
      "Canne fumarie in amianto nei condomini degli anni '60-'70",
      "Umidità di risalita nelle abitazioni storiche, accentuata dalla presenza di falde acquifere superficiali",
      "Impianti idrici datati nelle costruzioni più vecchie",
    ],
    caratteristicheBagni: "Bagni di dimensioni variabili: compatti negli appartamenti storici del centro (sotto i 5 mq), standard nelle costruzioni successive. Impianti spesso originali.",
    caratteristicheCucine: "Cucine separate nelle palazzine; di dimensioni variabili nel centro storico. Canna fumaria da verificare prima di interventi.",
    faq: [
      {
        domanda: "Ho un appartamento nel centro storico di Santa Maria Capua Vetere. Ci sono vincoli per ristrutturare?",
        risposta: "A Santa Maria Capua Vetere i vincoli principali sono di natura archeologica: il sottosuolo è ricco di reperti romani e qualsiasi scavo o intervento che interessa le fondazioni può portare a scoperte che sospendono i lavori. Per interventi interni senza impatto sul sottosuolo (bagno, cucina, impianti a traccia) i vincoli sono generalmente limitati. Una verifica preventiva con il Comune è sempre consigliata.",
      },
      {
        domanda: "Quanto costa ristrutturare la cucina a Santa Maria Capua Vetere?",
        risposta: "I costi orientativi basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Negli appartamenti storici con impianti d'epoca, il costo tende al limite superiore.",
      },
      {
        domanda: "Ho umidità diffusa nel mio appartamento storico a Santa Maria Capua Vetere. Come si affronta?",
        risposta: "Gli edifici storici di Santa Maria Capua Vetere soffrono spesso di umidità da risalita capillare e da falde acquifere superficiali. Il trattamento corretto richiede un'analisi della causa: diversi tipi di umidità hanno soluzioni diverse. I trattamenti superficiali (pitture antimuffa, impermeabilizzanti) non risolvono il problema alla radice. Il sopralluogo include sempre la verifica delle cause.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Santa Maria Capua Vetere?",
        risposta: "In base al Prezzario Regionale Campania, per gli appartamenti storici del centro (bagni sotto i 5 mq con impianti d'epoca) la forbice è 4.500-9.500 €. Per i bagni standard nelle palazzine anni '60-'80 (5-6 mq) la forbice è 5.000-9.500 €. L'umidità da falde acquifere superficiali, frequente nel centro storico, richiede trattamenti specifici che vanno inclusi nel preventivo.",
      },
      {
        domanda: "Ho un appartamento nel centro storico di Santa Maria Capua Vetere con umidità nelle pareti del bagno. Come lo gestisco?",
        risposta: "L'umidità negli edifici storici di Santa Maria Capua Vetere è spesso alimentata da falde acquifere superficiali: il trattamento con soli impermeabilizzanti non basta. Al sopralluogo identifichiamo la causa (risalita capillare, falda, condensa) e progettiamo il trattamento corretto prima della nuova posa dei rivestimenti.",
      },
      {
        domanda: "Ci sono vincoli per rifare il bagno a Santa Maria Capua Vetere?",
        risposta: "I vincoli archeologici riguardano il sottosuolo: qualsiasi scavo che potrebbe incontrare reperti romani richiede autorizzazione. Per la ristrutturazione del bagno (lavori a traccia nelle pareti, non fondazioni) i vincoli sono generalmente limitati. Una CILA è sufficiente per interventi di manutenzione straordinaria. Verifica preventiva con il Comune sempre consigliata.",
      },
    ],
    vicini: ["caserta", "marcianise", "curti", "capua"],
  },

  {
    slug: "casapulla",
    nome: "Casapulla",
    provincia: "caserta",
    zona: "caserta",
    metaTitle: "Ristrutturazione Casa a Casapulla | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Casapulla: costi reali basati sul Prezzario Campania, criticità locali e preventivo online immediato.",
    descrizione: "Casapulla è un comune della provincia di Caserta con un tessuto edilizio prevalentemente residenziale, composto da palazzine degli anni '70-'80 e villette degli anni '90. Il comune è in posizione favorevole rispetto ai principali centri della provincia.",
    tipoEdilizio: "Palazzine anni '70-'80 nel centro; villette anni '90-2000 nelle zone di espansione",
    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '70",
      "Umidità di risalita nei piani terra delle palazzine più datate",
      "Abusi edilizi nelle zone di espansione",
      "Impianti idrici vetusti nelle costruzioni degli anni '70",
    ],
    caratteristicheBagni: "Bagni standard nelle palazzine (4-6 mq); più ampi nelle villette. Impianti degli anni '80-'90 spesso da aggiornare.",
    caratteristicheCucine: "Cucine separate nelle palazzine; ampie nelle villette. Verifica impianto gas necessaria nelle costruzioni più datate.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a Casapulla?",
        risposta: "I costi orientativi basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Il sopralluogo tecnico quantifica le variabili specifiche.",
      },
      {
        domanda: "Posso fare la ristrutturazione del bagno senza preavviso al condominio a Casapulla?",
        risposta: "Puoi iniziare lavori di manutenzione ordinaria (sostituzione sanitari e rivestimenti) senza necessità di comunicazioni formali. Per lavori più invasivi con demolizioni e rumori continuativi, è buona pratica avvisare l'amministratore e i vicini con qualche giorno di anticipo. La maggior parte dei regolamenti condominiali limita i lavori rumorosi a determinati orari.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Casapulla?",
        risposta: "In base al Prezzario Regionale Campania, per le palazzine anni '70-'80 (bagni 4-6 mq) la forbice è 4.500-9.500 €. Per le villette anni '90-2000 (bagni più ampi) la forbice è 5.000-13.000 €. Le canne fumarie in amianto nei condomini degli anni '70 vanno verificate prima di qualsiasi intervento sulla cucina adiacente al bagno.",
      },
      {
        domanda: "Devo avvisare il condominio prima di rifare il bagno a Casapulla?",
        risposta: "Per manutenzione ordinaria (sostituzione sanitari e rivestimenti) non ci sono obblighi formali. Per lavori con demolizioni e rumore continuativo è buona pratica avvisare l'amministratore e i vicini con qualche giorno di anticipo. I regolamenti condominiali solitamente limitano i lavori rumorosi alle fasce 8-13 e 15-19 nei giorni feriali.",
      },
      {
        domanda: "Quanto tempo dura la ristrutturazione del bagno a Casapulla?",
        risposta: "Un bagno di 5-6 mq con rifacimento completo richiede mediamente 2-3 settimane lavorative. La sostituzione delle tubazioni in acciaio zincato, frequente nelle palazzine anni '70-'80, aggiunge 1-2 giorni per le tracce degli impianti.",
      },
    ],
    vicini: ["caserta", "san-prisco", "recale", "capua"],
  },

  {
    slug: "recale",
    nome: "Recale",
    provincia: "caserta",
    zona: "caserta",
    metaTitle: "Ristrutturazione Casa a Recale | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Recale: costi reali basati sul Prezzario Campania, criticità edilizie e preventivo online immediato.",
    descrizione: "Recale è un comune residenziale della provincia di Caserta, con un tessuto edilizio composto principalmente da palazzine degli anni '70-'80 e villette degli anni '90-2000. La sua posizione nelle immediate vicinanze di Caserta lo rende un polo residenziale attrattivo.",
    tipoEdilizio: "Mix di palazzine anni '70-'80 e villette anni '90-2000; alcune costruzioni recenti in zone di espansione",
    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '70",
      "Umidità di risalita nei piani terra",
      "Abusi edilizi non condonati nelle zone di espansione",
      "Impianti idrici vetusti nelle palazzine più datate",
    ],
    caratteristicheBagni: "Bagni standard nelle palazzine e nelle villette (5-7 mq). Sanitari degli anni '80-'90 da aggiornare.",
    caratteristicheCucine: "Cucine separate nelle palazzine; medie-grandi nelle villette. Canna fumaria da verificare.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a Recale?",
        risposta: "I costi orientativi basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Il sopralluogo tecnico chiarisce la situazione specifica.",
      },
      {
        domanda: "Ho una villetta degli anni '90 a Recale. Conviene fare cappotto termico durante la ristrutturazione?",
        risposta: "Il cappotto termico è indipendente dalla ristrutturazione degli interni, ma spesso viene pianificato insieme per ottimizzare il cantiere e accedere alle detrazioni fiscali (Ecobonus). Se stai già ristrutturando gli interni, è un buon momento per valutare anche l'involucro esterno: i costi fissi del cantiere si ammortizzano meglio. Il sopralluogo include anche una valutazione dell'isolamento della facciata.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Recale?",
        risposta: "In base al Prezzario Regionale Campania, per le palazzine anni '70-'80 (bagni 5-6 mq) la forbice è 5.000-9.500 €. Per le villette anni '90-2000 con bagni più ampi (6-8 mq) la forbice è 5.500-13.000 €. Recale è a due passi da Caserta: le caratteristiche edilizie sono simili ai quartieri residenziali casertani.",
      },
      {
        domanda: "Ho una villetta anni '90 a Recale e voglio rifare il bagno. Da dove si inizia?",
        risposta: "Il sopralluogo è il punto di partenza obbligatorio: verifichiamo lo stato degli impianti idrici, la presenza di umidità nelle pareti, la condizione degli scarichi e la tipologia del rivestimento esistente. Solo dopo il sopralluogo possiamo dire con precisione cosa va fatto e a che costo.",
      },
      {
        domanda: "Posso abbinare cappotto termico e ristrutturazione bagno a Recale?",
        risposta: "Sì, anzi è la combinazione ottimale: il cantiere è già aperto, i costi fissi si dividono, e puoi accedere sia al Bonus Ristrutturazioni 50% per il bagno che all'Ecobonus per il cappotto. Gli interventi sono fisicamente separati ma si pianificano insieme al sopralluogo.",
      },
    ],
    vicini: ["caserta", "casagiove", "san-prisco", "marcianise"],
  },

  {
    slug: "san-prisco",
    nome: "San Prisco",
    provincia: "caserta",
    zona: "caserta",
    metaTitle: "Ristrutturazione Casa a San Prisco | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a San Prisco: costi reali basati sul Prezzario Campania, criticità edilizie locali e preventivo online immediato.",
    descrizione: "San Prisco è un comune della provincia di Caserta con un tessuto edilizio prevalentemente residenziale. Il paese ospita la Cattedrale di San Prisco, uno dei più importanti edifici paleocristiani della Campania, e mantiene un nucleo storico interessante circondato da zone di espansione più recente.",
    tipoEdilizio: "Palazzine anni '70-'80 nel centro; villette negli anni '80-'00 nelle zone periferiche",
    criticalita: [
      "Canne fumarie in amianto nei condomini degli anni '70",
      "Umidità di risalita nei piani terra",
      "Abusi edilizi non condonati nelle zone di espansione",
      "Impianti idrici vetusti nelle palazzine più datate",
    ],
    caratteristicheBagni: "Bagni standard con sanitari anni '80-'90. Impianti da aggiornare nelle palazzine più datate.",
    caratteristicheCucine: "Cucine separate, medie dimensioni.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a San Prisco?",
        risposta: "I costi orientativi basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Il sopralluogo tecnico quantifica le variabili specifiche.",
      },
      {
        domanda: "Ho un appartamento con doppio bagno a San Prisco. Conviene rifarli entrambi?",
        risposta: "In molti casi sì: l'impresa è già mobilizzata, i costi di cantiere si distribuiscono su due interventi, e il risparmio rispetto a due cantieri separati è sensibile. Forniamo sempre preventivi separati e combinati così puoi decidere con i numeri in mano.",
      },
      {
        domanda: "Quali materiali sono più adatti per un bagno in una zona con acqua dura come quella di Caserta?",
        risposta: "L'acqua della zona di Caserta è tendenzialmente calcarea. Per la rubinetteria, consigliamo modelli con rompigetto anticalcare intercambiabile. Per i rivestimenti, i gres porcellanati levigati mostrano il calcare più degli opachi: tenere presente la manutenzione. Per la doccia, i box con profili minimi (zero profili) sono più facili da pulire. Lo discutiamo in dettaglio durante la scelta dei materiali al sopralluogo.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a San Prisco?",
        risposta: "In base al Prezzario Regionale Campania, per le palazzine anni '70-'80 (bagni 5-6 mq) la forbice è 5.000-9.500 €. Per le villette con bagni più ampi la forbice è 5.500-13.000 €. L'acqua della zona di Caserta è calcarea: al sopralluogo consigliamo i materiali più adatti per ridurre la manutenzione.",
      },
      {
        domanda: "Ho doppio bagno nella mia abitazione a San Prisco. Conviene rifarli insieme?",
        risposta: "Quasi sempre sì. Un solo cantiere, una sola logistica, costi fissi divisi su due interventi. Il risparmio sul totale è mediamente 10-15%. Al sopralluogo forniamo preventivi separati e combinati.",
      },
      {
        domanda: "L'acqua a San Prisco è dura. Come scelgo materiali e rubinetteria per il bagno?",
        risposta: "L'acqua della zona casertana è calcarea. Per la rubinetteria scegliamo modelli con rompigetto intercambiabile anti-calcare. Per i rivestimenti, i gres opachi mostrano meno il calcare rispetto ai lucidi. Per il box doccia, i profili minimi o assenti facilitano notevolmente la pulizia. Ne parliamo durante la scelta dei materiali al sopralluogo.",
      },
    ],
    vicini: ["caserta", "recale", "casapulla", "casagiove"],
  },

  {
    slug: "capua",
    nome: "Capua",
    provincia: "caserta",
    zona: "caserta",
    metaTitle: "Ristrutturazione Casa a Capua | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Capua: costi reali per appartamenti nel centro storico e villette. Preventivo online immediato. Il preventivo definitivo richiede sopralluogo tecnico.",
    descrizione: "Capua è un comune con un centro storico di origine medievale ben conservato, circondato dalle anse del Volturno. Il tessuto edilizio del centro è prevalentemente storico, mentre le zone periferiche ospitano palazzine degli anni '70-'80 e villette più recenti.",
    tipoEdilizio: "Centro storico medievale (sec. X-XVIII) con palazzi d'epoca; palazzine anni '70-'80 nelle zone residenziali; villette nelle periferie",
    criticalita: [
      "Centro storico: vincoli della Soprintendenza per interventi sulle facciate e sugli elementi storici; gli interni sono generalmente liberi da vincoli",
      "Umidità di risalita molto diffusa negli edifici storici del centro, spesso accentuata dalla vicinanza al Volturno",
      "Canne fumarie in amianto nei condomini degli anni '60-'70",
      "Impianti idrici e fognari datati nelle abitazioni del centro storico",
    ],
    caratteristicheBagni: "Bagni spesso aggiunti in un secondo momento negli edifici storici, con dimensioni e posizioni non ottimali. Nelle palazzine periferiche, bagni standard anni '80.",
    caratteristicheCucine: "Nelle abitazioni storiche del centro, cucine spesso ricavate in ambienti non originariamente destinati a tale uso. Nelle palazzine, cucine standard separate.",
    faq: [
      {
        domanda: "Ho un appartamento nel centro storico di Capua. Posso ristrutturare liberamente gli interni?",
        risposta: "In linea generale, gli interventi interni (bagno, cucina, rivestimenti) non soggetti a modifiche strutturali sono liberi da vincoli della Soprintendenza, che interviene principalmente sulle facciate e sugli elementi storico-architettonici. Una CILA è di solito sufficiente per lavori di manutenzione straordinaria interna. È sempre consigliabile una verifica preventiva con il Comune prima di iniziare.",
      },
      {
        domanda: "Ho umidità diffusa in un appartamento storico a Capua vicino al Volturno. Come la gestisco?",
        risposta: "L'umidità negli edifici storici vicino al Volturno può avere più cause: risalita capillare dai muri, infiltrazioni da falde acquifere superficiali, condensa da scarsa ventilazione. Trattarla con interventi superficiali non risolve il problema alla radice. Il sopralluogo permette di identificare la causa e progettare l'intervento corretto.",
      },
      {
        domanda: "Quanto costa ristrutturare la cucina a Capua?",
        risposta: "I costi orientativi basate sul Prezzario Regionale Campania per un bagno 5-6 mq vanno da circa 5.000 € (base) a 9.500 € (premium). Negli edifici storici con impianti d'epoca, il costo tende al limite superiore. Il sopralluogo tecnico chiarisce la situazione specifica.",
      },
      {
        domanda: "La mia cucina nel centro storico di Capua non ha una canna fumaria. Come installo la cappa?",
        risposta: "In assenza di canna fumaria, le soluzioni sono: cappa a ricircolo (filtra l'aria senza canalizzarla all'esterno, meno efficace ma non richiede tracce), cappa canalizzata verso l'esterno attraverso il muro perimetrale (richiede foratura della facciata e in centro storico va verificata con il Comune), oppure creazione di una nuova canna fumaria interna. Il sopralluogo valuta la soluzione più adatta al tuo spazio.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Capua?",
        risposta: "In base al Prezzario Regionale Campania, per gli appartamenti storici del centro (bagni spesso aggiunti in seconda battuta, dimensioni non ottimali) la forbice è 5.000-11.000 €. Per i bagni standard nelle palazzine periferiche anni '70-'80 (5-6 mq) la forbice è 5.000-9.500 €. L'umidità da risalita nelle abitazioni storiche vicino al Volturno è la criticità più frequente e va trattata prima di qualsiasi rifinitura.",
      },
      {
        domanda: "Ho un appartamento storico a Capua con umidità nelle pareti del bagno. Devo trattarla prima di rifare le piastrelle?",
        risposta: "Sì, categoricamente. L'umidità da risalita negli edifici storici di Capua, accentuata dalla vicinanza al Volturno, distrugge qualsiasi rifinitura nuova in 1-2 anni se non trattata alla radice. Al sopralluogo identifichiamo il tipo di umidità e inseriamo il trattamento corretto nel piano lavori prima della nuova posa.",
      },
      {
        domanda: "Il mio bagno nel centro storico di Capua ha dimensioni strane perché ricavato in un secondo momento. Come lo gestisco?",
        risposta: "È una situazione comune negli edifici storici capuani. Al sopralluogo misuriamo lo spazio reale e progettiamo la distribuzione ottimale dei sanitari: spesso sanitari sospesi, doccia angolare o a filo pavimento, e mensole integrate consentono di ricavare un bagno funzionale anche in spazi irregolari.",
      },
    ],
    vicini: ["santa-maria-capua-vetere", "caserta", "marcianise"],
  },

  {
    slug: "casagiove",
    nome: "Casagiove",
    provincia: "caserta",
    zona: "caserta",
    metaTitle: "Ristrutturazione Casa a Casagiove | Costi reali e preventivo",
    metaDescription: "Ristrutturazione a Casagiove: costi reali basati sul Prezzario Campania, criticità locali e preventivo online immediato.",
    descrizione: "Casagiove è un comune residenziale adiacente a Caserta, con un tenore abitativo mediamente più elevato rispetto agli altri comuni della zona. Il tessuto edilizio comprende villette e palazzine di qualità costruttiva superiore alla media, edificate tra gli anni '80 e i primi anni 2000.",
    tipoEdilizio: "Villette unifamiliari e palazzine di qualità medio-alta anni '80-2000; alcuni condomini degli anni '70 nel centro",
    criticalita: [
      "Umidità di risalita nelle abitazioni di piano terra, anche in costruzioni di qualità",
      "Impianti idrici in acciaio zincato nelle palazzine degli anni '70-'80",
      "Abusi edilizi nelle zone di espansione privata degli anni '90",
      "Coperture piane delle villette anni '80: guaine esaurite da sostituire",
    ],
    caratteristicheBagni: "Bagni di dimensioni standard o superiori nelle villette, spesso con doppio bagno. Sanitari degli anni '80-'90 ancora in uso ma da aggiornare esteticamente e impiantisticamente.",
    caratteristicheCucine: "Cucine ampie nelle villette, spesso già oggetto di un primo rifacimento parziale. Frequente richiesta di apertura verso il soggiorno.",
    faq: [
      {
        domanda: "Quanto costa ristrutturare la cucina a Casagiove?",
        risposta: "I costi orientativi basate sul Prezzario Regionale Campania per un bagno 6-8 mq (tipico delle villette di Casagiove) vanno da circa 5.500 € (base) a 11.000 € (premium). Il costo preciso dipende dall'entità dell'intervento e dallo stato degli impianti, che emergono al sopralluogo.",
      },
      {
        domanda: "Ho una villetta degli anni '90 a Casagiove con doppio bagno. Conviene rifare entrambi insieme?",
        risposta: "In molti casi sì: l'impresa è già mobilizzata, i ponteggi interni sono installati, la logistica è organizzata. Il costo marginale del secondo bagno in contemporanea è significativamente inferiore rispetto a due interventi separati. Durante il sopralluogo valutiamo lo stato di entrambi e forniamo un preventivo separato per ognuno e uno combinato, così si può decidere con i numeri in mano.",
      },
      {
        domanda: "Voglio aprire cucina e soggiorno nella mia villetta a Casagiove. È possibile?",
        risposta: "Dipende dalla natura del muro divisorio. Se è portante, l'apertura richiede il progetto di un ingegnere strutturale e il permesso di costruire. Se è una tramezza, basta una CILA. Il nostro sopralluogo include la verifica della struttura e ti fornisce un quadro chiaro di costi e pratiche necessarie prima di qualsiasi preventivo.",
      },
      {
        domanda: "Ho la guaina del tetto piatto esaurita a Casagiove. Conviene rifare anche l'isolamento termico?",
        risposta: "Se il tetto è già da aprire per la guaina, aggiungere lo strato isolante ha un costo marginale basso rispetto al costo totale dell'intervento. L'isolamento termico del tetto è uno degli interventi con il miglior rapporto costo/beneficio in termini energetici, e può beneficiare dell'Ecobonus. Lo valutiamo al sopralluogo insieme al rifacimento della guaina.",
      },
    ],
    faqBagno: [
      {
        domanda: "Quanto costa rifare il bagno a Casagiove?",
        risposta: "Casagiove ha un tenore abitativo mediamente più elevato rispetto ai comuni vicini: le villette hanno bagni di dimensioni standard o superiori (6-9 mq) e spesso doppio bagno. In base al Prezzario Regionale Campania la forbice indicativa è 5.500-17.000 €. Il rifacimento di entrambi i bagni insieme (frequente qui) consente un risparmio del 10-15% sul totale.",
      },
      {
        domanda: "Ho una villetta anni '90 a Casagiove con doppio bagno entrambi da rifare. Come organizziamo il cantiere?",
        risposta: "Organizziamo il cantiere in modo da non lasciare mai entrambi i bagni contemporaneamente non funzionanti. Tipicamente: finiamo il primo bagno al punto da renderlo usabile, poi apriamo il secondo. Il periodo senza almeno un bagno funzionante si riduce a 3-5 giorni totali. Al sopralluogo presentiamo preventivi separati e combinati.",
      },
      {
        domanda: "Ho già ristrutturato parzialmente il bagno nella mia villetta a Casagiove. Conviene completare o rifare?",
        risposta: "Dipende da cosa è stato fatto. Se l'impianto idrico è stato sostituito con materiali moderni e l'impermeabilizzazione è a norma, si può completare sulle finiture. Se invece è stato solo un cambio estetico senza toccare impianti e impermeabilizzazione, rifare completamente è quasi sempre la scelta corretta per non riaprire tutto tra pochi anni. Al sopralluogo valutiamo cosa è recuperabile.",
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
