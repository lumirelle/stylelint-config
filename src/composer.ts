import type { Config as StylelintConfig } from 'stylelint'

type StylelintConfigOverride = StylelintConfig['overrides'] extends ((infer U)[] | undefined) ? U : never

/**
 * Using the magic promise to implement a chainable config composer, when accessing this composer, user will get the final config.
 */
export class ConfigComposer<T extends StylelintConfig = StylelintConfig> extends Promise<T> {
  constructor(private config: T) {
    super(() => {})
  }

  /**
   * The config provided will be passed to the `overrides` array.
   */
  public override(config: StylelintConfigOverride): ConfigComposer<T> {
    if (config) {
      this.config.overrides = [
        ...(this.config.overrides ?? []),
        config,
      ]
    }
    return this
  }

  /**
   * The config provided will be passed to the `overrides` array.
   *
   * Support multiple overrides at once.
   */
  public overrides(config: StylelintConfigOverride[]): ConfigComposer<T> {
    if (config) {
      this.config.overrides = [
        ...(this.config.overrides ?? []),
        ...config,
      ]
    }
    return this
  }

  /**
   * Resolve the pipeline and return the final config.
   *
   * This returns a promise. Calling `.then()` has the same effect.
   */
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
