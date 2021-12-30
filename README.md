# ESLint config xs

This package provides an opinionated ESLint configuration for JavaScript projects, both NodeJS and ReactJS.

You can check eslint plugins used directly from the [plugins](https://github.com/damianoabarbati/eslint-config-xs/blob/main/default/index.js) section.

## Rules

The following rules are explicitly applied on top of the base configuration exported from plugins:
- `"no-console": "off"`: services currently log using the native `console.log` and `console.error` without using 3rd party logging libraries
- `"max-lines-per-function": ["error", 200]`: good indicator of a too complex function
- `"import/order": "error"`: for improved readability
- `"singleQuote": true`: for improved readability
- `"printWidth": 160`: for improved readability, assuming company developers are supposed to use at least a 24" display

## Installation

Install:
```sh
yarn add --dev eslint-config-xs
```

Create a `.eslintrc` file with the following content for a Nodejs project:
```json
{
  "extends": ["eslint-config-xs"]
}
```

To extend default `.babelrc` with custom rules, create a `.babelrc` file with the following content for a Nodejs project:
```json
{
  "extends": "eslint-config-xs",
  "...my other rules..": ["..."]
}
```

Nota bene: you can either use
- `"eslint-config-xs/node"` for a Node codebase
- `"eslint-config-xs/react"` for a React codebase
- `"eslint-config-xs"` for a both Node and React codebase

Lint and fix:
```sh
yarn eslint --fix .
```