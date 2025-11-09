import { describe, expect, it } from 'vitest'
import { scss } from '../../src'
import { defaultSCSSConfig } from './default-config'

describe('scss config', () => {
  it('should be generated with nothing', () => {
    expect(scss(false)).toEqual({})
  })

  it('should be generated correctly', () => {
    expect(scss(true)).toEqual(defaultSCSSConfig)
  })
})
