import { KeyPair } from "near-api-js/lib/utils";
import { IUserRepository } from "../services/interfaces/i-user.repository";
import { RepositoryError } from "../../errors";
import { UserErrorCodes } from "../errors/user.error-codes";

export class UserLocalStorageRepository implements IUserRepository {
    constructor(private readonly storage: Storage = localStorage) {}

    /**
     * @inheritdoc
     */
    getUserKeyPair(id: string): KeyPair {
        const keyPair = this.storage.getItem(id);
        if (!keyPair) {
            throw new RepositoryError(UserLocalStorageRepository.name, UserErrorCodes.KEY_PAIR_NOT_FOUND);
        }
        return KeyPair.fromString(keyPair);
    }

    /**
     * @inheritdoc
     */
    hasUserKeyPair(id: string): boolean {
        return this.storage.getItem(id) !== null;
    }

    /**
     * @inheritdoc
     */
    saveUserKeyPair(id: string, keyPair: KeyPair): void {
        this.storage.setItem(id, keyPair.toString());
    }

    /**
     * @inheritdoc
     */
    updateUserKeyPair(id: string, keyPair: KeyPair): void {
        this.storage.setItem(id, keyPair.toString());
    }

    /**
     * @inheritdoc
     */
    deleteUserKeyPair(id: string): void {
        this.storage.removeItem(id);
    }
}
