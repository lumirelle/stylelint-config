import type { Nullable } from '@antfu/utils'
import type { OptionsOpinionated, StylelintOverrideConfig } from '../types'
import { resolvePackagePath } from '../resolve'
import { useLessRules } from '../rules/less'
import { ensurePackages, interopDefault } from '../utils'

export async function less(
  options: boolean,
  lessOpinionated: boolean | OptionsOpinionated,
  isInEditor: boolean,
): Promise<Nullable<StylelintOverrideConfig>> {
  if (options === true) {
    await ensurePackages(['postcss-less', 'stylelint-less'], isInEditor)
    const postcssLess = await interopDefault(import('postcss-less'))
    return {
      files: ['**/*.less'],
      customSyntax: postcssLess,
      plugins: [resolvePackagePath('stylelint-less')],
      rules: useLessRules(lessOpinionated),
    }
  }
  return null
}
