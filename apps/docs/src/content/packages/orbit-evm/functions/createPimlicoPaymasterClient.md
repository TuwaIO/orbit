# createPimlicoPaymasterClient()

> **createPimlicoPaymasterClient**(`config`): `PaymasterClient`

Defined in: [packages/orbit-evm/src/utils/bundlerUtils.ts:213](https://github.com/TuwaIO/orbit/blob/main/packages/orbit-evm/src/utils/bundlerUtils.ts#L213)

Creates or retrieves a cached Viem Paymaster Client configured with the resolved Pimlico RPC endpoint.
Side effect: stores the client in an in-memory cache keyed by the resolved RPC URL (see `clearBundlerCache`).

## Parameters

### config

[`PimlicoUrlConfig`](/packages/orbit-evm/interfaces/PimlicoUrlConfig.md)

Pimlico URL configuration.

## Returns

`PaymasterClient`

Cached or newly instantiated PaymasterClient configured for Pimlico gas sponsorship.
