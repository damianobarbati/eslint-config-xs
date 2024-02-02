const fs = require('fs');
const path = require('path');

// look for tsconfig.json
const ts_config_path = path.resolve('./tsconfig.json');
try {
  fs.accessSync(ts_config_path)
} catch {
  console.warn('No "tsconfig.json" was found in your project.')
  process.exit(1)
}

// look for tailwind.config.js if not provided with the ESLINT_XS_TW env
let tw_config_path = process.env.ESLINT_XS_TW;
if (!tw_config_path) {
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
}

const classNamesAttributeFunctions = ["classnames", "clsx", "ctl", "cx", "cva"];

// look for prettier.config.js
const prettier_config_path = path.resolve('./.prettierrc');
const prettierConfig = {
  singleQuote: true,
  printWidth: 120,
  tailwindConfig: tw_config_path || undefined,
  tailwindFunctions: classNamesAttributeFunctions
};

try {
  fs.accessSync(prettier_config_path)
  const userPrettierConfig = JSON.parse(fs.readFileSync(prettier_config_path, 'utf8'));
  Object.assign(prettierConfig, userPrettierConfig)
} catch {
  console.warn('No ".prettierrc" was found in your project, using eslint-config-xs package default one.');
}

const config = {
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
      "callees": classNamesAttributeFunctions,
      "config": tw_config_path,
      "cssFiles": [
        "**/*.css",
        "!node_modules/**"
      ]
    }
  }
}

if (process.env.ESLINT_XS_DEBUG) console.log(JSON.stringify(config, null, 2));

module.exports = config;
