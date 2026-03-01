export interface Servizio {
  slug: string;
  titolo: string;
  sottotitolo: string;
  descrizione: string;
  descrizioneLunga: string;
  immagine: string;
  prezzoMq: { base: number; standard: number; premium: number };
  caratteristiche: string[];
  vantaggi: string[];
  galleria?: string[];
}

export const servizi: Servizio[] = [
  {
    slug: "ristrutturazione-appartamento-completo",
    titolo: "Ristrutturazione Appartamento Completo",
    sottotitolo: "Trasforma il tuo spazio con un intervento completo e personalizzato",
    descrizione: "Ristrutturazione totale dell'appartamento con progettazione personalizzata, demolizioni, rifacimento impianti, pavimenti, rivestimenti e finiture di pregio.",
    descrizioneLunga: `La ristrutturazione completa dell'appartamento è il nostro servizio più richiesto. Interveniamo su ogni ambiente della casa, dalla cucina al bagno, dalle camere da letto ai soggiorni, garantendo un risultato armonioso e funzionale.

Il nostro team di professionisti segue il progetto dalla fase di ideazione fino alla consegna delle chiavi, occupandosi di ogni dettaglio: demolizioni, rifacimento degli impianti elettrici e idraulici, posa di pavimenti e rivestimenti, tinteggiature e finiture.

Offriamo tre livelli di finitura per adattarci a ogni esigenza e budget: Base, Standard e Premium. Ogni livello garantisce qualità e durata nel tempo, con materiali selezionati e lavorazioni curate nei minimi dettagli.`,
    immagine: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
    prezzoMq: { base: 550, standard: 750, premium: 950 },
    caratteristiche: [
      "Progettazione personalizzata",
      "Demolizioni e rimozioni",
      "Rifacimento impianti elettrici",
      "Rifacimento impianti idraulici",
      "Posa pavimenti e rivestimenti",
      "Tinteggiature e decorazioni",
      "Installazione sanitari e rubinetteria",
      "Montaggio mobili e arredi",
    ],
    vantaggi: [
      "Unico interlocutore per tutto il progetto",
      "Tempi di realizzazione certi",
      "Garanzia decennale sui lavori",
      "Possibilità di detrazioni fiscali",
      "Materiali di qualità certificata",
      "Personale qualificato e assicurato",
    ],
  },
  {
    slug: "ristrutturazione-cucina",
    titolo: "Ristrutturazione Cucina",
    sottotitolo: "Il cuore della casa rinnovato con stile e funzionalità",
    descrizione: "Ristrutturazione completa della cucina con nuovi impianti, pavimenti, rivestimenti, illuminazione e installazione mobili su misura.",
    descrizioneLunga: `La cucina è il cuore pulsante della casa, il luogo dove si preparano i pasti ma anche dove ci si ritrova in famiglia. La sua ristrutturazione richiede attenzione particolare alla funzionalità, alla sicurezza e all'estetica.

Il nostro servizio di ristrutturazione cucina comprende la progettazione del layout ottimale, il rifacimento degli impianti elettrici e idraulici, la posa di pavimenti e rivestimenti resistenti e facili da pulire, l'installazione di illuminazione funzionale e d'atmosfera.

Proponiamo soluzioni su misura per ogni spazio, dalle cucine piccole e funzionali alle grandi cucine open space, con materiali di qualità e finiture che resistono all'usura del tempo e all'umidità.`,
    immagine: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
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
      "Consulenza progettuale gratuita",
      "Tempi rapidi di realizzazione",
    ],
  },
  {
    slug: "ristrutturazione-bagno",
    titolo: "Ristrutturazione Bagno",
    sottotitolo: "Eleganza e comfort per il tuo spazio wellness",
    descrizione: "Ristrutturazione completa del bagno con nuovi impianti, sanitari, box doccia o vasca, pavimenti e rivestimenti di design.",
    descrizioneLunga: `Il bagno è uno degli ambienti più importanti della casa, un luogo di relax e cura personale. La sua ristrutturazione richiede competenze specifiche per garantire impermeabilità, sicurezza e comfort.

Il nostro servizio di ristrutturazione bagno include la rimozione dei vecchi sanitari e rivestimenti, il rifacimento completo degli impianti con materiali di qualità, la posa di pavimenti e rivestimenti impermeabili, l'installazione di nuovi sanitari, rubinetteria e accessori.

Proponiamo soluzioni per ogni esigenza: bagni moderni e minimalisti, bagni classici ed eleganti, bagni accessibili per anziani e disabili. Ogni progetto è personalizzato in base allo spazio disponibile e alle preferenze del cliente.`,
    immagine: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800",
    prezzoMq: { base: 450, standard: 700, premium: 1000 },
    caratteristiche: [
      "Rimozione vecchi sanitari",
      "Rifacimento impermeabilizzazioni",
      "Rifacimento impianto idraulico",
      "Rifacimento impianto elettrico",
      "Posa pavimenti antiscivolo",
      "Rivestimenti pareti doccia",
      "Installazione sanitari e rubinetteria",
      "Montaggio box doccia o vasca",
    ],
    vantaggi: [
      "Bagno impermeabile e sicuro",
      "Sanitari di design o classici",
      "Soluzioni per disabili disponibili",
      "Materiali antimuffa e antibatterici",
      "Garanzia su impermeabilizzazioni",
      "Possibilità di vasca o doccia",
    ],
  },
  {
    slug: "rifacimento-tetto",
    titolo: "Rifacimento Tetto",
    sottotitolo: "Proteggi la tua casa con un tetto nuovo e sicuro",
    descrizione: "Rifacimento completo del tetto con struttura portante, copertura in tegole o altri materiali, isolamento termico e idraulico.",
    descrizioneLunga: `Il tetto è l'elemento fondamentale per la protezione della casa dalle intemperie. Un tetto malmesso può causare infiltrazioni, muffe e problemi strutturali gravi. Il rifacimento del tetto è un investimento essenziale per la sicurezza e il valore dell'immobile.

Il nostro servizio di rifacimento tetto comprende la rimozione della vecchia copertura, la verifica e il consolidamento della struttura portante, la posa di isolamento termico e idraulico di ultima generazione, l'installazione della nuova copertura con tegole, coppi o altri materiali scelti.

Utilizziamo materiali certificati e tecniche costruttive aggiornate per garantire un tetto duraturo, efficiente energeticamente e esteticamente gradevole.`,
    immagine: "https://images.unsplash.com/photo-1632823471406-51c5243edc6b?w=800",
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
    titolo: "Pavimenti e Rivestimenti",
    sottotitolo: "Rinnova gli ambienti con materiali di qualità",
    descrizione: "Fornitura e posa di pavimenti e rivestimenti in ceramica, gres porcellanato, parquet, marmo e altri materiali.",
    descrizioneLunga: `Pavimenti e rivestimenti sono gli elementi che caratterizzano maggiormente l'estetica di una casa. La loro scelta influenza non solo l'aspetto visivo ma anche la funzionalità, la manutenzione e il comfort degli ambienti.

Il nostro servizio di posa pavimenti e rivestimenti include la consulenza nella scelta dei materiali più adatti alle esigenze del cliente, la preparazione del supporto, la posa professionale con tecniche aggiornate, la sigillatura e la pulizia finale.

Proponiamo una vasta gamma di materiali: gres porcellanato effetto legno o pietra, ceramiche tradizionali e di design, parquet prefinito e massello, marmi e pietre naturali, resine e microcemento per soluzioni moderne.`,
    immagine: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800",
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
    titolo: "Impianti Elettrici, Idraulici e Termici",
    sottotitolo: "Sicurezza ed efficienza per la tua casa",
    descrizione: "Progettazione e installazione di impianti elettrici, idraulici e termici a norma, con certificazioni e collaudi.",
    descrizioneLunga: `Gli impianti sono il sistema nervoso della casa: devono essere sicuri, efficienti e conformi alle normative vigenti. Un impianto fatto male può comportare rischi per la sicurezza e sprechi energetici.

Il nostro servizio di installazione impianti comprende la progettazione personalizzata, l'installazione completa con materiali certificati, le prove di funzionamento, la redazione della documentazione e le certificazioni richieste dalla legge.

Realizziamo impianti elettrici con quadri moderni e protezioni a norma, impianti idraulici con tubazioni in multistrato o rame, impianti termici con caldaie a condensazione, pannelli solari e sistemi di riscaldamento a pavimento.`,
    immagine: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800",
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
    titolo: "Cappotto Termico",
    sottotitolo: "Isolamento esterno per comfort e risparmio energetico",
    descrizione: "Installazione di cappotto termico esterno per l'isolamento della facciata, con riduzione dei consumi energetici e maggiore comfort abitativo.",
    descrizioneLunga: `Il cappotto termico esterno è una delle migliori soluzioni per isolare la casa, ridurre i consumi energetici e migliorare il comfort abitativo. Consiste nell'applicazione di uno strato isolante sulla facciata esterna, protetto da un rivestimento finito.

Il nostro servizio di installazione cappotto termico include la valutazione tecnica del fabbricato, la scelta del sistema isolante più adatto, la preparazione della superficie, la posa dei pannelli isolanti, l'applicazione della rete di armatura e del rasante, la finitura con intonaco o altri rivestimenti.

Il cappotto termico permette di ridurre fino al 30% i consumi per riscaldamento e raffrescamento, elimina i ponti termici, protegge la struttura dagli agenti atmosferici e migliora l'estetica della facciata.`,
    immagine: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
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