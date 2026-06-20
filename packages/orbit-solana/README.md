# @tuwaio/orbit-solana

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/orbit-solana.svg)](https://www.npmjs.com/package/@tuwaio/orbit-solana)
[![License](https://img.shields.io/npm/l/@tuwaio/orbit-solana.svg)](./LICENSE)

`@tuwaio/orbit-solana` provides concrete implementations and utilities tailored specifically for the Solana blockchain. Built entirely in **TypeScript** and powered by **`gill`** (the modern improvement layer over `@solana/kit`), it acts as the Solana adapter for the Orbit Utils ecosystem, simplifying wallet discovery via standard specifications and optimizing RPC client performance.

---

## 🏛️ Core Capabilities

- **Gill RPC Caching:** Creates and caches high-performance Solana RPC clients (`createSolanaClientWithCache`, `createSolanaRPC`) to eliminate instantiation overhead.
- **Wallet Standard Support:** Dynamic wallet discovery (`getAvailableSolanaConnectors`) and active wallet retrieval (`getConnectedSolanaConnector`) conforming to the official `@wallet-standard` specifications.
- **Account Metadata Lookups:** Retrieves user-defined account labels (names) and icons (avatars) directly from connected Wallet Standard accounts with cache persistence.
- **Cluster Moniker Helpers:** Utilities to resolve Solana cluster parameters (mainnet, devnet, testnet) and fetch matching RPC nodes.
- **Explorer Link Factory:** Generates explorer URLs (e.g. Solscan) automatically handling the active cluster parameters.

---

## 💾 Installation

```bash
pnpm add @tuwaio/orbit-solana @tuwaio/orbit-core gill @wallet-standard/app @wallet-standard/ui-core @wallet-standard/ui-registry
```

> [!IMPORTANT]
> `gill` and `@wallet-standard` packages are peer dependencies and must be installed alongside `@tuwaio/orbit-solana`.

---

## 🚀 Quick Start

### Wallet Discovery

Locate installed wallets supporting the modern Wallet Standard:

```typescript
import { getAvailableSolanaConnectors } from '@tuwaio/orbit-solana';

const wallets = getAvailableSolanaConnectors();
console.log(
  'Detected Wallets:',
  wallets.map((w) => w.name),
); // ['Phantom', 'Solflare', 'Metamask', ...]
```

### Cached RPC Operations

Obtain a cached public Solana client for network requests:

```typescript
import { createSolanaClientWithCache } from '@tuwaio/orbit-solana';

// Obtain cached mainnet client
const client = createSolanaClientWithCache({ rpcUrlOrMoniker: 'mainnet' });

// Perform RPC actions
// const balance = await client.rpc.getBalance(address).send();
```

---

## 🔧 API & Module Architecture

`@tuwaio/orbit-solana` exports the following modules:

- **RPC Client Factory:** `createSolanaClientWithCache`, `createSolanaRPC`.
- **Wallet Discoverer:** `getAvailableSolanaConnectors`, `getConnectedSolanaConnector`.
- **Account Info Resolvers:** `getSolanaAddressName`, `getSolanaAddressAvatar`.
- **Network Helpers:** `getCluster`, `getRpcUrlForCluster`.
- **URL Builder:** `getSolanaExplorerLink`.

---

## 🤝 Contributing

Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)** before submitting pull requests.

## 📄 License

Licensed under the **Apache-2.0 License**. See the [LICENSE](./LICENSE) file for details.
