import { INearWalletClient, MsgSignIn } from "@one-click-connect/core/base";
import { WalletClientConfig } from "./wallet.client.config";
import { ClientError, ClientErrorCodes } from "../common/errors";

export class WalletClient<C extends WalletClientConfig> implements INearWalletClient {
    private config: C;

    constructor(config: C) {
        this.config = config;
    }

    /**
     * @inheritdoc
     */
    signIn(accountID: string, url: string): string {
        if (!this.config.signingURL) {
            throw new ClientError(ClientErrorCodes.SIGNING_URL_NOT_SET);
        }
        const msg = new MsgSignIn(accountID, this.config.signingURL);
        return msg.toURL(url);
    }

    /**
     * Get the config.
     * @returns The config.
     */
    getConfig(): C {
        return this.config;
    }
}
