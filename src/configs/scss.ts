import type { StylelintConfig, StylelintOverrideConfig } from '../types'
import postcssSCSS from 'postcss-scss'
import { resolvePackagePath } from '../resolve'
import { useSCSSRules } from '../rules/scss'

export function scss(options: boolean): StylelintConfig | StylelintOverrideConfig {
  if (options === true) {
    return {
      files: ['**/*.scss'],
      customSyntax: postcssSCSS,
      plugins: [resolvePackagePath('stylelint-scss')],
      rules: useSCSSRules(),
    }
  }
  return {}
}
