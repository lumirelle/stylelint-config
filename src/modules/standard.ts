import type { OptionsConfig, StylelintConfig } from '../types'
import { resolvePackagePath } from '../resolve'
import { LESS_OPINIONATED_RULES } from '../rules'

export function setup(options: OptionsConfig, config: StylelintConfig): void {
  // Always enable standard config
  config.extends.push(resolvePackagePath('stylelint-config-standard'))

  if (options.lessOpinionated) {
    const disabledRules: string[] = []
    if (typeof options.lessOpinionated === 'object') {
      if (options.lessOpinionated.pattern) {
        disabledRules.push(...LESS_OPINIONATED_RULES.standard.pattern)
      }
      if (options.lessOpinionated.cleanliness) {
        disabledRules.push(...LESS_OPINIONATED_RULES.standard.cleanliness)
      }
      if (options.lessOpinionated.maintainability) {
        disabledRules.push(...LESS_OPINIONATED_RULES.standard.maintainability)
      }
    }
    else {
      disabledRules.push(...[
        ...LESS_OPINIONATED_RULES.standard.pattern,
        ...LESS_OPINIONATED_RULES.standard.cleanliness,
        ...LESS_OPINIONATED_RULES.standard.maintainability,
      ])
    }
    disabledRules.forEach((rule) => {
      config.rules![rule] = null
    })
  }
}
