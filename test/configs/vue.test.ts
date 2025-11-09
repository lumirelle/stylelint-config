import { describe, expect, it } from 'vitest'
import { resolvePackagePath, vue } from '../../src'
import { useCSSRules } from '../../src/rules/css'
import { useSCSSRules } from '../../src/rules/scss'
import { defaultVueConfig } from './default-config'

describe('vue config', () => {
  it('should be generated with nothing', () => {
    expect(vue(false, false))
      .toEqual({})
  })

  it('should be generated correctly', () => {
    expect(vue(true, false))
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

  it('should be generated with scss correctly', () => {
    expect(vue(true, true))
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
