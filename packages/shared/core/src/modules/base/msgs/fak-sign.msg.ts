import { Transaction } from "near-api-js/lib/transaction";
import { MsgError, MsgErrorCodes } from "../../common/msgs";
import { TransactionCodec } from "../../common/codecs";

/**
 * Message for signing a transaction.
 */
export class MsgFakSign {
    transaction: Transaction;
    redirectURL: string;

    /**
     * Creates a new MsgFakSign object.
     * @param transaction The transaction to sign.
     * @param redirectURL The redirect URL.
     */
    constructor(transaction: Transaction, redirectURL: string) {
        this.transaction = transaction;
        this.redirectURL = redirectURL;
    }

    /**
     * Creates a new MsgFakSign object from a URL.
     * @param url The URL to create the MsgFakSign object from.
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
     * Creates a URL from the MsgFakSign object.
     * @param url The URL to create the MsgFakSign object from.
     * @returns A URL.
     */
    toURL(url: string): string {
        const urlObj = new URL(url);
        urlObj.searchParams.set("transaction", TransactionCodec.toURLParam(this.transaction));
        urlObj.searchParams.set("redirectURL", this.redirectURL);

        return urlObj.toString();
    }
}
