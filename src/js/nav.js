/**
 * @file nav.js
 * @description Page switching and mobile menu controller.
 * Exposes showPage and toggleMobileMenu on window so HTML
 * inline onclick attributes can call them without a bundler.
 */

/**
 * Hide all pages and show the one matching the given id.
 * Updates the active state on nav buttons and scrolls to the top.
 *
 * @param {string} id - Page identifier. Must match a `data-page` attribute
 *   and a corresponding `#page-{id}` element in the DOM.
 * @returns {void}
 */
export function showPage(id) {
  document.querySelectorAll('.page').forEach(function deactivatePage(p) {
    p.classList.remove('active')
  })

  document.querySelectorAll('.nav-btn').forEach(function syncNavBtn(b) {
    b.classList.toggle('active', b.dataset.page === id)
  })

  document.getElementById(`page-${id}`)?.classList.add('active')
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * Toggle the mobile navigation menu open/closed.
 *
 * @returns {void}
 */
export function toggleMobileMenu() {
  document.getElementById('mobile-menu')?.classList.toggle('open')
}

/**
 * Initialise navigation.
 * Attaches functions to `window` for inline onclick access and
 * wires up a click-outside listener to close the mobile menu.
 *
 * @returns {void}
 */
export function initNav() {
  window.showPage = showPage
  window.toggleMobileMenu = toggleMobileMenu

  document.addEventListener('click', function handleOutsideClick(e) {
    const menu = document.getElementById('mobile-menu')
    if (!menu?.classList.contains('open')) return
    if (!e.target.closest('.nav')) menu.classList.remove('open')
  })
}
