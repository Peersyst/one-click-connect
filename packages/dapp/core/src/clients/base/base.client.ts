import {
    MsgAddLAK,
    MsgSignWithFAK,
    INearDAppClient,
    WalletRequest,
    AddLAKParams,
    SignWithFAKParams,
    MsgSignIn,
} from "@one-click-connect/core";
import { NearDAppClientConfig } from "./base.client.config";

/**
 * A client for the Near DApp.
 */
export class NearDAppClient<C extends NearDAppClientConfig> implements INearDAppClient {
    private config: C;

    constructor(config: C) {
        this.config = config;
    }

    /**
     * @inheritdoc
     */
    parseWalletRequest(url: string): WalletRequest {
        try {
            const msg = MsgSignIn.fromURL(url);
            return {
                type: "sign-in",
                params: {
                    accountID: msg.accountID,
                    walletId: msg.walletId,
                    accessKey: msg.accessKey,
                },
            };
        } catch (_) {}
        throw new Error("Invalid URL");
    }

    /**
     * @inheritdoc
     */
    requestAddLAK(params: AddLAKParams): string {
        return new MsgAddLAK(this.config.redirectURL, params.permissions, params.publicKey).toURL(this.config.redirectURL);
    }

    /**
     * @inheritdoc
     */
    requestSignWithFAK(params: SignWithFAKParams): string {
        return new MsgSignWithFAK(params.transactions, this.config.redirectURL).toURL(this.config.redirectURL);
    }

    /**
     * @inheritdoc
     */
    getConfig(): C {
        return this.config;
    }
}
