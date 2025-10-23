# Orbit Solana

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/orbit-solana.svg)](https://www.npmjs.com/package/@tuwaio/orbit-solana)
[![License](https://img.shields.io/npm/l/@tuwaio/orbit-solana.svg)](./LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/TuwaIO/orbit/release.yml?branch=main)](https://github.com/TuwaIO/orbit/actions)

Solana-specific adapter implementation and utilities for the **Orbit Utils** ecosystem by **TUWA**. Provides helpers for interacting with Solana networks (mainnet, devnet, testnet) using **gill** and **Wallet Standard**.

---

## 🏛️ What is `@tuwaio/orbit-solana`?

`@tuwaio/orbit-solana` is the Solana-focused adapter within the **Orbit Utils** ecosystem, extending `@tuwaio/orbit-core` with functionalities specific to the Solana blockchain. It simplifies interactions with Solana wallets and RPC endpoints for UI development.

Built with **TypeScript**, this package utilizes **`gill`** (an improvement layer over `@solana/kit`) for RPC interactions and leverages the **Wallet Standard** (`@wallet-standard/app`, `@wallet-standard/ui-registry`) for wallet discovery and management. It provides essential tools for building user interfaces that connect to Solana.

---

## ✨ Key Features

-   **RPC Client Management:** Efficiently creates and caches Solana RPC clients (`SolanaClient` and lower-level `Rpc`) using `gill` (`createSolanaClientWithCache`, `createSolanaRPC`). Supports default and custom RPC URLs.
-   **Wallet Standard Integration:** Discovers available Solana wallets compatible with the Wallet Standard (`getAvailableWallets`). Retrieves the currently connected wallet based on stored address (`getConnectedSolanaWallet`).
-   **Account Info Resolution:** Fetches user-set account labels (names) and icons (avatars) directly from the connected wallet's accounts (`getSolanaAddressName`, `getSolanaAddressAvatar`), including caching.
-   **Cluster & RPC URL Helpers:** Utilities to parse cluster names (e.g., 'mainnet', 'devnet') from chain IDs and retrieve corresponding RPC URLs (`getCluster`, `getRpcUrlForCluster`).
-   **Explorer Link Generation:** Creates links to Solana explorers (like Solscan) for transactions, addresses, etc., correctly handling cluster parameters (`getSolanaExplorerLink`).
-   **Type-Safe Development:** Fully typed using TypeScript 5.9+.
-   **Optimized Bundling:** Built with `tsup` for efficient CommonJS and ESM outputs with tree-shaking.

---

## 💾 Installation

### Requirements

-   Node.js 20+
-   TypeScript 5.9+
-   `@tuwaio/orbit-core` (as a foundational peer dependency)

```bash
# Using pnpm (recommended)
pnpm add @tuwaio/orbit-solana @tuwaio/orbit-core gill @wallet-standard/app @wallet-standard/ui-core @wallet-standard/ui-registry

# Using npm
npm install @tuwaio/orbit-solana @tuwaio/orbit-core gill @wallet-standard/app @wallet-standard/ui-core @wallet-standard/ui-registry

# Using yarn
yarn add @tuwaio/orbit-solana @tuwaio/orbit-core gill @wallet-standard/app @wallet-standard/ui-core @wallet-standard/ui-registry
````

*Note: `@tuwaio/orbit-core`, `gill`, `@wallet-standard/app`, `@wallet-standard/ui-core`, and `@wallet-standard/ui-registry` are **peer dependencies** and must be installed alongside `@tuwaio/orbit-solana`*.

-----

## 🚀 Quick Start

### Get Available Solana Wallets

Discover wallets installed by the user that support the Wallet Standard for Solana.

```typescript
import { getAvailableWallets } from '@tuwaio/orbit-solana';

const wallets = getAvailableWallets();
console.log('Available Solana Wallets:', wallets.map(w => w.name));
// Example Output: ['Phantom', 'Backpack', ...]
```

### Create a Cached RPC Client

Get a `gill` SolanaClient instance for interacting with the mainnet. Caching ensures you reuse the same client instance.

```typescript
import { createSolanaClientWithCache } from '@tuwaio/orbit-solana';

// Get client for mainnet using default RPC URL
const mainnetClient = createSolanaClientWithCache({ rpcUrlOrMoniker: 'mainnet' });
console.log('Mainnet Client:', mainnetClient);

// Get client using a custom RPC URL
const customClient = createSolanaClientWithCache({ rpcUrlOrMoniker: 'https://my-custom-rpc.com' });
console.log('Custom Client:', customClient);

// Get client for devnet, potentially using custom URLs if provided
const devnetClient = createSolanaClientWithCache({
    rpcUrlOrMoniker: 'devnet',
    rpcUrls: { devnet: 'https://api.devnet.solana.com' } // Optional: Provide specific URLs
});
console.log('Devnet Client:', devnetClient);

// You can now use the client, e.g., mainnetClient.rpc.getBalance(...)
```

### Get Account Name/Label from Connected Wallet

Assuming a wallet is connected and its address is stored (e.g., using `lastConnectedWalletHelpers` from `orbit-core`), get the user-defined label for that address.

```typescript
import { getSolanaAddressName } from '@tuwaio/orbit-solana';
import { lastConnectedWalletHelpers } from '@tuwaio/orbit-core'; // Needed to know which address is connected

async function displayAccountName() {
  const connectedWalletInfo = lastConnectedWalletHelpers.getLastConnectedWallet();
  if (connectedWalletInfo?.address && connectedWalletInfo.walletType.startsWith('solana:')) {
    try {
        const name = await getSolanaAddressName(connectedWalletInfo.address);
        console.log(`Label for address ${connectedWalletInfo.address}: ${name}`);
        // If no label is set in the wallet, 'name' will be the address itself.
    } catch (error) {
        console.error("Could not get account name. Is a Solana wallet connected and registered?", error);
        // This relies on getConnectedSolanaWallet finding the wallet via Wallet Standard registry
    }
  } else {
      console.log("No Solana wallet seems to be connected.");
  }
}

// Make sure Wallet Standard wallets are registered before calling this
// (This usually happens automatically when wallet extensions load)
setTimeout(displayAccountName, 1000); // Give wallets time to register
```

### Generate Explorer Link

Create a URL for a transaction on Solscan for the devnet cluster.

```typescript
import { getSolanaExplorerLink } from '@tuwaio/orbit-solana';

const txHash = '2y...'; // Example transaction hash
const devnetExplorerUrl = getSolanaExplorerLink(`/tx/${txHash}`, 'devnet');
console.log(devnetExplorerUrl);
// Output: [https://solscan.io/tx/2y...?cluster=devnet](https://solscan.io/tx/2y...?cluster=devnet) (or similar, base URL from gill)
```

-----

## 🔧 Architecture

`@tuwaio/orbit-solana` serves as the **adapter implementation** for `OrbitAdapter.SOLANA`, integrating Solana-specific functionalities into the Orbit Utils framework.

### Core Modules & Exports (`index.ts`)

- **Types (`types.ts`)**: Defines Solana-specific types like `SolanaRPCUrls`.
- **Cluster Helpers (`clusterHelpers.ts`)**: Functions `getCluster` and `getRpcUrlForCluster` for managing Solana network identifiers and RPC endpoints.
- **Client Creation (`createSolanaClientWithCache.ts`, `createSolanaRPC.ts`)**: Provides cached instances of `gill`'s `SolanaClient` and `Rpc`. Includes default RPC URLs.
- **Wallet Interaction (`getAvailableSolanaWallets.ts`, `getConnectedSolanaWallet.ts`)**: Leverages `@wallet-standard` to find and identify Solana wallets.
- **Account Info (`getSolanaAddressAvatar.ts`, `getSolanaAddressName.ts`)**: Retrieves metadata (label, icon) associated with accounts within the connected wallet.
- **Explorer Links (`getSolanaExplorerLink.ts`)**: Utility for constructing explorer URLs.

### Build System

- Built using `tsup`.
- Outputs CommonJS (`cjs`) and ECMAScript Module (`esm`) formats.
- Generates TypeScript declaration files (`.d.ts`).
- Specifies external dependencies (`@tuwaio/orbit-core`, `gill`, `@wallet-standard/*`) to avoid bundling them.

-----

## ✨ How It Connects to the Ecosystem

- **Depends on `@tuwaio/orbit-core`:** Relies on core types (`OrbitAdapter`, `BaseAdapter`) and utilities (`lastConnectedWalletHelpers`, `filterUniqueByKey`).
- **Provides Solana Functionality:** Implements the specific logic for Solana interactions needed by applications using Orbit Utils.
- **Leverages Gill & Wallet Standard:** Uses `gill` for simplified RPC communication and the Wallet Standard packages for wallet detection and interaction.

-----

## 🤝 Contributing & Support

Contributions are welcome! Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

If you find this library useful, please consider supporting its development. Every contribution helps!

[**➡️ View Support Options**](https://github.com/TuwaIO/workflows/blob/main/Donation.md)

## 📄 License

This project is licensed under the **Apache-2.0 License** - see the [LICENSE](./LICENSE) file for details.