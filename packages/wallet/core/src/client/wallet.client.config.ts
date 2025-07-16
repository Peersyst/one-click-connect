import { RelayerAPI } from "@one-click-connect/core";

export type WalletClientConfig = {
    signingURL: string;
    relayerAPI?: RelayerAPI;
};
