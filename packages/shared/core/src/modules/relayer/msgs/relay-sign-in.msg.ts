import { MsgError, MsgErrorCodes } from "../../common/msgs/errors";

/**
 * @description Message for relaying a sign in request.
 */
export class MsgRelaySignIn {
    _accountID: string;
    _signingURL: string;
    _relayerAPI: string;

    /**
     * @description Creates a new MsgRelaySignIn object.
     * @param accountID - The account ID.
     * @param signingURL - The signing URL.
     * @param relayerAPI - The relayer API.
     */
    constructor(accountID: string, signingURL: string, relayerAPI: string) {
        this._accountID = accountID;
        this._signingURL = signingURL;
        this._relayerAPI = relayerAPI;
    }

    /**
     * @description Creates a new MsgRelaySignIn object from a URL.
     * @param url - The URL.
     * @returns A new MsgRelaySignIn object.
     */
    static fromURL(url: string): MsgRelaySignIn {
        const urlObj = new URL(url);
        const accountID = urlObj.searchParams.get("accountID");
        const signingURL = urlObj.searchParams.get("signingURL");
        const relayerAPI = urlObj.searchParams.get("relayerAPI");

        if (!accountID || !signingURL || !relayerAPI) {
            throw new MsgError(MsgErrorCodes.INVALID_URL);
        }

        return new MsgRelaySignIn(accountID, signingURL, relayerAPI);
    }

    /**
     * @description Creates a URL from the MsgRelaySignIn object.
     * @param url - The URL.
     * @returns A URL.
     */
    toURL(url: string): string {
        const urlObj = new URL(url);
        urlObj.searchParams.set("accountID", this.accountID);
        urlObj.searchParams.set("signingURL", this.signingURL);
        urlObj.searchParams.set("relayerAPI", this.relayerAPI);
        return urlObj.toString();
    }

    /**
     * @description Gets the account ID from the MsgRelaySignIn object.
     * @returns The account ID.
     */
    get accountID(): string {
        return this._accountID;
    }

    /**
     * @description Gets the signing URL from the MsgRelaySignIn object.
     * @returns The signing URL.
     */
    get signingURL(): string {
        return this._signingURL;
    }

    /**
     * @description Gets the relayer API from the MsgRelaySignIn object.
     * @returns The relayer API.
     */
    get relayerAPI(): string {
        return this._relayerAPI;
    }
}
