import type { DefaultStylelintConfig, OptionsConfig } from '../types'
import { resolvePackagePath } from '../resolve'
import { LESS_OPINIONATED_RULES } from '../rules'

export function setup(options: OptionsConfig, config: DefaultStylelintConfig): void {
  if (options.scss) {
    config.extends.push(resolvePackagePath('stylelint-config-standard-scss'))
    config.rules['scss/at-if-closing-brace-space-after'] = null
    config.rules['scss/at-if-closing-brace-newline-after'] = null
    config.rules['scss/at-else-closing-brace-newline-after'] = null
    config.rules['scss/at-else-closing-brace-space-after'] = null

    if (options.lessOpinionated) {
      const disabledRules: string[] = []
      if (typeof options.lessOpinionated === 'object') {
        if (options.lessOpinionated.pattern) {
          disabledRules.push(...LESS_OPINIONATED_RULES.scss.pattern)
        }
        if (options.lessOpinionated.cleanliness) {
          disabledRules.push(...LESS_OPINIONATED_RULES.scss.cleanliness)
        }
        if (options.lessOpinionated.maintainability) {
          disabledRules.push(...LESS_OPINIONATED_RULES.scss.maintainability)
        }
      }
      else {
        disabledRules.push(...[
          ...LESS_OPINIONATED_RULES.scss.pattern,
          ...LESS_OPINIONATED_RULES.scss.cleanliness,
          ...LESS_OPINIONATED_RULES.scss.maintainability,
        ])
      }
      disabledRules.forEach((rule) => {
        config.rules![rule] = null
      })
    }
  }
}
