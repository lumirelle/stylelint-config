import type { Nullable } from '@antfu/utils'
import type { StylelintConfig } from '../types'
import { resolvePackagePath } from '../resolve'

export async function tailwindcss(
  options: boolean,
): Promise<Nullable<StylelintConfig>> {
  if (options !== true)
    return null
  return {
    extends: [resolvePackagePath('@dreamsicle.io/stylelint-config-tailwindcss')],
  }
}
