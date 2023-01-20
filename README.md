# ESLint config xs

This package provides an opinionated ESLint and Prettier configuration for NodeJS or ReactJS projects, either Javascript or Typescript based.

## Rules

The following rules are explicitly applied on top of the base configuration exported from plugins:
- `"no-console": "off"`: services currently log using the native `console.log` and `console.error` without using 3rd party logging libraries
- `"import/order": "error"`: for improved readability
- `"singleQuote": true`: for improved readability
- `"printWidth": 160`: for improved readability, assuming a professional developer uses 24+ inches display

## Installation

Install:
```sh
yarn add --dev eslint-config-xs
```

Create a `.eslintrc`:
```json
{
  "extends": ["eslint-config-xs"]
}
```

You can extend:
- `"eslint-config-xs"` for a NodeJS + ReactJS + JavaScript codebase
- `"eslint-config-xs/node"` for a NodeJS + JavaScript codebase
- `"eslint-config-xs/node-ts"` for a NodeJS + Typescript codebase
- `"eslint-config-xs/react"` for a ReactJS + Javascript codebase
- `"eslint-config-xs/react-ts"` for a ReactJS + Typescript codebase

You can extend both `eslint-config-xs/react-ts` and `eslint-config-xs/node-ts` for a NodeJS + ReactJS + Typescript codebase.  

Extend as needed in your `.eslintrc`:
```json
{
  "extends": ["eslint-config-xs"],
  "...my other rules..": ["..."]
}
```

Lint and fix:
```sh
yarn eslint --fix .
```