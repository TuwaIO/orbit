# getWalletFromConnectorType()

> **getWalletFromConnectorType**(`connectorType`): `string` \| `undefined`

Defined in: [utils/getWalletFromConnectorType.ts:13](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/getWalletFromConnectorType.ts#L13)

The wallet part of a connector type.

## Parameters

### connectorType

`string` \| `null` \| `undefined`

A connector type, in the format "orbit-adapter:connector".

## Returns

`string` \| `undefined`

The part after the adapter, or `undefined` when there is no adapter or no value.

## Example

```typescript
getWalletFromConnectorType('evm:metamask'); // "metamask"
getWalletFromConnectorType('metamask'); // undefined
```
