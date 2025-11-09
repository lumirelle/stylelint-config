import { describe, expect, it } from 'vitest'
import { ordered } from '../../src'
import { defaultOrderedConfig } from './default-config'

describe('ordered config', () => {
  it('should be generated with nothing', () => {
    expect(ordered(false)).toEqual({})
  })

  it('should be generated correctly', () => {
    expect(ordered(true)).toEqual(defaultOrderedConfig)
  })
})
