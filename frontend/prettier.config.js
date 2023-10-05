const baseSetup = require('@kallechen/prettier-config')

module.exports = {
  ...baseSetup,
  plugins: ['prettier-plugin-tailwindcss'],
}
