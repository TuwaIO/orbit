# @tuwaio/orbit-core

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/orbit-core.svg)](https://www.npmjs.com/package/@tuwaio/orbit-core)
[![License](https://img.shields.io/npm/l/@tuwaio/orbit-core.svg)](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/LICENSE)

`@tuwaio/orbit-core` is the Layer 1 (L1) package of **Orbit Utils**, the Stage 1 primitives layer of the TUWA ecosystem. It defines the chain-agnostic types that the Orbit chain packages and the higher TUWA layers (Satellite Connect, Pulsar) share, and ships small helpers for connector naming, address validation, error normalization and SSR-safe connection persistence.

The package has **zero runtime dependencies** and imports no Web3 SDK, so it runs in any framework, in the browser and on the server.

---

## 🏛️ Core Capabilities

- **Multi-chain primitives:** the `OrbitAdapter` enum (`evm`, `solana`, `starknet`), the `BaseAdapter` contract, `ConnectorType` identifiers such as `"evm:metamask"` or `"solana:phantom"`, and `selectAdapterByKey` to pick the adapter of the active chain.
- **Connector helpers:** `getConnectorTypeFromName`, `getAdapterFromConnectorType`, `formatConnectorName`, `formatConnectorChainId`, `isSolanaChain`, `setChainId` and `getNetworkData`.
- **Solana chain IDs:** `SOLANA_CHAIN_IDS` holds the CAIP-2 chain IDs of mainnet, devnet and testnet, made of the genesis hash as CAIP-30 requires. `getSolanaChainId` and `getSolanaCluster` convert between these IDs and cluster monikers and read every form in use (`devnet`, `solana:devnet`, `solana:mainnet-beta`, the testnet ID from before the testnet genesis reset). `setChainId` and `formatConnectorChainId` return these IDs for Solana.
- **CAIP identifiers:** `toCaip2ChainId` turns EVM chain numbers into `eip155:<number>` and every Solana form into its genesis-hash ID, and `toEvmChainId` reads the number back; `formatCaip10AccountId` and `formatCaip19AssetId` build account and asset IDs (`eip155:8453/erc20:0x…`, `solana:…/token:…`, `…/slip44:501`), and the `parse…` functions read and validate them.
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

### Identifying Solana clusters

```typescript
import { getSolanaChainId, getSolanaCluster } from '@tuwaio/orbit-core';

getSolanaChainId('devnet'); // "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1"
getSolanaChainId('solana:mainnet-beta'); // "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp"
getSolanaCluster('solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1'); // "devnet"
```

Use the CAIP-2 ID wherever a chain is identified: SIWX messages, transaction records, APIs. Use the cluster moniker for RPC URLs and for Wallet Standard calls, which name the cluster `solana:devnet`.

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

## Enumerations

- [OrbitAdapter](/packages/orbit-core/enumerations/OrbitAdapter.md)

## Interfaces

- [RecentlyConnectedConnectorData](/packages/orbit-core/interfaces/RecentlyConnectedConnectorData.md)
- [TuwaErrorState](/packages/orbit-core/interfaces/TuwaErrorState.md)

## Type Aliases

- [BaseAdapter](/packages/orbit-core/type-aliases/BaseAdapter.md)
- [Caip10AccountId](/packages/orbit-core/type-aliases/Caip10AccountId.md)
- [Caip19AssetId](/packages/orbit-core/type-aliases/Caip19AssetId.md)
- [Caip2ChainId](/packages/orbit-core/type-aliases/Caip2ChainId.md)
- [ChainIdentifierArray](/packages/orbit-core/type-aliases/ChainIdentifierArray.md)
- [ConnectorType](/packages/orbit-core/type-aliases/ConnectorType.md)
- [LastConnectedConnector](/packages/orbit-core/type-aliases/LastConnectedConnector.md)
- [OrbitGenericAdapter](/packages/orbit-core/type-aliases/OrbitGenericAdapter.md)
- [RecentlyConnectedConnectorsList](/packages/orbit-core/type-aliases/RecentlyConnectedConnectorsList.md)
- [SolanaCluster](/packages/orbit-core/type-aliases/SolanaCluster.md)

## Variables

- [impersonatedHelpers](/packages/orbit-core/variables/impersonatedHelpers.md)
- [isInSecureIframe](/packages/orbit-core/variables/isInSecureIframe.md)
- [~~isSafeApp~~](/packages/orbit-core/variables/isSafeApp.md)
- [lastConnectedConnectorHelpers](/packages/orbit-core/variables/lastConnectedConnectorHelpers.md)
- [recentlyConnectedConnectorsListHelpers](/packages/orbit-core/variables/recentlyConnectedConnectorsListHelpers.md)
- [SOLANA\_CHAIN\_IDS](/packages/orbit-core/variables/SOLANA_CHAIN_IDS.md)

## Functions

- [delay](/packages/orbit-core/functions/delay.md)
- [detectSafeApp](/packages/orbit-core/functions/detectSafeApp.md)
- [filterUniqueByKey](/packages/orbit-core/functions/filterUniqueByKey.md)
- [formatCaip10AccountId](/packages/orbit-core/functions/formatCaip10AccountId.md)
- [formatCaip19AssetId](/packages/orbit-core/functions/formatCaip19AssetId.md)
- [formatConnectorChainId](/packages/orbit-core/functions/formatConnectorChainId.md)
- [formatConnectorName](/packages/orbit-core/functions/formatConnectorName.md)
- [getAdapterFromConnectorType](/packages/orbit-core/functions/getAdapterFromConnectorType.md)
- [getConnectorTypeFromName](/packages/orbit-core/functions/getConnectorTypeFromName.md)
- [getNetworkData](/packages/orbit-core/functions/getNetworkData.md)
- [getParsedStorageItem](/packages/orbit-core/functions/getParsedStorageItem.md)
- [getSolanaChainId](/packages/orbit-core/functions/getSolanaChainId.md)
- [getSolanaCluster](/packages/orbit-core/functions/getSolanaCluster.md)
- [isAddress](/packages/orbit-core/functions/isAddress.md)
- [isSolanaChain](/packages/orbit-core/functions/isSolanaChain.md)
- [normalizeError](/packages/orbit-core/functions/normalizeError.md)
- [parseCaip10AccountId](/packages/orbit-core/functions/parseCaip10AccountId.md)
- [parseCaip19AssetId](/packages/orbit-core/functions/parseCaip19AssetId.md)
- [parseCaip2ChainId](/packages/orbit-core/functions/parseCaip2ChainId.md)
- [selectAdapterByKey](/packages/orbit-core/functions/selectAdapterByKey.md)
- [setChainId](/packages/orbit-core/functions/setChainId.md)
- [toCaip2ChainId](/packages/orbit-core/functions/toCaip2ChainId.md)
- [toEvmChainId](/packages/orbit-core/functions/toEvmChainId.md)
- [waitFor](/packages/orbit-core/functions/waitFor.md)
