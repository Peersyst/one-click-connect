---
sidebar_position: 4
---

# Testing

To enhance the integration experience, this package contains mocks of the [`WalletClient`](./client) to test the integration with a wallet. This package offers 2 mocks:

- [`WalletClientMock`](./testing#walletclientmock): A mock of the [`WalletClient`](./client) that simulates wallet behavior.
- [`WalletClientGlobalMock`](./testing#walletclientglobalmock): A global mock of the [`WalletClient`](./client) that simulates wallet behavior.

Both mocks allow simulating wallet behavior and testing wallet integration.

## Framework compatibility

This package is compatible with the following frameworks:

| Framework | Status |
| --------- | ------ |
| Jest      | ✅     |

## Mocks

### WalletClientMock

The `WalletClientMock` is a specific mock for mocking an instance of [`WalletClient`](./client). It is ideal for use in unit tests where the [`WalletClient`](./client) is injected as a dependency.

#### Usage

To use it, you can import the mock from the package and use it in your test:

```typescript
import { WalletClientMock } from "@one-click-connect/vanilla-wallet/mocks";

const mock = new WalletClientMock();
```

You can modify the mock behavior by overriding the returned values of the methods. For example, if you want to mock the `requestSignIn` method to return a specific URL, you can do the following:

```typescript
mock.requestSignIn.mockReturnValue("https://example.com");
```

or throwing an error:

```typescript
mock.requestSignIn.mockRejectedValue(new Error("Error signing in"));
```

### WalletClientGlobalMock

The `WalletClientGlobalMock` is a global mock of the `WalletClient` that simulates wallet behavior across the entire application. It is ideal for integration testing where you need to test the complete wallet integration flow. Like the `WalletClientMock`, this mock allows you to modify the wallet behavior throughout the application.
