import type { OptionsConfig, StylelintConfig } from '../types'
import { resolvePackagePath } from '../resolve'

export function setup(options: OptionsConfig, config: StylelintConfig): void {
  if (options.ordered) {
    config.extends.push(resolvePackagePath('stylelint-config-recess-order'))
  }
}
