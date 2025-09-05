import { Permissions } from "@one-click-connect/core";
import { BrowserDAppClient } from "@one-click-connect/dapp-core";
import { FinalExecutionOutcome } from "near-api-js/lib/providers";
import { NearProvider } from "../provider";
import { Near } from "near-api-js";
import { BaseDAppClientConfig } from "@one-click-connect/dapp-core";
import { KeyStore } from "near-api-js/lib/key_stores";
import { TransactionCodec } from "@one-click-connect/sdk";
import { Transaction } from "@one-click-connect/sdk";

export class DAppClient extends BrowserDAppClient<Transaction, FinalExecutionOutcome, BaseDAppClientConfig> {
    constructor(
        protected config: BaseDAppClientConfig,
        protected near: Near,
        protected keyStore: KeyStore,
        protected permissions: Permissions,
    ) {
        const wallet = new NearProvider(near, keyStore, permissions);
        const codec = new TransactionCodec();
        super(config, codec, permissions, wallet);
    }
}
