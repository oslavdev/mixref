/**
 * @file tooltip.js
 * @description Hover and tap tooltip system for elements with
 * `class="tt" data-tip="..."`. Positions a single shared bubble
 * element via pointer coordinates on desktop and element bounds on touch.
 */

/** @type {ReturnType<typeof setTimeout> | null} */
let hideTimer = null

/** Width estimate used for overflow clamping. @type {number} */
const BUBBLE_W = 290

/** Height estimate used for overflow clamping. @type {number} */
const BUBBLE_H = 90

/**
 * Position the tooltip bubble near the pointer, clamping to viewport edges.
 *
 * @param {HTMLElement} bubble - The tooltip DOM element.
 * @param {MouseEvent} e - The triggering mouse event.
 * @returns {void}
 */
function positionBubble(bubble, e) {
  const vw = window.innerWidth
  const vh = window.innerHeight

  let x = e.clientX + 12
  let y = e.clientY + 12

  if (x + BUBBLE_W > vw - 10) x = e.clientX - BUBBLE_W - 12
  if (y + BUBBLE_H > vh - 10) y = e.clientY - BUBBLE_H - 12

  bubble.style.left = `${Math.max(8, x)}px`
  bubble.style.top = `${Math.max(8, y)}px`
}

/**
 * Show the tooltip bubble with the given text content.
 *
 * @param {HTMLElement} bubble - The tooltip DOM element.
 * @param {string} text - Text to display inside the bubble.
 * @returns {void}
 */
function showBubble(bubble, text) {
  clearTimeout(hideTimer)
  bubble.textContent = text
  bubble.classList.add('show')
}

/**
 * Hide the tooltip bubble after an optional delay.
 *
 * @param {HTMLElement} bubble - The tooltip DOM element.
 * @param {number} [delay] - Milliseconds to wait before hiding.
 * @returns {void}
 */
function hideBubble(bubble, delay = 100) {
  hideTimer = setTimeout(function removeBubble() {
    bubble.classList.remove('show')
  }, delay)
}

/**
 * Initialise the tooltip system.
 * Attaches delegated listeners for mouseover, mousemove, mouseout (desktop)
 * and click (touch/keyboard).
 *
 * @returns {void}
 */
export function initTooltips() {
  const bubble = document.getElementById('tooltip')
  if (!bubble) return

  document.addEventListener('mouseover', function onMouseOver(e) {
    const el = e.target.closest('.tt')
    if (!el?.dataset.tip) return
    showBubble(bubble, el.dataset.tip)
    positionBubble(bubble, e)
  })

  document.addEventListener('mousemove', function onMouseMove(e) {
    if (bubble.classList.contains('show')) positionBubble(bubble, e)
  })

  document.addEventListener('mouseout', function onMouseOut(e) {
    if (!e.target.closest('.tt')) return
    hideBubble(bubble)
  })

  document.addEventListener('click', function onTapTooltip(e) {
    const el = e.target.closest('.tt')
    if (!el?.dataset.tip) return

    const rect = el.getBoundingClientRect()
    bubble.textContent = el.dataset.tip
    bubble.style.left = `${Math.max(8, rect.left)}px`
    bubble.style.top = `${rect.bottom + 8}px`
    bubble.classList.add('show')
    hideBubble(bubble, 3000)
  })
}
