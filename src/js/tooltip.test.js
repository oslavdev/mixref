/**
 * @file tooltip.test.js
 * @description Unit tests for the tooltip module.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { initTooltips } from './tooltip.js'

function setupDOM() {
  document.body.innerHTML = `
    <span class="tt" data-tip="This is a tip">hover me ?</span>
    <span class="tt">no tip attr</span>
    <div id="tooltip" class="tooltip-bubble"></div>
  `
}

describe('initTooltips', () => {
  beforeEach(() => {
    setupDOM()
    vi.useFakeTimers()
    initTooltips()
  })

  it('does not throw when #tooltip element is missing', () => {
    document.body.innerHTML = '<span class="tt" data-tip="tip">x</span>'
    expect(() => initTooltips()).not.toThrow()
  })

  it('shows the bubble on mouseover a .tt element', () => {
    const trigger = document.querySelector('[data-tip]')
    const bubble = document.getElementById('tooltip')

    trigger.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, clientX: 100, clientY: 100 }))

    expect(bubble.classList.contains('show')).toBe(true)
    expect(bubble.textContent).toBe('This is a tip')
  })

  it('does not show the bubble when .tt has no data-tip', () => {
    const trigger = document.querySelectorAll('.tt')[1]
    const bubble = document.getElementById('tooltip')

    trigger.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))

    expect(bubble.classList.contains('show')).toBe(false)
  })

  it('hides the bubble after mouseout delay', () => {
    const trigger = document.querySelector('[data-tip]')
    const bubble = document.getElementById('tooltip')

    trigger.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, clientX: 50, clientY: 50 }))
    expect(bubble.classList.contains('show')).toBe(true)

    trigger.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }))
    vi.advanceTimersByTime(150)

    expect(bubble.classList.contains('show')).toBe(false)
  })

  it('shows the bubble on click (touch behaviour)', () => {
    const trigger = document.querySelector('[data-tip]')
    const bubble = document.getElementById('tooltip')

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(bubble.classList.contains('show')).toBe(true)
    expect(bubble.textContent).toBe('This is a tip')
  })

  it('auto-hides the bubble 3 seconds after a tap', () => {
    const trigger = document.querySelector('[data-tip]')
    const bubble = document.getElementById('tooltip')

    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    vi.advanceTimersByTime(3100)

    expect(bubble.classList.contains('show')).toBe(false)
  })

  it('sets bubble textContent from data-tip on mouseover', () => {
    const trigger = document.querySelector('[data-tip="This is a tip"]')
    const bubble = document.getElementById('tooltip')

    trigger.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, clientX: 0, clientY: 0 }))
    expect(bubble.textContent).toBe('This is a tip')
  })
})
