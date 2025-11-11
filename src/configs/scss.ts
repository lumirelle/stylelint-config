import type { StylelintConfig, StylelintOverrideConfig } from '../types'
import postcssSCSS from 'postcss-scss'
import { resolvePackagePath } from '../resolve'
import { useSCSSRules } from '../rules/scss'

export async function scss(options: boolean): Promise<StylelintConfig | StylelintOverrideConfig> {
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
