import type { DefaultStylelintConfig, OptionsConfig } from '../types'
import { resolvePackagePath } from '../resolve'

export function setup(options: OptionsConfig, config: DefaultStylelintConfig): void {
  if (options.vue) {
    if (options.scss) {
      config.extends.push(resolvePackagePath('stylelint-config-standard-vue/scss'))
    }
    else {
      config.extends.push(resolvePackagePath('stylelint-config-standard-vue'))
    }
  }
}
