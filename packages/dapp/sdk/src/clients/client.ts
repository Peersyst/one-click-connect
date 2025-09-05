import { Permissions } from "@one-click-connect/core";
import { BrowserDAppClient } from "@one-click-connect/dapp-core";
import { FinalExecutionOutcome } from "near-api-js/lib/providers";
import { Action } from "near-api-js/lib/transaction";
import { NearWallet } from "../wallet";
import { Near } from "near-api-js";
import { BaseDAppClientConfig } from "@one-click-connect/dapp-core";
import { KeyStore } from "near-api-js/lib/key_stores";
import { TransactionCodec } from "../codec/transaction.codec";

export interface Transaction {
    signerId?: string;
    receiverId?: string;
    actions: Array<Action>;
}
export class DAppClient extends BrowserDAppClient<Transaction, FinalExecutionOutcome, BaseDAppClientConfig> {
    constructor(
        protected config: BaseDAppClientConfig,
        protected near: Near,
        protected keyStore: KeyStore,
        protected permissions: Permissions,
    ) {
        const wallet = new NearWallet(near, keyStore, permissions);
        const codec = new TransactionCodec();
        super(config, permissions, codec, wallet);
    }
}
