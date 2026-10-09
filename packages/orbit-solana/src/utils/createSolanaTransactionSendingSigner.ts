import {
  address,
  getTransactionEncoder,
  type SignatureBytes,
  type Transaction,
  type TransactionSendingSigner,
} from '@solana/kit';
import type { UiWalletAccount } from '@wallet-standard/ui-core';
import { getWalletAccountForUiWalletAccount, getWalletForHandle } from '@wallet-standard/ui-registry';

import { getCluster } from './clusterHelpers';

const SIGN_AND_SEND_TRANSACTION = 'solana:signAndSendTransaction';

type SignAndSendTransactionInput = {
  account: unknown;
  chain: `solana:${string}`;
  transaction: Uint8Array;
  options?: { minContextSlot?: number };
};

type SignAndSendTransactionFeature = {
  signAndSendTransaction: (
    ...inputs: readonly SignAndSendTransactionInput[]
  ) => Promise<readonly { signature: Uint8Array }[]>;
};

/**
 * Creates an `@solana/kit` `TransactionSendingSigner` for a Wallet Standard account, without a UI framework: the
 * signer asks the wallet of the account to sign and send transactions with its `solana:signAndSendTransaction`
 * feature. Pass it wherever Kit expects a sending signer, for example to `signAndSendSolanaTx` of
 * `@tuwaio/pulsar-solana` or to `signAndSendTransactionMessageWithSigners`. It does the same as
 * `useWalletAccountTransactionSendingSigner` of `@solana/react`, so React apps do not need that package.
 *
 * Several transactions are sent in one wallet request. `minContextSlot` from the call config is passed to the wallet;
 * an `abortSignal` rejects the call (the wallet prompt itself cannot be cancelled).
 *
 * @param uiWalletAccount - The account, as a `UiWalletAccount` handle from `@wallet-standard/ui-registry` (for example
 * `connectedAccount` of a Satellite Connect Solana connection).
 * @param cluster - The cluster in any form: a moniker (`devnet`, `mainnet-beta`), a Wallet Standard chain
 * (`solana:devnet`) or a CAIP-2 chain ID with the genesis hash. The wallet receives the Wallet Standard chain
 * (`solana:devnet`, `solana:mainnet`).
 * @returns The signer, with the account address as `address`.
 * @throws {Error} When the account does not list the chain of `cluster` or the `solana:signAndSendTransaction`
 * feature. The signer's `signAndSendTransactions` rejects with the wallet's error, or with the abort reason.
 *
 * @example
 * ```ts
 * import { createSolanaTransactionSendingSigner } from '@tuwaio/orbit-solana';
 *
 * const signer = createSolanaTransactionSendingSigner(connection.connectedAccount, connection.chainId);
 * ```
 */
export function createSolanaTransactionSendingSigner(
  uiWalletAccount: UiWalletAccount,
  cluster: string,
): TransactionSendingSigner<string> {
  // A Wallet Standard call: the chain is `solana:` plus the moniker (getCluster turns `mainnet-beta` into `mainnet`)
  const chain = `solana:${getCluster({ cluster })}` as `solana:${string}`;
  if (!uiWalletAccount.chains.includes(chain)) {
    throw new Error(
      `The wallet account ${uiWalletAccount.address} does not support the chain ${chain} (supported: ${uiWalletAccount.chains.join(', ')}).`,
    );
  }
  if (!uiWalletAccount.features.includes(SIGN_AND_SEND_TRANSACTION)) {
    throw new Error(`The wallet account ${uiWalletAccount.address} does not support ${SIGN_AND_SEND_TRANSACTION}.`);
  }
  const wallet = getWalletForHandle(uiWalletAccount);
  const account = getWalletAccountForUiWalletAccount(uiWalletAccount);
  const feature = wallet.features[SIGN_AND_SEND_TRANSACTION] as SignAndSendTransactionFeature | undefined;
  if (!feature) {
    throw new Error(`The wallet ${wallet.name} does not implement ${SIGN_AND_SEND_TRANSACTION}.`);
  }
  const encoder = getTransactionEncoder();

  return Object.freeze({
    address: address(uiWalletAccount.address),
    async signAndSendTransactions(
      transactions: readonly Transaction[],
      config: { abortSignal?: AbortSignal; minContextSlot?: bigint } = {},
    ): Promise<readonly SignatureBytes[]> {
      const { abortSignal, minContextSlot } = config;
      abortSignal?.throwIfAborted();
      if (transactions.length === 0) return [];
      const inputs = transactions.map((transaction) => ({
        account,
        chain,
        transaction: new Uint8Array(encoder.encode(transaction)),
        ...(minContextSlot != null ? { options: { minContextSlot: Number(minContextSlot) } } : {}),
      }));
      const request = feature.signAndSendTransaction(...inputs);
      const results = await (abortSignal
        ? Promise.race([
            request,
            new Promise<never>((_, reject) =>
              abortSignal.addEventListener('abort', () => reject(abortSignal.reason), { once: true }),
            ),
          ])
        : request);
      return Object.freeze(results.map(({ signature }) => signature as SignatureBytes));
    },
  });
}
