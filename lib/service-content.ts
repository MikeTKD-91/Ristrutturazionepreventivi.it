// lib/service-content.ts
// Testi introduttivi naturali e strategici per SEO

import { Comune } from "@/data/comuni";

export function getServiceIntro(comune: Comune, servizioSlug: string): string {
  const t = comune.tipoEdilizio.toLowerCase();

  const templates: Record<string, string> = {
    "ristrutturazione-bagno":
      `Preventivo bagno a ${comune.nome}: quanto costa rifare il bagno? Stima da 5.500 euro tutto incluso, prezzo finale dopo sopralluogo tecnico.`,

    "ristrutturazione-cucina":
      `Costo cucina a ${comune.nome}: preventivo su misura per ristrutturazione completa. Sopralluogo gratuito e stima accurata in base al progetto reale.`,

    "rifacimento-tetto":
      `Rifacimento tetto a ${comune.nome}: preventivo immediato per copertura e isolamento. Verifica struttura portante inclusa, costo al mq da confermare in cantiere.`,

    "cappotto-termico":
      `Cappotto termico a ${comune.nome}: preventivo isolamento facciata con detrazione fiscale 50%. Sopralluogo gratuito per verificare lo stato del supporto.`,

    "impianti-elettrici-idraulici-termici":
      `Rifacimento impianti a ${comune.nome}: costo elettrico, idraulico e termico con certificazioni incluse. Preventivo dopo verifica tecnica dell'immobile.`,

    "pavimenti-rivestimenti":
      `Posa pavimenti a ${comune.nome}: preventivo gres, parquet e rivestimenti. Verifica massetto gratuita prima di confermare il costo definitivo.`,

    "ristrutturazione-appartamento-completo":
      `Ristrutturazione casa a ${comune.nome}: costo da 550 euro al mq per condizioni standard. Preventivo completo dopo sopralluogo e verifica tecnica.`,
  };

  return templates[servizioSlug] || `Preventivo a ${comune.nome}: costo indicativo e sopralluogo gratuito.`;
}

export function getServiceDescription(comune: Comune, servizioSlug: string): string {
  const t = comune.tipoEdilizio.toLowerCase();
  const c = comune.criticalita.slice(0, 2).join(" e ");

  const templates: Record<string, string> = {
    "ristrutturazione-bagno":
      `A ${comune.nome}, la ristrutturazione del bagno deve considerare il contesto edilizio locale: ${t}. ${comune.caratteristicheBagni || ""} Tra le criticità più comuni: ${c}. Il preventivo definitivo emerge dal sopralluogo.`,

    "ristrutturazione-cucina":
      `A ${comune.nome}, la ristrutturazione della cucina si confronta con un tessuto edilizio dove ${t}. ${comune.caratteristicheCucine || ""} Le criticità più frequenti: ${c}. Ogni preventivo viene calibrato sul progetto reale.`,

    "rifacimento-tetto":
      `A ${comune.nome}, il rifacimento del tetto richiede attenzione alle caratteristiche del patrimonio edilizio: ${t}. Le criticità locali più rilevanti: ${c}. La scelta del materiale e la verifica strutturale sono passaggi fondamentali.`,

    "cappotto-termico":
      `A ${comune.nome}, l'isolamento a cappotto termico risponde alle esigenze di un tessuto edilizio dove ${t}. Le criticità più comuni: ${c}. L'intervento riduce i consumi e protegge la struttura.`,

    "impianti-elettrici-idraulici-termici":
      `A ${comune.nome}, il rifacimento degli impianti è spesso l'intervento più urgente in un contesto dove ${t}. Le criticità più frequenti: ${c}. La progettazione ad hoc garantisce sicurezza e conformità.`,

    "pavimenti-rivestimenti":
      `A ${comune.nome}, la posa di pavimenti e rivestimenti non è mai banale in un comune dove ${t}. Le criticità più comuni: ${c}. La scelta del materiale e la preparazione del supporto determinano la qualità del risultato.`,

    "ristrutturazione-appartamento-completo":
      `A ${comune.nome}, la ristrutturazione completa coordina demolizioni, impianti, opere murarie e finiture in un contesto dove ${t}. Le criticità più rilevanti: ${c}. Il costo al mq è un riferimento da confermare dopo sopralluogo.`,
  };

  return templates[servizioSlug] || getServiceIntro(comune, servizioSlug);
}
