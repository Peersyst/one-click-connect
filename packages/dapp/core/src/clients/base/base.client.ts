import { INearDAppClient, MsgFakSign, MsgSignInitialTx } from "@one-click-connect/core/base";
import { DAppClient } from "../../common/client/client";
import { NearDAppClientConfig } from "./base.client.config";
import { IAccountService } from "../../common/client/interfaces/i-account.service";
import { SignInitialTxRequest } from "@one-click-connect/core/common";
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
    getActiveAccount(): Account | undefined {
        return this.accountService.getActive();
    }

    /**
     * @inheritdoc
     */
    signInitialTx(request: SignInitialTxRequest): string {
        const { accountID, signingURL, permissions } = request;

        const account = this.accountService.getAccountKeypair(accountID);
        if (account) {
            throw new ClientError(ClientErrorCodes.ACCOUNT_ALREADY_EXISTS);
        }

        const { keypair } = this.accountService.createAccountKeypair(accountID);

        const msg = new MsgSignInitialTx(this.config.redirectURL, permissions, keypair.getPublicKey());
        return msg.toURL(signingURL);
    }

    /**
     * @inheritdoc
     */
    signWithFak(_msg: MsgFakSign): void {
        throw new Error("Method not implemented.");
    }

    /**
     * @inheritdoc
     */
    getConfig(): C {
        return this.config;
    }
}
