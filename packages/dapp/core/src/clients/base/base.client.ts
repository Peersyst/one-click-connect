import { INearDAppClient, MsgFakSign, MsgSignInitialTx } from "@one-click-connect/core/base";
import { DAppClient } from "../../common/client/client";
import { NearDAppClientConfig } from "./base.client.config";
import { IAccountService } from "../../common/client/interfaces/i-account.service";
import { SignInitialTxRequest, SignWithFakRequest } from "@one-click-connect/core/common";
import { ClientError, ClientErrorCodes } from "../../common/client/errors";
import { Account } from "../../common/account";

/**
 * A client for the Near DApp.
 */
export class NearDAppClient<C extends NearDAppClientConfig> extends DAppClient<C> implements INearDAppClient {
    constructor(config: C, accountService: IAccountService) {
        super(config, accountService);
    }

    /**
     * @inheritdoc
     */
    signIn(accountID: string, signingURL: string): boolean {
        if (this.getActiveAccount()?.accountID === accountID) {
            return true;
        }

        const account = this.accountService.getAccount(accountID);
        if (!account) {
            return false;
        }

        if (account.signingURL !== signingURL) {
            this.accountService.updateAccount(accountID, signingURL);
        }

        this.accountService.setActive(accountID);
        return true;
    }

    /**
     * @inheritdoc
     */
    getActiveAccount(): Account | undefined {
        return this.accountService.getActive();
    }

    /**
     * @inheritdoc
     */
    signInitialTx(request: SignInitialTxRequest): string {
        if (!this.config.redirectURL) {
            throw new ClientError(ClientErrorCodes.REDIRECT_URL_NOT_SET);
        }

        const { accountID, signingURL, permissions } = request;

        const account = this.accountService.getAccount(accountID);
        if (account) {
            throw new ClientError(ClientErrorCodes.ACCOUNT_ALREADY_EXISTS);
        }

        const { keypair } = this.accountService.createAccount(accountID, signingURL);

        const msg = new MsgSignInitialTx(this.config.redirectURL, permissions, keypair.getPublicKey());
        return msg.toURL(signingURL);
    }

    /**
     * @inheritdoc
     */
    signOut(): void {
        this.accountService.clearActiveAccount();
    }

    /**
     * @inheritdoc
     */
    signWithFullAccessKey(request: SignWithFakRequest): string {
        if (!this.config.redirectURL) {
            throw new ClientError(ClientErrorCodes.REDIRECT_URL_NOT_SET);
        }

        const { transaction, signingURL } = request;

        const msg = new MsgFakSign(transaction, this.config.redirectURL);
        return msg.toURL(signingURL);
    }

    /**
     * @inheritdoc
     */
    getConfig(): C {
        return this.config;
    }
}
