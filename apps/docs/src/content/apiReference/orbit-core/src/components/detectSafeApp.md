[**API Reference for TUWA Orbit framework-agnostic multi-chain primitives**](../../../README.md)

***

# detectSafeApp()

> **detectSafeApp**(`timeout?`): `Promise`\<`boolean`\>

Defined in: [packages/orbit-core/src/utils/isSafeApp.ts:7](https://github.com/TuwaIO/orbit/blob/0eb2d9ff6342b8a1d76d7fbd96c07bafe99cc64a/packages/orbit-core/src/utils/isSafeApp.ts#L7)

Checks if the current window is running inside a Safe App iframe
by attempting postMessage communication with the parent window.

## Parameters

### timeout?

`number` = `1000`

## Returns

`Promise`\<`boolean`\>

Promise that resolves to true if running inside Safe Wallet, false otherwise
