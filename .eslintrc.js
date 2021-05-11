module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
    // 'plugin:prettier/recommended'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'no-control-regex': 0
  }
}
