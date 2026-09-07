[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# CreateSoladySmartAccountParams

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:57](https://github.com/TuwaIO/orbit/blob/d6b82d7622d466a80528d456740a10576d03cc15/packages/orbit-evm/src/utils/bundlerUtils.ts#L57)

Parameters for creating a Solady ERC-4337 Smart Account.

## Properties

### client

> **client**: `Client`\<`Transport`, `Chain` \| `undefined`, \{ `address`: `` `0x${string}` ``; `nonceManager?`: `NonceManager`; `publicKey`: `` `0x${string}` ``; `sign?`: (`parameters`) => `Promise`\<`` `0x${string}` ``\>; `signAuthorization?`: (`parameters`) => `Promise`\<`SignAuthorizationReturnType`\>; `signMessage`: (`__namedParameters`) => `Promise`\<`` `0x${string}` ``\>; `signTransaction`: \<`serializer`, `transaction`\>(`transaction`, `options?`) => `Promise`\<`` `0x${string}` ``\>; `signTypedData`: \<`typedData`, `primaryType`\>(`parameters`) => `Promise`\<`` `0x${string}` ``\>; `source`: `string`; `type`: `"local"`; \} \| `JsonRpcAccount` \| `undefined`\>

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:59](https://github.com/TuwaIO/orbit/blob/d6b82d7622d466a80528d456740a10576d03cc15/packages/orbit-evm/src/utils/bundlerUtils.ts#L59)

The client used to interact with the blockchain.

***

### salt?

> `optional` **salt?**: `` `0x${string}` ``

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:66](https://github.com/TuwaIO/orbit/blob/d6b82d7622d466a80528d456740a10576d03cc15/packages/orbit-evm/src/utils/bundlerUtils.ts#L66)

Optional 32-byte salt for deterministic counterfactual deployment.
Defaults to right-padded EOA address to satisfy Solady factory owner-prefix verification.

***

### walletClient

> **walletClient**: `object`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:61](https://github.com/TuwaIO/orbit/blob/d6b82d7622d466a80528d456740a10576d03cc15/packages/orbit-evm/src/utils/bundlerUtils.ts#L61)

The connected WalletClient (e.g. from Wagmi or browser provider) representing the EOA owner.

#### account

> **account**: `Account` \| `undefined`

The Account of the Client.

#### addChain

> **addChain**: (`args`) => `Promise`\<`void`\>

Adds an EVM chain to the wallet.

- Docs: https://viem.sh/docs/actions/wallet/addChain
- JSON-RPC Methods: [`eth_addEthereumChain`](https://eips.ethereum.org/EIPS/eip-3085)

##### Parameters

###### args

`AddChainParameters`

AddChainParameters

##### Returns

`Promise`\<`void`\>

##### Example

```ts
import { createWalletClient, custom } from 'viem'
import { optimism } from 'viem/chains'

const client = createWalletClient({
  transport: custom(window.ethereum),
})
await client.addChain({ chain: optimism })
```

#### batch?

> `optional` **batch?**: `object`

Flags for batch settings.

##### batch.multicall?

> `optional` **multicall?**: `boolean` \| \{ `batchSize?`: `number`; `deployless?`: `boolean`; `wait?`: `number`; \}

Toggle to enable `eth_call` multicall aggregation.

###### Union Members

`boolean`

***

###### Type Literal

\{ `batchSize?`: `number`; `deployless?`: `boolean`; `wait?`: `number`; \}

###### batchSize?

> `optional` **batchSize?**: `number`

The maximum size (in bytes) for each calldata chunk.

###### Default

```ts
1_024
```

###### deployless?

> `optional` **deployless?**: `boolean`

Enable deployless multicall.

###### wait?

> `optional` **wait?**: `number`

The maximum number of milliseconds to wait before sending a batch.

###### Default

```ts
0
```

#### cacheTime

> **cacheTime**: `number`

Time (in ms) that cached data will remain in memory.

#### ccipRead?

> `optional` **ccipRead?**: `false` \| \{ `request?`: (`parameters`) => `Promise`\<`` `0x${string}` ``\>; \}

[CCIP Read](https://eips.ethereum.org/EIPS/eip-3668) configuration.

##### Union Members

`false`

***

###### Type Literal

\{ `request?`: (`parameters`) => `Promise`\<`` `0x${string}` ``\>; \}

###### request?

> `optional` **request?**: (`parameters`) => `Promise`\<`` `0x${string}` ``\>

A function that will be called to make the offchain CCIP lookup request.

###### Parameters

###### parameters

`CcipRequestParameters`

###### Returns

`Promise`\<`` `0x${string}` ``\>

###### See

https://eips.ethereum.org/EIPS/eip-3668#client-lookup-protocol

#### chain

> **chain**: `Chain` \| `undefined`

Chain for the client.

#### dataSuffix?

> `optional` **dataSuffix?**: `DataSuffix`

Data suffix to append to transaction data.

#### deployContract

> **deployContract**: \<`abi`, `chainOverride`\>(`args`) => `Promise`\<`` `0x${string}` ``\>

Deploys a contract to the network, given bytecode and constructor arguments.

- Docs: https://viem.sh/docs/contract/deployContract
- Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_deploying-contracts

##### Type Parameters

###### abi

`abi` *extends* `Abi` \| readonly `unknown`[]

###### chainOverride

`chainOverride` *extends* `Chain` \| `undefined`

##### Parameters

###### args

`DeployContractParameters`\<`abi`, `Chain` \| `undefined`, `Account` \| `undefined`, `chainOverride`\>

DeployContractParameters

##### Returns

`Promise`\<`` `0x${string}` ``\>

The [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash. DeployContractReturnType

##### Example

```ts
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: http(),
})
const hash = await client.deployContract({
  abi: [],
  account: '0x…,
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
})
```

#### experimental\_blockTag?

> `optional` **experimental\_blockTag?**: `BlockTag`

Default block tag to use for RPC requests.

#### extend

> **extend**: \<`client`\>(`fn`) => `Client`\<`Transport`, `Chain` \| `undefined`, `Account` \| `undefined`, `WalletRpcSchema`, \{ \[K in string \| number \| symbol\]: client\[K\] \} & `WalletActions`\<`Chain` \| `undefined`, `Account` \| `undefined`, `Tokens` \| `undefined`\>, `Tokens` \| `undefined`\>

##### Type Parameters

###### client

`client` *extends* `object` & `ExactPartial`\<`ExtendableProtectedActions`\<`Transport`, `Chain` \| `undefined`, `Account` \| `undefined`, `Tokens` \| `undefined`\>\>

##### Parameters

###### fn

(`client`) => `client`

##### Returns

`Client`\<`Transport`, `Chain` \| `undefined`, `Account` \| `undefined`, `WalletRpcSchema`, \{ \[K in string \| number \| symbol\]: client\[K\] \} & `WalletActions`\<`Chain` \| `undefined`, `Account` \| `undefined`, `Tokens` \| `undefined`\>, `Tokens` \| `undefined`\>

#### fillTransaction

> **fillTransaction**: \<`chainOverride`, `accountOverride`\>(`args`) => `Promise`\<`FillTransactionReturnType`\<`Chain` \| `undefined`, `chainOverride`\>\>

Fills a transaction request with the necessary fields to be signed over.

- Docs: https://viem.sh/docs/actions/public/fillTransaction

##### Type Parameters

###### chainOverride

`chainOverride` *extends* `Chain` \| `undefined` = `undefined`

###### accountOverride

`accountOverride` *extends* `` `0x${string}` `` \| `Account` \| `undefined` = `undefined`

##### Parameters

###### args

`FillTransactionParameters`\<`Chain` \| `undefined`, `Account` \| `undefined`, `chainOverride`, `accountOverride`\>

##### Returns

`Promise`\<`FillTransactionReturnType`\<`Chain` \| `undefined`, `chainOverride`\>\>

The filled transaction. FillTransactionReturnType

##### Example

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})
const result = await client.fillTransaction({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: parseEther('1'),
})
```

#### getAddresses

> **getAddresses**: () => `Promise`\<`GetAddressesReturnType`\>

Returns a list of account addresses owned by the wallet or client.

- Docs: https://viem.sh/docs/actions/wallet/getAddresses
- JSON-RPC Methods: [`eth_accounts`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_accounts)

##### Returns

`Promise`\<`GetAddressesReturnType`\>

List of account addresses owned by the wallet or client. GetAddressesReturnType

##### Example

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})
const accounts = await client.getAddresses()
```

#### getCallsStatus

> **getCallsStatus**: (`parameters`) => `Promise`\<\{ `atomic`: `boolean`; `capabilities?`: \{\[`key`: `string`\]: `any`; \} \| \{\[`key`: `string`\]: `any`; \}; `chainId`: `number`; `id`: `string`; `receipts?`: `WalletCallReceipt`\<`bigint`, `"success"` \| `"reverted"`\>[]; `status`: `"pending"` \| `"success"` \| `"failure"` \| `undefined`; `statusCode`: `number`; `version`: `string`; \}\>

Returns the status of a call batch that was sent via `sendCalls`.

- Docs: https://viem.sh/docs/actions/wallet/getCallsStatus
- JSON-RPC Methods: [`wallet_getCallsStatus`](https://eips.ethereum.org/EIPS/eip-5792)

##### Parameters

###### parameters

`GetCallsStatusParameters`

##### Returns

`Promise`\<\{ `atomic`: `boolean`; `capabilities?`: \{\[`key`: `string`\]: `any`; \} \| \{\[`key`: `string`\]: `any`; \}; `chainId`: `number`; `id`: `string`; `receipts?`: `WalletCallReceipt`\<`bigint`, `"success"` \| `"reverted"`\>[]; `status`: `"pending"` \| `"success"` \| `"failure"` \| `undefined`; `statusCode`: `number`; `version`: `string`; \}\>

Status of the calls. GetCallsStatusReturnType

##### Example

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})

const { receipts, status } = await client.getCallsStatus({ id: '0xdeadbeef' })
```

#### getCapabilities

> **getCapabilities**: \<`chainId`\>(`parameters?`) => `Promise`\<\{ \[K in string \| number \| symbol\]: (chainId extends number ? \{ atomic?: \{ status: "ready" \| "supported" \| "unsupported" \}; paymasterService?: \{ supported: boolean \}; unstable\_addSubAccount?: \{ keyTypes: ((...) \| (...) \| (...) \| (...))\[\]; supported: boolean \}; \[key: string\]: any \} : ChainIdToCapabilities\<Capabilities\<\{ atomic?: \{ status: ... \}; paymasterService?: \{ supported: ... \}; unstable\_addSubAccount?: \{ keyTypes: ...; supported: ... \}; \[key: string\]: any \}\>, number\>)\[K\] \}\>

Extract capabilities that a connected wallet supports (e.g. paymasters, session keys, etc).

- Docs: https://viem.sh/docs/actions/wallet/getCapabilities
- JSON-RPC Methods: [`wallet_getCapabilities`](https://eips.ethereum.org/EIPS/eip-5792)

##### Type Parameters

###### chainId

`chainId` *extends* `number` \| `undefined`

##### Parameters

###### parameters?

`GetCapabilitiesParameters`\<`chainId`\>

##### Returns

`Promise`\<\{ \[K in string \| number \| symbol\]: (chainId extends number ? \{ atomic?: \{ status: "ready" \| "supported" \| "unsupported" \}; paymasterService?: \{ supported: boolean \}; unstable\_addSubAccount?: \{ keyTypes: ((...) \| (...) \| (...) \| (...))\[\]; supported: boolean \}; \[key: string\]: any \} : ChainIdToCapabilities\<Capabilities\<\{ atomic?: \{ status: ... \}; paymasterService?: \{ supported: ... \}; unstable\_addSubAccount?: \{ keyTypes: ...; supported: ... \}; \[key: string\]: any \}\>, number\>)\[K\] \}\>

The wallet's capabilities. GetCapabilitiesReturnType

##### Example

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})

const capabilities = await client.getCapabilities({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
})
```

#### getChainId

> **getChainId**: () => `Promise`\<`number`\>

Returns the chain ID associated with the current network.

- Docs: https://viem.sh/docs/actions/public/getChainId
- JSON-RPC Methods: [`eth_chainId`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainid)

##### Returns

`Promise`\<`number`\>

The current chain ID. GetChainIdReturnType

##### Example

```ts
import { createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})
const chainId = await client.getChainId()
// 1
```

#### getPermissions

> **getPermissions**: () => `Promise`\<`GetPermissionsReturnType`\>

Gets the wallets current permissions.

- Docs: https://viem.sh/docs/actions/wallet/getPermissions
- JSON-RPC Methods: [`wallet_getPermissions`](https://eips.ethereum.org/EIPS/eip-2255)

##### Returns

`Promise`\<`GetPermissionsReturnType`\>

The wallet permissions. GetPermissionsReturnType

##### Example

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})
const permissions = await client.getPermissions()
```

#### key

> **key**: `string`

A key for the client.

#### name

> **name**: `string`

A name for the client.

#### pollingInterval

> **pollingInterval**: `number`

Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds.

#### prepareAuthorization

> **prepareAuthorization**: (`parameters`) => `Promise`\<`PrepareAuthorizationReturnType`\>

Prepares an [EIP-7702 Authorization](https://eips.ethereum.org/EIPS/eip-7702) object for signing.
This Action will fill the required fields of the Authorization object if they are not provided (e.g. `nonce` and `chainId`).

With the prepared Authorization object, you can use [`signAuthorization`](https://viem.sh/docs/eip7702/signAuthorization) to sign over the Authorization object.

##### Parameters

###### parameters

`PrepareAuthorizationParameters`\<`Account` \| `undefined`\>

PrepareAuthorizationParameters

##### Returns

`Promise`\<`PrepareAuthorizationReturnType`\>

The prepared Authorization object. PrepareAuthorizationReturnType

##### Examples

```ts
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: http(),
})

const authorization = await client.prepareAuthorization({
  account: privateKeyToAccount('0x..'),
  contractAddress: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
})
```

```ts
// Account Hoisting
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: http(),
})

const authorization = await client.prepareAuthorization({
  contractAddress: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
})
```

#### prepareTransactionRequest

> **prepareTransactionRequest**: \<`request`, `chainOverride`, `accountOverride`\>(`args`) => `Promise`\<\{ \[K in string \| number \| symbol\]: (UnionRequiredBy\<Extract\<UnionOmit\<(...), (...)\> & ((...) extends (...) ? (...) : (...)) & ((...) extends (...) ? (...) : (...)), IsNever\<(...)\> extends true ? unknown : ExactPartial\<(...)\>\> & \{ chainId?: number \}, ParameterTypeToParameters\<request\["parameters"\] extends readonly PrepareTransactionRequestParameterType\[\] ? any\[any\]\[number\] : "chainId" \| "type" \| "gas" \| "nonce" \| "blobVersionedHashes" \| "fees"\>\> & (unknown extends request\["kzg"\] ? \{\} : Pick\<request, "kzg"\>) & \{ \_capabilities?: \{ \[key: string\]: any \} \})\[K\] \}\>

Prepares a transaction request for signing.

- Docs: https://viem.sh/docs/actions/wallet/prepareTransactionRequest

##### Type Parameters

###### request

`request` *extends* `Omit`\<\{ `accessList?`: `undefined`; `authorizationList?`: `undefined`; `blobs?`: `undefined`; `blobVersionedHashes?`: `undefined`; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `bigint`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `undefined`; `maxPriorityFeePerGas?`: `undefined`; `nonce?`: `number`; `sidecars?`: `undefined`; `to?`: `` `0x${string}` `` \| `null`; `type?`: `"legacy"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `undefined`; `blobs?`: `undefined`; `blobVersionedHashes?`: `undefined`; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `bigint`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `undefined`; `maxPriorityFeePerGas?`: `undefined`; `nonce?`: `number`; `sidecars?`: `undefined`; `to?`: `` `0x${string}` `` \| `null`; `type?`: `"eip2930"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `undefined`; `blobs?`: `undefined`; `blobVersionedHashes?`: `undefined`; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `undefined`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `bigint`; `maxPriorityFeePerGas?`: `bigint`; `nonce?`: `number`; `sidecars?`: `undefined`; `to?`: `` `0x${string}` `` \| `null`; `type?`: `"eip1559"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `undefined`; `blobs?`: readonly `` `0x${string}` ``[] \| readonly `ByteArray`[]; `blobVersionedHashes`: readonly `` `0x${string}` ``[]; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `undefined`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `bigint`; `maxFeePerGas?`: `bigint`; `maxPriorityFeePerGas?`: `bigint`; `nonce?`: `number`; `sidecars?`: readonly `BlobSidecar`\<`` `0x${string}` ``\>[]; `to`: `` `0x${string}` `` \| `null`; `type?`: `"eip4844"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `undefined`; `blobs`: readonly `` `0x${string}` ``[] \| readonly `ByteArray`[]; `blobVersionedHashes?`: readonly `` `0x${string}` ``[]; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `undefined`; `kzg?`: `Kzg`; `maxFeePerBlobGas?`: `bigint`; `maxFeePerGas?`: `bigint`; `maxPriorityFeePerGas?`: `bigint`; `nonce?`: `number`; `sidecars?`: readonly `BlobSidecar`\<`` `0x${string}` ``\>[]; `to`: `` `0x${string}` `` \| `null`; `type?`: `"eip4844"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `AuthorizationList`\<`number`, `boolean`\>; `blobs?`: `undefined`; `blobVersionedHashes?`: `undefined`; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `undefined`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `bigint`; `maxPriorityFeePerGas?`: `bigint`; `nonce?`: `number`; `sidecars?`: `undefined`; `to?`: `` `0x${string}` `` \| `null`; `type?`: `"eip7702"`; `value?`: `bigint`; \}, `"from"`\> & `object` & `object`

###### chainOverride

`chainOverride` *extends* `Chain` \| `undefined` = `undefined`

###### accountOverride

`accountOverride` *extends* `` `0x${string}` `` \| `Account` \| `undefined` = `undefined`

##### Parameters

###### args

`PrepareTransactionRequestParameters`\<`Chain` \| `undefined`, `Account` \| `undefined`, `chainOverride`, `accountOverride`, `request`\>

PrepareTransactionRequestParameters

##### Returns

`Promise`\<\{ \[K in string \| number \| symbol\]: (UnionRequiredBy\<Extract\<UnionOmit\<(...), (...)\> & ((...) extends (...) ? (...) : (...)) & ((...) extends (...) ? (...) : (...)), IsNever\<(...)\> extends true ? unknown : ExactPartial\<(...)\>\> & \{ chainId?: number \}, ParameterTypeToParameters\<request\["parameters"\] extends readonly PrepareTransactionRequestParameterType\[\] ? any\[any\]\[number\] : "chainId" \| "type" \| "gas" \| "nonce" \| "blobVersionedHashes" \| "fees"\>\> & (unknown extends request\["kzg"\] ? \{\} : Pick\<request, "kzg"\>) & \{ \_capabilities?: \{ \[key: string\]: any \} \})\[K\] \}\>

The transaction request. PrepareTransactionRequestReturnType

##### Examples

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})
const request = await client.prepareTransactionRequest({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  to: '0x0000000000000000000000000000000000000000',
  value: 1n,
})
```

```ts
// Account Hoisting
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: custom(window.ethereum),
})
const request = await client.prepareTransactionRequest({
  to: '0x0000000000000000000000000000000000000000',
  value: 1n,
})
```

#### request

> **request**: `EIP1193RequestFn`\<`WalletRpcSchema`\>

Request function wrapped with friendly error handling

#### requestAddresses

> **requestAddresses**: () => `Promise`\<`RequestAddressesReturnType`\>

Requests a list of accounts managed by a wallet.

- Docs: https://viem.sh/docs/actions/wallet/requestAddresses
- JSON-RPC Methods: [`eth_requestAccounts`](https://eips.ethereum.org/EIPS/eip-1102)

Sends a request to the wallet, asking for permission to access the user's accounts. After the user accepts the request, it will return a list of accounts (addresses).

This API can be useful for dapps that need to access the user's accounts in order to execute transactions or interact with smart contracts.

##### Returns

`Promise`\<`RequestAddressesReturnType`\>

List of accounts managed by a wallet RequestAddressesReturnType

##### Example

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})
const accounts = await client.requestAddresses()
```

#### requestPermissions

> **requestPermissions**: (`args`) => `Promise`\<`RequestPermissionsReturnType`\>

Requests permissions for a wallet.

- Docs: https://viem.sh/docs/actions/wallet/requestPermissions
- JSON-RPC Methods: [`wallet_requestPermissions`](https://eips.ethereum.org/EIPS/eip-2255)

##### Parameters

###### args

RequestPermissionsParameters

###### eth_accounts

`Record`\<`string`, `any`\>

##### Returns

`Promise`\<`RequestPermissionsReturnType`\>

The wallet permissions. RequestPermissionsReturnType

##### Example

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})
const permissions = await client.requestPermissions({
  eth_accounts: {}
})
```

#### sendCalls

> **sendCalls**: \<`calls`, `chainOverride`\>(`parameters`) => `Promise`\<\{ `capabilities?`: \{\[`key`: `string`\]: `any`; \}; `id`: `string`; \}\>

Requests the connected wallet to send a batch of calls.

- Docs: https://viem.sh/docs/actions/wallet/sendCalls
- JSON-RPC Methods: [`wallet_sendCalls`](https://eips.ethereum.org/EIPS/eip-5792)

##### Type Parameters

###### calls

`calls` *extends* readonly `unknown`[]

###### chainOverride

`chainOverride` *extends* `Chain` \| `undefined` = `undefined`

##### Parameters

###### parameters

`SendCallsParameters`\<`Chain` \| `undefined`, `Account` \| `undefined`, `chainOverride`, `calls`\>

##### Returns

`Promise`\<\{ `capabilities?`: \{\[`key`: `string`\]: `any`; \}; `id`: `string`; \}\>

Transaction identifier. SendCallsReturnType

##### Example

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})

const id = await client.sendCalls({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  calls: [
    {
      data: '0xdeadbeef',
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    },
    {
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      value: 69420n,
    },
  ],
})
```

#### sendCallsSync

> **sendCallsSync**: \<`calls`, `chainOverride`\>(`parameters`) => `Promise`\<\{ `atomic`: `boolean`; `capabilities?`: \{\[`key`: `string`\]: `any`; \} \| \{\[`key`: `string`\]: `any`; \}; `chainId`: `number`; `id`: `string`; `receipts?`: `WalletCallReceipt`\<`bigint`, `"success"` \| `"reverted"`\>[]; `status`: `"pending"` \| `"success"` \| `"failure"` \| `undefined`; `statusCode`: `number`; `version`: `string`; \}\>

Requests the connected wallet to send a batch of calls, and waits for the calls to be included in a block.

- Docs: https://viem.sh/docs/actions/wallet/sendCallsSync
- JSON-RPC Methods: [`wallet_sendCalls`](https://eips.ethereum.org/EIPS/eip-5792)

##### Type Parameters

###### calls

`calls` *extends* readonly `unknown`[]

###### chainOverride

`chainOverride` *extends* `Chain` \| `undefined` = `undefined`

##### Parameters

###### parameters

`SendCallsSyncParameters`\<`Chain` \| `undefined`, `Account` \| `undefined`, `chainOverride`, `calls`\>

##### Returns

`Promise`\<\{ `atomic`: `boolean`; `capabilities?`: \{\[`key`: `string`\]: `any`; \} \| \{\[`key`: `string`\]: `any`; \}; `chainId`: `number`; `id`: `string`; `receipts?`: `WalletCallReceipt`\<`bigint`, `"success"` \| `"reverted"`\>[]; `status`: `"pending"` \| `"success"` \| `"failure"` \| `undefined`; `statusCode`: `number`; `version`: `string`; \}\>

Calls status. SendCallsSyncReturnType

##### Example

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})

const status = await client.sendCallsSync({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  calls: [
    {
      data: '0xdeadbeef',
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    },
    {
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      value: 69420n,
    },
  ],
})
```

#### sendRawTransaction

> **sendRawTransaction**: (`args`) => `Promise`\<`` `0x${string}` ``\>

Sends a **signed** transaction to the network

- Docs: https://viem.sh/docs/actions/wallet/sendRawTransaction
- JSON-RPC Method: [`eth_sendRawTransaction`](https://ethereum.github.io/execution-apis/api-documentation/)

##### Parameters

###### args

`SendRawTransactionParameters`

##### Returns

`Promise`\<`` `0x${string}` ``\>

The transaction hash. SendRawTransactionReturnType

##### Example

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'
import { sendRawTransaction } from 'viem/wallet'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})

const hash = await client.sendRawTransaction({
  serializedTransaction: '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33'
})
```

#### sendRawTransactionSync

> **sendRawTransactionSync**: (`args`) => `Promise`\<`TransactionReceipt`\>

Sends a **signed** transaction to the network synchronously,
and waits for the transaction to be included in a block.

- Docs: https://viem.sh/docs/actions/wallet/sendRawTransactionSync
- JSON-RPC Method: [`eth_sendRawTransactionSync`](https://eips.ethereum.org/EIPS/eip-7966)

##### Parameters

###### args

`SendRawTransactionSyncParameters`

##### Returns

`Promise`\<`TransactionReceipt`\>

The transaction receipt. SendRawTransactionSyncReturnType

##### Example

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'
import { sendRawTransactionSync } from 'viem/wallet'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})

const receipt = await client.sendRawTransactionSync({
  serializedTransaction: '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33'
})
```

#### sendTransaction

> **sendTransaction**: \<`request`, `chainOverride`\>(`args`) => `Promise`\<`` `0x${string}` ``\>

Creates, signs, and sends a new transaction to the network.

- Docs: https://viem.sh/docs/actions/wallet/sendTransaction
- Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_sending-transactions
- JSON-RPC Methods:
  - JSON-RPC Accounts: [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction)
  - Local Accounts: [`eth_sendRawTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction)

##### Type Parameters

###### request

`request` *extends* `Omit`\<\{ `accessList?`: `undefined`; `authorizationList?`: `undefined`; `blobs?`: `undefined`; `blobVersionedHashes?`: `undefined`; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `bigint`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `undefined`; `maxPriorityFeePerGas?`: `undefined`; `nonce?`: `number`; `sidecars?`: `undefined`; `to?`: `` `0x${string}` `` \| `null`; `type?`: `"legacy"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `undefined`; `blobs?`: `undefined`; `blobVersionedHashes?`: `undefined`; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `bigint`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `undefined`; `maxPriorityFeePerGas?`: `undefined`; `nonce?`: `number`; `sidecars?`: `undefined`; `to?`: `` `0x${string}` `` \| `null`; `type?`: `"eip2930"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `undefined`; `blobs?`: `undefined`; `blobVersionedHashes?`: `undefined`; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `undefined`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `bigint`; `maxPriorityFeePerGas?`: `bigint`; `nonce?`: `number`; `sidecars?`: `undefined`; `to?`: `` `0x${string}` `` \| `null`; `type?`: `"eip1559"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `undefined`; `blobs?`: readonly `` `0x${string}` ``[] \| readonly `ByteArray`[]; `blobVersionedHashes`: readonly `` `0x${string}` ``[]; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `undefined`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `bigint`; `maxFeePerGas?`: `bigint`; `maxPriorityFeePerGas?`: `bigint`; `nonce?`: `number`; `sidecars?`: readonly `BlobSidecar`\<`` `0x${string}` ``\>[]; `to`: `` `0x${string}` `` \| `null`; `type?`: `"eip4844"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `undefined`; `blobs`: readonly `` `0x${string}` ``[] \| readonly `ByteArray`[]; `blobVersionedHashes?`: readonly `` `0x${string}` ``[]; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `undefined`; `kzg?`: `Kzg`; `maxFeePerBlobGas?`: `bigint`; `maxFeePerGas?`: `bigint`; `maxPriorityFeePerGas?`: `bigint`; `nonce?`: `number`; `sidecars?`: readonly `BlobSidecar`\<`` `0x${string}` ``\>[]; `to`: `` `0x${string}` `` \| `null`; `type?`: `"eip4844"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `AuthorizationList`\<`number`, `boolean`\>; `blobs?`: `undefined`; `blobVersionedHashes?`: `undefined`; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `undefined`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `bigint`; `maxPriorityFeePerGas?`: `bigint`; `nonce?`: `number`; `sidecars?`: `undefined`; `to?`: `` `0x${string}` `` \| `null`; `type?`: `"eip7702"`; `value?`: `bigint`; \}, `"from"`\> & `object`

###### chainOverride

`chainOverride` *extends* `Chain` \| `undefined` = `undefined`

##### Parameters

###### args

`SendTransactionParameters`\<`Chain` \| `undefined`, `Account` \| `undefined`, `chainOverride`, `request`\>

SendTransactionParameters

##### Returns

`Promise`\<`` `0x${string}` ``\>

The [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash. SendTransactionReturnType

##### Examples

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})
const hash = await client.sendTransaction({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n,
})
```

```ts
// Account Hoisting
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: http(),
})
const hash = await client.sendTransaction({
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n,
})
```

#### sendTransactionSync

> **sendTransactionSync**: \<`request`, `chainOverride`\>(`args`) => `Promise`\<`TransactionReceipt`\>

Creates, signs, and sends a new transaction to the network synchronously.
Returns the transaction receipt.

- Docs: https://viem.sh/docs/actions/wallet/sendTransactionSync
- Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_sending-transactions
- JSON-RPC Methods:
  - JSON-RPC Accounts: [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction)
  - Local Accounts: [`eth_sendRawTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction)

##### Type Parameters

###### request

`request` *extends* `Omit`\<\{ `accessList?`: `undefined`; `authorizationList?`: `undefined`; `blobs?`: `undefined`; `blobVersionedHashes?`: `undefined`; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `bigint`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `undefined`; `maxPriorityFeePerGas?`: `undefined`; `nonce?`: `number`; `sidecars?`: `undefined`; `to?`: `` `0x${string}` `` \| `null`; `type?`: `"legacy"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `undefined`; `blobs?`: `undefined`; `blobVersionedHashes?`: `undefined`; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `bigint`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `undefined`; `maxPriorityFeePerGas?`: `undefined`; `nonce?`: `number`; `sidecars?`: `undefined`; `to?`: `` `0x${string}` `` \| `null`; `type?`: `"eip2930"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `undefined`; `blobs?`: `undefined`; `blobVersionedHashes?`: `undefined`; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `undefined`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `bigint`; `maxPriorityFeePerGas?`: `bigint`; `nonce?`: `number`; `sidecars?`: `undefined`; `to?`: `` `0x${string}` `` \| `null`; `type?`: `"eip1559"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `undefined`; `blobs?`: readonly `` `0x${string}` ``[] \| readonly `ByteArray`[]; `blobVersionedHashes`: readonly `` `0x${string}` ``[]; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `undefined`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `bigint`; `maxFeePerGas?`: `bigint`; `maxPriorityFeePerGas?`: `bigint`; `nonce?`: `number`; `sidecars?`: readonly `BlobSidecar`\<`` `0x${string}` ``\>[]; `to`: `` `0x${string}` `` \| `null`; `type?`: `"eip4844"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `undefined`; `blobs`: readonly `` `0x${string}` ``[] \| readonly `ByteArray`[]; `blobVersionedHashes?`: readonly `` `0x${string}` ``[]; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `undefined`; `kzg?`: `Kzg`; `maxFeePerBlobGas?`: `bigint`; `maxFeePerGas?`: `bigint`; `maxPriorityFeePerGas?`: `bigint`; `nonce?`: `number`; `sidecars?`: readonly `BlobSidecar`\<`` `0x${string}` ``\>[]; `to`: `` `0x${string}` `` \| `null`; `type?`: `"eip4844"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `AuthorizationList`\<`number`, `boolean`\>; `blobs?`: `undefined`; `blobVersionedHashes?`: `undefined`; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `undefined`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `bigint`; `maxPriorityFeePerGas?`: `bigint`; `nonce?`: `number`; `sidecars?`: `undefined`; `to?`: `` `0x${string}` `` \| `null`; `type?`: `"eip7702"`; `value?`: `bigint`; \}, `"from"`\> & `object`

###### chainOverride

`chainOverride` *extends* `Chain` \| `undefined` = `undefined`

##### Parameters

###### args

`SendTransactionSyncParameters`\<`Chain` \| `undefined`, `Account` \| `undefined`, `chainOverride`, `request`\>

SendTransactionParameters

##### Returns

`Promise`\<`TransactionReceipt`\>

The transaction receipt. SendTransactionReturnType

##### Examples

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})
const receipt = await client.sendTransactionSync({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n,
})
```

```ts
// Account Hoisting
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: http(),
})
const receipt = await client.sendTransactionSync({
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n,
})
```

#### showCallsStatus

> **showCallsStatus**: (`parameters`) => `Promise`\<`void`\>

Requests for the wallet to show information about a call batch
that was sent via `sendCalls`.

- Docs: https://viem.sh/docs/actions/wallet/showCallsStatus
- JSON-RPC Methods: [`wallet_showCallsStatus`](https://eips.ethereum.org/EIPS/eip-5792)

##### Parameters

###### parameters

`ShowCallsStatusParameters`

##### Returns

`Promise`\<`void`\>

Displays status of the calls in wallet. ShowCallsStatusReturnType

##### Example

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})

await client.showCallsStatus({ id: '0xdeadbeef' })
```

#### signAuthorization

> **signAuthorization**: (`parameters`) => `Promise`\<`SignAuthorizationReturnType`\>

Signs an [EIP-7702 Authorization](https://eips.ethereum.org/EIPS/eip-7702) object.

With the calculated signature, you can:
- use [`verifyAuthorization`](https://viem.sh/docs/eip7702/verifyAuthorization) to verify the signed Authorization object,
- use [`recoverAuthorizationAddress`](https://viem.sh/docs/eip7702/recoverAuthorizationAddress) to recover the signing address from the signed Authorization object.

##### Parameters

###### parameters

`SignAuthorizationParameters`\<`Account` \| `undefined`\>

SignAuthorizationParameters

##### Returns

`Promise`\<`SignAuthorizationReturnType`\>

The signed Authorization object. SignAuthorizationReturnType

##### Examples

```ts
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: http(),
})

const signature = await client.signAuthorization({
  account: privateKeyToAccount('0x..'),
  contractAddress: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
})
```

```ts
// Account Hoisting
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: http(),
})

const signature = await client.signAuthorization({
  contractAddress: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
})
```

#### signMessage

> **signMessage**: (`args`) => `Promise`\<`` `0x${string}` ``\>

Calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`.

- Docs: https://viem.sh/docs/actions/wallet/signMessage
- JSON-RPC Methods:
  - JSON-RPC Accounts: [`personal_sign`](https://docs.metamask.io/guide/signing-data#personal-sign)
  - Local Accounts: Signs locally. No JSON-RPC request.

With the calculated signature, you can:
- use [`verifyMessage`](https://viem.sh/docs/utilities/verifyMessage) to verify the signature,
- use [`recoverMessageAddress`](https://viem.sh/docs/utilities/recoverMessageAddress) to recover the signing address from a signature.

##### Parameters

###### args

`SignMessageParameters`\<`Account` \| `undefined`\>

SignMessageParameters

##### Returns

`Promise`\<`` `0x${string}` ``\>

The signed message. SignMessageReturnType

##### Examples

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})
const signature = await client.signMessage({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  message: 'hello world',
})
```

```ts
// Account Hoisting
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: http(),
})
const signature = await client.signMessage({
  message: 'hello world',
})
```

#### signTransaction

> **signTransaction**: \<`chainOverride`, `request`\>(`args`) => `Promise`\<`TransactionSerialized`\<`GetTransactionType`\<`request`, `request` *extends* `LegacyProperties` ? `"legacy"` : `never` \| `request` *extends* `EIP1559Properties` ? `"eip1559"` : `never` \| `request` *extends* `EIP2930Properties` ? `"eip2930"` : `never` \| `request` *extends* `EIP4844Properties` ? `"eip4844"` : `never` \| `request` *extends* `EIP7702Properties` ? `"eip7702"` : `never` \| `request`\[`"type"`\] *extends* `string` \| `undefined` ? `Extract`\<`any`\[`any`\], `string`\> : `never`\>, `GetTransactionType`\<`request`, `request` *extends* `LegacyProperties` ? `"legacy"` : `never` \| `request` *extends* `EIP1559Properties` ? `"eip1559"` : `never` \| `request` *extends* `EIP2930Properties` ? `"eip2930"` : `never` \| `request` *extends* `EIP4844Properties` ? `"eip4844"` : `never` \| `request` *extends* `EIP7702Properties` ? `"eip7702"` : `never` \| `request`\[`"type"`\] *extends* `string` \| `undefined` ? `Extract`\<`any`\[`any`\], `string`\> : `never`\> *extends* `"eip1559"` ? `` `0x02${string}` `` : `never` \| `GetTransactionType`\<`request`, `request` *extends* `LegacyProperties` ? `"legacy"` : `never` \| `request` *extends* `EIP1559Properties` ? `"eip1559"` : `never` \| `request` *extends* `EIP2930Properties` ? `"eip2930"` : `never` \| `request` *extends* `EIP4844Properties` ? `"eip4844"` : `never` \| `request` *extends* `EIP7702Properties` ? `"eip7702"` : `never` \| `request`\[`"type"`\] *extends* `string` \| `undefined` ? `Extract`\<`any`\[`any`\], `string`\> : `never`\> *extends* `"eip2930"` ? `` `0x01${string}` `` : `never` \| `GetTransactionType`\<`request`, `request` *extends* `LegacyProperties` ? `"legacy"` : `never` \| `request` *extends* `EIP1559Properties` ? `"eip1559"` : `never` \| `request` *extends* `EIP2930Properties` ? `"eip2930"` : `never` \| `request` *extends* `EIP4844Properties` ? `"eip4844"` : `never` \| `request` *extends* `EIP7702Properties` ? `"eip7702"` : `never` \| `request`\[`"type"`\] *extends* `string` \| `undefined` ? `Extract`\<`any`\[`any`\], `string`\> : `never`\> *extends* `"eip4844"` ? `` `0x03${string}` `` : `never` \| `GetTransactionType`\<`request`, `request` *extends* `LegacyProperties` ? `"legacy"` : `never` \| `request` *extends* `EIP1559Properties` ? `"eip1559"` : `never` \| `request` *extends* `EIP2930Properties` ? `"eip2930"` : `never` \| `request` *extends* `EIP4844Properties` ? `"eip4844"` : `never` \| `request` *extends* `EIP7702Properties` ? `"eip7702"` : `never` \| `request`\[`"type"`\] *extends* `string` \| `undefined` ? `Extract`\<`any`\[`any`\], `string`\> : `never`\> *extends* `"eip7702"` ? `` `0x04${string}` `` : `never` \| `GetTransactionType`\<`request`, `request` *extends* `LegacyProperties` ? `"legacy"` : `never` \| `request` *extends* `EIP1559Properties` ? `"eip1559"` : `never` \| `request` *extends* `EIP2930Properties` ? `"eip2930"` : `never` \| `request` *extends* `EIP4844Properties` ? `"eip4844"` : `never` \| `request` *extends* `EIP7702Properties` ? `"eip7702"` : `never` \| `request`\[`"type"`\] *extends* `string` \| `undefined` ? `Extract`\<`any`\[`any`\], `string`\> : `never`\> *extends* `"legacy"` ? `TransactionSerializedLegacy` : `never`\>\>

Signs a transaction.

- Docs: https://viem.sh/docs/actions/wallet/signTransaction
- JSON-RPC Methods:
  - JSON-RPC Accounts: [`eth_signTransaction`](https://ethereum.github.io/execution-apis/api-documentation/)
  - Local Accounts: Signs locally. No JSON-RPC request.

##### Type Parameters

###### chainOverride

`chainOverride` *extends* `Chain` \| `undefined`

###### request

`request` *extends* `Omit`\<\{ `accessList?`: `undefined`; `authorizationList?`: `undefined`; `blobs?`: `undefined`; `blobVersionedHashes?`: `undefined`; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `bigint`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `undefined`; `maxPriorityFeePerGas?`: `undefined`; `nonce?`: `number`; `sidecars?`: `undefined`; `to?`: `` `0x${string}` `` \| `null`; `type?`: `"legacy"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `undefined`; `blobs?`: `undefined`; `blobVersionedHashes?`: `undefined`; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `bigint`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `undefined`; `maxPriorityFeePerGas?`: `undefined`; `nonce?`: `number`; `sidecars?`: `undefined`; `to?`: `` `0x${string}` `` \| `null`; `type?`: `"eip2930"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `undefined`; `blobs?`: `undefined`; `blobVersionedHashes?`: `undefined`; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `undefined`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `bigint`; `maxPriorityFeePerGas?`: `bigint`; `nonce?`: `number`; `sidecars?`: `undefined`; `to?`: `` `0x${string}` `` \| `null`; `type?`: `"eip1559"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `undefined`; `blobs?`: readonly `` `0x${string}` ``[] \| readonly `ByteArray`[]; `blobVersionedHashes`: readonly `` `0x${string}` ``[]; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `undefined`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `bigint`; `maxFeePerGas?`: `bigint`; `maxPriorityFeePerGas?`: `bigint`; `nonce?`: `number`; `sidecars?`: readonly `BlobSidecar`\<`` `0x${string}` ``\>[]; `to`: `` `0x${string}` `` \| `null`; `type?`: `"eip4844"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `undefined`; `blobs`: readonly `` `0x${string}` ``[] \| readonly `ByteArray`[]; `blobVersionedHashes?`: readonly `` `0x${string}` ``[]; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `undefined`; `kzg?`: `Kzg`; `maxFeePerBlobGas?`: `bigint`; `maxFeePerGas?`: `bigint`; `maxPriorityFeePerGas?`: `bigint`; `nonce?`: `number`; `sidecars?`: readonly `BlobSidecar`\<`` `0x${string}` ``\>[]; `to`: `` `0x${string}` `` \| `null`; `type?`: `"eip4844"`; `value?`: `bigint`; \}, `"from"`\> \| `Omit`\<\{ `accessList?`: `AccessList`; `authorizationList?`: `AuthorizationList`\<`number`, `boolean`\>; `blobs?`: `undefined`; `blobVersionedHashes?`: `undefined`; `data?`: `` `0x${string}` ``; `from?`: `` `0x${string}` ``; `gas?`: `bigint`; `gasPrice?`: `undefined`; `kzg?`: `undefined`; `maxFeePerBlobGas?`: `undefined`; `maxFeePerGas?`: `bigint`; `maxPriorityFeePerGas?`: `bigint`; `nonce?`: `number`; `sidecars?`: `undefined`; `to?`: `` `0x${string}` `` \| `null`; `type?`: `"eip7702"`; `value?`: `bigint`; \}, `"from"`\> = `UnionOmit`\<`ExtractChainFormatterParameters`\<`DeriveChain`\<`Chain` \| `undefined`, `chainOverride`\>, `"transactionRequest"`, `TransactionRequest`\>, `"from"`\>

##### Parameters

###### args

`SignTransactionParameters`\<`Chain` \| `undefined`, `Account` \| `undefined`, `chainOverride`, `request`\>

SignTransactionParameters

##### Returns

`Promise`\<`TransactionSerialized`\<`GetTransactionType`\<`request`, `request` *extends* `LegacyProperties` ? `"legacy"` : `never` \| `request` *extends* `EIP1559Properties` ? `"eip1559"` : `never` \| `request` *extends* `EIP2930Properties` ? `"eip2930"` : `never` \| `request` *extends* `EIP4844Properties` ? `"eip4844"` : `never` \| `request` *extends* `EIP7702Properties` ? `"eip7702"` : `never` \| `request`\[`"type"`\] *extends* `string` \| `undefined` ? `Extract`\<`any`\[`any`\], `string`\> : `never`\>, `GetTransactionType`\<`request`, `request` *extends* `LegacyProperties` ? `"legacy"` : `never` \| `request` *extends* `EIP1559Properties` ? `"eip1559"` : `never` \| `request` *extends* `EIP2930Properties` ? `"eip2930"` : `never` \| `request` *extends* `EIP4844Properties` ? `"eip4844"` : `never` \| `request` *extends* `EIP7702Properties` ? `"eip7702"` : `never` \| `request`\[`"type"`\] *extends* `string` \| `undefined` ? `Extract`\<`any`\[`any`\], `string`\> : `never`\> *extends* `"eip1559"` ? `` `0x02${string}` `` : `never` \| `GetTransactionType`\<`request`, `request` *extends* `LegacyProperties` ? `"legacy"` : `never` \| `request` *extends* `EIP1559Properties` ? `"eip1559"` : `never` \| `request` *extends* `EIP2930Properties` ? `"eip2930"` : `never` \| `request` *extends* `EIP4844Properties` ? `"eip4844"` : `never` \| `request` *extends* `EIP7702Properties` ? `"eip7702"` : `never` \| `request`\[`"type"`\] *extends* `string` \| `undefined` ? `Extract`\<`any`\[`any`\], `string`\> : `never`\> *extends* `"eip2930"` ? `` `0x01${string}` `` : `never` \| `GetTransactionType`\<`request`, `request` *extends* `LegacyProperties` ? `"legacy"` : `never` \| `request` *extends* `EIP1559Properties` ? `"eip1559"` : `never` \| `request` *extends* `EIP2930Properties` ? `"eip2930"` : `never` \| `request` *extends* `EIP4844Properties` ? `"eip4844"` : `never` \| `request` *extends* `EIP7702Properties` ? `"eip7702"` : `never` \| `request`\[`"type"`\] *extends* `string` \| `undefined` ? `Extract`\<`any`\[`any`\], `string`\> : `never`\> *extends* `"eip4844"` ? `` `0x03${string}` `` : `never` \| `GetTransactionType`\<`request`, `request` *extends* `LegacyProperties` ? `"legacy"` : `never` \| `request` *extends* `EIP1559Properties` ? `"eip1559"` : `never` \| `request` *extends* `EIP2930Properties` ? `"eip2930"` : `never` \| `request` *extends* `EIP4844Properties` ? `"eip4844"` : `never` \| `request` *extends* `EIP7702Properties` ? `"eip7702"` : `never` \| `request`\[`"type"`\] *extends* `string` \| `undefined` ? `Extract`\<`any`\[`any`\], `string`\> : `never`\> *extends* `"eip7702"` ? `` `0x04${string}` `` : `never` \| `GetTransactionType`\<`request`, `request` *extends* `LegacyProperties` ? `"legacy"` : `never` \| `request` *extends* `EIP1559Properties` ? `"eip1559"` : `never` \| `request` *extends* `EIP2930Properties` ? `"eip2930"` : `never` \| `request` *extends* `EIP4844Properties` ? `"eip4844"` : `never` \| `request` *extends* `EIP7702Properties` ? `"eip7702"` : `never` \| `request`\[`"type"`\] *extends* `string` \| `undefined` ? `Extract`\<`any`\[`any`\], `string`\> : `never`\> *extends* `"legacy"` ? `TransactionSerializedLegacy` : `never`\>\>

The signed message. SignTransactionReturnType

##### Examples

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})
const request = await client.prepareTransactionRequest({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  to: '0x0000000000000000000000000000000000000000',
  value: 1n,
})
const signature = await client.signTransaction(request)
```

```ts
// Account Hoisting
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: custom(window.ethereum),
})
const request = await client.prepareTransactionRequest({
  to: '0x0000000000000000000000000000000000000000',
  value: 1n,
})
const signature = await client.signTransaction(request)
```

#### signTypedData

> **signTypedData**: \<`typedData`, `primaryType`\>(`args`) => `Promise`\<`` `0x${string}` ``\>

Signs typed data and calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`.

- Docs: https://viem.sh/docs/actions/wallet/signTypedData
- JSON-RPC Methods:
  - JSON-RPC Accounts: [`eth_signTypedData_v4`](https://docs.metamask.io/guide/signing-data#signtypeddata-v4)
  - Local Accounts: Signs locally. No JSON-RPC request.

##### Type Parameters

###### typedData

`typedData` *extends* \{\[`key`: `string`\]: readonly `TypedDataParameter`[];
\[`key`: `` `string[${string}]` ``\]: `undefined`;
\[`key`: `` `function[${string}]` ``\]: `undefined`;
\[`key`: `` `address[${string}]` ``\]: `undefined`;
\[`key`: `` `bool[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes1[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes2[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes3[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes13[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes10[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes30[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes5[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes4[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes6[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes7[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes8[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes9[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes11[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes12[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes14[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes15[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes16[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes17[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes18[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes19[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes20[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes21[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes22[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes23[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes24[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes25[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes26[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes27[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes28[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes29[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes31[${string}]` ``\]: `undefined`;
\[`key`: `` `bytes32[${string}]` ``\]: `undefined`;
\[`key`: `` `int[${string}]` ``\]: `undefined`;
\[`key`: `` `int200[${string}]` ``\]: `undefined`;
\[`key`: `` `int8[${string}]` ``\]: `undefined`;
\[`key`: `` `int16[${string}]` ``\]: `undefined`;
\[`key`: `` `int24[${string}]` ``\]: `undefined`;
\[`key`: `` `int32[${string}]` ``\]: `undefined`;
\[`key`: `` `int40[${string}]` ``\]: `undefined`;
\[`key`: `` `int48[${string}]` ``\]: `undefined`;
\[`key`: `` `int56[${string}]` ``\]: `undefined`;
\[`key`: `` `int64[${string}]` ``\]: `undefined`;
\[`key`: `` `int72[${string}]` ``\]: `undefined`;
\[`key`: `` `int80[${string}]` ``\]: `undefined`;
\[`key`: `` `int88[${string}]` ``\]: `undefined`;
\[`key`: `` `int96[${string}]` ``\]: `undefined`;
\[`key`: `` `int104[${string}]` ``\]: `undefined`;
\[`key`: `` `int112[${string}]` ``\]: `undefined`;
\[`key`: `` `int120[${string}]` ``\]: `undefined`;
\[`key`: `` `int128[${string}]` ``\]: `undefined`;
\[`key`: `` `int136[${string}]` ``\]: `undefined`;
\[`key`: `` `int144[${string}]` ``\]: `undefined`;
\[`key`: `` `int152[${string}]` ``\]: `undefined`;
\[`key`: `` `int160[${string}]` ``\]: `undefined`;
\[`key`: `` `int168[${string}]` ``\]: `undefined`;
\[`key`: `` `int176[${string}]` ``\]: `undefined`;
\[`key`: `` `int184[${string}]` ``\]: `undefined`;
\[`key`: `` `int192[${string}]` ``\]: `undefined`;
\[`key`: `` `int208[${string}]` ``\]: `undefined`;
\[`key`: `` `int216[${string}]` ``\]: `undefined`;
\[`key`: `` `int224[${string}]` ``\]: `undefined`;
\[`key`: `` `int232[${string}]` ``\]: `undefined`;
\[`key`: `` `int240[${string}]` ``\]: `undefined`;
\[`key`: `` `int248[${string}]` ``\]: `undefined`;
\[`key`: `` `int256[${string}]` ``\]: `undefined`;
\[`key`: `` `uint[${string}]` ``\]: `undefined`;
\[`key`: `` `uint200[${string}]` ``\]: `undefined`;
\[`key`: `` `uint8[${string}]` ``\]: `undefined`;
\[`key`: `` `uint16[${string}]` ``\]: `undefined`;
\[`key`: `` `uint24[${string}]` ``\]: `undefined`;
\[`key`: `` `uint32[${string}]` ``\]: `undefined`;
\[`key`: `` `uint40[${string}]` ``\]: `undefined`;
\[`key`: `` `uint48[${string}]` ``\]: `undefined`;
\[`key`: `` `uint56[${string}]` ``\]: `undefined`;
\[`key`: `` `uint64[${string}]` ``\]: `undefined`;
\[`key`: `` `uint72[${string}]` ``\]: `undefined`;
\[`key`: `` `uint80[${string}]` ``\]: `undefined`;
\[`key`: `` `uint88[${string}]` ``\]: `undefined`;
\[`key`: `` `uint96[${string}]` ``\]: `undefined`;
\[`key`: `` `uint104[${string}]` ``\]: `undefined`;
\[`key`: `` `uint112[${string}]` ``\]: `undefined`;
\[`key`: `` `uint120[${string}]` ``\]: `undefined`;
\[`key`: `` `uint128[${string}]` ``\]: `undefined`;
\[`key`: `` `uint136[${string}]` ``\]: `undefined`;
\[`key`: `` `uint144[${string}]` ``\]: `undefined`;
\[`key`: `` `uint152[${string}]` ``\]: `undefined`;
\[`key`: `` `uint160[${string}]` ``\]: `undefined`;
\[`key`: `` `uint168[${string}]` ``\]: `undefined`;
\[`key`: `` `uint176[${string}]` ``\]: `undefined`;
\[`key`: `` `uint184[${string}]` ``\]: `undefined`;
\[`key`: `` `uint192[${string}]` ``\]: `undefined`;
\[`key`: `` `uint208[${string}]` ``\]: `undefined`;
\[`key`: `` `uint216[${string}]` ``\]: `undefined`;
\[`key`: `` `uint224[${string}]` ``\]: `undefined`;
\[`key`: `` `uint232[${string}]` ``\]: `undefined`;
\[`key`: `` `uint240[${string}]` ``\]: `undefined`;
\[`key`: `` `uint248[${string}]` ``\]: `undefined`;
\[`key`: `` `uint256[${string}]` ``\]: `undefined`; `address?`: `undefined`; `bool?`: `undefined`; `bytes?`: `undefined`; `bytes1?`: `undefined`; `bytes10?`: `undefined`; `bytes11?`: `undefined`; `bytes12?`: `undefined`; `bytes13?`: `undefined`; `bytes14?`: `undefined`; `bytes15?`: `undefined`; `bytes16?`: `undefined`; `bytes17?`: `undefined`; `bytes18?`: `undefined`; `bytes19?`: `undefined`; `bytes2?`: `undefined`; `bytes20?`: `undefined`; `bytes21?`: `undefined`; `bytes22?`: `undefined`; `bytes23?`: `undefined`; `bytes24?`: `undefined`; `bytes25?`: `undefined`; `bytes26?`: `undefined`; `bytes27?`: `undefined`; `bytes28?`: `undefined`; `bytes29?`: `undefined`; `bytes3?`: `undefined`; `bytes30?`: `undefined`; `bytes31?`: `undefined`; `bytes32?`: `undefined`; `bytes4?`: `undefined`; `bytes5?`: `undefined`; `bytes6?`: `undefined`; `bytes7?`: `undefined`; `bytes8?`: `undefined`; `bytes9?`: `undefined`; `int104?`: `undefined`; `int112?`: `undefined`; `int120?`: `undefined`; `int128?`: `undefined`; `int136?`: `undefined`; `int144?`: `undefined`; `int152?`: `undefined`; `int16?`: `undefined`; `int160?`: `undefined`; `int168?`: `undefined`; `int176?`: `undefined`; `int184?`: `undefined`; `int192?`: `undefined`; `int200?`: `undefined`; `int208?`: `undefined`; `int216?`: `undefined`; `int224?`: `undefined`; `int232?`: `undefined`; `int24?`: `undefined`; `int240?`: `undefined`; `int248?`: `undefined`; `int256?`: `undefined`; `int32?`: `undefined`; `int40?`: `undefined`; `int48?`: `undefined`; `int56?`: `undefined`; `int64?`: `undefined`; `int72?`: `undefined`; `int8?`: `undefined`; `int80?`: `undefined`; `int88?`: `undefined`; `int96?`: `undefined`; `string?`: `undefined`; `uint104?`: `undefined`; `uint112?`: `undefined`; `uint120?`: `undefined`; `uint128?`: `undefined`; `uint136?`: `undefined`; `uint144?`: `undefined`; `uint152?`: `undefined`; `uint16?`: `undefined`; `uint160?`: `undefined`; `uint168?`: `undefined`; `uint176?`: `undefined`; `uint184?`: `undefined`; `uint192?`: `undefined`; `uint200?`: `undefined`; `uint208?`: `undefined`; `uint216?`: `undefined`; `uint224?`: `undefined`; `uint232?`: `undefined`; `uint24?`: `undefined`; `uint240?`: `undefined`; `uint248?`: `undefined`; `uint256?`: `undefined`; `uint32?`: `undefined`; `uint40?`: `undefined`; `uint48?`: `undefined`; `uint56?`: `undefined`; `uint64?`: `undefined`; `uint72?`: `undefined`; `uint8?`: `undefined`; `uint80?`: `undefined`; `uint88?`: `undefined`; `uint96?`: `undefined`; \} \| \{\[`key`: `string`\]: `unknown`; \}

###### primaryType

`primaryType` *extends* `string`

##### Parameters

###### args

`SignTypedDataParameters`\<`typedData`, `primaryType`, `Account` \| `undefined`\>

SignTypedDataParameters

##### Returns

`Promise`\<`` `0x${string}` ``\>

The signed data. SignTypedDataReturnType

##### Examples

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})
const signature = await client.signTypedData({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
})
```

```ts
// Account Hoisting
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: http(),
})
const signature = await client.signTypedData({
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
})
```

#### switchChain

> **switchChain**: (`args`) => `Promise`\<`void`\>

Switch the target chain in a wallet.

- Docs: https://viem.sh/docs/actions/wallet/switchChain
- JSON-RPC Methods: [`eth_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-3326)

##### Parameters

###### args

`SwitchChainParameters`

SwitchChainParameters

##### Returns

`Promise`\<`void`\>

##### Example

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet, optimism } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})
await client.switchChain({ id: optimism.id })
```

#### token

> **token**: `object`

Write ERC-20 Actions, exposed under the `token` namespace.

Every action selects its token by `token`, which is either a token symbol
(resolved from the Client's `tokens` array) or a contract `address`. `amount`
inputs are base-unit `bigint` values, or
`{ decimals?: number, formatted: string }` to parse a human-readable decimal
string.

- Docs: https://viem.sh/docs/token

##### token.approve

> **approve**: (`parameters`) => `Promise`\<`` `0x${string}` ``\> & `object`

Approves a `spender` to transfer up to `amount` tokens on behalf of the
caller, and returns the transaction hash.

- Docs: https://viem.sh/docs/token/approve#asynchronous-usage

###### Type Declaration

###### call

> **call**: (`args`) => `object` & `object` & `object` & `object`

Defines an `approve` contract call, ready to pass to `sendCalls`,
`sendTransaction` (`calls`), or `multicall`.

- Docs: https://viem.sh/docs/token/approve#composing-calls

###### Parameters

###### args

`Args`\<`Chain` \| `undefined`, `Tokens` \| `undefined`\>

approve.Args

###### Returns

`object` & `object` & `object` & `object`

The contract call.

###### estimateGas

> **estimateGas**: (`parameters`) => `Promise`\<`bigint`\>

Estimates the gas required to approve a `spender` to transfer up to
`amount` tokens on behalf of the caller.

- Docs: https://viem.sh/docs/token/approve#estimate-gas--simulate

###### Parameters

###### parameters

`Parameters`\<`Chain` \| `undefined`, `Account` \| `undefined`, `Tokens` \| `undefined`\>

approve.Parameters

###### Returns

`Promise`\<`bigint`\>

The gas estimate.

###### extractEvent

> **extractEvent**: (`logs`) => `Log`\<`bigint`, `number`, `false`, `undefined`, `true`, readonly \[\{ `inputs`: readonly \[\{ `indexed`: `true`; `name`: `"owner"`; `type`: `"address"`; \}, \{ `indexed`: `true`; `name`: `"spender"`; `type`: `"address"`; \}, \{ `indexed`: `false`; `name`: `"value"`; `type`: `"uint256"`; \}\]; `name`: `"Approval"`; `type`: `"event"`; \}, \{ `inputs`: readonly \[\{ `indexed`: `true`; `name`: `"from"`; `type`: `"address"`; \}, \{ `indexed`: `true`; `name`: `"to"`; `type`: `"address"`; \}, \{ `indexed`: `false`; `name`: `"value"`; `type`: `"uint256"`; \}\]; `name`: `"Transfer"`; `type`: `"event"`; \}, \{ `inputs`: readonly \[\{ `name`: `"owner"`; `type`: `"address"`; \}, \{ `name`: `"spender"`; `type`: `"address"`; \}\]; `name`: `"allowance"`; `outputs`: readonly \[\{ `type`: `"uint256"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: `"spender"`; `type`: `"address"`; \}, \{ `name`: `"amount"`; `type`: `"uint256"`; \}\]; `name`: `"approve"`; `outputs`: readonly \[\{ `type`: `"bool"`; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: `"account"`; `type`: `"address"`; \}\]; `name`: `"balanceOf"`; `outputs`: readonly \[\{ `type`: `"uint256"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"decimals"`; `outputs`: readonly \[\{ `type`: `"uint8"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"name"`; `outputs`: readonly \[\{ `type`: `"string"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"symbol"`; `outputs`: readonly \[\{ `type`: `"string"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"totalSupply"`; `outputs`: readonly \[\{ `type`: `"uint256"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: `"recipient"`; `type`: `"address"`; \}, \{ `name`: `"amount"`; `type`: `"uint256"`; \}\]; `name`: `"transfer"`; `outputs`: readonly \[\{ `type`: `"bool"`; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: `"sender"`; `type`: `"address"`; \}, \{ `name`: `"recipient"`; `type`: `"address"`; \}, \{ `name`: `"amount"`; `type`: `"uint256"`; \}\]; `name`: `"transferFrom"`; `outputs`: readonly \[\{ `type`: `"bool"`; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}\], `"Approval"`\>

Extracts the `Approval` event from transaction logs.

- Docs: https://viem.sh/docs/token/approve

Extracts the `Approval` event from logs.

###### Parameters

###### logs

`Log`[]

The logs.

###### Returns

`Log`\<`bigint`, `number`, `false`, `undefined`, `true`, readonly \[\{ `inputs`: readonly \[\{ `indexed`: `true`; `name`: `"owner"`; `type`: `"address"`; \}, \{ `indexed`: `true`; `name`: `"spender"`; `type`: `"address"`; \}, \{ `indexed`: `false`; `name`: `"value"`; `type`: `"uint256"`; \}\]; `name`: `"Approval"`; `type`: `"event"`; \}, \{ `inputs`: readonly \[\{ `indexed`: `true`; `name`: `"from"`; `type`: `"address"`; \}, \{ `indexed`: `true`; `name`: `"to"`; `type`: `"address"`; \}, \{ `indexed`: `false`; `name`: `"value"`; `type`: `"uint256"`; \}\]; `name`: `"Transfer"`; `type`: `"event"`; \}, \{ `inputs`: readonly \[\{ `name`: `"owner"`; `type`: `"address"`; \}, \{ `name`: `"spender"`; `type`: `"address"`; \}\]; `name`: `"allowance"`; `outputs`: readonly \[\{ `type`: `"uint256"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: `"spender"`; `type`: `"address"`; \}, \{ `name`: `"amount"`; `type`: `"uint256"`; \}\]; `name`: `"approve"`; `outputs`: readonly \[\{ `type`: `"bool"`; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: `"account"`; `type`: `"address"`; \}\]; `name`: `"balanceOf"`; `outputs`: readonly \[\{ `type`: `"uint256"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"decimals"`; `outputs`: readonly \[\{ `type`: `"uint8"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"name"`; `outputs`: readonly \[\{ `type`: `"string"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"symbol"`; `outputs`: readonly \[\{ `type`: `"string"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"totalSupply"`; `outputs`: readonly \[\{ `type`: `"uint256"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: `"recipient"`; `type`: `"address"`; \}, \{ `name`: `"amount"`; `type`: `"uint256"`; \}\]; `name`: `"transfer"`; `outputs`: readonly \[\{ `type`: `"bool"`; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: `"sender"`; `type`: `"address"`; \}, \{ `name`: `"recipient"`; `type`: `"address"`; \}, \{ `name`: `"amount"`; `type`: `"uint256"`; \}\]; `name`: `"transferFrom"`; `outputs`: readonly \[\{ `type`: `"bool"`; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}\], `"Approval"`\>

The `Approval` event.

###### Param

**logs**

The logs.

###### Returns

The decoded `Approval` event.

###### simulate

> **simulate**: (`parameters`) => `Promise`\<`SimulateContractReturnType`\<readonly \[\{ `inputs`: readonly \[\{ `indexed`: ...; `name`: ...; `type`: ...; \}, \{ `indexed`: ...; `name`: ...; `type`: ...; \}, \{ `indexed`: ...; `name`: ...; `type`: ...; \}\]; `name`: `"Approval"`; `type`: `"event"`; \}, \{ `inputs`: readonly \[\{ `indexed`: ...; `name`: ...; `type`: ...; \}, \{ `indexed`: ...; `name`: ...; `type`: ...; \}, \{ `indexed`: ...; `name`: ...; `type`: ...; \}\]; `name`: `"Transfer"`; `type`: `"event"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}\]; `name`: `"allowance"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}\]; `name`: `"approve"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}\]; `name`: `"balanceOf"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"decimals"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"name"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"symbol"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"totalSupply"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}\]; `name`: `"transfer"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}\]; `name`: `"transferFrom"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}\], `"approve"`\>\>

Simulates approving a `spender` to transfer up to `amount` tokens on
behalf of the caller, returning the result and write request.

- Docs: https://viem.sh/docs/token/approve#estimate-gas--simulate

###### Parameters

###### parameters

`Parameters`\<`Chain` \| `undefined`, `Account` \| `undefined`, `Tokens` \| `undefined`\>

approve.Parameters

###### Returns

`Promise`\<`SimulateContractReturnType`\<readonly \[\{ `inputs`: readonly \[\{ `indexed`: ...; `name`: ...; `type`: ...; \}, \{ `indexed`: ...; `name`: ...; `type`: ...; \}, \{ `indexed`: ...; `name`: ...; `type`: ...; \}\]; `name`: `"Approval"`; `type`: `"event"`; \}, \{ `inputs`: readonly \[\{ `indexed`: ...; `name`: ...; `type`: ...; \}, \{ `indexed`: ...; `name`: ...; `type`: ...; \}, \{ `indexed`: ...; `name`: ...; `type`: ...; \}\]; `name`: `"Transfer"`; `type`: `"event"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}\]; `name`: `"allowance"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}\]; `name`: `"approve"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}\]; `name`: `"balanceOf"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"decimals"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"name"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"symbol"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"totalSupply"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}\]; `name`: `"transfer"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}\]; `name`: `"transferFrom"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}\], `"approve"`\>\>

The simulation result and write request.

###### Param

**parameters**

approve.Parameters

###### Returns

The transaction hash. approve.ReturnValue

###### Example

```ts
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: http(),
})

const hash = await client.token.approve({
  amount: { decimals: 6, formatted: '10.5' },
  spender: '0x…',
  token: 'usdc',
})
```

##### token.approveSync

> **approveSync**: (`parameters`) => `Promise`\<\{ `decimals?`: `number`; `formatted?`: `string`; `owner`: `` `0x${string}` ``; `receipt`: `TransactionReceipt`; `spender`: `` `0x${string}` ``; `value`: `bigint`; \}\>

Approves a `spender` to transfer up to `amount` tokens on behalf of the
caller, and waits for the transaction to be confirmed.

- Docs: https://viem.sh/docs/token/approve

###### Parameters

###### parameters

`Parameters`\<`Chain` \| `undefined`, `Account` \| `undefined`, `Tokens` \| `undefined`\>

approveSync.Parameters

###### Returns

`Promise`\<\{ `decimals?`: `number`; `formatted?`: `string`; `owner`: `` `0x${string}` ``; `receipt`: `TransactionReceipt`; `spender`: `` `0x${string}` ``; `value`: `bigint`; \}\>

The decoded `Approval` event and the transaction receipt. approveSync.ReturnValue

###### Example

```ts
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: http(),
})

const { receipt, value } = await client.token.approveSync({
  amount: { decimals: 6, formatted: '10.5' },
  spender: '0x…',
  token: 'usdc',
})
```

##### token.transfer

> **transfer**: (`parameters`) => `Promise`\<`` `0x${string}` ``\> & `object`

Transfers `amount` tokens to a recipient, and returns the transaction hash.
Pass `from` to transfer on behalf of another address using an allowance
(calls `transferFrom`).

- Docs: https://viem.sh/docs/token/transfer#asynchronous-usage

###### Type Declaration

###### call

> **call**: (`args`) => `object` & `object` & `object` & `object`

Defines a `transfer` (or `transferFrom`, when `from` is given) contract
call, ready to pass to `sendCalls`, `sendTransaction` (`calls`), or
`multicall`.

- Docs: https://viem.sh/docs/token/transfer#composing-calls

###### Parameters

###### args

`Args`\<`Chain` \| `undefined`, `Tokens` \| `undefined`\>

transfer.Args

###### Returns

`object` & `object` & `object` & `object`

The contract call.

###### estimateGas

> **estimateGas**: (`parameters`) => `Promise`\<`bigint`\>

Estimates the gas required to transfer `amount` tokens to a recipient.

- Docs: https://viem.sh/docs/token/transfer#estimate-gas--simulate

###### Parameters

###### parameters

`Parameters`\<`Chain` \| `undefined`, `Account` \| `undefined`, `Tokens` \| `undefined`\>

transfer.Parameters

###### Returns

`Promise`\<`bigint`\>

The gas estimate.

###### extractEvent

> **extractEvent**: (`logs`) => `Log`\<`bigint`, `number`, `false`, `undefined`, `true`, readonly \[\{ `inputs`: readonly \[\{ `indexed`: `true`; `name`: `"owner"`; `type`: `"address"`; \}, \{ `indexed`: `true`; `name`: `"spender"`; `type`: `"address"`; \}, \{ `indexed`: `false`; `name`: `"value"`; `type`: `"uint256"`; \}\]; `name`: `"Approval"`; `type`: `"event"`; \}, \{ `inputs`: readonly \[\{ `indexed`: `true`; `name`: `"from"`; `type`: `"address"`; \}, \{ `indexed`: `true`; `name`: `"to"`; `type`: `"address"`; \}, \{ `indexed`: `false`; `name`: `"value"`; `type`: `"uint256"`; \}\]; `name`: `"Transfer"`; `type`: `"event"`; \}, \{ `inputs`: readonly \[\{ `name`: `"owner"`; `type`: `"address"`; \}, \{ `name`: `"spender"`; `type`: `"address"`; \}\]; `name`: `"allowance"`; `outputs`: readonly \[\{ `type`: `"uint256"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: `"spender"`; `type`: `"address"`; \}, \{ `name`: `"amount"`; `type`: `"uint256"`; \}\]; `name`: `"approve"`; `outputs`: readonly \[\{ `type`: `"bool"`; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: `"account"`; `type`: `"address"`; \}\]; `name`: `"balanceOf"`; `outputs`: readonly \[\{ `type`: `"uint256"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"decimals"`; `outputs`: readonly \[\{ `type`: `"uint8"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"name"`; `outputs`: readonly \[\{ `type`: `"string"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"symbol"`; `outputs`: readonly \[\{ `type`: `"string"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"totalSupply"`; `outputs`: readonly \[\{ `type`: `"uint256"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: `"recipient"`; `type`: `"address"`; \}, \{ `name`: `"amount"`; `type`: `"uint256"`; \}\]; `name`: `"transfer"`; `outputs`: readonly \[\{ `type`: `"bool"`; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: `"sender"`; `type`: `"address"`; \}, \{ `name`: `"recipient"`; `type`: `"address"`; \}, \{ `name`: `"amount"`; `type`: `"uint256"`; \}\]; `name`: `"transferFrom"`; `outputs`: readonly \[\{ `type`: `"bool"`; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}\], `"Transfer"`\>

Extracts the `Transfer` event from transaction logs.

- Docs: https://viem.sh/docs/token/transfer

Extracts the `Transfer` event from logs.

###### Parameters

###### logs

`Log`[]

The logs.

###### Returns

`Log`\<`bigint`, `number`, `false`, `undefined`, `true`, readonly \[\{ `inputs`: readonly \[\{ `indexed`: `true`; `name`: `"owner"`; `type`: `"address"`; \}, \{ `indexed`: `true`; `name`: `"spender"`; `type`: `"address"`; \}, \{ `indexed`: `false`; `name`: `"value"`; `type`: `"uint256"`; \}\]; `name`: `"Approval"`; `type`: `"event"`; \}, \{ `inputs`: readonly \[\{ `indexed`: `true`; `name`: `"from"`; `type`: `"address"`; \}, \{ `indexed`: `true`; `name`: `"to"`; `type`: `"address"`; \}, \{ `indexed`: `false`; `name`: `"value"`; `type`: `"uint256"`; \}\]; `name`: `"Transfer"`; `type`: `"event"`; \}, \{ `inputs`: readonly \[\{ `name`: `"owner"`; `type`: `"address"`; \}, \{ `name`: `"spender"`; `type`: `"address"`; \}\]; `name`: `"allowance"`; `outputs`: readonly \[\{ `type`: `"uint256"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: `"spender"`; `type`: `"address"`; \}, \{ `name`: `"amount"`; `type`: `"uint256"`; \}\]; `name`: `"approve"`; `outputs`: readonly \[\{ `type`: `"bool"`; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: `"account"`; `type`: `"address"`; \}\]; `name`: `"balanceOf"`; `outputs`: readonly \[\{ `type`: `"uint256"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"decimals"`; `outputs`: readonly \[\{ `type`: `"uint8"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"name"`; `outputs`: readonly \[\{ `type`: `"string"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"symbol"`; `outputs`: readonly \[\{ `type`: `"string"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"totalSupply"`; `outputs`: readonly \[\{ `type`: `"uint256"`; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: `"recipient"`; `type`: `"address"`; \}, \{ `name`: `"amount"`; `type`: `"uint256"`; \}\]; `name`: `"transfer"`; `outputs`: readonly \[\{ `type`: `"bool"`; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: `"sender"`; `type`: `"address"`; \}, \{ `name`: `"recipient"`; `type`: `"address"`; \}, \{ `name`: `"amount"`; `type`: `"uint256"`; \}\]; `name`: `"transferFrom"`; `outputs`: readonly \[\{ `type`: `"bool"`; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}\], `"Transfer"`\>

The `Transfer` event.

###### Param

**logs**

The logs.

###### Returns

The decoded `Transfer` event.

###### simulate

> **simulate**: (`parameters`) => `Promise`\<`SimulateContractReturnType`\<readonly \[\{ `inputs`: readonly \[\{ `indexed`: ...; `name`: ...; `type`: ...; \}, \{ `indexed`: ...; `name`: ...; `type`: ...; \}, \{ `indexed`: ...; `name`: ...; `type`: ...; \}\]; `name`: `"Approval"`; `type`: `"event"`; \}, \{ `inputs`: readonly \[\{ `indexed`: ...; `name`: ...; `type`: ...; \}, \{ `indexed`: ...; `name`: ...; `type`: ...; \}, \{ `indexed`: ...; `name`: ...; `type`: ...; \}\]; `name`: `"Transfer"`; `type`: `"event"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}\]; `name`: `"allowance"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}\]; `name`: `"approve"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}\]; `name`: `"balanceOf"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"decimals"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"name"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"symbol"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"totalSupply"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}\]; `name`: `"transfer"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}\]; `name`: `"transferFrom"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}\], `"transfer"` \| `"transferFrom"`\>\>

Simulates a transfer of `amount` tokens to a recipient, returning the
result and write request.

- Docs: https://viem.sh/docs/token/transfer#estimate-gas--simulate

###### Parameters

###### parameters

`Parameters`\<`Chain` \| `undefined`, `Account` \| `undefined`, `Tokens` \| `undefined`\>

transfer.Parameters

###### Returns

`Promise`\<`SimulateContractReturnType`\<readonly \[\{ `inputs`: readonly \[\{ `indexed`: ...; `name`: ...; `type`: ...; \}, \{ `indexed`: ...; `name`: ...; `type`: ...; \}, \{ `indexed`: ...; `name`: ...; `type`: ...; \}\]; `name`: `"Approval"`; `type`: `"event"`; \}, \{ `inputs`: readonly \[\{ `indexed`: ...; `name`: ...; `type`: ...; \}, \{ `indexed`: ...; `name`: ...; `type`: ...; \}, \{ `indexed`: ...; `name`: ...; `type`: ...; \}\]; `name`: `"Transfer"`; `type`: `"event"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}\]; `name`: `"allowance"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}\]; `name`: `"approve"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}\]; `name`: `"balanceOf"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"decimals"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"name"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"symbol"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\]; `name`: `"totalSupply"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"view"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}\]; `name`: `"transfer"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}, \{ `inputs`: readonly \[\{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}, \{ `name`: ...; `type`: ...; \}\]; `name`: `"transferFrom"`; `outputs`: readonly \[\{ `type`: ...; \}\]; `stateMutability`: `"nonpayable"`; `type`: `"function"`; \}\], `"transfer"` \| `"transferFrom"`\>\>

The simulation result and write request.

###### Param

**parameters**

transfer.Parameters

###### Returns

The transaction hash. transfer.ReturnValue

###### Example

```ts
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: http(),
})

const hash = await client.token.transfer({
  amount: { decimals: 6, formatted: '10.5' },
  to: '0x…',
  token: 'usdc',
})
```

##### token.transferSync

> **transferSync**: (`parameters`) => `Promise`\<\{ `decimals?`: `number`; `formatted?`: `string`; `from`: `` `0x${string}` ``; `receipt`: `TransactionReceipt`; `to`: `` `0x${string}` ``; `value`: `bigint`; \}\>

Transfers `amount` tokens to a recipient, and waits for the transaction to
be confirmed. Pass `from` to transfer on behalf of another address using an
allowance (calls `transferFrom`).

- Docs: https://viem.sh/docs/token/transfer

###### Parameters

###### parameters

`Parameters`\<`Chain` \| `undefined`, `Account` \| `undefined`, `Tokens` \| `undefined`\>

transferSync.Parameters

###### Returns

`Promise`\<\{ `decimals?`: `number`; `formatted?`: `string`; `from`: `` `0x${string}` ``; `receipt`: `TransactionReceipt`; `to`: `` `0x${string}` ``; `value`: `bigint`; \}\>

The decoded `Transfer` event and the transaction receipt. transferSync.ReturnValue

###### Example

```ts
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: http(),
})

const { receipt, value } = await client.token.transferSync({
  amount: { decimals: 6, formatted: '10.5' },
  to: '0x…',
  token: 'usdc',
})
```

#### tokens

> **tokens**: `Tokens` \| `undefined`

Collection of tokens declared on the Client.

#### transport

> **transport**: `TransportConfig`\<`string`, `EIP1193RequestFn`\> & `Record`\<`string`, `any`\>

The RPC transport

#### type

> **type**: `string`

The type of client.

#### uid

> **uid**: `string`

A unique ID for the client.

#### waitForCallsStatus

> **waitForCallsStatus**: (`parameters`) => `Promise`\<\{ `atomic`: `boolean`; `capabilities?`: \{\[`key`: `string`\]: `any`; \} \| \{\[`key`: `string`\]: `any`; \}; `chainId`: `number`; `id`: `string`; `receipts?`: `WalletCallReceipt`\<`bigint`, `"success"` \| `"reverted"`\>[]; `status`: `"pending"` \| `"success"` \| `"failure"` \| `undefined`; `statusCode`: `number`; `version`: `string`; \}\>

Waits for the status & receipts of a call bundle that was sent via `sendCalls`.

- Docs: https://viem.sh/docs/actions/wallet/waitForCallsStatus
- JSON-RPC Methods: [`wallet_getCallsStatus`](https://eips.ethereum.org/EIPS/eip-5792)

##### Parameters

###### parameters

`WaitForCallsStatusParameters`

WaitForCallsStatusParameters

##### Returns

`Promise`\<\{ `atomic`: `boolean`; `capabilities?`: \{\[`key`: `string`\]: `any`; \} \| \{\[`key`: `string`\]: `any`; \}; `chainId`: `number`; `id`: `string`; `receipts?`: `WalletCallReceipt`\<`bigint`, `"success"` \| `"reverted"`\>[]; `status`: `"pending"` \| `"success"` \| `"failure"` \| `undefined`; `statusCode`: `number`; `version`: `string`; \}\>

Status & receipts of the call bundle. WaitForCallsStatusReturnType

##### Example

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})

const { receipts, status } = await waitForCallsStatus(client, { id: '0xdeadbeef' })
```

#### watchAsset

> **watchAsset**: (`args`) => `Promise`\<`boolean`\>

Adds an EVM chain to the wallet.

- Docs: https://viem.sh/docs/actions/wallet/watchAsset
- JSON-RPC Methods: [`eth_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-747)

##### Parameters

###### args

`WatchAssetParams`

WatchAssetParameters

##### Returns

`Promise`\<`boolean`\>

Boolean indicating if the token was successfully added. WatchAssetReturnType

##### Example

```ts
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})
const success = await client.watchAsset({
  type: 'ERC20',
  options: {
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    decimals: 18,
    symbol: 'WETH',
  },
})
```

#### writeContract

> **writeContract**: \<`abi`, `functionName`, `args`, `chainOverride`\>(`args`) => `Promise`\<`` `0x${string}` ``\>

Executes a write function on a contract.

- Docs: https://viem.sh/docs/contract/writeContract
- Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_writing-to-contracts

A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, and hence a [Transaction](https://viem.sh/docs/glossary/terms) is needed to be broadcast in order to change the state.

Internally, uses a [Wallet Client](https://viem.sh/docs/clients/wallet) to call the [`sendTransaction` action](https://viem.sh/docs/actions/wallet/sendTransaction) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData).

__Warning: The `write` internally sends a transaction – it does not validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `contract.simulate`](https://viem.sh/docs/contract/writeContract#usage) before you execute it.__

##### Type Parameters

###### abi

`abi` *extends* `Abi` \| readonly `unknown`[]

###### functionName

`functionName` *extends* `string`

###### args

`args` *extends* `unknown`

###### chainOverride

`chainOverride` *extends* `Chain` \| `undefined` = `undefined`

##### Parameters

###### args

`WriteContractParameters`\<`abi`, `functionName`, `args`, `Chain` \| `undefined`, `Account` \| `undefined`, `chainOverride`\>

WriteContractParameters

##### Returns

`Promise`\<`` `0x${string}` ``\>

A [Transaction Hash](https://viem.sh/docs/glossary/terms#hash). WriteContractReturnType

##### Examples

```ts
import { createWalletClient, custom, parseAbi } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})
const hash = await client.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: parseAbi(['function mint(uint32 tokenId) nonpayable']),
  functionName: 'mint',
  args: [69420],
})
```

```ts
// With Validation
import { createWalletClient, custom, parseAbi } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})
const { request } = await client.simulateContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: parseAbi(['function mint(uint32 tokenId) nonpayable']),
  functionName: 'mint',
  args: [69420],
}
const hash = await client.writeContract(request)
```

#### writeContractSync

> **writeContractSync**: \<`abi`, `functionName`, `args`, `chainOverride`\>(`args`) => `Promise`\<`TransactionReceipt`\>

Executes a write function on a contract synchronously.
Returns the transaction receipt.

- Docs: https://viem.sh/docs/contract/writeContract

A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, and hence a [Transaction](https://viem.sh/docs/glossary/terms) is needed to be broadcast in order to change the state.

Internally, uses a [Wallet Client](https://viem.sh/docs/clients/wallet) to call the [`sendTransaction` action](https://viem.sh/docs/actions/wallet/sendTransaction) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData).

__Warning: The `write` internally sends a transaction – it does not validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `contract.simulate`](https://viem.sh/docs/contract/writeContract#usage) before you execute it.__

##### Type Parameters

###### abi

`abi` *extends* `Abi` \| readonly `unknown`[]

###### functionName

`functionName` *extends* `string`

###### args

`args` *extends* `unknown`

###### chainOverride

`chainOverride` *extends* `Chain` \| `undefined` = `undefined`

##### Parameters

###### args

`WriteContractSyncParameters`\<`abi`, `functionName`, `args`, `Chain` \| `undefined`, `Account` \| `undefined`, `chainOverride`\>

WriteContractSyncParameters

##### Returns

`Promise`\<`TransactionReceipt`\>

A [Transaction Receipt](https://viem.sh/docs/glossary/terms#receipt). WriteContractSyncReturnType

##### Example

```ts
import { createWalletClient, custom, parseAbi } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})
const receipt = await client.writeContractSync({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: parseAbi(['function mint(uint32 tokenId) nonpayable']),
  functionName: 'mint',
  args: [69420],
})
```
