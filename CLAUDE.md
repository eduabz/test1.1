# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start dev server (opens platform picker)
npm start

# Start for a specific platform
npm run ios
npm run android
npm run web

# Lint
npm run lint
```

There is no test runner configured. Storybook is set up for component development — it runs via the `.storybook/` config with `@storybook/react-native`.

## Architecture

**Intellecta** is an Expo (React Native) app for visualizing tobacco/vaping epidemiological data across Mexican regions.

### Routing — Expo Router file-based

```
app/
  index.tsx          # Auth gate: redirects to /(auth)/login or /(tabs)/dashboard
  _layout.tsx        # Root: wraps everything in GestureHandlerRootView + AuthProvider
  (auth)/            # Unauthenticated stack (login, register)
  (tabs)/            # Authenticated tab navigator (dashboard, analytics, regions, reports, alerts)
  modal.tsx          # Sheet-style modal
```

### Auth flow

Firebase Auth is the identity layer (`constants/firebase.ts`). `AuthContext` (`context/AuthContext.tsx`) listens to `onAuthStateChanged` and exposes `{ user, loading, getToken }` via `useAuth()`. Services call `getToken()` to attach a Bearer token to every API request.

On first registration, `authService.register` creates the Firebase user then POSTs to the backend (`/users`) with the Firebase UID so the backend can link accounts.

### Data / API

All data fetching goes through service modules that hit a REST backend:

| Service | Endpoints |
|---|---|
| `authService` | Firebase sign-in/register/sign-out |
| `reportService` | `/dashboard/summary`, `/analytics/trends`, `/analytics/regions`, `/analytics/demographics`, `/reports` |
| `alertService` | `/alerts`, `/alerts/:id/read` |

`API_BASE_URL` defaults to `http://localhost:8080` (see `constants/api.ts`). Change this when targeting a real backend or device.

`FilterParams` (in `types/Report.ts`) is the shared query object used across analytics endpoints — it supports `substanceType`, `yearFrom`, `yearTo`, `region`, `ageGroup`, and `source`.

### Styling

NativeWind (Tailwind for React Native) is configured with a custom theme in `tailwind.config.js`. The design uses a dark palette:

- `brand-900` (`#0F172A`) — primary background
- `brand-500` (`#1D4ED8`) — primary action color
- `accent-*` (green shades) — positive indicators
- `danger-*` (red shades) — alerts/negative
- `warn-*` (amber shades) — warnings

Use NativeWind `className` props in components. Avoid inline styles except for dynamic values that can't be expressed as Tailwind classes.

### Path alias

`@/` maps to the project root (`tsconfig.json` paths). Use `@/components/...`, `@/services/...`, etc. throughout.

### Storybook

Each component in `components/` has a `.stories.tsx` file. Storybook runs on-device via `@storybook/react-native`. The entry point is `.storybook/index.ts`.
