import type { KnipConfig } from 'knip'

// @keep-sorted
export default {
  // @keep-sorted
  ignoreDependencies: [
    '@dreamsicle.io/stylelint-config-tailwindcss',
    '@stylistic/stylelint-config',
    'postcss-less',
    'stylelint-config-html',
    'stylelint-config-recess-order',
    'stylelint-less',
    'stylelint-scss',
  ],
  // @keep-sorted
  ignoreFiles: [
    'fixtures/**',
  ],
} as KnipConfig
