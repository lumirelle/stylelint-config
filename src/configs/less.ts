import type { StylelintConfig, StylelintOverrideConfig } from '../types'
import postcssLess from 'postcss-less'
import { resolvePackagePath } from '../resolve'
import { useLessRules } from '../rules/less'

export async function less(options: boolean): Promise<StylelintConfig | StylelintOverrideConfig> {
  if (options === true) {
    return {
      files: ['**/*.less'],
      customSyntax: postcssLess,
      plugins: [resolvePackagePath('stylelint-less')],
      rules: useLessRules(),
    }
  }
  return {}
}
