import { KeyPair, PublicKey } from "near-api-js/lib/utils";
import { IUserService } from "../../client/interfaces/i-user.service";
import { IUserRepository } from "./interfaces/i-user.repository";
import { UserLocalStorageRepository } from "../repositories/user.local-storage.repository";

export class UserService implements IUserService {
    constructor(private readonly userRepository: IUserRepository = new UserLocalStorageRepository()) {}
    /**
     * @inheritdoc
     */
    getUserKey(id: string): PublicKey {
        return this.userRepository.getUserKeyPair(id).publicKey;
    }
    /**
     * @inheritdoc
     */
    hasUserKey(id: string): boolean {
        return this.userRepository.hasUserKeyPair(id);
    }
    /**
     * @inheritdoc
     */
    createUserKey(id: string, curve: string = "ed25519"): PublicKey {
        const keyPair = KeyPair.fromRandom(curve);
        this.userRepository.saveUserKeyPair(id, keyPair);
        return keyPair.publicKey;
    }
    /**
     * @inheritdoc
     */
    deleteUserKey(id: string): void {
        this.userRepository.deleteUserKeyPair(id);
    }
}
