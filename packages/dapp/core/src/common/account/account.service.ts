import { KeyPair } from "near-api-js/lib/utils";
import { IAccountRepository } from "./interfaces";
import { IAccountService } from "../client/interfaces/i-account.service";
import { Account } from "./account.types";

export class AccountService implements IAccountService {
    constructor(private readonly accountRepository: IAccountRepository) {}

    /**
     * @inheritdoc
     */
    getActive(): Account | undefined {
        return this.accountRepository.getActive();
    }

    /**
     * @inheritdoc
     */
    getAccountKeypair(accountId: string): Account | undefined {
        return this.accountRepository.get(accountId);
    }

    /**
     * @inheritdoc
     */
    createAccountKeypair(accountId: string, signingURL: string, curve: string = "ed25519"): Account {
        const keypair = KeyPair.fromRandom(curve);
        const account = this.accountRepository.create(accountId, keypair, signingURL);
        this.accountRepository.setActive(accountId);
        return account;
    }

    /**
     * @inheritdoc
     */
    deleteAccountKeypair(accountId: string): void {
        this.accountRepository.delete(accountId);
    }
}
