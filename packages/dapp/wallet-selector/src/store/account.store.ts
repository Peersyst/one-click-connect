import { Store } from "./store";
import { Account } from "../core/account";

const ACCOUNT_STORE_PREFIX = "account";

export class AccountStore extends Store {
    constructor() {
        super(ACCOUNT_STORE_PREFIX);
    }

    /**
     * Stores a new Account.
     * @param value The Account to store.
     */
    set(value: Account) {
        this.setValue(value.toString());
    }

    /**
     * Gets the stored Account.
     * @returns The stored Account or null if not exists.
     */
    get(): Account | null {
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
