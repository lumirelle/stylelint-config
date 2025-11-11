import { describe, expect, it } from 'vitest'
import { scss } from '../../src'
import { defaultSCSSConfig } from './default-config'

describe('scss config', () => {
  it('should generate empty config when SCSS is disabled', async () => {
    expect(await scss(false)).toEqual(null)
  })

  it('should generate SCSS config with all rules when enabled', async () => {
    expect(await scss(true)).toEqual(defaultSCSSConfig)
  })
})
