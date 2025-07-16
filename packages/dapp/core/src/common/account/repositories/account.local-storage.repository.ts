import { AccountStoreState } from "../states";
import { IAccountRepository } from "../interfaces";
import { KeyPair } from "near-api-js/lib/utils";
import { Account } from "../account.types";

export class AccountLocalStorageRepository implements IAccountRepository {
    private readonly STORAGE_KEY = "occ-account";

    /**
     * Retrieves the current state from local storage.
     * @returns The current account state.
     */
    private getState(): AccountStoreState {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : { active: "", accounts: {} };
    }

    /**
     * Saves the state to local storage.
     * @param state The account state to save.
     */
    private setState(state: AccountStoreState): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    }

    /**
     * @inheritdoc
     */
    getActive(): Account | undefined {
        const state = this.getState();
        const accountID = state.active;
        const keypair = state.accounts[accountID];
        return keypair ? { accountID, keypair: keypair.keypair, signingURL: keypair.signingURL } : undefined;
    }

    /**
     * @inheritdoc
     */
    get(accountId: string): Account | undefined {
        const state = this.getState();
        const accountState = state.accounts[accountId];
        return accountState ? { accountID: accountId, keypair: accountState.keypair, signingURL: accountState.signingURL } : undefined;
    }

    /**
     * @inheritdoc
     */
    create(accountId: string, keypair: KeyPair, signingURL: string): Account {
        const state = this.getState();
        state.accounts[accountId] = { keypair, signingURL };
        this.setState(state);
        return { accountID: accountId, keypair, signingURL };
    }

    /**
     * @inheritdoc
     */
    update(accountId: string, signingURL?: string): void {
        const state = this.getState();
        if (state.accounts[accountId]) {
            state.accounts[accountId] = {
                keypair: state.accounts[accountId].keypair,
                signingURL: signingURL ?? state.accounts[accountId].signingURL,
            };
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
    setActive(accountId: string | undefined): void {
        const state = this.getState();
        if (accountId) {
            state.active = accountId;
        } else {
            state.active = "";
        }
        this.setState(state);
    }
}
