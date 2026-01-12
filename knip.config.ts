import type { KnipConfig } from 'knip'

// @keep-sorted
export default {
  // @keep-sorted
  ignoreDependencies: [
    '@arethetypeswrong/core',
    '@dreamsicle.io/stylelint-config-tailwindcss',
    '@stylistic/stylelint-config',
    'bumpp',
    'lint-staged',
    'postcss-less',
    'publint',
    'stylelint-config-html',
    'stylelint-config-recess-order',
    'stylelint-less',
    'stylelint-scss',
    'tsdown',
  ],
  // @keep-sorted
  ignoreFiles: [
    'fixtures/**',
  ],
} satisfies KnipConfig
