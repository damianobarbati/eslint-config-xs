const fs = require('fs');
const path = require('path');

const package_name = process.env.npm_package_name;
// const babelrc = package_name === 'eslint-config-xs' ? './.babelrc' : 'node_modules/eslint-config-xs/react/.babelrc';
// const babelOptions = JSON.parse(fs.readFileSync(babelrc, 'utf8'));
const tsconfig = package_name === 'eslint-config-xs' ? './tsconfig.json' : 'node_modules/eslint-config-xs/node/tsconfig.json';
// const tsconfigOptions = JSON.parse(fs.readFileSync(tsconfig, 'utf8'));

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
    files: ['*.js', '*.ts'],
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier', 'import', 'jest'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'prettier', 'plugin:jest/recommended'],
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
