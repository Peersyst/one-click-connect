import { InstantLinkWallet, Network, NetworkId } from "@near-wallet-selector/core";
import { KeypomWallet } from "./wallet";

export const FAILED_EXECUTION_OUTCOME: any = {
    final_execution_status: "NONE",
    status: {
        Failure: {
            error_message: "Invalid Trial Action",
            error_type: "keypom-trial-error",
        },
    },
    transaction: {},
    transaction_outcome: {
        id: "",
        outcome: {
            logs: [],
            receipt_ids: [],
            tokens_burnt: "0",
            executor_id: "",
            gas_burnt: 0,
            status: {
                Failure: {
                    error_message: "Invalid Trial Action",
                    error_type: "keypom-trial-error",
                },
            },
        },
    },
    receipts_outcome: [
        {
            id: "",
            outcome: {
                logs: [],
                receipt_ids: [],
                gas_burnt: 0,
                tokens_burnt: "0",
                executor_id: "",
                status: {
                    Failure: {
                        error_message: "Invalid Trial Action",
                        error_type: "keypom-trial-error",
                    },
                },
            },
        },
    ],
};

export interface SignInOptions {
    contractId?: string;
    allowance?: string;
    methodNames?: string[];
}

export interface KeypomInitializeOptions {
    keypomWallet: KeypomWallet;
}

export interface OneClickParams {
    networkId: NetworkId;
    contractId: string;
    allowance?: string;
    methodNames?: string[];
}

/**
 *
 * @param params
 */
export const isOneClickParams = (params: OneClickParams): boolean =>
    typeof params.networkId === "string" && (params.networkId === "testnet" || params.networkId === "mainnet");

export type KeypomWalletInstant = InstantLinkWallet & {
    networkId: string;
    getContractId(): string;
    switchAccount(id: string): Promise<void>;
    getAccountId(): string;
    isSignedIn: () => Promise<boolean>;
    getAvailableBalance: () => Promise<bigint>;
    showModal(): any;
};

export type AddKeyPermission =
    | "FullAccess"
    | {
          receiverId: string;
          allowance?: string;
          methodNames?: Array<string>;
      };

/**
 *
 * @param networkId
 */
export const getNetworkPreset = (networkId: NetworkId): Network => {
    switch (networkId) {
        case "mainnet":
            return {
                networkId,
                nodeUrl: "https://rpc.mainnet.near.org",
                helperUrl: "https://helper.mainnet.near.org",
                explorerUrl: "https://nearblocks.io",
                indexerUrl: "https://api.kitwallet.app",
            };
        case "testnet":
            return {
                networkId,
                nodeUrl: "https://rpc.testnet.near.org",
                helperUrl: "https://helper.testnet.near.org",
                explorerUrl: "https://testnet.nearblocks.io",
                indexerUrl: "https://testnet-api.kitwallet.app",
            };
        default:
            throw Error(`Failed to find config for: '${networkId}'`);
    }
};
