import { Codec } from "@one-click-connect/core";
import { Transaction } from "./transaction";
import { Action, SCHEMA } from "near-api-js/lib/transaction";
import { deserialize, serialize } from "borsh";

const ActionsSchema = { array: { type: SCHEMA.Action } };

export class TransactionCodec implements Codec<Transaction, string> {
    /**
     * Encodes a transaction into a JSON string format.
     * @param transaction The transaction to be encoded.
     * @returns A JSON string representing the encoded transactions.
     */
    encode(transaction: Transaction): string {
        const serializedActions = serialize(ActionsSchema, transaction.actions);
        const encodedObj = {
            signerId: transaction.signerId,
            receiverId: transaction.receiverId,
            actions: Buffer.from(serializedActions).toString("base64"),
        };
        return JSON.stringify(encodedObj);
    }

    /**
     * Decodes a JSON-encoded string into an array of Transaction object.
     * @param value The JSON-encoded string representing the transaction.
     * @returns An array of decoded Transaction objects.
     */
    decode(value: string): Transaction {
        const encodedTransaction = JSON.parse(value);
        const deserializedActions = deserialize(ActionsSchema, Buffer.from(encodedTransaction.actions, "base64"));
        return {
            signerId: encodedTransaction.signerId,
            receiverId: encodedTransaction.receiverId,
            actions: deserializedActions as Action[],
        };
    }
}
