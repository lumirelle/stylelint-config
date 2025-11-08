import type { StylelintConfig } from '../types'
import { resolvePackagePath } from '../resolve'

export function scss(options: boolean): StylelintConfig {
  const config: StylelintConfig = {}
  config.extends = []
  config.rules = {}

  if (options === true) {
    config.extends.push(resolvePackagePath('stylelint-config-standard-scss'))
    config.rules['scss/at-if-closing-brace-space-after'] = null
    config.rules['scss/at-if-closing-brace-newline-after'] = null
    config.rules['scss/at-else-closing-brace-newline-after'] = null
    config.rules['scss/at-else-closing-brace-space-after'] = null
    config.rules['scss/dollar-variable-pattern'] = [
      '^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
      {
        message: (name: string) => `Expected SCSS variable name "${name}" to be kebab-case, start with "--" or nothing.`,
      },
    ]
  }

  return config
}
