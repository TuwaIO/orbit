# LastConnectedConnector

> **LastConnectedConnector** = `object`

Defined in: [utils/lastConnectedConnectorHelpers.ts:8](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/lastConnectedConnectorHelpers.ts#L8)

Connection data persisted by [lastConnectedConnectorHelpers](/packages/orbit-core/variables/lastConnectedConnectorHelpers.md).

## Properties

### address?

> `optional` **address?**: `string`

Defined in: [utils/lastConnectedConnectorHelpers.ts:14](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/lastConnectedConnectorHelpers.ts#L14)

Connected wallet address, if known.

***

### chainId

> **chainId**: `number` \| `string`

Defined in: [utils/lastConnectedConnectorHelpers.ts:12](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/lastConnectedConnectorHelpers.ts#L12)

Chain the wallet was connected to (numeric EVM chain ID or Solana chain identifier).

***

### connectorType

> **connectorType**: [`ConnectorType`](/packages/orbit-core/type-aliases/ConnectorType.md)

Defined in: [utils/lastConnectedConnectorHelpers.ts:10](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/lastConnectedConnectorHelpers.ts#L10)

Connector identifier, e.g. "evm:metamask".
