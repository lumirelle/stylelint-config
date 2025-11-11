import { describe, expect, it } from 'vitest'
import { ConfigComposer } from '../src'

describe('config composer', () => {
  it('should create ConfigComposer instance correctly', async () => {
    const configs = [{
      rules: {
        test: true,
      },
    }]
    const composer = new ConfigComposer(configs)
    expect(composer)
      .toBeInstanceOf(ConfigComposer)
    expect(composer)
      .toBeInstanceOf(Promise)
    expect(await composer)
      .toEqual(configs)
  })

  it('should mix multiple configs using .mix() method correctly', async () => {
    const configs = [{
      rules: {
        test: true,
      },
    }]
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
    const composer = new ConfigComposer(configs)
    composer.mix(config1)
    composer.mix(config2)
    expect(await composer)
      .toEqual({
        rules: {
          test: null,
          xxx: null,
        },
      })
  })

  it('should support Promise methods (then/catch/finally) correctly', async () => {
    const configs = [{
      rules: {
        test: true,
      },
    }]
    new ConfigComposer(configs).then((finalConfig) => {
      expect(finalConfig).toEqual(configs)
    })
    new ConfigComposer(configs).catch((reason) => {
      expect(reason).toBeDefined()
    })
    new ConfigComposer(configs).finally(() => {
      expect(true).toBe(true)
    })
  })
})
