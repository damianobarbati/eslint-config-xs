const fs = require('fs');

const package_name = process.env.npm_package_name;
const babelrc = package_name === 'eslint-config-xs' ? './.babelrc' : 'node_modules/eslint-config-xs/node/.babelrc';
const babelOptions = JSON.parse(fs.readFileSync(babelrc, 'utf8'));

module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
    node: true
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    requireConfigFile: false,
    babelOptions,
  },
  plugins: ['prettier', 'import', 'jest', 'node'],
  extends: ['eslint:recommended', 'prettier', 'plugin:jest/recommended', 'plugin:node/recommended'],
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