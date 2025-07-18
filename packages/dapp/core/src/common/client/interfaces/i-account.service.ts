import { Account } from "../../account/account.types";
import { RelayerAPI } from "@one-click-connect/core";

export interface IAccountService {
    /**
     * Gets the currently active account.
     * @returns The active account.
     */
    getActive(): Account | undefined;
    /**
     * Sets the active account.
     * @param accountId The ID of the account to set as active.
     */
    setActive(accountId: string): void;
    /**
     * Clears the active account.
     */
    clearActiveAccount(): void;
    /**
     * Gets an account by its ID.
     * @param accountId The ID of the account to get.
     * @returns The account.
     */
    getAccount(accountId: string): Account | undefined;
    /**
     * Creates a new account.
     * @param accountId The ID of the account to create.
     * @param signingURL The signing URL of the account.
     * @param relayerAPI The relayer API of the account.
     * @returns The created account.
     */
    createAccount(accountId: string, signingURL: string, relayerAPI?: RelayerAPI): Account;
    /**
     * Deletes an account.
     * @param accountId The ID of the account to delete.
     */
    deleteAccount(accountId: string): void;
    /**
     * Updates an account.
     * @param accountId The ID of the account to update.
     * @param signingURL The signing URL of the account.
     * @param relayerAPI The relayer API of the account.
     */
    updateAccount(accountId: string, signingURL: string, relayerAPI?: RelayerAPI): void;
}
