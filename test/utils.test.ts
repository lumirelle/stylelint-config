import * as antfuInstallPkg from '@antfu/install-pkg'
import * as clackPrompts from '@clack/prompts'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ensurePackages, interopDefault, isInEditorEnv, isInGitHooksOrLintStaged, isPackageInScope } from '../src/utils'

vi.mock('@clack/prompts', { spy: true })
vi.mock('@antfu/install-pkg', { spy: true })

const spiedFilter = vi.spyOn(Array.prototype, 'filter')
const spiedConfirm = vi.spyOn(clackPrompts, 'confirm')
const spiedInstallPackage = vi.spyOn(antfuInstallPkg, 'installPackage')

beforeEach(() => {
  spiedConfirm.mockImplementation(async () => true)
  spiedInstallPackage.mockImplementation(async () => undefined as any)
  // Avoid CI environment interference
  vi.stubEnv('CI', undefined)
  // Why global config does not work?
  spiedFilter.mockClear()
})

afterEach(() => {
  spiedConfirm.mockReset()
  spiedInstallPackage.mockReset()
})

describe('utils', () => {
  describe('isPackageInScope', () => {
    it('should have `stylelint` in scope', () => {
      expect(isPackageInScope('stylelint'))
        .toBe(true)
    })

    it('should not have `non-existing-package-name-xyz` in scope', () => {
      expect(isPackageInScope('non-existing-package-name-xyz'))
        .toBe(false)
    })
  })

  describe('ensurePackages', () => {
    it('should `Array.filter` not be called in CI environment', async () => {
      vi.stubEnv('CI', 'true')
      expect(process.env.CI).toBe('true')
      expect(spiedFilter).not.toHaveBeenCalled()
      expect(await ensurePackages(['stylelint'], false))
        .toBeUndefined()
      expect(spiedFilter).not.toHaveBeenCalled()
    })

    it('should `Array.filter` not be called if `isTTY` false', async () => {
      const originalIsTTY = process.stdout.isTTY
      process.stdout.isTTY = false
      expect(await ensurePackages(['stylelint'], false))
        .toBeUndefined()
      expect(spiedFilter).not.toHaveBeenCalled()
      process.stdout.isTTY = originalIsTTY
    })

    it('should not prompt and install for `stylelint`', async () => {
      expect(await ensurePackages(['stylelint'], false))
        .toBeUndefined()
      expect(spiedFilter).toHaveBeenCalled()
      expect(spiedConfirm).not.toHaveBeenCalled()
      expect(spiedInstallPackage).not.toHaveBeenCalled()
    })

    it('should throw error for `not-exist-package` if in editor', async () => {
      await expect(ensurePackages(['not-exist-package'], true))
        .rejects
        .toThrow()
      expect(spiedFilter).toHaveBeenCalled()
      expect(spiedConfirm).not.toHaveBeenCalled()
      expect(spiedInstallPackage).not.toHaveBeenCalled()
    })

    it('should prompt and install for `not-exist-package`', async () => {
      expect(await ensurePackages(['not-exist-package'], false))
        .toBeUndefined()
      expect(spiedFilter).toHaveBeenCalled()
      expect(spiedConfirm).toHaveBeenCalledTimes(1)
      expect(spiedInstallPackage).toHaveBeenCalledTimes(1)
    })

    it('should prompt but not install for `not-exist-package` if user cancels', async () => {
      spiedConfirm.mockImplementation(async () => false)
      expect(await ensurePackages(['not-exist-package'], false))
        .toBeUndefined()
      expect(spiedConfirm).toHaveBeenCalledTimes(1)
      expect(spiedInstallPackage).toHaveBeenCalledTimes(0)
      spiedConfirm.mockReset()
    })

    it('should prompt one package not exists correctly', async () => {
      expect(await ensurePackages(['not-exist-package'], false))
        .toBeUndefined()
      expect(spiedConfirm).toHaveBeenCalledWith({
        message: 'Package is required for this config: not-exist-package. Do you want to install them?',
      })
    })

    it('should prompt more packages not exist correctly', async () => {
      expect(await ensurePackages(['not-exist-package', 'another-package'], false))
        .toBeUndefined()
      expect(spiedConfirm).toHaveBeenCalledWith({
        message: 'Packages are required for this config: not-exist-package, another-package. Do you want to install them?',
      })
    })
  })

  describe('interopDefault', () => {
    it('should interop default correctly', async () => {
      await expect(interopDefault(Promise.resolve({ default: 42 })))
        .resolves
        .toBe(42)
      await expect(interopDefault(Promise.resolve(42)))
        .resolves
        .toBe(42)
    })
  })

  describe('isInEditorEnv & isInGitHooksOrLintStaged', () => {
    it('should not in editor if in CI environment', () => {
      const CI = process.env.CI
      process.env.CI = 'true'
      expect(isInEditorEnv())
        .toBe(false)
      if (CI !== undefined)
        process.env.CI = CI
      else
        delete process.env.CI
    })

    it('should not in editor if in Git hooks or lint-staged', () => {
      const GIT_PARAMS = process.env.GIT_PARAMS
      process.env.GIT_PARAMS = 'true'
      expect(isInEditorEnv())
        .toBe(false)
      if (GIT_PARAMS !== undefined)
        process.env.GIT_PARAMS = GIT_PARAMS
      else
        delete process.env.GIT_PARAMS
    })

    it.each([
      ['VSCODE_PID', '1234'],
      ['VSCODE_CWD', '/some/path'],
      ['JETBRAINS_IDE', 'idea'],
      ['VIM', 'vim'],
      ['NVIM', 'nvim'],
    ])('should in editor if %s is set to %s', async (envVar, value) => {
      const ENV_VAR = process.env[envVar]
      process.env[envVar] = value
      expect(isInEditorEnv())
        .toBe(true)
      if (ENV_VAR !== undefined)
        process.env[envVar] = ENV_VAR
      else
        delete process.env[envVar]
    })

    it('should not in Git hooks or lint-staged', () => {
      expect(isInGitHooksOrLintStaged())
        .toBe(false)
    })

    it.each([
      ['GIT_PARAMS', 'some-params'],
      ['VSCODE_GIT_COMMAND', 'some-command'],
      ['npm_lifecycle_script', 'lint-staged some-other-args'],
    ])('should in Git hooks or lint-staged if %s is set to %s', (envVar, value) => {
      const ENV_VAR = process.env[envVar]
      process.env[envVar] = value
      expect(isInGitHooksOrLintStaged())
        .toBe(true)
      if (ENV_VAR !== undefined)
        process.env[envVar] = ENV_VAR
      else
        delete process.env[envVar]
    })
  })
})
