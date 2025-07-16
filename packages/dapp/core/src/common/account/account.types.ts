import { RelayerAPI } from "@one-click-connect/core";
import { KeyPair } from "near-api-js/lib/utils";

export type Account = {
    accountID: string;
    keypair: KeyPair;
    signingURL: string;
    relayerAPI?: RelayerAPI;
};
