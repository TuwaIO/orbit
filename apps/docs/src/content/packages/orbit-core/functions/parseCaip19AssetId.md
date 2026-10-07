# parseCaip19AssetId()

> **parseCaip19AssetId**(`assetId`): \{ `assetNamespace`: `string`; `assetReference`: `string`; `chainId`: `` `${string}:${string}` ``; \} \| `undefined`

Defined in: [utils/caip.ts:189](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/caip.ts#L189)

Splits a CAIP-19 asset type ID into its chain, asset namespace and asset reference. IDs of single tokens
(`eip155:1/erc721:0x…/1`) are not asset types and are rejected.

## Parameters

### assetId

`string`

The CAIP-19 asset type ID to parse.

## Returns

\{ `assetNamespace`: `string`; `assetReference`: `string`; `chainId`: `` `${string}:${string}` ``; \} \| `undefined`

The chain ID, asset namespace and asset reference, or `undefined` when the value is not a valid CAIP-19
asset type ID.

## Example

```typescript
parseCaip19AssetId('eip155:1/slip44:60'); // { chainId: 'eip155:1', assetNamespace: 'slip44', assetReference: '60' }
```
