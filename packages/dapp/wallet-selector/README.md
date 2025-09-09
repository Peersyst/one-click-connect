# One Click Connect Wallet Selector

## Overview

The One Click Connect Wallet Selector is a package that integrates with the NEAR wallet selector ecosystem, allowing applications to bypass the traditional NEAR wallet selector modal and enabling users to sign in with a single click. This package significantly reduces friction in the user authentication flow, making the dApp experience more seamless and efficient.

## Installation

```shell script
npm install @one-click-connect/wallet-selector
# or
yarn add @one-click-connect/wallet-selector
# or
pnpm add @one-click-connect/wallet-selector
```

## Features

- **Streamlined Authentication Flow**: Eliminates multiple redirects and clicks normally required in the NEAR wallet authentication process.
- **NEAR Wallet Selector Integration**: Fully compatible with the official NEAR wallet selector, easily integrating alongside other wallet modules.
- **Customizable Configuration**: Configure network settings, contract IDs, and allowed methods to suit your application's needs.
- **Enhanced User Experience**: Ideal for applications that want to abstract away crypto complexities from end users.
- **Direct Sign-in**: Enables users to connect directly from a wallet application to your dApp without intermediary steps.

## Usage

The One Click Connect wallet selector can be easily integrated into your existing NEAR wallet selector setup:

```javascript
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupOneClickConnect } from '@one-click-connect/wallet-selector';

const selector = await setupWalletSelector({
  network: "testnet",
  modules: [
    // Other wallet modules
    ...,
    // Add the OneClick Connect module
    setupOneClickConnect({
      networkId: "testnet",
      contractId: "your-contract.near",
      methods: ["method_1", "method_2"] // Optional
    })
  ]
});
```

### Traditional vs. One Click Connect Flow

**Traditional Flow:**
1. User creates an account
2. User navigates to the application
3. User clicks sign-in
4. The wallet selector modal opens
5. User selects their wallet
6. User is redirected to the wallet website to approve
7. User is redirected back to the app

**One Click Connect Flow:**
1. User creates an account
2. User clicks a button directly from the wallet application
3. User is instantly signed in and ready to use the dApp

## API Reference

### setupOneClickConnect(options)

The main setup function that configures the One Click Connect module for the NEAR wallet selector.

#### Parameters

- **options** (object):
  - `networkId` (string): The NEAR network ID ("mainnet", "testnet", etc.)
  - `contractId` (string): The contract ID your application interacts with
  - `methods` (string[]): Optional array of contract methods to allow

#### Returns

A configured wallet selector module that can be used in the NEAR wallet selector setup.

## Related Packages

- **@one-click-connect/core**: Core functionality for the One Click Connect ecosystem
- **@one-click-connect/dapp-sdk**: SDK for dApp integration with One Click Connect
- **@near-wallet-selector/core**: The official NEAR wallet selector that this package integrates with

## License
[MIT License](../../../LICENSE)
