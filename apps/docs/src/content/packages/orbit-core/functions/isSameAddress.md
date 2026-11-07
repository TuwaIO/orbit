# isSameAddress()

> **isSameAddress**(`namespace`, `left`, `right`): `boolean`

Defined in: [utils/accountAddress.ts:21](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/accountAddress.ts#L21)

Whether two addresses of one namespace are the same account, by [normalizeAccountAddress](/packages/orbit-core/functions/normalizeAccountAddress.md).

## Parameters

### namespace

`string`

The CAIP-2 namespace of both addresses, e.g. `eip155` or `solana`.

### left

`string`

One address.

### right

`string`

The other address.

## Returns

`boolean`

`true` when they are the same account.
