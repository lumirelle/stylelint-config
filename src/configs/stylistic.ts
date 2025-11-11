import type { Nullable } from '@antfu/utils'
import type { StylelintConfig, StylisticConfig } from '../types'
import { resolvePackagePath } from '../resolve'

export async function stylistic(
  stylistic: boolean | StylisticConfig,
): Promise<Nullable<StylelintConfig>> {
  const {
    indent = 2,
    quotes = 'single',
    maxLineLength = 120,
  } = typeof stylistic === 'object' ? stylistic : {}

  if (stylistic === true || typeof stylistic === 'object') {
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
  return null
}
