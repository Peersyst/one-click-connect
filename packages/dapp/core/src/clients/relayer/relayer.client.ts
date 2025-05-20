import { INearRelayerDAppClient } from "@one-click-connect/core/relayer";
import { SignInitialTxRequest, SignWithFakRequest } from "@one-click-connect/core/common";

export class NearRelayerDAppClient implements INearRelayerDAppClient {
    /**
     * @inheritdoc
     */
    signInitialTx(_request: SignInitialTxRequest): string {
        throw new Error("Method not implemented.");
    }

    /**
     * @inheritdoc
     */
    signWithFullAccessKey(_request: SignWithFakRequest): string {
        throw new Error("Method not implemented.");
    }

    /**
     * @inheritdoc
     */
    accountId(): string {
        throw new Error("Method not implemented.");
    }

    /**
     * @inheritdoc
     */
    relayerAPI(): string {
        throw new Error("Method not implemented.");
    }

    /**
     * @inheritdoc
     */
    signingURL(): string {
        throw new Error("Method not implemented.");
    }
}
