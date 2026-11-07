# joinUrlPath()

> **joinUrlPath**(`base`, `path?`): `string`

Defined in: [utils/joinUrlPath.ts:23](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/joinUrlPath.ts#L23)

Joins a base URL and a path with one slash, as an explorer URL may end in a slash and a path may start with one.

## Parameters

### base

`string`

The base URL.

### path?

`string`

The path. Without it the base comes back as it is.

## Returns

`string`

The joined URL.

## Example

```typescript
joinUrlPath('https://etherscan.io/', '/tx/0x1'); // "https://etherscan.io/tx/0x1"
```
