import { Transaction } from "near-api-js/lib/transaction";
import { MsgError, MsgErrorCodes } from "./errors";
import { TransactionCodec } from "../codecs";

/**
 * @description Message for signing a transaction.
 */
export class MsgFakSign {
    _transaction: Transaction;
    _redirectURL: string;

    /**
     * @description Creates a new MsgFakSign object.
     * @param transaction - The transaction to sign.
     * @param redirectURL - The redirect URL.
     */
    constructor(transaction: Transaction, redirectURL: string) {
        this._transaction = transaction;
        this._redirectURL = redirectURL;
    }

    /**
     * @description Creates a new MsgFakSign object from a URL.
     * @param url - The URL to create the MsgFakSign object from.
     * @returns A new MsgFakSign object.
     */
    static fromURL(url: string): MsgFakSign {
        const urlObj = new URL(url);
        const encodedTransaction = urlObj.searchParams.get("transaction");
        const redirectURL = urlObj.searchParams.get("redirectURL");

        if (!encodedTransaction || !redirectURL) {
            throw new MsgError(MsgErrorCodes.INVALID_URL);
        }

        const transaction = TransactionCodec.fromURLParam(encodedTransaction);
        return new MsgFakSign(transaction, redirectURL);
    }

    /**
     * @description Creates a URL from the MsgFakSign object.
     * @param url - The URL to create the MsgFakSign object from.
     * @returns A URL.
     */
    toURL(url: string): string {
        const urlObj = new URL(url);
        urlObj.searchParams.set("transaction", TransactionCodec.toURLParam(this._transaction));
        urlObj.searchParams.set("redirectURL", this._redirectURL);

        return urlObj.toString();
    }

    /**
     * @description Gets the transaction from the MsgFakSign object.
     * @returns The transaction.
     */
    get transaction(): Transaction {
        return this._transaction;
    }

    /**
     * @description Gets the redirect URL from the MsgFakSign object.
     * @returns The redirect URL.
     */
    get redirectURL(): string {
        return this._redirectURL;
    }
}
