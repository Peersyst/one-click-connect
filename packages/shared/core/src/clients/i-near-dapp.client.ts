import { AddLAKRequest, SignWithFAKRequest, WalletRequest } from "../request";

/**
 * @description Interface for a client.
 */
export interface INearDAppClient<Transaction> {
    /**
     * Parse wallet request.
     * @param url The wallet request received.
     */
    parseWalletRequest(url: string): WalletRequest;

    /**
     * Create a request to add a Limited Access Key.
     * @param params The params to add the Limit Access Key.
     * @returns The request.
     */
    requestAddLAK(params: AddLAKRequest["params"]): string;

    /**
     * Create a request to sign using a Full Access Key.
     * @param params The params to sign with the Full Access Key.
     * @returns The request.
     */
    requestSignWithFAK(params: SignWithFAKRequest<Transaction[]>["params"]): string;
}
