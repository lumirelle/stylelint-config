import { afterEach, beforeEach, describe, expect, it, mock, spyOn } from 'bun:test'
import * as localPkg from 'local-pkg'
import { vue } from '../../src'
import { setup } from './setup'

setup()

let spiedGetPackageInfoSync: ReturnType<typeof spyOn<typeof localPkg, 'getPackageInfoSync'>>

beforeEach(() => {
  spiedGetPackageInfoSync = spyOn(localPkg, 'getPackageInfoSync')
  spiedGetPackageInfoSync.mockImplementation(() => ({ version: '16.13.0' } as any))
})

afterEach(() => {
  mock.clearAllMocks()
})

describe('vue config', () => {
  it('should generate empty config when Vue is disabled', async () => {
    expect(await vue(false, false, false, false))
      .toBeNull()
  })

  it('should generate Vue config with CSS rules correctly when stylelint is not installed', async () => {
    spiedGetPackageInfoSync.mockImplementationOnce(() => undefined)
    expect(await vue(true, false, false, false))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "path/to/stylelint-config-html/vue",
          ],
          "files": [
            "**/*.vue",
          ],
          "rules": {
            "alpha-value-notation": [
              "percentage",
              {
                "exceptProperties": [
                  "opacity",
                  "fill-opacity",
                  "flood-opacity",
                  "stop-opacity",
                  "stroke-opacity",
                ],
              },
            ],
            "annotation-no-unknown": true,
            "at-rule-descriptor-no-unknown": true,
            "at-rule-descriptor-value-no-unknown": true,
            "at-rule-empty-line-before": [
              "always",
              {
                "except": [
                  "blockless-after-same-name-blockless",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "at-rule-no-deprecated": true,
            "at-rule-no-unknown": true,
            "at-rule-no-vendor-prefix": true,
            "at-rule-prelude-no-invalid": [
              true,
              {
                "ignoreAtRules": [
                  "media",
                ],
              },
            ],
            "block-no-empty": true,
            "block-no-redundant-nested-style-rules": true,
            "color-function-alias-notation": "without-alpha",
            "color-function-notation": "modern",
            "color-hex-length": "short",
            "comment-empty-line-before": [
              "always",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "stylelint-commands",
                ],
              },
            ],
            "comment-no-empty": true,
            "comment-whitespace-inside": "always",
            "container-name-pattern": [
              "^(--)?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-media-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-property-empty-line-before": [
              "always",
              {
                "except": [
                  "after-custom-property",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "custom-property-no-missing-var-function": true,
            "custom-property-pattern": [
              "^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "declaration-block-no-duplicate-custom-properties": true,
            "declaration-block-no-duplicate-properties": [
              true,
              {
                "ignore": [
                  "consecutive-duplicates-with-different-syntaxes",
                ],
              },
            ],
            "declaration-block-no-redundant-longhand-properties": true,
            "declaration-block-no-shorthand-property-overrides": true,
            "declaration-block-single-line-max-declarations": 1,
            "declaration-empty-line-before": [
              "always",
              {
                "except": [
                  "after-declaration",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "declaration-property-value-keyword-no-deprecated": true,
            "declaration-property-value-no-unknown": true,
            "font-family-name-quotes": "always-where-recommended",
            "font-family-no-duplicate-names": true,
            "font-family-no-missing-generic-family-keyword": true,
            "function-calc-no-unspaced-operator": true,
            "function-name-case": "lower",
            "function-url-quotes": "always",
            "hue-degree-notation": "angle",
            "import-notation": "url",
            "keyframe-block-no-duplicate-selectors": true,
            "keyframe-declaration-no-important": true,
            "keyframe-selector-notation": "percentage-unless-within-keyword-only-block",
            "keyframes-name-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "layer-name-pattern": [
              "^([a-z][a-z0-9]*)([.-][a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "length-zero-no-unit": [
              true,
              {
                "ignore": [
                  "custom-properties",
                ],
              },
            ],
            "lightness-notation": "percentage",
            "media-feature-name-no-unknown": true,
            "media-feature-name-no-vendor-prefix": true,
            "media-feature-name-value-no-unknown": true,
            "media-feature-range-notation": "context",
            "media-query-no-invalid": true,
            "media-type-no-deprecated": true,
            "named-grid-areas-no-invalid": true,
            "nesting-selector-no-missing-scoping-root": true,
            "no-descending-specificity": true,
            "no-duplicate-at-import-rules": true,
            "no-duplicate-selectors": true,
            "no-empty-source": true,
            "no-invalid-double-slash-comments": true,
            "no-invalid-position-at-import-rule": true,
            "no-invalid-position-declaration": true,
            "no-irregular-whitespace": true,
            "number-max-precision": 4,
            "property-no-deprecated": true,
            "property-no-unknown": true,
            "property-no-vendor-prefix": true,
            "rule-empty-line-before": [
              "always-multi-line",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "selector-anb-no-unmatchable": true,
            "selector-attribute-quotes": "always",
            "selector-class-pattern": [
              "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
              {
                "message": [Function],
              },
            ],
            "selector-id-pattern": [
              "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
              {
                "message": [Function],
              },
            ],
            "selector-no-vendor-prefix": true,
            "selector-not-notation": "complex",
            "selector-pseudo-class-no-unknown": [
              true,
              {
                "ignorePseudoClasses": [
                  "deep",
                  "global",
                  "slotted",
                ],
              },
            ],
            "selector-pseudo-element-colon-notation": "double",
            "selector-pseudo-element-no-unknown": [
              true,
              {
                "ignorePseudoElements": [
                  "v-deep",
                  "v-global",
                  "v-slotted",
                ],
              },
            ],
            "selector-type-case": "lower",
            "selector-type-no-unknown": [
              true,
              {
                "ignore": [
                  "custom-elements",
                ],
              },
            ],
            "shorthand-property-no-redundant-values": true,
            "string-no-newline": [
              true,
              {
                "ignore": [
                  "at-rule-preludes",
                  "declaration-values",
                ],
              },
            ],
            "syntax-string-no-invalid": true,
            "value-keyword-case": [
              "lower",
              {
                "ignoreFunctions": [
                  "v-bind",
                ],
              },
            ],
            "value-no-vendor-prefix": [
              true,
              {
                "ignoreValues": [
                  "box",
                  "inline-box",
                ],
              },
            ],
          },
        }
      `)
  })

  it('should generate Vue config with CSS rules correctly when stylelint version eq 14.4.0', async () => {
    spiedGetPackageInfoSync.mockImplementationOnce(() => ({ version: '14.4.0' } as any))
    expect(await vue(true, false, false, false))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "path/to/stylelint-config-html/vue",
          ],
          "files": [
            "**/*.vue",
          ],
          "rules": {
            "alpha-value-notation": [
              "percentage",
              {
                "exceptProperties": [
                  "opacity",
                  "fill-opacity",
                  "flood-opacity",
                  "stop-opacity",
                  "stroke-opacity",
                ],
              },
            ],
            "annotation-no-unknown": true,
            "at-rule-descriptor-no-unknown": true,
            "at-rule-descriptor-value-no-unknown": true,
            "at-rule-empty-line-before": [
              "always",
              {
                "except": [
                  "blockless-after-same-name-blockless",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "at-rule-no-deprecated": true,
            "at-rule-no-unknown": true,
            "at-rule-no-vendor-prefix": true,
            "at-rule-prelude-no-invalid": [
              true,
              {
                "ignoreAtRules": [
                  "media",
                ],
              },
            ],
            "block-no-empty": true,
            "block-no-redundant-nested-style-rules": true,
            "color-function-alias-notation": "without-alpha",
            "color-function-notation": "modern",
            "color-hex-length": "short",
            "comment-empty-line-before": [
              "always",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "stylelint-commands",
                ],
              },
            ],
            "comment-no-empty": true,
            "comment-whitespace-inside": "always",
            "container-name-pattern": [
              "^(--)?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-media-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-property-empty-line-before": [
              "always",
              {
                "except": [
                  "after-custom-property",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "custom-property-no-missing-var-function": true,
            "custom-property-pattern": [
              "^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "declaration-block-no-duplicate-custom-properties": true,
            "declaration-block-no-duplicate-properties": [
              true,
              {
                "ignore": [
                  "consecutive-duplicates-with-different-syntaxes",
                ],
              },
            ],
            "declaration-block-no-redundant-longhand-properties": true,
            "declaration-block-no-shorthand-property-overrides": true,
            "declaration-block-single-line-max-declarations": 1,
            "declaration-empty-line-before": [
              "always",
              {
                "except": [
                  "after-declaration",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "declaration-property-value-keyword-no-deprecated": true,
            "declaration-property-value-no-unknown": true,
            "font-family-name-quotes": "always-where-recommended",
            "font-family-no-duplicate-names": true,
            "font-family-no-missing-generic-family-keyword": true,
            "function-calc-no-unspaced-operator": true,
            "function-name-case": "lower",
            "function-no-unknown": null,
            "function-url-quotes": "always",
            "hue-degree-notation": "angle",
            "import-notation": "url",
            "keyframe-block-no-duplicate-selectors": true,
            "keyframe-declaration-no-important": true,
            "keyframe-selector-notation": "percentage-unless-within-keyword-only-block",
            "keyframes-name-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "layer-name-pattern": [
              "^([a-z][a-z0-9]*)([.-][a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "length-zero-no-unit": [
              true,
              {
                "ignore": [
                  "custom-properties",
                ],
              },
            ],
            "lightness-notation": "percentage",
            "media-feature-name-no-unknown": true,
            "media-feature-name-no-vendor-prefix": true,
            "media-feature-name-value-no-unknown": true,
            "media-feature-range-notation": "context",
            "media-query-no-invalid": true,
            "media-type-no-deprecated": true,
            "named-grid-areas-no-invalid": true,
            "nesting-selector-no-missing-scoping-root": true,
            "no-descending-specificity": true,
            "no-duplicate-at-import-rules": true,
            "no-duplicate-selectors": true,
            "no-empty-source": true,
            "no-invalid-double-slash-comments": true,
            "no-invalid-position-at-import-rule": true,
            "no-invalid-position-declaration": true,
            "no-irregular-whitespace": true,
            "number-max-precision": 4,
            "property-no-deprecated": true,
            "property-no-unknown": true,
            "property-no-vendor-prefix": true,
            "rule-empty-line-before": [
              "always-multi-line",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "selector-anb-no-unmatchable": true,
            "selector-attribute-quotes": "always",
            "selector-class-pattern": [
              "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
              {
                "message": [Function],
              },
            ],
            "selector-id-pattern": [
              "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
              {
                "message": [Function],
              },
            ],
            "selector-no-vendor-prefix": true,
            "selector-not-notation": "complex",
            "selector-pseudo-class-no-unknown": [
              true,
              {
                "ignorePseudoClasses": [
                  "deep",
                  "global",
                  "slotted",
                ],
              },
            ],
            "selector-pseudo-element-colon-notation": "double",
            "selector-pseudo-element-no-unknown": [
              true,
              {
                "ignorePseudoElements": [
                  "v-deep",
                  "v-global",
                  "v-slotted",
                ],
              },
            ],
            "selector-type-case": "lower",
            "selector-type-no-unknown": [
              true,
              {
                "ignore": [
                  "custom-elements",
                ],
              },
            ],
            "shorthand-property-no-redundant-values": true,
            "string-no-newline": [
              true,
              {
                "ignore": [
                  "at-rule-preludes",
                  "declaration-values",
                ],
              },
            ],
            "syntax-string-no-invalid": true,
            "value-keyword-case": [
              "lower",
              {
                "ignoreFunctions": [
                  "v-bind",
                ],
              },
            ],
            "value-no-vendor-prefix": [
              true,
              {
                "ignoreValues": [
                  "box",
                  "inline-box",
                ],
              },
            ],
          },
        }
      `)
  })

  it('should generate Vue config with CSS rules correctly when stylelint version eq 14.5.0', async () => {
    spiedGetPackageInfoSync.mockImplementationOnce(() => ({ version: '14.5.0' } as any))
    expect(await vue(true, false, false, false))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "path/to/stylelint-config-html/vue",
          ],
          "files": [
            "**/*.vue",
          ],
          "rules": {
            "alpha-value-notation": [
              "percentage",
              {
                "exceptProperties": [
                  "opacity",
                  "fill-opacity",
                  "flood-opacity",
                  "stop-opacity",
                  "stroke-opacity",
                ],
              },
            ],
            "annotation-no-unknown": true,
            "at-rule-descriptor-no-unknown": true,
            "at-rule-descriptor-value-no-unknown": true,
            "at-rule-empty-line-before": [
              "always",
              {
                "except": [
                  "blockless-after-same-name-blockless",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "at-rule-no-deprecated": true,
            "at-rule-no-unknown": true,
            "at-rule-no-vendor-prefix": true,
            "at-rule-prelude-no-invalid": [
              true,
              {
                "ignoreAtRules": [
                  "media",
                ],
              },
            ],
            "block-no-empty": true,
            "block-no-redundant-nested-style-rules": true,
            "color-function-alias-notation": "without-alpha",
            "color-function-notation": "modern",
            "color-hex-length": "short",
            "comment-empty-line-before": [
              "always",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "stylelint-commands",
                ],
              },
            ],
            "comment-no-empty": true,
            "comment-whitespace-inside": "always",
            "container-name-pattern": [
              "^(--)?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-media-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-property-empty-line-before": [
              "always",
              {
                "except": [
                  "after-custom-property",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "custom-property-no-missing-var-function": true,
            "custom-property-pattern": [
              "^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "declaration-block-no-duplicate-custom-properties": true,
            "declaration-block-no-duplicate-properties": [
              true,
              {
                "ignore": [
                  "consecutive-duplicates-with-different-syntaxes",
                ],
              },
            ],
            "declaration-block-no-redundant-longhand-properties": true,
            "declaration-block-no-shorthand-property-overrides": true,
            "declaration-block-single-line-max-declarations": 1,
            "declaration-empty-line-before": [
              "always",
              {
                "except": [
                  "after-declaration",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "declaration-property-value-keyword-no-deprecated": true,
            "declaration-property-value-no-unknown": true,
            "font-family-name-quotes": "always-where-recommended",
            "font-family-no-duplicate-names": true,
            "font-family-no-missing-generic-family-keyword": true,
            "function-calc-no-unspaced-operator": true,
            "function-name-case": "lower",
            "function-no-unknown": [
              true,
              {
                "ignoreFunctions": [
                  "v-bind",
                ],
              },
            ],
            "function-url-quotes": "always",
            "hue-degree-notation": "angle",
            "import-notation": "url",
            "keyframe-block-no-duplicate-selectors": true,
            "keyframe-declaration-no-important": true,
            "keyframe-selector-notation": "percentage-unless-within-keyword-only-block",
            "keyframes-name-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "layer-name-pattern": [
              "^([a-z][a-z0-9]*)([.-][a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "length-zero-no-unit": [
              true,
              {
                "ignore": [
                  "custom-properties",
                ],
              },
            ],
            "lightness-notation": "percentage",
            "media-feature-name-no-unknown": true,
            "media-feature-name-no-vendor-prefix": true,
            "media-feature-name-value-no-unknown": true,
            "media-feature-range-notation": "context",
            "media-query-no-invalid": true,
            "media-type-no-deprecated": true,
            "named-grid-areas-no-invalid": true,
            "nesting-selector-no-missing-scoping-root": true,
            "no-descending-specificity": true,
            "no-duplicate-at-import-rules": true,
            "no-duplicate-selectors": true,
            "no-empty-source": true,
            "no-invalid-double-slash-comments": true,
            "no-invalid-position-at-import-rule": true,
            "no-invalid-position-declaration": true,
            "no-irregular-whitespace": true,
            "number-max-precision": 4,
            "property-no-deprecated": true,
            "property-no-unknown": true,
            "property-no-vendor-prefix": true,
            "rule-empty-line-before": [
              "always-multi-line",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "selector-anb-no-unmatchable": true,
            "selector-attribute-quotes": "always",
            "selector-class-pattern": [
              "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
              {
                "message": [Function],
              },
            ],
            "selector-id-pattern": [
              "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
              {
                "message": [Function],
              },
            ],
            "selector-no-vendor-prefix": true,
            "selector-not-notation": "complex",
            "selector-pseudo-class-no-unknown": [
              true,
              {
                "ignorePseudoClasses": [
                  "deep",
                  "global",
                  "slotted",
                ],
              },
            ],
            "selector-pseudo-element-colon-notation": "double",
            "selector-pseudo-element-no-unknown": [
              true,
              {
                "ignorePseudoElements": [
                  "v-deep",
                  "v-global",
                  "v-slotted",
                ],
              },
            ],
            "selector-type-case": "lower",
            "selector-type-no-unknown": [
              true,
              {
                "ignore": [
                  "custom-elements",
                ],
              },
            ],
            "shorthand-property-no-redundant-values": true,
            "string-no-newline": [
              true,
              {
                "ignore": [
                  "at-rule-preludes",
                  "declaration-values",
                ],
              },
            ],
            "syntax-string-no-invalid": true,
            "value-keyword-case": [
              "lower",
              {
                "ignoreFunctions": [
                  "v-bind",
                ],
              },
            ],
            "value-no-vendor-prefix": [
              true,
              {
                "ignoreValues": [
                  "box",
                  "inline-box",
                ],
              },
            ],
          },
        }
      `)
  })

  it('should generate Vue config with CSS rules correctly when stylelint version eq 16.13.0', async () => {
    expect(await vue(true, false, false, false))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "path/to/stylelint-config-html/vue",
          ],
          "files": [
            "**/*.vue",
          ],
          "rules": {
            "alpha-value-notation": [
              "percentage",
              {
                "exceptProperties": [
                  "opacity",
                  "fill-opacity",
                  "flood-opacity",
                  "stop-opacity",
                  "stroke-opacity",
                ],
              },
            ],
            "annotation-no-unknown": true,
            "at-rule-descriptor-no-unknown": true,
            "at-rule-descriptor-value-no-unknown": true,
            "at-rule-empty-line-before": [
              "always",
              {
                "except": [
                  "blockless-after-same-name-blockless",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "at-rule-no-deprecated": true,
            "at-rule-no-unknown": true,
            "at-rule-no-vendor-prefix": true,
            "at-rule-prelude-no-invalid": [
              true,
              {
                "ignoreAtRules": [
                  "media",
                ],
              },
            ],
            "block-no-empty": true,
            "block-no-redundant-nested-style-rules": true,
            "color-function-alias-notation": "without-alpha",
            "color-function-notation": "modern",
            "color-hex-length": "short",
            "comment-empty-line-before": [
              "always",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "stylelint-commands",
                ],
              },
            ],
            "comment-no-empty": true,
            "comment-whitespace-inside": "always",
            "container-name-pattern": [
              "^(--)?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-media-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-property-empty-line-before": [
              "always",
              {
                "except": [
                  "after-custom-property",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "custom-property-no-missing-var-function": true,
            "custom-property-pattern": [
              "^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "declaration-block-no-duplicate-custom-properties": true,
            "declaration-block-no-duplicate-properties": [
              true,
              {
                "ignore": [
                  "consecutive-duplicates-with-different-syntaxes",
                ],
              },
            ],
            "declaration-block-no-redundant-longhand-properties": true,
            "declaration-block-no-shorthand-property-overrides": true,
            "declaration-block-single-line-max-declarations": 1,
            "declaration-empty-line-before": [
              "always",
              {
                "except": [
                  "after-declaration",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "declaration-property-value-keyword-no-deprecated": true,
            "declaration-property-value-no-unknown": [
              true,
              {
                "ignoreProperties": {
                  "/.*/": "/v-bind\\(.+\\)/",
                },
              },
            ],
            "font-family-name-quotes": "always-where-recommended",
            "font-family-no-duplicate-names": true,
            "font-family-no-missing-generic-family-keyword": true,
            "function-calc-no-unspaced-operator": true,
            "function-name-case": "lower",
            "function-no-unknown": [
              true,
              {
                "ignoreFunctions": [
                  "v-bind",
                ],
              },
            ],
            "function-url-quotes": "always",
            "hue-degree-notation": "angle",
            "import-notation": "url",
            "keyframe-block-no-duplicate-selectors": true,
            "keyframe-declaration-no-important": true,
            "keyframe-selector-notation": "percentage-unless-within-keyword-only-block",
            "keyframes-name-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "layer-name-pattern": [
              "^([a-z][a-z0-9]*)([.-][a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "length-zero-no-unit": [
              true,
              {
                "ignore": [
                  "custom-properties",
                ],
              },
            ],
            "lightness-notation": "percentage",
            "media-feature-name-no-unknown": true,
            "media-feature-name-no-vendor-prefix": true,
            "media-feature-name-value-no-unknown": true,
            "media-feature-range-notation": "context",
            "media-query-no-invalid": true,
            "media-type-no-deprecated": true,
            "named-grid-areas-no-invalid": true,
            "nesting-selector-no-missing-scoping-root": true,
            "no-descending-specificity": true,
            "no-duplicate-at-import-rules": true,
            "no-duplicate-selectors": true,
            "no-empty-source": true,
            "no-invalid-double-slash-comments": true,
            "no-invalid-position-at-import-rule": true,
            "no-invalid-position-declaration": true,
            "no-irregular-whitespace": true,
            "number-max-precision": 4,
            "property-no-deprecated": true,
            "property-no-unknown": true,
            "property-no-vendor-prefix": true,
            "rule-empty-line-before": [
              "always-multi-line",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "selector-anb-no-unmatchable": true,
            "selector-attribute-quotes": "always",
            "selector-class-pattern": [
              "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
              {
                "message": [Function],
              },
            ],
            "selector-id-pattern": [
              "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
              {
                "message": [Function],
              },
            ],
            "selector-no-vendor-prefix": true,
            "selector-not-notation": "complex",
            "selector-pseudo-class-no-unknown": [
              true,
              {
                "ignorePseudoClasses": [
                  "deep",
                  "global",
                  "slotted",
                ],
              },
            ],
            "selector-pseudo-element-colon-notation": "double",
            "selector-pseudo-element-no-unknown": [
              true,
              {
                "ignorePseudoElements": [
                  "v-deep",
                  "v-global",
                  "v-slotted",
                ],
              },
            ],
            "selector-type-case": "lower",
            "selector-type-no-unknown": [
              true,
              {
                "ignore": [
                  "custom-elements",
                ],
              },
            ],
            "shorthand-property-no-redundant-values": true,
            "string-no-newline": [
              true,
              {
                "ignore": [
                  "at-rule-preludes",
                  "declaration-values",
                ],
              },
            ],
            "syntax-string-no-invalid": true,
            "value-keyword-case": [
              "lower",
              {
                "ignoreFunctions": [
                  "v-bind",
                ],
              },
            ],
            "value-no-vendor-prefix": [
              true,
              {
                "ignoreValues": [
                  "box",
                  "inline-box",
                ],
              },
            ],
          },
        }
      `)
  })

  it('should generate Vue config with CSS, with less opinionated pattern rules', async () => {
    expect(await vue(true, false, false, { pattern: true }))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "path/to/stylelint-config-html/vue",
          ],
          "files": [
            "**/*.vue",
          ],
          "rules": {
            "alpha-value-notation": [
              "percentage",
              {
                "exceptProperties": [
                  "opacity",
                  "fill-opacity",
                  "flood-opacity",
                  "stop-opacity",
                  "stroke-opacity",
                ],
              },
            ],
            "annotation-no-unknown": true,
            "at-rule-descriptor-no-unknown": true,
            "at-rule-descriptor-value-no-unknown": true,
            "at-rule-empty-line-before": [
              "always",
              {
                "except": [
                  "blockless-after-same-name-blockless",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "at-rule-no-deprecated": true,
            "at-rule-no-unknown": true,
            "at-rule-no-vendor-prefix": true,
            "at-rule-prelude-no-invalid": [
              true,
              {
                "ignoreAtRules": [
                  "media",
                ],
              },
            ],
            "block-no-empty": true,
            "block-no-redundant-nested-style-rules": true,
            "color-function-alias-notation": "without-alpha",
            "color-function-notation": "modern",
            "color-hex-length": "short",
            "comment-empty-line-before": [
              "always",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "stylelint-commands",
                ],
              },
            ],
            "comment-no-empty": true,
            "comment-whitespace-inside": "always",
            "container-name-pattern": [
              "^(--)?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-media-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-property-empty-line-before": [
              "always",
              {
                "except": [
                  "after-custom-property",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "custom-property-no-missing-var-function": true,
            "custom-property-pattern": [
              "^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "declaration-block-no-duplicate-custom-properties": true,
            "declaration-block-no-duplicate-properties": [
              true,
              {
                "ignore": [
                  "consecutive-duplicates-with-different-syntaxes",
                ],
              },
            ],
            "declaration-block-no-redundant-longhand-properties": true,
            "declaration-block-no-shorthand-property-overrides": true,
            "declaration-block-single-line-max-declarations": 1,
            "declaration-empty-line-before": [
              "always",
              {
                "except": [
                  "after-declaration",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "declaration-property-value-keyword-no-deprecated": true,
            "declaration-property-value-no-unknown": [
              true,
              {
                "ignoreProperties": {
                  "/.*/": "/v-bind\\(.+\\)/",
                },
              },
            ],
            "font-family-name-quotes": "always-where-recommended",
            "font-family-no-duplicate-names": true,
            "font-family-no-missing-generic-family-keyword": true,
            "function-calc-no-unspaced-operator": true,
            "function-name-case": "lower",
            "function-no-unknown": [
              true,
              {
                "ignoreFunctions": [
                  "v-bind",
                ],
              },
            ],
            "function-url-quotes": "always",
            "hue-degree-notation": "angle",
            "import-notation": "url",
            "keyframe-block-no-duplicate-selectors": true,
            "keyframe-declaration-no-important": true,
            "keyframe-selector-notation": "percentage-unless-within-keyword-only-block",
            "keyframes-name-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "layer-name-pattern": [
              "^([a-z][a-z0-9]*)([.-][a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "length-zero-no-unit": [
              true,
              {
                "ignore": [
                  "custom-properties",
                ],
              },
            ],
            "lightness-notation": "percentage",
            "media-feature-name-no-unknown": true,
            "media-feature-name-no-vendor-prefix": true,
            "media-feature-name-value-no-unknown": true,
            "media-feature-range-notation": "context",
            "media-query-no-invalid": true,
            "media-type-no-deprecated": true,
            "named-grid-areas-no-invalid": true,
            "nesting-selector-no-missing-scoping-root": true,
            "no-descending-specificity": true,
            "no-duplicate-at-import-rules": true,
            "no-duplicate-selectors": true,
            "no-empty-source": true,
            "no-invalid-double-slash-comments": true,
            "no-invalid-position-at-import-rule": true,
            "no-invalid-position-declaration": true,
            "no-irregular-whitespace": true,
            "number-max-precision": 4,
            "property-no-deprecated": true,
            "property-no-unknown": true,
            "property-no-vendor-prefix": true,
            "rule-empty-line-before": [
              "always-multi-line",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "selector-anb-no-unmatchable": true,
            "selector-attribute-quotes": "always",
            "selector-no-vendor-prefix": true,
            "selector-not-notation": "complex",
            "selector-pseudo-class-no-unknown": [
              true,
              {
                "ignorePseudoClasses": [
                  "deep",
                  "global",
                  "slotted",
                ],
              },
            ],
            "selector-pseudo-element-colon-notation": "double",
            "selector-pseudo-element-no-unknown": [
              true,
              {
                "ignorePseudoElements": [
                  "v-deep",
                  "v-global",
                  "v-slotted",
                ],
              },
            ],
            "selector-type-case": "lower",
            "selector-type-no-unknown": [
              true,
              {
                "ignore": [
                  "custom-elements",
                ],
              },
            ],
            "shorthand-property-no-redundant-values": true,
            "string-no-newline": [
              true,
              {
                "ignore": [
                  "at-rule-preludes",
                  "declaration-values",
                ],
              },
            ],
            "syntax-string-no-invalid": true,
            "value-keyword-case": [
              "lower",
              {
                "ignoreFunctions": [
                  "v-bind",
                ],
              },
            ],
            "value-no-vendor-prefix": [
              true,
              {
                "ignoreValues": [
                  "box",
                  "inline-box",
                ],
              },
            ],
          },
        }
      `)
  })

  it('should generate Vue config with CSS, with less opinionated maintainability rules', async () => {
    expect(await vue(true, false, false, { maintainability: true }))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "path/to/stylelint-config-html/vue",
          ],
          "files": [
            "**/*.vue",
          ],
          "rules": {
            "alpha-value-notation": [
              "percentage",
              {
                "exceptProperties": [
                  "opacity",
                  "fill-opacity",
                  "flood-opacity",
                  "stop-opacity",
                  "stroke-opacity",
                ],
              },
            ],
            "annotation-no-unknown": true,
            "at-rule-descriptor-no-unknown": true,
            "at-rule-descriptor-value-no-unknown": true,
            "at-rule-empty-line-before": [
              "always",
              {
                "except": [
                  "blockless-after-same-name-blockless",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "at-rule-no-deprecated": true,
            "at-rule-no-unknown": true,
            "at-rule-no-vendor-prefix": true,
            "at-rule-prelude-no-invalid": [
              true,
              {
                "ignoreAtRules": [
                  "media",
                ],
              },
            ],
            "block-no-empty": true,
            "block-no-redundant-nested-style-rules": true,
            "color-function-alias-notation": "without-alpha",
            "color-function-notation": "modern",
            "color-hex-length": "short",
            "comment-empty-line-before": [
              "always",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "stylelint-commands",
                ],
              },
            ],
            "comment-no-empty": true,
            "comment-whitespace-inside": "always",
            "container-name-pattern": [
              "^(--)?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-media-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-property-empty-line-before": [
              "always",
              {
                "except": [
                  "after-custom-property",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "custom-property-no-missing-var-function": true,
            "custom-property-pattern": [
              "^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "declaration-block-no-duplicate-custom-properties": true,
            "declaration-block-no-duplicate-properties": [
              true,
              {
                "ignore": [
                  "consecutive-duplicates-with-different-syntaxes",
                ],
              },
            ],
            "declaration-block-no-redundant-longhand-properties": true,
            "declaration-block-no-shorthand-property-overrides": true,
            "declaration-block-single-line-max-declarations": 1,
            "declaration-empty-line-before": [
              "always",
              {
                "except": [
                  "after-declaration",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "declaration-property-value-keyword-no-deprecated": true,
            "declaration-property-value-no-unknown": [
              true,
              {
                "ignoreProperties": {
                  "/.*/": "/v-bind\\(.+\\)/",
                },
              },
            ],
            "font-family-name-quotes": "always-where-recommended",
            "font-family-no-duplicate-names": true,
            "font-family-no-missing-generic-family-keyword": true,
            "function-calc-no-unspaced-operator": true,
            "function-name-case": "lower",
            "function-no-unknown": [
              true,
              {
                "ignoreFunctions": [
                  "v-bind",
                ],
              },
            ],
            "function-url-quotes": "always",
            "hue-degree-notation": "angle",
            "import-notation": "url",
            "keyframe-block-no-duplicate-selectors": true,
            "keyframe-declaration-no-important": true,
            "keyframe-selector-notation": "percentage-unless-within-keyword-only-block",
            "keyframes-name-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "layer-name-pattern": [
              "^([a-z][a-z0-9]*)([.-][a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "length-zero-no-unit": [
              true,
              {
                "ignore": [
                  "custom-properties",
                ],
              },
            ],
            "lightness-notation": "percentage",
            "media-feature-name-no-unknown": true,
            "media-feature-name-no-vendor-prefix": true,
            "media-feature-name-value-no-unknown": true,
            "media-feature-range-notation": "context",
            "media-query-no-invalid": true,
            "media-type-no-deprecated": true,
            "named-grid-areas-no-invalid": true,
            "nesting-selector-no-missing-scoping-root": true,
            "no-duplicate-at-import-rules": true,
            "no-duplicate-selectors": true,
            "no-empty-source": true,
            "no-invalid-double-slash-comments": true,
            "no-invalid-position-at-import-rule": true,
            "no-invalid-position-declaration": true,
            "no-irregular-whitespace": true,
            "number-max-precision": 4,
            "property-no-deprecated": true,
            "property-no-unknown": true,
            "property-no-vendor-prefix": true,
            "rule-empty-line-before": [
              "always-multi-line",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "selector-anb-no-unmatchable": true,
            "selector-attribute-quotes": "always",
            "selector-class-pattern": [
              "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
              {
                "message": [Function],
              },
            ],
            "selector-id-pattern": [
              "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
              {
                "message": [Function],
              },
            ],
            "selector-no-vendor-prefix": true,
            "selector-not-notation": "complex",
            "selector-pseudo-class-no-unknown": [
              true,
              {
                "ignorePseudoClasses": [
                  "deep",
                  "global",
                  "slotted",
                ],
              },
            ],
            "selector-pseudo-element-colon-notation": "double",
            "selector-pseudo-element-no-unknown": [
              true,
              {
                "ignorePseudoElements": [
                  "v-deep",
                  "v-global",
                  "v-slotted",
                ],
              },
            ],
            "selector-type-case": "lower",
            "selector-type-no-unknown": [
              true,
              {
                "ignore": [
                  "custom-elements",
                ],
              },
            ],
            "shorthand-property-no-redundant-values": true,
            "string-no-newline": [
              true,
              {
                "ignore": [
                  "at-rule-preludes",
                  "declaration-values",
                ],
              },
            ],
            "syntax-string-no-invalid": true,
            "value-keyword-case": [
              "lower",
              {
                "ignoreFunctions": [
                  "v-bind",
                ],
              },
            ],
            "value-no-vendor-prefix": [
              true,
              {
                "ignoreValues": [
                  "box",
                  "inline-box",
                ],
              },
            ],
          },
        }
      `)
  })

  it('should generate Vue config with CSS, with all less opinionated rules', async () => {
    expect(await vue(true, false, false, true))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "path/to/stylelint-config-html/vue",
          ],
          "files": [
            "**/*.vue",
          ],
          "rules": {
            "alpha-value-notation": [
              "percentage",
              {
                "exceptProperties": [
                  "opacity",
                  "fill-opacity",
                  "flood-opacity",
                  "stop-opacity",
                  "stroke-opacity",
                ],
              },
            ],
            "annotation-no-unknown": true,
            "at-rule-descriptor-no-unknown": true,
            "at-rule-descriptor-value-no-unknown": true,
            "at-rule-empty-line-before": [
              "always",
              {
                "except": [
                  "blockless-after-same-name-blockless",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "at-rule-no-deprecated": true,
            "at-rule-no-unknown": true,
            "at-rule-no-vendor-prefix": true,
            "at-rule-prelude-no-invalid": [
              true,
              {
                "ignoreAtRules": [
                  "media",
                ],
              },
            ],
            "block-no-empty": true,
            "block-no-redundant-nested-style-rules": true,
            "color-function-alias-notation": "without-alpha",
            "color-function-notation": "modern",
            "color-hex-length": "short",
            "comment-empty-line-before": [
              "always",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "stylelint-commands",
                ],
              },
            ],
            "comment-no-empty": true,
            "comment-whitespace-inside": "always",
            "container-name-pattern": [
              "^(--)?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-media-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-property-empty-line-before": [
              "always",
              {
                "except": [
                  "after-custom-property",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "custom-property-no-missing-var-function": true,
            "custom-property-pattern": [
              "^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "declaration-block-no-duplicate-custom-properties": true,
            "declaration-block-no-duplicate-properties": [
              true,
              {
                "ignore": [
                  "consecutive-duplicates-with-different-syntaxes",
                ],
              },
            ],
            "declaration-block-no-redundant-longhand-properties": true,
            "declaration-block-no-shorthand-property-overrides": true,
            "declaration-block-single-line-max-declarations": 1,
            "declaration-empty-line-before": [
              "always",
              {
                "except": [
                  "after-declaration",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "declaration-property-value-keyword-no-deprecated": true,
            "declaration-property-value-no-unknown": [
              true,
              {
                "ignoreProperties": {
                  "/.*/": "/v-bind\\(.+\\)/",
                },
              },
            ],
            "font-family-name-quotes": "always-where-recommended",
            "font-family-no-duplicate-names": true,
            "font-family-no-missing-generic-family-keyword": true,
            "function-calc-no-unspaced-operator": true,
            "function-name-case": "lower",
            "function-no-unknown": [
              true,
              {
                "ignoreFunctions": [
                  "v-bind",
                ],
              },
            ],
            "function-url-quotes": "always",
            "hue-degree-notation": "angle",
            "import-notation": "url",
            "keyframe-block-no-duplicate-selectors": true,
            "keyframe-declaration-no-important": true,
            "keyframe-selector-notation": "percentage-unless-within-keyword-only-block",
            "keyframes-name-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "layer-name-pattern": [
              "^([a-z][a-z0-9]*)([.-][a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "length-zero-no-unit": [
              true,
              {
                "ignore": [
                  "custom-properties",
                ],
              },
            ],
            "lightness-notation": "percentage",
            "media-feature-name-no-unknown": true,
            "media-feature-name-no-vendor-prefix": true,
            "media-feature-name-value-no-unknown": true,
            "media-feature-range-notation": "context",
            "media-query-no-invalid": true,
            "media-type-no-deprecated": true,
            "named-grid-areas-no-invalid": true,
            "nesting-selector-no-missing-scoping-root": true,
            "no-duplicate-at-import-rules": true,
            "no-duplicate-selectors": true,
            "no-empty-source": true,
            "no-invalid-double-slash-comments": true,
            "no-invalid-position-at-import-rule": true,
            "no-invalid-position-declaration": true,
            "no-irregular-whitespace": true,
            "number-max-precision": 4,
            "property-no-deprecated": true,
            "property-no-unknown": true,
            "property-no-vendor-prefix": true,
            "rule-empty-line-before": [
              "always-multi-line",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "selector-anb-no-unmatchable": true,
            "selector-attribute-quotes": "always",
            "selector-no-vendor-prefix": true,
            "selector-not-notation": "complex",
            "selector-pseudo-class-no-unknown": [
              true,
              {
                "ignorePseudoClasses": [
                  "deep",
                  "global",
                  "slotted",
                ],
              },
            ],
            "selector-pseudo-element-colon-notation": "double",
            "selector-pseudo-element-no-unknown": [
              true,
              {
                "ignorePseudoElements": [
                  "v-deep",
                  "v-global",
                  "v-slotted",
                ],
              },
            ],
            "selector-type-case": "lower",
            "selector-type-no-unknown": [
              true,
              {
                "ignore": [
                  "custom-elements",
                ],
              },
            ],
            "shorthand-property-no-redundant-values": true,
            "string-no-newline": [
              true,
              {
                "ignore": [
                  "at-rule-preludes",
                  "declaration-values",
                ],
              },
            ],
            "syntax-string-no-invalid": true,
            "value-keyword-case": [
              "lower",
              {
                "ignoreFunctions": [
                  "v-bind",
                ],
              },
            ],
            "value-no-vendor-prefix": [
              true,
              {
                "ignoreValues": [
                  "box",
                  "inline-box",
                ],
              },
            ],
          },
        }
      `)
  })

  it('should generate Vue config with SCSS rules when both enabled', async () => {
    expect(await vue(true, true, false, false))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "path/to/stylelint-config-html/vue",
          ],
          "files": [
            "**/*.vue",
          ],
          "plugins": [
            "path/to/stylelint-scss",
          ],
          "rules": {
            "alpha-value-notation": [
              "percentage",
              {
                "exceptProperties": [
                  "opacity",
                  "fill-opacity",
                  "flood-opacity",
                  "stop-opacity",
                  "stroke-opacity",
                ],
              },
            ],
            "annotation-no-unknown": null,
            "at-rule-descriptor-no-unknown": null,
            "at-rule-descriptor-value-no-unknown": null,
            "at-rule-empty-line-before": [
              "always",
              {
                "except": [
                  "blockless-after-blockless",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
                "ignoreAtRules": [
                  "else",
                ],
              },
            ],
            "at-rule-no-deprecated": true,
            "at-rule-no-unknown": null,
            "at-rule-no-vendor-prefix": true,
            "at-rule-prelude-no-invalid": null,
            "block-no-empty": true,
            "block-no-redundant-nested-style-rules": true,
            "color-function-alias-notation": "without-alpha",
            "color-function-notation": "modern",
            "color-hex-length": "short",
            "color-no-invalid-hex": true,
            "comment-empty-line-before": [
              "always",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "stylelint-commands",
                ],
              },
            ],
            "comment-no-empty": null,
            "comment-whitespace-inside": "always",
            "container-name-pattern": [
              "^(--)?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-media-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-property-empty-line-before": [
              "always",
              {
                "except": [
                  "after-custom-property",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "custom-property-no-missing-var-function": true,
            "custom-property-pattern": [
              "^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "declaration-block-no-duplicate-custom-properties": true,
            "declaration-block-no-duplicate-properties": [
              true,
              {
                "ignore": [
                  "consecutive-duplicates-with-different-syntaxes",
                ],
              },
            ],
            "declaration-block-no-redundant-longhand-properties": true,
            "declaration-block-no-shorthand-property-overrides": true,
            "declaration-block-single-line-max-declarations": 1,
            "declaration-empty-line-before": [
              "always",
              {
                "except": [
                  "after-declaration",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "declaration-property-value-keyword-no-deprecated": true,
            "declaration-property-value-no-unknown": null,
            "font-family-name-quotes": "always-where-recommended",
            "font-family-no-duplicate-names": true,
            "font-family-no-missing-generic-family-keyword": true,
            "function-calc-no-unspaced-operator": true,
            "function-linear-gradient-no-nonstandard-direction": true,
            "function-name-case": "lower",
            "function-no-unknown": null,
            "function-url-quotes": "always",
            "hue-degree-notation": "angle",
            "import-notation": "string",
            "keyframe-block-no-duplicate-selectors": true,
            "keyframe-declaration-no-important": true,
            "keyframe-selector-notation": "percentage-unless-within-keyword-only-block",
            "keyframes-name-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "layer-name-pattern": [
              "^([a-z][a-z0-9]*)([.-][a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "length-zero-no-unit": [
              true,
              {
                "ignore": [
                  "custom-properties",
                ],
                "ignorePreludeOfAtRules": [
                  "function",
                  "mixin",
                ],
              },
            ],
            "lightness-notation": "percentage",
            "media-feature-name-no-unknown": true,
            "media-feature-name-no-vendor-prefix": true,
            "media-feature-name-value-no-unknown": null,
            "media-feature-range-notation": "context",
            "media-query-no-invalid": null,
            "media-type-no-deprecated": true,
            "named-grid-areas-no-invalid": true,
            "nesting-selector-no-missing-scoping-root": [
              true,
              {
                "ignoreAtRules": [
                  "mixin",
                ],
              },
            ],
            "no-descending-specificity": true,
            "no-duplicate-at-import-rules": true,
            "no-duplicate-selectors": true,
            "no-empty-source": true,
            "no-invalid-double-slash-comments": true,
            "no-invalid-position-at-import-rule": [
              true,
              {
                "ignoreAtRules": [
                  "use",
                  "forward",
                ],
              },
            ],
            "no-invalid-position-declaration": true,
            "no-irregular-whitespace": true,
            "number-max-precision": 4,
            "property-no-deprecated": true,
            "property-no-unknown": true,
            "property-no-vendor-prefix": true,
            "rule-empty-line-before": [
              "always-multi-line",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "scss/at-else-empty-line-before": "never",
            "scss/at-else-if-parentheses-space-before": "always",
            "scss/at-extend-no-missing-placeholder": true,
            "scss/at-function-parentheses-space-before": "never",
            "scss/at-function-pattern": [
              "^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": "Expected function name to be kebab-case",
              },
            ],
            "scss/at-if-no-null": true,
            "scss/at-mixin-argumentless-call-parentheses": "never",
            "scss/at-mixin-parentheses-space-before": "never",
            "scss/at-mixin-pattern": [
              "^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": "Expected mixin name to be kebab-case",
              },
            ],
            "scss/at-rule-conditional-no-parentheses": true,
            "scss/at-rule-no-unknown": true,
            "scss/comment-no-empty": true,
            "scss/declaration-nested-properties-no-divided-groups": true,
            "scss/dollar-variable-colon-space-after": "always-single-line",
            "scss/dollar-variable-colon-space-before": "never",
            "scss/dollar-variable-empty-line-before": [
              "always",
              {
                "except": [
                  "after-dollar-variable",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "scss/dollar-variable-no-missing-interpolation": true,
            "scss/dollar-variable-pattern": [
              "^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
              {
                "message": "Expected variable name to be kebab-case, start with "--" or nothing.",
              },
            ],
            "scss/double-slash-comment-empty-line-before": [
              "always",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "between-comments",
                  "stylelint-commands",
                ],
              },
            ],
            "scss/double-slash-comment-whitespace-inside": "always",
            "scss/function-quote-no-quoted-strings-inside": true,
            "scss/function-unquote-no-unquoted-strings-inside": true,
            "scss/load-no-partial-leading-underscore": true,
            "scss/load-partial-extension": "never",
            "scss/no-duplicate-mixins": true,
            "scss/no-global-function-names": true,
            "scss/operator-no-newline-after": true,
            "scss/operator-no-newline-before": true,
            "scss/operator-no-unspaced": true,
            "scss/percent-placeholder-pattern": [
              "^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": "Expected placeholder to be kebab-case",
              },
            ],
            "selector-anb-no-unmatchable": true,
            "selector-attribute-quotes": "always",
            "selector-class-pattern": [
              "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
              {
                "message": [Function],
              },
            ],
            "selector-id-pattern": [
              "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
              {
                "message": [Function],
              },
            ],
            "selector-no-vendor-prefix": true,
            "selector-not-notation": "complex",
            "selector-pseudo-class-no-unknown": [
              true,
              {
                "ignorePseudoClasses": [
                  "deep",
                  "global",
                  "slotted",
                ],
              },
            ],
            "selector-pseudo-element-colon-notation": "double",
            "selector-pseudo-element-no-unknown": [
              true,
              {
                "ignorePseudoElements": [
                  "v-deep",
                  "v-global",
                  "v-slotted",
                ],
              },
            ],
            "selector-type-case": "lower",
            "selector-type-no-unknown": [
              true,
              {
                "ignore": [
                  "custom-elements",
                ],
              },
            ],
            "shorthand-property-no-redundant-values": true,
            "string-no-newline": true,
            "syntax-string-no-invalid": true,
            "unit-no-unknown": true,
            "value-keyword-case": [
              "lower",
              {
                "ignoreFunctions": [
                  "v-bind",
                ],
              },
            ],
            "value-no-vendor-prefix": [
              true,
              {
                "ignoreValues": [
                  "box",
                  "inline-box",
                ],
              },
            ],
          },
        }
      `)
  })

  it('should generate Vue config with Less rules when both enabled', async () => {
    expect(await vue(true, false, true, false))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "path/to/stylelint-config-html/vue",
          ],
          "files": [
            "**/*.vue",
          ],
          "plugins": [
            "path/to/stylelint-less",
          ],
          "rules": {
            "alpha-value-notation": [
              "percentage",
              {
                "exceptProperties": [
                  "opacity",
                  "fill-opacity",
                  "flood-opacity",
                  "stop-opacity",
                  "stroke-opacity",
                ],
              },
            ],
            "annotation-no-unknown": true,
            "at-rule-descriptor-no-unknown": true,
            "at-rule-descriptor-value-no-unknown": true,
            "at-rule-empty-line-before": [
              "always",
              {
                "except": [
                  "blockless-after-same-name-blockless",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "at-rule-no-deprecated": true,
            "at-rule-no-unknown": null,
            "at-rule-no-vendor-prefix": true,
            "at-rule-prelude-no-invalid": [
              true,
              {
                "ignoreAtRules": [
                  "media",
                ],
              },
            ],
            "block-no-empty": true,
            "block-no-redundant-nested-style-rules": true,
            "color-function-alias-notation": "without-alpha",
            "color-function-notation": "modern",
            "color-hex-length": "short",
            "comment-empty-line-before": [
              "always",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "stylelint-commands",
                ],
              },
            ],
            "comment-no-empty": true,
            "comment-whitespace-inside": "always",
            "container-name-pattern": [
              "^(--)?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-media-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-property-empty-line-before": [
              "always",
              {
                "except": [
                  "after-custom-property",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "custom-property-no-missing-var-function": true,
            "custom-property-pattern": [
              "^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "declaration-block-no-duplicate-custom-properties": true,
            "declaration-block-no-duplicate-properties": [
              true,
              {
                "ignore": [
                  "consecutive-duplicates-with-different-syntaxes",
                ],
              },
            ],
            "declaration-block-no-redundant-longhand-properties": true,
            "declaration-block-no-shorthand-property-overrides": true,
            "declaration-block-single-line-max-declarations": 1,
            "declaration-empty-line-before": [
              "always",
              {
                "except": [
                  "after-declaration",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "declaration-property-value-keyword-no-deprecated": true,
            "declaration-property-value-no-unknown": null,
            "font-family-name-quotes": "always-where-recommended",
            "font-family-no-duplicate-names": true,
            "font-family-no-missing-generic-family-keyword": true,
            "function-calc-no-unspaced-operator": true,
            "function-name-case": "lower",
            "function-no-unknown": null,
            "function-url-quotes": "always",
            "hue-degree-notation": "angle",
            "import-notation": "string",
            "keyframe-block-no-duplicate-selectors": true,
            "keyframe-declaration-no-important": true,
            "keyframe-selector-notation": "percentage-unless-within-keyword-only-block",
            "keyframes-name-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "layer-name-pattern": [
              "^([a-z][a-z0-9]*)([.-][a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "length-zero-no-unit": [
              true,
              {
                "ignore": [
                  "custom-properties",
                ],
              },
            ],
            "less/color-no-invalid-hex": true,
            "less/no-duplicate-variables": true,
            "lightness-notation": "percentage",
            "media-feature-name-no-unknown": true,
            "media-feature-name-no-vendor-prefix": true,
            "media-feature-name-value-no-unknown": true,
            "media-feature-range-notation": "context",
            "media-query-no-invalid": null,
            "media-type-no-deprecated": true,
            "named-grid-areas-no-invalid": true,
            "nesting-selector-no-missing-scoping-root": true,
            "no-descending-specificity": true,
            "no-duplicate-at-import-rules": true,
            "no-duplicate-selectors": true,
            "no-empty-source": true,
            "no-invalid-double-slash-comments": true,
            "no-invalid-position-at-import-rule": null,
            "no-invalid-position-declaration": true,
            "no-irregular-whitespace": true,
            "number-max-precision": 4,
            "property-no-deprecated": true,
            "property-no-unknown": true,
            "property-no-vendor-prefix": true,
            "rule-empty-line-before": [
              "always-multi-line",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "selector-anb-no-unmatchable": true,
            "selector-attribute-quotes": "always",
            "selector-class-pattern": [
              "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
              {
                "message": [Function],
              },
            ],
            "selector-id-pattern": [
              "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
              {
                "message": [Function],
              },
            ],
            "selector-no-vendor-prefix": true,
            "selector-not-notation": "complex",
            "selector-pseudo-class-no-unknown": [
              true,
              {
                "ignorePseudoClasses": [
                  "deep",
                  "global",
                  "slotted",
                ],
              },
            ],
            "selector-pseudo-element-colon-notation": "double",
            "selector-pseudo-element-no-unknown": [
              true,
              {
                "ignorePseudoElements": [
                  "v-deep",
                  "v-global",
                  "v-slotted",
                ],
              },
            ],
            "selector-type-case": "lower",
            "selector-type-no-unknown": [
              true,
              {
                "ignore": [
                  "custom-elements",
                ],
              },
            ],
            "shorthand-property-no-redundant-values": true,
            "string-no-newline": [
              true,
              {
                "ignore": [
                  "at-rule-preludes",
                  "declaration-values",
                ],
              },
            ],
            "syntax-string-no-invalid": true,
            "value-keyword-case": [
              "lower",
              {
                "ignoreFunctions": [
                  "v-bind",
                ],
              },
            ],
            "value-no-vendor-prefix": [
              true,
              {
                "ignoreValues": [
                  "box",
                  "inline-box",
                ],
              },
            ],
          },
        }
      `)
  })

  it('should generate Vue config with CSS and SCSS rules when both enabled', async () => {
    expect(await vue(true, true, false, false))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "path/to/stylelint-config-html/vue",
          ],
          "files": [
            "**/*.vue",
          ],
          "plugins": [
            "path/to/stylelint-scss",
          ],
          "rules": {
            "alpha-value-notation": [
              "percentage",
              {
                "exceptProperties": [
                  "opacity",
                  "fill-opacity",
                  "flood-opacity",
                  "stop-opacity",
                  "stroke-opacity",
                ],
              },
            ],
            "annotation-no-unknown": null,
            "at-rule-descriptor-no-unknown": null,
            "at-rule-descriptor-value-no-unknown": null,
            "at-rule-empty-line-before": [
              "always",
              {
                "except": [
                  "blockless-after-blockless",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
                "ignoreAtRules": [
                  "else",
                ],
              },
            ],
            "at-rule-no-deprecated": true,
            "at-rule-no-unknown": null,
            "at-rule-no-vendor-prefix": true,
            "at-rule-prelude-no-invalid": null,
            "block-no-empty": true,
            "block-no-redundant-nested-style-rules": true,
            "color-function-alias-notation": "without-alpha",
            "color-function-notation": "modern",
            "color-hex-length": "short",
            "color-no-invalid-hex": true,
            "comment-empty-line-before": [
              "always",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "stylelint-commands",
                ],
              },
            ],
            "comment-no-empty": null,
            "comment-whitespace-inside": "always",
            "container-name-pattern": [
              "^(--)?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-media-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-property-empty-line-before": [
              "always",
              {
                "except": [
                  "after-custom-property",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "custom-property-no-missing-var-function": true,
            "custom-property-pattern": [
              "^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "declaration-block-no-duplicate-custom-properties": true,
            "declaration-block-no-duplicate-properties": [
              true,
              {
                "ignore": [
                  "consecutive-duplicates-with-different-syntaxes",
                ],
              },
            ],
            "declaration-block-no-redundant-longhand-properties": true,
            "declaration-block-no-shorthand-property-overrides": true,
            "declaration-block-single-line-max-declarations": 1,
            "declaration-empty-line-before": [
              "always",
              {
                "except": [
                  "after-declaration",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "declaration-property-value-keyword-no-deprecated": true,
            "declaration-property-value-no-unknown": null,
            "font-family-name-quotes": "always-where-recommended",
            "font-family-no-duplicate-names": true,
            "font-family-no-missing-generic-family-keyword": true,
            "function-calc-no-unspaced-operator": true,
            "function-linear-gradient-no-nonstandard-direction": true,
            "function-name-case": "lower",
            "function-no-unknown": null,
            "function-url-quotes": "always",
            "hue-degree-notation": "angle",
            "import-notation": "string",
            "keyframe-block-no-duplicate-selectors": true,
            "keyframe-declaration-no-important": true,
            "keyframe-selector-notation": "percentage-unless-within-keyword-only-block",
            "keyframes-name-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "layer-name-pattern": [
              "^([a-z][a-z0-9]*)([.-][a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "length-zero-no-unit": [
              true,
              {
                "ignore": [
                  "custom-properties",
                ],
                "ignorePreludeOfAtRules": [
                  "function",
                  "mixin",
                ],
              },
            ],
            "lightness-notation": "percentage",
            "media-feature-name-no-unknown": true,
            "media-feature-name-no-vendor-prefix": true,
            "media-feature-name-value-no-unknown": null,
            "media-feature-range-notation": "context",
            "media-query-no-invalid": null,
            "media-type-no-deprecated": true,
            "named-grid-areas-no-invalid": true,
            "nesting-selector-no-missing-scoping-root": [
              true,
              {
                "ignoreAtRules": [
                  "mixin",
                ],
              },
            ],
            "no-descending-specificity": true,
            "no-duplicate-at-import-rules": true,
            "no-duplicate-selectors": true,
            "no-empty-source": true,
            "no-invalid-double-slash-comments": true,
            "no-invalid-position-at-import-rule": [
              true,
              {
                "ignoreAtRules": [
                  "use",
                  "forward",
                ],
              },
            ],
            "no-invalid-position-declaration": true,
            "no-irregular-whitespace": true,
            "number-max-precision": 4,
            "property-no-deprecated": true,
            "property-no-unknown": true,
            "property-no-vendor-prefix": true,
            "rule-empty-line-before": [
              "always-multi-line",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "scss/at-else-empty-line-before": "never",
            "scss/at-else-if-parentheses-space-before": "always",
            "scss/at-extend-no-missing-placeholder": true,
            "scss/at-function-parentheses-space-before": "never",
            "scss/at-function-pattern": [
              "^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": "Expected function name to be kebab-case",
              },
            ],
            "scss/at-if-no-null": true,
            "scss/at-mixin-argumentless-call-parentheses": "never",
            "scss/at-mixin-parentheses-space-before": "never",
            "scss/at-mixin-pattern": [
              "^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": "Expected mixin name to be kebab-case",
              },
            ],
            "scss/at-rule-conditional-no-parentheses": true,
            "scss/at-rule-no-unknown": true,
            "scss/comment-no-empty": true,
            "scss/declaration-nested-properties-no-divided-groups": true,
            "scss/dollar-variable-colon-space-after": "always-single-line",
            "scss/dollar-variable-colon-space-before": "never",
            "scss/dollar-variable-empty-line-before": [
              "always",
              {
                "except": [
                  "after-dollar-variable",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "scss/dollar-variable-no-missing-interpolation": true,
            "scss/dollar-variable-pattern": [
              "^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
              {
                "message": "Expected variable name to be kebab-case, start with "--" or nothing.",
              },
            ],
            "scss/double-slash-comment-empty-line-before": [
              "always",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "between-comments",
                  "stylelint-commands",
                ],
              },
            ],
            "scss/double-slash-comment-whitespace-inside": "always",
            "scss/function-quote-no-quoted-strings-inside": true,
            "scss/function-unquote-no-unquoted-strings-inside": true,
            "scss/load-no-partial-leading-underscore": true,
            "scss/load-partial-extension": "never",
            "scss/no-duplicate-mixins": true,
            "scss/no-global-function-names": true,
            "scss/operator-no-newline-after": true,
            "scss/operator-no-newline-before": true,
            "scss/operator-no-unspaced": true,
            "scss/percent-placeholder-pattern": [
              "^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": "Expected placeholder to be kebab-case",
              },
            ],
            "selector-anb-no-unmatchable": true,
            "selector-attribute-quotes": "always",
            "selector-class-pattern": [
              "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
              {
                "message": [Function],
              },
            ],
            "selector-id-pattern": [
              "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
              {
                "message": [Function],
              },
            ],
            "selector-no-vendor-prefix": true,
            "selector-not-notation": "complex",
            "selector-pseudo-class-no-unknown": [
              true,
              {
                "ignorePseudoClasses": [
                  "deep",
                  "global",
                  "slotted",
                ],
              },
            ],
            "selector-pseudo-element-colon-notation": "double",
            "selector-pseudo-element-no-unknown": [
              true,
              {
                "ignorePseudoElements": [
                  "v-deep",
                  "v-global",
                  "v-slotted",
                ],
              },
            ],
            "selector-type-case": "lower",
            "selector-type-no-unknown": [
              true,
              {
                "ignore": [
                  "custom-elements",
                ],
              },
            ],
            "shorthand-property-no-redundant-values": true,
            "string-no-newline": true,
            "syntax-string-no-invalid": true,
            "unit-no-unknown": true,
            "value-keyword-case": [
              "lower",
              {
                "ignoreFunctions": [
                  "v-bind",
                ],
              },
            ],
            "value-no-vendor-prefix": [
              true,
              {
                "ignoreValues": [
                  "box",
                  "inline-box",
                ],
              },
            ],
          },
        }
      `)
  })

  it('should generate Vue config with CSS and SCSS rules when both enabled, with less opinionated pattern rules', async () => {
    expect(await vue(true, true, false, { pattern: true }))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "path/to/stylelint-config-html/vue",
          ],
          "files": [
            "**/*.vue",
          ],
          "plugins": [
            "path/to/stylelint-scss",
          ],
          "rules": {
            "alpha-value-notation": [
              "percentage",
              {
                "exceptProperties": [
                  "opacity",
                  "fill-opacity",
                  "flood-opacity",
                  "stop-opacity",
                  "stroke-opacity",
                ],
              },
            ],
            "annotation-no-unknown": null,
            "at-rule-descriptor-no-unknown": null,
            "at-rule-descriptor-value-no-unknown": null,
            "at-rule-empty-line-before": [
              "always",
              {
                "except": [
                  "blockless-after-blockless",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
                "ignoreAtRules": [
                  "else",
                ],
              },
            ],
            "at-rule-no-deprecated": true,
            "at-rule-no-unknown": null,
            "at-rule-no-vendor-prefix": true,
            "at-rule-prelude-no-invalid": null,
            "block-no-empty": true,
            "block-no-redundant-nested-style-rules": true,
            "color-function-alias-notation": "without-alpha",
            "color-function-notation": "modern",
            "color-hex-length": "short",
            "color-no-invalid-hex": true,
            "comment-empty-line-before": [
              "always",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "stylelint-commands",
                ],
              },
            ],
            "comment-no-empty": null,
            "comment-whitespace-inside": "always",
            "container-name-pattern": [
              "^(--)?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-media-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-property-empty-line-before": [
              "always",
              {
                "except": [
                  "after-custom-property",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "custom-property-no-missing-var-function": true,
            "custom-property-pattern": [
              "^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "declaration-block-no-duplicate-custom-properties": true,
            "declaration-block-no-duplicate-properties": [
              true,
              {
                "ignore": [
                  "consecutive-duplicates-with-different-syntaxes",
                ],
              },
            ],
            "declaration-block-no-redundant-longhand-properties": true,
            "declaration-block-no-shorthand-property-overrides": true,
            "declaration-block-single-line-max-declarations": 1,
            "declaration-empty-line-before": [
              "always",
              {
                "except": [
                  "after-declaration",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "declaration-property-value-keyword-no-deprecated": true,
            "declaration-property-value-no-unknown": null,
            "font-family-name-quotes": "always-where-recommended",
            "font-family-no-duplicate-names": true,
            "font-family-no-missing-generic-family-keyword": true,
            "function-calc-no-unspaced-operator": true,
            "function-linear-gradient-no-nonstandard-direction": true,
            "function-name-case": "lower",
            "function-no-unknown": null,
            "function-url-quotes": "always",
            "hue-degree-notation": "angle",
            "import-notation": "string",
            "keyframe-block-no-duplicate-selectors": true,
            "keyframe-declaration-no-important": true,
            "keyframe-selector-notation": "percentage-unless-within-keyword-only-block",
            "keyframes-name-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "layer-name-pattern": [
              "^([a-z][a-z0-9]*)([.-][a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "length-zero-no-unit": [
              true,
              {
                "ignore": [
                  "custom-properties",
                ],
                "ignorePreludeOfAtRules": [
                  "function",
                  "mixin",
                ],
              },
            ],
            "lightness-notation": "percentage",
            "media-feature-name-no-unknown": true,
            "media-feature-name-no-vendor-prefix": true,
            "media-feature-name-value-no-unknown": null,
            "media-feature-range-notation": "context",
            "media-query-no-invalid": null,
            "media-type-no-deprecated": true,
            "named-grid-areas-no-invalid": true,
            "nesting-selector-no-missing-scoping-root": [
              true,
              {
                "ignoreAtRules": [
                  "mixin",
                ],
              },
            ],
            "no-descending-specificity": true,
            "no-duplicate-at-import-rules": true,
            "no-duplicate-selectors": true,
            "no-empty-source": true,
            "no-invalid-double-slash-comments": true,
            "no-invalid-position-at-import-rule": [
              true,
              {
                "ignoreAtRules": [
                  "use",
                  "forward",
                ],
              },
            ],
            "no-invalid-position-declaration": true,
            "no-irregular-whitespace": true,
            "number-max-precision": 4,
            "property-no-deprecated": true,
            "property-no-unknown": true,
            "property-no-vendor-prefix": true,
            "rule-empty-line-before": [
              "always-multi-line",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "scss/at-else-empty-line-before": "never",
            "scss/at-else-if-parentheses-space-before": "always",
            "scss/at-extend-no-missing-placeholder": true,
            "scss/at-function-parentheses-space-before": "never",
            "scss/at-function-pattern": [
              "^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": "Expected function name to be kebab-case",
              },
            ],
            "scss/at-if-no-null": true,
            "scss/at-mixin-argumentless-call-parentheses": "never",
            "scss/at-mixin-parentheses-space-before": "never",
            "scss/at-mixin-pattern": [
              "^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": "Expected mixin name to be kebab-case",
              },
            ],
            "scss/at-rule-conditional-no-parentheses": true,
            "scss/at-rule-no-unknown": true,
            "scss/comment-no-empty": true,
            "scss/declaration-nested-properties-no-divided-groups": true,
            "scss/dollar-variable-colon-space-after": "always-single-line",
            "scss/dollar-variable-colon-space-before": "never",
            "scss/dollar-variable-empty-line-before": [
              "always",
              {
                "except": [
                  "after-dollar-variable",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "scss/dollar-variable-no-missing-interpolation": true,
            "scss/dollar-variable-pattern": [
              "^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
              {
                "message": "Expected variable name to be kebab-case, start with "--" or nothing.",
              },
            ],
            "scss/double-slash-comment-empty-line-before": [
              "always",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "between-comments",
                  "stylelint-commands",
                ],
              },
            ],
            "scss/double-slash-comment-whitespace-inside": "always",
            "scss/function-quote-no-quoted-strings-inside": true,
            "scss/function-unquote-no-unquoted-strings-inside": true,
            "scss/load-no-partial-leading-underscore": true,
            "scss/load-partial-extension": "never",
            "scss/no-duplicate-mixins": true,
            "scss/no-global-function-names": true,
            "scss/operator-no-newline-after": true,
            "scss/operator-no-newline-before": true,
            "scss/operator-no-unspaced": true,
            "scss/percent-placeholder-pattern": [
              "^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": "Expected placeholder to be kebab-case",
              },
            ],
            "selector-anb-no-unmatchable": true,
            "selector-attribute-quotes": "always",
            "selector-no-vendor-prefix": true,
            "selector-not-notation": "complex",
            "selector-pseudo-class-no-unknown": [
              true,
              {
                "ignorePseudoClasses": [
                  "deep",
                  "global",
                  "slotted",
                ],
              },
            ],
            "selector-pseudo-element-colon-notation": "double",
            "selector-pseudo-element-no-unknown": [
              true,
              {
                "ignorePseudoElements": [
                  "v-deep",
                  "v-global",
                  "v-slotted",
                ],
              },
            ],
            "selector-type-case": "lower",
            "selector-type-no-unknown": [
              true,
              {
                "ignore": [
                  "custom-elements",
                ],
              },
            ],
            "shorthand-property-no-redundant-values": true,
            "string-no-newline": true,
            "syntax-string-no-invalid": true,
            "unit-no-unknown": true,
            "value-keyword-case": [
              "lower",
              {
                "ignoreFunctions": [
                  "v-bind",
                ],
              },
            ],
            "value-no-vendor-prefix": [
              true,
              {
                "ignoreValues": [
                  "box",
                  "inline-box",
                ],
              },
            ],
          },
        }
      `)
  })

  it('should generate Vue config with CSS and SCSS rules when both enabled, with less opinionated maintainability rules', async () => {
    expect(await vue(true, true, false, { maintainability: true }))
      .toMatchInlineSnapshot(`
        {
          "extends": [
            "path/to/stylelint-config-html/vue",
          ],
          "files": [
            "**/*.vue",
          ],
          "plugins": [
            "path/to/stylelint-scss",
          ],
          "rules": {
            "alpha-value-notation": [
              "percentage",
              {
                "exceptProperties": [
                  "opacity",
                  "fill-opacity",
                  "flood-opacity",
                  "stop-opacity",
                  "stroke-opacity",
                ],
              },
            ],
            "annotation-no-unknown": null,
            "at-rule-descriptor-no-unknown": null,
            "at-rule-descriptor-value-no-unknown": null,
            "at-rule-empty-line-before": [
              "always",
              {
                "except": [
                  "blockless-after-blockless",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
                "ignoreAtRules": [
                  "else",
                ],
              },
            ],
            "at-rule-no-deprecated": true,
            "at-rule-no-unknown": null,
            "at-rule-no-vendor-prefix": true,
            "at-rule-prelude-no-invalid": null,
            "block-no-empty": true,
            "block-no-redundant-nested-style-rules": true,
            "color-function-alias-notation": "without-alpha",
            "color-function-notation": "modern",
            "color-hex-length": "short",
            "color-no-invalid-hex": true,
            "comment-empty-line-before": [
              "always",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "stylelint-commands",
                ],
              },
            ],
            "comment-no-empty": null,
            "comment-whitespace-inside": "always",
            "container-name-pattern": [
              "^(--)?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-media-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "custom-property-empty-line-before": [
              "always",
              {
                "except": [
                  "after-custom-property",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "custom-property-no-missing-var-function": true,
            "custom-property-pattern": [
              "^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "declaration-block-no-duplicate-custom-properties": true,
            "declaration-block-no-duplicate-properties": [
              true,
              {
                "ignore": [
                  "consecutive-duplicates-with-different-syntaxes",
                ],
              },
            ],
            "declaration-block-no-redundant-longhand-properties": true,
            "declaration-block-no-shorthand-property-overrides": true,
            "declaration-block-single-line-max-declarations": 1,
            "declaration-empty-line-before": [
              "always",
              {
                "except": [
                  "after-declaration",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "declaration-property-value-keyword-no-deprecated": true,
            "declaration-property-value-no-unknown": null,
            "font-family-name-quotes": "always-where-recommended",
            "font-family-no-duplicate-names": true,
            "font-family-no-missing-generic-family-keyword": true,
            "function-calc-no-unspaced-operator": true,
            "function-linear-gradient-no-nonstandard-direction": true,
            "function-name-case": "lower",
            "function-no-unknown": null,
            "function-url-quotes": "always",
            "hue-degree-notation": "angle",
            "import-notation": "string",
            "keyframe-block-no-duplicate-selectors": true,
            "keyframe-declaration-no-important": true,
            "keyframe-selector-notation": "percentage-unless-within-keyword-only-block",
            "keyframes-name-pattern": [
              "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "layer-name-pattern": [
              "^([a-z][a-z0-9]*)([.-][a-z0-9]+)*$",
              {
                "message": [Function],
              },
            ],
            "length-zero-no-unit": [
              true,
              {
                "ignore": [
                  "custom-properties",
                ],
                "ignorePreludeOfAtRules": [
                  "function",
                  "mixin",
                ],
              },
            ],
            "lightness-notation": "percentage",
            "media-feature-name-no-unknown": true,
            "media-feature-name-no-vendor-prefix": true,
            "media-feature-name-value-no-unknown": null,
            "media-feature-range-notation": "context",
            "media-query-no-invalid": null,
            "media-type-no-deprecated": true,
            "named-grid-areas-no-invalid": true,
            "nesting-selector-no-missing-scoping-root": [
              true,
              {
                "ignoreAtRules": [
                  "mixin",
                ],
              },
            ],
            "no-duplicate-at-import-rules": true,
            "no-duplicate-selectors": true,
            "no-empty-source": true,
            "no-invalid-double-slash-comments": true,
            "no-invalid-position-at-import-rule": [
              true,
              {
                "ignoreAtRules": [
                  "use",
                  "forward",
                ],
              },
            ],
            "no-invalid-position-declaration": true,
            "no-irregular-whitespace": true,
            "number-max-precision": 4,
            "property-no-deprecated": true,
            "property-no-unknown": true,
            "property-no-vendor-prefix": true,
            "rule-empty-line-before": [
              "always-multi-line",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                ],
              },
            ],
            "scss/at-else-empty-line-before": "never",
            "scss/at-else-if-parentheses-space-before": "always",
            "scss/at-extend-no-missing-placeholder": true,
            "scss/at-function-parentheses-space-before": "never",
            "scss/at-function-pattern": [
              "^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": "Expected function name to be kebab-case",
              },
            ],
            "scss/at-if-no-null": true,
            "scss/at-mixin-argumentless-call-parentheses": "never",
            "scss/at-mixin-parentheses-space-before": "never",
            "scss/at-mixin-pattern": [
              "^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": "Expected mixin name to be kebab-case",
              },
            ],
            "scss/at-rule-conditional-no-parentheses": true,
            "scss/at-rule-no-unknown": true,
            "scss/comment-no-empty": true,
            "scss/declaration-nested-properties-no-divided-groups": true,
            "scss/dollar-variable-colon-space-after": "always-single-line",
            "scss/dollar-variable-colon-space-before": "never",
            "scss/dollar-variable-empty-line-before": [
              "always",
              {
                "except": [
                  "after-dollar-variable",
                  "first-nested",
                ],
                "ignore": [
                  "after-comment",
                  "inside-single-line-block",
                ],
              },
            ],
            "scss/dollar-variable-no-missing-interpolation": true,
            "scss/dollar-variable-pattern": [
              "^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
              {
                "message": "Expected variable name to be kebab-case, start with "--" or nothing.",
              },
            ],
            "scss/double-slash-comment-empty-line-before": [
              "always",
              {
                "except": [
                  "first-nested",
                ],
                "ignore": [
                  "between-comments",
                  "stylelint-commands",
                ],
              },
            ],
            "scss/double-slash-comment-whitespace-inside": "always",
            "scss/function-quote-no-quoted-strings-inside": true,
            "scss/function-unquote-no-unquoted-strings-inside": true,
            "scss/load-no-partial-leading-underscore": true,
            "scss/load-partial-extension": "never",
            "scss/no-duplicate-mixins": true,
            "scss/no-global-function-names": true,
            "scss/operator-no-newline-after": true,
            "scss/operator-no-newline-before": true,
            "scss/operator-no-unspaced": true,
            "scss/percent-placeholder-pattern": [
              "^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$",
              {
                "message": "Expected placeholder to be kebab-case",
              },
            ],
            "selector-anb-no-unmatchable": true,
            "selector-attribute-quotes": "always",
            "selector-class-pattern": [
              "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
              {
                "message": [Function],
              },
            ],
            "selector-id-pattern": [
              "^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z][a-z0-9]*(-[a-z0-9]+)*)?(--[a-z][a-z0-9]*(-[a-z0-9]+)*)?$",
              {
                "message": [Function],
              },
            ],
            "selector-no-vendor-prefix": true,
            "selector-not-notation": "complex",
            "selector-pseudo-class-no-unknown": [
              true,
              {
                "ignorePseudoClasses": [
                  "deep",
                  "global",
                  "slotted",
                ],
              },
            ],
            "selector-pseudo-element-colon-notation": "double",
            "selector-pseudo-element-no-unknown": [
              true,
              {
                "ignorePseudoElements": [
                  "v-deep",
                  "v-global",
                  "v-slotted",
                ],
              },
            ],
            "selector-type-case": "lower",
            "selector-type-no-unknown": [
              true,
              {
                "ignore": [
                  "custom-elements",
                ],
              },
            ],
            "shorthand-property-no-redundant-values": true,
            "string-no-newline": true,
            "syntax-string-no-invalid": true,
            "unit-no-unknown": true,
            "value-keyword-case": [
              "lower",
              {
                "ignoreFunctions": [
                  "v-bind",
                ],
              },
            ],
            "value-no-vendor-prefix": [
              true,
              {
                "ignoreValues": [
                  "box",
                  "inline-box",
                ],
              },
            ],
          },
        }
      `)
  })
})

it('should generate Vue config with CSS and SCSS rules when both enabled, with all less opinionated rules', async () => {
  expect(await vue(true, true, false, true))
    .toMatchInlineSnapshot(`
      {
        "extends": [
          "path/to/stylelint-config-html/vue",
        ],
        "files": [
          "**/*.vue",
        ],
        "plugins": [
          "path/to/stylelint-scss",
        ],
        "rules": {
          "alpha-value-notation": [
            "percentage",
            {
              "exceptProperties": [
                "opacity",
                "fill-opacity",
                "flood-opacity",
                "stop-opacity",
                "stroke-opacity",
              ],
            },
          ],
          "annotation-no-unknown": null,
          "at-rule-descriptor-no-unknown": null,
          "at-rule-descriptor-value-no-unknown": null,
          "at-rule-empty-line-before": [
            "always",
            {
              "except": [
                "blockless-after-blockless",
                "first-nested",
              ],
              "ignore": [
                "after-comment",
              ],
              "ignoreAtRules": [
                "else",
              ],
            },
          ],
          "at-rule-no-deprecated": true,
          "at-rule-no-unknown": null,
          "at-rule-no-vendor-prefix": true,
          "at-rule-prelude-no-invalid": null,
          "block-no-empty": true,
          "block-no-redundant-nested-style-rules": true,
          "color-function-alias-notation": "without-alpha",
          "color-function-notation": "modern",
          "color-hex-length": "short",
          "color-no-invalid-hex": true,
          "comment-empty-line-before": [
            "always",
            {
              "except": [
                "first-nested",
              ],
              "ignore": [
                "stylelint-commands",
              ],
            },
          ],
          "comment-no-empty": null,
          "comment-whitespace-inside": "always",
          "container-name-pattern": [
            "^(--)?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
            {
              "message": [Function],
            },
          ],
          "custom-media-pattern": [
            "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
            {
              "message": [Function],
            },
          ],
          "custom-property-empty-line-before": [
            "always",
            {
              "except": [
                "after-custom-property",
                "first-nested",
              ],
              "ignore": [
                "after-comment",
                "inside-single-line-block",
              ],
            },
          ],
          "custom-property-no-missing-var-function": true,
          "custom-property-pattern": [
            "^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
            {
              "message": [Function],
            },
          ],
          "declaration-block-no-duplicate-custom-properties": true,
          "declaration-block-no-duplicate-properties": [
            true,
            {
              "ignore": [
                "consecutive-duplicates-with-different-syntaxes",
              ],
            },
          ],
          "declaration-block-no-redundant-longhand-properties": true,
          "declaration-block-no-shorthand-property-overrides": true,
          "declaration-block-single-line-max-declarations": 1,
          "declaration-empty-line-before": [
            "always",
            {
              "except": [
                "after-declaration",
                "first-nested",
              ],
              "ignore": [
                "after-comment",
                "inside-single-line-block",
              ],
            },
          ],
          "declaration-property-value-keyword-no-deprecated": true,
          "declaration-property-value-no-unknown": null,
          "font-family-name-quotes": "always-where-recommended",
          "font-family-no-duplicate-names": true,
          "font-family-no-missing-generic-family-keyword": true,
          "function-calc-no-unspaced-operator": true,
          "function-linear-gradient-no-nonstandard-direction": true,
          "function-name-case": "lower",
          "function-no-unknown": null,
          "function-url-quotes": "always",
          "hue-degree-notation": "angle",
          "import-notation": "string",
          "keyframe-block-no-duplicate-selectors": true,
          "keyframe-declaration-no-important": true,
          "keyframe-selector-notation": "percentage-unless-within-keyword-only-block",
          "keyframes-name-pattern": [
            "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
            {
              "message": [Function],
            },
          ],
          "layer-name-pattern": [
            "^([a-z][a-z0-9]*)([.-][a-z0-9]+)*$",
            {
              "message": [Function],
            },
          ],
          "length-zero-no-unit": [
            true,
            {
              "ignore": [
                "custom-properties",
              ],
              "ignorePreludeOfAtRules": [
                "function",
                "mixin",
              ],
            },
          ],
          "lightness-notation": "percentage",
          "media-feature-name-no-unknown": true,
          "media-feature-name-no-vendor-prefix": true,
          "media-feature-name-value-no-unknown": null,
          "media-feature-range-notation": "context",
          "media-query-no-invalid": null,
          "media-type-no-deprecated": true,
          "named-grid-areas-no-invalid": true,
          "nesting-selector-no-missing-scoping-root": [
            true,
            {
              "ignoreAtRules": [
                "mixin",
              ],
            },
          ],
          "no-duplicate-at-import-rules": true,
          "no-duplicate-selectors": true,
          "no-empty-source": true,
          "no-invalid-double-slash-comments": true,
          "no-invalid-position-at-import-rule": [
            true,
            {
              "ignoreAtRules": [
                "use",
                "forward",
              ],
            },
          ],
          "no-invalid-position-declaration": true,
          "no-irregular-whitespace": true,
          "number-max-precision": 4,
          "property-no-deprecated": true,
          "property-no-unknown": true,
          "property-no-vendor-prefix": true,
          "rule-empty-line-before": [
            "always-multi-line",
            {
              "except": [
                "first-nested",
              ],
              "ignore": [
                "after-comment",
              ],
            },
          ],
          "scss/at-else-empty-line-before": "never",
          "scss/at-else-if-parentheses-space-before": "always",
          "scss/at-extend-no-missing-placeholder": true,
          "scss/at-function-parentheses-space-before": "never",
          "scss/at-function-pattern": [
            "^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$",
            {
              "message": "Expected function name to be kebab-case",
            },
          ],
          "scss/at-if-no-null": true,
          "scss/at-mixin-argumentless-call-parentheses": "never",
          "scss/at-mixin-parentheses-space-before": "never",
          "scss/at-mixin-pattern": [
            "^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$",
            {
              "message": "Expected mixin name to be kebab-case",
            },
          ],
          "scss/at-rule-conditional-no-parentheses": true,
          "scss/at-rule-no-unknown": true,
          "scss/comment-no-empty": true,
          "scss/declaration-nested-properties-no-divided-groups": true,
          "scss/dollar-variable-colon-space-after": "always-single-line",
          "scss/dollar-variable-colon-space-before": "never",
          "scss/dollar-variable-empty-line-before": [
            "always",
            {
              "except": [
                "after-dollar-variable",
                "first-nested",
              ],
              "ignore": [
                "after-comment",
                "inside-single-line-block",
              ],
            },
          ],
          "scss/dollar-variable-no-missing-interpolation": true,
          "scss/dollar-variable-pattern": [
            "^(?:--)?[a-z][a-z0-9]*(?:-[a-z0-9]+)*$",
            {
              "message": "Expected variable name to be kebab-case, start with "--" or nothing.",
            },
          ],
          "scss/double-slash-comment-empty-line-before": [
            "always",
            {
              "except": [
                "first-nested",
              ],
              "ignore": [
                "between-comments",
                "stylelint-commands",
              ],
            },
          ],
          "scss/double-slash-comment-whitespace-inside": "always",
          "scss/function-quote-no-quoted-strings-inside": true,
          "scss/function-unquote-no-unquoted-strings-inside": true,
          "scss/load-no-partial-leading-underscore": true,
          "scss/load-partial-extension": "never",
          "scss/no-duplicate-mixins": true,
          "scss/no-global-function-names": true,
          "scss/operator-no-newline-after": true,
          "scss/operator-no-newline-before": true,
          "scss/operator-no-unspaced": true,
          "scss/percent-placeholder-pattern": [
            "^(-?[a-z][a-z0-9]*)(-[a-z0-9]+)*$",
            {
              "message": "Expected placeholder to be kebab-case",
            },
          ],
          "selector-anb-no-unmatchable": true,
          "selector-attribute-quotes": "always",
          "selector-no-vendor-prefix": true,
          "selector-not-notation": "complex",
          "selector-pseudo-class-no-unknown": [
            true,
            {
              "ignorePseudoClasses": [
                "deep",
                "global",
                "slotted",
              ],
            },
          ],
          "selector-pseudo-element-colon-notation": "double",
          "selector-pseudo-element-no-unknown": [
            true,
            {
              "ignorePseudoElements": [
                "v-deep",
                "v-global",
                "v-slotted",
              ],
            },
          ],
          "selector-type-case": "lower",
          "selector-type-no-unknown": [
            true,
            {
              "ignore": [
                "custom-elements",
              ],
            },
          ],
          "shorthand-property-no-redundant-values": true,
          "string-no-newline": true,
          "syntax-string-no-invalid": true,
          "unit-no-unknown": true,
          "value-keyword-case": [
            "lower",
            {
              "ignoreFunctions": [
                "v-bind",
              ],
            },
          ],
          "value-no-vendor-prefix": [
            true,
            {
              "ignoreValues": [
                "box",
                "inline-box",
              ],
            },
          ],
        },
      }
    `)
})
