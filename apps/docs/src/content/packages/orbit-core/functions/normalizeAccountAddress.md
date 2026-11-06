# normalizeAccountAddress()

> **normalizeAccountAddress**(`namespace`, `address`): `string`

Defined in: [utils/accountAddress.ts:9](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/accountAddress.ts#L9)

An account address in the form to compare it in: an EVM address in any case, as its case is only a checksum; any
other exactly, as a base58 address in another case is another account.

## Parameters

### namespace

`string`

The CAIP-2 namespace of the account, e.g. `eip155` or `solana`.

### address

`string`

The address.

## Returns

`string`

The address to compare.
