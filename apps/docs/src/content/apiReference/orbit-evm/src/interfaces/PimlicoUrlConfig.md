[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# PimlicoUrlConfig

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:11](https://github.com/TuwaIO/orbit/blob/75d5bc54ffcf9e4fe60ff5ab68ee7b2168c933e2/packages/orbit-evm/src/utils/bundlerUtils.ts#L11)

Configuration options for generating Pimlico Bundler RPC URLs.

## Properties

### apiKey?

> `optional` **apiKey?**: `string`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:15](https://github.com/TuwaIO/orbit/blob/75d5bc54ffcf9e4fe60ff5ab68ee7b2168c933e2/packages/orbit-evm/src/utils/bundlerUtils.ts#L15)

Optional Pimlico API key. If omitted, falls back to public RPC or bundlerUrl.

***

### bundlerUrl?

> `optional` **bundlerUrl?**: `string`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:17](https://github.com/TuwaIO/orbit/blob/75d5bc54ffcf9e4fe60ff5ab68ee7b2168c933e2/packages/orbit-evm/src/utils/bundlerUtils.ts#L17)

Optional explicit custom bundler RPC URL that takes precedence.

***

### chainId

> **chainId**: `number`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:13](https://github.com/TuwaIO/orbit/blob/75d5bc54ffcf9e4fe60ff5ab68ee7b2168c933e2/packages/orbit-evm/src/utils/bundlerUtils.ts#L13)

Target EVM chain ID (e.g. 1 for Ethereum Mainnet, 11155111 for Sepolia).
