import type { StylelintConfig } from './types'

/**
 * Merge multiple flat configs into a single flat config.
 *
 * Note there is no guarantee that the result works the same as the original configs.
 */
export function mergeConfigs<T extends StylelintConfig = StylelintConfig>(...configs: T[]): T {
  const keys = new Set(configs.flatMap(i => Object.keys(i)))
  const merged = configs.reduce((acc, cur) => {
    return {
      ...acc,
      ...cur,
      extends: [
        ...(acc.extends ? (Array.isArray(acc.extends) ? acc.extends : [acc.extends]) : []),
        ...(cur.extends ? (Array.isArray(cur.extends) ? cur.extends : [cur.extends]) : []),
      ],
      ignoreFiles: [
        ...(acc.ignoreFiles ? (Array.isArray(acc.ignoreFiles) ? acc.ignoreFiles : [acc.ignoreFiles]) : []),
        ...(cur.ignoreFiles ? (Array.isArray(cur.ignoreFiles) ? cur.ignoreFiles : [cur.ignoreFiles]) : []),
      ],
      languageOptions: {
        ...acc.languageOptions,
        ...cur.languageOptions,
      },
      overrides: [
        ...(acc.overrides ?? []),
        ...(cur.overrides ?? []),
      ],
      plugins: [
        ...(acc.plugins ? (Array.isArray(acc.plugins) ? acc.plugins : [acc.plugins]) : []),
        ...(cur.plugins ? (Array.isArray(cur.plugins) ? cur.plugins : [cur.plugins]) : []),
      ],
      pluginFunctions: {
        ...acc.pluginFunctions,
        ...cur.pluginFunctions,
      },
      processors: [
        ...(acc.processors ? (Array.isArray(acc.processors) ? acc.processors : [acc.processors]) : []),
        ...(cur.processors ? (Array.isArray(cur.processors) ? cur.processors : [cur.processors]) : []),
      ],
      rules: {
        ...acc.rules,
        ...cur.rules,
      },
    }
  }, {} as T)

  // Remove unused keys
  for (const key of Object.keys(merged)) {
    if (!keys.has(key))
      delete (merged as any)[key]
  }

  return merged as T
}
