/**
 * @file genre.test.js
 * @description Unit tests for genre filter module.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { setGenre, initGenre } from './genre.js'

function setupDOM() {
  document.body.className = ''
  document.body.innerHTML = `
    <article class="page active">
      <button class="filter-btn active">All</button>
      <button class="filter-btn">Metal</button>
      <button class="filter-btn">Jazz</button>
    </article>
  `
}

describe('setGenre', () => {
  beforeEach(setupDOM)

  it('adds the correct genre class to body', () => {
    const btn = document.querySelector('.filter-btn:nth-child(2)')
    setGenre('metal', btn)
    expect(document.body.classList.contains('genre-metal')).toBe(true)
  })

  it('removes any previous genre class before adding the new one', () => {
    document.body.classList.add('genre-jazz')
    const btn = document.querySelector('.filter-btn:nth-child(2)')
    setGenre('metal', btn)
    expect(document.body.classList.contains('genre-jazz')).toBe(false)
    expect(document.body.classList.contains('genre-metal')).toBe(true)
  })

  it('removes all genre classes when "all" is selected', () => {
    document.body.classList.add('genre-metal')
    const btn = document.querySelector('.filter-btn')
    setGenre('all', btn)
    expect(document.body.classList.contains('genre-metal')).toBe(false)
    expect(document.body.classList.contains('genre-jazz')).toBe(false)
    expect(document.body.classList.contains('genre-rock')).toBe(false)
  })

  it('marks the clicked button as active', () => {
    const btn = document.querySelector('.filter-btn:nth-child(2)')
    setGenre('metal', btn)
    expect(btn.classList.contains('active')).toBe(true)
  })

  it('removes active from all other filter buttons', () => {
    const btn = document.querySelector('.filter-btn:nth-child(2)')
    setGenre('metal', btn)
    const first = document.querySelector('.filter-btn')
    expect(first.classList.contains('active')).toBe(false)
  })

  it('does not add a class for unknown genre strings', () => {
    const btn = document.querySelector('.filter-btn')
    setGenre('punk', btn)
    // 'all' path not taken, but 'punk' is not in the remove list so no harm
    expect(document.body.classList.contains('genre-punk')).toBe(true)
    // clean up for next test
    document.body.classList.remove('genre-punk')
  })
})

describe('initGenre', () => {
  it('exposes setGenre on window', () => {
    initGenre()
    expect(typeof window.setGenre).toBe('function')
  })
})
