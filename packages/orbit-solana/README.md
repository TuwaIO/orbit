# @tuwaio/orbit-solana

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/orbit-solana.svg)](https://www.npmjs.com/package/@tuwaio/orbit-solana)
[![License](https://img.shields.io/npm/l/@tuwaio/orbit-solana.svg)](./LICENSE)

`@tuwaio/orbit-solana` provides concrete implementations of low-level Solana-specific communication primitives for Layer 2 (L2) of the TUWA Orbit stack. Engineered strictly on top of **`gill`** (the modern high-performance alternative to legacy Solana web3.js classes), this package integrates Wallet Standard capabilities for discovery and persistent caching of RPC connections.

---

## 🏛️ Core Capabilities

- **Gill RPC Caching:** Creates and caches high-performance Solana RPC connections (`createSolanaClientWithCache`, `createSolanaRPC`) to optimize transaction dispatching and query pipelines.
- **Wallet Standard Integration:** Low-level discovery routines (`getAvailableSolanaConnectors`, `getConnectedSolanaConnector`) that strictly align with the `@wallet-standard/app` specifications.
- **Profile Metadata Engine:** Resolves user-defined account descriptors (names, avatars) directly from Wallet Standard providers.
- **Cluster Parameter Resolution:** Maps Solana RPC clusters (mainnet, devnet, testnet) to explorer endpoints and RPC configurations.

---

## 💾 Installation

```bash
pnpm add @tuwaio/orbit-solana @tuwaio/orbit-core gill @wallet-standard/app @wallet-standard/ui-core @wallet-standard/ui-registry
```

> [!IMPORTANT]
> `gill` and `@wallet-standard` packages are peer dependencies and must be installed alongside `@tuwaio/orbit-solana`.

---

## 🚀 Technical Integration

### Cached RPC Connection

Establish cached RPC endpoints dynamically:

```typescript
import { createSolanaClientWithCache } from '@tuwaio/orbit-solana';

// Obtain cached connection primitive
const client = createSolanaClientWithCache({ rpcUrlOrMoniker: 'mainnet' });
```

### Wallet Standard Discovery

Query the browser runtime for installed Wallet Standard adapters:

```typescript
import { getAvailableSolanaConnectors } from '@tuwaio/orbit-solana';

const connectors = getAvailableSolanaConnectors();
console.log(
  'Available Standard Adapters:',
  connectors.map((c) => c.name),
);
```

---

## 🔧 API & Module Architecture

`@tuwaio/orbit-solana` exposes the following modules:

- **RPC Factory:** `createSolanaClientWithCache`, `createSolanaRPC`.
- **Connector Discovery:** `getAvailableSolanaConnectors`, `getConnectedSolanaConnector`.
- **Account Resolvers:** `getSolanaAddressName`, `getSolanaAddressAvatar`.
- **Network Helpers:** `getCluster`, `getRpcUrlForCluster`.
- **Explorer Helpers:** `getSolanaExplorerLink`.

---

## 📄 License

Licensed under the **Apache-2.0 License**. See the [LICENSE](./LICENSE) file for details.
