import { RelayerAPI } from "@one-click-connect/core";
import { KeyPair } from "near-api-js/lib/utils";

export type AccountStoreState = {
    active: string;
    accounts: Record<string, AccountStoreAccount>;
};

export type AccountStoreAccount = {
    keypair: KeyPair;
    signingURL: string;
    relayerAPI?: RelayerAPI;
};
