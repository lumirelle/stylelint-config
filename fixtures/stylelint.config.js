import lumirelle from '@lumirelle/stylelint-config'

export default lumirelle({
  tailwindcss: true,
  ignoreFiles: [
    '!output/**',
  ],
})
