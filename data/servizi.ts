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
    immagine: "/images/servizi/ristrutturazione-appartamento-completo.jpg",
    prezzoMq: { base: 550, standard: 750, premium: 950 },
    caratteristiche: ["Progettazione personalizzata","Demolizioni e rimozioni","Rifacimento impianti elettrici","Rifacimento impianti idraulici","Posa pavimenti e rivestimenti","Tinteggiature e decorazioni","Installazione sanitari e rubinetteria","Montaggio mobili e arredi"],
    vantaggi: ["Unico interlocutore per tutto il progetto","Tempi di realizzazione certi","Garanzia decennale sui lavori","Possibilità di detrazioni fiscali","Materiali di qualità certificata","Personale qualificato e assicurato"],
  },
  {
    slug: "ristrutturazione-cucina",
    titolo: "Ristrutturazione Cucina",
    sottotitolo: "Il cuore della casa rinnovato con stile e funzionalità",
    descrizione: "Ristrutturazione completa della cucina con nuovi impianti, pavimenti, rivestimenti, illuminazione e installazione mobili su misura.",
    descrizioneLunga: `La cucina è il cuore pulsante della casa...`,
    immagine: "/images/servizi/ristrutturazione-cucina.jpg",
    prezzoMq: { base: 400, standard: 600, premium: 850 },
    caratteristiche: ["Progettazione layout cucina","Rifacimento impianto elettrico","Rifacimento impianto idraulico","Posa pavimenti resistenti","Rivestimenti pareti e schienali","Installazione punti luce","Predisposizione elettrodomestici","Montaggio mobili cucina"],
    vantaggi: ["Cucina funzionale e ergonomica","Materiali resistenti all'umidità","Illuminazione ottimizzata","Soluzioni per ogni budget","Consulenza progettuale gratuita","Tempi rapidi di realizzazione"],
  },
  {
    slug: "ristrutturazione-bagno",
    titolo: "Ristrutturazione Bagno",
    sottotitolo: "Eleganza e comfort per il tuo spazio wellness",
    descrizione: "Ristrutturazione completa del bagno con nuovi impianti, sanitari, box doccia o vasca, pavimenti e rivestimenti di design.",
    descrizioneLunga: `Il bagno è uno degli ambienti più importanti...`,
    immagine: "/images/servizi/ristrutturazione-bagno.jpg",
    prezzoMq: { base: 450, standard: 700, premium: 1000 },
    caratteristiche: ["Rimozione vecchi sanitari","Rifacimento impermeabilizzazioni","Rifacimento impianto idraulico","Rifacimento impianto elettrico","Posa pavimenti antiscivolo","Rivestimenti pareti doccia","Installazione sanitari e rubinetteria","Montaggio box doccia o vasca"],
    vantaggi: ["Bagno impermeabile e sicuro","Sanitari di design o classici","Soluzioni per disabili disponibili","Materiali antimuffa e antibatterici","Garanzia su impermeabilizzazioni","Possibilità di vasca o doccia"],
  },
  {
    slug: "rifacimento-tetto",
    titolo: "Rifacimento Tetto",
    sottotitolo: "Proteggi la tua casa con un tetto nuovo e sicuro",
    descrizione: "Rifacimento completo del tetto con struttura portante, copertura in tegole o altri materiali, isolamento termico e idraulico.",
    descrizioneLunga: `Il tetto è l'elemento fondamentale...`,
    immagine: "/images/servizi/rifacimento-tetto.jpg",
    prezzoMq: { base: 80, standard: 120, premium: 180 },
    caratteristiche: ["Rimozione vecchia copertura","Verifica struttura portante","Sostituzione travetti danneggiati","Isolamento termico sottotetto","Isolamento idraulico","Posa tegole o coppi","Installazione grondaie e pluviali","Messa in sicurezza"],
    vantaggi: ["Niente più infiltrazioni","Migliore isolamento termico","Risparmio energetico","Valore immobile aumentato","Materiali certificati","Lavorazione professionale"],
  },
  {
    slug: "pavimenti-rivestimenti",
    titolo: "Pavimenti e Rivestimenti",
    sottotitolo: "Rinnova gli ambienti con materiali di qualità",
    descrizione: "Fornitura e posa di pavimenti e rivestimenti in ceramica, gres porcellanato, parquet, marmo e altri materiali.",
    descrizioneLunga: `Pavimenti e rivestimenti sono gli elementi...`,
    immagine: "/images/servizi/pavimenti-rivestimenti.jpg",
    prezzoMq: { base: 60, standard: 100, premium: 150 },
    caratteristiche: ["Consulenza scelta materiali","Rimozione vecchi pavimenti","Preparazione massetto","Posa gres porcellanato","Posa ceramiche","Posa parquet","Posa marmi e pietre","Sigillature e pulizia"],
    vantaggi: ["Ampia scelta di materiali","Posa professionale garantita","Soluzioni per ogni ambiente","Materiali resistenti e duraturi","Preventivo trasparente","Tempi di realizzazione certi"],
  },
  {
    slug: "impianti-elettrici-idraulici-termici",
    titolo: "Impianti Elettrici, Idraulici e Termici",
    sottotitolo: "Sicurezza ed efficienza per la tua casa",
    descrizione: "Progettazione e installazione di impianti elettrici, idraulici e termici a norma, con certificazioni e collaudi.",
    descrizioneLunga: `Gli impianti sono il sistema nervoso...`,
    immagine: "/images/servizi/impianti-elettrici-idraulici-termici.jpg",
    prezzoMq: { base: 150, standard: 250, premium: 400 },
    caratteristiche: ["Progettazione impianti","Installazione impianto elettrico","Installazione impianto idraulico","Installazione impianto termico","Posa caldaie a condensazione","Installazione pannelli solari","Certificazioni e collaudi","Assistenza post-installazione"],
    vantaggi: ["Impianti a norma di legge","Materiali certificati","Tecnici qualificati","Certificazioni incluse","Risparmio energetico","Garanzia sui lavori"],
  },
  {
    slug: "cappotto-termico",
    titolo: "Cappotto Termico",
    sottotitolo: "Isolamento esterno per comfort e risparmio energetico",
    descrizione: "Installazione di cappotto termico esterno per l'isolamento della facciata, con riduzione dei consumi energetici e maggiore comfort abitativo.",
    descrizioneLunga: `Il cappotto termico esterno è una delle migliori soluzioni...`,
    immagine: "/images/servizi/cappotto-termico.jpg",
    prezzoMq: { base: 80, standard: 120, premium: 180 },
    caratteristiche: ["Sopralluogo tecnico","Scelta sistema isolante","Preparazione facciata","Posa pannelli isolanti","Rete di armatura","Rasante di protezione","Finitura estetica","Certificazione intervento"],
    vantaggi: ["Risparmio energetico fino al 30%","Comfort termico migliorato","Eliminazione muffe e umidità","Protezione della struttura","Detrazioni fiscali Ecobonus","Valorizzazione immobile"],
  },
];

export function getServizioBySlug(slug: string): Servizio | undefined {
  return servizi.find(s => s.slug === slug);
}