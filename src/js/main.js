/**
 * @file main.js
 * @description Application entry point.
 * Imports and initialises all feature modules once the DOM is ready.
 * Uses native ES modules — no bundler required.
 */

import { initNav } from './nav.js'
import { initGenre } from './genre.js'
import { initTooltips } from './tooltip.js'
import { initGlossary } from './glossary.js'

/**
 * Bootstrap the application.
 * Called automatically on DOMContentLoaded.
 *
 * @returns {void}
 */
function init() {
  initNav()
  initGenre()
  initTooltips()
  initGlossary()
}

document.addEventListener('DOMContentLoaded', init)
