# Integrate the Wallet SDK

This guide will walk you through the process of integrating the 1ClickConnect Wallet SDK into your own wallet project. Follow the steps below to get started.

## Prerequisites

To be able to integrate the Wallet SDK, you will need to have installed a 1ClickConnect Wallet SDK. You can install one of the following SDKs:

- [Javascript](../sdks/wallet/javascript/installation.mdx)

## Instantiating a client

The current version of the Wallet SDK contains a single client:

- `WalletClient`

You can find more information about the client in the [SDK](../sdks/wallet/javascript/client.md) section.

### Client

To create a new `WalletClient` instance, you must provide a `WalletClientConfig` object with the following properties:

- `signingURL`: The URL of the page that will be redirected to after the user has connected their wallet.
- `relayerAPI` (optional): An object containing information about the relayer API.

Your code should look like this:

```typescript
const client = new WalletClient({
    signingURL: "<YOUR_SIGNING_URL>",
    relayerAPI: {
        url: "<YOUR_RELAYER_API_URL>",
    }, // Optional
});
```

:::warning
The `signingURL` is required and must be the same URL where you will be handling all dapps requests.
:::

## Request a sign in

Now that you have an instance of the client, you can start requesting to sign in a user in a dapp.

To request a sign in, you can use the following code:

```typescript
// Previously, you had instantiated the client like this:
const client = new WalletClient({
    signingURL: "<YOUR_SIGNING_URL>",
});

// Now, you can request a sign in like this:
const requestURL = await client.requestSignIn(accountID, dappURL);

// Redirect the user to the signing URL
```

## Parse a sign initial tx request

When a dapp requests you to sign a SignInitialTx, you will receive the request in the `signingURL` you provided in the `WalletClientConfig`.

To parse the request, you can use the following code:

```typescript
const { permissions, redirectURL, publicKey } = client.parseSignInitialTxRequest(requestURL);
```

This will return an object with the following properties:

- `permissions`: The permissions that the dapp is requesting (FunctionCallPermission).
- `redirectURL`: The URL to redirect the user to after the transaction is signed.
- `publicKey`: The public key of the user.

From this point, you can use the `permissions` and `publicKey` to sign and send a transaction with an `AddKey` action. Once the transaction is sent, you can redirect the user to the `redirectURL` provided in the request.

## Parse a full access key signature request

A dapp can also request you to sign a transaction with your full access key. This is useful when you don't have enough permissions to perform the action you want.

To parse the request, you can use the following code:

```typescript
const { transaction, redirectURL } = client.parseFullAccessKeyRequest(requestURL);
```

This will return an object with the following properties:

- `transaction`: The transaction to sign.
- `redirectURL`: The URL to redirect the user to after the transaction is signed.

Once you have the transaction, you can sign it and send it to the network. Once the transaction is sent, you can redirect the user to the `redirectURL` provided in the request.
