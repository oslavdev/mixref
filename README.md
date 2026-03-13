# MixRef — Mixing Cheatsheet

A fast, dark, offline-ready cheatsheet for audio engineers working with drums, electric guitar, bass guitar, vocals (including extreme metal techniques), and mastering.

Built for personal use and deployed as a static site. No frameworks, no runtime dependencies.

---

## Pages

| Page | Contents |
|------|----------|
| **Drums** | EQ per piece, compression settings, parallel compression, workflow order |
| **Guitar** | Clean, crunch, rock, high-gain/metal EQ and compression |
| **Bass** | Frequency map, kick/bass crossover, sidechain technique |
| **Vocals** | Clean, screams, fry screams, growls — EQ and compression |
| **Mastering** | EQ, compressor, limiter, M/S, LUFS targets, signal chain order |
| **Glossary** | 50+ terms with searchable definitions |

All genre-specific content is togglable via the filter bar (Metal / Jazz / Rock / All).

---

## Stack

- **HTML5** — semantic, no framework
- **SCSS** — compiled to `dist/`, no runtime dependency
- **Vanilla JS ES modules** — native `type="module"`, no bundler
- **Vitest** — unit tests for all JS modules
- **ESLint** — no semicolons, named functions, JSDoc enforcement
- **Stylelint** — SCSS standard config
- **Husky + lint-staged** — pre-commit linting, pre-push tests
- **Danger** — automated PR hygiene checks

---

## Requirements

- Node ≥ 20
- Yarn ≥ 1.22 (`npm install -g yarn`)

---

## Development

```bash
yarn install
yarn dev          # watch SCSS → dist/styles.css with expanded output
```

Open `index.html` in a browser directly, or serve it:

```bash
npx serve .
```

---

## Build

```bash
yarn build        # compiles SCSS → dist/styles.css (compressed)
```

`dist/styles.css` is committed and ready to deploy. No build step needed on the server.

---

## Testing

```bash
yarn test              # run all tests once
yarn test:watch        # watch mode
yarn test:coverage     # with lcov coverage report
```

Tests live alongside source files as `*.test.js`. Vitest runs in a jsdom environment.

---

## Linting

```bash
yarn lint              # run ESLint + Stylelint
yarn lint:js           # ESLint only
yarn lint:js:fix       # ESLint with auto-fix
yarn lint:scss         # Stylelint only
yarn lint:scss:fix     # Stylelint with auto-fix
```

Rules enforced:
- No semicolons (`semi: never`)
- Named function declarations at module scope (`func-style: declaration`)
- JSDoc on all exported functions
- No `console.log` in source files

---

## Git hooks (Husky)

| Hook | What runs |
|------|-----------|
| `pre-commit` | `lint-staged` — ESLint + Stylelint on staged files only, plus related Vitest tests |
| `pre-push` | Full `yarn test` suite |

Hooks are in `.husky/`. They are installed automatically when you run `yarn install` (via the `prepare` script).

---

## Danger (CI PR checks)

`Dangerfile.js` runs in CI on every PR and enforces:

- PR must have a description ≥ 20 characters (fail)
- PRs > 600 lines get a size warning
- SCSS changes must include a `dist/` update (fail)
- `package.json` changes must update `yarn.lock`
- Modified source JS files must have corresponding test updates
- No `console.log` in source files
- Direct `main → main` pushes are blocked

To wire it up in GitHub Actions, add a `DANGER_GITHUB_API_TOKEN` secret and include `yarn danger` in your CI workflow.

---

## Deploy to Vercel

1. Push to GitHub
2. Import in Vercel — set **Output Directory** to `.` (root), no build command
3. Done — CSS is pre-compiled

Or via CLI:

```bash
vercel --prod
```

---

## Customise

**Ko-fi link** — find `id="kofi-link"` in `index.html` and replace the `href`.

**Genre content** — add `genre-metal`, `genre-jazz`, or `genre-rock` classes to any `.drum-block` to control filter visibility.

**Tooltips** — any element with `class="tt" data-tip="..."` gets the hover/tap tooltip automatically.

**Adding a glossary term** — edit the `TERMS` array in `src/js/glossary.js`. Each entry is `{ term, cat, def }`.

---

## License

MIT — use freely, credit appreciated.
