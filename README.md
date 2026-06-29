# TUWA Orbit

[![License](https://img.shields.io/npm/l/@tuwaio/orbit-core.svg)](./LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/TuwaIO/orbit/release.yml?branch=main)](https://github.com/TuwaIO/orbit/actions)

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/TuwaIO/workflows@main/preview/repos/orbit_utils.png" alt="Orbit" width="450" style="border-radius: 12px; margin: 24px auto;" />
</p>

TUWA Orbit is the foundational baseline layer of the TUWA Web3 frontend stack, providing framework-agnostic modules for low-level multi-chain communication. It acts as the headless, logic-only connector layer that sits below any visual kits (such as Nova UI Kit) or transaction lifecycle tracking engines (such as Pulsar / Quasar), granting developers complete architectural control and absolute application sovereignty.

Orbit enforces a strict multi-chain abstraction through type-safe primitives, ensuring zero vendor lock-in and a complete rejection of legacy dependencies like `ethers.js` or `web3.js` in favor of high-performance modern libraries: `viem`, `wagmi`, and `gill`.

---

## 🏛️ Monorepo Tier Architecture

The monorepo structure segregates core cross-chain logic from concrete blockchain execution environments:

### Tier 1: Foundational Core

- **`@tuwaio/orbit-core`**: The brain of the connector layer. Contains shared interfaces, common enums (`OrbitAdapter`, `BaseAdapter`), and type-safe primitives for connection persistence and `localStorage` state helper utilities.

### Tier 2: Chain Platforms

- **`@tuwaio/orbit-evm`**: Concrete implementation of low-level EVM-specific communication primitives. Built strictly on top of `viem` and `@wagmi/core`.
- **`@tuwaio/orbit-solana`**: Concrete implementation of low-level Solana-specific communication primitives and RPC client caching. Powered strictly by `gill` and standard `@wallet-standard` specifications.

---

## 🔧 Monorepo Structure

```
orbit/
├── apps/
│   └── docs/                   # Nextra-based technical documentation & portal
├── packages/
│   ├── orbit-core/             # Tier 1: Shared types, validations, and storage helpers
│   ├── orbit-evm/              # Tier 2: Viem & Wagmi provider wrappers
│   └── orbit-solana/           # Tier 2: Gill & Wallet-Standard adapters
```

---

## 💾 Installation

Orbit is modular. Install the Tier 1 core package and layer the Tier 2 chain platforms depending on target networks:

```bash
# Tier 1 Core
pnpm add @tuwaio/orbit-core

# Tier 2 EVM Platform
pnpm add @tuwaio/orbit-evm @wagmi/core viem

# Tier 2 Solana Platform
pnpm add @tuwaio/orbit-solana gill @wallet-standard/app @wallet-standard/ui-core @wallet-standard/ui-registry
```

---

## 🚀 Architectural Usage Example

### Selecting and Invoking Dynamic Adapters

Integrate cross-chain operations through the common `BaseAdapter` interface:

```typescript
import { OrbitAdapter, selectAdapterByKey } from '@tuwaio/orbit-core';

// Configure adapters with low-level primitives
const adapters = [
  { key: OrbitAdapter.EVM, getChainName: () => 'Ethereum' /* ... */ },
  { key: OrbitAdapter.SOLANA, getChainName: () => 'Solana' /* ... */ },
];

// Dynamically resolve target primitive execution context
const activeAdapter = selectAdapterByKey({
  adapterKey: OrbitAdapter.EVM,
  adapter: adapters,
});

if (activeAdapter) {
  console.log('Active Execution Target:', activeAdapter.getChainName());
}
```

---

## 🤝 Contribution & Auditing

Please review our ecosystem **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

## 📄 License

Licensed under the **Apache-2.0 License**. See the [LICENSE](./LICENSE) file for details.
