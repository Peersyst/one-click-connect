---
sidebar_position: 3
---

# Client

To be able to interact with the 1ClickConnect protocol as a dapp, you need to use a wallet client. All wallet SDKs provide a client to interact with the 1ClickConnect protocol. The main goal of the client is to encode/decode protocol messages to be sent to other dapps.

## Configuration

A `WalletClient` requires the following properties in its configuration:

| Property     | Description                                                                       | Required |
| ------------ | --------------------------------------------------------------------------------- | -------- |
| `signingURL` | The URL in your wallet to sign transactions and requests.                         | ✅       |
| `relayerAPI` | Information of the relayer API. If provided, the wallet will use the relayer API. | ❌       |

In your code, you can initialize the `WalletClient` with the following configuration:

```typescript
import { WalletClient } from "@one-click-connect/vanilla-wallet";
const client = new WalletClient({
    signingURL: "https://my-wallet.com/signing", // Can be a web url or a deep link
});
```

## Methods

### requestSignIn

The `requestSignIn` method is used to request a sign in from the wallet to a dapp. It is required to provide the `accountID` of the account you want to sign in and the dapp URL entrypoint.

Here's an example of how to use the `requestSignIn` method:

```typescript
const dappURL = "https://my-dapp.com";

const url = client.requestSignIn(accountID, dappURL);
```

When redirecting the user to the generated URL, if the account has never signed in to the dapp, the dapp should request the wallet to sign the initial transaction to generate a KeyPair associated with the account. Otherwise, if the account has already signed in to the dapp, the account will be signed in to the dapp instantly.

### parseFullAccessKeyRequest

The `parseFullAccessKeyRequest` method is used to parse a MsgSignFAK requested by the dapp. It is required to provide the URL of the dapp that requested the full access key.

If the url is valid, it will return the transaction the dapp requested the wallet to sign and the redirect URL to redirect the user to. Otherwise, it will throw an error.

```typescript
const { transaction, redirectURL } = client.parseFullAccessKeyRequest(url);
```
