---
sidebar_position: 3
---

# Clients

To be able to interact with the 1ClickConnect protocol as a dapp, you need to use a client. All dapp SDKs provide a series of clients to interact with the 1ClickConnect protocol. Here's the list of clients provided by the 1ClickConnect SDK:

- [`Client`](#client)
- [`RelayerClient`](#relayerclient)

All clients are initialized via the [`ClientFactory`](#clientfactory).

## Client

The `Client` class describes the dapp's most basic interactions with the 1ClickConnect protocol. It allows the dapp to receive, handle and send messages to the wallet in a simple way.

### Configuration

Each `Client` instance requires to set the following properties in its configuration:

| Property      | Description                                                                                                                                         | Required |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `redirectURL` | The URL to redirect the user to after the wallet has signed a message (this URL can be override on every method that sends a message to the wallet) | ✅       |

### Storage

To manage the limited access keys of users connecting to the dapp, the `Client` needs to store the following data for each user:

| Property     | Description                                                      | Required |
| ------------ | ---------------------------------------------------------------- | -------- |
| `accountID`  | The account ID of the user                                       | ✅       |
| `keyPair`    | A KeyPair in string format of the user's limited access key      | ✅       |
| `signingURL` | The URL to redirect the user to sign a payload with their wallet | ✅       |

Currently, all this data is stored in the browser's `localStorage`. Depending on the needs of dapps integrating the SDK, other storage options may be offered in the future.

### Methods

## RelayerClient

### Configuration

Each `RelayerClient` instance requires to set the following properties in its configuration:

| Property      | Description                                                                                                                                         | Required |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `redirectURL` | The URL to redirect the user to after the wallet has signed a message (this URL can be override on every method that sends a message to the wallet) | ✅       |
| `relayerAPI`  | The URL of the relayer API that will be used to relay transactions                                                                                  | ❌       |

The `relayerAPI` field is not required when initializing the `RelayerClient`. If not specified, the `RelayerClient` will attempt to obtain the relayer API from the sign-in message. If not found there, it will use the default relayer API. If found in the sign-in message, the `RelayerClient` will add it to its configuration.

### Storage

As previously mentioned in the [Storage](#storage) section of the `Client`, the `RelayerClient` stores user account information in the browser's `localStorage` by default. The following data is stored:

| Property     | Description                                                        | Required |
| ------------ | ------------------------------------------------------------------ | -------- |
| `accountID`  | The account ID of the user                                         | ✅       |
| `keyPair`    | A KeyPair in string format of the user's limited access key        | ✅       |
| `signingURL` | The URL to redirect the user to sign a payload with their wallet   | ✅       |
| `relayerAPI` | The URL of the relayer API that will be used to relay transactions | ✅       |

### Methods

## ClientFactory

This factory helps users instantiate a client easily according to the type of client they need. It exposes one method for each type of client that can be instantiated.

### Create new [`Client`](#client)

To create a new [`Client`](#client), you can use the following method:

```typescript
import { ClientFactory } from "@one-click-connect/browser-dapp";

const client = ClientFactory.newClient({
    redirectURL: "https://example.com/redirect",
});
```

You only need to pass the configuration of type `ClientConfig` as an argument. This method will return a [`Client`](#client) that have access to the storage and ready to be used.

### Create new [`RelayerClient`](#relayerclient)

To create a new [`RelayerClient`](#relayerclient), you can use the following method:

```typescript
import { ClientFactory } from "@one-click-connect/browser-dapp";

const relayerClient = ClientFactory.newRelayerClient({
    redirectURL: "https://example.com/redirect",
});
```

You only need to pass the configuration of type `RelayerClientConfig` as an argument. This method will return a [`RelayerClient`](#relayerclient) that have access to the storage and ready to be used.
