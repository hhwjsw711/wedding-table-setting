# Wedding Table Planner

**A beautiful, drag-and-drop wedding seating planner that runs entirely in your browser. No account needed — share plans via a single link.**

[![English](https://img.shields.io/badge/README-中文-blue)](README.zh-CN.md) [![Italiano](https://img.shields.io/badge/README-Italiano-green)](README.it.md)

---

![Wedding Table Planner](public/og-image.png)

---

## Features

- **Drag & Drop** — Assign guests to seats by dragging from the sidebar
- **Round & Rectangular Tables** — Mix table shapes, customize seats per side
- **CSV Import** — Bulk-import guests with auto-detected column headers
- **Dietary Badges** — Auto-recognises Vegetarian, Vegan, Gluten‑free, Nut allergy, Halal, Kosher, and more
- **Auto‑Seat by Group** — One click places all group members together
- **One‑Link Sharing** — The entire plan is encoded in the URL; paste the link to share
- **Multi‑language** — English, 简体中文, Italiano

---

## Demo

Open [weddingtable.cn](https://weddingtable.cn) and start arranging.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 |
| Language | TypeScript (strict) |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Icons | Lucide React |
| Package Manager | pnpm |

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Production build
pnpm build
```

Open `http://127.0.0.1:5173` in your browser.

---

## How It Works

There is no backend and no database. The entire planner state — tables, guests, and seat assignments — is serialised to JSON, base64‑encoded, and stored in the `?state=` URL query parameter. Language preference is stored in `?lang=`.

| Action | Data Flow |
|--------|-----------|
| Create / edit tables | React state → URL |
| Add / import guests | React state → URL |
| Drag guest to seat | React state → URL |
| Share | Copy URL → paste anywhere |

---

## Project Structure

```
src/
├── main.tsx                 # Entry point
├── App.tsx                  # Main planner — all state lives here
├── i18n.tsx                 # Internationalisation (en / zh / it)
├── styles.css               # Global styles & CSS custom properties
├── components/
│   ├── table-view.tsx       # Visual table layout (round & rectangular)
│   ├── table-editor.tsx     # Sidebar table config panel
│   ├── guest-chip.tsx       # Draggable guest card
│   ├── seat-button.tsx      # Individual seat on a table
│   ├── guest-edit-modal.tsx # Edit guest dialog
│   ├── seat-assignment-modal.tsx # Assign / clear a seat
│   ├── dietary-badges.tsx   # Dietary restriction badge pills
│   ├── stat.tsx             # Stats card
│   └── ui/                  # shadcn/ui primitives (13 components)
├── hooks/
│   └── use-mobile.ts        # Mobile breakpoint hook
├── lib/
│   └── utils.ts             # Tailwind class merge helper
└── planner/
    ├── types.ts             # Core types
    ├── constants.ts         # Dietary badge definitions, starter state
    └── utils.ts             # Seats, CSV, URL encode/decode, grouping
```

---

## License

MIT
