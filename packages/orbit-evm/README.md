# @tuwaio/orbit-evm

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/orbit-evm.svg)](https://www.npmjs.com/package/@tuwaio/orbit-evm)
[![License](https://img.shields.io/npm/l/@tuwaio/orbit-evm.svg)](./LICENSE)

`@tuwaio/orbit-evm` provides concrete implementations of low-level EVM-specific communication primitives for Layer 2 (L2) of the TUWA Orbit stack. Engineered strictly on top of **`@wagmi/core`** and **`viem`**, this package provides deterministic chain switching, custom Viem client generation, cached ENS metadata resolution, and full ERC-4337 Account Abstraction orchestration via Pimlico and Solady smart accounts. It enforces a complete exclusion of legacy libraries like `ethers.js` or `web3.js`.

---

## 🏛️ Core Capabilities

- **Viem Client Optimization:** Creates and caches high-performance `viem` public clients (`createViemClient`) to minimize request latency and avoid duplicate RPC instantiation.
- **ERC-4337 Account Abstraction (Pimlico & Solady):** High-level client factory (`createPimlicoSmartAccountClient`) and Solady smart account instantiation (`createSoladySmartAccount`) with automatic gas sponsorship (`createPimlicoPaymasterClient`).
- **Deterministic Solady Salt Generation:** Generates right-padded 32-byte salts (`pad(ownerAddress, { dir: 'right', size: 32 })`) compliant with the Solady ERC-4337 factory prefix requirements, preventing `SaltDoesNotStartWith()` exceptions and multi-user address collisions.
- **ENS Metadata Engine:** Direct lookup utilities (`getName`, `getAvatar`, `getAddress`) on Ethereum Mainnet with local in-memory caching.
- **Deterministic Chain Switching:** Low-level utility (`checkAndSwitchChain`) to enforce network alignment with the target blockchain.
- **Strict Compile-Time Types:** Fully integrated with TypeScript standards v5.9+ and native Viem/Wagmi typings.

---

## 💾 Installation

```bash
pnpm add @tuwaio/orbit-evm @wagmi/core viem
```

If using `@tuwaio/orbit-core` adapters and type definitions alongside EVM primitives:

```bash
pnpm add @tuwaio/orbit-evm @tuwaio/orbit-core @wagmi/core viem
```

> [!IMPORTANT]
> `@wagmi/core` (v3.x) and `viem` (v2.x) are peer dependencies and must be installed alongside `@tuwaio/orbit-evm`.

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

### ERC-4337 Smart Account Client (Pimlico & Solady)

Instantiate a fully configured Solady smart account client with automated Pimlico bundler and paymaster sponsorship:

```typescript
import { createPimlicoSmartAccountClient } from '@tuwaio/orbit-evm';
import { sepolia } from 'viem/chains';
import { type Config } from '@wagmi/core';

declare const wagmiConfig: Config;

async function initializeSmartAccount() {
  const { account, bundlerClient, publicClient, paymasterClient } = await createPimlicoSmartAccountClient({
    chain: sepolia,
    wagmiConfig,
    apiKey: process.env.NEXT_PUBLIC_PIMLICO_API_KEY, // or custom bundlerUrl
    sponsor: true, // Enables Pimlico paymaster gas sponsorship
  });

  console.log('Solady Smart Account counterfactual address:', account.address);
  return { account, bundlerClient, publicClient };
}
```

#### Solady Salt Padding Rule

When deploying Solady smart accounts, the factory requires the salt to be prefixed with the EOA owner's 20-byte address. To guarantee a deterministic 32-byte representation without failing Solady's `SaltDoesNotStartWith()` check, `createSoladySmartAccount` defaults to right-padding:

```typescript
import { pad } from 'viem';

// Deterministic salt ensuring owner prefix alignment
const accountSalt = pad(ownerAccount.address, { dir: 'right', size: 32 });
```

### Low-Level Pimlico Bundler Client & RPC URL

Instantiate and cache Viem Bundler clients with automated Pimlico URL resolution:

```typescript
import { createBundlerRpcClient, createPimlicoRpcUrl } from '@tuwaio/orbit-evm';

// Generate or retrieve cached Pimlico RPC endpoint
const rpcUrl = createPimlicoRpcUrl({
  chainId: 11155111,
  apiKey: 'pim_test_key_123',
});

// Retrieve cached or new Viem Bundler Client (with in-memory cache)
const bundlerClient = createBundlerRpcClient({
  chainId: 11155111,
  apiKey: 'pim_test_key_123',
});
```

---

## 🔧 API & Module Architecture

`@tuwaio/orbit-evm` exposes the following modules:

- **ERC-4337 Account Abstraction:** `createPimlicoSmartAccountClient`, `createSoladySmartAccount`, `createPimlicoPaymasterClient`, `createPimlicoRpcUrl`, `createBundlerRpcClient`, `clearBundlerCache`.
- **Chain Alignment:** `checkAndSwitchChain`, `normalizeChainId`.
- **Client Factory:** `createViemClient`, `clearViemClientCache`.
- **ENS Resolvers:** `getAddress`, `getAvatar`, `getName`, `isEnsName`.

---

## 📄 License

Licensed under the **Apache-2.0 License**. See the [LICENSE](./LICENSE) file for details.
