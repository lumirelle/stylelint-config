import type { StylelintConfig, StylelintOverrideConfig } from '../types'
import { getPackageInfoSync } from 'local-pkg'
import semver from 'semver'
import { resolvePackagePath } from '../resolve'
import { useCSSRules } from '../rules/css'
import { useLessRules } from '../rules/less'
import { useSCSSRules } from '../rules/scss'

export async function vue(options: boolean, scss: boolean, less: boolean): Promise<StylelintConfig | StylelintOverrideConfig> {
  const stylelintVersion = getPackageInfoSync('stylelint')?.version || '0.0.0'

  if (options === true) {
    const config: StylelintOverrideConfig = {
      files: ['**/*.vue'],
    }
    config.extends = [resolvePackagePath('stylelint-config-html')]

    if (scss === true) {
      config.plugins = [resolvePackagePath('stylelint-scss')]
      config.rules = useSCSSRules()
    }
    else if (less === true) {
      config.plugins = [resolvePackagePath('stylelint-less')]
      config.rules = useLessRules()
    }
    else {
      config.rules = useCSSRules()
    }

    config.rules['selector-pseudo-class-no-unknown'] = [
      true,
      { ignorePseudoClasses: ['deep', 'global', 'slotted'] },
    ]
    config.rules['selector-pseudo-element-no-unknown'] = [
      true,
      { ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'] },
    ]
    config.rules['value-keyword-case'] = [
      'lower',
      { ignoreFunctions: ['v-bind'] },
    ]

    if (scss !== true && less !== true) {
      if (semver.gte(stylelintVersion, '16.13.0')) {
        config.rules['declaration-property-value-no-unknown'] = [
          true,
          { ignoreProperties: { '/.*/': '/v-bind\\(.+\\)/' } },
        ]
      }
      if (semver.gte(stylelintVersion, '14.5.0')) {
        config.rules['function-no-unknown'] = [
          true,
          { ignoreFunctions: ['v-bind'] },
        ]
      }
      else if (semver.gte(stylelintVersion, '14.4.0')) {
        config.rules['function-no-unknown'] = null
      }
    }
    return config
  }

  return {}
}
