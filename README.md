# Orbit Utils

[![License](https://img.shields.io/npm/l/@tuwaio/orbit-core.svg)](./LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/TuwaIO/orbit/release.yml?branch=main)](https://github.com/TuwaIO/orbit/actions)

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/TuwaIO/workflows@main/preview/repos/orbit_utils.png" alt="Orbit Utils" width="450" style="border-radius: 12px; margin: 24px auto;" />
</p>

**Orbit Utils** is the Stage 1 primitives layer of the TUWA ecosystem: headless, framework-agnostic helpers for talking to EVM and Solana networks. It provides cached RPC clients, wallet discovery, connection persistence, name resolution and ERC-4337 smart accounts as plain functions and types, with no UI, state management or framework bindings.

Orbit is built only on modern Web3 libraries: `viem` and `@wagmi/core` for EVM, `@solana/kit` and the Wallet Standard for Solana. It does not use `ethers.js`, `web3.js`, `@solana/web3.js` or `gill`, and it does not depend on any Wallet-as-a-Service platform.

📖 **Documentation:** [orbit.docs.tuwa.io](https://orbit.docs.tuwa.io)

---

## 🏛️ Ecosystem Layer Architecture

TUWA is built in stages. Orbit sits in **Stage 1 (Core Auth & Primitives)** next to [SIWX](https://siwx.docs.tuwa.io/), below [Satellite Connect](https://satellite.docs.tuwa.io/) and [Pulsar](https://pulsar.docs.tuwa.io/) (Stage 2), [Quasar](https://sdk.docs.tuwa.io/quasar-cloud/overview) (Stage 3) and [Nova UI Kit](https://stories.tuwa.io/) (Stage 4). Higher layers import Orbit's types and helpers; Orbit depends on nothing else in TUWA and can be used on its own.

Inside the monorepo, packages are split into two layers:

### Layer 1: Foundational Core (L1)

- **[`@tuwaio/orbit-core`](./packages/orbit-core)**: chain-agnostic types (`OrbitAdapter`, `BaseAdapter`, `ConnectorType`), connector and address helpers, error normalization (`normalizeError`) and SSR-safe `localStorage` connection persistence. Zero runtime dependencies.

### Layer 2: Chain Platforms (L2)

- **[`@tuwaio/orbit-evm`](./packages/orbit-evm)**: cached `viem` public clients, chain switching, ENS resolution and ERC-4337 smart accounts (Solady accounts with a Pimlico bundler and paymaster). Peer dependencies: `viem`, `@wagmi/core`.
- **[`@tuwaio/orbit-solana`](./packages/orbit-solana)**: cached `@solana/kit` RPC clients, Wallet Standard wallet discovery, cluster and explorer helpers, and SNS name and avatar lookups. Peer dependencies: `@tuwaio/orbit-core`, `@solana/kit`, `@wallet-standard/*`.

---

## 🔧 Monorepo Structure

```
orbit/
├── apps/
│   └── docs/                   # orbit.docs.tuwa.io (Next.js 16 + Nextra 4)
│       ├── src/content/        # Hand-written MDX pages + generated `packages/` reference
│       └── typedoc/            # TypeDoc plugins, Packages overview page and sidebar template
├── packages/
│   ├── orbit-core/             # L1: shared types, connector/address helpers, storage helpers
│   ├── orbit-evm/              # L2: viem & wagmi helpers, ENS, ERC-4337 (Solady + Pimlico)
│   └── orbit-solana/           # L2: @solana/kit RPC clients, Wallet Standard discovery, SNS lookups
└── typedoc.json                # Reference generation (TypeDoc "packages" strategy)
```

---

## 💾 Installation

Install the L1 core and the L2 chain packages your app targets:

```bash
# L1 Core
pnpm add @tuwaio/orbit-core

# L2 EVM Platform
pnpm add @tuwaio/orbit-evm @wagmi/core viem

# L2 Solana Platform
pnpm add @tuwaio/orbit-solana @tuwaio/orbit-core @solana/kit @wallet-standard/app @wallet-standard/ui-core @wallet-standard/ui-registry
```

---

## 🚀 Architectural Usage Example

`BaseAdapter` is the shared contract across chains. Build one adapter per chain family from the L2 helpers and pick the active one at runtime:

```typescript
import { type BaseAdapter, OrbitAdapter, selectAdapterByKey } from '@tuwaio/orbit-core';
import { getName } from '@tuwaio/orbit-evm';
import { getSolanaAddressName, getSolanaExplorerLink } from '@tuwaio/orbit-solana';
import type { Hex } from 'viem';
import { mainnet } from 'viem/chains';

type ChainAdapter = BaseAdapter & { key: OrbitAdapter };

const adapters: ChainAdapter[] = [
  {
    key: OrbitAdapter.EVM,
    getExplorerUrl: (path) => `https://etherscan.io/${path ?? ''}`,
    getName: (address) => getName(address as Hex, [mainnet] as const),
  },
  {
    key: OrbitAdapter.SOLANA,
    getExplorerUrl: getSolanaExplorerLink,
    getName: getSolanaAddressName,
  },
];

const activeAdapter = selectAdapterByKey({ adapterKey: OrbitAdapter.SOLANA, adapter: adapters });
const label = await activeAdapter?.getName?.('So11111111111111111111111111111111111111112');
```

---

## 🛠️ Development

```bash
pnpm install                          # installs dependencies and builds all packages
pnpm build                            # builds packages with tsup (ESM, CJS, types)
pnpm test                             # runs vitest in every package
pnpm lint                             # runs ESLint
pnpm docs:gen                         # regenerates the Packages reference in apps/docs
pnpm --filter @tuwaio/orbit-docs dev  # runs the docs site locally
```

The Packages reference is generated from each package's `src/index.ts`, JSDoc and README, and is regenerated by the pre-commit hook. Source links point to `main`, so a regeneration only changes the pages whose source actually changed.

---

## 🤝 Contribution & Auditing

Please review our ecosystem **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

## 📄 License

Licensed under the **Apache-2.0 License**. See the [LICENSE](./LICENSE) file for details.
