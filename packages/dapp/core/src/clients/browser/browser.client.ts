import { Permissions } from "@one-click-connect/core";
import { BaseDAppClientConfig } from "../base";
import { Codec, PendingTransactionStore, Wallet } from "../../common";
import { BaseDAppClient } from "../base";
import { BrowserAccountStore, BrowserPendingTransactionStore } from "../../store/browser";
import { BrowserCallbacks } from "./browser.callbacks";

export class BrowserDAppClient<
    Transaction extends object,
    TransactionResult,
    Config extends BaseDAppClientConfig = BaseDAppClientConfig,
> extends BaseDAppClient<Transaction, TransactionResult, Config> {
    constructor(
        protected config: Config,
        protected permissions: Permissions,
        protected codec: Codec<Transaction[], string>,
        protected wallet: Wallet<Transaction, TransactionResult>,
    ) {
        const accountStore = new BrowserAccountStore();
        const pendingTransactionStore: PendingTransactionStore<Transaction> = new BrowserPendingTransactionStore(codec);
        const callbacks = new BrowserCallbacks();
        super(config, permissions, callbacks, wallet, accountStore, pendingTransactionStore);
    }
}
