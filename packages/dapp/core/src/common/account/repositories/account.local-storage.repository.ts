import { AccountState } from "../state";
import { IAccountRepository } from "../interfaces";
import { KeyPair } from "near-api-js/lib/utils";
import { Account } from "../account.types";

export class AccountLocalStorageRepository implements IAccountRepository {
    private readonly STORAGE_KEY = "occ-account";

    /**
     * Retrieves the current state from local storage.
     * @returns The current account state.
     */
    private getState(): AccountState {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : { active: "", accounts: {} };
    }

    /**
     * Saves the state to local storage.
     * @param state The account state to save.
     */
    private setState(state: AccountState): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    }

    /**
     * @inheritdoc
     */
    getActive(): { accountID: string; keypair: KeyPair } {
        const state = this.getState();
        const accountID = state.active;
        const keypair = state.accounts[accountID];
        return { accountID, keypair };
    }

    /**
     * @inheritdoc
     */
    get(accountId: string): Account | undefined {
        const state = this.getState();
        const keypair = state.accounts[accountId];
        return keypair ? { accountID: accountId, keypair } : undefined;
    }

    /**
     * @inheritdoc
     */
    create(accountId: string, keypair: KeyPair): Account {
        const state = this.getState();
        state.accounts[accountId] = keypair;
        this.setState(state);
        return { accountID: accountId, keypair };
    }

    /**
     * @inheritdoc
     */
    update(accountId: string, keypair: KeyPair): void {
        const state = this.getState();
        if (state.accounts[accountId]) {
            state.accounts[accountId] = keypair;
            this.setState(state);
        }
    }

    /**
     * @inheritdoc
     */
    delete(accountId: string): void {
        const state = this.getState();
        if (state.accounts[accountId]) {
            delete state.accounts[accountId];
            if (state.active === accountId) {
                state.active = "";
            }
            this.setState(state);
        }
    }

    /**
     * @inheritdoc
     */
    setActive(accountId: string): void {
        const state = this.getState();
        if (state.accounts[accountId]) {
            state.active = accountId;
            this.setState(state);
        }
    }
}
