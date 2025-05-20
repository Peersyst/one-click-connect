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

#### `SIGNING_URL_NOT_SET`

The `signingURL` is not set in the client configuration. If this error is thrown, you need to set the `signingURL` property in the client configuration to call the desired method.
