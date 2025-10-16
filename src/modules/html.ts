import type { DefaultStylelintConfig, OptionsConfig } from '../types'
import { resolvePackagePath } from '../resolve'

export function setup(options: OptionsConfig, config: DefaultStylelintConfig): void {
  if (options.html) {
    config.extends.push(resolvePackagePath('stylelint-config-html'))
  }
}
