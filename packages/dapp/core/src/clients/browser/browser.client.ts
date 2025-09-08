import { Codec, Permissions } from "@one-click-connect/core";
import { BaseDAppClientConfig } from "../base";
import { PendingTransactionStore, Provider } from "../../common";
import { BaseDAppClient } from "../base";
import { BrowserAccountStore, BrowserPendingTransactionStore } from "../../store";
import { BrowserCallbacks } from "./browser.callbacks";

export class BrowserDAppClient<
    Transaction extends object,
    TransactionResult,
    Config extends BaseDAppClientConfig = BaseDAppClientConfig,
> extends BaseDAppClient<Transaction, TransactionResult, Config> {
    constructor(
        protected config: Config,
        protected codec: Codec<Transaction, string>,
        protected permissions: Permissions,
        protected provider: Provider<Transaction, TransactionResult>,
    ) {
        const accountStore = new BrowserAccountStore();
        const pendingTransactionStore: PendingTransactionStore<Transaction> = new BrowserPendingTransactionStore(codec);
        const callbacks = new BrowserCallbacks();
        super(config, codec, permissions, callbacks, provider, accountStore, pendingTransactionStore);
    }
}
