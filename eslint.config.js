import js from '@eslint/js'
import jsdoc from 'eslint-plugin-jsdoc'

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  jsdoc.configs['flat/recommended'],

  {
    files: ['src/js/**/*.js'],

    plugins: { jsdoc },

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        HTMLElement: 'readonly',
        MouseEvent: 'readonly',
        Event: 'readonly',
      },
    },

    rules: {
      // ── Style ──────────────────────────────────────────────────────────────
      semi: ['error', 'never'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'comma-dangle': ['error', 'always-multiline'],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      indent: ['error', 2, { SwitchCase: 1 }],

      // ── Named functions at module scope ────────────────────────────────────
      // Arrow functions are still fine inside other functions (callbacks,
      // array methods). This enforces named declarations at the top level.
      'func-style': ['error', 'declaration', { allowArrowFunctions: false }],
      'prefer-arrow-callback': 'off',

      // ── Quality ────────────────────────────────────────────────────────────
      'no-var': 'error',
      'prefer-const': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      'no-shadow': 'error',

      // ── JSDoc ──────────────────────────────────────────────────────────────
      'jsdoc/require-description': 'warn',
      'jsdoc/require-param-description': 'warn',
      'jsdoc/require-returns-description': 'off',
      'jsdoc/check-param-names': 'error',
      // Use 'object' (lowercase) not 'Object' in typedefs
      'jsdoc/check-types': ['error', { unifyParentAndChildTypeChecks: true }],
      'jsdoc/require-returns': ['warn', { forceReturnsWithAsync: false }],
      'jsdoc/tag-lines': ['warn', 'never', { startLines: 1 }],
      // Allow @type inline tag syntax we use for constants
      'jsdoc/escape-inline-tags': 'off',
      // Allow HTMLElement, MouseEvent etc from browser without importing
      'jsdoc/no-undefined-types': ['warn', {
        definedTypes: ['HTMLElement', 'MouseEvent', 'Event', 'Element', 'NodeList'],
      }],
      // Allow default values in param docs
      'jsdoc/no-defaults': 'off',
    },
  },

  // ── Test files — relaxed rules ─────────────────────────────────────────────
  {
    files: ['src/js/**/*.test.js'],
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        HTMLElement: 'readonly',
        MouseEvent: 'readonly',
        Event: 'readonly',
        // Vitest globals
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        vi: 'readonly',
      },
    },
    rules: {
      'jsdoc/require-jsdoc': 'off',
      'func-style': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^vi$' }],
    },
  },
]
