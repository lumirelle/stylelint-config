# @lumirelle/stylelint-config

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Lumirelle's Stylelint config.

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
   * Options to generate the configuration
   */
  {
  /**
   * This is an meaningless option and Stylelint set it to `false` by default, which may causes command line error just
   * because it found that there are no input files to lint.
   *
   * So I set it to `true` by default here.
   *
   * @default true
   */
    allowEmptyInput: true,

    /**
     * Files to ignore, same as `.stylelintignore`.
     *
     * NOTE: Stylelint use `micromatch` to match the files.
     *
     * @see https://github.com/micromatch/micromatch
     */
    ignoreFiles: [
      'your-ignore-files'
    ],

    /**
     * Enable stylistic rules.
     *
     * @see https://github.com/stylelint-stylistic/stylelint-config#readme
     * @default true
     */
    stylistic: true,

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
  },
  /**
   * Additional user-defined Stylelint configuration objects to merge
   */
  {
    // Your custom Stylelint configuration
  }
)
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

[npm-version-src]: https://img.shields.io/npm/v/@lumirelle/stylelint-config?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@lumirelle/stylelint-config
[npm-downloads-src]: https://img.shields.io/npm/dm/@lumirelle/stylelint-config?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@lumirelle/stylelint-config
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@lumirelle/stylelint-config?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@lumirelle/stylelint-config
[license-src]: https://img.shields.io/github/license/lumirelle/stylelint-config.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/lumirelle/stylelint-config/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@lumirelle/stylelint-config
