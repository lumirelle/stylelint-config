import { describe, expect, it } from 'vitest'
import { resolvePackagePath, vue } from '../../src'
import { useCSSRules } from '../../src/rules/css'
import { useLessRules } from '../../src/rules/less'
import { useSCSSRules } from '../../src/rules/scss'
import { defaultVueConfig } from './default-config'

describe('vue config', () => {
  it('should generate empty config when Vue is disabled', () => {
    expect(vue(false, false, false))
      .toEqual({})
  })

  it('should generate Vue config with CSS rules when enabled', () => {
    expect(vue(true, false, false))
      .toEqual({
        ...defaultVueConfig,
        rules: {
          ...useCSSRules(),
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

  it('should generate Vue config with SCSS rules when both enabled', () => {
    expect(vue(true, true, false))
      .toEqual({
        ...defaultVueConfig,
        plugins: [resolvePackagePath('stylelint-scss')],
        rules: {
          ...useSCSSRules(),
          ...defaultVueConfig.rules,
        },
      })
  })

  it('should generate Vue config with Less rules when both enabled', () => {
    expect(vue(true, false, true))
      .toEqual({
        ...defaultVueConfig,
        plugins: [resolvePackagePath('stylelint-less')],
        rules: {
          ...useLessRules(),
          ...defaultVueConfig.rules,
        },
      })
  })

  it('should generate Vue config with CSS and SCSS rules when both enabled', () => {
    expect(vue(true, true, false))
      .toEqual({
        ...defaultVueConfig,
        plugins: [resolvePackagePath('stylelint-scss')],
        rules: {
          ...useSCSSRules(),
          ...defaultVueConfig.rules,
        },
      })
  })
})
