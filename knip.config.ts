import type { KnipConfig } from 'knip'

// @keep-sorted
export default {
  // @keep-sorted
  ignoreDependencies: [
    '@arethetypeswrong/core',
    'bumpp',
    'lint-staged',
    'publint',
    'tsdown',
  ],
  // @keep-sorted
  ignoreFiles: [
    'fixtures/**',
  ],
} satisfies KnipConfig
