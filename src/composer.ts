import type { StylelintConfig, StylelintOverrideConfig } from './types'
import { defu } from './defu'

/**
 * Using the magic promise to implement a chainable config composer, when accessing this composer, user will get the final config.
 */
export class ConfigComposer extends Promise<StylelintConfig> {
  constructor(private config: StylelintConfig) {
    super(() => {})
  }

  /**
   * Mix the provided config, which will merge into the existing config.
   */
  public mix(config: StylelintConfig | StylelintOverrideConfig): ConfigComposer {
    // Override config
    if ('files' in config) {
      this.config = defu({ overrides: [config] }, this.config)
    }
    // General config
    else {
      this.config = defu(config, this.config)
    }
    return this
  }

  /**
   * Resolve the pipeline and return the final config.
   *
   * This returns a promise. Calling `.then()` has the same effect.
   */
  public toConfig(): Promise<StylelintConfig> {
    return Promise.resolve(this.config)
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
