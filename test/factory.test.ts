import { describe, expect, it } from 'vitest'
import { lumirelle } from '../src/factory'
import { GLOB_EXCLUDE } from '../src/globs'
import { resolvePackagePath } from '../src/resolve'
import { LESS_OPINIONATED_RULES } from '../src/rules'

const defaultConfig = {
  allowEmptyInput: true,
  extends: [
    resolvePackagePath('@stylistic/stylelint-config'),
    resolvePackagePath('stylelint-config-standard'),
    resolvePackagePath('stylelint-config-standard-scss'),
    resolvePackagePath('stylelint-config-html'),
    resolvePackagePath('stylelint-config-standard-vue/scss'),
    resolvePackagePath('stylelint-config-recess-order'),
  ],
  ignoreFiles: [
    ...GLOB_EXCLUDE,
  ],
  rules: {
    '@stylistic/max-line-length': null,

    'scss/at-if-closing-brace-space-after': null,
    'scss/at-if-closing-brace-newline-after': null,
    'scss/at-else-closing-brace-newline-after': null,
    'scss/at-else-closing-brace-space-after': null,
  },
}

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
  it('construct default config correctly', async () => {
    const factoryConfig = await lumirelle()
    expect(factoryConfig).toEqual(defaultConfig)
  })

  it('construct user configs correctly', async () => {
    const factoryConfig = await lumirelle(
      {},
      {
        rules: {
          'color-hex-case': 'upper',
        },
      },
    )
    expect(factoryConfig).toEqual({
      ...defaultConfig,
      rules: {
        ...defaultConfig.rules,
        'color-hex-case': 'upper',
      },
    })
  })

  it('construct overridden config correctly', async () => {
    const factoryConfig = await lumirelle()
      .overrides([
        {
          files: ['**/*.scss'],
          rules: {
            'scss/dollar-variable-pattern': '^foo',
          },
        },
      ])
    expect(factoryConfig).toEqual({
      ...defaultConfig,
      overrides: [
        {
          files: ['**/*.scss'],
          rules: {
            'scss/dollar-variable-pattern': '^foo',
          },
        },
      ],
    })
  })

  it('construct config with formatter prettier correctly', async () => {
    const factoryConfig = await lumirelle({
      formatter: 'prettier',
    })
    expect(factoryConfig).toEqual({
      ...defaultConfig,
      extends: [
        resolvePackagePath('stylelint-prettier/recommended'),
        ...defaultConfig.extends.filter(ext => ext !== resolvePackagePath('@stylistic/stylelint-config')),
      ],
      rules: filterRules(defaultConfig.rules, '@stylistic/'),
    })
  })

  it('construct config without formatter correctly', async () => {
    const factoryConfig = await lumirelle({
      formatter: false,
    })
    expect(factoryConfig).toEqual({
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
      extends: defaultConfig.extends.reduce((acc, ext) => {
        if (ext === resolvePackagePath('stylelint-config-standard-vue/scss')) {
          acc.push(resolvePackagePath('stylelint-config-standard-vue'))
        }
        else if (ext !== resolvePackagePath('stylelint-config-standard-scss')) {
          acc.push(ext)
        }
        return acc
      }, [] as string[]),
      rules: filterRules(defaultConfig.rules, 'scss/'),
    })
  })

  it('construct config without Vue correctly', async () => {
    const factoryConfig = await lumirelle({
      vue: false,
    })
    expect(factoryConfig).toEqual({
      ...defaultConfig,
      extends: defaultConfig.extends.filter(ext => ext !== resolvePackagePath('stylelint-config-standard-vue/scss')),
      rules: filterRules(defaultConfig.rules, 'vue/'),
    })
  })

  it('construct config without SCSS & Vue correctly', async () => {
    const factoryConfig = await lumirelle({
      scss: false,
      vue: false,
    })
    expect(factoryConfig).toEqual({
      ...defaultConfig,
      extends: defaultConfig.extends.filter(ext => ext !== resolvePackagePath('stylelint-config-standard-vue/scss') && ext !== resolvePackagePath('stylelint-config-standard-scss')),
      rules: filterRules(defaultConfig.rules, ['scss/', 'vue/']),
    })
  })

  it('construct config without ordered correctly', async () => {
    const factoryConfig = await lumirelle({
      ordered: false,
    })
    expect(factoryConfig).toEqual({
      ...defaultConfig,
      extends: defaultConfig.extends.filter(ext => ext !== resolvePackagePath('stylelint-config-recess-order')),
      rules: filterRules(defaultConfig.rules, 'order/'),
    })
  })

  it('construct config with less opinionated pattern correctly', async () => {
    const factoryConfig = await lumirelle({
      lessOpinionated: {
        pattern: true,
      },
    })
    const disabledRules = [
      ...LESS_OPINIONATED_RULES.standard.pattern,
      ...LESS_OPINIONATED_RULES.scss.pattern,
    ]
    expect(factoryConfig).toEqual({
      ...defaultConfig,
      rules: {
        ...defaultConfig.rules,
        ...disabledRules.reduce((acc, rule) => {
          acc[rule] = null
          return acc
        }, {} as Record<string, null>),
      },
    })
  })

  it('construct config with less opinionated cleanliness correctly', async () => {
    const factoryConfig = await lumirelle({
      lessOpinionated: {
        cleanliness: true,
      },
    })
    const disabledRules = [
      ...LESS_OPINIONATED_RULES.standard.cleanliness,
      ...LESS_OPINIONATED_RULES.scss.cleanliness,
    ]
    expect(factoryConfig).toEqual({
      ...defaultConfig,
      rules: {
        ...defaultConfig.rules,
        ...disabledRules.reduce((acc, rule) => {
          acc[rule] = null
          return acc
        }, {} as Record<string, null>),
      },
    })
  })

  it('construct config with less opinionated maintainability correctly', async () => {
    const factoryConfig = await lumirelle({
      lessOpinionated: {
        maintainability: true,
      },
    })
    const disabledRules = [
      ...LESS_OPINIONATED_RULES.standard.maintainability,
      ...LESS_OPINIONATED_RULES.scss.maintainability,
    ]
    expect(factoryConfig).toEqual({
      ...defaultConfig,
      rules: {
        ...defaultConfig.rules,
        ...disabledRules.reduce((acc, rule) => {
          acc[rule] = null
          return acc
        }, {} as Record<string, null>),
      },
    })
  })

  it('construct config with less opinionated all correctly', async () => {
    const factoryConfig = await lumirelle({
      lessOpinionated: true,
    })
    const disabledRules = [
      ...LESS_OPINIONATED_RULES.standard.pattern,
      ...LESS_OPINIONATED_RULES.standard.cleanliness,
      ...LESS_OPINIONATED_RULES.standard.maintainability,
      ...LESS_OPINIONATED_RULES.scss.pattern,
      ...LESS_OPINIONATED_RULES.scss.cleanliness,
      ...LESS_OPINIONATED_RULES.scss.maintainability,
    ]
    expect(factoryConfig).toEqual({
      ...defaultConfig,
      rules: {
        ...defaultConfig.rules,
        ...disabledRules.reduce((acc, rule) => {
          acc[rule] = null
          return acc
        }, {} as Record<string, null>),
      },
    })
  })

  it('construct config without all features correctly', async () => {
    const factoryConfig = await lumirelle({
      formatter: false,
      scss: false,
      vue: false,
      ordered: false,
    })
    expect(factoryConfig).toEqual({
      ...defaultConfig,
      extends: [
        resolvePackagePath('stylelint-config-standard'),
        resolvePackagePath('stylelint-config-html'),
      ],
      rules: filterRules(defaultConfig.rules, ['scss/', 'vue/', '@stylistic/', 'order/']),
    })
  })
})
