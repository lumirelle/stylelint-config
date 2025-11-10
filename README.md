# @lumirelle/stylelint-config

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]

Lumirelle's StyleLint config. Easy to use, customizable, and works with CSS, SCSS, Vue, and Tailwind CSS.

## Install

```sh
npm install -D @lumirelle/stylelint-config
```

or

```sh
pnpm add -D @lumirelle/stylelint-config
```

## Usage

Use the exported helper function called `lumirelle` to construct your StyleLint configuration:

_stylelint.config.js_

```js
import { lumirelle } from '@lumirelle/stylelint-config'

export default lumirelle(
  /**
   * Options for generating StyleLint configuration.
   */
  {
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
    ignoreFiles: [
      'your-ignore-files'
    ],

    /**
     * Stylistic configuration. Powered by `stylelint-stylistic`.
     *
     * If set to `true`, it will use the default stylistic config as below.
     *
     * If you want to use `prettier` as the formatter, you can set it to `false` to disable the stylistic config.
     *
     * @default
     * {
     *   indent: 2,
     *   quotes: 'single',
     *   maxLineLength: 120,
     * }
     */
    stylistic: {
      indent: 2,
      quotes: 'single',
      maxLineLength: 120,
    },

    /**
     * Core rules. Can't be disabled.
     */
    css: true,

    /**
     * Enable SCSS support.
     *
     * As StyleLint doesn't support both SCSS and LESS in the same file (e.g. in a single `.vue` file), if you enable both
     * SCSS and LESS, only SCSS will take effect.
     *
     * @default auto-detect based on the dependencies if both SCSS and LESS are not enabled manually
     */
    scss: true,

    /**
     * Enable Less support.
     *
     * As StyleLint doesn't support both SCSS and LESS in the same file (e.g. in a single `.vue` file), if you enable both
     * SCSS and LESS, only SCSS will take effect.
     *
     * @default false
     */
    less: false,

    /**
     * Enable Tailwind CSS support.
     *
     * If enabled, StyleLint will not validate Tailwind CSS specific at-rules.
     *
     * @default false
     */
    tailwindcss: false,

    /**
     * Enable HTML support.
     *
     * @default true
     */
    html: true,

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
     *   - `selector-class-pattern`
     *   - `selector-id-pattern`
     * - Code "maintainability" rules:
     *   - `no-descending-specificity`
     *
     * @default false
     */
    lessOpinionated: {
      /**
       * Whether to disable pattern rules.
       */
      pattern: true,
      /**
       * Whether to disable maintainability rules.
       */
      maintainability: true,
    }
  },
  /**
   * Additional user-defined StyleLint configuration objects to mix.
   *
   * Both general and file-specific configuration objects are supported.
   *
   * @see [general config](https://stylelint.io/user-guide/configure)
   * @see [file-specific config](https://stylelint.io/user-guide/configure#overrides)
   */
  {
    // This is a general configuration object, which will be mixed into the final config directly.
    rules: {
      'selector-class-pattern': null,
    },
  },
  {
    // This is a file-specific configuration object, which will be mixed into the `overrides` section of the final config.
    files: ['**/*.scss'],
    rules: {
      'scss/at-if-closing-brace-space-after': null,
    },
  }
  // This just equivalent to passing the config objects to the `lumirelle` function like above.
).mix({
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
