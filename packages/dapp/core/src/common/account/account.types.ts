import { KeyPair } from "near-api-js/lib/utils";

export type Account = {
    accountID: string;
    keypair: KeyPair;
    signingURL: string;
    relayerAPI?: string;
};
