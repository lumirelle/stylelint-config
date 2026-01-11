import { describe, expect, it } from 'bun:test'
import { ordered } from '../../src'

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
            "C:\\Users\\Lumirelle\\i\\stylelint-config\\node_modules\\.bun\\stylelint-config-recess-order@7.4.0+fb9ec13bd4890b1c\\node_modules\\stylelint-config-recess-order\\index.js",
          ],
        }
      `)
  })
})
