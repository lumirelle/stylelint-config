import type { StylelintConfig } from '../types'
import { resolvePackagePath } from '../resolve'

export function html(options: boolean): StylelintConfig {
  if (options === true) {
    return {
      extends: [resolvePackagePath('stylelint-config-html')],
    }
  }

  return {}
}
