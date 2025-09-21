import type { DefaultStylelintConfig, OptionsConfig } from '../types'
import { resolvePackagePath } from '../resolve'

export function setup(options: OptionsConfig, config: DefaultStylelintConfig): void {
  if (options.ordered) {
    config.extends.push(resolvePackagePath('stylelint-config-recess-order'))
  }
}
