# Staging Notes — `muse-the-great` repo

**Staged:** 17 Nov 2026 · **Status:** staging only — nothing pushed to GitHub. The repo does not exist yet (creation blocked on a GitHub App permission); every file below is ready in `~/workspace/muse-the-great/repo-staging/`.

**Totals (before this file): 57 files, 13,520,398 bytes (~12.9 MiB).** With this file: 58 files.

## Every file staged

### Root
- `MUSE-THE-GREAT.md` (9,079 bytes) — copy of `~/workspace/muse-the-great/greatest-self.md`, verbatim. `diff` returns identical — confirmed.
- `README.md` — front door (authored).
- `TALK-TO-MUSE.md` — how visitors reach Muse, honestly (authored).
- `index.html` (6,463 bytes) — GitHub Pages front door, self-contained, no external JS, no keys. Under the 100 KB limit.
- `STAGING-NOTES.md` — this file.

### `concierge/` (7 files)
- `concierge.js`, `concierge.css`, `config.example.json`, `knowledge.json`, `demo.html`, `README.md` — copied from `~/workspace/muse-the-great/concierge-widget/`.
- `concierge-design.md` — copy of `~/workspace/muse-the-great/concierge-design.md` (diff: identical). Guide mode only; no backend, no keys.

### `books/` (28 files)
- `consciousness-mirror-full-text.md` — verbatim copy of `~/workspace/jewels/jewel-1-consciousness-mirror-metaphysical-architecture.md` (diff: identical).
- `code-of-tawhid-full-text.md` — verbatim copy of `~/workspace/jewels/jewel-2-code-of-tawhid-oneness.md` (diff: identical).
- `manifesto-builders-book-full-text.md` — 10 chapters extracted faithfully from the local `scrollverse-web-app` build source `~/workspace/scrollverse-independence/build/repo/client/src/pages/ManifestoBuildersBook.tsx` (route `/manifesto-builders-book`). Chapter titles, themes, summaries, takeaways — no text invented.
- `book-of-the-journey-full-text.md` — 7 chapters extracted faithfully from `~/workspace/scrollverse-independence/build/repo/client/src/pages/BookOfTheJourney.tsx` (route `/book-of-life`). Full chapter prose, practice lines, source labels — no text invented.
- `download-queue.md`, `release-record-template.md`, `vault-library-price-sheet.md` — verbatim copies from `~/workspace/books/`.
- `README.md` — explains the 5 free reading-room books; the two jewels FREE FOREVER (authored).
- `extracted/` — 19 files (`d1`–`d17`, `d18a`, `d18b`), verbatim copies from `~/workspace/books/extracted/` (all diff-checked identical).

### `videos/`
- `README.md` — catalogue of all 15 unique films (authored from `~/workspace/video-catalogue/videos-2026-11-17.md`). No video files copied (see skipped list).

### `visuals/` (14 files)
- `01-nur-cities.jpg` through `08-public-decides.jpg` — the 8 visual-series images, all under 5 MB, copied from `~/workspace/scrollverse-visual-series/`.
- `merch-designs/` — 5 merch print PNGs under 5 MB: `06-celestial-bridge-mug`, `07-token-1111-case`, `10a/10b/10c-saffron-trio-sticker-*`.
- `README.md` — series list, merch list, seals note (authored).

### `templates/`
- `README.md` — links to `scrollverse-web-app` and `nextjs-boilerplate` with one honest line each from their own READMEs. No cloned contents.

### `artifacts/` (3 files)
- `README.md` — all four artifacts with honest status (authored).
- `tory-lanez-crypto-music-playbook.html` (46,820 bytes) — copied from `~/workspace/your_files/tory-lanez-crypto-music-playbook/`.
- `scrollverse-master-file-transferable.html` (77,866 bytes) — copied from `~/workspace/your_files/scrollverse-master-file-transferable/`.

## Skipped as too big (with size and workspace path)

| File | Size | Workspace path | Reason |
|---|---|---|---|
| `xlviiiblocks-vault.html` | 130,794,750 bytes (~124.7 MiB) | `~/workspace/your_files/xlviiiblocks-vault/xlviiiblocks-vault.html` | Over GitHub's 100 MB hard per-file limit. Linked by slug in `artifacts/README.md`; available on request. |
| `scrollverse-beyond.html` | 38,266,482 bytes (~36.5 MiB) | `~/workspace/your_files/scrollverse-beyond/scrollverse-beyond.html` | Too large for a single API push. Linked by slug in `artifacts/README.md`; available on request. |
| 15 film files (`.mp4`) | ~2.3–10.1 MB each | `~/workspace/user/media_library/video/<hash-prefix>/<hash>.mp4` | Too big for git as a set; catalogued in `videos/README.md`. Playable links to be added once hosting is chosen. |
| 7 merch print PNGs | 8.1–17.2 MB each | `~/workspace/merch/designs/01-summoned-not-programmed-tee-12x16-300dpi.png` (11,787,338), `02-nur-cities-hoodie-back-12x16-300dpi.png` (16,826,252), `03-kun-fayakun-poster-18x24-300dpi.png` (12,866,115), `04-963hz-tee-12x16-300dpi.png` (10,362,457), `05-new-dominion-poster-18x24-300dpi.png` (17,171,155), `08-xlviiiblocks-tote-12x12-300dpi.png` (8,076,606), `09-goat-you-just-met-tee-12x16-300dpi.png` (13,913,642) | Over the 5 MB per-image staging cap. Listed in `visuals/README.md`; preview JPGs remain in the workspace design folder. |
| 4 `media-generation-*-0-*.jpg` duplicates | 474,978–589,446 bytes each | `~/workspace/scrollverse-visual-series/media-generation-05-zakat-agape-0-*.jpg`, `-06-xlviii-144000-0-*.jpg`, `-07-frequency-963hz-0-*.jpg`, `-08-public-decides-0-*.jpg` | Byte-identical duplicates of `05`–`08` already staged; not copied twice. |
| 8 `media-generation-*.json` records | ~630 bytes each | `~/workspace/scrollverse-visual-series/media-generation-*.json` | Build metadata, not images; not copied. |

## Could not find

- **A 20th extracted book file.** The brief spoke of 20 files in `~/workspace/books/extracted/`; **19 exist** (`d1`–`d17`, `d18a`, `d18b`). No 20th file is in the workspace. Noted in `books/README.md`; nothing added to round the number out.
- **The three SVG seals.** No `*.svg` seal artwork exists anywhere in the workspace (searched all of `~/workspace`, including the GitHub-clone mirrors). Seal *concepts* exist (Concept Seal Shrine page, seal contracts/covenants in repos) but no SVG seal files. Noted in `visuals/README.md`; nothing drawn or invented.
- **No local standalone full text for the Creator Books Publishing Desk** as a book — it is a publishing-desk route, not a book text, so `books/README.md` describes the desk honestly instead of inventing text for it.
- **No YouTube or Threads URL on file** for Chais — neither link appears anywhere in this repo, per the brief.

## Notes / flags for the parent

- **Unverified figures in verbatim copies (not authored claims).** No authored file (README, TALK-TO-MUSE, section READMEs, index.html) states a banned figure as fact. The figures appear only in two places, both verbatim copies the brief ordered copied as-is: (1) `concierge/concierge-design.md`, where the figures are named as the **blocklist** of things the concierge must never state; (2) `books/extracted/d10-infinity-72-archive.md` ("$35.4T LOCKED") and `books/extracted/d12-chais-computing-omniversal-manifesto.md` ("7.229 ETH/day"), which reproduce repo source text containing those claims. If the repo's policy is zero occurrences anywhere, d10/d12 would need redaction — that would break verbatim status, so it is flagged here, not done unilaterally.
- **Manifesto & Book of the Journey texts:** the local `scrollverse-web-app` build sources *are* present in the workspace (`~/workspace/scrollverse-independence/build/repo`), so both texts were extracted from the real route sources rather than falling back to a README link. The Manifesto file carries chapter summaries/takeaways (that is what the route source holds — it is a chapter guide with an adaptive cover and narration opening, not long-form prose); the Journey file carries full chapter prose.
- **Template descriptions** come from each repo's own README as found in the workspace clones; the inventory record confirms both repos are public under `chaishillomnitech1`. Live GitHub descriptions were not re-verified via the API (creation is blocked; no live check was run).
- **Social links used:** Instagram `https://www.instagram.com/chaisthegreat_mrwalk/`, Facebook `https://www.facebook.com/chais.hill.354614`, Spotify `https://open.spotify.com/artist/3P0GWluMPNZ2xSCVffVGAr` — exactly as given in the brief. scrollverse.co is marked "in preparation" everywhere; never claimed live.
- **No secrets, keys, or tokens** are in the staging tree. The concierge ships in guide mode with `config.example.json` only.
