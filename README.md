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
yarn build       
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
