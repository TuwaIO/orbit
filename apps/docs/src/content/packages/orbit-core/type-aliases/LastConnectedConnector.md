# LastConnectedConnector

> **LastConnectedConnector** = `object`

Defined in: [utils/lastConnectedConnectorHelpers.ts:7](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/lastConnectedConnectorHelpers.ts#L7)

Connection data persisted by [lastConnectedConnectorHelpers](/packages/orbit-core/variables/lastConnectedConnectorHelpers.md).

## Properties

### address?

> `optional` **address?**: `string`

Defined in: [utils/lastConnectedConnectorHelpers.ts:13](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/lastConnectedConnectorHelpers.ts#L13)

Connected wallet address, if known.

***

### chainId

> **chainId**: `number` \| `string`

Defined in: [utils/lastConnectedConnectorHelpers.ts:11](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/lastConnectedConnectorHelpers.ts#L11)

Chain the wallet was connected to (numeric EVM chain ID or Solana chain identifier).

***

### connectorType

> **connectorType**: [`ConnectorType`](/packages/orbit-core/type-aliases/ConnectorType.md)

Defined in: [utils/lastConnectedConnectorHelpers.ts:9](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-core/src/utils/lastConnectedConnectorHelpers.ts#L9)

Connector identifier, e.g. "evm:metamask".
