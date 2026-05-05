# CODASOL Investor Introduction Portal

Premium mobile-first Stage 1 investor teaser webapp for CODASOL, built as a non-NDA introduction microsite.

## Purpose
This portal presents approved teaser information to qualified investors and encourages request for the next-stage NDA investor deck.

## Non-NDA Warning
This repository and webapp contain only Stage 1 non-NDA information intended for introductory discussion.

## Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start local development server:
   ```bash
   npm run dev
   ```

## Build
```bash
npm run build
```

## GitHub Pages Deployment
Deployment is configured via `.github/workflows/deploy.yml` using official GitHub Pages actions and publishes the `dist` output.

## Base Path Reminder
Vite is configured with:

```js
base: "/Coda_Intro_Portal/"
```
