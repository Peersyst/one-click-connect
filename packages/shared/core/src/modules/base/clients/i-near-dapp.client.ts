import { Transaction } from "near-api-js/lib/transaction";
import { SignInitialTxRequest } from "../../common/requests/sign-initial-tx.request";

/**
 * @description Interface for a client.
 */
export interface INearDAppClient {
    /**
     * Signs in the user.
     * @param accountID The account ID to sign in.
     * @param signingURL The signing URL to sign in.
     * @returns True if the user is signed in, false otherwise.
     */
    signIn(accountID: string, signingURL: string): boolean;
    /**
     * Signs an initial transaction.
     * @param request The request to sign the transaction for.
     */
    signInitialTx(request: SignInitialTxRequest): string;

    /**
     * @description Signs a transaction with the full access key.
     * @param transaction The transaction to sign.
     * @returns The signed transaction.
     */
    signWithFullAccessKey(transaction: Transaction): string;

    /**
     * @description Signs out the user.
     */
    signOut(): void;
}
