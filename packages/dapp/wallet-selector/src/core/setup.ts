import * as nearAPI from "near-api-js";
import { InstantLinkWallet, NetworkId, WalletModuleFactory } from "@near-wallet-selector/core";
import { connect } from "near-api-js";
import { MsgSignIn } from "@one-click-connect/core";
import { Wallet } from "./wallet";
import { Account } from "./account";
import { AccountStore } from "../store/account.store";

export type SetupOptions = {
    networkId: NetworkId;
    contractId: string;
    methodNames: string[];
    nodeUrl: string;
    allowance?: bigint;
};

/**
 * Setups One Click Connect module for the Wallet Selector.
 * @param options The setup options.
 * @returns The OneClickConnect module.
 */
export function setupOneClickConnect(options: SetupOptions): WalletModuleFactory<InstantLinkWallet> {
    return async () => {
        const { networkId, contractId, allowance, methodNames, nodeUrl } = options;
        const { keyStores } = nearAPI;
        const keyStore = new keyStores.BrowserLocalStorageKeyStore();
        const connectionConfig = {
            networkId,
            keyStore,
            nodeUrl,
            headers: {},
        };
        const connection = await connect(connectionConfig);

        let account: Account | null;
        try {
            const msgSignIn = MsgSignIn.fromURL(window.location.href);
            account = Account.fromMsgSignIn(msgSignIn);
            // Replace the URL and remove the connection string
            const newUrl = new URL(window.location.href);
            // TODO: decouple connection param info logic from here
            newUrl.searchParams.delete("connection");
            window.location.replace(newUrl.toString());
        } catch (e) {
            console.log("could not parse msgSignIn, retrieving account from store...", e);
            account = new AccountStore().get();
        }
        if (!account) {
            console.error("Could not sign in using One Click Connect, no msgSignIn detected and no account stored");
            return null;
        } else {
            const wallet = new Wallet(account, connection, keyStore, {
                allowance,
                methodNames,
                receiverId: contractId,
            });
            await wallet.executePendingTransactions();
            return {
                id: "keypom",
                type: "instant-link",
                metadata: {
                    name: "Keypom Account",
                    description: null,
                    iconUrl: "",
                    deprecated: false,
                    available: true,
                    contractId,
                    runOnStartup: true,
                },
                init: async (_) => wallet,
            };
        }
    };
}
