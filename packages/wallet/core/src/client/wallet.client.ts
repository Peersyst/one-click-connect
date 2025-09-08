import {
    MsgAddLAK,
    MsgSignWithFAK,
    DAppRequest,
    SignInRequest,
    INearWalletClient,
    MsgSignIn,
    RequestType,
    Codec,
} from "@one-click-connect/core";
import { WalletClientConfig } from "./wallet.client.config";
import { ClientError, ClientErrorCodes } from "../common/errors";

export class WalletClient<Transaction, Config extends WalletClientConfig = WalletClientConfig> implements INearWalletClient {
    private config: Config;

    constructor(
        config: Config,
        protected readonly codec: Codec<Transaction, string>,
    ) {
        this.config = config;
    }

    /**
     * @inheritDoc
     */
    requestSignIn(params: SignInRequest["params"], dAppURL: string): string {
        if (!this.config.signingURL) {
            throw new ClientError(ClientErrorCodes.SIGNING_URL_NOT_SET);
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
                type: RequestType.ADD_LAK,
                params: {
                    redirectURL: msg.redirectURL,
                    permissions: msg.permissions,
                    publicKey: msg.publicKey,
                },
            };
        } catch (_) {}
        try {
            const msg = MsgSignWithFAK.fromURL(url, this.codec);
            return {
                type: RequestType.SIGN_WITH_FAK,
                params: {
                    redirectURL: msg.redirectURL,
                    transactions: msg.transactions,
                },
            };
        } catch (_) {}
        throw new Error(ClientErrorCodes.INVALID_URL);
    }

    /**
     * Get the config.
     * @returns The config.
     */
    getConfig(): Config {
        return this.config;
    }
}
