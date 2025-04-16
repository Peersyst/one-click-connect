import { Transaction } from "near-api-js/lib/transaction";

export type SignInitialTxRequest = {
    accountID: string;
    signingURL: string;
    transaction: Transaction;
    permissions: object;
};
