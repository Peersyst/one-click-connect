# @one-click-connect/wallet

## Overview

The `@one-click-connect/wallet` package provides wallet integration functionality for the One Click Connect platform, enabling secure connection to blockchain wallets.

## Installation

```shell script
pnpm add @one-click-connect/wallet
```

## Features

- Wallet connection management
- Transaction signing
- Error handling for wallet operations
- Support for NEAR protocol wallets

## Usage

```typescript
import { WalletClient } from '@one-click-connect/wallet';

// Initialize wallet client
const walletClient = new WalletClient({
  // Configuration options
});

// Connect to wallet
await walletClient.connect();

// Sign and send a transaction
const result = await walletClient.signAndSendTransaction({
  // Transaction details
});
```

## API Reference

### WalletClient

The main class for interacting with blockchain wallets.

#### Methods

- `connect()`: Establishes connection with the wallet
- `disconnect()`: Terminates the wallet connection
- `signAndSendTransaction(transaction)`: Signs and sends a transaction
- `getAccounts()`: Retrieves accounts from the connected wallet

## Error Handling

The package includes comprehensive error handling for wallet operations:

```typescript
import { ClientError, ErrorCodes } from '@one-click-connect/wallet';

try {
  await walletClient.connect();
} catch (error) {
  if (error instanceof ClientError) {
    switch (error.code) {
      case ErrorCodes.CONNECTION_REJECTED:
        // Handle connection rejection
        break;
      // Handle other error types
    }
  }
}
```

## Related Packages

- `@one-click-connect/core`
- `@one-click-connect/dapp-sdk`
- `@one-click-connect/dapp-core`

## License
[MIT License](../../../LICENSE)
