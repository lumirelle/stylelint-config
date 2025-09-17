import type { Config as StylelintConfig } from 'stylelint'
import { mergeConfigs } from './merge'

/**
 * Using the magic promise to implement a chainable config composer, when accessing this composer, user will get the final config.
 */
export class ConfigComposer<T extends StylelintConfig = StylelintConfig> extends Promise<T> {
  constructor(private config: T) {
    super(() => {})
  }

  public override(config: T): ConfigComposer<T> {
    this.config = mergeConfigs(this.config, config)
    return this
  }

  public toConfig(): Promise<T> {
    return Promise.resolve(this.config)
  }

  // eslint-disable-next-line ts/explicit-function-return-type
  then(onFulfilled: (value: T) => any, onRejected?: (reason: any) => any) {
    return this.toConfig()
      .then(onFulfilled, onRejected)
  }

  // eslint-disable-next-line ts/explicit-function-return-type
  catch(onRejected: (reason: any) => any) {
    return this.toConfig().catch(onRejected)
  }

  // eslint-disable-next-line ts/explicit-function-return-type
  finally(onFinally: () => any) {
    return this.toConfig().finally(onFinally)
  }
}
