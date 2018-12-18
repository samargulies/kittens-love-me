module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/eslint-config-airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 'off',
    'no-unused-vars':  process.env.NODE_ENV === 'production' ? 'error' : 'warn'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
