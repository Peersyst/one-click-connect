# Integrate the DApp SDK

This guide will walk you through the process of integrating the 1ClickConnect DApp SDK into your own dapp project. Follow the steps below to get started.

## Prerequisites

To be able to integrate the DApp SDK, you will need to have installed a 1ClickConnect DApp SDK. You can install one of the following SDKs:

- [Javascript]

## Instantiating a client

The current version of the DApp SDK contains two clients:

- `Client`
- `RelayerClient`

Both clients contain the same methods. The main difference between the two is that the RelayerClient must be used when a user provides the relayerAPI parameter. You can find more information about both clients in the [SDK] section.

:::info
All clients must be instantiated via `ClientFactory`.
:::

### Client

To create a new Client instance, you must provide a ClientConfig object with the following properties:

redirectURL: The URL of the page that will be redirected to after the user has connected their wallet.
Your code should look like this:

```typescript
const client = ClientFactory.newClient({
    redirectURL: "<YOUR_REDIRECT_URL>",
});
```

### RelayerClient

RelayerClient
To create a new RelayerClient instance, you must provide a RelayerClientConfig object the following properties:

- `redirectURL`: The URL of the page that will be redirected to after the user has connected their wallet.
- `relayerAPI` (optional): The URL of the relayer API.

Your code should look like this:

```typescript
const relayerClient = ClientFactory.newRelayerClient({
    redirectURL: "<YOUR_REDIRECT_URL>",
    relayerAPI: {
        url: "<YOUR_RELAYER_API_URL>",
    }, // Optional
});
```

## Handle sign in

Now that you have an instance of the client, you can start handling the sign in process.

:::warning
In order to be able to receive sign in requests from a wallet, you must set an URL in your dapp that will be used by the wallet to send the requests.
:::

To handle the sign in process, you can use the following code:

```typescript
// Previously, you had instantiated the client like this:
const client = ClientFactory.newClient({
    redirectURL: "<YOUR_REDIRECT_URL>",
});

// Now, you can handle the sign in process like this:
const isSignedIn = await client.isSignedIn();

if (isSignedIn) {
    return;
}

// Generate a sign in request
const requestURL = await client.requestSignIn({
    accountID: "<ACCOUNT_ID_PROVIDED_BY_QUERY_PARAMS>",
    signingURL: "<SIGNING_URL_PROVIDED_BY_QUERY_PARAMS>",
    permissions: <YOUR_FUNCTION_CALL_PERMISSIONS>,
});

// Redirect the user to the signing URL
```

## Request a full access key signature

At some point, you may need to request a full access key signature from the wallet since you don't have enough permissions to perform the action you want.

To request a full access key signature, you can use the following code:

```typescript
const requestURL = await client.requestSignWithFullAccessKey({
    signingURL: "<SIGNING_URL>",
    transaction: <DESIRED_TRANSACTION>,
});

// Redirect the user to the signing URL
```

## Handle sign out

To handle the sign out process, you can use the following code:

```typescript
client.signOut();
```

## Get the active account

To get the active account, you can use the following code:

```typescript
const account = client.getActiveAccount();
```

It will return an Account object if the user is signed in, containing the account ID, its keypair and more information.
