import { Account } from "../../account/account.types";

export interface IAccountService {
    /**
     * Gets the currently active account.
     * @returns The active account.
     */
    getActive(): Account;
    /**
     * Gets an account by its ID.
     * @param accountId The ID of the account to get.
     * @returns The account.
     */
    getAccountKeypair(accountId: string): Account;
    /**
     * Creates a new account.
     * @param accountId The ID of the account to create.
     * @returns The created account.
     */
    createAccountKeypair(accountId: string): Account;
    /**
     * Deletes an account.
     * @param accountId The ID of the account to delete.
     */
    deleteAccountKeypair(accountId: string): void;
}
