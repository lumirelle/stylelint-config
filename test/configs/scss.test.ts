import { describe, expect, it } from 'bun:test'
import { scss } from '../../src'
import { useSCSSRules } from '../../src/rules/scss'
import { defaultSCSSConfig } from './default-config'

describe('scss config', () => {
  it('should generate empty config when SCSS is disabled', async () => {
    expect(await scss(false, false)).toEqual(null)
  })

  it('should generate SCSS config with all rules when enabled', async () => {
    expect(await scss(true, false)).toEqual(defaultSCSSConfig)
  })

  it('should generate SCSS config with less opinionated pattern rules correctly', async () => {
    expect(await scss(true, { pattern: true })).toEqual({
      ...defaultSCSSConfig,
      rules: useSCSSRules({ pattern: true }),
    })
  })

  it('should generate SCSS config with less opinionated maintainability rules correctly', async () => {
    expect(await scss(true, { maintainability: true })).toEqual({
      ...defaultSCSSConfig,
      rules: useSCSSRules({ maintainability: true }),
    })
  })

  it('should generate SCSS config with all less opinionated rules correctly', async () => {
    expect(await scss(true, true)).toEqual({
      ...defaultSCSSConfig,
      rules: useSCSSRules(true),
    })
  })
})
