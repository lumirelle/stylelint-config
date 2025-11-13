import type { OptionsOpinionated, StylelintConfig } from '../types'
import { useCSSRules } from '../rules/css'

export async function css(lessOpinionated: boolean | OptionsOpinionated): Promise<StylelintConfig> {
  const config: StylelintConfig = {}
  config.rules = useCSSRules(lessOpinionated)
  return config
}
