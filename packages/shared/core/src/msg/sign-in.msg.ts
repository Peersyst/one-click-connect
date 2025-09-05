import { MsgErrorCodes } from "../error";

export enum MsgSignInQueryParams {
    CONNECTION = "connection",
}

/**
 * Message for signing in to the app.
 * @example
 * ```
 * const msg = new MsgSignIn("accountID", "signingURL");
 * const url = msg.toURL();
 * ```
 */
export class MsgSignIn {
    accountID: string;
    signingURL: string;
    walletId?: string;
    accessKey?: string;

    /**
     * Creates a new MsgSignIn object.
     * @param accountID The account ID to sign in to.
     * @param signingURL The signing URL to use.
     * @param walletId The walletId that signs in.
     * @param accessKey The access key already generated.
     */
    constructor(accountID: string, signingURL: string, walletId?: string, accessKey?: string) {
        this.accountID = accountID;
        this.signingURL = signingURL;
        this.walletId = walletId;
        this.accessKey = accessKey;
    }

    /**
     * Creates a new MsgSignIn object from a URL.
     * @param url The URL to create the MsgSignIn object from.
     * @returns A new MsgSignIn object.
     */
    static fromURL(url: string): MsgSignIn {
        const urlObj = new URL(url);
        const connectionParam = urlObj.searchParams.get(MsgSignInQueryParams.CONNECTION);
        if (!connectionParam) {
            throw new Error(MsgErrorCodes.INVALID_SIGN_IN_URL);
        }
        const decodedString = Buffer.from(connectionParam, "base64").toString("utf-8");
        const { accountId, walletId, walletTransactionUrl, secretKey } = JSON.parse(decodedString);

        if (!accountId) {
            throw new Error(MsgErrorCodes.INVALID_SIGN_IN_ACCOUNT_ID);
        }

        if (!walletTransactionUrl || !URL.canParse(walletTransactionUrl)) {
            throw new Error(MsgErrorCodes.INVALID_SIGN_IN_WALLET_TRANSACTION_URL);
        }

        return new MsgSignIn(accountId, walletTransactionUrl, walletId, secretKey);
    }

    /**
     * Creates a URL from the MsgSignIn object.
     * @param url The URL to create the MsgSignIn object from.
     * @returns A URL.
     */
    toURL(url: string): string {
        const urlObj = new URL(url);

        const connection = JSON.stringify({
            accountId: this.accountID,
            walletId: this.walletId,
            walletTransactionUrl: this.signingURL,
            secretKey: this.accessKey,
        });
        urlObj.searchParams.set(MsgSignInQueryParams.CONNECTION, Buffer.from(connection).toString("base64"));
        return urlObj.toString();
    }
}
