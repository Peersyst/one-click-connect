export interface Wallet<Transaction, TransactionResult> {
    /**
     * Checks if the accountId has the access key.
     * @param accountId The account id.
     * @param accessKey The access key to be validated.
     * @returns A promise that resolves to true if the access key is valid, otherwise false.
     */
    hasAccessKey(accountId: string, accessKey: string): Promise<boolean>;

    /**
     * Determines whether the given access key has execution privileges for the specified transaction.
     * @param accountId The accountId.
     * @param accessKey The access key to be validated for execution permissions.
     * @param transaction The transaction object that requires access key validation.
     * @returns A promise that resolves to a boolean indicating whether the access key can execute the transaction.
     */
    canAccessKeyExecute(accountId: string, accessKey: string, transaction: Transaction): Promise<boolean>;

    /**
     * Generates a random access key.
     * @returns A promise that resolves to the generated access key as a string.
     */
    generateAccessKey(): Promise<string>;

    /**
     * Derives a public key from the provided access key.
     * @param accessKey The access key used to derive the public key.
     * @returns A promise that resolves to the derived public key as a string.
     */
    derivePublicKey(accessKey: string): string;

    /**
     * Signs and sends a transaction to the blockchain.
     * @param accountId The accountId to sign the transaction.
     * @param accessKey The access key to sign the transaction.
     * @param transaction The transaction object to be signed and sent.
     * @returns A promise that resolves with the result of the transaction.
     */
    signAndSendTransaction(accountId: string, accessKey: string, transaction: Transaction): Promise<TransactionResult>;

    /**
     * Signs a given message using the access key.
     * @param accessKey The access key to sign the message.
     * @param message The message to be signed.
     * @returns A promise that resolves to the signed message as a string.
     */
    signMessage(accessKey: string, message: string): Promise<string>;
}
