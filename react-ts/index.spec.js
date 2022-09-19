const { strict: assert } = require('assert');
const { ESLint } = require('eslint');

(async () => {
  const eslint = new ESLint({
    overrideConfigFile: './index.js',
  });

  const [result] = await eslint.lintFiles('./test-js.tsx');
  const rules = result.messages.map(m => m.ruleId);

  assert.deepEqual(rules.length, 2);
  assert.deepEqual(rules.includes('@typescript-eslint/no-unused-vars'), true);
  assert.deepEqual(rules.includes('@typescript-eslint/no-unsafe-return'), true);
})();

(async () => {
  const eslint = new ESLint({
    overrideConfigFile: './index.js',
  });

  const [result] = await eslint.lintFiles('./test.ts');
  const rules = result.messages.map(m => m.ruleId);

  assert.deepEqual(rules.length, 2);
  assert.deepEqual(rules.includes('@typescript-eslint/no-unsafe-call'), true);
  assert.deepEqual(rules.includes('prettier/prettier'), true);
})();