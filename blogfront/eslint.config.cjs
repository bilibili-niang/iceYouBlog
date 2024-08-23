module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-unused-components': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',
    camelcase: 'off',
    'promise/param-names': 'off',
    'vue/no-setup-props-destructure': 'off',
    'vue/multi-word-component-names': 'off',
    'no-undef': 'off',
    quotes: [2, 'single']
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        mocha: true
      }
    }
  ]
}
