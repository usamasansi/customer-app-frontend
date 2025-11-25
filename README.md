# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

---

Quick start (this project)

1. Install dependencies

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

2. Run in development

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev
```

3. Build and preview production

```bash
npm run build
npm run preview
```

Project additions

- `components/` - shared Vue components (example: `HelloWorld.vue`)
- `layouts/` - app layouts (example: `default.vue`)
- `composables/` - composable utilities (example: `useAuth.ts`)
- `types/` - global TypeScript declaration files
- `assets/` - static assets (images, fonts, etc.)

If you want any additional scaffold (store templates, CI, tests), tell me which pieces and I will add them.

---

# Customer App — Frontend

A lightweight Nuxt-based frontend for the Customer App (CRUD + Auth). This repository contains the UI, layouts, composables and Pinia stores used to interact with a backend API that exposes customer and authentication endpoints.

**Status:** Minimal scaffold / starter. Customize components, stores and API integration to match your backend.

**Live demo:** Not provided in this repo.

## Tech stack

- Framework: Nuxt (Nuxt 3 / Nuxt 4 runtime)
- UI: Vue 3
- State: Pinia (`@pinia/nuxt`)
- HTTP client: Axios (plugin in `plugins/axios.ts`)
- Language: TypeScript

## Features (scaffolded)

- App shell in `layouts/default.vue`
- Example component: `components/HelloWorld.vue`
- Auth middleware: `middleware/auth.ts`
- Pinia store scaffold in `stores/` (store for auth exists)
- Composables in `composables/` (example: `useAuth.ts`)

## Prerequisites

- Node.js 18+ (recommended)
- npm, pnpm or yarn

## Quick start

1. Install dependencies

```bash
# using npm
npm install

# or pnpm
pnpm install

# or yarn
yarn install
```

2. Create a `.env` file if you need custom runtime config (optional)

Example `.env` entries (the app reads `NUXT_API_BASE` from runtime config):

```env
NUXT_API_BASE=http://localhost:8000/api
```

3. Start development server

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev
```

4. Build and preview production

```bash
npm run build
npm run preview
```

## Project structure (important paths)

- `app/` — Nuxt app entry (`app.vue`)
- `pages/` — route pages (`index.vue`, `login.vue`)
- `components/` — shared Vue components
- `layouts/` — application layouts (`default.vue`)
- `composables/` — reusable composables/hooks
- `stores/` — Pinia stores (e.g. `auth.ts`)
- `plugins/` — plugins (e.g. `axios.ts`)
- `middleware/` — route middleware (e.g. `auth.ts`)
- `types/` — TypeScript declaration/shims
- `public/` — static assets
- `docs/` — project docs and notes

## Environment variables

This project reads runtime configuration from `process.env` using Nuxt runtime config. The most important variable:

- `NUXT_API_BASE` — Base URL for your backend API (defaults to `http://localhost:8000/api` if not specified).

Add any other environment variables your backend requires to the `.env` file and update `nuxt.config.ts` if you need to expose them to the client.

## Contributing

Contributions are welcome. A simple suggested flow:

1. Fork the repo and create a feature branch
2. Make changes and add tests where appropriate
3. Open a pull request describing your changes

If you'd like, I can add a GitHub Actions workflow for linting/testing and a PR template.

## Notes about TypeScript and editor warnings

The scaffold includes small shims in `types/` to reduce editor type errors for Nuxt runtime helpers (e.g. `useState`). If you prefer full type packages, add the official Nuxt type packages or update `tsconfig.json` to reference the correct types and then run `npm install --save-dev` for those packages.



## Architecture (high level)

Basic flow:

```
Browser <-> Nuxt Frontend (pages/components) <-> API composable (useApi) <-> Backend REST API
```

- UI: pages -> components -> composables -> stores
- Data: `useApi` composable reads `NUXT_API_BASE` and calls backend endpoints

ASCII diagram:

```
+-------------------+        +-------------------+
|   Nuxt Frontend   | <----> |   Backend API     |
|  (pages, comps)   |        |  (customers/auth) |
+-------------------+        +-------------------+
```

## API contract and examples

See `docs/API.md` for a minimal example of the customers endpoints expected by this frontend. Add more fields or authentication details to match your backend.

## Linting & CI

- ESLint/Prettier config files added: `.eslintrc.json` and `.prettierrc`.
- A basic GitHub Actions workflow is included at `.github/workflows/ci.yml` to install dependencies and build on push/PR.

To run lint locally (install dev deps for eslint and plugins first):

```bash
# install ESLint + plugins (one-time)
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue

# then run lint
npm run lint # or npx eslint . --ext .ts,.vue
```


