import { OrbitAdapter } from '../types';
import { SOLANA_CHAIN_IDS } from './solanaChainIds';

/**
 * Returns the default network and educational links for an adapter, e.g. to render a
 * "What is a wallet?" section in a connect modal.
 *
 * @param adapter - The adapter to describe.
 * @returns Default chain (`chainId`: `1` for EVM, {@link SOLANA_CHAIN_IDS}`.mainnet` for Solana; `name`) and `links`
 * (`aboutNetwork`, `choseWallet`, `about`) for EVM and Solana, or `undefined` for adapters without network data (e.g.
 * Starknet).
 */
export const getNetworkData = (adapter: OrbitAdapter) => {
  switch (adapter) {
    case OrbitAdapter.EVM:
      return {
        chain: {
          chainId: 1,
          name: 'Ethereum',
        },
        links: {
          aboutNetwork: 'https://ethereum.org/developers/docs/intro-to-ethereum/',
          choseWallet: 'https://ethereum.org/wallets/find-wallet/',
          about: 'https://ethereum.org/wallets/',
        },
      };
    case OrbitAdapter.SOLANA:
      return {
        chain: {
          chainId: SOLANA_CHAIN_IDS.mainnet,
          name: 'Solana',
        },
        links: {
          aboutNetwork: 'https://solana.com/en/learn/what-is-solana',
          choseWallet: 'https://solana.com/en/solana-wallets',
          about: 'https://solana.com/en/learn/what-is-a-wallet',
        },
      };
  }
};
