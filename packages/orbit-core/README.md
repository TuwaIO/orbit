# @tuwaio/orbit-core

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/orbit-core.svg)](https://www.npmjs.com/package/@tuwaio/orbit-core)
[![License](https://img.shields.io/npm/l/@tuwaio/orbit-core.svg)](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/LICENSE)

`@tuwaio/orbit-core` is the Layer 1 (L1) package of **Orbit Utils**, the Stage 1 primitives layer of the TUWA ecosystem. It defines the chain-agnostic types that the Orbit chain packages and the higher TUWA layers (Satellite Connect, Pulsar) share, and ships small helpers for connector naming, address validation, error normalization and SSR-safe connection persistence.

The package has **zero runtime dependencies** and imports no Web3 SDK, so it runs in any framework, in the browser and on the server.

---

## 🏛️ Core Capabilities

- **Multi-chain primitives:** the `OrbitAdapter` enum (`evm`, `solana`, `starknet`), the `BaseAdapter` contract, `ConnectorType` identifiers such as `"evm:metamask"` or `"solana:phantom"`, and `selectAdapterByKey` to pick the adapter of the active chain.
- **Connector helpers:** `getConnectorTypeFromName`, `getAdapterFromConnectorType`, `formatConnectorName`, `formatConnectorChainId`, `isSolanaChain`, `setChainId` and `getNetworkData`.
- **Validation and errors:** `isAddress` validates EVM (hex) and Solana (Base58) addresses. `normalizeError` turns any wallet, viem or RPC error into a JSON-serializable `TuwaErrorState` that is safe to persist.
- **Connection persistence:** `lastConnectedConnectorHelpers` and `recentlyConnectedConnectorsListHelpers` keep connection history in `localStorage` and do nothing during SSR.
- **Runtime utilities:** `detectSafeApp` (Safe{Wallet} iframe detection), `waitFor`, `delay`, `filterUniqueByKey`, and `impersonatedHelpers` for development and testing.

---

## 💾 Installation

```bash
pnpm add @tuwaio/orbit-core
```

---

## 🚀 Usage

### Resolving the active adapter

`BaseAdapter` describes what an adapter can do; add a `key` to register it for a chain family:

```typescript
import { type BaseAdapter, OrbitAdapter, selectAdapterByKey } from '@tuwaio/orbit-core';

type ExplorerAdapter = BaseAdapter & { key: OrbitAdapter };

const adapters: ExplorerAdapter[] = [
  { key: OrbitAdapter.EVM, getExplorerUrl: (path) => `https://etherscan.io/${path ?? ''}` },
  { key: OrbitAdapter.SOLANA, getExplorerUrl: (path) => `https://explorer.solana.com/${path ?? ''}` },
];

const solanaAdapter = selectAdapterByKey({ adapterKey: OrbitAdapter.SOLANA, adapter: adapters });
solanaAdapter?.getExplorerUrl('tx/<signature>'); // "https://explorer.solana.com/tx/<signature>"
```

If no adapter matches the key, `selectAdapterByKey` falls back to the first adapter in the array and logs a warning.

### Persisting the last connection

```typescript
import { lastConnectedConnectorHelpers } from '@tuwaio/orbit-core';

lastConnectedConnectorHelpers.setLastConnectedConnector({
  connectorType: 'evm:metamask',
  chainId: 1,
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
});

// Returns undefined on the server and when nothing is stored.
const lastConnected = lastConnectedConnectorHelpers.getLastConnectedConnector();
```

### Normalizing errors

```typescript
import { normalizeError } from '@tuwaio/orbit-core';

declare function sendTransaction(): Promise<void>;

try {
  await sendTransaction();
} catch (error) {
  // `message` prefers viem's `shortMessage`; `raw` is a JSON-safe copy of the error details.
  const { message, raw } = normalizeError(error);
}
```

### Validating addresses

```typescript
import { isAddress } from '@tuwaio/orbit-core';

isAddress('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'); // true (auto-detected as EVM)
isAddress('So11111111111111111111111111111111111111112', 'solana'); // true
```

`isAddress` checks the address format only (hex length or Base58 alphabet); it does not verify EVM checksums.

---

## 🗄️ Browser Storage

The storage helpers write the following `localStorage` keys. Clear them to reset the connection state of a user:

| Key                                                 | Written by                               |
| --------------------------------------------------- | ---------------------------------------- |
| `orbit-core:lastConnectedConnector`                 | `lastConnectedConnectorHelpers`          |
| `orbit-core:recentlyConnectedConnectorsListHelpers` | `recentlyConnectedConnectorsListHelpers` |
| `satellite-connect:impersonatedAddress`             | `impersonatedHelpers`                    |

---

## 📚 API Reference

Every export, with signatures and types generated from the source, is documented at **[orbit.docs.tuwa.io/packages/orbit-core](https://orbit.docs.tuwa.io/packages/orbit-core)**.

## 📄 License

Licensed under the **Apache-2.0 License**. See the [LICENSE](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/LICENSE) file for details.
