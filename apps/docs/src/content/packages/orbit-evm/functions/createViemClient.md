# createViemClient()

> **createViemClient**(`chainId`, `chains`): `PublicClient` \| `undefined`

Defined in: [packages/orbit-evm/src/utils/createViemClient.ts:27](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/createViemClient.ts#L27)

Creates or retrieves a cached viem Public Client for a specific chain.

This client is used for read-only interactions with the blockchain, such as fetching
transaction receipts or reading contract state, without needing a wallet connection. It reads the chain through the default RPC
URLs of its definition: the next when one does not answer.

## Parameters

### chainId

`number`

The ID of the chain for which to create the client.

### chains

readonly \[`Chain`, `Chain`\]

An array of supported viem Chain objects.

## Returns

`PublicClient` \| `undefined`

A viem PublicClient instance if a matching chain is found, otherwise undefined.
It will also log a warning to the console if the chain is not configured.
