import type { KnipConfig } from 'knip'

export default {
  entry: ['test/**/*.{ts,js}', 'fixtures/**/*.{ts,js}'],
  ignoreDependencies: [
    '@dreamsicle.io/stylelint-config-tailwindcss',
    '@lumirelle/oxlint-config',
    '@stylistic/stylelint-config',
    'stylelint-config-html',
    'stylelint-config-recess-order',
    'stylelint-less',
    'stylelint-scss',
  ],
} as KnipConfig
