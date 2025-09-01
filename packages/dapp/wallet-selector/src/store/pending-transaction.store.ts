import { Transaction } from "@near-wallet-selector/core";
import { Store } from "./store";
import type { Optional } from "@near-wallet-selector/core/src/lib/utils.types";

const PENDING_TRANSACTION_STORE_PREFIX = "pending-transaction:";

type PendingTransaction = Optional<Transaction, "signerId" | "receiverId">;

export class PendingTransactionStore extends Store {
    constructor(accountId: string) {
        super(`${accountId}:${PENDING_TRANSACTION_STORE_PREFIX}`);
    }

    /**
     * Adds one or more pending transactions to the current list of pending transactions.
     * @param value One or more pending transactions to be added.
     */
    push(...value: PendingTransaction[]): void {
        const pendingTransactions = this.get();
        if (!pendingTransactions) {
            this.set(value);
            return;
        }
        pendingTransactions.push(...value);
        this.set(pendingTransactions);
    }

    /**
     * Removes and returns the last transaction from the list of pending transactions.
     * If there are no pending transactions, it returns null.
     * @returns The last pending transaction if exists, otherwise null.
     */
    pop(): PendingTransaction | null {
        const pendingTransactions = this.get();
        if (!pendingTransactions || pendingTransactions.length === 0) {
            return null;
        }
        const pendingTransaction = pendingTransactions.pop();
        this.set(pendingTransactions);
        return pendingTransaction ?? null;
    }

    /**
     * Sets the provided array of pending transactions after converting it to a JSON string.
     * @param value An array of pending transaction objects to be stored.
     */
    private set(value: PendingTransaction[]): void {
        this.setValue(JSON.stringify(value));
    }

    /**
     * Retrieves and parses the stored value into an array of PendingTransaction objects.
     * If no value is stored, returns null.
     * @returns An array of PendingTransaction objects if the stored value exists and is valid, or null if no value is stored.
     */
    private get(): PendingTransaction[] | null {
        const value = this.getValue();
        if (value) {
            return JSON.parse(value);
        }
        return null;
    }
}
