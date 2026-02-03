[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# detectSafeApp()

> **detectSafeApp**(`timeout`): `Promise`\<`boolean`\>

Defined in: [packages/orbit-core/src/utils/isSafeApp.ts:7](https://github.com/TuwaIO/orbit/blob/154d3835d8c15ce8df06853294f8ac9f17586a69/packages/orbit-core/src/utils/isSafeApp.ts#L7)

Checks if the current window is running inside a Safe App iframe
by attempting postMessage communication with the parent window.

## Parameters

### timeout

`number` = `1000`

## Returns

`Promise`\<`boolean`\>

Promise that resolves to true if running inside Safe Wallet, false otherwise
