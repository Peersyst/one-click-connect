import { INearRelayerDAppClient } from "@one-click-connect/core/relayer";
import { IUserService } from "../../common/client/interfaces/i-user.service";
import { DAppClient } from "../../common/client/client";
import { MsgFakSign, MsgSignInitialTx } from "@one-click-connect/core/base";

export class NearRelayerDAppClient extends DAppClient implements INearRelayerDAppClient {
    constructor(userService: IUserService) {
        super(userService);
    }

    /**
     * @inheritdoc
     */
    signInitialTx(_msg: MsgSignInitialTx): void {
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
