module.exports = {
  env: {
    browser: false,
    es2021: true,
    node: true
  },
  extends: [
    'standard', 'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    camelcase: 'off'
  }
}
