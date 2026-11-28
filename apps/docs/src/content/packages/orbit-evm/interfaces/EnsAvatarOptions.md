# EnsAvatarOptions

Defined in: [packages/orbit-evm/src/utils/ensUtils.ts:63](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/ensUtils.ts#L63)

Options of [getAvatar](/packages/orbit-evm/functions/getAvatar.md).

## Properties

### ensAvatar?

> `optional` **ensAvatar?**: `boolean`

Defined in: [packages/orbit-evm/src/utils/ensUtils.ts:70](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/ensUtils.ts#L70)

Look the avatar up: viem reads the `avatar` record of the name over the RPC of Ethereum Mainnet, then fetches what
the record points to from any host it names (an image, the metadata of an NFT, an IPFS or Arweave gateway), and
whoever shows the image loads it from the host of its URL. Off by default, and then the function sends nothing and
returns `null`.
