import { describe, expect, it } from 'bun:test'
import { ConfigComposer } from '../src'

describe('config composer', () => {
  it('should create ConfigComposer instance correctly', async () => {
    const config = {
      rules: {
        test: true,
      },
    }
    const composer = new ConfigComposer(config)
    expect(composer)
      .toBeInstanceOf(ConfigComposer)
    expect(composer)
      .toBeInstanceOf(Promise)
    expect(await composer)
      .toEqual(config)
  })

  it('should create ConfigComposer instance with nothing', async () => {
    const composer = new ConfigComposer()
    expect(composer)
      .toBeInstanceOf(ConfigComposer)
    expect(composer)
      .toBeInstanceOf(Promise)
    expect(await composer)
      .toEqual({})
  })

  it('should mix multiple configs using .mix() method correctly', async () => {
    const config = {
      rules: {
        test: true,
      },
    }
    const config1 = {
      rules: {
        test: null,
      },
    }
    const config2 = {
      rules: {
        xxx: null,
      },
    }
    const composer = new ConfigComposer(config)
    await composer.mix(config1)
    await composer.mix(config2)
    expect(await composer)
      .toEqual({
        rules: {
          test: null,
          xxx: null,
        },
      })
  })

  it('should support Promise methods (then/catch/finally) correctly', async () => {
    const config = {
      rules: {
        test: true,
      },
    }
    // oxlint-disable-next-line promise/always-return
    await new ConfigComposer(config).then((finalConfig) => {
      expect(finalConfig).toEqual(config)
    })
    await new ConfigComposer(config).catch((reason) => {
      expect(reason).toBeDefined()
    })
    await new ConfigComposer(config).finally(() => {
      expect(true).toBe(true)
    })
  })
})
