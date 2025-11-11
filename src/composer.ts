import type { Awaitable } from '@antfu/utils'
import type { StylelintConfig, StylelintOverrideConfig } from './types'
import { defu } from './defu'

/**
 * Using the magic promise to implement a chainable config composer, when accessing this composer, user will get the final config.
 */
export class ConfigComposer extends Promise<StylelintConfig | StylelintOverrideConfig> {
  private _operations: ((config: StylelintConfig | StylelintOverrideConfig) => Promise<StylelintConfig | StylelintOverrideConfig>)[] = []

  constructor(configs: Awaitable<StylelintConfig | StylelintOverrideConfig>[]) {
    super(() => {})

    if (configs && configs.length > 0) {
      this.mix(...configs)
    }
  }

  /**
   * Mix the provided config, which will merge into the existing config.
   */
  public mix(...configs: Awaitable<StylelintConfig | StylelintOverrideConfig>[]): ConfigComposer {
    const promises = Promise.all(configs)
    this._operations.push(async (config) => {
      const resolved = (await promises).flat().filter(Boolean)
      if ('files' in config) {
        return defu({ overrides: [config] }, resolved)
      }
      else {
        return defu(config, resolved)
      }
    })
    return this
  }

  /**
   * Resolve the pipeline and return the final config.
   *
   * This returns a promise. Calling `.then()` has the same effect.
   */
  public async toConfig(): Promise<StylelintConfig | StylelintOverrideConfig> {
    let config: StylelintConfig | StylelintOverrideConfig = {}
    for (const operation of this._operations) {
      config = await operation(config)
    }
    return config
  }

  override then(onFulfilled: (value: StylelintConfig | StylelintOverrideConfig) => any, onRejected?: (reason: any) => any): Promise<any> {
    return this.toConfig()
      .then(onFulfilled, onRejected)
  }

  override catch(onRejected: (reason: any) => any): Promise<any> {
    return this.toConfig().catch(onRejected)
  }

  override finally(onFinally: () => any): Promise<any> {
    return this.toConfig().finally(onFinally)
  }
}
