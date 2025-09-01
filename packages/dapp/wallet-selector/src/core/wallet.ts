import {
    Account as WalletSelectorAccount,
    FinalExecutionOutcome,
    InstantLinkWallet,
    SignedMessage,
    SignInParams,
    SignMessageParams,
    VerifiedOwner,
    VerifyOwnerParams,
} from "@near-wallet-selector/core";
import { KeyPair, Near } from "near-api-js";
import { getPublicKey, KeyPairString } from "../utils/keys";
import * as nearAPI from "near-api-js";
import { createAction } from "@near-wallet-selector/wallet-utils";
import { SignAndSendTransactionParams, SignAndSendTransactionsParams } from "./types";
import { accessKeyHasPermissions } from "../utils/transaction";
import { MsgAddLAK } from "@one-click-connect/core";
import { FunctionCallPermission } from "near-api-js/lib/transaction";
import { AccessKeyInfoView } from "near-api-js/lib/providers/provider";
import { AccountStore } from "../store/account.store";
import { PendingTransactionStore } from "../store/pending-transaction.store";
import { Account } from "./account";
import { KeyStore } from "near-api-js/lib/key_stores";

export class Wallet implements Omit<InstantLinkWallet, "id" | "type" | "metadata"> {
    private _accessKey: AccessKeyInfoView | undefined;
    private readonly accountStore: AccountStore;
    private readonly pendingTransactionStore: PendingTransactionStore;

    constructor(
        private readonly account: Account,
        private readonly connection: Near,
        private readonly keyStore: KeyStore,
        private readonly permissions: FunctionCallPermission,
    ) {
        this.accountStore = new AccountStore();
        this.pendingTransactionStore = new PendingTransactionStore(this.account.accountId);
    }

    /**
     * @inheritDoc
     */
    async getAccessKey(): Promise<AccessKeyInfoView | undefined> {
        if (!this.account.accessKey) return undefined;
        if (!this._accessKey) {
            const account = await this.connection.account(this.account.accountId);
            const accountAccessKeys = await account.getAccessKeys();
            const publicKey = getPublicKey(this.account.accessKey);
            this._accessKey = accountAccessKeys.find(({ public_key }) => public_key === publicKey);
        }
        return this._accessKey;
    }

    /**
     * @inheritDoc
     */
    signIn = async (_: SignInParams): Promise<WalletSelectorAccount[]> => {
        this.accountStore.set(this.account);
        if (this.account.accessKey) {
            try {
                const accessKey = await this.getAccessKey();

                if (accessKey) {
                    return [
                        {
                            accountId: this.account.accountId,
                            publicKey: accessKey.public_key,
                        },
                    ];
                }
                console.log("secret key not found for account. Defaulting to no key.");
            } catch (e) {
                console.log("Error getting access key", e);
                return [];
            }
        }
        return [
            {
                accountId: this.account.accountId,
                publicKey: undefined,
            },
        ];
    };

    /**
     * @inheritDoc
     */
    signOut = async (): Promise<void> => {
        this.accountStore.remove();
        this.pendingTransactionStore.remove();
    };

    /**
     * @inheritDoc
     */
    getAccounts = async (): Promise<WalletSelectorAccount[]> => {
        return [
            {
                accountId: this.account.accountId,
                publicKey: (await this.getAccessKey())?.public_key,
            },
        ];
    };

    /**
     * @inheritDoc
     */
    verifyOwner = (_: VerifyOwnerParams): Promise<VerifiedOwner | void> => {
        throw new Error("Method not implemented.");
    };

    /**
     * @inheritDoc
     */
    signAndSendTransaction = async (params: SignAndSendTransactionParams, addToStore = true): Promise<FinalExecutionOutcome> => {
        const accessKey = await this.getAccessKey();
        if (!accessKey) {
            const keyPair = KeyPair.fromRandom("ed25519");
            // Store new KeyPair and pending transaction item to stores
            this.account.accessKey = keyPair.toString();
            this.accountStore.set(this.account);
            if (addToStore) this.pendingTransactionStore.push(params);

            const msgAddLAK = new MsgAddLAK(window.location.href, this.permissions, keyPair.getPublicKey());
            window.location.assign(msgAddLAK.toURL(this.account.signingURL));
            // Ignored return since we are moving out the dApp
            return undefined as any;
        } else {
            const hasPermissions = await accessKeyHasPermissions(accessKey.access_key, params.receiverId, params.actions);
            if (hasPermissions) {
                await this.keyStore.setKey(
                    this.connection.connection.networkId,
                    this.account.accountId,
                    KeyPair.fromString(this.account.accessKey! as KeyPairString),
                );
                const signer = new nearAPI.Account(this.connection.connection, this.account.accountId);

                return signer.signAndSendTransaction({
                    receiverId: params.receiverId ?? this.permissions.receiverId,
                    actions: params.actions.map((action) => createAction(action)),
                });
            } else {
                // TODO: Flow where we need to redirect to wallet to sign transaction in FAK
                throw new Error("Sign in with FAK not implemented");
            }
        }
    };

    /**
     * @inheritDoc
     */
    signAndSendTransactions = async (params: SignAndSendTransactionsParams): Promise<Array<FinalExecutionOutcome>> => {
        const results: FinalExecutionOutcome[] = [];
        this.pendingTransactionStore.push(...params.transactions);
        for (const transaction of params.transactions) {
            results.push(await this.signAndSendTransaction(transaction, false));
        }
        return results;
    };

    /**
     * @inheritDoc
     */
    signMessage = (_: SignMessageParams): Promise<SignedMessage | void> => {
        throw new Error("Method not implemented.");
    };

    /**
     * @inheritDoc
     */
    getContractId = (): string => {
        return this.permissions.receiverId;
    };

    /**
     * Executes all pending transactions stored.
     */
    executePendingTransactions = async (): Promise<void> => {
        let pendingTransaction = this.pendingTransactionStore.pop();
        while (pendingTransaction) {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            await this.signAndSendTransaction(pendingTransaction);
            pendingTransaction = this.pendingTransactionStore.pop();
        }
        this.pendingTransactionStore.remove();
    };
}
