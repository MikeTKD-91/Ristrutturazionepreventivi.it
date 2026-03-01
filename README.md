# RistrutturazionePreventivi.it

Sito web completo per Russo FE Costruzione SRL - Impresa edile specializzata in ristrutturazioni a Napoli, Caserta e provincia.

## 🚀 Tecnologie

- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipizzazione statica
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componenti UI riutilizzabili
- **Framer Motion** - Animazioni
- **Lucide React** - Icone

## 📁 Struttura del Progetto

```
ristrutturazionepreventivi.it/
├── app/                          # Pagine Next.js (App Router)
│   ├── (root)/                   # Homepage
│   ├── servizi/                  # Pagina servizi + pagine dinamiche
│   ├── zone-servite/             # Pagina zone servite
│   ├── bonus-ristrutturazione/   # Pagina bonus
│   ├── blog/                     # Blog + articoli dinamici
│   ├── comune/[slug]/            # Pagine comuni dinamiche (33 comuni)
│   ├── napoli/                   # Overview Napoli
│   ├── caserta/                  # Overview Caserta
│   ├── privacy-policy/           # Privacy Policy GDPR
│   ├── cookie-policy/            # Cookie Policy GDPR
│   ├── layout.tsx                # Layout principale
│   └── globals.css               # Stili globali
├── components/
│   ├── ui/                       # Componenti shadcn/ui
│   └── shared/                   # Componenti condivisi
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── CalcolatoreStima.tsx
│       ├── CookieBanner.tsx
│       └── WhatsAppButton.tsx
├── data/                         # Dati statici
│   ├── comuni.ts                 # 33 comuni con dati
│   ├── servizi.ts                # 7 servizi
│   └── blog.ts                   # 10 articoli
├── lib/
│   └── utils.ts                  # Utility functions
├── public/                       # Asset statici
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🛠️ Installazione

```bash
# Clona il repository
cd ristrutturazionepreventivi.it

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Build per produzione
npm run build
```

## 📄 Pagine Generate

### Pagine Statiche
- `/` - Homepage con calcolatore
- `/servizi/` - Elenco servizi
- `/zone-servite/` - Zone servite
- `/bonus-ristrutturazione/` - Bonus fiscali
- `/blog/` - Blog
- `/napoli/` - Overview Napoli
- `/caserta/` - Overview Caserta
- `/privacy-policy/` - Privacy Policy
- `/cookie-policy/` - Cookie Policy

### Pagine Dinamiche (generateStaticParams)
- `/servizi/[slug]/` - 7 pagine servizi
- `/comune/[slug]/` - 33 pagine comuni
- `/blog/[slug]/` - 10 pagine articoli

**Totale: 55+ pagine generate staticamente**

## 🎨 Colori Ufficiali

- **Blu Navy**: `#0A2540` (colore principale)
- **Arancio**: `#FF6A00` (accento)
- **Bianco**: `#FFFFFF`
- **Grigio Chiaro**: `#F8F9FA`

## ✨ Funzionalità

### Data Dinamica
Su ogni pagina è presente la data di aggiornamento automatica:
```
"Costi aggiornati a [mese anno corrente]"
"Ultimo aggiornamento: [mese anno corrente]"
```

### Calcolatore Stima
- Selezione servizio
- Slider metri quadri (20-500)
- 3 livelli di finitura (Base/Standard/Premium)
- Range prezzo animato
- Link WhatsApp con messaggio precompilato

### Cookie Banner GDPR
- Banner fisso in basso
- Pulsanti: Accetta tutti, Rifiuta, Personalizza
- Toggle per cookie analitici e marketing
- Salvataggio in localStorage
- Link "Impostazioni cookie" nel footer

### Pulsante WhatsApp
- Fisso in basso a destra
- Colore arancio
- Link diretto a wa.me/393339809319

## 📱 Responsive

Il sito è completamente responsive:
- Desktop (>1024px)
- Tablet (768-1024px)
- Mobile (<768px)

## 🔍 SEO

- Meta tag dinamici per ogni pagina
- Open Graph per social sharing
- Schema.org LocalBusiness
- URL canonical
- Sitemap (da generare)

## 📞 Contatti

**Russo FE Costruzione SRL**
- Sede: Viale della Libertà 3, 81030 Lusciano (CE)
- P.IVA: 04836230617
- Email: info@ristrutturazionepreventivi.it
- WhatsApp: 333 980 9319

## 📝 Note

- Nessun pulsante di chiamata telefonica
- Nessuna menzione di "sopralluogo gratuito"
- Stima indicativa sempre "immediata e gratuita"
- Livello di finitura sempre specificato
- Superbonus 110% non menzionato (non più disponibile)