[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# createPimlicoPaymasterClient()

> **createPimlicoPaymasterClient**(`config`): `object`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:206](https://github.com/TuwaIO/orbit/blob/d4110954ce16280c0b562c8d9e6ad0f6c0a602f2/packages/orbit-evm/src/utils/bundlerUtils.ts#L206)

Creates a Viem Paymaster Client configured with the resolved Pimlico RPC endpoint.

## Parameters

### config

[`PimlicoUrlConfig`](../interfaces/PimlicoUrlConfig.md)

Pimlico URL configuration.

## Returns

PaymasterClient instance configured for Pimlico gas sponsorship.

### account

> **account**: `undefined`

The Account of the Client.

### batch?

> `optional` **batch?**: `object`

Flags for batch settings.

#### batch.multicall?

> `optional` **multicall?**: `boolean` \| \{ `batchSize?`: `number`; `deployless?`: `boolean`; `wait?`: `number`; \}

Toggle to enable `eth_call` multicall aggregation.

##### Union Members

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

### cacheTime

> **cacheTime**: `number`

Time (in ms) that cached data will remain in memory.

### ccipRead?

> `optional` **ccipRead?**: `false` \| \{ `request?`: (`parameters`) => `Promise`\<`` `0x${string}` ``\>; \}

[CCIP Read](https://eips.ethereum.org/EIPS/eip-3668) configuration.

#### Union Members

`false`

***

##### Type Literal

\{ `request?`: (`parameters`) => `Promise`\<`` `0x${string}` ``\>; \}

##### request?

> `optional` **request?**: (`parameters`) => `Promise`\<`` `0x${string}` ``\>

A function that will be called to make the offchain CCIP lookup request.

###### Parameters

###### parameters

`CcipRequestParameters`

###### Returns

`Promise`\<`` `0x${string}` ``\>

###### See

https://eips.ethereum.org/EIPS/eip-3668#client-lookup-protocol

### chain

> **chain**: `undefined`

Chain for the client.

### dataSuffix?

> `optional` **dataSuffix?**: `DataSuffix`

Data suffix to append to transaction data.

### experimental\_blockTag?

> `optional` **experimental\_blockTag?**: `BlockTag`

Default block tag to use for RPC requests.

### extend

> **extend**: \<`client`\>(`fn`) => `Client`\<`Transport`, `undefined`, `undefined`, `PaymasterRpcSchema`, \{ \[K in string \| number \| symbol\]: client\[K\] \} & `PaymasterActions`, `Tokens` \| `undefined`\>

#### Type Parameters

##### client

`client` *extends* `object` & `ExactPartial`\<`ExtendableProtectedActions`\<`Transport`, `undefined`, `undefined`, `Tokens` \| `undefined`\>\>

#### Parameters

##### fn

(`client`) => `client`

#### Returns

`Client`\<`Transport`, `undefined`, `undefined`, `PaymasterRpcSchema`, \{ \[K in string \| number \| symbol\]: client\[K\] \} & `PaymasterActions`, `Tokens` \| `undefined`\>

### getPaymasterData

> **getPaymasterData**: (`parameters`) => `Promise`\<`GetPaymasterDataReturnType`\>

Retrieves paymaster-related User Operation properties to be used for sending the User Operation.

- Docs: https://viem.sh/account-abstraction/actions/paymaster/getPaymasterData

#### Parameters

##### parameters

`GetPaymasterDataParameters`

GetPaymasterDataParameters

#### Returns

`Promise`\<`GetPaymasterDataReturnType`\>

Paymaster-related User Operation properties. GetPaymasterDataReturnType

#### Example

```ts
import { http } from 'viem'
import { createPaymasterClient } from 'viem/account-abstraction'

const paymasterClient = createPaymasterClient({
  transport: http('https://...'),
})

const userOperation = { ... }

const values = await paymasterClient.getPaymasterData({
  chainId: 1,
  entryPointAddress: '0x...',
  ...userOperation,
})
```

### getPaymasterStubData

> **getPaymasterStubData**: (`parameters`) => `Promise`\<`GetPaymasterStubDataReturnType`\>

Retrieves paymaster-related User Operation properties to be used for gas estimation.

- Docs: https://viem.sh/account-abstraction/actions/paymaster/getPaymasterStubData

#### Parameters

##### parameters

`GetPaymasterStubDataParameters`

GetPaymasterStubDataParameters

#### Returns

`Promise`\<`GetPaymasterStubDataReturnType`\>

Paymaster-related User Operation properties. GetPaymasterStubDataReturnType

#### Example

```ts
import { http } from 'viem'
import { createPaymasterClient } from 'viem/account-abstraction'

const paymasterClient = createPaymasterClient({
  transport: http('https://...'),
})

const userOperation = { ... }

const values = await paymasterClient.getPaymasterStubData({
  chainId: 1,
  entryPointAddress: '0x...',
  ...userOperation,
})
```

### key

> **key**: `string`

A key for the client.

### name

> **name**: `string`

A name for the client.

### pollingInterval

> **pollingInterval**: `number`

Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds.

### request

> **request**: `EIP1193RequestFn`\<`PaymasterRpcSchema`\>

Request function wrapped with friendly error handling

### tokens

> **tokens**: `Tokens` \| `undefined`

Collection of tokens declared on the Client.

### transport

> **transport**: `TransportConfig`\<`string`, `EIP1193RequestFn`\> & `Record`\<`string`, `any`\>

The RPC transport

### type

> **type**: `string`

The type of client.

### uid

> **uid**: `string`

A unique ID for the client.
