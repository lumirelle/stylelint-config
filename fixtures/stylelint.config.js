import lumirelle from '@lumirelle/stylelint-config'

export default lumirelle({
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
