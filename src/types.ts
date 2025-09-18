export type Awaitable<T> = T | Promise<T>

export interface OptionsConfig {
  /**
   * Enable stylistic rules.
   *
   * @see https://github.com/stylelint-stylistic/stylelint-config#readme
   * @default true
   */
  stylistic?: boolean

  /**
   * Core rules. Can't be disabled.
   */
  standard?: true

  /**
   * Enable SCSS support.
   *
   * @default auto-detect based on the dependencies
   */
  scss?: boolean

  /**
   * Enable Vue support.
   *
   * @default auto-detect based on the dependencies
   */
  vue?: boolean

  /**
   * Whether to order the stylesheet properties. Powered by `stylelint-config-recess-order`.
   *
   * @see https://github.com/stormwarning/stylelint-config-recess-order
   * @default true
   */
  ordered?: boolean
}
