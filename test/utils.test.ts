import { describe, expect, it, vi } from 'vitest'
import { ensurePackages, interopDefault, isInEditorEnv, isInGitHooksOrLintStaged, isPackageInScope } from '../src/utils'

describe('utils', () => {
  it('package should in scope', () => {
    expect(isPackageInScope('stylelint'))
      .toBe(true)
  })

  it('package should not in scope', () => {
    expect(isPackageInScope('non-existing-package-name-xyz'))
      .toBe(false)
  })

  it('should interop default correctly', () => {
    expect(interopDefault(import('vitest')))
      .toBeDefined()
  })

  it('ensure packages should return nothing for CI environment', async () => {
    process.env.CI = 'true'
    expect(await ensurePackages(['stylelint'], false))
      .toBeUndefined()
    delete process.env.CI
  })

  it('ensure packages should return nothing for existing packages', async () => {
    expect(await ensurePackages(['stylelint'], false))
      .toBeUndefined()
  })

  it('ensure packages should return nothing if in editor', async () => {
    expect(await ensurePackages(['not-exist-package'], true))
      .toBeUndefined()
  })

  it('ensure packages should be stuck', async () => {
    function isPromisePending(promise: Promise<any>): boolean {
      let isPending = true
      promise.then(
        () => { isPending = false },
        () => { isPending = false },
      )
      return isPending
    }

    vi.useFakeTimers()
    const promise = ensurePackages(['not-exist-package'], false)
    vi.advanceTimersByTime(4000)
    expect(isPromisePending(promise)).toBe(true)
  })

  it('should not in editor', () => {
    expect(isInEditorEnv())
      .toBe(false)
  })

  it('should not in editor if in CI environment', () => {
    process.env.CI = 'true'
    expect(isInEditorEnv())
      .toBe(false)
    delete process.env.CI
  })

  it('should not in editor if in Git hooks or lint-staged', () => {
    process.env.GIT_PARAMS = 'true'
    expect(isInEditorEnv())
      .toBe(false)
    delete process.env.GIT_PARAMS
  })

  it('should in editor', async () => {
    process.env.VSCODE_PID = '1234'
    expect(isInEditorEnv())
      .toBe(true)
    delete process.env.VSCODE_PID
  })

  it('should not in Git hooks or lint-staged', () => {
    expect(isInGitHooksOrLintStaged())
      .toBe(false)
  })

  it('should in Git hooks or lint-staged', () => {
    process.env.GIT_PARAMS = 'some-params'
    expect(isInGitHooksOrLintStaged())
      .toBe(true)
    delete process.env.GIT_PARAMS
  })
})
