# ESLint config xs

This package provides an opinionated ESLint and Prettier configuration for NodeJS and/or ReactJS (and possibly Tailwind) projects, either Javascript and/or Typescript based.  

## Rules

The following rules are explicitly applied on top of the base configuration exported from plugins:
- `"no-console": "off"`: node may use the native `console.log` and `console.error` without using 3rd party logging libraries
- `"import/order": "error"`: for improved readability
- `"singleQuote": true`: for improved readability
- `"printWidth": 120`: for improved readability, assuming a professional developer uses >= 21" display

You should provide in the root of your project:
- `.prettierrc` (not mandatory)
- `tsconfig.json` (mandatory)
- `tailwind.config.(js|cjs|mjs)` (not mandatory)

If your tailwind config is not in the root of the project (eg: you are in a monorepo with `pnpm`) then provide the tailwind config path explictly to `eslint-config-xs` with an env named `ESLINT_XS_TW`:
```sh
ESLINT_XS_TW=packages/webapp/tailwind.config.ts pnpm eslint ./packages
```

## Usage

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
