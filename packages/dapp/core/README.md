# @one-click-connect/dapp-core

## Overview
`@one-click-connect/dapp-core` is a core library for building decentralized applications (dApps) with the One Click Connect ecosystem. It provides essential functionality for interacting with blockchain networks, managing wallet connections, and handling transactions.

## Installation
```bash
# Using pnpm (recommended)
pnpm add @one-click-connect/dapp-core

# Using npm
npm install @one-click-connect/dapp-core

# Using yarn
yarn add @one-click-connect/dapp-core
```

## Features
- Simplified blockchain interactions
- Wallet connection management
- Transaction handling
- Integration with the One Click Connect ecosystem

## Usage
```typescript
import { createDappCore } from '@one-click-connect/dapp-core';

// Initialize the core functionality
const dappClient = new BrowserDAppClient(
  // Configuration options
);

// Connect to wallet
await dappClient.connect();

// Perform transactions
// ...
```

## API Reference
Please refer to the typings and documentation within the code for a complete API reference.

## Related Packages
- `@one-click-connect/dapp-sdk`: Extended SDK for dApp development
- `@one-click-connect/core`: Core functionality for the One Click Connect ecosystem
- `@one-click-connect/sdk`: Main SDK for the One Click Connect platform
- `@one-click-connect/wallet`: Wallet integration for One Click Connect

## License
[MIT License](../../../LICENSE)
