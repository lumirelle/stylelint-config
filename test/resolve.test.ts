import { describe, expect, it } from 'bun:test'
import { resolvePackagePath, resolvePackagePaths } from '../src/resolve'

describe('resolve', () => {
  it('should resolve package paths without throwing', () => {
    const packageName = '@stylistic/stylelint-config'
    expect(() => resolvePackagePath(packageName)).not.toThrow()
  })

  it('should resolve multiple package names without throwing', () => {
    const packageNames = [
      '@stylistic/stylelint-config',
      'stylelint-config-html',
    ]
    expect(() => resolvePackagePaths(packageNames)).not.toThrow()
  })

  it('should fallback to package name if resolution fails', () => {
    const nonExistentPackage = 'non-existent-package-12345'
    const resolvedPath = resolvePackagePath(nonExistentPackage)
    expect(resolvedPath).toBe(nonExistentPackage)
  })
})
