import { BrowserStore } from ".";
import { Account, AccountStore } from "../../common";

const ACCOUNT_STORE_PREFIX = "account";

export class BrowserAccountStore extends BrowserStore implements AccountStore {
    constructor() {
        super(ACCOUNT_STORE_PREFIX);
    }

    /**
     * Stores a new Account.
     * @param value The Account to store.
     */
    async set(value: Account) {
        this.setValue(value.toString());
    }

    /**
     * Gets the stored Account.
     * @returns The stored Account or null if not exists.
     */
    async get(): Promise<Account | null> {
        const rawValue = this.getValue();
        if (rawValue) {
            try {
                return Account.fromString(rawValue);
            } catch (_) {
                return null;
            }
        }
        return null;
    }
}
