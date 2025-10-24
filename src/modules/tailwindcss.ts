import type { OptionsConfig, StylelintConfigWithDefaults } from '../types'

export function setup(options: OptionsConfig, config: StylelintConfigWithDefaults): void {
  if (options.tailwindcss) {
    const ignoreAtRules = [
      'tailwind',
      'theme',
      'source',
      'utility', // Tailwind CSS 4
      'layer', // Tailwind CSS 3
      'variant',
      'custom-variant',
      'reference',
      'config',
      'plugin',
    ]
    if (!options.scss) {
      config.rules['at-rule-no-unknown'] = [true, { ignoreAtRules }]
    }
    else {
      config.rules['scss/at-rule-no-unknown'] = [true, { ignoreAtRules }]
    }
  }
}
