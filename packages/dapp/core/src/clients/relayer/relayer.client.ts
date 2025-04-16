import { INearRelayerDAppClient } from "@one-click-connect/core/relayer";
import { MsgFakSign } from "@one-click-connect/core/base";
import { SignInitialTxRequest } from "@one-click-connect/core/common";

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
    signWithFak(_msg: MsgFakSign): void {
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
