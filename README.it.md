# Wedding Table Planner

**Un elegante strumento drag‑and‑drop per pianificare la disposizione dei tavoli al matrimonio. Funziona interamente nel tuo browser — condividi i piani con un semplice link.**

[![English](https://img.shields.io/badge/README-English-blue)](README.md) [![中文](https://img.shields.io/badge/README-中文-blue)](README.zh-CN.md)

---

![Wedding Table Planner](public/og-image.png)

---

## Funzionalità

- **Drag & Drop** — Assegna gli ospiti ai posti trascinandoli dalla barra laterale
- **Tavoli rotondi e rettangolari** — Mescola le forme dei tavoli, personalizza i posti per lato
- **Importazione CSV** — Importa gli ospiti in blocco con riconoscimento automatico delle intestazioni
- **Etichette dietetiche** — Rileva automaticamente Vegetariano, Vegano, Senza glutine, Allergia alla frutta a guscio, Halal, Kosher e altro
- **Assegnazione per gruppo** — Un clic per posizionare insieme tutti i membri dello stesso gruppo
- **Condivisione a un link** — L'intero piano è codificato nell'URL; incolla il link per condividerlo
- **Multi‑lingua** — English, 简体中文, Italiano

---

## Demo

Apri [weddingtable.cn](https://weddingtable.cn) e inizia a organizzare.

---

## Stack Tecnologico

| Livello | Tecnologia |
|---------|------------|
| Framework | React 19 |
| Linguaggio | TypeScript (strict) |
| Build | Vite 7 |
| Stile | Tailwind CSS v4 + shadcn/ui |
| Icone | Lucide React |
| Gestore pacchetti | pnpm |

---

## Per Iniziare

```bash
# Installa le dipendenze
pnpm install

# Avvia il server di sviluppo
pnpm dev

# Build di produzione
pnpm build
```

Apri `http://127.0.0.1:5173` nel browser.

---

## Come Funziona

Nessun backend, nessun database. L'intero stato del pianificatore — tavoli, ospiti e assegnazioni dei posti — viene serializzato in JSON, codificato in base64 e memorizzato nel parametro `?state=` dell'URL. La preferenza della lingua è memorizzata in `?lang=`.

| Azione | Flusso dati |
|--------|-------------|
| Crea / modifica tavoli | Stato React → URL |
| Aggiungi / importa ospiti | Stato React → URL |
| Trascina ospite al posto | Stato React → URL |
| Condividi | Copia URL → incolla ovunque |

---

## Struttura del Progetto

```
src/
├── main.tsx                 # Punto d'ingresso
├── App.tsx                  # Pianificatore principale — tutto lo stato qui
├── i18n.tsx                 # Internazionalizzazione (en / zh / it)
├── styles.css               # Stili globali e proprietà CSS personalizzate
├── components/
│   ├── table-view.tsx       # Layout visivo del tavolo (rotondo e rettangolare)
│   ├── table-editor.tsx     # Pannello di configurazione tavolo nella sidebar
│   ├── guest-chip.tsx       # Scheda ospite trascinabile
│   ├── seat-button.tsx      # Singolo posto sul tavolo
│   ├── guest-edit-modal.tsx # Finestra di modifica ospite
│   ├── seat-assignment-modal.tsx # Finestra di assegnazione posto
│   ├── dietary-badges.tsx   # Etichette per restrizioni alimentari
│   ├── stat.tsx             # Scheda statistiche
│   └── ui/                  # Componenti base shadcn/ui (13 componenti)
├── hooks/
│   └── use-mobile.ts        # Hook per breakpoint mobile
├── lib/
│   └── utils.ts             # Utility per unione classi Tailwind
└── planner/
    ├── types.ts             # Tipi fondamentali
    ├── constants.ts         # Definizioni etichette dietetiche, stato iniziale
    └── utils.ts             # Posti, CSV, codifica/decodifica URL, raggruppamento
```

---

## Licenza

MIT
