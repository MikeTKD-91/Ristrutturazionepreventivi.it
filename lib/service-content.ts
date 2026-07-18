// lib/service-content.ts
// Testi introduttivi strategici per ogni combinazione comune + servizio
// Intercettano le ricerche dei potenziali clienti

import { Comune } from "@/data/comuni";

// ─────────────────────────────────────────────
// KEYWORDS TARGET PER SERVIZIO
// ─────────────────────────────────────────────

const KEYWORDS: Record<string, string[]> = {
  "ristrutturazione-bagno": [
    "costo bagno", "rifare bagno", "preventivo bagno",
    "ristrutturazione bagno", "rifacimento bagno", "bagno nuovo"
  ],
  "ristrutturazione-cucina": [
    "costo cucina", "rifare cucina", "preventivo cucina",
    "ristrutturazione cucina", "rifacimento cucina"
  ],
  "rifacimento-tetto": [
    "costo tetto", "rifare tetto", "preventivo tetto",
    "rifacimento tetto", "copertura tetto", "tetto nuovo"
  ],
  "cappotto-termico": [
    "costo cappotto termico", "preventivo cappotto",
    "isolamento facciata", "cappotto esterno", "risparmio energetico"
  ],
  "impianti-elettrici-idraulici-termici": [
    "costo impianto elettrico", "rifare impianto",
    "preventivo impianti", "impianto idraulico", "impianto termico"
  ],
  "pavimenti-rivestimenti": [
    "costo pavimenti", "posa pavimenti", "preventivo pavimenti",
    "pavimenti nuovi", "rivestimenti bagno", "gres porcellanato"
  ],
  "ristrutturazione-appartamento-completo": [
    "costo ristrutturazione casa", "preventivo ristrutturazione",
    "ristrutturazione appartamento", "rifare casa", "costo al mq"
  ],
};

// ─────────────────────────────────────────────
// TESTI INTRODUTTIVI STRATEGICI (sotto H1)
// Devono: intercettare ricerche, essere brevi, commerciali, con keyword
// ─────────────────────────────────────────────

export function getServiceIntro(comune: Comune, servizioSlug: string): string {
  const kw = KEYWORDS[servizioSlug] || ["preventivo", "costo"];
  const kw1 = kw[0];
  const kw2 = kw[1] || kw[0];

  const templates: Record<string, string> = {
    "ristrutturazione-bagno":
      `Quanto costa ${kw1} a ${comune.nome}? Il ${kw2} parte da 5.500 euro tutto incluso per interventi standard. A ${comune.nome}, dove ${comune.tipoEdilizio.toLowerCase()}, ogni progetto richiede una verifica specifica prima di confermare il quadro economico definitivo.`,

    "ristrutturazione-cucina":
      `Quanto costa ${kw1} a ${comune.nome}? Il ${kw2} dipende dalla metratura, dalle modifiche murarie e dalle finiture scelte. A ${comune.nome}, dove ${comune.tipoEdilizio.toLowerCase()}, il sopralluogo tecnico è indispensabile per una stima accurata.`,

    "rifacimento-tetto":
      `Quanto costa ${kw1} a ${comune.nome}? Il ${kw2} varia in base alla superficie, al materiale scelto e allo stato della struttura portante. A ${comune.nome}, dove ${comune.tipoEdilizio.toLowerCase()}, una verifica tecnica preventiva evita sorprese di cantiere.`,

    "cappotto-termico":
      `Quanto costa ${kw1} a ${comune.nome}? Il ${kw2} dipende dalla superficie della facciata e dallo spessore dell'isolante. A ${comune.nome}, dove ${comune.tipoEdilizio.toLowerCase()}, il cappotto riduce i consumi energetici fino al 30% e migliora il comfort abitativo.`,

    "impianti-elettrici-idraulici-termici":
      `Quanto costa ${kw1} a ${comune.nome}? Il ${kw2} dipende dall'estensione dell'intervento, dall'anno di costruzione dell'edificio e dallo stato degli impianti esistenti. A ${comune.nome}, dove ${comune.tipoEdilizio.toLowerCase()}, la verifica tecnica è obbligatoria per una stima conforme.`,

    "pavimenti-rivestimenti":
      `Quanto costa ${kw1} a ${comune.nome}? Il ${kw2} dipende dal materiale scelto, dal formato e dallo stato del massetto esistente. A ${comune.nome}, dove ${comune.tipoEdilizio.toLowerCase()}, la posa professionale richiede una verifica del supporto prima di confermare il preventivo.`,

    "ristrutturazione-appartamento-completo":
      `Quanto costa ${kw1} a ${comune.nome}? Il ${kw2} parte da 550 euro al mq per condizioni standard. A ${comune.nome}, dove ${comune.tipoEdilizio.toLowerCase()}, il costo definitivo si conferma solo dopo sopralluogo e verifica tecnica dell'immobile.`,
  };

  return templates[servizioSlug] || `Richiedi un preventivo a ${comune.nome}. Il costo indicativo viene definito dopo una verifica tecnica e un sopralluogo.`;
}

// ─────────────────────────────────────────────
// TESTI DESCRITTIVI (blocco "Descrizione del Servizio")
// Più tecnici, richiamano il contesto locale
// ─────────────────────────────────────────────

export function getServiceDescription(comune: Comune, servizioSlug: string): string {
  const templates: Record<string, string> = {
    "ristrutturazione-bagno":
      `A ${comune.nome}, la ristrutturazione del bagno deve considerare il contesto edilizio locale: ${comune.tipoEdilizio.toLowerCase()}. ${comune.caratteristicheBagni || ""} Tra le criticità più comuni: ${comune.criticalita.slice(0, 2).join(" e ")}. Il preventivo definitivo emerge dal sopralluogo, dove si verificano misure, stato degli impianti e condizioni del supporto.`,

    "ristrutturazione-cucina":
      `A ${comune.nome}, la ristrutturazione della cucina si confronta con un tessuto edilizio dove ${comune.tipoEdilizio.toLowerCase()}. ${comune.caratteristicheCucine || ""} Le criticità più frequenti includono: ${comune.criticalita.slice(0, 2).join(" e ")}. Ogni preventivo viene calibrato sul progetto reale dopo verifica tecnica.`,

    "rifacimento-tetto":
      `A ${comune.nome}, il rifacimento del tetto richiede attenzione alle caratteristiche del patrimonio edilizio: ${comune.tipoEdilizio.toLowerCase()}. Le criticità locali più rilevanti: ${comune.criticalita.slice(0, 2).join(" e ")}. La scelta del materiale e la verifica strutturale sono passaggi fondamentali prima di formulare il preventivo.`,

    "cappotto-termico":
      `A ${comune.nome}, l'isolamento a cappotto termico risponde alle esigenze di un tessuto edilizio dove ${comune.tipoEdilizio.toLowerCase()}. Le criticità più comuni: ${comune.criticalita.slice(0, 2).join(" e ")}. L'intervento riduce i consumi, elimina i ponti termici e protegge la struttura dagli agenti atmosferici.`,

    "impianti-elettrici-idraulici-termici":
      `A ${comune.nome}, il rifacimento degli impianti è spesso l'intervento più urgente in un contesto dove ${comune.tipoEdilizio.toLowerCase()}. Le criticità più frequenti: ${comune.criticalita.slice(0, 2).join(" e ")}. La progettazione ad hoc e le certificazioni obbligatorie (DM 37/2008) garantiscono sicurezza e conformità.`,

    "pavimenti-rivestimenti":
      `A ${comune.nome}, la posa di pavimenti e rivestimenti non è mai un'operazione banale in un comune dove ${comune.tipoEdilizio.toLowerCase()}. Le criticità più comuni: ${comune.criticalita.slice(0, 2).join(" e ")}. La scelta del materiale e la preparazione del supporto determinano la durata e la qualità del risultato.`,

    "ristrutturazione-appartamento-completo":
      `A ${comune.nome}, la ristrutturazione completa dell'appartamento coordina demolizioni, impianti, opere murarie e finiture in un contesto dove ${comune.tipoEdilizio.toLowerCase()}. Le criticità più rilevanti: ${comune.criticalita.slice(0, 2).join(" e ")}. Il costo al mq di 550 euro è un riferimento per condizioni standard, da confermare dopo sopralluogo.`,
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
  return `Quanto costa ${nome} a ${comune.nome}? Preventivo immediato, costi indicativi e sopralluogo tecnico per confermare il quadro economico.`;
}
