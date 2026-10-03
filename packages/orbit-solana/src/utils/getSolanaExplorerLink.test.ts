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

  it('reads CAIP-2 chain IDs with the genesis hash', () => {
    expect(getSolanaExplorerLink('tx/abc', 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1')).toBe(
      'https://explorer.solana.com/tx/abc?cluster=devnet',
    );
    expect(getSolanaExplorerLink('tx/abc', 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp')).toBe(
      'https://explorer.solana.com/tx/abc',
    );
  });

  it('defaults to mainnet without cluster query parameter when chainId is omitted', () => {
    const link = getSolanaExplorerLink('tx/abc');
    expect(link).toBe('https://explorer.solana.com/tx/abc');
  });

  it('treats mainnet-beta as the explorer default', () => {
    expect(getSolanaExplorerLink('tx/abc', 'mainnet-beta')).toBe('https://explorer.solana.com/tx/abc');
    expect(getSolanaExplorerLink('tx/abc', 'solana:mainnet-beta')).toBe('https://explorer.solana.com/tx/abc');
  });

  it('handles empty path by falling back to root slash', () => {
    const link = getSolanaExplorerLink(undefined, 'mainnet');
    expect(link).toBe('https://explorer.solana.com/');
  });
});
