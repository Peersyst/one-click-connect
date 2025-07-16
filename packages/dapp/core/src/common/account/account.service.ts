import { KeyPair } from "near-api-js/lib/utils";
import { IAccountRepository } from "./interfaces";
import { IAccountService } from "../client/interfaces/i-account.service";
import { Account } from "./account.types";
import { RelayerAPI } from "@one-click-connect/core";

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
    setActive(accountId: string): void {
        this.accountRepository.setActive(accountId);
    }

    /**
     * @inheritdoc
     */
    clearActiveAccount(): void {
        this.accountRepository.setActive(undefined);
    }

    /**
     * @inheritdoc
     */
    getAccount(accountId: string): Account | undefined {
        return this.accountRepository.get(accountId);
    }

    /**
     * @inheritdoc
     */
    createAccount(accountId: string, signingURL: string, relayerAPI?: RelayerAPI): Account {
        const keypair = KeyPair.fromRandom("ed25519");
        const account = this.accountRepository.create(accountId, keypair, signingURL, relayerAPI);
        this.accountRepository.setActive(accountId);
        return account;
    }

    /**
     * @inheritdoc
     */
    deleteAccount(accountId: string): void {
        this.accountRepository.delete(accountId);
    }

    /**
     * @inheritdoc
     */
    updateAccount(accountId: string, signingURL: string): void {
        this.accountRepository.update(accountId, signingURL);
    }
}
