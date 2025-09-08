import { MsgAddLAK, MsgSignWithFAK, MsgSignIn, Permissions, MsgSignInQueryParams, Codec } from "@one-click-connect/core";
import { BaseDAppClientConfig } from "./base.client.config";
import { Account, ErrorCodes } from "../../common";
import { AccountStore, Callbacks, PendingTransactionStore, Provider } from "../../common";

export abstract class BaseDAppClient<Transaction, TransactionResult, Config extends BaseDAppClientConfig = BaseDAppClientConfig> {
    protected account?: Account;

    protected constructor(
        protected config: Config,
        protected codec: Codec<Transaction, string>,
        protected permissions: Permissions,
        protected callbacks: Callbacks,
        protected provider: Provider<Transaction, TransactionResult>,
        protected accountStore: AccountStore,
        protected pendingTransactionStore?: PendingTransactionStore<Transaction>,
    ) {}

    get connected() {
        return !!this.account;
    }

    get accountId() {
        if (!this.connected) throw new Error(ErrorCodes.NOT_CONNECTED);
        return this.account!.accountId;
    }

    get accessKey() {
        if (!this.connected) throw new Error(ErrorCodes.NOT_CONNECTED);
        return this.account!.accessKey;
    }

    get publicKey() {
        if (!this.connected) throw new Error(ErrorCodes.NOT_CONNECTED);
        if (!this.accessKey) throw new Error(ErrorCodes.NO_ACCESS_KEY);
        return this.provider.derivePublicKey(this.accessKey);
    }

    /**
     * Connects the client using a given url or using the previous stored account.
     * @param url The current url where the One Click Connect query params are located.
     * @param executePendingTransactions Whether if you want to execute any pending transactions or not.
     * @returns The new url without the connection query params.
     */
    async connect(url: string, executePendingTransactions = true): Promise<string> {
        let account: Account | null;
        const newUrl = new URL(url);
        try {
            const msgSignIn = MsgSignIn.fromURL(url);
            account = Account.fromMsgSignIn(msgSignIn);
            newUrl.searchParams.delete(MsgSignInQueryParams.CONNECTION);
            // Store new account
            await this.accountStore.set(account);
        } catch (_) {
            account = await this.accountStore.get();
        }
        if (!account) {
            throw new Error(ErrorCodes.COULD_NOT_CONNECT);
        }
        this.account = account;
        if (executePendingTransactions) await this.executePendingTransactions();
        return newUrl.toString();
    }

    /**
     * Signs and sends a given transaction.
     * @param transaction The transaction to send.
     * @returns The transaction result or void if executed a callback.
     */
    async signAndSendTransaction(transaction: Transaction): Promise<TransactionResult | void> {
        if (!this.connected) throw new Error(ErrorCodes.NOT_CONNECTED);
        const hasAccessKey = this.account!.accessKey !== undefined;
        const canExecute = await this.provider.canExecute(this.permissions, transaction);
        const hasPermissions =
            hasAccessKey && (await this.provider.canAccessKeyExecute(this.account!.accountId, this.account!.accessKey!, transaction));

        if (!canExecute) {
            // Can't execute transaction with the established permissions
            const msgSignWithFAK = new MsgSignWithFAK(this.codec, [transaction], this.config.redirectURL);
            return await this.callbacks.onRequestSignWithFAK(msgSignWithFAK.toURL(this.account!.signingURL));
        } else {
            if (!hasAccessKey || (hasAccessKey && !hasPermissions)) {
                // Access key is not stored or access key is stored but doesn't have permissions (removed or badly created)
                this.account!.accessKey = await this.provider.generateAccessKey();
                await this.accountStore.set(this.account!);
                if (this.pendingTransactionStore) await this.pendingTransactionStore.push(this.account!.accountId, transaction);
                const publicKey = this.provider.derivePublicKey(this.account!.accessKey);
                const msgAddLAK = new MsgAddLAK(this.config.redirectURL, this.permissions, publicKey);
                return await this.callbacks.onRequestAddLAK(msgAddLAK.toURL(this.account!.signingURL));
            } else {
                // Access key is stored and has permissions
                return await this.provider.signAndSendTransaction(this.account!.accountId, this.account!.accessKey!, transaction);
            }
        }
    }

    /**
     * Signs a given message using the provided access key.
     * @param message The message to be signed.
     * @returns A promise that resolves to the signed message as a string.
     */
    async signMessage(message: string): Promise<string> {
        if (!this.connected) throw new Error(ErrorCodes.NOT_CONNECTED);
        if (!this.accessKey) throw new Error(ErrorCodes.NO_ACCESS_KEY);
        return this.provider.signMessage(this.accessKey, message);
    }

    /**
     * Executes any pending transactions stored in the pending transaction store.
     */
    async executePendingTransactions(): Promise<void> {
        if (!this.connected) throw new Error(ErrorCodes.NOT_CONNECTED);
        if (!this.pendingTransactionStore) return;
        let pendingTransaction: Transaction | null = await this.pendingTransactionStore.pop(this.account!.accountId);
        while (pendingTransaction) {
            if (!this.account?.accessKey) throw new Error(ErrorCodes.NO_ACCESS_KEY);
            // NOTE: We wait for certain seconds to make sure transaction gets included in the blockchain
            await new Promise((resolve) => setTimeout(resolve, 1500));
            await this.signAndSendTransaction(pendingTransaction);
            pendingTransaction = await this.pendingTransactionStore.pop(this.account!.accountId);
        }
        await this.pendingTransactionStore.remove();
    }

    /**
     * Disconnects the user by removing stored account and pending transaction data.
     * This method clears user-related data from the associated stores to complete the disconnection process.
     * @returns A promise that resolves when the account and pending transaction data are successfully removed.
     */
    async disconnect() {
        await this.accountStore.remove();
        if (this.account?.accountId) await this.pendingTransactionStore?.removeAll(this.account.accountId);
    }
}
