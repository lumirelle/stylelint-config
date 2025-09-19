import { createRequire } from 'node:module'

/**
 * Resolve package name to actual file path
 */
export function resolvePackagePath(packageName: string): string {
  try {
    const require = createRequire(import.meta.url)
    const packagePath = require.resolve(packageName)
    return packagePath
  }
  catch (error) {
    console.warn(`Failed to resolve package "${packageName}":`, error)
    return packageName
  }
}

/**
 * Batch resolve package names to actual paths
 */
export function resolvePackagePaths(packageNames: string[]): string[] {
  return packageNames.map(resolvePackagePath)
}
