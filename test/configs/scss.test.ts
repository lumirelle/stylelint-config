import { describe, expect, it } from 'vitest'
import { scss } from '../../src'
import { defaultSCSSConfig } from './default-config'

describe('scss config', () => {
  it('should generate empty config when SCSS is disabled', () => {
    expect(scss(false)).toEqual({})
  })

  it('should generate SCSS config with all rules when enabled', () => {
    expect(scss(true)).toEqual(defaultSCSSConfig)
  })
})
