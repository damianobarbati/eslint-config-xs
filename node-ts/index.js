const fs = require('fs');
const path = require('path');

const package_name = process.env.npm_package_name;

let tsconfig_path = package_name === 'eslint-config-xs' ? './tsconfig.json' : 'node_modules/eslint-config-xs/node-ts/tsconfig.json';

// use explicit one if provided
try {
  fs.accessSync('./tsconfig.json');
  tsconfig_path = './tsconfig.json';
} catch {}

tsconfig_path = path.resolve(tsconfig_path);

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
    project: tsconfig_path,
    tsconfigRootDir: process.cwd(),
    createDefaultProgram: true
  },
  plugins: ['@typescript-eslint', 'prettier', 'import', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    'prettier',
    'plugin:jest/recommended'
  ],
  rules: {
    'no-console': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 160,
      },
    ],
    'import/order': 'error',
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "": "never",
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    '@typescript-eslint/ban-ts-comment': 'off'
  },
  settings: {
    jest: {
      version: 'detect',
    },
  },
};
