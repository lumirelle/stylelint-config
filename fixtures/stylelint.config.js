import lumirelle from '@lumirelle/stylelint-config'

export default lumirelle({
  tailwindcss: true,
  formatter: 'prettier',
  ignoreFiles: [
    '!output/**',
  ],
})
