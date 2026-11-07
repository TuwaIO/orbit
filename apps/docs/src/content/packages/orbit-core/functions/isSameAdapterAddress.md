# isSameAdapterAddress()

> **isSameAdapterAddress**(`adapter`, `left`, `right`): `boolean`

Defined in: [utils/accountAddress.ts:36](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/accountAddress.ts#L36)

Whether two addresses of one adapter are the same account: [isSameAddress](/packages/orbit-core/functions/isSameAddress.md) for what knows its adapter and not its
CAIP-2 namespace, such as a transaction.

## Parameters

### adapter

[`OrbitAdapter`](/packages/orbit-core/enumerations/OrbitAdapter.md)

The adapter of both addresses.

### left

`string`

One address.

### right

`string`

The other address.

## Returns

`boolean`

`true` when they are the same account.
