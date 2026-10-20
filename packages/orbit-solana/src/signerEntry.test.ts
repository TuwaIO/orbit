import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

const source = (file: string) => readFileSync(fileURLToPath(new URL(file, import.meta.url)), 'utf8');

describe('the /signer entry', () => {
  it('exports the message signer and imports nothing but @solana/kit', () => {
    expect(source('./signer.ts')).toContain("export * from './utils/createSolanaMessageSigner';");
    // The code without comments: the JSDoc example imports the package itself
    const code = source('./utils/createSolanaMessageSigner.ts').replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
    const imports = [...code.matchAll(/from '([^']+)'/g)].map((match) => match[1]);
    expect(new Set(imports)).toEqual(new Set(['@solana/kit']));
  });
});
