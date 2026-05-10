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
