import { Codec } from "@one-click-connect/core";
import { BrowserStore } from ".";
import { PendingTransactionStore } from "../../common";

const PENDING_TRANSACTION_STORE_PREFIX = "pending-transaction:";

export class BrowserPendingTransactionStore<PendingTransaction>
    extends BrowserStore
    implements PendingTransactionStore<PendingTransaction>
{
    constructor(private readonly codec: Codec<PendingTransaction, string>) {
        super(`${PENDING_TRANSACTION_STORE_PREFIX}`);
    }

    /**
     * @inheritDoc
     */
    async push(accountId: string, ...value: PendingTransaction[]): Promise<void> {
        const pendingTransactions = this.get(accountId);
        if (!pendingTransactions) {
            this.set(accountId, value);
            return;
        }
        pendingTransactions.push(...value);
        this.set(accountId, pendingTransactions);
    }

    /**
     * @inheritDoc
     */
    async pop(accountId: string): Promise<PendingTransaction | null> {
        const pendingTransactions = this.get(accountId);
        if (!pendingTransactions || pendingTransactions.length === 0) {
            return null;
        }
        const pendingTransaction = pendingTransactions.pop();
        this.set(accountId, pendingTransactions);
        return pendingTransaction ?? null;
    }

    /**
     * Sets the provided array of pending transactions after converting it to a JSON string.
     * @param accountId The account id of the pending transactions.
     * @param value An array of pending transaction objects to be stored.
     */
    private set(accountId: string, value: PendingTransaction[]): void {
        const encodedValue = JSON.stringify(value.map(this.codec.encode));
        this.setValue(encodedValue, `${accountId}:`);
    }

    /**
     * Retrieves and parses the stored value into an array of PendingTransaction objects.
     * If no value is stored, returns null.
     * @param accountId The account id of the pending transactions.
     * @returns An array of PendingTransaction objects if the stored value exists and is valid, or null if no value is stored.
     */
    private get(accountId: string): PendingTransaction[] | null {
        const value = this.getValue(`${accountId}:`);
        if (value) {
            return JSON.parse(value).map(this.codec.decode);
        }
        return null;
    }

    /**
     * @inheritDoc
     */
    async removeAll(accountId: string): Promise<void> {
        return super.remove(`${accountId}:`);
    }
}
