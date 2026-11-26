# chainTransport()

> **chainTransport**(`chain`): `Transport`

Defined in: [packages/orbit-evm/src/utils/chainTransport.ts:29](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/chainTransport.ts#L29)

The viem transport of a chain over the default RPC URLs of its definition (`rpcUrls.default.http`): a read goes to the next URL when
one does not answer.

## Parameters

### chain

`Chain`

The chain.

## Returns

`Transport`

An `http` transport of the URL, or a `fallback` over several, in their order.

## Example

```ts
import { chainTransport } from '@tuwaio/orbit-evm';
import { createPublicClient } from 'viem';
import { mainnet } from 'viem/chains';

const chain = {
  ...mainnet,
  rpcUrls: { default: { http: ['https://my-rpc-provider.example', 'https://eth.merkle.io'] } },
} as const;

const client = createPublicClient({ chain, transport: chainTransport(chain) });
```
