/**
 * @file glossary.js
 * @description Glossary term data and live-search renderer.
 * Renders cards into #glossary-grid, filtered by a search string
 * matched against term, category and definition fields.
 */

/**
 * @typedef {object} GlossaryTerm
 * @property {string} term - Display name of the term.
 * @property {string} cat  - Category label (e.g. 'EQ', 'compression').
 * @property {string} def  - Plain-language definition.
 */

/** @type {GlossaryTerm[]} */
export const TERMS = [
  // ── Kick / Drums ──────────────────────────────────────────────────────────
  { term: 'Thud',            cat: 'kick drum',       def: 'The low-frequency physical weight of a kick drum, felt in the chest. The deep "boom" below 80Hz. More thud = heavier, fatter kick.' },
  { term: 'Beater',          cat: 'kick drum',       def: 'The padded or felt mallet on the kick pedal that strikes the drum head. Harder beaters = more click/attack; softer beaters = more thud and less definition.' },
  { term: 'Beater click',    cat: 'kick drum',       def: 'The sharp transient "click" at 3–5kHz of the beater hitting the drum head. Critical for kick to cut through dense guitar walls in metal and rock.' },
  { term: 'Punch',           cat: 'drums, general',  def: 'How immediately and forcefully a drum sounds on impact. Achieved via slower compression attack and presence boosts. You feel it rather than just hear it.' },
  { term: 'Crack',           cat: 'snare drum',      def: 'The sharp, aggressive attack of a snare hit — the audible "snap". Lives around 2–5kHz. More crack = more aggressive, cutting snare character.' },
  { term: 'Body',            cat: 'drums, general',  def: 'The low-mid fullness of a drum sound (100–300Hz). More body = rounder, fatter tone. Less body = thin and snappy. The resonance of the wooden shell.' },
  { term: 'Snare wire sizzle', cat: 'snare drum',    def: 'The rattling, buzzy hiss of the metal snare wires on the bottom head. A distinctive jazz snare texture at 8–12kHz. Too much = washy; too little = dead.' },
  { term: 'Ghost notes',     cat: 'drums',           def: 'Very quiet snare hits between the main backbeats. Central to jazz and funk drumming. Often 20–30dB quieter than main hits — parallel compression lifts them.' },
  { term: 'Bleed',           cat: 'recording',       def: 'Sound from one instrument leaking into a microphone intended for another. e.g. kick drum bleeding into the snare mic. Usually unwanted.' },
  { term: 'Resonance',       cat: 'drums',           def: 'When a drum continues vibrating after being struck. Desirable in jazz for tone; usually problematic in metal/rock where it clashes with guitar chords.' },

  // ── EQ ────────────────────────────────────────────────────────────────────
  { term: 'Mud',             cat: 'EQ',              def: 'A blurry, indistinct buildup in the 200–400Hz range. Makes everything sound underwater. One of the most common mix problems — almost always needs cutting.' },
  { term: 'Air',             cat: 'EQ',              def: 'Top-shelf sparkle above ~10kHz. Adds openness and makes recordings sound expensive. A subtle shelf boost. Too much = brittle.' },
  { term: 'Warmth',          cat: 'EQ',              def: 'A pleasing fullness in the 200–400Hz range. Associated with wood, tube amps, and vintage recordings. Removing it makes things thin and modern.' },
  { term: 'Presence',        cat: 'EQ',              def: 'The 1–5kHz quality that pushes a sound forward in the mix. High presence = close and clear. Low presence = distant and recessed.' },
  { term: 'Definition',      cat: 'EQ',              def: 'The clarity of individual notes and chords. Lost when there is too much mud or when sounds overlap badly in the same frequency range.' },
  { term: 'Boxy',            cat: 'EQ',              def: 'That hollow, cardboard resonance at 300–600Hz. Like knocking on an empty wooden box. Common on poorly-tuned drums and close-miked guitars.' },
  { term: 'Honky',           cat: 'EQ',              def: 'A nasal, forward mid-range quality around 500–900Hz. Sounds like someone talking through their nose. Common on high-gain guitar and some drum sounds.' },
  { term: 'High-pass filter', cat: 'EQ',             def: 'Cuts all frequencies below a set point, passing everything above. Used on nearly every instrument to remove low-end rumble. Also called HPF or low-cut.' },
  { term: 'Low-pass filter',  cat: 'EQ',             def: 'Cuts all frequencies above a set point. Used to remove harshness, tame noise, or create telephone/radio effects.' },
  { term: 'Shelf EQ',        cat: 'EQ',              def: 'Boosts or cuts everything above (high shelf) or below (low shelf) a certain frequency by the same flat amount. Used for broad tonal adjustments.' },
  { term: 'Bell / Peak EQ',  cat: 'EQ',              def: 'Boosts or cuts a specific frequency in a bell-curve shape. Q setting controls how narrow or wide the bell is. Surgical cuts use high Q; broad shaping uses low Q.' },
  { term: 'Q (bandwidth)',   cat: 'EQ',              def: 'Controls how narrow or wide an EQ bell is. High Q = narrow, surgical, affects only a small range. Low Q = wide, affects a broad swath of frequencies.' },

  // ── Compression ───────────────────────────────────────────────────────────
  { term: 'Threshold',       cat: 'compression',     def: 'The volume level at which a compressor activates. Only signals louder than this get compressed. Lower threshold = more of the signal is affected.' },
  { term: 'Ratio',           cat: 'compression',     def: 'How aggressively the compressor reduces volume above the threshold. 4:1 = every 4dB over becomes 1dB. Higher = more squashing. Infinity:1 = hard limiting.' },
  { term: 'Attack',          cat: 'compression',     def: 'How fast the compressor clamps down after a signal crosses the threshold. Fast attack kills transients. Slow attack lets the initial hit through before compressing.' },
  { term: 'Release',         cat: 'compression',     def: 'How fast the compressor stops reducing gain after the signal drops below the threshold. Too fast = pumping. Too slow = kills dynamics.' },
  { term: 'Makeup gain',     cat: 'compression',     def: 'After compression, the signal is quieter. Makeup gain compensates. Match levels before evaluating — louder always sounds better to human ears.' },
  { term: 'Soft knee',       cat: 'compression',     def: 'The compressor gradually increases compression as signal approaches the threshold. Smooth, transparent onset. Preferred for vocals and jazz.' },
  { term: 'Hard knee',       cat: 'compression',     def: 'Compression snaps on abruptly the moment the signal hits the threshold. Aggressive and obvious. Preferred for drums in metal/rock.' },
  { term: 'Gain reduction',  cat: 'compression',     def: 'The amount the compressor is reducing the signal, shown in dB on the GR meter. 2–4dB is normal for mixing; 1–3dB is typical for mastering.' },
  { term: 'Pumping',         cat: 'compression',     def: 'An audible "breathing" artifact where compression rapidly opening and closing creates rhythmic volume pulsation. Caused by release time too fast for tempo.' },
  { term: 'Transient',       cat: 'compression',     def: 'The very first spike of a sound before it settles. The crack of a snare, the click of a kick. Transients define punch. Compression attack controls how much survives.' },
  { term: 'Parallel compression', cat: 'compression', def: 'Duplicating a track and heavily compressing the copy. Blending it quietly under the original. Lifts quiet details without killing the punch of loud hits.' },
  { term: 'Sidechain',       cat: 'compression',     def: 'Triggering a compressor with a different signal. Example: kick sidechains the bass compressor, so every kick hit ducks the bass. Creates rhythmic locking.' },

  // ── Mastering ─────────────────────────────────────────────────────────────
  { term: 'Limiter',         cat: 'mastering',       def: 'An extreme compressor (ratio 20:1–∞:1) that sets an absolute ceiling the signal cannot exceed. Used in mastering to hit loudness targets without clipping.' },
  { term: 'LUFS',            cat: 'mastering',       def: 'Loudness Units relative to Full Scale. The modern standard for perceived loudness over time. Spotify/Apple target −14 LUFS; YouTube targets −13 LUFS.' },
  { term: 'True peak',       cat: 'mastering',       def: 'The actual maximum signal level accounting for peaks between digital samples. Setting ceiling to −1.0dBFS prevents distortion when encoding to MP3/AAC.' },
  { term: 'Inter-sample peaks', cat: 'mastering',    def: 'Peaks exceeding 0dBFS during digital-to-analog conversion or lossy encoding. Can occur even if the DAW shows 0dBFS. Always check true peak, not just sample peak.' },
  { term: 'Dithering',       cat: 'mastering',       def: 'Adding shaped noise when reducing bit depth (24-bit → 16-bit for CD). Masks quantization distortion. Apply once, on final export only — never stack.' },
  { term: 'Mid/Side (M/S)',  cat: 'mastering',       def: 'Separates audio into center (Mid = identical in both channels) and width (Side = what\'s different). Allows independent EQ/compression of center vs. stereo field.' },
  { term: 'Loudness normalization', cat: 'mastering', def: 'Automatic volume matching by streaming platforms. Spotify, Apple Music, YouTube turn down loud masters to their target level. Loud masters aren\'t louder to listeners.' },
  { term: 'Saturation',      cat: 'mixing',          def: 'Adding harmonic distortion by overdriving tube or tape circuits. Adds warmth and perceived density without increasing peak levels. Used subtly in mastering.' },
  { term: 'Glue compression', cat: 'mixing/mastering', def: 'Light compression on a group or full mix to make elements feel cohesive and exist in the same space. The mix "settles" together.' },

  // ── Vocals ────────────────────────────────────────────────────────────────
  { term: 'Proximity effect', cat: 'recording/vocals', def: 'The bass boost that occurs when a directional mic is placed very close to a source. Creates an artificially boomy low end — needs high-passing.' },
  { term: 'De-esser',        cat: 'vocals',          def: 'A frequency-specific compressor that activates only on sibilant frequencies (5–10kHz). Reduces harsh S, SH, and T sounds. Place after compression.' },
  { term: 'Sibilance',       cat: 'vocals',          def: 'Excessive harshness on S, SH, and T sounds. Becomes piercing when boosted or overcompressed. Controlled with a de-esser.' },
  { term: 'Intelligibility', cat: 'vocals',          def: 'How clearly lyrics can be understood. Consonants live at 1–5kHz. A presence boost makes words more distinct in a dense mix.' },
  { term: 'Fry register',    cat: 'vocals',          def: 'The lowest phonation register of the voice, producing a crackling, gravelly texture via irregular vocal fold vibration. Used in death metal growls and fry screaming.' },

  // ── Guitar ────────────────────────────────────────────────────────────────
  { term: 'Chunk',           cat: 'guitar',          def: 'The heavy physical impact of a distorted power chord or palm mute — the "djent" or "chug" sensation. Lives around 80–120Hz. Below the mud, above the sub.' },
  { term: 'Bite',            cat: 'guitar',          def: 'The aggressive cutting quality of high-gain guitar at 2–3kHz. Makes fast riffs and palm mutes audible even in a dense mix.' },
  { term: 'Woolly',          cat: 'guitar',          def: 'Indistinct, soft low-mid sound where distorted guitar loses articulation. Like the guitar is wrapped in a blanket. Cutting 100–200Hz removes this and tightens riffs.' },
  { term: 'Sustain',         cat: 'guitar',          def: 'How long a guitar note rings after the initial attack. Compression and high gain distortion both increase sustain dramatically.' },

  // ── Technical ─────────────────────────────────────────────────────────────
  { term: 'dBFS',            cat: 'technical',       def: 'Decibels relative to Full Scale. 0 dBFS is the maximum digital level. Everything else is negative (−12 dBFS, etc.). Clipping occurs above 0 dBFS.' },
  { term: 'Gain staging',    cat: 'technical',       def: 'Setting track levels to −18 to −12 dBFS before any processing. Ensures headroom, prevents clipping, and makes all plugins behave predictably.' },
  { term: 'Headroom',        cat: 'technical',       def: 'The difference between current signal level and 0 dBFS. More headroom = more room for peaks before clipping. Good gain staging creates 6–12dB of headroom.' },
  { term: 'Phase cancellation', cat: 'technical',    def: 'When two similar signals are slightly offset in time, waveforms partially cancel each other. Causes frequencies to disappear or thin out. Common with multiple drum mics.' },
  { term: 'Room sound',      cat: 'recording',       def: 'The acoustic character of the recording space. Can be desirable natural ambience or unwanted boxiness depending on room treatment and style.' },
  { term: 'Woofer excursion', cat: 'technical',      def: 'Physical back-and-forth movement of a speaker cone. Excessive low-frequency energy pushes woofers past their mechanical limit, causing distortion or damage.' },
]

/**
 * Build the HTML string for a single glossary card.
 *
 * @param {GlossaryTerm} term - The term object to render.
 * @returns {string} HTML string for the card.
 */
function buildCard({ term, cat, def }) {
  return `<article class="gloss-card">
    <p class="gloss-term">${term}</p>
    <p class="gloss-cat">${cat}</p>
    <p class="gloss-def">${def}</p>
  </article>`
}

/**
 * Filter terms by a search query string.
 * Matches against term name, category, and definition (case-insensitive).
 *
 * @param {GlossaryTerm[]} terms - Full list of terms to search.
 * @param {string} query - Raw search string from the input.
 * @returns {GlossaryTerm[]} Filtered and alphabetically sorted terms.
 */
export function filterTerms(terms, query) {
  const q = query.toLowerCase().trim()
  const results = q
    ? terms.filter(function matchesTerm(t) {
      return (
        t.term.toLowerCase().includes(q) ||
          t.def.toLowerCase().includes(q) ||
          t.cat.toLowerCase().includes(q)
      )
    })
    : [...terms]

  return results.sort(function byAlpha(a, b) {
    return a.term.localeCompare(b.term)
  })
}

/**
 * Render glossary cards into #glossary-grid.
 * Replaces the grid's innerHTML entirely on each call.
 *
 * @param {string} [query] - Optional search string to filter by.
 * @returns {void}
 */
export function renderGlossary(query = '') {
  const grid = document.getElementById('glossary-grid')
  if (!grid) return

  const results = filterTerms(TERMS, query)
  grid.innerHTML = results.map(buildCard).join('')
}

/**
 * Initialise the glossary page.
 * Performs an initial render and wires up the search input.
 *
 * @returns {void}
 */
export function initGlossary() {
  renderGlossary()

  document
    .getElementById('gloss-search')
    ?.addEventListener('input', function onSearch(e) {
      renderGlossary(e.target.value)
    })
}
