import type { OptionsOpinionated, StylelintConfig } from '../types'
import { useCSSRules } from '../rules/css'

export async function css(lessOpinionated: boolean | OptionsOpinionated): Promise<StylelintConfig> {
  const config: StylelintConfig = {}
  config.rules = useCSSRules()
  if (typeof lessOpinionated === 'object') {
    if (lessOpinionated.pattern === true) {
      config.rules['selector-class-pattern'] = null
      config.rules['selector-id-pattern'] = null
    }
    if (lessOpinionated.maintainability === true) {
      config.rules['no-descending-specificity'] = null
    }
  }
  else if (lessOpinionated === true) {
    config.rules['selector-class-pattern'] = null
    config.rules['selector-id-pattern'] = null
    config.rules['no-descending-specificity'] = null
  }
  return config
}
