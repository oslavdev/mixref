/**
 * @file nav.test.js
 * @description Unit tests for navigation module.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { showPage, toggleMobileMenu, initNav } from './nav.js'

function setupDOM() {
  document.body.innerHTML = `
    <nav class="nav">
      <button class="nav-btn active" data-page="drums">Drums</button>
      <button class="nav-btn" data-page="guitar">Guitar</button>
    </nav>
    <div class="mobile-menu" id="mobile-menu"></div>
    <article class="page active" id="page-drums"></article>
    <article class="page" id="page-guitar"></article>
  `
}

describe('showPage', () => {
  beforeEach(setupDOM)

  it('activates the target page', () => {
    showPage('guitar')
    expect(document.getElementById('page-guitar').classList.contains('active')).toBe(true)
  })

  it('deactivates all other pages', () => {
    showPage('guitar')
    expect(document.getElementById('page-drums').classList.contains('active')).toBe(false)
  })

  it('marks the matching nav button as active', () => {
    showPage('guitar')
    const btns = document.querySelectorAll('.nav-btn')
    expect(btns[1].classList.contains('active')).toBe(true)
  })

  it('removes active from non-matching nav buttons', () => {
    showPage('guitar')
    const btns = document.querySelectorAll('.nav-btn')
    expect(btns[0].classList.contains('active')).toBe(false)
  })

  it('does not throw when page id does not exist', () => {
    expect(() => showPage('nonexistent')).not.toThrow()
  })
})

describe('toggleMobileMenu', () => {
  beforeEach(setupDOM)

  it('adds open class when menu is closed', () => {
    toggleMobileMenu()
    expect(document.getElementById('mobile-menu').classList.contains('open')).toBe(true)
  })

  it('removes open class when menu is open', () => {
    const menu = document.getElementById('mobile-menu')
    menu.classList.add('open')
    toggleMobileMenu()
    expect(menu.classList.contains('open')).toBe(false)
  })

  it('does not throw when mobile-menu element is absent', () => {
    document.body.innerHTML = ''
    expect(() => toggleMobileMenu()).not.toThrow()
  })
})

describe('initNav', () => {
  beforeEach(setupDOM)

  it('exposes showPage on window', () => {
    initNav()
    expect(typeof window.showPage).toBe('function')
  })

  it('exposes toggleMobileMenu on window', () => {
    initNav()
    expect(typeof window.toggleMobileMenu).toBe('function')
  })

  it('closes mobile menu on outside click', () => {
    initNav()
    const menu = document.getElementById('mobile-menu')
    menu.classList.add('open')

    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(menu.classList.contains('open')).toBe(false)
  })

  it('does not close mobile menu when clicking inside nav', () => {
    initNav()
    const menu = document.getElementById('mobile-menu')
    menu.classList.add('open')

    document.querySelector('.nav').dispatchEvent(
      new MouseEvent('click', { bubbles: true }),
    )
    expect(menu.classList.contains('open')).toBe(true)
  })
})
