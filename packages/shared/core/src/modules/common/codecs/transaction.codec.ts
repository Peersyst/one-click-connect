import { Transaction } from "near-api-js/lib/transaction";
import { CodecError, CodecErrorCodes } from "./errors";
import { CodecType } from "./types";

/**
 * @description Codec for transactions.
 */
export class TransactionCodec {
    /**
     * @description Decodes a transaction from a URL.
     * @param transaction - The transaction to decode.
     * @returns The decoded transaction.
     */
    static fromURLParam(transaction: string): Transaction {
        try {
            const encodedTransaction = Buffer.from(transaction, "base64");
            return Transaction.decode(encodedTransaction);
        } catch (error) {
            throw new CodecError(CodecType.TRANSACTION_CODEC, CodecErrorCodes.ERROR_DECODING_URL);
        }
    }

    /**
     * @description Encodes a transaction to a URL.
     * @param transaction - The transaction to encode.
     * @returns The encoded transaction.
     */
    static toURLParam(transaction: Transaction): string {
        try {
            const encodedTransaction = Buffer.from(transaction.encode()).toString("base64");
            return encodedTransaction;
        } catch (error) {
            throw new CodecError(CodecType.TRANSACTION_CODEC, CodecErrorCodes.ERROR_ENCODING_URL);
        }
    }
}
