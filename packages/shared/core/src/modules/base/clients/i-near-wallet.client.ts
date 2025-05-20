/**
 * @description Interface for a wallet.
 */
export interface INearWalletClient {
    /**
     * @description Signs in to the wallet.
     * @param accountID The account ID to sign in to.
     * @param url The URL to sign in to.
     * @returns The sign in URL.
     */
    signIn(accountID: string, url: string): string;
}
