import { RelayerAPI } from "@one-click-connect/core/relayer";

export type WalletClientConfig = {
    signingURL: string;
    relayerAPI?: RelayerAPI;
};
