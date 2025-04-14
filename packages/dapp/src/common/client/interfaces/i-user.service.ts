import { PublicKey } from "near-api-js/lib/utils";

/**
 * User service interface.
 */
export interface IUserService {
    /**
     * Get user key.
     * @param id User id.
     * @returns User key.
     */
    getUserKey(id: string): PublicKey;
    /**
     * Check if user key exists.
     * @param id User id.
     * @returns True if user key exists, false otherwise.
     */
    hasUserKey(id: string): boolean;
    /**
     * Create user key.
     * @param id User id.
     * @returns User key.
     */
    createUserKey(id: string): PublicKey;
    /**
     * Delete user key.
     * @param id User id.
     */
    deleteUserKey(id: string): void;
}
