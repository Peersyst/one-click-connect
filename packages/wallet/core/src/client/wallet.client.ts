import { MsgAddLAK, MsgSignWithFAK, SignInParams, DAppRequest, INearWalletClient, MsgSignIn } from "@one-click-connect/core";
import { WalletClientConfig } from "./wallet.client.config";
import { ClientError, ClientErrorCodes } from "../common/errors";

export class WalletClient<C extends WalletClientConfig> implements INearWalletClient {
    private config: C;

    constructor(config: C) {
        this.config = config;
    }

    /**
     * @inheritDoc
     */
    requestSignIn(params: SignInParams, dAppURL: string): string {
        if (!this.config.signingURL) {
            throw new ClientError(ClientErrorCodes.SIGNING_URL_NOT_SET);
        }

        if (this.config.relayerAPI) {
            // TODO: Implement relaying with API
        }

        const msg = new MsgSignIn(params.accountID, this.config.signingURL, params.walletId, params.accessKey);
        return msg.toURL(dAppURL);
    }

    /**
     * @inheritDoc
     */
    parseDAppRequest(url: string): DAppRequest {
        try {
            const msg = MsgAddLAK.fromURL(url);
            return {
                type: "add-lak",
                params: {
                    redirectURL: msg.redirectURL,
                    permissions: msg.permissions,
                    publicKey: msg.publicKey,
                },
            };
        } catch (e) {
            console.log("could not parse add-lak request", e);
        }
        try {
            const msg = MsgSignWithFAK.fromURL(url);
            return {
                type: "sign-with-fak",
                params: {
                    redirectURL: msg.redirectURL,
                    transactions: msg.transactions,
                },
            };
        } catch (e) {
            console.log("could not parse sign-with-fak request", e);
        }
        throw new Error("Invalid URL");
    }

    /**
     * Get the config.
     * @returns The config.
     */
    getConfig(): C {
        return this.config;
    }
}
