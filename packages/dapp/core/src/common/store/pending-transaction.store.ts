import { Store } from ".";

export interface PendingTransactionStore<PendingTransaction> extends Store {
    /**
     * Adds one or more pending transactions to the current list of pending transactions.
     * @param accountId The account id that has the pending transaction.
     * @param value One or more pending transactions to be added.
     */
    push(accountId: string, ...value: PendingTransaction[]): Promise<void>;

    /**
     * Removes and returns the last transaction from the list of pending transactions.
     * If there are no pending transactions, it returns null.
     * @param accountId The account id that has the pending transaction.
     * @returns The last pending transaction if exists, otherwise null.
     */
    pop(accountId: string): Promise<PendingTransaction | null>;

    /**
     * Removes all pending transaction associated with the specified account ID.
     * @param accountId The account id whose pending transaction is to be removed.
     */
    removeAll(accountId: string): Promise<void>;
}
