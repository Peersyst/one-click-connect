import { INearWalletClient, MsgFakSign, MsgSignIn, MsgSignInitialTx } from "@one-click-connect/core";
import { WalletClientConfig } from "./wallet.client.config";
import { ClientError, ClientErrorCodes } from "../common/errors";
import { FunctionCallPermission, Transaction } from "near-api-js/lib/transaction";
import { MsgRelaySignIn } from "@one-click-connect/core";
import { PublicKey } from "near-api-js/lib/utils";

export class WalletClient<C extends WalletClientConfig> implements INearWalletClient {
    private config: C;

    constructor(config: C) {
        this.config = config;
    }

    /**
     * @inheritdoc
     */
    requestSignIn(accountID: string, url: string): string {
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
    parseSignInitialTxRequest(url: string): { permissions: FunctionCallPermission; redirectURL: string; publicKey: PublicKey } {
        const msg = MsgSignInitialTx.fromURL(url);

        return { permissions: msg.permissions, redirectURL: msg.redirectURL, publicKey: msg.publicKey };
    }

    /**
     * @inheritdoc
     */
    parseFullAccessKeyRequest(url: string): { transaction: Transaction; redirectURL: string } {
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
