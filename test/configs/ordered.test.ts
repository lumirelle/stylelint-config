import { describe, expect, it } from 'vitest'
import { ordered } from '../../src'
import { defaultOrderedConfig } from './default-config'

describe('ordered config', () => {
  it('should generate empty config when property ordering is disabled', async () => {
    expect(await ordered(false)).toEqual(null)
  })

  it('should generate ordered config with property ordering rules when enabled', async () => {
    expect(await ordered(true)).toEqual(defaultOrderedConfig)
  })
})
