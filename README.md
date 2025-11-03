# @lumirelle/stylelint-config

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

Lumirelle's Stylelint config. Easy to use, customizable, and works with CSS, SCSS, Vue, and Tailwind CSS.

## Install

```sh
npm install -D @lumirelle/stylelint-config
```

or

```sh
pnpm add -D @lumirelle/stylelint-config
```

## Usage

Use the exported helper function called `lumirelle` to construct your Stylelint configuration:

_stylelint.config.js_

```js
import { lumirelle } from '@lumirelle/stylelint-config'

export default lumirelle(
  /**
   * Options for generating Stylelint configuration.
   */
  {
  /**
   * If `true`, Stylelint does not throw an error when there are no input files to lint.
   *
   * This is an meaningless option and Stylelint set it to `false` by default, which may causes command line error just
   * because it found that there are no input files to lint.
   *
   * So I set it to `true` by default here.
   *
   * @default true
   * @see [allowEmptyInput](https://stylelint.io/user-guide/configure/#allowemptyinput)
   */
    allowEmptyInput: true,

    /**
     * Files to ignore, same as `.stylelintignore`.
     *
     * Notice that, Stylelint use `micromatch` to match the files, the behavior is different from another widely used glob
     * package `tinyglobby`.
     *
     * @default GLOB_EXCLUDE
     * @see [micromatch](https://github.com/micromatch/micromatch)
     * @see [tinyglobby](https://github.com/SuperchupuDev/tinyglobby)
     * @see [GLOB_EXCLUDE](https://github.com/lumirelle/stylelint-config/blob/main/src/globs.ts#L6)
     */
    ignoreFiles: [
      'your-ignore-files'
    ],

    /**
     * Use custom formatter to format the styles file. Currently support `stylistic` and `prettier`.
     *
     * If set to `true`, it will use `stylistic` as the formatter.
     *
     * @default 'stylistic'
     * @see [stylelint-stylistic](https://github.com/stylelint-stylistic/stylelint-config#readme)
     * @see [stylelint-prettier](https://github.com/prettier/stylelint-prettier)
     */
    formatter: false,

    /**
     * Core rules. Can't be disabled.
     */
    standard: true,

    /**
     * Enable SCSS support.
     *
     * @default auto-detect based on the dependencies
     */
    scss: true,

    /**
     * Tailwind CSS support. Let Stylelint do not validate Tailwind specific at-rules.
     *
     * @default false
     */
    tailwindcss: false,

    /**
     * Enable Vue support.
     *
     * @default auto-detect based on the dependencies
     */
    vue: true,

    /**
     * Whether to order the stylesheet properties. Powered by `stylelint-config-recess-order`.
     *
     * @see https://github.com/stormwarning/stylelint-config-recess-order
     * @default true
     */
    ordered: true,

    /**
     * Disable some opinionated rules to standard preference.
     *
     * You can also specify which category of rules to disable by providing an object with the category names as keys.
     *
     * Rules affected:
     *
     * - Symbol "pattern" rules:
     *   - `custom-property-pattern`
     *   - `keyframes-name-pattern`
     *   - `selector-class-pattern`
     *   - `selector-id-pattern`
     *   - `scss/at-mixin-pattern`
     *   - `scss/dollar-variable-pattern`
     * - Code "cleanliness" rules:
     *   - `block-no-empty`
     *   - `no-empty-source`
     *   - `scss/load-no-partial-leading-underscore`
     *   - `scss/operator-no-unspaced`
     * - Code "maintainability" rules:
     *   - `no-descending-specificity`
     *   - `scss/at-extend-no-missing-placeholder`
     *   - `scss/no-global-function-names`
     *
     * @default false
     */
    lessOpinionated: {
      /**
       * Whether to disable pattern rules.
       */
      pattern: true,
      /**
       * Whether to disable cleanliness rules.
       */
      cleanliness: true,
      /**
       * Whether to disable maintainability rules.
       */
      maintainability: true,
    }
  },
  /**
   * Additional user-defined Stylelint configuration objects to merge.
   *
   * Both general and file-specific configuration objects are supported.
   */
  {
    // This is a general configuration object, which will be merged into the final config directly.
    rules: {
      'selector-class-pattern': null,
    },
  },
  {
    // This is a file-specific configuration object, which will be merged into the `overrides` section of the final config.
    files: ['**/*.scss'],
    rules: {
      'scss/at-if-closing-brace-space-after': null,
    },
  }
  // This just equivant to passing the config objects to the `lumirelle` function like above.
).append({
  rules: {
    'selector-class-pattern': null,
  },
})
```

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/lumirelle/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/lumirelle/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © [Lumirelle](https://github.com/lumirelle)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@lumirelle/stylelint-config?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/@lumirelle/stylelint-config
[npm-downloads-src]: https://img.shields.io/npm/dm/@lumirelle/stylelint-config?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/@lumirelle/stylelint-config
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@lumirelle/stylelint-config?style=flat&colorA=18181B&colorB=F0DB4F&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@lumirelle/stylelint-config
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=18181B&colorB=F0DB4F
[jsdocs-href]: https://www.jsdocs.io/package/@lumirelle/stylelint-config
[codecov-src]: https://img.shields.io/codecov/c/gh/lumirelle/stylelint-config/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/lumirelle/stylelint-config
[license-src]: https://img.shields.io/github/license/lumirelle/stylelint-config.svg?style=flat&colorA=18181B&colorB=F0DB4F
[license-href]: https://github.com/lumirelle/stylelint-config/blob/main/LICENSE
