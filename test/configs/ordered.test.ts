import { describe, expect, it } from 'bun:test'
import { ordered } from '../../src'
import { setup } from './setup'

setup()

describe('ordered config', () => {
  it('should generate empty config when property ordering is disabled', async () => {
    expect(await ordered(false))
      .toBeNull()
  })

  it('should generate ordered config with property ordering rules when enabled', async () => {
    expect(await ordered(true))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "path/to/stylelint-config-recess-order",
          ],
        }
      `)
  })
})
