import { describe, expect, it, vi } from 'vitest'
import { ensurePackages, interopDefault, isInEditorEnv, isInGitHooksOrLintStaged, isPackageInScope } from '../src/utils'

const mocks = vi.hoisted(() => {
  return {
    mockConfirm: vi.fn().mockResolvedValue(true),
    mockInstallPackage: vi.fn().mockResolvedValue(undefined),
  }
})

vi.mock('@clack/prompts', () => {
  return {
    confirm: mocks.mockConfirm,
  }
})

vi.mock('@antfu/install-pkg', () => {
  return {
    installPackage: mocks.mockInstallPackage,
  }
})

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
    expect(mocks.mockConfirm).not.toHaveBeenCalled()
    expect(mocks.mockInstallPackage).not.toHaveBeenCalled()
    delete process.env.CI
  })

  it('ensure packages should return nothing for existing packages', async () => {
    expect(await ensurePackages(['stylelint'], false))
      .toBeUndefined()
    expect(mocks.mockConfirm).not.toHaveBeenCalled()
    expect(mocks.mockInstallPackage).not.toHaveBeenCalled()
  })

  it('ensure packages should throw error if in editor', async () => {
    await expect(ensurePackages(['not-exist-package'], true))
      .rejects
      .toThrow()
    expect(mocks.mockConfirm).not.toHaveBeenCalled()
    expect(mocks.mockInstallPackage).not.toHaveBeenCalled()
  })

  it('ensure packages should prompt and install pkg', async () => {
    expect(await ensurePackages(['not-exist-package'], false))
      .toBeUndefined()
    expect(mocks.mockConfirm).toHaveBeenCalledOnce()
    expect(mocks.mockInstallPackage).toHaveBeenCalledOnce()
  })

  it('ensure packages should prompt but not install pkg', async () => {
    process.env.TEST_NOT_CONFIRM = 'true'
    mocks.mockConfirm.mockResolvedValueOnce(false)
    expect(await ensurePackages(['not-exist-package'], false))
      .toBeUndefined()
    expect(mocks.mockConfirm).toHaveBeenCalledTimes(2)
    expect(mocks.mockInstallPackage).toHaveBeenCalledOnce()
    delete process.env.TEST_NOT_CONFIRM
  })

  it('ensure packages should prompt one pkg correctly', async () => {
    expect(await ensurePackages(['not-exist-package'], false))
      .toBeUndefined()
    expect(mocks.mockConfirm).toHaveBeenCalledWith({
      message: 'Package is required for this config: not-exist-package. Do you want to install them?',
    })
  })

  it('ensure packages should prompt more pkg correctly', async () => {
    expect(await ensurePackages(['not-exist-package', 'another-package'], false))
      .toBeUndefined()
    expect(mocks.mockConfirm).toHaveBeenCalledWith({
      message: 'Packages are required for this config: not-exist-package, another-package. Do you want to install them?',
    })
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
