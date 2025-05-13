import { KeyPair } from "near-api-js/lib/utils";
import { Account } from "../account.types";

export interface IAccountRepository {
    /**
     * Gets the currently active account ID.
     * @returns The active account ID.
     */
    getActive(): Account | undefined;
    /**
     * Gets the value associated with an account ID.
     * @param accountId The account ID to look up.
     * @returns The account value or undefined if not found.
     */
    get(accountId: string): Account | undefined;
    /**
     * Creates a new account entry.
     * @param accountId The account ID to create.
     * @param keypair The keypair to associate with the account.
     */
    create(accountId: string, keypair: KeyPair, signingURL: string, relayerAPI?: string): Account;
    /**
     * Updates an existing account entry.
     * @param accountId The account ID to update.
     * @param keypair The new keypair to associate with the account.
     */
    update(accountId: string, keypair?: KeyPair, signingURL?: string, relayerAPI?: string): void;
    /**
     * Deletes an account entry.
     * @param accountId The account ID to delete.
     */
    delete(accountId: string): void;
    /**
     * Sets the active account.
     * @param accountId The account ID to set as active.
     */
    setActive(accountId: string | undefined): void;
}
