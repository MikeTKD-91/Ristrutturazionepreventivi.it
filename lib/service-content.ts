// lib/service-content.ts
// Generatore di testi introduttivi unici per ogni combinazione comune + servizio
// Evita thin content e duplicate tra pagine servizio dello stesso comune

import { Comune } from "@/data/comuni";

// ─────────────────────────────────────────────
// HELPER: estrae criticità rilevanti per servizio
// ─────────────────────────────────────────────

function getCriticitàPerServizio(comune: Comune, servizioSlug: string): string {
  const keywords: Record<string, string[]> = {
    "ristrutturazione-bagno": ["umidità", "piombo", "amianto", "impermeabilizzazione", "massetto"],
    "ristrutturazione-cucina": ["canna", "amianto", "cappa", "gas", "impianto"],
    "rifacimento-tetto": ["copertura", "tetto", "infiltrazione", "umidità", "tegole", "grondaie"],
    "cappotto-termico": ["umidità", "risalita", "facciata", "ponte termico", "isolamento"],
    "impianti-elettrici-idraulici-termici": ["impianto", "elettrico", "idraulico", "termico", "piombo", "alluminio"],
    "pavimenti-rivestimenti": ["massetto", "pavimento", "umidità", "sottofondo"],
    "ristrutturazione-appartamento-completo": ["impianto", "umidità", "amianto", "struttura"],
  };

  const kws = keywords[servizioSlug] || [];
  const trovata = comune.criticalita.find(c => kws.some(kw => c.toLowerCase().includes(kw)));
  return trovata || comune.criticalita[0] || "criticità tecniche specifiche del contesto locale";
}

// ─────────────────────────────────────────────
// HERO TEXT: testo sotto l'H1
// ─────────────────────────────────────────────

export function getServiceIntro(comune: Comune, servizioSlug: string): string {
  const zonaLabel = comune.zona === "agro-aversano" ? "cuore dell'Agro Aversano" 
    : comune.zona === "napoli" ? "nella provincia di Napoli" 
    : "nella provincia di Caserta";

  const templates: Record<string, string> = {
    "ristrutturazione-appartamento-completo": 
      `${comune.nome}, ${zonaLabel}, presenta un tessuto edilizio dove ${comune.tipoEdilizio.toLowerCase()}. Chi decide di ristrutturare casa a ${comune.nome} si trova spesso a dover gestire ${comune.criticalita.slice(0, 2).join(" e ")}, elementi che incidono direttamente sui costi e sui tempi del cantiere. Il preventivo per una ristrutturazione completa parte da una verifica tecnica che analizza lo stato degli impianti, la distribuzione degli ambienti e le condizioni strutturali dell'immobile.`,

    "ristrutturazione-bagno": 
      `Ristrutturare il bagno a ${comune.nome} significa confrontarsi con un contesto edilizio dove ${comune.tipoEdilizio.toLowerCase()}. ${comune.caratteristicheBagni || "Bagni di dimensioni standard con impianti idrici ed elettrici da verificare"}. Nelle abitazioni più datate, ${getCriticitàPerServizio(comune, servizioSlug).toLowerCase()} è la criticità più comune e incide direttamente sul costo del rifacimento. Il preventivo per il bagno a ${comune.nome} deve considerare demolizione, impermeabilizzazione, rifacimento impianti e posa dei nuovi rivestimenti.`,

    "ristrutturazione-cucina": 
      `La ristrutturazione della cucina a ${comune.nome} richiede attenzione specifica in un territorio dove ${comune.tipoEdilizio.toLowerCase()}. ${comune.caratteristicheCucine || "Cucine di dimensioni medie con impianti da verificare"}. La criticità più frequente è ${getCriticitàPerServizio(comune, servizioSlug).toLowerCase()}, un elemento che può far crescere il preventivo se non previsto in fase di stima. Il costo per rifare la cucina a ${comune.nome} varia in base alla metratura, allo stato degli impianti e alla scelta delle finiture.`,

    "rifacimento-tetto": 
      `Il rifacimento del tetto a ${comune.nome} è un intervento strategico in un comune dove ${comune.tipoEdilizio.toLowerCase()}. ${getCriticitàPerServizio(comune, servizioSlug)}. La scelta del materiale di copertura — tegole, coppi o pannelli — e la verifica della struttura portante sono passaggi fondamentali prima di formulare un preventivo accurato per il tetto a ${comune.nome}.`,

    "cappotto-termico": 
      `L'isolamento a cappotto termico a ${comune.nome} risponde a una necessità concreta in un territorio dove ${comune.tipoEdilizio.toLowerCase()}. ${getCriticitàPerServizio(comune, servizioSlug)}. Il cappotto esterno riduce il consumo energetico, elimina i ponti termici e migliora il comfort abitativo. Il costo del cappotto termico a ${comune.nome} dipende dalla superficie della facciata, dallo spessore dell'isolante e dalla finitura scelta.`,

    "impianti-elettrici-idraulici-termici": 
      `Sostituire gli impianti a ${comune.nome} è spesso l'intervento più urgente in un tessuto edilizio dove ${comune.tipoEdilizio.toLowerCase()}. ${getCriticitàPerServizio(comune, servizioSlug)}. Il rifacimento dell'impianto elettrico, idraulico e termico a ${comune.nome} richiede una progettazione ad hoc che rispetti le normative vigenti e le caratteristiche specifiche dell'immobile.`,

    "pavimenti-rivestimenti": 
      `La posa di nuovi pavimenti e rivestimenti a ${comune.nome} non è mai un'operazione superficiale in un comune dove ${comune.tipoEdilizio.toLowerCase()}. ${getCriticitàPerServizio(comune, servizioSlug)}. La scelta del materiale — gres porcellanato, parquet o resina — deve essere calibrata sulle condizioni reali del sottofondo e sulle esigenze di durabilità del contesto locale.`,
  };

  return templates[servizioSlug] || `Richiedi un preventivo per ${servizioSlug.replace(/-/g, " ")} a ${comune.nome}. Il costo indicativo viene definito dopo una verifica tecnica dell'immobile e un sopralluogo per valutare lo stato degli impianti e delle strutture.`;
}

// ─────────────────────────────────────────────
// DESCRIPTION: testo del blocco "Descrizione del Servizio"
// ─────────────────────────────────────────────

export function getServiceDescription(comune: Comune, servizioSlug: string): string {
  const templates: Record<string, string> = {
    "ristrutturazione-bagno": 
      `La ristrutturazione completa del bagno a ${comune.nome} comprende demolizioni, rifacimento degli impianti idraulici ed elettrici, ripristino dei sottofondi, impermeabilizzazione e posa delle nuove finiture. Il costo parte da 5.500 € tutto incluso per interventi standard, ma varia in base alla metratura, allo stato degli impianti e alla scelta dei materiali.`,

    "ristrutturazione-cucina": 
      `La ristrutturazione della cucina a ${comune.nome} include demolizioni, modifiche murarie, adeguamenti impiantistici, posa di pavimenti e rivestimenti, rasature e tinteggiature. Il preventivo viene definito sul progetto reale dopo sopralluogo tecnico.`,

    "rifacimento-tetto": 
      `Il rifacimento del tetto a ${comune.nome} comprende la rimozione della vecchia copertura, verifica e consolidamento della struttura portante, isolamento termico e idraulico, e posa della nuova copertura con materiali certificati.`,

    "cappotto-termico": 
      `Il cappotto termico a ${comune.nome} include la valutazione tecnica del fabbricato, preparazione della superficie, posa dei pannelli isolanti, rete di armatura, rasante di protezione e finitura estetica. Riduce i consumi fino al 30%.`,

    "impianti-elettrici-idraulici-termici": 
      `Il rifacimento degli impianti a ${comune.nome} comprende progettazione personalizzata, installazione completa con materiali certificati, prove di funzionamento e certificazioni richieste dalla legge (DM 37/2008).`,

    "pavimenti-rivestimenti": 
      `La posa di pavimenti e rivestimenti a ${comune.nome} include la consulenza nella scelta dei materiali, preparazione del supporto, posa professionale con tecniche aggiornate, sigillatura e pulizia finale.`,

    "ristrutturazione-appartamento-completo": 
      `La ristrutturazione completa dell'appartamento a ${comune.nome} coordina demolizioni, impianti, opere murarie, pavimenti, rivestimenti, porte interne, sanitari e finiture finali. Il costo base è di 550 €/mq per condizioni standard, da confermare dopo sopralluogo.`,
  };

  return templates[servizioSlug] || getServiceIntro(comune, servizioSlug);
}

// ─────────────────────────────────────────────
// META DESCRIPTION
// ─────────────────────────────────────────────

export function getServiceMetaDescription(comune: Comune, servizioSlug: string): string {
  const nomi: Record<string, string> = {
    "ristrutturazione-bagno": "ristrutturazione del bagno",
    "ristrutturazione-cucina": "ristrutturazione della cucina",
    "rifacimento-tetto": "rifacimento del tetto",
    "cappotto-termico": "cappotto termico",
    "impianti-elettrici-idraulici-termici": "rifacimento degli impianti",
    "pavimenti-rivestimenti": "posa di pavimenti e rivestimenti",
    "ristrutturazione-appartamento-completo": "ristrutturazione completa dell'appartamento",
  };
  const nome = nomi[servizioSlug] || servizioSlug.replace(/-/g, " ");
  return `Richiedi un preventivo per ${nome} a ${comune.nome}. Costi indicativi, sopralluogo e conferma finale del preventivo.`;
}

// ─────────────────────────────────────────────
// KEYWORDS
// ─────────────────────────────────────────────

export function getServiceKeywords(comune: Comune, servizioSlug: string): string[] {
  const baseKeywords: Record<string, string[]> = {
    "ristrutturazione-appartamento-completo": [
      `ristrutturazione casa ${comune.nome}`,
      `costo ristrutturazione ${comune.nome}`,
      `preventivo ristrutturazione ${comune.nome}`,
      `impresa ristrutturazioni ${comune.nome}`,
    ],
    "ristrutturazione-bagno": [
      `ristrutturazione bagno ${comune.nome}`,
      `costo bagno ${comune.nome}`,
      `rifacimento bagno ${comune.nome}`,
      `preventivo bagno ${comune.nome}`,
    ],
    "ristrutturazione-cucina": [
      `ristrutturazione cucina ${comune.nome}`,
      `costo cucina ${comune.nome}`,
      `rifacimento cucina ${comune.nome}`,
      `preventivo cucina ${comune.nome}`,
    ],
    "rifacimento-tetto": [
      `rifacimento tetto ${comune.nome}`,
      `costo tetto ${comune.nome}`,
      `copertura tetto ${comune.nome}`,
      `preventivo tetto ${comune.nome}`,
    ],
    "cappotto-termico": [
      `cappotto termico ${comune.nome}`,
      `isolamento facciata ${comune.nome}`,
      `costo cappotto ${comune.nome}`,
    ],
    "impianti-elettrici-idraulici-termici": [
      `impianto elettrico ${comune.nome}`,
      `impianto idraulico ${comune.nome}`,
      `impianto termico ${comune.nome}`,
      `rifacimento impianti ${comune.nome}`,
    ],
    "pavimenti-rivestimenti": [
      `pavimenti ${comune.nome}`,
      `posa pavimenti ${comune.nome}`,
      `rivestimenti bagno ${comune.nome}`,
    ],
  };

  return baseKeywords[servizioSlug] || [`${servizioSlug} ${comune.nome}`];
}
