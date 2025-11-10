import lumirelle from '@lumirelle/stylelint-config'

export default lumirelle({
  less: true,
  tailwindcss: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
    maxLineLength: 120,
  },
  ignoreFiles: [
    '!output/**',
  ],
})
