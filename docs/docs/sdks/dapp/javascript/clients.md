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

#### isSignedIn

To sign in users, the parameters `accountID` and `signingURL` must be received through the URL. This allows calling the client's `isSignedIn` function.

```typescript
const result = client.isSignedIn(accountID, signingURL);
```

This call will return a boolean indicating whether the `accountID` already has an associated `KeyPair`. Otherwise, it will return `false`.

:::info

If an entry for the `accountID` exists but has a different `signingURL`, this field will be updated with the one provided as a parameter.

:::

#### signOut

To sign out a user, you can use the `signOut` method. This action does not remove the user's account from the storage, but it will clear the active account state.

```typescript
client.signOut();
```

#### requestSignInitialTx

For a user to start making transactions in the dapp, they must first sign an initial transaction. This initial transaction will generate a limited access key for the user with the permissions required by the dapp and send the transaction to the wallet to be signed.

The `requestSignInitialTx` method will generate a URL that redirects the user to the wallet's signingURL with the necessary information to sign the initial transaction.

The method requires an argument of type:

```typescript
import { FunctionCallPermission } from "near-api-js/lib/transaction";

type SignInitialTxRequest = {
    accountID: string;
    signingURL: string;
    permissions: FunctionCallPermission;
};
```

```typescript
const request: SignInitialTxRequest = {
    accountID: accountID,
    signingURL: signingURL,
    permissions: permissions,
};

const url = client.requestSignInitialTx(request);
```

Once the URL has been generated, the dapp should redirect the user to the wallet.

#### requestSignWithFullAccessKey

When the dapp needs to sign a transaction that cannot be signed with the client's limited access key, this method can be called to generate a URL that will redirect the user to the wallet's signingURL with the required information.

The method requires an argument of type:

```typescript
type SignWithFakRequest = {
    transaction: Transaction;
    signingURL: string;
};
```

```typescript
const request: SignWithFakRequest = {
    transaction: transaction,
    signingURL: signingURL,
};

const url = client.requestSignWithFullAccessKey(request);
```

Once the URL has been generated, the dapp should redirect the user to the wallet.

## RelayerClient

### Configuration

Each `RelayerClient` instance requires to set the following properties in its configuration:

| Property      | Description                                                                                                                                         | Required |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `redirectURL` | The URL to redirect the user to after the wallet has signed a message (this URL can be override on every method that sends a message to the wallet) | ✅       |
| `relayerAPI`  | Information of the relayer API that will be used to relay transactions                                                                              | ❌       |

The `relayerAPI` field is not required when initializing the `RelayerClient`. If not specified, the `RelayerClient` will attempt to obtain the relayer API from the sign-in message. If not found there, it will use the default relayer API. If found in the sign-in message, the `RelayerClient` will add it to its configuration.

### Storage

As previously mentioned in the [Storage](#storage) section of the `Client`, the `RelayerClient` stores user account information in the browser's `localStorage` by default. The following data is stored:

| Property     | Description                                                            | Required |
| ------------ | ---------------------------------------------------------------------- | -------- |
| `accountID`  | The account ID of the user                                             | ✅       |
| `keyPair`    | A KeyPair in string format of the user's limited access key            | ✅       |
| `signingURL` | The URL to redirect the user to sign a payload with their wallet       | ✅       |
| `relayerAPI` | Information of the relayer API that will be used to relay transactions | ✅       |

### Methods

El `RelayerClient` extiende todos los métodos expuestos por el `Client` a excepción de `isSignedIn`.

#### isSignedIn

A diferencia de el `isSignedIn` del `Client`, el `isSignedIn` del `RelayerClient` requiere del parámetro adicional `relayerAPI`. Este parámetro debe ser proporcionado por el wallet cuando el usuario quiera enviar sus transacciones mediante un relayer.

Al igual que el `isSignedIn` del `Client`, este método retornará `true` si el usuario ya está autenticado, o `false` en caso contrario. Al igual que con el campo de `signingURL`, si el campo de `relayerAPI` no coincide con el almacenado, se actualizará con el valor proporcionado.

```typescript
const result = client.isSignedIn(accountID, signingURL, relayerAPI);
```

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
