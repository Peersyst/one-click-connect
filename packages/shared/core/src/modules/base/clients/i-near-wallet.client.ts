import { Transaction } from "near-api-js/lib/transaction";
import { PublicKey } from "near-api-js/lib/utils";

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
    requestSignIn(accountID: string, url: string): string;

    /**
     * @description Parses a sign initial tx request.
     * @param url The URL to parse.
     * @returns The parsed request.
     */
    parseSignInitialTxRequest(url: string): { permissions: string; redirectURL: string; publicKey: PublicKey };

    /**
     * @description Signs a transaction with the full access key.
     * @param url The URL to sign the transaction to.
     * @returns The signed transaction URL.
     */
    parseFullAccessKeyRequest(url: string): { transaction: Transaction; redirectURL: string };
}
