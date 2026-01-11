import type { Nullable } from '@antfu/utils'
import type { OptionsOpinionated, StylelintOverrideConfig } from '../types'
import postcssSCSS from 'postcss-scss'
import { resolvePackagePath } from '../resolve'
import { useSCSSRules } from '../rules/scss'

export async function scss(
  options: boolean,
  lessOpinionated: boolean | OptionsOpinionated,
): Promise<Nullable<StylelintOverrideConfig>> {
  if (options !== true)
    return null
  return {
    files: ['**/*.scss'],
    customSyntax: postcssSCSS,
    plugins: [resolvePackagePath('stylelint-scss')],
    rules: useSCSSRules(lessOpinionated),
  }
}
