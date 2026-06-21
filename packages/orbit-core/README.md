# @tuwaio/orbit-core

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/orbit-core.svg)](https://www.npmjs.com/package/@tuwaio/orbit-core)
[![License](https://img.shields.io/npm/l/@tuwaio/orbit-core.svg)](./LICENSE)

`@tuwaio/orbit-core` is the Tier 1 core logic and foundational state wrapper layer of the TUWA Orbit multi-chain framework. It is completely **headless** and **framework-agnostic**, engineered to decouple raw blockchain connection interfaces from visual frontend layers. By establishing a unified type-safe interface, it enables consistent cross-chain connection management and persistent user account tracking.

---

## 🏛️ Core Capabilities

- **Unified Multi-Chain Primitives:** Establishes the structural `BaseAdapter` interface and the `OrbitAdapter` enum (EVM, Solana, Starknet) to serve as the abstract layer for multi-chain communication.
- **Connection State Persistence:** Implements SSR-safe storage helpers (`lastConnectedConnectorHelpers`, `recentConnectedConnectorHelpers`) to track and resume wallet connection history via `localStorage`.
- **Autonomy-Focused Utilities:** Technical utility helpers for formatting chain IDs, parsing connector names, and executing asynchronous operations (`waitFor`, `delay`).
- **Account Impersonation Engine:** Built-in `impersonatedHelpers` for sandboxed testing and account auditing.

---

## 💾 Installation

```bash
pnpm add @tuwaio/orbit-core
```

---

## 🚀 Architectural Integration

### Runtime Adapter Resolution

Register and resolve chain-specific primitive adapters dynamically:

```typescript
import { OrbitAdapter, selectAdapterByKey, BaseAdapter } from '@tuwaio/orbit-core';

// Configure primitive adapter mapping
const adapters: BaseAdapter[] = [
  {
    key: OrbitAdapter.EVM,
    getExplorerUrl: (url) => `https://etherscan.io/${url}`,
  },
  {
    key: OrbitAdapter.SOLANA,
    getExplorerUrl: (url, cluster) => `https://solscan.io/${url}?cluster=${cluster}`,
  },
];

// Dynamically select target execution adapter
const activeAdapter = selectAdapterByKey({
  adapterKey: OrbitAdapter.SOLANA,
  adapter: adapters,
});

if (activeAdapter) {
  console.log(activeAdapter.getExplorerUrl('tx/0x...', 'mainnet-beta'));
}
```

### Connection State Storage

Read and write connected connector metadata securely with `localStorage` fallback checks:

```typescript
import { lastConnectedConnectorHelpers } from '@tuwaio/orbit-core';

// Persist metadata
lastConnectedConnectorHelpers.setLastConnectedConnector({
  connectorType: 'evm:metamask',
  chainId: 1,
  address: '0x123...',
});

// Retrieve connection metadata safely during client-side hydration
const lastConnected = lastConnectedConnectorHelpers.getLastConnectedConnector();
console.log(lastConnected?.address); // "0x123..."
```

---

## 🔧 API & Module Architecture

`@tuwaio/orbit-core` exposes the following modules:

- **Core Primitives:** `OrbitAdapter`, `BaseAdapter`, `ConnectorType`, `RecentlyConnectedConnectorData`.
- **Registry Resolvers:** `selectAdapterByKey`, `getAdapterFromConnectorType`, `getConnectorTypeFromName`.
- **Formatters:** `formatConnectorName`, `formatConnectorChainId`.
- **Storage Helpers:** `lastConnectedConnectorHelpers`, `recentConnectedConnectorHelpers`, `impersonatedHelpers`.
- **Core Primitives:** `isSafeApp`, `delay`, `waitFor`, `filterUniqueByKey`.

---

## 📄 License

Licensed under the **Apache-2.0 License**. See the [LICENSE](./LICENSE) file for details.
