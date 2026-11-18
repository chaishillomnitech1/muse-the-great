# Muse the Great Concierge — Widget

A static chat widget for any of Chais Hill's GitHub Pages sites. One widget, one shared brain (when the backend is live) — or honest guide mode until then.

## Files

| File | What it is |
|---|---|
| `concierge.js` | The widget. No dependencies. Creates the floating ✦ button and chat panel. |
| `concierge.css` | Widget styles (gold on deep violet). |
| `config.example.json` | Copy to `config.json` and edit per repo. **Never put an API key in it — or anywhere in this folder.** |
| `knowledge.json` | The bundled guide: real, verified facts only (v1.0, 2026-11-17). Guide mode answers from this file. |
| `demo.html` | Open it to try the widget in guide mode. |
| `README.md` | This file. |

## The two modes

- **GUIDE mode (default, works now):** no backend configured. The widget matches questions against `knowledge.json` and labels every answer "from the repo guide". It never pretends a live intelligence is answering. If a question has no verified answer, it says so and offers a real next step.
- **LIVE mode:** `config.json` sets `backendEnabled: true` and `backendUrl` to the concierge backend. The widget POSTs `{ repo, repoContext, messages }` and renders the reply. If the backend cannot be reached, it falls back to guide mode and says so.

## Drop-in (per repo, ~10 minutes)

1. Enable GitHub Pages on the repo (Settings → Pages → Deploy from branch).
2. Copy this whole folder into the repo as `docs/concierge/` (or the site root).
3. Copy `config.example.json` → `config.json` and edit:
   - `repoName` — this repo's name.
   - `repoContext` — one paragraph: what this repo is, its three most important links.
   - Leave `backendUrl` empty until the backend is live. Guide mode is the honest default.
4. Add one line to the repo's Pages site:
   ```html
   <script src="concierge/concierge.js" data-config="concierge/config.json"></script>
   ```
   (Adjust the path if you placed the folder elsewhere.)
5. Open the Pages site, click ✦, and ask three test questions: a build question, a merch question, and something out of scope (e.g. "what will the token be worth?"). Confirm guide mode labels itself and refuses the profit question.
6. Commit: `Add Muse the Great Concierge (guide mode)`.

## Backend hook (for the builder, not the repo)

- `POST {backendUrl}` with JSON `{ repo, repoContext, messages: [{role, text}] }`.
- Expected response: `{ "reply": "..." }`.
- The backend — and only the backend — holds the LLM API key (server-side env vars), injects the system prompt from `../concierge-design.md` §3, retrieves from the knowledge sources in §4, applies the guardrails in §6, and rate-limits.
- **Never** call an LLM provider directly from this widget. Any key in page JavaScript is public the moment the page loads.

## Keeping knowledge true

- `knowledge.json` is regenerated from the real sources (books in hand, music catalog, merch prices, socials), never hand-edited with new claims.
- Bump `version` and `updated` on every regeneration.
- Anything title-only (Meta AI books, Gemini story books) stays OUT until the files are in hand.
- The blocklist (§6 of the design doc) applies to every answer: no unverified figures, no profit promises, no "live" claims.

## Rollout order

1. Muse the Great tribute repo (prototype, guide mode).
2. `scrollverse-web-app` (after the Railway/Render migration).
3. The 10 AI Legion repos.
4. Music, then commerce, then the rest.
5. Live mode flips on only after Chais approves the provider, model, and monthly spend cap — one switch in the backend, no per-repo change.

## What Chais must provide before live mode

- Hosting/backend account (Railway, Render, or Cloudflare).
- LLM provider + API key (his choice — e.g. OpenAI or Anthropic).
- Model choice.
- Monthly spend cap + approval.
- Sign-off on the knowledge bundle.
