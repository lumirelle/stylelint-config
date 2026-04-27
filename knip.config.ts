import type { KnipConfig } from 'knip'

export default {
  /// keep-sorted
  ignoreDependencies: [
    '@arethetypeswrong/cli',
    '@dreamsicle.io/stylelint-config-tailwindcss',
    '@lumirelle/oxlint-config',
    '@stylistic/stylelint-config',
    'publint',
    'stylelint-config-html',
    'stylelint-config-recess-order',
    'stylelint-less',
    'stylelint-scss',
  ],
  /// keep-sorted
  ignoreFiles: [
    'fixtures/**',
  ],
} as KnipConfig
