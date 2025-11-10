import type { ElementOf } from '@antfu/utils'
import type { Config } from 'stylelint'

/* --------------------------------- Config --------------------------------- */

/**
 * General StyleLint configuration.
 */
export type StylelintConfig = Config

/**
 * StyleLint configuration for specific files.
 */
export type StylelintOverrideConfig = ElementOf<NonNullable<StylelintConfig['overrides']>>

export interface StylisticConfig {
  /**
   * The indentation level to use.
   *
   * @default 2
   * @see [stylelint-stylistic](https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/indentation/README.md)
   * @see [prettier](https://prettier.io/docs/options#tab-width)
   */
  indent?: number | 'tab'
  /**
   * The quotes to use.
   *
   * @default 'single'
   * @see [stylelint-stylistic](https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/string-quotes/README.md)
   * @see [prettier](https://prettier.io/docs/options#quotes)
   */
  quotes?: 'single' | 'double'
  /**
   * The maximum line length to use.
   *
   * @default 120
   * @see [stylelint-stylistic](https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/max-line-length/README.md)
   * @see [prettier](https://prettier.io/docs/options#print-width)
   */
  maxLineLength?: number
}

/* --------------------------------- Options -------------------------------- */

/**
 * Options for formatter configuration.
 */
export type OptionsFormatter = 'prettier' | 'stylistic'

/**
 * Options to opinionated rules.
 */
export interface OptionsOpinionated {
  /**
   * Whether to disable pattern rules.
   */
  pattern?: boolean
  /**
   * Whether to disable maintainability rules.
   */
  maintainability?: boolean
}

/**
 * Options for generating StyleLint configuration.
 */
export interface OptionsConfig {
  /**
   * Files to ignore, same as `.stylelintignore`.
   *
   * Notice that, StyleLint use `micromatch` to match the files, the behavior is different from another widely used glob
   * package `tinyglobby`.
   *
   * @default GLOB_EXCLUDE
   * @see [micromatch](https://github.com/micromatch/micromatch)
   * @see [tinyglobby](https://github.com/SuperchupuDev/tinyglobby)
   * @see [GLOB_EXCLUDE](https://github.com/lumirelle/stylelint-config/blob/main/src/globs.ts#L6)
   */
  ignoreFiles?: string | string[]

  /**
   * Use custom formatter to format the styles file. Currently support `stylistic` (powered by stylelint-stylistic) and
   * `prettier` (powered by stylelint-prettier).
   *
   * If set to `true`, it will use `stylelint-stylistic` as the formatter.
   *
   * Because `stylelint-prettier` is not available for HTML-like files, so it is recommended to use `stylistic`
   * formatter.
   *
   * @default 'stylistic'
   * @see [stylelint-stylistic](https://github.com/stylelint-stylistic/stylelint-config#readme)
   * @see [stylelint-prettier](https://github.com/prettier/stylelint-prettier)
   * @see [stylelint-prettier issues: Ignored vue file style block?](https://github.com/prettier/stylelint-prettier/issues/322)
   */
  formatter?: boolean | OptionsFormatter

  /**
   * Stylistic configuration.
   *
   * @default
   * {
   *   indent: 2,
   *   quotes: 'single',
   *   maxLineLength: 120,
   * }
   */
  stylistic?: StylisticConfig

  /**
   * Core rules. Can't be disabled.
   */
  css?: true

  /**
   * Enable SCSS support.
   *
   * @default auto-detect based on the dependencies
   */
  scss?: boolean

  /**
   * Enable Tailwind CSS support.
   *
   * If enabled, StyleLint will not validate Tailwind CSS specific at-rules.
   *
   * @default false
   */
  tailwindcss?: boolean

  /**
   * Enable HTML support.
   *
   * @default true
   */
  html?: boolean

  /**
   * Enable Vue support.
   *
   * @default auto-detect based on the dependencies
   */
  vue?: boolean

  /**
   * Whether to order the stylesheet properties. Powered by `stylelint-config-recess-order`.
   *
   * @default true
   * @see https://github.com/stormwarning/stylelint-config-recess-order
   */
  ordered?: boolean

  /**
   * Disable some opinionated rules to standard preference.
   *
   * You can also specify which category of rules to disable by providing an object with the category names as keys.
   *
   * Rules affected:
   *
   * - Symbol "pattern" rules:
   *   - `selector-class-pattern`
   *   - `selector-id-pattern`
   * - Code "maintainability" rules:
   *   - `no-descending-specificity`
   *
   * @default false
   */
  lessOpinionated?: boolean | OptionsOpinionated
}
