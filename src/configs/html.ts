import type { Nullable } from '@antfu/utils'
import type { StylelintOverrideConfig } from '../types'
import { resolvePackagePath } from '../resolve'

/**
 * @see https://github.com/Microsoft/vscode/blob/master/extensions/html/package.json
 */
const extensions = [
  '.html',
  '.htm',
  '.shtml',
  '.xhtml',
  '.xht',
  '.mdoc',
  '.jsp',
  '.asp',
  '.aspx',
  '.jshtm',
  '.volt',
  '.ejs',
  '.rhtml',
]

export async function html(
  options: boolean,
): Promise<Nullable<StylelintOverrideConfig>> {
  if (options !== true)
    return null
  return {
    files: extensions.flatMap(ext => [`*${ext}`, `**/*${ext}`]),
    extends: [resolvePackagePath('stylelint-config-html/html')],
  }
}
