import { afterEach, beforeEach, describe, expect, it, spyOn } from 'bun:test'
import * as antfuInstallPkg from '@antfu/install-pkg'
import * as clackPrompts from '@clack/prompts'
import * as localPkg from 'local-pkg'
import { ensurePackages, interopDefault, isInEditorEnv, isInGitHooksOrLintStaged, isPackageInScope } from '../src/utils'

let spiedFilter: ReturnType<typeof spyOn<typeof Array.prototype, 'filter'>>
let spiedIsPackageExists: ReturnType<typeof spyOn<typeof localPkg, 'isPackageExists'>>
let spiedConfirm: ReturnType<typeof spyOn<typeof clackPrompts, 'confirm'>>
let spiedInstallPackage: ReturnType<typeof spyOn<typeof antfuInstallPkg, 'installPackage'>>

beforeEach(() => {
  spiedFilter = spyOn(Array.prototype, 'filter')
  spiedIsPackageExists = spyOn(localPkg, 'isPackageExists')
  spiedConfirm = spyOn(clackPrompts, 'confirm')
  spiedConfirm.mockImplementation(async () => true)
  spiedInstallPackage = spyOn(antfuInstallPkg, 'installPackage')
  spiedInstallPackage.mockImplementation(async () => undefined as any)
})

afterEach(() => {
  spiedFilter.mockRestore()
  spiedIsPackageExists.mockRestore()
  spiedConfirm.mockRestore()
  spiedInstallPackage.mockRestore()
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
      const CI = process.env.CI
      process.env.CI = 'true'
      expect(await ensurePackages(['stylelint'], false))
        .toBeUndefined()
      expect(spiedFilter).not.toHaveBeenCalled()
      if (CI !== undefined)
        process.env.CI = CI
      else
        delete process.env.CI
    })

    it('should `Array.filter` not be called if `isTTY` false', async () => {
      process.stdout.isTTY = false
      expect(await ensurePackages(['stylelint'], false))
        .toBeUndefined()
      expect(spiedFilter).not.toHaveBeenCalled()
      process.stdout.isTTY = true
    })

    it('should not prompt and install for `stylelint`', async () => {
      expect(await ensurePackages(['stylelint'], false))
        .toBeUndefined()
      expect(spiedFilter).toHaveBeenCalled()
      expect(spiedConfirm).not.toHaveBeenCalled()
      expect(spiedInstallPackage).not.toHaveBeenCalled()
    })

    it('should throw error for `not-exist-package` if in editor', async () => {
      expect(ensurePackages(['not-exist-package'], true))
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
      const TEST_NOT_CONFIRM = process.env.TEST_NOT_CONFIRM
      process.env.TEST_NOT_CONFIRM = 'true'
      spiedConfirm.mockResolvedValueOnce(false)
      expect(await ensurePackages(['not-exist-package'], false))
        .toBeUndefined()
      expect(spiedConfirm).toHaveBeenCalledTimes(1)
      expect(spiedInstallPackage).toHaveBeenCalledTimes(0)
      if (TEST_NOT_CONFIRM !== undefined)
        process.env.TEST_NOT_CONFIRM = TEST_NOT_CONFIRM
      else
        delete process.env.TEST_NOT_CONFIRM
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
    it('should interop default correctly', () => {
      expect(interopDefault(Promise.resolve({ default: 42 })))
        .resolves
        .toBe(42)
      expect(interopDefault(Promise.resolve(42)))
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
