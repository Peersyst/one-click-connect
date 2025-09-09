# @one-click-connect/dapp-sdk

## Overview

The `@one-click-connect/dapp-sdk` package provides an extended SDK for decentralized application (dApp) development in the One-Click Connect ecosystem. It builds on top of the core functionality to offer specialized tools and utilities for building NEAR-based decentralized applications with a simplified, user-friendly approach.

## Installation

```shell script
# Using npm
npm install @one-click-connect/dapp-sdk

# Using yarn
yarn add @one-click-connect/dapp-sdk

# Using pnpm
pnpm add @one-click-connect/dapp-sdk
```

Note: This package has `near-api-js` as a peer dependency, so make sure it's installed in your project.

## Features

- **NEAR Protocol Integration**: Seamless integration with the NEAR blockchain
- **Transaction Management**: Simplified API for creating, signing, and sending transactions
- **Permissions Handling**: Management of user permissions for dApp interactions
- **Browser Compatibility**: Designed specifically for browser-based applications
- **TypeScript Support**: Full TypeScript definitions for improved developer experience

## Usage

```typescript
import { DAppClient } from '@one-click-connect/dapp-sdk';
import { Near } from 'near-api-js';
import { BrowserLocalStorageKeyStore } from 'near-api-js/lib/key_stores';
import { Permissions } from '@one-click-connect/core';

// Initialize dependencies
const keyStore = new BrowserLocalStorageKeyStore();
const near = new Near({
  keyStore,
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org'
});

// Create DApp client
const client = new DAppClient(
  {
    appName: 'My NEAR dApp',
    contractId: 'mycontract.testnet'
  },
  near,
  keyStore,
  permissions
);

// Use the client to interact with the NEAR blockchain
async function sendTransaction() {
  const result = await client.sendTransaction({
    receiverId: 'recipient.testnet',
    actions: [/* your actions here */]
  });
  
  console.log('Transaction result:', result);
}
```

## API Reference

### `DAppClient`

The main client class for dApp interactions.

#### Constructor

```typescript
constructor(
  config: BaseDAppClientConfig,
  near: Near,
  keyStore: KeyStore,
  permissions: Permissions
)
```

### `NearProvider`

A provider implementation for NEAR blockchain interactions.

## Related Packages

- `@one-click-connect/core`: Core functionality for the One-Click Connect ecosystem
- `@one-click-connect/sdk`: Base SDK for One-Click Connect
- `@one-click-connect/dapp-core`: Core dApp functionality
- `@one-click-connect/wallet`: Wallet implementation for One-Click Connect

## License
[MIT License](../../../LICENSE)
