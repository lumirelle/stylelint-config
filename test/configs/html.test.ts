import { describe, expect, it } from 'vitest'
import { html } from '../../src'
import { defaultHTMLConfig } from './default-config'

describe('html config', () => {
  it('should generate empty config when HTML support is disabled', async () => {
    expect(await html(false)).toEqual({})
  })

  it('should generate HTML config with all rules when enabled', async () => {
    expect(await html(true)).toEqual(defaultHTMLConfig)
  })
})
