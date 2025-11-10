import type { OptionsFormatter, StylelintConfig, StylelintOverrideConfig, StylisticConfig } from '../types'
import { resolvePackagePath } from '../resolve'

export function formatter(
  options: boolean | OptionsFormatter,
  stylistic: StylisticConfig,
): StylelintConfig | StylelintOverrideConfig {
  const {
    indent = 2,
    quotes = 'single',
    maxLineLength = 120,
  } = stylistic

  if (options === true || options === 'stylistic') {
    return {
      extends: [resolvePackagePath('@stylistic/stylelint-config')],
      rules: {
        '@stylistic/indentation': indent,
        '@stylistic/string-quotes': quotes,
        '@stylistic/max-line-length': maxLineLength,
        '@stylistic/block-closing-brace-newline-after': ['always', {
          ignoreAtRules: ['if', 'else'],
        }],
      },
    }
  }
  else if (options === 'prettier') {
    return {
      extends: [resolvePackagePath('stylelint-prettier/recommended')],
      rules: {
        'prettier/prettier': [true, {
          singleQuote: quotes === 'single',
          useTabs: indent === 'tab',
          tabWidth: typeof indent === 'number' ? indent : undefined,
          printWidth: maxLineLength,
        }],
      },
    }
  }

  return {}
}
