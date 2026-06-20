# @tuwaio/orbit-evm

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/orbit-evm.svg)](https://www.npmjs.com/package/@tuwaio/orbit-evm)
[![License](https://img.shields.io/npm/l/@tuwaio/orbit-evm.svg)](./LICENSE)

`@tuwaio/orbit-evm` provides concrete implementations and utilities tailored specifically for EVM-compatible blockchains. Built entirely in **TypeScript** and powered by **`@wagmi/core`** and **`viem`**, it acts as the EVM adapter for the Orbit Utils ecosystem, simplifying client connections, chain switching, and identity lookups in web3 UIs.

---

## 🏛️ Core Capabilities

- **Public Client Caching:** Dynamically instantiates and caches `viem` public clients (`createViemClient`) to optimize RPC request efficiency.
- **ENS Metadata Engine:** Built-in ENS lookups targeting Ethereum Mainnet with internal caching for resolving ENS names to addresses, reverse resolving addresses, and fetching avatars.
- **Intelligent Chain Switcher:** Safe utility (`checkAndSwitchChain`) to prompt users' wallets to align with the required target network.
- **Type-Safe APIs:** Seamlessly aligned with typescript standards v5.9+ and Wagmi/Viem typings.

---

## 💾 Installation

```bash
pnpm add @tuwaio/orbit-evm @wagmi/core viem
```

> [!IMPORTANT]
> `@wagmi/core` and `viem` are peer dependencies and must be installed alongside `@tuwaio/orbit-evm`.

---

## 🚀 Quick Start

### ENS Metadata Resolution

Retrieve profile metadata associated with an Ethereum address dynamically:

```typescript
import { getName, getAvatar } from '@tuwaio/orbit-evm';
import { mainnet } from 'viem/chains';

async function fetchUserProfile(address: `0x${string}`) {
  // Resolve primary ENS name
  const name = await getName(address, [mainnet]);

  if (name) {
    // Resolve avatar image URL
    const avatarUrl = await getAvatar(name, [mainnet]);
    console.log(`ENS: ${name}, Avatar: ${avatarUrl}`);
  }
}
```

### Wallet Chain Alignment

Prompt the user's wallet to switch to the desired network context:

```typescript
import { checkAndSwitchChain } from '@tuwaio/orbit-evm';
import { type Config } from '@wagmi/core';

declare const wagmiConfig: Config; // Your wagmi configuration instance

async function alignNetwork() {
  try {
    const mainnetChainId = 1;
    await checkAndSwitchChain(mainnetChainId, wagmiConfig);
    console.log('Wallet aligned to Ethereum Mainnet');
  } catch (error) {
    console.error('Failed to align network:', error);
  }
}
```

---

## 🔧 API & Module Architecture

`@tuwaio/orbit-evm` exports the following modules:

- **Chain Switcher:** `checkAndSwitchChain`.
- **Public Client Factory:** `createViemClient` (cache-backed).
- **ENS Responders:** `getAddress`, `getAvatar`, `getName`, `isEnsName`.

---

## 🤝 Contributing

Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)** before submitting pull requests.

## 📄 License

Licensed under the **Apache-2.0 License**. See the [LICENSE](./LICENSE) file for details.
