// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseSetup = require('@kallechen/prettier-config')

module.exports = {
  ...baseSetup,
  plugins: ['prettier-plugin-tailwindcss'],
}
