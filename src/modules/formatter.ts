import type { DefaultStylelintConfig, OptionsConfig } from '../types'
import { resolvePackagePath } from '../resolve'

export function setup(options: OptionsConfig, config: DefaultStylelintConfig): void {
  if (options.formatter) {
    if (typeof options.formatter === 'boolean' || options.formatter === 'stylistic') {
      config.extends.push(resolvePackagePath('@stylistic/stylelint-config'))
      config.rules['@stylistic/max-line-length'] = null
    }
    else if (options.formatter === 'prettier') {
      config.extends.push(resolvePackagePath('stylelint-prettier/recommended'))
    }
  }
}
