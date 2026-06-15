# Wedding Table Planner

**A beautiful, drag-and-drop wedding seating planner. Create plans, assign guests to tables, and share with a link.**

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
- **Multi‑plan Dashboard** — Manage multiple wedding plans from one account
- **Share via Link** — Generate a read-only share link for the couple, venue staff, or guests
- **Multi‑language** — English, 简体中文, Italiano

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + React Router v7 |
| Language | TypeScript (strict) |
| Build | Vite 7 |
| Backend | Convex (real-time database) |
| Auth | Convex Auth (email + password) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Icons | Lucide React |
| Package Manager | pnpm |

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Start Convex dev deployment (generates types, creates cloud deployment)
npx convex dev

# Start frontend dev server (separate terminal)
pnpm dev

# Production build
pnpm build
```

Open `http://127.0.0.1:5173` in your browser.

You will need a free [Convex](https://convex.dev) account for the backend.

---

## Architecture

The planner uses [Convex](https://convex.dev) for persistent storage, authentication, and real-time data sync. Plans, tables, guests, and seat assignments are stored in Convex documents and synced to the UI automatically via reactive queries.

| Action | Data Flow |
|--------|-----------|
| Log in / sign up | Convex Auth (email + password) |
| Create / manage plans | Convex mutations → real-time query |
| Add / edit tables & guests | Convex mutations → reactive UI |
| Drag guest to seat | Optimistic UI → Convex mutation → auto‑sync |
| Share | Generate a unique token → `/view/:token` (public) |

---

## Project Structure

```
src/
├── main.tsx                  # Entry — Router + ConvexAuthProvider
├── convex.ts                 # ConvexReactClient instance
├── i18n.tsx                  # Internationalisation (en / zh / it)
├── styles.css                # Global styles & CSS custom properties
├── routes/
│   ├── __root.tsx            # Root layout (I18nProvider + TooltipProvider)
│   ├── login.tsx             # Login / sign‑up page
│   ├── dashboard.tsx         # Plan list dashboard
│   ├── plan-editor.tsx       # Plan editor (tables, guests, seat assignment)
│   ├── plan-viewer.tsx       # Read‑only shared plan viewer
│   └── authenticated-route.tsx # Auth guard wrapper
├── hooks/
│   ├── use-plan-editor.ts    # Plan editor state & mutation hooks
│   └── use-mobile.ts         # Mobile breakpoint hook
├── components/
│   ├── table-view.tsx        # Visual table layout (round & rectangular)
│   ├── table-editor.tsx      # Sidebar table config panel
│   ├── guest-chip.tsx        # Draggable guest card
│   ├── seat-button.tsx       # Individual seat on a table
│   ├── guest-edit-modal.tsx  # Edit guest dialog
│   ├── seat-assignment-modal.tsx # Assign / clear a seat
│   ├── dietary-badges.tsx    # Dietary restriction badge pills
│   ├── stat.tsx              # Stats card
│   ├── error-boundary.tsx    # React error boundary
│   └── ui/                   # shadcn/ui primitives
├── planner/
│   ├── types.ts              # Core types
│   ├── constants.ts          # Dietary badge definitions
│   ├── utils.ts              # Seat computation, CSV parsing, grouping
│   └── dnd.ts                # Drag‑and‑drop constants
└── lib/
    └── utils.ts              # Tailwind class merge helper

convex/                        # Convex backend
├── schema.ts                 # DB schema (plans, tables, guests, assignments + auth)
├── auth.ts                   # Auth config (password provider)
├── auth.config.ts            # JWT issuer config
├── plans.ts                  # Plan CRUD + share tokens
├── tables.ts                 # Table CRUD + seat cleanup
├── guests.ts                 # Guest CRUD + CSV batch import
├── assignments.ts            # Seat assignment / swap / clear
└── http.ts                   # HTTP routes for auth
```

---

## License

MIT
