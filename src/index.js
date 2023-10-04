const fs = require('fs');
const path = require('path');

// look for prettier.config.js
const prettier_config_path = path.resolve('./.prettierrc');
let prettierConfig;

try {
  fs.accessSync(prettier_config_path)
  prettierConfig = JSON.parse(fs.readFileSync(prettier_config_path, 'utf8'));
} catch {
  console.warn('No ".prettierrc" was found in your project.');
  prettierConfig = {
    "singleQuote": true,
    "printWidth": 120
  };
}

// look for tsconfig.json
const ts_config_path = path.resolve('./tsconfig.json');
try {
  fs.accessSync(ts_config_path)
} catch {
  console.warn('No "tsconfig.json" was found in your project.')
  process.exit(1)
}

// look for tailwind.config.js
let tw_config_path = null;

for (const ext of ['js', 'cjs', 'mjs']) {
  try {
    const tw_config_path_ext = path.resolve(`./tailwind.config.${ext}`);
    fs.accessSync(tw_config_path_ext);
    tw_config_path = tw_config_path_ext;
    break;
  } catch {
    continue;
  }
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
    project: ts_config_path,
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
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic",
    "prettier",
    "plugin:react/recommended",
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
    "prettier/prettier": ["error", prettierConfig],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "error", { "prefer": "type-imports" }
    ],
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
      "config": tw_config_path,
      "cssFiles": [
        "**/*.css",
        "!node_modules/**"
      ]
    }
  }
}