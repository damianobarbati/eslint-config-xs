import { describe, it, expect } from 'vitest';
import { ESLint } from 'eslint';

const eslint = new ESLint({
  overrideConfigFile: './src/index.js',
});

describe('eslint-config-xs', () => {
  it('NodeJS with js content in .js file', async () => {
    const [result] = await eslint.lintFiles('./src/test-files/node-js.js');
    const rules = result.messages.map(m => m.ruleId);

    expect(rules.length).toEqual(2);
    expect(rules.includes('prettier/prettier')).toEqual(true);
    expect(rules.includes('@typescript-eslint/no-unused-vars')).toEqual(true);
  })

  it('NodeJS with ts content in .ts file', async () => {
    const [result] = await eslint.lintFiles('./src/test-files/node-ts.ts');
    const rules = result.messages.map(m => m.ruleId);

    expect(rules.length).toEqual(3);
    expect(rules.includes('prettier/prettier')).toEqual(true);
    expect(rules.includes('@typescript-eslint/no-unsafe-call')).toEqual(true);
    expect(rules.includes('@typescript-eslint/require-await')).toEqual(true);
  })

  it('ReactJS with js content in .tsx file', async () => {
    const [result] = await eslint.lintFiles('./src/test-files/react-js.jsx');
    const rules = result.messages.map(m => m.ruleId);

    expect(rules.length).toEqual(2);
    expect(rules.includes('prettier/prettier')).toEqual(true);
    expect(rules.includes('@typescript-eslint/no-unsafe-return')).toEqual(true);
  })

  it('ReactJS with ts content in .tsx file', async () => {
    const [result] = await eslint.lintFiles('./src/test-files/react-ts.tsx');
    const rules = result.messages.map(m => m.ruleId);

    expect(rules.length).toEqual(3);
    expect(rules.includes('prettier/prettier')).toEqual(true);
    expect(rules.includes('@typescript-eslint/no-unused-vars')).toEqual(true);
    expect(rules.includes('@typescript-eslint/no-unsafe-return')).toEqual(true);
  })
})