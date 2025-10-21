# Orbit Utils

[![License](https://img.shields.io/npm/l/@tuwaio/orbit-core.svg)](./LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/TuwaIO/orbit/release.yml?branch=main)](https://github.com/TuwaIO/orbit/actions)

## 🏛️ Overview

Orbit Utils is a collection of libraries designed to **simplify and streamline the front-end development** of decentralized applications (dApps) across multiple blockchains. Built with TypeScript, it provides a **headless, framework-agnostic** foundation for interacting with various web3 ecosystems.

The core goal is to offer developers a **unified and intuitive interface** for common web3 UI tasks, reducing complexity and accelerating development time.

## ✨ Key Features

* **Multi-Chain Architecture:** Provides a consistent API for interacting with EVM, Solana, and potentially other blockchains through a flexible adapter system.
* **Simplified UI Development:** Offers utilities specifically designed to make building web3 user interfaces easier and faster.
* **Framework Agnostic:** Use Orbit Utils with your favorite framework (React, Vue, Svelte, Angular, etc.) or even vanilla JavaScript.
* **Type-Safe:** Fully written in TypeScript for enhanced developer experience and fewer runtime errors.
* **Modular Packages:** Includes separate packages for core logic and chain-specific implementations (EVM, Solana).

## 📦 Packages

This monorepo contains the following core packages:

* **`@tuwaio/orbit-core`:** The foundational package providing core types, utilities, and the adapter system.
* **`@tuwaio/orbit-evm`:** EVM-specific utilities and helpers, integrating with libraries like `wagmi` and `viem`.
* **`@tuwaio/orbit-solana`:** Solana-specific utilities and helpers, integrating with libraries like `gill` and `@wallet-standard`.

Check out the **[full documentation](https://orbit.docs.tuwa.io)** for detailed guides and API references.

## 🤝 Contributing & Support

Contributions are welcome! Please read our main **[Contribution Guidelines](https://github.com/TuwaIO/workflows/blob/main/CONTRIBUTING.md)**.

If you find this library useful, please consider supporting its development. Every contribution helps!

[**➡️ View Support Options**](https://github.com/TuwaIO/workflows/blob/main/Donation.md)

## 📄 License

This project is licensed under the **Apache-2.0 License** - see the [LICENSE](./LICENSE) file for details.

## 👥 Contributors

- **Oleksandr Tkach** - [GitHub](https://github.com/Argeare5)