# @tuwaio/orbit-core

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/orbit-core.svg)](https://www.npmjs.com/package/@tuwaio/orbit-core)
[![License](https://img.shields.io/npm/l/@tuwaio/orbit-core.svg)](./LICENSE)

`@tuwaio/orbit-core` serves as the core logic and connector layer for the Orbit Utils ecosystem. It is completely **headless** and **framework-agnostic**, ensuring compatibility across React, Vue, Svelte, or vanilla JS applications. It abstracts the underlying blockchain architectures into a unified interface, simplifying state handling in complex multi-chain UIs.

---

## 🏛️ Core Capabilities

- **Unified Multi-Chain Adapters:** Establishes the standard `BaseAdapter` interface and the `OrbitAdapter` enum (EVM, Solana, Starknet) to enable cross-chain UI layers.
- **Connection State Persistence:** Includes SSR-safe storage helpers (`lastConnectedConnectorHelpers`, `recentConnectedConnectorHelpers`) to track and resume wallet connection history.
- **autonomy-focused Utilities:** Native handlers for formatting chain IDs, parsing connector names, and managing async task execution (`waitFor`, `delay`).
- **Impersonation Engine:** Built-in `impersonatedHelpers` to support testing and debugging in different account contexts.

---

## 💾 Installation

```bash
pnpm add @tuwaio/orbit-core
```

---

## 🚀 Quick Start

### Runtime Adapter Selection

Configure chain adapters dynamically and retrieve them at runtime using standard selectors:

```typescript
import { OrbitAdapter, selectAdapterByKey, BaseAdapter } from '@tuwaio/orbit-core';

// Configure adapters (mocked here, use @tuwaio/orbit-evm / @tuwaio/orbit-solana in production)
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

// Select adapter dynamically
const activeAdapter = selectAdapterByKey({
  adapterKey: OrbitAdapter.SOLANA,
  adapter: adapters,
});

if (activeAdapter) {
  console.log('Selected:', activeAdapter.getExplorerUrl('tx/0x...', 'mainnet-beta'));
}
```

### Connection State Persistence

Persist last connected connector state in localStorage safely:

```typescript
import { lastConnectedConnectorHelpers } from '@tuwaio/orbit-core';

// Save connection metadata
lastConnectedConnectorHelpers.setLastConnectedConnector({
  connectorType: 'evm:metamask',
  chainId: 1,
  address: '0x123...',
});

// Retrieve connection metadata (returns null in SSR environment)
const lastConnected = lastConnectedConnectorHelpers.getLastConnectedConnector();
console.log(lastConnected?.address); // "0x123..."
```

---

## 🔧 API & Module Architecture

`@tuwaio/orbit-core` exports the following structures:

- **Core Types:** `OrbitAdapter`, `BaseAdapter`, `ConnectorType`, `RecentlyConnectedConnectorData`.
- **Registry Utilities:** `selectAdapterByKey`, `getAdapterFromConnectorType`, `getConnectorTypeFromName`.
- **Formatters:** `formatConnectorName`, `formatConnectorChainId`.
- **Storage Persisters:** `lastConnectedConnectorHelpers`, `recentConnectedConnectorHelpers`, `impersonatedHelpers`.
- **General Utilities:** `isSafeApp`, `delay`, `waitFor`, `filterUniqueByKey`.

---

## 🤝 Contributing

Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)** before submitting pull requests.

## 📄 License

Licensed under the **Apache-2.0 License**. See the [LICENSE](./LICENSE) file for details.
