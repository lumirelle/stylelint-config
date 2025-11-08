import type { StylelintConfig } from '../types'
import { resolvePackagePath } from '../resolve'

export function ordered(options: boolean): StylelintConfig {
  const config: StylelintConfig = {}
  config.extends = []
  config.rules = {}

  if (options === true) {
    config.extends.push(resolvePackagePath('stylelint-config-recess-order'))
  }

  return config
}
