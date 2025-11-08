import type { StylelintConfig } from '../types'

export function tailwindcss(
  options: boolean,
  scss: boolean,
): StylelintConfig {
  const config: StylelintConfig = {}
  config.extends = []
  config.rules = {}

  if (options === true) {
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
    if (scss === true) {
      config.rules['scss/at-rule-no-unknown'] = [true, { ignoreAtRules }]
    }
    else {
      config.rules['at-rule-no-unknown'] = [true, { ignoreAtRules }]
    }
  }

  return config
}
