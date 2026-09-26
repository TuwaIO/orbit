# detectSafeApp()

> **detectSafeApp**(`timeout?`): `Promise`\<`boolean`\>

Defined in: [utils/isSafeApp.ts:10](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/isSafeApp.ts#L10)

Checks if the current window is running inside a Safe App iframe
by attempting postMessage communication with the parent window.
Side effect: posts a `getSafeInfo` message to `window.parent` and listens for the reply until `timeout`.

## Parameters

### timeout?

`number` = `1000`

How long to wait for the Safe response, in milliseconds. Defaults to 1000.

## Returns

`Promise`\<`boolean`\>

Promise that resolves to true if running inside Safe Wallet, false otherwise (also on the server,
outside an iframe, or when not served over HTTPS)
