/**
 * @file genre.js
 * @description Genre filter bar — toggles a body class that CSS uses
 * to dim non-matching drum blocks and freq cards.
 */

/** @type {string[]} All valid genre CSS classes */
const GENRE_CLASSES = ['genre-metal', 'genre-jazz', 'genre-rock']

/**
 * Activate a genre filter.
 * Removes all genre classes from document.body, then adds the selected
 * one (unless 'all' is chosen). Updates the active state on filter buttons
 * scoped to the currently visible page.
 *
 * @param {string} genre - One of 'all' | 'metal' | 'jazz' | 'rock'.
 * @param {HTMLElement} btn - The filter button element that was clicked.
 * @returns {void}
 */
export function setGenre(genre, btn) {
  const page = document.querySelector('.page.active')
  page?.querySelectorAll('.filter-btn').forEach(function clearActive(b) {
    b.classList.remove('active')
  })
  btn.classList.add('active')

  document.body.classList.remove(...GENRE_CLASSES)
  if (genre !== 'all') {
    document.body.classList.add(`genre-${genre}`)
  }
}

/**
 * Initialise genre filtering.
 * Attaches setGenre to window for inline onclick access.
 *
 * @returns {void}
 */
export function initGenre() {
  window.setGenre = setGenre
}
