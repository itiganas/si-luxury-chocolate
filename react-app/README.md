# SI Luxury Chocolate — React App

React version of the SI Luxury Chocolate website, built with Vite and React Router.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher

## Setup

**1. Copy the images**

The hero slideshow needs the images from the parent project:

```bash
cp -r ../images public/images
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the dev server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Other commands

| Command | Description |
|---|---|
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |

## Project structure

```
src/
├── components/     # Shared UI pieces (Header, Footer, Hero, etc.)
├── pages/          # One file per route/page
├── App.jsx         # Routes definition
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Adding a new page

1. Create `src/pages/YourPage.jsx`
2. Add a `<Route>` in `src/App.jsx`
3. Add a `<Link>` in `src/components/Header.jsx`

---

## Environment configuration

The backend API URL is controlled by environment files — one per environment.
**Never hardcode a URL directly in a component.**

### How it works

Vite reads a different `.env` file depending on the command you run:

| File | Used when |
|------|-----------|
| `.env.development` | `npm run dev` |
| `.env.te1` | `npm run build -- --mode te1` |
| `.env.production` | `npm run build` |

All variables must start with `VITE_` to be available in the browser.

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Base URL for REST API calls (e.g. `http://localhost:8080/api/v1`) |
| `VITE_GATEWAY_URL` | Base URL of the Spring Boot Gateway — used for OAuth2 login and logout redirects (e.g. `http://localhost:8080`) |

### The files

```
.env.development   → http://localhost:8080/api/v1
.env.te1           → https://te1-api.si-luxury-chocolate.ch/api/v1
.env.production    → https://api.si-luxury-chocolate.ch/api/v1
```

Update the URLs in these files to match your actual backend addresses.

### Running each environment

**Local dev** (uses `.env.development`):
```bash
npm run dev
```

**TE1 build** (uses `.env.te1`):
```bash
npm run build -- --mode te1
```

**Production build** (uses `.env.production`):
```bash
npm run build
```

### Local overrides

If you need to temporarily point to a different URL without touching the shared files,
create a `.env.development.local` file (it is gitignored and only exists on your machine):

```
VITE_API_URL=http://localhost:9090/api/v1
```

Vite always gives `.local` files priority over the base `.env.*` files.

### Adding a new API call

When you add a new component that calls the backend, always use:

```js
const API_URL = import.meta.env.VITE_API_URL;
```

This one line is all you need — Vite substitutes the correct value at build time.
