import { FunctionCallPermission } from "near-api-js/lib/transaction";
import { PublicKey } from "near-api-js/lib/utils";
import { MsgError, MsgErrorCodes } from "../../common/msgs";
import { PermissionsCodec, PublicKeyCodec } from "../../common/codecs";

/**
 * Message for signing an initial transaction.
 */
export class MsgSignInitialTx {
    _redirectURL: string;
    _permissions: FunctionCallPermission;
    _publicKey: PublicKey;

    /**
     * Creates a new MsgSignInitialTx object.
     * @param transaction The transaction to sign.
     * @param redirectURL The redirect URL.
     * @param permissions The permissions.
     * @param publicKey The public key.
     */
    constructor(redirectURL: string, permissions: FunctionCallPermission, publicKey: PublicKey) {
        this._redirectURL = redirectURL;
        this._permissions = permissions;
        this._publicKey = publicKey;
    }

    /**
     * Creates a new MsgSignInitialTx object from a URL.
     * @param url The URL to create the MsgSignInitialTx object from.
     * @returns A new MsgSignInitialTx object.
     */
    static fromURL(url: string): MsgSignInitialTx {
        const urlObj = new URL(url);

        const redirectURL = urlObj.searchParams.get("redirectURL");
        const urlPermissions = urlObj.searchParams.get("permissions");
        const urlPK = urlObj.searchParams.get("publicKey");

        if (!redirectURL || !urlPermissions || !urlPK) {
            throw new MsgError(MsgErrorCodes.INVALID_URL);
        }

        const permissions = PermissionsCodec.fromURLParam(urlPermissions);
        const publicKey = PublicKeyCodec.fromURLParam(urlPK);

        return new MsgSignInitialTx(redirectURL, permissions, publicKey);
    }

    /**
     * Creates a URL from the MsgSignInitialTx object.
     * @param url The URL to create the MsgSignInitialTx object from.
     * @returns A URL.
     */
    toURL(url: string): string {
        const urlObj = new URL(url);
        urlObj.searchParams.set("redirectURL", this._redirectURL);
        urlObj.searchParams.set("permissions", PermissionsCodec.toURLParam(this._permissions));
        urlObj.searchParams.set("publicKey", PublicKeyCodec.toURLParam(this._publicKey));

        return urlObj.toString();
    }

    /**
     * Gets the redirect URL from the MsgSignInitialTx object.
     * @returns The redirect URL.
     */
    get redirectURL(): string {
        return this._redirectURL;
    }

    /**
     * Gets the permissions from the MsgSignInitialTx object.
     * @returns The permissions.
     */
    get permissions(): FunctionCallPermission {
        return this._permissions;
    }

    /**
     * Gets the public key from the MsgSignInitialTx object.
     * @returns The public key.
     */
    get publicKey(): PublicKey {
        return this._publicKey;
    }
}
