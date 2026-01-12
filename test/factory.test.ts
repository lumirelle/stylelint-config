import { afterEach, beforeEach, describe, expect, it, spyOn } from 'bun:test'
import * as localPkg from 'local-pkg'
import * as semver from 'semver'
import { ConfigComposer, GLOB_EXCLUDE, lumirelle } from '../src'
import { css, html, less, ordered, scss, stylistic, tailwindcss, vue } from '../src/configs'
import * as utils from './../src/utils'

let spiedIsInEditorEnv: ReturnType<typeof spyOn<typeof utils, 'isInEditorEnv'>>
let spiedLog: ReturnType<typeof spyOn<typeof console, 'log'>>
let spiedWarn: ReturnType<typeof spyOn<typeof console, 'warn'>>
let spiedIsPackageExists: ReturnType<typeof spyOn<typeof localPkg, 'isPackageExists'>>
let spiedGte: ReturnType<typeof spyOn<typeof semver, 'gte'>>

beforeEach(() => {
  spiedIsInEditorEnv = spyOn(utils, 'isInEditorEnv')
  spiedLog = spyOn(console, 'log')
  spiedWarn = spyOn(console, 'warn')
  spiedIsPackageExists = spyOn(localPkg, 'isPackageExists')
  spiedGte = spyOn(semver, 'gte')
})

afterEach(() => {
  spiedIsInEditorEnv.mockRestore()
  spiedLog.mockRestore()
  spiedWarn.mockRestore()
  spiedIsPackageExists.mockRestore()
  spiedGte.mockRestore()
})

describe('factory config', () => {
  it('should log if in editor', async () => {
    spiedIsInEditorEnv.mockReturnValue(true)
    await lumirelle()
    expect(spiedLog).toBeCalledTimes(1)
    expect(spiedLog).toHaveBeenCalledWith('[@lumirelle/stylelint-config] Detected running in editor.')
  })

  it('should construct default config correctly', async () => {
    expect(await lumirelle()).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(false),
        html(true),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
        ordered(true),
      ),
    )
  })

  it('should construct config with user overrides correctly', async () => {
    const userConfigs = [
      { rules: { 'color-hex-case': 'upper' } },
      { rules: { 'color-hex-case': null } },
    ]
    const userOverrideConfigs = [
      { files: ['**/*.scss'], rules: { 'scss/dollar-variable-pattern': '^foo' } },
      { files: ['**/*.scss'], rules: { 'scss/dollar-variable-pattern': '^bar' } },
    ]
    expect(
      await lumirelle(
        {},
        ...userConfigs,
        ...userOverrideConfigs,
      ),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(false),
        html(true),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
        ordered(true),
        userConfigs[1],
        // `overrides` are processed by Stylelint itself
        { overrides: [userOverrideConfigs[0]] },
        { overrides: [userOverrideConfigs[1]] },
      ),
    )
  })

  it('should mix configs using .mix() method correctly', async () => {
    const userConfigs = [
      { rules: { 'color-hex-case': 'upper' } },
      { rules: { 'color-hex-case': null } },
    ]
    const userOverrideConfigs = [
      { files: ['**/*.scss'], rules: { 'scss/dollar-variable-pattern': '^foo' } },
      { files: ['**/*.scss'], rules: { 'scss/dollar-variable-pattern': '^bar' } },
    ]
    expect(
      await lumirelle()
        .mix(userConfigs[0])
        .mix(userConfigs[1])
        .mix(userOverrideConfigs[0])
        .mix(userOverrideConfigs[1]),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(false),
        html(true),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
        ordered(true),
        userConfigs[1],
        // `overrides` are processed by Stylelint itself
        { overrides: [userOverrideConfigs[0]] },
        { overrides: [userOverrideConfigs[1]] },
      ),
    )
  })

  it('should construct config with `css` forcibly enabled', async () => {
    expect(await lumirelle(
      { css: false as any },
    )).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(false),
        html(true),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
        ordered(true),
      ),
    )
  })

  it('should construct config with `scss` enabled', async () => {
    expect(
      await lumirelle(
        { scss: true },
      ),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(false),
        scss(true, false),
        html(true),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
        ordered(true),
      ),
    )
  })

  it('should construct config with `scss` dependency', async () => {
    spiedIsPackageExists.mockImplementation(pkg => pkg === 'sass')
    expect(
      await lumirelle(),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(false),
        scss(true, false),
        html(true),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
        ordered(true),
      ),
    )
  })

  it('should construct config with `less` enabled', async () => {
    expect(
      await lumirelle(
        { less: true },
      ),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(false),
        less(true, false, false),
        html(true),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
        ordered(true),
      ),
    )
  })

  it('should construct config with `less` enabled and `scss` dependency (`scss` is ignored)', async () => {
    spiedIsPackageExists.mockImplementation(pkg => pkg === 'sass' || pkg === 'postcss-less' || pkg === 'stylelint-less')
    expect(
      await lumirelle(
        { less: true },
      ),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(false),
        less(true, false, false),
        html(true),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
        ordered(true),
      ),
    )
  })

  it('should construct config with both `scss` and `less` enabled (`less` is ignored)', async () => {
    expect(
      await lumirelle(
        { scss: true, less: true },
      ),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(false),
        scss(true, false),
        html(true),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
        ordered(true),
      ),
    )
    expect(spiedWarn).toBeCalledTimes(1)
    expect(spiedWarn).toHaveBeenCalledWith('[@lumirelle/stylelint-config] You should not enable both SCSS and LESS support at the same time, LESS support is disabled.')
  })

  it('should construct config with `html` disabled', async () => {
    expect(
      await lumirelle(
        { html: false },
      ),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(false),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
        ordered(true),
      ),
    )
  })

  it('should construct config with `vue` enabled', async () => {
    expect(
      await lumirelle(
        { vue: true },
      ),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(false),
        html(true),
        vue(true, false, false, false),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
        ordered(true),
      ),
    )
  })

  it('should construct config with `vue` dependency', async () => {
    spiedIsPackageExists.mockImplementation(pkg => pkg === 'vue')
    expect(
      await lumirelle(),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(false),
        html(true),
        vue(true, false, false, false),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
        ordered(true),
      ),
    )
  })

  it('should construct config  with `vue` and `scss` enabled', async () => {
    expect(
      await lumirelle(
        { vue: true, scss: true },
      ),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(false),
        scss(true, false),
        html(true),
        vue(true, true, false, false),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
        ordered(true),
      ),
    )
  })

  it('should construct config  with `vue` and `less` enabled', async () => {
    expect(
      await lumirelle(
        { vue: true, less: true },
      ),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(false),
        html(true),
        less(true, false, false),
        vue(true, false, true, false),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
        ordered(true),
      ),
    )
  })

  it('should construct config with `tailwindcss` enabled', async () => {
    expect(
      await lumirelle(
        { tailwindcss: true },
      ),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(false),
        html(true),
        tailwindcss(true),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
        ordered(true),
      ),
    )
  })

  it('should construct config with `stylistic` disabled', async () => {
    expect(
      await lumirelle(
        { stylistic: false },
      ),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(false),
        html(true),
        ordered(true),
      ),
    )
  })

  it('should construct config with `ordered` disabled', async () => {
    expect(
      await lumirelle(
        { ordered: false },
      ),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(false),
        html(true),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
      ),
    )
  })

  it('should construct config with less opinionated pattern rules correctly', async () => {
    expect(
      await lumirelle(
        { lessOpinionated: { pattern: true } },
      ),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css({ pattern: true }),
        scss(false, { pattern: true }),
        html(true),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
        ordered(true),
      ),
    )
  })

  it('should construct config with less opinionated maintainability rules correctly', async () => {
    expect(
      await lumirelle(
        { lessOpinionated: { maintainability: true } },
      ),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css({ maintainability: true }),
        scss(false, { maintainability: true }),
        html(true),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
        ordered(true),
      ),
    )
  })

  it('should construct config with all less opinionated rules correctly', async () => {
    expect(
      await lumirelle(
        { lessOpinionated: true },
      ),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(true),
        scss(false, true),
        html(true),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
        ordered(true),
      ),
    )
  })

  it('should construct config with all features enabled correctly', async () => {
    expect(
      await lumirelle(
        {
          scss: true,
          less: true,
          html: true,
          vue: true,
          tailwindcss: true,
          stylistic: true,
          ordered: true,
        },
      ),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(false),
        scss(true, false),
        html(true),
        vue(true, true, true, false),
        tailwindcss(true),
        stylistic({ indent: 2, quotes: 'single', maxLineLength: 120 }),
        ordered(true),
      ),
    )
  })

  it('should construct config with all features disabled correctly', async () => {
    expect(
      await lumirelle(
        {
          stylistic: false,
          scss: false,
          html: false,
          vue: false,
          less: false,
          tailwindcss: false,
          ordered: false,
        },
      ),
    ).toEqual(
      await new ConfigComposer(
        { allowEmptyInput: true, ignoreFiles: GLOB_EXCLUDE },
        css(false),
      ),
    )
  })
})
