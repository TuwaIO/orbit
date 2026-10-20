/**
 * @file Message signer for Solana wallets: Wallet Standard `solana:signMessage` or `solana:signOffchainMessage`, with
 * fallbacks for wallet adapters and `useWallet()`. Shared by `@tuwaio/siwx-solana` and `@tuwaio/satellite-solana`;
 * imports only `@solana/kit`, so `@tuwaio/orbit-solana/signer` loads no Wallet Standard package.
 */

import {
  address as toAddress,
  compileOffchainMessageV1Envelope,
  getAddressEncoder,
  getBase58Decoder,
  getUtf8Encoder,
  type ReadonlyUint8Array,
} from '@solana/kit';

/**
 * How {@link createSolanaMessageSigner} has the wallet sign:
 *
 * - `'auto'` (default): the UTF-8 bytes of the message, or its version 1 off-chain message when the account lists
 *   `solana:signOffchainMessage` but not `solana:signMessage` (as hardware wallet accounts may), or when the target
 *   has no other way to sign;
 * - `'message'`: always the UTF-8 bytes;
 * - `'offchainMessage'`: always the version 1 off-chain message (`solana:signOffchainMessage`, or a
 *   `signOffchainMessage(message)` method such as the one of `useWallet()` from `@solana/wallet-adapter` v3).
 *
 * `@tuwaio/siwx-solana` and `@tuwaio/siwx-server` verify both for SIWX.
 */
export type SolanaMessageFormat = 'auto' | 'message' | 'offchainMessage';

/**
 * Options of {@link createSolanaMessageSigner}.
 */
export interface SolanaMessageSignerOptions {
  /** How the wallet signs. Defaults to `'auto'`; see {@link SolanaMessageFormat}. */
  messageFormat?: SolanaMessageFormat;
  /**
   * Starts the message of every error the signer throws itself, followed by a space. Defaults to `[ORBIT-SOLANA]`;
   * packages that wrap the signer pass their own (`[SATELLITE-SOLANA]`, `[SIWX-SOLANA]`).
   */
  errorPrefix?: string;
}

/**
 * What {@link createSolanaMessageSigner} signs with: a Wallet Standard `wallet` and `account`, a wallet adapter, or the
 * value of `useWallet()` from `@solana/wallet-adapter-react` (v1) or `@solana/wallet-adapter` (v3). When `wallet` or
 * `account` is missing or `null`, the target itself is used in its place.
 *
 * Every field may be missing or `null`, as in `useWallet()` before a wallet connects: the signer looks for a signing
 * capability only when it is called, and rejects when it finds none.
 */
export interface SolanaMessageSignerTarget {
  /**
   * The wallet. Its `solana:signMessage` and `solana:signOffchainMessage` features, its `adapter` and its
   * `signMessages`, `signMessage` and `signOffchainMessage` methods are used when present.
   */
  wallet?: object | null;
  /**
   * The account to sign with, passed to the features of the wallet. Its `address`, `publicKey` and `features` (the
   * names it supports, or the features themselves) are used when present.
   */
  account?: object | null;
  /** The base58 address of the account (`useWallet()` v3). Used to check the bytes of a signed off-chain message. */
  address?: string | null;
  /**
   * The public key of the account (`PublicKey` of `@solana/web3.js`). Used to check the bytes of a signed off-chain
   * message when no address is given.
   */
  publicKey?: { toBase58: () => string } | null;
  /**
   * Signs the UTF-8 bytes of the message, as the method of a wallet adapter or of `useWallet()`.
   * @param message - UTF-8 bytes of the message.
   * @returns The ed25519 signature, or an object that contains it.
   */
  signMessage?: (message: Uint8Array) => Promise<Uint8Array | { signature: Uint8Array }>;
  /**
   * Signs the version 1 off-chain message of the text with the connected account as its only signer, as the method of
   * `useWallet()` from `@solana/wallet-adapter` v3.
   * @param message - The message text.
   * @returns The ed25519 signature and, optionally, the bytes the wallet signed.
   */
  signOffchainMessage?: (
    message: string,
  ) => Promise<{ signedOffchainMessage?: ReadonlyUint8Array; signature: ReadonlyUint8Array }>;
}

type Fields = Record<string, unknown>;

type Fail = (text: string) => Error;

type OffchainMessageOutput = { signedOffchainMessage?: ReadonlyUint8Array; signature: ReadonlyUint8Array };

/** How the target signs off-chain messages, or why it cannot. */
type OffchainMessageSigning = { sign: (message: string) => Promise<OffchainMessageOutput> } | { error: string };

const isObject = (value: unknown): value is Fields =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/** A method of the first candidate that has it, bound to that candidate. */
function findMethod(candidates: readonly unknown[], name: string): ((...args: unknown[]) => unknown) | undefined {
  const owner = candidates.find((candidate) => isObject(candidate) && typeof candidate[name] === 'function') as
    Fields | undefined;
  return owner ? (owner[name] as (...args: unknown[]) => unknown).bind(owner) : undefined;
}

/** A feature of the wallet's `features`, else of the account's when it holds the features themselves. */
function findFeature(wallet: Fields, account: Fields, name: string): Fields | undefined {
  const feature = isObject(wallet.features) ? wallet.features[name] : undefined;
  if (isObject(feature)) return feature;
  const accountFeature = isObject(account.features) ? account.features[name] : undefined;
  return isObject(accountFeature) ? accountFeature : undefined;
}

/** Tells whether the account lists `feature`. Accounts that list no feature names support all of the wallet's. */
function accountSupports(account: Fields, feature: string): boolean {
  return !Array.isArray(account.features) || account.features.includes(feature);
}

/** The base58 address of the signing account, if the target names one. */
function signerAddress(wallet: Fields, account: Fields, root: Fields): string | undefined {
  for (const candidate of [account, wallet, root]) {
    if (typeof candidate.address === 'string') return candidate.address;
  }
  const publicKey = root.publicKey as { toBase58?: () => string } | null | undefined;
  return typeof publicKey?.toBase58 === 'function' ? publicKey.toBase58() : undefined;
}

/** The 32-byte public key of a Wallet Standard account: its `publicKey`, or the bytes of its base58 `address`. */
function accountPublicKey(account: Fields): Uint8Array {
  if (account.publicKey instanceof Uint8Array) return account.publicKey;
  return new Uint8Array(getAddressEncoder().encode(toAddress(String(account.address))));
}

/**
 * Finds how the target signs the UTF-8 bytes of a message: the `solana:signMessage` feature, a `signMessages`
 * method, or a legacy `signMessage` method of the wallet, its `adapter`, the account or the target itself.
 */
function findMessageSigning(
  wallet: Fields,
  account: Fields,
  root: Fields,
  fail: Fail,
): ((message: Uint8Array) => Promise<Uint8Array>) | undefined {
  const feature = findFeature(wallet, account, 'solana:signMessage');
  if (feature && typeof feature.signMessage === 'function') {
    const signMessage = (feature.signMessage as (...inputs: unknown[]) => Promise<readonly unknown[]>).bind(feature);
    return async (message) => {
      const output = (await signMessage({ account, message }))?.[0] as { signature?: Uint8Array } | undefined;
      if (!output?.signature) throw fail('Wallet returned invalid signMessage output.');
      return output.signature;
    };
  }

  const signMessages = findMethod([wallet, account], 'signMessages');
  if (signMessages) {
    return async (message) => {
      const outputs = (await signMessages([{ account, message }])) as readonly { signature?: Uint8Array }[];
      const output = outputs?.[0];
      if (!output?.signature) throw fail('Wallet returned invalid signMessages output.');
      return output.signature;
    };
  }

  const adapter = wallet.adapter ?? account.adapter;
  const signMessage = findMethod([wallet, adapter, account, root], 'signMessage');
  if (signMessage) {
    return async (message) => {
      const result = await signMessage(message);
      if (result instanceof Uint8Array) return result;
      if (isObject(result) && result.signature instanceof Uint8Array) return result.signature;
      throw fail('Unexpected legacy signMessage result format.');
    };
  }
  return undefined;
}

/**
 * Finds how the target signs version 1 off-chain messages: the `solana:signOffchainMessage` feature of the wallet, or
 * a `signOffchainMessage(message)` method of the wallet, the account or the target itself.
 */
function findOffchainMessageSigning(
  wallet: Fields,
  account: Fields,
  root: Fields,
  fail: Fail,
): OffchainMessageSigning | undefined {
  const feature = isObject(wallet.features) ? wallet.features['solana:signOffchainMessage'] : undefined;
  if (isObject(feature) && typeof feature.signOffchainMessage === 'function') {
    const versions = feature.supportedMessageVersions;
    if (!Array.isArray(versions) || !versions.includes(1)) {
      return { error: 'The wallet cannot sign version 1 off-chain messages.' };
    }
    const signOffchainMessage = (
      feature.signOffchainMessage as (...inputs: unknown[]) => Promise<readonly OffchainMessageOutput[]>
    ).bind(feature);
    return {
      async sign(message) {
        const outputs = await signOffchainMessage({
          account,
          message,
          messageVersion: 1,
          requiredSigners: [accountPublicKey(account)],
        });
        const output = outputs?.[0];
        if (!output?.signature) throw fail('Wallet returned invalid signOffchainMessage output.');
        return output;
      },
    };
  }

  const method = findMethod([wallet, account, root], 'signOffchainMessage');
  if (!method) return undefined;
  return {
    async sign(message) {
      const output = (await method(message)) as OffchainMessageOutput | undefined;
      if (!output?.signature) throw fail('Wallet returned invalid signOffchainMessage output.');
      return output;
    },
  };
}

/**
 * Signs `message` as a version 1 off-chain message and returns the base58 signature. When the wallet returns the
 * bytes it signed and the signing address is known, checks that they are the envelope of `message`.
 */
async function signAsOffchainMessage(
  signing: OffchainMessageSigning,
  message: string,
  address: string | undefined,
  fail: Fail,
): Promise<string> {
  if ('error' in signing) throw fail(signing.error);
  const output = await signing.sign(message);
  if (output.signedOffchainMessage && address) {
    const expected = compileOffchainMessageV1Envelope({
      version: 1,
      content: message,
      requiredSignatories: [{ address: toAddress(address) }],
    }).content;
    const signed = output.signedOffchainMessage;
    if (signed.length !== expected.length || signed.some((byte, index) => byte !== expected[index])) {
      throw fail('Wallet signed a different off-chain message than requested.');
    }
  }
  return getBase58Decoder().decode(output.signature);
}

/**
 * Creates a function that signs UTF-8 messages with a Solana wallet and returns base58 signatures, for sign-in (SIWX)
 * and any other message an app asks a wallet to sign. `createSolanaSiwxSigner` of `@tuwaio/siwx-solana` and
 * `createSolanaMessageSigner` of `@tuwaio/satellite-solana` are built on it.
 *
 * The signer uses the first capability it finds: the Wallet Standard `solana:signMessage` feature of the wallet (or of
 * the account), a `signMessages` method, then a legacy `signMessage` method of the wallet, its `adapter`, the account or
 * the target itself (so a wallet adapter and `useWallet()` of `@solana/wallet-adapter` v1 and v3 can be passed as is).
 * Methods are called on the object that has them. Accounts that list `solana:signOffchainMessage` but not
 * `solana:signMessage` (hardware wallet accounts may) sign the version 1 off-chain message of the text instead, and so
 * does a target with no other way to sign; `options.messageFormat` changes the choice ({@link SolanaMessageFormat}).
 * The bytes a wallet returns for an off-chain message are checked against the envelope built with `@solana/kit` when
 * the signing address is known (`address` or `publicKey` of the account, the wallet or the target).
 *
 * Side effect: calling the returned function opens the signature prompt of the wallet.
 *
 * @param target - The wallet and account to sign with, a wallet adapter or `useWallet()`; see
 * {@link SolanaMessageSignerTarget}.
 * @param options - `messageFormat`: `'auto'` (default), `'message'` or `'offchainMessage'`; `errorPrefix`: the start
 * of the signer's error messages (default `[ORBIT-SOLANA]`).
 * @returns A function that signs `message` and resolves to the base58-encoded signature. It rejects, with messages
 * that start with `errorPrefix`, with `Invalid signer target.` when `target` is missing,
 * `Signer lacks known message signing capabilities.` when no capability is found,
 * `Signer cannot sign off-chain messages.` for `'offchainMessage'` without one,
 * `Wallet returned invalid signMessage output.`, `… invalid signMessages output.` or
 * `… invalid signOffchainMessage output.` when the wallet returns no signature,
 * `Unexpected legacy signMessage result format.` when a legacy `signMessage` returns neither bytes nor
 * `{ signature }`, `The wallet cannot sign version 1 off-chain messages.` and
 * `Wallet signed a different off-chain message than requested.` for off-chain messages; and with the error of the
 * wallet, unchanged, when the user rejects.
 *
 * @example
 * ```ts
 * import { createSolanaMessageSigner } from '@tuwaio/orbit-solana/signer';
 *
 * const signMessage = createSolanaMessageSigner({ wallet, account });
 * const signature = await signMessage('Hello from my app');
 * ```
 */
export function createSolanaMessageSigner(
  target: SolanaMessageSignerTarget,
  options: SolanaMessageSignerOptions = {},
): (message: string) => Promise<string> {
  const messageFormat = options.messageFormat ?? 'auto';
  const errorPrefix = options.errorPrefix ?? '[ORBIT-SOLANA]';
  const fail: Fail = (text) => new Error(`${errorPrefix} ${text}`);

  return async (message: string): Promise<string> => {
    if (!target) throw fail('Invalid signer target.');

    const root = target as Fields;
    const wallet = (target.wallet ?? target) as Fields;
    const account = (target.account ?? target) as Fields;
    const address = signerAddress(wallet, account, root);

    const offchain = messageFormat === 'message' ? undefined : findOffchainMessageSigning(wallet, account, root, fail);
    if (messageFormat === 'offchainMessage') {
      if (!offchain) throw fail('Signer cannot sign off-chain messages.');
      return signAsOffchainMessage(offchain, message, address, fail);
    }

    const signBytes = findMessageSigning(wallet, account, root, fail);
    const canSignOffchain = Boolean(offchain && 'sign' in offchain);
    const preferOffchain =
      !accountSupports(account, 'solana:signMessage') && accountSupports(account, 'solana:signOffchainMessage');
    if (offchain && canSignOffchain && (!signBytes || preferOffchain)) {
      return signAsOffchainMessage(offchain, message, address, fail);
    }
    if (!signBytes) throw fail('Signer lacks known message signing capabilities.');

    return getBase58Decoder().decode(await signBytes(new Uint8Array(getUtf8Encoder().encode(message))));
  };
}
