/**
 * @file Dangerfile.js
 * @description Danger rules for pull request hygiene.
 * Runs in CI (GitHub Actions / Vercel preview checks).
 * See https://danger.systems/js/ for full API.
 */

const { danger, warn, fail, message } = require('@danger/danger')

// ── PR description ─────────────────────────────────────────────────────────

if (!danger.github.pr.body || danger.github.pr.body.trim().length < 20) {
  fail('Please add a meaningful PR description (at least 20 characters).')
}

// ── PR size — keep PRs reviewable ──────────────────────────────────────────

const LINES_CHANGED =
  danger.github.pr.additions + danger.github.pr.deletions

if (LINES_CHANGED > 600) {
  warn(
    `This PR changes **${LINES_CHANGED} lines**. Consider splitting it into ` +
    'smaller, focused PRs to make review easier.',
  )
}

// ── Changelog ──────────────────────────────────────────────────────────────

const hasChangelog = danger.git.modified_files.includes('CHANGELOG.md') ||
  danger.git.created_files.includes('CHANGELOG.md')

if (!hasChangelog && LINES_CHANGED > 50) {
  warn('No `CHANGELOG.md` update found. Consider documenting notable changes.')
}

// ── Test coverage — every JS change should have a test ─────────────────────

const changedJsFiles = danger.git.modified_files
  .concat(danger.git.created_files)
  .filter(function isAppJs(f) {
    return f.startsWith('src/js/') && f.endsWith('.js') && !f.endsWith('.test.js')
  })

const changedTestFiles = danger.git.modified_files
  .concat(danger.git.created_files)
  .filter(function isTestFile(f) {
    return f.endsWith('.test.js')
  })

changedJsFiles.forEach(function checkTestCoverage(file) {
  const base = file.replace(/\.js$/, '')
  const hasTest = changedTestFiles.some(function matchesTest(t) {
    return t.includes(base.split('/').pop())
  })
  if (!hasTest) {
    warn(`\`${file}\` was modified but no corresponding test file was updated. ` +
      'Please add or update tests.')
  }
})

// ── No console.log in source ────────────────────────────────────────────────

danger.git.modified_files
  .concat(danger.git.created_files)
  .filter(function isSourceJs(f) {
    return f.startsWith('src/js/') && f.endsWith('.js') && !f.endsWith('.test.js')
  })
  .forEach(async function checkConsoleLog(file) {
    const content = await danger.github.utils.fileContents(file)
    if (content && content.includes('console.log')) {
      warn(`\`${file}\` contains \`console.log\`. Remove before merging.`)
    }
  })

// ── dist/ must be rebuilt if SCSS changed ──────────────────────────────────

const scssChanged = danger.git.modified_files
  .concat(danger.git.created_files)
  .some(function isScss(f) { return f.startsWith('src/scss/') })

const distChanged = danger.git.modified_files
  .concat(danger.git.created_files)
  .some(function isDist(f) { return f.startsWith('dist/') })

if (scssChanged && !distChanged) {
  fail(
    'SCSS files were changed but `dist/styles.css` was not updated. ' +
    'Run `yarn build:scss` and commit the result.',
  )
}

// ── Lockfile consistency ────────────────────────────────────────────────────

const packageChanged = danger.git.modified_files.includes('package.json')
const lockfileChanged = danger.git.modified_files.includes('yarn.lock')

if (packageChanged && !lockfileChanged) {
  warn(
    '`package.json` changed but `yarn.lock` was not updated. ' +
    'Run `yarn install` and commit `yarn.lock`.',
  )
}

// ── No direct pushes to main ────────────────────────────────────────────────

if (danger.github.pr.base.ref === 'main' &&
    danger.github.pr.head.ref === 'main') {
  fail('Direct pushes to `main` are not allowed. Please use a feature branch.')
}

// ── Summary ─────────────────────────────────────────────────────────────────

message(
  `📊 **PR stats:** +${danger.github.pr.additions} / -${danger.github.pr.deletions} lines ` +
  `across ${danger.github.pr.changed_files} file(s).`,
)
