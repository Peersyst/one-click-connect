---
sidebar_position: 4
---

# Testing

To enhance the integration experience, this package contains mocks of the [`Client`](./clients#client) and [`RelayerClient`](./clients#relayerclient) to test the integration with a dapp. This package offers 2 different types of mocks:

- `Mock`: A mock to simulate certain behavior of a class instance.
- `GlobalMock`: A global mock to simulate certain behavior of a class across the entire application.

Each client has its own pair of mocks, so you can mock the behavior of the client in your tests as you desire.

## Framework compatibility

This package is compatible with the following frameworks:

| Framework | Status |
| --------- | ------ |
| Jest      | ✅     |

## Mocks

### Client

#### ClientMock

The `ClientMock` is a specific mock for mocking an instance of [`Client`](./clients#client). It is ideal for use in unit tests where the [`Client`](./clients#client) is injected as a dependency.

To use it, you can import the mock from the package and use it in your test:

```typescript
import { ClientMock } from "@one-click-connect/browser-dapp/mocks";

const mock = new ClientMock();
```

You can modify the mock behavior by overriding the returned values of the methods. For example, if you want to mock the `isSignedIn` method to return a specific boolean value, you can do the following:

```typescript
mock.isSignedIn.mockReturnValue(true);
```

or throwing an error:

```typescript
mock.isSignedIn.mockRejectedValue(new Error("Error signing in"));
```

#### ClientGlobalMock

The `ClientGlobalMock` is a global mock of the `Client` that simulates its behavior across the entire application. It is ideal for testing where you need to test the complete dapp integration flow. Like the `ClientMock`, this mock allows you to modify the dapp behavior throughout the application.

### RelayerClient

#### RelayerClientMock

The `RelayerClientMock` is a specific mock for mocking an instance of [`RelayerClient`](./clients#relayerclient). It is ideal for use in unit tests where the [`RelayerClient`](./clients#relayerclient) is injected as a dependency.

To use it, you can import the mock from the package and use it in your test:

```typescript
import { RelayerClientMock } from "@one-click-connect/browser-dapp/mocks";

const mock = new RelayerClientMock();
```

You can modify the mock behavior by overriding the returned values of the methods. For example, if you want to mock the `isSignedIn` method to return a specific boolean value, you can do the following:

```typescript
mock.isSignedIn.mockReturnValue(true);
```

or throwing an error:

```typescript
mock.isSignedIn.mockRejectedValue(new Error("Error signing in"));
```

#### RelayerClientGlobalMock

The `RelayerClientGlobalMock` is a global mock of the `RelayerClient` that simulates its behavior across the entire application. It is ideal for testing where you need to test the complete dapp integration flow. Like the `RelayerClientMock`, this mock allows you to modify the dapp behavior throughout the application.
