import { Account } from "..";
import { Store } from ".";

export interface AccountStore extends Store {
    set(value: Account): Promise<void>;
    get(): Promise<Account | null>;
}
