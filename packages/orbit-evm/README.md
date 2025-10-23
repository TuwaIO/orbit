# Orbit EVM

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/orbit-evm.svg)](https://www.npmjs.com/package/@tuwaio/orbit-evm)
[![License](https://img.shields.io/npm/l/@tuwaio/orbit-evm.svg)](./LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/TuwaIO/orbit/release.yml?branch=main)](https://github.com/TuwaIO/orbit/actions)

EVM-specific adapter implementation and utilities for the **Orbit Utils** ecosystem by **TUWA**. Provides helpers for interacting with EVM-compatible blockchains like Ethereum, Polygon, BSC, etc., leveraging **wagmi** and **viem**.

---

## 🏛️ What is `@tuwaio/orbit-evm`?

`@tuwaio/orbit-evm` extends the core capabilities of `@tuwaio/orbit-core` by providing concrete implementations and utilities tailored specifically for **EVM (Ethereum Virtual Machine)** compatible blockchains. It acts as the EVM adapter within the Orbit Utils ecosystem, designed to simplify interactions with networks like Ethereum, Polygon, Binance Smart Chain, and others.

Built with **TypeScript** and leveraging powerful libraries like **`@wagmi/core`** and **`viem`**, this package offers specialized tools for common EVM tasks required in web3 UI development.

---

## ✨ Key Features

-   **Chain Switching:** Utility (`checkAndSwitchChain`) to prompt users to switch their wallet to the correct EVM network.
-   **Viem Public Client Management:** Efficiently creates and caches `viem` Public Clients for read-only blockchain interactions (`createViemClient`).
-   **ENS (Ethereum Name Service) Utilities:**
    * Resolve ENS names to addresses (`getAddress`).
    * Reverse resolve addresses to primary ENS names (`getName`).
    * Fetch ENS avatar URLs (`getAvatar`).
    * Basic ENS name format checking (`isEnsName`).
    * All ENS lookups target Ethereum Mainnet and include caching.
-   **Built on Wagmi & Viem:** Leverages the robust and type-safe functionalities provided by `@wagmi/core` and `viem`.
-   **Type-Safe Development:** Fully typed with TypeScript 5.9+.
-   **Optimized Bundling:** Built with `tsup` for efficient CommonJS and ESM outputs with tree-shaking.

---

## 💾 Installation

### Requirements

-   Node.js 20+
-   TypeScript 5.9+
-   `@tuwaio/orbit-core` (as a foundational peer dependency)

```bash
# Using pnpm (recommended)
pnpm add @tuwaio/orbit-evm @tuwaio/orbit-core @wagmi/core viem

# Using npm
npm install @tuwaio/orbit-evm @tuwaio/orbit-core @wagmi/core viem

# Using yarn
yarn add @tuwaio/orbit-evm @tuwaio/orbit-core @wagmi/core viem
````

*Note: `@wagmi/core` and `viem` are **peer dependencies** and must be installed alongside `@tuwaio/orbit-evm`*.

-----

## 🚀 Quick Start

### Check and Switch Network

Ensure the user's wallet is connected to the desired EVM chain (e.g., Sepolia testnet, ID 11155111).

```typescript
import { checkAndSwitchChain } from '@tuwaio/orbit-evm';
import { type Config } from '@wagmi/core'; // Assuming you have your wagmi config

// Assume 'wagmiConfig' is your initialized wagmi Config object
declare const wagmiConfig: Config;
const targetChainId = 11155111; // Sepolia

async function ensureCorrectChain() {
  try {
    await checkAndSwitchChain(targetChainId, wagmiConfig);
    console.log(`Wallet is now connected to chain ID ${targetChainId}`);
    // Proceed with actions requiring the target chain
  } catch (error) {
    console.error('Failed to switch chain:', error);
    // Handle the error (e.g., show a message to the user)
  }
}

ensureCorrectChain();

```

### Resolve ENS Name

Get the primary ENS name for an Ethereum address.

```typescript
import { getName, isEnsName } from '@tuwaio/orbit-evm';

async function displayEnsName(address: `0x${string}`) {
  if (isEnsName(address)) { // Basic check, though getName expects an address
      console.log(`${address} looks like an ENS name, not an address.`);
      return;
  }
  const name = await getName(address);
  if (name) {
    console.log(`The ENS name for ${address} is: ${name}`);
  } else {
    console.log(`No primary ENS name found for ${address}.`);
  }
}

displayEnsName('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'); // Example: Vitalik's address
```

-----

## 🔧 Architecture

`@tuwaio/orbit-evm` acts as an **adapter implementation** for the `OrbitAdapter.EVM` type defined in `@tuwaio/orbit-core`. It provides concrete functions that fulfill the `BaseAdapter` interface requirements (like `getName`, `getAvatar`) and adds EVM-specific utilities.

### Core Modules & Exports (`index.ts`)

- **Chain Utilities (`checkAndSwitchChain`)**: Handles network switching logic using `@wagmi/core`.
- **Client Utilities (`createViemClient`)**: Manages `viem` public client instances with caching.
- **ENS Utilities (`ensUtils`)**: Provides functions (`getAddress`, `getAvatar`, `getName`, `isEnsName`) for interacting with the Ethereum Name Service on Mainnet, using `viem/ens`.

### Build System

- Built using `tsup`.
- Outputs CommonJS (`cjs`) and ECMAScript Module (`esm`) formats.
- Generates TypeScript declaration files (`.d.ts`).
- Configured for tree-shaking and minification.

-----

## ✨ How It Connects to the Ecosystem

- **Depends on `@tuwaio/orbit-core`:** Inherits core types (`OrbitAdapter`, `BaseAdapter`) and potentially uses core utilities.
- **Provides EVM Functionality:** Offers the specific logic needed for EVM chain interactions within applications using Orbit Utils.
- **Leverages Wagmi/Viem:** Relies on `@wagmi/core` for wallet actions (like chain switching) and `viem` for RPC interactions (like ENS resolution and client creation).

-----

## 🤝 Contributing & Support

Contributions are welcome! Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

If you find this library useful, please consider supporting its development. Every contribution helps!

[**➡️ View Support Options**](https://github.com/TuwaIO/workflows/blob/main/Donation.md)

## 📄 License

This project is licensed under the **Apache-2.0 License** - see the [LICENSE](./LICENSE) file for details.
