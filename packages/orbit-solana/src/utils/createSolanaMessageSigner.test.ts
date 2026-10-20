import {
  address,
  compileOffchainMessageV1Envelope,
  getBase58Decoder,
  getBase58Encoder,
  getUtf8Encoder,
} from '@solana/kit';
import { describe, expect, it, vi } from 'vitest';

import { createSolanaMessageSigner } from './createSolanaMessageSigner';

const bytesOf = (text: string) => new Uint8Array(getUtf8Encoder().encode(text));
const base58 = (bytes: Uint8Array) => getBase58Decoder().decode(bytes);

describe('createSolanaMessageSigner', () => {
  it('signs with the solana:signMessage feature of the wallet', async () => {
    const signature = new Uint8Array([1, 2, 3, 4]);
    const signMessage = vi.fn().mockResolvedValue([{ signature }]);
    const wallet = { features: { 'solana:signMessage': { signMessage } } };
    const account = { address: 'mock-account' };

    const result = await createSolanaMessageSigner({ wallet, account })('Hello Solana');

    expect(signMessage).toHaveBeenCalledWith({ account, message: bytesOf('Hello Solana') });
    expect(result).toBe(base58(signature));
  });

  it('signs with the solana:signMessage feature of the account when the wallet lists no features', async () => {
    const signature = new Uint8Array([5, 6, 7, 8]);
    const signMessage = vi.fn().mockResolvedValue([{ signature }]);
    const account = { address: 'mock-account', features: { 'solana:signMessage': { signMessage } } };

    expect(await createSolanaMessageSigner({ wallet: {}, account })('Test')).toBe(base58(signature));
  });

  it('falls back to signMessages, called on its owner', async () => {
    const signature = new Uint8Array([9, 10, 11, 12]);
    class Adapter {
      readonly label = 'adapter';
      async signMessages(this: Adapter, inputs: readonly { message: Uint8Array }[]) {
        expect(this.label).toBe('adapter');
        expect(inputs[0].message).toEqual(bytesOf('Fallback'));
        return [{ signature }];
      }
    }

    expect(await createSolanaMessageSigner({ wallet: new Adapter() })('Fallback')).toBe(base58(signature));
  });

  it('falls back to a legacy signMessage that returns bytes or { signature }, called on its owner', async () => {
    const signature = new Uint8Array([13, 14, 15, 16]);
    class Adapter {
      readonly label = 'adapter';
      async signMessage(this: Adapter) {
        expect(this.label).toBe('adapter');
        return signature;
      }
    }

    expect(await createSolanaMessageSigner(new Adapter())('Legacy')).toBe(base58(signature));
    expect(
      await createSolanaMessageSigner({ wallet: { signMessage: vi.fn().mockResolvedValue({ signature }) } })('Legacy'),
    ).toBe(base58(signature));
  });

  it('rejects a missing target, a target without a signing capability and invalid wallet outputs', async () => {
    const sign = (target: unknown) => createSolanaMessageSigner(target as never)('test');

    await expect(sign(null)).rejects.toThrow('[ORBIT-SOLANA] Invalid signer target.');
    await expect(sign({ wallet: {}, account: {} })).rejects.toThrow(
      '[ORBIT-SOLANA] Signer lacks known message signing capabilities.',
    );
    await expect(
      sign({ wallet: { features: { 'solana:signMessage': { signMessage: vi.fn().mockResolvedValue([]) } } } }),
    ).rejects.toThrow('[ORBIT-SOLANA] Wallet returned invalid signMessage output.');
    await expect(sign({ signMessages: vi.fn().mockResolvedValue([{}]) })).rejects.toThrow(
      '[ORBIT-SOLANA] Wallet returned invalid signMessages output.',
    );
    await expect(sign({ signMessage: vi.fn().mockResolvedValue('not bytes') })).rejects.toThrow(
      '[ORBIT-SOLANA] Unexpected legacy signMessage result format.',
    );
  });

  it('starts its errors with errorPrefix', async () => {
    await expect(createSolanaMessageSigner({}, { errorPrefix: '[SATELLITE-SOLANA]' })('test')).rejects.toThrow(
      '[SATELLITE-SOLANA] Signer lacks known message signing capabilities.',
    );
  });

  it('passes the error of the wallet through when the user rejects', async () => {
    const rejected = new Error('User rejected the request.');
    const signMessage = vi.fn().mockRejectedValue(rejected);

    await expect(createSolanaMessageSigner({ signMessage })('test')).rejects.toBe(rejected);
  });
});

describe('createSolanaMessageSigner with off-chain messages', () => {
  async function createAccount() {
    const keyPair = (await globalThis.crypto.subtle.generateKey('Ed25519', true, ['sign', 'verify'])) as CryptoKeyPair;
    const publicKey = new Uint8Array(await globalThis.crypto.subtle.exportKey('raw', keyPair.publicKey));
    return { keyPair, publicKey, address: base58(publicKey) };
  }

  type Account = Awaited<ReturnType<typeof createAccount>>;

  function envelopeOf(signer: string, content: string): Uint8Array<ArrayBuffer> {
    return new Uint8Array(
      compileOffchainMessageV1Envelope({ version: 1, content, requiredSignatories: [{ address: address(signer) }] })
        .content,
    );
  }

  async function signEnvelope(account: Account, content: string) {
    const signedOffchainMessage = envelopeOf(account.address, content);
    const signature = new Uint8Array(
      await globalThis.crypto.subtle.sign('Ed25519', account.keyPair.privateKey, signedOffchainMessage),
    );
    return { signedOffchainMessage, signature };
  }

  const signBytes = (account: Account) =>
    vi.fn(
      async (message: Uint8Array) =>
        new Uint8Array(
          await globalThis.crypto.subtle.sign('Ed25519', account.keyPair.privateKey, new Uint8Array(message)),
        ),
    );

  async function verifies(publicKey: Uint8Array, signature: string, data: Uint8Array<ArrayBuffer>) {
    const key = await globalThis.crypto.subtle.importKey('raw', new Uint8Array(publicKey), 'Ed25519', false, [
      'verify',
    ]);
    return globalThis.crypto.subtle.verify('Ed25519', key, new Uint8Array(getBase58Encoder().encode(signature)), data);
  }

  /** A Wallet Standard wallet with `solana:signMessage` and `solana:signOffchainMessage`, and its account. */
  function walletWith(account: Account, accountFeatures: string[], supportedMessageVersions: number[] = [1]) {
    const walletAccount = { address: account.address, publicKey: account.publicKey, features: accountFeatures };
    const signOffchainMessage = vi.fn(async (input: { message: string }) => [
      await signEnvelope(account, input.message),
    ]);
    const sign = signBytes(account);
    const signMessage = vi.fn(async (input: { message: Uint8Array }) => [{ signature: await sign(input.message) }]);
    const wallet = {
      features: {
        'solana:signMessage': { version: '1.0.0', signMessage },
        'solana:signOffchainMessage': { version: '1.0.0', supportedMessageVersions, signOffchainMessage },
      },
    };
    return { wallet, account: walletAccount, signMessage, signOffchainMessage };
  }

  /** `useWallet()` of `@solana/wallet-adapter` v3: an account handle, and the signing methods on the snapshot. */
  function walletAdapterV3(account: Account, accountFeatures: string[]) {
    return {
      wallet: { adapter: { name: 'Phantom', icon: 'data:image/svg+xml;base64,', url: '', readyState: 'Installed' } },
      account: { address: account.address, publicKey: account.publicKey, chains: [], features: accountFeatures },
      address: account.address,
      publicKey: { toBase58: () => account.address },
      signMessage: signBytes(account),
      signOffchainMessage: vi.fn((message: string) => signEnvelope(account, message)),
    };
  }

  it('signs the off-chain message when the account cannot sign plain messages', async () => {
    const account = await createAccount();
    const target = walletWith(account, ['solana:signOffchainMessage']);

    const signature = await createSolanaMessageSigner({ wallet: target.wallet, account: target.account })('Hello');

    expect(target.signMessage).not.toHaveBeenCalled();
    expect(target.signOffchainMessage).toHaveBeenCalledWith({
      account: target.account,
      message: 'Hello',
      messageVersion: 1,
      requiredSigners: [account.publicKey],
    });
    expect(await verifies(account.publicKey, signature, envelopeOf(account.address, 'Hello'))).toBe(true);
  });

  it('keeps solana:signMessage when the account supports it', async () => {
    const account = await createAccount();
    const target = walletWith(account, ['solana:signMessage', 'solana:signOffchainMessage']);

    const signature = await createSolanaMessageSigner({ wallet: target.wallet, account: target.account })('Hello');

    expect(target.signMessage).toHaveBeenCalled();
    expect(target.signOffchainMessage).not.toHaveBeenCalled();
    expect(await verifies(account.publicKey, signature, bytesOf('Hello'))).toBe(true);
  });

  it('follows messageFormat', async () => {
    const account = await createAccount();
    const both = walletWith(account, ['solana:signMessage', 'solana:signOffchainMessage']);
    await createSolanaMessageSigner(
      { wallet: both.wallet, account: both.account },
      { messageFormat: 'offchainMessage' },
    )('Hello');
    expect(both.signOffchainMessage).toHaveBeenCalled();
    expect(both.signMessage).not.toHaveBeenCalled();

    const offchainOnly = walletWith(account, ['solana:signOffchainMessage']);
    await createSolanaMessageSigner(
      { wallet: offchainOnly.wallet, account: offchainOnly.account },
      { messageFormat: 'message' },
    )('Hello');
    expect(offchainOnly.signMessage).toHaveBeenCalled();
    expect(offchainOnly.signOffchainMessage).not.toHaveBeenCalled();
  });

  it('signs the off-chain message when the target has no other way to sign', async () => {
    const account = await createAccount();
    const target = {
      wallet: null,
      account: null,
      address: account.address,
      signOffchainMessage: vi.fn((message: string) => signEnvelope(account, message)),
    };

    const signature = await createSolanaMessageSigner(target)('Hello');

    expect(target.signOffchainMessage).toHaveBeenCalledWith('Hello');
    expect(await verifies(account.publicKey, signature, envelopeOf(account.address, 'Hello'))).toBe(true);
  });

  it('rejects an off-chain message the wallet changed, also when only publicKey names the signer', async () => {
    const account = await createAccount();
    const target = walletWith(account, ['solana:signOffchainMessage']);
    target.signOffchainMessage.mockImplementation(async () => [await signEnvelope(account, 'Other')]);
    await expect(
      createSolanaMessageSigner({ wallet: target.wallet, account: target.account })('Hello'),
    ).rejects.toThrow('[ORBIT-SOLANA] Wallet signed a different off-chain message than requested.');

    const byPublicKey = {
      wallet: null,
      publicKey: { toBase58: () => account.address },
      signOffchainMessage: vi.fn(() => signEnvelope(account, 'Other')),
    };
    await expect(createSolanaMessageSigner(byPublicKey)('Hello')).rejects.toThrow('different off-chain message');
  });

  it('rejects a wallet that cannot sign version 1 off-chain messages, and invalid off-chain outputs', async () => {
    const account = await createAccount();
    const noV1 = walletWith(account, ['solana:signOffchainMessage'], []);
    await expect(
      createSolanaMessageSigner(
        { wallet: noV1.wallet, account: noV1.account },
        { messageFormat: 'offchainMessage' },
      )('Hello'),
    ).rejects.toThrow('[ORBIT-SOLANA] The wallet cannot sign version 1 off-chain messages.');

    const empty = walletWith(account, ['solana:signOffchainMessage']);
    empty.signOffchainMessage.mockImplementation(async () => []);
    await expect(createSolanaMessageSigner({ wallet: empty.wallet, account: empty.account })('Hello')).rejects.toThrow(
      '[ORBIT-SOLANA] Wallet returned invalid signOffchainMessage output.',
    );

    await expect(
      createSolanaMessageSigner({ signMessage: signBytes(account) }, { messageFormat: 'offchainMessage' })('Hello'),
    ).rejects.toThrow('[ORBIT-SOLANA] Signer cannot sign off-chain messages.');
  });

  it('signs with useWallet() of @solana/wallet-adapter v3', async () => {
    const account = await createAccount();
    const plain = walletAdapterV3(account, ['solana:signMessage', 'solana:signOffchainMessage']);
    const signature = await createSolanaMessageSigner(plain)('Hello');
    expect(plain.signMessage).toHaveBeenCalled();
    expect(plain.signOffchainMessage).not.toHaveBeenCalled();
    expect(await verifies(account.publicKey, signature, bytesOf('Hello'))).toBe(true);

    const offchain = walletAdapterV3(account, ['solana:signOffchainMessage']);
    const offchainSignature = await createSolanaMessageSigner(offchain)('Hello');
    expect(offchain.signOffchainMessage).toHaveBeenCalledWith('Hello');
    expect(offchain.signMessage).not.toHaveBeenCalled();
    expect(await verifies(account.publicKey, offchainSignature, envelopeOf(account.address, 'Hello'))).toBe(true);
  });

  it('signs with useWallet() of @solana/wallet-adapter-react 0.15, through its adapter or with wallet null', async () => {
    const account = await createAccount();
    const adapter = {
      name: 'Phantom',
      publicKey: { toBase58: () => account.address },
      signMessage: signBytes(account),
    };
    const withAdapter = {
      wallet: { adapter, readyState: 'Installed' },
      publicKey: adapter.publicKey,
      signMessage: vi.fn(),
    };
    const signature = await createSolanaMessageSigner(withAdapter)('Hello');
    expect(adapter.signMessage).toHaveBeenCalled();
    expect(withAdapter.signMessage).not.toHaveBeenCalled();
    expect(await verifies(account.publicKey, signature, bytesOf('Hello'))).toBe(true);

    const walletNull = { wallet: null, publicKey: adapter.publicKey, signMessage: signBytes(account) };
    expect(
      await verifies(account.publicKey, await createSolanaMessageSigner(walletNull)('Hello'), bytesOf('Hello')),
    ).toBe(true);
  });

  it('rejects useWallet() before a wallet connects', async () => {
    const target = { wallet: null, account: null, publicKey: null, signMessage: undefined };

    await expect(createSolanaMessageSigner(target)('Hello')).rejects.toThrow(
      '[ORBIT-SOLANA] Signer lacks known message signing capabilities.',
    );
  });
});
