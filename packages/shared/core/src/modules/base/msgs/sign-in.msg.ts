import { MsgError, MsgErrorCodes } from "../../common/msgs";

/**
 * Message for signing in to the app.
 * @example
 * ```
 * const msg = new MsgSignIn("accountID", "signingURL");
 * const url = msg.toURL();
 * ```
 */
export class MsgSignIn {
    _accountID: string;
    _signingURL: string;

    /**
     * Creates a new MsgSignIn object.
     * @param accountID The account ID to sign in to.
     * @param signingURL The signing URL to use.
     */
    constructor(accountID: string, signingURL: string) {
        this._accountID = accountID;
        this._signingURL = signingURL;
    }

    /**
     * Creates a new MsgSignIn object from a URL.
     * @param url The URL to create the MsgSignIn object from.
     * @returns A new MsgSignIn object.
     */
    static fromURL(url: string): MsgSignIn {
        const urlObj = new URL(url);
        const accountID = urlObj.searchParams.get("accountID");
        const signingURL = urlObj.searchParams.get("signingURL");

        if (!accountID || !signingURL) {
            throw new MsgError(MsgErrorCodes.INVALID_URL);
        }

        return new MsgSignIn(accountID, signingURL);
    }

    /**
     * Creates a URL from the MsgSignIn object.
     * @param url The URL to create the MsgSignIn object from.
     * @returns A URL.
     */
    toURL(url: string): string {
        const urlObj = new URL(url);
        urlObj.searchParams.set("accountID", this._accountID);
        urlObj.searchParams.set("signingURL", this._signingURL);
        return urlObj.toString();
    }

    /**
     * Gets the signing URL from the MsgSignIn object.
     * @returns The signing URL.
     */
    get signingURL(): string {
        return this._signingURL;
    }

    /**
     * Gets the account ID from the MsgSignIn object.
     * @returns The account ID.
     */
    get accountID(): string {
        return this._accountID;
    }
}
