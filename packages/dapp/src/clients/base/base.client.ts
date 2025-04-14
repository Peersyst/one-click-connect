import { INearDAppClient, MsgFakSign, MsgSignInitialTx } from "@one-click-connect/core/base";
import { IUserService } from "../../common/client/interfaces/i-user.service";
import { DAppClient } from "../../common/client/client";
import { UserService } from "../../common/user";
import { NearDAppClientConfig } from "./base.client.config";

/**
 * A client for the Near DApp.
 */
export class NearDAppClient extends DAppClient<NearDAppClientConfig> implements INearDAppClient {
    constructor(config: NearDAppClientConfig, userService: IUserService = new UserService()) {
        super(config, userService);
    }

    /**
     * Creates a new NearDAppClient from a config.
     * @param config The config to create the NearDAppClient from.
     * @returns A new NearDAppClient.
     */
    static fromConfig(config: NearDAppClientConfig): NearDAppClient {
        return new NearDAppClient(config);
    }

    /**
     * @inheritdoc
     */
    signInitialTx(_msg: MsgSignInitialTx): void {}

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
        return this.config.accountId;
    }

    /**
     * @inheritdoc
     */
    signingURL(): string {
        return this.config.signingURL;
    }
}
