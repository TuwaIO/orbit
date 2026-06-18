# Orbit Utils

[![License](https://img.shields.io/npm/l/@tuwaio/orbit-core.svg)](./LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/TuwaIO/orbit/release.yml?branch=main)](https://github.com/TuwaIO/orbit/actions)

<p align="center">
  <img src="https://raw.githubusercontent.com/TuwaIO/workflows/refs/heads/main/preview/repos/orbit_utils.png" alt="Orbit Utils" width="450" style="border-radius: 12px; margin: 24px auto;" />
</p>

Orbit Utils is a lightweight, framework-agnostic, and multi-chain library ecosystem that abstracts blockchain complexity. It provides unified, type-safe interfaces for **EVM** and **Solana** operations (with **Starknet** support in development), ensuring your dApp code remains clean, modular, and sovereign.

---

## 🏛️ Core Principles

- **Absolute Sovereignty:** Designed for self-custodial applications. No reliance on third-party backend wallets or vendor-locked SDKs.
- **Headless Architecture:** Framework-agnostic core containing zero UI components. Integrates seamlessly into React, Vue, Svelte, or vanilla JavaScript environments.
- **Modular Multi-Chain Interface:** A unified adapter layout allows your UI code to handle cross-chain state without repeating logic or scattering conditional blocks.
- **Type-Safe Engineering:** Built with strict TypeScript v5.9+ types to ensure maximum compile-time safety and eliminate runtime errors.

---

## 💾 Installation

Orbit Utils is modular. Install the lightweight core package and add specific chain adapters as needed:

```bash
# Install the core adapter system and utilities
pnpm add @tuwaio/orbit-core

# Add the EVM adapter (includes viem and wagmi peer dependencies)
pnpm add @tuwaio/orbit-evm @wagmi/core viem

# Add the Solana adapter (includes gill and wallet standard dependencies)
pnpm add @tuwaio/orbit-solana gill @wallet-standard/app @wallet-standard/ui-core @wallet-standard/ui-registry
```

---

## 🚀 Quick Start

### Cross-Chain Selection

Select and invoke chain-specific operations dynamically using the unified core adapter interface:

```typescript
import { OrbitAdapter, selectAdapterByKey } from '@tuwaio/orbit-core';

// Configure your chain-specific adapters
const adapters = [
  { key: OrbitAdapter.EVM /* ...EVM adapter implementation */ },
  { key: OrbitAdapter.SOLANA /* ...Solana adapter implementation */ },
];

// Select EVM adapter
const evmAdapter = selectAdapterByKey({
  adapterKey: OrbitAdapter.EVM,
  adapter: adapters,
});

if (evmAdapter) {
  // Handle EVM-specific operations
  console.log('EVM Adapter selected:', evmAdapter.getChainName());
}

// Select Solana adapter
const solanaAdapter = selectAdapterByKey({
  adapterKey: OrbitAdapter.SOLANA,
  adapter: adapters,
});
```

---

## 🔧 Architecture & Monorepo Structure

The project is structured as a **pnpm workspace** to isolate core logic from chain-specific dependencies:

```
orbit/
├── apps/
│   └── docs/                   # Documentation website (Next.js + Nextra)
├── packages/
│   ├── orbit-core/             # The Brain. Shared logic, Types, and Adapter structures
│   ├── orbit-evm/              # The Muscle (EVM). Viem & Wagmi wrappers
│   └── orbit-solana/           # The Muscle (Solana). Gill & Wallet-Standard wrappers
```

### Module Breakdown

- **`@tuwaio/orbit-core`**: The foundation. Defines core Enums (`OrbitAdapter`), structural interfaces (`BaseAdapter`), and includes utility helpers for localStorage persistence, formatting, and async handlers.
- **`@tuwaio/orbit-evm`**: Handles EVM provider creation via `viem`, ENS name and avatar resolution, and wallet chain-switching utilities using `@wagmi/core`.
- **`@tuwaio/orbit-solana`**: Manages Solana RPC clients using `rpc-helpers` (`gill`), cluster Moniker mapping, explorer link generation, and Wallet Standard connector discovery.

---

## 🤝 Contributing

Contributions are welcome! Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

If you find this library useful, please consider supporting its development:
[**➡️ View Support & Donation Options**](https://github.com/TuwaIO/workflows/blob/main/Donation.md)

## 📄 License

Licensed under the **Apache-2.0 License**. See the [LICENSE](./LICENSE) file for details.
