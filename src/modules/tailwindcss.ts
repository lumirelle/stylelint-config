import type { OptionsConfig, StylelintConfig } from '../types'
import { resolvePackagePath } from '../resolve'

export function setup(options: OptionsConfig, config: StylelintConfig): void {
  if (options.vue) {
    if (options.scss) {
      config.extends.push(resolvePackagePath('stylelint-config-standard-vue/scss'))
    }
    else {
      config.extends.push(resolvePackagePath('stylelint-config-standard-vue'))
    }
  }
}
