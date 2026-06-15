# Wedding Table

**Un elegante strumento drag‑and‑drop per pianificare la disposizione dei tavoli al matrimonio. Crea piani, assegna gli ospiti ai tavoli e condividi con un link.**

[![English](https://img.shields.io/badge/README-English-blue)](README.md) [![中文](https://img.shields.io/badge/README-中文-blue)](README.zh-CN.md)

---

![Wedding Table](public/og-image.png)

---

## Funzionalità

- **Drag & Drop** — Assegna gli ospiti ai posti trascinandoli dalla barra laterale
- **Tavoli rotondi e rettangolari** — Mescola le forme dei tavoli, personalizza i posti per lato
- **Importazione CSV** — Importa gli ospiti in blocco con riconoscimento automatico delle intestazioni
- **Etichette dietetiche** — Rileva automaticamente Vegetariano, Vegano, Senza glutine, Allergia alla frutta a guscio, Halal, Kosher e altro
- **Assegnazione per gruppo** — Un clic per posizionare insieme tutti i membri dello stesso gruppo
- **Dashboard multi‑piano** — Gestisci più piani per matrimoni da un unico account
- **Condivisione via link** — Genera un link di sola lettura per la coppia, il personale della location o gli ospiti
- **Multi‑lingua** — English, 简体中文, Italiano

---

## Stack Tecnologico

| Livello | Tecnologia |
|---------|------------|
| Framework | React 19 + React Router v7 |
| Linguaggio | TypeScript (strict) |
| Build | Vite 7 |
| Backend | Convex (database in tempo reale) |
| Autenticazione | Convex Auth (email + password) |
| Stile | Tailwind CSS v4 + shadcn/ui |
| Icone | Lucide React |
| Gestore pacchetti | pnpm |

---

## Per Iniziare

```bash
# Installa le dipendenze
pnpm install

# Avvia il deployment di sviluppo Convex
npx convex dev

# Avvia il server frontend (terminale separato)
pnpm dev

# Build di produzione
pnpm build
```

Apri `http://127.0.0.1:5173` nel browser.

Serve un account gratuito [Convex](https://convex.dev) per il backend.

---

## Architettura

Il planner utilizza [Convex](https://convex.dev) per l'archiviazione persistente, l'autenticazione e la sincronizzazione in tempo reale. Piani, tavoli, ospiti e assegnazioni sono memorizzati come documenti Convex e sincronizzati automaticamente nell'interfaccia tramite query reattive.

| Azione | Flusso Dati |
|--------|-------------|
| Accedi / Registrati | Convex Auth (email + password) |
| Crea / gestisci piani | Convex mutations → query in tempo reale |
| Aggiungi / modifica tavoli e ospiti | Convex mutations → UI reattiva |
| Trascina ospite al posto | UI ottimistica → Convex mutation → sincronizzazione automatica |
| Condividi | Genera un token univoco → `/view/:token` (pubblico) |

---

## Licenza

MIT
