import { describe, expect, it } from 'vitest';

import { getSolanaExplorerLink } from './getSolanaExplorerLink';

describe('getSolanaExplorerLink', () => {
  it('generates explorer link for mainnet without cluster query parameter', () => {
    const link = getSolanaExplorerLink('tx/5abc123', 'mainnet');
    expect(link).toBe('https://explorer.solana.com/tx/5abc123');
  });

  it('generates explorer link for devnet with cluster query parameter', () => {
    const link = getSolanaExplorerLink('tx/5abc123', 'devnet');
    expect(link).toBe('https://explorer.solana.com/tx/5abc123?cluster=devnet');
  });

  it('handles solana: cluster prefix correctly', () => {
    const link = getSolanaExplorerLink('address/7xyz', 'solana:testnet');
    expect(link).toBe('https://explorer.solana.com/address/7xyz?cluster=testnet');
  });

  it('handles empty path by falling back to root slash', () => {
    const link = getSolanaExplorerLink(undefined, 'mainnet');
    expect(link).toBe('https://explorer.solana.com/');
  });
});
