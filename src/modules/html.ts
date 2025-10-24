import type { OptionsConfig, StylelintConfigWithDefaults } from '../types'
import { resolvePackagePath } from '../resolve'

export function setup(options: OptionsConfig, config: StylelintConfigWithDefaults): void {
  if (options.html) {
    config.extends.push(resolvePackagePath('stylelint-config-html'))
  }
}
