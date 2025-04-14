import { KeyPair } from "near-api-js/lib/utils";

export interface IUserRepository {
    /**
     * Get user key.
     * @param id User id.
     * @returns User key.
     */
    getUserKeyPair(id: string): KeyPair;
    /**
     * Check if user key exists.
     * @param id User id.
     * @returns True if user key exists, false otherwise.
     */
    hasUserKeyPair(id: string): boolean;
    /**
     * Save user key.
     * @param id User id.
     * @param key User key.
     */
    saveUserKeyPair(id: string, key: KeyPair): void;
    /**
     * Update user key.
     * @param id User id.
     * @param key User key.
     */
    updateUserKeyPair(id: string, key: KeyPair): void;
    /**
     * Delete user key.
     * @param id User id.
     */
    deleteUserKeyPair(id: string): void;
}
