# 🤖 Agent Context: Orbit Utils

## 1. Project Philosophy & Goal

- **What is this?** A monorepo for "Orbit Utils" — a framework-agnostic, multi-chain library for Web3 dApps. It provides unified interfaces for EVM and Solana interactions (with Starknet reserved for future use).
- **Role in TUWA:** Core Logic & Connector Layer. It abstracts blockchain complexity to streamline UI development in the TUWA ecosystem.
- **Philosophy:** "Pure Web3", Framework Agnostic, Modular, Type-Safe. Focus on self-custody and minimizing reliance on bloated "WaaS" (Wallet-as-a-Service) SDKs.

## 2. Tech Stack (Verified)

- **Core:** TypeScript v5.9+, Node.js (v20-v24), pnpm v10+ (Workspace).
- **Web3 (EVM):** `viem` v2.x, `@wagmi/core` v3.x.
- **Web3 (Solana):** `gill` v0.14 (formerly `rpc-helpers`), `@wallet-standard/*`.
- **Frameworks:**
  - `apps/docs`: Next.js v16, Nextra v4, Tailwind CSS v4.
  - `packages/*`: Framework Agnostic (React/Vue/Svelte compatible).
- **Build/Monorepo:**
  - `tsup`: Bundler for `packages/*` (ESM/CJS/DTS).
  - `turbo` (implied): Used for task orchestration.
  - `changesets/release-please`: Semantic release management.

## 3. Architecture & Directory Structure

The project is a **pnpm workspace** with a clear separation between documentation and utility packages.

```
orbit/
├── apps/
│   └── docs/                   # Documentation site (Nextjs 16 + Nextra 4)
│       ├── src/app/            # App Router pages
│       └── src/content/        # MDX Content & Auto-generated API Docs
├── packages/
│   ├── orbit-core/             # Shared logic, Types, and Adapters
│   │   ├── src/types.ts        # Core Enums (OrbitAdapter) & Types
│   │   └── src/utils/          # Validations, Formatters, Storage helpers
│   ├── orbit-evm/              # EVM Implementation
│   │   ├── src/index.ts        # Exports (createViemClient, etc.)
│   │   └── src/utils/          # Viem/Wagmi wrappers
│   └── orbit-solana/           # Solana Implementation
│       ├── src/index.ts        # Exports (createSolanaRPC, etc.)
│       └── src/utils/          # Gill/Wallet-Standard wrappers
├── package.json                # Root Root checks & scripts
└── pnpm-workspace.yaml         # Workspace definition
```

### Module Breakdown

- **`orbit-core`**: The brain. Contains the `OrbitAdapter` enum (`EVM`, `SOLANA`, `Starknet`). It does **not** contain chain-specific library code, ensuring the core remains lightweight.
- **`orbit-evm`**: The muscle for Ethereum. Depends on `viem` and `@wagmi/core`. Handles provider creation and ENS resolution.
- **`orbit-solana`**: The muscle for Solana. Depends on `gill`. Handles clusters, RPC connections, and wallet standard adapters.

## 4. Coding Standards (STRICT)

- **Language:** English ONLY (Code, Comments, Commits).
- **Style:** Functional programming. pure functions preferred.
- **Types:** Strict TypeScript. **NO `any`**. Usage of `ts-expect-error` must be justified.
- **Comments:** JSDoc required for **all** exported functions in `packages/*/src`.
  - Must explain _inputs_, _outputs_, and _side effects_.
- **Naming:**
  - Files: `camelCase.ts` (utils), `PascalCase.tsx` (components).
  - Variables/Functions: `camelCase`.
  - Types/Interfaces: `PascalCase`.

## 5. Key Workflows

- **Build:** `pnpm build` (Builds all packages via `tsup` and Docs via `next build`).
- **Test:** `pnpm test` (Runs tests in isolated packages).
- **Lint/Format:** `pnpm lint` (ESLint) / `pnpm format` (Prettier).
- **Clean:** `pnpm clean` (Nukes `node_modules` and `dist` dirs).

## 6. AI Agent Behavior (Mandatory)

- **Post-Work Routine:** After generating or modifying code, you **MUST** run `pnpm lint --fix` (and `pnpm format`) to ensure code quality.
- **Dependency Rule:** Never install new packages without explicit user permission.
- **Hallucination Check:**
  - Do **NOT** import `ethers.js` (We use `viem`).
  - Do **NOT** import `@solana/web3.js` legacy methods (We use `gill` or `createSolanaRPC`).
  - Do **NOT** assume `orbit-starknet` exists yet.
  - Do **NOT** invent generic "hooks" (This is a utils library, not a UI kit).
