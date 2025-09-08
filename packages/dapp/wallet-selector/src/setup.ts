import * as nearAPI from "near-api-js";
import { InstantLinkWallet, NetworkId, WalletModuleFactory } from "@near-wallet-selector/core";
import { connect } from "near-api-js";
import { Wallet } from "./wallet";
import { DAppClient } from "@one-click-connect/dapp-sdk";

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
        const near = await connect(connectionConfig);
        const permissions = {
            allowance,
            methodNames,
            receiverId: contractId,
        };
        const client = new DAppClient(
            {
                redirectURL: window.location.href,
            },
            near,
            keyStore,
            permissions,
        );

        try {
            const newUrl = await client.connect(window.location.href, true);
            if (newUrl !== window.location.href) window.location.assign(newUrl);
            return {
                id: "one-click-connect",
                type: "instant-link",
                metadata: {
                    name: "One Click Connect",
                    description: null,
                    iconUrl: "",
                    deprecated: false,
                    available: true,
                    contractId,
                    runOnStartup: true,
                },
                init: async (_) => new Wallet(client, permissions),
            };
        } catch (_) {
            return null;
        }
    };
}
