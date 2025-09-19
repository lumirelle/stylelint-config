import type { Config as StylelintConfig } from 'stylelint'

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

  /**
   * Disable some opinionated rules to standard preference.
   *
   * Core rules affected:
   *
   * - Symbol pattern rules:
   *   - `custom-property-pattern`
   *   - `keyframes-name-pattern`
   *   - `selector-class-pattern`
   *   - `selector-id-pattern`
   * - Code cleanliness rules:
   *   - `block-no-empty`
   *   - `no-empty-source`
   * - Code maintainability rules:
   *   - `no-descending-specificity`
   *
   * SCSS rules affected:
   *
   * - Symbol pattern rules:
   *   - `scss/at-mixin-pattern`
   *   - `scss/dollar-variable-pattern`
   * - Code cleanliness rules:
   *   - `scss/load-no-partial-leading-underscore`
   *   - `scss/operator-no-unspaced`
   * - Code maintainability rules:
   *   - `scss/at-extend-no-missing-placeholder`
   *   - `scss/no-global-function-names`
   *
   * @default false
   */
  lessOpinionated?: boolean
}

export interface OptionsStylelint extends Pick<StylelintConfig, 'allowEmptyInput' | 'ignoreFiles'> {
  /**
   * If true, Stylelint does not throw an error when the glob pattern matches no files.
   *
   * This is an meaningless option and Stylelint set it to `false` by default, which may causes command line error just
   * because it found that there are no input files to lint.
   *
   * So I set it to `true` by default here.
   *
   * @default true
   * @see [allowEmptyInput](https://stylelint.io/user-guide/configure/#allowemptyinput)
   */
  allowEmptyInput?: boolean

  /**
   * Files to ignore, same as `.stylelintignore`.
   *
   * Stylelint use `micromatch` to match the files.
   *
   * @default GLOB_EXCLUDE
   * @see [micromatch](https://github.com/micromatch/micromatch)
   * @see [GLOB_EXCLUDE](https://github.com/lumirelle/stylelint-config/blob/main/src/globs.ts#L6)
   */
  ignoreFiles?: string | string[]
}
