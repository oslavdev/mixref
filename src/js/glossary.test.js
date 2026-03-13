/**
 * @file glossary.test.js
 * @description Unit tests for the glossary module.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { TERMS, filterTerms, renderGlossary, initGlossary } from './glossary.js'

function setupDOM() {
  document.body.innerHTML = `
    <input type="search" id="gloss-search" />
    <div id="glossary-grid"></div>
  `
}

describe('TERMS', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(TERMS)).toBe(true)
    expect(TERMS.length).toBeGreaterThan(0)
  })

  it('every term has required string fields', () => {
    TERMS.forEach(function checkTerm(t) {
      expect(typeof t.term).toBe('string')
      expect(typeof t.cat).toBe('string')
      expect(typeof t.def).toBe('string')
      expect(t.term.length).toBeGreaterThan(0)
      expect(t.def.length).toBeGreaterThan(0)
    })
  })

  it('has no duplicate term names', () => {
    const names = TERMS.map(function getName(t) { return t.term })
    const unique = new Set(names)
    expect(unique.size).toBe(names.length)
  })
})

describe('filterTerms', () => {
  it('returns all terms sorted alphabetically when query is empty', () => {
    const result = filterTerms(TERMS, '')
    expect(result.length).toBe(TERMS.length)
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].term.localeCompare(result[i + 1].term)).toBeLessThanOrEqual(0)
    }
  })

  it('matches by term name (case-insensitive)', () => {
    const result = filterTerms(TERMS, 'THUD')
    expect(result.some(function hasTerm(t) { return t.term === 'Thud' })).toBe(true)
  })

  it('matches by category', () => {
    const result = filterTerms(TERMS, 'mastering')
    expect(result.every(function inMastering(t) {
      return t.cat.toLowerCase().includes('mastering') ||
             t.term.toLowerCase().includes('mastering') ||
             t.def.toLowerCase().includes('mastering')
    })).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  it('matches by definition content', () => {
    const result = filterTerms(TERMS, 'parallel')
    expect(result.length).toBeGreaterThan(0)
  })

  it('returns empty array when no terms match', () => {
    const result = filterTerms(TERMS, 'zzz_not_a_real_term_xyz')
    expect(result).toHaveLength(0)
  })

  it('trims whitespace from the query', () => {
    const trimmed = filterTerms(TERMS, 'thud')
    const padded = filterTerms(TERMS, '  thud  ')
    expect(padded.length).toBe(trimmed.length)
  })

  it('returns sorted results when filtering', () => {
    const result = filterTerms(TERMS, 'e')
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].term.localeCompare(result[i + 1].term)).toBeLessThanOrEqual(0)
    }
  })
})

describe('renderGlossary', () => {
  beforeEach(setupDOM)

  it('populates #glossary-grid with cards', () => {
    renderGlossary()
    const cards = document.querySelectorAll('.gloss-card')
    expect(cards.length).toBe(TERMS.length)
  })

  it('renders a card with term, cat and def elements', () => {
    renderGlossary()
    const card = document.querySelector('.gloss-card')
    expect(card.querySelector('.gloss-term')).not.toBeNull()
    expect(card.querySelector('.gloss-cat')).not.toBeNull()
    expect(card.querySelector('.gloss-def')).not.toBeNull()
  })

  it('filters results when a query is passed', () => {
    renderGlossary('thud')
    const cards = document.querySelectorAll('.gloss-card')
    expect(cards.length).toBeGreaterThanOrEqual(1)
    expect(cards.length).toBeLessThan(TERMS.length)
  })

  it('shows no cards when query matches nothing', () => {
    renderGlossary('zzz_nothing_matches')
    const cards = document.querySelectorAll('.gloss-card')
    expect(cards.length).toBe(0)
  })

  it('does not throw when #glossary-grid is absent', () => {
    document.body.innerHTML = ''
    expect(() => renderGlossary()).not.toThrow()
  })
})

describe('initGlossary', () => {
  beforeEach(setupDOM)

  it('renders cards on init', () => {
    initGlossary()
    expect(document.querySelectorAll('.gloss-card').length).toBeGreaterThan(0)
  })

  it('re-renders on search input', () => {
    initGlossary()
    const input = document.getElementById('gloss-search')
    input.value = 'thud'
    input.dispatchEvent(new Event('input'))
    const cards = document.querySelectorAll('.gloss-card')
    expect(cards.length).toBeGreaterThanOrEqual(1)
    expect(cards.length).toBeLessThan(TERMS.length)
  })
})
