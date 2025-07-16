import { SignInitialTxRequest } from "../../common/requests/sign-initial-tx.request";
import { SignWithFakRequest } from "../../common";

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
    isSignedIn(accountID: string, signingURL: string): boolean;
    /**
     * Signs an initial transaction.
     * @param request The request to sign the transaction for.
     */
    requestSignInitialTx(request: SignInitialTxRequest): string;

    /**
     * @description Signs a transaction with the full access key.
     * @param request The request to sign the transaction for.
     * @returns The signed transaction.
     */
    requestSignWithFullAccessKey(request: SignWithFakRequest): string;

    /**
     * @description Signs out the user.
     */
    signOut(): void;
}
