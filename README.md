# ESLint config xs

This package provides an opinionated ESLint configuration for Javascript and Typescript codebases, either NodeJS or ReactJS based.  

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

You can use:
- `"eslint-config-xs"` for a NodeJS and ReactJS based codebase
- `"eslint-config-xs/node"` for a NodeJS based codebase
- `"eslint-config-xs/node-ts"` for a NodeJS + Typescript based codebase
- `"eslint-config-xs/react"` for a ReactJS based codebase
- `"eslint-config-xs/react-ts"` for a ReactJS + Typescript based codebase

Extend if needed:
```json
{
  "extends": "eslint-config-xs",
  "...my other rules..": ["..."]
}
```

Lint and fix:
```sh
yarn eslint --fix .
```