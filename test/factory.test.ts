import { describe, expect, it } from 'vitest'
import { lumirelle, resolvePackagePath } from '../src'
import { mergeConfigs } from '../src/factory'
import { defaultConfig, defaultCSSConfig, defaultLessConfig, defaultSCSSConfig, defaultVueConfig } from './configs/default-config'

function filterRules(rules: Record<string, any>, prefixes: string | string[]) {
  const prefixArray = Array.isArray(prefixes) ? prefixes : [prefixes]
  return Object.entries(rules).reduce((acc, [key, value]) => {
    if (!prefixArray.some(prefix => key.startsWith(prefix))) {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, any>)
}

describe('should', () => {
  it('merged config correctly', async () => {
    expect(mergeConfigs([
      {
        files: ['**/*.scss'],
        rules: {
          test: true,
        },
      },
      {
        rules: {
          test: null,
          test2: true,
        },
      },
    ]))
      .toEqual({
        rules: {
          test: null,
          test2: true,
        },
        overrides: [
          {
            files: ['**/*.scss'],
            rules: {
              test: true,
            },
          },
        ],
      })
  })

  it('construct default config correctly', async () => {
    expect(await lumirelle())
      .toEqual(defaultConfig)
  })

  it('construct user configs correctly', async () => {
    expect(await lumirelle(
      {},
      {
        rules: {
          'color-hex-case': 'upper',
        },
      },
      {
        rules: {
          'color-hex-case': null,
        },
      },
      {
        files: ['**/*.scss'],
        rules: {
          'scss/dollar-variable-pattern': '^foo',
        },
      },
    ),
    ).toEqual({
      ...defaultConfig,
      overrides: [
        ...defaultConfig.overrides,
        {
          files: ['**/*.scss'],
          rules: {
            'scss/dollar-variable-pattern': '^foo',
          },
        },
      ],
      rules: {
        ...defaultConfig.rules,
        'color-hex-case': null,
      },
    })
  })

  it('mix config correctly', async () => {
    expect(await lumirelle()
      .mix({
        rules: {
          'color-hex-case': 'upper',
        },
      })
      .mix({
        rules: {
          'color-hex-case': null,
        },
      })
      .mix({
        files: ['**/*.scss'],
        rules: {
          'scss/dollar-variable-pattern': '^foo',
        },
      }),
    ).toEqual({
      ...defaultConfig,
      overrides: [
        ...defaultConfig.overrides,
        {
          files: ['**/*.scss'],
          rules: {
            'scss/dollar-variable-pattern': '^foo',
          },
        },
      ],
      rules: {
        ...defaultConfig.rules,
        'color-hex-case': null,
      },
    })
  })

  it('construct config without stylistic correctly', async () => {
    expect(await lumirelle({
      stylistic: false,
    })).toEqual({
      ...defaultConfig,
      extends: defaultConfig.extends.filter(ext => ext !== resolvePackagePath('@stylistic/stylelint-config')),
      rules: filterRules(defaultConfig.rules, '@stylistic/'),
    })
  })

  it('construct config without SCSS correctly', async () => {
    const factoryConfig = await lumirelle({
      scss: false,
    })
    expect(factoryConfig).toEqual({
      ...defaultConfig,
      overrides: [
        {
          ...defaultVueConfig, // Vue override
          plugins: undefined,
          rules: {
            ...defaultCSSConfig.rules,
            ...defaultVueConfig.rules,
            'declaration-property-value-no-unknown': [
              true,
              { ignoreProperties: { '/.*/': '/v-bind\\(.+\\)/' } },
            ],
            'function-no-unknown': [
              true,
              { ignoreFunctions: ['v-bind'] },
            ],
          },
        },
      ],
    })
  })

  it('construct config with LESS but SCSS correctly', async () => {
    const factoryConfig = await lumirelle({
      scss: false,
      less: true,
    })
    expect(factoryConfig).toEqual({
      ...defaultConfig,
      overrides: [
        defaultLessConfig,
        {
          ...defaultVueConfig, // Vue override
          plugins: [resolvePackagePath('stylelint-less')],
          rules: {
            ...defaultLessConfig.rules,
            ...defaultVueConfig.rules,
          },
        },
      ],
    })
  })

  it('construct config with LESS and SCSS correctly', async () => {
    const factoryConfig = await lumirelle({
      less: true,
      scss: true,
    })
    expect(factoryConfig).toEqual({
      ...defaultConfig,
      overrides: [
        defaultSCSSConfig,
        {
          ...defaultVueConfig, // Vue override
          plugins: [
            resolvePackagePath('stylelint-scss'),
          ],
          rules: {
            ...defaultSCSSConfig.rules,
            ...defaultVueConfig.rules,
          },
        },
      ],
    })
  })

  it('construct config without Vue correctly', async () => {
    expect(await lumirelle({
      vue: false,
    })).toEqual({
      ...defaultConfig,
      overrides: [
        defaultSCSSConfig,
      ],
    })
  })

  it('construct config without Vue but LESS correctly', async () => {
    expect(await lumirelle({
      vue: false,
      less: true,
    })).toEqual({
      ...defaultConfig,
      overrides: [
        defaultLessConfig,
      ],
    })
  })

  it('construct config without SCSS & Vue but LESS correctly', async () => {
    expect(await lumirelle({
      scss: false,
      vue: false,
      less: true,
    })).toEqual({
      ...defaultConfig,
      // extends: defaultConfig.extends.filter(ext => ext !== resolvePackagePath('stylelint-config-standard-vue/scss')),
      rules: filterRules(defaultConfig.rules, ['scss/', 'vue/']),
      overrides: [
        defaultLessConfig,
      ],
    })
  })

  it('construct config without ordered correctly', async () => {
    expect(await lumirelle({
      ordered: false,
    })).toEqual({
      ...defaultConfig,
      extends: defaultConfig.extends.filter(ext => ext !== resolvePackagePath('stylelint-config-recess-order')),
      rules: filterRules(defaultConfig.rules, 'order/'),
    })
  })

  it('construct config with less opinionated pattern correctly', async () => {
    expect(await lumirelle({
      lessOpinionated: {
        pattern: true,
      },
    })).toEqual({
      ...defaultConfig,
      rules: {
        ...defaultConfig.rules,
        'selector-class-pattern': null,
        'selector-id-pattern': null,
      },
    })
  })

  it('construct config with less opinionated maintainability correctly', async () => {
    expect(await lumirelle({
      lessOpinionated: {
        maintainability: true,
      },
    })).toEqual({
      ...defaultConfig,
      rules: {
        ...defaultConfig.rules,
        'no-descending-specificity': null,
      },
    })
  })

  it('construct config with less opinionated all correctly', async () => {
    expect(await lumirelle({
      lessOpinionated: true,
    })).toEqual({
      ...defaultConfig,
      rules: {
        ...defaultConfig.rules,
        'selector-class-pattern': null,
        'selector-id-pattern': null,
        'no-descending-specificity': null,
      },
    })
  })

  it('construct config with all features correctly', async () => {
    expect(await lumirelle({
      stylistic: true,
      scss: true,
      less: true,
      vue: true,
      ordered: true,
    })).toEqual({
      ...defaultConfig,
      overrides: [
        defaultSCSSConfig,
        {
          ...defaultVueConfig, // Vue override
          plugins: [
            resolvePackagePath('stylelint-scss'),
          ],
          rules: {
            ...defaultSCSSConfig.rules,
            ...defaultVueConfig.rules,
          },
        },
      ],
    })
  })

  it('construct config without all features correctly', async () => {
    expect(await lumirelle({
      stylistic: false,
      scss: false,
      vue: false,
      less: false,
      ordered: false,
    })).toEqual({
      ...defaultConfig,
      extends: [
        // resolvePackagePath('stylelint-config-standard'),
        resolvePackagePath('stylelint-config-html'),
      ],
      rules: filterRules(defaultConfig.rules, ['scss/', 'vue/', '@stylistic/', 'order/']),
      overrides: undefined,
    })
  })
})
