import type { StylelintConfig, StylelintOverrideConfig } from '../types'
import { resolvePackagePath } from '../resolve'
import { useLessRules } from '../rules/less'
import { ensurePackages, interopDefault } from '../utils'

export async function less(options: boolean): Promise<StylelintConfig | StylelintOverrideConfig> {
  if (options === true) {
    await ensurePackages(['postcss-less', 'stylelint-less'])
    const postcssLess = await interopDefault(import('postcss-less'))
    return {
      files: ['**/*.less'],
      customSyntax: postcssLess,
      plugins: [resolvePackagePath('stylelint-less')],
      rules: useLessRules(),
    }
  }
  return {}
}
