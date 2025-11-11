import type { StylelintConfig, StylelintOverrideConfig } from '../types'

export const tailwindcssIgnoreAtRules = [
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

export async function tailwindcss(
  options: boolean,
  scss: boolean,
  vue: boolean,
): Promise<StylelintConfig | StylelintOverrideConfig> {
  if (options === true) {
    const config = {
      rules: {
        'at-rule-no-unknown': [true, { ignoreAtRules: tailwindcssIgnoreAtRules }],
      },
    }
    if (scss === true) {
      return {
        ...config,
        overrides: [
          {
            files: vue ? ['**/*.vue', '**/*.scss'] : ['**/*.scss'],
            rules: {
              'scss/at-rule-no-unknown': [true, { ignoreAtRules: tailwindcssIgnoreAtRules }],
            },
          },
        ],
      }
    }
    else {
      return config
    }
  }

  return {}
}
