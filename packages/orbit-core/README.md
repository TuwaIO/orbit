# Orbit Core

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/orbit-core.svg)](https://www.npmjs.com/package/@tuwaio/orbit-core)
[![License](https://img.shields.io/npm/l/@tuwaio/orbit-core.svg)](./LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/TuwaIO/orbit/release.yml?branch=main)](https://github.com/TuwaIO/orbit/actions)

The foundational, framework-agnostic library for the Orbit Utils ecosystem, providing core types, utilities, and an adapter system for seamless multi-chain blockchain interactions in user interfaces.

---

## 🏛️ What is `@tuwaio/orbit-core`?

`@tuwaio/orbit-core` is the central pillar of the **Orbit Utils** ecosystem, designed by **TUWA** to simplify the creation of cross-chain web3 user interfaces. It's a **headless** library, meaning it contains no UI components or framework-specific logic, making it universally compatible with any JavaScript or TypeScript application, regardless of the frontend framework (React, Vue, Svelte, Angular, or vanilla JS).

Its primary goal is to establish a **unified interface** for interacting with diverse blockchain architectures (like EVM and Solana) through a flexible **adapter system**. Built entirely in **TypeScript**, it ensures type safety and provides the essential infrastructure – including core types, utility functions, and adapter management – that underpins multi-chain dApp development within the TUWA ecosystem. It serves as the backbone for simplifying interactions rather than repeating logic across different projects.

---

## ✨ Key Features

- **Multi-Chain Foundation:** Defines the core `OrbitAdapter` enum (supporting EVM, Solana, Starknet) and types for building consistent multi-chain support.
- **Framework Agnostic & Headless:** Contains only logic, no UI components, ensuring compatibility with any frontend setup.
- **Type-Safe Development:** Fully written in TypeScript 5.9+ for a robust developer experience.
- **Flexible Adapter System:** Provides utilities like `selectAdapterByKey` to easily manage and switch between different blockchain adapter implementations.
- **Essential Utilities:** Includes common helpers for tasks such as:
  - Formatting connector names and chain IDs (`formatConnectorName`, `formatConnectorChainId`).
  - Identifying chain types (`isSolanaChain`, `getAdapterFromConnectorType`).
  - Managing connector connection state in localStorage (`lastConnectedConnectorHelpers`, `recentConnectedConnectorHelpers`).
  - Handling impersonation for development/testing (`impersonatedHelpers`).
  - Basic async operations (`delay`, `waitFor`).
- **SSR Safe:** Utilities are designed to work safely in both browser and Server-Side Rendering environments.

---

## 💾 Installation

```bash
# Using pnpm (recommended)
pnpm add @tuwaio/orbit-core

# Using npm
npm install @tuwaio/orbit-core

# Using yarn
yarn add @tuwaio/orbit-core
````

*Note: `@tuwaio/orbit-core` provides the core logic. You will typically install chain-specific packages like `@tuwaio/orbit-evm` or `@tuwaio/orbit-solana` alongside it.*

-----

## 🚀 Quick Start

### Basic Adapter Usage

`@tuwaio/orbit-core` defines the structure and allows selection, but requires chain-specific packages (`@tuwaio/orbit-evm`, `@tuwaio/orbit-solana`) for actual adapter implementations.

```typescript
import { OrbitAdapter, selectAdapterByKey, BaseAdapter } from '@tuwaio/orbit-core';

// Assume these are implementations provided by @tuwaio/orbit-evm and @tuwaio/orbit-solana
// (Implementations details are simplified for this example)
interface EvmAdapter extends BaseAdapter {
  key: OrbitAdapter.EVM;
}
interface SolanaAdapter extends BaseAdapter {
  key: OrbitAdapter.SOLANA;
}

const evmAdapterImpl: EvmAdapter = {
    key: OrbitAdapter.EVM,
    getExplorerUrl: (url, chainId) => `https://etherscan.io/${url}`,
    getName: async (address) => null, // Placeholder
    getAvatar: async (name) => null, // Placeholder
};

const solanaAdapterImpl: SolanaAdapter = {
    key: OrbitAdapter.SOLANA,
    getExplorerUrl: (url, chainId) => `https://solscan.io/${url}?cluster=${chainId}`,
    getName: async (address) => null, // Placeholder
    getAvatar: async (name) => null, // Placeholder
};


const configuredAdapters = [evmAdapterImpl, solanaAdapterImpl];

// --- Selecting an Adapter ---

// Select the EVM adapter based on its key
const selectedEvmAdapter = selectAdapterByKey({
  adapterKey: OrbitAdapter.EVM,
  adapter: configuredAdapters,
});

if (selectedEvmAdapter && selectedEvmAdapter.key === OrbitAdapter.EVM) {
  console.log('Selected EVM Adapter Chain:', selectedEvmAdapter.getChainName()); // Output: Ethereum
} else {
  console.error('EVM Adapter not found or configured.');
}

// Select the Solana adapter
const selectedSolanaAdapter = selectAdapterByKey({
  adapterKey: OrbitAdapter.SOLANA,
  adapter: configuredAdapters,
});

if (selectedSolanaAdapter && selectedSolanaAdapter.key === OrbitAdapter.SOLANA) {
    console.log('Selected Solana Adapter Cluster:', selectedSolanaAdapter.getCluster()); // Output: mainnet-beta
    console.log('Explorer URL:', selectedSolanaAdapter.getExplorerUrl('tx/abc...', 'mainnet-beta')); // Output: [https://solscan.io/tx/abc...?cluster=mainnet-beta](https://solscan.io/tx/abc...?cluster=mainnet-beta)
} else {
    console.error('Solana Adapter not found or configured.');
}
```

### Using Core Utilities

```typescript
import {
  OrbitAdapter,
  formatConnectorName,
  getAdapterFromConnectorType,
  getConnectorTypeFromName,
  isSolanaChain,
  lastConnectedConnectorHelpers
} from '@tuwaio/orbit-core';

// Formatting
const formattedName = formatConnectorName('MetaMask'); // "metamask"
console.log(formattedName);
const connectorType = getConnectorTypeFromName(OrbitAdapter.EVM, 'Brave Wallet'); // "evm:bravewallet"
console.log(connectorType);

// Identification
const adapterType = getAdapterFromConnectorType(connectorType); // OrbitAdapter.EVM
console.log(adapterType);
console.log(isSolanaChain('devnet')); // true
console.log(isSolanaChain(1)); // false

// Local Storage Management for Last Connected Connector
lastConnectedConnectorHelpers.setLastConnectedConnector({
  connectorType: 'evm:metamask',
  chainId: 1,
  address: '0x123...'
});
const lastWallet = lastConnectedConnectorHelpers.getLastConnectedConnector();
console.log(lastWallet); // { connectorType: 'evm:metamask', chainId: 1, address: '0x123...' }

// lastConnectedWalletHelpers.removeLastConnectedWallet();
```

-----

## 🔧 Architecture

Orbit Core is designed around modularity and abstraction:

1. **Core Types (`types.ts`):** Defines fundamental structures like `OrbitAdapter` (enum for EVM, Solana, Starknet), `BaseAdapter` (common interface), and `ConnectorType`.
2. **Adapter System:** Enables handling multiple blockchain types via a common interface. The `selectAdapterByKey` utility allows runtime selection of the correct adapter implementation based on the `OrbitAdapter` key. Chain-specific logic resides in separate packages (e.g., `@tuwaio/orbit-evm`).
3. **Utilities (`utils/`):** A collection of framework-agnostic helper functions covering formatting, chain identification, localStorage management (for connection state persistence), async operations, and other common tasks needed when building multi-chain UIs.

### Key Exports (`index.ts`)

- **Types:** `OrbitAdapter`, `BaseAdapter`, `ConnectorType`, `OrbitGenericAdapter`, `RecentConnectedConnector`.
- **Adapter Utilities:** `selectAdapterByKey`, `getAdapterFromConnectorType`.
- **Formatting Utilities:** `formatConnectorChainId`, `formatConnectorName`, `getConnectorTypeFromName`.
- **Chain Helpers:** `isSolanaChain`, `setChainId`.
- **Storage Helpers:** `lastConnectedConnectorHelpers`, `recentConnectedConnectorHelpers`, `impersonatedHelpers`, `getParsedStorageItem`.
- **General Utilities:** `delay`, `filterUniqueByKey`, `waitFor`, `isSafeApp`.

-----

## ✨ How It Connects to the Ecosystem

The Orbit Utils ecosystem is designed for modularity:

- **`@tuwaio/orbit-core`:** (This package) Provides the core, non-chain-specific types, utilities, and adapter structure.
- **`@tuwaio/orbit-evm`:** Contains the specific adapter implementation and helper functions for EVM-compatible chains (using libraries like `viem` and `@wagmi/core`).
- **`@tuwaio/orbit-solana`:** Contains the specific adapter implementation and helpers for the Solana blockchain (using libraries like `gill`).

Developers typically install `@tuwaio/orbit-core` along with one or more chain-specific packages based on their application's needs. The core package ensures consistency and provides shared utilities, while the specific packages handle the unique aspects of each blockchain.

-----

## 🤝 Contributing & Support

Contributions are welcome! Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

If you find this library useful, please consider supporting its development. Every contribution helps!

[**➡️ View Support Options**](https://github.com/TuwaIO/workflows/blob/main/Donation.md)

## 📄 License

This project is licensed under the **Apache-2.0 License** - see the [LICENSE](./LICENSE) file for details.
