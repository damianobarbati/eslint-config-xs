const fs = require('fs');
const path = require('path');

const tsconfig_path = path.resolve('./tsconfig.json');

try {
  fs.accessSync(tsconfig_path)
} catch {
  console.error('No tsconfig.json was found in your project, using "eslint-config-xs" default one.')
  process.exit(1);
}

module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2022,
    "ecmaFeatures": {
      "jsx": true
    },
    // ts requirements
    project: tsconfig_path,
    tsconfigRootDir: process.cwd(),
    createDefaultProgram: true,
    requireConfigFile: false,

  },
  "env": {
    "browser": true,
    "es2022": true,
    "node": true
  },
  "plugins": [
    "@typescript-eslint",
    "prettier",
    "simple-import-sort",
    "react",
    "react-hooks",
    "testing-library",
    "tailwindcss"
  ],
  "extends": [
    "plugin:@typescript-eslint/recommended",
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    "prettier",
    'plugin:react/recommended',
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended"
  ],
  "overrides": [
    // Only uses Testing Library lint rules in test files
    {
      "files": [
        "**/*.test.[jt]s?(x)"
      ],
      "extends": ["plugin:testing-library/react"]
    }
  ],
  "rules": {
    "no-console": "off",
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "printWidth": 120
      }
    ],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn", {"ignoreRestSiblings": true, "argsIgnorePattern": "^_"}
    ],
    "simple-import-sort/imports": [
      "error",
      {
        "groups": [
          [
            // Node and React and related packages come first
            "^(react|node:)", "^@?\\w",
            // Internal packages.
            "^(@|components)(/.*|$)",
            // Side effect imports.
            "^\\u0000",
            // Parent imports. Put `..` last.
            "^\\.\\.(?!/?$)", "^\\.\\./?$",
            // Other relative imports. Put same-folder imports and `.` last.
            "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$",
            // Style imports.
            "^.+\\.?(css)$"
          ]
        ]
      }
    ],
    "simple-import-sort/exports": "error",
    "tailwindcss/no-custom-classname": "error"
  },
  "settings": {
    "react": {
      "version": "detect"
    },
    "tailwindcss": {
      "config": "./services/web/tailwind.config.js",
      "cssFiles": [
        "./services/web/src/**/*.css"
      ]
    }
  }
}