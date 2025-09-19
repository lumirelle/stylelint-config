import { describe, expect, it } from 'vitest'
import { lumirelle } from '../src/factory'
import { GLOB_EXCLUDE } from '../src/globs'
import { LESS_OPINIONATED_RULES } from '../src/rules'

const defaultConfig = {
  allowEmptyInput: true,
  extends: [
    '@stylistic/stylelint-config',
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue/scss',
    'stylelint-config-recess-order',
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
      rules: defaultConfig.rules,
    })
  })

  it('construct config without stylistic correctly', async () => {
    const factoryConfig = await lumirelle({
      stylistic: false,
    })
    expect(factoryConfig).toEqual({
      ...defaultConfig,
      extends: defaultConfig.extends.filter(ext => ext !== '@stylistic/stylelint-config'),
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
        if (ext === 'stylelint-config-standard-vue/scss') {
          acc.push('stylelint-config-standard-vue')
        }
        else if (ext !== 'stylelint-config-standard-scss') {
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
      extends: defaultConfig.extends.filter(ext => ext !== 'stylelint-config-standard-vue/scss'),
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
      extends: defaultConfig.extends.filter(ext => ext !== 'stylelint-config-standard-vue/scss' && ext !== 'stylelint-config-standard-scss'),
      rules: filterRules(defaultConfig.rules, ['scss/', 'vue/']),
    })
  })

  it('construct config without ordered correctly', async () => {
    const factoryConfig = await lumirelle({
      ordered: false,
    })
    expect(factoryConfig).toEqual({
      ...defaultConfig,
      extends: defaultConfig.extends.filter(ext => ext !== 'stylelint-config-recess-order'),
      rules: filterRules(defaultConfig.rules, 'order/'),
    })
  })

  it('construct config with less opinionated correctly', async () => {
    const factoryConfig = await lumirelle({
      lessOpinionated: true,
    })
    expect(factoryConfig).toEqual({
      ...defaultConfig,
      rules: {
        ...defaultConfig.rules,
        ...LESS_OPINIONATED_RULES.standard.reduce((acc, rule) => {
          acc[rule] = null
          return acc
        }, {} as Record<string, any>),
        ...LESS_OPINIONATED_RULES.scss.reduce((acc, rule) => {
          acc[rule] = null
          return acc
        }, {} as Record<string, any>),
      },
    })
  })

  it('construct config without all features correctly', async () => {
    const factoryConfig = await lumirelle({
      stylistic: false,
      scss: false,
      vue: false,
      ordered: false,
    })
    expect(factoryConfig).toEqual({
      ...defaultConfig,
      extends: defaultConfig.extends.filter(ext => ext === 'stylelint-config-standard'),
      rules: filterRules(defaultConfig.rules, ['scss/', 'vue/', '@stylistic/', 'order/']),
    })
  })
})
