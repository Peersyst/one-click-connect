import { INearWalletClient, MsgFakSign, MsgSignIn } from "@one-click-connect/core/base";
import { WalletClientConfig } from "./wallet.client.config";
import { ClientError, ClientErrorCodes } from "../common/errors";
import { Transaction } from "near-api-js/lib/transaction";
import { MsgRelaySignIn } from "@one-click-connect/core/relayer";

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

        if (this.config.relayerAPI) {
            const msg = new MsgRelaySignIn(accountID, this.config.signingURL, this.config.relayerAPI);
            return msg.toURL(url);
        }

        const msg = new MsgSignIn(accountID, this.config.signingURL);
        return msg.toURL(url);
    }

    /**
     * @inheritdoc
     */
    signWithFullAccessKey(url: string): { transaction: Transaction; redirectURL: string } {
        const msg = MsgFakSign.fromURL(url);

        return { transaction: msg.transaction, redirectURL: msg.redirectURL };
    }

    /**
     * Get the config.
     * @returns The config.
     */
    getConfig(): C {
        return this.config;
    }
}
