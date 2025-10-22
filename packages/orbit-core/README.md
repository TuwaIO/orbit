# Orbit Utils From TUWA

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/orbit-core.svg)](https://www.npmjs.com/package/@tuwaio/orbit-core)
[![License](https://img.shields.io/npm/l/@tuwaio/orbit-core.svg)](./LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/TuwaIO/orbit/release.yml?branch=main)](https://github.com/TuwaIO/orbit/actions)

<div style="text-align: center; margin-bottom: 20px; margin-top: 20px;">
    <img src="https://raw.githubusercontent.com/TuwaIO/workflows/refs/heads/main/preview/repos/orbit_utils.png" alt="Orbit Utils" width="400">
</div>

A powerful, framework-agnostic library for seamless multi-chain blockchain interactions, providing a unified interface for EVM, Solana, and Starknet operations.

---

## 🏛️ What is `@tuwaio/orbit-core`?

`@tuwaio/orbit-core` is the foundation of the TUWA ecosystem. It's designed as a **headless** and **framework-agnostic** library that provides essential infrastructure for multi-chain blockchain interactions. The library doesn't include UI components or framework-specific code, making it versatile for any JavaScript or TypeScript application.

Its primary purpose is to provide a unified interface for interacting with different blockchain architectures through a flexible adapter system. Built with TypeScript for type safety and maintainability, it serves as the backbone for blockchain applications requiring multi-chain support.

---

## ✨ Key Features

* **Multi-Chain Architecture:** Provides a consistent API for interacting with EVM, Solana, and potentially other blockchains through a flexible adapter system.
* **Simplified UI Development:** Offers utilities specifically designed to make building web3 user interfaces easier and faster.
* **Framework Agnostic:** Use Orbit Utils with your favorite framework (React, Vue, Svelte, Angular, etc.) or even vanilla JavaScript.
* **Type-Safe:** Fully written in TypeScript for enhanced developer experience and fewer runtime errors.
* **Modular Packages:** Includes separate packages for core logic and chain-specific implementations (EVM, Solana).
* **Optimized Performance:** Minimal overhead for blockchain operations.
* **Robust Error Handling:** Comprehensive error management across different chains.

---

## 💾 Installation

```bash
# Using pnpm (recommended)
pnpm add @tuwaio/orbit-core
# Add chain-specific adapters as needed
pnpm add @tuwaio/orbit-evm @wagmi/core viem
pnpm add @tuwaio/orbit-solana gill @wallet-standard/app @wallet-standard/ui-core @wallet-standard/ui-registry

# Using npm
npm install @tuwaio/orbit-core
npm install @tuwaio/orbit-evm @wagmi/core viem
npm install @tuwaio/orbit-solana gill @tuwaio/orbit-core @wallet-standard/app @wallet-standard/ui-core @wallet-standard/ui-registry

# Using yarn
yarn add @tuwaio/orbit-core
yarn add @tuwaio/orbit-evm @wagmi/core viem
yarn add @tuwaio/orbit-solana gill @tuwaio/orbit-core @wallet-standard/app @wallet-standard/ui-core @wallet-standard/ui-registry
````

-----

## 🚀 Quick Start

### Basic Usage with Core

```typescript
import { OrbitAdapter, selectAdapterByKey } from '@tuwaio/orbit-core';

// Example adapter configuration (replace with actual implementations)
const adapters = [
  { key: OrbitAdapter.EVM, /* ...EVM specific implementation */ },
  { key: OrbitAdapter.SOLANA, /* ...Solana specific implementation */ }
];

// Select the EVM adapter based on its key
const evmAdapter = selectAdapterByKey({
  adapterKey: OrbitAdapter.EVM,
  adapter: adapters,
});

if (evmAdapter) {
  console.log('EVM Adapter selected:', evmAdapter);
  // Now you can use evmAdapter for EVM-specific operations
} else {
  console.error('EVM Adapter not found or configured.');
}

// Select the Solana adapter
const solanaAdapter = selectAdapterByKey({
  adapterKey: OrbitAdapter.SOLANA,
  adapter: adapters,
});

if (solanaAdapter) {
  console.log('Solana Adapter selected:', solanaAdapter);
  // Use solanaAdapter for Solana operations
} else {
  console.error('Solana Adapter not found or configured.');
}
```

*Note: The `adapter` objects in this example are placeholders. You need to provide the actual adapter implementations based on `@tuwaio/orbit-evm`, `@tuwaio/orbit-solana`, or your custom adapters.*

### Supported Chain Types

The `OrbitAdapter` enum defines the core supported blockchain architectures:

```typescript
import { OrbitAdapter } from '@tuwaio/orbit-core';

console.log(OrbitAdapter.EVM); // 'evm' - For Ethereum, Polygon, BSC, etc.
console.log(OrbitAdapter.SOLANA); // 'solana' - For Solana blockchain
console.log(OrbitAdapter.Starknet); // 'starknet' - For Starknet L2
```

-----

## 🔧 Architecture

Orbit Utils is built on these main concepts:

1.  **Adapters:** Chain-specific implementations that handle blockchain interactions.
2.  **Type System:** Comprehensive TypeScript definitions for type-safe development.
3.  **Utilities:** Helper functions for common blockchain operations and UI tasks.

### Core Components from `@tuwaio/orbit-core`

* `OrbitAdapter`: Enum defining supported blockchain types (EVM, Solana, Starknet).
* `selectAdapterByKey`: Utility for runtime adapter selection based on the `OrbitAdapter` key.
* Various type definitions (`BaseAdapter`, `WalletType`, etc.).
* Helper functions for formatting, storage management (`lastConnectedWalletHelpers`, `impersonatedHelpers`), and general utilities (`delay`, `filterUniqueByKey`, etc.).

### Chain-Specific Packages

* **`@tuwaio/orbit-evm`:** Provides EVM utilities like chain switching (`checkAndSwitchChain`), Viem client creation (`createViemClient`), and ENS interactions (`getName`, `getAvatar`, `getAddress`, `isEnsName`).
* **`@tuwaio/orbit-solana`:** Offers Solana utilities such as RPC client creation with caching (`createSolanaClientWithCache`, `createSolanaRPC`), wallet discovery (`getAvailableWallets`, `getConnectedSolanaWallet`), name/avatar resolution (`getSolanaAddressName`, `getSolanaAddressAvatar`), and explorer link generation (`getSolanaExplorerLink`).

-----

## ✨ How It Connects to the Ecosystem

The Orbit ecosystem consists of several modular packages:

* **`@tuwaio/orbit-core`:** The foundation providing core functionality, types, and the adapter system.
* **`@tuwaio/orbit-evm`:** EVM-specific helpers and utilities.
* **`@tuwaio/orbit-solana`:** Solana blockchain helpers and utilities.

Each package serves a specific purpose while maintaining modularity and flexibility, allowing developers to import only what they need.

---

## 🤝 Contributing & Support

Contributions are welcome! Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

If you find this library useful, please consider supporting its development. Every contribution helps!

[**➡️ View Support Options**](https://github.com/TuwaIO/workflows/blob/main/Donation.md)

## 📄 License

This project is licensed under the **Apache-2.0 License** - see the [LICENSE](./LICENSE) file for details.
