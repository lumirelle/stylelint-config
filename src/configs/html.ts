import type { Nullable } from '@antfu/utils'
import type { StylelintConfig } from '../types'
import { resolvePackagePath } from '../resolve'

export async function html(options: boolean): Promise<Nullable<StylelintConfig>> {
  if (options === true) {
    return {
      extends: [resolvePackagePath('stylelint-config-html')],
    }
  }
  return null
}
