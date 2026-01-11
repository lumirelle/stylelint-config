import type { OptionsOpinionated, StylelintConfig } from '../types'
import { useCSSRules } from '../rules/css'

export async function css(
  lessOpinionated: boolean | OptionsOpinionated,
): Promise<StylelintConfig> {
  return {
    rules: useCSSRules(lessOpinionated),
  }
}
