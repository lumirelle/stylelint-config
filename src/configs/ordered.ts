import type { StylelintConfig } from '../types'
import { resolvePackagePath } from '../resolve'

export function ordered(options: boolean): StylelintConfig {
  if (options === true) {
    return {
      extends: [resolvePackagePath('stylelint-config-recess-order')],
    }
  }

  return {}
}
