import type { OptionsOpinionated, StylelintConfig } from '../types'
import { resolvePackagePath } from '../resolve'

export function css(lessOpinionated: boolean | OptionsOpinionated): StylelintConfig {
  const config: StylelintConfig = {}
  config.extends = []
  config.rules = {}

  config.extends.push(resolvePackagePath('stylelint-config-standard'))

  config.rules['custom-property-pattern'] = [
    '^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
    {
      message: (name: string) => `Expected custom property name "${name}" to be kebab-case, start with "--" or nothing.`,
    },
  ]

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
