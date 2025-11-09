import { describe, expect, it } from 'vitest'
import { css } from '../../src'
import { defaultCSSConfig } from './default-config'

describe('css config', () => {
  it('should be generated with opinionated rules correctly', () => {
    expect(css(false)).toEqual(defaultCSSConfig)
  })

  it('should be generated without opinionated pattern rules correctly', () => {
    expect(css({ pattern: true })).toEqual({
      ...defaultCSSConfig,
      rules: {
        ...defaultCSSConfig.rules,
        'selector-class-pattern': null,
        'selector-id-pattern': null,
      },
    })
  })

  it('should be generated without opinionated maintainability rules correctly', () => {
    expect(css({ maintainability: true })).toEqual({
      ...defaultCSSConfig,
      rules: {
        ...defaultCSSConfig.rules,
        'no-descending-specificity': null,
      },
    })
  })

  it('should be generated without opinionated correctly', () => {
    expect(css(true)).toEqual({
      ...defaultCSSConfig,
      rules: {
        ...defaultCSSConfig.rules,
        'selector-class-pattern': null,
        'selector-id-pattern': null,
        'no-descending-specificity': null,
      },
    })
  })
})
