import { INearDAppClient, MsgFakSign, MsgSignInitialTx } from "@one-click-connect/core/base";
import { DAppClient } from "../../common/client/client";
import { NearDAppClientConfig } from "./base.client.config";
import { IAccountService } from "../../common/client/interfaces/i-account.service";
import { ServiceError } from "../../common/errors";
import { SignInitialTxRequest } from "@one-click-connect/core/common";

/**
 * A client for the Near DApp.
 */
export class NearDAppClient extends DAppClient<NearDAppClientConfig> implements INearDAppClient {
    constructor(
        config: NearDAppClientConfig,
        private readonly accountService: IAccountService,
    ) {
        super(config);
    }

    /**
     * @inheritdoc
     */
    signInitialTx(request: SignInitialTxRequest): string {
        const { accountID, signingURL, transaction, permissions } = request;

        const account = this.accountService.getAccountKeypair(accountID);
        if (account) {
            throw new ServiceError(NearDAppClient.name, "ACCOUNT_ALREADY_EXISTS");
        }

        const createdAccount = this.accountService.createAccountKeypair(accountID);
        const msg = new MsgSignInitialTx(transaction, this.config.redirectURL, permissions, createdAccount.keypair.getPublicKey());
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
    getConfig(): NearDAppClientConfig {
        return this.config;
    }
}
