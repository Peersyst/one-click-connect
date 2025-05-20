import { INearRelayerDAppClient } from "@one-click-connect/core/relayer";
import { SignInitialTxRequest, SignWithFakRequest } from "@one-click-connect/core/common";
import { NearRelayerDAppClientConfig } from "./relayer.client.config";
import { IAccountService } from "../../common/client/interfaces/i-account.service";
import { DAppClient } from "../../common/client";
import { Account } from "../../common/account";
import { ClientError, ClientErrorCodes } from "../../common/client/errors";
import { MsgFakSign, MsgSignInitialTx } from "@one-click-connect/core/base";

export class NearRelayerDAppClient<C extends NearRelayerDAppClientConfig> extends DAppClient<C> implements INearRelayerDAppClient {
    constructor(config: C, accountService: IAccountService) {
        super(config, accountService);
    }

    /**
     * @inheritdoc
     */
    isSignedIn(accountID: string, signingURL: string, relayerAPI: string): boolean {
        if (this.getActiveAccount()?.accountID === accountID) {
            return true;
        }

        const account = this.accountService.getAccount(accountID);
        if (!account) {
            return false;
        }

        if (account.signingURL !== signingURL || (account.relayerAPI && account.relayerAPI !== relayerAPI)) {
            this.accountService.updateAccount(accountID, signingURL, relayerAPI);
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
    signOut(): void {
        this.accountService.clearActiveAccount();
    }

    /**
     * @inheritdoc
     */
    requestSignInitialTx(request: SignInitialTxRequest): string {
        if (!this.config.redirectURL) {
            throw new ClientError(ClientErrorCodes.REDIRECT_URL_NOT_SET);
        }

        if (!this.config.relayerAPI) {
            throw new ClientError(ClientErrorCodes.RELAYER_API_NOT_SET);
        }

        const { accountID, signingURL, permissions } = request;

        const account = this.accountService.getAccount(accountID);
        if (account) {
            throw new ClientError(ClientErrorCodes.ACCOUNT_ALREADY_EXISTS);
        }

        const { keypair } = this.accountService.createAccount(accountID, signingURL, this.config.relayerAPI);

        const msg = new MsgSignInitialTx(this.config.redirectURL, permissions, keypair.getPublicKey());
        return msg.toURL(signingURL);
    }

    /**
     * @inheritdoc
     */
    requestSignWithFullAccessKey(request: SignWithFakRequest): string {
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
