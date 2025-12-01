[**@tuwaio/orbit-monorepo**](../../../README.md)

***

# recentlyConnectedConnectorsListHelpers

> `const` **recentlyConnectedConnectorsListHelpers**: `object`

Defined in: [packages/orbit-core/src/utils/recentlyConnectedConnectorsListHelpers.ts:63](https://github.com/TuwaIO/orbit/blob/efc1769b5130904fb64cb27e939c2baf445b5e8f/packages/orbit-core/src/utils/recentlyConnectedConnectorsListHelpers.ts#L63)

Helper utilities for managing recently connected connectors list with disconnect timestamps

## Type Declaration

### addConnector()

> **addConnector**: (`connectorType`, `connectorData`) => `undefined`

Adds or updates a single connector in the recently connected connectors list.
Preserves existing connectors and only adds/updates the specified one.

#### Parameters

##### connectorType

The connector type to add/update

`` `evm:${string}` `` | `` `solana:${string}` `` | `` `starknet:${string}` ``

##### connectorData

[`RecentlyConnectedConnectorData`](../interfaces/RecentlyConnectedConnectorData.md)

The connector data (address, disconnectedTimestamp, and optional icon)

#### Returns

`undefined`

undefined in SSR context, void in browser

#### Example

```typescript
// Add new connector with current timestamp
recentlyConnectedConnectorsListHelpers.addConnector('evm:metamask', {
  address: '0x123...',
  disconnectedTimestamp: Date.now(),
  icon: 'metamask.png'
});

// Update existing connector with new disconnect time
recentlyConnectedConnectorsListHelpers.addConnector('evm:metamask', {
  address: '0x456...',
  disconnectedTimestamp: Date.now(),
  icon: 'new-metamask.png'
});
```

### getConnector()

> **getConnector**: (`connectorType`) => [`RecentlyConnectedConnectorData`](../interfaces/RecentlyConnectedConnectorData.md) \| `undefined`

Gets data for a specific connector from the recently connected connectors list.

#### Parameters

##### connectorType

The connector type to get data for

`` `evm:${string}` `` | `` `solana:${string}` `` | `` `starknet:${string}` ``

#### Returns

[`RecentlyConnectedConnectorData`](../interfaces/RecentlyConnectedConnectorData.md) \| `undefined`

The connector data (including address, disconnectedTimestamp, and optional icon) or undefined if not found or in SSR context

#### Example

```typescript
const metamaskData = recentlyConnectedConnectorsListHelpers.getConnector('evm:metamask');
if (metamaskData) {
  console.log('MetaMask address:', metamaskData.address);
  console.log('Disconnected at:', new Date(metamaskData.disconnectedTimestamp));
  console.log('MetaMask icon:', metamaskData.icon);
}
```

### getConnectorCount()

> **getConnectorCount**: () => `number`

Gets the count of recently connected connectors.

#### Returns

`number`

Number of connectors in the list, 0 in SSR context or if list is empty

#### Example

```typescript
const count = recentlyConnectedConnectorsListHelpers.getConnectorCount();
console.log(`${count} connectors recently connected`);
```

### getConnectorsSortedByTime()

> **getConnectorsSortedByTime**: () => \[`` `evm:${string}` `` \| `` `solana:${string}` `` \| `` `starknet:${string}` ``, [`RecentlyConnectedConnectorData`](../interfaces/RecentlyConnectedConnectorData.md)\][]

Gets recently connected connectors sorted by disconnect time (most recent first).
Useful for showing connectors in order of recent usage.

#### Returns

\[`` `evm:${string}` `` \| `` `solana:${string}` `` \| `` `starknet:${string}` ``, [`RecentlyConnectedConnectorData`](../interfaces/RecentlyConnectedConnectorData.md)\][]

Array of [ConnectorType, RecentlyConnectedConnectorData] tuples sorted by disconnectedTimestamp (descending), empty array in SSR context

#### Example

```typescript
const sortedConnectors = recentlyConnectedConnectorsListHelpers.getConnectorsSortedByTime();
sortedConnectors.forEach(([connectorType, data]) => {
  console.log(`${connectorType}: disconnected ${new Date(data.disconnectedTimestamp)}`);
});
```

### getRecentlyConnectedConnectorsList()

> **getRecentlyConnectedConnectorsList**: () => [`RecentlyConnectedConnectorsList`](../type-aliases/RecentlyConnectedConnectorsList.md) \| `undefined`

Retrieves the current recently connected connectors list from localStorage.

#### Returns

[`RecentlyConnectedConnectorsList`](../type-aliases/RecentlyConnectedConnectorsList.md) \| `undefined`

The RecentlyConnectedConnectorsList object or undefined if not set or in SSR context

#### Example

```typescript
const connectors = recentlyConnectedConnectorsListHelpers.getRecentlyConnectedConnectorsList();
if (connectors) {
  console.log('Available connectors:', Object.keys(connectors));
  // Sort by most recently disconnected
  const sorted = Object.entries(connectors)
    .sort(([,a], [,b]) => b.disconnectedTimestamp - a.disconnectedTimestamp);
}
```

### hasConnector()

> **hasConnector**: (`connectorType`) => `boolean` \| `undefined`

Checks if a specific connector exists in the recently connected connectors list.

#### Parameters

##### connectorType

The connector type to check

`` `evm:${string}` `` | `` `solana:${string}` `` | `` `starknet:${string}` ``

#### Returns

`boolean` \| `undefined`

true if the connector exists, false otherwise, undefined in SSR context

#### Example

```typescript
if (recentlyConnectedConnectorsListHelpers.hasConnector('evm:metamask')) {
  console.log('MetaMask was recently connected');
}
```

### recentlyConnectedConnectorsList

> `readonly` **recentlyConnectedConnectorsList**: [`RecentlyConnectedConnectorsList`](../type-aliases/RecentlyConnectedConnectorsList.md) \| `undefined`

The current recently connected connectors list, initialized when the module loads.
Returns undefined if not set, invalid, or in an SSR context.

### removeConnector()

> **removeConnector**: (`connectorType`) => `undefined`

Removes a single connector from the recently connected connectors list.
Preserves all other connectors in the list.

#### Parameters

##### connectorType

The connector type to remove

`` `evm:${string}` `` | `` `solana:${string}` `` | `` `starknet:${string}` ``

#### Returns

`undefined`

undefined in SSR context, void in browser

#### Example

```typescript
// Remove specific connector
recentlyConnectedConnectorsListHelpers.removeConnector('evm:metamask');
```

### removeConnectorsOlderThan()

> **removeConnectorsOlderThan**: (`beforeTimestamp`) => `undefined`

Removes connectors that were disconnected before the specified timestamp.
Useful for cleaning up old connector entries.

#### Parameters

##### beforeTimestamp

`number`

Unix timestamp in milliseconds; connectors disconnected before this time will be removed

#### Returns

`undefined`

undefined in SSR context, void in browser

#### Example

```typescript
// Remove connectors disconnected more than 7 days ago
const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
recentlyConnectedConnectorsListHelpers.removeConnectorsOlderThan(weekAgo);
```

### removeRecentlyConnectedConnectorsList()

> **removeRecentlyConnectedConnectorsList**: () => `void`

Removes all recently connected connectors from localStorage.

#### Returns

`void`

undefined in SSR context, void in browser

#### Example

```typescript
// Clear all recently connected connectors
recentlyConnectedConnectorsListHelpers.removeRecentlyConnectedConnectorsList();
```

### setRecentlyConnectedConnectorsList()

> **setRecentlyConnectedConnectorsList**: (`connectors`) => `void`

Stores the complete recently connected connectors list in localStorage.
This will overwrite the entire existing list.

#### Parameters

##### connectors

[`RecentlyConnectedConnectorsList`](../type-aliases/RecentlyConnectedConnectorsList.md)

Complete RecentlyConnectedConnectorsList object

#### Returns

`void`

undefined in SSR context, void in browser

#### Example

```typescript
recentlyConnectedConnectorsListHelpers.setRecentlyConnectedConnectorsList({
  'evm:metamask': {
    address: '0x123...',
    disconnectedTimestamp: Date.now(),
    icon: 'metamask.png'
  },
  'solana:phantom': {
    address: 'ABC123...',
    disconnectedTimestamp: Date.now() - 1800000 // 30 minutes ago
  }
});
```

### STORAGE\_KEY

> **STORAGE\_KEY**: `string` = `'orbit-core:recentlyConnectedConnectorsListHelpers'`

Key used for localStorage storage

## Remarks

All data is stored in localStorage with the 'orbit-core:recentlyConnectedConnectorsListHelpers' key.
Functions are safe to use in both browser and SSR environments.

The storage contains a record where each key is a ConnectorType and value contains
address, disconnectedTimestamp (Unix timestamp in milliseconds), and optional icon for that connector.
This allows tracking when each connector was last disconnected for cleanup and sorting purposes.

## Example

```typescript
// Set entire list
recentlyConnectedConnectorsListHelpers.setRecentlyConnectedConnectorsList({
  'evm:metamask': {
    address: '0x123...',
    disconnectedTimestamp: Date.now(),
    icon: 'metamask-icon.png'
  },
  'solana:phantom': {
    address: 'ABC123...',
    disconnectedTimestamp: Date.now() - 3600000, // 1 hour ago
    icon: 'phantom-icon.png'
  }
});

// Add single connector
recentlyConnectedConnectorsListHelpers.addConnector('evm:walletconnect', {
  address: '0x456...',
  disconnectedTimestamp: Date.now(),
  icon: 'walletconnect-icon.png'
});

// Remove single connector
recentlyConnectedConnectorsListHelpers.removeConnector('evm:metamask');
```
