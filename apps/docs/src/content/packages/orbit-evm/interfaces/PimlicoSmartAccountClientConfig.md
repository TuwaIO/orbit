# PimlicoSmartAccountClientConfig

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:74](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L74)

Configuration options for instantiating a Pimlico-powered ERC-4337 Smart Account client.

## Properties

### apiKey?

> `optional` **apiKey?**: `string`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:84](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L84)

Optional Pimlico API key.

***

### bundlerUrl?

> `optional` **bundlerUrl?**: `string`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:86](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L86)

Optional explicit custom bundler RPC URL.

***

### chain

> **chain**: `Chain`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:76](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L76)

Target EVM chain.

***

### client?

> `optional` **client?**: `PublicClient` \| `Client`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:82](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L82)

Optional public client for reading chain state. If omitted, one is created automatically.

***

### rpcUrl?

> `optional` **rpcUrl?**: `string`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:88](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L88)

Optional RPC URL for public client execution transport (e.g., Alchemy / Infura).

***

### salt?

> `optional` **salt?**: `` `0x${string}` ``

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:95](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L95)

Optional 32-byte salt for Solady smart account.

***

### sponsor?

> `optional` **sponsor?**: `boolean`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:93](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L93)

Whether to configure and attach Pimlico paymaster for gas sponsorship.
Defaults to true if apiKey or bundlerUrl is provided.

***

### wagmiConfig?

> `optional` **wagmiConfig?**: `Config`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:80](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L80)

Wagmi Config used to resolve the walletClient if not explicitly provided.

***

### walletClient?

> `optional` **walletClient?**: `WalletClient`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:78](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L78)

The connected WalletClient representing the EOA signer.
