import { describe, expect, it, vi } from 'vitest'
import { lumirelle, resolvePackagePath } from '../src'
import { useCSSRules } from '../src/rules/css'
import { useSCSSRules } from '../src/rules/scss'
import { defaultConfig, defaultCSSConfig, defaultLessConfig, defaultSCSSConfig, defaultStylisticConfig, defaultVueConfig } from './configs/default-config'

// eslint-disable-next-line no-console
const originalConsole = console.log.bind(console)
// eslint-disable-next-line no-console
console.log = vi.fn((message: string, ...optionalParams: any[]) => {
  originalConsole(message, ...optionalParams)
})

function filterRules(rules: Record<string, any>, prefixes: string | string[]) {
  const prefixArray = Array.isArray(prefixes) ? prefixes : [prefixes]
  return Object.entries(rules).reduce((acc, [key, value]) => {
    if (!prefixArray.some(prefix => key.startsWith(prefix))) {
      acc[key] = value
    }
    return acc
  }, {} as Record<string, any>)
}

describe('factory config', () => {
  it('should log if in editor', async () => {
    const originalEnvCI = process.env.CI
    delete process.env.CI
    process.env.VSCODE_PID = '1234'
    expect(await lumirelle())
      .toEqual(defaultConfig)
    // eslint-disable-next-line no-console
    expect(console.log)
      .toHaveBeenCalledOnce()
    // eslint-disable-next-line no-console
    expect(console.log)
      .toHaveBeenCalledWith('[@lumirelle/stylelint-config] Detected running in editor.')
    if (originalEnvCI !== undefined)
      process.env.CI = originalEnvCI
    delete process.env.VSCODE_PID
  })

  it('should construct default config correctly', async () => {
    expect(await lumirelle())
      .toEqual(defaultConfig)
  })

  it('should construct config with user overrides correctly', async () => {
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

  it('should mix configs using .mix() method correctly', async () => {
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

  it('should construct config without stylistic rules correctly', async () => {
    expect(await lumirelle({
      stylistic: false,
    })).toEqual({
      ...defaultConfig,
      extends: defaultConfig.extends.filter(ext => ext !== resolvePackagePath('@stylistic/stylelint-config')),
      rules: filterRules(defaultConfig.rules, '@stylistic/'),
    })
  })

  it('should construct config without SCSS support correctly', async () => {
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

  it('should construct config with LESS but without SCSS correctly', async () => {
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

  it('should construct config with both LESS and SCSS correctly', async () => {
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

  it('should construct config without Vue support correctly', async () => {
    expect(await lumirelle({
      vue: false,
    })).toEqual({
      ...defaultConfig,
      overrides: [
        defaultSCSSConfig,
      ],
    })
  })

  it('should construct config without Vue but with LESS correctly', async () => {
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

  it('should construct config without SCSS and Vue but with LESS correctly', async () => {
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

  it('should construct config without property ordering correctly', async () => {
    expect(await lumirelle({
      ordered: false,
    })).toEqual({
      ...defaultConfig,
      extends: defaultConfig.extends.filter(ext => ext !== resolvePackagePath('stylelint-config-recess-order')),
      rules: filterRules(defaultConfig.rules, 'order/'),
    })
  })

  it('should construct config with less opinionated pattern rules correctly', async () => {
    expect(await lumirelle({
      lessOpinionated: {
        pattern: true,
      },
    })).toEqual({
      ...defaultConfig,
      rules: {
        ...defaultStylisticConfig.rules,
        ...useCSSRules({ pattern: true }),
      },
      overrides: [
        {
          ...defaultSCSSConfig,
          rules: useSCSSRules({ pattern: true }),
        },
        {
          ...defaultVueConfig,
          plugins: [resolvePackagePath('stylelint-scss')],
          rules: {
            ...useSCSSRules({ pattern: true }),
            ...defaultVueConfig.rules,
          },
        },
      ],
    })
  })

  it('should construct config with less opinionated maintainability rules correctly', async () => {
    expect(await lumirelle({
      lessOpinionated: {
        maintainability: true,
      },
    })).toEqual({
      ...defaultConfig,
      rules: {
        ...defaultStylisticConfig.rules,
        ...useCSSRules({ maintainability: true }),
      },
      overrides: [
        {
          ...defaultSCSSConfig,
          rules: useSCSSRules({ maintainability: true }),
        },
        {
          ...defaultVueConfig,
          plugins: [resolvePackagePath('stylelint-scss')],
          rules: {
            ...useSCSSRules({ maintainability: true }),
            ...defaultVueConfig.rules,
          },
        },
      ],
    })
  })

  it('should construct config with all less opinionated rules correctly', async () => {
    expect(await lumirelle({
      lessOpinionated: true,
    })).toEqual({
      ...defaultConfig,
      rules: {
        ...defaultStylisticConfig.rules,
        ...useCSSRules(true),
      },
      overrides: [
        {
          ...defaultSCSSConfig,
          rules: useSCSSRules(true),
        },
        {
          ...defaultVueConfig,
          plugins: [resolvePackagePath('stylelint-scss')],
          rules: {
            ...useSCSSRules(true),
            ...defaultVueConfig.rules,
          },
        },
      ],
    })
  })

  it('should construct config with all features enabled correctly', async () => {
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

  it('should construct config with all features disabled correctly', async () => {
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
