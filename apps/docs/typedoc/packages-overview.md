# Packages

Orbit Utils ships one chain-agnostic core package (**L1**) and one package per chain platform (**L2**). Install the core and only the chain packages your app targets. Chain packages declare their Web3 libraries as peer dependencies, so your app keeps a single copy of `viem`, `@wagmi/core` or `@solana/kit`.

Each package page starts with the package README (the same text that is published to npm), followed by the full list of its exports. Every function, type and constant page is generated from the TypeScript source and its JSDoc, so the reference always matches the released code.
