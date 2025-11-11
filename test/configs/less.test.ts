import { describe, expect, it } from 'vitest'
import { less } from '../../src'
import { defaultLessConfig } from './default-config'

describe('less config', () => {
  it('should generate empty config when Less is disabled', async () => {
    expect(await less(false, false)).toEqual(null)
  })

  it('should generate Less config with all rules when enabled', async () => {
    expect(await less(true, false)).toEqual(defaultLessConfig)
  })
})
