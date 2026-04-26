# Cinematic Portfolio

One-page React + Vite portfolio designed for premium game event frontend work, with a grounded AI assistant that answers from curated portfolio and resume content.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Content editing

Update these files to replace placeholders with real content:

- `src/data/portfolio.json`
- `src/data/knowledge.json`

Project screenshots can be added by replacing `null` in each `screenshots[].src` field with a local asset path or hosted image URL.

## AI assistant configuration

The chat widget works immediately with local grounded matching logic. To connect Google Gemini Flash Lite through the Gemini API, provide environment variables:

```bash
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash-lite
GEMINI_SYSTEM_PROMPT=
VITE_CHAT_MODE=auto
VITE_CONTACT_MODE=auto
VITE_GEMINI_API_KEY=
VITE_GEMINI_MODEL=gemini-2.5-flash-lite
VITE_GEMINI_SYSTEM_PROMPT=
```

The serverless endpoint lives in `api/chat.js`. By default it calls the Gemini `generateContent` API with `gemini-2.5-flash-lite`, and it still falls back to local grounded matching if the external model is unavailable.

For local-only browser testing without `/api/chat`, you can use:

```bash
VITE_CHAT_MODE=direct
VITE_GEMINI_API_KEY=your_key_here
VITE_GEMINI_MODEL=gemini-2.5-flash-lite
```

This sends requests straight from the browser to Gemini and exposes the key client-side, so only use it for local testing.

## Static hosting note

GitHub Pages is static-only, so `/api/chat` and `/api/contact` do not run there.

- `VITE_CHAT_MODE=auto` uses local grounded answers on `github.io`
- `VITE_CONTACT_MODE=auto` opens the visitor's email app instead of calling `/api/contact`

If you deploy the same frontend on a host with serverless functions, you can set:

```bash
VITE_CHAT_MODE=server
VITE_CONTACT_MODE=server
```

If you use GitHub Pages with a custom domain and still want static behavior, set:

```bash
VITE_CHAT_MODE=local
VITE_CONTACT_MODE=mailto
```
