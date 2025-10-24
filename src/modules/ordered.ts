import type { OptionsConfig, StylelintConfigWithDefaults } from '../types'
import { resolvePackagePath } from '../resolve'

export function setup(options: OptionsConfig, config: StylelintConfigWithDefaults): void {
  if (options.ordered) {
    config.extends.push(resolvePackagePath('stylelint-config-recess-order'))
  }
}
