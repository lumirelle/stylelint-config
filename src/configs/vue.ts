import type { StylelintConfig } from '../types'
import { resolvePackagePath } from '../resolve'

export function vue(options: boolean, scss: boolean): StylelintConfig {
  const config: StylelintConfig = {}
  config.extends = []
  config.rules = {}

  if (options === true) {
    config.extends.push(resolvePackagePath('stylelint-config-standard-vue'))
    if (scss === true) {
      config.extends.push(resolvePackagePath('stylelint-config-standard-vue/scss'))
    }
  }

  return config
}
