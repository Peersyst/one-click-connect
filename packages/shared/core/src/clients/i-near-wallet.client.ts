import { DAppRequest, SignInRequest } from "../request";

/**
 * @description Interface for a wallet.
 */
export interface INearWalletClient {
    /**
     * Request to sign in.
     * @param params The params to sign in.
     * @param dAppURL The dAppUrl.
     * @returns The request.
     */
    requestSignIn(params: SignInRequest["params"], dAppURL: string): string;

    /**
     * Parse dApp request.
     * @param url The dApp request received.
     * @returns The dApp request.
     */
    parseDAppRequest(url: string): DAppRequest;
}
