# BaseAdapter

> **BaseAdapter** = `object`

Defined in: [types.ts:106](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/types.ts#L106)

Minimal contract shared by chain adapters: explorer links plus optional name-service lookups.
Combine it with a `key: OrbitAdapter` property to register an adapter for [selectAdapterByKey](/packages/orbit-core/functions/selectAdapterByKey.md).

## Properties

### getAddress?

> `optional` **getAddress?**: (`name`) => `Promise`\<`string` \| `null`\>

Defined in: [types.ts:120](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/types.ts#L120)

Optional method to resolve names to addresses

#### Parameters

##### name

`string`

#### Returns

`Promise`\<`string` \| `null`\>

***

### getAvatar?

> `optional` **getAvatar?**: (`name`) => `Promise`\<`string` \| `null`\>

Defined in: [types.ts:117](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/types.ts#L117)

Optional method to get avatar for resolved names

#### Parameters

##### name

`string`

#### Returns

`Promise`\<`string` \| `null`\>

***

### getExplorerUrl

> **getExplorerUrl**: (`url?`, `chainId?`) => `string` \| `undefined`

Defined in: [types.ts:111](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/types.ts#L111)

Generates blockchain explorer URL

#### Parameters

##### url?

`string`

##### chainId?

`string` \| `number`

#### Returns

`string` \| `undefined`

Explorer URL or undefined if not available

***

### getName?

> `optional` **getName?**: (`address`) => `Promise`\<`string` \| `null`\>

Defined in: [types.ts:114](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/types.ts#L114)

Optional method to resolve ENS-like names

#### Parameters

##### address

`string`

#### Returns

`Promise`\<`string` \| `null`\>
