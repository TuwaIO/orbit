# @tuwaio/orbit-evm

[![NPM Version](https://img.shields.io/npm/v/@tuwaio/orbit-evm.svg)](https://www.npmjs.com/package/@tuwaio/orbit-evm)
[![License](https://img.shields.io/npm/l/@tuwaio/orbit-evm.svg)](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/LICENSE)

`@tuwaio/orbit-evm` is the EVM Layer 2 (L2) package of **Orbit Utils**, the Stage 1 primitives layer of the TUWA ecosystem. It wraps **`viem`** and **`@wagmi/core`** into small, framework-agnostic helpers: cached public clients, chain switching, ENS resolution, and ERC-4337 smart accounts built on Solady with a Pimlico bundler and paymaster. It does not use `ethers.js` or `web3.js`.

---

## 🏛️ Core Capabilities

- **Public clients:** `createViemClient` returns a cached `viem` public client per chain, so repeated reads do not create new clients.
- **Chain alignment:** `checkAndSwitchChain` asks the connected wallet to switch networks only when it is on a different chain, and throws a readable error when the user rejects.
- **ENS resolution:** `getName`, `getAvatar` and `getAddress` always resolve against Ethereum Mainnet and cache results in memory; `isEnsName` tells names and addresses apart.
- **ERC-4337 smart accounts:** `createPimlicoSmartAccountClient` sets up a Solady smart account (EntryPoint v0.7), a bundler client and an optional gas-sponsoring paymaster in one call. Bundler and paymaster clients are cached in memory per endpoint. The building blocks (`createSoladySmartAccount`, `createBundlerRpcClient`, `createPimlicoPaymasterClient`, `createPimlicoRpcUrl`, `clearBundlerCache`) are exported for custom setups.
- **Chain lists:** `getEvmChains` and `isEvmChainList` extract and detect EVM chain IDs in mixed multi-chain configurations.

---

## 💾 Installation

```bash
pnpm add @tuwaio/orbit-evm @wagmi/core viem
```

> [!IMPORTANT]
> `viem` (2.x) and `@wagmi/core` (3.x) are peer dependencies and must be installed alongside `@tuwaio/orbit-evm`.

---

## 🚀 Usage

### Cached public client

```typescript
import { createViemClient } from '@tuwaio/orbit-evm';
import { mainnet, sepolia } from 'viem/chains';

const chains = [mainnet, sepolia] as const;

// Returns undefined (and logs a warning) if the chain ID is not in `chains`.
const client = createViemClient(sepolia.id, chains);
const blockNumber = await client?.getBlockNumber();
```

The client uses the chain's default RPC URL. The cache is keyed by chain ID and is rebuilt when that URL changes.

### Chain switching

```typescript
import { type Config } from '@wagmi/core';
import { checkAndSwitchChain } from '@tuwaio/orbit-evm';

declare const wagmiConfig: Config;

try {
  await checkAndSwitchChain(11155111, wagmiConfig);
} catch (error) {
  // "User rejected the request to switch network." or a generic switch error (original error in `cause`).
  console.error(error);
}
```

### ENS resolution

```typescript
import { getAddress, getAvatar, getName, isEnsName } from '@tuwaio/orbit-evm';
import { mainnet } from 'viem/chains';

const chains = [mainnet] as const;

const name = await getName('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', chains); // "vitalik.eth" or null
const avatar = name ? await getAvatar(name, chains) : null;

const input = 'vitalik.eth';
const address = isEnsName(input) ? await getAddress(input, chains) : null; // lowercased address or null
```

Lookups use the mainnet entry of `chains` when present (so your own RPC URL is used), otherwise viem's default mainnet RPC.

### ERC-4337 smart account with Pimlico

```typescript
import { type Config } from '@wagmi/core';
import { createPimlicoSmartAccountClient } from '@tuwaio/orbit-evm';
import { sepolia } from 'viem/chains';

declare const wagmiConfig: Config;

const { account, bundlerClient } = await createPimlicoSmartAccountClient({
  chain: sepolia,
  wagmiConfig, // or pass `walletClient` directly
  apiKey: process.env.NEXT_PUBLIC_PIMLICO_API_KEY, // or `bundlerUrl` for your own bundler endpoint
});

const userOpHash = await bundlerClient.sendUserOperation({
  account,
  calls: [{ to: '0x0000000000000000000000000000000000000000', value: 0n }],
});
const receipt = await bundlerClient.waitForUserOperationReceipt({ hash: userOpHash });
```

- A connected wallet is required: the EOA signs for the smart account.
- Gas sponsorship (`sponsor`) is on by default when `apiKey` or `bundlerUrl` is set. Without either, the public Pimlico endpoint is used and no paymaster is attached.
- The smart account uses viem's Solady implementation with its default EntryPoint v0.7 (`entryPoint07Address`).
- The account salt defaults to the owner address right-padded to 32 bytes (`pad(owner, { dir: 'right', size: 32 })`). This satisfies the Solady factory's owner-prefix check (`SaltDoesNotStartWith()`) and gives every owner a deterministic, unique account address. Pass `salt` to override it.

> [!WARNING]
> The Pimlico API key becomes part of the bundler URL used by the browser. Use a key restricted to your domains and sponsorship policies, or proxy the bundler through your backend and pass its address as `bundlerUrl`.

### Low-level bundler building blocks

```typescript
import {
  clearBundlerCache,
  createBundlerRpcClient,
  createPimlicoPaymasterClient,
  createPimlicoRpcUrl,
} from '@tuwaio/orbit-evm';

// Resolution order: bundlerUrl → https://api.pimlico.io/v2/{chainId}/rpc?apikey=… → https://public.pimlico.io/v2/{chainId}/rpc
const rpcUrl = createPimlicoRpcUrl({ chainId: 11155111, apiKey: process.env.PIMLICO_API_KEY });

// Cached by resolved URL.
const paymasterClient = createPimlicoPaymasterClient({ chainId: 11155111, apiKey: process.env.PIMLICO_API_KEY });

// Cached by resolved URL, paymaster presence and client presence.
const bundlerClient = createBundlerRpcClient({
  chainId: 11155111,
  apiKey: process.env.PIMLICO_API_KEY,
  paymaster: paymasterClient,
});

// Drops cached URLs, bundler and paymaster clients (e.g. after rotating the API key).
clearBundlerCache();
```

---

## 📚 API Reference

Every export, with signatures and types generated from the source, is documented at **[orbit.docs.tuwa.io/packages/orbit-evm](https://orbit.docs.tuwa.io/packages/orbit-evm)**. For a full walkthrough of sovereign account abstraction with Orbit, Pulsar and Quasar, see the [ERC-4337 guide](https://docs.tuwa.io/guides/erc-4337-sovereign-account-abstraction).

## 📄 License

Licensed under the **Apache-2.0 License**. See the [LICENSE](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/LICENSE) file for details.

## Interfaces

- [CreateSoladySmartAccountParams](/packages/orbit-evm/interfaces/CreateSoladySmartAccountParams.md)
- [PimlicoSmartAccountClientConfig](/packages/orbit-evm/interfaces/PimlicoSmartAccountClientConfig.md)
- [PimlicoSmartAccountClientResult](/packages/orbit-evm/interfaces/PimlicoSmartAccountClientResult.md)
- [PimlicoUrlConfig](/packages/orbit-evm/interfaces/PimlicoUrlConfig.md)

## Type Aliases

- [BundlerRpcClientConfig](/packages/orbit-evm/type-aliases/BundlerRpcClientConfig.md)
- [SoladySmartAccount](/packages/orbit-evm/type-aliases/SoladySmartAccount.md)

## Functions

- [checkAndSwitchChain](/packages/orbit-evm/functions/checkAndSwitchChain.md)
- [clearBundlerCache](/packages/orbit-evm/functions/clearBundlerCache.md)
- [createBundlerRpcClient](/packages/orbit-evm/functions/createBundlerRpcClient.md)
- [createPimlicoPaymasterClient](/packages/orbit-evm/functions/createPimlicoPaymasterClient.md)
- [createPimlicoRpcUrl](/packages/orbit-evm/functions/createPimlicoRpcUrl.md)
- [createPimlicoSmartAccountClient](/packages/orbit-evm/functions/createPimlicoSmartAccountClient.md)
- [createSoladySmartAccount](/packages/orbit-evm/functions/createSoladySmartAccount.md)
- [createViemClient](/packages/orbit-evm/functions/createViemClient.md)
- [getAddress](/packages/orbit-evm/functions/getAddress.md)
- [getAvatar](/packages/orbit-evm/functions/getAvatar.md)
- [getEvmChains](/packages/orbit-evm/functions/getEvmChains.md)
- [getName](/packages/orbit-evm/functions/getName.md)
- [isEnsName](/packages/orbit-evm/functions/isEnsName.md)
- [isEvmChainList](/packages/orbit-evm/functions/isEvmChainList.md)
