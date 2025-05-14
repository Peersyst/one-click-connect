---
sidebar_position: 4
---

# Errors

This page contains the list of errors that can be thrown by the SDK.

:::warning

All errors are thrown as `ClientError` instances. By now, the client does not provide a way to catch and handle its errors.

:::

## Custom errors

The SDK uses the following custom errors:

- [`ClientError`](#clienterror)

### ClientError

This error is thrown when the SDK encounters an error. It extends the `Error` class and adds a `code` property. The `code` property must be one of the following values:

#### `REDIRECT_URL_NOT_SET`

The `redirectUrl` is not set in the client configuration. If this error is thrown, you need to set the `redirectUrl` property in the client configuration to call the desired method.

#### `RELAYER_API_NOT_SET`

> [!INFO]
> This error can only be thrown by the `NearDAppRelayerClient`

The `relayerApi` is not set in the client configuration. If this error is thrown, you need to set the `relayerApi` property in the client configuration to call the desired method.

#### `ACCOUNT_ALREADY_EXISTS`

This error is thrown when trying to sign an initial transaction for an account that's already stored in the client. It is thrown by the `signInitialTx` method.
