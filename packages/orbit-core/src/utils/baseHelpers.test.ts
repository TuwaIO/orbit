import { describe, expect, it, vi } from 'vitest';

import { OrbitAdapter } from '../types';
import { isSameAddress, normalizeAccountAddress } from './accountAddress';
import { errorChain } from './errorChain';
import { formatBaseUnits } from './formatBaseUnits';
import { formatConnectorName, IMPERSONATED_CONNECTOR_ID, SAFE_CONNECTOR_ID } from './formatConnectorName';
import { getConnectorTypeFromName } from './getConnectorTypeFromName';
import { getWalletFromConnectorType } from './getWalletFromConnectorType';
import { globalSingleton } from './globalSingleton';
import { isRecord } from './isRecord';
import { joinUrlPath, trimTrailingSlashes } from './joinUrlPath';
import { shortAddress } from './shortAddress';

describe('getConnectorTypeFromName', () => {
  // Pulsar passed the display name and Satellite the mapped one, so one wallet had two types: Base Account was
  // `evm:baseaccount` on its transactions and `evm:coinbase` on its connection
  it('gives one wallet one type, from its display name or from its ID', () => {
    expect(getConnectorTypeFromName(OrbitAdapter.EVM, 'Base Account')).toBe('evm:coinbase');
    expect(getConnectorTypeFromName(OrbitAdapter.EVM, formatConnectorName('Base Account'))).toBe('evm:coinbase');
    expect(getConnectorTypeFromName(OrbitAdapter.EVM, 'Trust Wallet')).toBe('evm:trust');
    expect(getConnectorTypeFromName(OrbitAdapter.EVM, 'Brave Wallet')).toBe('evm:brave');
    expect(getConnectorTypeFromName(OrbitAdapter.EVM, 'Safe')).toBe(`evm:${SAFE_CONNECTOR_ID}`);
    expect(getConnectorTypeFromName(OrbitAdapter.EVM, 'Impersonated Connector')).toBe(
      `evm:${IMPERSONATED_CONNECTOR_ID}`,
    );
    expect(getConnectorTypeFromName(OrbitAdapter.SOLANA, 'Phantom')).toBe('solana:phantom');
  });

  it('keeps its result for a name with no mapping', () => {
    expect(getConnectorTypeFromName(OrbitAdapter.EVM, 'MetaMask')).toBe('evm:metamask');
    expect(getConnectorTypeFromName(OrbitAdapter.EVM, 'Coinbase Wallet')).toBe('evm:coinbasewallet');
    expect(getConnectorTypeFromName(OrbitAdapter.EVM, '  Rabby  Wallet ')).toBe('evm:rabbywallet');
  });

  // Saved in the last connection and read by Satellite, so an ID that has been through the mapping must not move
  it('leaves an ID that went through the mapping as it is', () => {
    for (const id of ['coinbase', 'trust', 'brave', 'safe', 'impersonatedwallet']) {
      expect(getConnectorTypeFromName(OrbitAdapter.EVM, id)).toBe(`evm:${id}`);
    }
  });
});

describe('connector IDs', () => {
  // They are saved in `orbit-core:lastConnectedConnector`, so they can never change
  it('stay what saved records hold', () => {
    expect(IMPERSONATED_CONNECTOR_ID).toBe('impersonatedwallet');
    expect(SAFE_CONNECTOR_ID).toBe('safe');
  });
});

describe('getWalletFromConnectorType', () => {
  it('takes the part after the adapter, and nothing when there is none', () => {
    expect(getWalletFromConnectorType('evm:metamask')).toBe('metamask');
    expect(getWalletFromConnectorType('metamask')).toBeUndefined();
    expect(getWalletFromConnectorType('evm:')).toBe('');
    expect(getWalletFromConnectorType('evm:a:b')).toBe('a');
    expect(getWalletFromConnectorType(undefined)).toBeUndefined();
    expect(getWalletFromConnectorType(null)).toBeUndefined();
  });
});

describe('shortAddress', () => {
  it('keeps six characters for 0x and four otherwise, with the ellipsis glyph', () => {
    expect(shortAddress('0x1111111111111111111111111111111111112222')).toBe('0x1111…2222');
    expect(shortAddress('4aye4uNAafCDn4L7EBGXhwjDTxEHMMFYcGD169e4Udv8')).toBe('4aye…Udv8');
  });

  it('leaves a value that nothing would be saved on', () => {
    expect(shortAddress('0x123456789')).toBe('0x123456789');
    expect(shortAddress('0x1234567890')).toBe('0x1234…7890');
    expect(shortAddress('abcdefghi')).toBe('abcdefghi');
    expect(shortAddress('abcdefghij')).toBe('abcd…ghij');
  });

  it('takes other widths', () => {
    expect(shortAddress('0x1111111111111111111111111111111111112222', 4, 2)).toBe('0x11…22');
  });
});

describe('formatBaseUnits', () => {
  it('reads as a wallet takes it: exact, no grouping, no trailing zeros', () => {
    expect(formatBaseUnits('89540000', 6)).toBe('89.54');
    expect(formatBaseUnits('5000000', 6)).toBe('5');
    expect(formatBaseUnits('1', 18)).toBe('0.000000000000000001');
    expect(formatBaseUnits(1500000000n, 9)).toBe('1.5');
    expect(formatBaseUnits(0, 9)).toBe('0');
    expect(formatBaseUnits('000123', 0)).toBe('123');
    expect(formatBaseUnits('0005', 2)).toBe('0.05');
  });

  it('says nothing about what is no amount', () => {
    for (const value of [null, undefined, '', '-1', '1.5', '0x10', ' 12 ', -1, 1.5]) {
      expect(formatBaseUnits(value, 6)).toBeUndefined();
    }
  });

  // A copy button carries this text and it must match the wallet to the last digit
  it('matches BigInt arithmetic to the last digit over large amounts', () => {
    const big = (value: bigint, decimals: number) => {
      const scale = 10n ** BigInt(decimals);
      const fraction = (value % scale).toString().padStart(decimals, '0').replace(/0+$/, '');
      return fraction ? `${value / scale}.${fraction}` : String(value / scale);
    };
    let value = 1n;
    for (let i = 0; i < 400; i++) {
      value = (value * 1103515245n + 12345n) % 10n ** BigInt(1 + (i % 60));
      const decimals = i % 19;
      expect(formatBaseUnits(value.toString(), decimals)).toBe(big(value, decimals));
    }
  });
});

describe('the account address rule', () => {
  it('reads an EVM address in any case and any other exactly', () => {
    expect(normalizeAccountAddress('eip155', '0xAbC')).toBe('0xabc');
    expect(normalizeAccountAddress('solana', 'AbC')).toBe('AbC');
    expect(isSameAddress('eip155', '0xAbC', '0xaBc')).toBe(true);
    expect(isSameAddress('eip155', '0xAbC', '0xabd')).toBe(false);
    expect(isSameAddress('solana', 'AbC', 'abc')).toBe(false);
    expect(isSameAddress('solana', 'AbC', 'AbC')).toBe(true);
  });
});

describe('errorChain', () => {
  it('lists an error and what it wraps, of any kind', () => {
    const plain = { code: 4001 };
    const middle = new Error('middle', { cause: plain });
    const top = new Error('top', { cause: middle });
    expect(errorChain(top)).toEqual([top, middle, plain]);
    expect(errorChain('text')).toEqual(['text']);
    expect(errorChain(null)).toEqual([]);
    expect(errorChain(undefined)).toEqual([]);
  });

  it('stops at a cause that loops, and at a cause that is no object', () => {
    const a = new Error('a');
    const b = new Error('b', { cause: a });
    a.cause = b;
    expect(errorChain(a)).toEqual([a, b]);
    expect(errorChain(new Error('c', { cause: 'why' }))).toHaveLength(2);
  });
});

describe('globalSingleton', () => {
  it('makes one object per name, across copies of a package', () => {
    const create = vi.fn(() => ({ made: true }));
    const key = `orbit-test.${Math.random()}`;
    const first = globalSingleton(key, create);
    expect(globalSingleton(key, create)).toBe(first);
    expect(create).toHaveBeenCalledTimes(1);
  });

  // Published copies of the packages find each other under these exact symbols
  it('finds what a copy without this helper already put there', () => {
    const key = `orbit-test.${Math.random()}`;
    const existing = { published: true };
    (globalThis as unknown as Record<symbol, unknown>)[Symbol.for(key)] = existing;
    const create = vi.fn(() => ({}));
    expect(globalSingleton(key, create)).toBe(existing);
    expect(create).not.toHaveBeenCalled();
  });
});

describe('joinUrlPath', () => {
  it('joins with one slash', () => {
    expect(joinUrlPath('https://etherscan.io/', '/tx/0x1')).toBe('https://etherscan.io/tx/0x1');
    expect(joinUrlPath('https://etherscan.io//', 'tx/0x1')).toBe('https://etherscan.io/tx/0x1');
    expect(joinUrlPath('https://etherscan.io', 'tx/0x1')).toBe('https://etherscan.io/tx/0x1');
  });

  it('gives the base back as it is without a path', () => {
    expect(joinUrlPath('https://etherscan.io/')).toBe('https://etherscan.io/');
    expect(joinUrlPath('https://etherscan.io/', '')).toBe('https://etherscan.io/');
  });

  it('trims only the end', () => {
    expect(trimTrailingSlashes('https://a.io/b//')).toBe('https://a.io/b');
    expect(trimTrailingSlashes('https://a.io')).toBe('https://a.io');
  });
});

describe('isRecord', () => {
  it('takes any object but null and an array', () => {
    expect(isRecord({})).toBe(true);
    expect(isRecord(new Date())).toBe(true);
    expect(isRecord([])).toBe(false);
    expect(isRecord(null)).toBe(false);
    expect(isRecord('a')).toBe(false);
    expect(isRecord(undefined)).toBe(false);
  });
});
