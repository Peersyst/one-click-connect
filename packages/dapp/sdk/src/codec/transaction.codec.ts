import { Codec } from "@one-click-connect/dapp-core";
import { Transaction } from "../clients";
import { Action, SCHEMA } from "near-api-js/lib/transaction";
import { deserialize, serialize } from "borsh";

const ActionsSchema = { array: { type: SCHEMA.Action } };

export class TransactionCodec implements Codec<Transaction[], string> {
    /**
     * Encodes an array of transactions into a JSON string format.
     * Each transaction is processed to serialize its actions and convert them
     * into a Base64 string, along with other transaction attributes.
     * @param transactions The array of transactions to be encoded.
     * @returns A JSON string representing the encoded transactions.
     */
    encode(transactions: Transaction[]): string {
        const encodedObj = [];
        for (const transaction of transactions) {
            const serializedActions = serialize(ActionsSchema, transaction.actions);
            encodedObj.push({
                signerId: transaction.signerId,
                receiverId: transaction.receiverId,
                actions: Buffer.from(serializedActions).toString("base64"),
            });
        }
        return JSON.stringify(encodedObj);
    }

    /**
     * Decodes a JSON-encoded string into an array of Transaction objects.
     * @param value The JSON-encoded string representing an array of transactions.
     * @returns An array of decoded Transaction objects.
     */
    decode(value: string): Transaction[] {
        const encodedObj = JSON.parse(value);
        const transactions: Transaction[] = [];
        for (const encodedTransaction of encodedObj) {
            const deserializedActions = deserialize(ActionsSchema, Buffer.from(encodedTransaction.actions, "base64"));
            transactions.push({
                signerId: encodedTransaction.signerId,
                receiverId: encodedTransaction.receiverId,
                actions: deserializedActions as Action[],
            });
        }
        return transactions;
    }
}
