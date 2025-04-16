import { KeyPair } from "near-api-js/lib/utils";
import { IAccountRepository } from "./interfaces";
import { IAccountService } from "../client/interfaces/i-account.service";
import { Account } from "./account.types";
import { ServiceError } from "../errors";
import { AccountErrorCodes } from "./errors";

export class AccountService implements IAccountService {
    constructor(private readonly accountRepository: IAccountRepository) {}

    /**
     * @inheritdoc
     */
    getActive(): Account {
        return this.accountRepository.getActive();
    }

    /**
     * @inheritdoc
     */
    getAccountKeypair(accountId: string): Account {
        const account = this.accountRepository.get(accountId);
        if (!account) {
            throw new ServiceError(AccountService.name, AccountErrorCodes.ACCOUNT_NOT_FOUND);
        }
        return account;
    }

    /**
     * @inheritdoc
     */
    createAccountKeypair(accountId: string, curve: string = "ed25519"): Account {
        const keypair = KeyPair.fromRandom(curve);
        const account = this.accountRepository.create(accountId, keypair);
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
