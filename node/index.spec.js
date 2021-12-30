const { strict: assert } = require('assert');
const { ESLint } = require('eslint');

(async () => {
  const eslint = new ESLint({
    overrideConfigFile: './index.js',
  });

  const code = `const foo = "bar";`;
  const [result] = await eslint.lintText(code);
  const rules = result.messages.map(m => m.ruleId);

  assert.deepEqual(rules.includes('no-unused-vars'), true);
  assert.deepEqual(rules.includes('prettier/prettier'), true);
})();