import { Transaction } from "near-api-js/lib/transaction";
import { PublicKey } from "near-api-js/lib/utils";
import { MsgError, MsgErrorCodes } from "./errors";
import { PermissionsCodec, PublicKeyCodec, TransactionCodec } from "../codecs";

/**
 * @description Message for signing an initial transaction.
 */
export class MsgSignInitialTx {
    _transaction: Transaction;
    _redirectURL: string;
    _permissions: object;
    _publicKey: PublicKey;

    /**
     * @description Creates a new MsgSignInitialTx object.
     * @param transaction - The transaction to sign.
     * @param redirectURL - The redirect URL.
     * @param permissions - The permissions.
     * @param publicKey - The public key.
     */
    constructor(transaction: Transaction, redirectURL: string, permissions: object, publicKey: PublicKey) {
        this._transaction = transaction;
        this._redirectURL = redirectURL;
        this._permissions = permissions;
        this._publicKey = publicKey;
    }

    /**
     * @description Creates a new MsgSignInitialTx object from a URL.
     * @param url - The URL to create the MsgSignInitialTx object from.
     * @returns A new MsgSignInitialTx object.
     */
    static fromURL(url: string): MsgSignInitialTx {
        const urlObj = new URL(url);

        const encodedTrasaction = urlObj.searchParams.get("transaction");
        const redirectURL = urlObj.searchParams.get("redirectURL");
        const urlPermissions = urlObj.searchParams.get("permissions");
        const urlPK = urlObj.searchParams.get("publicKey");

        if (!encodedTrasaction || !redirectURL || !urlPermissions || !urlPK) {
            throw new MsgError(MsgErrorCodes.INVALID_URL);
        }

        const transaction = TransactionCodec.fromURLParam(encodedTrasaction);
        const permissions = PermissionsCodec.fromURLParam(urlPermissions);
        const publicKey = PublicKeyCodec.fromURLParam(urlPK);

        return new MsgSignInitialTx(transaction, redirectURL, permissions, publicKey);
    }

    /**
     * @description Creates a URL from the MsgSignInitialTx object.
     * @param url - The URL to create the MsgSignInitialTx object from.
     * @returns A URL.
     */
    toURL(url: string): string {
        const urlObj = new URL(url);
        urlObj.searchParams.set("transaction", TransactionCodec.toURLParam(this._transaction));
        urlObj.searchParams.set("redirectURL", this._redirectURL);
        urlObj.searchParams.set("permissions", PermissionsCodec.toURLParam(this._permissions));
        urlObj.searchParams.set("publicKey", PublicKeyCodec.toURLParam(this._publicKey));

        return urlObj.toString();
    }

    /**
     * @description Gets the transaction from the MsgSignInitialTx object.
     * @returns The transaction.
     */
    get transaction(): Transaction {
        return this._transaction;
    }

    /**
     * @description Gets the redirect URL from the MsgSignInitialTx object.
     * @returns The redirect URL.
     */
    get redirectURL(): string {
        return this._redirectURL;
    }

    /**
     * @description Gets the permissions from the MsgSignInitialTx object.
     * @returns The permissions.
     */
    get permissions(): object {
        return this._permissions;
    }

    /**
     * @description Gets the public key from the MsgSignInitialTx object.
     * @returns The public key.
     */
    get publicKey(): PublicKey {
        return this._publicKey;
    }
}
