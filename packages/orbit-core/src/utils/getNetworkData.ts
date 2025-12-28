import { OrbitAdapter } from '../types';

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
          chainId: 'solana:mainnet',
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
