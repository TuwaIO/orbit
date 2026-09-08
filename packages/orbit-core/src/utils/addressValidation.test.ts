import { describe, expect, it } from 'vitest';

import { isAddress } from './addressValidation';

describe('addressValidation', () => {
  describe('EVM address validation', () => {
    it('validates a standard Ethereum address', () => {
      expect(isAddress('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', 'evm')).toBe(true);
      expect(isAddress('0x0000000000000000000000000000000000000000', 'evm')).toBe(true);
    });

    it('validates lowercased and uppercased hex addresses with whitespace', () => {
      expect(isAddress('  0xd8da6bf26964af9d7eed9e03e53415d37aa96045  ', 'evm')).toBe(true);
      expect(isAddress('0xD8DA6BF26964AF9D7EED9E03E53415D37AA96045', 'evm')).toBe(true);
    });

    it('rejects invalid EVM addresses', () => {
      expect(isAddress('0x123', 'evm')).toBe(false);
      expect(isAddress('d8dA6BF26964aF9D7eEd9e03E53415D37aA96045', 'evm')).toBe(false);
      expect(isAddress('0xZ8dA6BF26964aF9D7eEd9e03E53415D37aA96045', 'evm')).toBe(false);
      expect(isAddress('', 'evm')).toBe(false);
    });
  });

  describe('Solana address validation', () => {
    it('validates standard Solana Base58 public keys', () => {
      expect(isAddress('11111111111111111111111111111111', 'solana')).toBe(true);
      expect(isAddress('So11111111111111111111111111111111111111112', 'solana')).toBe(true);
      expect(isAddress('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', 'solana')).toBe(true);
    });

    it('validates Solana addresses with leading/trailing whitespace', () => {
      expect(isAddress('  EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v  ', 'solana')).toBe(true);
    });

    it('rejects non-Base58 or invalid length Solana addresses', () => {
      // Base58 excludes 0, O, I, l
      expect(isAddress('0OjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', 'solana')).toBe(false);
      expect(isAddress('short', 'solana')).toBe(false);
      expect(isAddress('', 'solana')).toBe(false);
    });
  });

  describe('Auto mode validation', () => {
    it('correctly detects EVM and Solana addresses in auto mode', () => {
      expect(isAddress('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045')).toBe(true);
      expect(isAddress('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v')).toBe(true);
      expect(isAddress('invalid_address_string')).toBe(false);
      expect(isAddress('')).toBe(false);
    });
  });
});
