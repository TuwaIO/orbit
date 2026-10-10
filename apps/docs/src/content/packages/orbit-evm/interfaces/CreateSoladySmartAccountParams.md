# CreateSoladySmartAccountParams

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:59](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L59)

Parameters for creating a Solady ERC-4337 Smart Account.

## Properties

### client

> **client**: `Client`\<`Transport`, `Chain` \| `undefined`, \{ `address`: `` `0x${string}` ``; `nonceManager?`: `NonceManager`; `publicKey`: `` `0x${string}` ``; `sign?`: (`parameters`) => `Promise`\<`` `0x${string}` ``\>; `signAuthorization?`: ((`parameters`) => `Promise`\<`SignAuthorizationReturnType`\>) \| `undefined`; `signMessage`: (`__namedParameters`) => `Promise`\<`` `0x${string}` ``\>; `signTransaction`: \<`serializer`, `transaction`\>(`transaction`, `options?`) => `Promise`\<`` `0x${string}` ``\>; `signTypedData`: \<`typedData`, `primaryType`\>(`parameters`) => `Promise`\<`Hex`\>; `source`: `string`; `type`: `"local"`; \} \| `JsonRpcAccount` \| `undefined`\>

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:61](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L61)

The client used to interact with the blockchain.

***

### salt?

> `optional` **salt?**: `` `0x${string}` ``

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:68](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L68)

Optional 32-byte salt for deterministic counterfactual deployment.
Defaults to right-padded EOA address to satisfy Solady factory owner-prefix verification.

***

### walletClient

> **walletClient**: `WalletClient`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:63](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L63)

The connected WalletClient (e.g. from Wagmi or browser provider) representing the EOA owner.
