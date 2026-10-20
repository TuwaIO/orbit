import type { ReadonlyUint8Array, SignatureBytes } from '@solana/kit';
import { describe, it } from 'vitest';

import { createSolanaMessageSigner } from './createSolanaMessageSigner';

/** `PublicKey` of `@solana/web3.js`, reduced to its public methods. */
interface PublicKey {
  equals(publicKey: PublicKey): boolean;
  toBase58(): string;
  toBytes(): Uint8Array;
  toString(): string;
}

/** A Wallet Standard account, as `WalletAccount` of `@wallet-standard/base` describes it. */
interface WalletAccount {
  readonly address: string;
  readonly publicKey: ReadonlyUint8Array;
  readonly chains: readonly `${string}:${string}`[];
  readonly features: readonly `${string}:${string}`[];
}

/** A Wallet Standard wallet, as `Wallet` of `@wallet-standard/base` describes it. */
interface Wallet {
  readonly version: '1.0.0';
  readonly name: string;
  readonly icon: `data:image/${'svg+xml' | 'webp' | 'png' | 'gif'};base64,${string}`;
  readonly chains: readonly `${string}:${string}`[];
  readonly features: Readonly<Record<`${string}:${string}`, unknown>>;
  readonly accounts: readonly WalletAccount[];
}

/** A message signing wallet adapter of `@solana/wallet-adapter-base` 0.9, such as `PhantomWalletAdapter`. */
declare class MessageSignerWalletAdapter {
  name: string;
  url: string;
  icon: string;
  readyState: 'Installed' | 'NotDetected' | 'Loadable' | 'Unsupported';
  publicKey: PublicKey | null;
  connecting: boolean;
  get connected(): boolean;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  signMessage(message: Uint8Array): Promise<Uint8Array>;
}

/** `WalletContextState` of `@solana/wallet-adapter-react` 0.15, the value of its `useWallet()`. */
interface WalletContextStateV1 {
  wallet: { adapter: MessageSignerWalletAdapter; readyState: string } | null;
  publicKey: PublicKey | null;
  connected: boolean;
  signMessage: ((message: Uint8Array) => Promise<Uint8Array>) | undefined;
}

/** `WalletContextState` of `@solana/wallet-adapter` v3, the value of its `useWallet()`. */
interface WalletContextStateV3 {
  readonly wallet: { readonly adapter: { readonly name: string }; readonly readyState: string } | null;
  readonly publicKey: PublicKey | null;
  readonly account: WalletAccount | null;
  readonly address: string | null;
  readonly connected: boolean;
  signMessage?: (message: Uint8Array) => Promise<SignatureBytes>;
  signOffchainMessage?: (
    message: string,
    options?: { requiredSigners?: readonly ReadonlyUint8Array[] },
  ) => Promise<{
    readonly signedOffchainMessage: ReadonlyUint8Array;
    readonly signature: SignatureBytes;
    readonly signatureType?: 'ed25519';
  }>;
}

declare const walletContextV1: WalletContextStateV1;
declare const walletContextV3: WalletContextStateV3;
declare const adapter: MessageSignerWalletAdapter;
declare const wallet: Wallet;
declare const account: WalletAccount;

describe('createSolanaMessageSigner target type', () => {
  it('accepts a Wallet Standard wallet and account', () => {
    createSolanaMessageSigner({ wallet, account });
  });

  it('accepts a wallet adapter', () => {
    createSolanaMessageSigner(adapter);
    createSolanaMessageSigner({ wallet: adapter });
  });

  it('accepts useWallet() of @solana/wallet-adapter-react 0.15 and of @solana/wallet-adapter v3', () => {
    createSolanaMessageSigner(walletContextV1);
    createSolanaMessageSigner(walletContextV3, { messageFormat: 'offchainMessage', errorPrefix: '[APP]' });
  });

  it('accepts the nullable fields of useWallet() in an object literal', () => {
    createSolanaMessageSigner({
      wallet: null,
      account: null,
      publicKey: null,
      signMessage: walletContextV1.signMessage,
    });
    createSolanaMessageSigner({
      wallet: null,
      account: null,
      address: null,
      publicKey: walletContextV3.publicKey,
      signOffchainMessage: walletContextV3.signOffchainMessage,
    });
  });

  it('rejects a signMessage that does not sign message bytes', () => {
    // @ts-expect-error signMessage takes the UTF-8 bytes of the message
    createSolanaMessageSigner({ wallet: null, signMessage: (message: string) => Promise.resolve(message) });
  });
});
