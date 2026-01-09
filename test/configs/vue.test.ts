import { describe, expect, it, vi } from 'bun:test'
import { resolvePackagePath, vue } from '../../src'
import { useCSSRules } from '../../src/rules/css'
import { useLessRules } from '../../src/rules/less'
import { useSCSSRules } from '../../src/rules/scss'
import { defaultVueConfig } from './default-config'

const mocks = vi.hoisted(() => {
  return {
    getPackageInfoSync: vi.fn().mockReturnValue({ version: '16.13.0' }),
  }
})

vi.mock('local-pkg', async (importOriginal) => {
  const actual = await importOriginal<typeof import('local-pkg')>()
  return {
    ...actual,
    getPackageInfoSync: mocks.getPackageInfoSync,
  }
})

describe('vue config', () => {
  it('should generate empty config when Vue is disabled', async () => {
    expect(await vue(false, false, false, false))
      .toEqual(null)
  })

  it('should generate Vue config with CSS rules correctly when stylelint is not installed', async () => {
    mocks.getPackageInfoSync.mockReturnValueOnce(undefined)
    expect(await vue(true, false, false, false))
      .toEqual({
        ...defaultVueConfig,
        rules: {
          ...useCSSRules(false),
          ...defaultVueConfig.rules,
        },
      })
  })

  it('should generate Vue config with CSS rules correctly when stylelint version eq 14.4.0', async () => {
    mocks.getPackageInfoSync.mockReturnValueOnce({ version: '14.4.0' })
    expect(await vue(true, false, false, false))
      .toEqual({
        ...defaultVueConfig,
        rules: {
          ...useCSSRules(false),
          ...defaultVueConfig.rules,
          'function-no-unknown': null,
        },
      })
  })

  it('should generate Vue config with CSS rules correctly when stylelint version eq 14.5.0', async () => {
    mocks.getPackageInfoSync.mockReturnValueOnce({ version: '14.5.0' })
    expect(await vue(true, false, false, false))
      .toEqual({
        ...defaultVueConfig,
        rules: {
          ...useCSSRules(false),
          ...defaultVueConfig.rules,
          'function-no-unknown': [
            true,
            { ignoreFunctions: ['v-bind'] },
          ],
        },
      })
  })

  it('should generate Vue config with CSS rules correctly when stylelint version eq 16.13.0', async () => {
    expect(await vue(true, false, false, false))
      .toEqual({
        ...defaultVueConfig,
        rules: {
          ...useCSSRules(false),
          ...defaultVueConfig.rules,
          'declaration-property-value-no-unknown': [
            true,
            { ignoreProperties: { '/.*/': '/v-bind\\(.+\\)/' } },
          ],
          'function-no-unknown': [
            true,
            { ignoreFunctions: ['v-bind'] },
          ],
        },
      })
  })

  it('should generate Vue config with CSS, with less opinionated pattern rules', async () => {
    expect(await vue(true, false, false, { pattern: true }))
      .toEqual({
        ...defaultVueConfig,
        rules: {
          ...useCSSRules({ pattern: true }),
          ...defaultVueConfig.rules,
          'declaration-property-value-no-unknown': [
            true,
            { ignoreProperties: { '/.*/': '/v-bind\\(.+\\)/' } },
          ],
          'function-no-unknown': [
            true,
            { ignoreFunctions: ['v-bind'] },
          ],
        },
      })
  })

  it('should generate Vue config with CSS, with less opinionated maintainability rules', async () => {
    expect(await vue(true, false, false, { maintainability: true }))
      .toEqual({
        ...defaultVueConfig,
        rules: {
          ...useCSSRules({ maintainability: true }),
          ...defaultVueConfig.rules,
          'declaration-property-value-no-unknown': [
            true,
            { ignoreProperties: { '/.*/': '/v-bind\\(.+\\)/' } },
          ],
          'function-no-unknown': [
            true,
            { ignoreFunctions: ['v-bind'] },
          ],
        },
      })
  })

  it('should generate Vue config with CSS, with all less opinionated rules', async () => {
    expect(await vue(true, false, false, true))
      .toEqual({
        ...defaultVueConfig,
        rules: {
          ...useCSSRules(true),
          ...defaultVueConfig.rules,
          'declaration-property-value-no-unknown': [
            true,
            { ignoreProperties: { '/.*/': '/v-bind\\(.+\\)/' } },
          ],
          'function-no-unknown': [
            true,
            { ignoreFunctions: ['v-bind'] },
          ],
        },
      })
  })

  it('should generate Vue config with SCSS rules when both enabled', async () => {
    expect(await vue(true, true, false, false))
      .toEqual({
        ...defaultVueConfig,
        plugins: [resolvePackagePath('stylelint-scss')],
        rules: {
          ...useSCSSRules(false),
          ...defaultVueConfig.rules,
        },
      })
  })

  it('should generate Vue config with Less rules when both enabled', async () => {
    expect(await vue(true, false, true, false))
      .toEqual({
        ...defaultVueConfig,
        plugins: [resolvePackagePath('stylelint-less')],
        rules: {
          ...useLessRules(false),
          ...defaultVueConfig.rules,
        },
      })
  })

  it('should generate Vue config with CSS and SCSS rules when both enabled', async () => {
    expect(await vue(true, true, false, false))
      .toEqual({
        ...defaultVueConfig,
        plugins: [resolvePackagePath('stylelint-scss')],
        rules: {
          ...useSCSSRules(false),
          ...defaultVueConfig.rules,
        },
      })
  })

  it('should generate Vue config with CSS and SCSS rules when both enabled, with less opinionated pattern rules', async () => {
    expect(await vue(true, true, false, { pattern: true }))
      .toEqual({
        ...defaultVueConfig,
        plugins: [resolvePackagePath('stylelint-scss')],
        rules: {
          ...useSCSSRules({ pattern: true }),
          ...defaultVueConfig.rules,
        },
      })
  })

  it('should generate Vue config with CSS and SCSS rules when both enabled, with less opinionated maintainability rules', async () => {
    expect(await vue(true, true, false, { maintainability: true }))
      .toEqual({
        ...defaultVueConfig,
        plugins: [resolvePackagePath('stylelint-scss')],
        rules: {
          ...useSCSSRules({ maintainability: true }),
          ...defaultVueConfig.rules,
        },
      })
  })

  it('should generate Vue config with CSS and SCSS rules when both enabled, with all less opinionated rules', async () => {
    expect(await vue(true, true, false, true))
      .toEqual({
        ...defaultVueConfig,
        plugins: [resolvePackagePath('stylelint-scss')],
        rules: {
          ...useSCSSRules(true),
          ...defaultVueConfig.rules,
        },
      })
  })
})
