import type { Awaitable } from '@antfu/utils'
import type { StylelintConfig, StylelintOverrideConfig } from './types'
import { defu } from './defu'

/**
 * Using the magic promise to implement a chainable config composer, when accessing this composer, user will get the final config.
 */
export class ConfigComposer extends Promise<StylelintConfig | StylelintOverrideConfig> {
  private _operations: ((config: StylelintConfig) => Promise<StylelintConfig>)[] = []

  constructor(...configs: Awaitable<StylelintConfig | StylelintOverrideConfig>[]) {
    super(() => {})

    if (configs.length > 0)
      this.mix(...configs)
  }

  /**
   * Mix the provided config, which will merge into the existing config.
   */
  public mix(...configs: Awaitable<StylelintConfig | StylelintOverrideConfig>[]): ConfigComposer {
    const promises = Promise.all(configs)
    this._operations.push(async (config) => {
      const resolved = (await promises).flat().filter(Boolean)
      let result: StylelintConfig = config
      for (const toMerge of resolved) {
        if ('files' in toMerge)
          result = defu({ overrides: [toMerge] }, result)
        else
          result = defu(toMerge, result)
      }
      return result
    })
    return this
  }

  /**
   * Resolve the pipeline and return the final config.
   *
   * This returns a promise. Calling `.then()` has the same effect.
   */
  public async toConfig(): Promise<StylelintConfig> {
    let config: StylelintConfig = {}
    for (const operation of this._operations)
      config = await operation(config)
    return config
  }

  override then(onFulfilled: (value: StylelintConfig) => any, onRejected?: (reason: any) => any): Promise<any> {
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
