# @tuwaio/orbit-evm

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/orbit-evm.svg)](https://www.npmjs.com/package/@tuwaio/orbit-evm)
[![License](https://img.shields.io/npm/l/@tuwaio/orbit-evm.svg)](./LICENSE)

`@tuwaio/orbit-evm` provides concrete implementations of low-level EVM-specific communication primitives for Tier 2 of the TUWA Orbit stack. Engineered strictly on top of **`@wagmi/core`** and **`viem`**, this package provides deterministic chain switching, custom Viem client generation, and cached ENS metadata resolution, while enforcing a complete exclusion of legacy libraries like `ethers.js` or `web3.js`.

---

## 🏛️ Core Capabilities

- **Viem Client Optimization:** Creates and caches high-performance `viem` public clients (`createViemClient`) to minimize request latency and avoid duplicate RPC instantiation.
- **ENS Metadata Engine:** Direct lookup utilities (`getName`, `getAvatar`, `getAddress`) on the Ethereum Mainnet context with local caching.
- **Deterministic Chain Switching:** Low-level utility (`checkAndSwitchChain`) to enforce network alignment with the target blockchain, requesting wallet configurations dynamically.
- **Strict Compile-Time Types:** Fully integrated with TypeScript standards v5.9+ and native Viem/Wagmi typings.

---

## 💾 Installation

```bash
pnpm add @tuwaio/orbit-evm @wagmi/core viem
```

> [!IMPORTANT]
> `@wagmi/core` and `viem` are peer dependencies and must be installed alongside `@tuwaio/orbit-evm`.

---

## 🚀 Technical Integration

### Cached Client Generation & Routing

Create a public client wrapper to route queries to EVM nodes:

```typescript
import { createViemClient } from '@tuwaio/orbit-evm';
import { mainnet } from 'viem/chains';

// Retrieve cached or new Viem Public Client
const client = createViemClient(mainnet);
```

### Deterministic Chain Switcher

Enforce that the wallet's connection context matches the requested chain:

```typescript
import { checkAndSwitchChain } from '@tuwaio/orbit-evm';
import { type Config } from '@wagmi/core';

declare const config: Config;

async function switchNetwork(targetChainId: number) {
  try {
    await checkAndSwitchChain(targetChainId, config);
    console.log(`Execution context successfully switched to: ${targetChainId}`);
  } catch (error) {
    console.error('Chain switch rejected:', error);
  }
}
```

---

## 🔧 API & Module Architecture

`@tuwaio/orbit-evm` exposes the following modules:

- **Chain Alignment:** `checkAndSwitchChain`.
- **Client Factory:** `createViemClient`.
- **ENS Resolvers:** `getAddress`, `getAvatar`, `getName`, `isEnsName`.

---

## 📄 License

Licensed under the **Apache-2.0 License**. See the [LICENSE](./LICENSE) file for details.
