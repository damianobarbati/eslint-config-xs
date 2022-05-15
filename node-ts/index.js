module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import', 'jest', 'node'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'prettier', 'plugin:jest/recommended', 'plugin:node/recommended'],
  rules: {
    'no-console': 'off',
    'max-lines-per-function': ['error', 200],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 160,
      },
    ],
    'import/order': 'error',
    'import/extensions': ['error', 'ignorePackages']
  },
  settings: {
    jest: {
      version: 'detect',
    },
  },
};
