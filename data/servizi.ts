export interface Servizio {
  slug: string;
  titolo: string;
  sottotitolo: string;
  descrizione: string;
  descrizioneCard?: string;
  descrizioneLunga: string;
  immagine: string;
  alt: string;                    // ← AGGIUNTO
  prezzoMq: { base: number; standard: number; premium: number };
  caratteristiche: string[];
  vantaggi: string[];
  galleria?: string[];
}

export const servizi: Servizio[] = [
  {
    slug: "ristrutturazione-appartamento-completo",
    descrizioneCard: "Intervento completo con impianti, opere murarie, finiture e verifica tecnica sul posto.",

    titolo: "Ristrutturazione Casa e Appartamento Completo",
    sottotitolo: "Costo base certo da 550 €/mq per ristrutturazione completa casa e appartamento, confermato dopo sopralluogo",
    descrizione: "Ristrutturazione completa di casa e appartamento con demolizioni, rifacimento impianti, opere murarie, pavimenti, rivestimenti e finiture. Prezzo base da 550 €/mq per ristrutturazione casa o appartamento in condizioni standard, con conferma dopo sopralluogo tecnico.",
    descrizioneLunga: `La ristrutturazione completa dell'appartamento è un intervento che coinvolge in modo coordinato demolizioni, impianti, opere murarie, pavimenti, rivestimenti, porte interne, sanitari e finiture finali.

Per questo servizio utilizziamo come riferimento un costo base certo di 550 €/mq quando l'immobile rientra in condizioni operative standard: accesso facilitato, gestione semplice dei materiali di risulta, piano agevole come un primo piano, distribuzione interna regolare e assenza di criticità tecniche rilevanti.

Il valore di 550 €/mq non va interpretato come prezzo automatico valido per qualsiasi appartamento. Se l'immobile presenta accessi difficili, piani più onerosi, vincoli condominiali, demolizioni più complesse, impianti molto datati, problemi di umidità o finiture fuori standard, il costo finale viene ricalcolato in base alle condizioni reali del cantiere.

Il sopralluogo resta il passaggio che conferma misure, lavorazioni, logistica, tempi e quadro economico definitivo.`,
    immagine: "/images/servizi/ristrutturazione-appartamento-completo.jpg",
    alt: "Ristrutturazione completa appartamento moderno luminoso con open space cucina e soggiorno, finiture curate a Napoli e Caserta",
    prezzoMq: { base: 550, standard: 750, premium: 950 },
    caratteristiche: [
      "Demolizioni e rimozioni previste",
      "Rifacimento impianto elettrico",
      "Rifacimento impianto idraulico e termico",
      "Opere murarie, sottofondi e rasature",
      "Posa pavimenti e rivestimenti",
      "Porte interne complete di telaio e bussole",
      "Installazione sanitari standard",
      "Tinteggiatura finale",
    ],
    vantaggi: [
      "Prezzo base chiaro nei casi standard",
      "Sopralluogo tecnico prima della conferma finale",
      "Lavorazioni coordinate in un unico cantiere",
      "Riferimento coerente con il Prezzario Regionale Campania",
      "Dettaglio chiaro di inclusioni ed esclusioni",
      "Preventivo verificato sulle condizioni reali dell'immobile",
    ],
  },
  {
    slug: "ristrutturazione-cucina",
    descrizioneCard: "Rifacimento cucina con impianti, rivestimenti, predisposizioni e posa delle finiture.",

    titolo: "Ristrutturazione e Rifacimento Cucina",
    sottotitolo: "Rifacimento cucina completo con impianti, rivestimenti e soluzioni su misura",
    descrizione: "Ristrutturazione e rifacimento cucina con nuovi impianti, pavimenti, rivestimenti, illuminazione e installazione di mobili su misura.",
    descrizioneLunga: `La cucina è il cuore pulsante della casa, il luogo dove si preparano i pasti ma anche dove ci si ritrova in famiglia. La sua ristrutturazione richiede attenzione particolare alla funzionalità, alla sicurezza e all'estetica.

Il nostro servizio di ristrutturazione cucina comprende la progettazione del layout ottimale, il rifacimento degli impianti elettrici e idraulici, la posa di pavimenti e rivestimenti resistenti e facili da pulire, l'installazione di illuminazione funzionale e d'atmosfera.

Proponiamo soluzioni su misura per ogni spazio, dalle cucine piccole e funzionali alle grandi cucine open space, con materiali di qualità e finiture che resistono all'usura del tempo e all'umidità.`,
    immagine: "/images/servizi/ristrutturazione-cucina.jpg",
    alt: "Ristrutturazione cucina moderna con isola centrale in marmo, mobili su misura e elettrodomestici integrati a Napoli",
    prezzoMq: { base: 400, standard: 600, premium: 850 },
    caratteristiche: [
      "Progettazione layout cucina",
      "Rifacimento impianto elettrico",
      "Rifacimento impianto idraulico",
      "Posa pavimenti resistenti",
      "Rivestimenti pareti e schienali",
      "Installazione punti luce",
      "Predisposizione elettrodomestici",
      "Montaggio mobili cucina",
    ],
    vantaggi: [
      "Cucina funzionale e ergonomica",
      "Materiali resistenti all'umidità",
      "Illuminazione ottimizzata",
      "Soluzioni per ogni budget",
      "Verifica preliminare del progetto",
      "Tempi rapidi di realizzazione",
    ],
  },
  {
    slug: "ristrutturazione-bagno",
    descrizioneCard: "Rifacimento bagno con demolizioni, nuovi impianti, impermeabilizzazione e posa sanitari.",

    titolo: "Ristrutturazione Bagno",
    sottotitolo: "Rifacimento completo del bagno con stima realistica e sopralluogo tecnico",
    descrizione: "Ristrutturazione completa del bagno con demolizioni, smaltimento, rifacimento impianti, pavimenti, rivestimenti e sanitari. La stima iniziale varia in base a dimensioni, accessibilità, finiture e stato degli impianti esistenti, da confermare dopo sopralluogo.",
    descrizioneLunga: `La ristrutturazione completa del bagno è un intervento tecnico che comprende demolizioni, rifacimento degli impianti, ripristino dei sottofondi, impermeabilizzazione e posa delle nuove finiture.

Il costo base da 5.000 € rappresenta un riferimento iniziale per bagni di dimensioni contenute o medie, con configurazione standard e senza criticità particolari. Il preventivo definitivo può aumentare in caso di bagno più grande, spostamenti impiantistici rilevanti, finiture fuori capitolato o problematiche emerse dopo la demolizione.

Il nostro servizio comprende smontaggio dei sanitari esistenti, demolizione di pavimenti e rivestimenti, smaltimento dei materiali di risulta, realizzazione del nuovo impianto idrico-sanitario ed elettrico del bagno, formazione del massetto, impermeabilizzazione della zona doccia o vasca, posa di pavimenti e rivestimenti e installazione dei nuovi sanitari con rubinetteria.

Ogni stima online ha valore orientativo: il sopralluogo serve a verificare misure, stato degli impianti, condizioni del supporto e reali necessità del cantiere.`,
    immagine: "/images/servizi/ristrutturazione-bagno.jpg",
    alt: "Ristrutturazione bagno luxury con doccia walk-in in marmo, vasca freestanding e design elegante a Napoli Caserta",
    prezzoMq: { base: 450, standard: 700, premium: 1000 },
    caratteristiche: [
      "Smontaggio dei sanitari esistenti",
      "Demolizione di pavimento, rivestimenti e massetto con disconnessione degli impianti esistenti",
      "Carico, trasporto e smaltimento dei materiali di risulta",
      "Realizzazione del nuovo impianto idrico-sanitario ed elettrico del bagno",
      "Formazione del nuovo massetto e piano di posa",
      "Impermeabilizzazione dell’area doccia o vasca",
      "Fornitura e posa di pavimenti e rivestimenti",
      "Fornitura e installazione di wc, bidet, lavabo con mobile sospeso, doccia oppure vasca, con rubinetteria inclusa",
    ],
    vantaggi: [
      "Bagno impermeabile e sicuro",
      "Sanitari di design o classici",
      "Soluzioni per disabili disponibili",
      "Materiali antimuffa e antibatterici",
      "Materiali certificati CE",
      "Possibilità di vasca o doccia",
    ],
  },
  {
    slug: "rifacimento-tetto",
    descrizioneCard: "Lavori su copertura, impermeabilizzazione e pacchetto tetto in base a struttura e accessibilità.",

    titolo: "Rifacimento Tetto",
    sottotitolo: "Proteggi la tua casa con un tetto nuovo e sicuro",
    descrizione: "Rifacimento completo del tetto con struttura portante, copertura in tegole o altri materiali, isolamento termico e idraulico.",
    descrizioneLunga: `Il tetto è l'elemento fondamentale per la protezione della casa dalle intemperie. Un tetto malmesso può causare infiltrazioni, muffe e problemi strutturali gravi. Il rifacimento del tetto è un investimento essenziale per la sicurezza e il valore dell'immobile.

Il nostro servizio di rifacimento tetto comprende la rimozione della vecchia copertura, la verifica e il consolidamento della struttura portante, la posa di isolamento termico e idraulico di ultima generazione, l'installazione della nuova copertura con tegole, coppi o altri materiali scelti.

Utilizziamo materiali certificati e tecniche costruttive aggiornate per garantire un tetto duraturo, efficiente energeticamente e esteticamente gradevole.`,
    immagine: "/images/servizi/rifacimento-tetto.jpg",
    alt: "Rifacimento tetto con tegole nuove, isolamento termico e grondaie su casa residenziale italiana",
    prezzoMq: { base: 80, standard: 120, premium: 180 },
    caratteristiche: [
      "Rimozione vecchia copertura",
      "Verifica struttura portante",
      "Sostituzione travetti danneggiati",
      "Isolamento termico sottotetto",
      "Isolamento idraulico",
      "Posa tegole o coppi",
      "Installazione grondaie e pluviali",
      "Messa in sicurezza",
    ],
    vantaggi: [
      "Niente più infiltrazioni",
      "Migliore isolamento termico",
      "Risparmio energetico",
      "Valore immobile aumentato",
      "Materiali certificati",
      "Lavorazione professionale",
    ],
  },
  {
    slug: "pavimenti-rivestimenti",
    descrizioneCard: "Fornitura e posa di pavimenti e rivestimenti con preparazione dei supporti e finiture.",

    titolo: "Posa e Rifacimento Pavimenti e Rivestimenti",
    sottotitolo: "Posa pavimenti e rivestimenti per casa con materiali resistenti e finiture di qualità",
    descrizione: "Posa e rifacimento pavimenti e rivestimenti in ceramica, gres porcellanato, parquet, marmo e altri materiali per casa e appartamento.",
    descrizioneLunga: `Pavimenti e rivestimenti sono gli elementi che caratterizzano maggiormente l'estetica di una casa. La loro scelta influenza non solo l'aspetto visivo ma anche la funzionalità, la manutenzione e il comfort degli ambienti.

Il nostro servizio di posa pavimenti e rivestimenti include la consulenza nella scelta dei materiali più adatti alle esigenze del cliente, la preparazione del supporto, la posa professionale con tecniche aggiornate, la sigillatura e la pulizia finale.

Proponiamo una vasta gamma di materiali: gres porcellanato effetto legno o pietra, ceramiche tradizionali e di design, parquet prefinito e massello, marmi e pietre naturali, resine e microcemento per soluzioni moderne.`,
    immagine: "/images/servizi/pavimenti-rivestimenti.jpg",
    alt: "Posa pavimenti e rivestimenti moderni in gres porcellanato e parquet in soggiorno luminoso",
    prezzoMq: { base: 60, standard: 100, premium: 150 },
    caratteristiche: [
      "Consulenza scelta materiali",
      "Rimozione vecchi pavimenti",
      "Preparazione massetto",
      "Posa gres porcellanato",
      "Posa ceramiche",
      "Posa parquet",
      "Posa marmi e pietre",
      "Sigillature e pulizia",
    ],
    vantaggi: [
      "Ampia scelta di materiali",
      "Posa professionale garantita",
      "Soluzioni per ogni ambiente",
      "Materiali resistenti e duraturi",
      "Preventivo trasparente",
      "Tempi di realizzazione certi",
    ],
  },
  {
    slug: "impianti-elettrici-idraulici-termici",
    descrizioneCard: "Adeguamento o rifacimento impianti con valutazione tecnica delle reti esistenti.",

    titolo: "Rifacimento Impianti Elettrici, Idraulici e Termici",
    sottotitolo: "Rifacimento impianti casa a norma per sicurezza, comfort ed efficienza",
    descrizione: "Rifacimento di impianti elettrici, idraulici e termici per casa e appartamento, con installazione a norma, certificazioni e collaudi.",
    descrizioneLunga: `Gli impianti sono il sistema nervoso della casa: devono essere sicuri, efficienti e conformi alle normative vigenti. Un impianto fatto male può comportare rischi per la sicurezza e sprechi energetici.

Il nostro servizio di installazione impianti comprende la progettazione personalizzata, l'installazione completa con materiali certificati, le prove di funzionamento, la redazione della documentazione e le certificazioni richieste dalla legge.

Realizziamo impianti elettrici con quadri moderni e protezioni a norma, impianti idraulici con tubazioni in multistrato o rame, impianti termici con caldaie a condensazione, pannelli solari e sistemi di riscaldamento a pavimento.`,
    immagine: "/images/servizi/impianti-elettrici-idraulici-termici.jpg",
    alt: "Installazione impianti elettrici idraulici e termici moderni con caldaia e pannelli solari in casa italiana",
    prezzoMq: { base: 150, standard: 250, premium: 400 },
    caratteristiche: [
      "Progettazione impianti",
      "Installazione impianto elettrico",
      "Installazione impianto idraulico",
      "Installazione impianto termico",
      "Posa caldaie a condensazione",
      "Installazione pannelli solari",
      "Certificazioni e collaudi",
      "Assistenza post-installazione",
    ],
    vantaggi: [
      "Impianti a norma di legge",
      "Materiali certificati",
      "Tecnici qualificati",
      "Certificazioni incluse",
      "Risparmio energetico",
      "Garanzia sui lavori",
    ],
  },
  {
    slug: "cappotto-termico",
    descrizioneCard: "Isolamento termico dell’involucro con analisi del supporto, dettagli esecutivi e prestazioni attese.",

    titolo: "Cappotto Termico",
    sottotitolo: "Isolamento esterno per comfort e risparmio energetico",
    descrizione: "Installazione di cappotto termico esterno per l'isolamento della facciata, con riduzione dei consumi energetici e maggiore comfort abitativo.",
    descrizioneLunga: `Il cappotto termico esterno è una delle migliori soluzioni per isolare la casa, ridurre i consumi energetici e migliorare il comfort abitativo. Consiste nell'applicazione di uno strato isolante sulla facciata esterna, protetto da un rivestimento finito.

Il nostro servizio di installazione cappotto termico include la valutazione tecnica del fabbricato, la scelta del sistema isolante più adatto, la preparazione della superficie, la posa dei pannelli isolanti, l'applicazione della rete di armatura e del rasante, la finitura con intonaco o altri rivestimenti.

Il cappotto termico permette di ridurre fino al 30% i consumi per riscaldamento e raffrescamento, elimina i ponti termici, protegge la struttura dagli agenti atmosferici e migliora l'estetica della facciata.`,
    immagine: "/images/servizi/cappotto-termico.jpg",
    alt: "Installazione cappotto termico esterno su facciata di casa residenziale per risparmio energetico a Napoli Caserta",
    prezzoMq: { base: 80, standard: 120, premium: 180 },
    caratteristiche: [
      "Sopralluogo tecnico",
      "Scelta sistema isolante",
      "Preparazione facciata",
      "Posa pannelli isolanti",
      "Rete di armatura",
      "Rasante di protezione",
      "Finitura estetica",
      "Certificazione intervento",
    ],
    vantaggi: [
      "Risparmio energetico fino al 30%",
      "Comfort termico migliorato",
      "Eliminazione muffe e umidità",
      "Protezione della struttura",
      "Detrazioni fiscali Ecobonus",
      "Valorizzazione immobile",
    ],
  },
];

export function getServizioBySlug(slug: string): Servizio | undefined {
  return servizi.find(s => s.slug === slug);
}
