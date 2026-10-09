import {
  address,
  appendTransactionMessageInstruction,
  blockhash,
  compileTransaction,
  createTransactionMessage,
  getBase58Encoder,
  getTransactionEncoder,
  pipe,
  setTransactionMessageFeePayer,
  setTransactionMessageLifetimeUsingBlockhash,
} from '@solana/kit';
import { getOrCreateUiWalletAccountForStandardWalletAccount } from '@wallet-standard/ui-registry';
import { describe, expect, it, vi } from 'vitest';

import { createSolanaTransactionSendingSigner } from './createSolanaTransactionSendingSigner';

type Wallet = Parameters<typeof getOrCreateUiWalletAccountForStandardWalletAccount>[0];
type WalletAccount = Parameters<typeof getOrCreateUiWalletAccountForStandardWalletAccount>[1];

const ADDRESS = '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin';
const SIGNATURE = new Uint8Array(64).fill(7);

function createWallet(options: { chains?: string[]; accountFeatures?: string[] } = {}) {
  const signAndSendTransaction = vi.fn(async (...inputs: unknown[]) => inputs.map(() => ({ signature: SIGNATURE })));
  const account: WalletAccount = {
    address: ADDRESS,
    publicKey: new Uint8Array(getBase58Encoder().encode(ADDRESS)),
    chains: (options.chains ?? ['solana:mainnet', 'solana:devnet']) as WalletAccount['chains'],
    features: (options.accountFeatures ?? ['solana:signAndSendTransaction']) as WalletAccount['features'],
  };
  const wallet = {
    version: '1.0.0',
    name: `Test Wallet ${Math.random()}`,
    icon: 'data:image/svg+xml;base64,',
    chains: account.chains,
    accounts: [account],
    features: {
      'solana:signAndSendTransaction': {
        version: '1.0.0',
        supportedTransactionVersions: ['legacy', 0],
        signAndSendTransaction,
      },
    },
  } as unknown as Wallet;
  const uiWalletAccount = getOrCreateUiWalletAccountForStandardWalletAccount(wallet, account);
  return { account, uiWalletAccount, signAndSendTransaction };
}

function createTransaction() {
  return compileTransaction(
    pipe(
      createTransactionMessage({ version: 0 }),
      (message) => setTransactionMessageFeePayer(address(ADDRESS), message),
      (message) =>
        setTransactionMessageLifetimeUsingBlockhash(
          { blockhash: blockhash('EtWTRABZaYq6iMfeYKouRu166VU2xqa1EtWTRABZaYq6'), lastValidBlockHeight: 100n },
          message,
        ),
      (message) =>
        appendTransactionMessageInstruction(
          { programAddress: address('11111111111111111111111111111111'), data: new Uint8Array([2, 0, 0, 0]) },
          message,
        ),
    ),
  );
}

describe('createSolanaTransactionSendingSigner', () => {
  it('signs and sends through the wallet of the account, on the Wallet Standard chain of the cluster', async () => {
    const { account, uiWalletAccount, signAndSendTransaction } = createWallet();
    const transaction = createTransaction();

    const signer = createSolanaTransactionSendingSigner(uiWalletAccount, 'devnet');
    const signatures = await signer.signAndSendTransactions([transaction]);

    expect(signer.address).toBe(ADDRESS);
    expect(signatures).toEqual([SIGNATURE]);
    expect(signAndSendTransaction).toHaveBeenCalledWith({
      account,
      chain: 'solana:devnet',
      transaction: new Uint8Array(getTransactionEncoder().encode(transaction)),
    });
  });

  it.each(['devnet', 'solana:devnet', 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1'])(
    'accepts the cluster as %s',
    async (cluster) => {
      const { uiWalletAccount, signAndSendTransaction } = createWallet();

      await createSolanaTransactionSendingSigner(uiWalletAccount, cluster).signAndSendTransactions([
        createTransaction(),
      ]);

      expect(signAndSendTransaction.mock.calls[0][0]).toMatchObject({ chain: 'solana:devnet' });
    },
  );

  it('maps mainnet-beta to the Wallet Standard chain solana:mainnet', async () => {
    const { uiWalletAccount, signAndSendTransaction } = createWallet();

    await createSolanaTransactionSendingSigner(uiWalletAccount, 'mainnet-beta').signAndSendTransactions([
      createTransaction(),
    ]);

    expect(signAndSendTransaction.mock.calls[0][0]).toMatchObject({ chain: 'solana:mainnet' });
  });

  it('passes minContextSlot to the wallet', async () => {
    const { uiWalletAccount, signAndSendTransaction } = createWallet();

    await createSolanaTransactionSendingSigner(uiWalletAccount, 'devnet').signAndSendTransactions(
      [createTransaction()],
      {
        minContextSlot: 42n,
      },
    );

    expect(signAndSendTransaction.mock.calls[0][0]).toMatchObject({ options: { minContextSlot: 42 } });
  });

  it('sends several transactions in one wallet request', async () => {
    const { uiWalletAccount, signAndSendTransaction } = createWallet();

    const signatures = await createSolanaTransactionSendingSigner(uiWalletAccount, 'devnet').signAndSendTransactions([
      createTransaction(),
      createTransaction(),
    ]);

    expect(signatures).toHaveLength(2);
    expect(signAndSendTransaction).toHaveBeenCalledTimes(1);
    expect(signAndSendTransaction.mock.calls[0]).toHaveLength(2);
  });

  it('returns no signatures and asks nothing for no transactions', async () => {
    const { uiWalletAccount, signAndSendTransaction } = createWallet();

    expect(await createSolanaTransactionSendingSigner(uiWalletAccount, 'devnet').signAndSendTransactions([])).toEqual(
      [],
    );
    expect(signAndSendTransaction).not.toHaveBeenCalled();
  });

  it('rejects without asking the wallet when the signal is already aborted', async () => {
    const { uiWalletAccount, signAndSendTransaction } = createWallet();
    const controller = new AbortController();
    controller.abort();

    await expect(
      createSolanaTransactionSendingSigner(uiWalletAccount, 'devnet').signAndSendTransactions([createTransaction()], {
        abortSignal: controller.signal,
      }),
    ).rejects.toThrow();
    expect(signAndSendTransaction).not.toHaveBeenCalled();
  });

  it('throws when the account is not on the chain of the cluster', () => {
    const { uiWalletAccount } = createWallet({ chains: ['solana:mainnet'] });

    expect(() => createSolanaTransactionSendingSigner(uiWalletAccount, 'devnet')).toThrow('solana:devnet');
  });

  it('throws when the account cannot sign and send transactions', () => {
    const { uiWalletAccount } = createWallet({ accountFeatures: ['solana:signTransaction'] });

    expect(() => createSolanaTransactionSendingSigner(uiWalletAccount, 'devnet')).toThrow(
      'solana:signAndSendTransaction',
    );
  });
});
