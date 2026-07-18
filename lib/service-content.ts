// lib/service-content.ts
// Testi introduttivi strategici per SEO

import { Comune } from "@/data/comuni";

export function getServiceIntro(comune: Comune, servizioSlug: string): string {
  const nome = comune.nome;
  
  switch (servizioSlug) {
    case "ristrutturazione-bagno":
      return "Preventivo bagno a " + nome + ": quanto costa rifare il bagno? Stima da 5.500 euro tutto incluso, prezzo finale dopo sopralluogo tecnico.";
    
    case "ristrutturazione-cucina":
      return "Costo cucina a " + nome + ": preventivo su misura per ristrutturazione completa. Sopralluogo gratuito e stima accurata in base al progetto reale.";
    
    case "rifacimento-tetto":
      return "Rifacimento tetto a " + nome + ": preventivo immediato per copertura e isolamento. Verifica struttura portante inclusa, costo al mq da confermare in cantiere.";
    
    case "cappotto-termico":
      return "Cappotto termico a " + nome + ": prezzo isolamento facciata con detrazione fiscale 50%. Sopralluogo gratuito per verificare lo stato del supporto.";
    
    case "impianti-elettrici-idraulici-termici":
      return "Rifacimento impianti a " + nome + ": costo elettrico, idraulico e termico con certificazioni incluse. Preventivo dopo verifica tecnica dell'immobile.";
    
    case "pavimenti-rivestimenti":
      return "Posa pavimenti a " + nome + ": preventivo gres, parquet e rivestimenti. Verifica massetto gratuita prima di confermare il costo definitivo.";
    
    case "ristrutturazione-appartamento-completo":
      return "Ristrutturazione casa a " + nome + ": costo da 550 euro al mq per condizioni standard. Preventivo completo dopo sopralluogo e verifica tecnica.";
    
    default:
      return "Preventivo a " + nome + ": costo indicativo e sopralluogo gratuito.";
  }
}

export function getServiceDescription(comune: Comune, servizioSlug: string): string {
  const nome = comune.nome;
  const t = comune.tipoEdilizio.toLowerCase();
  const c = comune.criticalita.slice(0, 2).join(" e ");
  
  switch (servizioSlug) {
    case "ristrutturazione-bagno":
      return "A " + nome + ", la ristrutturazione del bagno deve considerare il contesto edilizio locale: " + t + ". " + (comune.caratteristicheBagni || "") + " Tra le criticità più comuni: " + c + ". Il preventivo definitivo emerge dal sopralluogo.";
    
    case "ristrutturazione-cucina":
      return "A " + nome + ", la ristrutturazione della cucina si confronta con un tessuto edilizio dove " + t + ". " + (comune.caratteristicheCucine || "") + " Le criticità più frequenti: " + c + ". Ogni preventivo viene calibrato sul progetto reale.";
    
    case "rifacimento-tetto":
      return "A " + nome + ", il rifacimento del tetto richiede attenzione alle caratteristiche del patrimonio edilizio: " + t + ". Le criticità locali: " + c + ". La scelta del materiale e la verifica strutturale sono passaggi fondamentali.";
    
    case "cappotto-termico":
      return "A " + nome + ", l'isolamento a cappotto termico risponde alle esigenze di un tessuto edilizio dove " + t + ". Le criticità più comuni: " + c + ". L'intervento riduce i consumi e protegge la struttura.";
    
    case "impianti-elettrici-idraulici-termici":
      return "A " + nome + ", il rifacimento degli impianti è spesso l'intervento più urgente in un contesto dove " + t + ". Le criticità più frequenti: " + c + ". La progettazione ad hoc garantisce sicurezza e conformità.";
    
    case "pavimenti-rivestimenti":
      return "A " + nome + ", la posa di pavimenti e rivestimenti non è mai banale in un comune dove " + t + ". Le criticità più comuni: " + c + ". La scelta del materiale e la preparazione del supporto determinano la qualità del risultato.";
    
    case "ristrutturazione-appartamento-completo":
      return "A " + nome + ", la ristrutturazione completa coordina demolizioni, impianti, opere murarie e finiture in un contesto dove " + t + ". Le criticità più rilevanti: " + c + ". Il costo al mq è un riferimento da confermare dopo sopralluogo.";
    
    default:
      return getServiceIntro(comune, servizioSlug);
  }
}
